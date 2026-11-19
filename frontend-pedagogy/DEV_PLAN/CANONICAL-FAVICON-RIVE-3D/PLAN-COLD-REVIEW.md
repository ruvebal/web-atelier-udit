# Cascade plan cold review · 2026-11-11

**Reviewer:** fresh `plan_cold_review` agent; did not author the pack  
**Verdict before amendment:** seven blocking P1 findings, one non-blocking P2

## Findings

| ID | Severity | Blocks? | Finding |
| --- | --- | --- | --- |
| F1 | P1 | yes | Exit gates sampled outputs or grepped prose but did not cover every Acceptance item. |
| F2 | P1 | yes | X6 required its cold-review document before the normal gate that precedes cold review. |
| F3 | P1 | yes | Harness, role ownership, verify-log path and atomic status transition were not operationally wired. |
| F4 | P1 | yes | `min + range × sqrt(area/maxArea)` left “range” ambiguous against min/max CLI options. |
| F5 | P1 | yes | “Depth-aware picking” did not freeze unprojection, animated transforms, culling or nearest-hit behavior. |
| F6 | P1 | yes | X6 both postponed skill promotion until after its review and required the skill to be changed before that review. |
| F7 | P2 | no | “Source-to-source” and “any SVG” overstated the intentionally narrow converter domain. |
| F8 | P1 | yes | Post-merge provenance did not resolve every displayed event or prove the docs-only diff and fetched remote merge. |

## Positive evidence

The reviewer found the status enum/resume branches exhaustive, the two-PR provenance topology conceptually truthful, the 2.5D/true-3D distinction correct, and the second non-favicon fixture valuable. All shell gates were executable and passed `bash -n` before amendment.

The orchestrator’s closure is recorded in [PLAN-REVIEW-RESOLUTION.md](PLAN-REVIEW-RESOLUTION.md); this reviewer did not self-close its findings.

## Final amendment re-review · 2026-11-11

The same independent reviewer re-opened F1, F2, F3 and F7 after the first
amendment because acceptance IDs, X6 receipt timing, numeric harness parsing,
and terminology were still incomplete. After the second amendment it verified:

- F1–F8: **CLOSED**;
- `cascade-harness.sh next` resolves numeric step 0 to `PHASE-X0.md`;
- every phase gate passes `bash -n` and calls the complete evidence validator;
- no new P0/P1 finding.
