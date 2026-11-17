#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');
const manifestPath = resolve(pack, 'baseline/X10/front-phase-manifest.json');
const phases = ['p00', 'p10', 'p12', 'p15', 'p20', 'p30', 'p42', 'p72'];
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

function fail(message) {
	console.error(`FAIL X10: ${message}`);
	process.exit(1);
}

function loadSession(mode) {
	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
	const sessionInfo = manifest.sessions?.[mode];
	if (!sessionInfo) fail(`front-phase manifest has no ${mode} session`);
	const receiptPath = resolve(repo, sessionInfo.receipt);
	if (!receiptPath.startsWith(repo + sep)) fail(`${mode} receipt escapes the repository`);
	const receiptBytes = readFileSync(receiptPath);
	if (sha256(receiptBytes) !== sessionInfo.receiptSha256) fail(`${mode} receipt digest drift`);
	const receipt = JSON.parse(receiptBytes);
	if (receipt.mode !== mode || receipt.exitCode !== 0 || receipt.viewport !== '720x480') {
		fail(`${mode} receipt has invalid mode, status, or viewport`);
	}
	if (!(receipt.stdout + receipt.stderr).includes('0 errors, 0 warnings') ||
		/\berr (?:advance|screenshot)\b/.test(receipt.stdout)) {
		fail(`${mode} Rive capture did not build cleanly`);
	}
	const captures = new Map();
	for (const capture of receipt.captures) {
		const path = resolve(repo, capture.path);
		if (!path.startsWith(repo + sep)) fail(`${mode} capture escapes the repository`);
		const bytes = readFileSync(path);
		if (sha256(bytes) !== capture.sha256) fail(`${mode}/${capture.phase} capture digest drift`);
		if (bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a' ||
			bytes.readUInt32BE(16) !== 720 || bytes.readUInt32BE(20) !== 480) {
			fail(`${mode}/${capture.phase} is not a 720x480 PNG`);
		}
		captures.set(`p${String(Math.round(capture.phase * 100)).padStart(2, '0')}`, capture);
	}
	for (const phase of phases) if (!captures.has(phase)) fail(`${mode} is missing ${phase}`);
	return { receipt, captures };
}

const before = loadSession('before');
const after = loadSession('after');
if (before.receipt.cli.sha256 !== after.receipt.cli.sha256 ||
	before.receipt.cli.version !== after.receipt.cli.version) {
	fail('baseline and corrected captures used different Rive runtimes');
}
const imageHash = (session, phase) => session.captures.get(phase).sha256;
const beforeRest = imageHash(before, 'p00');
const afterRest = imageHash(after, 'p00');
if (beforeRest !== afterRest) fail('the corrected phase-zero image changed from baseline');
if (imageHash(before, 'p10') !== beforeRest || imageHash(before, 'p12') !== beforeRest) {
	fail('X9 baseline does not reproduce the clean frontal hold at phases 0.10/0.12');
}
const baselineArtifactPhases = ['p15', 'p20', 'p30'];
for (const phase of baselineArtifactPhases) {
	if (imageHash(before, phase) === beforeRest) fail(`X9 baseline did not reproduce its artifact at ${phase}`);
}
for (const phase of ['p12', 'p15', 'p20', 'p30', 'p42']) {
	if (imageHash(after, phase) !== afterRest) {
		fail(`corrected ${phase} is not pixel-identical to the exact frontal rest capture`);
	}
}
if (imageHash(after, 'p72') === afterRest) fail('phase 0.72 inspect capture did not change from frontal rest');

console.log(`PASS A1: X9 baseline reproduces clean phase 0.10/0.12 and artifacts at 0.15/0.20/0.30; runtime ${before.receipt.cli.version}, viewport 720x480`);
console.log(`PASS A2: corrected phases 0.12/0.15/0.20/0.30 are byte-identical to phase-zero rest; captures ${['p12', 'p15', 'p20', 'p30'].map((p) => `${p}=${imageHash(after, p)}`).join(' ')}`);
console.log(`PASS A4: phase-zero capture is unchanged and phase 0.72 inspect capture is distinct; inspect=${imageHash(after, 'p72')}`);
