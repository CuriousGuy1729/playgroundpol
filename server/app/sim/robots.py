from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable

import pybullet as p

from .mathutil import as3, as4


RGBA = tuple[float, float, float, float]


@dataclass
class Geom:
    type: str
    size: list[float]
    color: list[float]
    local_pos: list[float] = field(default_factory=lambda: [0.0, 0.0, 0.0])
    local_orn: list[float] = field(default_factory=lambda: [0.0, 0.0, 0.0, 1.0])
    metalness: float = 0.55
    roughness: float = 0.42
    emissive: list[float] | None = None
    role: str = "body"  # body | joint | foot | accent | eye

    def to_dict(self) -> dict[str, Any]:
        d: dict[str, Any] = {
            "type": self.type,
            "size": self.size,
            "color": self.color,
            "localPos": self.local_pos,
            "localOrn": self.local_orn,
            "metalness": self.metalness,
            "roughness": self.roughness,
            "role": self.role,
        }
        if self.emissive:
            d["emissive"] = self.emissive
        return d


@dataclass
class LinkRec:
    index: int
    name: str
    geoms: list[Geom]
    mass: float = 0.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "index": self.index,
            "name": self.name,
            "mass": self.mass,
            "geoms": [g.to_dict() for g in self.geoms],
        }


@dataclass
class JointRec:
    index: int
    name: str
    type: str
    axis: list[float]
    parent: int
    child: int
    lower: float = -3.14
    upper: float = 3.14
    rest: float = 0.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "index": self.index,
            "name": self.name,
            "type": self.type,
            "axis": self.axis,
            "parent": self.parent,
            "child": self.child,
            "lower": self.lower,
            "upper": self.upper,
            "rest": self.rest,
        }


@dataclass
class BodyRec:
    id: int
    name: str
    category: str
    tags: list[str]
    capabilities: list[str]
    color: str
    links: list[LinkRec]
    joints: list[JointRec]
    mass: float
    spawned_at: list[float]
    asset_id: str = ""
    created_by: str = "system"

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "tags": self.tags,
            "capabilities": self.capabilities,
            "color": self.color,
            "links": [l.to_dict() for l in self.links],
            "joints": [j.to_dict() for j in self.joints],
            "mass": self.mass,
            "spawnedAt": self.spawned_at,
            "assetId": self.asset_id,
            "createdBy": self.created_by,
        }

    def joint_by_name(self, name: str) -> JointRec | None:
        name_l = name.lower()
        for j in self.joints:
            if j.name.lower() == name_l:
                return j
        return None

    def joints_matching(self, *needles: str) -> list[JointRec]:
        out = []
        for j in self.joints:
            n = j.name.lower()
            if any(s in n for s in needles):
                out.append(j)
        return out


def _shape(client: int, geom: Geom, collision: bool) -> int:
    rgba = geom.color if len(geom.color) == 4 else [*geom.color, 1.0]
    if geom.type == "box":
        if collision:
            return p.createCollisionShape(p.GEOM_BOX, halfExtents=geom.size, physicsClientId=client)
        return p.createVisualShape(
            p.GEOM_BOX, halfExtents=geom.size, rgbaColor=rgba, physicsClientId=client
        )
    if geom.type == "sphere":
        if collision:
            return p.createCollisionShape(p.GEOM_SPHERE, radius=geom.size[0], physicsClientId=client)
        return p.createVisualShape(
            p.GEOM_SPHERE, radius=geom.size[0], rgbaColor=rgba, physicsClientId=client
        )
    if geom.type == "cylinder":
        if collision:
            return p.createCollisionShape(
                p.GEOM_CYLINDER, radius=geom.size[0], height=geom.size[1], physicsClientId=client
            )
        return p.createVisualShape(
            p.GEOM_CYLINDER,
            radius=geom.size[0],
            length=geom.size[1],
            rgbaColor=rgba,
            physicsClientId=client,
        )
    if geom.type == "capsule":
        if collision:
            return p.createCollisionShape(
                p.GEOM_CAPSULE, radius=geom.size[0], height=geom.size[1], physicsClientId=client
            )
        return p.createVisualShape(
            p.GEOM_CAPSULE,
            radius=geom.size[0],
            length=geom.size[1],
            rgbaColor=rgba,
            physicsClientId=client,
        )
    raise ValueError(f"unknown geom {geom.type}")


