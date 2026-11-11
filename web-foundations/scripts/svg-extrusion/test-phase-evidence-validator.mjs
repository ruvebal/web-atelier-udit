#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const pack = resolve(repoRoot, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');
const validator = resolve(repoRoot, 'web-foundations/scripts/svg-extrusion/verify-phase-evidence.mjs');
const sourceReceipt = resolve(pack, 'PHASE-X0-EVIDENCE.json');
const sourceRunbook = resolve(pack, 'PHASE-X0.md');
const root = mkdtempSync(resolve(pack, 'baseline/X0/validator-fixtures-'));
const receiptBase = JSON.parse(readFileSync(sourceReceipt, 'utf8'));
const cases = [
  ['missing-id', /acceptance IDs mismatch/, (x) => { x.items.pop(); }],
  ['extra-id', /acceptance IDs mismatch/, (x) => { x.items.push({ ...x.items.at(-1), id: 'A8' }); }],
  ['bad-digest', /digest mismatch/, (x) => { x.items[0].sha256 = '0'.repeat(64); }],
  ['nonzero-exit', /command exitCode must be 0/, (x) => { x.items[0].exitCode = 1; }],
  ['nonzero-transcript', /command transcript does not prove/, (x, dir) => {
    const item = x.items[0];
    const transcript = JSON.parse(readFileSync(resolve(repoRoot, item.commandTranscript.path), 'utf8'));
    transcript.exitCode = 1;
    const mutatedPath = resolve(dir, 'nonzero-command-transcript.json');
    const bytes = `${JSON.stringify(transcript, null, 2)}\n`;
    writeFileSync(mutatedPath, bytes);
    item.commandTranscript.path = relative(repoRoot, mutatedPath);
    item.commandTranscript.sha256 = createHash('sha256').update(bytes).digest('hex');
  }],
  ['pending-claim', /unresolved pending value/, (x) => { x.items[0].observed.summary = 'pending'; }],
  ['prose-only-claim', /machine-readable assertion objects/, (x) => { x.items[0].observed = 'Everything is fine'; }],
  ['receipt-exit-code-only', /immutable command transcript is required/, (x) => { delete x.items[0].commandTranscript; }],
];
const results = {};
try {
  for (const [name, expectedFailure, mutate] of cases) {
    const dir = resolve(root, name);
    mkdirSync(dir, { recursive: true });
    copyFileSync(sourceRunbook, resolve(dir, 'PHASE-X0.md'));
    const receipt = structuredClone(receiptBase);
    mutate(receipt, dir);
    writeFileSync(resolve(dir, 'PHASE-X0-EVIDENCE.json'), `${JSON.stringify(receipt, null, 2)}\n`);
    const run = spawnSync(process.execPath, [validator, 'X0', dir], { cwd: repoRoot, encoding: 'utf8' });
    if (run.status === 0 || !expectedFailure.test(`${run.stdout}\n${run.stderr}`)) throw new Error(`${name}: validator did not reject for the intended reason: ${run.stdout}\n${run.stderr}`);
    results[name] = 'REJECTED';
  }
  console.log(`PASS A6: rejected ${cases.length} mutated receipt fixtures`);
  const resultPath = resolve(pack, 'baseline/X0/validator-mutation-results.json');
  writeFileSync(resultPath, `${JSON.stringify({ schema: 'x0-validator-mutations/v1', results }, null, 2)}\n`);
} finally {
  rmSync(root, { recursive: true, force: true });
}
