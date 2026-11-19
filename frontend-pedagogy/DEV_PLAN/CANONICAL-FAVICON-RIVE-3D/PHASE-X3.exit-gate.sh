#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X3
require_file "$RIVE_PROJECT/tests/interaction-test.as"
rive "$RIVE_PROJECT" --test
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-picking.mjs --all-fixtures)
verify_evidence X3
