#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X6
(cd "$WEB_ROOT" && node scripts/svg-extrusion/test.mjs)
rive "$RIVE_PROJECT" --verify
rive "$RIVE_PROJECT" --test
rive "$RIVE_PROJECT" --bench=300
site_build
verify_evidence X6
