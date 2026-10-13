<!-- executable · FE I JS lessons improve · Sessions 7–9 · paste this file as the agent prompt -->
<!-- amended 2026-10-13 after pre-flight audit: paths corrected, verified baseline + known defects added, rule conflicts resolved, TTOD/citation/build gates aligned with lesson-publishing-integrity.mdc -->

# EXECUTE — FE I JS Lessons Improve (S7 intro · S8 DOM · S9 modules)

**Repo:** `web-atelier-udit` · all paths below are relative to the repo root.  
**Scope:** Improve (do not fork) the three FE I JavaScript lessons already on the track:

| Session | Lesson slug (`lessons.yml`) | Track slug (`tracks.yml`) | EN source | ES source | tracks.yml hours |
| --- | --- | --- | --- | --- | --- |
| S7 | `js-intro` | `s7-js-intro` | `web-foundations/docs/lessons/en/js-intro/index.md` | `…/es/js-intro/index.md` | duration 3 h · lab 1.5 · magistral 0.5 · ejercicios 0.5 |
| S8 | `js-dom-manipulation` | `s8-js-dom-manipulation` | `…/en/js-dom-manipulation/index.md` + `demo/` | `…/es/js-dom-manipulation/index.md` + `demo/` | duration 3 h · lab 1 · magistral 0.5 · ejercicios 0.5 |
| S9 | `js-modules` | `s9-js-modules` | `…/en/js-modules/index.md` | `…/es/js-modules/index.md` | duration 2 h · lab 1 · magistral 0.5 · ejercicios 0.5 |

Registries: `web-foundations/docs/_data/lessons.yml` (lines ~96–134), `web-foundations/docs/_data/tracks.yml` (lines ~180–203).

**Contracts (do not rewrite):**

- [`.cursor/rules/lesson-publishing-integrity.mdc`](../../.cursor/rules/lesson-publishing-integrity.mdc) — especially §1 Liquid, §3 `relative_url`, §6 citations, §7 TTOD ids, §9 FE I/II boundary, §10 verify.
- [`.cursor/rules/lesson-code-block-conventions.mdc`](../../.cursor/rules/lesson-code-block-conventions.mdc) — **with the scoped exception below.**
- [`.cursor/rules/methodology-page-structure.mdc`](../../.cursor/rules/methodology-page-structure.mdc)
- Studio AI-pedagogy doctrine already in-repo: `frontend-pedagogy/grounding/README.mdc`, `frontend-pedagogy/grounding/LESSON-SAUCE-FE-I-II.md`, `frontend-pedagogy/grounding/profield-frontend-pedagogy.md`, `frontend-pedagogy/cv/udit-ruvebal-frontend-i-cv.md` — **reuse, do not re-prospect.**

**Code-block rule — scoped exception (binding for this cascade):** the "Sandbox architecture: multi-file with routes" section of `lesson-code-block-conventions.mdc` is React-specific (`main.jsx`, `App.jsx`, `<Routes>`). It does **not** apply to S7–S9, which are vanilla JS on the portfolio repo. The labelling rules (`CodeSandbox-ready` / `Excerpt` / `Template` + convention note) apply in full. State this in each lesson's convention note in one sentence ("Runnable code lives in your portfolio repo / in `demo/`; fences here are labelled…").

**Out of scope:** FE II units; React; Vite/bundlers (Level 3); linting (S10); GSAP (S11); exam banks; new Profield field run; inventing citations; other lessons that share the `{{ base_url }}` defect (record them in the receipt, do not fix).

**Cascade discipline:** one phase in flight. A phase is done only when its report exists under `frontend-pedagogy/forge/reports/` (create the directory in Phase 0 — it does not exist yet) with every Acceptance line ticked and evidence. Do not start Phase N+1 until Phase N's report is written. On ambiguity, fill Blockers and STOP.

**Report path:** `frontend-pedagogy/forge/reports/FE-I-JS-S7-S9-P<N>-<slug>-REPORT.md`

