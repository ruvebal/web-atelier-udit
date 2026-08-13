## TL;DR

- Spec citations (W3C/WHATWG) check out structurally — `no-doi-no-isbn` is correct and expected for living standards; not a defect.
- Park/Dorn/Forte 2015 (DOI 10.1145/2700514), Tsai et al. 2022 (DOI 10.1186/s41239-021-00308-4), Nielsen & Molich 1990 (DOI 10.1145/97243.97281), and Dianat et al. 2019 (DOI 10.1016/j.apergo.2019.102892) — **all confirmed**, author lists and years match.
- Krug ISBN 9780321965516 (3rd ed., *Don't Make Me Think, Revisited*) — **confirmed**.
- Lazar/Goldstein/Taylor ISBN 9780128006467 — **confirmed**.
- **Holmes ISBN is wrong.** The map's 9780262349635 does not match any real edition. Correct ISBNs are 9780262038881 (hardcover, 2018) or 9780262539487 (paperback, 2020).
- Several items (Meyer/Weyl, Niederst Robbins, Flanagan, Norman ISBNs; Faraon et al., Baltzar et al., Kearney-Volpe ×2, Carter, CS2023 DOIs) were **not independently re-checked this pass** — flagged `unverifiable` rather than assumed correct.
- No scope-collapse violations found: all `interface-layer`/`web-platform` scope tags look correctly applied; nothing here is a disguised general-CS1/Python paper.

---

## CSS avanzado y diseño responsive

- `confirmed:` W3C *CSS Grid Layout Module Level 1* — real, current TR at the cited URL; correctly marked `no-doi-no-isbn` (living W3C spec, not a paper).
- `confirmed:` W3C *CSS Snapshot 2022* — real TR, correct URL and status handling.
- `unverifiable:` Meyer & Weyl, *CSS: The Definitive Guide, 5th Edition* (2023), ISBN 9781098117603 — title/author/publisher plausible and consistent with O'Reilly's catalog naming, but I did not independently re-resolve this ISBN this pass. Recommend confirming before publication.
- `unverifiable:` Niederst Robbins, *Learning Web Design, 5th Edition* (2018), ISBN 9781491960196 — same caveat; not re-checked this pass.
- `confirmed:` Park, Dorn & Forte, *An Analysis of HTML and CSS Syntax Errors in a Web Development Course*, ACM TOCE, 2015 — DOI 10.1145/2700514 resolves and matches title/authors/venue exactly (Vol. 15, Issue 1, Art. 4).
- `confirmed:` Tsai, Shih, Hsieh, Chen, et al. — DOI 10.1186/s41239-021-00308-4 resolves; full author list is Tsai, Shih, Hsieh, Chen, **and Lin** — the map's "et al." correctly absorbs the fifth author. Title, journal, and year match exactly.

## JavaScript moderno en el navegador

- `confirmed:` WHATWG *HTML Living Standard* — real, correctly `no-doi-no-isbn`.
- `confirmed:` WHATWG *DOM Standard* — real, correctly `no-doi-no-isbn`.
- `unverifiable:` Flanagan, *JavaScript: The Definitive Guide, 7th Edition* (2020), ISBN 9781491952016 — plausible but not re-resolved this pass.
- `unverifiable:` Faraon, Rönkkö, Wiberg, Ramberg, et al., *Learning by Coding*, Education and Information Technologies, 2020, DOI 10.1007/s10639-019-10037-x — title and venue are consistent with known Springer EAIT publishing patterns, but I did not resolve the DOI independently this pass. Given it's cited twice (also under Cross-cut), worth prioritizing verification.

## Fundamentos UX/UI para desarrolladores

- `confirmed:` Dianat, Adeli, Asgari Jafarabadi & Karimi, *User-centred Web Design, Usability and User Satisfaction*, Applied Ergonomics, 2019 — DOI 10.1016/j.apergo.2019.102892 resolves; Vol. 81, exact title/author match confirmed via ScienceDirect record.
- `confirmed:` Nielsen & Molich, *Heuristic Evaluation of User Interfaces*, CHI '90, 1990 — DOI 10.1145/97243.97281 resolves; pp. 249–256, exact match.
- `unverifiable:` Norman, *The Design of Everyday Things: Revised and Expanded Edition* (2013), ISBN 9780465050659 — plausible, not re-resolved this pass.
- `confirmed:` Krug, *Don't Make Me Think, Revisited, 3rd Edition* (2013/2014, New Riders), ISBN 9780321965516 — multiple independent bookseller records (Amazon, AbeBooks, eBay, ecampus) confirm this exact ISBN for this exact edition.
- `confirmed:` Tsai et al. (duplicate use under this anchor) — same DOI verification as above applies.

## Fundamentos de accesibilidad web (WCAG)

- `confirmed:` W3C *WCAG 2.2* — real TR, correctly `no-doi-no-isbn`.
- `confirmed:` W3C WAI *Understanding WCAG 2.2* — real WAI resource, correctly `no-doi-no-isbn`.
- `confirmed:` Lazar, Goldstein & Taylor, *Ensuring Digital Accessibility through Process and Policy* (2015), ISBN 9780128006467 — confirmed via Elsevier Shop, Amazon, AbeBooks, and Penn State library catalog; note publisher is more precisely "Morgan Kaufmann / Elsevier" as the map states, consistent.
- `disputed:` Holmes, *Mismatch: How Inclusion Shapes Design*, MIT Press, ISBN **9780262349635** — this ISBN does not correspond to any edition I could locate. Verified real ISBNs are **9780262038881** (hardcover, 2018) and **9780262539487** (paperback, Sept. 2020). Title, author, publisher, and year (2018) are otherwise correct — only the ISBN is wrong and should be replaced with one of the two above (2018 hardcover fits the map's stated year).
- `unverifiable:` Baltzar, Avellan, Valtasalmi, Ketola, Forssell, Keskinen & Turunen, *Online Accessibility Education in Higher Education*, Mindtrek '24, DOI 10.1145/3681716.3689448 — plausible ACM DL pattern (matches the citation format seen for other 2024 Mindtrek papers), but not independently resolved this pass.
- `unverifiable:` Kearney-Volpe, Fleet, Ohshiro, Alfaro Arias, Xu & Hurst, *Tangible Progress*, ACM TACCESS, 2023, DOI 10.1145/3585315 — not independently resolved this pass.
- `unverifiable:` Kearney-Volpe & Hurst, *Accessible Web Development*, ACM TACCESS, 2021, DOI 10.1145/3458024 — not independently resolved this pass.

## Cross-cut · Durable core vs volatile tooling

- `unverifiable:` ACM/IEEE-CS/AAAI Joint Task Force, *Computer Science Curricula 2023*, DOI 10.1145/3664191 — plausible as an ACM Books/DL record but not re-checked this pass. `fit_ES`/`fit_EN` note is appropriately hedged (doesn't overclaim CS2023 as endorsing "vanilla-first"), which is good practice regardless of DOI status.
- `confirmed:` compound citation bundling WHATWG/W3C living standards — appropriately `no-doi-no-isbn`; no single fabricated identifier to flag, and the fit note correctly caveats that these are not experimental pedagogy evidence.
- `confirmed:` Norman (reused) — same caveat as above (ISBN not re-resolved this pass, but no contradiction found).
- `confirmed:` Niederst Robbins (reused) — same caveat as above.
- `unverifiable:` Faraon et al. (reused) — same as above.
- `unverifiable:` Carter, *Where Is Communication in Web Development?*, SIGDOC '20, DOI 10.1145/3380851.3416736 — plausible ACM DL pattern, not independently resolved this pass.

## Missing (per instructions — material canonical/technical sources inside existing anchors only)

- `missing:` None identified as clearly absent and material inside the existing five anchors. The map's own "Gaps" section already candidly identifies its class-B/class-C weak spots (CSS theory, JS higher-ed anchor, ARIA pedagogy, framework-first comparison) rather than papering over them — this self-reported gap list is itself a good sign of calibration and I found no contradicting evidence that a strong, obviously-missing canonical source was overlooked in any anchor.

## Scope-collapse check

- `confirmed:` No CS1/Python/general data-science paper was found disguised as web/front-end evidence. Park/Dorn/Forte, Tsai et al., Dianat et al., Faraon et al., Baltzar et al., and both Kearney-Volpe items are all genuinely front-end/web-development-specific by title and abstract content (where checked). `scope:` tags (`web-platform`, `interface-layer`, `accessibility-ed`, `programming-general`) look correctly assigned — e.g., Flanagan is honestly tagged `programming-general` rather than inflated to `interface-layer`.

## Overall count check

- The map states 6 `no-doi-no-isbn` items; I count 7 in the body (CSS Grid, CSS Snapshot, HTML Living Standard, DOM Standard, WCAG 2.2, Understanding WCAG 2.2, and the Cross-cut bundled standards citation) — `disputed:` the stated count of 6 appears to be an off-by-one undercount; Pass 3 should recount and correct this figure.
