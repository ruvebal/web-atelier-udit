#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

PAGE="$FEII/units-8-9-assignment/index.md"
rg -qi "album cover" "$PAGE"
rg -q "UASTC|ETC1S|ktx2" "$PAGE"
rg -q "feii-album-covers" "$PAGE"
rg -q "covers/" "$PAGE"
rg -q "cover-<slug>-task" "$PAGE"
rg -qi "AI Review Log" "$PAGE"
wf_build x5

echo "OK PHASE-X5.exit-gate.sh"
