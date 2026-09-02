#!/usr/bin/env node
/**
 * visual-forger / pass-track echo — allegorical rubric figures for
 * evaluation/shared/ai-declaration-oral-defence-rubric/
 * Formula: p_c(z)=z²+c · UDIT palette · publication-safe labels only
 */
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const outputDir = resolve('docs/assets/images/evaluation-rubric-allegory');
mkdirSync(outputDir, { recursive: true });

const palette = {
  background: '#0f172a',
  primary: '#3b82f6',
  accent: '#10b981',
  tertiary: '#8b5cf6',
  ink: '#e2e8f0',
  muted: '#94a3b8',
  warn: '#C44536',
};

function mulberry32(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(text) {
  return Number.parseInt(createHash('sha256').update(text).digest('hex').slice(0, 8), 16);
}

function polygonPoints(cx, cy, radius, sides, rotation) {
  return Array.from({ length: sides }, (_, index) => {
    const angle = rotation + (Math.PI * 2 * index) / sides;
    return `${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`;
  }).join(' ');
}

function iterateJulia(x0, y0, cReal, cImag, maxIterations = 58) {
  let x = x0;
  let y = y0;
  let minTrap = Number.POSITIVE_INFINITY;
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const xNext = x * x - y * y + cReal;
    const yNext = 2 * x * y + cImag;
    x = xNext;
    y = yNext;
    minTrap = Math.min(minTrap, Math.abs(Math.hypot(x, y) - 0.72));
    if (x * x + y * y > 16) return { iteration, trap: minTrap };
  }
  return { iteration: maxIterations, trap: minTrap };
}

function fractalField(cReal, cImag, phase, density, seedKey, crop) {
  const random = mulberry32(hashSeed(seedKey));
  const marks = [];
  const cols = 72;
  const rows = 44;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const planeX = -1.78 + (col / (cols - 1)) * 3.56;
      const planeY = -1.2 + (row / (rows - 1)) * 2.4;
      const result = iterateJulia(planeX, planeY, cReal, cImag);
      const boundary = result.iteration > 7 && result.iteration < 56;
      const trapped = result.trap < 0.075;
      if ((!boundary && !trapped) || random() > density * (trapped ? 0.95 : 0.42)) continue;
      const cx = crop.x + (col / (cols - 1)) * crop.w;
      const cy = crop.y + (row / (rows - 1)) * crop.h;
      const sides = 3 + (result.iteration % 4);
      const radius = trapped ? 10 + random() * 14 : 4 + random() * 7;
      const opacity = trapped ? 0.35 + random() * 0.35 : 0.12 + random() * 0.22;
      const color = result.iteration % 3 === 0 ? palette.primary : result.iteration % 3 === 1 ? palette.accent : palette.tertiary;
      marks.push(`<polygon points="${polygonPoints(cx, cy, radius, sides, phase * Math.PI + random() * 0.4)}" fill="none" stroke="${color}" stroke-width="${trapped ? 1.6 : 1}" opacity="${opacity.toFixed(3)}"/>`);
    }
  }
  const echoes = [];
  for (let depth = 0; depth < 6; depth += 1) {
    const radius = crop.w * 0.22 * 0.72 ** depth;
    const cx = crop.x + crop.w * 0.78 - depth * 18;
    const cy = crop.y + crop.h * 0.55 + Math.sin(phase * Math.PI * 2 + depth) * 28;
    echoes.push(`<polygon points="${polygonPoints(cx, cy, radius, 6, phase * Math.PI + depth * 0.19)}" fill="none" stroke="${depth % 2 ? palette.accent : palette.primary}" stroke-width="${Math.max(0.9, 2.8 - depth * 0.28).toFixed(2)}" opacity="${(0.42 - depth * 0.04).toFixed(3)}"/>`);
  }
  return { marks, echoes };
}

