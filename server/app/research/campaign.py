from __future__ import annotations

import csv
import heapq
import json
import math
import random
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

import pybullet as p

from ..assets.library import AssetLibrary
from ..config import CAMPAIGN_WALLCLOCK, DATASETS_DIR, MAX_CAMPAIGN_TRIALS, SIM_DT
from ..sim import robots
from ..sim.controllers import JointOsc, OscillatorBank, PDHold, WheelBank
from ..sim.mathutil import length, xy_distance
from ..sim.world import World, _guess_wheel_indices

Emit = Callable[[dict[str, Any]], Any]

# Known-working Pulse bound gait used as the *policy* under domain rand / robustness.
# Campaigns that *search* gaits sample around this space; they do not retune the live lab.
WORKING_BOUND = {
    "pattern": "bound",
    "freq": 1.0,
    "hip_amp": 0.65,
    "knee_amp": 0.2,
    "knee_offset": -0.7,
    "hip_force": 28.0,
    "knee_force": 24.0,
}

PHASE = {
    "trot": {"fl": 0.0, "fr": math.pi, "hl": math.pi, "hr": 0.0},
    "bound": {"fl": 0.0, "fr": 0.0, "hl": math.pi, "hr": math.pi},
    "pace": {"fl": 0.0, "fr": math.pi, "hl": 0.0, "hr": math.pi},
    "walk": {"fl": 0.0, "fr": math.pi * 0.5, "hl": math.pi, "hr": math.pi * 1.5},
    "pronk": {"fl": 0.0, "fr": 0.0, "hl": 0.0, "hr": 0.0},
    "gallop": {"fl": 0.15, "fr": 0.45, "hl": math.pi + 0.1, "hr": math.pi + 0.4},
}

USECASES: dict[str, dict[str, Any]] = {
    "gait_search": {
        "id": "gait_search",
        "title": "Gait search",
        "blurb": "Random oscillator parameters on a quadruped. Distill the gaits that actually travel.",
        "default_n": 1000,
        "default_asset": "pulse",
        "assets": ["pulse", "laikago", "a1", "mini_cheetah", "quadruped", "minitaur"],
        "horizon": 5.5,
        "objective": "walk",
        "axes": ["controller"],
        "why_n": "A thousand trials covers frequency × amplitude × phase well enough to keep a distilled positive set.",
    },
    "domain_rand": {
        "id": "domain_rand",
        "title": "Domain randomization",
        "blurb": "Fixed gait, randomized friction / gravity / mass. Robustness statistics, not a new walk.",
        "default_n": 10000,
        "default_asset": "pulse",
        "assets": ["pulse", "laikago", "husky", "r2d2"],
        "horizon": 5.5,
        "objective": "walk",
        "axes": ["friction", "gravity", "mass_scale", "restitution"],
        "why_n": "Ten thousand is the smallest N that makes percentile tables on physics knobs meaningful.",
    },
    "wheeled_nav": {
        "id": "wheeled_nav",
        "title": "Wheeled navigation",
        "blurb": "Husky / R2D2 / racecar drive toward a cube with heading and speed jitter.",
        "default_n": 1000,
        "default_asset": "husky",
        "assets": ["husky", "r2d2", "racecar", "hauler"],
        "horizon": 4.0,
        "objective": "reach",
        "axes": ["linear", "angular", "target_xy", "friction"],
        "why_n": "A thousand heading/speed/target draws fills a compact imitation set.",
    },
    "arm_reach": {
        "id": "arm_reach",
        "title": "Arm reach",
        "blurb": "KUKA / Panda / xArm joint targets versus a cube. End-effector distance is the score.",
        "default_n": 1000,
        "default_asset": "kuka",
        "assets": ["kuka", "panda", "xarm", "reach"],
        "horizon": 3.0,
        "objective": "ee_reach",
        "axes": ["joint_targets", "target_xyz"],
        "why_n": "Joint space is large; a thousand random targets is a starter coverage set.",
    },
    "cartpole": {
        "id": "cartpole",
        "title": "Cartpole balance",
        "blurb": "Classic cart-pole. Cheap trials — this is the use case that can run toward 100k–1M.",
        "default_n": 10000,
        "default_asset": "cartpole",
        "assets": ["cartpole"],
        "horizon": 3.0,
        "objective": "balance",
        "axes": ["init_angle", "force"],
        "why_n": "Each trial is milliseconds. 10k is interactive; 100k overnight; 1M as resumed shards.",
    },
    "robustness": {
        "id": "robustness",
        "title": "Impulse robustness",
        "blurb": "Walk under random lateral impulses. Distill the trials that stay upright.",
        "default_n": 1000,
        "default_asset": "pulse",
        "assets": ["pulse", "laikago", "husky"],
        "horizon": 5.0,
        "objective": "walk",
        "axes": ["impulse", "friction"],
        "why_n": "A thousand impulse directions × magnitudes is a useful stress table.",
    },
}


