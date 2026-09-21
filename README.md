# PRISM Lab

**A local-first AI Simulation Lab.** You talk to an agent in natural language. It gets a physics world, a toolbox, and observations — not the answers.

> “Make this robot walk to the red cube.”
> “Add a ramp and see what happens.”
> “Try solving it without changing the robot.”
> “Why did it fall?”

The loop is always:

**prompt → inspect → plan → act → PyBullet → observe → evaluate → modify → retry**

You can interrupt, redirect, or edit the scene at any moment. The agent continues from the new state.

---

## What this is

PRISM is a production-shaped **local** stack:

| Layer | Role |
|---|---|
| **PyBullet** | Authoritative rigid-body physics (joints, motors, contacts, gravity) |
| **FastAPI + WebSockets** | Local API, streaming poses, chat, timeline |
| **Qwen / Ollama / llama.cpp** | Optional language model for tool selection |
| **Built-in experimenter** | Same tools and loop when no LLM is running |
| **Three.js** | Live 3D lab — shadows, arena, selection, camera presets |
| **SQLite + JSON** | Projects, experiments, replay metadata |
| **Filesystem** | Assets, scenes, exported experiments |

Nothing here requires the cloud. Cloud providers can be plugged into the same LLM interface later.

The model **never** gets a shell, free filesystem, or a `walk()` primitive. It composes `inspect_scene`, `modify_controller`, `run_simulation`, `observe_state`, `evaluate_result`, and friends, then reads the physics.

---

## Quick start

```bash
# Python 3.11+, Node 20+
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cd frontend && npm install && cd ..

export PYTHONPATH="$(pwd)"
.venv/bin/python -m uvicorn server.app.main:app --host 0.0.0.0 --port 8765 &
cd frontend && npm run dev
```

Or: `bash scripts/start.sh`

Open the Vite URL. The prompt bar is the product — type like you would to a lab partner.

---

## Talk to it

| You | The lab |
|---|---|
| *Make this robot walk to the red cube.* | Inspects Pulse, searches gait parameters, runs PyBullet, scores distance vs. uprightness |
| *Try a different approach.* | Changes the controller family (phase pattern / amplitudes) |
| *Add a staircase.* | Procedural treads, then waits for the next objective |
| *Now make it climb.* | New objective, same robot, same memory |
| *Without changing the robot.* | Constraint: no morphology swap |
| *Stop* / *pause* / *undo* / *reset* / *explain* | Meta-commands, no experiment |

Shift-drag a body on the arena to move it. The agent treats that as the new world state.

---

## Local models (Qwen and friends)

PRISM auto-detects, in order:

1. **Ollama** at `http://127.0.0.1:11434` (default)
2. **OpenAI-compatible** servers (llama.cpp, vLLM, LM Studio) at `PRISM_LLM_BASE_URL`
3. **Built-in experimenter** — same tools, parameter-space search, no weights required

```bash
ollama pull qwen2.5:7b          # or qwen2.5:3b on smaller machines
export PRISM_LLM_PROVIDER=ollama
export PRISM_LLM_MODEL=qwen2.5:7b
export PRISM_LLM_BASE_URL=http://127.0.0.1:11434
```

```bash
# llama.cpp server
export PRISM_LLM_PROVIDER=llamacpp
export PRISM_LLM_BASE_URL=http://127.0.0.1:8080
export PRISM_LLM_MODEL=qwen2.5
```

The agent speaks OpenAI-style tool calls. The system prompt forbids recipes: no `walk()`, no `grab()`, no host access.

---

## Architecture

```
frontend (Vite / React / Three.js)
    │  /ws  /api          relative URLs, never localhost from the browser
    ▼
FastAPI  ─  Lab
              ├─ World (PyBullet DIRECT, Z-up, deterministic)
              ├─ Toolbelt (whitelisted, timeouts, body budget)
              ├─ Agent  (NLU + planner  or  LLM tool loop)
              ├─ Asset library
              └─ ProjectManager (JSON scenes, SQLite experiment index)
```

Simulation is the source of truth. The viewport is a renderer of streamed poses, not a second physics engine.

### Tools

`inspect_scene` `search_assets` `load_model` `create_body` `create_joint`
`set_physics` `apply_force` `set_motor` `modify_controller` `run_simulation`
`observe_state` `evaluate_result` `modify_scene` `save_experiment`

Controllers the agent may attach — **not** task solutions:

- oscillator (per-joint freq / amp / phase / offset)
- PD hold
- differential drive
- bounded external force

Walking, climbing, and carrying emerge from searching those parameters against PyBullet feedback.

---

## Projects

Everything is local:

```
data/projects/<name>/
├── assets/
├── scenes/
├── experiments/      # JSON + trajectory summaries
├── models/
├── scripts/
├── screenshots/
├── experiments.db    # SQLite index
└── project.json
```

`POST /api/project/export` writes a `.prism.zip`. Import is the reverse.

---

## Starter library

High-quality procedural assets, not a pile of broken meshes:

- **Pulse** — 8-DoF quadruped (default actor)
- **Kiosk** — biped
- **Hauler** — differential-drive mule
- **Reach** — 3-DoF arm
- box / sphere / cylinder / pole
- ramp, stairs, hinged door
- red target cube
- URDF load path (`assets/robots/cube.urdf` and any `.urdf` you drop in)

---

## Safety

- No host shell, no `eval`, no arbitrary Python from the model
- Tool whitelist only
- Force, duration, and body-count caps
- Simulation timeouts and cancel/interrupt
- Filesystem writes limited to `save_experiment` inside the project tree
- Isolated PyBullet client (`DIRECT`); recovery via checkpoint / reset

---

## Performance

- Pose **deltas** over WebSocket at ~30 Hz
- Experiments run at ~4× realtime so the viewport stays watchable
- Physics in a worker thread; UI never steps Bullet
- Bounded agent loops (`PRISM_MAX_ATTEMPTS`, default 8)

---

## Environment

| Variable | Default | Meaning |
|---|---|---|
| `PRISM_LLM_PROVIDER` | `auto` | `auto` / `ollama` / `llamacpp` / `builtin` |
| `PRISM_LLM_MODEL` | `qwen2.5` | Model name |
| `PRISM_LLM_BASE_URL` | `http://127.0.0.1:11434` | Ollama or OpenAI-compat base |
| `PRISM_LLM_API_KEY` | empty | Optional, for compatible gateways |
| `PRISM_MAX_ATTEMPTS` | `8` | Agent budget |
| `PRISM_MAX_EXPERIMENT_SECONDS` | `6` | Per `run_simulation` cap |
| `PRISM_HOST` / `PRISM_PORT` | `0.0.0.0` / `8765` | API bind |

---

## Principle

Give the AI a world, tools, observations, physics, and an objective.
**Do not give it the answers.**
