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
const evidenceBase = resolve(pack, 'baseline/X0');
const writeArtifact = (receipt, id, dir, name, value) => {
  const bytes = `${JSON.stringify(value, null, 2)}\n`;
  const path = resolve(dir, name);
  writeFileSync(path, bytes);
  const item = receipt.items.find((candidate) => candidate.id === id);
  item.artifact = relative(repoRoot, path);
  item.sha256 = createHash('sha256').update(bytes).digest('hex');
};
const copyEvidence = (dir, name) => copyFileSync(resolve(evidenceBase, name), resolve(dir, name));
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
  ['falsified-tool-output', /unexpected verified output for Ruby/, (x, dir) => {
    const versions = JSON.parse(readFileSync(resolve(evidenceBase, 'tool-versions.json'), 'utf8'));
    const provenance = JSON.parse(readFileSync(resolve(evidenceBase, 'tool-provenance.json'), 'utf8'));
    const tool = versions.tools.find((item) => item.label === 'Ruby');
    const probe = provenance.probes.find((item) => item.label === 'Ruby');
    tool.stdout = probe.stdout = 'ruby 9.9.9 invented';
    tool.stdoutSha256 = probe.stdoutSha256 = createHash('sha256').update(probe.stdout).digest('hex');
    writeArtifact(x, 'A4', dir, 'tool-versions.json', versions);
    writeFileSync(resolve(dir, 'tool-provenance.json'), `${JSON.stringify(provenance, null, 2)}\n`);
    copyEvidence(dir, 'pnpm-build-command-transcript.json');
  }, true],
  ['missing-browser-provenance', /induced-failure execution provenance is absent/, (x, dir) => {
    copyEvidence(dir, 'route-runtime-metrics.json');
    writeFileSync(resolve(dir, 'browser-failure-command-transcripts.json'), `${JSON.stringify({ schema: 'x0-browser-failure-provenance/v1', sessions: [] }, null, 2)}\n`);
    const index = JSON.parse(readFileSync(resolve(evidenceBase, 'artifact-index.json'), 'utf8'));
    writeArtifact(x, 'A3', dir, 'artifact-index.json', index);
  }, true],
  ['omitted-authoritative-page-member', /page context does not match authoritative membership/, (x, dir) => {
    const contexts = JSON.parse(readFileSync(resolve(evidenceBase, 'research-anchor-page-contexts.json'), 'utf8'));
    const page = contexts.contexts[0].pageContext;
    page.nodes.pop();
    page.nodeCount = page.nodes.length;
    const text = page.nodes.map((node) => `${node.nodeId}\n${node.text}`).join('\n');
    contexts.contexts[0].pageContextTextSha256 = createHash('sha256').update(text).digest('hex');
    writeArtifact(x, 'A7', dir, 'research-anchor-page-contexts.json', contexts);
    copyEvidence(dir, 'research-authoritative-page-membership.json');
    const completed = Object.fromEntries(['missing-id', 'extra-id', 'bad-digest', 'nonzero-exit', 'nonzero-transcript', 'pending-claim', 'prose-only-claim', 'receipt-exit-code-only', 'falsified-tool-output', 'missing-browser-provenance', 'omitted-authoritative-page-member'].map((name) => [name, 'REJECTED']));
    writeFileSync(resolve(dir, 'validator-mutation-results.json'), `${JSON.stringify({ schema: 'x0-validator-mutations/v1', results: completed }, null, 2)}\n`);
  }, true],
];
const results = {};
try {
  for (const [name, expectedFailure, mutate, useOverride = false] of cases) {
    const dir = resolve(root, name);
    mkdirSync(dir, { recursive: true });
    copyFileSync(sourceRunbook, resolve(dir, 'PHASE-X0.md'));
    const receipt = structuredClone(receiptBase);
    mutate(receipt, dir);
    writeFileSync(resolve(dir, 'PHASE-X0-EVIDENCE.json'), `${JSON.stringify(receipt, null, 2)}\n`);
    const run = spawnSync(process.execPath, [validator, 'X0', dir], { cwd: repoRoot, encoding: 'utf8', env: useOverride ? { ...process.env, X0_EVIDENCE_OVERRIDE_BASE: dir } : process.env });
    if (run.status === 0 || !expectedFailure.test(`${run.stdout}\n${run.stderr}`)) throw new Error(`${name}: validator did not reject for the intended reason: ${run.stdout}\n${run.stderr}`);
    results[name] = 'REJECTED';
  }
  console.log(`PASS A6: rejected ${cases.length} mutated receipt fixtures`);
  const resultPath = resolve(pack, 'baseline/X0/validator-mutation-results.json');
  writeFileSync(resultPath, `${JSON.stringify({ schema: 'x0-validator-mutations/v1', results }, null, 2)}\n`);
} finally {
  rmSync(root, { recursive: true, force: true });
}
