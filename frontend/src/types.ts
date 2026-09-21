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
}
