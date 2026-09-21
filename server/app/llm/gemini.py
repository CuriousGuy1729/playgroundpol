from __future__ import annotations

import json
from typing import Any

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall


class GeminiProvider(LLMProvider):
    name = "google"

    def __init__(self, api_key: str, model: str) -> None:
        self.api_key = api_key
        self.model = model
        self.base_url = "https://generativelanguage.googleapis.com/v1beta"

    async def available(self) -> bool:
        if not self.api_key:
            return False
        try:
            async with httpx.AsyncClient(timeout=2.5) as c:
                r = await c.get(f"{self.base_url}/models", params={"key": self.api_key})
                return r.status_code < 500
        except Exception:
            return False

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        system = ""
        contents: list[dict[str, Any]] = []
        for m in messages:
            if m.role == "system":
                system = (system + "\n" + (m.content or "")).strip()
                continue
            if m.role == "tool":
                contents.append(
                    {
                        "role": "user",
                        "parts": [
                            {
                                "functionResponse": {
                                    "name": m.name or "tool",
                                    "response": {"result": m.content or ""},
                                }
                            }
                        ],
                    }
                )
                continue
            if m.role == "assistant" and m.tool_calls:
                parts = []
                if m.content:
                    parts.append({"text": m.content})
                for tc in m.tool_calls:
                    fn = tc.get("function") or {}
                    args = fn.get("arguments") or {}
                    if isinstance(args, str):
                        try:
                            args = json.loads(args)
                        except Exception:
                            args = {}
                    parts.append({"functionCall": {"name": fn.get("name"), "args": args}})
                contents.append({"role": "model", "parts": parts})
                continue
            role = "user" if m.role == "user" else "model"
            contents.append({"role": role, "parts": [{"text": m.content or ""}]})

        payload: dict[str, Any] = {"contents": contents or [{"role": "user", "parts": [{"text": "Hello"}]}]}
        if system:
            payload["system_instruction"] = {"parts": [{"text": system}]}
        if tools:
            decls = []
            for t in tools:
                fn = t.get("function") or t
                decls.append(
                    {
                        "name": fn.get("name"),
                        "description": fn.get("description") or "",
                        "parameters": fn.get("parameters") or {"type": "object", "properties": {}},
                    }
                )
            payload["tools"] = [{"function_declarations": decls}]

        url = f"{self.base_url}/models/{self.model}:generateContent"
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(url, params={"key": self.api_key}, json=payload)
            r.raise_for_status()
            data = r.json()
        cand = (data.get("candidates") or [{}])[0]
        parts = ((cand.get("content") or {}).get("parts")) or []
        text = ""
        tcs: list[ToolCall] = []
        for i, p in enumerate(parts):
            if "text" in p:
                text += p.get("text") or ""
            fc = p.get("functionCall")
            if fc:
                tcs.append(ToolCall(id=f"call_{i}", name=fc.get("name") or "", arguments=fc.get("args") or {}))
        return LLMResponse(content=text, tool_calls=tcs, provider=self.name, model=self.model)
