from __future__ import annotations

import asyncio
import json
import time
import traceback
from typing import Any, AsyncIterator, Callable

from ..config import MAX_ATTEMPTS
from ..llm.base import LLMProvider, Message, detect_provider
from ..sim.world import World
from .education import build_lesson
from .memory import Attempt, ExperimentMemory
from .nlu import Intent, parse_intent
from .planner import Planner
from .prompts import SYSTEM, TOOL_SCHEMAS
from .tools import ToolError, Toolbelt


Emit = dict[str, Any]


class Agent:
    def __init__(self, world: World, assets, project, broadcast: Callable[[Emit], Any]) -> None:
        self.world = world
        self.assets = assets
        self.project = project
        self.broadcast = broadcast
        self.memory = ExperimentMemory()
        self.planner = Planner()
        self.provider: LLMProvider | None = None
        self.busy = False
        self._task: asyncio.Task | None = None
        self._cancel = asyncio.Event()
        self.paused = False
        self.history: list[Message] = [Message(role="system", content=SYSTEM)]
        self.tools = Toolbelt(world, assets, project, on_frame=self._on_frame)
        self.context: dict[str, Any] = {}

    async def boot(self) -> None:
        self.provider = await detect_provider()

    async def set_provider(self, provider: LLMProvider) -> None:
        self.provider = provider
        self.history = [Message(role="system", content=SYSTEM)]
        await self._emit({"type": "llm", **self.provider_info()})

    def provider_info(self) -> dict[str, Any]:
        if not self.provider:
            return {"provider": "none", "online": False, "model": ""}
        info = self.provider.info()
        from ..llm.hub import hub

        snap = hub.snapshot()
        info["active_provider"] = snap.get("active_provider")
        info["active_model"] = snap.get("active_model")
        return info

    def _on_frame(self, sample: dict[str, Any]) -> None:
        # Called from the sim thread; broadcast is async-safe via the lab queue.
        try:
            self.broadcast({"type": "poses", **sample})
        except Exception:
            pass

    def interrupt(self, kind: str = "stop") -> None:
        self._cancel.set()
        self.tools.cancel()
        if kind == "pause":
            self.paused = True
            self.world.running = False

    async def handle_user(self, text: str) -> None:
        if self._task and not self._task.done():
            self.interrupt("redirect")
            try:
                await asyncio.wait_for(self._task, timeout=2.5)
            except Exception:
                pass
        self._cancel.clear()
        self.tools.reset_cancel()
        self.paused = False
        self._task = asyncio.create_task(self._run(text))
        try:
            await self._task
        except asyncio.CancelledError:
            await self._emit({"type": "status", "agent": "idle", "detail": "cancelled"})
        except Exception as e:
            await self._emit({"type": "error", "message": str(e)})
            await self._emit({"type": "status", "agent": "idle"})

    async def _run(self, text: str) -> None:
        self.busy = True
        await self._emit({"type": "status", "agent": "thinking"})
        await self._emit({"type": "chat", "role": "user", "content": text})
        self.memory.user_turns.append(text)
        intent = parse_intent(text, self.context)
        await self._emit({"type": "intent", **intent.to_dict()})

        # Always re-read the hub so a key pasted in the panel is used on the next prompt.
        from ..llm.hub import hub

        try:
            live = hub.make_provider()
            ident = (getattr(live, "name", ""), getattr(live, "model", ""))
            if ident != getattr(self, "_provider_ident", None):
                self.history = [Message(role="system", content=SYSTEM)]
                self._provider_ident = ident
            self.provider = live
        except Exception:
            pass

        if intent.kind == "meta" and intent.verb in ("stop", "pause", "resume", "undo", "reset", "save", "play"):
            await self._meta(intent)
            self.busy = False
            await self._emit({"type": "status", "agent": "idle"})
            return

        if intent.verb == "campaign":
            await self._campaign(intent)
            self.busy = False
            await self._emit({"type": "status", "agent": "idle"})
            return

        use_llm = bool(self.provider and self.provider.name != "builtin")

        if not use_llm:
            if intent.verb == "explain" or (intent.kind == "question" and intent.verb != "inspect"):
                await self._explain(text, intent)
                self.busy = False
                await self._emit({"type": "status", "agent": "idle"})
                return
            if intent.verb == "inspect":
                scene = self.tools.inspect_scene()
                await self._say(_scene_blurb(scene))
                await self._emit({"type": "tool_result", "tool": "inspect_scene", "result": _compact(scene)})
                self.busy = False
                await self._emit({"type": "status", "agent": "idle"})
                return

        # New or continued task
        if intent.verb in ("walk", "climb", "carry", "manipulate", "balance", "load"):
            self.memory.objective = text
            self.memory.constraints = list(intent.constraints)
            if intent.verb != "load":
                self.memory.attempts.clear()
            self.context["objective"] = text
            self.context["last_target"] = intent.target
        elif intent.verb == "add":
            self.context["last_target"] = intent.asset or intent.target

        try:
            if use_llm:
                await self._llm_loop(text, intent)
            else:
                await self._experiment_loop(intent)
        finally:
            self.busy = False
            await self._emit({"type": "status", "agent": "idle"})

    async def _meta(self, intent: Intent) -> None:
        v = intent.verb
        if v == "stop":
            self.interrupt("stop")
            self.world.hold_pose()
            from ..research.campaign import runner as campaign

            campaign.cancel()
            await self._say("Stopped. Pose is held. Say what you want to try next.")
            return
        if v == "pause":
            self.interrupt("pause")
            await self._say("Paused the experiment loop. Resume whenever you like.")
            return
        if v == "resume":
            self.paused = False
            await self._say("Resuming from the current state.")
            if self.memory.objective:
                intent2 = parse_intent(self.memory.objective, self.context)
                if self.provider and self.provider.name != "builtin":
                    await self._llm_loop(self.memory.objective, intent2)
                else:
                    await self._experiment_loop(intent2)
            return
        if v == "retry":
            await self._say("Retrying with a different parameterization.")
            intent2 = parse_intent(self.memory.objective or "walk", self.context)
            intent2.constraints = self.memory.constraints
            if self.provider and self.provider.name != "builtin":
                await self._llm_loop(self.memory.objective or "try a different approach", intent2)
            else:
                await self._experiment_loop(intent2)
            return
        if v == "undo":
            ok = self.world.undo()
            await self._emit({"type": "scene", **self.world.scene_graph()})
            await self._say("Rolled back the last snapshot." if ok else "Nothing to undo.")
            return
        if v == "reset":
            self.world.hard_reset()
            self.memory.clear_task()
            await self._emit({"type": "scene", **self.world.scene_graph()})
            await self._say("Arena reset. Pulse is back on the mark, red cube ahead.")
            return
        if v == "save":
            path = self.tools.save_experiment(
                "session",
                payload={**self.memory.to_dict(), "name": "session", "success": bool(self.memory.best() and self.memory.best().success)},
            )
            await self._say(f"Saved experiment to {path.get('path')}.")
            return
        if v == "play":
            self.world.running = True
            await self._say("Physics is live.")
            return

    async def _campaign(self, intent: Intent) -> None:
        from ..research.campaign import USECASES, runner as campaign

        extras = dict(intent.extras or {})
        if intent.asset:
            extras.setdefault("asset", intent.asset)
        usecase = extras.get("usecase") or "gait_search"
        meta = USECASES.get(usecase) or USECASES["gait_search"]
        n = extras.get("n") or meta["default_n"]
        asset = extras.get("asset") or meta["default_asset"]
        try:
            snap = campaign.start(extras)
        except RuntimeError as e:
            await self._say(str(e))
            return
        except Exception as e:
            await self._say(f"Could not start campaign: {e}")
            return
        workers = int(extras.get("workers") or 1)
        await self._say(
            f"Starting {meta['title'].lower()} — {n} trials on {asset} "
            f"({snap.get('thisRun')} this run, {workers} sim{'s' if workers > 1 else ''}). "
            f"Headless PyBullet, no 4× realtime cap. Distilled JSONL lands in {snap.get('dir')}."
        )

    async def _explain(self, text: str, intent: Intent) -> None:
        last = self.memory.last()
        lesson = build_lesson(self.memory, bool(self.memory.best() and self.memory.best().success))
        if last and ("fall" in text.lower() or "fell" in text.lower()):
            m = last.evaluation.get("metrics") or {}
            await self._say(
                f"It fell on attempt {last.id:02d} ({last.strategy}). "
                f"Uprightness dropped to {m.get('upright', 0):.2f} and height to {m.get('height', 0):.2f}m. "
                "The CoM projection left the support polygon — usually hip amplitude too large or knee crouch too shallow."
            )
        elif not self.memory.attempts:
            scene = self.tools.inspect_scene()
            await self._say(_scene_blurb(scene) + " I haven't run an experiment yet — give me an objective.")
        else:
            lines = [f"I've run {len(self.memory.attempts)} attempt(s) on “{self.memory.objective}”."]
            for a in self.memory.attempts[-4:]:
                lines.append(f"• {a.summary()}")
            best = self.memory.best()
            if best:
                lines.append(f"Best so far: attempt {best.id:02d} at score {best.score:.3f} ({best.strategy}).")
            await self._say("\n".join(lines))
        await self._emit({"type": "education", "lesson": lesson})

    async def _experiment_loop(self, intent: Intent) -> None:
        await self._emit({"type": "status", "agent": "experimenting"})
        self.world.push_undo()

        scene = self.tools.inspect_scene()
        await self._say(_scene_blurb(scene))
        await self._emit({"type": "tool_call", "tool": "inspect_scene", "args": {}})
        await self._emit({"type": "tool_result", "tool": "inspect_scene", "result": _compact(scene)})
        await asyncio.sleep(0.05)

        if intent.verb == "add":
            plan = self.planner.plan(intent, scene, self.memory)
            await self._say(plan.get("narrate") or f"Adding {intent.asset}.")
            for act in plan["actions"]:
                await self._exec_tool(act["tool"], act.get("args") or {})
            await self._emit({"type": "scene", **self.world.scene_graph()})
            await self._say("Scene updated. Tell me what to try from here.")
            return

        if intent.verb == "load":
            if "no_morphology" in (intent.constraints or self.memory.constraints):
                await self._say("You asked me not to change the robot, so I won't swap the model.")
                return
            plan = self.planner.plan(intent, scene, self.memory)
            await self._say(plan.get("narrate") or "Loading a model.")
            for act in plan["actions"]:
                await self._exec_tool(act["tool"], act.get("args") or {})
            await self._emit({"type": "scene", **self.world.scene_graph()})
            await self._say("Ready. What should it do?")
            return

        if intent.verb == "physics":
            self.tools.set_physics(**intent.extras)
            await self._say(f"Physics updated: {intent.extras}")
            return

        max_n = MAX_ATTEMPTS
        success = False
        for _ in range(max_n):
            if self._cancel.is_set():
                await self._say("Interrupted.")
                break
            # Restore a clean pose before planning so heading/metrics match the trial.
            self.world.reset_to_checkpoint()
            await self._emit({"type": "poses", **self.world.capture_poses()})

            scene = self.tools.inspect_scene()
            plan = self.planner.plan(intent, scene, self.memory)
            aid = self.memory.next_id()
            await self._emit(
                {
                    "type": "attempt",
                    "id": aid,
                    "status": "running",
                    "objective": self.memory.objective or intent.raw,
                    "strategy": plan.get("strategy"),
                    "action": ", ".join(a["tool"] for a in plan.get("actions", [])),
                    "parameters": plan.get("parameters") or {},
                }
            )
            await self._say(f"Attempt {aid:02d} — {plan.get('narrate') or plan.get('strategy')}")

            result_blob = ""
            try:
                for act in plan.get("actions", []):
                    if self._cancel.is_set():
                        break
                    out = await self._exec_tool(act["tool"], act.get("args") or {})
                    if act["tool"] == "run_simulation":
                        result_blob = "ran"
            except ToolError as e:
                result_blob = str(e)

            ev = self.tools.evaluate_result(self.memory.objective or intent.verb)
            obs = ev.get("observation") or {}
            result = ev.get("reason") or result_blob
            att = Attempt(
                id=aid,
                objective=self.memory.objective or intent.raw,
                strategy=str(plan.get("strategy")),
                action=", ".join(a["tool"] for a in plan.get("actions", [])),
                parameters=plan.get("parameters") or {},
                result=result,
                evaluation=ev,
                score=float(ev.get("score") or 0),
                success=bool(ev.get("success")),
                notes=plan.get("narrate", ""),
                trajectory=[],
            )
            self.memory.add(att)
            await self._emit(
                {
                    "type": "attempt_update",
                    "id": aid,
                    "status": "success" if att.success else "fail",
                    "result": att.result,
                    "evaluation": {k: v for k, v in ev.items() if k != "observation"},
                    "score": att.score,
                    "next": None if att.success else "adjust parameters from metrics",
                    "metrics": ev.get("metrics"),
                }
            )
            await self._say(
                f"{'Reached the objective' if att.success else 'Not yet'}: {att.result} (score {att.score:.3f})."
            )
            if att.success:
                success = True
                break
            await asyncio.sleep(0.05)

        lesson = build_lesson(self.memory, success)
        await self._emit({"type": "education", "lesson": lesson})
        if success:
            best = self.memory.best()
            await self._say(
                f"That did it in {len(self.memory.attempts)} attempt(s). "
                f"Winning strategy: {best.strategy if best else '—'} with {best.parameters if best else {}}."
            )
            try:
                self.tools.save_experiment(
                    "success",
                    payload={**self.memory.to_dict(), "name": "success", "success": True, "score": best.score if best else 0, "attempts": len(self.memory.attempts)},
                )
            except Exception:
                pass
        elif not self._cancel.is_set():
            best = self.memory.best()
            await self._say(
                f"Budget exhausted. Best score {best.score:.3f} on attempt {best.id:02d} ({best.strategy}). "
                "You can say “try again”, change the scene, or add a ramp."
            )

    async def _llm_loop(self, text: str, intent: Intent) -> None:
        assert self.provider
        key = getattr(self.provider, "api_key", "x")
        if key in ("", "local") and self.provider.name not in ("ollama", "llamacpp", "local-gguf"):
            await self._say(
                f"{self.provider.name} is selected but no API key is stored. "
                "Open the models chip, paste the key, pick a free model, click Use this model."
            )
            return
        await self._emit(
            {
                "type": "chat",
                "role": "system",
                "content": f"Brain: {self.provider.name} · {self.provider.model}",
            }
        )
        scene = self.tools.inspect_scene()
        self.history.append(
            Message(
                role="user",
                content=(
                    f"{text.strip()}\n\n"
                    "---\nLive PyBullet scene (JSON). Act with tools; do not only describe.\n"
                    + json.dumps(_compact(scene), default=str)[:3200]
                ),
            )
        )
        if len(self.history) > 48:
            self.history = [self.history[0]] + self.history[-40:]
        rounds = 0
        await self._emit({"type": "status", "agent": "experimenting"})
        while rounds < 18:
            if self._cancel.is_set():
                await self._say("Interrupted.")
                break
            rounds += 1
            streamed = {"n": 0}

            async def on_delta(piece: str) -> None:
                if not piece:
                    return
                streamed["n"] += 1
                await self._emit({"type": "chat_delta", "role": "assistant", "content": piece})

            try:
                resp = await self.provider.chat(self.history, TOOL_SCHEMAS, on_delta=on_delta)  # type: ignore[call-arg]
            except TypeError:
                try:
                    resp = await self.provider.chat(self.history, TOOL_SCHEMAS)
                except Exception as e:
                    await self._say(_friendly_llm_error(e))
                    return
            except Exception as e:
                await self._say(_friendly_llm_error(e))
                return
            if resp.content and not resp.tool_calls:
                if not streamed["n"]:
                    await self._say(resp.content)
                self.history.append(Message(role="assistant", content=resp.content))
                # If the model just talked without acting on a task, fall back.
                if intent.kind == "task" and rounds < 4:
                    self.history.append(
                        Message(
                            role="user",
                            content="Use tools now. Call inspect_scene or modify_controller then run_simulation. Do not only describe.",
                        )
                    )
                    continue
                break
            if resp.content and not streamed["n"]:
                await self._say(resp.content)
            if not resp.tool_calls:
                break
            tc_payload = []
            for tc in resp.tool_calls:
                tc_payload.append(
                    {
                        "id": tc.id,
                        "type": "function",
                        "function": {"name": tc.name, "arguments": json.dumps(tc.arguments)},
                    }
                )
            self.history.append(Message(role="assistant", content=resp.content or "", tool_calls=tc_payload))
            for tc in resp.tool_calls:
                try:
                    result = await self._exec_tool(tc.name, tc.arguments)
                except Exception as e:
                    result = {"error": str(e)}
                self.history.append(
                    Message(
                        role="tool",
                        content=json.dumps(result, default=str)[:4000],
                        tool_call_id=tc.id,
                        name=tc.name,
                    )
                )
        lesson = build_lesson(self.memory, bool(self.memory.best() and self.memory.best().success))
        await self._emit({"type": "education", "lesson": lesson})

    async def _exec_tool(self, name: str, args: dict[str, Any]) -> Any:
        await self._emit({"type": "tool_call", "tool": name, "args": args})
        loop = asyncio.get_event_loop()
        try:
            result = await loop.run_in_executor(None, lambda: self.tools.call(name, args))
        except Exception as e:
            result = {"error": str(e)}
        compact = _compact(result)
        await self._emit({"type": "tool_result", "tool": name, "result": compact})
        if name in ("load_model", "create_body", "modify_scene"):
            await self._emit({"type": "scene", **self.world.scene_graph()})
        return compact

    async def _say(self, text: str) -> None:
        await self._emit({"type": "chat", "role": "assistant", "content": text})

    async def _emit(self, msg: Emit) -> None:
        msg.setdefault("ts", time.time())
        out = self.broadcast(msg)
        if asyncio.iscoroutine(out):
            await out



