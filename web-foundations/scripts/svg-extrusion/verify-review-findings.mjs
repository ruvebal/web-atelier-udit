#!/usr/bin/env node
// Parse PHASE-Xn-COLD-REVIEW.md JSON and validate promotion evidence R1–R2.
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const phase = process.argv[2];
const packRoot = resolve(process.argv[3] || resolve(repoRoot, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D'));
const evidencePath = resolve(process.argv[4] || resolve(packRoot, `PHASE-${phase}-PROMOTION-EVIDENCE.json`));

function fail(msg) {
	console.error(`FAIL: ${msg}`);
	process.exit(1);
}
function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}
function resolveArtifact(relativePath, label) {
	const path = resolve(repoRoot, relativePath);
	if (path !== repoRoot && !path.startsWith(repoRoot + sep)) fail(`${label}: escapes repo`);
	if (!existsSync(path)) fail(`${label}: missing ${relativePath}`);
	const canon = realpathSync(path);
	if (canon !== repoRoot && !canon.startsWith(repoRoot + sep)) fail(`${label}: resolves outside repo`);
	return canon;
}

if (!phase || !/^X\d+$/.test(phase)) fail('usage: verify-review-findings.mjs X6 <pack> <promotion-evidence.json>');

const reviewPath = resolve(packRoot, `PHASE-${phase}-COLD-REVIEW.md`);
const reviewMd = readFileSync(reviewPath, 'utf8');
const jsonMatch = reviewMd.match(/```json\s*([\s\S]*?)```/);
if (!jsonMatch) fail('cold review missing Raw JSON fence');
let review;
try {
	review = JSON.parse(jsonMatch[1]);
} catch (e) {
	fail(`cold review JSON parse: ${e.message}`);
}

const findings = Array.isArray(review.findings) ? review.findings : [];
const openBlocking = findings.filter((f) => {
	const sev = String(f.severity || '').toUpperCase();
	const blocking = f.blocking === true || f.blocking === 'true';
	const status = String(f.status || '').toUpperCase();
	if (status === 'PASS' || status === 'CLOSED' || status === 'RESOLVED') return false;
	return blocking && (sev === 'P0' || sev === 'P1');
});
if (openBlocking.length) {
	fail(`open blocking findings: ${openBlocking.map((f) => f.id).join(', ')}`);
}

const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
if (evidence.phase !== phase) fail(`evidence phase must be ${phase}`);
if (evidence.reportStatus !== 'VERIFYING' && evidence.reportStatus !== 'PROMOTING') {
	fail('promotion evidence reportStatus must be VERIFYING or PROMOTING');
}
const expectedIds = ['R1', 'R2'];
const observedIds = (evidence.items || []).map((i) => i.id);
if (JSON.stringify(observedIds) !== JSON.stringify(expectedIds)) {
	fail(`expected [${expectedIds}], got [${observedIds}]`);
}

for (const item of evidence.items) {
	for (const field of ['id', 'status', 'command', 'exitCode', 'artifact', 'sha256', 'expected', 'observed', 'commandTranscript']) {
		if (!(field in item)) fail(`${item.id}: missing ${field}`);
	}
	if (item.status !== 'PASS' || item.exitCode !== 0) fail(`${item.id}: must PASS with exit 0`);
	const art = resolveArtifact(item.artifact, item.id);
	if (sha256(art) !== item.sha256) fail(`${item.id}: artifact digest mismatch`);
	const tp = resolveArtifact(item.commandTranscript.path, `${item.id} transcript`);
	if (sha256(tp) !== item.commandTranscript.sha256) fail(`${item.id}: transcript digest mismatch`);
	const transcript = JSON.parse(readFileSync(tp, 'utf8'));
	if (transcript.acceptanceId !== item.id || transcript.exitCode !== 0) fail(`${item.id}: bad transcript`);
	if (!String(transcript.stdout).includes(`PASS ${item.id}:`)) fail(`${item.id}: transcript missing PASS line`);
}

if (!existsSync(resolve(packRoot, `PHASE-${phase}-PROMOTION-CANDIDATES.md`))) {
	fail('missing PHASE-X6-PROMOTION-CANDIDATES.md for R2');
}

console.log(`PASS ${phase} promotion: no open P0/P1; R1–R2 evidence OK (${findings.length} review rows, ${openBlocking.length} blocking)`);
process.exit(0);
