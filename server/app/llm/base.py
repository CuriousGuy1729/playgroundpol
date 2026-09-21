from __future__ import annotations

from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, AsyncIterator


@dataclass
class Message:
    role: str
    content: str
    name: str | None = None
    tool_call_id: str | None = None
    tool_calls: list[dict[str, Any]] | None = None

    def to_openai(self) -> dict[str, Any]:
        d: dict[str, Any] = {"role": self.role, "content": self.content}
        if self.name:
            d["name"] = self.name
        if self.tool_call_id:
            d["tool_call_id"] = self.tool_call_id
        if self.tool_calls:
            d["tool_calls"] = self.tool_calls
        return d

    def to_ollama(self) -> dict[str, Any]:
        d: dict[str, Any] = {"role": self.role, "content": self.content or ""}
        if self.tool_calls:
            d["tool_calls"] = [
                {
                    "function": {
                        "name": tc.get("function", {}).get("name"),
                        "arguments": tc.get("function", {}).get("arguments"),
                    }
                }
                for tc in self.tool_calls
            ]
        if self.role == "tool":
            d["role"] = "tool"
        return d


@dataclass
class ToolCall:
    id: str
    name: str
    arguments: dict[str, Any]


@dataclass
class LLMResponse:
    content: str = ""
    tool_calls: list[ToolCall] = field(default_factory=list)
    provider: str = ""
    model: str = ""


class LLMProvider(ABC):
    name = "base"
    model = ""

    @abstractmethod
    async def chat(
        self,
        messages: list[Message],
        tools: list[dict[str, Any]] | None = None,
    ) -> LLMResponse:
        ...

    async def stream(
        self,
        messages: list[Message],
        tools: list[dict[str, Any]] | None = None,
    ) -> AsyncIterator[str]:
        res = await self.chat(messages, tools)
        if res.content:
            yield res.content
        return

    def info(self) -> dict[str, Any]:
        return {"provider": self.name, "model": self.model, "online": True}


async def detect_provider() -> LLMProvider:
    from ..config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL, LLM_PROVIDER
    from .hub import hub

    # User-configured hub wins over env auto-detect.
    if hub.data.get("active_provider") and hub.data.get("active_provider") != "builtin":
        try:
            p = hub.make_provider()
            if p.name != "builtin":
                return p
        except Exception:
            pass

    provider = (LLM_PROVIDER or "auto").lower()
    if provider in ("builtin", "none", "off"):
        from .builtin import BuiltinProvider

        return BuiltinProvider()

    if provider in ("auto", "ollama"):
        try:
            from .ollama import OllamaProvider

            o = OllamaProvider(base_url=LLM_BASE_URL, model=LLM_MODEL)
            if await o.available():
                return o
            if provider == "ollama":
                return o
        except Exception:
            if provider == "ollama":
                from .builtin import BuiltinProvider

                return BuiltinProvider()

    if provider in ("auto", "llamacpp", "llama.cpp", "openai", "vllm", "compatible"):
        try:
            from .openai_compat import OpenAICompatProvider

            url = LLM_BASE_URL
            if provider == "auto":
                url = LLM_BASE_URL if "11434" not in LLM_BASE_URL else "http://127.0.0.1:8080"
            o = OpenAICompatProvider(base_url=url, model=LLM_MODEL, api_key=LLM_API_KEY)
            if await o.available():
                return o
        except Exception:
            pass

    from .builtin import BuiltinProvider

    return BuiltinProvider()
