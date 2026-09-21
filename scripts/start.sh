#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -x .venv/bin/python ]]; then
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
fi

if [[ ! -d frontend/node_modules ]]; then
  (cd frontend && npm install)
fi

export PYTHONPATH="$ROOT"
.venv/bin/python -m uvicorn server.app.main:app --host 0.0.0.0 --port 8765 &
BACK=$!
trap 'kill $BACK 2>/dev/null || true' EXIT

cd frontend
npm run dev
