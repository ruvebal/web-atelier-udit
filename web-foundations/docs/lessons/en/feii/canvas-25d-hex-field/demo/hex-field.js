/**
 * Canvas 2.5D hex field — Hexaform lattice + pitch/yaw projection.
 *
 * Supports archive-cover comps: solid fills, double-depth grids,
 * chaotic closer/bigger centre clusters. Laptop budget: cell cap + dpr cap.
 */

export const PALETTE = [
  { r: 243, g: 201, b: 105 },
  { r: 255, g: 122, b: 89 },
  { r: 84, g: 214, b: 190 },
];

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
 * Stride 15:
 * 0 x, 1 y, 2 z0, 3 radius, 4 energy, 5 phase,
 * 6 colorIdx, 7 activation, 8 strokePx, 9 alpha,
 * 10 dirX, 11 dirY, 12 dirZ, 13 floatSpeed, 14 fillAmt
 */
export const STRIDE = 15;

const HEX_ANG = [];
for (let i = 0; i < 6; i += 1) {
  const a = (Math.PI / 180) * (60 * i - 30);
  HEX_ANG.push(Math.cos(a), Math.sin(a));
}

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

export function project(x, y, z, cosY, sinY, cosX, sinX, fov) {
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  const y2 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  const denom = Math.max(fov * 0.15, fov + z2);
  const scale = fov / denom;
  return { x: x1 * scale, y: y2 * scale, scale, depth: z2 };
}

function pushCell(nodes, random, x, y, z0, radius, colorIdx, activation, energy, fillAmt) {
  const strokePx = 0.45 + random() ** 1.55 * 2.8 + activation * 0.35;
  const alpha = 0.08 + random() * 0.5 + activation * 0.25;
  const az = random() * Math.PI * 2;
  const el = (random() - 0.5) * Math.PI;
  const dirX = Math.cos(el) * Math.cos(az);
  const dirY = Math.cos(el) * Math.sin(az);
  const dirZ = Math.sin(el) * (0.55 + random() * 0.9);
  const floatSpeed = 0.16 + random() * 0.7 + energy * 0.16;
  nodes.push(
    x,
    y,
    z0,
    radius,
    0,
    random() * Math.PI * 2,
    colorIdx,
    activation,
    strokePx,
    Math.min(0.92, alpha),
    dirX,
    dirY,
    dirZ,
    floatSpeed,
    fillAmt,
  );
}

function fillForMode(fillMode, random, activation, solidBias = 0) {
  if (fillMode === 'stroke') return random() < 0.06 ? 0.06 + random() * 0.1 : 0;
  if (fillMode === 'solid') return 0.08 + activation * 0.22 + random() * 0.12 + solidBias;
  // mixed
  if (random() < 0.55) return 0.1 + activation * 0.2 + random() * 0.1;
  return 0;
}

/**
 * Archive-style Hexaform field.
 * - doubleDepth: far sheet + offset near sheet
 * - centerChaos: closer/bigger solid spiral at origin (SVG accent cluster)
 */