def _joint_enum(kind: str) -> int:
    return {
        "revolute": p.JOINT_REVOLUTE,
        "prismatic": p.JOINT_PRISMATIC,
        "fixed": p.JOINT_FIXED,
        "spherical": p.JOINT_SPHERICAL,
    }.get(kind, p.JOINT_REVOLUTE)


class MultiBodyBuilder:
    def __init__(self, name: str):
        self.name = name
        self.base_mass = 0.0
        self.base_geom: Geom | None = None
        self.base_pos = [0.0, 0.0, 0.2]
        self.base_orn = [0.0, 0.0, 0.0, 1.0]
        self.base_name = "base"
        self.links: list[dict[str, Any]] = []

    def set_base(self, mass: float, geom: Geom, pos: list[float], name: str = "base") -> "MultiBodyBuilder":
        self.base_mass = mass
        self.base_geom = geom
        self.base_pos = list(pos)
        self.base_name = name
        return self

    def add_link(
        self,
        name: str,
        parent: int,
        mass: float,
        geom: Geom,
        joint_type: str,
        joint_axis: list[float],
        joint_pos: list[float],
        joint_orn: list[float] | None = None,
        inertial: list[float] | None = None,
        rest: float = 0.0,
        lower: float = -3.14,
        upper: float = 3.14,
    ) -> int:
        idx = len(self.links)
        self.links.append(
            {
                "name": name,
                "parent": parent,
                "mass": mass,
                "geom": geom,
                "joint_type": joint_type,
                "joint_axis": joint_axis,
                "joint_pos": joint_pos,
                "joint_orn": joint_orn or [0, 0, 0, 1],
                "inertial": inertial or [0, 0, 0],
                "rest": rest,
                "lower": lower,
                "upper": upper,
            }
        )
        return idx

    def build(self, client: int) -> tuple[int, list[LinkRec], list[JointRec]]:
        assert self.base_geom is not None
        base_col = _shape(client, self.base_geom, True)
        base_vis = _shape(client, self.base_geom, False)
        n = len(self.links)
        kwargs: dict[str, Any] = {
            "baseMass": self.base_mass,
            "baseCollisionShapeIndex": base_col,
            "baseVisualShapeIndex": base_vis,
            "basePosition": self.base_pos,
            "baseOrientation": self.base_orn,
            "physicsClientId": client,
        }
        if n:
            kwargs.update(
                {
                    "linkMasses": [l["mass"] for l in self.links],
                    "linkCollisionShapeIndices": [_shape(client, l["geom"], True) for l in self.links],
                    "linkVisualShapeIndices": [_shape(client, l["geom"], False) for l in self.links],
                    "linkPositions": [l["joint_pos"] for l in self.links],
                    "linkOrientations": [l["joint_orn"] for l in self.links],
                    "linkInertialFramePositions": [l["inertial"] for l in self.links],
                    "linkInertialFrameOrientations": [[0, 0, 0, 1]] * n,
                    "linkParentIndices": [l["parent"] for l in self.links],
                    "linkJointTypes": [_joint_enum(l["joint_type"]) for l in self.links],
                    "linkJointAxis": [l["joint_axis"] for l in self.links],
                }
            )
        body_id = p.createMultiBody(**kwargs)
        links = [LinkRec(index=-1, name=self.base_name, geoms=[self.base_geom], mass=self.base_mass)]
        joints: list[JointRec] = []
        for i, l in enumerate(self.links):
            links.append(LinkRec(index=i, name=l["name"], geoms=[l["geom"]], mass=l["mass"]))
            if l["joint_type"] != "fixed":
                joints.append(
                    JointRec(
                        index=i,
                        name=l["name"] if not l["name"].endswith("_link") else l["name"][:-5],
                        type=l["joint_type"],
                        axis=list(l["joint_axis"]),
                        parent=l["parent"] - 1 if l["parent"] > 0 else -1,
                        child=i,
                        lower=l["lower"],
                        upper=l["upper"],
                        rest=l["rest"],
                    )
                )
        return body_id, links, joints


