#!/usr/bin/env node
/**
 * Mondrian Project visual kit — qfa2 (second pass over the Q-FA1 twin).
 *
 * Same 41-role matrix as generate-mondrian-asset-kit-qfa1.mjs, so the two
 * releases stay A/B comparable, but every neoplastic asset is now drawn from the
 * representation the project adopted (Andrzejewski et al. 2010, §3.2): black
 * lines with centre + extent laid OVER coloured rectangles on a white ground.
 * Trees still come from the canonical Q-FA1 module (θ=26°, R=1.45, depth=6).
 *
 * What changed vs qfa1, and why: generate-mondrian-asset-kit-qfa2.RATIONALE.md
 *
 *   1. Representation: white canvas, black armature, disjoint planes, min line gap,
 *      lines with extent (T-junctions). qfa1 drew #0f172a lines on a #0b1220 field.
 *   2. Gates before any write: finite numbers, namespaced unique ids, title-safe
 *      void (mode contract: left 43%), contrast, line gap, disjoint planes, size.
 *   3. Idempotent releases: an existing release is verified, never re-stamped;
 *      PNG hashes recorded; created_at honours SOURCE_DATE_EPOCH.
 *   4. Public/private split: the receipt (absolute paths) goes to gitignored _private/.
 *   5. Inspectable data: layouts.json (normalized grid points), preview.html,
 *      per-role delta against the current qfa1 release.
 *
 * Usage:
 *   node generate-mondrian-asset-kit-qfa2.mjs            # build, gate, write release
 *   node generate-mondrian-asset-kit-qfa2.mjs --dry-run  # build + gate + delta; write nothing
 *   node generate-mondrian-asset-kit-qfa2.mjs --no-png   # SVG + metadata only (no rsvg-convert)
 *   node generate-mondrian-asset-kit-qfa2.mjs --check    # re-hash current release against its index.json
 */
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ADAPTER,
  CITATION,
  GEOMETRY,
  MODULE,
  MODULE_VERSION,
  PALETTE,
  QUEUE_ID,
  formulaRecord,
  renderTreeAtmosphereSvg,
  toCanvas,
  walkTree,
} from '../../../../web-foundations/scripts/fractal-architecture/lib/mondrian-tree-geometry.mjs';

const GENERATOR = 'mondrian-asset-kit-qfa2';
const GENERATOR_VERSION = '2.1.0';
const SKILL_FRACTAL = 'fractal-architect@1.3.0';
const SKILL_VISUAL = 'visual-forger@1.3.0';
const MODE_DOC = 'mondrian-tree-mode (geometry_only)';
/** Recursive orthogonal self-similarity — fractalizer applied to neoplastic grammar (not trees). */
const MACRO_MODE = 'neoplastic-macro-fractal-v1';
const KIT = 'kit-qfa2';
const TWIN = 'kit-qfa1';
const HERE = dirname(fileURLToPath(import.meta.url));
const PLAN = resolve(HERE, '..');
const ASSETS = join(PLAN, 'assets');
const KIT_ROOT = join(ASSETS, KIT);
const ORIGINALS = join(ASSETS, 'originals', KIT);
const RECEIPTS = join(PLAN, '_private', 'kit-receipts'); // `_private/` is gitignored at repo root

// mondrian-tree-mode §Brand/crop: left ~43% of a background stays void for titles.
const TITLE_SAFE = 0.43;
// One UDIT-dark field for every grammar (qfa1 mixed #0b1220 for grids and #0f172a for trees).
const FIELD = PALETTE.background;

// Andrzejewski roles (white/red/yellow/blue/black) + the project's single-gray extension.
const ROLES = {
  red: '#e11d48',
  yellow: '#eab308',
  blue: '#2563eb',
  gray: '#94a3b8',
  white: '#f8fafc',
  black: '#0f172a',
  lineOnDark: '#334155',
  canvasEdge: '#cbd5e1',
  isoField: '#e2e8f0',
};

const ANDRZEJEWSKI = {
  inline: '(Andrzejewski et al. 2010)',
  // Chicago rendering of the Crossref-verified record in grounding/ANDRZEJEWSKI-2010.json.
  chicago:
    'Andrzejewski, David, David G. Stork, Xiaojin Zhu, and Ron Spronk. 2010. “Inferring Compositional Style in the Neo-Plastic Paintings of Piet Mondrian by Machine Learning.” In Computer Vision and Image Analysis of Art, edited by David G. Stork, Jim Coddington, and Anna Bentkowska-Kafel, 75310G. Proceedings of SPIE 7531. https://doi.org/10.1117/12.840558.',
  doi: '10.1117/12.840558',
};

const PROVENANCE = {
  neoplastic_grid: {
    grammar: 'neoplastic-grid',
    disposition: 'geometry_only_product_language',
    cite: ANDRZEJEWSKI,
    note: 'Lines (centre + extent) over coloured rectangles on a white ground, after Andrzejewski et al. §3.2 — not ML authenticity, not a painting facsimile.',
  },
  tree_branch: {
    grammar: 'mondrian-tree',
    disposition: CITATION.disposition,
    cite: CITATION,
    note: `Q-FA1 ${ADAPTER} via ${MODULE}@${MODULE_VERSION}; early-tree prologue the neoplastic matrix refuses.`,
  },
  silhouette: {
    grammar: 'silhouette-matrix',
    disposition: 'geometry_only_derived',
    cite: ANDRZEJEWSKI,
    note: 'Black armature only, transparent ground; registers 1:1 with the composition figure of the same density.',
  },
  wash_fill: {
    grammar: 'wash-fill',
    disposition: 'geometry_only_derived',
    cite: ANDRZEJEWSKI,
    note: 'Translucent, disjoint primary planes for overlays and fills.',
  },
  isometric: {
    grammar: 'isometric-grid',
    disposition: 'geometry_only_spatial_illustration',
    cite: ANDRZEJEWSKI,
    note: 'Isometric projection: armature on the floor, planes extruded as blocks — teaching figure, not museum view.',
  },
  neoplastic_macro: {
    grammar: 'neoplastic-macro',
    disposition: 'geometry_only_product_language_recursive',
    cite: ANDRZEJEWSKI,
    note: `Fractalizer on neoplastic grammar (${MACRO_MODE}): nested orthogonal compositions in macro cells — constructivist density without tree branching.`,
  },
};

