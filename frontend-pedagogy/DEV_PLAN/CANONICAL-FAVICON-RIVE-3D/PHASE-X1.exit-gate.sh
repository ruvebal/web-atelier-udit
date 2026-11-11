#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X1
require_file "$WEB_ROOT/scripts/svg-extrusion/cli.mjs"
require_file "$WEB_ROOT/scripts/svg-extrusion/test.mjs"
(cd "$WEB_ROOT" && node scripts/svg-extrusion/test.mjs)
rg -q 'fava-mark-static\.svg' "$PACK_DIR/PHASE-X1-REPORT.md"
rg -q 'concave|cubic' "$PACK_DIR/PHASE-X1-REPORT.md"
verify_evidence X1
