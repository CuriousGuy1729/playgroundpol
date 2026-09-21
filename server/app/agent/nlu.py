from __future__ import annotations

import re
from dataclasses import dataclass, field


META = {
    "stop": r"\b(stop|cancel|halt|abort)\b",
    "pause": r"\b(pause|hold on|wait)\b",
    "resume": r"\b(resume|continue|go on|keep going|unpause)\b",
    "retry": r"\b(try again|retry|once more|another try|different approach|try a different)\b",
    "undo": r"\b(undo|roll back|rollback|revert)\b",
    "reset": r"\b(reset|start over|clear the scene|restart)\b",
    "explain": r"\b(explain|why did|why'd|what happened|what did you try|walk me through)\b",
    "save": r"\b(save( this)?( experiment)?|snapshot|export)\b",
    "play": r"\b(play|run physics|unfreeze)\b",
}


@dataclass
class Intent:
    kind: str  # meta | task | question
    verb: str
    raw: str
    target: str | None = None
    asset: str | None = None
    constraints: list[str] = field(default_factory=list)
    extras: dict = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "kind": self.kind,
            "verb": self.verb,
            "raw": self.raw,
            "target": self.target,
            "asset": self.asset,
            "constraints": self.constraints,
        }


def parse_intent(text: str, context: dict | None = None) -> Intent:
    raw = text.strip()
    low = raw.lower()
    ctx = context or {}

    for verb, pat in META.items():
        if re.search(pat, low):
            kind = "question" if verb == "explain" else "meta"
            return Intent(kind=kind, verb=verb, raw=raw)

    constraints: list[str] = []
    if re.search(r"without changing the robot|don't change the robot|do not change the robot|keep the robot", low):
        constraints.append("no_morphology")
    if re.search(r"without (adding|changing) (the )?(scene|environment|world)", low):
        constraints.append("no_environment")
    if re.search(r"no (cheating|external force|magic)", low):
        constraints.append("no_external_force")

    target = None
    for pat, name in (
        (r"red cube|the cube|target cube", "red cube"),
        (r"\bstairs?\b|staircase", "stairs"),
        (r"\bramp\b", "ramp"),
        (r"\bdoor\b", "door"),
        (r"\bthe ball|\bsphere\b", "sphere"),
        (r"\bbox\b", "box"),
    ):
        if re.search(pat, low):
            target = name
            break

    asset = None
    for pat, name in (
        (r"\bhauler\b|\bwheeled\b|\bvehicle\b|\bcar\b", "hauler"),
        (r"\bbiped\b|\bhumanoid\b|\bkiosk\b", "kiosk"),
        (r"\barm\b|\breach\b|\bmanipulator\b", "reach"),
        (r"\bquad|\bpulse\b|\blegged robot\b", "pulse"),
        (r"\bramp\b", "ramp"),
        (r"\bstairs?\b", "stairs"),
        (r"\bdoor\b", "door"),
        (r"\bsphere\b|\bball\b", "sphere"),
        (r"\bcylinder\b", "cylinder"),
        (r"\bbox\b|\bcube\b|\bcrate\b", "box"),
    ):
        if re.search(pat, low):
            asset = name
            break

    if re.search(r"\b(add|create|spawn|insert|place|build|put)\b", low):
        return Intent("task", "add", raw, target=target, asset=asset or target, constraints=constraints)

    if re.search(r"\b(load|swap|replace|use|switch to)\b.+\b(robot|hauler|pulse|kiosk|arm|biped)\b", low) or re.search(
        r"\b(use|try|load) (a |the )?(wheeled|hauler|biped|arm)", low
    ):
        return Intent("task", "load", raw, asset=asset or "hauler", constraints=constraints)

    if re.search(r"\b(climb|ascend|go up)\b", low):
        return Intent("task", "climb", raw, target=target or "stairs", constraints=constraints)

    if re.search(r"\b(carry|bring|take|deliver)\b", low):
        return Intent("task", "carry", raw, target=target, constraints=constraints)

    if re.search(r"\b(grab|pick up|grasp|push|nudge)\b", low):
        return Intent("task", "manipulate", raw, target=target, constraints=constraints)

    if re.search(r"\b(balance|stand still|stay upright)\b", low):
        return Intent("task", "balance", raw, constraints=constraints)

    if re.search(r"\b(walk|go to|move to|approach|reach|get to|head to|locomot|drive|roll)\b", low):
        return Intent("task", "walk", raw, target=target or ctx.get("last_target"), constraints=constraints)

    if re.search(r"\b(make it walk|make the robot walk|walk forward|take a step)\b", low):
        return Intent("task", "walk", raw, target=target, constraints=constraints)

    if re.search(r"\bfaster\b|\bincrease speed\b", low):
        return Intent("task", "tune", raw, extras={"speed": 1.4}, constraints=constraints)
    if re.search(r"\bslower\b", low):
        return Intent("task", "tune", raw, extras={"speed": 0.7}, constraints=constraints)
    if re.search(r"friction", low):
        return Intent("task", "physics", raw, extras={"friction": 1.3 if "more" in low or "increase" in low else 0.4})
    if re.search(r"gravity", low):
        return Intent("task", "physics", raw, extras={"gravity": -4 if "less" in low or "moon" in low else -9.81})

    if re.search(r"\b(inspect|look|what('s| is) in the scene|describe the scene)\b", low):
        return Intent("question", "inspect", raw)

    if "?" in raw:
        return Intent("question", "explain", raw, target=target)

    # Follow-up: if we have an active objective, treat as a refinement.
    if ctx.get("objective"):
        if re.search(r"\bnow\b|\bthen\b|\binstead\b|\bbut\b", low):
            if asset and re.search(r"\badd\b", low):
                return Intent("task", "add", raw, asset=asset, constraints=constraints)
            return Intent("task", "walk", raw, target=target or ctx.get("last_target"), constraints=constraints)

    return Intent("task", "walk", raw, target=target, asset=asset, constraints=constraints)
