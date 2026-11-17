#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const riveProject = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const phase = process.argv[2];
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function fail(message) {
	console.error(`FAIL X10 ${phase}: ${message}`);
	process.exit(1);
}

function run(command, args, cwd, env = process.env) {
	const result = spawnSync(command, args, { cwd, env, encoding: 'utf8', timeout: 240_000 });
	if (result.error) throw result.error;
	const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
	if (result.status !== 0) fail(`${command} ${args.join(' ')} exited ${result.status}\n${output}`);
	return output;
}

if (phase === 'A3') {
	const testOutput = run('rive', ['.', '--test'], riveProject);
	if (!testOutput.includes('PASS early staggered extrusion keeps the camera exactly frontal') ||
		!testOutput.includes('23/23 passed')) {
		fail('the corrected early-extrusion regression did not pass in the Rive test suite');
	}
	const log = readFileSync(resolve(riveProject, 'build/rive.log'), 'utf8');
	for (const marker of [
		'FAIL early staggered extrusion keeps the camera exactly frontal',
		'22/23 passed',
		'0.241664',
		'0.808704',
	]) {
		if (!log.includes(marker)) fail(`X9-parent regression evidence is missing ${marker}`);
	}
	process.stdout.write(testOutput);
	console.log('PASS A3: corrected regression passes 23/23; retained X9-parent run failed 22/23 at inspect weights 0.241664 and 0.808704');
} else if (phase === 'A5') {
	const publishReceiptPath = resolve(
		repo,
		'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/publish-receipt.json',
	);
	const publishReceipt = JSON.parse(readFileSync(publishReceiptPath, 'utf8'));
	const relativeAsset = 'assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv';
	const sourceAsset = resolve(web, 'docs', relativeAsset);
	const builtAsset = resolve(web, '_site', relativeAsset);
	const sourceDigest = sha256(readFileSync(sourceAsset));
	const builtDigest = sha256(readFileSync(builtAsset));
	if (publishReceipt.exitCode !== 0 || publishReceipt.signedScripts < 1 ||
		publishReceipt.errors !== 0 || publishReceipt.warnings !== 0 ||
		publishReceipt.assetSha256 !== sourceDigest) {
		fail('the recorded local publish does not prove a signed, clean export matching the current .riv');
	}
	if (sourceDigest !== builtDigest) fail('the built site .riv differs from the signed project asset');

	const hostPath = 'docs/assets/js/favicon-motion/rive-3d-host.js';
	const builtHostPath = resolve(web, '_site/assets/js/favicon-motion/rive-3d-host.js');
	const host = readFileSync(resolve(web, hostPath), 'utf8');
	const builtHost = readFileSync(builtHostPath, 'utf8');
	const hostContract = 'src: `${sceneBase}build/fava_prismatic_3d.riv`';
	if (!host.includes(hostContract) || !builtHost.includes(hostContract)) {
		fail('source or published host does not select fava_prismatic_3d.riv');
	}
	const demoPath = 'docs/lessons/en/web-animations/svg-master-session/demo/index.html';
	const builtDemo = readFileSync(
		resolve(web, '_site/lessons/en/web-animations/svg-master-session/demo/index.html'),
		'utf8',
	);
	if (!builtDemo.includes(`/web-atelier-udit/${relativeAsset}`) ||
		!builtDemo.includes('/web-atelier-udit/assets/js/favicon-motion/rive-3d-host.js') ||
		!builtDemo.includes('const authoredBase = "/web-atelier-udit/assets/animations/fava/";')) {
		fail('published demo does not link to the signed asset and Rive host');
	}
	console.log(`PASS A5: signed publish receipt, source/published host selection, and byte-identical built .riv verified; sha256=${builtDigest}`);
} else if (phase === 'A6') {
	const output = [];
	output.push(run('rive', ['.', '--verify'], riveProject));
	output.push(run('rive', ['.', '--test'], riveProject));
	output.push(run(process.execPath, ['scripts/svg-extrusion/verify-x10-front-phase.mjs'], web));
	output.push(run(process.execPath, ['scripts/svg-extrusion/verify-picking.mjs', '--all-fixtures'], web));
	const siteEnv = {
		...process.env,
		PATH: `/Users/ruvebal/.rbenv/shims:${process.env.PATH ?? ''}`,
		RBENV_VERSION: '3.3.11',
		BUNDLE_PATH: 'vendor/bundle',
	};
	output.push(run('pnpm', ['build'], web, siteEnv));
	const combined = output.join('\n');
	if (!combined.includes('0 errors, 0 warnings') ||
		!combined.includes('23/23 passed') ||
		!combined.includes('PASS A12:') ||
		!combined.includes('Publication safety passed') ||
		!combined.includes('Citation conformance passed')) {
		fail('one or more required runtime, picking, or publication assertions are absent');
	}
	process.stdout.write(combined);
	console.log('PASS A6: Rive verify/test, X10 frame verification, all 12 picking fixtures, Web Foundations build, publication, and citation checks passed');
} else if (phase === 'A7') {
	const output = run(
		process.execPath,
		['scripts/svg-extrusion/verify-phase-evidence.mjs', 'X10', '../frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'],
		web,
	);
	process.stdout.write(output);
	console.log('PASS A7: PHASE-X10-EVIDENCE.json validates against all seven runbook acceptance IDs');
} else {
	console.error('Usage: node verify-x10-acceptance.mjs A3|A5|A6|A7');
	process.exit(2);
}
