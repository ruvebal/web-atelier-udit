#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

test -f "$CASCADE/CLOSING-AUDIT.md"
(cd "$BEACON" && npm run build >"$LOGDIR/beacon-x12.log" 2>&1) || { tail -20 "$LOGDIR/beacon-x12.log" >&2; exit 1; }
(cd "$ALBUM" && npm run build >"$LOGDIR/album-x12.log" 2>&1) || { tail -20 "$LOGDIR/album-x12.log" >&2; exit 1; }
# student path must not require MCP / prospector installs
if rg -n "Stitch|21st\.dev|corpus-to-boilerplate|Nano Banana|Hygraph" "$FEII" -g '*.md' | rg -vi "not |do not|instructor|forbidden|exclude"; then
  echo "possible student-path leak" >&2
  exit 1
fi
for n in 1 2 3 4 5 6 7 8 9 10; do
  rg -qi "\bRec $n\b" "$CASCADE/CLOSING-AUDIT.md" || { echo "REFUSED: CLOSING-AUDIT.md has no row for AUDIT rec $n" >&2; exit 1; }
done

echo "OK PHASE-X12.exit-gate.sh"
