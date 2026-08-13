<!-- exportable · temario bibliography · PASS 1 of 3 (map) · cluster T3 · public keywords only -->

# PASS 1 — Map · syllabus contents bibliography (bilingual ES / EN)

**Role:** produce the first bibliography map for Contidos / Temario. A *different* model will audit you in Pass 2; Pass 3 will merge survivors. Prefer precision over coverage.

I am building the reading list for an undergraduate **advanced front-end** subject that assumes React literacy already exists and teaches **systems of interfaces**: production metaframework architecture, offline resilience (PWA), professional testing with **AI-assisted code review as an explicit human-in-the-loop technique**, performance engineering as an ethical/design constraint, and the **transfer** of the component model beyond the DOM (3D/WebGL declarative scenes; IoT / robotics / Python-backed realtime UIs).

Honest field note for Gaps: several of these topics are pedagogically **under-theorised in HE** (especially 3D web and IoT interface transfer). Prefer naming `[UNVERIFIED]` blanks over fabricating a settled pedagogy.

## Contents anchors (one subsection each)

1. **Production rendering architecture** — metaframeworks; islands architecture; SSR vs SSG; multi-framework islands; micro-frontends as an architectural pattern (transferable component model — not a single-vendor course)
2. **PWA and offline resilience** — service workers, cache strategies (cache-first / network-first / stale-while-revalidate), web app manifest, installability as professional expectation
3. **Performance engineering** — Core Web Vitals as measurable goals; bundles / assets / critical CSS / render path; **performance budgets** as design constraints from project start (not end-of-term audits)
4. **3D / aesthetic frontier on the web** — declarative 3D with a React-like component model (e.g. React Three Fiber class of tools); raycasting / interaction; WebGL performance literacy; introductory shader literacy (GLSL) so aesthetics are understood code, not blind effect packs
5. **Interface layer beyond the browser page** — WebSocket / realtime stateful UIs; IoT or robotics control-panel patterns; consuming Python-backed services (FastAPI-class) from a front-end — **same component model, different data source**

## Cross-cut (mandatory after anchors)

`## Cross-cut · AI-assisted code review (human-in-the-loop)` — teaching AI as a PR reviewer: prompt design for review, filtering false positives, ACCEPT/REJECT decision records, responsibility remaining with the human. Prefer recent (≈2024–2026) empirical HE / SE education work. Critique of solution-dumping assistants belongs here only when tied to **review** practice (broader AI pedagogy critique lives in the critical strand).

## Reference classes (each anchor + cross-cut)

| Class | Need |
| ----- | ---- |
| **A · Technical / procedural** | Standards (Service Worker, Web App Manifest, Web Vitals), surveys, academically citable architecture papers |
| **B · Canonical / theoretical** | Distributed UI / architecture theory, performance as UX, mediation/presence for immersive UI — only if still cited |
| **C · Academic** | Peer-reviewed empirical, systematic, or design-research work ≈2018–2026; expect thin coverage on 3D/IoT **pedagogy** — say so |

Mark pure graphics-engine or VTON-style papers `scope: research-context-only` when they are not interface-layer teaching contents.

## Mandatory identifier rule (every bullet)

Every reference **must** include at least one of:

- `doi: 10.…`, and/or  
- `isbn: 978-…` / `isbn: 979-…`

Else:

```text
identifier: <URL>
status: no-doi-no-isbn
```

plus `[UNVERIFIED]`. **Never invent** DOI/ISBN.

Also always: author(s), exact title, year, venue/publisher.

## Bilingual + claim format (every bullet)

```markdown
- [ESTABLISHED|EMERGING|UNVERIFIED] <one-line claim>
  - cite: <Author>, <Title>, <Year>, <Venue/Publisher>
  - doi: <10.… | none>
  - isbn: <978-… | none>
  - ES: <Temario label>
  - EN: <Contents label>
  - fit_ES: <one sentence>
  - fit_EN: <one sentence>
  - scope: <web-platform | interface-layer | programming-general | 3d-immersive | practitioner | research-context-only>
```

## Structure

```markdown
## <Anchor ES> / <Anchor EN>
### A · Técnico / Technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic
## Cross-cut · AI-assisted code review (human-in-the-loop)
### A / B / C …
## Gaps
```

## Assurance

- No fabricated DOIs, ISBNs, authors, or venues.
- If HE pedagogy for Astro/islands, R3F, or IoT dashboards is thin, **Gaps must say so** — that absence is a legitimate curricular frontier, not noise to paper over.
- Vendor sources only as `[EMERGING]` with commercial interest named.
- Do not redesign the degree; markdown map only — Pass 1 of 3.
