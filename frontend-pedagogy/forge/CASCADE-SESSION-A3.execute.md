<!-- executable · curricula cascade, round 3 (final curriculum wave) · paste as agent prompt -->

# EXECUTE — Cascade Session A3: FE II Wave 4 + CD I remaining stack

**Precondition, already true, verified 2026-08-20:** FE II Waves 1–3
(Units 2–4, 8–10, 11–12) and CD Waves 1–3 (CD II Units II.1–II.6, CD I
Units I.5–I.6) are forged, receipted, and build-green in both repos. This
is the next tier — FE II's last two units, and CD I's entire remaining
stack. Do not redo prior waves.

**Shared rules — identical to `CASCADE-SESSION-A.execute.md` / `-A2`,
same directory. Read that file's header once, do not duplicate here:**
direct authorship with real Ahmes citations (not thessia); Qwen only if
local-model scaffolding is used; inline `<!-- provenance: ... -->` on
every new grounding claim; FE I and the tribunes stay untouched; no
institution-naming for the shared showroom synergy; no research-consent
administration; every citation re-verified live via
`ahmes query --cite --require-evaluator-safe` (venv:
`cd ~/src/ahmes && source .venv/bin/activate`, full `~/ahmes-library/...`
path required, not the bare relative form); a real `[BIBLIO-GAP]` gets one
live `ahmes enrich <db> --meta --online` attempt before being declared
resolved-or-genuine — never forced, never trusted from prior text without
re-checking.

**Receipt incrementally, per item, not just at the end** — a prior run in
this task hit a session/usage limit mid-way; incremental receipts are what
let it resume cleanly.

---

## Item 1 — FE II Wave 4 (Units 1, 7)

**Contract:** `../fe-unit-forge.mdc` · **Matrix:** `../grounding/README.mdc`
**Precedent:** Waves 1–3's `.execute.md`/receipt pairs, same directory —
same STEP A→D shape, same honesty discipline.
**Readiness note (`../TEACHING-READINESS.mdc` §3, Wave 4):** "kickoff
last — it must promise what the other eleven deliver; Unit 7 already has
its ethics section, needs lab + exercises." Check Unit 7's current file
directly before assuming what's missing — do not re-forge what already
exists there; extend it.

1. Read Unit 1 and Unit 7's current matrix rows in the grounding doc
   directly — do not assume NONE or SAFE, check.
2. Draft `FE-II-WAVE-4.execute.md` in this directory, same shape as
   Waves 1–3, one `FORGE FE UNIT` block per unit.
3. Execute: Unit 1 → 7 (or check which needs less work first if one is
   clearly more complete — Unit 7's readiness note suggests it's partial,
   not from-zero).
4. `tracks.yml` patch for these two sessions only.
5. `cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"`
   — must be empty.
6. Write `FE-II-WAVE-4.execution.receipt.md`. State explicitly: after this
   wave, all 12 FE II units have forged lesson content for the first
   time in this cascade — note this milestone in the receipt, but do
   **not** claim the course is pedagogically complete or that hours close
   at 10/30/14 (they don't, per every prior wave's standing note) — say
   so plainly.

---

## Item 2 — CD I remaining stack (Units I.1, I.2, I.3, I.4, I.7, I.8, I.9)

**Repo:** `digital-creativity-uem`
**Contract:** `digital-creativity-pedagogy/dc-unit-forge.mdc` — Wave 4 in
its own §4 table ("2D stack: dibujo, color, efectos, animación,
bodegones") covers I.2/I.3/I.4/I.8/I.9. I.1 and I.7 are the two remaining
CD I anchors not assigned to any numbered wave in that table — forge them
in this same item anyway, since "CD I's remaining stack" is this item's
actual scope, not just the table's Wave-4 label. Confirm by checking
`grounding/README.md`: only I.5/I.6 currently have forged lesson pages;
the other seven do not.

**Matrix rows, read the live file, do not trust this summary over it —
last verified state:**
- **I.1** (intro to digital images) — SAFE: Shinkle 2008,
  `evaluator_safe=yes`, framed as "fashion image as a field of practices,
  not a file format" — does **not** ground Photoshop/tool pedagogy.
- **I.7** (fuentes y referencias compositivas) — `[BIBLIO-GAP]`: Campinho
  et al. 2025, `evaluator_safe=no` (slug-derived, unresolved). Give this
  one a real `ahmes enrich --meta --online` attempt before forging — same
  pattern that resolved Papahristou/Coats in CD I Wave 2. If it resolves,
  cite it; if not, forge I.7 as an honest declared-gap unit with the
  quote-with-gap-visible treatment the matrix specifies.
- **I.2, I.3, I.4, I.8, I.9** — NONE. Forge each as a declared-gap unit,
  technique grounded in dated vendor docs only, per this repo's own
  non-negotiable ("a unit with no evidence says so").

1. For each of the seven units, in order I.1, I.2, I.3, I.4, I.7, I.8,
   I.9: check the live matrix row, attempt the one real enrich check on
   I.7 specifically, then draft/execute per unit.
2. Draft `CD-WAVE-4.execute.md` in `digital-creativity-pedagogy/forge/`,
   same STEP A→D shape as prior CD execute files, one `FORGE CD UNIT`
   block per unit.
3. Execute each completely (A→D, EN+ES) before moving to the next.
4. Wire `docs/_data/lessons.yml` and `docs/_data/tracks.yml` for all
   seven new sessions under `creacion-digital-i` / `digital-creativity-i`.
   Update both EN/ES track pages' Status sections, same discipline as
   prior waves — leave any pre-existing unrelated uncommitted diff in
   those files untouched.
5. `JEKYLL_ENV=production npm run build 2>&1 | grep -i "liquid warning"`
   — must be empty. Spot-check each new built page.
6. Write `CD-WAVE-4.execution.receipt.md`. This closes CD I's full
   nine-unit set for the first time — note the milestone, but state
   plainly whether CD I's 80h contact bucket does or doesn't close (check,
   don't assume based on CD II's pattern), and that hour-closure is not
   pedagogical completeness, same caveat CD Wave 3's receipt used.

---

## OUTPUT CONTRACT

FE II Units 1 and 7 forged + receipted (all 12 FE II units now have
first-pass content) · CD I Units I.1–I.4, I.7–I.9 forged + receipted (all
9 CD I units now have first-pass content) · both repos' build gates green
· one-line missing-evidence statement per unit, all nine units · explicit
note on I.7's `[BIBLIO-GAP]` resolution attempt, resolved or not.
