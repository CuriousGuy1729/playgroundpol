from __future__ import annotations

import asyncio
import json
import time
from typing import Any

from fastapi import WebSocket

from .agent.agent import Agent
from .assets.library import AssetLibrary
from .config import SIM_DT, STREAM_HZ
from .projects.manager import ProjectManager
from .sim.world import World


class Lab:
    def __init__(self) -> None:
        self.world = World()
        self.assets = AssetLibrary()
        self.project = ProjectManager()
        self.clients: set[WebSocket] = set()
        self.queue: asyncio.Queue[dict[str, Any]] = asyncio.Queue()
        self.agent = Agent(self.world, self.assets, self.project, self.emit)
        self._pump: asyncio.Task | None = None
        self._play: asyncio.Task | None = None
        self.started = False
        self.loop: asyncio.AbstractEventLoop | None = None

    def emit(self, msg: dict[str, Any]) -> None:
        def _put() -> None:
            try:
                self.queue.put_nowait(msg)
            except Exception:
                pass

        loop = self.loop
        if loop and loop.is_running():
            try:
                loop.call_soon_threadsafe(_put)
                return
            except Exception:
                pass
        _put()

    async def boot(self) -> None:
        if self.started:
            return
        self.loop = asyncio.get_running_loop()
        self.world.load_default_arena()
        await self.agent.boot()
        self._pump = asyncio.create_task(self._broadcast_pump())
        self._play = asyncio.create_task(self._play_loop())
        self.started = True

    async def _broadcast_pump(self) -> None:
        while True:
            msg = await self.queue.get()
            data = json.dumps(msg, default=str)
            dead = []
            for ws in list(self.clients):
                try:
                    await ws.send_text(data)
                except Exception:
                    dead.append(ws)
            for ws in dead:
                self.clients.discard(ws)

    async def _play_loop(self) -> None:
        """Realtime playback when the user hits Play (not during agent bursts)."""
        period = 1.0 / STREAM_HZ
        acc = 0.0
        last = time.perf_counter()
        while True:
            now = time.perf_counter()
            dt = now - last
            last = now
            if self.world.running and not self.agent.busy:
                acc += dt * max(0.05, min(self.world.speed, 8.0))
                steps = int(acc / SIM_DT)
                if steps:
                    acc -= steps * SIM_DT
                    steps = min(steps, 24)
                    loop = asyncio.get_event_loop()
                    await loop.run_in_executor(None, lambda s=steps: self.world.step(s, record=False))
                    self.emit({"type": "poses", **self.world.capture_poses()})
            await asyncio.sleep(period)

    async def register(self, ws: WebSocket) -> None:
        self.clients.add(ws)
        from .llm.hub import hub

        await ws.send_text(
            json.dumps(
                {
                    "type": "hello",
                    "llm": self.agent.provider_info(),
                    "hub": hub.snapshot(),
                    "project": self.project.meta(),
                },
                default=str,
            )
        )
        await ws.send_text(json.dumps({"type": "scene", **self.world.scene_graph()}, default=str))
        await ws.send_text(json.dumps({"type": "poses", **self.world.capture_poses()}, default=str))
        await ws.send_text(
            json.dumps(
                {
                    "type": "chat",
                    "role": "assistant",
                    "content": "Arena live. Pulse is on the mark, red cube ahead. Tell me what to try — I only get general tools and the physics.",
                }
            )
        )

    def unregister(self, ws: WebSocket) -> None:
        self.clients.discard(ws)

    async def handle_ws(self, msg: dict[str, Any]) -> None:
        kind = msg.get("type")
        if kind == "prompt":
            text = (msg.get("text") or "").strip()
            if text:
                asyncio.create_task(self.agent.handle_user(text))
        elif kind == "control":
            await self._control(msg)
        elif kind == "edit":
            self._edit(msg)
        elif kind == "select":
            pass

    async def _control(self, msg: dict[str, Any]) -> None:
        cmd = msg.get("cmd")
        if cmd == "play":
            self.world.running = True
            self.emit({"type": "status", "sim": "play"})
        elif cmd == "pause":
            self.world.running = False
            self.emit({"type": "status", "sim": "pause"})
        elif cmd == "step":
            self.world.running = False
            self.world.step(8)
            self.emit({"type": "poses", **self.world.capture_poses()})
        elif cmd == "reset":
            self.agent.interrupt("stop")
            self.world.hard_reset()
            self.agent.memory.clear_task()
            self.emit({"type": "scene", **self.world.scene_graph()})
            self.emit({"type": "poses", **self.world.capture_poses()})
            self.emit({"type": "status", "sim": "pause", "agent": "idle"})
        elif cmd == "speed":
            self.world.speed = float(msg.get("value") or 1)
        elif cmd == "stop_agent":
            self.agent.interrupt("stop")
            self.world.hold_pose()
            self.emit({"type": "status", "agent": "idle"})
        elif cmd == "undo":
            self.world.undo()
            self.emit({"type": "scene", **self.world.scene_graph()})
            self.emit({"type": "poses", **self.world.capture_poses()})

    def _edit(self, msg: dict[str, Any]) -> None:
        bid = int(msg.get("id"))
        if bid not in self.world.bodies:
            return
        pos = msg.get("position")
        if pos:
            # Frontend sends Three.js Y-up if it converted; we expect Z-up pybullet coords.
            self.world.teleport(bid, [float(pos[0]), float(pos[1]), float(pos[2])])
            self.world.mark_checkpoint()
            self.emit({"type": "poses", **self.world.capture_poses()})
            self.emit({"type": "chat", "role": "system", "content": f"User moved {self.world.bodies[bid].name}. I'll continue from this state."})


lab = Lab()
