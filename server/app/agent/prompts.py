SYSTEM = """You are PRISM, a local AI collaborator inside a real PyBullet physics lab.

You are NOT given solutions. You never call a walk(), jump(), or grab() primitive because those do not exist.
You compose general tools, run the simulator, observe, evaluate, and modify parameters.

Rules:
- Always inspect_scene before acting on a new request.
- Prefer small, reversible experiments.
- After modify_controller / apply_force / create_*, always run_simulation then observe_state and evaluate_result.
- Bound yourself: at most 8 attempts. Stop early on success.
- If the user forbids changing the robot, do not load_model a different robot or reshape links.
- Never ask for a host shell. Never write files outside save_experiment.
- Speak like a live lab partner: short, concrete, in the present tense.
- When you fail, say what the metrics showed (fell, slipped, traveled 12cm, upright 0.4).
- When you succeed, summarize the controller parameters that worked.

Coordinate system: PyBullet Z-up, X forward of the default robot spawn.

Tools you can call:
inspect_scene, search_assets, load_model, create_body, create_joint, set_physics,
apply_force, set_motor, modify_controller, run_simulation, observe_state,
evaluate_result, modify_scene, save_experiment.
"""


TOOL_SCHEMAS = [
    {
        "type": "function",
        "function": {
            "name": "inspect_scene",
            "description": "List bodies, joints, poses, tags and capabilities in the physics world.",
            "parameters": {"type": "object", "properties": {}},
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_assets",
            "description": "Search the local asset library by name, tag or capability.",
            "parameters": {
                "type": "object",
                "properties": {"query": {"type": "string"}},
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "load_model",
            "description": "Spawn an asset from the library. as_actor=true makes it the robot under control.",
            "parameters": {
                "type": "object",
                "properties": {
                    "asset_id": {"type": "string"},
                    "position": {"type": "array", "items": {"type": "number"}},
                    "as_actor": {"type": "boolean"},
                },
                "required": ["asset_id"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_body",
            "description": "Create a rigid primitive (box, sphere, cylinder).",
            "parameters": {
                "type": "object",
                "properties": {
                    "shape": {"type": "string", "enum": ["box", "sphere", "cylinder"]},
                    "size": {"type": "array", "items": {"type": "number"}},
                    "mass": {"type": "number"},
                    "position": {"type": "array", "items": {"type": "number"}},
                    "color": {"type": "array", "items": {"type": "number"}},
                    "name": {"type": "string"},
                },
                "required": ["shape", "position"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "create_joint",
            "description": "Create a constraint between two bodies (hinge/slider/fixed).",
            "parameters": {
                "type": "object",
                "properties": {
                    "body_a": {"type": "integer"},
                    "body_b": {"type": "integer"},
                    "joint_type": {"type": "string"},
                    "pivot_a": {"type": "array", "items": {"type": "number"}},
                    "pivot_b": {"type": "array", "items": {"type": "number"}},
                    "axis": {"type": "array", "items": {"type": "number"}},
                },
                "required": ["body_a", "body_b", "joint_type"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "set_physics",
            "description": "Set gravity, default friction, restitution or timestep.",
            "parameters": {
                "type": "object",
                "properties": {
                    "gravity": {},
                    "friction": {"type": "number"},
                    "restitution": {"type": "number"},
                    "timestep": {"type": "number"},
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "apply_force",
            "description": "Apply a bounded world-frame force to a body. Not a locomotion solution.",
            "parameters": {
                "type": "object",
                "properties": {
                    "body_id": {"type": "integer"},
                    "force": {"type": "array", "items": {"type": "number"}},
                    "position": {"type": "array", "items": {"type": "number"}},
                },
                "required": ["body_id", "force"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "set_motor",
            "description": "Set a single joint motor (position or velocity).",
            "parameters": {
                "type": "object",
                "properties": {
                    "body_id": {"type": "integer"},
                    "joint": {},
                    "mode": {"type": "string"},
                    "value": {"type": "number"},
                    "force": {"type": "number"},
                },
                "required": ["body_id", "joint", "mode", "value"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "modify_controller",
            "description": "Attach a generic controller: oscillator, pd, diff_drive, or force. Pass joint parameters to search gaits.",
            "parameters": {
                "type": "object",
                "properties": {
                    "body_id": {"type": "integer"},
                    "type": {"type": "string"},
                    "joints": {"type": "object"},
                    "linear": {"type": "number"},
                    "angular": {"type": "number"},
                    "targets": {"type": "object"},
                    "freq": {"type": "number"},
                    "force": {"type": "number"},
                    "kp": {"type": "number"},
                    "kd": {"type": "number"},
                },
                "required": ["body_id", "type"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "run_simulation",
            "description": "Step PyBullet for N seconds (capped). Streams poses to the viewport.",
            "parameters": {
                "type": "object",
                "properties": {"seconds": {"type": "number"}, "steps": {"type": "integer"}},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "observe_state",
            "description": "Read pose, IMU-like uprightness, contacts, and distance to target.",
            "parameters": {
                "type": "object",
                "properties": {"body_id": {"type": "integer"}},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "evaluate_result",
            "description": "Score the current state against the active objective.",
            "parameters": {
                "type": "object",
                "properties": {"objective": {"type": "string"}},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "modify_scene",
            "description": "High-level scene edits: add stairs/ramp/door, move or remove a body.",
            "parameters": {
                "type": "object",
                "properties": {
                    "op": {"type": "string"},
                    "what": {"type": "string"},
                    "body_id": {"type": "integer"},
                    "position": {"type": "array", "items": {"type": "number"}},
                    "steps": {"type": "integer"},
                },
                "required": ["op"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "save_experiment",
            "description": "Persist the current experiment memory to the local project.",
            "parameters": {
                "type": "object",
                "properties": {"name": {"type": "string"}},
            },
        },
    },
]
