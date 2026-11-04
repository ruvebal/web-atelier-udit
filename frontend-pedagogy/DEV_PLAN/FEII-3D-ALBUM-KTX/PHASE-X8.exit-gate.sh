#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

PAGE="$FEII/ktx2-basis/index.md"
test -f "$PAGE"
rg -q "UASTC" "$PAGE"
rg -q "ETC1S" "$PAGE"
rg -qi "texel" "$PAGE"
rg -qi "pixel" "$PAGE"
rg -q "renderer.info.memory.textures" "$PAGE"
rg -qi "GPU bytes" "$PAGE" || { echo "REFUSED: page must teach computed GPU bytes (X7 F3)" >&2; exit 1; }
rg -qi "flipY|upside|orientation" "$PAGE" || { echo "REFUSED: KTX2 orientation trap not taught (X7 ruling d)" >&2; exit 1; }
rg -q "colorSpace" "$PAGE" || { echo "REFUSED: colorSpace check not taught (X7 ruling d)" >&2; exit 1; }
rg -q "slug: feii-ktx2-basis$" "$WF/docs/_data/lessons.yml"
# D22: texel is defined before the first brand name
python3 - "$PAGE" <<'PY'
import re, sys
body = open(sys.argv[1]).read().split("---", 2)[-1]
# prose only: headings and Liquid tag lines may name the format (the spine title does)
body = "\n".join(l for l in body.splitlines() if not l.lstrip().startswith(("#", "{%", "{{")))
t = re.search(r"texel", body, re.I)
b = min((m.start() for m in [re.search(w, body) for w in ("KTX2", "ETC1S", "UASTC", "Basis")] if m), default=None)
assert t, "texel never appears"
assert b is None or t.start() < b, "a KTX2/ETC1S/UASTC/Basis name appears before texel (D22)"
print("texel before brand names: ok")
PY
if rg -n "tao-development-quote|\`(arch|qa|dop)-[0-9]" "$PAGE"; then
  echo "REFUSED: KTX2 lesson must not cite the quote database (D22)" >&2
  exit 1
fi
wf_build x8
test -f "$SITE/lessons/en/feii/ktx2-basis/index.html"
if rg -i "ahmes|deviac|evaluator_safe|BIBLIO-GAP" "$SITE/lessons/en/feii/ktx2-basis/index.html"; then
  echo "REFUSED: internal metadata in built ktx2-basis page" >&2; exit 1
fi

echo "OK PHASE-X8.exit-gate.sh"
