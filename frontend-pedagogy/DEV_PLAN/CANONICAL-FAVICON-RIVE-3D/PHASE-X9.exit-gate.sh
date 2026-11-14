#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X9
require_file "$PACK_DIR/baseline/X9/proposals-manifest.json"
node -e "
const { readFileSync } = require('node:fs');
const manifest = JSON.parse(readFileSync(process.argv[1], 'utf8'));
if (!Array.isArray(manifest.proposals) || manifest.proposals.length === 0) {
  throw new Error('X9 manifest needs at least one proposal');
}
if (manifest.ttodYmlSha256Before !== manifest.ttodYmlSha256After) {
  throw new Error('ttod.yml changed during X9');
}
if (manifest.model !== 'qwen2.5:72b-instruct-q4_K_M' || manifest.endpoint !== 'http://localhost:11434') {
  throw new Error('X9 distillation must name the local Qwen review model');
}
" "$PACK_DIR/baseline/X9/proposals-manifest.json"
verify_evidence X9
