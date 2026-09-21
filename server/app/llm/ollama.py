from __future__ import annotations

import json
from typing import Any

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall


class OllamaProvider(LLMProvider):
    name = "ollama"

    def __init__(self, base_url: str, model: str) -> None:
        self.base_url = base_url.rstrip("/")
        self.model = model

    async def available(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=1.2) as c:
                r = await c.get(f"{self.base_url}/api/tags")
                return r.status_code == 200
        except Exception:
            return False

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": [m.to_ollama() for m in messages],
            "stream": False,
        }
        if tools:
            payload["tools"] = tools
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(f"{self.base_url}/api/chat", json=payload)
            r.raise_for_status()
            data = r.json()
        msg = data.get("message") or {}
        content = msg.get("content") or ""
        tcs: list[ToolCall] = []
        for i, tc in enumerate(msg.get("tool_calls") or []):
            fn = tc.get("function") or {}
            args = fn.get("arguments") or {}
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except Exception:
                    args = {}
            tcs.append(ToolCall(id=f"call_{i}", name=fn.get("name", ""), arguments=args))
        return LLMResponse(content=content, tool_calls=tcs, provider="ollama", model=self.model)
