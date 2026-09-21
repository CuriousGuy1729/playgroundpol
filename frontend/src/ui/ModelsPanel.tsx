import { useEffect, useState } from "react";
import type { DownloadInfo, HubSnapshot, ProviderCard } from "../types";

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

  if (!open) return null;
  const snap = hub;

  const ping = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
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
      ping(activate ? `Using ${p.name}` : `Saved ${p.name} key on this machine`);
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
      ping(data.ok ? `${provider_id} reachable` : data.error || "no response");
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
          Keys stay on this machine (<span className="mono">data/secrets.json</span>). Qwen weights land in the local
          vault — not the cloud, not the browser quota.
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
              <p>No key. Same tools and physics loop — parameter search instead of a language model.</p>
            </button>
            {(snap?.providers || []).map((p) => {
              const d = draft[p.id] || { key: "", model: p.model, base_url: p.base_url };
              const isActive = active === p.id;
              return (
                <div key={p.id} className={`provider-card ${isActive ? "active" : ""}`}>
                  <div className="pc-top">
                    <b>{p.name}</b>
                    {isActive && <span className="tag">active</span>}
                    {p.has_key && <span className="tag">key on disk</span>}
                  </div>
                  <p>{p.blurb}</p>
                  {p.needs_key && (
                    <label className="field">
                      <span>API key</span>
                      <input
                        type="password"
                        autoComplete="off"
                        placeholder={p.has_key ? p.key_hint : p.placeholder}
                        value={d.key}
                        onChange={(e) => setDraft((s) => ({ ...s, [p.id]: { ...d, key: e.target.value } }))}
                      />
                    </label>
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
                        {p.models.map((m) => (
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
                    <button className="ghost" disabled={busy === p.id} onClick={() => save(p, false)}>
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
              Vault · <span className="mono">{snap?.vault}</span>
              <br />
              {snap?.llama_cpp
                ? "llama-cpp-python is available — downloaded Qwen can run in-process."
                : "Weights download either way. Running them needs llama-cpp-python (or use a cloud key)."}
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
