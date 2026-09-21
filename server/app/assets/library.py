from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class Asset:
    id: str
    name: str
    category: str
    tags: list[str]
    capabilities: list[str]
    description: str
    joints: int = 0
    scale: float = 1.0
    collision: str = "primitive"
    file_path: str = ""
    color: str = "#8b93a7"
    origin: str = "prism"
    fixed_base: bool = False
    spawn_z: float = 0.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "tags": self.tags,
            "capabilities": self.capabilities,
            "description": self.description,
            "joints": self.joints,
            "scale": self.scale,
            "collision": self.collision,
            "filePath": self.file_path,
            "color": self.color,
            "origin": self.origin,
            "fixedBase": self.fixed_base,
            "spawnZ": self.spawn_z,
        }


def _pb(
    id: str,
    name: str,
    category: str,
    tags: list[str],
    capabilities: list[str],
    description: str,
    file_path: str,
    joints: int = 0,
    color: str = "#8b93a7",
    fixed_base: bool = False,
    spawn_z: float = 0.0,
) -> Asset:
    return Asset(
        id,
        name,
        category,
        tags + ["pybullet"],
        capabilities,
        description,
        joints=joints,
        file_path=file_path,
        color=color,
        origin="pybullet",
        fixed_base=fixed_base,
        collision="mesh",
        spawn_z=spawn_z,
    )


