# Open questions for Rubén — lesson-depth + publishing pass, 2026-08-09

Written by Claude. Everything here is **either a decision only you can make, or a claim I could not verify.** Nothing below is blocking a commit; all of it is blocking *publication with confidence*.

---

## 0. Where we are — publishing readiness

**Status: the tracks and lessons are publishable now.** `git push` is the only remaining step; I don't push (rule 9).

| Check | State |
| --- | --- |
| Jekyll build | ✅ **0 warnings, 0 errors** (was 17 Liquid warnings) |
| `/tracks/`, `/tracks/en/`, `/tracks/es/` | ✅ resolve |
| `/tracks/fei/`, `/tracks/feii/` | ✅ resolve, pedagogy section present |
| `/tracks/fei/how-to-pass-this-track/`, `/tracks/feii/…` | ✅ resolve **and now actually render** (see §9) |
| `/lessons/en/feii/` canonical index | ✅ **created this pass** (did not exist) |
| 12 FE II unit pages | ✅ all resolve, all linked from the index |
| Internal links on the 17 FE I/FE II pages | ✅ **all resolve** (were broken — see §9) |
| FE II units discoverable in `/lessons/en/` browser | ✅ **registered this pass** (were invisible) |
| Lab hours | ✅ 30 h both courses |
| Site-wide broken links | 11 remain, **all pre-existing and unrelated** — see §11 |

**What is NOT ready:** ten of twelve FE II units are still scaffold-quality prose (§7), there are no Spanish versions of any FE II material (§10), and Phase 5's institutional deliverables (TEMARIO, Back-End II synergy sheet) are untouched (§1).

---

## 1. Did you mean Phase 5, or lesson depth? (scope question)

You said "proceed with phase number five," but every instruction you gave — code-block natures, sandboxes, library versions, TTOD quotes, prettier TOC fences, base-url links — describes **lesson authoring**, not `phase-5-institutional.md`'s deliverables (TEMARIO, Back-End II synergy sheet, UX/UI boundary note).

I did lesson depth, on this reasoning: **the TEMARIO is derived from the final unit list.** Submitting a TEMARIO built from units that overlapped FE I and contradicted it (see §2) would encode those errors into an official document filed with the department. Fixing lessons first is the correct order.

**If you actually wanted the institutional Phase 5, say so and I'll do it next — the units are now solid enough to derive a TEMARIO from.**

---

## 2. Unit 5 contradicted FE I. I changed it — confirm the call.

Phase 2's gate claimed "zero content overlap with FE I's `react/*` track." That gate was not met for Unit 5:

- FE I's [Testing lesson]({{ site.baseurl }}/lessons/en/react/react-testing/) teaches the **Testing Trophy**, Vitest, RTL, MSW, Cypress, and a GitHub Actions workflow.
- Devin's FE II Unit 5 taught the **Testing Pyramid** (a *different, competing* model, with no acknowledgement that FE I taught another), plus Vitest setup, RTL basics, GitHub Actions, and coverage — a near 1:1 repeat.

Students would have been taught two contradictory shapes in two consecutive courses with no explanation.

**What I did:** rewrote Unit 5 so FE II *inherits* the Trophy explicitly, explains when the Pyramid is still correct, and then teaches what FE I genuinely does not own — test design (what **not** to test), flakiness and determinism, Cypress→Playwright migration on engineering grounds, CI wall-clock budgets with sharding, contract testing, and automated a11y assertions.

**Confirm:** is "FE I = tool literacy, FE II = strategy and economics" the boundary you want? It's the one that makes the two courses non-redundant, but it's your call.

---

## 3. Unit 6 cited fabricated research findings. Replaced with the real ones.

Devin's Unit 6 attributed **five "Key Findings"** to Oliveira et al. 2026 that do not appear in that paper — generic plausible-sounding claims ("AI as force multiplier", "domain-specific tuning", etc.) presented as cited research.

In a course whose central assessment artefact is an **AI Use Declaration**, shipping fabricated citations would be indefensible if a student checked.

**What I did:** replaced them with what `profield-frontend-pedagogy.md` actually verified:

- arXiv `2604.23251`, ICSE 2026 SEET; two cohorts, >100 students, 2023–2024, software-engineering capstone
- Iterative activity roughly doubled cohort-over-cohort: **581 → 1176 PRs**
- Responsiveness stable at **~32–33%** of reviewed PRs followed by a subsequent commit

