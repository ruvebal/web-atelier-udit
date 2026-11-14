#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X7
require_file "/Users/ruvebal/src/.cursor/skills/canvas-25d-content-hero/SKILL.md"
require_file "/Users/ruvebal/.codex/skills/canvas-25d-content-hero/SKILL.md"
node "$WEB_ROOT/scripts/svg-extrusion/verify-skill-promotion.mjs"
require_file "$PACK_DIR/PHASE-X7-PR.json"
PR_NUMBER="$(node -e "const p=require('$PACK_DIR/PHASE-X7-PR.json'); if(!p.number) process.exit(2); process.stdout.write(String(p.number))")"
gh pr view "$PR_NUMBER" --json number,url,title,body,headRefName,commits,statusCheckRollup > /dev/null
BODY="$(gh pr view "$PR_NUMBER" --json body -q .body)"
echo "$BODY" | rg -qi 'deferred P2|non-SVG procedural'
verify_evidence X7
