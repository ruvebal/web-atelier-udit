#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { X0_ASSERTION_IDS, assertX0Acceptance } from './x0-semantic-assertions.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const defaultPackRoot = resolve(repoRoot, 'frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D');

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function resolveArtifact(relativePath, label) {
  if (typeof relativePath !== 'string' || relativePath.length === 0) {
    throw new Error(`${label}: artifact path must be a non-empty repo-relative string`);
  }
  const path = resolve(repoRoot, relativePath);
  if (path !== repoRoot && !path.startsWith(repoRoot + sep)) {
    throw new Error(`${label}: artifact escapes repository root`);
  }
  if (!existsSync(path)) throw new Error(`${label}: missing artifact ${relativePath}`);
  const canonicalPath = realpathSync(path);
  if (canonicalPath !== repoRoot && !canonicalPath.startsWith(repoRoot + sep)) {
    throw new Error(`${label}: artifact resolves outside repository root`);
  }
  return canonicalPath;
}

function acceptanceIds(markdown, phase) {
  const heading = /^## Acceptance[ \t]*\r?\n/m.exec(markdown);
  if (!heading) throw new Error(`${phase}: runbook has no ## Acceptance section`);
  const bodyStart = heading.index + heading[0].length;
  const body = markdown.slice(bodyStart);
  const nextHeading = /^## [^\n]*$/m.exec(body);
  const sectionBody = body.slice(0, nextHeading?.index ?? body.length);
  return [...sectionBody.matchAll(/\*\*(A\d+)\*\*/g)].map((match) => match[1]);
}

function hasPending(value, location = '$') {
  if (typeof value === 'string' && /\bpending\b/i.test(value)) return location;
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const found = hasPending(item, `${location}[${index}]`);
      if (found) return found;
    }
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      const found = hasPending(item, `${location}.${key}`);
      if (found) return found;
    }
  }
  return null;
}

function validateVisualReview(review, id) {
  if (review === undefined) return;
  if (!review || typeof review !== 'object') throw new Error(`${id}: visualReview must be an object`);
  for (const field of ['reviewer', 'decision']) {
    if (typeof review[field] !== 'string' || !review[field].trim()) {
      throw new Error(`${id}: visualReview.${field} is required`);
    }
  }
  const captures = review.captures ?? [review];
  if (!Array.isArray(captures) || captures.length === 0) {
    throw new Error(`${id}: visualReview must name at least one capture`);
  }
  for (const [index, capture] of captures.entries()) {
    for (const field of ['path', 'sha256', 'viewport']) {
      if (typeof capture[field] !== 'string' || !capture[field].trim()) {
        throw new Error(`${id}: visualReview.captures[${index}].${field} is required`);
      }
    }
    const path = resolveArtifact(capture.path, `${id} visual capture`);
    if (sha256(path) !== capture.sha256) {
      throw new Error(`${id}: visual capture digest mismatch for ${capture.path}`);
    }
  }
}

const phase = process.argv[2];
if (!phase || !/^X\d+$/.test(phase)) {
  console.error('Usage: verify-phase-evidence.mjs X0');
  process.exit(2);
}

