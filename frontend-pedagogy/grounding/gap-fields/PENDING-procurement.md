# PENDING procurement — FE gap-fields wave (`20260815`)

_Generated 2026-08-16 from Pass-2 edited maps + DOI-acquisition seeds − coats already in [`COAT-INVENTORY.json`](./COAT-INVENTORY.json)._

Legitimate OA download only. ISBN monographs → campus library / purchase. Paywalled DOIs → Unpaywall retry later or institutional access — **no shadow libraries**.

**Already coated (23 PDFs):** see inventory. Note: Ciungan (`applsci-15-10537.pdf` → DOI `10.3390/app151910537`) and Stelea (`futureinternet-17-00274-v2.pdf` → DOI `10.3390/fi17070274`) are **on disk** under non-DOI filenames — do not re-download; optionally rename/relabel in the next Ahmes batch for cleaner manifests.

**Cite-gate note:** many coated works are still `[BIBLIO-GAP]` because host titles were `Abstract` / `1 INTRODUCTION` / `Keywords` → `host_registry_mismatch` (also after `--force-meta --online`). That is Ahmes **12G.4** (SHIPPED 2026-08-16), **not** missing PDFs and **not** a missing RIS pass. Procurement does not fix it — **re-enrich** coats with post-12G.4 Ahmes, then re-cite.

---

## A · Priority acquire (forge-blocking)

These unlock Unit forge claims that today rest on map prose only.

| Priority | DOI | Why | Field / unit |
| ---: | --- | --- | --- |
| **P0** | `10.1145/3328778.3367007` | Case, Steeve & Woolery SIGCSE 2020 — only ESTABLISHED HE PWA pedagogy precedent | Unit 4 · PWA / gap-harvest |
| **P0** | `10.1145/3664191` | CS2023 — curricular legitimacy for SPD / cross-platform (often in omnibus; confirm coat in `profield-frontend-pedagogy`) | Units 2–10 · all gap fields |
| **P1** | `10.1145/3359591.3359737` | Kleppmann et al. local-first 2019 — offline / sync conceptual spine | Unit 4 · Unit 10 |
| **P1** | `10.1007/978-3-642-24550-3_29` | Shapiro et al. CRDT 2011 — realtime collaborative state foundation | Unit 10 WebSocket |
| **P1** | `10.1007/978-3-031-98414-3_1` | Phung et al. 2025 — performance / optimisation-hint figures (Pass-2 NEEDS CHECK on %) | Unit 7 |
| **P1** | `10.1109/TLT.2024.3381858` | Krūmiņš et al. open remote web lab / ROS — adjacent Unit 10 interface | Unit 10 IoT |

## B · DOI in seed, no PDF in this wave (queue)

### Unit 10 — IoT / Python interface (`fe-iot-python-interface-layer`)

- DOI `10.1145/3197091.3205846` — Siever et al., IoT in CS education (ITiCSE 2018)
- DOI `10.1145/3597623` — Walker et al., VAM-HRI survey (THRI 2023)
- DOI `10.1145/3641555.3704751` — Raj et al. SIGCSE TS 2025 (**Pass-2 NEEDS CHECK**)
- DOI `10.1145/3715762` — programming students + GenAI (ACM 2025) (**NEEDS CHECK**)
- DOI `10.3390/app16020653` — Ztoupas et al. Applied Sciences 2026 (**NEEDS CHECK**)
- *(already on disk, verify DOI label)* `10.3390/app151910537` · `10.3390/fi17070274`

### Units 2–3 — Metaframework / islands

- DOI `10.1007/978-3-031-34444-2_23` — disappearing frameworks (also on temario PENDING A)
- DOI `10.1145/3287324.3287433` — (seed; confirm title before download)
- DOI `10.1145/3487051` — Kao 2022 TOCE (Pass-2: plausible, not re-opened)
- DOI `10.1145/3786176.3788337` — da Silva & Brittes 2026 — **hold §11 until record confirmed** (may be fabricated/mis-DOI)

### Unit 4 — PWA / offline

