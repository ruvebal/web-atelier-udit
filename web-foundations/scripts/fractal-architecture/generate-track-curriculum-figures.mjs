#!/usr/bin/env node
/**
 * visual-forger — track curriculum figures (FE I / FE II)
 * Background: nebula shader only (no Julia fractal fields) · UDIT palette
 */
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const GENERATOR_VERSION = '1.1.0';
const outputDir = resolve('docs/assets/images/track-curriculum');
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

function hashSeed(text) {
  return Number.parseInt(createHash('sha256').update(text).digest('hex').slice(0, 8), 16);
}

function wrapSvg(id, title, desc, body, viewBox = '0 0 1200 640') {
  const seed = hashSeed(id);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1200" height="640" role="img" aria-labelledby="${id}-title ${id}-desc">
  <title id="${id}-title">${title}</title>
  <desc id="${id}-desc">${desc}</desc>
  <defs>
    <radialGradient id="${id}-neb-a" cx="18%" cy="34%" r="62%"><stop offset="0" stop-color="${palette.primary}" stop-opacity="0.48"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-neb-b" cx="82%" cy="68%" r="56%"><stop offset="0" stop-color="${palette.accent}" stop-opacity="0.42"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-neb-c" cx="54%" cy="12%" r="48%"><stop offset="0" stop-color="${palette.tertiary}" stop-opacity="0.34"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0"/></radialGradient>
    <filter id="${id}-nebula" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.01" numOctaves="4" seed="${seed % 997}" result="noise"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0.14  0 0 0 0 0.1  0 0 0 0 0.28  0 0 0 0.9 0" result="cloud"/>
      <feGaussianBlur in="cloud" stdDeviation="11" result="blur"/>
      <feBlend in="SourceGraphic" in2="blur" mode="screen"/>
    </filter>
    <linearGradient id="${id}-veil" x1="0" x2="1"><stop offset="0" stop-color="${palette.background}" stop-opacity="0.08"/><stop offset="0.55" stop-color="${palette.background}" stop-opacity="0.42"/><stop offset="1" stop-color="${palette.background}" stop-opacity="0.78"/></linearGradient>
    <filter id="${id}-glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <marker id="${id}-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="${palette.accent}"/></marker>
  </defs>
  <rect width="1200" height="640" fill="${palette.background}"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-a)"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-b)"/>
  <rect width="1200" height="640" fill="url(#${id}-neb-c)"/>
  <rect width="1200" height="640" filter="url(#${id}-nebula)" opacity="0.58"/>
  ${body}
</svg>`;
}

function node(x, y, label, sub, color, id) {
  return `
  <g filter="url(#${id}-glow)">
    <rect x="${x - 88}" y="${y - 28}" width="176" height="56" rx="12" fill="${palette.background}" fill-opacity="0.72" stroke="${color}" stroke-opacity="0.65"/>
    <text x="${x}" y="${y - 2}" text-anchor="middle" fill="${palette.ink}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="18" font-weight="500">${label}</text>
    <text x="${x}" y="${y + 18}" text-anchor="middle" fill="${palette.muted}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="13" font-weight="400">${sub}</text>
  </g>`;
}

function arcPath(points) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`).join(' ');
}

const font = 'font-family="ui-sans-serif, system-ui, sans-serif"';

const feiArcBody = `
  <rect x="48" y="72" width="1104" height="220" rx="18" fill="${palette.background}" fill-opacity="0.62" stroke="${palette.primary}" stroke-opacity="0.45"/>
  <rect x="48" y="348" width="1104" height="220" rx="18" fill="${palette.background}" fill-opacity="0.62" stroke="${palette.accent}" stroke-opacity="0.45"/>
  <text x="600" y="108" text-anchor="middle" fill="${palette.primary}" ${font} font-size="28" font-weight="500">Semester 1 · Vanilla</text>
  <text x="600" y="384" text-anchor="middle" fill="${palette.accent}" ${font} font-size="28" font-weight="500">Semester 2 · React</text>
  <path d="${arcPath([[120,170],[280,170],[440,170],[600,170],[760,170],[920,170],[1080,170]])}" fill="none" stroke="${palette.primary}" stroke-width="2" marker-end="url(#fei-annual-arc-arrow)"/>
  <path d="${arcPath([[120,446],[280,446],[440,446],[600,446],[760,446],[920,446],[1080,446]])}" fill="none" stroke="${palette.accent}" stroke-width="2" marker-end="url(#fei-annual-arc-arrow)"/>
  ${node(120, 170, 'Env', 'setup', palette.primary, 'fei-annual-arc')}
  ${node(280, 170, 'HTML', 'CSS', palette.primary, 'fei-annual-arc')}
  ${node(440, 170, 'JS', 'DOM', palette.primary, 'fei-annual-arc')}
  ${node(600, 170, 'Modules', 'lint', palette.primary, 'fei-annual-arc')}
  ${node(760, 170, 'GSAP', 'trends', palette.primary, 'fei-annual-arc')}
  ${node(920, 170, 'Portfolio', 'template', palette.primary, 'fei-annual-arc')}
  ${node(1080, 170, 'SOW', '404', palette.primary, 'fei-annual-arc')}
  ${node(120, 446, 'Philosophy', 'FSM', palette.accent, 'fei-annual-arc')}
  ${node(280, 446, 'React', 'hooks', palette.accent, 'fei-annual-arc')}
  ${node(440, 446, 'State', 'routing', palette.accent, 'fei-annual-arc')}
  ${node(600, 446, 'Backend', 'auth', palette.accent, 'fei-annual-arc')}
  ${node(760, 446, 'SSR', 'i18n', palette.accent, 'fei-annual-arc')}
  ${node(920, 446, 'Capstone', 'aggregator', palette.accent, 'fei-annual-arc')}
  ${node(1080, 446, 'Final', 'defence', palette.accent, 'fei-annual-arc')}
  <path d="M600 292 L600 328" stroke="${palette.tertiary}" stroke-width="2.5" marker-end="url(#fei-annual-arc-arrow)"/>
  <text x="600" y="610" text-anchor="middle" fill="${palette.muted}" ${font} font-size="18" font-weight="400" font-style="italic">Annual arc — durable core first, React systems second</text>`;

