/**
 * Canvas 2.5D hex field — Hexaform lattice + pitch/yaw projection.
 *
 * Visual brief: irregular sizes, mostly empty (stroke-only) profiles,
 * varied border widths, chaotic per-cell float, full-viewport coverage.
 */

export const PALETTE = [
  { fill: '#F3C969', stroke: '#F3C969' },
  { fill: '#FF7A59', stroke: '#FF7A59' },
  { fill: '#54D6BE', stroke: '#54D6BE' },
];

/** Hexaform mode profiles — [frequency, drift, pulse]. */
export const MODE_PROFILES = {
  lattice: [1.4, 0.25, 0.12],
  constellation: [1.62, 0.62, 0.36],
  archive: [0.72, 0.55, 0.34],
  contract: [1.18, 0.32, 0.22],
  spectrum: [0.88, 0.7, 0.48],
  field: [1.55, 0.42, 0.38],
  shader: [1.92, 0.94, 0.68],
  scene: [1.35, 0.52, 0.73],
  space: [0.78, 0.35, 0.6],
};

/**
 * Stride 14:
 * 0 x, 1 y, 2 z0, 3 radius, 4 energy, 5 phase,
 * 6 colorIdx, 7 activation, 8 strokePx, 9 fillAmt,
 * 10 dirX, 11 dirY, 12 dirZ, 13 floatSpeed
 */
export const STRIDE = 14;

function hash32(value) {
  let h = 2166136261 >>> 0;
  const s = String(value);
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Floor-perspective projection in world space.
 * Caller adds screen centre. Do not subtract canvas cx/cy from world x/y.
 */
export function project(x, y, z, cosY, sinY, cosX, sinX, fov) {
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  const y2 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  const denom = Math.max(fov * 0.15, fov + z2);
  const scale = fov / denom;
  return { x: x1 * scale, y: y2 * scale, scale, depth: z2 };
}

export function hexCorners(wx, wy, wz, radius, projectFn) {
  const pts = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    pts.push(projectFn(wx + radius * Math.cos(angle), wy + radius * Math.sin(angle), wz));
  }
  return pts;
}

function pushCell(nodes, random, x, y, z0, radius, colorIdx, activation, energy) {
  // Almost all empty profiles — rare soft fill.
  const fillAmt = random() < 0.08 ? 0.08 + random() * 0.14 : 0;
  // Border in CSS px before DPR: hairline → chunky.
  const strokePx = 0.45 + random() ** 1.6 * 3.8 + activation * 0.55;
  // Unit-ish chaotic float direction (not normalised hard — keeps some bias).
  const az = random() * Math.PI * 2;
  const el = (random() - 0.5) * Math.PI;
  const dirX = Math.cos(el) * Math.cos(az);
  const dirY = Math.cos(el) * Math.sin(az);
  const dirZ = Math.sin(el) * (0.55 + random() * 0.9);
  const floatSpeed = 0.35 + random() * 1.85 + energy * 0.4;
  const phase = random() * Math.PI * 2;
  nodes.push(
    x,
    y,
    z0,
    radius,
    0,
    phase,
    colorIdx,
    activation,
    strokePx,
    fillAmt,
    dirX,
    dirY,
    dirZ,
    floatSpeed,
  );
}

/**
 * Sparse Hexaform-profiled field with a deep Z stack.
 * Frame fill comes from camera/FOV overscan, not packing every lattice site.
 * `complexity` 0..1 raises survival rate + spiral count.
 */
