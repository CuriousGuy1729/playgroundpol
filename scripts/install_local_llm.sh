#!/usr/bin/env bash
# Compile llama-cpp-python (CPU) so GGUF files run in-process. No API key.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ ! -x .venv/bin/python ]]; then
  python3 -m venv .venv
  .venv/bin/pip install -r requirements.txt
fi
.venv/bin/pip install cmake ninja scikit-build-core wheel
export CMAKE_ARGS="-DGGML_NATIVE=OFF -DGGML_BLAS=OFF -DGGML_CUDA=OFF"
export FORCE_CMAKE=1
.venv/bin/pip install llama-cpp-python --no-build-isolation
.venv/bin/python -c "import llama_cpp; print('llama-cpp-python', llama_cpp.__version__, 'ready')"
echo "Next: open the models chip → Local → download TinyLlama or Llama 3.2 1B."
