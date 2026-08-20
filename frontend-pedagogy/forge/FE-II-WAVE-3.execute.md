<!-- executable · FE II unit forge · Wave 3 · paste this file as the agent prompt -->

# EXECUTE — FE II Wave 3 (Units 8, 9, 10)

**Repo:** `web-atelier-udit`
**Contract (do not rewrite):** [`../fe-unit-forge.mdc`](../fe-unit-forge.mdc)
**Matrix (authoritative):** [`../grounding/README.mdc`](../grounding/README.mdc)
**Publish rules:** [`.cursor/rules/lesson-publishing-integrity.mdc`](../../.cursor/rules/lesson-publishing-integrity.mdc)
**Instructor/student split contract (Units 8–9, mandatory read before writing):** [`web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md`](../../web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md)
**Precedent, same shape, already receipted:** [`FE-II-WAVE-2.execute.md`](./FE-II-WAVE-2.execute.md) / [`FE-II-WAVE-2.execution.receipt.md`](./FE-II-WAVE-2.execution.receipt.md)

This file is the filled master prompt. The `.mdc` is the procedure.

**Not this run:** FE I. Unit 1 and Unit 7 (still scaffold; Wave 4). Reveal.js decks proper (forge wave 5 — `deck-outline.md` is a speaker-claim list, not a built deck). Spanish FE II. Research-consent administration. No MCP/Stitch/corpus-to-boilerplate content on the student path — instructor-only, per `AUDIT-GROUNDED.md`.

**Found at session start (2026-08-20):** Units 8 and 9 are **not** scaffold prose — a prior, unreceipted pass (dated 2026-08-14 in the file's own frontmatter, matching `AUDIT-GROUNDED.md`'s date) already appended B1/B2/B3-shaped content: scholarly-honesty declared-gap paragraph, labelled `Excerpt` code blocks, a team lab section, an individual exercises section, platform-notes with dated version pins, and a TTOD epigraph by ID. `tracks.yml` and `lessons.yml` already carry both units with hour keys and a `draft` registry status. **This wave's real job for 8–9 is a live re-verification and correction pass, not a from-zero forge** — STEP A below re-checks every citation live and found two that had gone stale. Unit 10 is untouched scaffold (essay, unlabelled code, no B1/B2/B3 split, an uncited epigraph) and gets the full forge.

Execute **Unit 8 completely (A→D)**, then **Unit 9**, then **Unit 10**, each commit-ready before moving to the next.

---

# FORGE FE UNIT — FE II Unit 8: React Three Fiber — 3D Interfaces with React Patterns

## INPUT

- COURSE: FE II
- UNIT: 8 of 12
- CONTENIDOS anchor: frontier — none (Entrega 2 seed, 3D interface layer)
- HOURS: magistral **1** · lab **3** · ejercicios **0** — already present in `tracks.yml` (verify, do not retune; note the exercises section in the page carries ~1 h of content against an `ejerciciosHours: 0` allocation — flagged, not silently fixed, same discipline as Wave 2's `ops-001` flag).
- ARTEFACT ROLE: 3D viewer core for the Entrega 2 seed / vShowroom.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade in place, do not fork): `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md`

## STEP A — GROUND BEFORE WRITING (re-verification, not first pass)

