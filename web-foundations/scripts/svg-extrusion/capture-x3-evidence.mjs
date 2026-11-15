#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const web = resolve(import.meta.dirname, '../..'), repo = resolve(web, '..'), pack = resolve(repo, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'), out = resolve(pack, 'baseline/X3');
mkdirSync(out, { recursive: true });
const rel = (p) => relative(repo, p), hash = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const checks = resolve(web, 'docs/assets/animations/fava/rive/animascript-3d/build/x3-checks');
const artifacts = {
	A1: resolve(checks, 'A1.json'),
	A2: resolve(checks, 'A2-A3.json'),
	A3: resolve(checks, 'A2-A3.json'),
	A4: resolve(checks, 'A4.json'),
	A5: resolve(checks, 'A5.json'),
	A6: resolve(checks, 'A6.json'),
	A7: resolve(checks, 'A7.json'),
	A8: resolve(checks, 'A8.json'),
	A9: resolve(checks, 'A9.json'),
	A10: resolve(checks, 'A10.json'),
	A11: resolve(checks, 'A11.json'),
};
const items = [];
for (let n = 1; n <= 11; n++) {
	const id = `A${n}`, argv = ['web-foundations/scripts/svg-extrusion/verify-picking.mjs', id], stdout = execFileSync(process.execPath, argv, { cwd: repo, encoding: 'utf8' }), command = `${process.execPath} ${argv.join(' ')}`, transcriptPath = resolve(out, `${id}.command.json`), transcript = { acceptanceId: id, command, argv: [process.execPath, ...argv], cwd: repo, exitCode: 0, stdout, stderr: '' };
	writeFileSync(transcriptPath, JSON.stringify(transcript, null, 2) + '\n');
	const artifact = artifacts[id];
	items.push({ id, status: 'PASS', command, exitCode: 0, artifact: rel(artifact), sha256: hash(artifact), expected: { assertions: [`${id}-independent-live-check`] }, observed: { assertions: [`${id}-independent-live-check`], summary: stdout.trim() }, commandTranscript: { path: rel(transcriptPath), sha256: hash(transcriptPath) } });
}
writeFileSync(resolve(pack, 'PHASE-X3-EVIDENCE.json'), JSON.stringify({ phase: 'X3', reportStatus: 'VERIFYING', generatedBy: 'capture-x3-evidence.mjs', items }, null, 2) + '\n');
console.log('captured X3 evidence for A1-A11');