METAL = [0.16, 0.18, 0.22, 1.0]
METAL_2 = [0.22, 0.24, 0.28, 1.0]
DARK = [0.08, 0.09, 0.11, 1.0]
ACCENT = [0.18, 0.78, 0.70, 1.0]
RUBBER = [0.09, 0.09, 0.10, 1.0]


def spawn_pulse(client: int, pos: list[float] | None = None) -> tuple[int, BodyRec, dict[int, float]]:
    """Low-slung 8-DoF quadruped. Capable of walking; no gait is baked in."""
    x, y = (pos or [0.0, 0.0, 0.0])[:2]
    body_l, body_w, body_h = 0.36, 0.20, 0.08
    upper_len, lower_len = 0.10, 0.10
    cap_r = 0.016
    hip_x, hip_y = 0.125, 0.105
    rest_hip_f, rest_hip_r = 0.28, -0.18
    rest_knee = -0.62
    z = 0.055 + (upper_len + lower_len) * 0.72
    b = MultiBodyBuilder("pulse")
    b.set_base(
        3.2,
        Geom("box", [body_l / 2, body_w / 2, body_h / 2], METAL, metalness=0.72, roughness=0.32),
        [x, y, z],
        "torso",
    )
    # parent 0 = base. Links: 0 fl_hip, 1 fl_knee, 2 fr_hip, 3 fr_knee, 4 hl_hip, 5 hl_knee, 6 hr_hip, 7 hr_knee
    legs = [
        ("fl", [hip_x, hip_y, -body_h / 2], rest_hip_f, 0),
        ("fr", [hip_x, -hip_y, -body_h / 2], rest_hip_f, 0),
        ("hl", [-hip_x, hip_y, -body_h / 2], rest_hip_r, 0),
        ("hr", [-hip_x, -hip_y, -body_h / 2], rest_hip_r, 0),
    ]
    rest: dict[int, float] = {}
    for name, attach, hip_rest, _parent in legs:
        hip_i = b.add_link(
            f"{name}_hip",
            0,
            0.28,
            Geom("capsule", [cap_r, upper_len], METAL_2, role="joint"),
            "revolute",
            [0, 1, 0],
            attach,
            inertial=[0, 0, -upper_len / 2],
            rest=hip_rest,
            lower=-1.4,
            upper=1.4,
        )
        rest[hip_i] = hip_rest
        knee_i = b.add_link(
            f"{name}_knee",
            hip_i + 1,  # parent index: base=0, so this link's pybullet parent is hip_i+1
            0.22,
            Geom("capsule", [cap_r * 1.1, lower_len], DARK, role="foot", roughness=0.85, metalness=0.1),
            "revolute",
            [0, 1, 0],
            [0, 0, -upper_len],
            inertial=[0, 0, -lower_len / 2],
            rest=rest_knee,
            lower=-2.2,
            upper=0.2,
        )
        rest[knee_i] = rest_knee

    body_id, links, joints = b.build(client)
    rec = BodyRec(
        id=body_id,
        name="Pulse",
        category="robots",
        tags=["quadruped", "legged", "walker", "pulse"],
        capabilities=["locomotion_legs"],
        color="#3ee0c5",
        links=links,
        joints=joints,
        mass=3.2 + 4 * 0.5,
        spawned_at=[x, y, z],
        asset_id="pulse",
    )
    _finish_robot(client, body_id, rec, rest, foot_links=[1, 3, 5, 7])
    return body_id, rec, rest