---

## Verified baseline (pre-flight audit, 2026-10-13 — re-measure in P0, do not trust blindly)

| Lesson | Lines EN / ES | Fences EN / ES | Labelled fences | Emoji headings | AI guidance |
| --- | --- | --- | --- | --- | --- |
| S7 `js-intro` | 806 / 793 | 18 / 18 | **0** | 19 | 1 Common-failures row (Copilot) |
| S8 `js-dom-manipulation` | 708 / 702 | 16 / 16 | **0** | 10 | none |
| S9 `js-modules` | 1277 / 1237 | 40 / 41 | **0** | 17 | none |

The spine (For/Not for → Before you start → Follow this path → Verify → Common failures → Submit) **already exists** at the top of all six files and is mostly sound. The problem is the legacy body underneath, which contradicts that spine. Fix the body to serve the spine; don't rebuild the spine.

**Known defects (each must be closed or explicitly deferred in a report):**

| # | Lesson | Defect | Evidence | Fix direction |
| --- | --- | --- | --- | --- |
| D1 | S7 EN (+ES twin) | `{{ base_url }}` is undefined → link builds as `/lessons/en/development-environment/#taste-node` without `/web-atelier-udit` → **404 on Pages** | `en/js-intro/index.md:483`; `_site/lessons/en/js-intro/index.html` | `{{ '/lessons/en/development-environment/' \| relative_url }}#taste-node` (§3) |
| D2 | S7 | Commit 2 feedback is `alert()`, not a DOM update — contradicts the studio test "event → DOM → user-feedback" | Commit 2 steps | Feedback via `textContent` on a visible node; `alert` only as a "why not" note |
| D3 | S7 | Path step 1 sends students to Timeline + C++/PHP comparison (~150 lines) before any code | Follow this path, row 1 | Reorder: DevTools/console first; history → optional deep dive |
| D4 | S7 | "Official time: 3 h class + 1.5 h lab" disagrees with tracks.yml (lab is *inside* 3 h) | Before you start | Match tracks.yml semantics (§10 sequence-table agreement) |
| D5 | S8 | All four demo HTML files load scripts with `type="module"` although no demo imports/exports → double-clicking (`file://`) fails in S8, a session *before* modules are taught | `demo/*.html` | Use classic `<script src="…" defer>`; keep module semantics for S9 |
| D6 | S8 | No demo shows the XSS actually firing: `01-strings.js` already escapes everything, so the studio test ("compare … with untrusted input") is not observable | `demo/01-strings.js` | Add an explicit unsafe ↔ safe toggle (e.g. checkbox) on the same payload; Verify asks the student to see both |
| D7 | S8 | ES `demo/` is a byte-identical copy of EN (`lang="en"`, English UI strings) | `diff -rq` empty | Localise ES demo strings + `lang="es"` in P5, keep code identical |
| D8 | S8 | JSX link points to the TypeScript handbook in a JS-first FE I lesson | Short History | Replace with MDN/react.dev pin or drop the link |
| D9 | S8 | Learning objectives lead with Virtual DOM / React path although For/Not-for says "conceptual bridge only" | Learning Objectives | Re-weight objectives toward string vs native + XSS |
| D10 | S9 | "Method 2: Use Vite (Recommended)" contradicts "Not for: bundlers (Level 3)" | Testing Your Module System | Delete; Live Server first, `python3 -m http.server` as fallback |
| D11 | S9 | Unattributed epigraph ("homicidal maniac … Anonymous (but wise) Developer") — §7 violation | Atelier Reflection | Remove; replace with a TTOD id quote |
| D12 | S9 | "Books (Inspired Quotes)" list with no quotes or pages; "you've mastered … Professional architecture mindset" overclaims | Further Reading; Reflection; Commit block | Keep MDN/V8/TC39 links (pin-checked); drop decorative books; drop mastery claims |
| D13 | S9 | Next Steps send students to Tailwind S2–S5, React/Vue sources and bundlers | Next Steps | Point to S10 linting + S8 refactor |
| D14 | S9 | For line says "(CDN or native ESM in browser)" — CDN imports are not part of this lab | For / Not for | "native ESM over HTTP" only |
| D15 | S7–S9 | 0 / 148 fences labelled; no convention note | all six files | Label every fence (see P2–P5) |

