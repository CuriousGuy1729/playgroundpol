from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .api.routes import router
from .config import ROOT
from .lab import lab


@asynccontextmanager
async def lifespan(app: FastAPI):
    await lab.boot()
    yield


app = FastAPI(title="PRISM Lab", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

dist = ROOT / "frontend" / "dist"
if dist.exists():
    app.mount("/", StaticFiles(directory=str(dist), html=True), name="ui")


def run() -> None:
    import uvicorn
    from .config import HOST, PORT

    uvicorn.run("server.app.main:app", host=HOST, port=PORT, reload=False)


if __name__ == "__main__":
    run()
