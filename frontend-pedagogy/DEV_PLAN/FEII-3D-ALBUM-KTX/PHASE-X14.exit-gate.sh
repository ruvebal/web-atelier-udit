#!/bin/bash
# PHASE-X14.exit-gate.sh — student-owned Route.jsx architecture (D26)
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
AGG="${FEII_ALBUM_COVERS:-$HOME/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers}"

test -d "$AGG" || { echo "REFUSED: aggregator missing at $AGG" >&2; exit 1; }
cd "$AGG"

test -f covers/_studio/src/Route.jsx || { echo "REFUSED: _studio missing Route.jsx" >&2; exit 1; }

# Contract: registry loads Route.jsx, not Cover.jsx as the primary module
rg -q "Route\.jsx" src/gallery/registry.js || { echo "REFUSED: registry.js does not glob Route.jsx" >&2; exit 1; }
if rg -n "Cover\.jsx" src/gallery/registry.js | rg -v "legacy|shim|compat|deprecated|CoverRoute"; then
  # Cover.jsx may appear only in comments naming legacy removal
  if rg -q "import.meta.glob.*Cover\.jsx" src/gallery/registry.js; then
    echo "REFUSED: registry still globs Cover.jsx as primary contract" >&2
    exit 1
  fi
fi

rg -q "Route\.jsx" scripts/check-registry.mjs || { echo "REFUSED: check-registry does not require Route.jsx" >&2; exit 1; }

# Shell must not force a shared Canvas around student routes
if rg -n "<Canvas" src/gallery/*.jsx | rg -v "fixture|test|comment|legacy"; then
  # Allow Canvas only inside fixture helpers under covers/, not gallery shell wrapping all routes
  if rg -n "<Canvas" src/gallery/CoverRoute.jsx src/gallery/RouteShell.jsx src/gallery/CoverStage.jsx 2>/dev/null | rg -v "^[^:]+:\s*//"; then
    echo "REFUSED: gallery shell still mounts a shared <Canvas> for student routes" >&2
    exit 1
  fi
fi

# Project selector must exist and claim collapsed / overlay behaviour in source or docs
rg -qi "selector|ProjectSelect|project-select" src/gallery/*.jsx || {
  echo "REFUSED: no project selector component under src/gallery/" >&2
  exit 1
}

# Fixtures: at least two non-_studio/_template registered routes with Route.jsx
python3 - <<'PY'
import json, os, sys
reg = json.load(open("covers/registry.json"))
slugs = [e["slug"] for e in reg if e.get("slug") not in ("_studio", "_template")]
assert len(slugs) >= 2, f"need ≥2 fixture/student slugs in registry, got {slugs}"
for s in slugs:
    path = f"covers/{s}/src/Route.jsx"
    assert os.path.isfile(path), f"missing {path}"
print("fixtures ok:", ", ".join(slugs))
PY

# D26 language present for students
rg -qi "complete .+endpoint|student-authored endpoint|reference, not" CONTRIBUTING.md README.md || {
  echo "REFUSED: CONTRIBUTING/README missing D26 endpoint / reference language" >&2
  exit 1
}

npm run lint
npm run build

# Separate lazy chunks: Route modules must not all sit in the main index chunk only
python3 - <<'PY'
import pathlib, re, sys
assets = list(pathlib.Path("dist/assets").glob("*.js"))
names = " ".join(p.name for p in assets)
# vite typically emits multiple hashed chunks when routes are lazy
assert len(assets) >= 3, f"expected multiple JS chunks after lazy routes, got {len(assets)}: {names}"
print("dist JS chunks:", len(assets))
PY

echo "OK PHASE-X14.exit-gate.sh"
