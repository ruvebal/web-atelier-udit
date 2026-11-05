# PHASE-X13 report — 3D terminology satellite

**Status:** DONE

## Cold-review triage (orchestrator)

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| F1 blanks → `<strong>__</strong>__` | P1 | was Yes | CLOSED round 2: `` `________` `` → 9× `<code>________</code>`, 0× strong mangling |
| F2 deck length | P2 | No | CLOSED: 7 slides |
| F3 D1 “two pages” | P2 | No | CLOSED: D1 AMENDED — three Bloque 5 satellites |
| Round-2 new Fn | — | No | none; Acceptance PASS; gate exit 0 |

**Implementer:** cascade-phase-executor. Worktree: `web-atelier-udit-album-FEII-3D-ALBUM-KTX-13`. Confirmed `.cascade-lane` = `FEII-3D-ALBUM-KTX`. Branch: `cascade/FEII-3D-ALBUM-KTX-13`.

- Implementer stopped at VERIFYING; orchestrator promotes DONE after cold-review clear.
- Exit gate run by harness (twice: pre- and post-triage); both exit 0.
- Did **not** push `web-atelier-udit`.
- Did **not** invoke lesson-scribe / Thessia: all satellite prose is executor-authored restatement of defining lessons + spine §9.

---

## Triage pass (cold-review F1–F3) — 2026-11-05

Fresh executor turn after `PHASE-X13-COLD-REVIEW.md` (verdict NOT READY; F1 P1 blocking). Status remains **VERIFYING**, never DONE.

| Finding | Action |
| --- | --- |
| **F1 (P1)** | Studio-test blanks: bare `________` → `` `________` `` code spans (mode, reason, file bytes, GPU bytes, machine; sanity: textures before/after, levels, `texture.format`). Survives kramdown; no `<strong>__</strong>__`. |
| **F2 (P2)** | `deck-outline.md` compressed **10 → 7** speaker slides (Scope asked 5–7). |
| **F3 (P2)** | Pack `DECISIONS.md` D1: “Two new pages…” → “Three pages under Bloque 5 are **satellites** (cover-shaders, ktx2-basis, 3d-terminology)…”; status AMENDED 2026-11-05. Intent unchanged: no numbered Units 13–14. |

### F1 rebuild evidence

```text
$ bundle exec jekyll build --source docs --destination _site --config _config.yml
… done in 3.699 seconds.  (Liquid Warning: 0)

studio-test section in _site/lessons/en/feii/3d-terminology/index.html:
  <code>________</code> count: 9
  <strong>__</strong>__ count: 0
  <strong>________</strong> count: 0
```

Built blockquote + sanity paragraph now render blanks as `<code>________</code>` only.

---

## Files created / changed

### Created

- `web-foundations/docs/lessons/en/feii/3d-terminology/index.md`
- `web-foundations/docs/lessons/en/feii/3d-terminology/exercises.md`
- `web-foundations/docs/lessons/en/feii/3d-terminology/deck-outline.md`
- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X13-REPORT.md` (this file)

### Changed (initial X13 + triage)

- `web-foundations/docs/_data/lessons.yml` — slug `feii-3d-terminology`
- `web-foundations/docs/lessons/en/feii/index.md` — Bloque 5 / Block 3 satellite list → three satellites
- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md` — one link line
- `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md` — one link line
- `web-foundations/docs/lessons/en/feii/cover-shaders/index.md` — one link line
- `web-foundations/docs/lessons/en/feii/ktx2-basis/index.md` — one link line
- `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md` — one link line
- `web-foundations/docs/lessons/en/feii/3d-terminology/index.md` — F1 blank escape
- `web-foundations/docs/lessons/en/feii/3d-terminology/deck-outline.md` — F2 trim to 7 slides
- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/DECISIONS.md` — F3 D1 three satellites

---

## What the lesson contains

- Oral paragraph **verbatim** (spine §9 / PHASE-X13.md / ktx2-basis “Say it out loud”) as the opening idea under “Say this first”, then word-by-word walk in paragraph order.
- Glossary tables: screen and picture → scene → shader → memory → colour → packing. Each row: everyday gloss, course meaning, `relative_url` + `#anchor` to a defining section.
- Two traps: “compressed” (file packing vs GPU-resident packing); “texture” (file vs GPU grid).
- Studio test with blanks for mode, reason, file bytes, GPU bytes, machine; sanity rows for `memory.textures` count, levels, `texture.format` — blanks as code spans after F1.
- Optional D24-style running references (being published), with the early link label written as “ex5 packed-texture switch” so D22 prose order is not broken by a format name before *texel*.
- No quote-database IDs; no new technical claims; no Spanish; no WebGPU/TSL.

