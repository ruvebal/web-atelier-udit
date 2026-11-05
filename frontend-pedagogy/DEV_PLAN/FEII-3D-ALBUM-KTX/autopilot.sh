#!/usr/bin/env bash
# autopilot.sh — deterministic git plumbing around cascade-harness.sh for this pack.
#
# Why it exists (audit 2026-11-04):
#   - the harness opens each phase worktree from HEAD; nothing merged a finished
#     phase back, so phase N+1 never saw phase N's lessons and `start` refused a
#     second lane while the old worktree lived;
#   - web-atelier-udit is a PUBLIC repo whose `main` the professor pushes for
#     Pages — cascade work must not land on `main` unreviewed.
#
# So: one integration worktree on branch cascade/FEII-3D-ALBUM-KTX (never pushed).
# The harness runs against the pack *inside that worktree*; phase worktrees branch
# from it and are merged back into it by `land`. `main` is untouched until the
# professor merges the integration branch by hand.
#
# Usage:
#   autopilot.sh bootstrap              create integration worktree + commit pack (idempotent)
#   autopilot.sh next                   harness next on the integration pack
#   autopilot.sh start                  harness start + prep (symlink node_modules/vendor)
#   autopilot.sh current                print in-flight phase worktree
#   autopilot.sh verify PHASE-Xn.md     harness verify on the in-flight worktree
#   autopilot.sh land   PHASE-Xn.md     re-verify, require COLD-REVIEW + DONE report,
#                                       flip INDEX gates, commit, merge, remove worktree
#   autopilot.sh abort  PHASE-Xn.md     remove a clean in-flight worktree (FORCE=1 to discard work)

set -euo pipefail
fail() { echo "REFUSED: $*" >&2; exit 1; }

MAIN="${AP_MAIN:-/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit}"
INT_WT="${AP_INT_WT:-/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-album}"
INT_BRANCH="cascade/FEII-3D-ALBUM-KTX"
PACK_REL="frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX"
LANE="FEII-3D-ALBUM-KTX"
INT_CASCADE="$INT_WT/$PACK_REL"
HARNESS="$HOME/src/.cursor/skills/cascade-forge/scripts/cascade-harness.sh"
TRAILER="Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"

[ -x "$HARNESS" ] || fail "harness not found: $HARNESS"

step_of() { # PHASE-X7.md -> 7
  local s="${1##*/}"; s="${s#PHASE-X}"; s="${s%.md}"
  [[ "$s" =~ ^[0-9]+$ ]] || fail "not a phase file name: $1"
  echo "$s"
}

inflight_wt() {
  git -C "$MAIN" worktree list --porcelain | awk '/^worktree /{print $2}' | while read -r wt; do
    if [ -f "$wt/.cascade-lane" ] && [ "$(cat "$wt/.cascade-lane")" = "$LANE" ]; then echo "$wt"; fi
  done
}

ensure_excludes() {
  local ex
  ex="$(git -C "$MAIN" rev-parse --path-format=absolute --git-common-dir)/info/exclude"
  mkdir -p "$(dirname "$ex")"; touch "$ex"
  # node_modules/ and vendor/ in .gitignore do not match *symlinks*; exclude them by path
  for p in ".cascade-lane" "web-foundations/node_modules" "web-foundations/vendor"; do
    grep -qxF "$p" "$ex" || echo "$p" >>"$ex"
  done
}

prep() {
  local wt="$1"
  for d in node_modules vendor; do
    [ -e "$MAIN/web-foundations/$d" ] || fail "main checkout lacks web-foundations/$d — run npm ci / bundle install there"
    [ -e "$wt/web-foundations/$d" ] || ln -s "$MAIN/web-foundations/$d" "$wt/web-foundations/$d"
  done
  echo "prepped $wt (web-foundations node_modules + vendor symlinked)"
}

flip_gates() { # <index.md> <step>
  python3 - "$1" "$2" "$(date +%Y-%m-%d)" <<'PY'
import re, sys
path, step, today = sys.argv[1], int(sys.argv[2]), sys.argv[3]
lines = open(path).read().split("\n")
hit = False
for i, line in enumerate(lines):
    m = re.match(r"^\|\s*(\d+)\s*\|", line)
    if not m:
        continue
    cells = line.split("|")          # ['', step, file, deliverable, gate, '']
    n = int(m.group(1))
    gate = cells[4].strip()
    if n == step:
        cells[4] = f" DONE {today} "
        hit = True
    elif n == step + 1 and gate.split(" ")[0] == "BLOCKED":
        rest = gate[len("BLOCKED"):]
        cells[4] = " READY" + ("" if rest.strip().startswith("until") else rest) + " "
    lines[i] = "|".join(cells)
assert hit, f"no Programme row for step {step}"
open(path, "w").write("\n".join(lines))
print(f"INDEX: step {step} -> DONE; step {step+1} BLOCKED -> READY (if present)")
PY
}

