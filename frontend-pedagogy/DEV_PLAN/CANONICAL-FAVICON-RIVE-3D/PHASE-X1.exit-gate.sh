#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X1
require_file "$WEB_ROOT/scripts/svg-extrusion/cli.mjs"
require_file "$WEB_ROOT/scripts/svg-extrusion/test.mjs"
(cd "$WEB_ROOT" && node scripts/svg-extrusion/test.mjs)
(cd "$WEB_ROOT" && node scripts/svg-extrusion/verify-x1-acceptance.mjs)
(cd "$WEB_ROOT" && node scripts/svg-extrusion/test-x1-evidence-validator.mjs)
rg -q 'fava-mark-static\.svg' "$PACK_DIR/PHASE-X1-REPORT.md"
rg -q 'concave|cubic' "$PACK_DIR/PHASE-X1-REPORT.md"
verify_evidence X1
# The repository's committed bundle is under vendor/bundle/ruby/3.2.0.
# Run the complete site gate with the matching installed Ruby, rather than
# silently resolving a different global gem set.
(cd "$WEB_ROOT" && PATH="/Users/ruvebal/.rbenv/shims:$PATH" RBENV_VERSION=3.2.6 pnpm build)
