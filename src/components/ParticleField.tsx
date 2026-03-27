"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 700;

function scatter(n: number): Float32Array {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3 + 0] = (Math.random() * 2 - 1) * 13;
    arr[i * 3 + 1] = (Math.random() * 2 - 1) * 9;
    arr[i * 3 + 2] = (Math.random() * 2 - 1) * 1;
  }
  return arr;
}

function mandala(n: number): Float32Array {
  const arr = new Float32Array(n * 3);
  const radii = [1.2, 2.5, 3.8, 5.2, 6.5, 7.8, 9.2, 10.5];
  const circumferences = radii.map((r) => 2 * Math.PI * r);
  const totalCirc = circumferences.reduce((a, b) => a + b, 0);
  const counts = radii.map((_, k) =>
    Math.round((circumferences[k] / totalCirc) * n)
  );
  const diff = n - counts.reduce((a, b) => a + b, 0);
  counts[counts.length - 1] += diff;

  let idx = 0;
  for (let k = 0; k < radii.length; k++) {
    const r = radii[k];
    const cnt = counts[k];
    for (let j = 0; j < cnt; j++) {
      const angle = (j / cnt) * 2 * Math.PI + k * 0.4;
      arr[idx * 3 + 0] = Math.cos(angle) * r;
      arr[idx * 3 + 1] = Math.sin(angle) * r;
      arr[idx * 3 + 2] = (Math.random() * 2 - 1) * 0.1;
      idx++;
    }
  }
  while (idx < n) {
    arr[idx * 3 + 0] = 0;
    arr[idx * 3 + 1] = 0;
    arr[idx * 3 + 2] = 0;
    idx++;
  }
  return arr;
}

function wave(n: number): Float32Array {
  const arr = new Float32Array(n * 3);
  const perRow = Math.floor(n / 5);
  let idx = 0;
  for (let r = 0; r < 5; r++) {
    const count = r < 4 ? perRow : n - idx;
    const yOffset = (r - 2) * 3.2;
    for (let j = 0; j < count; j++) {
      const t = count > 1 ? j / (count - 1) : 0;
      const x = -12 + t * 24;
      const y =
        Math.sin(x * 0.5 + r * 1.2) * 1.4 +
        yOffset +
        (Math.random() * 2 - 1) * 0.2;
      const z = (Math.random() * 2 - 1) * 0.2;
      arr[idx * 3 + 0] = x;
      arr[idx * 3 + 1] = y;
      arr[idx * 3 + 2] = z;
      idx++;
    }
  }
  return arr;
}

function vortex(n: number): Float32Array {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const angle = t * 3 * 2 * Math.PI;
    const r = t * 9.5;
    arr[i * 3 + 0] = Math.cos(angle) * r;
    arr[i * 3 + 1] = Math.sin(angle) * r;
    arr[i * 3 + 2] = (1 - t) * 1.5;
  }
  return arr;
}

const VERT = `
attribute float aSize;
attribute vec3 aColor;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float dist = -mv.z;
  gl_PointSize = aSize * (300.0 / dist);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAG = `
