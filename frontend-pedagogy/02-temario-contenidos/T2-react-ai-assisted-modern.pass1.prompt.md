<!-- exportable · temario bibliography · PASS 1 of 3 (map) · cluster T2 · public keywords only -->

# PASS 1 — Map · syllabus contents bibliography (bilingual ES / EN)

**Role:** produce the first bibliography map for Contidos / Temario. A *different* model will audit you in Pass 2; Pass 3 will merge survivors. Prefer precision over coverage.

I am building the reading list for an undergraduate **front-end development** subject that moves from the durable core (HTML/CSS/JS without frameworks) into **modern React-based interface development**, with **AI-assisted development** taught as a transparent, documented, verified professional method (docs-first: plan before implementation) — not as a forbidden shortcut and not as an unexamined oracle.

## Contents anchors (one subsection each)

1. **Framework philosophy and state literacy** — why frameworks exist; durable component model vs volatile toolchain; decision criteria (React vs Vue vs vanilla); state as finite-state thinking; anti-pattern taxonomies for SPA state
2. **React as teaching substrate** — functional components / JSX; hooks (`useState`, `useEffect`, `useRef`, memoisation hooks, custom hooks); state architecture (`useReducer`, Context, external stores with an explicit decision tree); routing (nested / dynamic / protected); data fetching and cache literacy (e.g. server-state libraries); auth surface (JWT / sessions / XSS awareness); SSR / framework-mode / i18n only as advanced literacy, not as a second full course
3. **Testing and delivery literacy** — unit (Vitest-class), component (Testing Library-class), E2E (Cypress/Playwright-class) as one testing pyramid; production build, env vars, CI/CD literacy for student projects
4. **Studio / project assessment under GenAI** — self-coded portfolios, process evidence, oral code defence, incremental project-based learning — sources that support assessing **understanding**, not only artefacts

## Cross-cut (mandatory after anchors)

`## Cross-cut · AI-assisted coding methodology (cutting edge, teachable)` — LLMs as probabilistic reasoners; architectural contracts; observability; deferred / scaffolded assistance; hint systems that withhold full solutions; metacognitive planning/monitoring. **Method and evidence**, not prompt-engineering tips. Prefer ≈2024–2026 peer-reviewed or rigorously documented HE studies. Mark programming-general vs web-specific scope honestly.

## Reference classes (each anchor + cross-cut)

| Class | Need |
| ----- | ---- |
| **A · Technical / procedural** | Curriculum frameworks, standards, academically citable architecture/testing guides |
| **B · Canonical / theoretical** | Component/state theory, HCI for interactive systems, assessment theory that still loads in computing education |
| **C · Academic** | Peer-reviewed empirical or design research ≈2018–2026 (AI cluster: prefer 2024–2026) |

## Mandatory identifier rule (every bullet)

Every reference **must** include at least one of:

- `doi: 10.…`, and/or  
- `isbn: 978-…` / `isbn: 979-…`

Else:

```text
identifier: <URL>
status: no-doi-no-isbn
```

plus claim tag `[UNVERIFIED]`. **Never invent** DOI/ISBN.

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
  - scope: <web-platform | interface-layer | programming-general | accessibility-ed | practitioner>
```

## Structure

```markdown
## <Anchor ES> / <Anchor EN>
### A · Técnico / Technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic
## Cross-cut · AI-assisted coding methodology (cutting edge, teachable)
### A / B / C …
## Gaps
```

## Assurance

- No fabricated citations or identifiers.
- Do not let the AI cross-cut swallow the React / testing anchors.
- Vendor React blogs are practitioner at best — never invent DOIs for them.
- Name open blanks (e.g. thin **web-specific** evidence for oral defence under Copilot-class tools).
- Do not redesign the degree; markdown map only — Pass 1 of 3.
