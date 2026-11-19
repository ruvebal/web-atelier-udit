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

The closure review at commit `05058ad` then found two further coordinated
rewrite attacks. Their amendments also await independent certification:

- **Closure F1:** exact tool/build/browser executable and argv contracts are
  enforced; tool probes are re-executed; the full build records effective PATH
  and resolved Ruby/Bundler/Jekyll paths; the exit gate independently rebuilds;
  and Chrome writes the failure screenshots during the recorded sessions.
- **Closure F2:** the cached page-membership manifest no longer acts as a trust
  root. Verification queries the read-only Ahmes SQLite databases and rejects
  coordinated omissions across both JSON artifacts.
- **Adversarial coverage:** fourteen mutations include plausible false Ruby
  output, `/bin/true` build/browser substitution, and joint live-page-member
  omission.

Safe resume point: rerun the external X0 gate from the amendment commit, then
assign a reviewer who did not implement these changes. X1 remains blocked.