def spawn_biped(client: int, pos: list[float] | None = None) -> tuple[int, BodyRec, dict[int, float]]:
    x, y = (pos or [0.0, 0.0, 0.0])[:2]
    z = 0.42
    b = MultiBodyBuilder("kiosk")
    b.set_base(
        4.0,
        Geom("box", [0.10, 0.07, 0.14], METAL, metalness=0.7),
        [x, y, z],
        "torso",
    )
    head_i = b.add_link(
        "head",
        0,
        0.4,
        Geom("sphere", [0.055], METAL_2, role="eye", emissive=[0.05, 0.35, 0.32]),
        "fixed",
        [0, 0, 1],
        [0, 0, 0.18],
        inertial=[0, 0, 0],
    )
    rest: dict[int, float] = {}
    for side, ysign in (("l", 1.0), ("r", -1.0)):
        hip = b.add_link(
            f"{side}_hip",
            0,
            0.45,
            Geom("capsule", [0.03, 0.14], METAL_2, role="joint"),
            "revolute",
            [0, 1, 0],
            [0, ysign * 0.07, -0.14],
            inertial=[0, 0, -0.07],
            rest=0.25,
            lower=-1.2,
            upper=1.4,
        )
        rest[hip] = 0.25
        knee = b.add_link(
            f"{side}_knee",
            hip + 1,
            0.35,
            Geom("capsule", [0.028, 0.13], DARK, role="foot", roughness=0.8, metalness=0.12),
            "revolute",
            [0, 1, 0],
            [0, 0, -0.14],
            inertial=[0, 0, -0.065],
            rest=-0.45,
            lower=-2.0,
            upper=0.1,
        )
        rest[knee] = -0.45
        _ = head_i
    body_id, links, joints = b.build(client)
    rec = BodyRec(
        id=body_id,
        name="Kiosk",
        category="robots",
        tags=["biped", "humanoid", "legged", "kiosk"],
        capabilities=["locomotion_legs"],
        color="#7a6cff",
        links=links,
        joints=joints,
        mass=6.0,
        spawned_at=[x, y, z],
        asset_id="kiosk",
    )
    _finish_robot(client, body_id, rec, rest, foot_links=[2, 4])
    return body_id, rec, rest


def spawn_hauler(client: int, pos: list[float] | None = None) -> tuple[int, BodyRec, dict[int, float]]:
    x, y = (pos or [0.0, 0.0, 0.0])[:2]
    z = 0.075
    b = MultiBodyBuilder("hauler")
    b.set_base(
        2.4,
        Geom("box", [0.18, 0.12, 0.05], METAL, metalness=0.65),
        [x, y, z],
        "chassis",
    )
    wheel_r, wheel_w = 0.055, 0.03
    rest: dict[int, float] = {}
    for name, attach, axis in (
        ("wheel_l", [-0.02, 0.145, -0.02], [0, 1, 0]),
        ("wheel_r", [-0.02, -0.145, -0.02], [0, 1, 0]),
    ):
        i = b.add_link(
            name,
            0,
            0.25,
            Geom("cylinder", [wheel_r, wheel_w], DARK, role="foot", roughness=0.9, metalness=0.05),
            "revolute",
            axis,
            attach,
            joint_orn=p.getQuaternionFromEuler([1.5708, 0, 0]),
            inertial=[0, 0, 0],
        )
        rest[i] = 0.0
    # passive caster
    b.add_link(
        "caster",
        0,
        0.08,
        Geom("sphere", [0.03], RUBBER, role="foot", roughness=0.95, metalness=0.05),
        "fixed",
        [0, 0, 1],
        [0.14, 0, -0.04],
        inertial=[0, 0, 0],
    )
    body_id, links, joints = b.build(client)
    rec = BodyRec(
        id=body_id,
        name="Hauler",
        category="robots",
        tags=["wheeled", "vehicle", "hauler", "differential"],
        capabilities=["locomotion_wheels"],
        color="#f0a05a",
        links=links,
        joints=joints,
        mass=3.0,
        spawned_at=[x, y, z],
        asset_id="hauler",
    )
    _finish_robot(client, body_id, rec, rest, foot_links=[0, 1, 2], wheel=True)
    return body_id, rec, rest


