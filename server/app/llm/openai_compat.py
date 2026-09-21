from __future__ import annotations

import json
import re
from typing import Any, Awaitable, Callable

import httpx

from ..config import LLM_TIMEOUT
from .base import LLMProvider, LLMResponse, Message, ToolCall

OPENROUTER_HEADERS = {
    "HTTP-Referer": "https://github.com/CuriousGuy1729/playgroundpol",
    "X-Title": "PRISM Lab",
}

DEFAULT_OPENROUTER_MODEL = "google/gemma-4-26b-a4b-it:free"

DeltaFn = Callable[[str], Awaitable[None]] | None

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
    """OpenAI-compatible chat. OpenRouter uses the same /chat/completions stream as @openrouter/sdk."""

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
            if not self.model:
                self.model = DEFAULT_OPENROUTER_MODEL
        self.extra_headers = headers

    def _headers(self) -> dict[str, str]:
        h = {"Content-Type": "application/json", **self.extra_headers}
        if self.api_key:
            h["Authorization"] = f"Bearer {self.api_key}"
        return h

    def _url(self, path: str) -> str:
        return f"{self.base_url}/v1/{path.lstrip('/')}"

    def _is_openrouter(self) -> bool:
        return "openrouter.ai" in self.base_url or self.name == "openrouter"

    async def available(self) -> bool:
        try:
            async with httpx.AsyncClient(timeout=12.0) as c:
                r = await c.get(self._url("models"), headers=self._headers())
                return 200 <= r.status_code < 300
        except Exception:
            return False

    def _raise_http(self, status: int, body: Any) -> None:
        err = body.get("error") if isinstance(body, dict) else body
        if isinstance(err, dict):
            msg = err.get("message") or json.dumps(err)[:600]
            code = err.get("code") or status
        else:
            msg = str(err)[:600]
            code = status
        raise RuntimeError(f"{self.name} HTTP {code}: {msg}")

    async def _post_chat(self, payload: dict[str, Any]) -> dict[str, Any]:
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            r = await c.post(self._url("chat/completions"), json=payload, headers=self._headers())
            try:
                body = r.json()
            except Exception:
                body = {"raw": r.text[:800]}
            if r.status_code >= 400:
                self._raise_http(r.status_code, body)
            return body if isinstance(body, dict) else {"raw": body}

    async def _stream_chat(self, payload: dict[str, Any], on_delta: DeltaFn = None) -> LLMResponse:
        body = dict(payload)
        body["stream"] = True
        body["stream_options"] = {"include_usage": True}
        content = ""
        tool_acc: dict[int, dict[str, str]] = {}
        async with httpx.AsyncClient(timeout=LLM_TIMEOUT) as c:
            async with c.stream("POST", self._url("chat/completions"), json=body, headers=self._headers()) as r:
                if r.status_code >= 400:
                    raw = (await r.aread()).decode("utf-8", "replace")[:800]
                    try:
                        parsed = json.loads(raw)
                    except Exception:
                        parsed = {"raw": raw}
                    self._raise_http(r.status_code, parsed)
                async for line in r.aiter_lines():
                    if not line or line.startswith(":"):
                        continue
                    if not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if data == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data)
                    except Exception:
                        continue
                    choice = (chunk.get("choices") or [{}])[0]
                    delta = choice.get("delta") or {}
                    piece = delta.get("content") or ""
                    if isinstance(piece, list):
                        piece = "".join(
                            (p.get("text") or "") if isinstance(p, dict) else str(p) for p in piece
                        )
                    if piece:
                        content += piece
                        if on_delta:
                            await on_delta(piece)
                    for tc in delta.get("tool_calls") or []:
                        idx = int(tc.get("index") or 0)
                        slot = tool_acc.setdefault(idx, {"id": "", "name": "", "arguments": ""})
                        if tc.get("id"):
                            slot["id"] = str(tc["id"])
                        fn = tc.get("function") or {}
                        if fn.get("name"):
                            slot["name"] += str(fn["name"])
                        if fn.get("arguments"):
                            slot["arguments"] += str(fn["arguments"])
        tcs: list[ToolCall] = []
        for i, slot in sorted(tool_acc.items()):
            args: Any = slot.get("arguments") or "{}"
            if isinstance(args, str):
                try:
                    args = json.loads(args)
                except Exception:
                    args = {}
            tcs.append(
                ToolCall(
                    id=slot.get("id") or f"call_{i}",
                    name=slot.get("name") or "",
                    arguments=args if isinstance(args, dict) else {},
                )
            )
        if not tcs:
            tcs = extract_text_tool_calls(content)
        return LLMResponse(content=content, tool_calls=tcs, provider=self.name, model=self.model)

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
            tcs.append(
                ToolCall(
                    id=tc.get("id", "call"),
                    name=fn.get("name", ""),
                    arguments=args if isinstance(args, dict) else {},
                )
            )
        if not tcs:
            tcs = extract_text_tool_calls(content)
        return LLMResponse(content=content, tool_calls=tcs, provider=self.name, model=self.model)

    async def chat(
        self,
        messages: list[Message],
        tools: list[dict[str, Any]] | None = None,
        on_delta: DeltaFn = None,
    ) -> LLMResponse:
        payload: dict[str, Any] = {
            "model": self.model,
            "messages": [m.to_openai() for m in messages],
            "temperature": 0.2,
            "max_tokens": 2048,
        }
        if tools:
            payload["tools"] = tools
            payload["tool_choice"] = "auto"
        use_stream = self._is_openrouter() or on_delta is not None
        try:
            if use_stream:
                return await self._stream_chat(payload, on_delta=on_delta)
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
                if use_stream:
                    return await self._stream_chat(payload, on_delta=on_delta)
                data = await self._post_chat(payload)
                return self._parse_choice(data)
            raise
