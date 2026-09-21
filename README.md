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
bash scripts/start.sh
```

Open **port 5173**. The prompt bar is the product — type like you would to a lab partner.

---

## GitHub Codespaces

Yes. **One port: `5173`.** UI, API, and websocket all live there (Vite is not used in preview — it opens stray HMR ports).

```bash
bash scripts/start.sh
```

Then open **5173**. If you see **HTTP 502**, the process is not up yet — in the Codespace terminal run `bash scripts/start.sh` and wait until it prints `Uvicorn running on http://0.0.0.0:5173`. Set port 5173 **Public**. Ignore any random 4xxxx port — that is not the lab.

A 502 on `*.app.github.dev` means GitHub’s proxy found nothing on 5173. It is not a UI bug.

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

## Models — API keys and local Qwen

Click the **model chip** in the top bar. Paste a key and click **Use this model**. The lab then sends your prompt plus a physics system prompt to that API (it will not silently fall back to the built-in gait script).

**OpenRouter free tier:** after the key is saved, click **Load free models** and pick an id ending in `:free` (or `openrouter/free`). Paid model ids return 402.

### Cloud keys

Paste a key for any of:

OpenAI · Anthropic · Gemini · Groq · OpenRouter · Together · Mistral · DeepSeek · Fireworks · xAI · Ollama · llama.cpp / LM Studio · custom OpenAI-compatible URL

Keys are written to `data/secrets.json` on **this machine** (mode 0600), never to git, never to a remote PRISM server. Hit **Use this model** to switch the agent live.

### Local ~300 MB Qwen

The **Local Qwen** tab downloads a GGUF into the lab vault (`data/models/`):

| Pack | Size | Notes |
|---|---|---|
| Qwen2.5 0.5B Instruct Q3_K_M | ~308 MB | Compact experiment brain |
| Qwen2.5 0.5B Instruct Q4_K_M | ~398 MB | Better quality, still laptop-sized |

Progress streams over the websocket. **Use local Qwen** points the agent at those weights via `llama-cpp-python` if installed:

```bash
.venv/bin/pip install llama-cpp-python
```

A 0.5B model is for tinkering — if tool-calling is weak, PRISM falls back to the built-in experimenter with the same physics tools.

Env vars still work as a default when no hub selection is saved:

```bash
ollama pull qwen2.5:7b
export PRISM_LLM_PROVIDER=ollama
export PRISM_LLM_MODEL=qwen2.5:7b
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
- **PyBullet built-ins** from `pybullet_data`: R2D2, Husky, racecar, Laikago, A1, Mini Cheetah, quadruped, Minitaur, humanoid, KUKA iiwa, Franka Panda, xArm6, cartpole, duck, soccer ball, tray, table

---

## Research campaigns

The **research** chip in the top bar (or *“Run 1000 gait-search experiments and distill a dataset.”* in the prompt) starts a **headless** batch — separate PyBullet `DIRECT` clients, no 4× realtime throttle, no full trajectories.

| Use case | Default N | Why that N |
|---|---|---|
| Gait search | 1 000 | Covers freq × amplitude × phase; keep the positive gaits |
| Domain randomization | 10 000 | Percentiles on friction / gravity / mass |
| Wheeled navigation | 1 000 | Heading / speed / target draws (Husky, R2D2, racecar) |
| Arm reach | 1 000 | KUKA / Panda / xArm joint targets vs a cube |
| Cartpole | 10 000 | Cheap; this is the path toward 100k–1M |
| Impulse robustness | 1 000 | Stress table, not a new walk |

Presets: **100** (interactive) · **1k** · **10k** · **100k** · **1M**. A process shard caps at 100k (`PRISM_MAX_CAMPAIGN_TRIALS`); leftover N is `resumeFrom` in the manifest. Two parallel sims = two Bullet clients.

Each run writes `data/datasets/<id>/`:

```
manifest.json     schema, seed, resume offset
trials.jsonl      one compact row per trial (variation, action, reward, metrics)
successes.jsonl   positive class
distilled.jsonl   top 10% by reward (imitation slice)
summary.csv       spreadsheet view
README.md
```

`GET /api/campaigns` lists them; `GET /api/campaigns/<id>/download` zips the folder.

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
| `PRISM_HOST` / `PRISM_PORT` | `0.0.0.0` / `5173` | Lab bind (UI + API + WS) |

---

## Principle

Give the AI a world, tools, observations, physics, and an objective.
**Do not give it the answers.**
