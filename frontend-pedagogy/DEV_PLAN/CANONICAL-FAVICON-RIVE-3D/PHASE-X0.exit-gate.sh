#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X0
test "$(rg -c '<path ' "$WEB_ROOT/docs/assets/icons/fava-mark-static.svg")" -eq 13
rive "$RIVE_PROJECT" --verify
rg -q 'SHA-256|sha256' "$PACK_DIR/PHASE-X0-REPORT.md"
rg -q '1\.9\.2' "$PACK_DIR/PHASE-X0-REPORT.md"
verify_evidence X0
