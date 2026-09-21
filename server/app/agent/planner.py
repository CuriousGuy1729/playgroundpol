from __future__ import annotations

import math
import random
from typing import Any

from .memory import ExperimentMemory
from .nlu import Intent


PHASE_PATTERNS = {
    "trot": {"fl": 0.0, "fr": math.pi, "hl": math.pi, "hr": 0.0},
    "bound": {"fl": 0.0, "fr": 0.0, "hl": math.pi, "hr": math.pi},
    "pace": {"fl": 0.0, "fr": math.pi, "hl": 0.0, "hr": math.pi},
    "walk": {"fl": 0.0, "fr": math.pi * 0.5, "hl": math.pi, "hr": math.pi * 1.5},
    "pronk": {"fl": 0.0, "fr": 0.0, "hl": 0.0, "hr": 0.0},
    "gallop": {"fl": 0.15, "fr": 0.45, "hl": math.pi + 0.1, "hr": math.pi + 0.4},
}


def _leg(name: str) -> str:
    n = name.lower()
    for k in ("fl", "fr", "hl", "hr"):
        if n.startswith(k):
            return k
    if "l_hip" in n or n.startswith("l_"):
        return "fl"
    if "r_hip" in n or n.startswith("r_"):
        return "fr"
    return "fl"


