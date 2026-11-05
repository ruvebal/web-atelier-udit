# PHASE-X3 report — grounding matrix and audit addendum

**Status:** DONE

## Cold-review triage

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| F1 — initial `.gitignore` exception exposed unrelated private siblings | P1 | Yes, until fixed | CLOSED in a fresh executor round. The rule now re-ignores both opened parents and negates only `AUDIT-GROUNDED.md`; round-2 cold review independently proved direct, nested, and alternate-directory siblings remain ignored. |
| Round-2 findings | — | No | None; the post-fix harness gate exited 0 and all acceptance evidence was revalidated. |

## Scope completed

- Added explicit evidence-matrix rows for the cover-shaders satellite, the KTX2 first-principles satellite, and the 3D album-cover assignment pitch.
- Resolved the only promoted research claim against the existing Angel and Shreiner Ahmes coat. The current Ahmes CLI attempted a schema migration on a read-only vault, so the same resolver was run against a temporary 132 KiB copy of `extraction.db`; the sovereign vault was not modified.
- Kept higher-education KTX2/Basis pedagogy, R3F/Drei shader pedagogy, and the album-cover/route-PR intervention as explicit `[UNVERIFIED-GAP]` items.
- Kept Khronos, Basis Universal, Three.js, R3F/Drei, and glTF as visibly separate `[STANDARD]` / `[PRACTITIONER]` platform notes.
- Preserved the original 2026-08-14 private audit and appended the required 2026-11-04 student/instructor split. The exact text-only audit file is deliberately re-included by `.gitignore`; sibling private material remains ignored.
- Updated `PROFIELD-SYNC.json` with run ID, immutable input hashes, source manifest, evaluator-safe nodes/pages, gaps, target files, and release decision.

## Files changed

- `.gitignore`
- `frontend-pedagogy/grounding/README.mdc`
- `frontend-pedagogy/grounding/PROFIELD-SYNC.json`
- `frontend-pedagogy/grounding/FEII-3D-ALBUM-KTX-CITATION-TRANSCRIPT-20261104.md`
- `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md`
- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X3-REPORT.md`

## Runnable evidence

| Check | Observed result |
| --- | --- |
| Worktree identity | `.cascade-lane` = `FEII-3D-ALBUM-KTX`; branch `cascade/FEII-3D-ALBUM-KTX-3`. |
| Angel p. 1 cite gate | `ahmes query --cite <temp-copy>/extraction.db:348bd016-3aee-5eb3-ae93-b3d422e137df --style chicago-author-date --require-evaluator-safe` → `(Angel 2024, 1)`, confidence `0.95`, `evaluator_safe=yes`. |
| Angel p. 2 cite gate | Same command for node `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` → `(Angel 2024, 2)`, confidence `0.95`, `evaluator_safe=yes`. |
| Claim entailment | Direct SQLite read shows the nodes describe shader/render-function continuity across evolving APIs and preserving fundamental graphics topics. The matrix explicitly refuses to extend that claim to R3F, KTX2, album-cover, or PR outcomes. |
| Matrix coverage | `README.mdc` contains three new rows: `Satellite — cover shaders`, `Satellite — KTX2 first principles`, and `Assignment — 3D album cover`; every evidence cell names the full Angel coat or an explicit gap/platform-note class. |
| Audit split | The addendum begins `Addendum — 2026-11-04`; its student bar includes the cover route, one explainable shader, PNG/ETC1S/UASTC, separate file-byte/runtime-texture measurements, and a written choice. It retains MCP shopping and `corpus-to-boilerplate/` in the instructor layer. |
| Chicago handoff | The citation transcript gives the Angel and Shreiner Chicago reference plus dated Khronos/Three.js/glTF platform-note forms for X5–X8. No platform DOI is asserted. |
| Run receipt | `jq empty frontend-pedagogy/grounding/PROFIELD-SYNC.json` exited 0; the receipt names run `ai-assisted-3d-web/20261104` and three SHA-256 input hashes. |
| Privacy scope | `git status --untracked-files=all` exposes only `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md` under `private/`; no sibling private file is unignored. |
| F1 privacy fix | `.gitignore` now re-ignores each opened parent before negating only the audit file. `git check-ignore -q --no-index` exits `0` for the invented siblings `web-foundations/private/another-secret.md` and `web-foundations/private/ai-assisted-3d/SHOULD-STAY-IGNORED.md`, and exits `1` for the intended `AUDIT-GROUNDED.md`. |
| Diff integrity | `git diff --check` exited 0. |

## Boundaries and uncertainty

- The 20261104 corpus landed zero PDFs. KTX2 remains platform-note-only, which is the accepted D18 path.
- AI Co-Artist remains citation-unsafe and excluded. ShaderMatch stayed `no_oa` and is not promoted without an Ahmes node.
- DevIAC was unavailable in X2. This phase cites no vector snippet and needs no vector result to support its one settled research claim.
- The host remains low on disk space; X3 created only small text artifacts and did not run a build or delete unrelated data.

## Exact resume point

Run the harness verification for `PHASE-X3.md`. If it passes, provide the phase diff, this report, `PHASE-X3-VERIFY-LOG.md`, the citation transcript, and the original-plus-addendum audit to a fresh cold reviewer. The executor has not run the exit gate, promoted X3, landed, merged, or pushed `web-atelier-udit`.