// `partial` = share of secondary-axis lines that stop on a primary line (T-junction).
// `tree` only re-weights strokes / crop; θ, R and depth stay on the Q-FA1 envelope.
const DENSITIES = [
  { key: 'minimal', lines: 2, planes: 1, partial: 0, tree: { density: 0.55, rotate: -4, phase: 0.12 } },
  { key: 'sparse', lines: 3, planes: 2, partial: 0.2, tree: { density: 0.8, rotate: -2, phase: 0.28 } },
  { key: 'balanced', lines: 4, planes: 3, partial: 0.3, tree: { density: 1, rotate: 0, phase: 0.4 } },
  { key: 'dense', lines: 5, planes: 5, partial: 0.4, tree: { density: 1.3, rotate: 4, phase: 0.55 } },
  { key: 'baroque', lines: 7, planes: 8, partial: 0.5, tree: { density: 1.65, rotate: 8, phase: 0.71 } },
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

const seeded = (text) => mulberry32(Number.parseInt(sha256(text).slice(0, 8), 16));
const round3 = (x) => Math.round(x * 1000) / 1000;
const f2 = (x) => x.toFixed(2);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

function shade(hex, k) {
  return `#${[1, 3, 5]
    .map((i) => Math.round(Number.parseInt(hex.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0'))
    .join('')}`;
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

// ── Layout: normalized grid points, after Andrzejewski et al. §3.2 ─────────────

/** n interior cuts, uniformly random but never closer than `gap` to each other or to the borders. */
function cuts(n, rnd, gap) {
  const slack = 1 - (n + 1) * gap;
  const raw = Array.from({ length: n }, () => rnd() * slack).sort((a, b) => a - b);
  return [0, ...raw.map((u, i) => round3(gap * (i + 1) + u)), 1];
}

function shuffle(items, rnd) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function gridLayout(density, seed) {
  const rnd = seeded(seed);
  const gap = Math.min(0.07, 0.6 / (density.lines + 1));
  const xs = cuts(density.lines, rnd, gap);
  const ys = cuts(density.lines, rnd, gap);
  const primary = rnd() < 0.5 ? 'h' : 'v';
  const secondary = primary === 'h' ? 'v' : 'h';
  const full = primary === 'h' ? ys : xs;
  const cross = primary === 'h' ? xs : ys;
  const weight = () => (rnd() < 0.3 ? 1.4 : 1);
  const lines = full.slice(1, -1).map((at) => ({ orient: primary, at, from: 0, to: 1, weight: weight() }));
  for (const at of cross.slice(1, -1)) {
    let [a, b] = [0, full.length - 1];
    if (rnd() < density.partial) {
      a = Math.floor(rnd() * (full.length - 1));
      b = a + 1 + Math.floor(rnd() * (full.length - 1 - a));
      if (a === 0 && b === full.length - 1) b -= 1;
    }
    lines.push({ orient: secondary, at, from: full[a], to: full[b], weight: weight() });
  }
  const occupied = new Set();
  const primaries = shuffle(['red', 'yellow', 'blue'], rnd);
  const planes = [];
  for (let tries = 0; planes.length < density.planes && tries < 400; tries += 1) {
    const xi = Math.floor(rnd() * (xs.length - 1));
    const yi = Math.floor(rnd() * (ys.length - 1));
    const xj = Math.min(xs.length - 1, xi + 1 + Math.floor(rnd() * 2));
    const yj = Math.min(ys.length - 1, yi + 1 + Math.floor(rnd() * 2));
    const cells = [];
    for (let x = xi; x < xj; x += 1) for (let y = yi; y < yj; y += 1) cells.push(`${x},${y}`);
    if (cells.some((c) => occupied.has(c))) continue;
    cells.forEach((c) => occupied.add(c));
    // Primaries first; at most one small gray accent when density ≥ 5 planes.
    let role;
    if (planes.length < 3) role = primaries[planes.length];
    else {
      const grayUsed = planes.filter((p) => p.role === 'gray').length;
      const allowGray = density.planes >= 5 && grayUsed < 1 && rnd() < 0.2;
      role = allowGray ? 'gray' : ['red', 'yellow', 'blue'][Math.floor(rnd() * 3)];
    }
    planes.push({ x0: xs[xi], y0: ys[yi], x1: xs[xj], y1: ys[yj], role });
  }
  // Ensure all three primaries appear when the density asks for ≥3 planes.
  if (density.planes >= 3) {
    for (const need of ['red', 'yellow', 'blue']) {
      if (!planes.some((p) => p.role === need)) {
        const victim = planes.find((p) => p.role === 'gray') || planes[planes.length - 1];
        victim.role = need;
      }
    }
  }
  // Cap gray among coloured area (matches colourHarmony gate) by recolouring to scarcest primary.
  const area = (p) => (p.x1 - p.x0) * (p.y1 - p.y0);
  const grayOfColoured = () => {
    const coloured = planes.reduce((s, p) => s + area(p), 0) || 1;
    return planes.filter((p) => p.role === 'gray').reduce((s, p) => s + area(p), 0) / coloured;
  };
  while (grayOfColoured() > 0.35) {
    const g = planes.filter((p) => p.role === 'gray').sort((a, b) => area(b) - area(a))[0];
    if (!g) break;
    const counts = Object.fromEntries(['red', 'yellow', 'blue'].map((r) => [r, planes.filter((p) => p.role === r).length]));
    g.role = ['red', 'yellow', 'blue'].sort((a, b) => counts[a] - counts[b])[0];
  }
  return { seed, xs, ys, primary, lines, planes, thickness: 0.012 + density.lines * 0.0015 };
}

/** Nested neoplastic layouts: fractalizer applied to orthogonal grammar (macro-forms). */
function macroTree(density, seed, depth = 2) {
  const root = gridLayout(
    { key: density.key, lines: Math.max(2, density.lines - 1), planes: Math.max(1, density.planes - 1), partial: density.partial },
    `${seed}:root`,
  );
  const rnd = seeded(`${seed}:nest`);
  const nests = [];
  const nestBudget = Math.min(4, 1 + Math.floor(density.lines / 2));
  const cells = [];
  for (let xi = 0; xi < root.xs.length - 1; xi += 1) {
    for (let yi = 0; yi < root.ys.length - 1; yi += 1) {
      const area = (root.xs[xi + 1] - root.xs[xi]) * (root.ys[yi + 1] - root.ys[yi]);
      cells.push({ xi, yi, area, x0: root.xs[xi], y0: root.ys[yi], x1: root.xs[xi + 1], y1: root.ys[yi + 1] });
    }
  }
  cells.sort((a, b) => b.area - a.area);
  const childDensity = {
    key: density.key,
    lines: Math.max(2, density.lines - 2),
    planes: Math.max(1, Math.min(2, density.planes - 1)),
    partial: Math.min(0.25, density.partial),
  };
  for (const cell of cells) {
    if (nests.length >= nestBudget) break;
    if (cell.area < 0.08) continue;
    // Prefer nesting into empty (white ground) cells — not over coloured planes.
    const covered = root.planes.some(
      (p) => !(cell.x1 <= p.x0 || p.x1 <= cell.x0 || cell.y1 <= p.y0 || p.y1 <= cell.y0),
    );
    if (covered && rnd() > 0.25) continue;
    if (rnd() > 0.85) continue;
    const child = gridLayout(childDensity, `${seed}:cell:${cell.xi},${cell.yi}`);
    nests.push({
      box: { x0: cell.x0, y0: cell.y0, x1: cell.x1, y1: cell.y1 },
      layout: child,
      depth: 1,
    });
    if (depth > 1 && cell.area > 0.18 && nests.length < nestBudget) {
      // One deeper nest inside the largest child plane gap (second fractal level).
      const inner = gridLayout(
        { key: density.key, lines: 2, planes: 2, partial: 0.15 },
        `${seed}:deep:${cell.xi},${cell.yi}`,
      );
      const inset = 0.12;
      nests.push({
        box: {
          x0: cell.x0 + (cell.x1 - cell.x0) * inset,
          y0: cell.y0 + (cell.y1 - cell.y0) * inset,
          x1: cell.x1 - (cell.x1 - cell.x0) * inset,
          y1: cell.y1 - (cell.y1 - cell.y0) * inset,
        },
        layout: inner,
        depth: 2,
      });
    }
  }
  return { seed, root, nests, thickness: root.thickness };
}

function colourHarmony(layout) {
  const roles = layout.planes.map((p) => p.role);
  const area = (p) => (p.x1 - p.x0) * (p.y1 - p.y0);
  const coloured = layout.planes.reduce((s, p) => s + area(p), 0);
  const grayArea = layout.planes.filter((p) => p.role === 'gray').reduce((s, p) => s + area(p), 0);
  return {
    hasRed: roles.includes('red'),
    hasYellow: roles.includes('yellow'),
    hasBlue: roles.includes('blue'),
    grayShare: coloured > 0 ? grayArea / coloured : 0,
    colouredShare: coloured,
  };
}

const minGap = (arr) => Math.min(...arr.slice(1).map((v, i) => v - arr[i]));

function planesDisjoint(planes) {
  return planes.every((a, i) =>
    planes.slice(i + 1).every((b) => a.x1 <= b.x0 || b.x1 <= a.x0 || a.y1 <= b.y0 || b.y1 <= a.y0),
  );
}

// ── Rendering ─────────────────────────────────────────────────────────────────

const rect = (x, y, w, h, fill, extra = '') =>
  `<rect x="${f2(x)}" y="${f2(y)}" width="${f2(w)}" height="${f2(h)}" fill="${fill}"${extra}/>`;

const polygon = (pts, fill, extra = '') =>
  `<polygon points="${pts.map(([x, y]) => `${f2(x)},${f2(y)}`).join(' ')}" fill="${fill}"${extra}/>`;

/** Ids are prefixed with the asset slug so several kit SVGs can be inlined in one page. */
function svgDoc({ w, h, slug, title, desc, body }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="${slug}-t ${slug}-d">
  <title id="${slug}-t">${esc(title)}</title>
  <desc id="${slug}-d">${esc(desc)}</desc>
  ${body}
</svg>
`;
}

/** Planes first, lines over them (Andrzejewski: a rectangle stays unitary beneath crossing lines). */
function composition(layout, box, { ground = ROLES.white, ink = ROLES.black, planes = true, lines = true, lineScale = 1 } = {}) {
  const X = (u) => box.x + u * box.w;
  const Y = (v) => box.y + v * box.h;
  const unit = layout.thickness * Math.min(box.w, box.h) * lineScale;
  const parts = [];
  if (ground !== 'none') parts.push(rect(box.x, box.y, box.w, box.h, ground));
  if (planes) {
    for (const p of layout.planes) parts.push(rect(X(p.x0), Y(p.y0), X(p.x1) - X(p.x0), Y(p.y1) - Y(p.y0), ROLES[p.role]));
  }
  if (lines) {
    for (const l of layout.lines) {
      const t = unit * l.weight;
      parts.push(
        l.orient === 'v'
          ? rect(X(l.at) - t / 2, Y(l.from), t, Y(l.to) - Y(l.from), ink)
          : rect(X(l.from), Y(l.at) - t / 2, X(l.to) - X(l.from), t, ink),
      );
    }
  }
  const metrics = {
    minGapPx: Math.min(minGap(layout.xs) * box.w, minGap(layout.ys) * box.h),
    maxLinePx: unit * Math.max(...layout.lines.map((l) => l.weight)),
  };
  return { markup: parts.join(''), metrics };
}

function heroSvg(layout, d, slug) {
  const [w, h] = [1600, 900];
  const panel = { x: Math.round(w * 0.475), y: 0, w: w - Math.round(w * 0.475), h };
  const { markup, metrics } = composition(layout, panel);
  return {
    svg: svgDoc({
      w,
      h,
      slug,
      title: `Neoplastic hero background — ${d.key}`,
      desc: 'Dark field with a title-safe left void; a white neoplastic canvas bleeds off the right edge.',
      body: rect(0, 0, w, h, FIELD) + markup,
    }),
    checks: { layout, metrics, safeMinX: panel.x, contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }] },
  };
}

function figureSvg(layout, d, slug) {
  const s = 900;
  const { markup, metrics } = composition(layout, { x: 0, y: 0, w: s, h: s });
  return {
    svg: svgDoc({
      w: s,
      h: s,
      slug,
      title: `Neoplastic composition — ${d.key}`,
      desc: 'Black lines over red, yellow, blue and gray planes on a white ground.',
      body: markup + rect(0.5, 0.5, s - 1, s - 1, 'none', ` stroke="${ROLES.canvasEdge}" stroke-width="1"`),
    }),
    checks: { layout, metrics, contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }] },
  };
}

function silhouetteSvg(layout, d, slug) {
  const s = 900;
  const { markup, metrics } = composition(layout, { x: 0, y: 0, w: s, h: s }, { ground: 'none', planes: false, ink: '#000000' });
  return {
    svg: svgDoc({ w: s, h: s, slug, title: `Armature silhouette — ${d.key}`, desc: 'Black armature on a transparent ground.', body: markup }),
    checks: { layout, metrics },
  };
}

function washSvg(layout, d, slug) {
  const [w, h] = [1200, 800];
  const body = layout.planes
    .map((p, i) => rect(p.x0 * w, p.y0 * h, (p.x1 - p.x0) * w, (p.y1 - p.y0) * h, ROLES[p.role], ` opacity="${(0.14 + (i % 4) * 0.07).toFixed(2)}"`))
    .join('');
  return {
    svg: svgDoc({ w, h, slug, title: `Wash fill — ${d.key}`, desc: 'Translucent, non-overlapping primary planes for overlays.', body }),
    checks: { layout },
  };
}

function isometricSvg(layout, d, slug) {
  const [w, h] = [1200, 900];
  const cos = Math.cos(Math.PI / 6);
  const maxElev = 0.12;
  const s = Math.min((w * 0.84) / (2 * cos), (h * 0.84) / (1 + maxElev));
  const top = (h - s * (1 + maxElev)) / 2 + s * maxElev;
  const P = (u, v, e = 0) => [w / 2 + (u - v) * cos * s, top + (u + v) * 0.5 * s - e * s];
  const quad = (u0, v0, u1, v1, e = 0) => [P(u0, v0, e), P(u1, v0, e), P(u1, v1, e), P(u0, v1, e)];
  const edge = ` stroke="${ROLES.black}" stroke-width="1" stroke-linejoin="round"`;
  const floor = polygon(quad(0, 0, 1, 1), ROLES.white, ` stroke="${ROLES.canvasEdge}" stroke-width="1.5"`);
  const half = (l) => (layout.thickness * l.weight) / 2;
  const armature = layout.lines
    .map((l) => (l.orient === 'v' ? quad(l.at - half(l), l.from, l.at + half(l), l.to) : quad(l.from, l.at - half(l), l.to, l.at + half(l))))
    .map((pts) => polygon(pts, ROLES.black))
    .join('');
  const inset = layout.thickness * 0.75;
  // Painter's order: blocks nearer the viewer (larger u+v) are drawn last.
  const blocks = layout.planes
    .map((p, i) => ({ ...p, e: 0.035 + (i % 3) * 0.03 + d.lines * 0.004 }))
    .sort((a, b) => a.x0 + a.x1 + a.y0 + a.y1 - (b.x0 + b.x1 + b.y0 + b.y1))
    .map(({ x0, y0, x1, y1, role, e }) => {
      const [u0, v0, u1, v1] = [x0 + inset, y0 + inset, x1 - inset, y1 - inset];
      const fill = ROLES[role];
      return [
        polygon([P(u1, v0), P(u1, v1), P(u1, v1, e), P(u1, v0, e)], shade(fill, 0.72), edge),
        polygon([P(u0, v1), P(u1, v1), P(u1, v1, e), P(u0, v1, e)], shade(fill, 0.55), edge),
        polygon(quad(u0, v0, u1, v1, e), fill, edge),
      ].join('');
    })
    .join('');
  return {
    svg: svgDoc({
      w,
      h,
      slug,
      title: `Isometric study — ${d.key}`,
      desc: 'Isometric projection: black armature on a white floor; planes extruded as blocks.',
      body: rect(0, 0, w, h, ROLES.isoField) + floor + armature + blocks,
    }),
    checks: { layout, contrast: [{ label: 'armature/floor', ink: ROLES.black, ground: ROLES.white, min: 3 }] },
  };
}

/** Full-span lines and interior squares only, so the tile repeats without seams by construction. */
function textureSvg(layout, d, slug) {
  const s = 512;
  const t = layout.thickness * s * 0.6;
  const grid = [
    ...layout.xs.slice(1, -1).map((x) => rect(x * s - t / 2, 0, t, s, ROLES.lineOnDark)),
    ...layout.ys.slice(1, -1).map((y) => rect(0, y * s - t / 2, s, t, ROLES.lineOnDark)),
  ].join('');
  const k = 5 + d.lines;
  const squares = layout.xs
    .slice(1, -1)
    .flatMap((x, i) =>
      layout.ys
        .slice(1, -1)
        .filter((_, j) => (i + 2 * j) % 3 === 0)
        .map((y, j) => rect(x * s - k / 2, y * s - k / 2, k, k, ROLES[['red', 'yellow', 'blue'][(i + j) % 3]], ' opacity="0.6"')),
    )
    .join('');
  return {
    svg: svgDoc({ w: s, h: s, slug, title: `Tile texture — ${d.key}`, desc: 'Seamless neoplastic tile: full-span armature with primary points at crossings.', body: rect(0, 0, s, s, FIELD) + grid + squares }),
    checks: { layout, contrast: [{ label: 'line/field (decorative)', ink: ROLES.lineOnDark, ground: FIELD, min: 1.4 }] },
  };
}

function logoSvg(layout, d, slug) {
  const [w, h] = [640, 180];
  const { markup, metrics } = composition(layout, { x: 0, y: 0, w, h });
  return {
    svg: svgDoc({
      w,
      h,
      slug,
      title: `Wordmark panel — ${d.key}`,
      desc: 'Neoplastic panel beside the wordmark; white ground keeps it legible on dark and light pages.',
      body: markup + rect(1, 1, w - 2, h - 2, 'none', ` stroke="${ROLES.black}" stroke-width="2"`),
    }),
    checks: { layout, metrics, contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }] },
  };
}

/** Fractalizer × neoplastic: outer armature + nested Mondrian cells (constructivist macro-form). */
function renderMacro(tree, box, { lineScale = 1, slug = 'macro' } = {}) {
  const parts = [];
  const root = composition(tree.root, box, { lineScale });
  parts.push(root.markup);
  const clips = [];
  tree.nests.forEach((nest, i) => {
    const sub = {
      x: box.x + nest.box.x0 * box.w,
      y: box.y + nest.box.y0 * box.h,
      w: (nest.box.x1 - nest.box.x0) * box.w,
      h: (nest.box.y1 - nest.box.y0) * box.h,
    };
    const pad = Math.min(sub.w, sub.h) * 0.04;
    const inner = { x: sub.x + pad, y: sub.y + pad, w: sub.w - 2 * pad, h: sub.h - 2 * pad };
    const clipId = `${slug}-nest-${i}`;
    clips.push(`<clipPath id="${clipId}">${rect(inner.x, inner.y, inner.w, inner.h, '#fff')}</clipPath>`);
    const child = composition(nest.layout, inner, { lineScale: lineScale * (nest.depth === 2 ? 0.75 : 0.9) });
    parts.push(`<g clip-path="url(#${clipId})">${child.markup}</g>`);
  });
  // Line-gap gate uses the outer armature only; nested cells intentionally run thinner.
  return {
    markup: (clips.length ? `<defs>${clips.join('')}</defs>` : '') + parts.join(''),
    metrics: root.metrics,
    layouts: [tree.root, ...tree.nests.map((n) => n.layout)],
  };
}

function macroFigureSvg(tree, d, slug) {
  const s = 900;
  const { markup, metrics, layouts } = renderMacro(tree, { x: 0, y: 0, w: s, h: s }, { slug });
  return {
    svg: svgDoc({
      w: s,
      h: s,
      slug,
      title: `Neoplastic macro composition — ${d.key}`,
      desc: 'Recursive orthogonal Mondrian cells (fractalizer on neoplastic grammar) — not a tree study.',
      body: markup + rect(0.5, 0.5, s - 1, s - 1, 'none', ` stroke="${ROLES.canvasEdge}" stroke-width="1"`),
    }),
    checks: {
      layout: tree.root,
      layouts,
      metrics,
      contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }],
    },
  };
}

function macroHeroSvg(tree, d, slug) {
  const [w, h] = [1600, 900];
  const panel = { x: Math.round(w * 0.475), y: 0, w: w - Math.round(w * 0.475), h };
  const { markup, metrics, layouts } = renderMacro(tree, panel, { lineScale: 0.95, slug });
  return {
    svg: svgDoc({
      w,
      h,
      slug,
      title: `Neoplastic macro hero — ${d.key}`,
      desc: 'Dark field, title-safe void; recursive neoplastic canvas on the right (product identity, not tree prologue).',
      body: rect(0, 0, w, h, FIELD) + markup,
    }),
    checks: {
      layout: tree.root,
      layouts,
      metrics,
      safeMinX: panel.x,
      contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }],
    },
  };
}

/** Left edge of the tree after renderTreeAtmosphereSvg's transform (mirrors its cx/cy/scale) + glow margin. */
function treeMinX({ w, h, rotate, phase }) {
  const [cx, cy, sc, r] = [w * 0.8, h * 0.522, 1.85 + phase * 0.25, (rotate * Math.PI) / 180];
  let min = Infinity;
  for (const [x0, y0, x1, y1] of walkTree()) {
    for (const [x, y] of [[x0, y0], [x1, y1]]) {
      const [px, py] = toCanvas(x, y, w, h);
      min = Math.min(min, cx + (px - cx) * sc * Math.cos(r) - (py - cy) * sc * Math.sin(r));
    }
  }
  return min - 16;
}

function treeSvg(d, slug) {
  const [w, h] = [1600, 900];
  const svg = renderTreeAtmosphereSvg({ w, h, family: `kit-${d.key}`, ...d.tree, veils: true })
    .replace('aria-labelledby="title desc"', `aria-labelledby="${slug}-t ${slug}-d"`)
    .replace('id="title"', `id="${slug}-t"`)
    .replace('id="desc"', `id="${slug}-d"`);
  return {
    svg,
    checks: {
      safeMinX: treeMinX({ w, h, ...d.tree }),
      contrast: [{ label: 'branch/field', ink: PALETTE.primary, ground: FIELD, min: 3 }],
    },
  };
}

/** Q-FA1 branching fitted to its own bounding box (qfa1 reused the 1600×900 crop and shrank it to a sliver). */
function treeFaviconSvg(slug, iterations = 4) {
  const size = 64;
  const margin = 7;
  const segs = walkTree({ iterations });
  const xsAll = segs.flatMap(([x0, , x1]) => [x0, x1]);
  const ysAll = segs.flatMap(([, y0, , y1]) => [y0, y1]);
  const [minX, maxX, minY, maxY] = [Math.min(...xsAll), Math.max(...xsAll), Math.min(...ysAll), Math.max(...ysAll)];
  const k = (size - 2 * margin) / Math.max(maxX - minX, maxY - minY);
  const ox = (size - (maxX - minX) * k) / 2;
  const toPx = (x, y) => [ox + (x - minX) * k, size - margin - (y - minY) * k];
  const lines = segs
    .map(([x0, y0, x1, y1, depth]) => {
      const [a, b] = [toPx(x0, y0), toPx(x1, y1)];
      const tier = depth / iterations;
      const color = tier > 0.66 ? PALETTE.primary : tier > 0.33 ? PALETTE.accent : PALETTE.tertiary;
      return `<line x1="${f2(a[0])}" y1="${f2(a[1])}" x2="${f2(b[0])}" y2="${f2(b[1])}" stroke="${color}" stroke-width="${(0.9 + tier * 2.6).toFixed(2)}" stroke-linecap="round"/>`;
    })
    .join('');
  return {
    svg: svgDoc({
      w: size,
      h: size,
      slug,
      title: 'Mondrian tree mark',
      desc: `Q-FA1 branching favicon (geometry_only, depth ${iterations} for legibility at 16–64 px).`,
      body: `<rect width="${size}" height="${size}" rx="10" fill="${FIELD}"/>${lines}`,
    }),
    checks: { contrast: [{ label: 'trunk/field', ink: PALETTE.primary, ground: FIELD, min: 3 }] },
    treeOverrides: { iterations },
  };
}

function faviconSvg(variant, slug) {
  const size = 64;
  if (variant === 'mark-grid') {
    return {
      svg: svgDoc({
        w: size,
        h: size,
        slug,
        title: 'Mondrian mark',
        desc: 'Minimal neoplastic favicon.',
        body: `<rect x="4" y="4" width="56" height="56" fill="${ROLES.white}"/>
  <rect x="4" y="4" width="22" height="22" fill="${ROLES.red}"/>
  <rect x="38" y="4" width="22" height="14" fill="${ROLES.blue}"/>
  <rect x="4" y="38" width="14" height="22" fill="${ROLES.yellow}"/>
  <rect x="26" y="4" width="6" height="56" fill="${ROLES.black}"/>
  <rect x="4" y="26" width="56" height="6" fill="${ROLES.black}"/>
  <rect x="4" y="42" width="56" height="4" fill="${ROLES.black}"/>`,
      }),
      checks: { contrast: [{ label: 'armature/canvas', ink: ROLES.black, ground: ROLES.white, min: 3 }] },
    };
  }
  if (variant === 'mark-silhouette') {
    return {
      svg: svgDoc({
        w: size,
        h: size,
        slug,
        title: 'Mondrian silhouette mark',
        desc: 'Black grid favicon on transparent.',
        body: `<rect x="28" y="6" width="8" height="52" fill="#000"/>
  <rect x="6" y="28" width="52" height="8" fill="#000"/>
  <rect x="6" y="14" width="52" height="5" fill="#000"/>
  <rect x="14" y="6" width="5" height="52" fill="#000"/>`,
      }),
      checks: {},
    };
  }
  return treeFaviconSvg(slug);
}

// ── Job matrix: the qfa1 41 roles, one layout per density shared across grammars ──

const JOBS = [];
const LAYOUTS = new Map();
const MACROS = new Map();
const layoutFor = (d, seed) => {
  if (!LAYOUTS.has(seed)) LAYOUTS.set(seed, gridLayout(d, seed));
  return LAYOUTS.get(seed);
};
const macroFor = (d, seed) => {
  if (!MACROS.has(seed)) MACROS.set(seed, macroTree(d, seed, d.key === 'minimal' || d.key === 'sparse' ? 1 : 2));
  return MACROS.get(seed);
};

for (const d of DENSITIES) {
  const seed = `mondrian-kit:neo:${d.key}:v2`;
  const layout = layoutFor(d, seed);
  const job = (category, grammar, role, w, h, theme, build) =>
    JOBS.push({ category, grammar, density: d.key, role, w, h, theme, seed, build: (slug) => build(layout, d, slug) });
  job('backgrounds', 'neoplastic_grid', 'hero-bg', 1600, 900, 'dark', heroSvg);
  job('figures', 'neoplastic_grid', 'composition-figure', 900, 900, 'light', figureSvg);
  job('fillings', 'wash_fill', 'transparent-wash', 1200, 800, 'transparent', washSvg);
  job('silhouettes', 'silhouette', 'armature-mask', 900, 900, 'transparent', silhouetteSvg);
  job('figures', 'isometric', 'isometric-study', 1200, 900, 'light', isometricSvg);
  job('textures', 'neoplastic_grid', 'tile-texture', 512, 512, 'dark', textureSvg);
  // Recursive neoplastic macro (fractalizer on product grammar) — preferred complex identity.
  const macroSeed = `mondrian-kit:macro:${d.key}:v1`;
  const macro = macroFor(d, macroSeed);
  JOBS.push({
    category: 'figures',
    grammar: 'neoplastic_macro',
    density: d.key,
    role: 'macro-composition',
    w: 900,
    h: 900,
    theme: 'light',
    seed: macroSeed,
    build: (slug) => macroFigureSvg(macro, d, slug),
  });
  JOBS.push({
    category: 'backgrounds',
    grammar: 'neoplastic_macro',
    density: d.key,
    role: 'macro-hero-bg',
    w: 1600,
    h: 900,
    theme: 'dark',
    seed: macroSeed,
    build: (slug) => macroHeroSvg(macro, d, slug),
  });
  // Trees: prologue only (what the matrix refuses). Keep for archive; product chrome prefers neo/macro.
  JOBS.push({
    category: 'backgrounds',
    grammar: 'tree_branch',
    density: d.key,
    role: 'prologue-bg',
    w: 1600,
    h: 900,
    theme: 'dark',
    seed: `mondrian-tree:kit:${d.key}`,
    build: (slug) => treeSvg(d, slug),
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
    theme: variant === 'mark-silhouette' ? 'transparent' : variant === 'mark-tree' ? 'dark' : 'light',
    seed: null,
    pngSizes: [16, 32, 180],
    build: (slug) => faviconSvg(variant, slug),
  });
}

for (const d of [DENSITIES[0], DENSITIES[2], DENSITIES[4]]) {
  const seed = `mondrian-kit:logo:${d.key}:v2`;
  const layout = layoutFor(d, seed);
  JOBS.push({ category: 'logo', grammar: 'neoplastic_grid', density: d.key, role: 'wordmark-panel', w: 640, h: 180, theme: 'light', seed, build: (slug) => logoSvg(layout, d, slug) });
}

// ── Gates: every asset must pass before anything is written ──────────────────

function gate(item) {
  const { svg, checks, slug, w, category } = item;
  const applied = [];
  const fails = [];
  const test = (name, ok, detail = '') => {
    applied.push(name);
    if (!ok) fails.push(detail ? `${name}: ${detail}` : name);
  };
  test('finite', !/NaN|Infinity/.test(svg));
  const ids = [...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  test('unique-ids', new Set(ids).size === ids.length && ids.includes(`${slug}-t`), ids.join(','));
  if (checks.safeMinX !== undefined) {
    test('title-safe', checks.safeMinX >= TITLE_SAFE * w, `${checks.safeMinX.toFixed(0)}px < ${(TITLE_SAFE * w).toFixed(0)}px`);
  }
  for (const c of checks.contrast ?? []) {
    const r = contrast(c.ink, c.ground);
    test(`contrast(${c.label})≥${c.min}`, r >= c.min, r.toFixed(2));
  }
  if (checks.metrics) {
    const { minGapPx, maxLinePx } = checks.metrics;
    test('line-gap≥2×line', minGapPx >= 2 * maxLinePx, `${minGapPx.toFixed(1)}px vs ${maxLinePx.toFixed(1)}px`);
  }
  if (checks.layout) test('planes-disjoint', planesDisjoint(checks.layout.planes));
  for (const lay of checks.layouts ?? (checks.layout ? [checks.layout] : [])) {
    test('planes-disjoint', planesDisjoint(lay.planes));
    const ch = colourHarmony(lay);
    if (lay.planes.length >= 3) {
      test('colour-primaries', ch.hasRed && ch.hasYellow && ch.hasBlue, JSON.stringify(ch));
    }
    test('colour-gray≤40%', ch.grayShare <= 0.4 + 1e-9, ch.grayShare.toFixed(3));
    // Leave white ground dominant; denser / macro ladders may paint more cells.
    const fillCap =
      item.grammar === 'neoplastic_macro' || item.density === 'baroque' || item.density === 'dense' ? 0.72 : 0.58;
    test(`colour-fill≤${Math.round(fillCap * 100)}%`, ch.colouredShare <= fillCap + 1e-9, ch.colouredShare.toFixed(3));
  }
  const budget = category === 'favicon' ? 16_384 : 196_608;
  test('size-budget', Buffer.byteLength(svg) <= budget, `${Buffer.byteLength(svg)} B > ${budget} B`);
  return { applied, fails };
}

// ── Release ───────────────────────────────────────────────────────────────────

function rsvgVersion() {
  const r = spawnSync('rsvg-convert', ['--version'], { encoding: 'utf8' });
  return r.status === 0 ? (r.stdout || r.stderr).trim().split('\n')[0] : null;
}

function rasterise(svgPath, pngPath, w, h) {
  if (existsSync(pngPath)) return;
  const r = spawnSync('rsvg-convert', ['-w', String(w), '-h', String(h), '-o', pngPath, svgPath], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`PNG fail ${svgPath}: ${r.stderr || r.stdout}`);
}

/** Per-role delta against the current qfa1 release (keys are category/role/density). */
function deltaAgainstTwin(rows) {
  const pointer = join(ASSETS, `${TWIN}-current.json`);
  if (!existsSync(pointer)) return null;
  const twinPath = readJson(pointer).path;
  const twinIndex = join(ASSETS, twinPath, 'index.json');
  if (!existsSync(twinIndex)) return null;
  const key = (r) => `${r.category}/${r.role}/${r.density}`;
  const before = new Map(readJson(twinIndex).assets.map((r) => [key(r), r.sha256_svg]));
  const after = new Map(rows.map((r) => [key(r), r.sha256_svg]));
  const changed = [...after.keys()].filter((k) => before.has(k) && before.get(k) !== after.get(k));
  const identical = [...after.keys()].filter((k) => before.get(k) === after.get(k));
  const added = [...after.keys()].filter((k) => !before.has(k));
  const removed = [...before.keys()].filter((k) => !after.has(k));
  return { twin: twinPath, identical, changed, added, removed };
}

function check() {
  const pointer = join(ASSETS, `${KIT}-current.json`);
  if (!existsSync(pointer)) {
    console.error(`no ${KIT}-current.json — run the generator first`);
    return 1;
  }
  const dir = join(ASSETS, readJson(pointer).path);
  const index = readJson(join(dir, 'index.json'));
  let drift = 0;
  for (const a of index.assets) {
    for (const [file, hash] of [[a.filename_svg, a.sha256_svg], ...a.png.map((p) => [p.file, p.sha256])]) {
      const path = join(dir, a.category, file);
      if (!existsSync(path) || sha256(readFileSync(path)) !== hash) {
        drift += 1;
        console.error(`drift ${a.category}/${file}`);
      }
    }
  }
  console.log(JSON.stringify({ release_id: index.current_release_id, assets: index.assets.length, drift }, null, 2));
  return drift ? 1 : 0;
}

/** `links` are relative to wherever the markdown lands (assets/ index vs release README). */
function renderMarkdown({ releaseId, createdAt, libraries, rows, delta, links }) {
  const byCat = Object.groupBy(rows, (r) => r.category);
  let md = `# Mondrian Project — visual asset kit (qfa2)

- **Release:** \`${releaseId}\`
- **Created:** ${createdAt}
- **Skills:** ${SKILL_VISUAL} × ${SKILL_FRACTAL} (\`${MODE_DOC}\`)
- **Tree module:** \`${MODULE}@${MODULE_VERSION}\` · adapter \`${ADAPTER}\`
- **Delivery:** \`assets/${KIT}/release-${releaseId}/\` · [\`preview.html\`](${links.preview})
- **Pointer:** [\`${KIT}-current.json\`](${links.pointer})
- **Rationale:** [\`scripts/generate-mondrian-asset-kit-qfa2.RATIONALE.md\`](${links.rationale})

## Libraries / versions

| Layer | Id | Version |
| --- | --- | --- |
| fractal-architect | skill | 1.3.0 |
| visual-forger | skill | 1.3.0 |
| mondrian-tree-mode | reference | geometry_only |
| ${MODULE} | module | ${MODULE_VERSION} |
| ${ADAPTER} | adapter | θ=${GEOMETRY.angle_deg}° · R=${GEOMETRY.scale_r} · depth=${GEOMETRY.iterations} |
| ${GENERATOR} | kit generator | ${GENERATOR_VERSION} |
| node | runtime | ${libraries.runtime.node} |
| rsvg-convert | rasteriser | ${libraries.runtime['rsvg-convert'] ?? 'not run (--no-png)'} |

## Pedagogical boundary

| Family | Use | Do not use as |
| --- | --- | --- |
| Neoplastic grid / wash / silhouette / isometric | Product identity, figures, fills | “Authentic Mondrian” or ML score |
| Neoplastic macro (fractalizer × orthogonal) | Complex constructivist chrome / density ladder | Tree branching or authenticity |
| Tree branch (Q-FA1) | Prologue only (what the matrix refuses) | Product schema, favicon default, or student corpus |

## Gates (all assets passed before writing)

finite numbers · slug-namespaced unique ids · title-safe void (x ≥ ${TITLE_SAFE * 100}% on backgrounds) ·
contrast (armature ≥ 3:1, decorative texture ≥ 1.4:1) · line gap ≥ 2× line weight · disjoint planes · SVG size budget

## Citations (public)

- ${ANDRZEJEWSKI.chicago}
- ${CITATION.chicago}

## Naming

\`mp-<category>-<grammar>-<density>-<role>-<hash12>.(svg|png)\` · favicon extras \`…-<size>px.png\`
`;
  if (delta) {
    md += `
## Delta vs \`${delta.twin}\`

| Identical | Changed | Added | Removed |
| --- | --- | --- | --- |
| ${delta.identical.length} | ${delta.changed.length} | ${delta.added.length} | ${delta.removed.length} |
`;
    if (delta.identical.length) md += `\nIdentical: ${delta.identical.map((k) => `\`${k}\``).join(', ')}\n`;
  }
  md += `\n## Inventory (${rows.length} assets)\n`;
  for (const [cat, list] of Object.entries(byCat).sort()) {
    md += `\n### ${cat} (${list.length})\n\n| File | Density | Role | Theme | Grammar | Provenance |\n| --- | --- | --- | --- | --- | --- |\n`;
    for (const r of list) md += `| \`${r.filename_svg}\` | ${r.density} | ${r.role} | ${r.theme} | ${r.grammar} | ${r.provenance} |\n`;
  }
  md += `\n## Regenerate / verify\n\n\`\`\`bash\nnode frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit-qfa2.mjs\nnode frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit-qfa2.mjs --check\n\`\`\`\n`;
  return md;
}

function renderPreview(releaseId, rows) {
  const figures = rows
    .map(
      (r) => `<figure class="${r.theme}"><img src="${r.category}/${r.filename_svg}" alt="" loading="lazy"><figcaption><b>${esc(r.category)}/${esc(r.role)}</b> · ${esc(r.density)}<br>${esc(r.grammar)} · ${esc(r.size)}</figcaption></figure>`,
    )
    .join('\n');
  return `<!doctype html>
<html lang="en">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mondrian kit qfa2 · ${releaseId}</title>
<style>
  body { margin: 0; padding: 24px; font: 13px/1.4 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
  main { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
  figure { margin: 0; background: #fff; border: 1px solid #cbd5e1; }
  img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: contain;
        background: repeating-conic-gradient(#e2e8f0 0 25%, #fff 0 50%) 0 0 / 16px 16px; }
  .dark img { background: ${FIELD}; }
  figcaption { padding: 8px; }
</style>
<h1>Mondrian kit qfa2 · <code>${releaseId}</code></h1>
<p>Transparent assets sit on a checkerboard; dark assets on the UDIT field. Study figures — not painting facsimiles.</p>
<main>
${figures}
</main>
</html>
`;
}

function main() {
  const args = new Set(process.argv.slice(2));
  if (args.has('--help')) {
    console.log('usage: generate-mondrian-asset-kit-qfa2.mjs [--dry-run] [--no-png] [--check]');
    return 0;
  }
  if (args.has('--check')) return check();
  const dryRun = args.has('--dry-run');
  const withPng = !args.has('--no-png');
  const rsvg = withPng ? rsvgVersion() : null;
  if (withPng && !rsvg && !dryRun) throw new Error('rsvg-convert not found — install librsvg or pass --no-png');

  const built = JOBS.map((job) => {
    const slug = `mp-${job.category}-${job.grammar.replace(/_/g, '-')}-${job.density}-${job.role}`;
    const provenance = PROVENANCE[job.grammar];
    if (!provenance) throw new Error(`no provenance for grammar ${job.grammar}`);
    const { svg, checks, treeOverrides = null } = job.build(slug);
    const hash = sha256(svg);
    const stem = `${slug}-${hash.slice(0, 12)}`;
    return { ...job, slug, svg, checks, treeOverrides, hash, stem, file: `${stem}.svg`, provenance, gate: null };
  });

  const slugs = built.map((b) => b.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error('duplicate job slugs');
  for (const item of built) item.gate = gate(item);
  const failed = built.filter((b) => b.gate.fails.length);
  if (failed.length) {
    for (const b of failed) console.error(`✗ ${b.slug}\n    ${b.gate.fails.join('\n    ')}`);
    console.error(`${failed.length}/${built.length} assets failed gates — nothing written`);
    return 1;
  }

  const releaseId = sha256(JSON.stringify(built.map((b) => [b.slug, b.hash]))).slice(0, 16);
  const releaseDir = join(ORIGINALS, `release-${releaseId}`);
  const deliveryDir = join(KIT_ROOT, `release-${releaseId}`);
  const deliveryRel = `${KIT}/release-${releaseId}`;

  if (existsSync(join(deliveryDir, 'index.json'))) {
    const index = readJson(join(deliveryDir, 'index.json'));
    for (const item of built) {
      const path = join(deliveryDir, item.category, item.file);
      if (!existsSync(path) || sha256(readFileSync(path)) !== item.hash) throw new Error(`existing release drifted at ${path}`);
    }
    if (!dryRun) {
      writeJson(join(ASSETS, `${KIT}-current.json`), { current_release_id: releaseId, path: deliveryRel, created_at: index.created_at, count: index.count, libraries: index.libraries });
    }
    console.log(JSON.stringify({ release_id: releaseId, status: 'unchanged (verified)', assets: built.length }, null, 2));
    return 0;
  }

  const epoch = process.env.SOURCE_DATE_EPOCH;
  const createdAt = (epoch ? new Date(Number(epoch) * 1000) : new Date()).toISOString();
  const libraries = {
    skills: {
      'fractal-architect': '1.3.0',
      'visual-forger': '1.3.0',
      mode: MODE_DOC,
      neoplastic_macro: MACRO_MODE,
      queue_ids: ['Q-FA1', 'Q-FA2', 'Q-FA3', 'Q-FA4'],
    },
    modules: { [MODULE]: MODULE_VERSION, adapter: ADAPTER, formula: formulaRecord() },
    generators: { kit: `${GENERATOR}@${GENERATOR_VERSION}`, twin_of: 'mondrian-asset-kit-qfa1@1.0.0' },
    runtime: { node: process.version, 'rsvg-convert': rsvg },
  };

  const rows = built.map((item) => {
    const usesTree = item.grammar === 'tree_branch';
    const usesMacro = item.grammar === 'neoplastic_macro';
    const sizes = withPng ? [item.w, ...(item.pngSizes ?? [])] : [];
    return {
      key: `${item.category}/${item.role}/${item.density}`,
      filename_svg: item.file,
      png: sizes.map((s, i) => (i === 0 ? { file: `${item.stem}.png`, w: item.w, h: item.h } : { file: `${item.stem}-${s}px.png`, w: s, h: s })),
      category: item.category,
      role: item.role,
      grammar: item.provenance.grammar,
      density: item.density,
      theme: item.theme,
      size: `${item.w}×${item.h}`,
      seed: item.seed,
      sha256_svg: item.hash,
      provenance: item.provenance.cite.inline,
      disposition: item.provenance.disposition,
      note: item.provenance.note,
      tree_adapter: usesTree ? ADAPTER : null,
      tree_overrides: item.treeOverrides,
      macro_mode: usesMacro ? MACRO_MODE : null,
      skills: usesTree
        ? [SKILL_VISUAL, SKILL_FRACTAL, MODE_DOC]
        : usesMacro
          ? [SKILL_VISUAL, SKILL_FRACTAL, MACRO_MODE]
          : [SKILL_VISUAL],
      gates: item.gate.applied,
      generator: `${GENERATOR}@${GENERATOR_VERSION}`,
      path_delivery: `assets/${deliveryRel}/${item.category}/${item.file}`,
    };
  });
  const delta = deltaAgainstTwin(rows);
  libraries.generators.compare_to_release = delta?.twin ?? null;

  if (dryRun) {
    console.log(JSON.stringify({ release_id: releaseId, assets: rows.length, gates: 'pass', delta: delta && { identical: delta.identical.length, changed: delta.changed.length, added: delta.added.length, removed: delta.removed.length } }, null, 2));
    return 0;
  }

  for (const [i, item] of built.entries()) {
    const catOrig = join(releaseDir, item.category);
    const catDel = join(deliveryDir, item.category);
    mkdirSync(catOrig, { recursive: true });
    mkdirSync(catDel, { recursive: true });
    const origSvg = join(catOrig, item.file);
    writeImmutable(origSvg, item.svg);
    copyImmutable(origSvg, join(catDel, item.file));
    for (const png of rows[i].png) {
      const origPng = join(catOrig, png.file);
      rasterise(origSvg, origPng, png.w, png.h);
      copyImmutable(origPng, join(catDel, png.file));
      png.sha256 = sha256(readFileSync(origPng));
    }
  }

  const layouts = Object.fromEntries([...LAYOUTS].map(([seed, l]) => [seed, { primary_axis: l.primary, xs: l.xs, ys: l.ys, thickness: round3(l.thickness), lines: l.lines, planes: l.planes }]));
  const macros = Object.fromEntries(
    [...MACROS].map(([seed, m]) => [
      seed,
      {
        mode: MACRO_MODE,
        root: { xs: m.root.xs, ys: m.root.ys, lines: m.root.lines, planes: m.root.planes },
        nests: m.nests.map((n) => ({ box: n.box, depth: n.depth, xs: n.layout.xs, ys: n.layout.ys, lines: n.layout.lines, planes: n.layout.planes })),
      },
    ]),
  );
  writeJson(join(deliveryDir, 'layouts.json'), {
    note: 'Normalized grid points (0/1 = canvas borders), lines with centre + extent + relative weight, rectangles by point pairs — shape after Andrzejewski et al. 2010 §3.2; not validated against work.schema.json. macros = recursive neoplastic nests (fractalizer on product grammar).',
    citation: ANDRZEJEWSKI.chicago,
    layouts,
    macros,
  });
  writeJson(join(deliveryDir, 'figcaption-data.json'), {
    schema_version: '1.1.0',
    kind: 'mondrian-project.asset-kit.qfa2',
    release_id: releaseId,
    created_at: createdAt,
    authorship: { name: 'Ruvebal', email: 'ruvebal@crea-comm.net' },
    libraries,
    collaboration: {
      visual_forger: `${SKILL_VISUAL} — neoplastic grid / wash / silhouette / isometric / logo / colour gates`,
      fractal_architect: `${SKILL_FRACTAL} — ${MODE_DOC} (trees); ${MACRO_MODE} (recursive neoplastic macros)`,
    },
    pedagogical_boundary:
      'Prefer neoplastic + neoplastic-macro for product chrome. Trees = Q-FA1 prologue only (what the matrix refuses). Never authenticity scores or painting facsimiles.',
    citations: { andrzejewski: ANDRZEJEWSKI.chicago, bountis: CITATION.chicago },
    figures: rows.map((row) => ({
      uuid: uuidFromHash(row.sha256_svg),
      title: `${row.category}/${row.role} (${row.density})`,
      description: row.note,
      figcaption: `${row.grammar} · ${row.density}. ${row.provenance}. Study for the Mondrian Project — not a painting facsimile.`,
      fractal_hash256: row.sha256_svg,
      delivery: { svg: row.path_delivery, category: row.category },
    })),
    count: rows.length,
  });
  writeJson(join(deliveryDir, 'index.json'), { current_release_id: releaseId, created_at: createdAt, count: rows.length, libraries, delta, assets: rows });
  writeFileSync(join(deliveryDir, 'preview.html'), renderPreview(releaseId, rows));
  const rationale = 'scripts/generate-mondrian-asset-kit-qfa2.RATIONALE.md';
  const md = { releaseId, createdAt, libraries, rows, delta };
  writeFileSync(join(deliveryDir, 'README.md'), renderMarkdown({ ...md, links: { preview: 'preview.html', pointer: `../../${KIT}-current.json`, rationale: `../../../${rationale}` } }));
  writeFileSync(join(ASSETS, 'INDEX-QFA2.md'), renderMarkdown({ ...md, links: { preview: `${deliveryRel}/preview.html`, pointer: `${KIT}-current.json`, rationale: `../${rationale}` } }));
  writeJson(join(ASSETS, `${KIT}-current.json`), { current_release_id: releaseId, path: deliveryRel, created_at: createdAt, count: rows.length, libraries });

  mkdirSync(RECEIPTS, { recursive: true });
  writeJson(join(RECEIPTS, `${KIT}-${releaseId}.private.json`), {
    kind: 'mondrian-project.asset-kit.qfa2.private',
    release_id: releaseId,
    created_at: createdAt,
    original_release_dir: releaseDir,
    delivery_dir: deliveryDir,
    generator: GENERATOR,
    generator_version: GENERATOR_VERSION,
    libraries,
    jobs: built.length,
  });

  console.log(JSON.stringify({ release_id: releaseId, assets: rows.length, delivery: `assets/${deliveryRel}`, delta: delta && { identical: delta.identical.length, changed: delta.changed.length } }, null, 2));
  return 0;
}

process.exitCode = main();
