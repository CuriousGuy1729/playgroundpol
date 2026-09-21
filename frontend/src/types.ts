export type Role = "user" | "assistant" | "system";

export interface ChatMsg {
  id: string;
  role: Role;
  content: string;
  ts: number;
}

export interface Geom {
  type: string;
  size: number[];
  color: number[];
  localPos: number[];
  localOrn: number[];
  metalness?: number;
  roughness?: number;
  emissive?: number[];
  role?: string;
}

export interface LinkDesc {
  index: number;
  name: string;
  mass: number;
  geoms: Geom[];
}

export interface JointDesc {
  index: number;
  name: string;
  type: string;
  axis: number[];
  parent: number;
  child: number;
  rest?: number;
}

export interface BodyDesc {
  id: number;
  name: string;
  category: string;
  tags: string[];
  capabilities: string[];
  color: string;
  links: LinkDesc[];
  joints: JointDesc[];
  mass: number;
  spawnedAt: number[];
  assetId: string;
  createdBy: string;
  pose?: number[];
  orn?: number[];
}

export interface Attempt {
  id: number;
  status: "running" | "success" | "fail";
  objective: string;
  strategy: string;
  action: string;
  parameters: Record<string, unknown>;
  result?: string;
  score?: number;
  evaluation?: Record<string, unknown>;
  next?: string | null;
  metrics?: Record<string, unknown>;
}

export interface Asset {
  id: string;
  name: string;
  category: string;
  tags: string[];
  capabilities: string[];
  description: string;
  joints: number;
  color: string;
}

export interface Lesson {
  title: string;
  objective: string;
  success: boolean;
  tried: { id: number; strategy: string; score: number; result: string; why: string }[];
  whatWorked: { strategy: string; parameters: Record<string, unknown>; score: number; note: string } | null;
  concepts: { title: string; body: string }[];
  takeaway: string;
}

export interface LlmInfo {
  provider: string;
  model: string;
  online: boolean;
  note?: string;
  active_provider?: string;
  active_model?: string;
}

export interface ProviderCard {
  id: string;
  name: string;
  kind: string;
  docs: string;
  placeholder: string;
  models: string[];
  blurb: string;
  needs_key: boolean;
  base_url: string;
  model: string;
  has_key: boolean;
  key_hint: string;
  enabled: boolean;
}

export interface LocalModel {
  id: string;
  name: string;
  filename: string;
  url: string;
  size_mb: number;
  context: number;
  blurb: string;
  downloaded: boolean;
  bytes: number;
  path: string;
}

export interface DownloadInfo {
  model_id: string;
  status: string;
  received: number;
  total: number;
  error?: string;
  path?: string;
  pct: number;
}

export interface HubSnapshot {
  active_provider: string;
  active_model: string;
  providers: ProviderCard[];
  local_models: LocalModel[];
  llama_cpp: boolean;
  vault: string;
  download: DownloadInfo;
}