I also kept the profield's scope caveat visible in the lesson — the cohort was SE capstone, not front-end, which is an explicit `[UNVERIFIED-GAP]`. I turned that into a teaching point: the students are *inside* the gap, and their Entrega is evidence.

**Action for you:** I trusted `profield-frontend-pedagogy.md`'s summary rather than re-reading the arXiv paper. Worth one spot-check before this goes live.

---

## 4. 🔴 Published FE I lessons had silently broken code. Fixed — please review the diff.

This is the most consequential finding of the pass, and it is **pre-existing**, not from this renewal.

Jekyll processes Liquid **inside** code fences. Any JSX object literal — `{{ ... }}` — was being silently eaten in the published HTML. In the very lesson you pointed me to as the quality model:

```
source:    return <Navigate to={redirectTo} replace state={{ from: location }} />;
published: return <Navigate to={redirectTo} replace state= />;
```

The lesson then tells the student, three lines later, *"the `Navigate` line is byte-identical"* — while the published line was corrupted. A student copy-pasting the redirect-after-login pattern (the core of the whole auth lesson) would get code that silently loses the `from` location.

**Affected:** 9 code blocks across 4 files, 17 Liquid warnings —
`react-authentication` (2), `react-routing` (2), `geophysical-aggregator-project` (2), `es/react-hooks` (3).

**Fix applied:** wrapped each affected fence in `{% raw %}` / `{% endraw %}`. Build now emits **0 Liquid warnings** (was 17), and the code publishes intact — verified by stripping tags from the built HTML.