def default_wallclock(n: int) -> float:
    if n <= 100:
        return 90.0
    if n <= 1000:
        return 240.0
    if n <= 10000:
        return 900.0
    return 3600.0


def parse_n(raw: Any) -> int:
    if isinstance(raw, (int, float)):
        return max(1, int(raw))
    s = str(raw or "").strip().lower().replace(",", "").replace("_", "")
    if s.endswith("m") and s[:-1].replace(".", "", 1).isdigit():
        return int(float(s[:-1]) * 1_000_000)
    if s.endswith("k") and s[:-1].replace(".", "", 1).isdigit():
        return int(float(s[:-1]) * 1000)
    return max(1, int(float(s)))


def usecases_public() -> list[dict[str, Any]]:
    return [dict(u) for u in USECASES.values()]


def _leg_key(name: str) -> str:
    n = name.lower()
    if n.startswith("fl") or "fl_" in n or n.startswith("front_left") or n.startswith("lf"):
        return "fl"
    if n.startswith("fr") or "fr_" in n or n.startswith("front_right") or n.startswith("rf"):
        return "fr"
    if n.startswith("hl") or n.startswith("rl") or "hl_" in n or "rl_" in n or "rear_left" in n or n.startswith("lh"):
        return "hl"
    if n.startswith("hr") or n.startswith("rr") or "hr_" in n or "rr_" in n or "rear_right" in n or n.startswith("rh"):
        return "hr"
    if "left" in n:
        return "fl"
    if "right" in n:
        return "fr"
    return "fl"


class _SimWorker:
    def __init__(self, worker_id: int) -> None:
        self.worker_id = worker_id
        self.world = World()
        self.world.connect()
        self.library = AssetLibrary()

    def close(self) -> None:
        try:
            self.world.disconnect()
        except Exception:
            pass

    def trial(self, spec: dict[str, Any], trial: int, rng: random.Random) -> dict[str, Any]:
        w = self.world
        w.connect()
        usecase = spec["usecase"]
        meta = USECASES[usecase]
        asset_id = spec["asset"]
        horizon = float(spec.get("horizon") or meta["horizon"])
        variation = _sample_variation(usecase, asset_id, rng, spec.get("axes"))
        _apply_physics(w, variation)

        floor_id, floor = robots.spawn_arena_floor(w.client)
        w.bodies[floor_id] = floor

        actor = _spawn_actor(w, self.library, asset_id, variation)
        target = None
        if meta["objective"] in ("walk", "reach", "ee_reach"):
            target = _spawn_target(w, variation)

        action = _attach_controller(w, actor, usecase, variation, rng)
        if usecase == "cartpole":
            _reset_cartpole(w, actor, variation)
        w._settle(30 if usecase != "cartpole" else 2)

        if usecase == "robustness" and variation.get("impulse"):
            # Let the gait start, then shove.
            pre = int(0.45 / SIM_DT)
            w.step(pre, record=False)
            w.apply_force(actor.id, list(variation["impulse"]))

        steps = max(8, int(horizon / SIM_DT))
        batch = 64
        done = 0
        pole_ok = 0
        pole_n = 0
        while done < steps:
            n = min(batch, steps - done)
            w.step(n, record=False)
            done += n
            if usecase == "cartpole":
                ang = abs(p.getJointState(actor.id, 1, physicsClientId=w.client)[0])
                pole_n += 1
                if ang < 0.35:
                    pole_ok += 1

        record = _evaluate(w, actor, target, usecase, variation, action, horizon)
        record.update(
            {
                "trial": trial,
                "seed": spec["seed"] + trial,
                "usecase": usecase,
                "asset": asset_id,
                "worker": self.worker_id,
                "dt": SIM_DT,
                "horizon": horizon,
            }
        )
        if usecase == "cartpole" and pole_n:
            frac = round(pole_ok / pole_n, 4)
            record["metrics"]["uprightFrac"] = frac
            pole = abs(float(record["metrics"].get("poleAngle") or 99))
            cart = abs(float(record["metrics"].get("cartX") or 99))
            record["success"] = bool(frac > 0.7 and pole < 0.35 and cart < 2.4)
            record["reward"] = round(frac * math.exp(-0.15 * cart), 4)
            record["reason"] = f"pole {pole:.3f} rad, cart {cart:.2f}m, upright {frac:.2f}"
        return record


