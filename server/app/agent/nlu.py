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
            "extras": self.extras,
        }


def parse_intent(text: str, context: dict | None = None) -> Intent:
    raw = text.strip()
    low = raw.lower()
    ctx = context or {}

    for verb, pat in META.items():
        if re.search(pat, low):
            kind = "question" if verb == "explain" else "meta"
            return Intent(kind=kind, verb=verb, raw=raw)

    campaign = _campaign_intent(raw, low)
    if campaign:
        return campaign

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
        (r"\br2d2\b", "r2d2"),
        (r"\bhusky\b", "husky"),
        (r"\bracecar\b|\brace car\b", "racecar"),
        (r"\blaikago\b", "laikago"),
        (r"\ba1\b|unitree", "a1"),
        (r"\bmini[- ]?cheetah\b", "mini_cheetah"),
        (r"\bminitaur\b", "minitaur"),
        (r"\bhumanoid\b", "humanoid"),
        (r"\bkuka\b|\biiwa\b", "kuka"),
        (r"\bpanda\b|\bfranka\b", "panda"),
        (r"\bxarm\b", "xarm"),
        (r"\bcartpole\b|\bcart-pole\b|\bcart pole\b", "cartpole"),
        (r"\bquadruped\b", "quadruped"),
        (r"\bhauler\b|\bwheeled\b|\bvehicle\b|\bcar\b", "hauler"),
        (r"\bbiped\b|\bkiosk\b", "kiosk"),
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

    if re.search(
        r"\b(load|swap|replace|use|switch to)\b.+\b(robot|hauler|pulse|kiosk|arm|biped|r2d2|husky|laikago|kuka|panda|cartpole|humanoid)\b",
        low,
    ) or re.search(
        r"\b(use|try|load) (a |the )?(wheeled|hauler|biped|arm|r2d2|husky|laikago|kuka|panda)",
        low,
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


def _parse_count(low: str) -> int | None:
    if re.search(r"\b(1\s*)?million\b|1,?000,?000|\b1m\b", low):
        return 1_000_000
    if re.search(r"\b100,?000\b|\b100k\b", low):
        return 100_000
    if re.search(r"\b10,?000\b|\b10k\b", low):
        return 10_000
    if re.search(r"\b1,?000\b|\b1000\b|\b1k\b|a thousand", low):
        return 1000
    if re.search(r"\b100\b|a hundred", low):
        return 100
    m = re.search(r"(\d[\d,_]*)\s*(trials?|experiments?|runs?|sims?)", low)
    if m:
        return int(m.group(1).replace(",", "").replace("_", ""))
    return None


def _campaign_intent(raw: str, low: str) -> Intent | None:
    n = _parse_count(low)
    flagged = bool(re.search(r"\b(campaign|dataset|distill|batch)\b", low))
    bulk = bool(n and re.search(r"\b(trials?|experiments?|sims?)\b", low))
    if not flagged and not bulk:
        return None
    usecase = "gait_search"
    if re.search(r"cartpole|cart-pole|balance pole", low):
        usecase = "cartpole"
    elif re.search(r"domain|randomiz", low):
        usecase = "domain_rand"
    elif re.search(r"impulse|robust", low):
        usecase = "robustness"
    elif re.search(r"kuka|panda|xarm|arm reach|manipulat", low):
        usecase = "arm_reach"
    elif re.search(r"husky|racecar|r2d2|wheeled|nav", low):
        usecase = "wheeled_nav"
    elif re.search(r"gait", low):
        usecase = "gait_search"
    asset = None
    for pat, name in (
        (r"\br2d2\b", "r2d2"),
        (r"\bhusky\b", "husky"),
        (r"\bracecar\b", "racecar"),
        (r"\blaikago\b", "laikago"),
        (r"\ba1\b", "a1"),
        (r"\bmini[- ]?cheetah\b", "mini_cheetah"),
        (r"\bminitaur\b", "minitaur"),
        (r"\bhumanoid\b", "humanoid"),
        (r"\bkuka\b", "kuka"),
        (r"\bpanda\b|\bfranka\b", "panda"),
        (r"\bxarm\b", "xarm"),
        (r"\bcartpole\b", "cartpole"),
        (r"\bhauler\b", "hauler"),
        (r"\bpulse\b", "pulse"),
        (r"\bkiosk\b", "kiosk"),
        (r"\breach\b", "reach"),
    ):
        if re.search(pat, low):
            asset = name
            break
    extras = {"n": n or 1000, "usecase": usecase}
    if asset:
        extras["asset"] = asset
    if re.search(r"\b2 (sims?|workers?|clients?)\b|\btwo sims\b", low):
        extras["workers"] = 2
    return Intent("task", "campaign", raw, asset=asset, extras=extras)
