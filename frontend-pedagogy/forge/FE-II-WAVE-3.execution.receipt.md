# FE II Wave 3 execution receipt

**Executed:** 2026-08-20
**Contract:** `FE-II-WAVE-3.execute.md`
**Units:** 8 — React Three Fiber; 9 — Shader Literacy & Cutting-Edge Interface Aesthetics; 10 — IoT/Robotics Control-Panel & Python-Backed Interface

## What was found at session start (correcting my own priors before acting on them)

Units 8 and 9 were **not** scaffold prose, contrary to what a stale reading of `TEACHING-READINESS.mdc` (audited 2026-08-11) would suggest. Both already carried B1/B2/B3-shaped content dated 2026-08-14 (matching `AUDIT-GROUNDED.md`'s date) — scholarly-honesty declared-gap section, labelled `Excerpt` code, a team lab, an individual-exercises section, dated platform notes, and a TTOD epigraph by ID. `tracks.yml` and `lessons.yml` already carried hour keys and a `draft` registry status for all three units. Unit 10 was genuinely untouched: pure essay, no code-block labels, no B1/B2/B3 split, no declared-gap paragraph, no cited evidence, and an epigraph with **no TTOD ID at all** (a standing publishing-integrity defect independent of this forge — Rule 7 of `lesson-publishing-integrity.mdc`). This receipt therefore reports two different kinds of work: a **live re-verification and correction pass** for Units 8–9, and a **full first-pass forge** for Unit 10.

## Citations — live-checked this session via `ahmes query --cite --require-evaluator-safe`, none trusted from prior text

| Unit | Coat | Node | Page | Citation | Result |
| --- | --- | --- | --- | --- | --- |
| 8 | Neelakantam & Pant (2017) `964c117c` | `c84d51ae-c108-5d94-ade0-7ead0dc88c48` | p.15 | `(Neelakantam 2017, 15)` | **evaluator_safe=yes** — newly added as an explicit node citation (was previously named in prose without a node id) |
| 8 | Shihab et al. (2025) `29f3d2f5` | `1d671902-3c68-5ad4-9b08-198236f1d5e5` | p.9 | `(Shihab 2025, 9)` | **Upgraded from `[BIBLIO-GAP]` → evaluator_safe=yes.** The 2026-08-14 page correctly labelled this `[BIBLIO-GAP]` at the time (per `AUDIT-GROUNDED.md`); the bibliographic-metadata cascade on this coat has since completed (confidence 0.95, source=metadata) — a genuine pipeline-lag closure that happened between 2026-08-14 and this session, not something this session ran. |
| 8 | Wadinambiarachchi et al. (2024) `de51c7ac` | `770815a4-c3b9-5d3e-ab71-5c009548393f` | p.1 | `(Wadinambiarachchi 2024, 1)` | Same pattern — **upgraded from `[BIBLIO-GAP]` → evaluator_safe=yes.** |
| 9 | AI Co-Artist `b431f6a4` | `777b3e26-2775-5cc3-ade3-96fec7239cd9` | p.2 | — | **Re-confirmed `[BIBLIO-GAP]`, genuinely.** `ahmes status`: reason "missing year." `ahmes enrich --meta --online` attempted live this session: **"Host registry mismatch — identifiers only," 0 nodes enriched** — the online registry's title disagrees with the PDF's own heading, so Ahmes correctly refused a silent override. No change to the page's existing (already correct) label; the re-check itself is now recorded inline so a future agent does not have to repeat the enrich attempt. |
| 10 | Murley et al. (2021) `3ee00512` | `40a6fdfe-be41-575f-a1d0-5c2964feaa60` | p.1 | `(Murley 2021, 1)` | **New citation, evaluator_safe=yes** (confidence 0.95, crossref). |
| 10 | Stelea et al. (2025) `c91a8b55` | `bef656b5-408d-5961-aadf-bce6ddef958b` | p.1 | `(Stelea 2025, 1)` | **New citation, evaluator_safe=yes** (confidence 0.95, crossref). |
| 10 | Shihab et al. (2025) `29f3d2f5` | `1d671902-3c68-5ad4-9b08-198236f1d5e5` | p.9 | `(Shihab 2025, 9)` | Reused from Unit 8, per the matrix's own instruction to "prefer Shihab safe nodes for GenAI oral defence" — not new IoT evidence. |
| 10 | Abichandani et al. (2022) `08eb5ba5` | — | — | — | **Genuine `[BIBLIO-GAP]`.** `ahmes status`: evaluator_safe=no, confidence 0.70 (LLM-extracted). `ahmes enrich --meta --online` attempted live: "Host registry mismatch — identifiers only," 0 nodes enriched. Not cited. |
| 10 | Ciungan et al. (2025) `26eedf9b` | — | — | — | **Genuine `[BIBLIO-GAP]`.** `ahmes status`: evaluator_safe=no, confidence 0.70. `ahmes enrich --meta --online` attempted live: 0 nodes enriched, no online registry match. Not cited. |

**No `[BIBLIO-GAP]` row was closed by forcing a citation.** Two rows across Units 8–9 turned out to be real pipeline-lag closures that had already happened before this session (re-verified, not assumed); three rows (AI Co-Artist, Abichandani, Ciungan) were checked with a real `ahmes enrich --meta --online` attempt each and confirmed genuine content gaps — Ahmes's own host-registry-mismatch refusal is the mechanism that prevented a silent wrong-paper override, same discipline as CD I Wave 2's Widiyawati rejection.

## TTOD epigraphs

- Units 8 (`arch-001`, `wis-002`) and 9 (`qa-009`, `wis-002`) were already present from the 2026-08-14 pass and resolve correctly via the bridge — kept as-is, no re-selection needed.
- Unit 10's two pre-existing epigraphs had **no TTOD ID and do not exist in `ttod.yml`** — removed rather than re-attributed (inventing an ID for them would have been worse than declaring the defect). Replaced with `img-032` ("Optimize not for the device you hold, but for the connection you cannot see.") at the opening — selected via `ttod_cli_adapter.TTODCliAdapter.search_quotes(theme="connection")`, not by hand-parsing `ttod.yml`. Its native section is `images` (responsive-image performance); the fit to WebSocket connection-lifetime is **analogical**, disclosed inline in the execute file, same discipline as Wave 2's `ops-001` and CD I Wave 2's `wis-013`/`qa-013`. Closing epigraph is `arch-007` ("Ship the module when it works alone…"), chosen over reusing `wis-002` a third time across three consecutive frontier units — both confirmed unused elsewhere in FE II before selection (`grep` across `web-foundations/docs/lessons/en/feii/*/index.md`).

## Code block policy

Unit 10's device-control and WebSocket snippets were converted from TypeScript to plain JS (repo convention: "do not leave TypeScript fences in lessons meant to stay JavaScript-first," `lesson-code-block-conventions.mdc`) and labelled `Excerpt`. The data-source specification is labelled `Template` with each placeholder value marked "replace." The FastAPI/Python block stays as-is — a different, explicitly targeted stack, not JS.

## Wiring

- `tracks.yml`: hour keys for `unit-8-r3f-fundamentals` (magistral 1 / lab 3 / ejercicios 0), `unit-9-shader-literacy` (0.5 / 3 / 0), `unit-10-iot-python-backend` (0.5 / 4 / 0) were **already present** from a prior, out-of-scope patch — verified, not retuned. Flagged, not silently fixed: Units 8–10 all now carry an individual-exercises section (Unit 10's is new this session) against an `ejerciciosHours: 0` allocation in all three sessions — the same kind of imperfect-but-disclosed mismatch Wave 2 flagged for `ops-001`'s fit, not something this cascade's scope authorized retuning.
- `lessons.yml`: all three entries already existed with `status: draft` — verified, not duplicated. Frontmatter `status:` in the three `index.md` files was `complete` (a pre-existing mismatch against the registry's own `draft`) — set to `draft` in all three to match `lessons.yml` and the forge contract's "status: draft until Step D passes."
- New sibling files added (did not exist before this session, unlike Waves 1–2's units): `unit-8-r3f-fundamentals/{deck-outline.md,exercises.md}`, `unit-9-shader-literacy/{deck-outline.md,exercises.md}`, `unit-10-iot-python-backend/{deck-outline.md,exercises.md}`.

## Build

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```

Result: **PASS (empty)**. Full build succeeded (180 HTML files normalized, `mark-broken-links` reported no broken URLs). Spot-checked built output: `_site/lessons/en/feii/unit-8-r3f-fundamentals/index.html` and `unit-9-shader-literacy/index.html` both contain "Scholarly honesty" intact; `unit-10-iot-python-backend/index.html` contains it twice (heading + prose) and all five citation strings (`img-032`, `Shihab 2025`, `Murley 2021`, `Stelea 2025`) survived the build — no Liquid deletion inside fences. The six new/verified `deck-outline.md`/`exercises.md` sibling files copy through to `_site/` as static `.md`, identical to how Waves 1–2's sibling files already behave (verified against `unit-11-capstone-integration/`'s pre-existing pair) — this is expected Jekyll behavior, not a new defect.

## One-line missing-evidence statement per unit

- **Unit 8:** R3F-as-pedagogy = `[UNVERIFIED-GAP]` (no vault source), unchanged; Neelakantam & Pant grounds technique only; two adjacent CS-education findings moved from `[BIBLIO-GAP]` to real citations this session but remain adjacent, not R3F-pedagogy evidence.
- **Unit 9:** minimum-viable-GLSL-as-pedagogy = `[UNVERIFIED-GAP]`, unchanged; AI Co-Artist re-confirmed genuinely `[BIBLIO-GAP]` after a live enrich attempt.
- **Unit 10:** WebSocket/IoT/Python interface-transfer pedagogy = `[UNVERIFIED-GAP]`; Abichandani and Ciungan (the two IoT-education-specific coats named in the matrix) both re-confirmed genuinely `[BIBLIO-GAP]` after live enrich attempts; what is cited (Murley, Stelea, Shihab) grounds technique/vocabulary/AI-declaration framing, not interface-transfer pedagogy.

## Remaining boundary

- Units 1 and 7 remain unforged (Wave 4), as stated in the contract.
- FE II hour totals across all 12 sessions still do not close at the official 10/30/14 CV bucket within this cascade's scope — same standing note as Wave 2's receipt; not retuned here.
- The `ejerciciosHours: 0` vs. actual individual-exercise content mismatch on Units 8, 9, and 10 is flagged above, not fixed — fixing `tracks.yml` hour allocations is out of this wave's scope per the contract ("verify, do not retune").
- No research-consent administration, DPO approval, or research-data collection is implied by any team-lab evidence described in B2.
- This receipt does not claim Units 8–10's pedagogical gaps are closed — R3F, shader, and IoT/interface-transfer pedagogy all remain declared `[UNVERIFIED-GAP]` by design, per the grounding matrix and the fe-unit-forge non-negotiable that "a unit with no evidence says so."