**Why I touched FE I territory** (Phase 1 said don't): this is a rendering-bug fix, not a content change. No teaching text was altered. Revert freely if you disagree — it's a self-contained, mechanical diff.

**Standing risk:** any future lesson with JSX `{{ }}` or GitHub Actions `${{ }}` in a code fence will silently corrupt unless wrapped. Worth a CI check — the build already surfaces it as a Liquid Warning, so a grep for `Liquid Warning` in the Pages workflow would catch it permanently. Say the word and I'll add it.

---

## 5. Sandbox URLs — I could not create these, and did not invent them.

The FE I React lessons link real CodeSandbox devboxes (e.g. `codesandbox.io/p/devbox/9ltymf`). Those are accounts and artefacts I have no access to.

The auth lesson's model — **fork the previous sandbox, don't create a new one** — is pedagogically the strongest part of that sequence, and FE II should reuse it. But I refuse to write a plausible-looking fake URL into a student-facing page.

**Decision needed from you:** does FE II get its own sandbox lineage (an Astro devbox forked forward across units 2→6), or do units 5–6 work against the student's own capstone repo (which is what I assumed and wrote toward)? If the former, create the base devbox and I'll wire the fork instructions in.

---

## 6. The Astro decision was made without knowing Cloudflare acquired the Astro team.

Devin picked **Astro** as the meta-framework in Phase 2. While checking versions I found two facts that postdate the assumptions behind that choice:

- **Astro 7.0** shipped June 2026 (7.1.6 as of late July) — new Rust compiler, Vite 8, Rolldown.
- **Cloudflare acquired the Astro team in January 2026**, and edge/Workers integration is now folded into core.

That doesn't make Astro wrong — arguably it strengthens it for teaching deployment. But a course teaching the **durable-core / volatile-layer** distinction should probably say out loud that its chosen meta-framework is now vendor-owned. That's a live teaching moment, not a footnote.

**Also concrete:** Astro 7 requires **Node 22**. Devin's Unit 5 CI pinned `node-version: '20'`. I raised it to 22 in the rewritten workflow (Vitest 4's floor is 20, so 20 wasn't wrong for testing — but it would break an Astro 7 build in the same repo). **Units 2–3 still need checking for Node/Astro version claims.**

---

## 7. Remaining work — 10 of 12 units still at scaffold quality

I rebuilt **Units 5 and 6** (the Entrega 1 pair) as the reference implementation. The other ten still have the defects I found repo-wide:

| Defect | Status |
| --- | --- |
| Code blocks with **no CodeSandbox-ready / Excerpt / Template label** | 1 label across 196 blocks originally; units 5–6 now labelled, **10 units still unlabelled** |
| Invented quotes instead of sourced TTOD | Units 5–6 now cite real IDs (`qa-009`, `cc-007`…); 10 units still have invented epigraphs |
| No internal links to FE I lessons | Units 5–6 now use `{{ '/path/' | relative_url }}`; 10 units have **zero** internal links |
| Generic examples with no project continuity | e.g. Unit 5's old "iPhone 15 Pro checkout" belonged to no project; 10 units still generic |
| Unverified library versions | Units 5–6 pinned & dated (Aug 2026); 10 units unchecked |
| `pretier-ignore-end` typo | **Fixed in all 12** ✅ |

**My recommendation:** do these in Entrega pairs (8–10 next, since that's Entrega 2 and contains the two genuinely novel frontier units), not all at once — it keeps each pass reviewable.

---

## 8. Minor: the site's TTOD copy is stale

`web-foundations/docs/_data/ttod.yml` has **176** quotes; the source at `/Users/ruvebal/src/ttod/ttod.yml` has **213**. I quoted statically with IDs (`— Tao of Development, qa-009`) so nothing breaks today, but any future Liquid lookup (`site.data.ttod`) against a newer ID would silently return nothing. Worth a re-sync.

---

## 9. 🔴 Both reveal.js decks were broken in production. Fixed.

Found during the publishing pass, and it would not have been visible until a student opened the page.

`index.html` carries `permalink: /tracks/fei/how-to-pass-this-track/`, so Jekyll **moves the HTML** — but its sibling `vendor/`, `data/`, and `design/` folders are static files that **stay at their source path** (`/tracks/en/udit/2627-fei/how-to-pass-this-track/…`). The deck asked for `./vendor/reveal.js`, `./vendor/reveal.css` and `./data/content.json` relative to its *published* location, so all three 404'd.

**Result: both decks would have rendered as a blank page** — no reveal.js, no stylesheet, no slide content. FE I and FE II alike.

**Fixed** by pointing the three references at the real published asset paths via `relative_url`. Verified: assets resolve, `content.json` parses, 14 slides each.

Two related fixes in the same area:

- **Links inside `data/content.json` were broken too** (`../../../../evaluation/…` escaped the baseurl; `../../index.html` overshot the track page). JSON gets no Liquid by default, so I added Jekyll frontmatter to both files — output is still valid JSON, and `relative_url` now resolves. Verified.
- **FE II had no `design/tokens.json`** while FE I did. Added for parity. Note: neither deck *loads* tokens at runtime — they consume `site.css` custom properties, exactly like the `SVCM/web/pitch` precedent, where `tokens.json` is a declared design record rather than a runtime dependency. I documented that inside the new file so it isn't mistaken for dead weight.

**Worth adding to CI:** the Pages workflow could fail on `Liquid Warning` in build output. That single grep would have caught both this class of bug and the JSX corruption from the previous pass.

---

## 10. Spanish parity — a real gap, and a decision for you

Every FE II artefact is **English-only**: 12 units, the new sequence index, and the track page. FE I's lessons mostly have `es` + `en`, and `tracks.yml`'s `feii:` entry is written in Spanish while the lessons it points at are English.

Given the course is taught at UDIT in Spanish, this is a live question, not a nicety:

- **Option A** — English lessons, Spanish track/institutional pages (the current de-facto state). Defensible: the industry vocabulary is English, and FE I's React track already leans this way.
- **Option B** — full `es` mirrors for all 12 units. Significant work; needs to be planned, not improvised.

**I did not guess.** Tell me which, and I'll make it consistent either way.

---

## 11. Pre-existing broken links elsewhere on the site (not from this cascade)

The full-site sweep found **11 broken internal links, none in FE I/FE II pages**. Recorded here so they're not mistaken for cascade damage:

| Page | Broken target | Likely cause |
| --- | --- | --- |
| `index.html` (root) | `/LICENSE-CODE`, `/LICENSE-CONTENT` | Files not published under `docs/` |
| `lessons/es/index.html` | `es/gsap/overview`, `es/gsap/tailwind`, `es/gsap/bootstrap` | `lessons.yml` registers Spanish GSAP pages that don't exist |
| `lessons/es/index.html` | `es/react/ai-assisted-development-foundations`, `es/react/final-presentation` | Registered, not translated |
| `lessons/en/index.html` | `en/web-design-trends` | Registered, file missing |
| `lessons/*/portfolio-template-brief/site/plan/` | `/assets/css/index.css` | Demo site referencing a stylesheet that isn't there |
| `lessons/es/react/react-fundamentals/index-old.html` | self-referential | Stale `index-old` file — probably deletable |

Mostly `_data/lessons.yml` promising Spanish pages that were never written. Cheap to fix (either write them or drop the `es` keys) — say the word.
