<!-- exportable · temario critical bibliography · PASS 1 of 3 (map) · cluster C1 · public keywords only -->

# PASS 1 — Map · critical Contidos bibliography (bilingual ES / EN)

**Role:** map **critical** references for Contidos / Temario. A *different* model will audit you in Pass 2; Pass 3 will merge survivors. Prefer precision over coverage.

I am building the **critical reading list** for undergraduate **front-end / interface-layer** courses whose pedagogical motto is *Critical Coding for a Better Living*. This cluster covers **critical perspectives on coding the human-facing layer** — not CSS/JS tutorials.

## Critical anchors (one subsection each)

1. **Interface as human-facing layer** — critique of reducing front-end education to “website production”; web as substrate vs interface-layer as disciplinary object; platform taxonomies that place web beside mobile / robot / embedded / interactive computing
2. **Durable core vs volatile layer** — political economy and pedagogy of framework churn; what should survive tool half-life; risks of teaching only the volatile stack
3. **Performance as ethics (not optimisation theatre)** — who pays for heavy clients (devices, networks, attention); performance budgets as moral/design constraint; critique of shipping excess JavaScript as default
4. **Accessibility as ethics (not late checklist)** — inclusion, legal/standards pressure, and the moral claim that “better living” is not only for the able reader
5. **Energy, climate, and resource cost of software / AI-assisted methods** — **normative** instruments (e.g. intergovernmental AI ethics recommendations on energy/carbon) vs **empirical** measurements; do **not** invent front-end→carbon effect sizes; label class of source honestly

## Reference classes (each anchor)

| Class | Need |
| ----- | ---- |
| **A · Critical-technical / industry-analytic** | Rigorous analyses of stacks, green software, platform costs, standards politics — not vendor PR |
| **B · Canonical / theoretical** | Load-bearing HCI, STS, media, or computing-ethics theory still cited in HE |
| **C · Academic** | Peer-reviewed or scholarly chapters ≈2015–2026 engaging interface pedagogy, sustainable computing, a11y politics, or curriculum critique |

Prefer sources that travel into a Spanish/English bilingual classroom; include **Ibero-American** scholarship when checkable (do not invent it).

## Mandatory identifier rule (every bullet)

At least one of:

- `doi: 10.…` and/or  
- `isbn: 978-…` / `isbn: 979-…`

Else: `identifier: <URL>` + `status: no-doi-no-isbn` + `[UNVERIFIED]`. **Never invent** DOI/ISBN.

Also: author(s), exact title, year, venue/publisher.

## Bilingual + claim format

```markdown
- [ESTABLISHED|EMERGING|UNVERIFIED] <one-line critical claim>
  - cite: <Author>, <Title>, <Year>, <Venue/Publisher>
  - doi: <10.… | none>
  - isbn: <978-… | none>
  - ES: <Temario critical-bibliography label>
  - EN: <Contents critical-bibliography label>
  - fit_ES: <one sentence — why this belongs in a critical Contidos list>
  - fit_EN: <one sentence>
  - evidence_class: <empirical | normative | theoretical | survey | legal>
  - scope: <web-platform | interface-layer | programming-general | accessibility-ed | policy>
```

## Structure

```markdown
## <Anchor ES> / <Anchor EN>
### A · Crítico-técnico / Critical-technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic
## Gaps
```

## Assurance

- No fabricated citations or identifiers.
- Do not flatten critique into productivity tips. Name power, cost, and exclusion where the sources do.
- Separate **normative obligation** from **measured impact** — especially for energy/climate.
- Do not redesign the degree; markdown map only — Pass 1 of 3.
