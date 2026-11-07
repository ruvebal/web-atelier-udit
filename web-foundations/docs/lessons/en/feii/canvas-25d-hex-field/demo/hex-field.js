/**
 * Canvas 2.5D hex field — pitch/yaw projection + painter's algorithm.
 *
 * No Three.js. One <canvas>, typed arrays, and a projection function.
 * Pedagogical twin of the archive-home SVG lattice: same palette, live depth.
 *
 * Why this exists beside Units 8–9:
 * - R3F owns real Z-buffering, lights, and shaders.
 * - This pattern owns the *math* of faking depth when a full WebGL stack
 *   is the wrong tax (landing hero, dense line art, integrated GPUs).
 */

/** Atelier archive palette (archive-home.svg). */
export const PALETTE = [
  { fill: '#F3C969', stroke: '#F3C969' },
  { fill: '#FF7A59', stroke: '#FF7A59' },
  { fill: '#54D6BE', stroke: '#54D6BE' },
];

/** Axial hex layout size → flat Cartesian (pointy-top). */
export function axialToWorld(q, r, size) {
  const x = size * Math.SQRT3 * (q + r * 0.5);
  const y = size * 1.5 * r;
  return { x, y };
}

/**
 * Floor-perspective projection (Neo.mjs Neural Fabric shape).
 * Rotate yaw (Y) then pitch (X), then perspective divide.
 * Returns screen x/y plus scale and depth for painter sort.
 */
export function project(x, y, z, cx, cy, cosY, sinY, cosX, sinX, fov) {
  const dx = x - cx;
  const dy = y - cy;
  const dz = z;

  const x1 = dx * cosY - dz * sinY;
  const z1 = dz * cosY + dx * sinY;

  const y2 = dy * cosX - z1 * sinX;
  const z2 = z1 * cosX + dy * sinX;

  const scale = fov / (fov + z2);
  return {
    x: x1 * scale + cx,
    y: y2 * scale + cy,
    scale,
    depth: z2,
  };
}

/** Six corners of a pointy-top hex in local space, then project each. */
export function hexCorners(cx, cy, cz, radius, projectFn) {
  const pts = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const wx = cx + radius * Math.cos(angle);
    const wy = cy + radius * Math.sin(angle);
    pts.push(projectFn(wx, wy, cz));
  }
  return pts;
}

/**
 * Structure-of-arrays node buffer.
 * Stride 8: q, r, x, y, baseZ, energy, breath, colorIdx
 */
export const STRIDE = 8;

