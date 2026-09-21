from __future__ import annotations

import json
import shutil
import sqlite3
import time
import zipfile
from pathlib import Path
from typing import Any

from ..config import DEFAULT_PROJECT, PROJECTS_DIR


SCHEMA = """
CREATE TABLE IF NOT EXISTS experiments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created REAL NOT NULL,
  objective TEXT,
  success INTEGER,
  score REAL,
  attempts INTEGER,
  path TEXT
);
"""


class ProjectManager:
    def __init__(self, name: str = DEFAULT_PROJECT) -> None:
        self.name = name
        self.root = PROJECTS_DIR / name
        self._ensure()

    def _ensure(self) -> None:
        for sub in ("assets", "scenes", "experiments", "models", "scripts", "screenshots"):
            (self.root / sub).mkdir(parents=True, exist_ok=True)
        meta = self.root / "project.json"
        if not meta.exists():
            meta.write_text(
                json.dumps(
                    {
                        "name": self.name,
                        "created": time.time(),
                        "version": 1,
                        "scene": "main",
                        "description": "Default Prism Lab arena",
                    },
                    indent=2,
                )
            )
        db = self.root / "experiments.db"
        con = sqlite3.connect(db)
        con.executescript(SCHEMA)
        con.commit()
        con.close()

    def meta(self) -> dict[str, Any]:
        return json.loads((self.root / "project.json").read_text())

    def save_scene(self, scene: dict[str, Any], name: str = "main") -> Path:
        path = self.root / "scenes" / f"{name}.json"
        path.write_text(json.dumps(scene, indent=2))
        return path

    def save_experiment(self, payload: dict[str, Any]) -> Path:
        stamp = time.strftime("%Y%m%d-%H%M%S")
        safe = "".join(c for c in payload.get("name", "exp") if c.isalnum() or c in "-_")[:40]
        path = self.root / "experiments" / f"{stamp}-{safe}.json"
        path.write_text(json.dumps(payload, indent=2))
        con = sqlite3.connect(self.root / "experiments.db")
        con.execute(
            "INSERT INTO experiments (created, objective, success, score, attempts, path) VALUES (?,?,?,?,?,?)",
            (
                time.time(),
                payload.get("objective", ""),
                1 if payload.get("success") else 0,
                float(payload.get("score") or 0),
                int(payload.get("attempts") or 0),
                str(path),
            ),
        )
        con.commit()
        con.close()
        return path

    def list_experiments(self) -> list[dict[str, Any]]:
        con = sqlite3.connect(self.root / "experiments.db")
        con.row_factory = sqlite3.Row
        rows = con.execute("SELECT * FROM experiments ORDER BY id DESC LIMIT 50").fetchall()
        con.close()
        return [dict(r) for r in rows]

    def export_zip(self, dest: Path | None = None) -> Path:
        dest = dest or (self.root.parent / f"{self.name}.prism.zip")
        with zipfile.ZipFile(dest, "w", zipfile.ZIP_DEFLATED) as z:
            for f in self.root.rglob("*"):
                if f.is_file():
                    z.write(f, f.relative_to(self.root.parent))
        return dest

    def import_zip(self, src: Path, name: str | None = None) -> Path:
        name = name or src.stem.replace(".prism", "")
        target = PROJECTS_DIR / name
        if target.exists():
            shutil.rmtree(target)
        target.mkdir(parents=True)
        with zipfile.ZipFile(src) as z:
            z.extractall(PROJECTS_DIR)
        return target