const feiVisionBody = `
  <circle cx="600" cy="320" r="92" fill="${palette.background}" fill-opacity="0.68" stroke="${palette.ink}" stroke-opacity="0.35"/>
  <text x="600" y="312" text-anchor="middle" fill="${palette.ink}" ${font} font-size="24" font-weight="500">Human-facing</text>
  <text x="600" y="342" text-anchor="middle" fill="${palette.ink}" ${font} font-size="24" font-weight="500">bridge</text>
  ${node(220, 150, 'Durable core', 'HTML · CSS · JS', palette.primary, 'fei-pedagogical-vision')}
  ${node(980, 150, 'Docs-first AI', 'disclosed', palette.tertiary, 'fei-pedagogical-vision')}
  ${node(220, 490, 'Accessibility', 'as ethics', palette.accent, 'fei-pedagogical-vision')}
  ${node(980, 490, 'Performance', 'as respect', palette.warn, 'fei-pedagogical-vision')}
  <line x1="308" y1="170" x2="520" y2="280" stroke="${palette.primary}" stroke-opacity="0.55"/>
  <line x1="892" y1="170" x2="680" y2="280" stroke="${palette.tertiary}" stroke-opacity="0.55"/>
  <line x1="308" y1="470" x2="520" y2="360" stroke="${palette.accent}" stroke-opacity="0.55"/>
  <line x1="892" y1="470" x2="680" y2="360" stroke="${palette.warn}" stroke-opacity="0.55"/>
  <text x="600" y="610" text-anchor="middle" fill="${palette.muted}" ${font} font-size="18" font-weight="400" font-style="italic">Four pillars orbit the interaction layer</text>`;

const feiiNodes = [
  ['Kickoff', 'U1', 90],
  ['Astro', 'U2–3', 210],
  ['PWA', 'U4', 330],
  ['Testing', 'U5–6', 450],
  ['Performance', 'U7', 570],
  ['3D / R3F', 'U8–9', 690],
  ['IoT / Python', 'U10', 810],
  ['Capstone', 'U11', 930],
  ['Defence', 'U12', 1050],
];
const feiiArcNodes = feiiNodes.map(([label, sub, x], index) => {
  const y = 320 + Math.sin(index * 0.72) * 48;
  const color = index < 3 ? palette.primary : index < 6 ? palette.accent : palette.tertiary;
  return { label, sub, x, y, color };
});
const feiiArcPath = feiiArcNodes.map((nodeItem) => [nodeItem.x, nodeItem.y]);
const feiiArcBody = `
  <path d="${arcPath(feiiArcPath)}" fill="none" stroke="${palette.accent}" stroke-width="2.4" stroke-dasharray="10 8" opacity="0.75"/>
  <path d="${arcPath(feiiArcPath)}" fill="none" stroke="${palette.primary}" stroke-width="3" marker-end="url(#feii-semester-arc-arrow)"/>
  ${feiiArcNodes.map((item) => node(item.x, item.y, item.label, item.sub, item.color, 'feii-semester-arc')).join('')}
  <text x="600" y="88" text-anchor="middle" fill="${palette.ink}" ${font} font-size="30" font-weight="500">FE II production architecture</text>
  <text x="600" y="610" text-anchor="middle" fill="${palette.muted}" ${font} font-size="18" font-weight="400" font-style="italic">Kickoff → Astro → PWA → Testing → Performance → 3D → IoT → Capstone → Defence</text>`;

