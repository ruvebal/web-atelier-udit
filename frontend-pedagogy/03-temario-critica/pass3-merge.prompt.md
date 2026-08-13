<!-- exportable · temario bibliography · PASS 3 of 3 (merge edits) · public keywords only -->

# PASS 3 — Merge edits into the critical Temario bibliography

**Role:** produce the **single reconciled** bilingual **critical** bibliography for Contidos / Temario (front-end / interface-layer pedagogy) from Pass 1 (map) and Pass 2 (audit). You **merge and correct**; you do not invent a third research landscape.

Prefer working with tools open (doi.org, Crossref, publisher pages, library ISBN catalogues). If you are a model without tools, only keep items Pass 2 marked `confirmed:` or `disputed:` **with an explicit correction you can state**; move the rest to Quarantine.

## Inputs (paste both in full)

### Pass 1 — map

--- BEGIN PASS 1 MAP ---

[paste C*.pass1.raw.md]

--- END PASS 1 MAP ---

### Pass 2 — audit

--- BEGIN PASS 2 AUDIT ---

[paste C*.pass2.raw.md]

--- END PASS 2 AUDIT ---

## Merge rules (prospection discipline)

| Pass-2 verdict | Action in merged output |
| -------------- | ----------------------- |
| `confirmed:` | Keep; fix any minor label typos; retain DOI/ISBN |
| `disputed:` | Keep **only** with Pass-2’s corrections applied |
| `unverifiable:` | Move to `## Quarantine` unless you can newly resolve DOI/ISBN and state the resolving URL |
| `missing:` | Add **at most** those missing items, each with full cite + `doi:` and/or `isbn:` + ES/EN labels; tag `[EMERGING]` until a later tool pass re-confirms |
| Fabricated / invented DOI or ISBN | **Drop** (do not quarantine) |

## Hard gate — identifiers

Every bullet under the merged anchors **must** have a real:

- `doi: 10.…` and/or  
- `isbn: 978-…` / `isbn: 979-…`

No `status: no-doi-no-isbn` in the merged body. Those stay in Quarantine or are dropped.

## Output structure (mandatory)

```markdown
# Temario critical bibliography — <cluster id> — edited merge
<!-- pass1 + pass2 reconciled · bilingual ES/EN · frontend-pedagogy critica -->

## Provenance
- pass1_surface: <label>
- pass2_surface: <label>
- merge_surface: <label>
- date: <YYYY-MM-DD>

## <Anchor ES> / <Anchor EN>
### A · Crítico-técnico / Critical-technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic

## Quarantine
## Gaps that remain
## Change log
```

Each kept reference uses this shape:

```markdown
- [ESTABLISHED|EMERGING] <critical claim>
  - cite: …
  - doi: …          # and/or
  - isbn: …
  - ES: …
  - EN: …
  - fit_ES: …
  - fit_EN: …
  - evidence_class: <empirical | normative | theoretical | survey-faculty | survey-student | legal>
  - scope: <web-platform | interface-layer | programming-general | accessibility-ed | policy>
  - verified_by: pass2-confirmed | pass2-disputed-corrected | pass3-missing-added
```

## Assurance

- Do not reintroduce dropped fabrications.
- Do not expand into new content anchors beyond Pass 1’s structure.
- Prefer fewer **checkable** critical sources over a long unclean list.
- Keep normative instruments labelled normative — they **oblige**, they do not measure.
- This is Pass 3 of 3 — archive as `C*.edited.md` for syllabus / debate-hour use.
