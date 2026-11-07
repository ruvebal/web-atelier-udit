/**
 * Canvas 2.5D hex field — pitch/yaw projection + painter's algorithm.
 *
 * Lattice lives in *world* units around the origin. Projection rotates that
 * world, perspective-divides, then offsets onto the screen center. Do not
 * subtract screen cx/cy from world x/y — that flings the field off-canvas.
 */

/** Atelier archive palette (archive-home.svg). */
export const PALETTE = [
  { fill: '#F3C969', stroke: '#F3C969' },
  { fill: '#FF7A59', stroke: '#FF7A59' },
  { fill: '#54D6BE', stroke: '#54D6BE' },
];

/** Axial hex layout → flat Cartesian (pointy-top), world units. */
export function axialToWorld(q, r, size) {
  // Prefer sqrt(3): Math.SQRT3 is absent in some runtimes (e.g. Node 24).
  const x = size * Math.sqrt(3) * (q + r * 0.5);
  const y = size * 1.5 * r;
  return { x, y };
}

/**
 * Floor-perspective projection in world space (Neo.mjs Neural Fabric shape).
 * Returns world-projected x/y (still centered on origin) + scale + depth.
 * Screen offset is applied by the caller.
 */
export function project(x, y, z, cosY, sinY, cosX, sinX, fov) {
  // 1. Yaw around Y
  const x1 = x * cosY - z * sinY;
  const z1 = z * cosY + x * sinY;
  // 2. Pitch around X
  const y2 = y * cosX - z1 * sinX;
  const z2 = z1 * cosX + y * sinX;
  // 3. Perspective divide — keep scale finite if a point slips behind the camera
  const denom = Math.max(fov * 0.15, fov + z2);
  const scale = fov / denom;
  return {
    x: x1 * scale,
    y: y2 * scale,
    scale,
    depth: z2,
  };
}

/** Six corners of a pointy-top hex in world space, then project each. */
export function hexCorners(wx, wy, wz, radius, projectFn) {
  const pts = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    pts.push(projectFn(wx + radius * Math.cos(angle), wy + radius * Math.sin(angle), wz));
  }
  return pts;
}

/** Stride 8: q, r, x, y, baseZ, energy, breath, colorIdx */
export const STRIDE = 8;