export function buildLattice({ radius = 7, hexSize = 28, zAmp = 18 } = {}) {
  const nodes = [];
  for (let q = -radius; q <= radius; q += 1) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r += 1) {
      const { x, y } = axialToWorld(q, r, hexSize);
      const colorIdx = Math.abs(q * 3 + r * 5) % PALETTE.length;
      const baseZ = ((q * 0.37 + r * 0.61) % 1) * zAmp - zAmp * 0.5;
      nodes.push(q, r, x, y, baseZ, 0, Math.random() * Math.PI * 2, colorIdx);
    }
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
  const fov = options.fov ?? 620;
  const hexRadius = options.hexRadius ?? 22;
  const nodes = options.nodes ?? buildLattice(options.lattice);
  const count = nodes.length / STRIDE;

  // Sort indices once allocated; refilled each frame (painter's algorithm).
  const order = new Int32Array(count);
  for (let i = 0; i < count; i += 1) order[i] = i;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;

  // Smoothed camera / pointer state (inertia).
  let pitch = 0.42;
  let yaw = -0.28;
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

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    width = Math.max(1, Math.floor(rect.width * dpr));
    height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.width = width;
    canvas.height = height;
    cx = width * 0.5;
    cy = height * 0.52;
  }

  function projectWorld(x, y, z) {
    return project(x, y, z, cx + panX, cy + panY, Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch), fov);
  }

  function paintBackground() {
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, '#101827');
    g.addColorStop(1, '#070A11');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    // Soft nebula washes — cheap stand-in for the SVG filters.
    const nebulae = [
      [0.22, 0.38, Math.max(width, height) * 0.45, 'rgba(255,122,89,0.16)'],
      [0.78, 0.62, Math.max(width, height) * 0.4, 'rgba(84,214,190,0.14)'],
      [0.52, 0.18, Math.max(width, height) * 0.35, 'rgba(243,201,105,0.1)'],
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
    if (fpsWindow >= 1) {
      fps = frames / fpsWindow;
      frames = 0;
      fpsWindow = 0;
    }

    if (!reduced) {
      // Critically damped-ish follow — inertia without a physics engine.
      const k = 1 - Math.exp(-dt * 6);
      pitch += (targetPitch - pitch) * k;
      yaw += (targetYaw - yaw) * k;
      panX += (targetPanX - panX) * k;
      panY += (targetPanY - panY) * k;
      scrollV *= Math.exp(-dt * 3.2);
      targetPitch += scrollV * dt;
      targetPitch = Math.max(0.18, Math.min(0.95, targetPitch));

      for (let i = 0; i < count; i += 1) {
        const o = i * STRIDE;
        nodes[o + 6] += dt * 1.4;
        if (hasPointer) {
          const sx = nodes[o + 2] * 0.65 + cx;
          const sy = nodes[o + 3] * 0.65 + cy;
          const dx = sx - pointerX * width;
          const dy = sy - pointerY * height;
          const dist = Math.hypot(dx, dy);
          const pulse = Math.exp(-(dist * dist) / (2 * (140 * (window.devicePixelRatio || 1)) ** 2));
          nodes[o + 5] += (pulse - nodes[o + 5]) * (1 - Math.exp(-dt * 8));
        } else {
          nodes[o + 5] *= Math.exp(-dt * 1.8);
        }
      }
    }

    paintBackground();

    // Painter's algorithm: far → near. No Z-buffer on Canvas 2D — draw order *is* depth.
    if (!frame._depth) frame._depth = new Float32Array(count);
    const depth = frame._depth;
    for (let i = 0; i < count; i += 1) {
      const o = i * STRIDE;
      const breath = reduced ? 0 : Math.sin(nodes[o + 6]) * 4;
      const lift = nodes[o + 5] * -28;
      depth[i] = projectWorld(nodes[o + 2], nodes[o + 3], nodes[o + 4] + breath + lift).depth;
      order[i] = i;
    }
    order.sort((a, b) => depth[b] - depth[a]);

    for (let n = 0; n < count; n += 1) {
      const i = order[n];
      const o = i * STRIDE;
      const breath = reduced ? 0 : Math.sin(nodes[o + 6]) * 4;
      const energy = nodes[o + 5];
      const lift = energy * -28;
      const z = nodes[o + 4] + breath + lift;
      const corners = hexCorners(nodes[o + 2], nodes[o + 3], z, hexRadius * (0.92 + energy * 0.18), projectWorld);
      const pal = PALETTE[nodes[o + 7] | 0];
      const alpha = 0.07 + energy * 0.35;
      const strokeA = 0.12 + energy * 0.45;

      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let c = 1; c < 6; c += 1) ctx.lineTo(corners[c].x, corners[c].y);
      ctx.closePath();
      ctx.fillStyle = hexToRgba(pal.fill, alpha);
      ctx.strokeStyle = hexToRgba(pal.stroke, strokeA);
      ctx.lineWidth = 1.1 * Math.min(corners[0].scale, 1.4);
      ctx.fill();
      ctx.stroke();
    }

    readout({
      cells: count,
      fps: Math.round(fps),
      pitch: pitch.toFixed(2),
      yaw: yaw.toFixed(2),
      reduced,
      engine: 'canvas-2d',
    });

    raf = requestAnimationFrame(frame);
  }

  function onPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointerX = (clientX - rect.left) / rect.width;
    pointerY = (clientY - rect.top) / rect.height;
    hasPointer = true;
    // Map pointer to gentle orbit targets.
    targetYaw = -0.28 + (pointerX - 0.5) * 0.7;
    targetPitch = 0.42 + (pointerY - 0.5) * 0.35;
    targetPanX = (pointerX - 0.5) * width * 0.04;
    targetPanY = (pointerY - 0.5) * height * 0.03;
  }

  function onPointerLeave() {
    hasPointer = false;
    targetYaw = -0.28;
    targetPitch = 0.42;
    targetPanX = 0;
    targetPanY = 0;
  }

  function onWheel(event) {
    if (reduced) return;
    event.preventDefault();
    scrollV += event.deltaY * 0.0009;
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
    getStats: () => ({ cells: count, engine: 'canvas-2d' }),
  };
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
