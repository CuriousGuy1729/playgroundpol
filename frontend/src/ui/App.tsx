import { useEffect, useMemo, useRef, useState } from "react";
import { LabSocket } from "../net/ws";
import { ViewportEngine } from "../viewport/engine";
import type {
  Asset,
  Attempt,
  BodyDesc,
  CampaignStatus,
  ChatMsg,
  DownloadInfo,
  HubSnapshot,
  Lesson,
  LlmInfo,
} from "../types";
import { ModelsPanel } from "./ModelsPanel";
import { ResearchPanel } from "./ResearchPanel";

const HINTS = [
  "Make this robot walk to the red cube.",
  "Add a ramp and see what happens.",
  "Try solving it without changing the robot.",
  "Now make it climb the stairs.",
  "Why did it fall?",
  "Load the Husky robot.",
  "Run 100 gait-search experiments and distill a dataset.",
];

let msgSeq = 1;

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ViewportEngine | null>(null);
  const wsRef = useRef<LabSocket | null>(null);
  const msgsRef = useRef<HTMLDivElement>(null);

  const [booted, setBooted] = useState(false);
  const [connected, setConnected] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [bodies, setBodies] = useState<BodyDesc[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [agent, setAgent] = useState("idle");
  const [sim, setSim] = useState("pause");
  const [speed, setSpeed] = useState(1);
  const [llm, setLlm] = useState<LlmInfo | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [leftTab, setLeftTab] = useState<"scene" | "assets">("scene");
  const [rightTab, setRightTab] = useState<"chat" | "timeline">("chat");
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [cam, setCam] = useState("iso");
  const [fps, setFps] = useState(0);
  const [simTime, setSimTime] = useState(0);
  const [tool, setTool] = useState<string | null>(null);
  const [hint, setHint] = useState(0);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const [hub, setHub] = useState<HubSnapshot | null>(null);
  const [download, setDownload] = useState<DownloadInfo | null>(null);
  const [campaign, setCampaign] = useState<CampaignStatus | null>(null);

  const busy = agent === "experimenting" || agent === "thinking";

  useEffect(() => {
    const id = setInterval(() => setHint((h) => (h + 1) % HINTS.length), 4200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/assets")
      .then((r) => r.json())
      .then(setAssets)
      .catch(() => undefined);
    fetch("/api/llm/hub")
      .then((r) => r.json())
      .then(setHub)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!modelsOpen) return;
    fetch("/api/llm/hub")
      .then((r) => r.json())
      .then(setHub)
      .catch(() => undefined);
  }, [modelsOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = new ViewportEngine(canvas);
    engineRef.current = engine;
    engine.setHandlers({
      onSelect: (id) => setSelected(id),
      onEdit: (id, pos) => wsRef.current?.send({ type: "edit", id, position: pos }),
    });
    const ro = new ResizeObserver(() => {
      const el = wrapRef.current;
      if (!el) return;
      engine.resize(el.clientWidth, el.clientHeight);
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    const fpsTimer = setInterval(() => {
      setFps(engine.fps);
      setSimTime(engine.simTime);
    }, 250);

    const ws = new LabSocket();
    wsRef.current = ws;
    const off = ws.on((msg) => {
      const t = String(msg.type || "");
      if (t === "_open") setConnected(true);
      if (t === "_close") setConnected(false);
      if (t === "hello") {
        setLlm(msg.llm as LlmInfo);
        if (msg.hub) setHub(msg.hub as HubSnapshot);
        setBooted(true);
      }
      if (t === "hub") setHub(msg as unknown as HubSnapshot);
      if (t === "download") {
        setDownload(msg as unknown as DownloadInfo);
        if (msg.status === "done") {
          fetch("/api/llm/hub")
            .then((r) => r.json())
            .then(setHub)
            .catch(() => undefined);
        }
      }
      if (t === "llm") {
        setLlm(msg as unknown as LlmInfo);
        if (msg.hub) setHub(msg.hub as HubSnapshot);
      }
      if (t === "scene") {
        const list = (msg.bodies as BodyDesc[]) || [];
        setBodies(list);
        engine.setScene(list, (msg.actorId as number) ?? null, (msg.targetId as number) ?? null);
      }
      if (t === "poses") {
        engine.applyPoses(msg as { t: number; bodies: any[] });
      }
      if (t === "chat") {
        setChat((c) => [
          ...c,
          {
            id: `m${msgSeq++}`,
            role: msg.role as ChatMsg["role"],
            content: String(msg.content || ""),
            ts: Number(msg.ts || Date.now()),
          },
        ]);
      }
      if (t === "attempt") {
        const a = msg as unknown as Attempt;
        setAttempts((prev) => [...prev.filter((x) => x.id !== a.id), a]);
        setRightTab("timeline");
      }
      if (t === "attempt_update") {
        setAttempts((prev) =>
          prev.map((x) => (x.id === msg.id ? { ...x, ...(msg as unknown as Attempt) } : x))
        );
      }
      if (t === "status") {
        if (msg.agent) {
          setAgent(String(msg.agent));
          engine.setStatus(String(msg.agent));
        }
        if (msg.sim) setSim(String(msg.sim));
      }
      if (t === "education") setLesson(msg.lesson as Lesson);
      if (t === "tool_call") setTool(String(msg.tool));
      if (t === "tool_result") setTool(null);
      if (t === "campaign") setCampaign(msg as unknown as CampaignStatus);
    });
    ws.connect();

    return () => {
      off();
      ws.close();
      clearInterval(fpsTimer);
      ro.disconnect();
      engine.dispose();
    };
  }, []);

  useEffect(() => {
    msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight, behavior: "smooth" });
  }, [chat]);

  const send = (text?: string) => {
    const t = (text ?? prompt).trim();
    if (!t) return;
    wsRef.current?.send({ type: "prompt", text: t });
    setPrompt("");
    setRightTab("chat");
  };

  const control = (cmd: string, value?: number) => {
    wsRef.current?.send({ type: "control", cmd, value });
    if (cmd === "play") setSim("play");
    if (cmd === "pause") setSim("pause");
  };

  const selectedBody = bodies.find((b) => b.id === selected);
  const filteredAssets = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return assets;
    return assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tags.some((t) => t.includes(q)) ||
        a.description.toLowerCase().includes(q)
    );
  }, [assets, query]);

  const layout =
    !leftOpen && !rightOpen ? "both-collapsed" : !leftOpen ? "left-collapsed" : !rightOpen ? "right-collapsed" : "";

  return (
    <div className="app">
      {!booted && (
        <div className="boot">
          <div className="boot-card">
            <img src="/arena-preview.png" alt="Arena" />
            <div className="boot-copy">
              <h1>PRISM LAB</h1>
              <p>Give the model a world, not the answers. Connecting to the local physics engine…</p>
              <div className="bar">
                <i />
              </div>
            </div>
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="brand">
          <img src="/logo.png" alt="PRISM" />
          <div>
            <div className="name">PRISM</div>
            <div className="sub">Simulation lab</div>
          </div>
        </div>

        <div className="transport">
          <button className="icon-btn" title="Scene" onClick={() => setLeftOpen((v) => !v)}>
            ☰
          </button>
          <button className={`icon-btn ${sim === "play" ? "active" : ""}`} title="Play" onClick={() => control("play")}>
            ▶
          </button>
          <button className="icon-btn" title="Pause" onClick={() => control("pause")}>
            ❚❚
          </button>
          <button className="icon-btn" title="Step" onClick={() => control("step")}>
            ⏭
          </button>
          <button className="icon-btn" title="Reset" onClick={() => control("reset")}>
            ↺
          </button>
          <button className="icon-btn danger" title="Stop agent" onClick={() => control("stop_agent")}>
            ■
          </button>
          <div className="speed">
            <span>{speed.toFixed(1)}×</span>
            <input
              type="range"
              min={0.25}
              max={4}
              step={0.25}
              value={speed}
              onChange={(e) => {
                const v = Number(e.target.value);
                setSpeed(v);
                control("speed", v);
              }}
            />
          </div>
        </div>

        <div className="top-spacer" />

        <div className={`chip ${connected ? "live" : ""}`}>
          <span className="dot" />
          {connected ? "local" : "offline"}
        </div>
        <div className={`chip ${busy ? "busy" : "ok"}`}>
          <span className="dot" />
          {busy ? agent : "idle"}
        </div>
        <button
          className={`chip model-chip ${campaign?.status === "running" ? "busy" : ""}`}
          title="Research campaigns"
          onClick={() => setResearchOpen(true)}
        >
          {campaign?.status === "running"
            ? `campaign · ${campaign.done || 0}/${campaign.thisRun || 0}`
            : "research"}
        </button>
        <button
          className="chip model-chip"
          title={llm?.note || "Choose a model"}
          onClick={() => setModelsOpen(true)}
        >
          {llm ? `${llm.provider}${llm.model ? " · " + llm.model : ""}` : "models"}
        </button>
        <button className="icon-btn" title="Chat" onClick={() => setRightOpen((v) => !v)}>
          ✶
        </button>
      </header>

      <div className={`workspace ${layout}`}>
        <aside className="rail">
          <div className="rail-head">
            <span className="kicker">Studio</span>
          </div>
          <div className="tabs">
            <button className={`tab ${leftTab === "scene" ? "on" : ""}`} onClick={() => setLeftTab("scene")}>
              Hierarchy
            </button>
            <button className={`tab ${leftTab === "assets" ? "on" : ""}`} onClick={() => setLeftTab("assets")}>
              Assets
            </button>
          </div>
          {leftTab === "scene" ? (
            <div className="list">
              {bodies
                .filter((b) => !b.tags?.includes("arena"))
                .map((b) => (
                  <div
                    key={b.id}
                    className={`row ${selected === b.id ? "sel" : ""}`}
                    onClick={() => {
                      setSelected(b.id);
                      engineRef.current?.select(b.id);
                    }}
                  >
                    <span className="swatch" style={{ background: b.color }} />
                    <div>
                      <div className="title">{b.name}</div>
                      <div className="meta">
                        #{b.id} · {b.category}
                        {b.joints?.length ? ` · ${b.joints.length} DoF` : ""}
                      </div>
                    </div>
                    <span className="tag">{b.createdBy}</span>
                  </div>
                ))}
              {selectedBody && (
                <div className="inspector">
                  <div className="kicker">Inspector</div>
                  <div className="kv">
                    <span>mass</span>
                    <b>{selectedBody.mass} kg</b>
                    <span>caps</span>
                    <b>{selectedBody.capabilities.join(", ") || "—"}</b>
                    <span>joints</span>
                    <b>{selectedBody.joints.map((j) => j.name).join(", ") || "none"}</b>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--faint)" }}>
                    Shift-drag in the viewport to slide on the arena floor. The agent continues from the new state.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <input className="search" placeholder="Search library…" value={query} onChange={(e) => setQuery(e.target.value)} />
              <div className="list">
                {filteredAssets.map((a) => (
                  <button
                    key={a.id}
                    className="asset"
                    onClick={() =>
                      send(
                        a.category === "robots"
                          ? `Load the ${a.name} robot.`
                          : `Add a ${a.name.toLowerCase()} in front of the robot.`
                      )
                    }
                  >
                    <div className="aname" style={{ color: a.color }}>
                      {a.name}
                    </div>
                    <div className="adesc">{a.description}</div>
                    <div className="atags">
                      {a.origin === "pybullet" && <span className="tag">pybullet</span>}
                      {a.tags.filter((t) => t !== "pybullet").slice(0, 3).map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </aside>

        <div className="viewport-wrap" ref={wrapRef}>
          <canvas ref={canvasRef} />
          <div className="hud">
            <div className="hud-left">
              <div className="hud-pill">
                t <b>{simTime.toFixed(2)}s</b>
              </div>
              <div className="hud-pill">
                <b>{fps}</b> fps
              </div>
              <div className="hud-pill">
                <b>{bodies.filter((b) => !b.tags?.includes("arena")).length}</b> bodies
              </div>
            </div>
            <div className="hud-right cam-presets">
              {["iso", "front", "side", "top", "follow"].map((p) => (
                <button
                  key={p}
                  className={cam === p ? "on" : ""}
                  onClick={() => {
                    setCam(p);
                    engineRef.current?.setCamera(p);
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="prompt-dock">
            <div className="hints">
              {HINTS.map((h, i) => (
                <button key={h} className="hint" style={{ opacity: i === hint ? 1 : 0.55 }} onClick={() => send(h)}>
                  {h}
                </button>
              ))}
            </div>
            <div className={`prompt ${busy ? "busy" : ""}`}>
              <textarea
                value={prompt}
                placeholder={HINTS[hint]}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                  if (e.key === "Escape") control("stop_agent");
                }}
              />
              {busy ? (
                <button className="stop-btn" onClick={() => control("stop_agent")} title="Stop">
                  ■
                </button>
              ) : (
                <button className="send" onClick={() => send()} disabled={!prompt.trim()}>
                  ➤
                </button>
              )}
            </div>
          </div>
        </div>

        <aside className="rail right">
          <div className="rail-head">
            <span className="kicker">Collaborator</span>
          </div>
          <div className="tabs">
            <button className={`tab ${rightTab === "chat" ? "on" : ""}`} onClick={() => setRightTab("chat")}>
              Chat
            </button>
            <button className={`tab ${rightTab === "timeline" ? "on" : ""}`} onClick={() => setRightTab("timeline")}>
              Timeline
            </button>
          </div>
          {tool && <div className="tool-chip">tool · {tool}</div>}
          {rightTab === "chat" ? (
            <div className="chat">
              <div className="msgs" ref={msgsRef}>
                {chat.map((m) => (
                  <div key={m.id} className={`msg ${m.role}`}>
                    {m.role !== "system" && <div className="who">{m.role === "user" ? "You" : "PRISM"}</div>}
                    {m.content}
                  </div>
                ))}
              </div>
              {lesson && (
                <div className="lesson">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.takeaway}</p>
                  {lesson.whatWorked && (
                    <p>
                      Worked: <b style={{ color: "var(--ok)" }}>{lesson.whatWorked.strategy}</b>
                    </p>
                  )}
                  {lesson.concepts.slice(0, 2).map((c) => (
                    <div className="concept" key={c.title}>
                      <div className="ct">{c.title}</div>
                      <p>{c.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="timeline">
              {attempts.length === 0 && (
                <div className="empty">Attempts will land here — objective, action, parameters, result, next experiment.</div>
              )}
              {attempts
                .slice()
                .reverse()
                .map((a) => (
                  <div key={a.id} className={`attempt ${a.status === "running" ? "run" : a.status === "success" ? "ok" : ""}`}>
                    <div className="ah">
                      <span>ATTEMPT {String(a.id).padStart(2, "0")}</span>
                      <span className="score">{a.score != null ? a.score.toFixed(3) : "…"}</span>
                    </div>
                    <div className="astrat">{a.strategy}</div>
                    <div className="ap">{a.action}</div>
                    {a.parameters && <div className="ap">{JSON.stringify(a.parameters)}</div>}
                    {a.result && <div className="ap">{a.result}</div>}
                    {a.next && <div className="ap">next · {a.next}</div>}
                  </div>
                ))}
            </div>
          )}
        </aside>
      </div>

      <ModelsPanel
        open={modelsOpen}
        onClose={() => setModelsOpen(false)}
        hub={hub}
        download={download}
        onRefresh={setHub}
      />
      <ResearchPanel open={researchOpen} onClose={() => setResearchOpen(false)} campaign={campaign} />
    </div>
  );
}
