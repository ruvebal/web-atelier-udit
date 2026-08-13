<!-- exportable · temario bibliography · PASS 1 of 3 (map) · cluster T1 · public keywords only -->

# PASS 1 — Map · syllabus contents bibliography (bilingual ES / EN)

**Role:** produce the first bibliography map for Contidos / Temario. A *different* model will audit you in Pass 2; Pass 3 will merge survivors. Prefer precision over coverage.

I am building the reading list for an undergraduate **front-end development** subject (higher education) that teaches the **durable core** of the human-facing interface layer **without frameworks first**: advanced CSS and responsive layout, modern JavaScript in the browser (modules, DOM, asynchrony, Fetch), and UX/UI + **accessibility as ethical practice from day one** — not as an end-of-course checklist.

Pedagogical frame (for fit sentences only — do **not** invent institutional details): *fundamentals before frameworks*; process evidence (version history) over polish theatre; critical coding that asks what an interface costs (attention, energy, who is excluded).

## Contents anchors (one subsection each)

1. **Advanced CSS3 and responsive design** — media queries, relative units, mobile-first / fluid layout, Flexbox (1D) vs CSS Grid (2D), custom properties (cascade), transitions / transforms / `@keyframes`, modular CSS practices (e.g. BEM) without treating preprocessors or utility frameworks as prerequisites
2. **Modern JavaScript in the browser** — ES modules, efficient DOM and event delegation, Promises and `async`/`await`, Fetch / JSON, loading and error UI patterns; bundlers only as literacy (not framework destiny)
3. **UX/UI foundations for developers** — visual hierarchy, contrast, typography on the web; Nielsen-style usability heuristics applied to student interfaces; mobile-first as content priority, not only CSS technique
4. **Web accessibility foundations (WCAG)** — perceivable / operable / understandable / robust; labels, alt text, keyboard / focus, basic ARIA for custom widgets; accessibility literacy (encode/decode), not audit theatre

## Cross-cut (after anchors)

`## Cross-cut · Durable core vs volatile tooling` — sources that justify teaching plain CSS/JS before CSS frameworks or SPA frameworks; skill half-life / technical volatility **only if checkable** (do not invent a formal “skill half-life” construct if the literature does not establish one).

## Reference classes (each anchor + cross-cut)

| Class | Need |
| ----- | ---- |
| **A · Technical / procedural** | W3C / WHATWG / WCAG-class standards, academically citable technique frameworks, curriculum guides (e.g. CS curricula units on web platforms) |
| **B · Canonical / theoretical** | Load-bearing HCI / interaction design / media theory still cited in HE front-end or a11y teaching |
| **C · Academic** | Peer-reviewed or scholarly chapters ≈2018–2026 on teaching CSS/JS/web, accessibility education, or UX for developers (older OK if still load-bearing) |

## Mandatory identifier rule (every bullet)

Every reference **must** include at least one of:

- `doi: 10.…` (Crossref-resolvable), and/or  
- `isbn: 978-…` or `isbn: 979-…` (print or e-ISBN)

If neither exists yet: still list the work **only** as:

```text
identifier: <publisher or repository URL>
status: no-doi-no-isbn
```

and tag the claim `[UNVERIFIED]`. Do **not** invent DOI/ISBN. Prefer omitting a weak source over fabricating an identifier.

Also always give: author(s), exact title, year, venue/publisher.

**Practitioner docs** (MDN, WAI summaries without DOI/ISBN): allow only under class A with `status: no-doi-no-isbn` + `[UNVERIFIED]` **or** omit; never present them as peer-reviewed.

## Bilingual + claim format (every bullet)

```markdown
- [ESTABLISHED|EMERGING|UNVERIFIED] <one-line claim>
  - cite: <Author>, <Title>, <Year>, <Venue/Publisher>
  - doi: <10.… | none>
  - isbn: <978-… | none>
  - ES: <Temario bibliography label>
  - EN: <Contents bibliography label>
  - fit_ES: <one sentence>
  - fit_EN: <one sentence>
  - scope: <web-platform | interface-layer | programming-general | accessibility-ed | practitioner>
```

## Structure

```markdown
## <Anchor ES> / <Anchor EN>
### A · Técnico / Technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic
## Cross-cut · Durable core vs volatile tooling
### A / B / C …
## Gaps
```

End with `## Gaps` — anchors missing class B or C, FE-specific teaching blanks, and a count of `no-doi-no-isbn` items.

## Assurance

- No fabricated authors, titles, venues, DOIs, or ISBNs.
- Separate durable fundamentals (B) from fast toolchains (A/C).
- Do not redesign the curriculum; do not ask about my institution.
- Mark general programming-education papers as `scope: programming-general` when transferred to web teaching.
- Output markdown only — this is Pass 1 of 3.
