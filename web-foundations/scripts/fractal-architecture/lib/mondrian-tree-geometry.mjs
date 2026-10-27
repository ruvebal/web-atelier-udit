/**
 * Q-FA1 Mondrian tree geometry (geometry_only).
 * Canonical contract: fractal-architect references/mondrian-tree-mode.md
 * Adapter: mondrian-tree-geometry-only-v1
 */
export const MODULE = 'mondrian-tree-geometry';
export const MODULE_VERSION = '1.0.0';
export const ADAPTER = 'mondrian-tree-geometry-only-v1';
export const QUEUE_ID = 'Q-FA1';

export const GEOMETRY = {
  iterations: 6,
  scale_r: 1.45,
  angle_deg: 26,
  base: 0.3,
  viewport: { x_min: -1.05, x_max: 1.05, y_min: -0.02, y_max: 1.75 },
};

export const PALETTE = {
  background: '#0f172a',
  primary: '#3b82f6',
  accent: '#10b981',
  tertiary: '#64748b',
};

export const CITATION = {
  inline: '(Bountis, Fokas, and Psarakis 2017)',
  chicago:
    'Bountis, Tassos, Athanassios S. Fokas, and Emmanouil Psarakis. 2017. “Fractal Analysis of Tree Paintings by Piet Mondrian (1872–1944).” International Journal of Arts and Technology 10 (1). https://doi.org/10.1504/ijart.2017.083902.',
  doi: '10.1504/ijart.2017.083902',
  evaluator_safe: true,
  disposition: 'inspiration_limits_geometry_only',
};

/** Deterministic recursive binary branch segments (world space). */
export function walkTree(overrides = {}) {
  const ITERATIONS = overrides.iterations ?? GEOMETRY.iterations;
  const SCALE_R = overrides.scale_r ?? GEOMETRY.scale_r;
  const ANGLE = overrides.angle_deg ?? GEOMETRY.angle_deg;
  const BASE = overrides.base ?? GEOMETRY.base;
  const segments = [];
  function drawA(x, y, headingDeg, s, depth) {
    if (depth <= 0 || s < BASE * 0.02) return;
    const rad = (headingDeg * Math.PI) / 180;
    const x1 = x + s * Math.cos(rad);
    const y1 = y + s * Math.sin(rad);
    segments.push([x, y, x1, y1, depth]);
    drawA(x1, y1, headingDeg + ANGLE, s / SCALE_R, depth - 1);
    drawA(x1, y1, headingDeg - ANGLE, s / SCALE_R, depth - 1);
    const x2 = x1 + s * Math.cos(rad);
    const y2 = y1 + s * Math.sin(rad);
    segments.push([x1, y1, x2, y2, depth]);
    drawA(x2, y2, headingDeg, s / SCALE_R, depth - 1);
  }
  drawA(0, 0, 90, BASE, ITERATIONS);
  return segments;
}

export function toCanvas(x, y, w, h, viewport = GEOMETRY.viewport) {
  const spanX = viewport.x_max - viewport.x_min;
  const spanY = viewport.y_max - viewport.y_min;
  const screenX = (x - viewport.x_min) / spanX;
  const screenY = 1 - (y - viewport.y_min) / spanY;
  // Default crop matches Q-FA1 1600×900 pitch layout (title-safe left void).
  const ox = w * (980 / 1600);
  const oy = h * (50 / 900);
  const iw = w * (620 / 1600);
  const ih = h * (820 / 900);
  return [ox + screenX * iw, oy + screenY * ih];
}

/**
 * @param {{ density?: number, iterations?: number }} family
 * @param {{ w: number, h: number }} size
 */
export function treeLinesMarkup(family = {}, size = { w: 1600, h: 900 }) {
  const density = family.density ?? 1;
  const iterations = family.iterations ?? GEOMETRY.iterations;
  const segments = walkTree({ iterations });
  return segments
    .map(([x0, y0, x1, y1, depth]) => {
      const [cx0, cy0] = toCanvas(x0, y0, size.w, size.h);
      const [cx1, cy1] = toCanvas(x1, y1, size.w, size.h);
      const tier = depth / iterations;
      const color = tier > 0.66 ? PALETTE.primary : tier > 0.33 ? PALETTE.accent : PALETTE.tertiary;
      const width = (0.55 + tier * 3.2 * density).toFixed(2);
      const opacity = Math.min(1, 0.32 + tier * 0.58).toFixed(3);
      return `<line x1="${cx0.toFixed(2)}" y1="${cy0.toFixed(2)}" x2="${cx1.toFixed(2)}" y2="${cy1.toFixed(2)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${opacity}"/>`;
    })
    .join('');
}

/**
 * Full Q-FA1 atmosphere SVG (optional veils). Density ladder maps to stroke density + rotate.
 */
export function renderTreeAtmosphereSvg(opts) {
  const {
    w = 1600,
    h = 900,
    family = 'kit',
    density = 1,
    rotate = 0,
    phase = 0.4,
    veils = true,
    field = PALETTE.background,
  } = opts;
  const id = `mt-${String(family).replace(/[^a-z0-9-]/gi, '-')}`;
  const lines = treeLinesMarkup({ density }, { w, h });
  const scale = (1.85 + phase * 0.25).toFixed(3);
  const cx = (w * 0.8).toFixed(1);
  const cy = (h * 0.522).toFixed(1);
  const defs = veils
    ? `<defs>
    <radialGradient id="${id}-a" cx="78%" cy="42%" r="58%"><stop offset="0" stop-color="${PALETTE.primary}" stop-opacity="0.35"/><stop offset="1" stop-color="${field}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-b" cx="62%" cy="78%" r="48%"><stop offset="0" stop-color="${PALETTE.accent}" stop-opacity="0.28"/><stop offset="1" stop-color="${field}" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}-veil" x1="0" x2="1"><stop offset="0" stop-color="${field}" stop-opacity="0.98"/><stop offset="0.4" stop-color="${field}" stop-opacity="0.9"/><stop offset="1" stop-color="${field}" stop-opacity="0.2"/></linearGradient>
    <filter id="${id}-glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`
    : '';
  const wash = veils
    ? `<rect width="${w}" height="${h}" fill="url(#${id}-a)"/>
  <rect width="${w}" height="${h}" fill="url(#${id}-b)"/>`
    : '';
  const veil = veils ? `<rect width="${w}" height="${h}" fill="url(#${id}-veil)"/>` : '';
  const filterAttr = veils ? ` filter="url(#${id}-glow)"` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="title desc">
  <title id="title">Mondrian tree atmosphere — ${family}</title>
  <desc id="desc">Text-free recursive branching study after early Mondrian trees (Q-FA1 geometry_only). Not a neoplastic composition.</desc>
  ${defs}
  <rect width="${w}" height="${h}" fill="${field}"/>
  ${wash}
  <g${filterAttr} opacity="0.92" transform="translate(${cx},${cy}) rotate(${rotate}) scale(${scale}) translate(${-cx},${-cy})">${lines}</g>
  ${veil}
</svg>`;
}

export function formulaRecord() {
  return {
    adapter: ADAPTER,
    module: `${MODULE}@${MODULE_VERSION}`,
    queue_id: QUEUE_ID,
    display: 'branch(s) → forward(s); ±θ children (s/R); continue (s/R)',
    latex: null,
    parameters: { ...GEOMETRY },
    citation: { inline: CITATION.inline, chicago: CITATION.chicago, doi: CITATION.doi },
    disposition: CITATION.disposition,
  };
}
