#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const web = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const repo = resolve(web, '..');
const pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');
const evidenceDir = resolve(pack, 'baseline/X10');
const riveProject = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d');
const mode = process.argv[2];
if (!['before', 'after'].includes(mode)) {
	console.error('Usage: node capture-x10-front-phase.mjs before|after');
	process.exit(2);
}

const sourceFiles = [
	'web-foundations/docs/assets/icons/fava-mark-static.svg',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/choreo.as',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/canonical-favicon.wgsl',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/pick.as',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/main.as',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/rive.yaml',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/generated/favicon/manifest.json',
	'web-foundations/docs/assets/animations/fava/rive/animascript-3d/generated/favicon/geometry.json',
];
const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const files = Object.fromEntries(
	sourceFiles.map((relative) => [relative, sha256(readFileSync(resolve(repo, relative)))]),
);
const rivePath = realpathSync('/opt/homebrew/bin/rive');
const cliVersion = spawnSync(rivePath, ['--version'], { encoding: 'utf8' });
if (cliVersion.status !== 0) throw new Error(`rive --version failed: ${cliVersion.stderr}`);

const modeDir = resolve(evidenceDir, mode);
mkdirSync(modeDir, { recursive: true });
const shots = [
	['p00', null],
	['p10', '900ms'],
	['p12', '180ms'],
	['p15', '270ms'],
	['p20', '450ms'],
	['p30', '900ms'],
	['p42', '1080ms'],
	['p72', '2700ms'],
];
const commands = [];
for (const [phase, advance] of shots) {
	if (advance) commands.push(`advance ${advance}`);
	commands.push(`screenshot ${resolve(modeDir, `${phase}.png`)}`);
}
commands.push('quit');
const commandInput = `${commands.join('\n')}\n`;
const run = spawnSync(rivePath, ['.', '--commands', '--viewport=720x480'], {
	cwd: riveProject,
	input: commandInput,
	encoding: 'utf8',
	timeout: 120_000,
});
if (run.error) throw run.error;
if (run.status !== 0 || /\berr (?:advance|screenshot)\b/.test(run.stdout)) {
	throw new Error(`Rive capture failed (exit ${run.status}):\n${run.stdout}\n${run.stderr}`);
}

const captures = shots.map(([phase]) => {
	const abs = resolve(modeDir, `${phase}.png`);
	if (!existsSync(abs)) throw new Error(`missing Rive capture ${abs}`);
	const png = readFileSync(abs);
	if (png.readUInt32BE(16) !== 720 || png.readUInt32BE(20) !== 480) {
		throw new Error(`${phase} capture is not 720x480`);
	}
	return {
		phase: Number(phase.slice(1)) / 100,
		path: abs.slice(repo.length + 1),
		sha256: sha256(png),
		viewport: '720x480',
	};
});

const session = {
	mode,
	capturedAt: new Date().toISOString(),
	viewport: '720x480',
	cli: {
		path: rivePath,
		version: cliVersion.stdout.trim(),
		sha256: sha256(readFileSync(rivePath)),
	},
	sourceSha256: files,
	command: `rive . --commands --viewport=720x480`,
	commandInput,
	exitCode: run.status,
	stdout: run.stdout,
	stderr: run.stderr,
	captures,
};
const sessionRel = `frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/baseline/X10/${mode}/capture-receipt.json`;
writeFileSync(resolve(repo, sessionRel), `${JSON.stringify(session, null, 2)}\n`);

const manifestPath = resolve(evidenceDir, 'front-phase-manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {
	schema: 'canonical-favicon-rive-3d/x10-front-phase/v1',
	viewport: '720x480',
	phases: [0.1, 0.12, 0.15, 0.2, 0.3],
	sessions: {},
};
manifest.sessions[mode] = {
	receipt: sessionRel,
	receiptSha256: sha256(readFileSync(resolve(repo, sessionRel))),
	cli: session.cli,
	sourceSha256: files,
	captures,
};
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`PASS X10 ${mode}: ${captures.length} deterministic Rive captures at 720x480`);
console.log(`CLI: ${session.cli.version}; binary sha256 ${session.cli.sha256}`);
console.log(`transcript: ${sessionRel}`);
console.log(run.stdout.trim());
