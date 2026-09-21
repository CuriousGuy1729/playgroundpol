from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable


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
        }


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
