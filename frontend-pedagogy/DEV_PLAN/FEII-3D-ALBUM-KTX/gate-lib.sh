#!/bin/bash
# gate-lib.sh — sourced by PHASE-Xn.exit-gate.sh. Not a gate itself.
#
# Exit gates run inside the harness worktree, where web-foundations has no
# node_modules / vendor/bundle (both gitignored). `autopilot.sh prep` symlinks
# them in from the main checkout; wf_build refuses loudly if that was skipped.

# a bare `test -f` fails silently — name the failing check in the verify log
set -E
trap 'echo "REFUSED: $(basename "$0") line $LINENO: $BASH_COMMAND" >&2' ERR

CASCADE="${CASCADE:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
REPO="$(cd "$CASCADE/../../.." && pwd)"
WF="$REPO/web-foundations"
FEII="$WF/docs/lessons/en/feii"
SITE="$WF/_site"
ALBUM="/Users/ruvebal/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers"
BEACON="/Users/ruvebal/projects/ruvebal/scholar/udit/courses-repos/react-template"
LOGDIR="${TMPDIR:-/tmp}/feii-album-ktx-gates"
mkdir -p "$LOGDIR"

# wf_build <tag> — npm run build in web-foundations; fail on non-zero or Liquid Warning.
wf_build() {
  local log="$LOGDIR/$1-build.log"
  if [ ! -e "$WF/node_modules" ] || [ ! -e "$WF/vendor" ]; then
    echo "REFUSED: $WF has no node_modules/vendor — run autopilot.sh prep <worktree> first" >&2
    return 1
  fi
  if ! (cd "$WF" && npm run build >"$log" 2>&1); then
    echo "REFUSED: web-foundations build failed — tail of $log:" >&2
    tail -25 "$log" >&2
    return 1
  fi
  if grep -q "Liquid Warning" "$log"; then
    echo "REFUSED: Liquid Warning in build:" >&2
    grep -n "Liquid Warning" "$log" | head >&2
    return 1
  fi
  echo "build ok ($log)"
}
