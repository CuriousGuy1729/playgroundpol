from __future__ import annotations

import json
import os
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Callable

import httpx

from ..config import MODELS_DIR, SECRETS_PATH
from .anthropic import AnthropicProvider
from .base import LLMProvider
from .builtin import BuiltinProvider
from .gemini import GeminiProvider
from .gguf import GgufProvider, llama_cpp_available
from .ollama import OllamaProvider
from .openai_compat import OPENROUTER_HEADERS, OpenAICompatProvider, openai_root

PAID_OPENROUTER_DEFAULTS = {
    "qwen/qwen-2.5-7b-instruct",
    "openai/gpt-4o-mini",
    "anthropic/claude-3.5-sonnet",
    "google/gemini-2.0-flash-001",
}


PROVIDER_CATALOG: list[dict[str, Any]] = [
    {
        "id": "openai",
        "name": "OpenAI",
        "kind": "openai",
        "base_url": "https://api.openai.com/v1",
        "needs_key": True,
        "docs": "https://platform.openai.com/api-keys",
        "placeholder": "sk-...",
        "models": ["gpt-4.1-mini", "gpt-4.1", "gpt-4o-mini", "gpt-4o", "o4-mini"],
        "blurb": "GPT-4.1 / 4o family. Best general tool use.",
    },
    {
        "id": "anthropic",
        "name": "Anthropic",
        "kind": "anthropic",
        "base_url": "https://api.anthropic.com",
        "needs_key": True,
        "docs": "https://console.anthropic.com/settings/keys",
        "placeholder": "sk-ant-...",
        "models": ["claude-sonnet-4-20250514", "claude-3-5-haiku-latest", "claude-3-5-sonnet-latest"],
        "blurb": "Claude. Strong at following the experiment loop.",
    },
    {
        "id": "google",
        "name": "Google Gemini",
        "kind": "gemini",
        "base_url": "https://generativelanguage.googleapis.com/v1beta",
        "needs_key": True,
        "docs": "https://aistudio.google.com/apikey",
        "placeholder": "AIza...",
        "models": ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"],
        "blurb": "Gemini via AI Studio key.",
    },
    {
        "id": "groq",
        "name": "Groq",
        "kind": "openai",
        "base_url": "https://api.groq.com/openai/v1",
        "needs_key": True,
        "docs": "https://console.groq.com/keys",
        "placeholder": "gsk_...",
        "models": ["llama-3.3-70b-versatile", "openai/gpt-oss-20b", "qwen/qwen3-32b"],
        "blurb": "Very fast OpenAI-compatible inference.",
    },
    {
        "id": "openrouter",
        "name": "OpenRouter",
        "kind": "openai",
        "base_url": "https://openrouter.ai/api/v1",
        "needs_key": True,
        "docs": "https://openrouter.ai/keys",
        "placeholder": "sk-or-v1-...",
        "models": [
            "openrouter/free",
            "meta-llama/llama-3.3-70b-instruct:free",
            "openai/gpt-oss-20b:free",
            "openai/gpt-oss-120b:free",
            "qwen/qwen3-coder:free",
            "google/gemma-4-31b-it:free",
            "nvidia/nemotron-nano-9b-v2:free",
        ],
        "blurb": "Paste a key, then pick a FREE model (id ends in :free). Paid IDs will 402.",
        "extra_headers": {
            "HTTP-Referer": "https://github.com/CuriousGuy1729/playgroundpol",
            "X-Title": "PRISM Lab",
        },
    },
    {
        "id": "together",
        "name": "Together AI",
        "kind": "openai",
        "base_url": "https://api.together.xyz/v1",
        "needs_key": True,
        "docs": "https://api.together.ai/settings/api-keys",
        "placeholder": "...",
        "models": ["Qwen/Qwen2.5-7B-Instruct-Turbo", "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"],
        "blurb": "Hosted open weights, including Qwen.",
    },
    {
        "id": "mistral",
        "name": "Mistral",
        "kind": "openai",
        "base_url": "https://api.mistral.ai/v1",
        "needs_key": True,
        "docs": "https://console.mistral.ai/api-keys",
        "placeholder": "...",
        "models": ["mistral-small-latest", "mistral-large-latest"],
        "blurb": "Mistral Small / Large.",
    },
    {
        "id": "deepseek",
        "name": "DeepSeek",
        "kind": "openai",
        "base_url": "https://api.deepseek.com/v1",
        "needs_key": True,
        "docs": "https://platform.deepseek.com/api_keys",
        "placeholder": "sk-...",
        "models": ["deepseek-chat", "deepseek-reasoner"],
        "blurb": "DeepSeek chat and reasoner.",
    },
    {
        "id": "fireworks",
        "name": "Fireworks",
        "kind": "openai",
        "base_url": "https://api.fireworks.ai/inference/v1",
        "needs_key": True,
        "docs": "https://fireworks.ai/account/api-keys",
        "placeholder": "...",
        "models": ["accounts/fireworks/models/qwen2p5-7b-instruct", "accounts/fireworks/models/llama-v3p1-8b-instruct"],
        "blurb": "Fireworks inference, Qwen included.",
    },
    {
        "id": "xai",
        "name": "xAI",
        "kind": "openai",
        "base_url": "https://api.x.ai/v1",
        "needs_key": True,
        "docs": "https://console.x.ai/",
        "placeholder": "xai-...",
        "models": ["grok-2-latest", "grok-3-mini"],
        "blurb": "Grok via xAI.",
    },
    {
        "id": "ollama",
        "name": "Ollama",
        "kind": "ollama",
        "base_url": "http://127.0.0.1:11434",
        "needs_key": False,
        "docs": "https://ollama.com",
        "placeholder": "",
        "models": ["qwen2.5", "qwen2.5:7b", "qwen2.5:3b", "llama3.2"],
        "blurb": "Local Ollama daemon. No key.",
    },
    {
        "id": "llamacpp",
        "name": "llama.cpp server",
        "kind": "openai",
        "base_url": "http://127.0.0.1:8080/v1",
        "needs_key": False,
        "docs": "https://github.com/ggml-org/llama.cpp",
        "placeholder": "",
        "models": ["qwen2.5"],
        "blurb": "Any OpenAI-compatible llama.cpp / LM Studio endpoint.",
    },
    {
        "id": "custom",
        "name": "Custom endpoint",
        "kind": "openai",
        "base_url": "http://127.0.0.1:8000/v1",
        "needs_key": True,
        "docs": "",
        "placeholder": "optional key",
        "models": ["local-model"],
        "blurb": "Paste any OpenAI-compatible base URL + model name.",
    },
]