def spawn_arm(client: int, pos: list[float] | None = None) -> tuple[int, BodyRec, dict[int, float]]:
    x, y = (pos or [0.0, 0.0, 0.0])[:2]
    b = MultiBodyBuilder("reach")
    b.set_base(
        0.0,
        Geom("cylinder", [0.07, 0.04], METAL, metalness=0.7),
        [x, y, 0.02],
        "pedestal",
    )
    rest: dict[int, float] = {}
    shoulder = b.add_link(
        "shoulder",
        0,
        0.6,
        Geom("capsule", [0.028, 0.18], METAL_2, role="joint"),
        "revolute",
        [0, 0, 1],
        [0, 0, 0.04],
        inertial=[0, 0, 0.09],
        rest=0.4,
    )
    rest[shoulder] = 0.4
    elbow = b.add_link(
        "elbow",
        shoulder + 1,
        0.4,
        Geom("capsule", [0.022, 0.16], ACCENT, role="accent", metalness=0.4, roughness=0.3),
        "revolute",
        [0, 1, 0],
        [0, 0, 0.18],
        inertial=[0, 0, 0.08],
        rest=0.8,
        lower=-2.4,
        upper=2.4,
    )
    rest[elbow] = 0.8
    wrist = b.add_link(
        "wrist",
        elbow + 1,
        0.15,
        Geom("box", [0.03, 0.03, 0.04], DARK, role="joint"),
        "revolute",
        [0, 1, 0],
        [0, 0, 0.16],
        inertial=[0, 0, 0.02],
        rest=0.3,
    )
    rest[wrist] = 0.3
    body_id, links, joints = b.build(client)
    rec = BodyRec(
        id=body_id,
        name="Reach",
        category="robots",
        tags=["arm", "manipulator", "reach"],
        capabilities=["manipulation"],
        color="#3ee0c5",
        links=links,
        joints=joints,
        mass=1.2,
        spawned_at=[x, y, 0.02],
        asset_id="reach",
    )
    _finish_robot(client, body_id, rec, rest, foot_links=[])
    return body_id, rec, rest


def _finish_robot(
    client: int,
    body_id: int,
    rec: BodyRec,
    rest: dict[int, float],
    foot_links: list[int],
    wheel: bool = False,
) -> None:
    n = p.getNumJoints(body_id, physicsClientId=client)
    for i in range(n):
        info = p.getJointInfo(body_id, i, physicsClientId=client)
        # name joints from our records
        p.changeDynamics(
            body_id,
            i,
            linearDamping=0.04,
            angularDamping=0.04,
            physicsClientId=client,
        )
        if i in foot_links:
            p.changeDynamics(
                body_id,
                i,
                lateralFriction=1.45 if not wheel else 1.6,
                spinningFriction=0.08,
                rollingFriction=0.002 if wheel else 0.02,
                restitution=0.0,
                physicsClientId=client,
            )
        else:
            p.changeDynamics(
                body_id,
                i,
                lateralFriction=0.6,
                restitution=0.0,
                physicsClientId=client,
            )
        # Disable the default velocity motor so we fully own actuation.
        p.setJointMotorControl2(
            body_id,
            i,
            p.VELOCITY_CONTROL,
            force=0,
            physicsClientId=client,
        )
        if i in rest:
            p.resetJointState(body_id, i, rest[i], physicsClientId=client)
            p.setJointMotorControl2(
                body_id,
                i,
                p.POSITION_CONTROL,
                targetPosition=rest[i],
                positionGain=0.35,
                velocityGain=1.0,
                force=22.0 if not wheel else 6.0,
                physicsClientId=client,
            )
        _ = info
    p.changeDynamics(
        body_id,
        -1,
        lateralFriction=0.5,
        linearDamping=0.03,
        angularDamping=0.04,
        physicsClientId=client,
    )


def spawn_box(
    client: int,
    pos: list[float],
    size: list[float],
    mass: float,
    color: list[float],
    name: str,
    **extra: Any,
) -> tuple[int, BodyRec]:
    hx, hy, hz = size[0] / 2, size[1] / 2, size[2] / 2
    geom = Geom("box", [hx, hy, hz], color, metalness=extra.get("metalness", 0.15), roughness=extra.get("roughness", 0.55))
    col = _shape(client, geom, True)
    vis = _shape(client, geom, False)
    body = p.createMultiBody(
        mass,
        col,
        vis,
        [pos[0], pos[1], pos[2]],
        physicsClientId=client,
    )
    p.changeDynamics(body, -1, lateralFriction=extra.get("friction", 0.6), restitution=0.05, physicsClientId=client)
    rec = BodyRec(
        id=body,
        name=name,
        category=extra.get("category", "objects"),
        tags=extra.get("tags", ["box", "primitive"]),
        capabilities=extra.get("capabilities", ["manipulable"]),
        color=extra.get("hex", "#c4544a"),
        links=[LinkRec(-1, "base", [geom], mass)],
        joints=[],
        mass=mass,
        spawned_at=list(pos),
        asset_id=extra.get("asset_id", "box"),
        created_by=extra.get("created_by", "system"),
    )
    return body, rec


