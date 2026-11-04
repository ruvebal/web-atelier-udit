#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

RUN=/Users/ruvebal/src/profield/runs/ai-assisted-3d-web/20261104
test -f "$RUN/PENDING-procurement.md"
MAN=$(find "$RUN" -name batch-manifest.json -print -quit)
if [ -z "$MAN" ]; then
  if ! grep -qi "zero PDFs\|batch skipped" "$RUN/PENDING-procurement.md"; then
    echo "REFUSED: no batch-manifest and PENDING does not record 'zero PDFs' / 'batch skipped'" >&2
    exit 1
  fi
fi

echo "OK PHASE-X2.exit-gate.sh"
