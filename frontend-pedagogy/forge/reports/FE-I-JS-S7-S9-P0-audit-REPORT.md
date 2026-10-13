# FE-I-JS-S7-S9 — Phase 0 — audit

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5), executing `FE-I-JS-S7-S9.improve.execute.md`

## Done

- Created `frontend-pedagogy/forge/reports/`.
- Re-measured all six lesson files + both `demo/` folders against the execute file's Verified baseline.
- Ran the baseline build before any lesson edit.
- MDN pin-check (dated below).
- Shortlisted TTOD quote ids.
- Restated research decision; no lit-review run.

## Baseline (re-measured)

| Lesson | Lines EN / ES | Fences EN / ES | Labelled (`**CodeSandbox-ready**`/`**Excerpt**`/`**Template**`) | Emoji H2/H3 EN | AI guidance | Frontmatter `status` / `tags` |
| --- | --- | --- | --- | --- | --- | --- |
| S7 `js-intro` | 806 / 793 | 18 / 18 | 0 / 0 | 19 | 1 row (Copilot) | missing / missing |
| S8 `js-dom-manipulation` | 708 / 702 | 16 / 16 | 0 / 0 | 10 | none | missing / present |
| S9 `js-modules` | 1277 / 1237 | 40 / 41 | 0 / 0 | 17 | none | missing / missing |

Contact-hour fit (tracks.yml): S7 3 h incl. 1.5 h lab · S8 3 h incl. 1 h lab · S9 2 h incl. 1 h lab. At ~150 words/min reading plus lab, all three are read-later dumps; S9 is ~3× what 2 h can hold.

## Defects D1–D15 — confirmed / corrected

| # | Status | Note |
| --- | --- | --- |
| D1 | **Confirmed, worse than recorded** | `{{ base_url }}` renders empty (built `href="/lessons/en/development-environment/#taste-node"`) **and** the `#taste-node` anchor does not exist — the target heading's IAL failed, real id is `8-taste-nodejs-locally-optional--taste-node-`. ES twin has no such link. Fix: `relative_url`, link the page without fragile fragment, name "section 8". |
| D2 | Confirmed | Commit 2 + Events section both use `alert()`. |
| D3 | Confirmed | Path step 1 = Timeline + Comparison (~150 lines). |
| D4 | Confirmed | S7 "3 h class + 1.5 h lab", S8 "3 h + 1 h", S9 "2 h + 1 h" — tracks.yml has lab *inside* duration. |
| D5 | Confirmed | 4/4 demo HTML use `type="module"`; `grep` finds zero `import`/`export` in demo JS. |
| D6 | Confirmed | `01-strings.js` escapes name/description — payload never fires. |
| D7 | Confirmed | `diff -rq en/…/demo es/…/demo` empty; `lang="en"`. |
| D8 | Confirmed | JSX → `typescriptlang.org/docs/handbook/jsx.html`. |
| D9 | Confirmed | Objective 1 lists Virtual DOM; objective 5 is "path toward React". |
| D10 | Confirmed | "Method 2: Use Vite (Recommended)". |
| D11 | Confirmed | Unattributed "homicidal maniac" epigraph. |
| D12 | Confirmed | "Books (Inspired Quotes)"; "you've mastered"; commit message "Beginner → Professional". |
| D13 | Confirmed | Next Steps → Tailwind S2–S5, React/Vue, bundlers. |
| D14 | Confirmed | "(CDN or native ESM in browser)". |
| D15 | Confirmed | 0 / 148 fences labelled. |
| **D16 (new)** | Found | Frontmatter missing `status` (all three) and `tags` (S7, S9) — `lesson-publishing-integrity.mdc` §5. |
| **D17 (new)** | Found | S8 Common failures + `03-template.js` use `template.content.cloneNode(true)`; MDN now recommends `document.importNode(template.content, true)` (pin below). Not wrong, but stale vs MDN. |
| **D18 (new)** | Found | S7 Sources section contains "> Work inprogress…" placeholder in published text. |

Demo ↔ lesson sync: HTML/CSS identical; JS differs only in comments (`02`, `03`) and the explanatory comment block in `01`. No functional drift.

## Baseline build

Local toolchain fix (no tracked file changed): system Ruby 2.6 cannot run the vendored bundle; installed gems for rbenv Ruby **3.2.6** (CI uses 3.2) with bundler 2.5.22 into git-ignored `vendor/bundle`; `Gemfile.lock` unchanged (`git diff --stat` empty).