LOCAL_MODELS: list[dict[str, Any]] = [
    {
        "id": "qwen25-05b-q3",
        "name": "Qwen2.5 0.5B Instruct · Q3_K_M",
        "filename": "Qwen2.5-0.5B-Instruct-Q3_K_M.gguf",
        "url": "https://huggingface.co/lmstudio-community/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q3_K_M.gguf",
        "size_mb": 308,
        "context": 8192,
        "blurb": "~308 MB. Smallest Qwen that still chats. Stored in the local vault, never uploaded.",
    },
    {
        "id": "qwen25-05b-q4",
        "name": "Qwen2.5 0.5B Instruct · Q4_K_M",
        "filename": "Qwen2.5-0.5B-Instruct-Q4_K_M.gguf",
        "url": "https://huggingface.co/lmstudio-community/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/Qwen2.5-0.5B-Instruct-Q4_K_M.gguf",
        "size_mb": 398,
        "context": 8192,
        "blurb": "~398 MB. Recommended local experiment model.",
    },
]


def _mask(key: str) -> str:
    if not key:
        return ""
    if len(key) < 8:
        return "••••"
    return key[:4] + "••••" + key[-4:]


def _looks_masked(key: str) -> bool:
    return "••••" in (key or "")


@dataclass
class DownloadState:
    model_id: str = ""
    status: str = "idle"  # idle | running | done | error | cancelled
    received: int = 0
    total: int = 0
    error: str = ""
    started: float = 0.0
    path: str = ""