CMD="${1:-}"; shift || true
case "$CMD" in
  bootstrap)
    ensure_excludes
    if [ -d "$INT_WT" ]; then
      [ "$(git -C "$INT_WT" rev-parse --abbrev-ref HEAD)" = "$INT_BRANCH" ] || fail "$INT_WT exists but is not on $INT_BRANCH"
      echo "integration worktree already present: $INT_WT ($INT_BRANCH)"
    else
      git -C "$MAIN" worktree add -b "$INT_BRANCH" "$INT_WT" main >&2
      echo "created $INT_WT on $INT_BRANCH from main"
    fi
    if ! git -C "$INT_WT" ls-files --error-unmatch "$PACK_REL/INDEX.md" >/dev/null 2>&1; then
      mkdir -p "$INT_WT/$PACK_REL"
      rsync -a --exclude '*-VERIFY-LOG.md' "$MAIN/$PACK_REL/" "$INT_WT/$PACK_REL/"
      git -C "$INT_WT" add "$PACK_REL"
      git -C "$INT_WT" commit -q -m "docs(feii-album-ktx): cascade pack X0–X12 + autopilot runner" -m "$TRAILER"
      echo "committed pack on $INT_BRANCH"
    fi
    echo "CASCADE=$INT_CASCADE"
    echo "From here on the live pack is $INT_CASCADE — edits to the copy in $MAIN do not reach the run."
    ;;

  next)
    "$HARNESS" next "$INT_CASCADE"
    ;;

  start)
    [ -d "$INT_WT" ] || fail "run '$0 bootstrap' first"
    [ -z "$(inflight_wt)" ] || fail "phase already in flight at $(inflight_wt) — land or abort it first"
    out="$("$HARNESS" start "$INT_CASCADE")"
    echo "$out"
    wt="$(echo "$out" | sed -n 's/.* in worktree \(.*\) on branch .*/\1/p')"
    [ -n "$wt" ] || fail "could not parse worktree path from harness output"
    prep "$wt"
    echo "PHASE PACKAGE: $wt/$PACK_REL/$(echo "$out" | sed -n 's/^started: step [0-9]* (\(.*\)) in worktree.*/\1/p')"
    ;;

  current)
    wt="$(inflight_wt)"; [ -n "$wt" ] || { echo "no phase in flight"; exit 2; }
    echo "$wt  [$(git -C "$wt" rev-parse --abbrev-ref HEAD)]"
    ;;

  verify)
    f="${1:?PHASE-Xn.md}"; step_of "$f" >/dev/null
    wt="$(inflight_wt)"; [ -n "$wt" ] || fail "no phase in flight"
    "$HARNESS" verify "$INT_CASCADE" "$f" "$wt"
    ;;

  land)
    f="${1:?PHASE-Xn.md}"; n="$(step_of "$f")"; base="${f%.md}"
    wt="$(inflight_wt)"; [ -n "$wt" ] || fail "no phase in flight"
    br="$(git -C "$wt" rev-parse --abbrev-ref HEAD)"
    [ "$br" = "cascade/$LANE-$n" ] || fail "in-flight branch is $br, not cascade/$LANE-$n"
    P="$wt/$PACK_REL"
    [ -f "$P/$base-COLD-REVIEW.md" ] || fail "$base-COLD-REVIEW.md missing — cold review is not optional (D19)"
    [ -f "$P/$base-REPORT.md" ] || fail "$base-REPORT.md missing"
    grep -Eqi 'status[^a-z]*DONE' "$P/$base-REPORT.md" || fail "$base-REPORT.md does not state Status DONE"
    # re-run the gate on the exact tree being landed (triage fixes may postdate the first verify)
    "$HARNESS" verify "$INT_CASCADE" "$f" "$wt" || fail "exit gate fails on the tree being landed — back to IN_PROGRESS"
    flip_gates "$P/INDEX.md" "$n"
    git -C "$wt" add -A
    git -C "$wt" commit -q -m "cascade(feii-album-ktx): PHASE-X$n DONE" -m "$TRAILER" || true
    git -C "$INT_WT" merge --no-ff --no-edit "$br" >&2
    git -C "$MAIN" worktree remove "$wt"
    git -C "$INT_WT" branch -d "$br" >&2
    echo "landed PHASE-X$n into $INT_BRANCH"
    "$HARNESS" next "$INT_CASCADE" || true
    ;;

  abort)
    f="${1:?PHASE-Xn.md}"; n="$(step_of "$f")"
    wt="$(inflight_wt)"; [ -n "$wt" ] || fail "no phase in flight"
    br="$(git -C "$wt" rev-parse --abbrev-ref HEAD)"
    [ "$br" = "cascade/$LANE-$n" ] || fail "in-flight branch is $br, not cascade/$LANE-$n"
    dirty="$(git -C "$wt" status --porcelain)"
    if [ -n "$dirty" ] && [ "${FORCE:-0}" != 1 ]; then
      echo "$dirty" >&2; fail "worktree has work; FORCE=1 $0 abort $f discards it"
    fi
    git -C "$MAIN" worktree remove ${dirty:+--force} "$wt"
    git -C "$INT_WT" branch -D "$br" >&2
    echo "aborted PHASE-X$n (worktree + branch removed)"
    ;;

  *)
    sed -n '2,25p' "$0"; exit 1 ;;
esac
