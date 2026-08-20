<!-- executable · curricula cascade, round 2 · paste this file as the agent prompt, new session -->

# EXECUTE — Cascade Session A2: FE II Wave 3 + CD Wave 3

**Precondition, already true, verified 2026-08-20:** FE II Wave 2 (Units
2–4), CD II Wave 1 (II.5), and CD I Wave 2 (I.5–I.6) are all forged,
receipted, and build-green in their respective repos. This file is the
next tier out — do not redo any of that.

**No cross-dependency between Item 1 and Item 2** — same as Session A,
run in either order.

**Model routing, provenance-trace, and out-of-scope rules — identical to
`CASCADE-SESSION-A.execute.md` in this same directory. Read that file's
header once for the full statement of those rules** (do not duplicate
prose here): direct authorship with real Ahmes citations, not thessia;
Qwen only if any local-model scaffolding is used; inline
`<!-- provenance: ... -->` on every new grounding claim; FE I and the
tribunes stay untouched; no institution-naming for the shared showroom
synergy; no research-consent administration.

---

## Item 1 — FE II Wave 3 (Units 8, 9, 10)

**Contract:** `../fe-unit-forge.mdc`
**Matrix:** `../grounding/README.mdc`
**Precedent:** `FE-II-WAVE-1.execute.md` / `FE-II-WAVE-2.execute.md` and
their receipts — same STEP A→D shape, same honesty discipline (declared
gaps stay declared, vendor docs never promoted to `(Author Year)`).
**Readiness note (`../TEACHING-READINESS.mdc` §3, Wave 3):** "the
frontier. Declare pilot. Neelakantam & Pant grounds *technique* for 8–9
only." Unit 10 (IoT/Python) — check the matrix row directly; do not assume
it shares Neelakantam & Pant's coverage without checking.

1. Draft `FE-II-WAVE-3.execute.md` in this directory, same shape as
   Waves 1–2, one `FORGE FE UNIT` block per unit (8 R3F, 9 Shaders, 10
   IoT/Python).
2. Execute it: Unit 8 → 9 → 10, complete (A→D) before moving to the next.
3. `tracks.yml` patch for these three sessions only.
4. `cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"` —
   must be empty.
5. Write `FE-II-WAVE-3.execution.receipt.md`, same shape as Waves 1–2's
   receipts, including the missing-evidence statement per unit and the
   explicit boundary note (Units 1 and 7 still open — Wave 4, not this
   run).

---

## Item 2 — CD Wave 3 (CD II remaining: II.1, II.2, II.3, II.4, II.6)

**Repo:** `digital-creativity-uem`
**Contract:** `digital-creativity-pedagogy/dc-unit-forge.mdc` §4's own
forge-order table names this as Wave 3: "Avatars · experiencias · AR ·
vídeo · retoque."
**Matrix rows, read `digital-creativity-pedagogy/grounding/README.md`
directly before assuming — do not trust this summary over the live file:**
as of the last verified read, II.1 (retoque) and II.2 (avatares) are
`[BIBLIO-GAP]` (real sources exist, `evaluator_safe=no`), II.3
(experiencias) is SAFE-as-phenomenon (Kim 2023, `evaluator_safe=yes`, but
explicitly flagged as evidence of an industry phenomenon, not a validated
teaching sequence), II.4 (vídeo) is NONE, II.6 (hologramas/AR) is NONE
(reuses the II.3 Kim node as a stimulus-type parallel, not AR pedagogy —
do not double-cite it as if it were independent AR evidence).

1. For each of the five units, check whether the matrix's `[BIBLIO-GAP]`
   rows (II.1, II.2) can be resolved the same way CD I Wave 2 resolved
   Papahristou/Coats — check `ahmes status` on the underlying vault first;
   if it's a real pipeline-lag gap (metadata never ran), run
   `ahmes enrich <db> --meta --online` and re-verify live before citing.
   If the gap is a genuine content gap (no real DOI/record to resolve),
   leave it `[BIBLIO-GAP]` — do not force a citation.
2. Draft `CD-WAVE-3.execute.md` in `digital-creativity-pedagogy/forge/`,
   same STEP A→D shape as prior CD execute files, one `FORGE CD UNIT`
   block per unit, in the order II.1, II.2, II.3, II.4, II.6.
3. Execute each completely before moving to the next. Where a unit's
   matrix row is NONE or unresolved `[BIBLIO-GAP]`, forge it as an honest
   declared-gap unit (technique grounded in dated vendor docs only, per
   this repo's own non-negotiable "a unit with no evidence says so") —
   do not skip the unit or leave it half-forged because evidence is thin.
4. Wire `docs/_data/lessons.yml` and `docs/_data/tracks.yml` for all five
   new sessions under `creacion-digital-ii` / `digital-creativity-ii`.
   Update both EN/ES track pages' Status sections. Leave any pre-existing
   unrelated uncommitted diff in those files untouched, as prior waves
   did.
5. `JEKYLL_ENV=production npm run build 2>&1 | grep -i "liquid warning"` —
   must be empty. Spot-check each new built page for its provenance/
   evidence-gate section surviving the build.
6. Write `CD-WAVE-3.execution.receipt.md` in the same `forge/` directory,
   same depth/honesty as `CD-I-WAVE-2.execution.receipt.md` — name exactly
   which units got real citations vs. stayed declared-gap, and do not
   claim a `[BIBLIO-GAP]` resolution that wasn't independently
   re-verified via `ahmes query --cite --require-evaluator-safe`.

---

## OUTPUT CONTRACT

FE II Units 8–10 forged + receipted · CD II Units II.1/II.2/II.3/II.4/II.6
forged + receipted · both repos' build gates green · one-line
missing-evidence statement per unit, all eight units · explicit note on
which `[BIBLIO-GAP]` rows were genuinely resolved vs. left standing.