export function buildLattice({ radius = 7, hexSize = 28, zAmp = 18 } = {}) {
  const nodes = [];
  for (let q = -radius; q <= radius; q += 1) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r += 1) {
      const { x, y } = axialToWorld(q, r, hexSize);
      const colorIdx = Math.abs(q * 3 + r * 5) % PALETTE.length;
      // JS % can be negative — fold into [0,1) so baseZ stays finite.
      const t = ((q * 0.37 + r * 0.61) % 1 + 1) % 1;
      const baseZ = t * zAmp - zAmp * 0.5;
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
  const fov = options.fov ?? 780;
  const hexRadius = options.hexRadius ?? 22;
  const nodes = options.nodes ?? buildLattice(options.lattice);
  const count = nodes.length / STRIDE;

  const order = new Int32Array(count);
  const depth = new Float32Array(count);
  for (let i = 0; i < count; i += 1) order[i] = i;

  let width = 0;
  let height = 0;
  let cx = 0;
  let cy = 0;
  let worldScale = 1;

  let pitch = 0.55;
  let yaw = -0.35;
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
    // Fit the lattice (~hexSize * radius * 2) into the shorter canvas axis.
    const lattice = options.lattice ?? {};
    const hexSize = lattice.hexSize ?? 28;
    const radius = lattice.radius ?? 7;
    const span = hexSize * (radius * 2 + 1) * 1.15;
    worldScale = Math.min(width, height) / span;
  }

  function projectWorld(x, y, z) {
    const p = project(
      x * worldScale,
      y * worldScale,
      z * worldScale,
      Math.cos(yaw),
      Math.sin(yaw),
      Math.cos(pitch),
      Math.sin(pitch),
      fov,
    );
    return {
      x: p.x + cx + panX,
      y: p.y + cy + panY,
      scale: p.scale,
      depth: p.depth,
    };
  }

  function paintBackground() {
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, '#101827');
    g.addColorStop(1, '#070A11');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

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
    if (fpsWindow >= 0.5) {
      fps = frames / fpsWindow;
      frames = 0;
      fpsWindow = 0;
    }

    if (!reduced) {
      const k = 1 - Math.exp(-dt * 6);
      pitch += (targetPitch - pitch) * k;
      yaw += (targetYaw - yaw) * k;
      panX += (targetPanX - panX) * k;
      panY += (targetPanY - panY) * k;
      scrollV *= Math.exp(-dt * 3.2);
      targetPitch += scrollV * dt;
      targetPitch = Math.max(0.25, Math.min(1.05, targetPitch));

      for (let i = 0; i < count; i += 1) {
        const o = i * STRIDE;
        nodes[o + 6] += dt * 1.4;
        if (hasPointer) {
          const p = projectWorld(nodes[o + 2], nodes[o + 3], nodes[o + 4]);
          const dx = p.x - pointerX * width;
          const dy = p.y - pointerY * height;
          const dist = Math.hypot(dx, dy);
          const pulse = Math.exp(-(dist * dist) / (2 * (160 * (window.devicePixelRatio || 1)) ** 2));
          nodes[o + 5] += (pulse - nodes[o + 5]) * (1 - Math.exp(-dt * 8));
        } else {
          nodes[o + 5] *= Math.exp(-dt * 1.8);
        }
      }
    }

    paintBackground();

    for (let i = 0; i < count; i += 1) {
      const o = i * STRIDE;
      const breath = reduced ? 0 : Math.sin(nodes[o + 6]) * 5;
      const lift = nodes[o + 5] * -36;
      depth[i] = projectWorld(nodes[o + 2], nodes[o + 3], nodes[o + 4] + breath + lift).depth;
      order[i] = i;
    }
    // Painter's algorithm: far → near.
    order.sort((a, b) => depth[b] - depth[a]);

    for (let n = 0; n < count; n += 1) {
      const i = order[n];
      const o = i * STRIDE;
      const breath = reduced ? 0 : Math.sin(nodes[o + 6]) * 5;
      const energy = nodes[o + 5];
      const lift = energy * -36;
      const z = nodes[o + 4] + breath + lift;
      const corners = hexCorners(
        nodes[o + 2],
        nodes[o + 3],
        z,
        hexRadius * (0.92 + energy * 0.22),
        projectWorld,
      );
      const pal = PALETTE[nodes[o + 7] | 0];
      // Visible at rest; energy brightens on pointer.
      const alpha = 0.22 + energy * 0.45;
      const strokeA = 0.38 + energy * 0.5;

      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let c = 1; c < 6; c += 1) ctx.lineTo(corners[c].x, corners[c].y);
      ctx.closePath();
      ctx.fillStyle = hexToRgba(pal.fill, alpha);
      ctx.strokeStyle = hexToRgba(pal.stroke, strokeA);
      ctx.lineWidth = Math.max(1, 1.25 * Math.min(corners[0].scale, 1.6));
      ctx.fill();
      ctx.stroke();
    }

    readout({
      cells: count,
      fps: Math.round(fps) || 0,
      pitch: pitch.toFixed(2),
      yaw: yaw.toFixed(2),
      reduced,
      engine: 'canvas-2d',
    });

    raf = requestAnimationFrame(frame);
  }

  function onPointer(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointerX = (clientX - rect.left) / Math.max(1, rect.width);
    pointerY = (clientY - rect.top) / Math.max(1, rect.height);
    hasPointer = true;
    targetYaw = -0.35 + (pointerX - 0.5) * 0.85;
    targetPitch = 0.55 + (pointerY - 0.5) * 0.4;
    targetPanX = (pointerX - 0.5) * width * 0.05;
    targetPanY = (pointerY - 0.5) * height * 0.04;
  }

  function onPointerLeave() {
    hasPointer = false;
    targetYaw = -0.35;
    targetPitch = 0.55;
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
