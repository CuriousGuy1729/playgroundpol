from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any

import pybullet as p


@dataclass
class JointOsc:
    index: int
    freq: float = 1.2
    amp: float = 0.35
    phase: float = 0.0
    offset: float = 0.0
    kp: float = 0.35
    kd: float = 0.8
    force: float = 18.0
    mode: str = "position"  # position | velocity


@dataclass
class OscillatorBank:
    kind: str = "oscillator"
    joints: list[JointOsc] = field(default_factory=list)

    def tick(self, client: int, body_id: int, t: float) -> None:
        for j in self.joints:
            if j.mode == "velocity":
                vel = j.amp * 2 * math.pi * j.freq * math.cos(2 * math.pi * j.freq * t + j.phase)
                vel += j.offset
                p.setJointMotorControl2(
                    body_id,
                    j.index,
                    p.VELOCITY_CONTROL,
                    targetVelocity=vel,
                    force=j.force,
                    physicsClientId=client,
                )
            else:
                target = j.offset + j.amp * math.sin(2 * math.pi * j.freq * t + j.phase)
                p.setJointMotorControl2(
                    body_id,
                    j.index,
                    p.POSITION_CONTROL,
                    targetPosition=target,
                    positionGain=j.kp,
                    velocityGain=j.kd,
                    force=j.force,
                    physicsClientId=client,
                )


@dataclass
class PDHold:
    kind: str = "pd"
    targets: dict[int, float] = field(default_factory=dict)
    kp: float = 0.4
    kd: float = 1.0
    force: float = 16.0

    def tick(self, client: int, body_id: int, t: float) -> None:
        for idx, target in self.targets.items():
            p.setJointMotorControl2(
                body_id,
                idx,
                p.POSITION_CONTROL,
                targetPosition=target,
                positionGain=self.kp,
                velocityGain=self.kd,
                force=self.force,
                physicsClientId=client,
            )


@dataclass
class DiffDrive:
    kind: str = "diff_drive"
    left: int = 0
    right: int = 1
    linear: float = 0.0
    angular: float = 0.0
    wheel_radius: float = 0.05
    track: float = 0.22
    force: float = 8.0

    def tick(self, client: int, body_id: int, t: float) -> None:
        v_l = (self.linear - self.angular * self.track * 0.5) / max(self.wheel_radius, 1e-4)
        v_r = (self.linear + self.angular * self.track * 0.5) / max(self.wheel_radius, 1e-4)
        for idx, vel in ((self.left, v_l), (self.right, v_r)):
            p.setJointMotorControl2(
                body_id,
                idx,
                p.VELOCITY_CONTROL,
                targetVelocity=vel,
                force=self.force,
                physicsClientId=client,
            )


@dataclass
class WheelBank:
    """N-wheel differential drive (Husky, R2D2, racecar)."""

    kind: str = "wheels"
    left: list[int] = field(default_factory=list)
    right: list[int] = field(default_factory=list)
    linear: float = 0.4
    angular: float = 0.0
    wheel_radius: float = 0.165
    track: float = 0.55
    force: float = 24.0

    def tick(self, client: int, body_id: int, t: float) -> None:
        v_l = (self.linear - self.angular * self.track * 0.5) / max(self.wheel_radius, 1e-4)
        v_r = (self.linear + self.angular * self.track * 0.5) / max(self.wheel_radius, 1e-4)
        for idx in self.left:
            p.setJointMotorControl2(
                body_id,
                int(idx),
                p.VELOCITY_CONTROL,
                targetVelocity=v_l,
                force=self.force,
                physicsClientId=client,
            )
        for idx in self.right:
            p.setJointMotorControl2(
                body_id,
                int(idx),
                p.VELOCITY_CONTROL,
                targetVelocity=v_r,
                force=self.force,
                physicsClientId=client,
            )


@dataclass
class ConstantForce:
    kind: str = "force"
    vec: tuple[float, float, float] = (0.0, 0.0, 0.0)
    link: int = -1

    def tick(self, client: int, body_id: int, t: float) -> None:
        if abs(self.vec[0]) + abs(self.vec[1]) + abs(self.vec[2]) < 1e-8:
            return
        p.applyExternalForce(
            body_id,
            self.link,
            self.vec,
            [0, 0, 0],
            p.LINK_FRAME,
            physicsClientId=client,
        )


Controller = OscillatorBank | PDHold | DiffDrive | WheelBank | ConstantForce


def controller_to_dict(c: Controller) -> dict[str, Any]:
    if isinstance(c, OscillatorBank):
        return {
            "type": "oscillator",
            "joints": [
                {
                    "index": j.index,
                    "freq": j.freq,
                    "amp": j.amp,
                    "phase": j.phase,
                    "offset": j.offset,
                    "force": j.force,
                    "mode": j.mode,
                }
                for j in c.joints
            ],
        }
    if isinstance(c, PDHold):
        return {"type": "pd", "targets": c.targets, "kp": c.kp, "kd": c.kd, "force": c.force}
    if isinstance(c, DiffDrive):
        return {
            "type": "diff_drive",
            "left": c.left,
            "right": c.right,
            "linear": c.linear,
            "angular": c.angular,
        }
    if isinstance(c, WheelBank):
        return {
            "type": "wheels",
            "left": list(c.left),
            "right": list(c.right),
            "linear": c.linear,
            "angular": c.angular,
            "wheel_radius": c.wheel_radius,
            "track": c.track,
            "force": c.force,
        }
    if isinstance(c, ConstantForce):
        return {"type": "force", "vec": c.vec, "link": c.link}
    return {"type": "unknown"}