export function buildHexaformField({
  width,
  height,
  mode = 'archive',
  seed = 767,
  energy = 0.4,
  density = 6,
  complexity = 0.25,
  baseRadius = 30,
  overscan = 1.28,
  zDepth = 340,
  maxCells = 160,
  fillMode = 'stroke',
  doubleDepth = false,
  centerChaos = false,
} = {}) {
  const [frequency, drift, pulse] = MODE_PROFILES[mode] || MODE_PROFILES.archive;
  const random = mulberry32(hash32(`${seed}-${mode}-canvas25d-v5`));
  const cxAmt = Math.max(0, Math.min(1, complexity));
  const pack = doubleDepth ? 1.35 : 1.55;
  const horizontal = Math.sqrt(3) * baseRadius * pack;
  const vertical = baseRadius * (doubleDepth ? 1.85 : 2.05);
  const spanW = width * overscan;
  const spanH = height * overscan;
  const cols = Math.ceil(spanW / horizontal) + 1;
  const rows = Math.ceil(spanH / vertical) + 1;
  const originCol = -Math.floor(cols / 2);
  const originRow = -Math.floor(rows / 2);
  const nodes = [];
  const cull = (doubleDepth ? 0.58 : 0.72) - cxAmt * 0.28 - energy * 0.05;
  const zFar = zDepth * (0.85 + energy * 0.4);
  const zNear = zDepth * (0.95 + cxAmt * 0.35);

  function stampLattice(layer) {
    // layer 0 = far sheet, 1 = nearer sheet (offset phase)
    const zBias = layer === 0 ? zFar * 0.55 : -zNear * 0.55;
    const zJitter = layer === 0 ? zFar * 0.45 : zNear * 0.55;
    const ox = layer === 1 ? horizontal * 0.33 : 0;
    const oy = layer === 1 ? vertical * 0.28 : 0;

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < cols; column += 1) {
        const c = originCol + column;
        const r = originRow + row;
        const x = c * horizontal + (r % 2 ? horizontal / 2 : 0) + ox;
        const y = r * vertical + oy;
        const distance = Math.hypot(x / spanW, y / spanH);
        const wave = (Math.sin(c * frequency * 0.72 + r * drift * 5 + seed * 0.013 + layer) + 1) / 2;
        const focus = Math.max(0, 1 - distance * 1.9);
        const activation = wave * 0.5 + focus * 0.32 + random() * 0.2;
        const layerCull = cull + layer * 0.06;
        if (activation < layerCull) continue;

        const colorIdx = activation > 0.78 ? 2 : activation > 0.55 ? 1 : 0;
        const sizeNoise = random() ** 2;
        const radius =
          baseRadius *
          (0.12 + sizeNoise * 1.05 + activation * 0.28 + (random() < 0.04 ? 0.55 : 0)) *
          (layer === 1 ? 0.92 : 1);
        const baseZ = zBias + (random() - 0.5) * zJitter;
        const fillAmt = fillForMode(fillMode, random, activation, layer === 0 ? -0.02 : 0.02);
        pushCell(nodes, random, x, y, baseZ, radius, colorIdx, activation, energy, fillAmt);
      }
    }
  }

  stampLattice(0);
  if (doubleDepth) stampLattice(1);

  const spiralN = centerChaos
    ? Math.max(8, Math.round(density * (0.9 + cxAmt * 1.1)))
    : Math.max(2, Math.round(density * (0.35 + cxAmt * 0.7)));

  for (let index = 0; index < spiralN; index += 1) {
    const angle = index * 2.399963229728653 + seed * 0.0019;
    const radial = (centerChaos ? 22 : 40) + Math.sqrt(index + 1) * (centerChaos ? 22 + energy * 40 : 32 + energy * 36);
    const x = Math.cos(angle) * radial * (1 + drift * 0.4);
    const y = Math.sin(angle) * radial * (0.62 + pulse * 0.5);
    const t = (spiralN - index) / spiralN;
    const size = centerChaos
      ? baseRadius * (0.55 + t * 1.55 + random() * 0.9)
      : baseRadius * (0.45 + t * 0.95 + random() * 0.7);
    const colorIdx = index % 5 === 0 ? 0 : index % 2 === 0 ? 2 : 1;
    const activation = 0.55 + t * 0.4;
    const baseZ = centerChaos
      ? -zNear * (0.9 + t * 1.25 + random() * 0.45)
      : random() < 0.5
        ? -zNear * (0.8 + random() * 1.1)
        : (random() - 0.2) * zFar;
    const fillAmt = centerChaos
      ? 0.28 + t * 0.42 + random() * 0.08
      : fillForMode(fillMode, random, activation, 0.08);
    pushCell(nodes, random, x, y, baseZ, size, colorIdx, activation, energy, fillAmt);
  }

  const total = nodes.length / STRIDE;
  if (total <= maxCells) return new Float32Array(nodes);

  const scored = [];
  for (let i = 0; i < total; i += 1) {
    // Prefer centre chaos (high fill + near Z) when culling.
    const o = i * STRIDE;
    const prefer = nodes[o + 14] * 0.4 + Math.max(0, -nodes[o + 2] / zNear) * 0.35;
    scored.push({ i, a: nodes[o + 7] + prefer + random() * 0.05 });
  }
  scored.sort((a, b) => b.a - a.a);
  const out = [];
  for (let n = 0; n < maxCells; n += 1) {
    const o = scored[n].i * STRIDE;
    for (let k = 0; k < STRIDE; k += 1) out.push(nodes[o + k]);
  }
  return new Float32Array(out);
}

