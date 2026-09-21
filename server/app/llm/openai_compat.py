from __future__ import annotations

import json
import re
from typing import Any

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall

OPENROUTER_HEADERS = {
    "HTTP-Referer": "https://github.com/CuriousGuy1729/playgroundpol",
    "X-Title": "PRISM Lab",
}

_TOOL_TAG = re.compile(
    r'<tool\s+name=["\']([^"\']+)["\']\s*>\s*(\{.*?\})\s*</tool>',
    re.DOTALL | re.IGNORECASE,
)
_JSON_FENCE = re.compile(r"```(?:json)?\s*(\{.*?\}|\[.*?\])\s*```", re.DOTALL)


def openai_root(base_url: str) -> str:
    u = (base_url or "").strip().rstrip("/")
    if u.endswith("/v1"):
        u = u[:-3].rstrip("/")
    return u


def extract_text_tool_calls(content: str) -> list[ToolCall]:
    calls: list[ToolCall] = []
    if not content:
        return calls

    def _add(name: str, args: Any) -> None:
        if not name:
            return
        if not isinstance(args, dict):
            args = {}
        calls.append(ToolCall(id=f"call_{len(calls)}", name=str(name), arguments=args))

    for m in _TOOL_TAG.finditer(content):
        try:
            args = json.loads(m.group(2))
        except Exception:
            args = {}
        _add(m.group(1), args)
    if calls:
        return calls

    def _from_obj(obj: Any) -> None:
        if isinstance(obj, list):
            for item in obj:
                _from_obj(item)
            return
        if not isinstance(obj, dict):
            return
        name = obj.get("name") or obj.get("tool") or obj.get("function")
        if isinstance(name, dict):
            name = name.get("name")
        args = obj.get("arguments") or obj.get("args") or obj.get("parameters") or {}
        if isinstance(args, str):
            try:
                args = json.loads(args)
            except Exception:
                args = {}
        if name:
            _add(str(name), args)

    for m in _JSON_FENCE.finditer(content):
        try:
            _from_obj(json.loads(m.group(1)))
        except Exception:
            continue
    if calls:
        return calls

    stripped = content.strip()
    if stripped.startswith("{") or stripped.startswith("["):
        try:
            _from_obj(json.loads(stripped))
        except Exception:
            pass
    return calls


TEXT_TOOL_HINT = (
    "If you cannot use native function calling, emit one or more XML tool tags and nothing else:\n"
    '<tool name="inspect_scene">{}</tool>\n'
    '<tool name="run_simulation">{"seconds": 4}</tool>\n'
)


class OpenAICompatProvider(LLMProvider):
    """OpenAI, Groq, OpenRouter, Together, llama.cpp server, vLLM, LM Studio, custom."""

    name = "openai-compat"

    def __init__(
        self,
        base_url: str,
        model: str,
        api_key: str = "",
        label: str = "openai-compat",
        extra_headers: dict[str, str] | None = None,
    ) -> None:
        self.base_url = openai_root(base_url)
        self.model = model
        self.api_key = api_key or ""
        self.name = label
        headers = dict(extra_headers or {})
        if "openrouter.ai" in self.base_url:
            headers = {**OPENROUTER_HEADERS, **headers}
        self.extra_headers = headers

    def _headers(self) -> dict[str, str]:
        h = {"Content-Type": "application/json", **self.extra_headers}
        if self.api_key:
            h["Authorization"] = f"Bearer {self.api_key}"
        return h

    def _url(self, path: str) -> str:
        return f"{self.base_url}/v1/{path.lstrip('/')}"

    async def available(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=12.0) as c:
                r = await c.get(self._url("models"), headers=self._headers())
                return 200 <= r.status_code < 300
        except Exception:
            return False

    async def _post_chat(self, payload: dict[str, Any]) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(self._url("chat/completions"), json=payload, headers=self._headers())
            body: Any
            try:
                body = r.json()
            except Exception:
                body = {"raw": r.text[:800]}
            if r.status_code >= 400:
                err = body.get("error") if isinstance(body, dict) else body
                if isinstance(err, dict):
                    msg = err.get("message") or json.dumps(err)[:600]
                    code = err.get("code") or r.status_code
                else:
                    msg = str(err)[:600]
                    code = r.status_code
                raise RuntimeError(f"{self.name} HTTP {code}: {msg}")
            return body if isinstance(body, dict) else {"raw": body}

    def _parse_choice(self, data: dict[str, Any]) -> LLMResponse:
        choice = (data.get("choices") or [{}])[0]
        msg = choice.get("message") or {}
        content = msg.get("content") or ""
        if isinstance(content, list):
            content = "".join(
                (p.get("text") or "") if isinstance(p, dict) else str(p) for p in content
            )
        tcs: list[ToolCall] = []
        for tc in msg.get("tool_calls") or []:
            fn = tc.get("function") or {}
            args = fn.get("arguments") or "{}"
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except Exception:
                    args = {}
            tcs.append(ToolCall(id=tc.get("id", "call"), name=fn.get("name", ""), arguments=args if isinstance(args, dict) else {}))
        if not tcs:
            tcs = extract_text_tool_calls(content)
        return LLMResponse(content=content, tool_calls=tcs, provider=self.name, model=self.model)

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": [m.to_openai() for m in messages],
            "temperature": 0.2,
            "max_tokens": 2048,
        }
        if tools:
            payload["tools"] = tools
            payload["tool_choice"] = "auto"
        try:
            data = await self._post_chat(payload)
            return self._parse_choice(data)
        except RuntimeError as e:
            low = str(e).lower()
            tool_rejected = bool(tools) and any(
                s in low
                for s in (
                    "tool",
                    "function calling",
                    "does not support",
                    "unsupported parameter",
                    "tools are not supported",
                )
            )
            if tool_rejected:
                hint = Message(role="user", content=TEXT_TOOL_HINT)
                payload.pop("tools", None)
                payload.pop("tool_choice", None)
                payload["messages"] = [m.to_openai() for m in messages] + [hint.to_openai()]
                data = await self._post_chat(payload)
                return self._parse_choice(data)
            raise
