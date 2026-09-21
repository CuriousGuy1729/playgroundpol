from __future__ import annotations

import math
import time
from typing import Any, Callable

import pybullet as p

from ..config import MAX_EXPERIMENT_SECONDS, SIM_DT
from ..sim import robots
from ..sim.world import World


class ToolError(Exception):
    pass


class Toolbelt:
    """Whitelisted tools. The model never gets a shell or free filesystem."""

    def __init__(self, world: World, assets, project, on_frame: Callable | None = None) -> None:
        self.world = world
        self.assets = assets
        self.project = project
        self.on_frame = on_frame
        self._cancel = False

    def cancel(self) -> None:
        self._cancel = True

    def reset_cancel(self) -> None:
        self._cancel = False

    def call(self, name: str, args: dict[str, Any] | None = None) -> Any:
        args = args or {}
        fn = getattr(self, name, None)
        if not fn or name.startswith("_"):
            raise ToolError(f"unknown tool {name}")
        return fn(**args)

    def inspect_scene(self) -> dict[str, Any]:
        return self.world.inspect()

    def search_assets(self, query: str = "") -> list[dict[str, Any]]:
        return self.assets.search(query)

    def load_model(
        self,
        asset_id: str,
        position: list[float] | None = None,
        as_actor: bool = False,
        created_by: str = "agent",
    ) -> dict[str, Any]:
        pos = position or [0.0, 0.0, 0.0]
        world = self.world
        with world._lock:
            catalog = self.assets.get(asset_id) if self.assets else None
            is_robot = asset_id in ("pulse", "kiosk", "hauler", "reach") or (
                catalog is not None and catalog.category == "robots"
            )
            if as_actor and is_robot and world.actor_id and world.actor_id in world.bodies:
                old = world.actor_id
                old_pos, _ = world.get_pose(old)
                if position is None:
                    pos = [old_pos[0], old_pos[1], pos[2] if pos else 0.0]
                world.remove(old)
            if asset_id in ("pulse", "kiosk", "hauler", "reach"):
                fn = {
                    "pulse": robots.spawn_pulse,
                    "kiosk": robots.spawn_biped,
                    "hauler": robots.spawn_hauler,
                    "reach": robots.spawn_arm,
                }[asset_id]
                bid, rec, rest = fn(world.client, pos)
                rec.created_by = created_by
                world.register(rec, rest)
                if as_actor:
                    world.actor_id = bid
                    world.hold_pose(bid)
                    world._settle(80)
                    world.mark_checkpoint()
                return rec.to_dict()
            if catalog and catalog.file_path:
                spawn = list(pos)
                if (position is None or len(position) < 3 or abs(float(position[2])) < 1e-6) and catalog.spawn_z:
                    spawn[2] = float(catalog.spawn_z)
                rec = world.load_urdf(
                    catalog.file_path,
                    spawn,
                    name=catalog.name,
                    asset_id=catalog.id,
                    tags=catalog.tags,
                    capabilities=catalog.capabilities,
                    color=catalog.color,
                    category=catalog.category,
                    fixed_base=catalog.fixed_base,
                    created_by=created_by,
                )
                if as_actor and catalog.category == "robots":
                    world.actor_id = rec.id
                    world._settle(60)
                    world.mark_checkpoint()
                return rec.to_dict()
            if asset_id in ("ramp",):
                bid, rec = robots.spawn_ramp(world.client, pos, created_by=created_by)
                world.register(rec)
                return rec.to_dict()
            if asset_id in ("stairs",):
                items = robots.spawn_stairs(world.client, pos, created_by=created_by)
                for bid, rec in items:
                    world.register(rec)
                return {"created": [r.to_dict() for _, r in items]}
            if asset_id == "door":
                bid, rec, rest = robots.spawn_door(world.client, pos, created_by=created_by)
                world.register(rec, rest)
                return rec.to_dict()
            if asset_id in ("box", "red_cube", "crate"):
                color = [0.86, 0.14, 0.16, 1] if "red" in asset_id or asset_id == "red_cube" else [0.72, 0.58, 0.38, 1]
                z = pos[2] if len(pos) > 2 and pos[2] > 0.01 else 0.09
                bid, rec = robots.spawn_box(
                    world.client, [pos[0], pos[1], z], [0.18, 0.18, 0.18], 0.4, color, "Cube", created_by=created_by
                )
                world.register(rec)
                return rec.to_dict()
            if asset_id in ("sphere", "ball"):
                bid, rec = robots.spawn_sphere(
                    world.client, [pos[0], pos[1], 0.08], 0.07, 0.2, [0.45, 0.4, 0.9, 1], "Sphere", created_by=created_by
                )
                world.register(rec)
                return rec.to_dict()
            if asset_id == "cylinder":
                bid, rec = robots.spawn_cylinder(
                    world.client, [pos[0], pos[1], 0.1], 0.06, 0.18, 0.3, [0.5, 0.55, 0.6, 1], "Cylinder", created_by=created_by
                )
                world.register(rec)
                return rec.to_dict()
            if str(asset_id).endswith(".urdf"):
                from ..config import ROOT

                path = asset_id if asset_id.startswith("/") else str(ROOT / asset_id)
                rec = world.load_urdf(path, pos, name=path.split("/")[-1])
                rec.created_by = created_by
                if as_actor:
                    world.actor_id = rec.id
                return rec.to_dict()
            if asset_id == "pole":
                bid, rec = robots.spawn_cylinder(
                    world.client, [pos[0], pos[1], 0.25], 0.03, 0.5, 0.0, [0.2, 0.75, 0.68, 1], "Pole", created_by=created_by
                )
                rec.capabilities = ["static"]
                world.register(rec)
                return rec.to_dict()
        raise ToolError(f"unknown asset {asset_id}")

    def create_body(
        self,
        shape: str = "box",
        size: list[float] | None = None,
        mass: float = 0.4,
        position: list[float] | None = None,
        color: list[float] | None = None,
        name: str = "Body",
    ) -> dict[str, Any]:
        pos = position or [0, 0, 0.2]
        col = color or [0.7, 0.7, 0.72, 1]
        world = self.world
        with world._lock:
            if shape == "sphere":
                r = (size[0] if size else 0.08)
                bid, rec = robots.spawn_sphere(world.client, pos, r, mass, col, name, created_by="agent")
            elif shape == "cylinder":
                r = size[0] if size else 0.06
                h = size[1] if size and len(size) > 1 else 0.16
                bid, rec = robots.spawn_cylinder(world.client, pos, r, h, mass, col, name, created_by="agent")
            else:
                sz = size or [0.16, 0.16, 0.16]
                if len(sz) == 1:
                    sz = [sz[0], sz[0], sz[0]]
                bid, rec = robots.spawn_box(world.client, pos, sz, mass, col, name, created_by="agent")
            rec.created_by = "agent"
            world.register(rec)
            return rec.to_dict()

    def create_joint(
        self,
        body_a: int,
        body_b: int,
        joint_type: str = "fixed",
        pivot_a: list[float] | None = None,
        pivot_b: list[float] | None = None,
        axis: list[float] | None = None,
    ) -> dict[str, Any]:
        jt = {
            "fixed": p.JOINT_FIXED,
            "hinge": getattr(p, "JOINT_HINGE", p.JOINT_POINT2POINT),
            "revolute": getattr(p, "JOINT_HINGE", p.JOINT_POINT2POINT),
            "slider": p.JOINT_PRISMATIC,
            "prismatic": p.JOINT_PRISMATIC,
            "point2point": p.JOINT_POINT2POINT,
        }.get(joint_type, p.JOINT_FIXED)
        cid = p.createConstraint(
            body_a,
            -1,
            body_b,
            -1,
            jt,
            axis or [0, 0, 1],
            pivot_a or [0, 0, 0],
            pivot_b or [0, 0, 0],
            physicsClientId=self.world.client,
        )
        return {"constraint": cid, "type": joint_type, "a": body_a, "b": body_b}

    def set_physics(self, **kwargs: Any) -> dict[str, Any]:
        return self.world.set_physics(**kwargs)

    def apply_force(self, body_id: int, force: list[float], position: list[float] | None = None) -> dict[str, Any]:
        self.world.apply_force(int(body_id), list(force), position)
        return {"ok": True, "body_id": body_id, "force": force}

    def set_motor(self, body_id: int, joint: Any, mode: str = "position", value: float = 0.0, force: float = 16.0) -> dict[str, Any]:
        return self.world.set_motor(int(body_id), joint, mode, float(value), float(force))

    def modify_controller(self, body_id: int, **spec: Any) -> dict[str, Any]:
        return self.world.set_controller(int(body_id), spec)

    def run_simulation(self, seconds: float | None = None, steps: int | None = None, realtime: bool = True) -> dict[str, Any]:
        if steps is None:
            seconds = min(float(seconds or 2.0), MAX_EXPERIMENT_SECONDS)
            steps = int(seconds / SIM_DT)
        else:
            steps = min(int(steps), int(MAX_EXPERIMENT_SECONDS / SIM_DT))
        self.world.begin_traj()
        batch = 48
        done = 0
        t0 = time.perf_counter()
        play_speed = 4.0
        while done < steps:
            if self._cancel:
                break
            n = min(batch, steps - done)
            self.world.step(n, record=realtime, on_frame=self.on_frame if realtime else None)
            done += n
            if realtime:
                # Keep the viewport watchable (~4× realtime) without blocking the UI thread.
                target = done * SIM_DT / play_speed
                extra = target - (time.perf_counter() - t0)
                if extra > 0:
                    time.sleep(min(extra, 0.08))
        traj = self.world.end_traj()
        obs = self.world.observe()
        return {"steps": done, "time": self.world.time, "frames": len(traj), "observation": obs, "cancelled": self._cancel}

    def observe_state(self, body_id: int | None = None) -> dict[str, Any]:
        return self.world.observe(body_id)

    def evaluate_result(self, objective: str = "reach") -> dict[str, Any]:
        return self.world.evaluate(objective)

    def modify_scene(
        self,
        op: str,
        what: str | None = None,
        body_id: int | None = None,
        position: list[float] | None = None,
        steps: int | None = None,
        **kwargs: Any,
    ) -> dict[str, Any]:
        op = op.lower()
        if op == "add":
            w = (what or "ramp").lower()
            pos = position or [0.6, 0.0, 0.0]
            if "stair" in w:
                return self.load_model("stairs", pos)
            if "ramp" in w:
                return self.load_model("ramp", pos)
            if "door" in w:
                return self.load_model("door", pos)
            if "cube" in w or "box" in w:
                return self.load_model("red_cube" if "red" in w else "box", pos)
            if "sphere" in w or "ball" in w:
                return self.load_model("sphere", pos)
            return self.load_model(w, pos)
        if op in ("remove", "delete") and body_id is not None:
            self.world.remove(int(body_id))
            return {"removed": body_id}
        if op in ("move", "teleport") and body_id is not None and position:
            self.world.teleport(int(body_id), position)
            return {"moved": body_id, "position": position}
        if op == "reset":
            self.world.reset_to_checkpoint()
            return {"ok": True}
        raise ToolError(f"unsupported modify_scene op {op}")

    def save_experiment(self, name: str = "experiment", payload: dict | None = None) -> dict[str, Any]:
        data = payload or {"name": name, "scene": self.world.inspect()}
        data.setdefault("name", name)
        path = self.project.save_experiment(data)
        return {"path": str(path)}
