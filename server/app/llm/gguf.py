from __future__ import annotations

import asyncio
import json
from pathlib import Path
from typing import Any

from .base import LLMProvider, LLMResponse, Message, ToolCall


def llama_cpp_available() -> bool:
    try:
        import llama_cpp  # noqa: F401

        return True
    except Exception:
        return False


class GgufProvider(LLMProvider):
    """In-process GGUF via llama-cpp-python. Lazy-loads weights on first chat."""

    name = "local-gguf"

    def __init__(self, path: Path, model: str, n_ctx: int = 2048) -> None:
        self.path = Path(path)
        self.model = model
        self.n_ctx = n_ctx
        self._llm = None

    def info(self) -> dict[str, Any]:
        return {
            "provider": self.name,
            "model": self.model,
            "online": self.path.exists(),
            "note": f"Local GGUF · {self.path.name}",
            "path": str(self.path),
        }

    def _load(self):
        if self._llm is not None:
            return self._llm
        from llama_cpp import Llama

        self._llm = Llama(
            model_path=str(self.path),
            n_ctx=self.n_ctx,
            n_threads=2,
            n_gpu_layers=0,
            chat_format="chatml",
            verbose=False,
        )
        return self._llm

    async def available(self) -> bool:
        return self.path.exists() and llama_cpp_available()

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        if not llama_cpp_available():
            raise RuntimeError(
                "Qwen weights are in the local vault, but llama-cpp-python is not installed. "
                "Keep the GGUF and `pip install llama-cpp-python`, or use a cloud key."
            )
        if not self.path.exists():
            raise RuntimeError("GGUF file missing. Download Qwen from the Models panel.")

        def _run() -> dict[str, Any]:
            llm = self._load()
            payload: dict[str, Any] = {
                "messages": [m.to_openai() for m in messages],
                "temperature": 0.3,
                "max_tokens": 512,
            }
            if tools:
                payload["tools"] = tools
            return llm.create_chat_completion(**payload)

        data = await asyncio.get_event_loop().run_in_executor(None, _run)
        msg = ((data.get("choices") or [{}])[0]).get("message") or {}
        content = msg.get("content") or ""
        tcs: list[ToolCall] = []
        for tc in msg.get("tool_calls") or []:
            fn = tc.get("function") or {}
            args = fn.get("arguments") or "{}"
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except Exception:
                    args = {}
            tcs.append(ToolCall(id=tc.get("id", "call"), name=fn.get("name", ""), arguments=args))
        return LLMResponse(content=content, tool_calls=tcs, provider=self.name, model=self.model)