1. Matrix row **8**: **NONE** for R3F pedagogy — declared `[UNVERIFIED-GAP]`. Neelakantam & Pant `964c117c` is technique-only (HOW). Adjacent AI-coding coats ground human-in-the-loop merge gates, never "R3F teaches well."
2. Live re-check via `ahmes query --cite --require-evaluator-safe` (this session, not trusted from the 2026-08-14 text):
   - Neelakantam & Pant (2017), *Learning Web-based Virtual Reality* · coat `964c117c` · node `c84d51ae-c108-5d94-ade0-7ead0dc88c48` · p.15 · `(Neelakantam 2017, 15)` — **evaluator_safe=yes**. Text: "With the various WebVR frameworks that have been developed, the complexity of leveraging WebGL efficiently…" — grounds *why* a declarative abstraction over raw WebGL exists; not previously cited by an explicit node in the page (only named in prose). **Add the explicit node citation.**
   - Shihab et al. (2025), copilot cognitive-offloading · coat `2506_10051_copilot_brownfield_29f3d2f5` · node `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p.9/10 — the page currently labels this **`[BIBLIO-GAP]`** (true as of 2026-08-14, per `AUDIT-GROUNDED.md`). Live re-check this session: **now resolves `evaluator_safe=yes`, confidence 0.95, source=metadata** — the bibliographic-metadata cascade ran on this coat since 2026-08-14 (a real pipeline-lag closure, not something this session did). **Correct the page: `(Shihab 2025, 9)`, drop the `[BIBLIO-GAP]` tag.** The epistemic boundary is unchanged — it is still an adjacent CS-education finding about cognitive offloading, not R3F pedagogy evidence; only its citation-resolution status changed.
   - Wadinambiarachchi et al. (2024), design fixation · coat `2403_11164_design_fixation_de51c7ac` · node `770815a4-c3b9-5d3e-ab71-5c009548393f` · p.1 — same finding: page says `[BIBLIO-GAP]`, live re-check this session shows **evaluator_safe=yes**. **Correct to `(Wadinambiarachchi 2024, 1)`.**
3. Vendor docs (`three`, `@react-three/fiber`, `@react-three/drei`) stay platform notes. Re-verify version pins by search before trusting the existing 2026-08-14 pin; if unchanged, re-date the "checked" line to 2026-08-20.
4. TTOD epigraphs already present (`arch-001`, `wis-002`) — both resolve via the bridge, keep as-is; no re-selection needed.

## STEP B — CORRECT AND COMPLETE THE EXISTING ARTEFACTS

- In "Scholarly honesty" section: replace the two `[BIBLIO-GAP]` bullets with resolved citations per Step A.2 (keep the epistemic-boundary sentence — adjacent finding, not R3F pedagogy evidence — unchanged).
- Add one sentence in the "Why React Three Fiber?" section citing Neelakantam & Pant's node explicitly for the WebGL-complexity claim, replacing the un-nodeed prose mention.
- Re-date the platform-notes version-pin line to the date this session verified it.
- Add `<!-- provenance: ... -->` inline comments on the three corrected/added claims.
- Set `status: draft` in frontmatter (was `complete`; matches `lessons.yml`'s existing `draft` and the forge contract's "status: draft until Step D passes").

## STEP C — WIRE IT

- `tracks.yml` `unit-8-r3f-fundamentals`: hour keys already present — verify only, do not retune.
- `lessons.yml` entry already exists — do not duplicate.
- Add sibling files (did not exist before this session): `deck-outline.md` (speaker claims only, ≤12), `exercises.md` (pointer to the page's existing individual-exercises section, flag the no-AI exercise).

## STEP D — VERIFY

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```
Must be empty. Both corrected nodes resolve live. One-line missing-evidence statement.

---

# FORGE FE UNIT — FE II Unit 9: Shader Literacy & Cutting-Edge Interface Aesthetics

## INPUT

- COURSE: FE II
- UNIT: 9 of 12
- CONTENIDOS anchor: frontier — none
- HOURS: magistral **0.5** · lab **3** · ejercicios **0** — already present in `tracks.yml`; same ejercicios-allocation flag as Unit 8 (page carries ~1 h of individual-exercise content against `ejerciciosHours: 0`).
- ARTEFACT ROLE: shader layer for the Entrega 2 3D core.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade in place): `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md`

## STEP A — GROUND BEFORE WRITING (re-verification)

