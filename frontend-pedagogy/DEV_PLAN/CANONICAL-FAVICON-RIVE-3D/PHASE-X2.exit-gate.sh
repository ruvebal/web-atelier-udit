#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X2
require_file "$RIVE_PROJECT/build/fava_prismatic_3d.riv"
require_file "$RIVE_PROJECT/build/canonical-rest.png"
require_file "$RIVE_PROJECT/build/canonical-oblique.png"
require_file "$RIVE_PROJECT/build/gpu-manifest.json"
rive "$RIVE_PROJECT" --verify
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-fidelity.mjs)
verify_evidence X2
