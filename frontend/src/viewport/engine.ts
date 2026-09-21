import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { BodyDesc, Geom } from "../types";

type PoseBody = {
  id: number;
  p: number[];
  q: number[];
  v?: number[];
  links: { i: number; p: number[]; q: number[] }[];
};

const ACCENT = new THREE.Color("#3ee0c5");

export class ViewportEngine {
  renderer: THREE.WebGLRenderer;
  scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  simRoot = new THREE.Group();
  bodies = new Map<number, THREE.Group>();
  linkNodes = new Map<string, THREE.Object3D>();
  selected: number | null = null;
  follow = false;
  debug = false;
  actorId: number | null = null;
  fps = 0;
  simTime = 0;
  private frames = 0;
  private lastFps = performance.now();
  private ring: THREE.Mesh | null = null;
  private gizmo: THREE.Group;
  private ray = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private dragging = false;
  private dragId: number | null = null;
  private plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private onEdit?: (id: number, pos: number[]) => void;
  private onSelect?: (id: number | null) => void;
  private contacts = new THREE.Group();
  private traj = new THREE.Group();
  private clock = new THREE.Clock();
  private disposed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.camera = new THREE.PerspectiveCamera(42, 1, 0.05, 80);
    this.camera.position.set(2.7, 1.85, 2.55);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.target.set(0, 0.18, 0);
    this.controls.maxPolarAngle = Math.PI * 0.49;
    this.controls.minDistance = 0.6;
    this.controls.maxDistance = 14;

    this.scene.background = new THREE.Color("#07090d");
    this.scene.fog = new THREE.FogExp2("#07090d", 0.045);

    const env = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(env, 0.04).texture;
    env.dispose();

    this.simRoot.rotation.x = -Math.PI / 2;
    this.scene.add(this.simRoot);

    this._lights();
    this._arena();
    this._dust();

    this.gizmo = new THREE.Group();
    this.gizmo.visible = false;
    this.simRoot.add(this.gizmo);
    this._makeGizmo();

    this.simRoot.add(this.contacts);
    this.simRoot.add(this.traj);

    canvas.addEventListener("pointerdown", this._onDown);
    canvas.addEventListener("pointermove", this._onMove);
    canvas.addEventListener("pointerup", this._onUp);

