#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X11
require_file "$PACK_DIR/baseline/X11/turn-manifest.json"
require_file "$PACK_DIR/PHASE-X11-EVIDENCE.json"
(cd "$RIVE_PROJECT" && rive . --verify)
(cd "$RIVE_PROJECT" && rive . --test)
site_build
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-x11-turn-phase.mjs)
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-picking.mjs --all-fixtures)
(cd "$WEB_ROOT" && node scripts/verify-rive-3d-host.mjs A1 --out=docs/assets/animations/fava/rive/animascript-3d/build/x11-checks)
(cd "$WEB_ROOT" && node scripts/verify-rive-3d-host.mjs A4 --out=docs/assets/animations/fava/rive/animascript-3d/build/x11-checks)
(cd "$WEB_ROOT" && node scripts/verify-rive-3d-host.mjs A5 --out=docs/assets/animations/fava/rive/animascript-3d/build/x11-checks)
verify_evidence X11
