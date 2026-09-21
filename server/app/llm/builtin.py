from __future__ import annotations

from typing import Any

from .base import LLMProvider, LLMResponse, Message


class BuiltinProvider(LLMProvider):
    """
    Offline experimenter. Does not pretend to be a language model —
    the Agent uses the local planner when this provider is active.
    """

    name = "builtin"
    model = "prism-experimenter"

    async def chat(self, messages: list[Message], tools: list[dict[str, Any]] | None = None) -> LLMResponse:
        return LLMResponse(content="", tool_calls=[], provider=self.name, model=self.model)

    def info(self) -> dict[str, Any]:
        return {
            "provider": self.name,
            "model": self.model,
            "online": True,
            "note": "No local LLM detected. Using the built-in experimenter (same tools, same loop). Connect Ollama with qwen2.5 to enable full language reasoning.",
        }