    this._loop();
  }

  setHandlers(h: { onEdit?: typeof this.onEdit; onSelect?: typeof this.onSelect }) {
    this.onEdit = h.onEdit;
    this.onSelect = h.onSelect;
  }

  resize(w: number, h: number) {
    if (w < 2 || h < 2) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  setStatus(agent: string) {
    if (!this.ring) return;
    const mat = this.ring.material as THREE.MeshStandardMaterial;
    if (agent === "experimenting" || agent === "thinking") {
      mat.emissive = new THREE.Color("#f0a05a");
      mat.color = new THREE.Color("#f0a05a");
    } else if (agent === "idle") {
      mat.emissive = ACCENT.clone();
      mat.color = ACCENT.clone();
    }
  }

  setScene(bodies: BodyDesc[], actorId: number | null, targetId: number | null) {
    this.actorId = actorId;
    for (const [id, g] of this.bodies) {
      this.simRoot.remove(g);
      g.traverse((o) => {
        if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose();
      });
    }
    this.bodies.clear();
    this.linkNodes.clear();
    for (const b of bodies) {
      if (b.assetId === "arena" || b.tags?.includes("arena")) continue;
      const group = this._buildBody(b);
      this.bodies.set(b.id, group);
      this.simRoot.add(group);
    }
    void targetId;
  }

  applyPoses(payload: { t: number; bodies: PoseBody[] }) {
    this.simTime = payload.t;
    for (const b of payload.bodies) {
      const baseKey = `${b.id}:-1`;
      const base = this.linkNodes.get(baseKey);
      if (base) {
        base.position.set(b.p[0], b.p[1], b.p[2]);
        base.quaternion.set(b.q[0], b.q[1], b.q[2], b.q[3]);
      }
      for (const l of b.links || []) {
        const n = this.linkNodes.get(`${b.id}:${l.i}`);
        if (!n) continue;
        n.position.set(l.p[0], l.p[1], l.p[2]);
        n.quaternion.set(l.q[0], l.q[1], l.q[2], l.q[3]);
      }
    }
    if (this.selected != null) this._placeGizmo();
    if (this.follow && this.actorId != null) {
      const n = this.linkNodes.get(`${this.actorId}:-1`);
      if (n) {
        const w = new THREE.Vector3();
        n.getWorldPosition(w);
        this.controls.target.lerp(w, 0.08);
      }
    }
  }

  select(id: number | null) {
    this.selected = id;
    this.gizmo.visible = id != null;
    this._placeGizmo();
  }

  setCamera(preset: string) {
    this.follow = preset === "follow";
    const pos = {
      iso: [2.7, 1.85, 2.55],
      front: [3.4, 0.9, 0.15],
      top: [0.1, 5.4, 0.1],
      side: [0.2, 1.1, 3.4],
    }[preset] as number[] | undefined;
    if (pos) {
      this.camera.position.set(pos[0], pos[1], pos[2]);
      this.controls.target.set(0, 0.15, 0);
    }
  }

  dispose() {
    this.disposed = true;
    this.renderer.dispose();
  }

  private _loop = () => {
    if (this.disposed) return;
    requestAnimationFrame(this._loop);
    const t = this.clock.getElapsedTime();
    if (this.ring) {
      const mat = this.ring.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.7 + 0.35 * Math.sin(t * 2.2);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.frames += 1;
    const now = performance.now();
    if (now - this.lastFps > 500) {
      this.fps = Math.round((this.frames * 1000) / (now - this.lastFps));
      this.frames = 0;
      this.lastFps = now;
    }
  };

  private _lights() {
    const hemi = new THREE.HemisphereLight("#c9d6ff", "#1a1510", 0.55);
    this.scene.add(hemi);
    const key = new THREE.DirectionalLight("#fff4e8", 2.1);
    key.position.set(-2.4, 6.2, 3.4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 0.5;
    key.shadow.camera.far = 18;
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 4;
    key.shadow.camera.bottom = -4;
    key.shadow.bias = -0.00025;
    this.scene.add(key);
    const fill = new THREE.DirectionalLight("#6a8cff", 0.35);
    fill.position.set(4, 2, -3);
    this.scene.add(fill);
    const rim = new THREE.PointLight("#3ee0c5", 0.6, 8);
    rim.position.set(0, 1.4, 0);
    this.scene.add(rim);
  }

  private _arena() {
    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(2.58, 2.58, 0.08, 48),
      new THREE.MeshStandardMaterial({
        color: "#12151c",
        metalness: 0.18,
        roughness: 0.86,
      })
    );
    floor.receiveShadow = true;
    floor.position.y = -0.04;
    this.scene.add(floor);

    const ringGeo = new THREE.TorusGeometry(2.32, 0.012, 10, 96);
    const ringMat = new THREE.MeshStandardMaterial({
      color: ACCENT,
      emissive: ACCENT,
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.005;
    this.scene.add(ring);
    this.ring = ring;

    const grid = this._grid();
    this.simRoot.add(grid);

    const ticks = new THREE.GridHelper(4.4, 22, 0x1e2633, 0x141922);
    ticks.position.z = 0.002;
    ticks.rotation.x = Math.PI / 2;
    (ticks.material as THREE.Material).transparent = true;
    (ticks.material as THREE.Material).opacity = 0.35;
    this.simRoot.add(ticks);
  }

  private _grid() {
    const geo = new THREE.PlaneGeometry(5.0, 5.0, 1, 1);
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color("#3ee0c5") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec3 uColor;
        void main() {
          vec2 p = (vUv - 0.5) * 5.0;
          float d = length(p);
          float fade = 1.0 - smoothstep(1.6, 2.35, d);
          vec2 g = abs(fract(p) - 0.5);
          float line = 1.0 - smoothstep(0.02, 0.04, min(g.x, g.y));
          vec2 g2 = abs(fract(p * 0.5) - 0.5);
          float major = 1.0 - smoothstep(0.015, 0.03, min(g2.x, g2.y));
          float a = (line * 0.12 + major * 0.22) * fade;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.z = 0.003;
    return mesh;
  }

  private _dust() {
    const n = 180;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = Math.random() * 2.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(
      g,
      new THREE.PointsMaterial({ color: "#6a7388", size: 0.012, transparent: true, opacity: 0.35 })
    );
    this.scene.add(pts);
  }

  private _buildBody(b: BodyDesc) {
    const root = new THREE.Group();
    root.userData.bodyId = b.id;
    for (const link of b.links) {
      const g = new THREE.Group();
      g.userData.bodyId = b.id;
      g.userData.link = link.index;
      for (const geom of link.geoms) {
        const mesh = this._geomMesh(geom);
        mesh.userData.bodyId = b.id;
        g.add(mesh);
      }
      if (link.index === -1 && b.category === "robots") {
        const led = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.012, 0.012),
          new THREE.MeshStandardMaterial({
            color: ACCENT,
            emissive: ACCENT,
            emissiveIntensity: 1.2,
          })
        );
        led.position.set(b.assetId === "hauler" ? 0.16 : 0.14, 0, 0.03);
        g.add(led);
      }
      this.linkNodes.set(`${b.id}:${link.index}`, g);
      root.add(g);
    }
    return root;
  }

  private _geomMesh(geom: Geom) {
    let geo: THREE.BufferGeometry;
    const s = geom.size;
    if (geom.type === "sphere") {
      geo = new THREE.SphereGeometry(s[0], 24, 16);
    } else if (geom.type === "cylinder") {
      geo = new THREE.CylinderGeometry(s[0], s[0], s[1], 22);
      geo.rotateX(Math.PI / 2);
    } else if (geom.type === "capsule") {
      geo = new THREE.CapsuleGeometry(s[0], s[1], 6, 12);
      geo.rotateX(Math.PI / 2);
    } else {
      geo = new THREE.BoxGeometry(s[0] * 2, s[1] * 2, s[2] * 2);
    }
    const color = new THREE.Color().fromArray(geom.color as [number, number, number]);
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: geom.metalness ?? 0.45,
      roughness: geom.roughness ?? 0.42,
      emissive: geom.emissive ? new THREE.Color().fromArray(geom.emissive as [number, number, number]) : new THREE.Color(0),
      emissiveIntensity: geom.emissive ? 0.8 : 0,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    const lp = geom.localPos || [0, 0, 0];
    mesh.position.set(lp[0], lp[1], lp[2]);
    const lo = geom.localOrn || [0, 0, 0, 1];
    mesh.quaternion.set(lo[0], lo[1], lo[2], lo[3]);
    return mesh;
  }

  private _makeGizmo() {
    const axis = (dir: THREE.Vector3, color: number) => {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.36, 8),
        new THREE.MeshBasicMaterial({ color })
      );
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      m.position.copy(dir.clone().multiplyScalar(0.18));
      return m;
    };
    this.gizmo.add(axis(new THREE.Vector3(1, 0, 0), 0xff6b7a));
    this.gizmo.add(axis(new THREE.Vector3(0, 1, 0), 0x5ee0a0));
    this.gizmo.add(axis(new THREE.Vector3(0, 0, 1), 0x6aa8ff));
  }

  private _placeGizmo() {
    if (this.selected == null) return;
    const n = this.linkNodes.get(`${this.selected}:-1`);
    if (!n) return;
    this.gizmo.position.copy(n.position);
    this.gizmo.visible = true;
  }

  private _ndc(ev: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((ev.clientX - r.left) / r.width) * 2 - 1;
    this.mouse.y = -((ev.clientY - r.top) / r.height) * 2 + 1;
  }

  private _pick(ev: PointerEvent): number | null {
    this._ndc(ev);
    this.ray.setFromCamera(this.mouse, this.camera);
    const objs: THREE.Object3D[] = [];
    this.linkNodes.forEach((n) => objs.push(n));
    const hits = this.ray.intersectObjects(objs, true);
    for (const h of hits) {
      let o: THREE.Object3D | null = h.object;
      while (o) {
        if (typeof o.userData.bodyId === "number") return o.userData.bodyId as number;
        o = o.parent;
      }
    }
    return null;
  }

  private _onDown = (ev: PointerEvent) => {
    const id = this._pick(ev);
    this.select(id);
    this.onSelect?.(id);
    if (id != null && ev.shiftKey) {
      this.dragging = true;
      this.dragId = id;
      this.controls.enabled = false;
    }
  };

  private _onMove = (ev: PointerEvent) => {
    if (!this.dragging || this.dragId == null) return;
    this._ndc(ev);
    this.ray.setFromCamera(this.mouse, this.camera);
    const hit = new THREE.Vector3();
    if (this.ray.ray.intersectPlane(this.plane, hit)) {
      const local = this.simRoot.worldToLocal(hit.clone());
      const n = this.linkNodes.get(`${this.dragId}:-1`);
      if (n) {
        n.position.x = local.x;
        n.position.y = local.y;
        this._placeGizmo();
      }
    }
  };

  private _onUp = () => {
    if (this.dragging && this.dragId != null) {
      const n = this.linkNodes.get(`${this.dragId}:-1`);
      if (n) this.onEdit?.(this.dragId, [n.position.x, n.position.y, n.position.z]);
    }
    this.dragging = false;
    this.dragId = null;
    this.controls.enabled = true;
  };
}
