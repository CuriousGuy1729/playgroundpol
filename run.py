from __future__ import annotations

import uvicorn

from server.app.config import HOST, PORT


if __name__ == "__main__":
    uvicorn.run("server.app.main:app", host=HOST, port=PORT, reload=False)
