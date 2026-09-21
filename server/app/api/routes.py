from __future__ import annotations

import asyncio

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import FileResponse
from pydantic import BaseModel

from ..lab import lab
from ..llm.hub import hub
from ..research.campaign import list_datasets, load_dataset, usecases_public

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


@router.get("/api/llm/hub")
async def llm_hub():
    return hub.snapshot()


class ProviderIn(BaseModel):
    provider_id: str
    api_key: str | None = None
    model: str | None = None
    base_url: str | None = None
    activate: bool = False


class ActivateIn(BaseModel):
    provider_id: str
    model: str | None = None


class DownloadIn(BaseModel):
    model_id: str


@router.get("/api/llm/models")
async def list_llm_models(provider_id: str = "openrouter", free_only: bool = True):
    return await hub.list_models(provider_id, free_only=free_only)


@router.post("/api/llm/keys")
async def save_key(body: ProviderIn):
    activate = body.activate
    key = (body.api_key or "").strip()
    if key and "••••" not in key:
        activate = True
    try:
        snap = hub.upsert_provider(
            body.provider_id,
            api_key=body.api_key,
            model=body.model,
            base_url=body.base_url,
            activate=activate,
        )
    except ValueError as e:
        raise HTTPException(400, str(e))
    if activate or hub.data.get("active_provider") == body.provider_id:
        await lab.agent.set_provider(hub.make_provider())
        lab.emit({"type": "llm", **lab.agent.provider_info(), "hub": snap})
        lab.emit({"type": "hub", **snap})
    return snap


@router.delete("/api/llm/keys/{provider_id}")
async def clear_key(provider_id: str):
    snap = hub.clear_key(provider_id)
    await lab.agent.set_provider(hub.make_provider())
    return snap


@router.post("/api/llm/activate")
async def activate_model(body: ActivateIn):
    try:
        snap = hub.activate(body.provider_id, body.model)
    except ValueError as e:
        raise HTTPException(400, str(e))
    await lab.agent.set_provider(hub.make_provider())
    lab.emit({"type": "llm", **lab.agent.provider_info(), "hub": snap})
    return snap


@router.post("/api/llm/test")
async def test_model(body: ActivateIn):
    return await hub.test_provider(body.provider_id)


@router.post("/api/llm/download")
async def download_model(body: DownloadIn):
    if hub.download.status == "running":
        raise HTTPException(409, "a download is already running")

    def progress(info: dict) -> None:
        lab.emit({"type": "download", **info})

    async def _run() -> None:
        try:
            snap = await hub.download_model(body.model_id, on_progress=progress)
            lab.emit({"type": "download", **snap["download"]})
            lab.emit({"type": "hub", **snap})
        except Exception as e:
            lab.emit({"type": "download", "status": "error", "error": str(e), "model_id": body.model_id})

    asyncio.create_task(_run())
    return {"ok": True, "download": hub.snapshot()["download"]}


@router.post("/api/llm/download/cancel")
async def cancel_download():
    hub.cancel_download()
    return {"ok": True}


@router.delete("/api/llm/local/{model_id}")
async def delete_local(model_id: str):
    loc = hub.local_by_id(model_id)
    if not loc:
        raise HTTPException(404, "unknown model")
    path = hub.gguf_path(loc["filename"])
    if path.exists():
        path.unlink()
    if hub.data.get("active_provider") == "local-gguf" and hub.data.get("active_model") == model_id:
        hub.activate("builtin")
        await lab.agent.set_provider(hub.make_provider())
    return hub.snapshot()


class CampaignIn(BaseModel):
    usecase: str = "gait_search"
    n: int | str = 1000
    asset: str | None = None
    workers: int = 1
    seed: int = 7
    horizon: float | None = None
    wallclock: float | None = None
    distill_top: float = 0.1
    axes: list[str] | None = None
    resume_from: int = 0
    id: str | None = None


@router.get("/api/research/usecases")
async def research_usecases():
    return usecases_public()


@router.get("/api/campaigns")
async def campaigns():
    return {"status": lab.campaign.snapshot(), "datasets": list_datasets()}


@router.get("/api/campaigns/status")
async def campaign_status():
    return lab.campaign.snapshot()


@router.get("/api/campaigns/{cid}")
async def campaign_one(cid: str):
    try:
        return load_dataset(cid)
    except FileNotFoundError:
        raise HTTPException(404, "dataset not found")


@router.post("/api/campaigns")
async def start_campaign(body: CampaignIn):
    spec = body.model_dump(exclude_none=True)
    try:
        return lab.campaign.start(spec)
    except (RuntimeError, ValueError) as e:
        raise HTTPException(409 if "already" in str(e) else 400, str(e))


@router.post("/api/campaigns/cancel")
async def cancel_campaign():
    return lab.campaign.cancel()


@router.get("/api/campaigns/{cid}/download")
async def download_campaign(cid: str):
    import zipfile
    from ..config import DATASETS_DIR

    folder = DATASETS_DIR / cid
    if not folder.exists():
        raise HTTPException(404, "dataset not found")
    zpath = folder / f"{cid}.zip"
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in folder.iterdir():
            if p.suffix == ".zip":
                continue
            zf.write(p, p.name)
    return FileResponse(zpath, filename=f"{cid}.zip")


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
