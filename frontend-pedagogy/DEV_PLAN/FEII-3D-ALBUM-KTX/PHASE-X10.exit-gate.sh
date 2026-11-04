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
rg -q -- "--assign[_-](oetf|tf)['\"]?[ ,]+['\"]?srgb" "$ROOT/scripts/encode-cover.mjs" || { echo "REFUSED: encode-cover.mjs must assign sRGB (X8 cold review S1)" >&2; exit 1; }
if rg -- "--convert[_-](oetf|tf)\b" "$ROOT/scripts/encode-cover.mjs" | rg -qv '^\s*(//|\*|/\*)'; then echo "REFUSED: --convert_oetf/--convert-tf rewrites sleeve pixels (X8 cold review S1)" >&2; exit 1; fi
test -f "$ROOT/public/basis/basis_transcoder.js" && test -f "$ROOT/public/basis/basis_transcoder.wasm" || { echo "REFUSED: transcoder pair not vendored at root public/basis/ (X8 F2)" >&2; exit 1; }
if find "$ROOT/covers" -name 'basis_transcoder.*' | grep -q .; then echo "REFUSED: per-route transcoder copy (X8 F2)" >&2; exit 1; fi
rg -q "BASE_URL[^\n]*basis" "$ROOT/src" || { echo "REFUSED: transcoder path not built from import.meta.env.BASE_URL (X8 F2)" >&2; exit 1; }
if rg -q "setTranscoderPath\(\s*['\"]/" "$ROOT/src" "$ROOT/covers"; then echo "REFUSED: root-absolute transcoder path breaks under a Pages subpath (X8 F2)" >&2; exit 1; fi
rg -qi "GPU bytes" "$NOTE" || { echo "REFUSED: ktx2-note must record computed GPU bytes (X7 F3)" >&2; exit 1; }
rg -q "lower_left_maps_to_s0t0|convert-texcoord-origin" "$ROOT/scripts/encode-cover.mjs" || { echo "REFUSED: encode-cover.mjs does not flip for KTX2 orientation" >&2; exit 1; }
rg -q "colorSpace *(===|!==|==|!=) *(THREE\.)?SRGBColorSpace|SRGBColorSpace *(===|!==|==|!=) *[A-Za-z_.]*colorSpace" "$ROOT/covers/_studio/src" "$ROOT/src/lib" || { echo "REFUSED: no runtime colorSpace comparison (assignment alone does not count)" >&2; exit 1; }
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
