# Technical-director cascade

## State machine

`BLOCKED → READY → IN_PROGRESS → VERIFYING → COLD_REVIEW → DONE`

Reports use only those values. Resume behavior is exhaustive:

- `BLOCKED`: finish the named dependency; do not start implementation.
- `READY`: start this phase and no later phase.
- `IN_PROGRESS`: resume the same worktree and phase.
- `VERIFYING`: run the external exit gate and preserve its transcript.
- `COLD_REVIEW`: assign a fresh reviewer; implementer does not continue unless findings return.
- `DONE`: skip to the first non-DONE phase.

## Master execution prompt

```text
Execute the next READY phase in
frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/INDEX.md.

Read first:
- repository AGENTS.md and CLAUDE.md
- the cascade INDEX, RATIONALE, FINDINGS, DECISIONS and AGENT files
- the selected PHASE-Xn.md
- /Users/ruvebal/src/.cursor/skills/canvas-25d-content-hero/SKILL.md
  for source/fallback/input principles, while recognizing that this scene is
  true GPU 3D and therefore intentionally crosses that skill's 2.5D boundary

Hard constraints:
- fava-mark-static.svg is the only hand-authored geometry authority
- preserve dynamic `N` stable facet identities and source order; the favicon fixture alone asserts `N = 13`
- derive intrinsic depth from measured relative area using the exact D4 formula
- exact frontal rest, real side walls/back faces/depth testing
- raw coordinates for picking; conditioned coordinates for camera
- reduced-motion, static fallback, responsive containment, semantic controls
- no cloud AI and no fabricated provenance
- do not mark DONE; stop at VERIFYING and hand off to a fresh cold reviewer

If live evidence contradicts a downstream assumption, amend this cascade and
every affected phase in the same commit as the report that records the finding.
```

## Data lineage

```text
any supported SVG
  └─ source checksum + normalized paths
      ├─ facet manifest (ID, colour, area, bounds, depth)
      ├─ indexed front/back triangles + side-wall boundary mesh
      ├─ canonical static/raster fallback
      └─ fidelity fixtures
          └─ AnimaScript GPU resources + WGSL
              ├─ build/unbuild loop
              ├─ ray/pick result → persistent facet state
              └─ signed .riv
                  └─ responsive HTML host + semantic twin
                      └─ lesson + verified agentic provenance
```

The SVG-path-to-mesh compiler accepts an input SVG, output directory, flattening tolerance,
minimum/maximum depth, and optional palette policy. It must not import lesson,
favicon, or theme modules. The favicon and a deliberately different concave/
cubic SVG fixture run through the same public interface. Its manifest declares
the supported-subset schema version; unsupported SVG semantics fail explicitly.

## Closing protocol

1. Implementer finishes code, writes a report with status VERIFYING, and stops before running the external gate.
2. The cascade harness runs `PHASE-Xn.exit-gate.sh` in the phase worktree and writes `PHASE-Xn-VERIFY-LOG.md` with command output, exit codes, commit and changed paths.
3. Fresh reviewer checks every Acceptance item and whether the new tests would fail against the pre-phase state.
4. Orchestrator triages all findings. P0/P1 block DONE; P2 is fixed or explicitly deferred in `DECISIONS.md`.
5. Surprise amends every downstream phase that assumed the old contract.
6. Report records evidence and safe resume point; orchestrator promotes DONE and opens the next phase.

## Pull-request topology

- **PR A — implementation:** X0–X7. Its description is assembled from phase reports and links to cold reviews and captures.
- **Merge event:** human or authorized workflow merges PR A.
- **PR B — provenance post-hook:** X8 imports PR A’s actual number, commits, review excerpts, checks, and merge SHA into the public making-of. PR B must remain docs/data-only.

After X6 succeeds and its cold review is closed, X7 promotes the
stable reusable workflow into the studio `canvas-25d-content-hero` skill (and
its Codex adapter) as a true-3D extension/reference. Promotion records only
portable rules, CLI contract, gates, and failure modes; Web Atelier paths and
favicon palette remain in the linked case study.

This two-PR topology is part of the pedagogy: reproducible history is observed after it exists, not narrated in advance.

## Harness execution

Canonical harness: `/Users/ruvebal/src/.cursor/skills/cascade-forge/scripts/cascade-harness.sh`.

```bash
HARNESS=/Users/ruvebal/src/.cursor/skills/cascade-forge/scripts/cascade-harness.sh
PACK=frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D
$HARNESS start "$PACK"
$HARNESS verify "$PACK" PHASE-Xn.md <worktree-returned-by-start>
```

The executor works only in the returned worktree and stops at VERIFYING. The
fresh cold reviewer reads `PHASE-Xn-VERIFY-LOG.md`. After triage, the
orchestrator atomically changes the INDEX Gate token to DONE, records the
report/cold review, and changes exactly the next dependency-satisfied row from
BLOCKED to READY. Canonical role definitions are the studio
`cascade-phase-executor` and `cascade-cold-reviewer` agents referenced by the
Cascade Forge skill; copies must remain equivalent in substance.

After a phase review is closed, the orchestrator merges its
`cascade/CANONICAL-FAVICON-RIVE-3D-N` branch into the cascade integration branch
with a non-fast-forward merge, applies the atomic INDEX/report transition there,
removes the finished worktree, and only then runs `start` for the next numeric
row. A phase branch never opens its successor itself.

## Structured acceptance evidence

X0 creates `web-foundations/scripts/svg-extrusion/verify-phase-evidence.mjs`.
Every phase writes a JSON receipt whose acceptance IDs exactly equal that
runbook’s labelled checklist (`A1`, `A2`, …). Receipts live at
`PHASE-Xn-EVIDENCE.json` beside the runbook. Each item records `id`, `status`,
`command`, `exitCode`, `artifact`, `sha256`, `expected`, and `observed`; human visual review also
records reviewer identity, capture path/digest, viewport and decision. The
validator parses only the runbook’s `## Acceptance` section and rejects missing/extra IDs, a non-zero command, missing artifacts,
digest drift, unresolved `pending` values, and prose-only PASS claims. A phase
gate may run specialized assertions, but it cannot pass until this complete
receipt validates.

X6’s separately titled `## Post-review promotion acceptance` is deliberately
outside the normal receipt. `verify-review-findings.mjs` requires exactly
`R1`–`R2` in `PHASE-X6-PROMOTION-EVIDENCE.json` after cold-review triage.
