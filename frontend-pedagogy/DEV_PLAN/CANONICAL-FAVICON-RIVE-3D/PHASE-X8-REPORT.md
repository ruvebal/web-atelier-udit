# PHASE-X8 · Post-merge provenance hook

**Status:** DONE
**Branch:** `cascade/CANONICAL-FAVICON-RIVE-3D-8`
**Worktree:** sibling `web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-8` (lane `CANONICAL-FAVICON-RIVE-3D`)
**Base:** `origin/main` @ `b109707510e10687cd51d8b70da440a6b83f7108` (PR A #7 merge)

## Goal met

Imported PR A’s real GitHub identity into the public making-of receipt without inventing events. Opened docs/data-only PR B from this branch.

## What changed (files)

- `web-foundations/docs/_data/rive_3d_provenance.yml` — filled `merge_sha`, `pr_a`, `pr-a-open`, `pr-a-merge`; appended CI check-run events + X7 cold-review commit; left GitHub review-threads **pending** (API: zero reviews/threads).
- `web-foundations/scripts/verify-rive-3d-provenance.mjs` — implemented `--check-diff-allowlist`; remote PR merge cross-check under `--require-merged --resolve-remote`.
- `web-foundations/scripts/rive-3d-provenance-pr-b-allowlist.txt` — explicit PR B path allowlist.
- `web-foundations/scripts/svg-extrusion/capture-x8-evidence.mjs` — A1–A5 evidence capture.
- EN/ES making-of provenance sections — real PR/CI/merge rows; role + quotation/summary labels; Qwen EN→ES for new Spanish prose.
- Pack: `INDEX.md`, `PHASE-X8.md`, this report, `PHASE-X8-EVIDENCE.json`, `baseline/X8/*`, `build/x8-checks/*`.

## Real identifiers imported

| Fact | Value |
| --- | --- |
| PR A | [#7](https://github.com/ruvebal/web-atelier-udit/pull/7) |
| opened | `2026-11-14T15:51:19Z` by `ruvebal` |
| merged | `2026-11-15T19:05:36Z` |
| merge_sha | `b109707510e10687cd51d8b70da440a6b83f7108` |
| CI | lychee / yaml-lint / web-foundations-build / professor-template-build / student-template-checks — all SUCCESS (check-run IDs in YAML) |
| GitHub reviews | none (left pending) |

## Commands run (implementer preflight)

```text
git fetch origin main
gh pr view 7 --json …
node web-foundations/scripts/verify-rive-3d-provenance.mjs --resolve-remote --require-merged --check-diff-allowlist
node web-foundations/scripts/svg-extrusion/capture-x8-evidence.mjs
# site_build + verify_evidence prepared for harness / VERIFY-LOG
```

## Pending / uncertain

- `pr-a-github-review-threads` remains pending — `gh` reported zero PR reviews and zero review threads; do not invent findings.
- Official exit-gate / harness verify log is the runner’s job; this report stops at VERIFYING (not DONE).

## Resume point

Cold review of this VERIFYING package, then orchestrator promotion. PR B must stay docs/data-only.
