# PHASE-X11 cold review — round 2

**Reviewer:** fresh `cascade-cold-reviewer` session; did not implement X11 or its F1 repair.  
**Verdict:** all acceptance items pass. Prior P1 F1 is closed; no remaining finding blocks orchestrator promotion.

## Inputs reviewed

- `PHASE-X11.md`, the updated four-lesson diff, `PHASE-X11-REPORT.md`, and `PHASE-X11-VERIFY-LOG.md` (harness exit 0 after the repair)
- the earlier cold review and the F1-only executor amendment
- generated satellite and assignment pages, `lessons.yml`, the FE II index, and the `instructor-studio-x10` aggregator checkout
- `AUTOPILOT.md`, `DECISIONS.md`, `REPO-SHAPE.md`, the cascade hard constraints, and the student/instructor audit boundary

## Acceptance evidence

| Acceptance item | Independent runnable evidence | Result |
| --- | --- | --- |
| Full publication build and Liquid safety | With the repository's rbenv/NVM PATH, `npm run build` exited 0: Jekyll built 196 HTML files, publication safety passed, and citation conformance passed. `rg -i 'Liquid Warning' _site` returned no match. System Ruby alone lacks the lockfile's Bundler 2.5.22; this is a host PATH issue, not a source failure. | PASS |
| Satellite and assignment permalinks render | Non-empty generated pages exist at `_site/lessons/en/feii/cover-shaders/index.html`, `ktx2-basis/index.html`, and `units-8-9-assignment/index.html`; each has its References section. | PASS |
| Publication firewall | `rg -i 'ahmes|deviac|⟨|evaluator_safe|BIBLIO-GAP|forged in X[78]'` over the three generated paths returned no match. | PASS |
| Registry and sequence | `lessons.yml` records `feii-cover-shaders`, `feii-ktx2-basis`, and `feii-units-8-9-assignment`; source directories and rendered permalinks match. | PASS |
| X6–X9 carry-forwards | The Unit 8 fork is explicitly a lab sandbox, template scope is the cover fork, the aggregator prop/asset/budget/transcoder contract is documented and present, KTX2 wording is ordered correctly, and D23/post-pass wording is preserved. | PASS |
| D24 references and publication truthfulness | There are 2 Unit 8, 4 cover-shaders, and 3 KTX2 direct running-reference lines. Their live and source URLs currently return the documented 404 warning; the assignment calls them `react-template` routes **(being published)** and requires publishing `react-template` first. `_studio` remains collaborator-only and teams copy `_template`, never `_studio`. | PASS |
| Prior F1 shader diagnostic | See closure evidence below. | PASS |
| Cold review filed; blocking findings closed | This round-2 review is present and contains no unresolved P0/P1/P2 finding. | PASS |

## F1 closure — exact shader failure modes

The amended cover-shaders text gives the two distinct cases and matches the adjacent shader source:

1. Removing only the vertex declaration `varying vec2 vUv;` leaves `vUv = uv;`; `vUv` is therefore undeclared and the **vertex shader fails to compile**.
2. Removing both vertex-side lines while the fragment shader still declares and uses `vUv` leaves no vertex output matched to the fragment input; that is the Unit 9-style **linker error**.

The source at lines 268–272 contains the vertex declaration and assignment, line 279 contains the fragment declaration, and the repaired explanation at line 457 names both counterfactuals exactly. Deleting only the assignment remains separately and correctly described as a compile-and-link-successful flat-colour case.

## Agentic-change failure modes

1. **Import/load:** the production build rendered all changed Markdown/Liquid pages.
2. **Full existing suite:** fresh pinned-toolchain `npm run build`, publication safety, citation conformance, the harness gate, and `git diff --check` passed.
3. **Regression counterfactual:** the old one-line deletion diagnosis was false; the repair distinguishes actual vertex compilation from linker-stage failure using the exact adjacent lines.
4. **Return/data shapes:** not applicable to the Markdown-only changes; the actual aggregator five-prop contract and route-local assets were inspected.
5. **Discriminated modes:** references distinguish present-but-unpublished URLs from deployed routes rather than asserting a false live state.
6. **Documentation claims:** built pages, firewall, registry, URL warning state, route contract, root transcoder, and shader source were inspected or executed directly.

## Findings

None. Prior F1 is closed by source-level counterfactual evidence. This reviewer does not mark the phase `DONE`, land, merge, or push.
