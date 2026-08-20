<!-- executable · curricula cascade · paste this file as the agent prompt, new session -->

# EXECUTE — Cascade Session A: FE II Wave 2 + CD II Wave 1 + CD I Wave 2

**No dependency on Session B (tribunes).** Run independently, in parallel or
either order — verified 2026-08-20 by reading every tribune `BRIEF.md`:
none reference curriculum-forge output, and no curriculum doc references
the tribunes. "Cascade" here means shared harness discipline (grounding
order, provenance trace, disclosure), not a sequential trigger.

**Repos:** `web-atelier-udit` (FE) and `digital-creativity-uem` (CD) — this
session touches both, sequentially, item by item below.

**Model routing (do not blur):** curricula are authored **directly by you**
(the orchestrating agent), following the `.mdc` procedures below with real
Ahmes citations — same as `FE-II-WAVE-1.execute.md` was executed, which
required no model call and has a receipt. This is **not** `thessia-scholar-v3`
(personal-voice register, Session B only). If any local-model scaffolding
assist is used at all, it is the generic Qwen model
(`qwen2.5:72b-instruct-q4_K_M` via the Python Ollama API client, explicit
timeout, per `local-ai.mdc` — never the interactive CLI), never thessia.

**Provenance trace (mandatory, per `tribune-forger` §5d, inherited by
`curriculum-forger` §6):** every grounding claim this session adds gets an
inline `<!-- provenance: ... -->` comment showing how it was found — future
agent must be able to verify without re-deriving.

**Out of scope, explicitly:** FE I (already `delivered`, do not re-forge).
The three tribunes (Session B). Any institution name for the shared
showroom synergy — `atelier-synergy-vshowroom.mdc`'s forge-output rule
still applies, FE-facing content stays unnamed. Research-consent
administration.

---

## Item 1 — FE II Wave 2 (Units 2, 3, 4)

**Contract:** [`../fe-unit-forge.mdc`](../fe-unit-forge.mdc)
**Matrix:** [`../grounding/README.mdc`](../grounding/README.mdc)
**Precedent, same shape, already receipted:**
[`FE-II-WAVE-1.execute.md`](./FE-II-WAVE-1.execute.md) /
[`FE-II-WAVE-1.execution.receipt.md`](./FE-II-WAVE-1.execution.receipt.md)
**Readiness note (`../TEACHING-READINESS.mdc` §3, Wave 2):** "the platform
the frontier needs. All three **declare a gap**; ground technique in dated
vendor docs only." Do not promote vendor docs to `(Author Year)` citations.

1. Draft `FE-II-WAVE-2.execute.md` in this directory, same STEP A→D shape
   as Wave 1's file, one `FORGE FE UNIT` block per unit (2, 3, 4). Pull
   each unit's row from the grounding matrix first — expect `NONE` /
   declared-gap for pedagogy, vendor-docs-only for technique.
2. Execute it: Unit 2 → 3 → 4, complete (A→D) before moving to the next.
3. `tracks.yml` patch: `magistralHours`/`labHours`/`ejerciciosHours` for
   these three sessions only. Do not retune others.
4. `cd web-foundations && npm run build 2>&1 | grep -i "liquid warning"` —
   must be empty.
5. Write `FE-II-WAVE-2.execution.receipt.md`, same shape as Wave 1's,
   including the one-line missing-evidence statement per unit and the
   explicit boundary note (Units 1/7–10 still not closed; that's Wave 3/4).

---

## Item 2 — CD II Wave 1 (Unit II.5)

**Repo:** `digital-creativity-uem`
**Trigger file — already written, never executed** (checked 2026-08-20, no
receipt exists):
[`digital-creativity-pedagogy/forge/CD-II-II.5.execute.md`](/Users/ruvebal/projects/ruvebal/scholar/universidadeuropea/digital-creativity-uem/digital-creativity-pedagogy/forge/CD-II-II.5.execute.md)

1. Read that file in full — it is the filled master prompt, run it as-is,
   do not redraft.
2. Emit B1·B2·B3 (EN+ES) + unsigned S1/S2 studio-brief templates, per its
   own contents.
3. Verify per `digital-creativity-uem`'s own build/publish gate (same
   Liquid-warning discipline as FE).
4. Write `CD-II-II.5.execution.receipt.md` alongside the trigger file —
   this wave currently has none; that gap is why it's in this cascade.

---

## Item 3 — CD I Wave 2 (Units I.5/I.6, 3D-form/volume)

**Blocker status, checked 2026-08-20:** the gate in
`digital-creativity-pedagogy/TEACHING-READINESS.mdc` §3 ("I.5/I.6 with NONE
declared **unless** `dc-3d-form-volume-pedagogy` Pass 3 upgrades the matrix
first") is **substantively closed** — the field run at
`~/src/profield/runs/dc-3d-form-volume-pedagogy/20260820/` completed all
three passes (205 rows, 59 confirmed, 1 disputed, 144 unverified, 54
pending OA; Pass 3 was a real WebSearch/Crossref-verified audit, not a
restatement). **But the matrix itself was never plugged** — confirmed by
grep: `digital-creativity-pedagogy/grounding/README.md` has zero mentions
of this field. Wire it before forging, don't forge on an unplugged matrix.

1. Read `~/src/profield/runs/dc-3d-form-volume-pedagogy/20260820/digest.md`
   — use only the 59 `confirmed` rows as citable ground; `disputed` and
   `unverified` rows stay flagged, not promoted.
2. Add I.5/I.6 rows to `digital-creativity-pedagogy/grounding/README.md`
   following the file's existing row format, each claim resolved via
   `ahmes query --cite` (not the digest's raw prose), `evaluator_safe=yes`
   before use. Provenance-trace comment per confirmed row, pointing at the
   digest and the specific Ahmes node.
3. Draft `CD-I-WAVE-2.execute.md` in `digital-creativity-pedagogy/forge/`,
   same STEP A→D shape as `CD-II-II.5.execute.md`, for Units I.5 and I.6.
4. Execute it. If a sub-claim the digest flagged `unverified` turns out to
   be load-bearing for a lab brief, declare that specific gap in the unit
   rather than borrowing a `confirmed` row's citation to cover it.
5. Verify + receipt, same discipline as Items 1–2.

---

## OUTPUT CONTRACT

FE II Units 2–4 upgraded + receipted · CD II Unit II.5 executed + receipted
· `digital-creativity-pedagogy/grounding/README.md` I.5/I.6 rows plugged ·
CD I Units I.5–I.6 executed + receipted · both repos' build gates green ·
one-line missing-evidence statement per unit, all six units.
