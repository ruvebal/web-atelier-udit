#!/usr/bin/env node
import { assertX0Acceptance, X0_ASSERTION_IDS } from './x0-semantic-assertions.mjs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(fileURLToPath(new URL('../../..', import.meta.url)));
const id = process.argv[2];
try {
  if (!X0_ASSERTION_IDS[id]) throw new Error('Usage: verify-x0-acceptance.mjs A1..A7');
  console.log(assertX0Acceptance(id, repoRoot));
} catch (error) {
  console.error(`FAIL ${id ?? 'X0'}: ${error.message}`);
  process.exitCode = 1;
}