---

## Wording mismatches (reported, not rewritten)

Where two lessons word a term differently, the glossary follows the **defining** lesson linked in the row:

| Term | Defining wording used | Other wording noticed |
| --- | --- | --- |
| **Texel** | ktx2-basis “Three words…”: one stored colour; lookup usually blends | cover-shaders deck mentions texels briefly; not treated as the definition |
| **UV corners** | ktx2-basis / cover-shaders: `(0,0)` bottom-left on the sleeve | Unit 9 names UV without pinning sleeve corners |
| **`memory.textures`** | ktx2-basis suitcase section: a **count**, not bytes | Unit 8 budget table also uses `textures` as a count in the ceiling row; ktx2 is the fuller gloss for the trap |
| **Fragment / pixel** | Unit 9 fragment-shader section says it processes each pixel | ktx2 distinguishes screen **pixel** from **texel**; glossary links Unit 9 for the shader stage and ktx2 for pixel/texel |

No silent rewrite of Unit 8, Unit 9, cover-shaders, or ktx2-basis bodies.

---

## Runnable evidence (gate-equivalent; exit-gate not self-run)

| Check | Result |
| --- | --- |
| Worktree identity | `.cascade-lane` = `FEII-3D-ALBUM-KTX` |
| `npm run build` (web-foundations) | exit 0 (logs: `/tmp/feii-x13-build.log`, `/tmp/feii-x13-build2.log`) |
| Triage jekyll rebuild | exit 0 (`/tmp/feii-x13-f1-build.log`); Liquid Warning 0 |
| Studio-test blanks in `_site` | 9× `<code>________</code>`; 0× `<strong>__</strong>__` |
| Publication safety + citations | both passed (prior full build) |
| Oral paragraph fragments | all six exit-gate fragments present |
| Verbatim spine string | present in `index.md` |
| `lessons.yml` slug | `feii-3d-terminology` |
| Links containing `3d-terminology` | FE II index, U8, U9, cover-shaders, ktx2-basis, assignment |
| Quote-database IDs on terminology page | none |
| `memory.textures` + count | present |
| D22 prose order (texel before KTX2/ETC1S/UASTC/Basis outside tables/quotes/headings) | pass after removing early “KTX2 switch” label |
| Built HTML firewall | no ahmes/deviac/evaluator_safe/BIBLIO-GAP/tuning_record/thessia |
| Glossary / lesson `href`s under `/web-atelier-udit/lessons/…` | **25** internal links; all path+#anchor resolve in `_site` |

**Not run here (harness):** `PHASE-X13.exit-gate.sh` (which also re-runs X11 and X12 gates). Expect that script to pass on this tree; uncertainty: X11/X12 gates may need aggregator / react-template paths that live outside this worktree — they passed on prior DONE phases on this integration line, but this executor did not re-execute them.

---

## lesson-scribe deviations

- **Not used.** Prompt allowed lesson-scribe only for optional B1 prose beyond the paragraph and table.
- Walk-through, traps, studio test, session outcome, exercises, and deck outline: written by the cascade-phase-executor from defining lessons + spine. No Thessia raws, no `tuning_record` comments on this satellite.

---

## Uncertainties

1. Whether X11/X12 exit-gates still pass unchanged when re-run by the X13 gate (not executed here).
2. D24 running-reference URLs remain “being published” / may 404 until react-template Pages publishes `satellites-ex3-ex5` — same stance as X11.
3. Cold review may want the oral paragraph wrapped in a blockquote for visual parity with ktx2-basis; kept as plain prose so the opening idea is not only a quote chrome, while remaining byte-identical to spine §9.

---

## Exact resume point

1. Harness: `autopilot.sh verify` / `PHASE-X13.exit-gate.sh` on this worktree.
2. Fresh `cascade-cold-reviewer` → confirm F1 closed in rebuilt HTML; note F2/F3 hygiene.
3. Only then flip this report to DONE and land.
