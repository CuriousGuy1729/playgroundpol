from __future__ import annotations

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = Path(os.getenv("PRISM_DATA", ROOT / "data"))
PROJECTS_DIR = DATA_DIR / "projects"
ASSETS_DIR = ROOT / "assets"
DEFAULT_PROJECT = os.getenv("PRISM_PROJECT", "arena")

LLM_PROVIDER = os.getenv("PRISM_LLM_PROVIDER", "auto")
LLM_MODEL = os.getenv("PRISM_LLM_MODEL", "qwen2.5")
LLM_BASE_URL = os.getenv("PRISM_LLM_BASE_URL", "http://127.0.0.1:11434")
LLM_API_KEY = os.getenv("PRISM_LLM_API_KEY", "")
LLM_TIMEOUT = float(os.getenv("PRISM_LLM_TIMEOUT", "120"))

SIM_DT = 1.0 / 240.0
STREAM_HZ = 30
MAX_ATTEMPTS = int(os.getenv("PRISM_MAX_ATTEMPTS", "8"))
MAX_EXPERIMENT_SECONDS = float(os.getenv("PRISM_MAX_EXPERIMENT_SECONDS", "6.0"))
MAX_FORCE = 400.0
MAX_BODIES = 80
AGENT_WALLCLOCK = float(os.getenv("PRISM_AGENT_WALLCLOCK", "180"))

HOST = os.getenv("PRISM_HOST", "0.0.0.0")
PORT = int(os.getenv("PRISM_PORT", "8765"))

for path in (DATA_DIR, PROJECTS_DIR, ASSETS_DIR):
    path.mkdir(parents=True, exist_ok=True)
