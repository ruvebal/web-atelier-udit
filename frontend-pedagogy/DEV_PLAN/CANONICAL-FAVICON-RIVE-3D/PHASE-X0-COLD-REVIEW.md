# PHASE-X0 cold review

**Reviewed commit:** `bd06a6ce8057d7216bd1965b967508caed96e221`  
**Reviewer posture:** independent cold review; prior implementation and review conclusions were not trusted  
**Verdict:** **BLOCKS DONE**

## Independent checks

- `PHASE-X0.exit-gate.sh`: PASS (`7` acceptance IDs).
- `test-phase-evidence-validator.mjs`: PASS (`8` receipt mutations rejected).
- `pnpm build` under the recorded Ruby `3.3.11` / Bundler `2.5.22` toolchain: PASS, including publication-safety and citation-conformance checks.
- The six A3 capture digests and dimensions match the receipt. Direct inspection of the forced-failure mobile capture confirms that the fallback, truthful failure status, and disabled control are visible.
- A1/A2 facts, publication safety, and the downstream dynamic-`N` wording were independently checked. The current fixture is consistently described as `N=13`, while compiler/runtime capacity remains data-driven. X1 and X6 require distinct-count fixtures rather than a fixed favicon capacity.

## Findings

### F1 — P1 — Command provenance is declarative, not an immutable execution transcript

**Blocks DONE:** yes.

**Evidence:** A4 requires the Rive/Node/Ruby/browser version commands and outputs in an immutable transcript. Its receipt command is only `node --version`, and `command-transcripts/A4.json` contains only that command's output. The other seven tool commands are rows in `tool-versions.json`; the validator checks only that eight labels exist and that `capturedAtUtc` begins with `2026-11-11`. It does not validate each row's command, exit code, stdout/stderr, executable, working directory, or capture time. Thus, for example, an internally rehashed A4 artifact with an invented Ruby or Chrome output still passes the semantic assertion.

The same provenance weakness affects the full build. `pnpm-build-command-transcript.json` is a four-line summary with `stderr: ""`, while `pnpm-build-success.log` contains the actual npm warnings and much more output. Neither file records the working directory, selected `RBENV_VERSION=3.3.11`, resolved executables, start/end time, or a raw-output digest tying the summary to one invocation. The cold review initially reproduced the expected failure under the ambient system Ruby and only reproduced the successful build after explicitly selecting Ruby 3.3.11, demonstrating that the omitted environment is material.

The A3 induced-failure evidence has the same gap: the metrics contain the string `Chrome --disable-gpu --disable-webgl`, but there is no runner-generated browser command/capture transcript binding that invocation to the two screenshots and metrics. A3's receipt transcript only reruns a verifier over already-authored files.

**Recommended fix:** capture the version probes, successful build, and both failure-browser sessions through a runner that writes start/end UTC, cwd, exact argv, relevant environment/tool selection, resolved executable/version, exit code, and raw stdout/stderr (or immutable raw-stream hashes). Make A4 validate every probe row and make the build/A3 evidence validate those runner receipts rather than self-authored summaries.

### F2 — P1 — A7 does not prove complete page context

**Blocks DONE:** yes.

**Evidence:** `capture-ahmes-page-contexts.py` defines a page's contents with an inner join from `fission_node` to `anchor_spatial`, then sets `nodeCount` to the number returned by that same query. `x0-semantic-assertions.mjs` verifies membership and hashes only those emitted nodes. It never reconciles the emitted set/count with an independent total of all extracted blocks assigned to the page, so omitted nodes lacking an `anchor_spatial` row are invisible to both capture and verification. The artifact therefore proves complete text for its emitted spatial subset, not Acceptance A7's stronger “complete page context” claim.

**Recommended fix:** define the authoritative page-membership relation explicitly and reconcile the captured node IDs/count against an independent page-total query. If nodes without spatial anchors cannot be assigned to a page, record and validate that limitation and narrow A7/report wording instead of claiming complete extracted-page context.

### F3 — P1 — The negative suite would not catch the evidence defects above

**Blocks DONE:** yes.

**Evidence:** the eight A6 mutations operate on the receipt wrapper: ID set, declared digest, declared exit code, transcript presence/exit, pending text, and prose-only structure. They do not mutate semantic artifact content while updating the corresponding receipt digest, do not test falsified A4 command outputs, do not remove an A7 page node while consistently updating `nodeCount`/hashes, and do not test the absence of an induced-failure execution transcript. Consequently the suite proves rejection of malformed receipts, but it would not catch the pre-fix class of internally consistent yet under-proven evidence.

**Recommended fix:** add adversarial semantic mutations that preserve receipt-level consistency: falsify each tool command/output/exit, omit a page member while recomputing local hashes/counts, remove browser/build provenance fields, and substitute baseline/failure capture metadata. Require each to fail for the intended semantic reason and preserve the generated results artifact.

## Acceptance disposition

| Item | Cold-review result |
| --- | --- |
| A1 | PASS |
| A2 | PASS |
| A3 | BLOCKED by F1/F3 (capture contents pass; induced-run provenance does not) |
| A4 | BLOCKED by F1/F3 |
| A5 | PASS; dynamic-`N` and downstream amendments are present |
| A6 | BLOCKED by F3 |
| A7 | BLOCKED by F2/F3 |

There are **three findings: F1–F3, all P1 and all blocking**. PHASE-X0 must not be promoted to DONE until they are resolved and independently rechecked.