varying vec3 vColor;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float d = length(coord);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.2, d) * 0.7;
  gl_FragColor = vec4(vColor, alpha);
}
`;

function Particles({ shapes }: { shapes: Float32Array[] }) {
  useThree();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const geoRef = useRef<any>(null);

  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const shockwaveRef = useRef<{ x: number; y: number; t: number } | null>(null);

  const posArr = useRef<Float32Array>(new Float32Array(COUNT * 3));
  const velArr = useRef<Float32Array>(new Float32Array(COUNT * 3));
  const phaseArr = useRef<Float32Array>(new Float32Array(COUNT));
  const freqArr = useRef<Float32Array>(new Float32Array(COUNT));

  const colors = useMemo(() => {
    const c = new Float32Array(COUNT * 3);
    const palette = [
      new THREE.Color("#8C4F30"),
      new THREE.Color("#9A7820"),
      new THREE.Color("#D9CCAD"),
      new THREE.Color("#836048"),
      new THREE.Color("#7B4428"),
    ];
    for (let i = 0; i < COUNT; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      c[i * 3 + 0] = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) s[i] = 0.5 + Math.random() * 1.5;
    return s;
  }, []);

  useMemo(() => {
    const s = shapes[0];
    for (let i = 0; i < COUNT * 3; i++) posArr.current[i] = s[i];
    for (let i = 0; i < COUNT; i++) {
      phaseArr.current[i] = Math.random() * Math.PI * 2;
      freqArr.current[i] = 0.4 + Math.random() * 0.6;
    }
  }, [shapes]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      scrollRef.current = total > 0 ? el.scrollTop / total : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      const fov65 = Math.tan((65 * Math.PI) / 360);
      const aspect = window.innerWidth / window.innerHeight;
      mouseRef.current = { x: nx * 10 * aspect * fov65, y: ny * 10 * fov65 };
    };
    const onClick = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      const fov65 = Math.tan((65 * Math.PI) / 360);
      const aspect = window.innerWidth / window.innerHeight;
      shockwaveRef.current = {
        x: nx * 10 * aspect * fov65,
        y: ny * 10 * fov65,
        t: 0,
      };
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("click", onClick);
    };
  }, []);

  useFrame((_, delta) => {
    const geo = geoRef.current;
    if (!geo) return;

    const scroll = Math.min(Math.max(scrollRef.current, 0), 1);
    const shapeIdx = Math.min(Math.floor(scroll * 3), 2);
    const lerpT = scroll * 3 - shapeIdx;
    const shapeA = shapes[shapeIdx];
    const shapeB = shapes[shapeIdx + 1];

    const p = posArr.current;
    const v = velArr.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const dt = Math.min(delta, 0.05);
    const time = performance.now() * 0.001;

    if (shockwaveRef.current) {
      shockwaveRef.current.t += dt * 2;
      if (shockwaveRef.current.t > 1) shockwaveRef.current = null;
    }

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const iy = ix + 1;
      const iz = ix + 2;

      const tx = shapeA[ix] + (shapeB[ix] - shapeA[ix]) * lerpT;
      const ty = shapeA[iy] + (shapeB[iy] - shapeA[iy]) * lerpT;
      const tz = shapeA[iz] + (shapeB[iz] - shapeA[iz]) * lerpT;

      const ph = phaseArr.current[i];
      const fr = freqArr.current[i];
      const driftX = Math.sin(time * fr + ph) * 0.06;
      const driftY = Math.cos(time * fr * 0.7 + ph + 1.3) * 0.06;

      v[ix] += (tx + driftX - p[ix]) * 0.028;
      v[iy] += (ty + driftY - p[iy]) * 0.028;
      v[iz] += (tz - p[iz]) * 0.028;

      const rx = p[ix] - mx;
      const ry = p[iy] - my;
      const distMouse = Math.sqrt(rx * rx + ry * ry);
      if (distMouse < 3.0 && distMouse > 0.001) {
        const force = (1 - distMouse / 3.0) * 1.6;
        v[ix] += (rx / distMouse) * force * dt * 60;
        v[iy] += (ry / distMouse) * force * dt * 60;
      }

      if (shockwaveRef.current) {
        const sw = shockwaveRef.current;
        const swx = p[ix] - sw.x;
        const swy = p[iy] - sw.y;
        const distSw = Math.sqrt(swx * swx + swy * swy);
        const ring = sw.t * 7.5;
        const spread = 1.5;
        if (distSw > 0.001 && Math.abs(distSw - ring) < spread) {
          const intensity = (1 - Math.abs(distSw - ring) / spread) * 5.5;
          v[ix] += (swx / distSw) * intensity * dt * 60;
          v[iy] += (swy / distSw) * intensity * dt * 60;
        }
      }

      v[ix] *= 0.91;
      v[iy] *= 0.91;
      v[iz] *= 0.91;

      p[ix] += v[ix] * dt * 60;
      p[iy] += v[iy] * dt * 60;
      p[iz] += v[iz] * dt * 60;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry
        ref={(ref) => {
          geoRef.current = ref;
        }}
      >
        <bufferAttribute
          attach="attributes-position"
          args={[posArr.current, 3]}
          count={COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
          count={COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
          count={COUNT}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleField() {
  const shapes = useMemo(
    () => [scatter(COUNT), mandala(COUNT), wave(COUNT), vortex(COUNT)],
    []
  );
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 65 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles shapes={shapes} />
      </Canvas>
    </div>
  );
}
