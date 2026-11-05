#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

test -f "$CASCADE/DECISIONS.md"
if grep -q "| PROPOSED" "$CASCADE/DECISIONS.md"; then
  echo "REFUSED: DECISIONS.md still has PROPOSED rows" >&2
  exit 1
fi
test -f "$CASCADE/FINDINGS-2026-11-04.md"
test -f "$CASCADE/PHASE-X0-REPORT.md"
rg -qi "gh auth" "$CASCADE/PHASE-X0-REPORT.md" || { echo "REFUSED: X0 report must state gh auth status" >&2; exit 1; }
rg -q "/ex1-beacon" "$BEACON/src/App.jsx"
rg -q "/ex2-shader" "$BEACON/src/App.jsx"
python3 - "$WF/docs/_data/tracks.yml" <<'PY'
import re, sys
text = open(sys.argv[1]).read()
i = text.find("\n feii:")
assert i >= 0, "feii track not found in tracks.yml"
block = text[i:i+20000]
labs = [float(x) for x in re.findall(r"labHours:\s*([0-9.]+)", block)]
ej = [float(x) for x in re.findall(r"ejerciciosHours:\s*([0-9.]+)", block)]
assert abs(sum(labs) - 30) < 1e-6, sum(labs)
assert abs(sum(ej) - 14) < 1e-6, sum(ej)
print("hours lab", sum(labs), "ejercicios", sum(ej))
PY

echo "OK PHASE-X0.exit-gate.sh"
