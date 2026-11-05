#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

PAGE="$FEII/cover-shaders/index.md"
test -f "$PAGE"
rg -q "sampler2D" "$PAGE"
rg -q "uMap" "$PAGE"
rg -q "CodeSandbox-ready" "$PAGE"
rg -q "slug: feii-cover-shaders$" "$WF/docs/_data/lessons.yml"
rg -q "cover-shaders" "$FEII/unit-9-shader-literacy/index.md"
rg -q "cover-shaders" "$FEII/units-8-9-assignment/index.md"
# F10 (X7 review): the two link checks above pre-date X7; require the lesson's own checklist too
rg -qi "explain this shader" "$PAGE" || { echo "REFUSED: no 'Explain this shader' checklist" >&2; exit 1; }
if rg -n "forged in X7" "$PAGE"; then echo "REFUSED: X4 stub text survives" >&2; exit 1; fi
wf_build x7
test -f "$SITE/lessons/en/feii/cover-shaders/index.html"
if rg -i "ahmes|deviac|evaluator_safe|BIBLIO-GAP" "$SITE/lessons/en/feii/cover-shaders/index.html"; then
  echo "REFUSED: internal metadata in built cover-shaders page" >&2; exit 1
fi

echo "OK PHASE-X7.exit-gate.sh"
