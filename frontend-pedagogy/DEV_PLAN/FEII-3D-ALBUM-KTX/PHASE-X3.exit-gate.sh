#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

test -f "$REPO/frontend-pedagogy/grounding/README.mdc"
rg -q "ktx2|KTX2" "$REPO/frontend-pedagogy/grounding/README.mdc"
rg -q "cover" "$REPO/frontend-pedagogy/grounding/README.mdc"
rg -q "Addendum.*2026-11|2026-11.*Addendum" "$WF/private/ai-assisted-3d/AUDIT-GROUNDED.md"
test -f "$REPO/frontend-pedagogy/grounding/PROFIELD-SYNC.json"
rg -q "20261104" "$REPO/frontend-pedagogy/grounding/PROFIELD-SYNC.json"

echo "OK PHASE-X3.exit-gate.sh"