def _spawn_actor(world: World, library: AssetLibrary, asset_id: str, variation: dict[str, Any]):
    pos = [-0.55, 0.0, 0.0]
    if asset_id in ("pulse", "kiosk", "hauler", "reach"):
        fn = {
            "pulse": robots.spawn_pulse,
            "kiosk": robots.spawn_biped,
            "hauler": robots.spawn_hauler,
            "reach": robots.spawn_arm,
        }[asset_id]
        bid, rec, rest = fn(world.client, pos)
        rec.created_by = "campaign"
        world.register(rec, rest)
        world.actor_id = bid
        scale = float(variation.get("mass_scale") or 1.0)
        if abs(scale - 1.0) > 1e-3:
            info = p.getDynamicsInfo(bid, -1, physicsClientId=world.client)
            p.changeDynamics(bid, -1, mass=max(0.05, float(info[0]) * scale), physicsClientId=world.client)
        return rec
    asset = library.get(asset_id)
    if not asset or not asset.file_path:
        bid, rec, rest = robots.spawn_pulse(world.client, pos)
        rec.created_by = "campaign"
        world.register(rec, rest)
        world.actor_id = bid
        return rec
    spawn = [pos[0], pos[1], float(asset.spawn_z or 0.0)]
    rec = world.load_urdf(
        asset.file_path,
        spawn,
        name=asset.name,
        asset_id=asset.id,
        tags=asset.tags,
        capabilities=asset.capabilities,
        color=asset.color,
        category=asset.category,
        fixed_base=asset.fixed_base,
        created_by="campaign",
    )
    world.actor_id = rec.id
    scale = float(variation.get("mass_scale") or 1.0)
    if abs(scale - 1.0) > 1e-3:
        info = p.getDynamicsInfo(rec.id, -1, physicsClientId=world.client)
        p.changeDynamics(rec.id, -1, mass=max(0.05, float(info[0]) * scale), physicsClientId=world.client)
    return rec


def _spawn_target(world: World, variation: dict[str, Any]):
    xy = variation.get("target_xy") or [1.05, 0.0]
    z = float(variation.get("target_z") or 0.09)
    bid, rec = robots.spawn_box(
        world.client,
        [float(xy[0]), float(xy[1]), z],
        [0.18, 0.18, 0.18],
        0.35,
        [0.86, 0.14, 0.16, 1.0],
        "Red Cube",
        hex="#e23d42",
        tags=["cube", "red", "target", "manipulable"],
        asset_id="red_cube",
        created_by="campaign",
    )
    world.register(rec)
    world.target_id = bid
    return rec


def _apply_physics(world: World, variation: dict[str, Any]) -> None:
    g = variation.get("gravity", -9.81)
    world.set_physics(gravity=abs(float(g)) * -1.0 if isinstance(g, (int, float)) else g)
    extra: dict[str, Any] = {}
    if "friction" in variation:
        extra["friction"] = float(variation["friction"])
    if "restitution" in variation:
        extra["restitution"] = float(variation["restitution"])
    if extra:
        world.set_physics(**extra)


