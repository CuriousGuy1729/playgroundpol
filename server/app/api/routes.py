from __future__ import annotations

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from pydantic import BaseModel

from ..lab import lab

router = APIRouter()


class PromptIn(BaseModel):
    text: str


class ControlIn(BaseModel):
    cmd: str
    value: float | None = None


@router.get("/api/health")
async def health():
    return {
        "ok": True,
        "llm": lab.agent.provider_info(),
        "bodies": len(lab.world.bodies),
        "time": lab.world.time,
    }


@router.get("/api/assets")
async def assets(q: str = ""):
    return lab.assets.search(q)


@router.get("/api/project")
async def project():
    return {
        "meta": lab.project.meta(),
        "experiments": lab.project.list_experiments(),
        "scene": lab.world.inspect(),
    }


@router.post("/api/project/save")
async def save_project():
    path = lab.project.save_scene(lab.world.scene_graph())
    return {"path": str(path)}


@router.post("/api/project/export")
async def export_project():
    path = lab.project.export_zip()
    return FileResponse(path, filename=path.name)


@router.get("/api/experiments")
async def experiments():
    return lab.project.list_experiments()


@router.post("/api/reset")
async def reset():
    lab.world.hard_reset()
    lab.agent.memory.clear_task()
    return {"ok": True}


@router.get("/api/llm")
async def llm_status():
    return lab.agent.provider_info()


@router.websocket("/ws")
async def ws_endpoint(ws: WebSocket):
    await ws.accept()
    await lab.register(ws)
    try:
        while True:
            raw = await ws.receive_json()
            await lab.handle_ws(raw)
    except WebSocketDisconnect:
        lab.unregister(ws)
    except Exception:
        lab.unregister(ws)