export function buildHexaformField({
  width,
  height,
  mode = 'archive',
  seed = 767,
  energy = 0.55,
  density = 10,
  complexity = 0.38,
  baseRadius = 28,
  overscan = 1.35,
  zDepth = 280,
} = {}) {
  const [frequency, drift, pulse] = MODE_PROFILES[mode] || MODE_PROFILES.archive;
  const random = mulberry32(hash32(`${seed}-${mode}-canvas25d-v3`));
  const cxAmt = Math.max(0, Math.min(1, complexity));
  // Loose honeycomb — silhouette of the field, not a carpet.
  const horizontal = Math.sqrt(3) * baseRadius * 1.22;
  const vertical = baseRadius * 1.72;
  const spanW = width * overscan;
  const spanH = height * overscan;
  const cols = Math.ceil(spanW / horizontal) + 2;
  const rows = Math.ceil(spanH / vertical) + 2;
  const originCol = -Math.floor(cols / 2);
  const originRow = -Math.floor(rows / 2);
  const nodes = [];
  // Higher threshold = fewer cells; complexity opens the gate.
  const cull = 0.62 - cxAmt * 0.36 - energy * 0.06;
  const zSpread = zDepth * (0.75 + energy * 0.55 + cxAmt * 0.35);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < cols; column += 1) {
      const c = originCol + column;
      const r = originRow + row;
      const x = c * horizontal + (r % 2 ? horizontal / 2 : 0);
      const y = r * vertical;
      const distance = Math.hypot(x / spanW, y / spanH);
      const wave = (Math.sin(c * frequency * 0.72 + r * drift * 5 + seed * 0.013) + 1) / 2;
      const focus = Math.max(0, 1 - distance * 1.85);
      const activation = wave * 0.48 + focus * 0.4 + random() * 0.22;
      if (activation < cull) continue;

      const colorIdx = activation > 0.78 ? 2 : activation > 0.55 ? 1 : 0;
      const sizeNoise = random() ** 2;
      const radius =
        baseRadius *
        (0.1 + sizeNoise * 1.25 + activation * 0.3 + (random() < 0.05 ? 0.65 + random() * 0.85 : 0));
      // Wide Z presence — cells stack through depth, not a flat sheet.
      const baseZ = (random() - 0.5) * zSpread + (activation - 0.5) * zSpread * 0.35;
      pushCell(nodes, random, x, y, baseZ, radius, colorIdx, activation, energy);
    }
  }

  const spiralN = Math.max(3, Math.round(density * (0.45 + cxAmt * 0.9)));
  for (let index = 0; index < spiralN; index += 1) {
    const angle = index * 2.399963229728653 + seed * 0.0019;
    const radial = 36 + Math.sqrt(index + 1) * (30 + energy * 42);
    const x = Math.cos(angle) * radial * (1 + drift * 0.4);
    const y = Math.sin(angle) * radial * (0.62 + pulse * 0.5);
    const size =
      baseRadius * (0.4 + ((spiralN - index) / spiralN) * 1.05 + random() * 0.8);
    const colorIdx = index % 5 === 0 ? 0 : index % 2 === 0 ? 2 : 1;
    const activation = 0.5 + ((spiralN - index) / spiralN) * 0.45;
    const baseZ = (random() - 0.5) * zSpread * 1.15;
    pushCell(nodes, random, x, y, baseZ, size, colorIdx, activation, energy);
  }

  return new Float32Array(nodes);
}

