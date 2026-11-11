#!/usr/bin/env bash
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$PACK_DIR/../../.." && pwd)"
WEB_ROOT="$REPO_ROOT/web-foundations"
RIVE_PROJECT="$WEB_ROOT/docs/assets/animations/fava/rive/animascript-3d"

require_file() {
  test -f "$1" || { echo "missing required file: $1" >&2; return 1; }
}

require_report() {
  local phase="$1"
  require_file "$PACK_DIR/PHASE-${phase}-REPORT.md"
  rg -q '^\*\*Status:\*\* (VERIFYING|COLD_REVIEW|DONE)' "$PACK_DIR/PHASE-${phase}-REPORT.md"
}

site_build() {
  (cd "$WEB_ROOT" && npm run build)
}

verify_evidence() {
  local phase="$1"
  require_file "$WEB_ROOT/scripts/svg-extrusion/verify-phase-evidence.mjs"
  (cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-phase-evidence.mjs "$phase" "$PACK_DIR")
}