def _sample_variation(usecase: str, asset_id: str, rng: random.Random, axes: list[str] | None) -> dict[str, Any]:
    meta = USECASES[usecase]
    enabled = set(axes or meta["axes"])
    var: dict[str, Any] = {}
    if "friction" in enabled:
        var["friction"] = round(rng.uniform(0.35, 1.7), 3)
    if "gravity" in enabled:
        var["gravity"] = round(rng.uniform(-12.0, -6.5), 3)
    if "mass_scale" in enabled:
        var["mass_scale"] = round(rng.uniform(0.75, 1.3), 3)
    if "restitution" in enabled:
        var["restitution"] = round(rng.uniform(0.0, 0.35), 3)
    if "target_xy" in enabled:
        var["target_xy"] = [round(rng.uniform(0.7, 1.4), 3), round(rng.uniform(-0.45, 0.45), 3)]
    else:
        var["target_xy"] = [1.05, 0.0]
    if "target_xyz" in enabled:
        var["target_xy"] = [round(rng.uniform(0.35, 0.7), 3), round(rng.uniform(-0.35, 0.35), 3)]
        var["target_z"] = round(rng.uniform(0.25, 0.65), 3)
    if "linear" in enabled:
        var["linear"] = round(rng.uniform(0.15, 0.85), 3)
    if "angular" in enabled:
        var["angular"] = round(rng.uniform(-0.9, 0.9), 3)
    if "impulse" in enabled:
        mag = rng.uniform(8.0, 40.0)
        ang = rng.uniform(0, 2 * math.pi)
        var["impulse"] = [round(mag * math.cos(ang), 2), round(mag * math.sin(ang), 2), round(rng.uniform(0, 8), 2)]
    if "init_angle" in enabled:
        var["init_angle"] = round(rng.uniform(-0.35, 0.35), 4)
        var["init_cart"] = round(rng.uniform(-0.4, 0.4), 4)
    if "force" in enabled:
        var["force"] = round(rng.uniform(-18.0, 18.0), 3)
    if "controller" in enabled or usecase == "gait_search":
        pattern = rng.choice(list(PHASE.keys()))
        var["gait"] = {
            "pattern": pattern,
            "freq": round(rng.uniform(0.7, 1.5), 3),
            "hip_amp": round(rng.uniform(0.32, 0.72), 3),
            "knee_amp": round(rng.uniform(0.12, 0.32), 3),
            "knee_offset": round(rng.uniform(-0.85, -0.35), 3),
        }
    elif usecase in ("domain_rand", "robustness") and asset_id in ("pulse", "kiosk"):
        var["gait"] = dict(WORKING_BOUND)
    if "joint_targets" in enabled:
        var["joint_scale"] = round(rng.uniform(-1.0, 1.0), 3)
    return var


def _attach_controller(world: World, rec, usecase: str, variation: dict[str, Any], rng: random.Random) -> dict[str, Any]:
    caps = rec.capabilities or []
    if usecase == "cartpole":
        # PD-ish force on the slider from pole angle + bias.
        force = float(variation.get("force") or 0.0)
        world.controllers[rec.id] = _CartpoleBang(force=force)
        return {"type": "cartpole_force", "force": force}
    if usecase == "arm_reach" or "manipulation" in caps:
        targets: dict[int, float] = {}
        for j in rec.joints:
            if j.type != "revolute":
                continue
            lo, hi = float(j.lower), float(j.upper)
            if hi <= lo:
                lo, hi = -1.6, 1.6
            # keep within 80% of limits
            mid = 0.5 * (lo + hi)
            span = 0.4 * (hi - lo)
            targets[j.index] = round(mid + span * rng.uniform(-1, 1), 4)
        world.controllers[rec.id] = PDHold(targets=targets, kp=0.45, kd=1.0, force=40.0)
        return {"type": "pd", "targets": {str(k): v for k, v in targets.items()}}
    if "locomotion_wheels" in caps or usecase == "wheeled_nav":
        left, right = _guess_wheel_indices(rec)
        linear = float(variation.get("linear") or 0.45)
        angular = float(variation.get("angular") or 0.0)
        world.controllers[rec.id] = WheelBank(
            left=left or [0],
            right=right or [1],
            linear=linear,
            angular=angular,
            force=28.0,
        )
        return {"type": "wheels", "linear": linear, "angular": angular, "left": left, "right": right}
    # legs / gait
    gait = variation.get("gait") or dict(WORKING_BOUND)
    oscs = _gait_oscs(rec, gait)
    world.controllers[rec.id] = OscillatorBank(joints=oscs)
    return {"type": "oscillator", **gait, "nJoints": len(oscs)}


def _gait_oscs(rec, gait: dict[str, Any]) -> list[JointOsc]:
    pattern = str(gait.get("pattern") or "bound")
    phases = PHASE.get(pattern, PHASE["bound"])
    freq = float(gait.get("freq") or 1.0)
    hip_amp = float(gait.get("hip_amp") or 0.5)
    knee_amp = float(gait.get("knee_amp") or 0.2)
    knee_off = float(gait.get("knee_offset") or -0.65)
    hip_f = float(gait.get("hip_force") or 28.0)
    knee_f = float(gait.get("knee_force") or 24.0)
    oscs: list[JointOsc] = []
    hips = [j for j in rec.joints if "hip" in j.name.lower() or "motor" in j.name.lower() or "upper" in j.name.lower()]
    knees = [j for j in rec.joints if "knee" in j.name.lower() or "lower" in j.name.lower()]
    used = set()
    for j in hips:
        if j.type not in ("revolute",):
            continue
        used.add(j.index)
        leg = _leg_key(j.name)
        oscs.append(
            JointOsc(
                index=j.index,
                freq=freq,
                amp=hip_amp,
                phase=phases.get(leg, 0.0),
                offset=float(j.rest or 0.0),
                force=hip_f,
            )
        )
    for j in knees:
        if j.index in used or j.type not in ("revolute",):
            continue
        used.add(j.index)
        leg = _leg_key(j.name)
        oscs.append(
            JointOsc(
                index=j.index,
                freq=freq,
                amp=knee_amp,
                phase=phases.get(leg, 0.0) + math.pi / 2,
                offset=knee_off,
                force=knee_f,
            )
        )
    if not oscs:
        for i, j in enumerate(rec.joints):
            if j.type != "revolute":
                continue
            oscs.append(
                JointOsc(
                    index=j.index,
                    freq=freq,
                    amp=0.35,
                    phase=(i % 2) * math.pi,
                    offset=float(j.rest or 0.0),
                    force=18.0,
                )
            )
    return oscs