export function createHexField(canvas, options = {}) {
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('2D canvas unavailable');

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches;
  const onReduced = () => {
    reduced = reducedQuery.matches;
  };
  reducedQuery.addEventListener('change', onReduced);

  const dprCap = options.dprCap ?? 1.5;
  const fov = options.fov ?? 820;
  const mode = options.mode ?? 'archive';
  let seed = options.seed ?? 767;
  let complexity = clamp01(options.complexity ?? seedToComplexity(seed));
  let energy = options.energy ?? energyFromComplexity(complexity);
  let density = options.density ?? densityFromComplexity(complexity);
  const floatAmp = options.floatAmp ?? 36;
  const zDepth = options.zDepth ?? 300;
  const seedMax = options.seedMax ?? 2047;

  let nodes = new Float32Array(0);
  let count = 0;
  let order = new Int32Array(0);
  let depthBuf = new Float32Array(0);
  let time = 0;

  let width = 0;
  let height = 0;
  let cssW = 0;
  let cssH = 0;
  let cx = 0;
  let cy = 0;
  let dpr = 1;

  let pitch = 0.48;
  let yaw = -0.32;
  let targetPitch = pitch;
  let targetYaw = yaw;
  let panX = 0;
  let panY = 0;
  let targetPanX = 0;
  let targetPanY = 0;
  let scrollV = 0;

  let pointerX = 0.5;
  let pointerY = 0.5;
  let hasPointer = false;
  let raf = 0;
  let last = performance.now();
  let frames = 0;
  let fps = 0;
  let fpsWindow = 0;

  const readout = options.onSample ?? (() => {});

  function rebuildLattice() {
    nodes = buildHexaformField({
      width: cssW,
      height: cssH,
      mode,
      seed,
      energy,
      density,
      complexity,
      zDepth,
      baseRadius: options.baseRadius ?? Math.max(22, Math.min(cssW, cssH) * 0.03),
      overscan: options.overscan ?? 1.35,
    });
    count = nodes.length / STRIDE;
    order = new Int32Array(count);
    depthBuf = new Float32Array(count);
    for (let i = 0; i < count; i += 1) order[i] = i;
  }

  function applySeed(nextSeed, nextComplexity) {
    seed = Math.max(0, Math.min(seedMax, nextSeed | 0));
    complexity = clamp01(nextComplexity ?? seedToComplexity(seed));
    energy = options.energy ?? energyFromComplexity(complexity);
    density = options.density ?? densityFromComplexity(complexity);
    if (cssW > 0) rebuildLattice();
    return { seed, complexity, cells: count };
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    cssW = Math.max(1, rect.width);
    cssH = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    width = Math.max(1, Math.floor(cssW * dpr));
    height = Math.max(1, Math.floor(cssH * dpr));
    canvas.width = width;
    canvas.height = height;
    cx = width * 0.5;
    cy = height * 0.5;
    rebuildLattice();
  }

  function projectWorld(x, y, z) {
    const p = project(x * dpr, y * dpr, z * dpr, Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch), fov);
    return {
      x: p.x + cx + panX,
      y: p.y + cy + panY,
      scale: p.scale,
      depth: p.depth,
    };
  }

  function cellPose(o) {
    const phase = nodes[o + 5];
    const speed = nodes[o + 13];
    const wave = reduced ? 0 : Math.sin(time * speed + phase);
    const amp = floatAmp * (0.55 + nodes[o + 7] * 0.7);
    const pointerE = nodes[o + 4];
    const ox = nodes[o] + wave * amp * nodes[o + 10];
    const oy = nodes[o + 1] + wave * amp * nodes[o + 11];
    const oz = nodes[o + 2] + wave * amp * nodes[o + 12] + pointerE * -36;
    return { x: ox, y: oy, z: oz, wave, pointerE };
  }

  function paintBackground() {
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, '#101827');
    g.addColorStop(1, '#070A11');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    const nebulae = [
      [0.22, 0.38, Math.max(width, height) * 0.45, 'rgba(255,122,89,0.14)'],
      [0.78, 0.62, Math.max(width, height) * 0.4, 'rgba(84,214,190,0.12)'],
      [0.52, 0.18, Math.max(width, height) * 0.35, 'rgba(243,201,105,0.09)'],
    ];
    for (const [nx, ny, r, color] of nebulae) {
      const grd = ctx.createRadialGradient(nx * width, ny * height, 0, nx * width, ny * height, r);
      grd.addColorStop(0, color);
      grd.addColorStop(1, 'rgba(7,10,17,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);
    }
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    frames += 1;
    fpsWindow += dt;
    if (fpsWindow >= 0.5) {
      fps = frames / fpsWindow;
      frames = 0;
      fpsWindow = 0;
    }

    if (!reduced) {
      time += dt;
      const k = 1 - Math.exp(-dt * 6);
      pitch += (targetPitch - pitch) * k;
      yaw += (targetYaw - yaw) * k;
      panX += (targetPanX - panX) * k;
      panY += (targetPanY - panY) * k;
      scrollV *= Math.exp(-dt * 3.2);
      targetPitch += scrollV * dt;
      targetPitch = Math.max(0.22, Math.min(1.0, targetPitch));

      for (let i = 0; i < count; i += 1) {
        const o = i * STRIDE;
        if (hasPointer) {
          const pose = cellPose(o);
          const p = projectWorld(pose.x, pose.y, pose.z);
          const dx = p.x - pointerX * width;
          const dy = p.y - pointerY * height;
          const dist = Math.hypot(dx, dy);
          const pulse = Math.exp(-(dist * dist) / (2 * (190 * dpr) ** 2));
          nodes[o + 4] += (pulse - nodes[o + 4]) * (1 - Math.exp(-dt * 8));
        } else {
          nodes[o + 4] *= Math.exp(-dt * 1.8);
        }
      }
    }

    paintBackground();

    for (let i = 0; i < count; i += 1) {
      const o = i * STRIDE;
      const pose = cellPose(o);
      depthBuf[i] = projectWorld(pose.x, pose.y, pose.z).depth;
      order[i] = i;
    }
    order.sort((a, b) => depthBuf[b] - depthBuf[a]);

    for (let n = 0; n < count; n += 1) {
      const i = order[n];
      const o = i * STRIDE;
      const pose = cellPose(o);
      const pointerE = pose.pointerE;
      const activation = nodes[o + 7];
      const radius = nodes[o + 3] * (0.9 + pointerE * 0.32 + (reduced ? 0 : Math.abs(pose.wave) * 0.06));
      const corners = hexCorners(pose.x, pose.y, pose.z, radius, projectWorld);
      const pal = PALETTE[nodes[o + 6] | 0];
      const fillAmt = nodes[o + 9];
      const strokeA = 0.28 + activation * 0.42 + pointerE * 0.4;
      const strokePx = nodes[o + 8] * dpr * Math.max(0.65, Math.min(corners[0].scale, 1.85));

      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let c = 1; c < 6; c += 1) ctx.lineTo(corners[c].x, corners[c].y);
      ctx.closePath();

      if (fillAmt > 0.001) {
        ctx.fillStyle = hexToRgba(pal.fill, fillAmt + pointerE * 0.18);
        ctx.fill();
      }

      ctx.strokeStyle = hexToRgba(pal.stroke, strokeA);
      ctx.lineWidth = Math.max(0.6 * dpr, strokePx);
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    readout({
      cells: count,
      fps: Math.round(fps) || 0,
      pitch: pitch.toFixed(2),
      yaw: yaw.toFixed(2),
      seed,
      complexity: Number(complexity.toFixed(2)),
      mode,
      reduced,
      engine: 'canvas-2d+hexaform',
    });

    raf = requestAnimationFrame(frame);
  }

  function onPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointerX = (clientX - rect.left) / Math.max(1, rect.width);
    pointerY = (clientY - rect.top) / Math.max(1, rect.height);
    hasPointer = true;
    targetYaw = -0.32 + (pointerX - 0.5) * 0.9;
    targetPitch = 0.48 + (pointerY - 0.5) * 0.42;
    targetPanX = (pointerX - 0.5) * width * 0.055;
    targetPanY = (pointerY - 0.5) * height * 0.045;
  }

  function onPointerLeave() {
    hasPointer = false;
    targetYaw = -0.32;
    targetPitch = 0.48;
    targetPanX = 0;
    targetPanY = 0;
  }

  function onWheel(event) {
    if (reduced) return;
    event.preventDefault();
    scrollV += event.deltaY * 0.001;
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();

  canvas.addEventListener('pointermove', (e) => onPointer(e.clientX, e.clientY));
  canvas.addEventListener('pointerdown', (e) => onPointer(e.clientX, e.clientY));
  canvas.addEventListener('pointerleave', onPointerLeave);
  canvas.addEventListener('pointercancel', onPointerLeave);
  canvas.addEventListener('wheel', onWheel, { passive: false });

  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      reducedQuery.removeEventListener('change', onReduced);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    },
    /** Interactive seed fader — reshuffles the field; complexity tracks seed by default. */
    setSeed(nextSeed, nextComplexity) {
      return applySeed(nextSeed, nextComplexity);
    },
    setComplexity(nextComplexity) {
      return applySeed(seed, nextComplexity);
    },
    getSeed: () => seed,
    getComplexity: () => complexity,
    getStats: () => ({
      cells: count,
      seed,
      complexity,
      mode,
      engine: 'canvas-2d+hexaform',
    }),
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, Number(v) || 0));
}

/** Map seed position on the fader into a complexity gate (sparse → busier). */
export function seedToComplexity(seed, seedMax = 2047) {
  return clamp01((seed | 0) / seedMax);
}

function energyFromComplexity(c) {
  return 0.32 + c * 0.55;
}

function densityFromComplexity(c) {
  return Math.round(4 + c * 20);
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
