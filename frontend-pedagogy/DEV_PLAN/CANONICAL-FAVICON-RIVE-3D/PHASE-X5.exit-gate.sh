#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X5
LESSON="$WEB_ROOT/docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.md"
LESSON_ES="$WEB_ROOT/docs/lessons/es/web-animations/svg-master-session/agentic-rive-3d/index.md"
require_file "$LESSON"
require_file "$LESSON_ES"
rg -q 'agentic-rive-3d' "$WEB_ROOT/docs/_data/lessons.yml"
# A11: sound synchronicity as first relevance utility (D54)
rg -qi 'sample clock|AudioProcessor|sound synchron' "$LESSON"
rg -q 'hum\.as|animascript-audio|audio-specimen' "$LESSON"
rg -qi 'AudioWorklet|cross-origin isolation|COI' "$LESSON"
rg -qi 'sincronía sonora|reloj de muestra|AudioProcessor' "$LESSON_ES"
site_build
require_file "$WEB_ROOT/_site/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.html"
require_file "$WEB_ROOT/_site/lessons/es/web-animations/svg-master-session/agentic-rive-3d/index.html"
node "$WEB_ROOT/scripts/verify-rive-3d-provenance.mjs" --allow-pending
verify_evidence X5
