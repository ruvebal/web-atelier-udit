#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X5
require_file "$WEB_ROOT/docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.md"
rg -q 'agentic-rive-3d' "$WEB_ROOT/docs/_data/lessons.yml"
site_build
require_file "$WEB_ROOT/_site/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.html"
node "$WEB_ROOT/scripts/verify-rive-3d-provenance.mjs" --allow-pending
verify_evidence X5
