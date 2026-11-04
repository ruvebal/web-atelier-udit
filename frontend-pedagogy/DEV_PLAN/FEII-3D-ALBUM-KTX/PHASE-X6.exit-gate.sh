#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

U8="$FEII/unit-8-r3f-fundamentals/index.md"
U9="$FEII/unit-9-shader-literacy/index.md"
# both labs already linked the assignment before X6 — require the cover aim too
rg -q "units-8-9-assignment" "$U8"
rg -q "units-8-9-assignment" "$U9"
rg -qi "album|sleeve" "$U8" || { echo "REFUSED: Unit 8 lab does not aim at the cover" >&2; exit 1; }
rg -qi "album|sleeve" "$U9" || { echo "REFUSED: Unit 9 does not aim at the cover" >&2; exit 1; }
rg -q "1368" "$U9"
rg -q "2026-10-22" "$U9"
NEW=$(find /Users/ruvebal/src/deviac/fine-tuning/thessia-tuning-memory -newer "$CASCADE/PHASE-X6.md" -mindepth 1 -maxdepth 2 2>/dev/null | head -1 || true)
test -n "$NEW" || { echo "REFUSED: no lesson-scribe tuning-memory record newer than PHASE-X6.md" >&2; exit 1; }
wf_build x6

echo "OK PHASE-X6.exit-gate.sh"
