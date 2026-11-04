#!/bin/bash
set -euo pipefail
CASCADE="$(cd "$(dirname "$0")" && pwd)"
. "$CASCADE/gate-lib.sh"

ROOT="$ALBUM"
test -d "$ROOT"
for f in covers/registry.json covers/_template/src/Cover.jsx covers/_studio/src/Cover.jsx CONTRIBUTING.md CODEOWNERS \
         .github/pull_request_template.md .github/workflows/lint-and-build.yml scripts/encode-cover.mjs; do
  test -f "$ROOT/$f" || { echo "REFUSED: $ROOT/$f missing" >&2; exit 1; }
done
for r in 00 20 30 40 50; do
  ls "$ROOT/.cursor/rules/$r"-*.mdc >/dev/null 2>&1 || { echo "REFUSED: .cursor/rules/$r-*.mdc missing" >&2; exit 1; }
done
if ls "$ROOT/.cursor/rules/"70-*.mdc >/dev/null 2>&1; then echo "REFUSED: 70-shadcn must not ship" >&2; exit 1; fi
rg -q "cover-<slug>-task" "$ROOT/CONTRIBUTING.md"
rg -q "qa-007" "$ROOT/CONTRIBUTING.md"
if rg -n "git checkout -b (content|graph|oracle|pwa|accounts)-" "$ROOT/CONTRIBUTING.md"; then
  echo "REFUSED: CONTRIBUTING tells students to use TTOD seam names" >&2; exit 1
fi
rg -q "AI Review Log" "$ROOT/.github/pull_request_template.md"
for prop in hovered selected reduced onHover onSelect; do
  rg -q "\b$prop\b" "$ROOT/src" -g '*.jsx' || { echo "REFUSED: gallery route does not pass $prop to Cover (X7 G1 contract)" >&2; exit 1; }
done
if rg -n "['\"]/sleeve\.(jpg|png)" "$ROOT/covers/_template"; then echo "REFUSED: _template uses a root /sleeve path, not route-relative" >&2; exit 1; fi
rg -q "covers/\*/src/Cover.jsx|covers/\*/src/Cover" "$ROOT/src/App.jsx" "$ROOT/src" -g '*.jsx' -g '*.js'
python3 - "$ROOT/package.json" "$BEACON/package.json" <<'PY'
import json,sys
a=json.load(open(sys.argv[1])); b=json.load(open(sys.argv[2]))
for k in ("react","react-dom","three","@react-three/fiber","@react-three/drei"):
    assert a["dependencies"][k]==b["dependencies"][k], (k, a["dependencies"].get(k), b["dependencies"][k])
deps = {**a.get("dependencies",{}), **a.get("devDependencies",{})}
bad = [d for d in deps if "openai" in d or "anthropic" in d]
assert not bad, bad
print("pins match; no cloud SDK")
PY
(cd "$ROOT" && npm run build >"$LOGDIR/album-x9-build.log" 2>&1) || { tail -20 "$LOGDIR/album-x9-build.log" >&2; exit 1; }
(cd "$ROOT" && npm run lint >"$LOGDIR/album-x9-lint.log" 2>&1) || { tail -20 "$LOGDIR/album-x9-lint.log" >&2; exit 1; }
REMOTE=$(git -C "$ROOT" remote get-url origin 2>/dev/null || true)
if [ -z "$REMOTE" ]; then
  rg -q "BLOCKED.*gh" "$CASCADE/PHASE-X9-REPORT.md" 2>/dev/null || { echo "REFUSED: no origin remote and no BLOCKED-on-gh line in the X9 report" >&2; exit 1; }
  echo "origin: none (BLOCKED on gh recorded)"
else
  echo "origin: $REMOTE"
fi

echo "OK PHASE-X9.exit-gate.sh"