function wrapSvg(id, title, desc, body, viewBox = '0 0 1200 640') {
  const seed = hashSeed(id);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1200" height="640" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${title}</title>
  <desc id="${id}-desc">${desc}</desc>
  <defs>
    <radialGradient id="${id}-neb-a" cx="18%" cy="34%" r="62%">
      <stop offset="0" stop-color="${palette.primary}" stop-opacity="0.48"/>
      <stop offset="1" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}-neb-b" cx="82%" cy="68%" r="56%">
      <stop offset="0" stop-color="${palette.accent}" stop-opacity="0.42"/>
      <stop offset="1" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="${id}-neb-c" cx="54%" cy="12%" r="48%">
      <stop offset="0" stop-color="${palette.tertiary}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${id}-nebula" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.01" numOctaves="4" seed="${seed % 997}" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0 0.28  0 0 0 0.9 0" result="cloud"/>
      <feGaussianBlur in="cloud" stdDeviation="11" result="blur"/>
      <feBlend in="SourceGraphic" in2="blur" mode="screen"/>
    </filter>
    <linearGradient id="${id}-veil" x1="0" x2="1"><stop offset="0" stop-color="${palette.background}" stop-opacity="0.08"/><stop offset="0.55" stop-color="${palette.background}" stop-opacity="0.42"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0.78"/></linearGradient>
    <filter id="${id}-glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width="1200" height="640" fill="${palette.background}"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-a)"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-b)"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-c)"/>
  <rect width="1200" height="640" filter="url(#${id}-nebula)" opacity="0.58"/>
  ${body}
