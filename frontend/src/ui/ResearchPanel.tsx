import { useEffect, useState } from "react";
import type { CampaignStatus, DatasetInfo, Usecase } from "../types";

const N_PRESETS = [
  { n: 100, label: "100", hint: "interactive" },
  { n: 1000, label: "1k", hint: "research" },
  { n: 10000, label: "10k", hint: "overnight-ish" },
  { n: 100000, label: "100k", hint: "shard + resume" },
  { n: 1000000, label: "1M", hint: "queued shards" },
];

export function ResearchPanel({
  open,
  onClose,
  campaign,
}: {
  open: boolean;
  onClose: () => void;
  campaign: CampaignStatus | null;
}) {
  const [usecases, setUsecases] = useState<Usecase[]>([]);
  const [datasets, setDatasets] = useState<DatasetInfo[]>([]);
  const [usecase, setUsecase] = useState("gait_search");
  const [asset, setAsset] = useState("pulse");
  const [n, setN] = useState(1000);
  const [workers, setWorkers] = useState(1);
  const [wallclock, setWallclock] = useState(240);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const current = usecases.find((u) => u.id === usecase);

  const refresh = () => {
    fetch("/api/research/usecases")
      .then((r) => r.json())
      .then(setUsecases)
      .catch(() => undefined);
    fetch("/api/campaigns")
      .then((r) => r.json())
      .then((d) => setDatasets(d.datasets || []))
      .catch(() => undefined);
  };

  useEffect(() => {
    if (!open) return;
    refresh();
  }, [open]);

  useEffect(() => {
    if (!current) return;
    setAsset(current.default_asset);
    setN(current.default_n);
    if (current.default_n <= 100) setWallclock(90);
    else if (current.default_n <= 1000) setWallclock(240);
    else if (current.default_n <= 10000) setWallclock(900);
    else setWallclock(3600);
  }, [usecase, current?.id]);

  if (!open) return null;

  const ping = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const start = async () => {
    setBusy(true);
    try {
      const r = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usecase, n, asset, workers, wallclock, distill_top: 0.1 }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.detail || "start failed");
      ping(`Running ${data.thisRun} trials → ${data.dir}`);
    } catch (e) {
      ping(String(e));
    } finally {
      setBusy(false);
    }
  };

  const cancel = () => fetch("/api/campaigns/cancel", { method: "POST" });

  const running = campaign?.status === "running";
  const pct = running && campaign?.thisRun ? Math.min(100, (100 * (campaign.done || 0)) / campaign.thisRun) : 0;

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal research-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="kicker">Research</div>
            <h2>Campaigns & datasets</h2>
          </div>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <p className="modal-lead">
          Headless PyBullet — not the 4× realtime viewport loop. Each trial is a compact JSONL row (no full
          trajectories). N is a use-case choice: 100 to watch, 1k–10k to distill, 100k / 1M as resumed shards.
        </p>

        <div className="usecase-grid">
          {usecases.map((u) => (
            <button
              key={u.id}
              className={`provider-card ${usecase === u.id ? "active" : ""}`}
              onClick={() => setUsecase(u.id)}
            >
              <div className="pc-top">
                <b>{u.title}</b>
                <span className="tag">{u.default_n.toLocaleString()} rec.</span>
              </div>
              <p>{u.blurb}</p>
            </button>
          ))}
        </div>

        {current && <p className="why-n">{current.why_n}</p>}

        <div className="field-row" style={{ marginTop: 12 }}>
          <label className="field">
            <span>Robot</span>
            <select value={asset} onChange={(e) => setAsset(e.target.value)}>
              {(current?.assets || ["pulse"]).map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Sims in parallel</span>
            <select value={workers} onChange={(e) => setWorkers(Number(e.target.value))}>
              <option value={1}>1 client</option>
              <option value={2}>2 clients</option>
            </select>
          </label>
          <label className="field">
            <span>Wall-clock budget</span>
            <select value={wallclock} onChange={(e) => setWallclock(Number(e.target.value))}>
              <option value={90}>90 s</option>
              <option value={240}>4 min</option>
              <option value={900}>15 min</option>
              <option value={3600}>1 hour</option>
            </select>
          </label>
        </div>

        <div className="n-row">
          {N_PRESETS.map((p) => (
            <button key={p.n} className={`n-chip ${n === p.n ? "on" : ""}`} onClick={() => setN(p.n)}>
              {p.label}
              <i>{p.hint}</i>
            </button>
          ))}
        </div>

        <div className="pc-actions" style={{ marginTop: 14 }}>
          {!running ? (
            <button className="primary" disabled={busy} onClick={start}>
              Run {n.toLocaleString()} trials
            </button>
          ) : (
            <button className="ghost danger-text" onClick={cancel}>
              Cancel campaign
            </button>
          )}
          {n >= 100000 && (
            <span className="mono">
              This process caps a shard at 100k; leftover N is stored as resumeFrom in the manifest.
            </span>
          )}
        </div>

        {(running || campaign?.done) && (
          <div className="campaign-progress">
            <div className="dl-bar">
              <i style={{ width: `${running ? pct : 100}%` }} />
            </div>
            <div className="dl-meta">
              {campaign?.done || 0} / {campaign?.thisRun || n} · {campaign?.successes || 0} success ·{" "}
              {campaign?.rate || 0} Hz
              {campaign?.eta ? ` · eta ${Math.round(campaign.eta)}s` : ""}
              {campaign?.status && campaign.status !== "running" ? ` · ${campaign.status}` : ""}
            </div>
            {campaign?.last && (
              <div className="dl-meta">
                last #{campaign.last.trial} · {campaign.last.success ? "ok" : "miss"} · {campaign.last.reason}
              </div>
            )}
            {campaign?.dir && <div className="mono">{campaign.dir}</div>}
          </div>
        )}

        <div className="kicker" style={{ marginTop: 18 }}>
          Datasets on disk
        </div>
        <div className="dataset-list">
          {datasets.length === 0 && <div className="empty">No distilled sets yet.</div>}
          {datasets.map((d) => (
            <div key={d.id} className="dataset-row">
              <div>
                <b>{d.usecase}</b> · {d.asset}
                <div className="mono">
                  {d.done || 0} trials · {d.successes || 0} ok · {d.status}
                </div>
              </div>
              <a className="ghost" href={`/api/campaigns/${d.id}/download`}>
                zip
              </a>
            </div>
          ))}
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