export function createHexField(canvas, options = {}) {
  const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
  if (!ctx) throw new Error('2D canvas unavailable');

  const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches;
  let cameraPaused = false;
  const onReduced = () => {
    reduced = reducedQuery.matches;
  };
  reducedQuery.addEventListener('change', onReduced);

  const dprCap = options.dprCap ?? 1.15;
  const fov = options.fov ?? 780;
  const mode = options.mode ?? 'archive';
  let seed = options.seed ?? 767;
  let complexity = clamp01(options.complexity ?? seedToComplexity(seed));
  let energy = options.energy ?? energyFromComplexity(complexity);
  let density = options.density ?? densityFromComplexity(complexity);
  const floatAmp = options.floatAmp ?? 22;
  let velocity = Math.max(0, options.velocity ?? 0.38);
  const zDepth = options.zDepth ?? 360;
  const maxCells = options.maxCells ?? 160;
  const seedMax = options.seedMax ?? 2047;
  const fillMode = options.fillMode ?? 'stroke';
  const doubleDepth = options.doubleDepth ?? false;
  const centerChaos = options.centerChaos ?? false;
  const palette = options.palette ?? PALETTE;
  const paper = options.paper ?? '#0b1220';
  const paperDeep = options.paperDeep ?? '#070A11';
  const interactive = options.interactive !== false;
  /** Listen for pointer on this element (hero) so canvas can stay pointer-events: none. */
  const pointerRoot = options.pointerRoot || canvas;
  /** Window-scroll depth parallax — for landing heroes behind titles. */
  const scrollParallax = options.scrollParallax === true;
  /** Wheel→pitch only when the canvas itself is the interaction surface (not page heroes). */
  const wheelPitch = options.wheelPitch ?? pointerRoot === canvas;
  const pointerAmp = options.pointerAmp ?? 1;

  let nodes = new Float32Array(0);
  let count = 0;
  let order = new Int32Array(0);
  let depthBuf = new Float32Array(0);
  let poseX = new Float32Array(0);
  let poseY = new Float32Array(0);
  let poseZ = new Float32Array(0);
  let poseWave = new Float32Array(0);
  let time = 0;

  let width = 0;
  let height = 0;
  let cssW = 0;
  let cssH = 0;
  let cx = 0;
  let cy = 0;
  let dpr = 1;

  let pitch = options.pitch ?? 0.48;
  let yaw = options.yaw ?? -0.32;
  let targetPitch = pitch;
  let targetYaw = yaw;
  let panX = 0;
  let panY = 0;
  let targetPanX = 0;
  let targetPanY = 0;
  let scrollV = 0;
  let scrollYaw = 0;
  let scrollPitch = 0;
  let scrollPanX = 0;
  let scrollPanY = 0;

  let pointerX = 0.5;
  let pointerY = 0.5;
  let hasPointer = false;
  let raf = 0;
  let last = performance.now();
  let frames = 0;
  let fps = 0;
  let fpsWindow = 0;
  let sampleAccum = 0;

  const readout = options.onSample ?? (() => {});
  const cornerX = new Float64Array(6);
  const cornerY = new Float64Array(6);

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
      maxCells,
      fillMode,
      doubleDepth,
      centerChaos,
      baseRadius: options.baseRadius ?? Math.max(24, Math.min(cssW, cssH) * 0.032),
      overscan: options.overscan ?? 1.28,
    });
    count = nodes.length / STRIDE;
    order = new Int32Array(count);
    depthBuf = new Float32Array(count);
    poseX = new Float32Array(count);
    poseY = new Float32Array(count);
    poseZ = new Float32Array(count);
    poseWave = new Float32Array(count);
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

  function projectRaw(x, y, z, cosY, sinY, cosX, sinX) {
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;
    const denom = Math.max(fov * 0.15, fov + z2);
    const scale = fov / denom;
    return {
      x: x1 * scale + cx + panX,
      y: y2 * scale + cy + panY,
      scale,
      depth: z2,
    };
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    frames += 1;
    fpsWindow += dt;
    sampleAccum += dt;
    if (fpsWindow >= 0.5) {
      fps = frames / fpsWindow;
      frames = 0;
      fpsWindow = 0;
    }

    if (!reduced) {
      time += dt;
      // The field should follow broad pointer gestures, not pen-tablet micro-noise.
      // A slower critically damped approach gives an ease-in/ease-out return to rest.
      const k = 1 - Math.exp(-dt * 3.2);
      pitch += (targetPitch - pitch) * k;
      yaw += (targetYaw - yaw) * k;
      panX += (targetPanX - panX) * k;
      panY += (targetPanY - panY) * k;
      scrollV *= Math.exp(-dt * 3.2);
      targetPitch += scrollV * dt;
      targetPitch = Math.max(0.22, Math.min(1.0, targetPitch));
    }

    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const cosX = Math.cos(pitch);
    const sinX = Math.sin(pitch);
    const px = pointerX * width;
    const py = pointerY * height;
    const ptrSigma = (200 * dpr) ** 2;
    const ptrK = hasPointer && !reduced && interactive ? 1 - Math.exp(-dt * 8) : 0;
    const decayK = !hasPointer && !reduced ? Math.exp(-dt * 1.8) : 1;

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, paper);
    g.addColorStop(1, paperDeep);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    let visible = 0;
    const margin = 80 * dpr;

    for (let i = 0; i < count; i += 1) {
      const o = i * STRIDE;
      const phase = nodes[o + 5];
      const speed = nodes[o + 13];
      const wave = reduced ? 0 : Math.sin(time * speed * velocity + phase);
      const amp = floatAmp * (0.45 + nodes[o + 7] * 0.55) * (0.65 + velocity * 0.45);
      let energyN = nodes[o + 4];

      const wx = (nodes[o] + wave * amp * nodes[o + 10]) * dpr;
      const wy = (nodes[o + 1] + wave * amp * nodes[o + 11]) * dpr;
      let wz = (nodes[o + 2] + wave * amp * nodes[o + 12]) * dpr;

      if (hasPointer && !reduced && interactive) {
        const probe = projectRaw(wx, wy, wz - energyN * 36 * dpr, cosY, sinY, cosX, sinX);
        const dx = probe.x - px;
        const dy = probe.y - py;
        const pulse = Math.exp(-(dx * dx + dy * dy) / (2 * ptrSigma));
        energyN += (pulse - energyN) * ptrK;
        nodes[o + 4] = energyN;
      } else if (!reduced) {
        energyN *= decayK;
        nodes[o + 4] = energyN;
      }

      wz -= energyN * 36 * dpr;
      const p = projectRaw(wx, wy, wz, cosY, sinY, cosX, sinX);
      if (p.x < -margin || p.x > width + margin || p.y < -margin || p.y > height + margin) {
        continue;
      }

      poseX[visible] = wx;
      poseY[visible] = wy;
      poseZ[visible] = wz;
      poseWave[visible] = wave;
      depthBuf[visible] = p.depth;
      order[visible] = i;
      visible += 1;
    }

    for (let i = 1; i < visible; i += 1) {
      const d = depthBuf[i];
      const idx = order[i];
      const px_ = poseX[i];
      const py_ = poseY[i];
      const pz_ = poseZ[i];
      const pw = poseWave[i];
      let j = i - 1;
      while (j >= 0 && depthBuf[j] < d) {
        depthBuf[j + 1] = depthBuf[j];
        order[j + 1] = order[j];
        poseX[j + 1] = poseX[j];
        poseY[j + 1] = poseY[j];
        poseZ[j + 1] = poseZ[j];
        poseWave[j + 1] = poseWave[j];
        j -= 1;
      }
      depthBuf[j + 1] = d;
      order[j + 1] = idx;
      poseX[j + 1] = px_;
      poseY[j + 1] = py_;
      poseZ[j + 1] = pz_;
      poseWave[j + 1] = pw;
    }

    ctx.lineJoin = 'miter';

    for (let n = 0; n < visible; n += 1) {
      const i = order[n];
      const o = i * STRIDE;
      const pointerE = nodes[o + 4];
      const radius = nodes[o + 3] * dpr * (0.9 + pointerE * 0.28);
      const wx = poseX[n];
      const wy = poseY[n];
      const wz = poseZ[n];

      let minSX = Infinity;
      let maxSX = -Infinity;
      for (let c = 0; c < 6; c += 1) {
        const hx = wx + radius * HEX_ANG[c * 2];
        const hy = wy + radius * HEX_ANG[c * 2 + 1];
        const p = projectRaw(hx, hy, wz, cosY, sinY, cosX, sinX);
        cornerX[c] = p.x;
        cornerY[c] = p.y;
        if (p.x < minSX) minSX = p.x;
        if (p.x > maxSX) maxSX = p.x;
      }

      const pal = palette[nodes[o + 6] | 0] || palette[0];
      const baseA = nodes[o + 9];
      const fillAmt = nodes[o + 14];
      const strokeA = Math.min(
        0.95,
        baseA * (0.75 + pointerE * 0.55) * (0.55 + Math.min(1.4, radius / (28 * dpr)) * 0.35),
      );
      const scaleApprox = Math.max(0.55, Math.min(1.9, (maxSX - minSX) / Math.max(1, radius * 2)));
      const strokePx = Math.max(0.5 * dpr, nodes[o + 8] * dpr * scaleApprox);

      ctx.beginPath();
      ctx.moveTo(cornerX[0], cornerY[0]);
      for (let c = 1; c < 6; c += 1) ctx.lineTo(cornerX[c], cornerY[c]);
      ctx.closePath();

      if (fillAmt > 0.01) {
        const fa = Math.min(0.85, fillAmt + pointerE * 0.12);
        ctx.fillStyle = `rgba(${pal.r},${pal.g},${pal.b},${fa})`;
        ctx.fill();
      }

      ctx.strokeStyle = `rgba(${pal.r},${pal.g},${pal.b},${strokeA})`;
      ctx.lineWidth = strokePx;
      ctx.stroke();
    }

    if (sampleAccum >= 0.4) {
      sampleAccum = 0;
      readout({
        cells: count,
        visible,
        fps: Math.round(fps) || 0,
        pitch: pitch.toFixed(2),
        yaw: yaw.toFixed(2),
        seed,
        complexity: Number(complexity.toFixed(2)),
        velocity: Number(velocity.toFixed(2)),
        fillMode,
        mode,
        reduced,
        engine: 'canvas-2d+hexaform',
      });
    }

    raf = requestAnimationFrame(frame);
  }

  function restPose() {
    return {
      yaw: (options.yaw ?? -0.32) + scrollYaw,
      pitch: (options.pitch ?? 0.48) + scrollPitch,
      panX: scrollPanX,
      panY: scrollPanY,
    };
  }

  function applyRestTargets() {
    const rest = restPose();
    targetYaw = rest.yaw;
    targetPitch = rest.pitch;
    targetPanX = rest.panX;
    targetPanY = rest.panY;
  }

  function onPointer(clientX, clientY) {
    if (!interactive || cameraPaused) return;
    const rect = pointerRoot.getBoundingClientRect();
    pointerX = (clientX - rect.left) / Math.max(1, rect.width);
    pointerY = (clientY - rect.top) / Math.max(1, rect.height);
    hasPointer = true;
    const rest = restPose();
    const amp = pointerAmp;
    targetYaw = rest.yaw + (pointerX - 0.5) * 0.35 * amp;
    targetPitch = rest.pitch + (pointerY - 0.5) * 0.18 * amp;
    targetPanX = rest.panX + (pointerX - 0.5) * width * 0.025 * amp;
    targetPanY = rest.panY + (pointerY - 0.5) * height * 0.02 * amp;
  }

  function onPointerLeave() {
    hasPointer = false;
    applyRestTargets();
  }

  function onWheel(event) {
    if (reduced || !interactive || !wheelPitch) return;
    event.preventDefault();
    scrollV += event.deltaY * 0.001;
  }

  function onScrollParallax() {
    if (!scrollParallax || reduced || cameraPaused) return;
    const rect = pointerRoot.getBoundingClientRect();
    const viewH = window.innerHeight || 1;
    const mid = rect.top + rect.height * 0.5;
    const t = Math.max(-1.2, Math.min(1.2, (viewH * 0.42 - mid) / viewH));
    scrollYaw = t * 0.28;
    scrollPitch = t * 0.2;
    scrollPanX = t * width * 0.04;
    scrollPanY = t * height * 0.12;
    if (!hasPointer) applyRestTargets();
  }

  const onPointerMove = (e) => onPointer(e.clientX, e.clientY);
  const onPointerDown = (e) => onPointer(e.clientX, e.clientY);

  const ro = new ResizeObserver(() => resize());
  ro.observe(canvas);
  resize();

  if (interactive) {
    pointerRoot.addEventListener('pointermove', onPointerMove);
    pointerRoot.addEventListener('pointerdown', onPointerDown);
    pointerRoot.addEventListener('pointerleave', onPointerLeave);
    pointerRoot.addEventListener('pointercancel', onPointerLeave);
    if (wheelPitch) {
      pointerRoot.addEventListener('wheel', onWheel, { passive: false });
    }
  }

  if (scrollParallax) {
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    window.addEventListener('resize', onScrollParallax, { passive: true });
    // Some hero mounts request a face-on first frame before scroll motion begins.
    if (options.frontStart !== true) onScrollParallax();
  }

  raf = requestAnimationFrame(frame);

  return {
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      reducedQuery.removeEventListener('change', onReduced);
      pointerRoot.removeEventListener('pointermove', onPointerMove);
      pointerRoot.removeEventListener('pointerdown', onPointerDown);
      pointerRoot.removeEventListener('pointerleave', onPointerLeave);
      pointerRoot.removeEventListener('pointercancel', onPointerLeave);
      pointerRoot.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScrollParallax);
      window.removeEventListener('resize', onScrollParallax);
    },
    setSeed(nextSeed, nextComplexity) {
      return applySeed(nextSeed, nextComplexity);
    },
    setComplexity(nextComplexity) {
      return applySeed(seed, nextComplexity);
    },
    setVelocity(next) {
      velocity = Math.max(0, Math.min(1.5, Number(next) || 0));
      return { velocity };
    },
    setCameraPaused(next) {
      cameraPaused = Boolean(next);
      if (cameraPaused) {
        hasPointer = false;
        applyRestTargets();
      }
      return { cameraPaused };
    },
    getSeed: () => seed,
    getComplexity: () => complexity,
    getVelocity: () => velocity,
    getStats: () => ({
      cells: count,
      seed,
      complexity,
      velocity,
      fillMode,
      mode,
      engine: 'canvas-2d+hexaform',
    }),
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, Number(v) || 0));
}

export function seedToComplexity(seed, seedMax = 2047) {
  return clamp01(((seed | 0) / seedMax) ** 1.35);
}

function energyFromComplexity(c) {
  return 0.28 + c * 0.4;
}

function densityFromComplexity(c) {
  return Math.round(2 + c * 10);
}
