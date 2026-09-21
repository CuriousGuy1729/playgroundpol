from __future__ import annotations

import json
from typing import Any

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall


class OpenAICompatProvider(LLMProvider):
    """llama.cpp server, vLLM, LM Studio, OpenAI-compatible local endpoints."""

    name = "openai-compat"

    def __init__(self, base_url: str, model: str, api_key: str = "") -> None:
        self.base_url = base_url.rstrip("/")
        if self.base_url.endswith("/v1"):
            self.base_url = self.base_url[:-3]
        self.model = model
        self.api_key = api_key or "local"

    async def available(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=1.2) as c:
                r = await c.get(f"{self.base_url}/v1/models")
                return r.status_code < 500
        except Exception:
            return False

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": [m.to_openai() for m in messages],
            "temperature": 0.3,
        }
        if tools:
            payload["tools"] = tools
            payload["tool_choice"] = "auto"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(f"{self.base_url}/v1/chat/completions", json=payload, headers=headers)
            r.raise_for_status()
            data = r.json()
        choice = (data.get("choices") or [{}])[0]
        msg = choice.get("message") or {}
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
