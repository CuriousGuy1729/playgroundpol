from __future__ import annotations

import json
from typing import Any

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall


class AnthropicProvider(LLMProvider):
    name = "anthropic"

    def __init__(self, api_key: str, model: str, base_url: str = "https://api.anthropic.com") -> None:
        self.api_key = api_key
        self.model = model
        self.base_url = base_url.rstrip("/")

    def _headers(self) -> dict[str, str]:
        return {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }

    async def available(self) -> bool:
        if not self.api_key:
            return False
        try:
            async with httpx.AsyncClient(timeout=2.5) as c:
                r = await c.get(f"{self.base_url}/v1/models", headers=self._headers())
                return r.status_code < 500
        except Exception:
            return False

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        system = ""
        converted: list[dict[str, Any]] = []
        for m in messages:
            if m.role == "system":
                system = (system + "\n" + (m.content or "")).strip()
                continue
            if m.role == "tool":
                converted.append(
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "tool_result",
                                "tool_use_id": m.tool_call_id or "tool",
                                "content": m.content or "",
                            }
                        ],
                    }
                )
                continue
            if m.role == "assistant" and m.tool_calls:
                blocks: list[dict[str, Any]] = []
                if m.content:
                    blocks.append({"type": "text", "text": m.content})
                for tc in m.tool_calls:
                    fn = tc.get("function") or {}
                    args = fn.get("arguments") or {}
                    if isinstance(args, str):
                        try:
                            args = json.loads(args)
                        except Exception:
                            args = {}
                    blocks.append(
                        {
                            "type": "tool_use",
                            "id": tc.get("id") or "call",
                            "name": fn.get("name"),
                            "input": args,
                        }
                    )
                converted.append({"role": "assistant", "content": blocks})
                continue
            converted.append({"role": "user" if m.role == "user" else "assistant", "content": m.content or ""})

        payload: dict[str, Any] = {
            "model": self.model,
            "max_tokens": 2048,
            "messages": converted or [{"role": "user", "content": "Hello"}],
        }
        if system:
            payload["system"] = system
        if tools:
            payload["tools"] = [
                {
                    "name": (t.get("function") or t).get("name"),
                    "description": (t.get("function") or t).get("description") or "",
                    "input_schema": (t.get("function") or t).get("parameters")
                    or {"type": "object", "properties": {}},
                }
                for t in tools
            ]
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(f"{self.base_url}/v1/messages", json=payload, headers=self._headers())
            r.raise_for_status()
            data = r.json()
        text = ""
        tcs: list[ToolCall] = []
        for block in data.get("content") or []:
            if block.get("type") == "text":
                text += block.get("text") or ""
            elif block.get("type") == "tool_use":
                tcs.append(
                    ToolCall(
                        id=block.get("id") or "call",
                        name=block.get("name") or "",
                        arguments=block.get("input") or {},
                    )
                )
        return LLMResponse(content=text, tool_calls=tcs, provider=self.name, model=self.model)