---

## Research decision (binding — read before Phase 0)

**Do you need a web literature review to "update SOTA on JS teaching in AI times"?**

**No — not as a blocking Phase.** Reasons:

1. **AI-era pedagogy for this course is already grounded** (CodeAid-style scaffold-without-solution, review/verify pressure, cognitive offloading, AI-use declaration, S29 "explain one rejected suggestion" defence). The JS rewrite should *apply* that doctrine to vanilla Sessions 7–9, not discover a new research field.
2. **Platform facts are stable.** ESM in browsers, DOM APIs, `textContent` vs `innerHTML`, XSS — pin-check MDN/web.dev; do not wait on ACM.
3. **The real defects are editorial/structural** (table above), not missing papers.

**Allowed research (Phase 0 only, time-boxed ≤ 45 min wall clock):**

| Kind | Allowed | Forbidden |
| --- | --- | --- |
| MDN / WHATWG / web.dev pin-check | Yes — date the pin | Inventing URLs |
| 0–5 HE papers on GenAI + novice programming | Optional; only if recorded in `profield-frontend-pedagogy.md` **and** resolved live with `ahmes query --cite --require-evaluator-safe` (as in FE-II Wave 4) | Fabricating Key Findings; citing any coat with `evaluator_safe=no` |
| "Best JS curriculum 2026" blog roundups | No | — |
| New Profield field / Pass 1–3 | No for this cascade | — |

Known status (LESSON-SAUCE, re-verify live): Shihab et al. — `evaluator_safe=yes`, supports review/verification design (scope: computing students, brownfield task, not web-specific). Liu, Fan & Pan — `[BIBLIO-GAP]`, **do not cite**. Default: teach the AI moves **without** new citations; doctrine covers them.

If a paper is used: Chicago author-date + `## References` / `## Referencias`; internal Ahmes metadata only behind `{% if site.publication.publish_internal_metadata %}` (§6.1).

---

## Master entry (paste once)

```
ROLE
You are the lesson editor for FE I Sessions 7–9 (vanilla JS) in web-atelier-udit.
Source of truth for this run: frontend-pedagogy/forge/FE-I-JS-S7-S9.improve.execute.md

NON-NEGOTIABLE
- Keep vanilla portfolio path: assets/js/*.js, classic <script defer> in S7–S8, type=module only in S9, no React/JSX, no bundlers.
- Preserve session spine: For/Not for, Before you start, Follow this path, Verify, Common failures, Submit.
- Every code fence labelled CodeSandbox-ready | Excerpt | Template; {% raw %} when Liquid-dangerous.
- React routed-sandbox rule does NOT apply (scoped exception in the execute file).
- Internal links via relative_url; never {{ base_url }} or ../ chains.
- Cite only live-verified sources; no fabricated findings.
- Epigraphs: TTOD quote ids (js-NNN / dbg-NNN / cc-NNN) from ~/src/ttod/ttod.yml, selected via the TTOD CLI search, unused elsewhere in lessons.
- EN first, then ES parity (same structure and exercises; Spanish prose).
- Close or explicitly defer every Known defect D1–D15.
- Idempotent: second pass should not invent new scope.
- Report-gated cascade; stop on Blockers.

PROTOCOL
Execute Phase 0 → 6 in order. After each phase write the report and tick Acceptance.
```

---

## Phase 0 — Audit + baseline build + light pin-check (no rewrite)

**Inputs:** the six lesson files (EN+ES), S8 `demo/` (EN+ES), `tracks.yml` + `lessons.yml` rows, publishing + code-block rules, the Verified baseline above.