def spawn_sphere(client: int, pos: list[float], radius: float, mass: float, color: list[float], name: str, **extra: Any) -> tuple[int, BodyRec]:
    geom = Geom("sphere", [radius], color, roughness=0.3, metalness=0.2)
    col = _shape(client, geom, True)
    vis = _shape(client, geom, False)
    body = p.createMultiBody(mass, col, vis, pos, physicsClientId=client)
    p.changeDynamics(body, -1, lateralFriction=0.4, restitution=0.35, physicsClientId=client)
    rec = BodyRec(
        id=body,
        name=name,
        category="objects",
        tags=["sphere", "primitive", "ball"],
        capabilities=["manipulable"],
        color=extra.get("hex", "#7a6cff"),
        links=[LinkRec(-1, "base", [geom], mass)],
        joints=[],
        mass=mass,
        spawned_at=list(pos),
        asset_id="sphere",
        created_by=extra.get("created_by", "system"),
    )
    return body, rec


def spawn_cylinder(client: int, pos: list[float], radius: float, height: float, mass: float, color: list[float], name: str, **extra: Any) -> tuple[int, BodyRec]:
    geom = Geom("cylinder", [radius, height], color)
    col = _shape(client, geom, True)
    vis = _shape(client, geom, False)
    body = p.createMultiBody(mass, col, vis, pos, physicsClientId=client)
    rec = BodyRec(
        id=body,
        name=name,
        category="objects",
        tags=["cylinder", "primitive"],
        capabilities=["manipulable"],
        color=extra.get("hex", "#8b93a7"),
        links=[LinkRec(-1, "base", [geom], mass)],
        joints=[],
        mass=mass,
        spawned_at=list(pos),
        asset_id="cylinder",
        created_by=extra.get("created_by", "system"),
    )
    return body, rec


def spawn_ramp(client: int, pos: list[float], length: float = 1.6, width: float = 0.8, height: float = 0.35, **extra: Any) -> tuple[int, BodyRec]:
    # A thin box rotated to form an incline. Top of ramp at +X.
    import math

    angle = math.atan2(height, length)
    hx, hy, hz = length / 2, width / 2, 0.03
    geom = Geom("box", [hx, hy, hz], [0.22, 0.24, 0.27, 1], metalness=0.3, roughness=0.7)
    col = _shape(client, geom, True)
    vis = _shape(client, geom, False)
    orn = p.getQuaternionFromEuler([0, -angle, 0])
    # Place so the low end sits on the floor near pos
    cx = pos[0] + length / 2 * math.cos(angle)
    cz = height / 2 + 0.02
    body = p.createMultiBody(0, col, vis, [cx, pos[1], cz], orn, physicsClientId=client)
    p.changeDynamics(body, -1, lateralFriction=1.1, physicsClientId=client)
    rec = BodyRec(
        id=body,
        name=extra.get("name", "Ramp"),
        category="environments",
        tags=["ramp", "incline", "environment"],
        capabilities=["static"],
        color="#5c6478",
        links=[LinkRec(-1, "base", [geom], 0)],
        joints=[],
        mass=0,
        spawned_at=[cx, pos[1], cz],
        asset_id="ramp",
        created_by=extra.get("created_by", "agent"),
    )
    return body, rec


