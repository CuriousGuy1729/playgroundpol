from __future__ import annotations

from typing import Any

from .memory import ExperimentMemory


CONCEPTS = {
    "stability": {
        "title": "Center of mass vs support polygon",
        "body": "A robot stays upright while the projection of its center of mass falls inside the polygon spanned by its contacts. Large hip amplitudes shove that projection outside the feet, which is why early attempts pitched over.",
    },
    "friction": {
        "title": "Friction cones",
        "body": "Tangential force at a contact cannot exceed μN. If a gait commands a foot to push harder than the cone allows, the foot slips and the body yaws or marks time.",
    },
    "phase": {
        "title": "Gait phase",
        "body": "Relative phase between legs decides the gait family: 180° on the diagonals is a trot, 180° front/hind is a bound, same-side 180° is a pace. The experimenter searched this discrete group before hill-climbing amplitudes.",
    },
    "pd": {
        "title": "PD motor tracking",
        "body": "Each hinge is a PD servo: torque ≈ kp(q* − q) − kd q̇. The oscillator only sets q*(t); the physics engine and contact forces decide what actually happens.",
    },
    "diffdrive": {
        "title": "Differential drive",
        "body": "Two wheels at ±track/2. Forward velocity is the average of wheel linear speeds; yaw rate is their difference over the track width. Heading error maps cleanly onto that difference.",
    },
    "impulse": {
        "title": "Impulse vs continuous control",
        "body": "A one-shot force changes momentum instantly but does not stabilize the pose. Continuous joint control can recover; an impulse often cannot.",
    },
}


def build_lesson(memory: ExperimentMemory, success: bool) -> dict[str, Any]:
    attempts = memory.attempts
    if not attempts:
        return {"title": "No experiments yet", "sections": []}
    failed = [a for a in attempts if not a.success]
    best = memory.best()
    concepts = []
    blob = " ".join(a.strategy for a in attempts)
    if "gait" in blob or "trot" in blob or "hill" in blob:
        concepts += ["phase", "stability", "pd"]
    if "diff_drive" in blob:
        concepts += ["diffdrive"]
    if "impulse" in blob or "force" in blob:
        concepts += ["impulse"]
    if any(a.evaluation.get("metrics", {}).get("fallen") for a in attempts):
        concepts.append("stability")
    # unique preserve order
    seen = set()
    uniq = []
    for c in concepts:
        if c not in seen:
            seen.add(c)
            uniq.append(CONCEPTS[c])

    tried = []
    for a in attempts:
        tried.append(
            {
                "id": a.id,
                "strategy": a.strategy,
                "score": a.score,
                "result": a.result,
                "why": _why(a),
            }
        )

    what_worked = None
    if success and best:
        what_worked = {
            "strategy": best.strategy,
            "parameters": best.parameters,
            "score": best.score,
            "note": "The winning attempt is the one whose controller parameters produced forward progress without dropping uprightness below the fall threshold.",
        }

    return {
        "title": "What the physics taught us",
        "objective": memory.objective,
        "success": success,
        "tried": tried,
        "whatWorked": what_worked,
        "concepts": uniq[:4],
        "takeaway": _takeaway(attempts, success),
    }


def _why(a) -> str:
    m = a.evaluation.get("metrics") or {}
    if m.get("fallen"):
        return "CoM left the support polygon — uprightness collapsed."
    dist = m.get("distanceToTarget")
    trav = m.get("traveled") or 0
    if dist is not None and trav < 0.08:
        return "Joints moved but net displacement was near zero (marking time or slipping)."
    if dist is not None:
        return f"Moved, but still {dist:.2f}m from the target."
    return a.result


def _takeaway(attempts, success: bool) -> str:
    if success:
        return (
            "A usable behavior emerged from bounded search over controller parameters, "
            "not from a hardcoded animation. You can replay any attempt and keep iterating."
        )
    if not attempts:
        return "No data yet."
    return (
        "Nothing in the budget crossed the success threshold. The useful residue is the "
        "score landscape — which phases fell, which produced net travel — ready for the next prompt."
    )
