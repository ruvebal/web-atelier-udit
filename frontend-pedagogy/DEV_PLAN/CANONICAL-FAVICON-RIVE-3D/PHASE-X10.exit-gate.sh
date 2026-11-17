#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X10
require_file "$PACK_DIR/baseline/X10/front-phase-manifest.json"
require_file "$PACK_DIR/PHASE-X10-EVIDENCE.json"
(cd "$RIVE_PROJECT" && rive . --verify)
(cd "$RIVE_PROJECT" && rive . --test)
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-x10-front-phase.mjs)
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-picking.mjs --all-fixtures)
site_build
verify_evidence X10