class _CartpoleBang:
    kind = "cartpole"

    def __init__(self, force: float = 0.0) -> None:
        self.force = float(force)

    def tick(self, client: int, body_id: int, t: float) -> None:
        pole = p.getJointState(body_id, 1, physicsClientId=client)[0]
        cart = p.getJointState(body_id, 0, physicsClientId=client)
        cmd = self.force + 42.0 * pole + 8.0 * cart[1]
        cmd = max(-80.0, min(80.0, cmd))
        p.setJointMotorControl2(
            body_id,
            0,
            p.TORQUE_CONTROL,
            force=cmd,
            physicsClientId=client,
        )


def _reset_cartpole(world: World, rec, variation: dict[str, Any]) -> None:
    ang = float(variation.get("init_angle") or 0.1)
    x = float(variation.get("init_cart") or 0.0)
    p.resetJointState(rec.id, 0, x, 0.0, physicsClientId=world.client)
    p.resetJointState(rec.id, 1, ang, 0.0, physicsClientId=world.client)


def _evaluate(world: World, rec, target, usecase: str, variation: dict, action: dict, horizon: float) -> dict[str, Any]:
    pos, orn = world.get_pose(rec.id)
    lin, _ang = world.get_velocity(rec.id)
    start = rec.spawned_at or [-0.55, 0, 0]
    traveled = xy_distance(pos, start)
    from ..sim.mathutil import up_z

    upright = float(up_z(orn))
    fallen = bool(upright < 0.45 or pos[2] < 0.04)
    tpos = None
    dist = None
    if target is not None:
        tpos, _ = world.get_pose(target.id)
        dist = xy_distance(pos, tpos)
    metrics: dict[str, Any] = {
        "traveled": round(traveled, 4),
        "upright": round(upright, 4),
        "fallen": fallen,
        "height": round(pos[2], 4),
        "speed": round(length(lin), 4),
        "distanceToTarget": round(dist, 4) if dist is not None else None,
    }
    success = False
    reward = 0.0
    reason = ""
    if usecase == "arm_reach":
        n = p.getNumJoints(rec.id, physicsClientId=world.client)
        ee = pos
        if n:
            st = p.getLinkState(rec.id, n - 1, computeForwardKinematics=True, physicsClientId=world.client)
            ee = list(st[4])
        if tpos is None:
            tpos = [0.5, 0.0, 0.4]
        d3 = length([ee[0] - tpos[0], ee[1] - tpos[1], ee[2] - tpos[2]])
        metrics["eeDistance"] = round(d3, 4)
        metrics["ee"] = [round(v, 4) for v in ee]
        success = d3 < 0.18
        reward = math.exp(-3.0 * d3)
        reason = f"ee {d3:.3f}m"
    elif usecase == "cartpole":
        pole = p.getJointState(rec.id, 1, physicsClientId=world.client)[0]
        cart = p.getJointState(rec.id, 0, physicsClientId=world.client)[0]
        metrics["poleAngle"] = round(float(pole), 4)
        metrics["cartX"] = round(float(cart), 4)
        success = abs(pole) < 0.3 and abs(cart) < 2.4
        reward = math.exp(-2.2 * abs(pole)) * math.exp(-0.15 * abs(cart))
        reason = f"pole {pole:.3f} rad, cart {cart:.2f}m"
    elif usecase == "wheeled_nav":
        success = (not fallen) and dist is not None and dist < 0.55
        reward = (math.exp(-1.6 * dist) if dist is not None else 0.0) * (0.2 if fallen else 1.0)
        reason = f"{dist:.2f}m from target" if dist is not None else f"traveled {traveled:.2f}m"
    else:
        if dist is None:
            success = (not fallen) and traveled > 0.45
            reward = min(1.0, traveled / 1.1) * (0.15 if fallen else 1.0)
            reason = "moved" if success else ("fell" if fallen else f"traveled {traveled:.2f}m")
        else:
            success = (not fallen) and dist < 0.55
            reward = math.exp(-1.6 * dist) * max(0.0, upright) * (0.12 if fallen else 1.0)
            reason = (
                f"reached ({dist:.2f}m)"
                if success
                else ("fell" if fallen else f"{dist:.2f}m from target, traveled {traveled:.2f}m")
            )
    return {
        "success": bool(success),
        "reward": round(float(reward), 4),
        "reason": reason,
        "variation": _jsonable(variation),
        "action": _jsonable(action),
        "metrics": metrics,
    }


