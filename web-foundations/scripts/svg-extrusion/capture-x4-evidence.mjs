#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
const web = resolve(import.meta.dirname, '../..'),
	repo = resolve(web, '..'),
	pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'),
	out = resolve(pack, 'baseline/X4');
mkdirSync(out, { recursive: true });
const rel = (p) => relative(repo, p),
	hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const checks = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d/build/x4-checks');
const artifacts = {
	A1: resolve(checks, 'A1.json'),
	A2: resolve(checks, 'A2.json'),
	A3: resolve(checks, 'A3.json'),
	A4: resolve(checks, 'A4.json'),
	A5: resolve(checks, 'A5.json'),
	A6: resolve(checks, 'A6.json'),
};
const items = [];
for (let n = 1; n <= 6; n++) {
	const id = `A${n}`,
		argv = ['web-foundations/scripts/verify-rive-3d-host.mjs', id];
	const run = spawnSync(process.execPath, argv, { cwd: repo, encoding: 'utf8' });
	const code = run.status ?? 1,
		stdout = run.stdout ?? '',
		stderr = run.stderr ?? '';
	const command = `${process.execPath} ${argv.join(' ')}`,
		transcriptPath = resolve(out, `${id}.command.json`),
		transcript = {
			acceptanceId: id,
			command,
			argv: [process.execPath, ...argv],
			cwd: repo,
			exitCode: code,
			stdout,
			stderr,
		};
	writeFileSync(transcriptPath, JSON.stringify(transcript, null, 2) + '\n');
	if (code !== 0) {
		console.error(`${id} exited ${code}:\n${stdout}\n${stderr}`);
		process.exit(1);
	}
	const artifact = artifacts[id];
	items.push({
		id,
		status: 'PASS',
		command,
		exitCode: 0,
		artifact: rel(artifact),
		sha256: hash(artifact),
		expected: { assertions: [`${id}-independent-live-check`] },
		observed: { assertions: [`${id}-independent-live-check`], summary: stdout.trim() },
		commandTranscript: { path: rel(transcriptPath), sha256: hash(transcriptPath) },
	});
}
writeFileSync(
	resolve(pack, 'PHASE-X4-EVIDENCE.json'),
	JSON.stringify({ phase: 'X4', reportStatus: 'VERIFYING', generatedBy: 'capture-x4-evidence.mjs', items }, null, 2) +
		'\n'
);
console.log('captured X4 evidence for A1-A6');