class Planner:
    """
    Parameter-space experimenter. It never calls a walk() primitive —
    it composes oscillators / diff-drive / PD from scene joints and
    hill-climbs using evaluation scores.
    """

    def __init__(self) -> None:
        self.rng = random.Random(11)

    def plan(self, intent: Intent, scene: dict[str, Any], memory: ExperimentMemory) -> dict[str, Any]:
        if intent.verb == "add":
            return self._add(intent, scene)
        if intent.verb == "load":
            return self._load(intent)
        if intent.verb == "physics":
            return {"strategy": "physics", "actions": [{"tool": "set_physics", "args": intent.extras}]}
        if intent.verb == "balance":
            return self._balance(scene)
        if intent.verb == "climb":
            return self._locomote(intent, scene, memory, climb=True)
        if intent.verb == "manipulate":
            return self._manipulate(intent, scene, memory)
        return self._locomote(intent, scene, memory, climb=False)

    def _add(self, intent: Intent, scene: dict[str, Any]) -> dict[str, Any]:
        asset = (intent.asset or intent.target or "ramp").split()[0]
        actor = _actor(scene)
        pos = [0.4, 0.0, 0.0]
        if actor:
            pos = [actor["position"][0] + 0.55, actor["position"][1], 0.0]
        return {
            "strategy": f"add_{asset}",
            "actions": [{"tool": "modify_scene", "args": {"op": "add", "what": asset, "position": pos}}],
            "narrate": f"Adding {asset} ahead of the robot so we can see how the body interacts with it.",
        }

    def _load(self, intent: Intent) -> dict[str, Any]:
        asset = intent.asset or "hauler"
        return {
            "strategy": f"load_{asset}",
            "actions": [
                {"tool": "search_assets", "args": {"query": asset}},
                {"tool": "load_model", "args": {"asset_id": asset, "position": [-0.5, 0.0, 0.0], "as_actor": True}},
            ],
            "narrate": f"Loading {asset} from the local library and making it the actor.",
        }

    def _balance(self, scene: dict[str, Any]) -> dict[str, Any]:
        actor = _actor(scene)
        if not actor:
            return {"strategy": "none", "actions": [], "narrate": "No robot in the scene."}
        targets = {j["name"]: j.get("rest", 0.0) for j in actor.get("joints", [])}
        return {
            "strategy": "hold_pose",
            "actions": [
                {
                    "tool": "modify_controller",
                    "args": {"body_id": actor["id"], "type": "pd", "targets": targets, "kp": 0.55, "kd": 1.2, "force": 24},
                },
                {"tool": "run_simulation", "args": {"seconds": 2.5}},
            ],
            "parameters": {"kp": 0.55},
            "narrate": "Holding the rest pose with a stiffer PD and watching whether the CoM stays over the support.",
        }

    def _manipulate(self, intent: Intent, scene: dict[str, Any], memory: ExperimentMemory) -> dict[str, Any]:
        actor = _actor(scene)
        if not actor:
            return {"strategy": "none", "actions": []}
        n = memory.next_id()
        # Nudge toward the target with a modest base force — still an experiment, not a solution.
        target = _target(scene, intent)
        pos = actor["position"]
        if target:
            dx = target["position"][0] - pos[0]
            dy = target["position"][1] - pos[1]
        else:
            dx, dy = 1.0, 0.0
        mag = 18.0 + 6.0 * (n % 3)
        return {
            "strategy": "impulse_nudge",
            "parameters": {"force": mag},
            "actions": [
                {"tool": "apply_force", "args": {"body_id": actor["id"], "force": [mag * _sign(dx), mag * _sign(dy), 4.0]}},
                {"tool": "run_simulation", "args": {"seconds": 2.0}},
            ],
            "narrate": "Applying a bounded impulse toward the object, then watching contacts and displacement.",
        }

    def _locomote(self, intent: Intent, scene: dict[str, Any], memory: ExperimentMemory, climb: bool) -> dict[str, Any]:
        actor = _actor(scene)
        if not actor:
            return {
                "strategy": "spawn_actor",
                "actions": [{"tool": "load_model", "args": {"asset_id": "pulse", "position": [-0.5, 0, 0], "as_actor": True}}],
                "narrate": "No robot in the scene — loading Pulse first.",
            }
        caps = actor.get("capabilities") or []
        if "locomotion_wheels" in caps:
            return self._wheels(actor, scene, intent, memory)
        if actor.get("joints"):
            return self._legs(actor, scene, intent, memory, climb)
        return self._manipulate(intent, scene, memory)

    def _wheels(self, actor: dict, scene: dict, intent: Intent, memory: ExperimentMemory) -> dict[str, Any]:
        n = memory.next_id()
        last = memory.last()
        linear = 0.45
        angular = 0.0
        target = _target(scene, intent)
        if target:
            desired = math.atan2(
                target["position"][1] - actor["position"][1],
                target["position"][0] - actor["position"][0],
            )
            err = _wrap(desired - actor.get("yaw", 0.0))
            angular = 1.6 * err
            linear = 0.55 if abs(err) < 0.6 else 0.15
        if last and last.score < 0.15:
            linear *= 1.3
        if last and last.evaluation.get("metrics", {}).get("fallen"):
            linear *= 0.5
        # jitter so we actually search
        linear += self.rng.uniform(-0.05, 0.08) * (n % 3)
        params = {"linear": round(linear, 3), "angular": round(angular, 3)}
        return {
            "strategy": "diff_drive_search",
            "parameters": params,
            "actions": [
                {
                    "tool": "modify_controller",
                    "args": {"body_id": actor["id"], "type": "diff_drive", **params, "force": 12.0},
                },
                {"tool": "run_simulation", "args": {"seconds": 3.2}},
            ],
            "narrate": f"Trying differential drive at linear={linear:.2f} m/s, angular={angular:.2f} rad/s and measuring approach to the target.",
        }

    def _legs(self, actor: dict, scene: dict, intent: Intent, memory: ExperimentMemory, climb: bool) -> dict[str, Any]:
        joints = actor.get("joints") or []
        hips = [j for j in joints if "hip" in j["name"]]
        knees = [j for j in joints if "knee" in j["name"]]
        n = memory.next_id()
        last = memory.last()
        best = memory.best()

        patterns = ["bound", "trot", "walk", "pace", "gallop", "pronk"]
        tried = {a.parameters.get("pattern") for a in memory.attempts}
        last_metrics = (last.evaluation.get("metrics") or {}) if last else {}
        last_travel = float(last_metrics.get("traveled") or 0.0)
        last_fallen = bool(last_metrics.get("fallen"))
        promising = bool(last and (not last_fallen) and last_travel > 0.25)

        if promising:
            base = dict(last.parameters)
            freq = float(base.get("freq", 1.0)) + self.rng.uniform(-0.04, 0.06)
            hip_amp = min(0.7, float(base.get("hip_amp", 0.5)) + 0.03 + self.rng.uniform(-0.02, 0.03))
            knee_amp = float(base.get("knee_amp", 0.2)) + self.rng.uniform(-0.02, 0.03)
            knee_off = float(base.get("knee_offset", -0.65)) + self.rng.uniform(-0.04, 0.02)
            pattern = str(base.get("pattern", "bound"))
            strategy = "hill_climb"
        elif last_fallen:
            remaining = [p for p in patterns if p not in tried] or patterns
            pattern = remaining[0]
            freq = 1.0
            hip_amp = 0.48
            knee_amp = 0.18
            knee_off = -0.7
            strategy = "recover_crouch"
        else:
            remaining = [p for p in patterns if p not in tried] or patterns
            pattern = remaining[0]
            freq = [1.0, 1.0, 1.1, 0.9, 1.3][(n - 1) % 5]
            hip_amp = [0.65, 0.5, 0.42, 0.55, 0.4][(n - 1) % 5]
            knee_amp = 0.2
            knee_off = [-0.7, -0.38, -0.55, -0.62][(n - 1) % 4]
            strategy = f"gait_search_{pattern}"

        # Heading correction via left/right amplitude bias.
        bias = 0.0
        target = _target(scene, intent)
        if target:
            desired = math.atan2(
                target["position"][1] - actor["position"][1],
                target["position"][0] - actor["position"][0],
            )
            err = _wrap(desired - actor.get("yaw", 0.0))
            bias = max(-0.18, min(0.18, 0.22 * err))

        if climb:
            hip_amp *= 0.85
            knee_off -= 0.1
            freq *= 0.85

        phases = PHASE_PATTERNS.get(pattern, PHASE_PATTERNS["trot"])
        joint_args: dict[str, Any] = {}
        for j in hips:
            leg = _leg(j["name"])
            amp = hip_amp
            if "l" in leg and bias:
                amp += bias
            if "r" in leg and bias:
                amp -= bias
            rest = float(j.get("rest") or j.get("position") or 0.0)
            joint_args[j["name"]] = {
                "freq": round(freq, 3),
                "amp": round(amp, 3),
                "phase": round(phases.get(leg, 0.0), 3),
                "offset": round(rest, 3),
                "force": 28.0,
            }
        for j in knees:
            leg = _leg(j["name"])
            rest = float(j.get("rest") or j.get("position") or -0.55)
            joint_args[j["name"]] = {
                "freq": round(freq, 3),
                "amp": round(knee_amp, 3),
                "phase": round(phases.get(leg, 0.0) + math.pi / 2, 3),
                "offset": round(knee_off, 3),
                "force": 24.0,
            }
        # If we somehow have joints that aren't hip/knee (biped names l_hip etc. already match).
        if not joint_args:
            for i, j in enumerate(joints):
                joint_args[j["name"]] = {
                    "freq": freq,
                    "amp": 0.35,
                    "phase": (i % 2) * math.pi,
                    "offset": float(j.get("rest") or 0),
                    "force": 18.0,
                }

        params = {
            "pattern": pattern,
            "freq": round(freq, 3),
            "hip_amp": round(hip_amp, 3),
            "knee_amp": round(knee_amp, 3),
            "knee_offset": round(knee_off, 3),
            "bias": round(bias, 3),
        }
        seconds = 5.6 if climb else 5.5
        return {
            "strategy": strategy,
            "parameters": params,
            "actions": [
                {
                    "tool": "modify_controller",
                    "args": {"body_id": actor["id"], "type": "oscillator", "joints": joint_args},
                },
                {"tool": "run_simulation", "args": {"seconds": seconds}},
            ],
            "narrate": (
                f"Open-loop {pattern} gait at {freq:.2f} Hz, hip amp {hip_amp:.2f} rad. "
                "I'll run physics and score displacement versus uprightness."
            ),
        }


def _actor(scene: dict[str, Any]) -> dict[str, Any] | None:
    aid = scene.get("actorId")
    for b in scene.get("bodies") or []:
        if b["id"] == aid:
            return b
    for b in scene.get("bodies") or []:
        if b.get("category") == "robots":
            return b
    return None


def _target(scene: dict[str, Any], intent: Intent) -> dict[str, Any] | None:
    tid = scene.get("targetId")
    bodies = scene.get("bodies") or []
    if intent and intent.target:
        q = intent.target.lower()
        for b in bodies:
            blob = " ".join([b.get("name", ""), " ".join(b.get("tags") or [])]).lower()
            if q in blob:
                return b
    for b in bodies:
        if b["id"] == tid:
            return b
    return None


def _wrap(a: float) -> float:
    while a > math.pi:
        a -= 2 * math.pi
    while a < -math.pi:
        a += 2 * math.pi
    return a


def _sign(x: float) -> float:
    return 0.0 if abs(x) < 1e-6 else (1.0 if x > 0 else -1.0)
