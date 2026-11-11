#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X0
python3 - "$PACK_DIR/baseline/X0/source-inventory.json" <<'PY'
import json, sys
inventory = json.load(open(sys.argv[1]))
assert inventory["fixtureCountMatchesExpectation"] is True
assert inventory["observedFacetCount"] == inventory["expectedCanonicalFixtureFacetCount"] == 13
assert inventory["architectureFacetCount"].startswith("N ")
PY
rive "$RIVE_PROJECT" --verify
python3 - "$PACK_DIR/baseline/X0/rive-runtime-baseline.json" "$WEB_ROOT/docs/assets/animations/fava/rive/animascript-3d/build/fava_prismatic_3d.riv" <<'PY'
import hashlib, json, sys
baseline = json.load(open(sys.argv[1]))
artifact = baseline["artifact"]
payload = open(sys.argv[2], "rb").read()
assert artifact["sha256"] == hashlib.sha256(payload).hexdigest()
assert artifact["bytes"] == len(payload)
assert "Signed Rive GPU Canvas scene" in baseline["browserRuntime"]["routeStatus"]
PY
rg -q 'SHA-256|sha256' "$PACK_DIR/PHASE-X0-REPORT.md"
rg -q '1\.9\.2' "$PACK_DIR/PHASE-X0-REPORT.md"
verify_evidence X0
