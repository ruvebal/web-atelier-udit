# Temario bibliography prospection — Frontend pedagogy

Official CONTENIDOS (FE I / FE II) need checkable references (**DOI and/or ISBN**) before CV / unit forge reading lists are honest.

## Canonical merges (promoted)

| Location | Role |
| -------- | ---- |
| `profield/runs/frontend-pedagogy/01/temario/*.edited.md` | **Canonical** Pass-3 merges (T1–T3 technique) |
| `frontend-pedagogy/grounding/temario/` | Teaching-repo mirror (same edited files; no PDFs) |
| `frontend-pedagogy/02-temario-contenidos/*.pass1.resultant.mdc` | Historical Pass-1/audit captures (not harvested) |

| Strand | Files | Status |
| ------ | ----- | ------ |
| Technique | T1 · T2 · T3 | ✅ Pass-3 `*.edited.md` promoted 2026-08-11 |
| Critical | C1 · C2 · C3 | 🟡 prompts ready in `03-temario-critica/` — merges pending |

## PDF corpus + Ahmes path

Shared with the field run:

`/Users/ruvebal/src/profield/runs/frontend-pedagogy/01/pdfs/`

```bash
cd ~/src/profield
make harvest-temario-fe       # REFERENCES + corpus-seed-list + inventory.json
make refcheck-temario-fe      # Crossref / Open Library
make retrieve-temario-fe      # Unpaywall OA → 01/pdfs/
make pending-fe               # PENDING-procurement.md
make athanor-ready-fe-batch   # ahmes batch + meta×2 + require-coats
# or if PDFs already extracted:
make athanor-ready-fe

cd ~/src/deviac && make ingest-profield-fe

cd ~/src/athanor && source .venv/bin/activate && set -a && source .env && set +a
athanor inject --from-manifest \
  ~/src/profield/runs/frontend-pedagogy/01/pdfs/.ahmes/batch-manifest.json \
  --project-slug profield-frontend-pedagogy --vault scholar
```

Artifacts: `01/corpus-seed-list-temario.md` · `01/REFERENCES-temario-for-refcheck.md` · `01/PENDING-procurement.md` · `01/temario/retrieve-report.json`  
Scripts: `profield/scripts/harvest-temario-refs.py` · `retrieve-oa-dois.py` · `export-pending-procurement.py`  
Guide: `ahmes/.cursor/skills/profield-ahmes-athanor/SKILL.md` · `01/WORKFLOW-DOWNLOAD-AHMES.md`

**Discover** in DevIAC/Athanor (`project_slug=profield-frontend-pedagogy`) · **cite** only Ahmes `coat · node · page`.

## Prompt sources (still editable)

- Technique: `frontend-pedagogy/02-temario-contenidos/` (twin: `profield/.../02-temario-contenidos/`)
- Critical: `frontend-pedagogy/03-temario-critica/`
- Operator index: `frontend-pedagogy/grounding/temario/INDEX.md`
