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

if [[ ! -f frontend/dist/index.html ]]; then
  (cd frontend && npm run build)
fi

export PYTHONPATH="$ROOT"
# One process, one port. Vite is not used in preview — it opens stray HMR ports.
exec .venv/bin/python -m uvicorn server.app.main:app --host 0.0.0.0 --port 5173