def _jsonable(obj: Any) -> Any:
    if isinstance(obj, dict):
        return {str(k): _jsonable(v) for k, v in obj.items()}
    if isinstance(obj, (list, tuple)):
        return [_jsonable(v) for v in obj]
    if isinstance(obj, (int, float, str, bool)) or obj is None:
        return obj
    return str(obj)


class CampaignRunner:
    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._cancel = threading.Event()
        self._thread: threading.Thread | None = None
        self.emit: Emit = lambda _m: None
        self.status: dict[str, Any] = {"status": "idle"}

    def bind(self, emit: Emit) -> None:
        self.emit = emit

    def snapshot(self) -> dict[str, Any]:
        with self._lock:
            return dict(self.status)

    def start(self, spec_in: dict[str, Any]) -> dict[str, Any]:
        spec = _normalize_spec(spec_in)
        with self._lock:
            if self.status.get("status") == "running":
                raise RuntimeError("a campaign is already running")
            self._cancel.clear()
            self.status = {
                "status": "running",
                "id": spec["id"],
                "usecase": spec["usecase"],
                "asset": spec["asset"],
                "n": spec["n"],
                "thisRun": spec["this_run"],
                "done": 0,
                "successes": 0,
                "rate": 0.0,
                "eta": spec["wallclock"],
                "dir": spec["dir"],
                "started": time.time(),
                "note": spec.get("note") or "",
            }
            self._thread = threading.Thread(target=self._run, args=(spec,), daemon=True, name="prism-campaign")
            self._thread.start()
        self.emit({"type": "campaign", **self.snapshot()})
        return self.snapshot()

    def cancel(self) -> dict[str, Any]:
        self._cancel.set()
        return self.snapshot()

    def _run(self, spec: dict[str, Any]) -> None:
        t0 = time.perf_counter()
        out = Path(spec["dir"])
        out.mkdir(parents=True, exist_ok=True)
        trials_path = out / "trials.jsonl"
        succ_path = out / "successes.jsonl"
        manifest = {
            "id": spec["id"],
            "usecase": spec["usecase"],
            "asset": spec["asset"],
            "nRequested": spec["n"],
            "thisRun": spec["this_run"],
            "seed": spec["seed"],
            "workers": spec["workers"],
            "horizon": spec["horizon"],
            "wallclock": spec["wallclock"],
            "dt": SIM_DT,
            "axes": spec["axes"],
            "created": datetime.now(timezone.utc).isoformat(),
            "status": "running",
            "schema": [
                "trial",
                "seed",
                "usecase",
                "asset",
                "variation",
                "action",
                "reward",
                "success",
                "metrics",
                "dt",
                "horizon",
            ],
        }
        _write_json(out / "manifest.json", manifest)
        (out / "README.md").write_text(_readme(spec), encoding="utf-8")

        workers_n = int(spec["workers"])
        this_run = int(spec["this_run"])
        start_i = int(spec.get("resume_from") or 0)
        heap: list[tuple[float, int, dict[str, Any]]] = []
        distill_k = max(8, int(spec["n"] * float(spec.get("distill_top") or 0.1)))
        write_lock = threading.Lock()
        done = 0
        successes = 0
        stop_reason = "complete"

        def handle(rec: dict[str, Any]) -> None:
            nonlocal done, successes
            with write_lock:
                with trials_path.open("a", encoding="utf-8") as f:
                    f.write(json.dumps(rec, default=str) + "\n")
                if rec.get("success"):
                    with succ_path.open("a", encoding="utf-8") as f:
                        f.write(json.dumps(rec, default=str) + "\n")
                    successes += 1
                done += 1
                # top-k by reward
                item = (float(rec.get("reward") or 0.0), rec["trial"], rec)
                if len(heap) < distill_k:
                    heapq.heappush(heap, item)
                elif item[0] > heap[0][0]:
                    heapq.heapreplace(heap, item)
                if done % 10 == 0 or rec.get("success"):
                    elapsed = max(1e-6, time.perf_counter() - t0)
                    rate = done / elapsed
                    eta = (this_run - done) / rate if rate > 0 else None
                    snap = {
                        "status": "running",
                        "id": spec["id"],
                        "usecase": spec["usecase"],
                        "asset": spec["asset"],
                        "n": spec["n"],
                        "thisRun": this_run,
                        "done": done,
                        "successes": successes,
                        "rate": round(rate, 3),
                        "eta": round(eta, 1) if eta is not None else None,
                        "dir": spec["dir"],
                        "last": {
                            "trial": rec["trial"],
                            "success": rec.get("success"),
                            "reward": rec.get("reward"),
                            "reason": rec.get("reason"),
                        },
                    }
                    with self._lock:
                        self.status = snap
                    self.emit({"type": "campaign", **snap})

        try:
            if workers_n <= 1:
                worker = _SimWorker(0)
                try:
                    for i in range(start_i, start_i + this_run):
                        if self._cancel.is_set():
                            stop_reason = "cancelled"
                            break
                        if time.perf_counter() - t0 >= spec["wallclock"]:
                            stop_reason = "wallclock"
                            break
                        rng = random.Random(spec["seed"] + i * 997)
                        rec = worker.trial(spec, i, rng)
                        handle(rec)
                finally:
                    worker.close()
            else:
                # Partition trial ids across workers; each owns a PyBullet client.
                chunks = [[] for _ in range(workers_n)]
                for k, i in enumerate(range(start_i, start_i + this_run)):
                    chunks[k % workers_n].append(i)

                def run_chunk(wid: int, ids: list[int]) -> None:
                    w = _SimWorker(wid)
                    try:
                        for i in ids:
                            if self._cancel.is_set():
                                return
                            if time.perf_counter() - t0 >= spec["wallclock"]:
                                return
                            rng = random.Random(spec["seed"] + i * 997)
                            rec = w.trial(spec, i, rng)
                            handle(rec)
                    finally:
                        w.close()

                with ThreadPoolExecutor(max_workers=workers_n) as pool:
                    futs = [pool.submit(run_chunk, wid, chunk) for wid, chunk in enumerate(chunks) if chunk]
                    for fut in as_completed(futs):
                        fut.result()
                if self._cancel.is_set():
                    stop_reason = "cancelled"
                elif done < this_run:
                    stop_reason = "wallclock"
        except Exception as e:
            stop_reason = f"error: {e}"
            self.emit({"type": "campaign", "status": "error", "id": spec["id"], "error": str(e), "dir": spec["dir"]})

        distilled = [item[2] for item in sorted(heap, key=lambda x: -x[0])]
        dist_path = out / "distilled.jsonl"
        with dist_path.open("w", encoding="utf-8") as f:
            for rec in distilled:
                f.write(json.dumps(rec, default=str) + "\n")
        _write_csv(out / "summary.csv", trials_path)
        elapsed = time.perf_counter() - t0
        remaining = max(0, spec["n"] - (start_i + done))
        manifest.update(
            {
                "status": stop_reason,
                "done": done,
                "successes": successes,
                "elapsedSec": round(elapsed, 3),
                "rateHz": round(done / max(elapsed, 1e-6), 3),
                "resumeFrom": start_i + done,
                "remaining": remaining,
                "distilled": len(distilled),
                "files": {
                    "trials": str(trials_path),
                    "successes": str(succ_path),
                    "distilled": str(dist_path),
                    "summary": str(out / "summary.csv"),
                },
            }
        )
        _write_json(out / "manifest.json", manifest)
        final = {
            "status": "done" if stop_reason == "complete" else stop_reason,
            "id": spec["id"],
            "usecase": spec["usecase"],
            "asset": spec["asset"],
            "n": spec["n"],
            "thisRun": this_run,
            "done": done,
            "successes": successes,
            "rate": round(done / max(elapsed, 1e-6), 3),
            "eta": 0,
            "dir": spec["dir"],
            "elapsed": round(elapsed, 2),
            "remaining": remaining,
            "distilled": len(distilled),
            "note": spec.get("note") or "",
        }
        with self._lock:
            self.status = final
        self.emit({"type": "campaign", **final})
        self.emit(
            {
                "type": "chat",
                "role": "assistant",
                "content": (
                    f"Campaign {spec['id']}: {done} trials, {successes} successes, "
                    f"{len(distilled)} distilled rows → {out}."
                    + (f" {remaining} still queued — run again to resume." if remaining else "")
                ),
            }
        )