CATALOG: list[Asset] = [
    Asset(
        "pulse",
        "Pulse",
        "robots",
        ["quadruped", "legged", "walker"],
        ["locomotion_legs"],
        "Low-slung 8-DoF research quadruped. Stable enough to experiment with gaits.",
        joints=8,
        color="#3ee0c5",
    ),
    Asset(
        "kiosk",
        "Kiosk",
        "robots",
        ["biped", "humanoid", "legged"],
        ["locomotion_legs"],
        "Compact biped with hip and knee hinges. Challenging balance.",
        joints=4,
        color="#7a6cff",
    ),
    Asset(
        "hauler",
        "Hauler",
        "robots",
        ["wheeled", "vehicle", "differential"],
        ["locomotion_wheels"],
        "Differential-drive lab mule with two actuated wheels and a caster.",
        joints=2,
        color="#f0a05a",
    ),
    Asset(
        "reach",
        "Reach",
        "robots",
        ["arm", "manipulator"],
        ["manipulation"],
        "3-DoF pedestal arm for reaching and pushing experiments.",
        joints=3,
        color="#3ee0c5",
    ),
    Asset(
        "red_cube",
        "Red Cube",
        "objects",
        ["box", "cube", "target", "red"],
        ["manipulable"],
        "Glossy 18cm target cube.",
        color="#e23d42",
    ),
    Asset(
        "box",
        "Box",
        "objects",
        ["box", "primitive", "crate"],
        ["manipulable"],
        "Generic rigid box.",
        color="#c4a574",
    ),
    Asset(
        "sphere",
        "Sphere",
        "objects",
        ["sphere", "ball", "primitive"],
        ["manipulable"],
        "Free-rolling sphere.",
        color="#7a6cff",
    ),
    Asset(
        "cylinder",
        "Cylinder",
        "objects",
        ["cylinder", "primitive"],
        ["manipulable"],
        "Upright cylinder.",
        color="#8b93a7",
    ),
    Asset(
        "ramp",
        "Ramp",
        "environments",
        ["ramp", "incline"],
        ["static"],
        "Inclined plane the agent can add to a scene.",
        color="#5c6478",
    ),
    Asset(
        "stairs",
        "Stairs",
        "environments",
        ["stairs", "steps"],
        ["static"],
        "Procedural staircase of rigid treads.",
        color="#4a5160",
    ),
    Asset(
        "door",
        "Door",
        "environments",
        ["door", "hinge"],
        ["articulated"],
        "Hinged door panel on a static frame.",
        joints=1,
        color="#c4a574",
    ),
    Asset(
        "pole",
        "Pole",
        "objects",
        ["pole", "obstacle"],
        ["static"],
        "Vertical obstacle pole.",
        color="#3ee0c5",
    ),
    # PyBullet built-in URDFs (pybullet_data)
    _pb("r2d2", "R2D2", "robots", ["wheeled", "r2d2"], ["locomotion_wheels"], "PyBullet built-in R2D2.", "r2d2.urdf", 2, "#cfd6e4", spawn_z=0.4),
    _pb("husky", "Husky", "robots", ["wheeled", "vehicle"], ["locomotion_wheels"], "Clearpath Husky (PyBullet).", "husky/husky.urdf", 4, "#f0a05a", spawn_z=0.15),
    _pb("racecar", "Racecar", "robots", ["wheeled", "vehicle"], ["locomotion_wheels"], "PyBullet racecar.", "racecar/racecar.urdf", 4, "#e23d42", spawn_z=0.05),
    _pb("laikago", "Laikago", "robots", ["quadruped", "legged"], ["locomotion_legs"], "Unitree Laikago (PyBullet).", "laikago/laikago.urdf", 12, "#3ee0c5", spawn_z=0.48),
    _pb("a1", "Unitree A1", "robots", ["quadruped", "legged"], ["locomotion_legs"], "Unitree A1 (PyBullet).", "a1/a1.urdf", 12, "#7a6cff", spawn_z=0.42),
    _pb("mini_cheetah", "Mini Cheetah", "robots", ["quadruped", "legged"], ["locomotion_legs"], "MIT Mini Cheetah (PyBullet).", "mini_cheetah/mini_cheetah.urdf", 12, "#8b93a7", spawn_z=0.28),
    _pb("quadruped", "Quadruped", "robots", ["quadruped", "legged"], ["locomotion_legs"], "PyBullet generic quadruped.", "quadruped/quadruped.urdf", 8, "#3ee0c5", spawn_z=0.32),
    _pb("minitaur", "Minitaur", "robots", ["quadruped", "legged"], ["locomotion_legs"], "Ghost Minitaur (PyBullet).", "quadruped/minitaur.urdf", 8, "#f0a05a", spawn_z=0.2),
    _pb("humanoid", "Humanoid", "robots", ["biped", "humanoid"], ["locomotion_legs"], "PyBullet humanoid.", "humanoid/humanoid.urdf", 15, "#7a6cff", spawn_z=1.05),
    _pb("kuka", "KUKA iiwa", "robots", ["arm", "manipulator"], ["manipulation"], "KUKA LBR iiwa (PyBullet).", "kuka_iiwa/model.urdf", 7, "#c4a574", True, 0.0),
    _pb("panda", "Franka Panda", "robots", ["arm", "manipulator"], ["manipulation"], "Franka Emika Panda (PyBullet).", "franka_panda/panda.urdf", 7, "#e23d42", True, 0.0),
    _pb("xarm", "xArm 6", "robots", ["arm", "manipulator"], ["manipulation"], "UFactory xArm6 (PyBullet).", "xarm/xarm6_robot.urdf", 6, "#3ee0c5", True, 0.0),
    _pb("cartpole", "Cartpole", "robots", ["classic", "balance"], ["balance"], "Classic cart-pole (PyBullet).", "cartpole.urdf", 1, "#f0a05a", spawn_z=0.0),
    _pb("duck", "Duck", "objects", ["mesh", "manipulable"], ["manipulable"], "VHACD duck mesh (PyBullet).", "duck_vhacd.urdf", 0, "#f0a05a", spawn_z=0.12),
    _pb("soccerball", "Soccer ball", "objects", ["sphere", "ball"], ["manipulable"], "Soccer ball URDF (PyBullet).", "soccerball.urdf", 0, "#e9eef6", spawn_z=0.12),
    _pb("pb_cube", "Cube (URDF)", "objects", ["cube"], ["manipulable"], "PyBullet cube.urdf.", "cube.urdf", 0, "#e23d42", spawn_z=0.1),
    _pb("tray", "Tray", "objects", ["tray"], ["static"], "Tabletop tray (PyBullet).", "tray/tray.urdf", 0, "#c4a574", spawn_z=0.0),
    _pb("table", "Table", "environments", ["table"], ["static"], "PyBullet table.", "table/table.urdf", 0, "#5c6478", spawn_z=0.0),
    _pb("teddy", "Teddy", "objects", ["mesh"], ["manipulable"], "Teddy mesh (PyBullet).", "teddy_vhacd.urdf", 0, "#c4a574", spawn_z=0.15),
]


class AssetLibrary:
    def __init__(self) -> None:
        self.assets = {a.id: a for a in CATALOG}

    def all(self) -> list[dict[str, Any]]:
        return [a.to_dict() for a in self.assets.values()]

    def get(self, asset_id: str) -> Asset | None:
        return self.assets.get(asset_id)

    def search(self, query: str) -> list[dict[str, Any]]:
        q = (query or "").lower().strip()
        if not q:
            return self.all()
        scored: list[tuple[int, Asset]] = []
        for a in self.assets.values():
            blob = " ".join([a.id, a.name, a.category, a.description] + a.tags + a.capabilities).lower()
            score = 0
            if q == a.id or q == a.name.lower():
                score += 10
            if q in a.name.lower() or q in a.id:
                score += 5
            for t in a.tags:
                if q in t or t in q:
                    score += 3
            if q in blob:
                score += 1
            if score:
                scored.append((score, a))
        scored.sort(key=lambda x: -x[0])
        return [a.to_dict() for _, a in scored]
