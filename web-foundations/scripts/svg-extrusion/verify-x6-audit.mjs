#!/usr/bin/env node
// X6 full-stack audit: dual-fixture rebuild, N-driven pack, existing verifiers, lesson claims.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');
const outDir = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d/build/x6-audit');
const args = process.argv.slice(2);
const only = args.includes('--id') ? args[args.indexOf('--id') + 1] : null;
const writeArtifacts = !args.includes('--no-write');

function fail(msg) {
	console.error(`FAIL: ${msg}`);
	process.exit(1);
}
function sh(cmd, argv, opts = {}) {
	const r = spawnSync(cmd, argv, { encoding: 'utf8', cwd: opts.cwd || web, env: opts.env || process.env });
	if (r.status !== 0) fail(`${cmd} ${argv.join(' ')} failed\n${r.stdout}\n${r.stderr}`);
	return r;
}
function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}

mkdirSync(outDir, { recursive: true });
const config = resolve(web, 'scripts/svg-extrusion/fixtures/config.json');
const favicon = resolve(web, 'docs/assets/icons/fava-mark-static.svg');
const synthetic = resolve(web, 'scripts/svg-extrusion/fixtures/concave-cubic.svg');
const favOut = resolve(outDir, 'favicon');
const synOut = resolve(outDir, 'synthetic-n2');
const packFav = resolve(outDir, 'pack-favicon');
const packSyn = resolve(outDir, 'pack-synthetic');

