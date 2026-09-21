from __future__ import annotations

import copy
import math
import threading
import time
from dataclasses import dataclass, field
from typing import Any, Callable

import numpy as np
import pybullet as p

from ..config import MAX_BODIES, MAX_FORCE, SIM_DT, STREAM_HZ
from . import robots
from .controllers import (
    ConstantForce,
    Controller,
    DiffDrive,
    JointOsc,
    OscillatorBank,
    PDHold,
    controller_to_dict,
)
from .mathutil import as3, clamp, forward_xy, length, up_z, xy_distance, yaw_of
from .robots import BodyRec, Geom, JointRec, LinkRec, apply_rest_pose


@dataclass
class PoseSample:
    t: float
    bodies: dict[int, dict[str, Any]]


@dataclass
class WorldSnapshot:
    pb_state: int
    records: dict[int, BodyRec]
    rest: dict[int, dict[int, float]]
    controllers: dict[int, Controller]
    tick: int
    seed: int
    gravity: tuple[float, float, float]
    actor_id: int | None
    target_id: int | None


class World:
    """Authoritative PyBullet world. All mutation goes through this object."""

    def __init__(self) -> None:
        self.client = -1
        self.bodies: dict[int, BodyRec] = {}
        self.rest_poses: dict[int, dict[int, float]] = {}
        self.controllers: dict[int, Controller] = {}
        self.tick = 0
        self.dt = SIM_DT
        self.gravity = (0.0, 0.0, -9.81)
        self.seed = 7
        self.running = False
        self.speed = 1.0
        self.actor_id: int | None = None
        self.target_id: int | None = None
        self.start_pose: dict[str, Any] = {}
        self._lock = threading.RLock()
        self._undo: list[WorldSnapshot] = []
        self._checkpoint: WorldSnapshot | None = None
        self._traj: list[PoseSample] = []
        self._connected = False
        self.solver_iters = 80

    # ------------------------------------------------------------------ setup
    def connect(self) -> None:
        with self._lock:
            if self._connected:
                p.resetSimulation(physicsClientId=self.client)
            else:
                self.client = p.connect(p.DIRECT)
                self._connected = True
            p.resetSimulation(physicsClientId=self.client)
            p.setGravity(*self.gravity, physicsClientId=self.client)
            p.setTimeStep(self.dt, physicsClientId=self.client)
            p.setPhysicsEngineParameter(
                numSolverIterations=self.solver_iters,
                numSubSteps=1,
                enableConeFriction=1,
                deterministicOverlappingPairs=1,
                physicsClientId=self.client,
            )
            p.setRealTimeSimulation(0, physicsClientId=self.client)
            self.bodies.clear()
            self.rest_poses.clear()
            self.controllers.clear()
            self.tick = 0
            self._traj.clear()
            self._undo.clear()

    def seed_rng(self, seed: int) -> None:
        self.seed = int(seed)
        np.random.seed(self.seed)

    def load_default_arena(self) -> None:
        """Pulse quadruped + red cube. The defining starter scene."""
        with self._lock:
            self.connect()
            self.seed_rng(7)
            floor_id, floor = robots.spawn_arena_floor(self.client)
            self.bodies[floor_id] = floor

            bid, rec, rest = robots.spawn_pulse(self.client, [-0.55, 0.0, 0.0])
            self.bodies[bid] = rec
            self.rest_poses[bid] = rest
            self.actor_id = bid

            cube_id, cube = robots.spawn_box(
                self.client,
                [1.05, 0.0, 0.09],
                [0.18, 0.18, 0.18],
                0.35,
                [0.86, 0.14, 0.16, 1.0],
                "Red Cube",
                hex="#e23d42",
                tags=["cube", "red", "target", "manipulable"],
                friction=0.55,
                asset_id="red_cube",
                metalness=0.12,
                roughness=0.38,
            )
            self.bodies[cube_id] = cube
            self.target_id = cube_id

            self._settle(180)
            self._capture_start()
            self._checkpoint = self._snapshot()

    def _settle(self, n: int) -> None:
        for _ in range(n):
            self._tick_controllers()
            p.stepSimulation(physicsClientId=self.client)
            self.tick += 1

    def _capture_start(self) -> None:
        if self.actor_id is None:
            self.start_pose = {}
            return
        pos, orn = p.getBasePositionAndOrientation(self.actor_id, physicsClientId=self.client)
        self.start_pose = {"pos": list(pos), "orn": list(orn), "t": self.time}

    # ----------------------------------------------------------------- stepping
    @property
    def time(self) -> float:
        return self.tick * self.dt

    def _tick_controllers(self) -> None:
        t = self.time
        for body_id, ctrl in list(self.controllers.items()):
            if body_id not in self.bodies:
                continue
            ctrl.tick(self.client, body_id, t)

    def step(self, n: int = 1, record: bool = False, stream_every: int = 0, on_frame: Callable | None = None) -> None:
        with self._lock:
            every = stream_every or max(1, int(round((1.0 / STREAM_HZ) / self.dt)))
            for i in range(n):
                self._tick_controllers()
                p.stepSimulation(physicsClientId=self.client)
                self.tick += 1
                if record and (i % every == 0):
                    sample = self.capture_poses()
                    self._traj.append(sample)
                    if on_frame:
                        on_frame(sample)

    def reset_to_checkpoint(self) -> None:
        with self._lock:
            if self._checkpoint is None:
                self.load_default_arena()
                return
            self._restore(self._checkpoint)

    def hard_reset(self) -> None:
        self.load_default_arena()

    # ---------------------------------------------------------------- snapshots
    def _snapshot(self) -> WorldSnapshot:
        sid = p.saveState(physicsClientId=self.client)
        return WorldSnapshot(
            pb_state=sid,
            records=copy.deepcopy(self.bodies),
            rest=copy.deepcopy(self.rest_poses),
            controllers=copy.deepcopy(self.controllers),
            tick=self.tick,
            seed=self.seed,
            gravity=self.gravity,
            actor_id=self.actor_id,
            target_id=self.target_id,
        )

    def _restore(self, snap: WorldSnapshot) -> None:
        p.restoreState(snap.pb_state, physicsClientId=self.client)
        self.bodies = copy.deepcopy(snap.records)
        self.rest_poses = copy.deepcopy(snap.rest)
        self.controllers = copy.deepcopy(snap.controllers)
        self.tick = snap.tick
        self.seed = snap.seed
        self.gravity = snap.gravity
        self.actor_id = snap.actor_id
        self.target_id = snap.target_id
        p.setGravity(*self.gravity, physicsClientId=self.client)

    def push_undo(self) -> None:
        with self._lock:
            if len(self._undo) > 16:
                old = self._undo.pop(0)
                try:
                    p.removeState(old.pb_state, physicsClientId=self.client)
                except Exception:
                    pass
            self._undo.append(self._snapshot())

    def undo(self) -> bool:
        with self._lock:
            if not self._undo:
                return False
            snap = self._undo.pop()
            self._restore(snap)
            return True

    def mark_checkpoint(self) -> None:
        with self._lock:
            self._checkpoint = self._snapshot()
            self._capture_start()

    # ---------------------------------------------------------------- queries
    def get_pose(self, body_id: int) -> tuple[list[float], list[float]]:
        pos, orn = p.getBasePositionAndOrientation(body_id, physicsClientId=self.client)
        return list(pos), list(orn)

    def get_velocity(self, body_id: int) -> tuple[list[float], list[float]]:
        lin, ang = p.getBaseVelocity(body_id, physicsClientId=self.client)
        return list(lin), list(ang)

    def capture_poses(self) -> dict[str, Any]:
        items = []
        for bid, rec in self.bodies.items():
            pos, orn = p.getBasePositionAndOrientation(bid, physicsClientId=self.client)
            lin, ang = p.getBaseVelocity(bid, physicsClientId=self.client)
            links = []
            n = p.getNumJoints(bid, physicsClientId=self.client)
            for i in range(n):
                st = p.getLinkState(bid, i, computeForwardKinematics=True, physicsClientId=self.client)
                links.append({"i": i, "p": list(st[4]), "q": list(st[5])})
            items.append(
                {
                    "id": bid,
                    "p": list(pos),
                    "q": list(orn),
                    "v": list(lin),
                    "w": list(ang),
                    "links": links,
                }
            )
        return {"t": round(self.time, 4), "tick": self.tick, "bodies": items}

    def scene_graph(self) -> dict[str, Any]:
        return {
            "t": self.time,
            "gravity": list(self.gravity),
            "actorId": self.actor_id,
            "targetId": self.target_id,
            "bodies": [rec.to_dict() | {"pose": self.get_pose(bid)[0], "orn": self.get_pose(bid)[1]} for bid, rec in self.bodies.items()],
        }

    def inspect(self) -> dict[str, Any]:
        bodies = []
        for bid, rec in self.bodies.items():
            pos, orn = self.get_pose(bid)
            lin, ang = self.get_velocity(bid)
            joints = []
            n = p.getNumJoints(bid, physicsClientId=self.client)
            for j in rec.joints:
                if j.index >= n:
                    continue
                st = p.getJointState(bid, j.index, physicsClientId=self.client)
                joints.append(
                    {
                        "index": j.index,
                        "name": j.name,
                        "type": j.type,
                        "axis": j.axis,
                        "position": round(st[0], 4),
                        "velocity": round(st[1], 4),
                        "rest": j.rest,
                    }
                )
            bodies.append(
                {
                    "id": bid,
                    "name": rec.name,
                    "category": rec.category,
                    "tags": rec.tags,
                    "capabilities": rec.capabilities,
                    "color": rec.color,
                    "mass": rec.mass,
                    "position": [round(v, 4) for v in pos],
                    "yaw": round(yaw_of(orn), 4),
                    "upright": round(up_z(orn), 4),
                    "velocity": [round(v, 4) for v in lin],
                    "angular": [round(v, 4) for v in ang],
                    "joints": joints,
                    "nLinks": len(rec.links),
                    "assetId": rec.asset_id,
                }
            )
        return {
            "time": round(self.time, 4),
            "gravity": list(self.gravity),
            "actorId": self.actor_id,
            "targetId": self.target_id,
            "bodyCount": len(self.bodies),
            "bodies": bodies,
        }

    def observe(self, body_id: int | None = None) -> dict[str, Any]:
        bid = body_id if body_id is not None else self.actor_id
        if bid is None or bid not in self.bodies:
            return {"error": "no actor"}
        rec = self.bodies[bid]
        pos, orn = self.get_pose(bid)
        lin, ang = self.get_velocity(bid)
        contacts = p.getContactPoints(bodyA=bid, physicsClientId=self.client)
        touching = []
        for c in contacts:
            touching.append(
                {
                    "other": c[2],
                    "link": c[3],
                    "normalForce": round(c[9], 3),
                    "position": [round(v, 4) for v in c[5]],
                }
            )
        target = None
        if self.target_id and self.target_id in self.bodies:
            tpos, _ = self.get_pose(self.target_id)
            target = {
                "id": self.target_id,
                "name": self.bodies[self.target_id].name,
                "position": [round(v, 4) for v in tpos],
                "xyDistance": round(xy_distance(pos, tpos), 4),
                "dz": round(tpos[2] - pos[2], 4),
            }
        start = self.start_pose.get("pos", pos)
        return {
            "id": bid,
            "name": rec.name,
            "position": [round(v, 4) for v in pos],
            "yaw": round(yaw_of(orn), 4),
            "upright": round(float(up_z(orn)), 4),
            "linear": [round(v, 4) for v in lin],
            "angular": [round(v, 4) for v in ang],
            "speed": round(length(lin), 4),
            "height": round(pos[2], 4),
            "xyFromStart": round(xy_distance(pos, start), 4),
            "forward": list(forward_xy(orn)),
            "contacts": touching[:12],
            "contactCount": len(touching),
            "fallen": bool(up_z(orn) < 0.45 or pos[2] < 0.04),
            "target": target,
            "time": round(self.time, 4),
        }

    def evaluate(self, objective: str = "reach") -> dict[str, Any]:
        obs = self.observe()
        if "error" in obs:
            return {"success": False, "score": 0.0, "reason": "no actor", "metrics": {}}
        fallen = obs["fallen"]
        upright = obs["upright"]
        dist = obs["target"]["xyDistance"] if obs.get("target") else None
        traveled = obs["xyFromStart"]
        height = obs["height"]

        reason = ""
        success = False
        obj = objective.lower()
        if "climb" in obj or "stair" in obj:
            success = (not fallen) and height > 0.28
            score = clamp(height / 0.45, 0, 1) * (0.2 if fallen else 1.0)
            reason = "climbed" if success else ("fell" if fallen else f"height {height:.2f}m")
        elif "balance" in obj or "stand" in obj:
            success = (not fallen) and abs(obs["angular"][0]) < 0.4
            score = clamp(upright, 0, 1)
            reason = "upright" if success else "lost balance"
        elif "reach" in obj or "walk" in obj or "go" in obj or "cube" in obj or "target" in obj or "locomot" in obj:
            if dist is None:
                success = (not fallen) and traveled > 0.7
                score = clamp(traveled / 1.2, 0, 1) * (0.15 if fallen else 1.0)
                reason = "moved" if success else ("fell" if fallen else f"traveled {traveled:.2f}m")
            else:
                success = (not fallen) and dist < 0.55
                score = math.exp(-1.6 * dist) * clamp(upright, 0, 1) * (0.12 if fallen else 1.0)
                reason = (
                    f"reached target ({dist:.2f}m)"
                    if success
                    else ("fell" if fallen else f"{dist:.2f}m from target, traveled {traveled:.2f}m")
                )
        else:
            if dist is not None:
                success = (not fallen) and dist < 0.50
                score = math.exp(-1.6 * dist) * (0.12 if fallen else 1.0)
                reason = "reached" if success else reason_from(fallen, dist, traveled)
            else:
                success = (not fallen) and traveled > 0.6
                score = clamp(traveled / 1.0, 0, 1)
                reason = "progress" if success else ("fell" if fallen else "little motion")

        return {
            "success": bool(success),
            "score": round(float(score), 4),
            "reason": reason,
            "metrics": {
                "distanceToTarget": dist,
                "traveled": traveled,
                "upright": upright,
                "fallen": fallen,
                "height": height,
                "speed": obs["speed"],
                "time": obs["time"],
            },
            "observation": obs,
        }

    # ---------------------------------------------------------------- mutation
    def set_gravity(self, g: list[float]) -> None:
        with self._lock:
            self.gravity = (float(g[0]), float(g[1]), float(g[2]))
            p.setGravity(*self.gravity, physicsClientId=self.client)

    def set_physics(self, **kwargs: Any) -> dict[str, Any]:
        with self._lock:
            if "gravity" in kwargs:
                g = kwargs["gravity"]
                if isinstance(g, (int, float)):
                    self.set_gravity([0, 0, -abs(float(g))])
                else:
                    self.set_gravity(list(g))
            if "timestep" in kwargs:
                self.dt = float(kwargs["timestep"])
                p.setTimeStep(self.dt, physicsClientId=self.client)
            if "friction" in kwargs:
                mu = float(kwargs["friction"])
                for bid in self.bodies:
                    n = p.getNumJoints(bid, physicsClientId=self.client)
                    for i in range(-1, n):
                        p.changeDynamics(bid, i, lateralFriction=mu, physicsClientId=self.client)
            if "restitution" in kwargs:
                e = float(kwargs["restitution"])
                for bid in self.bodies:
                    p.changeDynamics(bid, -1, restitution=e, physicsClientId=self.client)
            return {"gravity": list(self.gravity), "dt": self.dt}

    def apply_force(self, body_id: int, force: list[float], position: list[float] | None = None, impulse: bool = True) -> None:
        with self._lock:
            f = [clamp(force[0], -MAX_FORCE, MAX_FORCE), clamp(force[1], -MAX_FORCE, MAX_FORCE), clamp(force[2], -MAX_FORCE, MAX_FORCE)]
            pos = position or [0, 0, 0]
            p.applyExternalForce(body_id, -1, f, pos, p.WORLD_FRAME, physicsClientId=self.client)
            if not impulse:
                self.controllers[body_id] = ConstantForce(vec=(f[0], f[1], f[2]))

    def set_motor(self, body_id: int, joint: int | str, mode: str, value: float, force: float = 16.0) -> dict[str, Any]:
        with self._lock:
            rec = self.bodies[body_id]
            idx = joint if isinstance(joint, int) else None
            if idx is None:
                j = rec.joint_by_name(str(joint))
                if not j:
                    return {"error": f"unknown joint {joint}"}
                idx = j.index
            mode_e = p.VELOCITY_CONTROL if mode == "velocity" else p.POSITION_CONTROL
            kwargs: dict[str, Any] = {"force": float(force), "physicsClientId": self.client}
            if mode == "velocity":
                kwargs["targetVelocity"] = float(value)
            else:
                kwargs["targetPosition"] = float(value)
            p.setJointMotorControl2(body_id, idx, mode_e, **kwargs)
            return {"body": body_id, "joint": idx, "mode": mode, "value": value}

    def hold_pose(self, body_id: int | None = None) -> None:
        bid = body_id if body_id is not None else self.actor_id
        if bid is None:
            return
        rest = self.rest_poses.get(bid, {})
        apply_rest_pose(self.client, bid, rest)
        self.controllers[bid] = PDHold(targets=dict(rest), force=18.0)

    def set_controller(self, body_id: int, spec: dict[str, Any]) -> dict[str, Any]:
        with self._lock:
            rec = self.bodies.get(body_id)
            if not rec:
                return {"error": "unknown body"}
            kind = spec.get("type") or spec.get("kind") or "oscillator"
            if kind in ("hold", "pd"):
                targets = spec.get("targets") or self.rest_poses.get(body_id, {})
                # allow name keys
                resolved: dict[int, float] = {}
                if isinstance(targets, dict):
                    for k, v in targets.items():
                        if isinstance(k, int) or (isinstance(k, str) and k.isdigit()):
                            resolved[int(k)] = float(v)
                        else:
                            j = rec.joint_by_name(str(k))
                            if j:
                                resolved[j.index] = float(v)
                ctrl: Controller = PDHold(
                    targets=resolved,
                    kp=float(spec.get("kp", 0.4)),
                    kd=float(spec.get("kd", 1.0)),
                    force=float(spec.get("force", 18.0)),
                )
            elif kind in ("diff_drive", "wheels", "diff"):
                left = spec.get("left", "wheel_l")
                right = spec.get("right", "wheel_r")
                li = left if isinstance(left, int) else (rec.joint_by_name(str(left)).index if rec.joint_by_name(str(left)) else 0)
                ri = right if isinstance(right, int) else (rec.joint_by_name(str(right)).index if rec.joint_by_name(str(right)) else 1)
                ctrl = DiffDrive(
                    left=int(li),
                    right=int(ri),
                    linear=float(spec.get("linear", 0.4)),
                    angular=float(spec.get("angular", 0.0)),
                    force=float(spec.get("force", 10.0)),
                    wheel_radius=float(spec.get("wheel_radius", 0.055)),
                    track=float(spec.get("track", 0.29)),
                )
            elif kind == "force":
                vec = spec.get("vec") or spec.get("force") or [0, 0, 0]
                ctrl = ConstantForce(vec=(float(vec[0]), float(vec[1]), float(vec[2])))
            else:
                joints_spec = spec.get("joints") or []
                oscs: list[JointOsc] = []
                if isinstance(joints_spec, dict):
                    iterable = joints_spec.items()
                    for k, v in iterable:
                        jrec = rec.joint_by_name(str(k)) if not isinstance(k, int) else next((j for j in rec.joints if j.index == k), None)
                        if not jrec:
                            if isinstance(k, int):
                                idx = k
                            else:
                                continue
                        else:
                            idx = jrec.index
                        vv = v if isinstance(v, dict) else {"amp": v}
                        oscs.append(
                            JointOsc(
                                index=idx,
                                freq=float(vv.get("freq", spec.get("freq", 1.2))),
                                amp=float(vv.get("amp", 0.3)),
                                phase=float(vv.get("phase", 0.0)),
                                offset=float(vv.get("offset", 0.0)),
                                force=float(vv.get("force", spec.get("force", 18.0))),
                                kp=float(vv.get("kp", 0.32)),
                                kd=float(vv.get("kd", 0.8)),
                                mode=str(vv.get("mode", "position")),
                            )
                        )
                else:
                    for v in joints_spec:
                        idx = v.get("index")
                        if idx is None and "name" in v:
                            jrec = rec.joint_by_name(v["name"])
                            if not jrec:
                                continue
                            idx = jrec.index
                        oscs.append(
                            JointOsc(
                                index=int(idx),
                                freq=float(v.get("freq", spec.get("freq", 1.2))),
                                amp=float(v.get("amp", 0.3)),
                                phase=float(v.get("phase", 0.0)),
                                offset=float(v.get("offset", 0.0)),
                                force=float(v.get("force", spec.get("force", 18.0))),
                                mode=str(v.get("mode", "position")),
                            )
                        )
                ctrl = OscillatorBank(joints=oscs)
            self.controllers[body_id] = ctrl
            return controller_to_dict(ctrl)

    def clear_controller(self, body_id: int) -> None:
        self.controllers.pop(body_id, None)

    def register(self, rec: BodyRec, rest: dict[int, float] | None = None) -> None:
        if len(self.bodies) >= MAX_BODIES:
            raise RuntimeError("body budget exceeded")
        self.bodies[rec.id] = rec
        if rest:
            self.rest_poses[rec.id] = rest
        if rec.category == "robots" and self.actor_id is None:
            self.actor_id = rec.id
        if "target" in rec.tags or rec.name.lower().find("cube") >= 0:
            if self.target_id is None:
                self.target_id = rec.id

    def remove(self, body_id: int) -> None:
        with self._lock:
            if body_id not in self.bodies:
                return
            rec = self.bodies[body_id]
            if rec.category == "environments" and rec.asset_id == "arena":
                return
            p.removeBody(body_id, physicsClientId=self.client)
            self.bodies.pop(body_id, None)
            self.rest_poses.pop(body_id, None)
            self.controllers.pop(body_id, None)
            if self.actor_id == body_id:
                self.actor_id = next((i for i, r in self.bodies.items() if r.category == "robots"), None)
            if self.target_id == body_id:
                self.target_id = None

    def teleport(self, body_id: int, pos: list[float], orn: list[float] | None = None) -> None:
        with self._lock:
            if orn is None:
                _, orn_now = p.getBasePositionAndOrientation(body_id, physicsClientId=self.client)
                orn = list(orn_now)
            p.resetBasePositionAndOrientation(body_id, pos, orn, physicsClientId=self.client)
            p.resetBaseVelocity(body_id, [0, 0, 0], [0, 0, 0], physicsClientId=self.client)

    def find(self, query: str) -> BodyRec | None:
        q = query.lower().strip()
        if not q:
            return None
        for rec in self.bodies.values():
            if rec.name.lower() == q or rec.asset_id == q:
                return rec
        for rec in self.bodies.values():
            if q in rec.name.lower() or q in rec.tags or q in rec.color.lower():
                return rec
        if "robot" in q or "pulse" in q or "actor" in q:
            if self.actor_id and self.actor_id in self.bodies:
                return self.bodies[self.actor_id]
        if "cube" in q or "red" in q or "target" in q:
            if self.target_id and self.target_id in self.bodies:
                return self.bodies[self.target_id]
        return None

    def load_urdf(self, path: str, pos: list[float], name: str = "URDF") -> BodyRec:
        bid = p.loadURDF(path, pos, physicsClientId=self.client)
        n = p.getNumJoints(bid, physicsClientId=self.client)
        joints: list[JointRec] = []
        for i in range(n):
            info = p.getJointInfo(bid, i, physicsClientId=self.client)
            jtype = {p.JOINT_REVOLUTE: "revolute", p.JOINT_PRISMATIC: "prismatic", p.JOINT_FIXED: "fixed"}.get(info[2], "revolute")
            if jtype == "fixed":
                continue
            joints.append(
                JointRec(
                    index=i,
                    name=info[1].decode() if isinstance(info[1], bytes) else str(info[1]),
                    type=jtype,
                    axis=list(info[13]),
                    parent=-1,
                    child=i,
                )
            )
            p.setJointMotorControl2(bid, i, p.VELOCITY_CONTROL, force=0, physicsClientId=self.client)
        vis = p.getVisualShapeData(bid, physicsClientId=self.client)
        links_map: dict[int, list[Geom]] = {}
        for v in vis:
            link_idx = int(v[1])
            gtype_i = int(v[2])
            dims = list(v[3])
            color = list(v[7]) if len(v) > 7 else [0.6, 0.6, 0.65, 1]
            lpos = list(v[5]) if len(v) > 5 else [0, 0, 0]
            lorn = list(v[6]) if len(v) > 6 else [0, 0, 0, 1]
            if gtype_i == p.GEOM_SPHERE:
                geom = Geom("sphere", [dims[0]], color, lpos, lorn)
            elif gtype_i == p.GEOM_CYLINDER:
                geom = Geom("cylinder", [dims[1], dims[0]], color, lpos, lorn)
            elif gtype_i == p.GEOM_CAPSULE:
                geom = Geom("capsule", [dims[1], dims[0]], color, lpos, lorn)
            else:
                # getVisualShapeData returns full extents for boxes
                geom = Geom("box", [max(d / 2, 0.005) for d in dims[:3]], color, lpos, lorn)
            links_map.setdefault(link_idx, []).append(geom)
        links = [LinkRec(index=i, name="base" if i < 0 else f"link_{i}", geoms=g) for i, g in sorted(links_map.items())]
        rec = BodyRec(
            id=bid,
            name=name,
            category="robots" if n else "objects",
            tags=["urdf"],
            capabilities=["urdf"],
            color="#8b93a7",
            links=links or [LinkRec(-1, "base", [Geom("box", [0.05, 0.05, 0.05], [0.5, 0.5, 0.5, 1])])],
            joints=joints,
            mass=1.0,
            spawned_at=list(pos),
            asset_id="urdf",
            created_by="agent",
        )
        self.register(rec)
        return rec

    def begin_traj(self) -> None:
        self._traj = []

    def end_traj(self) -> list[dict[str, Any]]:
        # downsample for storage
        data = self._traj
        self._traj = []
        if len(data) <= 90:
            return data
        step = max(1, len(data) // 90)
        return data[::step]

    def contacts_debug(self) -> list[dict[str, Any]]:
        pts = []
        for c in p.getContactPoints(physicsClientId=self.client)[:40]:
            pts.append({"p": list(c[5]), "n": list(c[7]), "f": c[9]})
        return pts


def reason_from(fallen: bool, dist: float | None, traveled: float) -> str:
    if fallen:
        return "fell"
    if dist is not None:
        return f"{dist:.2f}m from target"
    return f"traveled {traveled:.2f}m"
