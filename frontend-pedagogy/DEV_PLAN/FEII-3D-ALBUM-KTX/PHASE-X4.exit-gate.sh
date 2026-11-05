#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

python3 - "$WF/docs/_data/tracks.yml" <<'PY'
import re, sys
text = open(sys.argv[1]).read()
i = text.find("\n feii:")
assert i >= 0, "feii track not found"
block = text[i:i+20000]
assert "sessions: 12" in text[i:i+800], "feii sessions != 12"
assert "unit-13" not in block and "unit-14" not in block
labs = [float(x) for x in re.findall(r"labHours:\s*([0-9.]+)", block)]
ej = [float(x) for x in re.findall(r"ejerciciosHours:\s*([0-9.]+)", block)]
assert abs(sum(labs)-30)<1e-6, sum(labs)
assert abs(sum(ej)-14)<1e-6, sum(ej)
print("ok 12-unit hour close")
PY
rg -qi "album" "$FEII/index.md"
rg -q "cover-shaders" "$FEII/index.md"
rg -q "ktx2-basis" "$FEII/index.md"
test -f "$FEII/cover-shaders/index.md"
test -f "$FEII/ktx2-basis/index.md"
wf_build x4

echo "OK PHASE-X4.exit-gate.sh"