def _friendly_llm_error(e: Exception) -> str:
    s = str(e)
    low = s.lower()
    if "402" in s or "credit" in low or "can only afford" in low or "requires more credits" in low:
        return (
            "OpenRouter refused this model (not on the free tier / no credits). "
            "Open the models chip → Load free models → pick an id ending in :free → Use this model."
        )
    if "401" in s or "unauthorized" in low or "invalid api" in low:
        return "API key rejected. Paste a valid OpenRouter key and click Use this model."
    if "429" in s or "rate" in low:
        return "Rate limited by the provider. Wait a few seconds and try again, or pick another free model."
    if "404" in s or "no endpoints" in low:
        return f"That model id is not available. Load free models and pick a live :free id. ({s})"
    return f"Model call failed: {s}"


def _scene_blurb(scene: dict[str, Any]) -> str:
    bodies = scene.get("bodies") or []
    robots = [b for b in bodies if b.get("category") == "robots"]
    others = [b for b in bodies if b.get("category") != "robots" and "arena" not in (b.get("tags") or [])]
    bits = []
    if robots:
        r = robots[0]
        bits.append(
            f"{r['name']} is at ({r['position'][0]:.2f}, {r['position'][1]:.2f}, {r['position'][2]:.2f}) "
            f"with {len(r.get('joints') or [])} actuated joints, upright={r.get('upright', 0):.2f}."
        )
    for o in others[:4]:
        bits.append(f"{o['name']} @ x={o['position'][0]:.2f}, y={o['position'][1]:.2f}.")
    if not bits:
        return "The arena is empty."
    return " ".join(bits)


def _compact(obj: Any) -> Any:
    try:
        s = json.dumps(obj, default=str)
    except Exception:
        return str(obj)
    if len(s) < 3500:
        return obj
    if isinstance(obj, dict):
        out = {}
        for k, v in obj.items():
            if k in ("observation", "bodies", "trajectory", "frames"):
                out[k] = _compact(v)
            else:
                out[k] = v
        if "bodies" in out and isinstance(out["bodies"], list) and len(out["bodies"]) > 12:
            out["bodies"] = out["bodies"][:12]
            out["truncated"] = True
        return out
    if isinstance(obj, list) and len(obj) > 24:
        return obj[:24]
    return obj