- DOI `10.1145/3243734.3243867` — Lee et al., Pride and Prejudice in PWAs (CCS 2018)
- DOI `10.1109/TSE.2024.3477723` — Köhler et al. 2025 (**NEEDS CHECK**)
- DOI `10.1145/3654777.3676445` — Klokmose et al. 2024 (**NEEDS CHECK**)
- DOI `10.3390/network2020022` — Roumeliotis & Tselikas 2022
- DOI `10.4018/IJMBL.408838` — Wang 2026 pharmacology / mobile-first (**Pass-2 NEEDS CHECK** — IGI)

### Unit 7 — Performance pedagogy

- DOI `10.1145/3696410.3714584` — Pandey et al. MAML 2025 (**NEEDS CHECK**)
- *(standards, not PDF coats)* ISO/IEC 21031:2024 SCI — verify catalogue number before ESTABLISHED; W3C WSG publication date Pass-2 NEEDS CHECK

### Unit 10 — WebSocket / realtime UI

- DOI `10.1007/978-3-319-19890-3_55` — Nicolaescu / Yjs lineage (confirm exact work)
- DOI `10.1145/3626252.3630888` — (seed)
- DOI `10.1145/3689031.3696076` — Gentle et al. Eg-walker 2025
- DOI `10.1145/3695249` — (seed)
- DOI `10.1145/3765325.3765378` — (seed)
- DOI `10.1145/3772318.3791773` — Daryanto et al. 2026 (**NEEDS CHECK** forthcoming risk)
- DOI `10.1145/3806077.3806695` — Pfeil et al. 2026 (**NEEDS CHECK** forthcoming risk)

### Omnibus gap-harvest leftovers

- DOI `10.1109/MCG.2017.26` — graphics education adjacent

## C · Preprints / no stable DOI (label, don’t pretend coated)

- Chen et al., TeleopLab (2025 preprint) — SUS/TLX figures = provisional
- Vepsäläinen, *The Case for HTML First Web Development* (2026) — missing DOI in map
- Suleiman, ecosystem-centric capstone (2026) — missing DOI
- Arapai / Walusimbi et al. arXiv:2603.03339 — offline AI education (**NEEDS CHECK**)
- Qiao / Shihab / Hundhausen arXiv:2510.17894 — replication cluster
- Unattributed “ACM July 2026 GenAI assessment reporting” — **struck / UNVERIFIED** in PWA map until named

## D · ISBN / books (campus procurement)

- Packt: Darren Sauble, *Offline First Web Development* (2015) — cited as lineage, not HE evidence
- Apress: Neelakantam & Pant, *Learning Web-based Virtual Reality* (2017) — **already coated** `964c117c` (technique HOW only; code-block extraction weak — see Ahmes report)

## E · Do not procure as “pedagogy evidence”

Vendor/platform docs (Astro, MDN, web.dev Learn PWA, FastAPI WebSockets, Chrome release notes) stay `[PLATFORM]` notes. RFCs 6455 / 8441 are stable at rfc-editor.org — cite as standards, not Ahmes coats unless you deliberately ingest them.

---

## Next commands

```bash
# From profield — lawful retrieve into the matching field’s source-pdfs/
cd ~/src/profield
# Prefer field-scoped retrieve when make targets exist; else manual Unpaywall:
#   place PDF under runs/<field>/20260815/source-pdfs/
#   ahmes batch … --library scholar --project-slug via inject path

# After new PDFs land
ahmes batch ~/src/profield/runs/fe-pwa-offline-pedagogy/20260815/source-pdfs \
  -L scholar --save-db   # adjust flags to local contract

athanor inject --from-manifest \
  ~/src/profield/runs/fe-pwa-offline-pedagogy/20260815/source-pdfs/.ahmes/batch-manifest.json \
  --project-slug profield-frontend-pedagogy --library scholar

# Cite gate (never invent AU/TI when host heading is Abstract)
ahmes query --cite <extraction.db>:<node_id> --style chicago-author-date
```

## Union destiny (gap-fields × temario)

When Case 2020 + Kleppmann + Phung + CRDT spine are coated **and** 12G.4 headings are fixed, merge this queue with [`../temario/PENDING-procurement.md`](../temario/PENDING-procurement.md) into a single **temario-with-no-procurement-gaps** ledger — see [`PROMPTS-REPLICATE.md`](./PROMPTS-REPLICATE.md) §3.