```bash
RBENV_VERSION=3.2.6 BUNDLER_VERSION=2.5.22 npm run build   # exit=0
grep -iE "warning|error" baseline-build.log
#   [mark-broken-links] No error files found      ← only match; benign
```

Baseline: **exit 0, zero real warnings.** Later phases must stay at zero.

## Pin-check — 2026-10-13 (MDN, fetched live)

| Page | Finding | Lesson impact |
| --- | --- | --- |
| [JS Guide › Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) | `file://` → "you'll run into CORS errors … do your testing through a server"; "modules are deferred automatically"; `.mjs` not required, MIME type matters | S9 claims correct; add "no `defer` needed on module scripts" |
| [Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) | Injected `<script>` does **not** run; `<img src=x onerror=…>` **does**; use `textContent` for plain text; Trusted Types + `require-trusted-types-for` CSP as mitigation | S8 payload choice correct; teach "script tags don't run, but onerror does" |
| [`<template>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template) | Baseline Widely available (Nov 2015); recommends `document.importNode(template.content, true)` | D17 |
| [Trusted Types API](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API) | "Baseline 2026 — Newly available" (since Feb 2026) | S8 security note: name it as now-cross-browser, still out of FE I lab scope |

Stale claims: D17 only. No API claim in S7–S9 is wrong.

## Research decision (restated)

Blocking literature review: **no.** Optional papers: none added. Shihab et al. is `evaluator_safe=yes` per LESSON-SAUCE but its scope (brownfield review) is not needed to justify three short practice moves; doctrine-only. Liu, Fan & Pan stays `[BIBLIO-GAP]` → not cited. → `[UNVERIFIED-GAP]` not needed because no empirical claim will be made.

## Master ideas (keep — they match LESSON-SAUCE)

- S7: *JavaScript is a browser/runtime model, not just syntax.*
- S8: *Rendering is a trust boundary.*
- S9: *Modularity keeps change local.*

## TTOD shortlist (EN / ES twin; `grep` across `web-foundations/docs/lessons` → unused)

| Lesson | Id | Text (EN) | Fit |
| --- | --- | --- | --- |
| S7 | `js-001` / `js-002` | "The river does not push; it allows. The master developer does not force the scroll—they channel its flow." | Direct — event model; Commit 3 is a scroll listener |
| S8 | `cc-010` / `cc-055` | "Make everything as simple as possible, but not simpler." | Analogical — `textContent` is the simplest *safe* primitive; strings are simpler-than-safe |
| S9 | `cc-004` / `cc-056` | "When the namespace grows too wide, its meaning becomes thin. When the namespace is too narrow, its future suffocates." | Direct — global scope vs over-split modules |

## Cut list (proposed)

| Lesson | Keep in-class | Demote → "Optional deep dive" (≤ 1 screen) | Delete |
| --- | --- | --- | --- |
| S7 | Spine; DOM + events (core); DevTools Console/Elements/Sources (condensed); 3 commits | Timeline (5 bullets); "JS in one table" replacing C++/PHP comparison + 10 characteristics; Node.js 2 lines + link | Extended syntax catalogue; 10 per-characteristic sections; 20-row event table (→ 8 rows); Network/Performance/Lighthouse (belongs to later sessions); duplicate ATELIER reflections |
| S8 | Spine; approaches table; Ex1 strings + XSS toggle; Ex2 native API; security essentials | Ex3 `<template>`; Ex4 hyperscript (React bridge) | Full inline CSS/HTML of demos (link instead); "Key DOM Methods" catalogue (→ 8-row table); duplicate history |
| S9 | Spine; why modules (1 screen); named/default pair; lab on own repo; serve over HTTP; import graph | Barrel files + dynamic `import()` (one block) | IIFE/CommonJS/AMD code catalogue; timeline viz; widget-dashboard workshop (4 exercises); 5.x exercises; 7-point manifesto; JSDoc; "Real-world impact"; books; Vite method; Next Steps |

## Acceptance

- [x] `reports/` created; baseline table re-measured; D1–D15 confirmed (D1 widened), D16–D18 added — evidence: table above.
- [x] Baseline build exit code + pre-existing warnings recorded — evidence: exit 0, zero warnings.
- [x] Pin-check dated (2026-10-13); stale claims listed (D17).
- [x] Research decision restated: blocking lit-review = no.
- [x] Cut list + TTOD shortlist proposed.

## Blockers

- (none)

## Next

Phase 1 may start: yes.