def _normalize_spec(spec_in: dict[str, Any]) -> dict[str, Any]:
    usecase = str(spec_in.get("usecase") or "gait_search")
    if usecase not in USECASES:
        raise ValueError(f"unknown usecase {usecase}")
    meta = USECASES[usecase]
    n = min(1_000_000, parse_n(spec_in.get("n") or meta["default_n"]))
    asset = str(spec_in.get("asset") or meta["default_asset"])
    workers = max(1, min(4, int(spec_in.get("workers") or 1)))
    wall = float(spec_in.get("wallclock") or default_wallclock(n) or CAMPAIGN_WALLCLOCK)
    this_run = min(n, MAX_CAMPAIGN_TRIALS)
    note = ""
    if n > MAX_CAMPAIGN_TRIALS:
        note = (
            f"Requested {n:,}; this process will run {this_run:,} then write a resume offset. "
            "Start again with the same id to continue toward the rest."
        )
    stamp = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%S")
    cid = str(spec_in.get("id") or f"{stamp}-{usecase}-{asset}")
    out = Path(spec_in["dir"]) if spec_in.get("dir") else DATASETS_DIR / cid
    return {
        "id": cid,
        "usecase": usecase,
        "asset": asset,
        "n": n,
        "this_run": this_run,
        "workers": workers,
        "seed": int(spec_in.get("seed") or 7),
        "horizon": float(spec_in.get("horizon") or meta["horizon"]),
        "wallclock": wall,
        "axes": list(spec_in.get("axes") or meta["axes"]),
        "distill_top": float(spec_in.get("distill_top") or 0.1),
        "resume_from": int(spec_in.get("resume_from") or 0),
        "dir": str(out),
        "note": note,
    }


