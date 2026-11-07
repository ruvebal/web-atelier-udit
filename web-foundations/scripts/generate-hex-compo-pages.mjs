#!/usr/bin/env node
/**
 * Regenerate Hexaform living-cover gallery + per-endpoint demo pages
 * from docs/lessons/en/feii/canvas-25d-hex-field/demo/compositions.js
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const demoDir = join(root, 'docs/lessons/en/feii/canvas-25d-hex-field/demo');
const { COMPOSITIONS } = await import(pathToFileURL(join(demoDir, 'compositions.js')).href);
const basePerm = '/lessons/en/feii/canvas-25d-hex-field/demo';

function endpointPage(compo) {
	return `---
permalink: ${basePerm}/${compo.id}/
layout: null
---
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${compo.title} — Hexaform living cover</title>
<link rel="stylesheet" href="../stage.css" />
</head>
<body>
<main class="stage">
<canvas id="hex-field" role="img" aria-label="${compo.title}. Decorative Hexaform field."></canvas>
<aside class="readout">
<h1>${compo.title}</h1>
<p>${compo.blurb}</p>
<p>Endpoint <code>${compo.endpoint}</code> · seed <code>${compo.seed}</code> · family <code>${compo.family}</code></p>
<p class="stats" id="stats">boot…</p>
<p class="nav-row">
<a href="../">Gallery</a>
·
<a href="../lab/">Lab (faders)</a>
·
<a href="{{ '/assets/images/archive-covers/${compo.svg}' | relative_url }}">SVG stamp</a>
·
<a href="{{ '/lessons/en/feii/canvas-25d-hex-field/' | relative_url }}">Lesson</a>
</p>
</aside>
</main>
<script type="module">
import { mountComposition } from '../mount.js';
const canvas = document.getElementById('hex-field');
const stats = document.getElementById('stats');
mountComposition(canvas, '${compo.id}', {
  onSample({ cells, visible, fps, seed, velocity, fillMode, mode, reduced }) {
    stats.textContent = \`\${mode} · \${fillMode} · seed \${seed} · vel \${velocity} · cells \${cells}/\${visible ?? cells} · ~\${fps} fps\${reduced ? ' · reduced-motion' : ''}\`;
  },
});
</script>
</body>
</html>
`;
}

for (const compo of COMPOSITIONS) {
	const dir = join(demoDir, compo.id);
	mkdirSync(dir, { recursive: true });
	writeFileSync(join(dir, 'index.html'), endpointPage(compo));
	console.log('wrote', compo.id);
}

const galleryCards = COMPOSITIONS.map(
	(c) => `				<li>
					<a class="gallery-card" data-compo="${c.id}" href="./${c.id}/">
						<div class="thumb"><canvas aria-hidden="true"></canvas></div>
						<div class="meta">
							<h2>${c.title}</h2>
							<p>${c.blurb}</p>
							<span class="endpoint">${c.endpoint}</span>
						</div>
					</a>
				</li>`,
).join('\n');

writeFileSync(
	join(demoDir, 'index.html'),
	`---
permalink: ${basePerm}/
layout: null
---
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Hexaform living covers — gallery</title>
<link rel="stylesheet" href="./stage.css" />
</head>
<body>
<main class="gallery">
<header>
<h1>Hexaform living covers</h1>
<p class="lede">
One Canvas 2.5D composition per archive hub endpoint — solid fills, double-depth grid,
chaotic closer/bigger centre cluster. Still SVG stamps remain the OG / reduced-motion fallback.
</p>
<p class="gallery-actions">
<a href="./lab/">Open lab (seed + velocity faders)</a>
·
<a href="{{ '/lessons/en/feii/canvas-25d-hex-field/' | relative_url }}">Lesson</a>
·
<a href="{{ '/assets/images/archive-covers/' | relative_url }}">SVG covers</a>
</p>
</header>
<ul class="gallery-grid">
${galleryCards}
</ul>
</main>
<script type="module">
import { mountGalleryThumbs } from './mount.js';
mountGalleryThumbs(document.querySelector('.gallery-grid'));
</script>
</body>
</html>
`,
);

mkdirSync(join(demoDir, 'lab'), { recursive: true });
writeFileSync(
	join(demoDir, 'lab/index.html'),
	`---
permalink: ${basePerm}/lab/
layout: null
---
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Canvas 2.5D hex field — lab</title>
<link rel="stylesheet" href="../stage.css" />
</head>
<body>
<main class="stage">
<canvas id="hex-field" role="img" aria-label="Interactive Hexaform lab with seed and velocity faders."></canvas>
<aside class="readout">
<h1>Lab — seed &amp; velocity</h1>
<p>Interactive tuning surface. Production heroes use a fixed composition from the gallery, not these faders.</p>
<div class="fader">
<label for="seed">Seed</label>
<span></span>
<output id="seed-out" for="seed">767</output>
<input id="seed" type="range" min="0" max="2047" value="767" step="1" />
<p class="hint">Reshuffle · higher opens complexity</p>
</div>
<div class="fader">
<label for="velocity">Velocity</label>
<span></span>
<output id="velocity-out" for="velocity">0.38</output>
<input id="velocity" type="range" min="0" max="1.2" value="0.38" step="0.01" />
<p class="hint">Float rate · default slow</p>
</div>
<p class="stats" id="stats">boot…</p>
<p class="nav-row">
<a href="../">Gallery</a>
·
<a href="{{ '/lessons/en/feii/canvas-25d-hex-field/' | relative_url }}">Lesson</a>
</p>
</aside>
</main>
<script type="module">
import { createHexField, seedToComplexity } from '../hex-field.js';
import { getComposition, compositionOptions } from '../compositions.js';

const canvas = document.getElementById('hex-field');
const stats = document.getElementById('stats');
const seedInput = document.getElementById('seed');
const seedOut = document.getElementById('seed-out');
const velocityInput = document.getElementById('velocity');
const velocityOut = document.getElementById('velocity-out');
const seedMax = Number(seedInput.max) || 2047;
const base = compositionOptions(getComposition('archive-lessons-en'));

const field = createHexField(canvas, {
  ...base,
  seed: Number(seedInput.value),
  velocity: Number(velocityInput.value),
  onSample({ cells, visible, fps, pitch, yaw, seed, complexity, velocity, fillMode, mode, reduced }) {
    stats.textContent = \`\${mode} · \${fillMode} · seed \${seed} · cx \${complexity} · vel \${velocity} · cells \${cells}/\${visible ?? cells} · ~\${fps} fps · pitch \${pitch} · yaw \${yaw}\${reduced ? ' · reduced-motion' : ''}\`;
  },
});

function syncSeedUi(value) {
  const seed = Number(value);
  seedOut.textContent = String(seed);
  seedInput.setAttribute('aria-valuetext', \`seed \${seed}, complexity \${seedToComplexity(seed, seedMax).toFixed(2)}\`);
}
function syncVelocityUi(value) {
  const v = Number(value);
  velocityOut.textContent = v.toFixed(2);
}

seedInput.addEventListener('input', () => {
  const seed = Number(seedInput.value);
  syncSeedUi(seed);
  field.setSeed(seed);
});
velocityInput.addEventListener('input', () => {
  const v = Number(velocityInput.value);
  syncVelocityUi(v);
  field.setVelocity(v);
});
syncSeedUi(seedInput.value);
syncVelocityUi(velocityInput.value);
</script>
</body>
</html>
`,
);

console.log(`done — ${COMPOSITIONS.length} compositions + gallery + lab`);