const checks = {
	A1() {
		rmSync(favOut, { recursive: true, force: true });
		rmSync(synOut, { recursive: true, force: true });
		sh(process.execPath, [
			'scripts/svg-extrusion/cli.mjs',
			'--input',
			favicon,
			'--output',
			favOut,
			'--config',
			config,
		]);
		sh(process.execPath, [
			'scripts/svg-extrusion/cli.mjs',
			'--input',
			synthetic,
			'--output',
			synOut,
			'--config',
			config,
		]);
		const favMan = JSON.parse(readFileSync(resolve(favOut, 'manifest.json'), 'utf8'));
		const synMan = JSON.parse(readFileSync(resolve(synOut, 'manifest.json'), 'utf8'));
		if (favMan.facetCount !== 13) fail(`A1: favicon N=${favMan.facetCount}`);
		if (synMan.facetCount !== 2) fail(`A1: synthetic N=${synMan.facetCount}`);
		if (favMan.facetCount === synMan.facetCount) fail('A1: fixtures must differ in N');
		const rebuild = {
			favicon: { n: favMan.facetCount, manifestSha256: sha256(resolve(favOut, 'manifest.json')) },
			synthetic: { n: synMan.facetCount, manifestSha256: sha256(resolve(synOut, 'manifest.json')) },
			cli: 'node scripts/svg-extrusion/cli.mjs --input <svg> --output <dir> --config scripts/svg-extrusion/fixtures/config.json',
		};
		writeFileSync(resolve(outDir, 'rebuild-transcript.json'), `${JSON.stringify(rebuild, null, 2)}\n`);
		return rebuild;
	},
	A2() {
		sh(process.execPath, ['scripts/svg-extrusion/test.mjs']);
		const riveProj = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
		sh('rive', [riveProj, '--verify']);
		sh('rive', [riveProj, '--test']);
		const bench = sh('rive', [riveProj, '--bench=300']);
		const build = sh('pnpm', ['build'], {
			env: {
				...process.env,
				PATH: `/Users/ruvebal/.rbenv/shims:${process.env.PATH || ''}`,
				RBENV_VERSION: '3.3.11',
				BUNDLE_PATH: 'vendor/bundle',
			},
		});
		return {
			compilerTests: true,
			riveVerify: true,
			riveTest: true,
			riveBench: true,
			jekyllBuild: true,
			benchTail: String(bench.stdout || '').trim().split('\n').slice(-3),
			buildOk: build.status === 0,
		};
	},
	A3() {
		// Pack both fixtures; prove packer follows each N with no favicon capacity hard-code.
		mkdirSync(packFav, { recursive: true });
		mkdirSync(packSyn, { recursive: true });
		sh(process.execPath, [
			'scripts/svg-extrusion/pack-rive-mesh.mjs',
			resolve(favOut, 'geometry.json'),
			resolve(favOut, 'manifest.json'),
			packFav,
		]);
		sh(process.execPath, [
			'scripts/svg-extrusion/pack-rive-mesh.mjs',
			resolve(synOut, 'geometry.json'),
			resolve(synOut, 'manifest.json'),
			packSyn,
		]);
		const meshFav = readFileSync(resolve(packFav, 'favicon_mesh.as'), 'utf8');
		const meshSyn = readFileSync(resolve(packSyn, 'favicon_mesh.as'), 'utf8');
		const nFav = Number((meshFav.match(/FACET_COUNT:\s*u32\s*=\s*(\d+)/) || [])[1]);
		const nSyn = Number((meshSyn.match(/FACET_COUNT:\s*u32\s*=\s*(\d+)/) || [])[1]);
		if (nFav !== 13 || nSyn !== 2) fail(`A3: packed FACET_COUNT fav=${nFav} syn=${nSyn}`);
		// Existing GPU/picking contracts (D4 depth mapping + D19 picker).
		sh(process.execPath, ['scripts/svg-extrusion/verify-fidelity.mjs']);
		sh(process.execPath, ['scripts/svg-extrusion/verify-picking.mjs', '--all-fixtures']);
		return { packedFacetCounts: { favicon: nFav, synthetic: nSyn }, d4Fidelity: true, d19Picking: true };
	},
	A4() {
		const lesson = resolve(web, 'docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.md');
		const text = readFileSync(lesson, 'utf8');
		const claims = [
			{ id: 'sample-clock', re: /sample clock|AudioProcessor/i, evidence: 'hum.as + verify-x5 A11' },
			{ id: 'n13-fixture', re: /N = 13|N=13/, evidence: 'favicon manifest facetCount=13' },
			{ id: 'pending-pr', re: /pending/i, evidence: 'rive_3d_provenance.yml pending rows' },
			{ id: 'd4-engineering', re: /engineering derivation|D4/, evidence: 'compiler depth formula + test.mjs' },
			{ id: 'x3pick-host', re: /x3pick/, evidence: 'verify-rive-3d-host / verify-picking' },
		];
		const resolved = [];
		for (const c of claims) {
			if (!c.re.test(text)) fail(`A4: lesson missing claim ${c.id}`);
			resolved.push({ id: c.id, evidence: c.evidence });
		}
		const matrix = {
			fidelity: 'verify-fidelity.mjs A1–A8',
			interaction: 'verify-picking.mjs A1–A11 + host A1',
			accessibility: 'host semantic facet buttons + reduced-motion stills (X4 A4)',
			responsive: 'host A3 320/768/1280',
			fallback: 'host A4/A5 stills',
			performance: 'rive --bench=300 (A2)',
		};
		writeFileSync(resolve(outDir, 'audit-matrix.json'), `${JSON.stringify(matrix, null, 2)}\n`);
		writeFileSync(resolve(outDir, 'lesson-claims.json'), `${JSON.stringify(resolved, null, 2)}\n`);
		return { claims: resolved.length, matrixKeys: Object.keys(matrix) };
	},
	A5() {
		const candidates = {
			reusable: [
				'SVG subset → indexed extrusion compiler with data-driven facetCount N',
				'D4 area→depth mapping as an engineering contract with fixture proofs',
				'D19 CPU picker agreeing with GPU depth under animated transforms',
				'AnimaScript AudioProcessor ownership of the audible sample clock (CLI --render-audio honesty)',
				'Host semantics consuming scene pick events; stills for reduced-motion/failure',
				'Append-only provenance with explicit pending PR/merge rows',
			],
			webAtelierSpecific: [
				'fava-mark-static.svg golden fixture and course palette fills',
				'GitHub Pages demo card paths under svg-master-session',
				'Jekyll lesson layout and lessons.yml indexing',
				'Studio cascade pack paths under frontend-pedagogy/DEV_PLAN',
			],
		};
		const md = [
			'# X6 promotion candidates (pre-review)',
			'',
			'## Reusable (eligible for X7 skill promotion)',
			...candidates.reusable.map((x) => `- ${x}`),
			'',
			'## Web Atelier–specific (do not promote as skill rules)',
			...candidates.webAtelierSpecific.map((x) => `- ${x}`),
			'',
		].join('\n');
		writeFileSync(resolve(pack, 'PHASE-X6-PROMOTION-CANDIDATES.md'), md);
		writeFileSync(resolve(outDir, 'promotion-candidates.json'), `${JSON.stringify(candidates, null, 2)}\n`);
		return {
			reusable: candidates.reusable.length,
			webAtelierSpecific: candidates.webAtelierSpecific.length,
		};
	},
};

// A3/A4 depend on A1 outputs when running --all
const ids = only ? [only] : ['A1', 'A2', 'A3', 'A4', 'A5'];
if (only && !checks[only]) fail(`unknown id ${only}`);
if (only === 'A3' || only === 'A4') {
	if (!existsSync(resolve(favOut, 'manifest.json'))) checks.A1();
}

for (const id of ids) {
	const observed = checks[id]();
	const artifact = { id, status: 'PASS', observed };
	if (writeArtifacts) writeFileSync(resolve(outDir, `${id}.json`), `${JSON.stringify(artifact, null, 2)}\n`);
	console.log(`PASS ${id}: ${JSON.stringify(observed)}`);
}
console.log(`ALL PASS: ${ids.join(', ')}`);
process.exit(0);