def spawn_stairs(
    client: int,
    pos: list[float],
    steps: int = 5,
    rise: float = 0.08,
    depth: float = 0.22,
    width: float = 0.9,
    **extra: Any,
) -> list[tuple[int, BodyRec]]:
    out = []
    color = [0.20, 0.22, 0.26, 1]
    for i in range(steps):
        h = rise * (i + 1)
        cx = pos[0] + depth * i + depth / 2
        cz = h / 2
        geom = Geom("box", [depth / 2, width / 2, h / 2], color, metalness=0.25, roughness=0.7)
        col = _shape(client, geom, True)
        vis = _shape(client, geom, False)
        body = p.createMultiBody(0, col, vis, [cx, pos[1], cz], physicsClientId=client)
        p.changeDynamics(body, -1, lateralFriction=1.2, physicsClientId=client)
        rec = BodyRec(
            id=body,
            name=f"Stair {i + 1}",
            category="environments",
            tags=["stairs", "step", "environment"],
            capabilities=["static"],
            color="#4a5160",
            links=[LinkRec(-1, "base", [geom], 0)],
            joints=[],
            mass=0,
            spawned_at=[cx, pos[1], cz],
            asset_id="stairs",
            created_by=extra.get("created_by", "agent"),
        )
        out.append((body, rec))
    return out


def spawn_door(client: int, pos: list[float], **extra: Any) -> tuple[int, BodyRec, dict[int, float]]:
    b = MultiBodyBuilder("door")
    b.set_base(
        0.0,
        Geom("box", [0.04, 0.04, 0.5], METAL, metalness=0.6),
        [pos[0], pos[1], 0.5],
        "frame",
    )
    door = b.add_link(
        "panel",
        0,
        1.2,
        Geom("box", [0.02, 0.28, 0.48], [0.45, 0.32, 0.22, 1], roughness=0.6, metalness=0.2),
        "revolute",
        [0, 0, 1],
        [0, 0.04, 0],
        inertial=[0, 0.28, 0],
        lower=-1.8,
        upper=1.8,
    )
    body_id, links, joints = b.build(client)
    rec = BodyRec(
        id=body_id,
        name="Door",
        category="environments",
        tags=["door", "hinge", "environment"],
        capabilities=["articulated"],
        color="#c4a574",
        links=links,
        joints=joints,
        mass=1.2,
        spawned_at=list(pos),
        asset_id="door",
        created_by=extra.get("created_by", "agent"),
    )
    rest = {door: 0.0}
    _finish_robot(client, body_id, rec, rest, foot_links=[])
    return body_id, rec, rest


def spawn_arena_floor(client: int, radius: float = 2.6) -> tuple[int, BodyRec]:
    # Thin static cylinder as the test platform.
    geom = Geom(
        "cylinder",
        [radius, 0.08],
        [0.07, 0.08, 0.10, 1],
        metalness=0.15,
        roughness=0.85,
        role="body",
    )
    col = _shape(client, geom, True)
    vis = _shape(client, geom, False)
    body = p.createMultiBody(0, col, vis, [0, 0, -0.04], physicsClientId=client)
    p.changeDynamics(body, -1, lateralFriction=1.05, restitution=0.0, physicsClientId=client)
    rec = BodyRec(
        id=body,
        name="Arena",
        category="environments",
        tags=["arena", "floor", "ground"],
        capabilities=["static"],
        color="#12151c",
        links=[LinkRec(-1, "base", [geom], 0)],
        joints=[],
        mass=0,
        spawned_at=[0, 0, -0.04],
        asset_id="arena",
        created_by="system",
    )
    return body, rec


SPAWNERS: dict[str, Callable] = {
    "pulse": spawn_pulse,
    "kiosk": spawn_biped,
    "hauler": spawn_hauler,
    "reach": spawn_arm,
    "ramp": spawn_ramp,
    "door": spawn_door,
}


def apply_rest_pose(client: int, body_id: int, rest: dict[int, float], force: float = 22.0) -> None:
    for i, angle in rest.items():
        p.resetJointState(body_id, i, angle, physicsClientId=client)
        p.setJointMotorControl2(
            body_id,
            i,
            p.POSITION_CONTROL,
            targetPosition=angle,
            positionGain=0.4,
            velocityGain=1.0,
            force=force,
            physicsClientId=client,
        )
