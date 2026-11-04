#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

ROOT="$ALBUM"
(cd "$ROOT" && npm run build >"$LOGDIR/album-x10-build.log" 2>&1) || { tail -20 "$LOGDIR/album-x10-build.log" >&2; exit 1; }
(cd "$ROOT" && npm run lint >"$LOGDIR/album-x10-lint.log" 2>&1) || { tail -20 "$LOGDIR/album-x10-lint.log" >&2; exit 1; }
test -f "$ROOT/covers/_studio/src/Cover.jsx"
NOTE="$ROOT/covers/_studio/docs/ktx2-note.md"
test -f "$NOTE"
rg -qi "uastc" "$ROOT/covers/_studio" "$ROOT/src/lib"
rg -qi "etc1s" "$ROOT/covers/_studio" "$ROOT/src/lib"
rg -q "uMap" "$ROOT/covers/_studio/src"
rg -qi "file bytes" "$NOTE"
rg -q "renderer.info.memory.textures" "$NOTE"
rg -qi "[0-9]+ ?(bytes|B|KB|KiB|MB)|encoder skip|toktx missing" "$NOTE"
# no fake KTX2: every .ktx2 must start with the KTX 2.0 identifier
for k in $(find "$ROOT/covers/_studio" -name '*.ktx2'); do
  head -c 12 "$k" | xxd -p | grep -q "ab4b5458203230bb0d0a1a0a" || { echo "REFUSED: $k is not a KTX 2.0 file" >&2; exit 1; }
done
python3 - "$ROOT/covers/registry.json" <<'PY'
import json,sys
reg=json.load(open(sys.argv[1]))
assert any(r.get("slug")=="_studio" for r in reg), "registry.json does not list _studio"
print("registry ok:", [r.get("slug") for r in reg])
PY
rg -q "200" "$ROOT/src/lib"
rg -q "80" "$ROOT/src/lib"

echo "OK PHASE-X10.exit-gate.sh"