1. Matrix row **9**: **NONE** for a GLSL syllabus — declared `[UNVERIFIED-GAP]`. AI Co-Artist and SGP-GenBench are adjacent, not a curriculum source.
2. Live re-check:
   - AI Co-Artist · coat `2512_08951_ai_co_artist_b431f6a4` · node `777b3e26-2775-5cc3-ade3-96fec7239cd9` · p.2 — page already labels this `[BIBLIO-GAP]`. Live re-check this session **confirms it still fails** (`ahmes status`: `Citation preview: [BIBLIO-GAP]`, reason `missing year`; `ahmes enrich --meta --online` attempted this session, result: "Host registry mismatch — identifiers only," 0 nodes enriched — the registry's title does not match this PDF's own heading, so Ahmes correctly refuses a silent override rather than force a citation). **This is a genuine content gap, not pipeline lag — stays `[BIBLIO-GAP]`, no change to the page's existing correct labelling.**
   - SGP-GenBench mentioned in prose without a node citation in the current page — leave as unsourced prose (it already reads as "render-then-judge pipelines exist," not an `(Author Year)` claim); no fix needed, it was never mis-cited.
3. Platform notes (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`) stay vendor notes; re-date the "checked" line to this session.
4. TTOD epigraphs already present (`qa-009`, `wis-002`) — keep; both resolve.

## STEP B — CORRECT AND COMPLETE

- No citation-status correction needed (Unit 9's one cited node was already correctly labelled `[BIBLIO-GAP]` and stays so after live re-check — record the re-check, do not silently skip it).
- Re-date the platform-notes line.
- Add one `<!-- provenance: ... -->` comment recording this session's live re-verification of the AI Co-Artist BIBLIO-GAP status (so a future agent does not have to re-run the enrich attempt to know it was already tried and failed honestly).
- Set `status: draft` (was `complete`), matching `lessons.yml` and Unit 8.

## STEP C — WIRE IT

- `tracks.yml` `unit-9-shader-literacy`: hour keys already present — verify only.
- `lessons.yml` entry already exists.
- Add sibling files: `deck-outline.md`, `exercises.md` (pointer to the MV GLSL checklist as the graded artefact, one no-AI exercise flagged).

## STEP D — VERIFY

Same build command as Unit 8. Must be empty. `[BIBLIO-GAP]` node re-confirmed live, not assumed. One-line missing-evidence statement.

---

# FORGE FE UNIT — FE II Unit 10: IoT/Robotics Control-Panel & Python-Backed Interface

## INPUT

- COURSE: FE II
- UNIT: 10 of 12
- CONTENIDOS anchor: frontier — none
- HOURS: magistral **0.5** · lab **4** · ejercicios **0** — already present in `tracks.yml`; verify only. Same ejercicios-allocation flag: this forge adds an individual-exercise section for the first time, against a `0` ejercicios allocation already in the sessions data.
- ARTEFACT ROLE: live-data / device-interface layer for Entrega 2; explicit placeholder pending the Back-End II synergy sheet (Phase 5) — **do not remove that placeholder framing, it is accurate**.
- COHORT: continuing · n < 15
- EXISTING PAGE (upgrade in place, do not fork): `web-foundations/docs/lessons/en/feii/unit-10-iot-python-backend/index.md` — pure essay: no code-block labels, no B1/B2/B3 split, no declared-gap paragraph, no cited evidence, an epigraph with **no TTOD ID** (a publishing-integrity defect on its own — Rule 7, "quotes come from TTOD, with their ID" — fix it regardless of the forge).

## STEP A — GROUND BEFORE WRITING

1. Matrix row **10**: Abichandani `08eb5ba5`; Ciungan `26eedf9b`; Murley `3ee00512`; Stelea `c91a8b55`; Shihab `29f3d2f5` (`evaluator_safe=yes`, useful for the GenAI-oral-defence framing) — **interface-transfer pedagogy still NONE**. Teach connection-lifetime + HMI membrane; do not claim HE transfer evidence.
2. Live `ahmes query --cite --require-evaluator-safe` this session, each checked individually:
   - **Murley et al. (2021)**, *WebSocket Adoption and the Landscape of the Real-Time Web* (WWW'21), DOI `10.1145/3442381.3450063` · coat `3ee00512` · node `40a6fdfe-be41-575f-a1d0-5c2964feaa60` · p.1 · `(Murley 2021, 1)` — **evaluator_safe=yes**. Empirical Tranco-Top-1M measurement of real-time bidirectional web adoption — grounds the *technique* claim that WebSocket exists to serve a real, measured use case, not merely a course convenience.
   - **Stelea, Sangeorzan & Enache-David (2025)**, *Accessible IoT Dashboard Design with AI-Enhanced Descriptions for Visually Impaired Users*, DOI `10.3390/fi17070274` · coat `c91a8b55` · node `bef656b5-408d-5961-aadf-bce6ddef958b` · p.1 · `(Stelea 2025, 1)` — **evaluator_safe=yes**. IoT dashboard/data-stream vocabulary, with an accessibility angle (WAI-ARIA, semantic HTML5) — cross-links the accessibility cross-cutting rule in the grounding matrix.
   - **Shihab et al. (2025)** · coat `29f3d2f5` · node `1d671902-3c68-5ad4-9b08-198236f1d5e5` · p.9/10 · `(Shihab 2025, 9)` — **evaluator_safe=yes** (same node re-verified for Unit 8 above). Reused here per the matrix's own instruction ("prefer Shihab safe nodes for GenAI oral defence") for the AI-declaration framing, not as new IoT evidence.
   - **Abichandani et al. (2022)**, *Internet-of-Things Curriculum, Pedagogy, and Assessment*, coat `08eb5ba5` — checked `ahmes status`: `evaluator_safe: no`, confidence 0.70 (LLM-extracted, not Crossref). `ahmes enrich --meta --online` attempted this session: **"Host registry mismatch — identifiers only," 0 nodes enriched** — the online registry's title disagrees with this PDF's own heading/slug, so Ahmes correctly refuses a silent override. **Genuine content gap, stays `[BIBLIO-GAP]`.** (Note: despite the title, this coat is IoT-curriculum literature in general, not front-end-course transfer pedagogy specifically — even if it resolved, it would not close the matrix's "interface-transfer pedagogy NONE" gap on its own.)
   - **Ciungan et al. (2025)**, *Enhancing IoT Education Through Hybrid Robotic Arm Integration*, coat `26eedf9b` — same check: `evaluator_safe: no`, confidence 0.70. `ahmes enrich --meta --online` attempted: **0 nodes enriched, no registry match found online.** **Genuine content gap, stays `[BIBLIO-GAP]`.**
   - AI Co-Artist is **not** cited in this unit (it is a graphics/shader coat, out of scope for IoT — do not import Unit 9's gap here).
3. FastAPI / WebSocket API / MDN docs stay platform notes, pinned and dated this session.
4. TTOD epigraph: searched via the ttod-bridge adapter (`search_quotes`, themes `connection`/`device`), not by hand-parsing `ttod.yml`. Selected **`img-032`** — *"Optimize not for the device you hold, but for the connection you cannot see."* Native section is `images` (responsive-image performance); the fit here is **analogical**, same disclosure discipline as Wave 2's `ops-001` and CD I Wave 2's `wis-013`/`qa-013` — the connection-you-cannot-see line maps directly onto WebSocket connection lifetime and network reliability, which is genuinely this unit's subject, even though the quote's home section is images. Confirmed unused elsewhere in FE II before selection (grep across `web-foundations/docs/lessons/en/feii/*/index.md` — not present). The existing un-cited epigraphs in the page ("The interface layer doesn't end at REST APIs…" / "…reaches into the physical world.") have **no TTOD ID and are not in `ttod.yml`** — they are removed, not merely re-attributed; do not invent an ID for them.

## STEP B — EMIT THREE ARTEFACTS (full forge — first pass for this unit)

Rewrite the page in the Unit 8/9 register: scholarly-honesty declared-gap section, labelled code blocks (`Excerpt`/`Template`/`CodeSandbox-ready` per the repo's code-block-conventions rule — the FastAPI + WebSocket snippets are `Excerpt`, illustrative and dependent on a real device/service; the placeholder data-source spec is `Template`), platform notes with dated pins, TTOD epigraph by ID.

### B1 · Lección magistral (0.5 h)
- Claim: the interface layer does not stop at REST/GraphQL — the same component model (props, state, hooks) consumes a stateful, bidirectional WebSocket stream or a device API just as it consumes JSON over HTTP; only the data source's *shape* (stateless request/response vs. stateful connection) changes, and that shape change is what the student must reason about.
- Position: Units 8–9 gave the 3D/render half of Entrega 2; Unit 10 gives the live-data/device half — together they seed the capstone (Units 11–12).
- Cite Murley 2021 node for the empirical "real-time web is a real, measured use case" claim, and Stelea 2025 node for the IoT-dashboard/accessibility vocabulary.
- **Declared-gap paragraph**, same register as Units 8–9's "Scholarly honesty": no vault source establishes that teaching WebSocket/IoT/Python-backend interface transfer *produces* better learning outcomes for this cohort. Abichandani and Ciungan are named IoT-education coats in the matrix but both remain `[BIBLIO-GAP]` after a live re-check and a real `ahmes enrich --meta --online` attempt this session (registry title mismatch / no online match — genuine gaps, not forced). Teach connection-lifetime and the human-machine-interface membrane as primitives; do not claim HE transfer evidence.
- TTOD `img-032` at the conceptual turn (the connection you cannot see), disclosed as analogical.
- Speaker outline in `deck-outline.md`.

### B2 · Prácticas de laboratorio (4 h) — TEAM, shared repo
- Real backlog issue: wire the placeholder mock WebSocket service (already specified in the page, keep it — Phase 5 will swap the real Back-End II endpoint) into the Entrega 2 project as a live-data panel, OR stand up the FastAPI control-panel skeleton if the team's seed needs device-control state rather than a stream.
- DoD: `useWebSocket` hook (or equivalent) with explicit connect/reconnect/close handling; CI green; human review after AI review (Unit 6 workflow); release note stating the reconnect strategy chosen and why.
- Roles rotate; do not repeat a Units 8/9 assignment.
- Evidence: branch, PR, a note on what happens when the socket drops (the "connection you cannot see" failure mode, made concrete), AI-review log row if AI was used.
- Code blocks: FastAPI + WebSocket hook are `Excerpt`; the placeholder data-source spec is `Template` (values must be replaced once Phase 5's synergy sheet lands).

### B3 · Resolución de ejercicios (individual) — new section, this unit did not have one
- ≥1 diagnostic: given a `useWebSocket` hook that never calls `ws.close()` in its cleanup, explain the leaked-connection bug across route navigations and fix it.
- ≥1 solvable without AI, declared: given three data-shape descriptions (one-shot control command, continuous sensor stream, occasional status ping), decide REST vs. WebSocket vs. polling for each and justify in one sentence.
- Professor answer sketch: HTML comment, not the student handout.

## STEP C — WIRE IT

- `tracks.yml` `unit-10-iot-python-backend`: hour keys already present (`magistralHours: 0.5`, `labHours: 4`, `ejerciciosHours: 0`) — verify, do not retune (flag the 0 h ejercicios allocation against the new B3 section, same as Units 8–9's flag).
- `status: draft` (matches `lessons.yml`, was `complete`).
- `lessons.yml` entry already exists — do not duplicate.
- Sibling files: `deck-outline.md`, `exercises.md`.

## STEP D — VERIFY

```bash
cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"
```
Must be empty. All five cited nodes (Murley, Stelea, Shihab evaluator_safe=yes; Abichandani, Ciungan confirmed still `[BIBLIO-GAP]` after a real enrich attempt) resolve as stated. One-line missing-evidence statement.

---

## OUTPUT CONTRACT

Unit 8 lesson corrected (two `[BIBLIO-GAP]`→resolved citations, explicit Neelakantam node added) + sibling files · Unit 9 lesson re-verified (one `[BIBLIO-GAP]` re-confirmed genuine after a real enrich attempt) + sibling files · Unit 10 lesson fully forged (B1/B2/B3, two new real citations, two confirmed-genuine `[BIBLIO-GAP]` rows, TTOD ID fix) + sibling files · `tracks.yml` hour keys verified (not retuned) for these three sessions · `lessons.yml` entries verified (already present, not duplicated) · one-line missing-evidence statement per unit · explicit boundary note: Units 1 and 7 remain unforged (Wave 4).
