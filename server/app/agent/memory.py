from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any


@dataclass
class Attempt:
    id: int
    objective: str
    strategy: str
    action: str
    parameters: dict[str, Any]
    result: str
    evaluation: dict[str, Any]
    score: float
    success: bool
    notes: str = ""
    trajectory: list[dict[str, Any]] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "objective": self.objective,
            "strategy": self.strategy,
            "action": self.action,
            "parameters": self.parameters,
            "result": self.result,
            "evaluation": {k: v for k, v in self.evaluation.items() if k != "observation"},
            "score": self.score,
            "success": self.success,
            "notes": self.notes,
            "trajectory": self.trajectory,
        }

    def summary(self) -> str:
        return (
            f"Attempt {self.id:02d} [{self.strategy}] score={self.score:.3f} "
            f"{'OK' if self.success else 'fail'} — {self.result}"
        )


class ExperimentMemory:
    def __init__(self) -> None:
        self.attempts: list[Attempt] = []
        self.objective: str = ""
        self.constraints: list[str] = []
        self.user_turns: list[str] = []
        self.lessons: list[dict[str, Any]] = []

    def add(self, att: Attempt) -> None:
        self.attempts.append(att)

    def next_id(self) -> int:
        return len(self.attempts) + 1

    def last(self) -> Attempt | None:
        return self.attempts[-1] if self.attempts else None

    def best(self) -> Attempt | None:
        if not self.attempts:
            return None
        return max(self.attempts, key=lambda a: a.score)

    def strategies_tried(self) -> list[str]:
        return [a.strategy for a in self.attempts]

    def clear_task(self) -> None:
        self.attempts.clear()
        self.objective = ""
        self.constraints = []

    def transcript(self, n: int = 6) -> str:
        lines = []
        for a in self.attempts[-n:]:
            lines.append(a.summary())
        return "\n".join(lines)

    def to_dict(self) -> dict[str, Any]:
        return {
            "objective": self.objective,
            "constraints": self.constraints,
            "attempts": [a.to_dict() for a in self.attempts],
        }
