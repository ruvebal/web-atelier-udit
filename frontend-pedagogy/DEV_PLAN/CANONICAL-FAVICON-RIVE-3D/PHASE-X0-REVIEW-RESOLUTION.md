# PHASE-X0 cold-review amendment

**Status:** VERIFYING — requires independent re-review

The three P1 findings in `PHASE-X0-COLD-REVIEW.md` have implementation
amendments, but this document does not certify them closed.

- **F1:** runner-generated tool, build and induced-browser provenance now
  records resolved executables, argv, cwd, material environment, timestamps,
  exits and raw-stream/capture hashes.
- **F2:** page evidence is reconciled against an independently serialized
  authoritative membership manifest covering every extracted `fission_node`;
  every source reports zero unassigned nodes.
- **F3:** the negative suite now includes invented/rehashed tool output,
  missing browser provenance, and page-member omission with local hashes
  recomputed.
- **Gate hygiene:** Rive verification runs in an isolated temporary copy and
  cleans it on exit.

Safe resume point: rerun the external X0 gate from the amendment commit, then
assign a reviewer who did not implement these changes. X1 remains blocked.