**Tasks:**

1. `mkdir -p frontend-pedagogy/forge/reports`.
2. Re-measure the baseline table (lines, fences, labelled fences, emoji headings, Liquid-risk fences, links). Confirm or correct D1–D15; add any new defect as D16+.
3. **Baseline build**, before any edit: `cd web-foundations && npm run build > /tmp/fe1-js-baseline-build.log 2>&1; echo "exit=$?"`, then `grep -iE "warning|error" …log`. Record pre-existing warnings so later phases are judged on *delta*, not on noise they did not cause.
4. Map each lesson against tracks.yml contact hours: what a student can finish in-class vs read-later. Propose a **cut list** (sections → "Optional deep dive" `<details>` or delete).
5. Pin-check (≤ 45 min): MDN pages named in the lessons for DOM / modules / events / `<template>` / Trusted Types — note stale API claims. Date the check.
6. Optional: ≤ 5 GenAI+novice-programming sources per Research decision; if none fit cleanly, record `[UNVERIFIED-GAP]` and proceed doctrine-only.
7. Draft three one-sentence **master ideas** (keep or sharpen current `lesson-framing` asides; LESSON-SAUCE row for S9 is the reference wording).
8. Shortlist TTOD quote ids per lesson (opening + optional close). Only `js-001`, `js-002` exist in `javascript`; extend to `dbg-*` / `cc-*`; grep `web-foundations/docs/lessons` to confirm each id is unused.

**Constraints:** Do not edit lesson bodies in this phase. No new field run.

**Acceptance:**

- [ ] `reports/` created; baseline table re-measured; D1–D15 confirmed/corrected.
- [ ] Baseline build exit code + pre-existing warnings recorded.
- [ ] Pin-check dated; stale claims listed or "none".
- [ ] Research decision restated: blocking lit-review = no.
- [ ] Cut list + TTOD shortlist proposed (human may annotate Blockers).

**Report slug:** `P0-audit`

---

## Phase 1 — Improvement brief (acceptance criteria)

**Inputs:** Phase 0 report.

**Tasks:** Write a short brief (in the Phase 1 report, not a new lesson) specifying per session:

1. **Must keep** — spine sections, studio test, portfolio artefact, progressive commits (S7), escaped/`textContent` path + demos (S8), ESM HTTP requirement + Common-failures table (S9).
2. **Must add (AI-era teaching, doctrine-driven, bounded)** — per lesson **exactly**: ≤ 1 AI row in Common failures, ≤ 1 AI checkbox in Verify, 1 AI line in Submit, ≤ 1 short "AI check" callout in the lab. No AI essay section. Moves:
   - **Reject list** — S7: framework imports, JSX, jQuery. S8: `innerHTML` for user text, string-built `onclick=`. S9: Vite/webpack config, `require`, invented `package.json`, CDN imports.
   - **Explain-before-paste:** student narrates event→DOM→feedback (S7), the XSS path (S8), or the import graph (S9) *before* accepting AI output.
   - **Verify in DevTools:** AI code that "looks right" still fails on `null` selectors / `file://` modules / `innerHTML` XSS — teach the failure, not the sermon.
   - **Submit AI line** (feeds S29 defence): "AI used: tool / none · one suggestion I rejected and why."
3. **Must cut** — line targets (body incl. spine, excl. frontmatter): **S7 ≤ 450, S8 ≤ 450 (demo code linked, not inlined in full), S9 ≤ 400.** History ≤ 1 screen per lesson; ≤ 2 "Optional deep dive" blocks per lesson; emoji headings removed from H2/H3 (keep the 📋 TOC heading only if the layout relies on it — check).
4. **Sandbox policy** — S7/S9: portfolio repo first; `CodeSandbox-ready` only for a truly standalone HTML+JS pair. S8: `demo/` is the runnable source of truth; lesson shows `Excerpt` fences + links to demo files; no React routed sandbox (scoped exception).
5. **EN→ES** — parity rules (identical structure, exercises, Verify, Common failures, Submit; Spanish prose; ES demos localised per D7).
6. **Registry consequences** — list the tracks.yml descriptions that *will* change (S7 drops "comparación con C++/PHP" as core; S9 drops "Historia de la modularidad (IIFE → CommonJS → ES6)" as core) and the "Official time" wording per D4.

