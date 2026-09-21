import { useEffect, useState } from "react";
import type { DownloadInfo, HubSnapshot, ProviderCard, RemoteModel } from "../types";

type Tab = "cloud" | "local";

export function ModelsPanel({
  open,
  onClose,
  hub,
  download,
  onRefresh,
}: {
  open: boolean;
  onClose: () => void;
  hub: HubSnapshot | null;
  download: DownloadInfo | null;
  onRefresh: (h: HubSnapshot) => void;
}) {
  const [tab, setTab] = useState<Tab>("cloud");
  const [draft, setDraft] = useState<Record<string, { key: string; model: string; base_url: string }>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [remote, setRemote] = useState<Record<string, RemoteModel[]>>({});
  const [remoteErr, setRemoteErr] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!hub) return;
    const next: Record<string, { key: string; model: string; base_url: string }> = {};
    for (const p of hub.providers) {
      next[p.id] = {
        key: p.has_key ? p.key_hint : "",
        model: p.model,
        base_url: p.base_url,
      };
    }
    setDraft(next);
  }, [hub]);

  const orHasKey = !!hub?.providers.find((p) => p.id === "openrouter")?.has_key;
  useEffect(() => {
    if (open && orHasKey) loadFree("openrouter");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, orHasKey]);

  if (!open) return null;
  const snap = hub;

  const ping = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4200);
  };

  const loadFree = async (provider_id: string) => {
    setBusy("models-" + provider_id);
    try {
      const r = await fetch(`/api/llm/models?provider_id=${encodeURIComponent(provider_id)}&free_only=true`);
      const data = await r.json();
      setRemote((s) => ({ ...s, [provider_id]: data.models || [] }));
      if (!data.ok && data.error) setRemoteErr((s) => ({ ...s, [provider_id]: data.error }));
      else setRemoteErr((s) => ({ ...s, [provider_id]: "" }));
      ping(data.ok ? `${data.count || (data.models || []).length} free models` : data.error || "catalog fallback");
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(null);
    }
  };

  const save = async (p: ProviderCard, activate: boolean) => {
    const d = draft[p.id] || { key: "", model: p.model, base_url: p.base_url };
    setBusy(p.id);
    try {
      const r = await fetch("/api/llm/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider_id: p.id,
          api_key: d.key,
          model: d.model,
          base_url: d.base_url,
          activate,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "save failed");
      onRefresh(data);
      ping(activate ? `Using ${p.name} · ${d.model}` : `Saved ${p.name} key`);
      if (p.id === "openrouter") loadFree("openrouter");
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(null);
    }
  };

  const activate = async (provider_id: string, model?: string) => {
    setBusy(provider_id);
    try {
      const r = await fetch("/api/llm/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id, model }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "activate failed");
      onRefresh(data);
      ping("Active model updated");
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(null);
    }
  };

  const test = async (provider_id: string) => {
    setBusy("test-" + provider_id);
    try {
      const r = await fetch("/api/llm/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider_id }),
      });
      const data = await r.json();
      ping(
        data.ok
          ? `Live: ${data.model} → ${data.sample || "pong"}`
          : data.error || "no response"
      );
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(null);
    }
  };

  const clearKey = async (id: string) => {
    const r = await fetch(`/api/llm/keys/${id}`, { method: "DELETE" });
    onRefresh(await r.json());
    ping("Key removed from this machine");
  };

  const downloadModel = async (id: string) => {
    setBusy("dl-" + id);
    try {
      const r = await fetch("/api/llm/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model_id: id }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "download failed");
      ping("Downloading into the local vault…");
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(null);
    }
  };

  const cancelDl = () => fetch("/api/llm/download/cancel", { method: "POST" });

  const removeLocal = async (id: string) => {
    const r = await fetch(`/api/llm/local/${id}`, { method: "DELETE" });
    onRefresh(await r.json());
  };

  const active = snap?.active_provider || "builtin";
  const dl = download || snap?.download;
  const providers = [...(snap?.providers || [])].sort((a, b) =>
    a.id === "openrouter" ? -1 : b.id === "openrouter" ? 1 : 0
  );

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal models-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="kicker">Model interface</div>
            <h2>Connect a brain</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <p className="modal-lead">
          Paste a key and click <b>Use this model</b>. The lab sends your prompt plus a physics
          system prompt to that API — it will not silently fall back to the built-in gait script.
          Keys stay in <span className="mono">data/secrets.json</span>.
        </p>
        <div className="tabs">
          <button className={`tab ${tab === "cloud" ? "on" : ""}`} onClick={() => setTab("cloud")}>
            API keys
          </button>
          <button className={`tab ${tab === "local" ? "on" : ""}`} onClick={() => setTab("local")}>
            Local Qwen
          </button>
        </div>

        {tab === "cloud" && (
          <div className="model-list">
            <button
              className={`provider-card ${active === "builtin" ? "active" : ""}`}
              onClick={() => activate("builtin")}
            >
              <div className="pc-top">
                <b>Built-in experimenter</b>
                {active === "builtin" && <span className="tag">active</span>}
              </div>
              <p>No key. Parameter search instead of a language model — the repetitive scripted loop.</p>
            </button>
            {providers.map((p) => {
              const d = draft[p.id] || { key: "", model: p.model, base_url: p.base_url };
              const isActive = active === p.id;
              const live =
                remote[p.id] ||
                (p.id === "openrouter"
                  ? p.models.map((id) => ({ id, name: id, free: true, tools: true }))
                  : []);
              const q = filter.toLowerCase();
              const shown = live.filter(
                (m) =>
                  !q ||
                  m.id.toLowerCase().includes(q) ||
                  (m.name || "").toLowerCase().includes(q)
              );
              return (
                <div key={p.id} className={`provider-card ${isActive ? "active" : ""}`}>
                  <div className="pc-top">
                    <b>{p.name}</b>
                    {isActive && <span className="tag">active</span>}
                    {p.has_key && <span className="tag">key on disk</span>}
                    {p.id === "openrouter" && <span className="tag free">free models</span>}
                  </div>
                  <p>{p.blurb}</p>
                  {p.needs_key && (
                    <label className="field">
                      <span>API key</span>
                      <input
                        type="password"
                        autoComplete="off"
                        placeholder={p.has_key ? p.key_hint : p.placeholder}
                        value={d.key.includes("••••") ? "" : d.key}
                        onChange={(e) => setDraft((s) => ({ ...s, [p.id]: { ...d, key: e.target.value } }))}
                      />
                    </label>
                  )}
                  {p.id === "openrouter" && (
                    <>
                      <div className="pc-actions" style={{ marginTop: 8 }}>
                        <button className="ghost" disabled={!!busy} onClick={() => loadFree("openrouter")}>
                          {busy === "models-openrouter" ? "Loading…" : "Load free models"}
                        </button>
                        {live.length > 0 && <span className="dl-meta">{live.length} free</span>}
                      </div>
                      {remoteErr.openrouter && <div className="err">{remoteErr.openrouter}</div>}
                      {live.length > 0 && (
                        <>
                          <input
                            className="search"
                            style={{ margin: "8px 0 6px" }}
                            placeholder="Filter free models…"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                          />
                          <div className="free-list">
                            {shown.slice(0, 80).map((m) => (
                              <button
                                key={m.id}
                                className={`free-opt ${d.model === m.id ? "on" : ""}`}
                                onClick={() => setDraft((s) => ({ ...s, [p.id]: { ...d, model: m.id } }))}
                              >
                                <span>{m.id}</span>
                                <span className="free-meta">
                                  {m.free && <i>free</i>}
                                  {m.tools && <i>tools</i>}
                                  {m.context ? <i>{Math.round(Number(m.context) / 1024)}k</i> : null}
                                </span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <div className="field-row">
                    <label className="field">
                      <span>Model</span>
                      <input
                        list={`models-${p.id}`}
                        value={d.model}
                        onChange={(e) => setDraft((s) => ({ ...s, [p.id]: { ...d, model: e.target.value } }))}
                      />
                      <datalist id={`models-${p.id}`}>
                        {(live.length ? live.map((m) => m.id) : p.models).map((m) => (
                          <option key={m} value={m} />
                        ))}
                      </datalist>
                    </label>
                    <label className="field">
                      <span>Base URL</span>
                      <input
                        value={d.base_url}
                        onChange={(e) => setDraft((s) => ({ ...s, [p.id]: { ...d, base_url: e.target.value } }))}
                      />
                    </label>
                  </div>
                  <div className="pc-actions">
                    <button className="ghost" disabled={busy === p.id} onClick={() => save(p, true)}>
                      Save key
                    </button>
                    <button className="ghost" disabled={!!busy} onClick={() => test(p.id)}>
                      Test
                    </button>
                    <button className="primary" disabled={!!busy} onClick={() => save(p, true)}>
                      Use this model
                    </button>
                    {p.has_key && (
                      <button className="ghost danger-text" onClick={() => clearKey(p.id)}>
                        Remove key
                      </button>
                    )}
                    {p.docs && (
                      <a className="docs" href={p.docs} target="_blank" rel="noreferrer">
                        Get a key ↗
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "local" && (
          <div className="model-list">
            <div className="vault-note">
              Skip this tab if you have OpenRouter. HuggingFace often refuses TLS from this host, so Qwen GGUF
              downloads fail — that is expected. Use <b>google/gemma-4-26b-a4b-it:free</b> on the API keys tab.
              <br />
              Vault · <span className="mono">{snap?.vault}</span>
              <br />
              {snap?.llama_cpp
                ? "llama-cpp-python is available — a downloaded GGUF can run in-process."
                : "Even after a download, running Qwen needs llama-cpp-python. Prefer OpenRouter."}
            </div>
            {(snap?.local_models || []).map((m) => {
              const running = dl?.status === "running" && dl.model_id === m.id;
              const pct = running ? dl?.pct || 0 : m.downloaded ? 100 : 0;
              const isActive = active === "local-gguf" && snap?.active_model === m.id;
              return (
                <div key={m.id} className={`provider-card ${isActive ? "active" : ""}`}>
                  <div className="pc-top">
                    <b>{m.name}</b>
                    {isActive && <span className="tag">active</span>}
                    {m.downloaded && <span className="tag">in vault</span>}
                  </div>
                  <p>{m.blurb}</p>
                  <div className="dl-meta">
                    {m.size_mb} MB · ctx {m.context}
                    {m.downloaded ? ` · ${(m.bytes / 1048576).toFixed(0)} MB on disk` : ""}
                  </div>
                  {(running || m.downloaded) && (
                    <div className="dl-bar">
                      <i style={{ width: `${Math.min(100, pct)}%` }} />
                    </div>
                  )}
                  {running && (
                    <div className="dl-meta">
                      {((dl?.received || 0) / 1048576).toFixed(1)} / {((dl?.total || 1) / 1048576).toFixed(0)} MB
                    </div>
                  )}
                  {dl?.status === "error" && dl.model_id === m.id && <div className="err">{dl.error}</div>}
                  <div className="pc-actions">
                    {!m.downloaded && !running && (
                      <button className="primary" disabled={!!busy} onClick={() => downloadModel(m.id)}>
                        Download to vault
                      </button>
                    )}
                    {running && (
                      <button className="ghost" onClick={cancelDl}>
                        Cancel
                      </button>
                    )}
                    {m.downloaded && (
                      <>
                        <button className="primary" disabled={!!busy} onClick={() => activate("local-gguf", m.id)}>
                          Use local Qwen
                        </button>
                        <button className="ghost danger-text" onClick={() => removeLocal(m.id)}>
                          Delete weights
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
