export type Handler = (msg: Record<string, unknown>) => void;

export class LabSocket {
  ws: WebSocket | null = null;
  handlers = new Set<Handler>();
  reconnects = 0;
  closed = false;

  connect() {
    this.closed = false;
    this._open();
  }

  private url(): string {
    const proto = location.protocol === "https:" ? "wss:" : "ws:";
    return `${proto}//${location.host}/ws`;
  }

  private _open() {
    const ws = new WebSocket(this.url());
    this.ws = ws;
    ws.onopen = () => {
      this.reconnects = 0;
      this.emit({ type: "_open" });
    };
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(String(ev.data));
        this.emit(msg);
      } catch {
        /* ignore */
      }
    };
    ws.onclose = () => {
      this.emit({ type: "_close" });
      if (!this.closed) {
        const wait = Math.min(4000, 400 + this.reconnects * 400);
        this.reconnects += 1;
        setTimeout(() => this._open(), wait);
      }
    };
  }

  emit(msg: Record<string, unknown>) {
    this.handlers.forEach((h) => h(msg));
  }

  on(h: Handler) {
    this.handlers.add(h);
    return () => this.handlers.delete(h);
  }

  send(msg: Record<string, unknown>) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  close() {
    this.closed = true;
    this.ws?.close();
  }
}