**Acceptance:**

- [ ] Per-lesson must-keep / must-add / must-cut tables in report.
- [ ] Line-count targets set.
- [ ] AI moves listed with the per-lesson caps, no new papers required (or named live-verified cites only).
- [ ] Registry changes listed for Phase 6.
- [ ] Human: if cut targets feel wrong, Blockers — do not proceed.

**Report slug:** `P1-brief`

---

## Phase 2 — Rewrite EN `js-intro` (S7)

**Inputs:** Phase 1 brief; `web-foundations/docs/lessons/en/js-intro/index.md`.

**Tasks:**

1. Rewrite to brief targets. Keep three progressive commits on `assets/js/main.js`; Commit 2 feedback goes to the DOM (D2). Script tag shown consistently as `<script src="assets/js/main.js" defer></script>`.
2. Reorder Follow-this-path so code starts within the first step after reading the spine (D3); fix Official time (D4).
3. Label every fence; add convention note near first code section (incl. scoped-exception sentence).
4. Fix D1 with `relative_url`.
5. Strengthen Common failures + Verify for AI-paste failure modes (caps from P1).
6. One TTOD epigraph by quote id from the P0 shortlist, §7 format.
7. Timeline, C++/PHP comparison, "10 characteristics", Node.js → collapse into one optional deep dive (≤ 1 screen visible) or cut.

**Constraints:** No modules, no React, no linting. No new permalink/slug.

**Acceptance:**

- [ ] Line count ≤ 450 (or Blockers with justification).
- [ ] All fences labelled; Liquid-safe; D1–D4 closed.
- [ ] Spine sections present; Submit evidence unchanged in spirit + AI line.
- [ ] Local build: no *new* warnings vs P0 baseline.

**Report slug:** `P2-js-intro-en`

---

## Phase 3 — Rewrite EN `js-dom-manipulation` (S8) + demos

**Inputs:** Phase 1; EN lesson + `demo/*` (EN only in this phase).

**Tasks:**

1. Keep the four-approach comparison as one compact table; weight lab time toward string vs native/`textContent` + the XSS demo.
2. Virtual DOM / React / hyperscript = conceptual bridge only: Exercise 4 becomes optional; objectives re-weighted (D9); fix JSX link (D8).
3. Demos: classic `defer` scripts (D5); add unsafe↔safe toggle in `01-strings` (D6); keep lesson excerpts in sync with demo code (current state: in sync except comments — keep it that way); label lesson demo fences `Excerpt` and link to the demo file.
4. AI-era: generated `innerHTML` is the default wrong answer; Verify requires the `textContent` path and seeing the payload fire in unsafe mode.

**Acceptance:**

- [ ] XSS verify checkbox remains mandatory; unsafe and safe modes both observable.
- [ ] Demos open via double-click *and* Live Server; lesson links resolve; claims match code.
- [ ] Line count ≤ 450; fences labelled; D5, D6, D8, D9 closed.

**Report slug:** `P3-js-dom-en`

---

## Phase 4 — Rewrite EN `js-modules` (S9) — hard cut

**Inputs:** Phase 1; EN `js-modules` (1277 lines → target ≤ 400).

**Tasks:**

1. Aggressive cut: IIFE/CommonJS/AMD history becomes a short "why modules" (≤ 1 screen); lab is extract `utils.js` + `type="module"` + import graph on the student's own `main.js` from S7–S8 (not a new `js-modules-workshop` project).
2. Default vs named export: one clear pair of Excerpts, not a catalogue. Barrel files, dynamic imports, JSDoc, state-management module → one optional deep dive at most.
3. Common failures keep `file://` / CORS / missing `type="module"` / wrong relative path.
4. AI Reject list: bundlers, `require`, invented `package.json`, CDN imports for this session.
5. Close D10–D14.