def _write_json(path: Path, data: dict[str, Any]) -> None:
    path.write_text(json.dumps(data, indent=2, default=str), encoding="utf-8")


def _write_csv(path: Path, jsonl: Path) -> None:
    if not jsonl.exists():
        return
    rows = []
    with jsonl.open(encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            rec = json.loads(line)
            m = rec.get("metrics") or {}
            rows.append(
                {
                    "trial": rec.get("trial"),
                    "success": int(bool(rec.get("success"))),
                    "reward": rec.get("reward"),
                    "reason": rec.get("reason"),
                    "traveled": m.get("traveled"),
                    "upright": m.get("upright"),
                    "fallen": int(bool(m.get("fallen"))),
                    "distanceToTarget": m.get("distanceToTarget"),
                    "eeDistance": m.get("eeDistance"),
                    "poleAngle": m.get("poleAngle"),
                }
            )
    if not rows:
        return
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)


def _readme(spec: dict[str, Any]) -> str:
    meta = USECASES[spec["usecase"]]
    return (
        f"# {meta['title']} · {spec['n']} trials · {spec['asset']}\n\n"
        f"{meta['blurb']}\n\n"
        f"- horizon: {spec['horizon']}s @ dt={SIM_DT}\n"
        f"- workers: {spec['workers']} independent PyBullet DIRECT clients\n"
        f"- variation axes: {', '.join(spec['axes'])}\n"
        f"- distilled: top {int(float(spec['distill_top']) * 100)}% by reward plus every success\n\n"
        "Records are compact (no full trajectories). `trials.jsonl` is the full table, "
        "`successes.jsonl` the positive class, `distilled.jsonl` the imitation slice, "
        "`summary.csv` a spreadsheet view.\n"
    )


def list_datasets() -> list[dict[str, Any]]:
    out = []
    if not DATASETS_DIR.exists():
        return out
    for p in sorted(DATASETS_DIR.iterdir(), reverse=True):
        man = p / "manifest.json"
        if not man.exists():
            continue
        try:
            data = json.loads(man.read_text(encoding="utf-8"))
        except Exception:
            continue
        data["dir"] = str(p)
        out.append(data)
    return out[:40]


def load_dataset(cid: str) -> dict[str, Any]:
    path = DATASETS_DIR / cid
    man = path / "manifest.json"
    if not man.exists():
        raise FileNotFoundError(cid)
    data = json.loads(man.read_text(encoding="utf-8"))
    data["dir"] = str(path)
    preview = []
    trials = path / "trials.jsonl"
    if trials.exists():
        with trials.open(encoding="utf-8") as f:
            for i, line in enumerate(f):
                if i >= 8:
                    break
                if line.strip():
                    preview.append(json.loads(line))
    data["preview"] = preview
    return data


runner = CampaignRunner()
