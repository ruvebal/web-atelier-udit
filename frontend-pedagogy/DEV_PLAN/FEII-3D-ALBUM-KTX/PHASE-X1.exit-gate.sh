#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

RUN=/Users/ruvebal/src/profield/runs/ai-assisted-3d-web/20261104
test -d "$RUN" || { echo "REFUSED: $RUN missing" >&2; exit 1; }
for f in pass1.prompt.md pass1.raw.md pass2.raw.md CONSOLIDATED.md; do
  test -f "$RUN/$f" || { echo "REFUSED: $RUN/$f missing" >&2; exit 1; }
done
rg -q "operator-web-tools" "$RUN/pass1.raw.md"
rg -q "https?://" "$RUN/pass1.raw.md"
if rg -n "utm_source=chatgpt" "$RUN/pass1.raw.md" "$RUN/CONSOLIDATED.md"; then
  echo "REFUSED: chatgpt UTM tracker survived (F8)" >&2; exit 1
fi
rg -q "UASTC" "$RUN/CONSOLIDATED.md"
rg -q "ETC1S" "$RUN/CONSOLIDATED.md"
rg -qi "gltf" "$RUN/CONSOLIDATED.md"
rg -q "UNVERIFIED-GAP" "$RUN/CONSOLIDATED.md"

echo "OK PHASE-X1.exit-gate.sh"
