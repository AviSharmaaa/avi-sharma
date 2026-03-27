"use client";

import { useEffect, useRef } from "react";

const COUNT = 28000;
const SHAPE_RATIO = 0.88;
const S = 1.8; // global shape scale

/* ─── helpers ─── */

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ─── shape generators ─── */

function cpuShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;
  const W = 1.1 * S;

  // Body outline (16 %)
  const bodyN = Math.floor(sn * 0.16);
  for (let k = 0; k < bodyN; k++) {
    const t = Math.random();
    const side = (Math.random() * 4) | 0;
    const jitter = (Math.random() - 0.5) * 0.02;
    switch (side) {
      case 0: p[i] = (t * 2 - 1) * W; p[i+1] = W + jitter;  break;
      case 1: p[i] = (t * 2 - 1) * W; p[i+1] = -W + jitter; break;
      case 2: p[i] = -W + jitter; p[i+1] = (t * 2 - 1) * W;  break;
      default: p[i] = W + jitter; p[i+1] = (t * 2 - 1) * W;  break;
    }
    p[i+2] = (Math.random() - 0.5) * 0.06;
    i += 3;
  }

  // Body fill (14 %)
  const fillN = Math.floor(sn * 0.14);
  for (let k = 0; k < fillN; k++) {
    p[i] = (Math.random() * 2 - 1) * W;
    p[i+1] = (Math.random() * 2 - 1) * W;
    p[i+2] = (Math.random() - 0.5) * 0.06;
    i += 3;
  }

  // Pins (28 %)
  const pinN = Math.floor(sn * 0.28);
  const pinsPerSide = 16;
  const pinLen = 0.35 * S;
  for (let k = 0; k < pinN; k++) {
    const side = (Math.random() * 4) | 0;
    const idx = Math.floor(Math.random() * pinsPerSide);
    const pos = ((idx + 0.5) / pinsPerSide * 2 - 1) * W * 0.88;
    const ext = W + Math.random() * pinLen;
    const jt = (Math.random() - 0.5) * 0.018;
    switch (side) {
      case 0: p[i] = pos + jt; p[i+1] = ext;  break;
      case 1: p[i] = pos + jt; p[i+1] = -ext; break;
      case 2: p[i] = -ext; p[i+1] = pos + jt; break;
      default: p[i] = ext;  p[i+1] = pos + jt; break;
    }
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Die – inner square with grid (26 %)
  const dieW = 0.52 * S;
  const dieN = Math.floor(sn * 0.26);
  for (let k = 0; k < dieN; k++) {
    if (Math.random() < 0.25) {
      const t = Math.random();
      const side = (Math.random() * 4) | 0;
      switch (side) {
        case 0: p[i] = (t * 2 - 1) * dieW; p[i+1] = dieW;  break;
        case 1: p[i] = (t * 2 - 1) * dieW; p[i+1] = -dieW; break;
        case 2: p[i] = -dieW; p[i+1] = (t * 2 - 1) * dieW; break;
        default: p[i] = dieW;  p[i+1] = (t * 2 - 1) * dieW; break;
      }
    } else {
      const gx = Math.floor(Math.random() * 7);
      const gy = Math.floor(Math.random() * 7);
      p[i]   = ((gx + 0.5) / 7 * 2 - 1) * dieW * 0.85 + (Math.random() - 0.5) * 0.035;
      p[i+1] = ((gy + 0.5) / 7 * 2 - 1) * dieW * 0.85 + (Math.random() - 0.5) * 0.035;
    }
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Corner dot + remaining
  while (i / 3 < sn) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.12 * S;
    p[i]   = -W * 0.72 + Math.cos(a) * r;
    p[i+1] = W * 0.72 + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Scatter — distributed in a soft sphere
  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i] = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

function graphShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const nodeCount = 8;
  const ringR = 1.4 * S;
  const nodeR = 0.24 * S;
  const nodes: [number, number][] = [];
  for (let k = 0; k < nodeCount; k++) {
    const a = (k / nodeCount) * Math.PI * 2 - Math.PI / 2;
    nodes.push([Math.cos(a) * ringR, Math.sin(a) * ringR]);
  }

  // Edges – cycle (32 %)
  const edgeN = Math.floor(sn * 0.32);
  for (let k = 0; k < edgeN; k++) {
    const ei = Math.floor(Math.random() * nodeCount);
    const ni = (ei + 1) % nodeCount;
    const t = Math.random();
    p[i]   = nodes[ei][0] + (nodes[ni][0] - nodes[ei][0]) * t + (Math.random() - 0.5) * 0.03;
    p[i+1] = nodes[ei][1] + (nodes[ni][1] - nodes[ei][1]) * t + (Math.random() - 0.5) * 0.03;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Cross edges (16 %)
  const crossEdges: [number, number][] = [[0, 3], [1, 5], [2, 6], [3, 7], [4, 7], [1, 6]];
  const crossN = Math.floor(sn * 0.16);
  for (let k = 0; k < crossN; k++) {
    const ce = crossEdges[Math.floor(Math.random() * crossEdges.length)];
    const t = Math.random();
    p[i]   = nodes[ce[0]][0] + (nodes[ce[1]][0] - nodes[ce[0]][0]) * t + (Math.random() - 0.5) * 0.025;
    p[i+1] = nodes[ce[0]][1] + (nodes[ce[1]][1] - nodes[ce[0]][1]) * t + (Math.random() - 0.5) * 0.025;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Node circles – outline (18 %)
  const nOutN = Math.floor(sn * 0.18);
  for (let k = 0; k < nOutN; k++) {
    const ni = Math.floor(Math.random() * nodeCount);
    const a = Math.random() * Math.PI * 2;
    const r = nodeR + (Math.random() - 0.5) * 0.025;
    p[i]   = nodes[ni][0] + Math.cos(a) * r;
    p[i+1] = nodes[ni][1] + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Node circles – fill (22 %)
  const nFillN = Math.floor(sn * 0.22);
  for (let k = 0; k < nFillN; k++) {
    const ni = Math.floor(Math.random() * nodeCount);
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * nodeR * 0.8;
    p[i]   = nodes[ni][0] + Math.cos(a) * r;
    p[i+1] = nodes[ni][1] + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Remaining – node centers
  while (i / 3 < sn) {
    const ni = Math.floor(Math.random() * nodeCount);
    p[i]   = nodes[ni][0] + (Math.random() - 0.5) * 0.05;
    p[i+1] = nodes[ni][1] + (Math.random() - 0.5) * 0.05;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i] = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

function coffeeMugShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const mW = 0.85 * S;
  const mH = 1.25 * S;
  const mB = -0.8 * S;

  // Body outline (20 %)
  const outN = Math.floor(sn * 0.20);
  for (let k = 0; k < outN; k++) {
    const t = Math.random();
    const side = (Math.random() * 4) | 0;
    switch (side) {
      case 0: p[i] = -mW + t * 0.06 * S; p[i+1] = mB + t * mH; break;
      case 1: p[i] = mW - t * 0.06 * S;  p[i+1] = mB + t * mH; break;
      case 2: p[i] = (Math.random() * 2 - 1) * mW; p[i+1] = mB; break;
      default: p[i] = (Math.random() * 2 - 1) * (mW + 0.04 * S); p[i+1] = mB + mH; break;
    }
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Body fill (20 %)
  const fillN = Math.floor(sn * 0.20);
  for (let k = 0; k < fillN; k++) {
    p[i]   = (Math.random() * 2 - 1) * mW;
    p[i+1] = mB + Math.random() * mH;
    p[i+2] = (Math.random() - 0.5) * 0.06;
    i += 3;
  }

  // Coffee surface (8 %)
  const coffeeY = mB + mH * 0.82;
  const coffeeN = Math.floor(sn * 0.08);
  for (let k = 0; k < coffeeN; k++) {
    p[i]   = (Math.random() * 2 - 1) * mW * 0.88;
    p[i+1] = coffeeY + (Math.random() - 0.5) * 0.04;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Handle – C curve (20 %)
  const hN = Math.floor(sn * 0.20);
  const hCx = mW + 0.38 * S;
  const hCy = mB + mH * 0.48;
  const hRx = 0.38 * S, hRy = 0.42 * S;
  for (let k = 0; k < hN; k++) {
    const a = -Math.PI * 0.5 + Math.random() * Math.PI;
    const rr = 1 + (Math.random() - 0.5) * 0.14;
    p[i]   = hCx + Math.cos(a) * hRx * rr;
    p[i+1] = hCy + Math.sin(a) * hRy * rr;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Steam – 3 wavy lines (16 %)
  const steamN = Math.floor(sn * 0.16);
  for (let k = 0; k < steamN; k++) {
    const line = Math.floor(Math.random() * 3);
    const bx = (-0.35 + line * 0.35) * S;
    const t = Math.random();
    const y = mB + mH + 0.15 * S + t * 0.85 * S;
    const wx = Math.sin(t * Math.PI * 2.5 + line * 1.8) * 0.14 * S;
    p[i]   = bx + wx + (Math.random() - 0.5) * 0.035;
    p[i+1] = y + (Math.random() - 0.5) * 0.025;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Rim + base
  while (i / 3 < sn) {
    if (Math.random() < 0.6) {
      p[i] = (Math.random() * 2 - 1) * (mW + 0.04 * S);
      p[i+1] = mB + mH + (Math.random() - 0.5) * 0.06 * S;
    } else {
      p[i] = (Math.random() * 2 - 1) * (mW + 0.02 * S);
      p[i+1] = mB + (Math.random() - 0.5) * 0.06 * S;
    }
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i] = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

function headphoneShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const cupR = 0.64 * S;
  const cupX = 1.2 * S;
  const cupY = -0.35 * S;

  // Left cup outline (10 %)
  const cOutN = Math.floor(sn * 0.10);
  for (let k = 0; k < cOutN; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = cupR + (Math.random() - 0.5) * 0.035;
    p[i] = -cupX + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Left cup fill (10 %)
  const cFillN = Math.floor(sn * 0.10);
  for (let k = 0; k < cFillN; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * cupR * 0.85;
    p[i] = -cupX + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.06;
    i += 3;
  }

  // Right cup outline (10 %)
  const cOutN2 = Math.floor(sn * 0.10);
  for (let k = 0; k < cOutN2; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = cupR + (Math.random() - 0.5) * 0.035;
    p[i] = cupX + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Right cup fill (10 %)
  const cFillN2 = Math.floor(sn * 0.10);
  for (let k = 0; k < cFillN2; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * cupR * 0.85;
    p[i] = cupX + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.06;
    i += 3;
  }

  // Headband arc (24 %)
  const bandN = Math.floor(sn * 0.24);
  for (let k = 0; k < bandN; k++) {
    const t = Math.random();
    const x = -cupX + t * 2 * cupX;
    const y = cupY + cupR + Math.sin(Math.PI * t) * 1.0 * S;
    const th = (Math.random() - 0.5) * 0.08 * S;
    p[i]   = x + (Math.random() - 0.5) * 0.025;
    p[i+1] = y + th;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Cushion inner rings (14 %)
  const cushN = Math.floor(sn * 0.14);
  for (let k = 0; k < cushN; k++) {
    const isLeft = Math.random() < 0.5;
    const cx = isLeft ? -cupX : cupX;
    const a = Math.random() * Math.PI * 2;
    const r = cupR * (0.36 + Math.random() * 0.16);
    p[i]   = cx + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Cup padding (12 %)
  const padN = Math.floor(sn * 0.12);
  for (let k = 0; k < padN; k++) {
    const isLeft = Math.random() < 0.5;
    const cx = isLeft ? -cupX : cupX;
    const a = Math.random() * Math.PI * 2;
    const inner = cupR * 0.88, outer = cupR * 1.1;
    const r = inner + Math.random() * (outer - inner);
    p[i]   = cx + Math.cos(a) * r;
    p[i+1] = cupY + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Band-to-cup connectors
  while (i / 3 < sn) {
    const isLeft = Math.random() < 0.5;
    const cx = isLeft ? -cupX : cupX;
    p[i]   = cx + (Math.random() - 0.5) * 0.07;
    p[i+1] = cupY + cupR + Math.random() * 0.2 * S;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i] = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

/* ─── component ─── */

export default function StoryCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animationId: number;
    let canvas: HTMLCanvasElement | null = null;

    const setup = async () => {
      try {
        const THREE = await import("three/webgpu");
        const TSL = await import("three/tsl");
        if (disposed) return;

        const { float, color, uniform, positionLocal, Fn, mix, time, sin, mul } = TSL;

        // Pre-generate all four shapes
        const shapes = [
          cpuShape(COUNT),
          graphShape(COUNT),
          coffeeMugShape(COUNT),
          headphoneShape(COUNT),
        ];

        // Per-particle data: distance from shape center (for size variation)
        const distFromCenter = new Float32Array(COUNT);

        // Renderer
        const renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        canvas = renderer.domElement;
        await renderer.init();
        if (disposed) { renderer.dispose(); return; }

        // Scene + Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          45, container.clientWidth / container.clientHeight, 0.1, 100
        );
        camera.position.set(0, 0.5, 8);

        // Particle state
        const positions  = new Float32Array(COUNT * 3);
        const velocities = new Float32Array(COUNT * 3);
        const phases     = new Float32Array(COUNT);
        const freqs      = new Float32Array(COUNT);
        const sizes      = new Float32Array(COUNT); // per-particle size factor

        for (let j = 0; j < COUNT * 3; j++) positions[j] = shapes[0][j];
        for (let j = 0; j < COUNT; j++) {
          phases[j] = Math.random() * Math.PI * 2;
          freqs[j]  = 0.2 + Math.random() * 0.8;
          // Vary size: core particles bigger, scatter particles smaller
          const x = shapes[0][j * 3], y = shapes[0][j * 3 + 1], z = shapes[0][j * 3 + 2];
          const d = Math.sqrt(x * x + y * y + z * z);
          distFromCenter[j] = d;
          sizes[j] = d < 3.0 ? (0.7 + Math.random() * 0.6) : (0.15 + Math.random() * 0.25);
        }

        // Geometry
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

        // TSL Material
        const scrollU = uniform(0.0);
        const baseSizeU = uniform(220.0);
        const mouseXU = uniform(0.0);
        const mouseYU = uniform(0.0);

        const mat = new THREE.PointsNodeMaterial();
        mat.transparent     = true;
        mat.depthWrite      = false;
        mat.blending        = THREE.AdditiveBlending;
        mat.sizeAttenuation = true;

        // Size varies per particle using the aSize attribute
        const aSizeAttr = TSL.attribute("aSize");
        mat.sizeNode = mul(baseSizeU, aSizeAttr);

        // Rich color palette
        const pink    = color(0xe94560);
        const teal    = color(0x30e3ca);
        const purple  = color(0x7b2fbe);
        const blue    = color(0x3453fd);
        const white   = color(0xe4e0ee);

        mat.colorNode = Fn(() => {
          const ny   = positionLocal.y.add(3.0).div(6.0).clamp(0, 1);
          const wave = ny.add(sin(mul(time, float(0.15))).mul(0.1));
          const base = mix(pink, teal, wave.clamp(0, 1));
          const accent = mix(blue, purple, ny);
          const blended = mix(base, accent, float(0.25));
          return mix(blended, white, scrollU.mul(0.2));
        })();

        // Opacity — core particles brighter, scatter particles dimmer
        mat.opacityNode = Fn(() => {
          const sz = aSizeAttr.clamp(0, 1);
          return mix(float(0.18), float(0.72), sz);
        })();

        const points = new THREE.Points(geometry, mat);
        points.position.set(0, 0.3, 0);
        scene.add(points);

        // Ambient floating particles — more of them, with depth variation
        const ambCount = 500;
        const ambPos   = new Float32Array(ambCount * 3);
        const ambSpeed = new Float32Array(ambCount);
        const ambSizes = new Float32Array(ambCount);
        for (let j = 0; j < ambCount; j++) {
          ambPos[j * 3]     = (Math.random() - 0.5) * 24;
          ambPos[j * 3 + 1] = (Math.random() - 0.5) * 18;
          ambPos[j * 3 + 2] = (Math.random() - 0.5) * 12;
          ambSpeed[j] = 0.1 + Math.random() * 0.4;
          ambSizes[j] = 0.3 + Math.random() * 1.0;
        }
        const ambGeo = new THREE.BufferGeometry();
        ambGeo.setAttribute("position", new THREE.BufferAttribute(ambPos, 3));
        ambGeo.setAttribute("aSize", new THREE.BufferAttribute(ambSizes, 1));
        const ambMat = new THREE.PointsNodeMaterial();
        ambMat.transparent     = true;
        ambMat.depthWrite      = false;
        ambMat.blending        = THREE.AdditiveBlending;
        ambMat.sizeAttenuation = true;
        const ambSizeAttr = TSL.attribute("aSize");
        ambMat.sizeNode        = mul(float(4.0), ambSizeAttr);
        ambMat.colorNode       = Fn(() => {
          return mix(color(0x30e3ca), color(0x3453fd), sin(mul(time, float(0.3))).mul(0.5).add(0.5));
        })();
        ambMat.opacityNode     = float(0.15);
        scene.add(new THREE.Points(ambGeo, ambMat));

        // Listeners
        const onScroll = () => {
          const el = document.documentElement;
          const total = el.scrollHeight - el.clientHeight;
          scrollRef.current = total > 0 ? el.scrollTop / total : 0;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        const onResize = () => {
          const w = container.clientWidth, h = container.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        const mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };
        const onMouse = (e: MouseEvent) => {
          mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
          mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
          // Approximate world-space mouse position at z=0
          mouse.worldX = mouse.x * 5.5;
          mouse.worldY = -mouse.y * 4.0 + 0.3;
        };
        window.addEventListener("mousemove", onMouse);

        // Animation
        const clock = new THREE.Clock();
        let prevTime = 0;

        const animate = () => {
          if (disposed) return;
          const elapsed = clock.getElapsedTime();
          const dt = Math.min(elapsed - prevTime, 0.05);
          prevTime = elapsed;
          const scroll = Math.max(0, Math.min(1, scrollRef.current));

          // ── continuous morph: scroll 0→1 maps to shapes 0→3 ──
          const raw = scroll * (shapes.length - 1);
          const shapeIdx = Math.min(Math.floor(raw), shapes.length - 2);
          let morphT = raw - shapeIdx;
          // Smoother hermite interpolation
          morphT = morphT * morphT * morphT * (morphT * (morphT * 6 - 15) + 10);

          const sA = shapes[shapeIdx];
          const sB = shapes[shapeIdx + 1];

          // ── spring-physics position update with mouse repulsion ──
          const stiffness = 0.06;
          const damping   = 0.86;
          const mouseRepelRadius = 1.8;
          const mouseRepelStrength = 0.12;
          const mwx = mouse.worldX;
          const mwy = mouse.worldY;

          for (let j = 0; j < COUNT; j++) {
            const j3 = j * 3;
            const tx = sA[j3]   + (sB[j3]   - sA[j3])   * morphT;
            const ty = sA[j3+1] + (sB[j3+1] - sA[j3+1]) * morphT;
            const tz = sA[j3+2] + (sB[j3+2] - sA[j3+2]) * morphT;

            const ph = phases[j], fr = freqs[j];
            const dx = Math.sin(elapsed * fr + ph) * 0.025;
            const dy = Math.cos(elapsed * fr * 0.7 + ph + 1.3) * 0.025;

            // Spring toward target
            velocities[j3]   += (tx + dx - positions[j3])   * stiffness;
            velocities[j3+1] += (ty + dy - positions[j3+1]) * stiffness;
            velocities[j3+2] += (tz      - positions[j3+2]) * stiffness;

            // Mouse repulsion (only for core particles, not scatter)
            if (distFromCenter[j] < 3.5) {
              const pmx = positions[j3] - mwx;
              const pmy = positions[j3+1] - mwy;
              const md = Math.sqrt(pmx * pmx + pmy * pmy);
              if (md < mouseRepelRadius && md > 0.01) {
                const force = smoothstep(mouseRepelRadius, 0, md) * mouseRepelStrength;
                velocities[j3]   += (pmx / md) * force;
                velocities[j3+1] += (pmy / md) * force;
              }
            }

            velocities[j3]   *= damping;
            velocities[j3+1] *= damping;
            velocities[j3+2] *= damping;

            positions[j3]   += velocities[j3]   * dt * 60;
            positions[j3+1] += velocities[j3+1] * dt * 60;
            positions[j3+2] += velocities[j3+2] * dt * 60;

            // Update per-particle size based on current distance
            const cx = positions[j3], cy = positions[j3+1], cz = positions[j3+2];
            const cd = Math.sqrt(cx * cx + cy * cy + cz * cz);
            sizes[j] = cd < 3.0
              ? (0.7 + Math.sin(elapsed * 0.5 + ph) * 0.15)
              : (0.12 + Math.random() * 0.08);
          }
          geometry.attributes.position.needsUpdate = true;
          geometry.attributes.aSize.needsUpdate = true;

          // ── camera: subtle mouse parallax ──
          camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
          camera.position.y += (0.5 - mouse.y * 0.3 - camera.position.y) * 0.02;
          camera.lookAt(0, 0.15, 0);

          // ── ambient particles drift ──
          const aPos = ambGeo.getAttribute("position");
          for (let j = 0; j < ambCount; j++) {
            const j3 = j * 3;
            ambPos[j3 + 1] += ambSpeed[j] * 0.0025;
            ambPos[j3]     += Math.sin(elapsed * ambSpeed[j] * 0.5 + j) * 0.0008;
            ambPos[j3 + 2] += Math.cos(elapsed * ambSpeed[j] * 0.3 + j * 0.7) * 0.0004;
            if (ambPos[j3 + 1] > 9) ambPos[j3 + 1] = -9;
          }
          aPos.needsUpdate = true;

          // ── uniforms ──
          scrollU.value = scroll;
          mouseXU.value = mouse.worldX;
          mouseYU.value = mouse.worldY;

          renderer.render(scene, camera);
          animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          window.removeEventListener("mousemove", onMouse);
          cancelAnimationFrame(animationId);
          geometry.dispose(); mat.dispose();
          ambGeo.dispose(); ambMat.dispose();
          renderer.dispose();
          if (canvas && container.contains(canvas)) container.removeChild(canvas);
        };
      } catch (err) {
        console.warn("WebGPU/TSL init failed, falling back:", err);
        return undefined;
      }
    };

    let cleanupFn: (() => void) | undefined;
    setup().then((fn) => { cleanupFn = fn; });
    return () => { disposed = true; cleanupFn?.(); };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
