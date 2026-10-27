#!/usr/bin/env node
/**
 * Mondrian Project visual kit — visual-forger × fractal-architect.
 *
 * Inspectable SVG source + PNG derivatives. No diffusion.
 * Grammars: neoplastic-grid (Andrzejewski representation language),
 * tree-branch (Bountis prologue), silhouette, wash-fill, isometric.
 * Density ladder: minimal → sparse → balanced → dense → baroque.
 *
 * Usage (from this scripts/ dir or any cwd):
 *   node generate-mondrian-asset-kit.mjs
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GENERATOR = 'mondrian-asset-kit-v1';
const GENERATOR_VERSION = '1.0.0';
const HERE = dirname(fileURLToPath(import.meta.url));
const PLAN = resolve(HERE, '..');
const ASSETS = join(PLAN, 'assets');
const KIT_ROOT = join(ASSETS, 'kit');
const ORIGINALS = join(ASSETS, 'originals', 'kit');

const PROVENANCE = {
  neoplastic_grid: {
    grammar: 'neoplastic-grid',
    disposition: 'geometry_only_product_language',
    citation_inline: '(Andrzejewski et al. 2010)',
    citation_chicago:
      'Andrzejewski, D., Stork, D. G., Zhu, X., & Spronk, R. (2010). Inferring compositional style in the neo-plastic paintings of Piet Mondrian by machine learning. https://doi.org/10.1117/12.840558',
    note: 'Orthogonal points/planes/lines language for the FE I product — not ML authenticity, not a painting facsimile.',
  },
  tree_branch: {
    grammar: 'mondrian-tree',
    disposition: 'geometry_only_prologue',
    citation_inline: '(Bountis, Fokas, and Psarakis 2017)',
    citation_chicago:
      'Bountis, Tassos, Athanassios S. Fokas, and Emmanouil Psarakis. 2017. “Fractal Analysis of Tree Paintings by Piet Mondrian (1872–1944).” International Journal of Arts and Technology. https://doi.org/10.1504/ijart.2017.083902',
    note: 'Early-tree prologue the neoplastic matrix refuses.',
  },
  silhouette: {
    grammar: 'silhouette-matrix',
    disposition: 'geometry_only_derived',
    citation_inline: '(Andrzejewski et al. 2010)',
    citation_chicago:
      'Andrzejewski, D., Stork, D. G., Zhu, X., & Spronk, R. (2010). Inferring compositional style in the neo-plastic paintings of Piet Mondrian by machine learning. https://doi.org/10.1117/12.840558',
    note: 'Black armature silhouette / mask derived from grid grammar.',
  },
  wash_fill: {
    grammar: 'wash-fill',
    disposition: 'geometry_only_derived',
    citation_inline: '(Andrzejewski et al. 2010)',
    citation_chicago:
      'Andrzejewski, D., Stork, D. G., Zhu, X., & Spronk, R. (2010). Inferring compositional style in the neo-plastic paintings of Piet Mondrian by machine learning. https://doi.org/10.1117/12.840558',
    note: 'Translucent primary planes for overlays and textures.',
  },
  isometric: {
    grammar: 'isometric-grid',
    disposition: 'geometry_only_spatial_illustration',
    citation_inline: '(Andrzejewski et al. 2010)',
    citation_chicago:
      'Andrzejewski, D., Stork, D. G., Zhu, X., & Spronk, R. (2010). Inferring compositional style in the neo-plastic paintings of Piet Mondrian by machine learning. https://doi.org/10.1117/12.840558',
    note: 'Pseudo-isometric projection of planes/lines — teaching figure, not museum view.',
  },
};

const ROLES = {
  red: '#e11d48',
  yellow: '#eab308',
  blue: '#2563eb',
  white: '#f8fafc',
  black: '#0f172a',
  gray: '#94a3b8',
  field: '#0b1220',
};

const DENSITIES = [
  { key: 'minimal', lines: 2, planes: 1, opacity: 0.55 },
  { key: 'sparse', lines: 3, planes: 2, opacity: 0.65 },
  { key: 'balanced', lines: 4, planes: 3, opacity: 0.75 },
  { key: 'dense', lines: 5, planes: 5, opacity: 0.85 },
  { key: 'baroque', lines: 7, planes: 8, opacity: 0.92 },
];

function sha256(v) {
  return createHash('sha256').update(v).digest('hex');
}

function uuidFromHash(v) {
  const h = sha256(v);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${((Number.parseInt(h.slice(16, 18), 16) & 0x3f) | 0x80).toString(16)}${h.slice(18, 20)}-${h.slice(20, 32)}`;
}

function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function writeImmutable(path, bytes) {
  if (existsSync(path)) {
    if (sha256(readFileSync(path)) !== sha256(bytes)) throw new Error(`collision ${path}`);
    return;
  }
  writeFileSync(path, bytes);
}

function copyImmutable(src, dest) {
  if (existsSync(dest)) {
    if (sha256(readFileSync(src)) !== sha256(readFileSync(dest))) throw new Error(`delivery collision ${dest}`);
    return;
  }
  copyFileSync(src, dest);
}

function partitions(n, rnd) {
  const cuts = [0];
  for (let i = 0; i < n - 1; i += 1) cuts.push(0.12 + rnd() * 0.76);
  cuts.push(1);
  return [...new Set(cuts.map((x) => Math.round(x * 1000) / 1000))].sort((a, b) => a - b);
}

function gridLayout(density, seedText) {
  const rnd = mulberry32(Number.parseInt(sha256(seedText).slice(0, 8), 16));
  const xs = partitions(density.lines + 1, rnd);
  const ys = partitions(density.lines + 1, rnd);
  const colours = ['red', 'yellow', 'blue', 'white', 'white', 'gray'];
  const planes = [];
  for (let i = 0; i < density.planes; i += 1) {
    const xi = Math.floor(rnd() * (xs.length - 1));
    const yi = Math.floor(rnd() * (ys.length - 1));
    const xj = Math.min(xs.length - 1, xi + 1 + Math.floor(rnd() * 2));
    const yj = Math.min(ys.length - 1, yi + 1 + Math.floor(rnd() * 2));
    planes.push({ x0: xs[xi], y0: ys[yi], x1: xs[xj], y1: ys[yj], role: colours[Math.floor(rnd() * colours.length)] });
  }
  return { xs, ys, planes, thickness: 0.012 + density.lines * 0.0015 };
}

function svgWrap(w, h, title, desc, body, bg = 'none') {
  const bgRect = bg === 'none' ? '' : `<rect width="${w}" height="${h}" fill="${bg}"/>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d">
  <title id="t">${title}</title>
  <desc id="d">${desc}</desc>
  ${bgRect}
  ${body}
</svg>`;
}

function neoplasticSvg(layout, density, opts) {
  const { w, h, pad = 0.08, showPlanes = true, showLines = true, planeOpacity = density.opacity, lineColor = ROLES.black, field = ROLES.field } = opts;
  const ix = (u) => pad * w + u * (w - 2 * pad * w);
  const iy = (v) => pad * h + v * (h - 2 * pad * h);
  const planes = showPlanes
    ? layout.planes
        .map((p) => {
          const x = ix(p.x0);
          const y = iy(p.y0);
          const ww = ix(p.x1) - x;
          const hh = iy(p.y1) - y;
          return `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${ww.toFixed(2)}" height="${hh.toFixed(2)}" fill="${ROLES[p.role]}" opacity="${planeOpacity}"/>`;
        })
        .join('')
    : '';
  const tw = layout.thickness * Math.min(w, h);
  const lines = showLines
    ? [
        ...layout.xs.slice(1, -1).map((x) => `<rect x="${(ix(x) - tw / 2).toFixed(2)}" y="${iy(0).toFixed(2)}" width="${tw.toFixed(2)}" height="${(iy(1) - iy(0)).toFixed(2)}" fill="${lineColor}"/>`),
        ...layout.ys.slice(1, -1).map((y) => `<rect x="${ix(0).toFixed(2)}" y="${(iy(y) - tw / 2).toFixed(2)}" width="${(ix(1) - ix(0)).toFixed(2)}" height="${tw.toFixed(2)}" fill="${lineColor}"/>`),
      ].join('')
    : '';
  return svgWrap(w, h, `Neoplastic ${density.key}`, 'Orthogonal study after neoplastic grid language.', planes + lines, field);
}

function washSvg(layout, density, opts) {
  const { w, h } = opts;
  const ix = (u) => u * w;
  const iy = (v) => v * h;
  const body = layout.planes
    .map((p, i) => {
      const op = (0.12 + (i % 5) * 0.08).toFixed(3);
      return `<rect x="${ix(p.x0).toFixed(2)}" y="${iy(p.y0).toFixed(2)}" width="${(ix(p.x1) - ix(p.x0)).toFixed(2)}" height="${(iy(p.y1) - iy(p.y0)).toFixed(2)}" fill="${ROLES[p.role]}" opacity="${op}"/>`;
    })
    .join('');
  return svgWrap(w, h, `Wash ${density.key}`, 'Translucent primary fills for overlays.', body, 'none');
}

function silhouetteSvg(layout, density, opts) {
  const { w, h } = opts;
  const layoutInk = { ...layout };
  return neoplasticSvg(layoutInk, density, {
    w,
    h,
    pad: 0.1,
    showPlanes: false,
    showLines: true,
    lineColor: '#000000',
    field: 'none',
  }).replace('fill="none"', ''); // transparent bg: no field rect — regenerate cleanly
}

function silhouetteClean(layout, density, w, h) {
  const pad = 0.1;
  const ix = (u) => pad * w + u * (w - 2 * pad * w);
  const iy = (v) => pad * h + v * (h - 2 * pad * h);
  const tw = layout.thickness * Math.min(w, h);
  const lines = [
    ...layout.xs.slice(1, -1).map((x) => `<rect x="${(ix(x) - tw / 2).toFixed(2)}" y="${iy(0).toFixed(2)}" width="${tw.toFixed(2)}" height="${(iy(1) - iy(0)).toFixed(2)}" fill="#000"/>`),
    ...layout.ys.slice(1, -1).map((y) => `<rect x="${ix(0).toFixed(2)}" y="${(iy(y) - tw / 2).toFixed(2)}" width="${(ix(1) - ix(0)).toFixed(2)}" height="${tw.toFixed(2)}" fill="#000"/>`),
  ].join('');
  return svgWrap(w, h, `Silhouette ${density.key}`, 'Black armature silhouette on transparent ground.', lines, 'none');
}

function isometricSvg(layout, density, opts) {
  const { w, h } = opts;
  const cx = w * 0.5;
  const cy = h * 0.62;
  const scale = Math.min(w, h) * 0.42;
  const project = (u, v, elev = 0) => {
    const x = (u - 0.5) * scale;
    const y = (v - 0.5) * scale;
    const isoX = cx + (x - y) * Math.cos(Math.PI / 6);
    const isoY = cy + (x + y) * Math.sin(Math.PI / 6) - elev * scale * 0.35;
    return [isoX, isoY];
  };
  const faces = layout.planes
    .map((p, i) => {
      const elev = 0.05 + (i % 3) * 0.04;
      const corners = [
        project(p.x0, p.y0, elev),
        project(p.x1, p.y0, elev),
        project(p.x1, p.y1, elev),
        project(p.x0, p.y1, elev),
      ];
      const pts = corners.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');
      return `<polygon points="${pts}" fill="${ROLES[p.role]}" stroke="${ROLES.black}" stroke-width="1.2" opacity="${(0.55 + density.opacity * 0.35).toFixed(3)}"/>`;
    })
    .join('');
  const edges = layout.xs
    .slice(1, -1)
    .map((x) => {
      const a = project(x, 0, 0.02);
      const b = project(x, 1, 0.02);
      return `<line x1="${a[0].toFixed(2)}" y1="${a[1].toFixed(2)}" x2="${b[0].toFixed(2)}" y2="${b[1].toFixed(2)}" stroke="${ROLES.black}" stroke-width="2"/>`;
    })
    .join('');
  return svgWrap(w, h, `Isometric ${density.key}`, 'Pseudo-isometric neoplastic planes.', faces + edges, ROLES.field);
}

function treeSvg(density, opts) {
  const { w, h, rotate = 0 } = opts;
  const depth = 3 + DENSITIES.findIndex((d) => d.key === density.key);
  const angle = 24 + density.lines;
  const R = 1.4;
  const segs = [];
  function walk(x, y, heading, s, d) {
    if (d <= 0 || s < 0.02) return;
    const rad = (heading * Math.PI) / 180;
    const x1 = x + s * Math.cos(rad);
    const y1 = y + s * Math.sin(rad);
    segs.push([x, y, x1, y1, d]);
    walk(x1, y1, heading + angle, s / R, d - 1);
    walk(x1, y1, heading - angle, s / R, d - 1);
    const x2 = x1 + s * Math.cos(rad);
    const y2 = y1 + s * Math.sin(rad);
    segs.push([x1, y1, x2, y2, d]);
    walk(x2, y2, heading, s / R, d - 1);
  }
  walk(0, 0, 90, 0.28, depth);
  const toC = (x, y) => {
    const sx = 0.55 + (x + 1.05) / 2.1 * 0.4;
    const sy = 1 - (y + 0.02) / 1.8;
    return [sx * w, sy * h * 0.92 + h * 0.04];
  };
  const lines = segs
    .map(([x0, y0, x1, y1, d]) => {
      const [a, b] = [toC(x0, y0), toC(x1, y1)];
      const tier = d / depth;
      const col = tier > 0.66 ? ROLES.blue : tier > 0.33 ? '#10b981' : ROLES.gray;
      return `<line x1="${a[0].toFixed(2)}" y1="${a[1].toFixed(2)}" x2="${b[0].toFixed(2)}" y2="${b[1].toFixed(2)}" stroke="${col}" stroke-width="${(0.6 + tier * 3).toFixed(2)}" stroke-linecap="round" opacity="${(0.35 + tier * 0.55).toFixed(3)}"/>`;
    })
    .join('');
  const body = `<g transform="translate(${(w * 0.78).toFixed(1)},${(h * 0.52).toFixed(1)}) rotate(${rotate}) translate(${(-w * 0.78).toFixed(1)},${(-h * 0.52).toFixed(1)})">${lines}</g>`;
  return svgWrap(w, h, `Tree ${density.key}`, 'Recursive branching prologue atmosphere.', body, ROLES.field);
}

function faviconSvg(variant) {
  const size = 64;
  if (variant === 'mark-grid') {
    return svgWrap(
      size,
      size,
      'Mondrian mark',
      'Minimal neoplastic favicon.',
      `<rect x="4" y="4" width="56" height="56" fill="${ROLES.white}"/>
       <rect x="4" y="4" width="22" height="22" fill="${ROLES.red}"/>
       <rect x="38" y="4" width="22" height="14" fill="${ROLES.blue}"/>
       <rect x="4" y="38" width="14" height="22" fill="${ROLES.yellow}"/>
       <rect x="26" y="4" width="6" height="56" fill="${ROLES.black}"/>
       <rect x="4" y="26" width="56" height="6" fill="${ROLES.black}"/>
       <rect x="4" y="42" width="56" height="4" fill="${ROLES.black}"/>`,
      'none',
    );
  }
  if (variant === 'mark-silhouette') {
    return svgWrap(
      size,
      size,
      'Mondrian silhouette mark',
      'Black grid favicon on transparent.',
      `<rect x="28" y="6" width="8" height="52" fill="#000"/>
       <rect x="6" y="28" width="52" height="8" fill="#000"/>
       <rect x="6" y="14" width="52" height="5" fill="#000"/>
       <rect x="14" y="6" width="5" height="52" fill="#000"/>`,
      'none',
    );
  }
  // tree sprout
  return svgWrap(
    size,
    size,
    'Mondrian tree mark',
    'Branching prologue favicon.',
    `<rect width="64" height="64" fill="${ROLES.field}"/>
     <line x1="32" y1="54" x2="32" y2="28" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
     <line x1="32" y1="36" x2="18" y2="22" stroke="${ROLES.blue}" stroke-width="2.5" stroke-linecap="round"/>
     <line x1="32" y1="36" x2="46" y2="20" stroke="${ROLES.blue}" stroke-width="2.5" stroke-linecap="round"/>
     <line x1="18" y1="22" x2="12" y2="14" stroke="${ROLES.gray}" stroke-width="2" stroke-linecap="round"/>
     <line x1="46" y1="20" x2="52" y2="12" stroke="${ROLES.gray}" stroke-width="2" stroke-linecap="round"/>`,
    'none',
  );
}

function textureSvg(layout, density, w = 512, h = 512) {
  const body = layout.xs
    .slice(1, -1)
    .flatMap((x, i) =>
      layout.ys.slice(1, -1).map((y, j) => {
        const role = ['red', 'yellow', 'blue', 'white'][(i + j) % 4];
        return `<circle cx="${(x * w).toFixed(2)}" cy="${(y * h).toFixed(2)}" r="${(4 + density.lines).toFixed(2)}" fill="${ROLES[role]}" opacity="0.35"/>`;
      }),
    )
    .join('');
  const lines = neoplasticSvg(layout, density, { w, h, pad: 0, showPlanes: false, showLines: true, lineColor: ROLES.black, field: 'none' });
  // extract only line rects roughly by regenerating
  const pad = 0;
  const ix = (u) => u * w;
  const iy = (v) => v * h;
  const tw = layout.thickness * Math.min(w, h) * 0.6;
  const grid = [
    ...layout.xs.slice(1, -1).map((x) => `<rect x="${(ix(x) - tw / 2).toFixed(2)}" y="0" width="${tw.toFixed(2)}" height="${h}" fill="${ROLES.black}" opacity="0.25"/>`),
    ...layout.ys.slice(1, -1).map((y) => `<rect x="0" y="${(iy(y) - tw / 2).toFixed(2)}" width="${w}" height="${tw.toFixed(2)}" fill="${ROLES.black}" opacity="0.25"/>`),
  ].join('');
  return svgWrap(w, h, `Texture ${density.key}`, 'Seamless-ish neoplastic texture tile.', body + grid, ROLES.field);
}

// Spec matrix: roles × grammars × densities (curated, not exhaustive cartesian)
const JOBS = [];

for (const density of DENSITIES) {
  const seed = `neo:${density.key}:v1`;
  const layout = gridLayout(density, seed);
  JOBS.push({
    category: 'backgrounds',
    grammar: 'neoplastic_grid',
    density: density.key,
    role: 'hero-bg',
    w: 1600,
    h: 900,
    build: () => neoplasticSvg(layout, density, { w: 1600, h: 900, showPlanes: true, showLines: true }),
  });
  JOBS.push({
    category: 'figures',
    grammar: 'neoplastic_grid',
    density: density.key,
    role: 'composition-figure',
    w: 900,
    h: 900,
    build: () => neoplasticSvg(layout, density, { w: 900, h: 900, pad: 0.12, field: ROLES.white }),
  });
  JOBS.push({
    category: 'fillings',
    grammar: 'wash_fill',
    density: density.key,
    role: 'transparent-wash',
    w: 1200,
    h: 800,
    build: () => washSvg(layout, density, { w: 1200, h: 800 }),
  });
  JOBS.push({
    category: 'silhouettes',
    grammar: 'silhouette',
    density: density.key,
    role: 'armature-mask',
    w: 900,
    h: 900,
    build: () => silhouetteClean(layout, density, 900, 900),
  });
  JOBS.push({
    category: 'figures',
    grammar: 'isometric',
    density: density.key,
    role: 'isometric-study',
    w: 1200,
    h: 900,
    build: () => isometricSvg(layout, density, { w: 1200, h: 900 }),
  });
  JOBS.push({
    category: 'textures',
    grammar: 'neoplastic_grid',
    density: density.key,
    role: 'tile-texture',
    w: 512,
    h: 512,
    build: () => textureSvg(layout, density),
  });
  JOBS.push({
    category: 'backgrounds',
    grammar: 'tree_branch',
    density: density.key,
    role: 'prologue-bg',
    w: 1600,
    h: 900,
    build: () => treeSvg(density, { w: 1600, h: 900, rotate: density.lines * 2 - 8 }),
  });
}

for (const variant of ['mark-grid', 'mark-silhouette', 'mark-tree']) {
  JOBS.push({
    category: 'favicon',
    grammar: variant === 'mark-tree' ? 'tree_branch' : variant === 'mark-silhouette' ? 'silhouette' : 'neoplastic_grid',
    density: 'minimal',
    role: variant,
    w: 64,
    h: 64,
    build: () => faviconSvg(variant),
  });
}

// Extra logo lockups (horizontal)
for (const density of [DENSITIES[0], DENSITIES[2], DENSITIES[4]]) {
  const layout = gridLayout(density, `logo:${density.key}`);
  JOBS.push({
    category: 'logo',
    grammar: 'neoplastic_grid',
    density: density.key,
    role: 'wordmark-panel',
    w: 640,
    h: 180,
    build: () => neoplasticSvg(layout, density, { w: 640, h: 180, pad: 0.06, field: ROLES.field }),
  });
}

mkdirSync(KIT_ROOT, { recursive: true });
mkdirSync(ORIGINALS, { recursive: true });

const built = [];
for (const job of JOBS) {
  const svg = job.build();
  const hash = sha256(svg);
  const stem = `mp-${job.category}-${job.grammar.replace(/_/g, '-')}-${job.density}-${job.role}-${hash.slice(0, 12)}`;
  const prov = PROVENANCE[job.grammar] || PROVENANCE.neoplastic_grid;
  built.push({ ...job, svg, hash, stem, file: `${stem}.svg`, png: `${stem}.png`, provenance: prov });
}

const releaseId = sha256(JSON.stringify(built.map((b) => b.hash))).slice(0, 16);
const releaseDir = join(ORIGINALS, `release-${releaseId}`);
const deliveryDir = join(KIT_ROOT, `release-${releaseId}`);
mkdirSync(releaseDir, { recursive: true });
mkdirSync(deliveryDir, { recursive: true });

const createdAt = new Date().toISOString();
const indexRows = [];

for (const item of built) {
  const catOrig = join(releaseDir, item.category);
  const catDel = join(deliveryDir, item.category);
  mkdirSync(catOrig, { recursive: true });
  mkdirSync(catDel, { recursive: true });
  const origSvg = join(catOrig, item.file);
  const origPng = join(catOrig, item.png);
  writeImmutable(origSvg, item.svg);
  if (!existsSync(origPng)) {
    const r = spawnSync('rsvg-convert', ['-w', String(item.w), '-h', String(item.h), '-o', origPng, origSvg], { encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`PNG fail ${item.file}: ${r.stderr || r.stdout}`);
  }
  copyImmutable(origSvg, join(catDel, item.file));
  copyImmutable(origPng, join(catDel, item.png));
  indexRows.push({
    filename_svg: item.file,
    filename_png: item.png,
    category: item.category,
    role: item.role,
    grammar: item.provenance.grammar,
    density: item.density,
    size: `${item.w}×${item.h}`,
    sha256_svg: item.hash,
    provenance: item.provenance.citation_inline,
    disposition: item.provenance.disposition,
    note: item.provenance.note,
    skills: ['visual-forger', 'fractal-architect'],
    generator: `${GENERATOR}@${GENERATOR_VERSION}`,
    path_delivery: `assets/kit/release-${releaseId}/${item.category}/${item.file}`,
  });
}

const manifest = {
  schema_version: '1.0.0',
  kind: 'mondrian-project.asset-kit',
  release_id: releaseId,
  created_at: createdAt,
  authorship: { name: 'Ruvebal', email: 'ruvebal@crea-comm.net' },
  collaboration: {
    visual_forger: 'inspectable SVG source + PNG derivative',
    fractal_architect: 'neoplastic-grid + mondrian-tree grammars; density ladder',
  },
  pedagogical_boundary:
    'Neoplastic assets = product language after Andrzejewski representation. Tree assets = prologue after Bountis. Never authenticity scores or painting facsimiles.',
  citations: {
    andrzejewski: PROVENANCE.neoplastic_grid.citation_chicago,
    bountis: PROVENANCE.tree_branch.citation_chicago,
  },
  figures: indexRows.map((row) => ({
    uuid: uuidFromHash(row.sha256_svg),
    title: `${row.category}/${row.role} (${row.density})`,
    description: row.note,
    figcaption: `${row.grammar} · ${row.density}. ${row.provenance}. Study for the Mondrian Project — not a painting facsimile.`,
    fractal_hash256: row.sha256_svg,
    delivery: { svg: row.path_delivery, category: row.category },
  })),
  count: indexRows.length,
};

writeFileSync(join(deliveryDir, 'figcaption-data.json'), `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(join(deliveryDir, 'index.json'), `${JSON.stringify({ current_release_id: releaseId, created_at: createdAt, count: indexRows.length, assets: indexRows }, null, 2)}\n`);
writeFileSync(join(ASSETS, 'kit-current.json'), `${JSON.stringify({ current_release_id: releaseId, path: `kit/release-${releaseId}`, created_at: createdAt, count: indexRows.length }, null, 2)}\n`);

const privateReceipt = {
  kind: 'mondrian-project.asset-kit.private',
  release_id: releaseId,
  created_at: createdAt,
  original_release_dir: releaseDir,
  delivery_dir: deliveryDir,
  generator: GENERATOR,
  generator_version: GENERATOR_VERSION,
  jobs: built.length,
};
writeFileSync(join(ASSETS, `kit-qfa2-${releaseId}.private.json`), `${JSON.stringify(privateReceipt, null, 2)}\n`);

// Human index with provenance naming
const byCat = {};
for (const row of indexRows) {
  byCat[row.category] ||= [];
  byCat[row.category].push(row);
}

let md = `# Mondrian Project — visual asset kit

**Release:** \`${releaseId}\`  
**Created:** ${createdAt}  
**Skills:** visual-forger × fractal-architect (\`${GENERATOR}@${GENERATOR_VERSION}\`)  
**Delivery:** \`assets/kit/release-${releaseId}/\`  
**Current pointer:** [\`kit-current.json\`](kit-current.json)

## Pedagogical boundary

| Family | Use | Do not use as |
| --- | --- | --- |
| Neoplastic grid / wash / silhouette / isometric | Product identity, figures, fills | “Authentic Mondrian” or ML score |
| Tree branch | Prologue / atmosphere (what the matrix refuses) | Product schema or student work corpus |

## Citations (public)

- ${PROVENANCE.neoplastic_grid.citation_chicago}
- ${PROVENANCE.tree_branch.citation_chicago}

## Naming

\`mp-<category>-<grammar>-<density>-<role>-<hash12>.(svg|png)\`

Provenance is encoded in **grammar** + this index (not in student-facing SVG text).

## Inventory (${indexRows.length} assets)

`;

for (const [cat, rows] of Object.entries(byCat).sort()) {
  md += `\n### ${cat} (${rows.length})\n\n`;
  md += `| File | Density | Role | Grammar | Provenance |\n| --- | --- | --- | --- | --- |\n`;
  for (const r of rows) {
    md += `| \`${r.filename_svg}\` | ${r.density} | ${r.role} | ${r.grammar} | ${r.provenance} |\n`;
  }
}

md += `\n## Regenerate\n\n\`\`\`bash\nnode frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit.mjs\n\`\`\`\n`;

writeFileSync(join(ASSETS, 'INDEX.md'), md);
writeFileSync(join(deliveryDir, 'README.md'), md);

console.log(JSON.stringify({ release_id: releaseId, assets: indexRows.length, delivery: deliveryDir }, null, 2));