const feiiVisionBody = `
  <rect x="80" y="250" width="1040" height="120" rx="16" fill="${palette.background}" fill-opacity="0.55" stroke="${palette.primary}" stroke-opacity="0.4"/>
  <text x="600" y="292" text-anchor="middle" fill="${palette.primary}" ${font} font-size="22" font-weight="500">Browser</text>
  <text x="600" y="322" text-anchor="middle" fill="${palette.muted}" ${font} font-size="16" font-weight="400">component model · DOM</text>
  <rect x="180" y="120" width="840" height="88" rx="14" fill="${palette.background}" fill-opacity="0.5" stroke="${palette.tertiary}" stroke-opacity="0.45"/>
  <text x="600" y="162" text-anchor="middle" fill="${palette.tertiary}" ${font} font-size="22" font-weight="500">Interface layer expands</text>
  <text x="600" y="188" text-anchor="middle" fill="${palette.muted}" ${font} font-size="16" font-weight="400">3D · WebGL · shaders · spatial UI</text>
  <rect x="180" y="412" width="840" height="88" rx="14" fill="${palette.background}" fill-opacity="0.5" stroke="${palette.accent}" stroke-opacity="0.45"/>
  <text x="600" y="454" text-anchor="middle" fill="${palette.accent}" ${font} font-size="22" font-weight="500">Physical &amp; service layer</text>
  <text x="600" y="480" text-anchor="middle" fill="${palette.muted}" ${font} font-size="16" font-weight="400">IoT · WebSocket · Python backends</text>
  ${node(170, 320, 'Durable core', 'hooks · props', palette.primary, 'feii-pedagogical-vision')}
  ${node(1030, 320, 'Volatile layer', 'targets change', palette.tertiary, 'feii-pedagogical-vision')}
  ${node(170, 520, 'Performance', 'respect', palette.accent, 'feii-pedagogical-vision')}
  ${node(1030, 520, 'Docs-first AI', 'verified', palette.warn, 'feii-pedagogical-vision')}
  <text x="600" y="610" text-anchor="middle" fill="${palette.muted}" ${font} font-size="18" font-weight="400" font-style="italic">System-first pedagogy — same component grammar, wider deployment context</text>`;

const figures = [
  { name: 'fei-annual-arc', title: 'Front-End I annual arc', desc: 'Two-semester progression from vanilla foundations to React capstone', body: feiArcBody },
  { name: 'fei-pedagogical-vision', title: 'Front-End I pedagogical vision', desc: 'Four pillars orbiting the human-facing interaction bridge', body: feiVisionBody },
  { name: 'feii-semester-arc', title: 'Front-End II semester arc', desc: 'Production architecture path across twelve units', body: feiiArcBody },
  { name: 'feii-pedagogical-vision', title: 'Front-End II pedagogical vision', desc: 'Interface layer expansion with four pedagogical pillars', body: feiiVisionBody },
];

const releaseAssets = [];

for (const fig of figures) {
  const svg = wrapSvg(fig.name, fig.title, fig.desc, fig.body);
  const hash = createHash('sha256').update(svg).digest('hex').slice(0, 12);
  const base = `${fig.name}-${hash}`;
  const svgPath = join(outputDir, `${base}.svg`);
  const pngPath = join(outputDir, `${base}.png`);
  writeFileSync(svgPath, svg);
  const raster = spawnSync('rsvg-convert', ['-w', '2400', '-h', '1280', '-o', pngPath, svgPath], { encoding: 'utf8' });
  if (raster.status !== 0) {
    console.warn(`PNG skipped for ${fig.name}: ${raster.stderr || raster.stdout}`);
  } else {
    console.log(`Wrote ${pngPath}`);
  }
  console.log(`Wrote ${svgPath}`);
  releaseAssets.push({
    id: fig.name,
    svg: `${base}.svg`,
    png: `${base}.png`,
    title: fig.title,
    description: fig.desc,
    content_hash: hash,
  });
}

const index = {
  generator: 'generate-track-curriculum-figures.mjs',
  generator_version: GENERATOR_VERSION,
  brand: 'udit',
  current_release: releaseAssets[0]?.svg?.replace(/-[a-f0-9]{12}\.svg$/, '') ? `track-curriculum-${releaseAssets[0].content_hash.slice(0, 8)}` : 'track-curriculum',
  releases: [
    {
      release_id: `track-curriculum-${createHash('sha256').update(JSON.stringify(releaseAssets)).digest('hex').slice(0, 8)}`,
      created_at: new Date().toISOString(),
      assets: releaseAssets,
      caption: {
        source: 'Nebula shader field — curriculum diagram backdrop',
        credit: `Image by @ruvebal with visual-forger ${GENERATOR_VERSION} and generate-track-curriculum-figures ${GENERATOR_VERSION}.`,
      },
    },
  ],
};

writeFileSync(join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
console.log('Wrote docs/assets/images/track-curriculum/index.json');