**Acceptance:**

- [ ] ≤ 400 lines; 2 h contact feels finishable (lab ≤ 1 h of student work).
- [ ] Studio test (import graph + explain one boundary) survives.
- [ ] Fences labelled; no bundler lab creep; D10–D14 closed.

**Report slug:** `P4-js-modules-en`

---

## Phase 5 — ES parity (S7→S9)

**Inputs:** Improved EN files from Phases 2–4; existing ES files; ES `demo/`.

**Tasks:** Mirror structure, exercises, Verify lists, Common failures, Submit and AI moves into ES. Do not machine-translate idioms blindly — keep teaching Spanish quality. Apply D1 fix with the `/lessons/es/…` path. Localise ES demos (D7) while keeping code identical to EN. Update `title_alt` in both languages if titles changed.

**Acceptance:**

- [ ] ES For/Not for / path / verify / failures / submit match EN substance.
- [ ] No EN-only exercise left; ES line counts within ±10 % of EN.
- [ ] Fences labelled in ES too; D7 closed.

**Report slug:** `P5-es-parity`

---

## Phase 6 — Wire, build, receipt

**Tasks:**

1. `lessons.yml`: touch only if titles changed — then update `title.es/en` for both languages.
2. `tracks.yml`: apply the description changes listed in P1 (S7, S9 at least); hours stay unless P1 changed them; ensure lesson "Official time" lines agree (§10 sequence-table agreement).
3. Build gate (§10):

```bash
cd web-foundations && npm run build > /tmp/fe1-js-final-build.log 2>&1; echo "exit=$?"
grep -iE "warning|error" /tmp/fe1-js-final-build.log
# exit must be 0 (verify:publication + verify:citations included);
# no Liquid Warning; no warning/error that was not in the P0 baseline
```

4. Spot-check `_site/lessons/{en,es}/js-*/index.html`: TOC, code survived (strip tags, read back), internal links resolve on disk under `/web-atelier-udit/…`, demo asset URLs exist.
5. Write `FE-I-JS-S7-S9.improve.execution.receipt.md` beside this execute file, in the shape of `FE-II-WAVE-4.execution.receipt.md`: what was found vs. this file's baseline, D1–D15 status, line counts before/after, AI moves added, TTOD ids used, research used (MDN pin date + any papers with live Ahmes evidence), other lessons still using `{{ base_url }}` (count only), known leftovers.

**Acceptance:**

- [ ] Build exit 0; no new warnings vs baseline; no Liquid Warning.
- [ ] Receipt written.
- [ ] No unpublished internal research metadata in built HTML.

**Report slug:** `P6-verify-receipt`

---

## Report template (every phase)

```markdown
# FE-I-JS-S7-S9 — Phase N — <slug>

**Date:** YYYY-MM-DD
**Agent:** …

## Done
- …

## Defects
- D<n>: closed | deferred (why) | n/a

## Acceptance
- [x] … — evidence: …

## Blockers
- (none | …)

## Evidence
- commands, paths, before/after line counts

## Next
Phase N+1 may start: yes/no
```

---

## Done criteria for the whole cascade

- S7–S9 EN+ES teachable in stated contact hours without scrolling a novel (≤ 450 / 450 / 400).
- AI-era moves are *practice* (reject, explain, verify, declare), capped per lesson — not a theory essay.
- Code honesty: 100 % labelled fences; S8 demos run from `file://` and show XSS unsafe vs safe; ESM failure modes explicit in S9.
- Body no longer contradicts spine (no Vite "recommended", no `alert` as DOM feedback, no React-first objectives).
- D1–D15 closed or explicitly deferred; publishing integrity green; receipt on disk.
- No blocking literature review was required; optional pins dated in P0/P6.
