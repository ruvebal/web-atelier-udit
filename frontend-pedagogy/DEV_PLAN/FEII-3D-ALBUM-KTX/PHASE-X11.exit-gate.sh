#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

wf_build x11
for slug in units-8-9-assignment cover-shaders ktx2-basis; do
  test -f "$SITE/lessons/en/feii/$slug/index.html" || { echo "REFUSED: no built page for $slug" >&2; exit 1; }
  rg -q "slug: feii-$slug$" "$WF/docs/_data/lessons.yml" || { echo "REFUSED: lessons.yml has no feii-$slug" >&2; exit 1; }
done
LEAK=$(rg -il "ahmes|deviac|evaluator_safe|BIBLIO-GAP" "$SITE/lessons/en/feii/units-8-9-assignment" "$SITE/lessons/en/feii/cover-shaders" "$SITE/lessons/en/feii/ktx2-basis" || true)
if [ -n "$LEAK" ]; then echo "REFUSED: internal metadata leaked: $LEAK" >&2; exit 1; fi
if rg -n "forged in X[0-9]" "$FEII" -g '*.md'; then echo "REFUSED: X4 stub text still published" >&2; exit 1; fi

echo "OK PHASE-X11.exit-gate.sh"
