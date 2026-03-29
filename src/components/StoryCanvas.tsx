"use client";

import { useEffect, useRef } from "react";

const COUNT = 28000;
const SHAPE_RATIO = 0.88;
const S = 1.2; // global shape scale

/* ─── helpers ─── */

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ─── shape: Sudarshan Chakra (Krishna's divine disc) ─── */

function chakraShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const outerR = 1.44 * S;
  const innerR = 1.08 * S;
  const hubR = 0.30 * S;
  const spokes = 24;

  // Outer ring (20 %)
  const outerN = Math.floor(sn * 0.20);
  for (let k = 0; k < outerN; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = outerR + (Math.random() - 0.5) * 0.06;
    p[i]   = Math.cos(a) * r;
    p[i+1] = Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Inner ring (14 %)
  const innerN = Math.floor(sn * 0.14);
  for (let k = 0; k < innerN; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = innerR + (Math.random() - 0.5) * 0.05;
    p[i]   = Math.cos(a) * r;
    p[i+1] = Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Serrated edge — triangular teeth around outer rim (20 %)
  const teethN = Math.floor(sn * 0.20);
  const toothCount = 48;
  for (let k = 0; k < teethN; k++) {
    const ti = Math.floor(Math.random() * toothCount);
    const baseA = (ti / toothCount) * Math.PI * 2;
    const tipA = ((ti + 0.5) / toothCount) * Math.PI * 2;
    const t = Math.random();
    const tipR = outerR + 0.28 * S;
    if (t < 0.5) {
      // Edge of tooth
      const s = Math.random();
      const a = baseA + (tipA - baseA) * s;
      const r = outerR + (tipR - outerR) * s;
      p[i]   = Math.cos(a) * r + (Math.random() - 0.5) * 0.02;
      p[i+1] = Math.sin(a) * r + (Math.random() - 0.5) * 0.02;
    } else {
      const s = Math.random();
      const nextA = ((ti + 1) / toothCount) * Math.PI * 2;
      const a = tipA + (nextA - tipA) * s;
      const r = tipR - (tipR - outerR) * s;
      p[i]   = Math.cos(a) * r + (Math.random() - 0.5) * 0.02;
      p[i+1] = Math.sin(a) * r + (Math.random() - 0.5) * 0.02;
    }
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Spokes — lines from hub to inner ring (20 %)
  const spokeN = Math.floor(sn * 0.20);
  for (let k = 0; k < spokeN; k++) {
    const si = Math.floor(Math.random() * spokes);
    const a = (si / spokes) * Math.PI * 2;
    const t = Math.random();
    const r = hubR + (innerR - hubR) * t;
    p[i]   = Math.cos(a) * r + (Math.random() - 0.5) * 0.025;
    p[i+1] = Math.sin(a) * r + (Math.random() - 0.5) * 0.025;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Ring fill between inner and outer (8 %)
  const fillN = Math.floor(sn * 0.08);
  for (let k = 0; k < fillN; k++) {
    const a = Math.random() * Math.PI * 2;
    const r = innerR + Math.random() * (outerR - innerR);
    p[i]   = Math.cos(a) * r;
    p[i+1] = Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Hub — filled center circle
  while (i / 3 < sn) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * hubR;
    p[i]   = Math.cos(a) * r;
    p[i+1] = Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Scatter
  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i]   = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

/* ─── shape: Trishul (Shiva's trident) ─── */

function trishulShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const shaftH = 2.8 * S;
  const shaftB = -1.4 * S;
  const shaftW = 0.06 * S;
  const prongH = 1.0 * S;
  const prongTop = shaftB + shaftH;
  const sideSpread = 0.7 * S;

  // Main shaft (22 %)
  const shaftN = Math.floor(sn * 0.22);
  for (let k = 0; k < shaftN; k++) {
    const t = Math.random();
    p[i]   = (Math.random() - 0.5) * shaftW * 2;
    p[i+1] = shaftB + t * shaftH;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Center prong (18 %)
  const centerN = Math.floor(sn * 0.18);
  for (let k = 0; k < centerN; k++) {
    const t = Math.random();
    // Tapers toward tip
    const w = shaftW * 2 * (1 - t * 0.7);
    p[i]   = (Math.random() - 0.5) * w;
    p[i+1] = prongTop + t * prongH;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Left prong — curved outward (16 %)
  const leftN = Math.floor(sn * 0.16);
  for (let k = 0; k < leftN; k++) {
    const t = Math.random();
    const curve = Math.sin(t * Math.PI * 0.5) * sideSpread;
    const w = shaftW * (1 - t * 0.6);
    p[i]   = -curve + (Math.random() - 0.5) * w * 2;
    p[i+1] = prongTop + t * prongH * 0.85;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Right prong — curved outward (16 %)
  const rightN = Math.floor(sn * 0.16);
  for (let k = 0; k < rightN; k++) {
    const t = Math.random();
    const curve = Math.sin(t * Math.PI * 0.5) * sideSpread;
    const w = shaftW * (1 - t * 0.6);
    p[i]   = curve + (Math.random() - 0.5) * w * 2;
    p[i+1] = prongTop + t * prongH * 0.85;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Crescent / guard where prongs meet shaft (12 %)
  const guardN = Math.floor(sn * 0.12);
  for (let k = 0; k < guardN; k++) {
    const t = Math.random() * Math.PI;
    const gw = sideSpread * 0.5;
    const gh = 0.18 * S;
    p[i]   = Math.cos(t) * gw + (Math.random() - 0.5) * 0.03;
    p[i+1] = prongTop - Math.sin(t) * gh + (Math.random() - 0.5) * 0.03;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Damaru (small drum below guard) (8 %)
  const damaruN = Math.floor(sn * 0.08);
  const damaruY = prongTop - 0.3 * S;
  for (let k = 0; k < damaruN; k++) {
    const t = Math.random();
    const y = damaruY - t * 0.25 * S;
    const w = 0.12 * S * (1 - Math.abs(t - 0.5) * 1.6);
    p[i]   = (Math.random() - 0.5) * w * 2;
    p[i+1] = y;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Remaining
  while (i / 3 < sn) {
    p[i]   = (Math.random() - 0.5) * shaftW;
    p[i+1] = shaftB + (Math.random() - 0.5) * 0.08 * S;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Scatter
  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i]   = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

/* ─── shape: Dhanush (Rama's bow with arrow) ─── */

function dhanushShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  const bowR = 1.5 * S;
  const bowAngle = Math.PI * 0.75; // arc sweep
  const bowStart = Math.PI * 0.625; // start angle (tilted)
  const bowThick = 0.05 * S;

  // Bow arc — thick curved limb (28 %)
  const arcN = Math.floor(sn * 0.28);
  for (let k = 0; k < arcN; k++) {
    const t = Math.random();
    const a = bowStart + t * bowAngle;
    // Thicker at center, thinner at tips
    const thick = bowThick * (1 + Math.sin(t * Math.PI) * 1.2);
    const r = bowR + (Math.random() - 0.5) * thick * 2;
    p[i]   = Math.cos(a) * r;
    p[i+1] = Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Bowstring — straight line between tips (12 %)
  const tipA1 = bowStart;
  const tipA2 = bowStart + bowAngle;
  const tip1x = Math.cos(tipA1) * bowR, tip1y = Math.sin(tipA1) * bowR;
  const tip2x = Math.cos(tipA2) * bowR, tip2y = Math.sin(tipA2) * bowR;
  const stringN = Math.floor(sn * 0.12);
  for (let k = 0; k < stringN; k++) {
    const t = Math.random();
    p[i]   = tip1x + (tip2x - tip1x) * t + (Math.random() - 0.5) * 0.02;
    p[i+1] = tip1y + (tip2y - tip1y) * t + (Math.random() - 0.5) * 0.02;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Arrow shaft — from string center through bow and beyond (22 %)
  const stringCx = (tip1x + tip2x) / 2;
  const stringCy = (tip1y + tip2y) / 2;
  const bowCenterA = bowStart + bowAngle / 2;
  const bowCx = Math.cos(bowCenterA) * bowR;
  const bowCy = Math.sin(bowCenterA) * bowR;
  // Arrow direction: from string center through bow center and beyond
  const adx = bowCx - stringCx, ady = bowCy - stringCy;
  const adLen = Math.sqrt(adx * adx + ady * ady);
  const anx = adx / adLen, any_ = ady / adLen;
  const arrowLen = 3.2 * S;
  const arrowStartX = stringCx - anx * 0.3 * S;
  const arrowStartY = stringCy - any_ * 0.3 * S;

  const arrowN = Math.floor(sn * 0.22);
  for (let k = 0; k < arrowN; k++) {
    const t = Math.random();
    p[i]   = arrowStartX + anx * t * arrowLen + (Math.random() - 0.5) * 0.02;
    p[i+1] = arrowStartY + any_ * t * arrowLen + (Math.random() - 0.5) * 0.02;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Arrowhead — triangle at tip (10 %)
  const headBase = 0.15 * S;
  const headLen = 0.25 * S;
  const tipX = arrowStartX + anx * arrowLen;
  const tipY = arrowStartY + any_ * arrowLen;
  const perpX = -any_, perpY = anx;
  const headN = Math.floor(sn * 0.10);
  for (let k = 0; k < headN; k++) {
    const t = Math.random();
    const s = (Math.random() - 0.5) * 2;
    const baseX = tipX - anx * headLen;
    const baseY = tipY - any_ * headLen;
    const bx = baseX + perpX * s * headBase;
    const by = baseY + perpY * s * headBase;
    p[i]   = bx + (tipX - bx) * t + (Math.random() - 0.5) * 0.015;
    p[i+1] = by + (tipY - by) * t + (Math.random() - 0.5) * 0.015;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Fletching — feathers at arrow base (8 %)
  const fletchN = Math.floor(sn * 0.08);
  for (let k = 0; k < fletchN; k++) {
    const t = Math.random() * 0.12;
    const s = (Math.random() - 0.5) * 2;
    const fw = 0.1 * S * (1 - t * 4);
    const fx = arrowStartX + anx * t * arrowLen;
    const fy = arrowStartY + any_ * t * arrowLen;
    p[i]   = fx + perpX * s * fw + (Math.random() - 0.5) * 0.01;
    p[i+1] = fy + perpY * s * fw + (Math.random() - 0.5) * 0.01;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Tip decorations / nocks
  while (i / 3 < sn) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.06 * S;
    p[i]   = stringCx + Math.cos(a) * r;
    p[i+1] = stringCy + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Scatter
  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i]   = r * Math.sin(ph) * Math.cos(th);
    p[i+1] = r * Math.sin(ph) * Math.sin(th);
    p[i+2] = r * Math.cos(ph);
    i += 3;
  }
  return p;
}

/* ─── shape: Om (sacred syllable ॐ) ─── */

function omShape(n: number): Float32Array {
  const p = new Float32Array(n * 3);
  const sn = Math.floor(n * SHAPE_RATIO);
  let i = 0;

  // Om is built from a few curves:
  // 1. Large bottom curve (like a 3)
  // 2. Upper hook/tail curving right
  // 3. Small crescent/chandrabindu on top
  // 4. Dot (bindu) above crescent

  const scale = 1.3 * S;

  // Bottom bowl — large open curve (22 %)
  const bowlN = Math.floor(sn * 0.22);
  for (let k = 0; k < bowlN; k++) {
    const t = Math.random();
    const a = Math.PI * 0.3 + t * Math.PI * 1.3;
    const rx = 0.9 * scale, ry = 0.7 * scale;
    const cx = -0.1 * scale, cy = -0.55 * scale;
    p[i]   = cx + Math.cos(a) * rx + (Math.random() - 0.5) * 0.04;
    p[i+1] = cy + Math.sin(a) * ry + (Math.random() - 0.5) * 0.04;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Middle curve — the "3" shape upper half (20 %)
  const midN = Math.floor(sn * 0.20);
  for (let k = 0; k < midN; k++) {
    const t = Math.random();
    const a = -Math.PI * 0.2 + t * Math.PI * 1.1;
    const rx = 0.65 * scale, ry = 0.5 * scale;
    const cx = 0.15 * scale, cy = 0.2 * scale;
    p[i]   = cx + Math.cos(a) * rx + (Math.random() - 0.5) * 0.04;
    p[i+1] = cy + Math.sin(a) * ry + (Math.random() - 0.5) * 0.04;
    p[i+2] = (Math.random() - 0.5) * 0.05;
    i += 3;
  }

  // Upper hook / tail sweeping right and up (18 %)
  const hookN = Math.floor(sn * 0.18);
  for (let k = 0; k < hookN; k++) {
    const t = Math.random();
    const a = Math.PI * 0.5 + t * Math.PI * 0.9;
    const rx = 0.45 * scale, ry = 0.55 * scale;
    const cx = 0.55 * scale, cy = 0.7 * scale;
    p[i]   = cx + Math.cos(a) * rx + (Math.random() - 0.5) * 0.035;
    p[i+1] = cy + Math.sin(a) * ry + (Math.random() - 0.5) * 0.035;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Vertical stroke connecting curves (10 %)
  const stemN = Math.floor(sn * 0.10);
  for (let k = 0; k < stemN; k++) {
    const t = Math.random();
    p[i]   = 0.7 * scale + (Math.random() - 0.5) * 0.04;
    p[i+1] = -0.3 * scale + t * 0.9 * scale;
    p[i+2] = (Math.random() - 0.5) * 0.04;
    i += 3;
  }

  // Crescent (chandrabindu) — small arc above (12 %)
  const crescentN = Math.floor(sn * 0.12);
  for (let k = 0; k < crescentN; k++) {
    const t = Math.random();
    const a = Math.PI * 0.15 + t * Math.PI * 0.7;
    const rx = 0.28 * scale, ry = 0.12 * scale;
    const cx = 0.35 * scale, cy = 1.25 * scale;
    p[i]   = cx + Math.cos(a) * rx + (Math.random() - 0.5) * 0.025;
    p[i+1] = cy + Math.sin(a) * ry + (Math.random() - 0.5) * 0.02;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Bindu (dot above crescent)
  while (i / 3 < sn) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.1 * scale;
    p[i]   = 0.35 * scale + Math.cos(a) * r;
    p[i+1] = 1.5 * scale + Math.sin(a) * r;
    p[i+2] = (Math.random() - 0.5) * 0.03;
    i += 3;
  }

  // Scatter
  while (i / 3 < n) {
    const r = 3.0 + Math.pow(Math.random(), 0.6) * 6;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(Math.random() * 2 - 1);
    p[i]   = r * Math.sin(ph) * Math.cos(th);
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

        // Single shape — Sudarshan Chakra
        const shape = chakraShape(COUNT);

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
        const sizes      = new Float32Array(COUNT);

        for (let j = 0; j < COUNT * 3; j++) positions[j] = shape[j];
        for (let j = 0; j < COUNT; j++) {
          phases[j] = Math.random() * Math.PI * 2;
          freqs[j]  = 0.2 + Math.random() * 0.8;
          const x = shape[j * 3], y = shape[j * 3 + 1], z = shape[j * 3 + 2];
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

        const aSizeAttr = TSL.attribute("aSize");
        mat.sizeNode = mul(baseSizeU, aSizeAttr);

        // Indian epic color palette
        const saffron  = color(0xFF9933); // sacred saffron
        const gold     = color(0xFFD700); // divine gold
        const crimson  = color(0xDC143C); // shakti red
        const deepBlue = color(0x1A3A6B); // Krishna blue
        const ivory    = color(0xFFF8E7); // warm white

        mat.colorNode = Fn(() => {
          const ny   = positionLocal.y.add(3.0).div(6.0).clamp(0, 1);
          const wave = ny.add(sin(mul(time, float(0.12))).mul(0.1));
          const base = mix(saffron, gold, wave.clamp(0, 1));
          const accent = mix(crimson, deepBlue, ny);
          const blended = mix(base, accent, float(0.2));
          return mix(blended, ivory, scrollU.mul(0.15));
        })();

        mat.opacityNode = Fn(() => {
          const sz = aSizeAttr.clamp(0, 1);
          return mix(float(0.18), float(0.72), sz);
        })();

        const points = new THREE.Points(geometry, mat);
        const group = new THREE.Group();
        group.add(points);
        group.position.set(0, 0.3, 0);
        scene.add(group);

        // Streaking space particles — moving past the chakra
        const ambCount = 1200;
        const ambPos   = new Float32Array(ambCount * 3);
        const ambSpeed = new Float32Array(ambCount);
        const ambSizes = new Float32Array(ambCount);
        for (let j = 0; j < ambCount; j++) {
          ambPos[j * 3]     = (Math.random() - 0.5) * 30;
          ambPos[j * 3 + 1] = (Math.random() - 0.5) * 20;
          ambPos[j * 3 + 2] = (Math.random() - 0.5) * 16;
          ambSpeed[j] = 0.4 + Math.random() * 1.2;
          ambSizes[j] = 0.2 + Math.random() * 0.8;
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
        ambMat.sizeNode        = mul(float(3.5), ambSizeAttr);
        ambMat.colorNode       = Fn(() => {
          return mix(color(0xFF9933), color(0xFFD700), sin(mul(time, float(0.3))).mul(0.5).add(0.5));
        })();
        ambMat.opacityNode     = float(0.15);
        scene.add(new THREE.Points(ambGeo, ambMat));

        // Trail particles — streak lines behind chakra motion
        const trailCount = 800;
        const trailPos   = new Float32Array(trailCount * 3);
        const trailSizes = new Float32Array(trailCount);
        const trailSpeed = new Float32Array(trailCount);
        for (let j = 0; j < trailCount; j++) {
          trailPos[j * 3]     = (Math.random() - 0.5) * 6;
          trailPos[j * 3 + 1] = (Math.random() - 0.5) * 5;
          trailPos[j * 3 + 2] = -Math.random() * 8 - 1;
          trailSizes[j] = 0.1 + Math.random() * 0.4;
          trailSpeed[j] = 1.5 + Math.random() * 3.0;
        }
        const trailGeo = new THREE.BufferGeometry();
        trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
        trailGeo.setAttribute("aSize", new THREE.BufferAttribute(trailSizes, 1));
        const trailMat = new THREE.PointsNodeMaterial();
        trailMat.transparent     = true;
        trailMat.depthWrite      = false;
        trailMat.blending        = THREE.AdditiveBlending;
        trailMat.sizeAttenuation = true;
        const trailSizeAttr = TSL.attribute("aSize");
        trailMat.sizeNode    = mul(float(2.5), trailSizeAttr);
        trailMat.colorNode   = Fn(() => {
          const d = positionLocal.z.add(9.0).div(8.0).clamp(0, 1);
          return mix(color(0xDC143C), color(0xD4AF37), d);
        })();
        trailMat.opacityNode = Fn(() => {
          const d = positionLocal.z.add(9.0).div(8.0).clamp(0, 1);
          return mix(float(0.02), float(0.18), d);
        })();
        scene.add(new THREE.Points(trailGeo, trailMat));

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

          // ── rotate chakra on X and Y axes ──
          group.rotation.x = elapsed * 0.15;
          group.rotation.y = elapsed * 0.25;
          group.rotation.z = elapsed * 0.35;

          // ── spring-physics position update with mouse repulsion ──
          const stiffness = 0.06;
          const damping   = 0.86;
          const mouseRepelRadius = 1.8;
          const mouseRepelStrength = 0.12;
          const mwx = mouse.worldX;
          const mwy = mouse.worldY;

          for (let j = 0; j < COUNT; j++) {
            const j3 = j * 3;
            const tx = shape[j3];
            const ty = shape[j3+1];
            const tz = shape[j3+2];

            const ph = phases[j], fr = freqs[j];
            const dx = Math.sin(elapsed * fr + ph) * 0.025;
            const dy = Math.cos(elapsed * fr * 0.7 + ph + 1.3) * 0.025;

            velocities[j3]   += (tx + dx - positions[j3])   * stiffness;
            velocities[j3+1] += (ty + dy - positions[j3+1]) * stiffness;
            velocities[j3+2] += (tz      - positions[j3+2]) * stiffness;

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

          // ── ambient particles streak past (space travel effect) ──
          const aPos = ambGeo.getAttribute("position");
          for (let j = 0; j < ambCount; j++) {
            const j3 = j * 3;
            ambPos[j3] -= ambSpeed[j] * dt * 2.5;
            ambPos[j3 + 1] += Math.sin(elapsed * ambSpeed[j] * 0.3 + j) * 0.0004;
            ambPos[j3 + 2] += Math.cos(elapsed * ambSpeed[j] * 0.2 + j * 0.5) * 0.0003;
            if (ambPos[j3] < -15) {
              ambPos[j3] = 15;
              ambPos[j3 + 1] = (Math.random() - 0.5) * 20;
              ambPos[j3 + 2] = (Math.random() - 0.5) * 16;
            }
          }
          aPos.needsUpdate = true;

          // ── trail particles rush backward from chakra ──
          const tPos = trailGeo.getAttribute("position");
          for (let j = 0; j < trailCount; j++) {
            const j3 = j * 3;
            trailPos[j3 + 2] -= trailSpeed[j] * dt;
            trailPos[j3] += Math.sin(elapsed * 0.5 + j * 0.1) * 0.002;
            trailPos[j3 + 1] += Math.cos(elapsed * 0.4 + j * 0.15) * 0.002;
            if (trailPos[j3 + 2] < -9) {
              trailPos[j3]     = (Math.random() - 0.5) * 4;
              trailPos[j3 + 1] = (Math.random() - 0.5) * 3.5;
              trailPos[j3 + 2] = -0.5 - Math.random() * 1.0;
            }
          }
          tPos.needsUpdate = true;

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
          trailGeo.dispose(); trailMat.dispose();
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
