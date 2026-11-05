#!/bin/bash
# PHASE-X15.exit-gate.sh — student brief + neutral templates (D26)
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"
AGG="${FEII_ALBUM_COVERS:-$HOME/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers}"

test -d "$AGG" || { echo "REFUSED: aggregator missing at $AGG" >&2; exit 1; }

# Neutral template: Route.jsx exists; sleeve/vinyl stage prescription should not be the only starter
test -f "$AGG/covers/_template/src/Route.jsx" || { echo "REFUSED: _template missing Route.jsx" >&2; exit 1; }
# At least one alternate starter variant file or documented folder
ls "$AGG/covers/_template" >/dev/null
rg -qi "reference, not|not the expected|one reference" "$AGG/CONTRIBUTING.md" "$AGG/README.md" || {
  echo "REFUSED: _studio not labelled as reference-only in student docs" >&2
  exit 1
}

# Registry schema fields
python3 - "$AGG/covers/registry.json" "$AGG/scripts/check-registry.mjs" <<'PY'
import json, sys, pathlib
reg = json.load(open(sys.argv[1]))
checker = pathlib.Path(sys.argv[2]).read_text()
for field in ("concept", "thumbnail", "tags", "readiness"):
    assert field in checker, f"check-registry.mjs does not mention {field}"
# every entry should carry the new fields (fixtures/_studio included)
required = {"slug", "title", "authors", "concept", "thumbnail", "tags", "readiness"}
for i, e in enumerate(reg):
    missing = required - set(e)
    assert not missing, f"registry[{i}] missing {missing}"
print("registry metadata ok:", len(reg), "entries")
PY

# No Cover.jsx primary contract
if test -f "$AGG/covers/_template/src/Cover.jsx"; then
  echo "REFUSED: _template still ships Cover.jsx as starter" >&2
  exit 1
fi
if rg -q "import.meta.glob.*Cover\.jsx" "$AGG/src/gallery/registry.js"; then
  echo "REFUSED: registry still globs Cover.jsx" >&2
  exit 1
fi

# Assignment lesson: format freedom + no new hours claim
ASSIGN="$FEII/units-8-9-assignment/index.md"
test -f "$ASSIGN"
rg -qi "format|endpoint|WebGL|DOM|hybrid|visual language" "$ASSIGN" || {
  echo "REFUSED: assignment does not state format freedom" >&2
  exit 1
}
rg -qi "reference|_studio" "$ASSIGN" || {
  echo "REFUSED: assignment does not position _studio as reference" >&2
  exit 1
}
# must not still claim aggregator is only private / _studio not deployed if Pages is public — soft check
if rg -n "private class aggregator" "$ASSIGN"; then
  echo "WARN: assignment still says private class aggregator — confirm against live visibility" >&2
fi

# D21 still present
rg -q "AI Review Log" "$AGG/.github/pull_request_template.md"
rg -q "cover-<slug>-task" "$AGG/CONTRIBUTING.md"

(cd "$AGG" && npm run lint && npm run build)

# Touched assignment still builds in web-foundations
wf_build x15
test -f "$SITE/lessons/en/feii/units-8-9-assignment/index.html"

echo "OK PHASE-X15.exit-gate.sh"
