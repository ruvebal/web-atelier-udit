#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X7
require_file "/Users/ruvebal/src/.cursor/skills/canvas-25d-content-hero/SKILL.md"
require_file "/Users/ruvebal/.codex/skills/canvas-25d-content-hero/SKILL.md"
node "$WEB_ROOT/scripts/svg-extrusion/verify-skill-promotion.mjs"
gh pr view --json number,url,title,body,headRefName,commits,statusCheckRollup > /dev/null
verify_evidence X7
