#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "$0")/gate-lib.sh"
require_report X8
require_file "$WEB_ROOT/docs/_data/rive_3d_provenance.yml"
git -C "$REPO_ROOT" fetch origin main
node "$WEB_ROOT/scripts/verify-rive-3d-provenance.mjs" --resolve-remote --require-merged --check-diff-allowlist
merge_sha="$(ruby -e "require 'yaml'; puts YAML.load_file('$WEB_ROOT/docs/_data/rive_3d_provenance.yml').fetch('merge_sha')")"
git -C "$REPO_ROOT" merge-base --is-ancestor "$merge_sha" origin/main
site_build
verify_evidence X8
