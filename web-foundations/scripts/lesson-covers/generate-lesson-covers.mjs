#!/usr/bin/env node
/**
 * Hexaform cover generator
 *
 * Source of truth: docs/_data/lesson_covers.json
 * Output: docs/assets/images/lesson-covers/<cover-id>.{svg,png}
 *
 * The generator intentionally makes no bodies, faces, garments, brands, or
 * student artefacts. A record's master idea becomes a deterministic field of
 * hexagons through its mode, density, energy, and seed.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const dataPath = resolve(projectRoot, process.argv[2] || 'docs/_data/lesson_covers.json');
const outputDir = resolve(projectRoot, process.argv[3] || 'docs/assets/images/lesson-covers');
const covers = JSON.parse(readFileSync(dataPath, 'utf8'));

const palettes = {
	'fe-i': {
		paper: '#101827',
		ink: '#F7F2E8',
		accent: '#FF7A59',
		accent2: '#54D6BE',
		accent3: '#F3C969',
	},
	'fe-ii': {
		paper: '#191128',
		ink: '#FBF5ED',
		accent: '#FF6B3D',
		accent2: '#A6F4D4',
		accent3: '#B6A1FF',
	},
	'dc-i': {
		paper: '#18141D',
		ink: '#FFF7EC',
		accent: '#E8C56C',
		accent2: '#F07C63',
		accent3: '#9BE2D1',
	},
	'dc-ii': {
		paper: '#121A2E',
		ink: '#F8F6ED',
		accent: '#E7FF79',
		accent2: '#AF89FF',
		accent3: '#FF82A7',
	},
};

const modeProfile = {
	lattice: [1.4, 0.25, 0.12],
	constellation: [1.62, 0.62, 0.36],
	archive: [0.72, 0.55, 0.34],
	contract: [1.18, 0.32, 0.22],
	spectrum: [0.88, 0.7, 0.48],
	field: [1.55, 0.42, 0.38],
	state: [1.02, 0.82, 0.25],
	signal: [1.8, 0.45, 0.52],
	boundary: [0.95, 0.68, 0.17],
	motion: [1.7, 0.72, 0.5],
	transform: [1.3, 0.9, 0.44],
	space: [0.78, 0.35, 0.6],
	material: [0.66, 0.48, 0.64],
	identity: [1.08, 0.75, 0.35],
	path: [1.5, 0.67, 0.42],
	sequence: [1.86, 0.58, 0.31],
	portal: [0.78, 0.92, 0.56],
	risk: [1.16, 0.86, 0.29],
	review: [1.03, 0.58, 0.18],
	scene: [1.35, 0.52, 0.73],
	shader: [1.92, 0.94, 0.68],
	membrane: [1.2, 0.88, 0.39],
	evidence: [0.92, 0.6, 0.27],
	defence: [1.06, 0.72, 0.45],
	judgment: [1.24, 0.44, 0.2],
	budget: [0.96, 0.5, 0.3],
};

const fieldLensByMode = {
	lattice: 'System grid',
	constellation: 'Relations map',
	archive: 'Provenance field',
	contract: 'Learning contract',
	spectrum: 'Perceptual code',
	field: 'Practice field',
	state: 'State model',
	signal: 'Signal flow',
	boundary: 'Boundary condition',
	motion: 'Temporal rhythm',
	transform: 'Semantic transformation',
	space: 'Spatial literacy',
	material: 'Material behaviour',
	identity: 'Representation system',
	path: 'Audience journey',
	sequence: 'Narrative sequence',
	portal: 'Access threshold',
	risk: 'Risk surface',
	review: 'Accountability loop',
	scene: 'Experience staging',
	shader: 'Per-frame aesthetics',
	membrane: 'Interface membrane',
	evidence: 'Inspectable evidence',
	defence: 'Defensible decision',
	judgment: 'Critical judgment',
	budget: 'Cost budget',
};

function hash32(text) {
	let value = 2166136261;
	for (const character of String(text)) {
		value ^= character.charCodeAt(0);
		value = Math.imul(value, 16777619);
	}
	return value >>> 0;
}

function randomFactory(seed) {
	let state = (seed >>> 0) || 1;
	return () => {
		state += 0x6d2b79f5;
		let result = state;
		result = Math.imul(result ^ (result >>> 15), result | 1);
		result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
		return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
	};
}

function escapeXml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function hexPoints(cx, cy, radius, rotation = 0) {
	return Array.from({ length: 6 }, (_, index) => {
		const angle = rotation + Math.PI / 3 * index;
		return `${(cx + Math.cos(angle) * radius).toFixed(2)},${(cy + Math.sin(angle) * radius).toFixed(2)}`;
	}).join(' ');
}

function hex(cx, cy, radius, attributes = {}) {
	const attrs = Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
	return `<polygon points="${hexPoints(cx, cy, radius, Math.PI / 6)}" ${attrs}/>`;
}

function shape(tag, attributes = {}) {
	const attrs = Object.entries(attributes).map(([key, value]) => `${key}="${value}"`).join(' ');
	return `<${tag} ${attrs}/>`;
}

function rect(x, y, width, height, attributes = {}) {
	return shape('rect', { x, y, width, height, ...attributes });
}

function circle(cx, cy, radius, attributes = {}) {
	return shape('circle', { cx, cy, r: radius, ...attributes });
}

function line(x1, y1, x2, y2, attributes = {}) {
	return shape('line', { x1, y1, x2, y2, ...attributes });
}

function path(d, attributes = {}) {
	return shape('path', { d, ...attributes });
}

function semanticAsset(cover) {
	return cover.semantic_asset || `${cover.asset}-semantic`;
}

function outcomeAsset(cover) {
	return cover.outcome?.asset || `${cover.asset}-outcome`;
}

function wrapWords(value, maxLineLength) {
	const words = String(value).split(/\s+/).filter(Boolean);
	const lines = [];
	let line = '';
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (next.length > maxLineLength && line) {
			lines.push(line);
			line = word;
		} else {
			line = next;
		}
	}
	if (line) lines.push(line);
	return lines.slice(0, 3);
}

function multilineText(lines, x, y, attributes = {}) {
	const attrs = Object.entries(attributes)
		.map(([key, value]) => `${key}="${value}"`)
		.join(' ');
	const startY = y - (lines.length - 1) * 18;
	const tspans = lines
		.map((line, index) => `<tspan x="${x}" y="${startY + index * 36}">${escapeXml(line)}</tspan>`)
		.join('');
	return `<text ${attrs}>${tspans}</text>`;
}

function estimateTextWidth(text, fontSize) {
	return String(text).length * fontSize * 0.56;
}

function textFitsInsideHex(lines, radius, fontSize) {
	const maxWidth = radius * 1.46;
	const maxHeight = radius * 0.74;
	const textHeight = lines.length * fontSize * 1.18;
	const longestLine = lines.reduce((longest, line) => Math.max(longest, estimateTextWidth(line, fontSize)), 0);
	return lines.length <= 2 && textHeight <= maxHeight && longestLine <= maxWidth;
}

function semanticValueText(label, lines, fontSize, labelFill, palette) {
	if (textFitsInsideHex(lines, label.size, fontSize)) {
		return multilineText(lines, 0, 26, {
			'text-anchor': 'middle',
			fill: labelFill,
			'font-family': 'Inter, ui-sans-serif, system-ui, sans-serif',
			'font-size': fontSize,
			'font-weight': '500',
		});
	}

	const placement = label.size <= 80 ? 'above' : label.y < 220 ? 'below' : 'above';
	const y = placement === 'below' ? label.size + 64 : -(label.size + 46);
	const boxWidth = Math.min(430, Math.max(260, lines.reduce((longest, line) => Math.max(longest, estimateTextWidth(line, fontSize)), 0) + 56));
	const boxHeight = lines.length * 34 + 32;
	const boxY = y - boxHeight / 2 - 5;
	const textY = y - (lines.length - 1) * 17;
	const panelFill = label.key === 'EVIDENCE' ? palette.ink : palette.paper;
	const panelText = label.key === 'EVIDENCE' ? palette.paper : palette.ink;

	return `<g class="semantic-callout semantic-callout--${placement}">
    <rect x="${(-boxWidth / 2).toFixed(2)}" y="${boxY.toFixed(2)}" width="${boxWidth.toFixed(2)}" height="${boxHeight.toFixed(2)}" rx="18" fill="${panelFill}" fill-opacity="0.88" stroke="${label.colour}" stroke-opacity="0.78" stroke-width="1.4"/>
    ${multilineText(lines, 0, textY, { 'text-anchor': 'middle', fill: panelText, 'font-family': 'Inter, ui-sans-serif, system-ui, sans-serif', 'font-size': fontSize, 'font-weight': '500' })}
  </g>`;
}

function renderCover(id, cover) {
	const palette = palettes[cover.family];
	if (!palette) throw new Error(`Unknown cover family "${cover.family}" for ${id}`);

	const [frequency, drift, pulse] = modeProfile[cover.mode] || modeProfile.lattice;
	const random = randomFactory(hash32(`${cover.seed}-${id}-${cover.mode}`));
	const width = 1600;
	const height = 900;
	const radius = 42;
	const horizontal = Math.sqrt(3) * radius;
	const vertical = radius * 1.5;
	const centreX = 940 + (random() - 0.5) * 120;
	const centreY = 440 + (random() - 0.5) * 70;
	const energy = Math.max(0.1, Math.min(1, Number(cover.energy ?? 0.5)));
	const density = Math.max(5, Math.min(28, Number(cover.density ?? 14)));
	const scene = [];
	const halos = [520, 390, 285, 195]
		.map((size, index) =>
			hex(centreX, centreY, size, {
				fill: index % 2 ? palette.accent : palette.accent2,
				'fill-opacity': (0.015 + (4 - index) * 0.012).toFixed(3),
				stroke: index % 2 ? palette.accent : palette.accent2,
				'stroke-opacity': (0.025 + (4 - index) * 0.012).toFixed(3),
				'stroke-width': '1.2',
			}),
		)
		.join('');

	for (let row = -1; row < 15; row += 1) {
		for (let column = -1; column < 25; column += 1) {
			const x = column * horizontal + (row % 2 ? horizontal / 2 : 0);
			const y = row * vertical;
			const distance = Math.hypot((x - centreX) / width, (y - centreY) / height);
			const wave = (Math.sin(column * frequency * 0.72 + row * drift * 5 + cover.seed * 0.013) + 1) / 2;
			const focus = Math.max(0, 1 - distance * 2.1);
			const activation = wave * 0.48 + focus * 0.74 + random() * 0.18;
			const visible = activation > 0.37 - energy * 0.08;
			if (!visible) continue;
			const selected = activation > 0.78 ? 'accent2' : activation > 0.6 ? 'accent' : 'accent3';
			const opacity = (0.035 + activation * 0.17).toFixed(3);
			const scale = (0.16 + activation * 0.42 + energy * 0.09) * radius;
			scene.push(
				hex(x, y, scale, {
					fill: palette[selected],
					'fill-opacity': opacity,
					stroke: palette[selected],
					'stroke-opacity': (Number(opacity) * 1.8).toFixed(3),
					'stroke-width': '1.1',
				}),
			);
		}
	}

	for (let index = 0; index < density; index += 1) {
		const angle = index * 2.399963229728653 + cover.seed * 0.0019;
		const radial = 34 + Math.sqrt(index + 1) * (28 + energy * 55);
		const x = centreX + Math.cos(angle) * radial * (1 + drift * 0.36);
		const y = centreY + Math.sin(angle) * radial * (0.67 + pulse * 0.47);
		const size = 15 + (density - index) / density * (40 + energy * 32) + random() * 9;
		const colour = index % 5 === 0 ? palette.accent3 : index % 2 === 0 ? palette.accent2 : palette.accent;
		scene.push(
			hex(x, y, size, {
				fill: colour,
				'fill-opacity': (0.2 + (density - index) / density * 0.48).toFixed(3),
				stroke: palette.ink,
				'stroke-opacity': '0.12',
				'stroke-width': '1.2',
			}),
		);
	}

	const alt = cover.alt_en || cover.master_idea;
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title-${id} desc-${id}">
  <title id="title-${id}">${escapeXml(cover.course)} · ${escapeXml(cover.index)}</title>
  <desc id="desc-${id}">${escapeXml(alt)}</desc>
  <defs>
    <linearGradient id="ground-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.paper}"/>
      <stop offset="1" stop-color="#070A11"/>
    </linearGradient>
    <linearGradient id="mark-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.accent}"/>
      <stop offset="0.55" stop-color="${palette.accent2}"/>
      <stop offset="1" stop-color="${palette.accent3}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#ground-${id})"/>
  <g aria-hidden="true">${halos}</g>
  <g aria-hidden="true">${scene.join('')}</g>
  <g aria-hidden="true" transform="translate(98 110)">
    ${hex(0, 0, 15, { fill: 'url(#mark-' + id + ')' })}
    ${hex(42, 0, 9, { fill: palette.ink, 'fill-opacity': '0.78' })}
    ${hex(68, 0, 5, { fill: palette.accent3, 'fill-opacity': '0.9' })}
  </g>
</svg>`;
}

function renderSemanticGraphic(id, cover) {
	const palette = palettes[cover.family];
	if (!palette) throw new Error(`Unknown cover family "${cover.family}" for ${id}`);

	const [frequency, drift, pulse] = modeProfile[cover.mode] || modeProfile.lattice;
	const random = randomFactory(hash32(`semantic-${cover.seed}-${id}-${cover.mode}`));
	const width = 1600;
	const height = 560;
	const centreY = height / 2;
	const lens = cover.field_lens || fieldLensByMode[cover.mode] || 'Field lens';
	const idea = cover.master_idea || 'Master idea';
	const alt = cover.semantic_alt_en || `Semantic hexagonal diagram linking the master idea "${idea}" with the field lens "${lens}".`;
	const nodes = [];
	const connectors = [];
	const labels = [
		{ key: 'MASTER IDEA', value: idea, x: 420, y: centreY, size: 118, colour: palette.accent },
		{ key: 'FIELD LENS', value: lens, x: 1180, y: centreY, size: 118, colour: palette.accent2 },
		{ key: cover.mode.toUpperCase(), value: 'studio decision', x: 800, y: 160, size: 72, colour: palette.accent3 },
		{ key: 'EVIDENCE', value: 'process trace', x: 800, y: 400, size: 72, colour: palette.ink },
	];

	for (let index = 0; index < 18; index += 1) {
		const t = index / 17;
		const x = 430 + t * 740 + Math.sin(index * frequency) * 32;
		const y = centreY + Math.sin(index * drift * 3.8 + cover.seed * 0.01) * (82 + pulse * 32);
		const opacity = (0.1 + t * (1 - t) * 0.32).toFixed(3);
		const colour = index % 3 === 0 ? palette.accent3 : index % 2 === 0 ? palette.accent2 : palette.accent;
		connectors.push(`<line x1="${x.toFixed(2)}" y1="${y.toFixed(2)}" x2="${(x + 38).toFixed(2)}" y2="${(centreY + (random() - 0.5) * 160).toFixed(2)}" stroke="${colour}" stroke-opacity="${opacity}" stroke-width="2"/>`);
		nodes.push(
			hex(x, y, 10 + random() * 16, {
				fill: colour,
				'fill-opacity': (0.18 + random() * 0.32).toFixed(3),
				stroke: colour,
				'stroke-opacity': '0.55',
				'stroke-width': '1.1',
			}),
		);
	}

	const labelGroups = labels.map((label) => {
		const labelFill = label.key === 'EVIDENCE' ? palette.paper : palette.ink;
		const valueSize = label.value.length > 46 ? 22 : label.value.length > 32 ? 25 : 30;
		const lines = wrapWords(label.value, label.key === 'MASTER IDEA' ? 24 : 20);
		const valueText = semanticValueText(label, lines, valueSize, labelFill, palette);
		return `<g transform="translate(${label.x} ${label.y})">
    ${hex(0, 0, label.size, { fill: label.colour, 'fill-opacity': label.key === 'EVIDENCE' ? '0.88' : '0.24', stroke: label.colour, 'stroke-opacity': '0.9', 'stroke-width': '2.4' })}
    <text x="0" y="-20" text-anchor="middle" fill="${labelFill}" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18" font-weight="500" letter-spacing="2" opacity="0.88">${escapeXml(label.key)}</text>
    ${valueText}
  </g>`;
	});

	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title-${id}-semantic desc-${id}-semantic">
  <title id="title-${id}-semantic">${escapeXml(cover.course)} · semantic graphic</title>
  <desc id="desc-${id}-semantic">${escapeXml(alt)}</desc>
  <defs>
    <linearGradient id="semantic-ground-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.paper}"/>
      <stop offset="1" stop-color="#070A11"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#semantic-ground-${id})"/>
  <g aria-hidden="true">${connectors.join('')}</g>
  <g aria-hidden="true">${nodes.join('')}</g>
  ${labelGroups.join('\n  ')}
</svg>`;
}

function renderOutcomeForm(id, cover, palette) {
	const form = cover.outcome.form;
	const random = randomFactory(hash32(`outcome-${id}-${cover.outcome.grammar}-${cover.seed}`));
	const shift = Math.round((random() - 0.5) * 80);
	const ink = { fill: 'none', stroke: palette.ink, 'stroke-opacity': '0.3', 'stroke-width': '3' };
	const a = { fill: 'none', stroke: palette.accent, 'stroke-opacity': '0.88', 'stroke-width': '7', 'stroke-linecap': 'round' };
	const b = { fill: 'none', stroke: palette.accent2, 'stroke-opacity': '0.8', 'stroke-width': '5', 'stroke-linecap': 'round' };
	const c = { fill: 'none', stroke: palette.accent3, 'stroke-opacity': '0.7', 'stroke-width': '4', 'stroke-linecap': 'round' };
	const art = [];

	if (form === 'loop') {
		const points = [];
		for (let index = 0; index < 6; index += 1) {
			const x = 205 + index * 238;
			const y = 350 + Math.sin(index * 0.9 + shift * 0.01) * 88;
			const colour = index % 2 ? palette.accent2 : palette.accent;
			points.push([x, y]);
			art.push(hex(x, y, 70 + index % 3 * 11, { fill: colour, 'fill-opacity': '0.22', stroke: colour, 'stroke-opacity': '0.8', 'stroke-width': '3' }));
			art.push(circle(x, y, 18, { fill: palette.ink, 'fill-opacity': '0.82' }));
			if (index) art.push(line(points[index - 1][0] + 74, points[index - 1][1], x - 74, y, b));
		}
		art.push(path(`M1395 ${points[5][1]} C1510 80 90 70 205 ${points[0][1]}`, { ...c, 'stroke-dasharray': '16 12' }));
		art.push(line(205, 605, 1395, 605, { ...ink, stroke: palette.accent3, 'stroke-opacity': '0.55' }));
		for (let index = 0; index < 6; index += 1) art.push(circle(205 + index * 238, 605, 8 + index % 2 * 5, { fill: palette.accent3, 'fill-opacity': '0.84' }));
	} else if (form === 'structure') {
		art.push(rect(115, 80, 1370, 560, { rx: '24', fill: palette.ink, 'fill-opacity': '0.025', stroke: palette.ink, 'stroke-opacity': '0.24', 'stroke-width': '2' }));
		for (let index = 0; index < 3; index += 1) {
			const x = 185 + index * 425;
			const colour = [palette.accent, palette.accent2, palette.accent3][index];
			art.push(rect(x, 145 + index % 2 * 35, 335, 420 - index % 2 * 70, { rx: '14', fill: colour, 'fill-opacity': '0.11', stroke: colour, 'stroke-opacity': '0.72', 'stroke-width': '3' }));
			for (let node = 0; node < 3; node += 1) art.push(hex(x + 168, 240 + node * 112, 40 + node * 9, { fill: colour, 'fill-opacity': '0.34', stroke: colour, 'stroke-opacity': '0.7', 'stroke-width': '2' }));
			if (index) art.push(line(x - 85, 360, x - 12, 360, a));
		}
	} else if (form === 'field') {
		for (let row = 0; row < 5; row += 1) for (let column = 0; column < 9; column += 1) {
			const x = 145 + column * 160 + row % 2 * 45;
			const y = 130 + row * 118;
			const focus = Math.abs(column - 4) + Math.abs(row - 2);
			const colour = focus < 3 ? palette.accent2 : (column + row) % 2 ? palette.accent : palette.accent3;
			art.push(hex(x, y, 24 + Math.max(0, 4 - focus) * 12 + (column + cover.seed) % 3 * 5, { fill: colour, 'fill-opacity': String(0.12 + Math.max(0, 4 - focus) * 0.07), stroke: colour, 'stroke-opacity': '0.58', 'stroke-width': '2' }));
		}
		art.push(path(`M85 ${360 + shift} C430 ${210 - shift} 1140 ${520 + shift} 1515 ${330 - shift}`, { ...a, 'stroke-opacity': '0.5' }));
	} else if (form === 'state') {
		const states = [[205, 350], [515, 210], [825, 350], [1135, 210], [1400, 350]];
		for (let index = 0; index < states.length; index += 1) {
			const [x, y] = states[index];
			const colour = index === 2 ? palette.accent : index % 2 ? palette.accent2 : palette.accent3;
			art.push(hex(x, y, 82, { fill: colour, 'fill-opacity': '0.22', stroke: colour, 'stroke-opacity': '0.82', 'stroke-width': '3' }));
			art.push(circle(x, y, 20, { fill: colour, 'fill-opacity': '0.88' }));
			if (index) art.push(path(`M${states[index - 1][0] + 80} ${states[index - 1][1]} Q${(states[index - 1][0] + x) / 2} ${280 + shift} ${x - 80} ${y}`, b));
		}
		art.push(hex(825, 590, 56, { fill: palette.accent, 'fill-opacity': '0.16', stroke: palette.accent, 'stroke-opacity': '0.65', 'stroke-width': '3' }));
		art.push(path('M825 432 C980 500 980 585 885 590', { ...c, 'stroke-dasharray': '13 10' }));
		art.push(path('M769 590 C650 570 640 440 745 395', { ...ink, stroke: palette.accent3, 'stroke-opacity': '0.58' }));
	} else if (form === 'motion') {
		for (let track = 0; track < 6; track += 1) {
			const y = 135 + track * 88;
			const colour = track % 3 === 0 ? palette.accent : track % 2 ? palette.accent2 : palette.accent3;
			art.push(path(`M95 ${y} C360 ${y - 110 + shift} 560 ${y + 110} 800 ${y} S1240 ${y - 95} 1505 ${y + shift * 0.3}`, { fill: 'none', stroke: colour, 'stroke-opacity': String(0.3 + track * 0.07), 'stroke-width': String(3 + track * 0.8), 'stroke-linecap': 'round' }));
			for (let beat = 0; beat < 5; beat += 1) art.push(circle(245 + beat * 270 + track * 9, y + Math.sin(beat + track) * 28, 7 + beat % 2 * 4, { fill: colour, 'fill-opacity': '0.78' }));
		}
	} else if (form === 'gate') {
		art.push(path('M780 70 L870 70 L950 175 L870 650 L780 650 L700 545 Z', { fill: palette.accent2, 'fill-opacity': '0.1', stroke: palette.accent2, 'stroke-opacity': '0.78', 'stroke-width': '5' }));
		for (const [y, colour, pass] of [[175, palette.accent, false], [355, palette.accent2, true], [535, palette.accent3, false]]) {
			art.push(hex(160, y, 68, { fill: colour, 'fill-opacity': '0.25', stroke: colour, 'stroke-opacity': '0.78', 'stroke-width': '3' }));
			art.push(path(`M230 ${y} C420 ${y - 70} 560 ${y + 60} ${pass ? 835 : 650} ${y}`, { fill: 'none', stroke: colour, 'stroke-opacity': pass ? '0.9' : '0.44', 'stroke-width': pass ? '9' : '5', 'stroke-dasharray': pass ? '0' : '14 11' }));
			if (!pass) art.push(circle(665, y, 16, { fill: colour, 'fill-opacity': '0.82' }));
		}
		for (const [x, y, size] of [[1080, 195, 72], [1350, 355, 106], [1110, 535, 55]]) art.push(hex(x, y, size, { fill: palette.accent2, 'fill-opacity': '0.2', stroke: palette.accent3, 'stroke-opacity': '0.7', 'stroke-width': '3' }));
		art.push(path('M870 355 C1080 355 1190 270 1350 355', b));
	} else if (form === 'network') {
		const nodes = Array.from({ length: 12 }, (_, index) => { const angle = index / 12 * Math.PI * 2 + shift * 0.004; const radius = index % 3 ? 205 : 270; return [800 + Math.cos(angle) * radius * 1.7, 360 + Math.sin(angle) * radius]; });
		for (let index = 0; index < nodes.length; index += 1) {
			const [x, y] = nodes[index]; const colour = index % 3 === 0 ? palette.accent : index % 2 ? palette.accent2 : palette.accent3;
			art.push(line(x, y, 800, 360, { ...ink, stroke: colour, 'stroke-opacity': '0.42', 'stroke-width': '1.5' }));
			if (index % 2 === 0) art.push(line(x, y, nodes[(index + 3) % 12][0], nodes[(index + 3) % 12][1], { ...ink, stroke: colour, 'stroke-opacity': '0.22', 'stroke-width': '1.5' }));
			art.push(hex(x, y, 42 + index % 4 * 8, { fill: colour, 'fill-opacity': '0.24', stroke: colour, 'stroke-opacity': '0.75', 'stroke-width': '2' }));
		}
		art.push(hex(800, 360, 118, { fill: palette.ink, 'fill-opacity': '0.08', stroke: palette.accent2, 'stroke-opacity': '0.82', 'stroke-width': '4' }));
		art.push(circle(800, 360, 30, { fill: palette.ink, 'fill-opacity': '0.86' }));
	} else if (form === 'evidence') {
		const fragments = [[125, 105], [125, 305], [415, 105], [415, 305]];
		for (let index = 0; index < fragments.length; index += 1) {
			const [x, y] = fragments[index]; const colour = [palette.accent, palette.accent2, palette.accent3, palette.accent][index];
			art.push(rect(x, y, 220, 145, { rx: '8', fill: colour, 'fill-opacity': '0.12', stroke: colour, 'stroke-opacity': '0.7', 'stroke-width': '3' }));
			art.push(path(`M${x + 30} ${y + 105} Q${x + 105} ${y + 25 + index * 10} ${x + 188} ${y + 85}`, { fill: 'none', stroke: colour, 'stroke-opacity': '0.75', 'stroke-width': '5' }));
		}
		art.push(path('M345 175 C670 175 650 355 895 355 M345 375 C670 375 650 355 895 355 M635 175 C760 175 780 300 895 355 M635 375 C760 375 780 375 895 355', { ...ink, 'stroke-width': '4' }));
		art.push(hex(895, 355, 45, { fill: palette.ink, 'fill-opacity': '0.9' }));
		art.push(rect(915, 65, 545, 590, { rx: '12', fill: palette.ink, 'fill-opacity': '0.04', stroke: palette.ink, 'stroke-opacity': '0.36', 'stroke-width': '3' }));
		art.push(rect(970, 125, 430, 260, { rx: '7', fill: palette.accent2, 'fill-opacity': '0.17', stroke: palette.accent2, 'stroke-opacity': '0.66', 'stroke-width': '3' }));
		for (let index = 0; index < 4; index += 1) art.push(rect(970, 430 + index * 42, 250 + index * 38, 12, { rx: '4', fill: index % 2 ? palette.accent3 : palette.accent, 'fill-opacity': '0.62' }));
	} else if (form === 'budget') {
		const ceiling = 450 + Math.round(random() * 55);
		art.push(rect(130, 105, 1340, 510, { rx: '16', fill: palette.ink, 'fill-opacity': '0.025', stroke: palette.ink, 'stroke-opacity': '0.25', 'stroke-width': '2' }));
		art.push(line(165, ceiling, 1435, ceiling, { ...c, 'stroke-width': '6', 'stroke-dasharray': '18 12' }));
		for (let index = 0; index < 11; index += 1) {
			const x = 200 + index * 112; const height = 95 + (index * 47 + cover.seed) % 250; const colour = height > 270 ? palette.accent : index % 2 ? palette.accent2 : palette.accent3;
			art.push(rect(x, ceiling - height, 62, height, { rx: '6', fill: colour, 'fill-opacity': '0.48', stroke: colour, 'stroke-opacity': '0.68', 'stroke-width': '2' }));
			art.push(circle(x + 31, 565, 8 + index % 3 * 4, { fill: colour, 'fill-opacity': '0.82' }));
		}
	} else if (form === 'sequence') {
		for (let index = 0; index < 6; index += 1) {
			const x = 140 + index * 245; const y = 530 - index * 72 + Math.sin(index + shift) * 18; const colour = index % 3 === 0 ? palette.accent : index % 2 ? palette.accent2 : palette.accent3;
			art.push(rect(x, y - 90, 185, 150, { rx: '10', fill: colour, 'fill-opacity': '0.14', stroke: colour, 'stroke-opacity': '0.72', 'stroke-width': '3' }));
			art.push(hex(x + 92, y - 15, 42 + index * 3, { fill: colour, 'fill-opacity': '0.52' }));
			if (index) art.push(path(`M${x - 60} ${y + 45} Q${x - 25} ${y - 65} ${x - 8} ${y - 40}`, a));
		}
		art.push(path('M140 625 C480 660 1120 660 1460 235', { ...ink, stroke: palette.accent3, 'stroke-opacity': '0.52' }));
	} else if (form === 'confluence') {
		for (let stream = 0; stream < 5; stream += 1) {
			const y = 120 + stream * 118; const colour = stream % 3 === 0 ? palette.accent : stream % 2 ? palette.accent2 : palette.accent3;
			art.push(path(`M85 ${y} C390 ${y + shift} 510 ${340 + (stream - 2) * 25} 755 360`, { fill: 'none', stroke: colour, 'stroke-opacity': '0.62', 'stroke-width': String(4 + stream) }));
			art.push(hex(145, y, 38 + stream % 2 * 12, { fill: colour, 'fill-opacity': '0.38' }));
		}
		art.push(hex(800, 360, 105, { fill: palette.ink, 'fill-opacity': '0.08', stroke: palette.accent2, 'stroke-opacity': '0.8', 'stroke-width': '4' }));
		for (let stream = 0; stream < 4; stream += 1) art.push(path(`M895 360 C1090 ${240 + stream * 80} 1270 ${250 + stream * 70} 1515 ${210 + stream * 95}`, { fill: 'none', stroke: stream % 2 ? palette.accent2 : palette.accent3, 'stroke-opacity': '0.55', 'stroke-width': String(7 - stream) }));
	} else if (form === 'defence') {
		art.push(path('M205 570 Q800 625 1395 570', { ...ink, 'stroke-width': '5' }));
		art.push(path('M685 570 L800 365 L915 570 Z', { fill: palette.accent2, 'fill-opacity': '0.14', stroke: palette.accent2, 'stroke-opacity': '0.75', 'stroke-width': '4' }));
		art.push(hex(800, 330, 92, { fill: palette.accent, 'fill-opacity': '0.3', stroke: palette.accent, 'stroke-opacity': '0.84', 'stroke-width': '4' }));
		for (const [index, point] of [[0, [240, 180]], [1, [425, 360]], [2, [1170, 180]], [3, [1330, 390]]]) {
			const [x, y] = point; const colour = index % 2 ? palette.accent3 : palette.accent2;
			art.push(hex(x, y, 56 + index * 5, { fill: colour, 'fill-opacity': '0.22', stroke: colour, 'stroke-opacity': '0.72', 'stroke-width': '3' }));
			art.push(path(`M${x} ${y} Q${(x + 800) / 2} ${260 + shift} 800 330`, { fill: 'none', stroke: colour, 'stroke-opacity': '0.48', 'stroke-width': '4' }));
		}
		art.push(path('M860 270 C1040 120 1210 125 1270 235', { ...c, 'stroke-dasharray': '15 11' }));
	} else if (form === 'islands') {
		for (let wave = 0; wave < 6; wave += 1) art.push(path(`M75 ${175 + wave * 82} C330 ${110 + wave * 90} 560 ${240 + wave * 60} 800 ${175 + wave * 82} S1260 ${120 + wave * 86} 1525 ${175 + wave * 82}`, { fill: 'none', stroke: wave % 2 ? palette.accent2 : palette.accent3, 'stroke-opacity': '0.24', 'stroke-width': '3' }));
		for (const [index, island] of [[0, [390, 260, 85]], [1, [820, 435, 112]], [2, [1240, 245, 72]]]) {
			const [x, y, size] = island; const colour = index === 1 ? palette.accent : palette.accent2;
			art.push(hex(x, y, size, { fill: colour, 'fill-opacity': index === 1 ? '0.46' : '0.2', stroke: colour, 'stroke-opacity': '0.82', 'stroke-width': index === 1 ? '5' : '3' }));
			for (let node = 0; node < 3; node += 1) art.push(circle(x - 30 + node * 30, y + 15, 8 + node * 3, { fill: palette.ink, 'fill-opacity': '0.76' }));
		}
	} else if (form === 'scene') {
		art.push(path('M145 545 L500 180 L500 545 Z', { fill: palette.accent3, 'fill-opacity': '0.07', stroke: palette.accent3, 'stroke-opacity': '0.5', 'stroke-width': '3' }));
		art.push(circle(145, 545, 45, { fill: palette.accent, 'fill-opacity': '0.75' }));
		const objects = [[760, 230, 75], [1010, 420, 115], [1300, 245, 62], [1360, 535, 88]];
		for (let index = 0; index < objects.length; index += 1) { const [x, y, size] = objects[index]; const colour = index % 2 ? palette.accent2 : palette.accent3; art.push(hex(x, y, size, { fill: colour, 'fill-opacity': '0.2', stroke: colour, 'stroke-opacity': '0.8', 'stroke-width': '3' })); if (index) art.push(line(objects[index - 1][0], objects[index - 1][1], x, y, { ...ink, stroke: colour, 'stroke-opacity': '0.42', 'stroke-width': '1.5' })); }
		for (let axis = 0; axis < 5; axis += 1) art.push(line(580, 610 - axis * 80, 1480, 610 - axis * 45, { ...ink, 'stroke-opacity': '0.15', 'stroke-width': '1.5' }));
	} else if (form === 'shader') {
		for (let lane = 0; lane < 5; lane += 1) { const y = 150 + lane * 105; const colour = lane % 2 ? palette.accent2 : palette.accent3; art.push(line(105, y, 580, 300 + lane * 30, { fill: 'none', stroke: colour, 'stroke-opacity': '0.58', 'stroke-width': String(3 + lane) })); art.push(hex(135, y, 36 + lane * 5, { fill: colour, 'fill-opacity': '0.38' })); }
		art.push(path('M580 170 L830 120 L955 360 L830 600 L580 550 Z', { fill: palette.accent, 'fill-opacity': '0.15', stroke: palette.accent, 'stroke-opacity': '0.82', 'stroke-width': '5' }));
		for (let row = 0; row < 7; row += 1) for (let column = 0; column < 8; column += 1) { const colour = (row + column) % 3 === 0 ? palette.accent : (row + column) % 2 ? palette.accent2 : palette.accent3; art.push(rect(1045 + column * 55, 155 + row * 55, 46, 46, { rx: '3', fill: colour, 'fill-opacity': (0.18 + (row * 8 + column + cover.seed) % 7 * 0.1).toFixed(2) })); }
		art.push(path('M955 360 C1005 315 1015 285 1040 270', a));
	} else if (form === 'membrane') {
		for (let stream = 0; stream < 6; stream += 1) { const y = 130 + stream * 92; const colour = stream % 2 ? palette.accent2 : palette.accent; art.push(path(`M75 ${y} C300 ${y - 55} 510 ${y + 55} 695 ${y}`, { fill: 'none', stroke: colour, 'stroke-opacity': '0.5', 'stroke-width': String(3 + stream * 0.7) })); art.push(circle(145 + stream * 72, y + Math.sin(stream) * 24, 8 + stream, { fill: colour, 'fill-opacity': '0.78' })); }
		art.push(path('M730 65 L860 65 L920 175 L860 655 L730 655 L670 545 Z', { fill: palette.accent3, 'fill-opacity': '0.11', stroke: palette.accent3, 'stroke-opacity': '0.78', 'stroke-width': '5' }));
		art.push(path('M695 300 C755 245 835 245 895 300 M895 420 C835 475 755 475 695 420', { ...ink, 'stroke-opacity': '0.66', 'stroke-width': '7', 'stroke-dasharray': '16 11' }));
		for (let row = 0; row < 3; row += 1) for (let column = 0; column < 3; column += 1) { const colour = (row + column) % 2 ? palette.accent2 : palette.accent3; art.push(rect(1025 + column * 155, 155 + row * 145, 120, 105, { rx: '8', fill: colour, 'fill-opacity': '0.16', stroke: colour, 'stroke-opacity': '0.62', 'stroke-width': '3' })); art.push(circle(1085 + column * 155, 208 + row * 145, 16 + (row + column) % 3 * 7, { fill: colour, 'fill-opacity': '0.74' })); }
	} else {
		throw new Error(`Unknown outcome form "${form}" for ${id}`);
	}
	return art.join('');
}

function renderOutcomeGraphic(id, cover) {
	const palette = palettes[cover.family];
	if (!palette || !cover.outcome?.form || !cover.outcome?.grammar) throw new Error(`Incomplete outcome configuration for ${id}`);
	const width = 1600;
	const height = 720;
	const random = randomFactory(hash32(`outcome-texture-${id}-${cover.seed}`));
	const texture = Array.from({ length: 42 }, (_, index) => {
		const colour = index % 3 === 0 ? palette.accent3 : index % 2 ? palette.accent2 : palette.accent;
		return hex(65 + random() * 1470, 55 + random() * 610, 4 + random() * 13, { fill: colour, 'fill-opacity': (0.018 + random() * 0.05).toFixed(3), stroke: colour, 'stroke-opacity': (0.06 + random() * 0.11).toFixed(3), 'stroke-width': '1' });
	}).join('');
	return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title-${id}-outcome desc-${id}-outcome">
  <title id="title-${id}-outcome">${escapeXml(cover.course)} · outcome illustration</title>
  <desc id="desc-${id}-outcome">${escapeXml(cover.outcome.alt_en)}</desc>
  <rect width="${width}" height="${height}" fill="${palette.paper}"/>
  <g aria-hidden="true">${texture}</g>
  <g aria-hidden="true">${renderOutcomeForm(id, cover, palette)}</g>
  <path d="M46 82 L92 46 H1508 L1554 82 V638 L1508 674 H92 L46 638 Z" fill="none" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="2"/>
</svg>`;
}

function assertTextWeightCeiling(svg, asset) {
	const invalid = [...svg.matchAll(/font-weight="(\d+)"/g)].map((match) => Number(match[1])).filter((weight) => weight > 500);
	if (invalid.length) throw new Error(`${asset} uses text weights above 500: ${invalid.join(', ')}`);
}

function assertOutcomeContract(svg, asset) {
	assertTextWeightCeiling(svg, asset);
	if (/<text\b/i.test(svg)) throw new Error(`${asset} must remain text-free`);
	if (/(Ahmes|Athanor|DevIAC|BIBLIO-GAP|coat\s+[0-9a-f]|node\s+[0-9a-f]|extraction\.db|local architecture)/i.test(svg)) throw new Error(`${asset} exposes internal research architecture`);
}

mkdirSync(outputDir, { recursive: true });
const manifest = [];

for (const [id, cover] of Object.entries(covers)) {
	if (id.startsWith('_')) continue;
	if (!cover.asset) throw new Error(`Cover ${id} needs an asset name`);
	const svgPath = resolve(outputDir, `${cover.asset}.svg`);
	const pngPath = resolve(outputDir, `${cover.asset}.png`);
	const semanticSvgPath = resolve(outputDir, `${semanticAsset(cover)}.svg`);
	const semanticPngPath = resolve(outputDir, `${semanticAsset(cover)}.png`);
	const outcomeSvgPath = resolve(outputDir, `${outcomeAsset(cover)}.svg`);
	const outcomePngPath = resolve(outputDir, `${outcomeAsset(cover)}.png`);
	const semanticSvg = renderSemanticGraphic(id, cover);
	const outcomeSvg = renderOutcomeGraphic(id, cover);
	writeFileSync(svgPath, renderCover(id, cover));
	assertTextWeightCeiling(semanticSvg, semanticAsset(cover));
	assertOutcomeContract(outcomeSvg, outcomeAsset(cover));
	writeFileSync(semanticSvgPath, semanticSvg);
	writeFileSync(outcomeSvgPath, outcomeSvg);
	const converted = spawnSync('rsvg-convert', ['--width', '1600', '--height', '900', '--output', pngPath, svgPath], {
		encoding: 'utf8',
	});
	if (converted.status !== 0) {
		throw new Error(`PNG export failed for ${cover.asset}: ${converted.stderr || converted.error || 'unknown error'}`);
	}
	const semanticConverted = spawnSync('rsvg-convert', ['--width', '1600', '--height', '560', '--output', semanticPngPath, semanticSvgPath], {
		encoding: 'utf8',
	});
	if (semanticConverted.status !== 0) {
		throw new Error(`Semantic PNG export failed for ${cover.asset}: ${semanticConverted.stderr || semanticConverted.error || 'unknown error'}`);
	}
	const outcomeConverted = spawnSync('rsvg-convert', ['--width', '1600', '--height', '720', '--output', outcomePngPath, outcomeSvgPath], {
		encoding: 'utf8',
	});
	if (outcomeConverted.status !== 0) {
		throw new Error(`Outcome PNG export failed for ${cover.asset}: ${outcomeConverted.stderr || outcomeConverted.error || 'unknown error'}`);
	}
	manifest.push({
		id,
		asset: cover.asset,
		svg: `${cover.asset}.svg`,
		png: `${cover.asset}.png`,
		semantic_asset: semanticAsset(cover),
		semantic_svg: `${semanticAsset(cover)}.svg`,
		semantic_png: `${semanticAsset(cover)}.png`,
		outcome_asset: outcomeAsset(cover),
		outcome_svg: `${outcomeAsset(cover)}.svg`,
		outcome_png: `${outcomeAsset(cover)}.png`,
	});
}

writeFileSync(resolve(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Generated ${manifest.length} Hexaform cover, semantic graphic, and outcome illustration sets in ${outputDir}`);
