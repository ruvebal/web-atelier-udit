# FE I JS S7–S9 improve — execution receipt

**Executed:** 2026-10-13
**Contract:** `FE-I-JS-S7-S9.improve.execute.md` (amended the same day after a pre-flight audit)
**Lessons:** S7 `js-intro` · S8 `js-dom-manipulation` (+ `demo/`) · S9 `js-modules` — EN and ES
**Phase reports:** `reports/FE-I-JS-S7-S9-P0-audit-REPORT.md` … `P6-verify-receipt-REPORT.md` (7 files, all Acceptance ticked, no Blockers)

## What was found at session start

All six files already opened with a sound spine (For/Not for → Before you start → Follow this path → Verify → Common failures → Submit), added in an earlier pass. The legacy body underneath contradicted it: S9 recommended Vite while its Not-for excluded bundlers; S7 taught "DOM feedback" with `alert()`; S8 objectives led with React. 0 of 148 code fences were labelled. AI guidance was one table row. The full defect ledger (D1–D19) is in the P0 report and the table below.

## Line counts

| Lesson | EN before → after | ES before → after | Target |
| --- | --- | --- | --- |
| S7 `js-intro` | 806 → 439 | 793 → 439 | ≤ 450 |
| S8 `js-dom-manipulation` | 708 → 368 | 702 → 368 | ≤ 450 |
| S9 `js-modules` | 1277 → 359 | 1237 → 359 | ≤ 400 |
| **Total** | 2791 → 1166 (−58 %) | 2732 → 1166 | |

Labelled fences: 0 / 148 → 70 / 70 (35 per language). Repo diff: 27 files, +1338 / −4507.

## Defects

| # | Lesson | Defect | Status |
| --- | --- | --- | --- |
| D1 | S7 | `{{ base_url }}` link 404 on Pages + nonexistent `#taste-node` anchor | Closed (`relative_url`, no fragment) |
| D2 | S7 | `alert()` as DOM feedback | Closed (`#status` + `aria-live`) |
| D3 | S7 | Path started with ~150 lines of history | Closed |
| D4 | S7–S9 | "Official time" disagreed with tracks.yml | Closed |
| D5 | S8 | Demos used `type="module"` → failed from `file://` | Closed (classic `defer`) |
| D6 | S8 | XSS payload never observable | Closed (Unsafe-mode toggle + banner) |
| D7 | S8 | ES demos were English copies | Closed (localised, `lang="es"`) |
| D8 | S8 | JSX linked to TypeScript handbook | Closed (react.dev) |
| D9 | S8 | React-first objectives | Closed |
| D10 | S9 | "Use Vite (Recommended)" | Closed |
| D11 | S9 | Unattributed "homicidal maniac" epigraph | Closed |
| D12 | S9 | Decorative books, mastery claims; also an "(inspired)" Kyle Simpson quote | Closed |
| D13 | S9 | Next Steps → Tailwind/React/bundlers | Closed |
| D14 | S9 | "CDN or native ESM" | Closed |
| D15 | all | 0 labelled fences | Closed |
| D16 | all | Missing `status` / `tags` | Closed |
| D17 | S8 | `cloneNode` vs MDN's `importNode` | Closed |
| D18 | S7 | "Work inprogress" placeholder | Closed |
| D19 | S9 | "Module paths relative to page URL" (wrong for `import`) | Closed |

## AI-era moves added (doctrine-only, capped per lesson)

Each lesson now has exactly 1 Common-failures row, 1 Verify box, 1 lab "AI check" and 1 Submit "AI line" linking the AI declaration and oral-defence rubric:

- **S7, explain before paste:** write "when the user ___, node ___ changes to ___" before accepting code; reject framework/JSX/jQuery suggestions.
- **S8, test with the payload:** an assistant-written render function is rejected if demo 1's payload runs; `innerHTML` with user text is named as the default wrong answer.
- **S9, graph before refactor:** draw the import graph first; reject Vite config, `package.json`, `require`, CDN imports.

No new citations were made. Liu, Fan & Pan stays `[BIBLIO-GAP]` (not cited). Shihab et al. was not needed.

## TTOD epigraphs (ids, unused elsewhere in lessons before this run)

S7 `js-001` / `js-002` (direct fit: event model, scroll) · S8 `cc-010` / `cc-055` (analogical: `textContent` is the simplest *safe* primitive) · S9 `cc-004` / `cc-056` (direct fit: namespace width).

## Research used

- MDN pin-check **2026-10-13** (live fetch): JS Modules guide, `Element.innerHTML`, `<template>`, Trusted Types API (now "Baseline 2026").
- OWASP XSS Prevention Cheat Sheet, react.dev "Writing Markup with JSX" (EN + ES), V8 modules, ES-locale MDN pages: HTTP 200 on 2026-10-13.
- No papers, no Profield field run, no blocking literature review.

## Verification

- Build: `npm run build` exit 0 at every phase (P0 baseline, P2–P6); zero new warnings; publication + citation gates pass. One mid-run failure (P3: citation gate read "(Baseline since February 2026)" as an author-date cite) was fixed by rephrasing.
- S8 demos (EN + ES), headless Chrome from `file://`: safe mode shows 3 cards and no `<img>`; unsafe mode shows the banner and 1 injected `<img>`; demos 02–04 render 3 cards each with the payload as text. All demo excerpts in the lessons are literal substrings of the demo files.
- S9 lab: the four Template files, extracted from the lesson and served over HTTP, render the project list; the same page from `file://` renders nothing (the failure the lesson teaches).
- Built output, six pages: TOC present, code survived, all internal and demo links resolve on disk, zero internal-metadata leaks.

## Local toolchain note

System Ruby 2.6 cannot run this bundle. Local builds used rbenv Ruby 3.2.6 (CI uses 3.2) + bundler 2.5.22, with gems installed into git-ignored `vendor/bundle`. `Gemfile.lock` is unchanged.

```bash
RBENV_VERSION=3.2.6 BUNDLER_VERSION=2.5.22 npm run build
```

## Follow-on passes (same day)

- **Site-wide link hygiene:** 39 `{{ base_url }}` + 35 root-absolute links → `relative_url`; broken `#` anchors 87 → 0 (`normalize-ids.mjs` now rewrites internal fragment hrefs; heading-id syntax `{#id}`; manual TOCs; demo navs). Remaining: 91 links to non-existent pages, `student-project-template` links (repo not found) — content decisions.
- **Build hygiene:** `web-foundations/.ruby-version` (3.2.6) + committed `Gemfile.lock` (matches CI resolution); workflows read both.
- **P7 — figures + course references:** one visual-forger figure per lesson (EN/ES, hashed SVG/PNG, `lesson-figures/index.json`); ECMA-262 · MDN · Oracle trademark block in every JS lesson; canonical MDN reference pages. See `reports/…-P7-figures-references-REPORT.md`.
- **P8 — JS canon grounding:** Ahmes → RIS → DevIAC → Athanor pipeline on Simpson 2020, Haverbeke 2024, Crockford 2008; verbatim quotes checked against the source files; Chicago References in every JS lesson; `ahmes ground` ledger. See `reports/…-P8-grounding-REPORT.md`.

## Known leftovers (out of scope, not fixed)

- ~~5 other lessons still use `{{ base_url }}`~~ — fixed in the link-hygiene pass.
- ~~`development-environment` `{: #taste-node }` IAL~~ — fixed (`{#taste-node}`; S7 links to it again).
- The AI declaration rubric exists only at one shared, non-localised URL; the ES lessons link to it as is.
- Nothing has been committed or pushed. Publishing remains the professor's `git push`.
