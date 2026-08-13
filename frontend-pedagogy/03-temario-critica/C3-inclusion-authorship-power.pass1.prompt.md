<!-- exportable · temario critical bibliography · PASS 1 of 3 (map) · cluster C3 · public keywords only -->

# PASS 1 — Map · critical Contidos bibliography (bilingual ES / EN)

**Role:** map **critical** references on **inclusion, authorship, and power** in the interface layer and in front-end education. Pass 2 audits on another model; Pass 3 merges. Prefer precision over coverage.

Students will ship interfaces. Contidos / Temario must include sources that name **who can use the interface, who authors it, whose process counts as evidence, and whose classroom evidence is still missing**.

## Critical anchors (one subsection each)

1. **Accessibility as literacy and power** — encoding/decoding accessibility knowledge; inclusive design as continuous practice; critique of checklist culture; WCAG as standard politics
2. **Faculty as bottleneck / contested empathy** — teachers who lack a11y training; institutional capacity; explicit **disagreement** that empathy is (or is not) a CS learning outcome — teach the dispute, not a dogma
3. **Field failures that students will rediscover** — university/public web audits (missing alt text, contrast) as proof that “basic” a11y is still unpaid labour in the sector
4. **Authorship, portfolios, and process evidence** — self-coded portfolios; versioned repositories as assessment infrastructure; critique of polish-without-understanding under GenAI
5. **Who is excluded from the interface economy** — labour behind interfaces; gender/race/disability in computing education and web work; platform metrics flattening dissent (opinion flatness) where sources exist for **web/HCI education**
6. **Geographic and cohort silences** — Ibero-American legal/education frames; student worries about shallow AI learning and unfair assessment; **honest Gaps** when Spanish front-end cohorts are absent from the literature (do not invent local studies)

## Reference classes (each anchor)

| Class | Need |
| ----- | ---- |
| **A · Critical-technical / media-analytic** | Empirical audits, standards analyses, platform or dataset bias work tied to interfaces |
| **B · Canonical / theoretical** | Disability / feminist / critical race / literacy theory **as taken up** in a11y or computing education (cite the uptake, not only the remote classic) |
| **C · Academic** | Peer-reviewed or scholarly chapters ≈2015–2026 on accessibility education, computing education equity, portfolio assessment, or regional digital-education policy |

**Strong preference** for checkable **Ibero-American** scholarship alongside Anglophone canons — label `lang:`. Do not invent regional sources.

## Mandatory identifier rule (every bullet)

`doi:` and/or `isbn:` required; else `identifier:` + `status: no-doi-no-isbn` + `[UNVERIFIED]`. Never invent identifiers.

## Bilingual + claim format

```markdown
- [ESTABLISHED|EMERGING|UNVERIFIED] <one-line critical claim>
  - cite: …
  - doi: …
  - isbn: …
  - lang: <es | en | pt | other>
  - ES: <Temario label>
  - EN: <Contents label>
  - fit_ES: …
  - fit_EN: …
  - evidence_class: <empirical | theoretical | survey-faculty | survey-student | legal | policy>
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
- Keep contested positions visible (e.g. empathy-as-outcome dispute).
- Declaring a Spanish-cohort vacuum is a valid Gap — do not paper it with adjacent countries without labelling transfer.
- Do not redesign the degree; markdown map only — Pass 1 of 3.
