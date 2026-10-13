# FE-I-JS-S7-S9 — Phase 1 — brief

**Date:** 2026-10-13
**Agent:** Claude Code (Opus 5.5)

## Done

Improvement brief per session, derived from P0. Binding on Phases 2–5.

## Shared rules (all three lessons)

- Frontmatter: add `status: complete`, `tags` (D16). Keep `slug`, `permalink`, `date`, `title_alt`.
- Keep `lesson-framing` aside, studio-test blockquote, `lesson-semantic-graphic` include, TOC boilerplate (§5, exact), `lesson-outcome-graphic` include + its `{% comment %}` selection block.
- One TTOD epigraph by id, right after the studio test (§7 format).
- **Convention note** before first code: what the three labels mean + scoped exception sentence.
- Every fence preceded by a bold label line: `**CodeSandbox-ready** — …`, `**Excerpt** — …`, `**Template** — replace …`.
- No emoji in H2/H3 except the TOC heading (§5 boilerplate keeps 📋).
- Official time line (D4): "**Official time:** 3 h in class (≈ 1.5 h lab)" etc., matching tracks.yml.
- Internal links via `relative_url`.

## AI moves — caps per lesson (doctrine-only, no new citations)

| Slot | S7 | S8 | S9 |
| --- | --- | --- | --- |
| Common failures (1 row) | AI pastes framework/jQuery/JSX code | AI suggests `innerHTML` for user text | AI adds Vite/webpack config, `require`, `package.json` or CDN imports |
| Verify (1 box) | I can narrate event → DOM → feedback for my handler without looking | Unsafe toggle fires the payload, safe path does not — I saw both | I drew the import graph before asking any assistant |
| Lab callout (1 short "AI check") | Explain-before-paste: write the event → node → change sentence first | Ask the assistant for a render function, then test it with the payload | Ask for a split; reject anything that needs a build step |
| Submit (1 line) | `AI: tool used / none · one suggestion I rejected and why` → links to the oral-defence rubric | same | same |

Rubric link: `{{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }}` (exists in `_site`, EN only).

## S7 `js-intro`

| Must keep | Must add | Must cut |
| --- | --- | --- |
| Spine; 3 progressive commits on `main.js`; DevTools Console + Elements + Sources (breakpoint, `debugger`); DOM + events core; `defer` | DOM-feedback Commit 2 (D2); "Why not `alert`" one-liner; compact JS-vs-C++/PHP table (8 rows) as optional deep dive; 8-row event table; DOMContentLoaded vs `defer` note | Timeline → 5 bullets in deep dive; 10 characteristic sections; extended syntax lists; Network/Performance/Lighthouse; Node.js section → 2 lines + `relative_url` link (D1); "Work inprogress" (D18); duplicated ATELIER reflections |

Target **≤ 450 lines**.

## S8 `js-dom-manipulation`

| Must keep | Must add | Must cut |
| --- | --- | --- |
| Spine; four approaches (as one table); Ex1 strings, Ex2 native + `DocumentFragment`; XSS verify box; demos | Unsafe↔safe checkbox in `demo/01` (D6); classic `defer` scripts (D5); MDN fact "injected `<script>` does not run, `onerror` does"; Trusted Types = Baseline 2026, named not labbed; `importNode` (D17) | Inline full demo HTML/CSS (→ link + `Excerpt` of the JS that matters); React-first objectives (D9); TS JSX link (D8); Ex3 + Ex4 → optional deep dive; "Key DOM methods" → 8-row table |

Target **≤ 450 lines** (demo files excluded).

## S9 `js-modules`

| Must keep | Must add | Must cut |
| --- | --- | --- |
| Spine; Common failures (file://, type, path, circular); studio test (import graph); serve over HTTP | Lab on student's own `assets/js/` (`main.js` → `utils.js` + `ui.js`); one named/default pair; "module scripts are deferred, strict, scoped" facts; path rule (`./` + `.js` extension required in browser) | IIFE/CJS/AMD code (→ 1-screen "why modules"); widget workshop; 5.x; manifesto; JSDoc; Real-world impact; Vite (D10); epigraph (D11); books/mastery (D12); Next steps (D13); CDN (D14) |

Target **≤ 400 lines**.

## Sandbox policy

S7/S9 portfolio repo only; S7's DevTools Console snippets are `Excerpt` (run in Console). S8 `demo/` is the runnable source; each demo HTML+JS pair is labelled `CodeSandbox-ready` only where shown complete (02 is short enough), otherwise `Excerpt` + link to the file.

## EN → ES

Identical headings order, tables, exercises, Verify, Common failures, Submit, labels (`**CodeSandbox-ready**`/`**Excerpt**`/`**Template**` stay in English as labels — the rule names them). Spanish prose; ES demos localised visible strings + `lang="es"`, identical logic. ES links → `/lessons/es/…`; Node link → `/lessons/es/entorno-de-desarrollo/`.

## Registry consequences (Phase 6)

- tracks.yml S7 description: drop "comparación con C++/PHP" as core.
- tracks.yml S9 description: drop "Historia de la modularidad (IIFE → CommonJS → ES6)" as core.
- tracks.yml S8 description: keep (still accurate).
- lessons.yml: titles unchanged → no edit.

## Acceptance

- [x] Per-lesson must-keep / must-add / must-cut tables — above.
- [x] Line-count targets set: 450 / 450 / 400.
- [x] AI moves listed with caps; no new papers.
- [x] Registry changes listed for Phase 6.
- [x] Human gate: user instructed "execute improvement" after reviewing the amended execute file with these targets; no objection recorded → proceed.

## Blockers

- (none)

## Next

Phase 2 may start: yes.