</svg>`;
}

const crop = { x: 420, y: 80, w: 720, h: 480 };

const scoresField = fractalField(-0.8, 0.156, 0.27, 1.08, 'rubric-scores', crop);
const scoresBody = `
  <g filter="url(#rubric-scores-glow)">${scoresField.echoes.slice(0, 2).join('')}</g>
  <g>${scoresField.marks.join('')}</g>
  <g>${scoresField.echoes.join('')}</g>
  <g opacity="0.22">${scoresField.marks.filter((_, i) => i % 4 === 0).join('')}</g>
  <rect x="40" y="40" width="1120" height="560" rx="18" fill="url(#rubric-scores-veil)" stroke="${palette.primary}" stroke-opacity="0.25"/>
  <text x="600" y="118" text-anchor="middle" fill="${palette.ink}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="42" font-weight="500">0–10 rubric bands</text>
  <g font-family="ui-sans-serif, system-ui, sans-serif" font-weight="500" text-anchor="middle">
    <text x="200" y="280" fill="${palette.warn}" font-size="56">0–5</text>
    <text x="200" y="330" fill="${palette.muted}" font-size="22">insufficient</text>
    <text x="420" y="280" fill="${palette.tertiary}" font-size="56">5–6</text>
    <text x="420" y="330" fill="${palette.muted}" font-size="22">pass</text>
    <text x="640" y="280" fill="${palette.accent}" font-size="56">7–8</text>
    <text x="640" y="330" fill="${palette.muted}" font-size="22">competent</text>
    <text x="860" y="280" fill="${palette.primary}" font-size="56">9–10</text>
    <text x="860" y="330" fill="${palette.muted}" font-size="22">excellent</text>
  </g>
  <text x="600" y="430" text-anchor="middle" fill="${palette.muted}" font-size="24" font-family="ui-sans-serif, system-ui, sans-serif">Atelier split echoes: 40 · 35 · 25</text>
  <text x="600" y="520" text-anchor="middle" fill="${palette.muted}" font-size="18" font-family="ui-sans-serif, system-ui, sans-serif" font-style="italic">p<tspan baseline-shift="sub" font-size="14">c</tspan>(z)=z²+c — threshold fractalization</text>`;

const humanAiField = fractalField(-0.745, 0.113, 0.13, 0.94, 'rubric-human-ai', crop);
const humanAiBody = `
  <g filter="url(#rubric-human-ai-glow)">${humanAiField.echoes.slice(0, 2).join('')}</g>
  <g>${humanAiField.marks.join('')}</g>
  <g>${humanAiField.echoes.join('')}</g>
  <line x1="600" y1="70" x2="600" y2="570" stroke="${palette.muted}" stroke-width="1.5" stroke-dasharray="10 12" opacity="0.45"/>
  <rect x="60" y="90" width="500" height="460" rx="16" fill="${palette.background}" fill-opacity="0.55" stroke="${palette.accent}" stroke-opacity="0.45"/>
  <rect x="640" y="90" width="500" height="460" rx="16" fill="${palette.background}" fill-opacity="0.55" stroke="${palette.tertiary}" stroke-opacity="0.45"/>
  <text x="310" y="200" text-anchor="middle" fill="${palette.accent}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="72" font-weight="500">human</text>
  <text x="890" y="200" text-anchor="middle" fill="${palette.tertiary}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="72" font-weight="500">AI</text>
  <text x="310" y="290" text-anchor="middle" fill="${palette.ink}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="26" font-weight="500">plan · verify · defend</text>
  <text x="890" y="290" text-anchor="middle" fill="${palette.ink}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="26" font-weight="500">assist · suggest · review</text>
  <text x="600" y="420" text-anchor="middle" fill="${palette.warn}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="28" font-weight="500">accountability lives on the left</text>
  <text x="600" y="520" text-anchor="middle" fill="${palette.muted}" font-size="18" font-family="ui-sans-serif, system-ui, sans-serif" font-style="italic">echo boundary — defer before you prompt</text>`;

const tprField = fractalField(-0.835, -0.2321, 0.89, 1.0, 'rubric-tpr', crop);
const tprBody = `
  <g filter="url(#rubric-tpr-glow)">${tprField.echoes.slice(0, 2).join('')}</g>
  <g>${tprField.marks.join('')}</g>
  <g>${tprField.echoes.join('')}</g>
  <polygon points="600,110 930,520 270,520" fill="none" stroke="${palette.primary}" stroke-width="2.2" opacity="0.55"/>
  <polygon points="600,160 870,480 330,480" fill="none" stroke="${palette.accent}" stroke-width="1.4" opacity="0.35"/>
  <polygon points="600,210 810,440 390,440" fill="none" stroke="${palette.tertiary}" stroke-width="1" opacity="0.25"/>
  <text x="600" y="300" text-anchor="middle" fill="${palette.primary}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="44" font-weight="500">Theory</text>
  <text x="360" y="470" text-anchor="middle" fill="${palette.accent}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="44" font-weight="500">Practice</text>
  <text x="840" y="470" text-anchor="middle" fill="${palette.tertiary}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="44" font-weight="500">Reflection</text>
  <text x="600" y="580" text-anchor="middle" fill="${palette.muted}" font-size="20" font-family="ui-sans-serif, system-ui, sans-serif">nested echoes — same arc as Web Atelier methodology</text>`;

const figures = [
  { name: 'rubric-allegory-scores', title: 'Rubric score bands allegory', desc: 'Fractal echo field with 0-10 rubric bands and Atelier split', body: scoresBody },
  { name: 'rubric-allegory-human-ai', title: 'Human and AI accountability allegory', desc: 'Fractal boundary between human judgment and AI assistance', body: humanAiBody },
  { name: 'rubric-allegory-theory-practice-reflection', title: 'Theory Practice Reflection allegory', desc: 'Nested triangular echoes for methodology pillars', body: tprBody },
];

for (const fig of figures) {
  const svg = wrapSvg(fig.name, fig.title, fig.desc, fig.body);
  const svgPath = join(outputDir, `${fig.name}.svg`);
  writeFileSync(svgPath, svg);
  const pngPath = join(outputDir, `${fig.name}.png`);
  const raster = spawnSync('rsvg-convert', ['-w', '2400', '-h', '1280', '-o', pngPath, svgPath], { encoding: 'utf8' });
  if (raster.status !== 0) {
    console.warn(`PNG skipped for ${fig.name}: ${raster.stderr || raster.stdout}`);
  } else {
    console.log(`Wrote ${pngPath}`);
  }
  console.log(`Wrote ${svgPath}`);
}
