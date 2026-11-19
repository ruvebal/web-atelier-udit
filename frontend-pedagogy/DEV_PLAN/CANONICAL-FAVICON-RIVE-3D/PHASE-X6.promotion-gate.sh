#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_file "$PACK_DIR/PHASE-X6-COLD-REVIEW.md"
require_file "$PACK_DIR/PHASE-X6-REPORT.md"
require_file "$PACK_DIR/PHASE-X6-PROMOTION-EVIDENCE.json"
node "$WEB_ROOT/scripts/svg-extrusion/verify-review-findings.mjs" X6 "$PACK_DIR" "$PACK_DIR/PHASE-X6-PROMOTION-EVIDENCE.json"
