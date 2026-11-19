#!/usr/bin/env node
// X7 skill-promotion checks (A1–A6 precursors). PR existence is asserted by the exit gate via gh.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const studioRive = '/Users/ruvebal/src/.cursor/skills/rive-animascript-3d';
const studioSvg = '/Users/ruvebal/src/.cursor/skills/svg-to-rive-3d';
const studioCanvas = '/Users/ruvebal/src/.cursor/skills/canvas-25d-content-hero/SKILL.md';
const codexRive = '/Users/ruvebal/.codex/skills/rive-animascript-3d';
const codexSvg = '/Users/ruvebal/.codex/skills/svg-to-rive-3d';
const codexCanvas = '/Users/ruvebal/.codex/skills/canvas-25d-content-hero/SKILL.md';

function fail(msg) {
	console.error(`FAIL: ${msg}`);
	process.exit(1);
}
function read(p) {
	if (!existsSync(p)) fail(`missing ${p}`);
	return readFileSync(p, 'utf8');
}

const rive = read(`${studioRive}/SKILL.md`);
const svg = read(`${studioSvg}/SKILL.md`);
const canvas = read(studioCanvas);
const cRive = read(`${codexRive}/SKILL.md`);
const cSvg = read(`${codexSvg}/SKILL.md`);
read(codexCanvas);

// A1 — general skill source-agnostic (no SVG dependency)
if (!/Verified \(X7/i.test(rive)) fail('A1: rive-animascript-3d not marked Verified (X7)');
if (/Experimental:/i.test(rive)) fail('A1: rive-animascript-3d still says Experimental');
if (!/does not depend on SVG|Never introduce an SVG dependency/i.test(rive)) {
	fail('A1: missing explicit no-SVG-dependency invariant');
}
// Must not require SVG as the only geometry path
if (/must (use|start with) SVG|requires SVG/i.test(rive)) fail('A1: general skill requires SVG');
for (const section of ['scene', 'geometry', 'animation', 'interaction', 'GPU|runtime|shader', 'fallback|reduced-motion', 'Verify|verification']) {
	if (!new RegExp(section, 'i').test(rive)) fail(`A1: missing contract topic /${section}/`);
}

// A2 — SVG adapter
if (!/Verified \(X7/i.test(svg)) fail('A2: svg-to-rive-3d not marked Verified (X7)');
if (/Experimental:/i.test(svg)) fail('A2: svg-to-rive-3d still says Experimental');
for (const needle of ['D4', 'D19', 'facet count `N`', 'rive-animascript-3d']) {
	if (!svg.includes(needle) && !svg.includes(needle.replace(/`/g, ''))) {
		// N may appear as `N` or dynamic eligible facet count
	}
}
if (!/D4 depth/i.test(svg)) fail('A2: missing D4 depth contract');
if (!/D19 picking/i.test(svg)) fail('A2: missing D19 picking hand-off');
if (!/dynamic eligible facet count `N`|facet count `N`/i.test(svg)) fail('A2: missing dynamic N');
if (!/one-way|never depend on SVG/i.test(svg)) fail('A2: missing one-way dependency language');

// A3 — case study optional, not universal paths
if (!/Case study \(optional\)|originating case study/i.test(svg)) fail('A3: missing optional case-study section');
if (/fava-mark-static\.svg/.test(svg) && !/case study/i.test(svg)) {
	fail('A3: favicon path appears outside case-study framing');
}
const universalLeak = /web-foundations\/docs\/assets\/icons\/fava-mark-static/;
if (universalLeak.test(svg) || universalLeak.test(rive)) fail('A3: repo-specific icon path in skill body');

// A4 — Codex adapters synchronized in substance
if (!/Verified \(X7/i.test(cRive) || !/Verified \(X7/i.test(cSvg)) fail('A4: Codex adapters not verified');
if (!cRive.includes('/Users/ruvebal/src/.cursor/skills/rive-animascript-3d/SKILL.md')) {
	fail('A4: Codex rive adapter missing canonical path');
}
if (!cSvg.includes('/Users/ruvebal/src/.cursor/skills/svg-to-rive-3d/SKILL.md')) {
	fail('A4: Codex svg adapter missing canonical path');
}
for (const [label, dir] of [
	['codex rive refs', `${codexRive}/references`],
	['codex svg refs', `${codexSvg}/references`],
]) {
	if (!existsSync(dir) || readdirSync(dir).length === 0) fail(`A4: missing ${label}`);
}
if (!/rive-animascript-3d/.test(canvas) || !/svg-to-rive-3d/.test(canvas)) {
	fail('A4: canvas-25d-content-hero missing routing to both true-3D skills');
}

// A5 — ownership evidence on each root
if (!existsSync(`${studioRive}/PROMOTION-RECEIPT.json`)) fail('A5: missing studio rive PROMOTION-RECEIPT.json');
if (!existsSync(`${studioSvg}/PROMOTION-RECEIPT.json`)) fail('A5: missing studio svg PROMOTION-RECEIPT.json');
const receipt = JSON.parse(read(`${studioRive}/PROMOTION-RECEIPT.json`));
if (receipt.status !== 'verified') fail('A5: rive receipt not verified');

// A6 precursor — gh can see a PR (exit gate also calls gh pr view)
const pr = spawnSync('gh', ['pr', 'view', '--json', 'number,url,title'], { encoding: 'utf8' });
if (pr.status !== 0) {
	// Allow verify script to run before PR exists during drafting; exit gate enforces A6.
	console.log('WARN A6: gh pr view not available yet (exit gate will require it)');
} else {
	console.log(`PASS A6 precursor: ${pr.stdout.trim()}`);
}

console.log('PASS skill promotion: A1–A5 skill surfaces + Codex sync');
process.exit(0);
