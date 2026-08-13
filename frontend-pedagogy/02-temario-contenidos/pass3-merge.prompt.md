<!-- exportable · temario bibliography · PASS 3 of 3 (merge edits) · public keywords only -->

# PASS 3 — Merge edits into the Temario bibliography

**Role:** produce the **single reconciled** bilingual bibliography for Contidos / Temario (front-end / interface-layer pedagogy) from Pass 1 (map) and Pass 2 (audit). You **merge and correct**; you do not invent a third research landscape.

Prefer working with tools open (doi.org, Crossref, publisher pages, library ISBN catalogues). If you are a model without tools, only keep items Pass 2 marked `confirmed:` or `disputed:` **with an explicit correction you can state**; move the rest to Quarantine.

## Inputs (paste both in full)

### Pass 1 — map

--- BEGIN PASS 1 MAP ---

[paste T*.pass1.raw.md]

--- END PASS 1 MAP ---

### Pass 2 — audit

--- BEGIN PASS 2 AUDIT ---

[paste T*.pass2.raw.md]

--- END PASS 2 AUDIT ---

## Merge rules (prospection discipline)

| Pass-2 verdict | Action in merged output |
| -------------- | ----------------------- |
| `confirmed:` | Keep; fix any minor label typos; retain DOI/ISBN |
| `disputed:` | Keep **only** with Pass-2’s corrections applied (title, authors, year, venue, DOI, ISBN, scope) |
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
# Temario bibliography — <cluster id> — edited merge
<!-- pass1 + pass2 reconciled · bilingual ES/EN · frontend-pedagogy -->

## Provenance
- pass1_surface: <label>
- pass2_surface: <label>
- merge_surface: <label>
- date: <YYYY-MM-DD>

## <Anchor ES> / <Anchor EN>
### A · Técnico / Technical
### B · Canónico-teórico / Canonical-theoretical
### C · Académico / Academic

## Cross-cut …   # only if present in Pass 1 for this cluster

## Quarantine
- items still lacking resolvable DOI/ISBN, or unverifiable after audit

## Gaps that remain
- honest blanks (no invention) — especially FE-specific pedagogy gaps already flagged as [UNVERIFIED-GAP] in the field map

## Change log
- bullet list of corrections applied (wrong year → correct year, DOI fixed, dropped fabrications, scope demotions, …)
```

Each kept reference uses this shape:

```markdown
- [ESTABLISHED|EMERGING] <claim>
  - cite: …
  - doi: …          # and/or
  - isbn: …
  - ES: …
  - EN: …
  - fit_ES: …
  - fit_EN: …
  - scope: <web-platform | interface-layer | programming-general | accessibility-ed | practitioner | peer-reviewed>
  - verified_by: pass2-confirmed | pass2-disputed-corrected | pass3-missing-added
```

## Assurance

- Do not reintroduce dropped fabrications.
- Do not expand into new content anchors beyond Pass 1’s structure.
- Prefer fewer **checkable** sources over a long unclean list.
- Do not promote MDN / W3C / vendor docs to peer-reviewed status; keep class A when they belong there.
- This is Pass 3 of 3 — the file to archive as `T*.edited.md` for syllabus use.