try {
  const suppliedPackRoot = process.argv[3] ? resolve(process.argv[3]) : defaultPackRoot;
  if (suppliedPackRoot !== repoRoot && !suppliedPackRoot.startsWith(repoRoot + sep)) {
    throw new Error('pack directory must remain inside repository root');
  }
  const packRoot = suppliedPackRoot;
  const runbookPath = resolve(packRoot, `PHASE-${phase}.md`);
  const evidencePath = resolve(packRoot, `PHASE-${phase}-EVIDENCE.json`);
  const expectedIds = acceptanceIds(readFileSync(runbookPath, 'utf8'), phase);
  const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'));
  if (evidence.phase !== phase) throw new Error(`evidence phase must be ${phase}`);
  if (evidence.reportStatus !== 'VERIFYING') throw new Error('reportStatus must be VERIFYING');
  if (!Array.isArray(evidence.items)) throw new Error('items must be an array');
  const observedIds = evidence.items.map((item) => item?.id);
  if (new Set(observedIds).size !== observedIds.length) throw new Error('duplicate acceptance IDs');
  if (JSON.stringify(observedIds) !== JSON.stringify(expectedIds)) {
    throw new Error(`acceptance IDs mismatch: expected [${expectedIds}], observed [${observedIds}]`);
  }
  for (const item of evidence.items) {
    const label = item.id;
    for (const field of ['id', 'status', 'command', 'exitCode', 'artifact', 'sha256', 'expected', 'observed']) {
      if (!(field in item)) throw new Error(`${label}: missing ${field}`);
    }
    if (item.status !== 'PASS') throw new Error(`${label}: status must be PASS`);
    if (typeof item.command !== 'string' || !item.command.trim()) throw new Error(`${label}: command is required`);
    if (item.exitCode !== 0) throw new Error(`${label}: command exitCode must be 0`);
    if (typeof item.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(item.sha256)) {
      throw new Error(`${label}: sha256 must be lowercase hex`);
    }
    if (item.expected === undefined || item.observed === undefined) {
      throw new Error(`${label}: expected and observed are required`);
    }
    if (!item.expected || !item.observed || typeof item.expected !== 'object' || typeof item.observed !== 'object') {
      throw new Error(`${label}: expected/observed must contain machine-readable assertion objects`);
    }
    const requiredAssertions = X0_ASSERTION_IDS[label];
    if (phase === 'X0' && (!requiredAssertions || JSON.stringify(item.expected.assertions) !== JSON.stringify(requiredAssertions) || JSON.stringify(item.observed.assertions) !== JSON.stringify(requiredAssertions))) {
      throw new Error(`${label}: prose-only or incomplete semantic assertion claims`);
    }
    const unresolved = hasPending({ expected: item.expected, observed: item.observed });
    if (unresolved) throw new Error(`${label}: unresolved pending value at ${unresolved}`);
    const artifact = resolveArtifact(item.artifact, label);
    if (sha256(artifact) !== item.sha256) throw new Error(`${label}: digest mismatch for ${item.artifact}`);
    if (!item.commandTranscript || typeof item.commandTranscript !== 'object') {
      throw new Error(`${label}: immutable command transcript is required`);
    }
    const transcriptPath = resolveArtifact(item.commandTranscript.path, `${label} command transcript`);
    if (sha256(transcriptPath) !== item.commandTranscript.sha256) throw new Error(`${label}: command transcript digest mismatch`);
    const transcript = JSON.parse(readFileSync(transcriptPath, 'utf8'));
    if (transcript.acceptanceId !== label || transcript.command !== item.command || transcript.exitCode !== 0 || item.exitCode !== transcript.exitCode) {
      throw new Error(`${label}: command transcript does not prove the receipt command succeeded`);
    }
    if (typeof transcript.stdout !== 'string' || transcript.stderr !== '') {
      throw new Error(`${label}: command transcript stdout/stderr is malformed`);
    }
    if (label !== 'A4' && !transcript.stdout.includes(`PASS ${label}:`)) {
      throw new Error(`${label}: command transcript has no acceptance PASS output`);
    }
    if (phase === 'X0') {
      const semanticResult = assertX0Acceptance(label, repoRoot);
      if (typeof item.observed.summary !== 'string' || !item.observed.summary.trim()) throw new Error(`${label}: observed semantic summary is required`);
      if (!semanticResult.startsWith(`PASS ${label}:`)) throw new Error(`${label}: semantic assertion did not pass`);
    }
    validateVisualReview(item.visualReview, label);
  }
  console.log(`PASS ${phase}: ${expectedIds.length} acceptance items match ${runbookPath}`);
} catch (error) {
  fail(error.message);
}
