#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X4
require_file "$WEB_ROOT/scripts/verify-rive-3d-host.mjs"
(cd "$WEB_ROOT" && node scripts/verify-rive-3d-host.mjs)
site_build
verify_evidence X4
