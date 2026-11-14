#!/usr/bin/env node
// X4 stills generator. Captures the assembled, fully extruded inspect pose
// (loop phase ~0.435: every facet extruded, zero separation) plus one frame
// per source facet with that facet selected, for the demo's reduced-motion
// semantic controls.
//
// Selection clicks happen at a frontal-ish phase where the facet is actually
// pickable; the shot phase is chosen per facet as the candidate pose with the
// best on-screen, unoccluded coverage (the inspect pose hides some facets).
// Click points and coverage come from the shared host mirror
// (docs/assets/js/favicon-motion/rive-3d-scene.mjs), never from screenshots.
//
// Usage: node capture-x4-stills.mjs
import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRive3DMirror, loopPhase } from '../../docs/assets/js/favicon-motion/rive-3d-scene.mjs';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const RIVE = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const GEN = resolve(RIVE, 'generated/favicon');
const OUT = resolve(RIVE, 'stills');
mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(readFileSync(resolve(GEN, 'manifest.json'), 'utf8'));
const vertices = new Uint8Array(readFileSync(resolve(RIVE, 'favicon-vertices.bin')));
const indices = new Uint8Array(readFileSync(resolve(RIVE, 'favicon-indices.bin')));
const mirror = createRive3DMirror({ manifest, vertices, indices });

const W = 720;
const H = 480;
const FPS = 60;
const LOOP_FRAMES = 9.0 * FPS;
// 235 frames -> elapsed 3.9167 s -> phase 0.4352: every facet extruded,
// zero separation, full inspect camera.
const SHOT_PHASE = 0.4352;
const SHOT_FRAMES = Math.round(SHOT_PHASE * 9.0 * FPS);
if (Math.abs(loopPhase(SHOT_FRAMES / FPS) - SHOT_PHASE) > 0.002) {
	throw new Error(`frame count ${SHOT_FRAMES} lands on phase ${loopPhase(SHOT_FRAMES / FPS)}, expected ${SHOT_PHASE}`);
}
// Frontal-ish click phases, earliest first: less inspect rotation, flatter
// depth ordering, so even small facets keep a pickable front region.
const CLICK_PHASES = [0.12, 0.15, 0.18, 0.22, 0.26, 0.3, 0.34];
// Candidate shot poses, preferred first. Later entries trade the inspect hero
// pose for visibility of facets the hero pose occludes.
const SHOT_PHASES = [0.4352, 0.4, 0.36, 0.98];

function runRive(lines) {
	const script = [...lines, 'quit'].join('\n') + '\n';
	const r = spawnSync('rive', ['.', '--commands'], {
		cwd: RIVE,
		input: script,
		encoding: 'utf8',
		maxBuffer: 64 * 1024 * 1024,
	});
	if (r.error) throw r.error;
	return `${r.stdout ?? ''}\n${r.stderr ?? ''}`;
}

const ZERO = new Uint32Array(8);
const selWords = (facet) => {
	const w = new Uint32Array(8);
	w[facet >> 5] = 1 << (facet & 31);
	return w;
};

// Base assembled still.
runRive([`advance ${SHOT_FRAMES}`, `screenshot ${OUT}/assembled.png`]);

const results = [{ id: 'assembled', phase: SHOT_PHASE, frames: SHOT_FRAMES }];
for (let f = 0; f < mirror.facetCount; f++) {
	let chosen = null;
	for (const phase of CLICK_PHASES) {
		const pt = mirror.solveFacetPoint(f, {
			phase,
			userYaw: 0,
			userPitch: 0,
			cssW: W,
			cssH: H,
			selWords: ZERO,
			phaseWindow: 0.015,
		});
		if (pt) {
			chosen = { phase, pt };
			break;
		}
	}
	if (!chosen) throw new Error(`no pick point for ${mirror.facetId(f)} at any click phase`);
	const clickFrames = Math.round(chosen.phase * 9.0 * FPS);
	// `pointer click` costs 3 ticks (down+move+up); the pick lands on the up
	// tick, two frames after the advance boundary.
	const upPhase = loopPhase((clickFrames + 2) / FPS);
	const check = mirror.pick(upPhase, 0, 0, chosen.pt.x, chosen.pt.y, W, H, ZERO);
	if (check !== f)
		throw new Error(`${mirror.facetId(f)}: mirror pick ${check} != ${f} at up-tick phase ${upPhase.toFixed(4)}`);

	// Choose the shot pose with the best selected-facet coverage.
	let shot = null;
	for (const phase of SHOT_PHASES) {
		const cov = mirror.facetScreenCoverage(f, {
			phase,
			userYaw: 0,
			userPitch: 0,
			cssW: W,
			cssH: H,
			selWords: selWords(f),
		});
		if (cov > 0 && (!shot || cov > shot.cov)) shot = { phase, cov };
	}
	if (!shot) throw new Error(`${mirror.facetId(f)}: facet invisible at every shot phase`);
	let shotFrames = Math.round(shot.phase * 9.0 * FPS);
	while (shotFrames <= clickFrames + 3) shotFrames += LOOP_FRAMES;
	const tail = shotFrames - clickFrames - 3;
	const id = mirror.facetId(f);
	runRive([
		`advance ${clickFrames}`,
		`pointer click@${chosen.pt.x.toFixed(2)},${chosen.pt.y.toFixed(2)}`,
		`advance ${tail}`,
		`screenshot ${OUT}/${id}.png`,
	]);
	results.push({
		id,
		clickPhase: chosen.phase,
		clickFrames,
		x: +chosen.pt.x.toFixed(2),
		y: +chosen.pt.y.toFixed(2),
		shotPhase: shot.phase,
		shotFrames,
		coverage: +shot.cov.toFixed(3),
	});
	console.log(
		`still ${id} click@(${chosen.pt.x.toFixed(1)},${chosen.pt.y.toFixed(1)}) p${chosen.phase} -> shot p${shot.phase} cov=${shot.cov.toFixed(2)}`
	);
}

writeFileSync(
	resolve(OUT, 'stills-manifest.json'),
	JSON.stringify({ basePhase: SHOT_PHASE, baseFrames: SHOT_FRAMES, viewport: [W, H], items: results }, null, 2) + '\n'
);
console.log(`wrote ${results.length} stills to ${OUT}`);