class LLMHub:
    def __init__(self) -> None:
        self.path = SECRETS_PATH
        self.data: dict[str, Any] = {"active_provider": "builtin", "active_model": "prism-experimenter", "providers": {}}
        self.download = DownloadState()
        self._cancel = False
        self._load()

    def _load(self) -> None:
        if self.path.exists():
            try:
                self.data = json.loads(self.path.read_text())
            except Exception:
                pass
        self.data.setdefault("providers", {})
        self.data.setdefault("active_provider", "builtin")
        self.data.setdefault("active_model", "prism-experimenter")
        st = (self.data.get("providers") or {}).get("openrouter")
        if isinstance(st, dict):
            m = (st.get("model") or "").strip()
            if not m or m in PAID_OPENROUTER_DEFAULTS:
                st["model"] = "openrouter/free"
                if self.data.get("active_provider") == "openrouter":
                    self.data["active_model"] = "openrouter/free"

    def _save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        tmp = self.path.with_suffix(".tmp")
        tmp.write_text(json.dumps(self.data, indent=2))
        os.chmod(tmp, 0o600)
        tmp.replace(self.path)
        try:
            os.chmod(self.path, 0o600)
        except Exception:
            pass

    def catalog_by_id(self, pid: str) -> dict[str, Any] | None:
        return next((p for p in PROVIDER_CATALOG if p["id"] == pid), None)

    def local_by_id(self, mid: str) -> dict[str, Any] | None:
        return next((m for m in LOCAL_MODELS if m["id"] == mid), None)

    def gguf_path(self, filename: str) -> Path:
        return MODELS_DIR / filename

    def snapshot(self) -> dict[str, Any]:
        providers = []
        stored = self.data.get("providers") or {}
        for spec in PROVIDER_CATALOG:
            st = stored.get(spec["id"]) or {}
            key = st.get("api_key") or ""
            providers.append(
                {
                    **{k: spec[k] for k in ("id", "name", "kind", "docs", "placeholder", "models", "blurb", "needs_key")},
                    "base_url": st.get("base_url") or spec.get("base_url") or "",
                    "model": st.get("model") or (spec["models"][0] if spec.get("models") else ""),
                    "has_key": bool(key),
                    "key_hint": _mask(key),
                    "enabled": bool(st.get("enabled", bool(key) or not spec.get("needs_key"))),
                }
            )
        local = []
        for m in LOCAL_MODELS:
            p = self.gguf_path(m["filename"])
            size = p.stat().st_size if p.exists() else 0
            local.append(
                {
                    **m,
                    "downloaded": p.exists() and size > 1_000_000,
                    "bytes": size,
                    "path": str(p) if p.exists() else "",
                }
            )
        dl = self.download
        return {
            "active_provider": self.data.get("active_provider") or "builtin",
            "active_model": self.data.get("active_model") or "",
            "providers": providers,
            "local_models": local,
            "llama_cpp": llama_cpp_available(),
            "vault": str(MODELS_DIR),
            "download": {
                "model_id": dl.model_id,
                "status": dl.status,
                "received": dl.received,
                "total": dl.total,
                "error": dl.error,
                "path": dl.path,
                "pct": round(100 * dl.received / dl.total, 1) if dl.total else 0,
            },
        }

    def upsert_provider(
        self,
        provider_id: str,
        api_key: str | None = None,
        model: str | None = None,
        base_url: str | None = None,
        activate: bool = False,
    ) -> dict[str, Any]:
        spec = self.catalog_by_id(provider_id)
        if not spec:
            raise ValueError(f"unknown provider {provider_id}")
        st = dict((self.data["providers"].get(provider_id) or {}))
        if api_key is not None and not _looks_masked(api_key):
            st["api_key"] = api_key.strip()
        if model is not None and model.strip():
            st["model"] = model.strip()
        if base_url is not None and base_url.strip():
            st["base_url"] = base_url.strip()
        if provider_id == "openrouter":
            m = (st.get("model") or "").strip()
            if not m or m in PAID_OPENROUTER_DEFAULTS:
                st["model"] = "openrouter/free"
        st["enabled"] = True
        self.data["providers"][provider_id] = st
        if activate:
            self.data["active_provider"] = provider_id
            self.data["active_model"] = st.get("model") or (spec["models"][0] if spec.get("models") else "")
        self._save()
        return self.snapshot()

    def clear_key(self, provider_id: str) -> dict[str, Any]:
        st = dict((self.data["providers"].get(provider_id) or {}))
        st["api_key"] = ""
        self.data["providers"][provider_id] = st
        if self.data.get("active_provider") == provider_id:
            self.data["active_provider"] = "builtin"
            self.data["active_model"] = "prism-experimenter"
        self._save()
        return self.snapshot()

    def activate(self, provider_id: str, model: str | None = None) -> dict[str, Any]:
        if provider_id == "builtin":
            self.data["active_provider"] = "builtin"
            self.data["active_model"] = "prism-experimenter"
            self._save()
            return self.snapshot()
        if provider_id == "local-gguf":
            loc = self.local_by_id(model or "") or next((m for m in LOCAL_MODELS if self.gguf_path(m["filename"]).exists()), None)
            if not loc:
                raise ValueError("Download a local Qwen first")
            path = self.gguf_path(loc["filename"])
            if not path.exists():
                raise ValueError(f"{loc['name']} is not in the vault yet")
            self.data["active_provider"] = "local-gguf"
            self.data["active_model"] = loc["id"]
            self._save()
            return self.snapshot()
        spec = self.catalog_by_id(provider_id)
        if not spec:
            raise ValueError(f"unknown provider {provider_id}")
        st = dict((self.data["providers"].get(provider_id) or {}))
        if model:
            st["model"] = model
            self.data["providers"][provider_id] = st
        self.data["active_provider"] = provider_id
        self.data["active_model"] = st.get("model") or model or (spec["models"][0] if spec.get("models") else "")
        self._save()
        return self.snapshot()

    def make_provider(self) -> LLMProvider:
        pid = self.data.get("active_provider") or "builtin"
        if pid in ("builtin", "", None):
            return BuiltinProvider()
        if pid == "local-gguf":
            loc = self.local_by_id(self.data.get("active_model") or "")
            if not loc:
                return BuiltinProvider()
            return GgufProvider(self.gguf_path(loc["filename"]), loc["id"])
        spec = self.catalog_by_id(pid)
        st = (self.data.get("providers") or {}).get(pid) or {}
        if not spec:
            return BuiltinProvider()
        model = st.get("model") or self.data.get("active_model") or (spec["models"][0] if spec.get("models") else "")
        base = st.get("base_url") or spec.get("base_url") or ""
        key = st.get("api_key") or ""
        kind = spec.get("kind")
        if kind == "ollama":
            return OllamaProvider(base_url=base or "http://127.0.0.1:11434", model=model or "qwen2.5")
        if kind == "anthropic":
            return AnthropicProvider(api_key=key, model=model, base_url=base)
        if kind == "gemini":
            return GeminiProvider(api_key=key, model=model)
        extra = dict(spec.get("extra_headers") or {})
        if pid == "openrouter":
            extra = {**OPENROUTER_HEADERS, **extra}
            if not model or model in PAID_OPENROUTER_DEFAULTS:
                model = "openrouter/free"
        return OpenAICompatProvider(
            base_url=base,
            model=model,
            api_key=key,
            label=pid,
            extra_headers=extra,
        )

    async def list_models(self, provider_id: str, free_only: bool = True) -> dict[str, Any]:
        spec = self.catalog_by_id(provider_id)
        if not spec:
            return {"ok": False, "error": "unknown provider", "models": []}
        st = (self.data.get("providers") or {}).get(provider_id) or {}
        key = st.get("api_key") or ""
        root = openai_root(st.get("base_url") or spec.get("base_url") or "")
        headers = {"Content-Type": "application/json"}
        if key:
            headers["Authorization"] = f"Bearer {key}"
        if provider_id == "openrouter" or "openrouter.ai" in root:
            headers.update(OPENROUTER_HEADERS)
        try:
            async with httpx.AsyncClient(timeout=25.0) as c:
                r = await c.get(f"{root}/v1/models", headers=headers)
            if r.status_code >= 400:
                return {
                    "ok": False,
                    "error": f"HTTP {r.status_code}: {(r.text or '')[:300]}",
                    "models": [{"id": m, "name": m, "free": True, "tools": True} for m in (spec.get("models") or [])],
                }
            payload = r.json()
        except Exception as e:
            return {
                "ok": False,
                "error": str(e),
                "models": [{"id": m, "name": m, "free": True, "tools": True} for m in (spec.get("models") or [])],
            }
        rows = payload.get("data") if isinstance(payload, dict) else payload
        models: list[dict[str, Any]] = []
        for m in rows or []:
            if not isinstance(m, dict):
                continue
            mid = str(m.get("id") or "")
            if not mid:
                continue
            pricing = m.get("pricing") or {}
            try:
                prompt_p = float(pricing.get("prompt") or 0)
                comp_p = float(pricing.get("completion") or 0)
            except Exception:
                prompt_p, comp_p = 1.0, 1.0
            is_free = (prompt_p == 0.0 and comp_p == 0.0) or mid.endswith(":free") or mid == "openrouter/free"
            if free_only and provider_id == "openrouter" and not is_free:
                continue
            params = m.get("supported_parameters") or []
            if isinstance(params, str):
                params = [params]
            tools = "tools" in params or "tool_choice" in params
            arch = m.get("architecture") or {}
            modality = str(arch.get("modality") or m.get("modality") or "")
            if "audio" in modality and "text" not in modality:
                continue
            models.append(
                {
                    "id": mid,
                    "name": m.get("name") or mid,
                    "free": is_free,
                    "tools": bool(tools),
                    "context": m.get("context_length") or m.get("context") or 0,
                    "description": (m.get("description") or "")[:220],
                }
            )
        models.sort(key=lambda x: (not x.get("tools"), not x.get("free"), x.get("id") or ""))
        if provider_id == "openrouter" and not any(x["id"] == "openrouter/free" for x in models):
            models.insert(0, {"id": "openrouter/free", "name": "OpenRouter Free Auto", "free": True, "tools": True, "context": 0, "description": "Routes to a free model."})
        return {"ok": True, "models": models, "count": len(models)}

    async def test_provider(self, provider_id: str) -> dict[str, Any]:
        from .base import Message

        prev = self.data.get("active_provider"), self.data.get("active_model")
        try:
            if provider_id == "local-gguf":
                p = self.make_provider() if self.data.get("active_provider") == "local-gguf" else None
                if p is None:
                    loc = next((m for m in LOCAL_MODELS if self.gguf_path(m["filename"]).exists()), None)
                    if not loc:
                        return {"ok": False, "error": "No GGUF in the vault"}
                    p = GgufProvider(self.gguf_path(loc["filename"]), loc["id"])
            else:
                spec = self.catalog_by_id(provider_id)
                if not spec:
                    return {"ok": False, "error": "unknown provider"}
                st = (self.data.get("providers") or {}).get(provider_id) or {}
                if spec.get("needs_key") and not st.get("api_key"):
                    return {"ok": False, "error": "No API key saved for this provider"}
                self.data["active_provider"] = provider_id
                self.data["active_model"] = st.get("model") or (spec["models"][0] if spec.get("models") else "")
                p = self.make_provider()
            ping = await p.chat(
                [
                    Message(role="system", content="Reply with the single word pong."),
                    Message(role="user", content="ping"),
                ],
                tools=None,
            )
            sample = (ping.content or "").strip()[:240]
            return {
                "ok": True,
                "provider": p.name,
                "model": p.model,
                "sample": sample,
                "error": None,
            }
        except Exception as e:
            return {"ok": False, "error": str(e)}
        finally:
            self.data["active_provider"], self.data["active_model"] = prev

    async def download_model(self, model_id: str, on_progress: Callable[[dict[str, Any]], None] | None = None) -> dict[str, Any]:
        loc = self.local_by_id(model_id)
        if not loc:
            raise ValueError(f"unknown local model {model_id}")
        dest = self.gguf_path(loc["filename"])
        part = dest.with_suffix(dest.suffix + ".part")
        MODELS_DIR.mkdir(parents=True, exist_ok=True)
        self._cancel = False
        self.download = DownloadState(
            model_id=model_id, status="running", started=time.time(), path=str(dest), total=int(loc["size_mb"] * 1024 * 1024)
        )
        if on_progress:
            on_progress(self.snapshot()["download"])
        try:
            headers = {"User-Agent": "PRISM-Lab/0.1"}
            urls = [loc["url"]]
            if "huggingface.co" in loc["url"]:
                urls.append(loc["url"].replace("https://huggingface.co", "https://hf-mirror.com"))
            last_err: Exception | None = None
            async with httpx.AsyncClient(timeout=None, follow_redirects=True, headers=headers) as client:
                r = None
                for url in urls:
                    try:
                        req = client.build_request("GET", url)
                        r = await client.send(req, stream=True)
                        if r.status_code < 400:
                            break
                        last_err = RuntimeError(f"HTTP {r.status_code} for {url}")
                        await r.aclose()
                        r = None
                    except Exception as e:
                        last_err = e
                        r = None
                if r is None:
                    raise last_err or RuntimeError("download failed")
                async with r:
                    total = int(r.headers.get("content-length") or 0)
                    if total:
                        self.download.total = total
                    received = 0
                    last_emit = 0.0
                    with open(part, "wb") as f:
                        async for chunk in r.aiter_bytes(1024 * 64):
                            if self._cancel:
                                self.download.status = "cancelled"
                                break
                            f.write(chunk)
                            received += len(chunk)
                            self.download.received = received
                            now = time.time()
                            if on_progress and now - last_emit > 0.25:
                                last_emit = now
                                on_progress(self.snapshot()["download"])
            if self.download.status == "cancelled":
                if part.exists():
                    part.unlink()
                if on_progress:
                    on_progress(self.snapshot()["download"])
                return self.snapshot()
            part.replace(dest)
            self.download.status = "done"
            self.download.received = dest.stat().st_size
            self.download.total = self.download.received
            if on_progress:
                on_progress(self.snapshot()["download"])
            return self.snapshot()
        except Exception as e:
            self.download.status = "error"
            self.download.error = str(e)
            if part.exists():
                try:
                    part.unlink()
                except Exception:
                    pass
            if on_progress:
                on_progress(self.snapshot()["download"])
            raise

    def cancel_download(self) -> None:
        self._cancel = True


hub = LLMHub()
