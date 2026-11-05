#!/bin/bash
# PHASE-X16.exit-gate.sh — live Pages exhibition + closing audit (D26)
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"
AGG="${FEII_ALBUM_COVERS:-$HOME/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers}"
BASE="${FEII_ALBUM_PAGES_BASE:-https://ruvebal.github.io/feii-album-covers}"
REPORT="$CASCADE/PHASE-X16-REPORT.md"

test -f "$REPORT" || { echo "REFUSED: PHASE-X16-REPORT.md missing (must record live URLs)" >&2; exit 1; }
rg -q "ruvebal.github.io/feii-album-covers" "$REPORT" || {
  echo "REFUSED: report does not cite the live Pages base URL" >&2
  exit 1
}
rg -qi "workflow|actions/runs|deploy" "$REPORT" || {
  echo "REFUSED: report lacks deployment/workflow evidence" >&2
  exit 1
}

# Live origin must serve the gallery shell (follow redirects)
code="$(curl -sL -o /tmp/feii-album-pages-index.html -w '%{http_code}' "$BASE/")"
test "$code" = "200" || { echo "REFUSED: live $BASE/ returned HTTP $code" >&2; exit 1; }
rg -q "root|Album covers|feii-album-covers" /tmp/feii-album-pages-index.html || {
  echo "REFUSED: live index HTML does not look like the aggregator SPA" >&2
  exit 1
}

# Deep-link shell: 200 or 404-with-SPA-body both acceptable if index markers present
for path in "/covers/_studio" ; do
  c="$(curl -sL -o /tmp/feii-album-deep.html -w '%{http_code}' "$BASE$path")"
  if ! rg -q 'id="root"|feii-album-covers/assets' /tmp/feii-album-deep.html; then
    echo "REFUSED: deep link $BASE$path (HTTP $c) did not return SPA shell" >&2
    exit 1
  fi
  echo "deep link $path -> HTTP $c (SPA shell ok)"
done

# Closing audit must mention D26
test -f "$CASCADE/CLOSING-AUDIT.md"
rg -q "D26" "$CASCADE/CLOSING-AUDIT.md" || {
  echo "REFUSED: CLOSING-AUDIT.md has no D26 row" >&2
  exit 1
}

# Re-run architecture + student-facing gates
bash "$CASCADE/PHASE-X14.exit-gate.sh"
bash "$CASCADE/PHASE-X15.exit-gate.sh"

# Local aggregator still healthy
(cd "$AGG" && npm run lint && npm run build)

echo "OK PHASE-X16.exit-gate.sh"
