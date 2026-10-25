<!--
Mondrian Project — cascade pack index (two faces: product owner / technical director).
Author: Rubén Vega Balbás, PhD · 25 October 2026
Lives here until PHASE-M1 moves the pack into the product repository (docs/DEV_PLAN/MONDRIAN/).
-->

# The Mondrian Project — cascade pack

**Status:** ACTIVE cascade (M0–M9). Adopted 25 Oct 2026 as the Front-End I 2026–27 semester-1 integrator. This is **not** the student brief (M9 writes it, EN + ES, last) and **not** a course page (nothing here is published by `web-foundations`).
**Author:** Rubén Vega Balbás, PhD · `ruvebal@crea-comm.net`
**Readers:** department / research group / instructor → rationale first; implementing agent → cascade second.

## How to read this pack

| Face | File | Question it answers |
| --- | --- | --- |
| Product owner | [`MONDRIAN-RATIONALE.md`](MONDRIAN-RATIONALE.md) | Why this project, for whom it is worth what, the sitemap from the visitor's side, kiosk vs handheld, why the Python lane is front-end work, how the cohort is organised, what the ethics position requires. |
| Product contract | [`MVP-PRODUCT-SPEC.md`](MVP-PRODUCT-SPEC.md) | Exact user journey, surfaces, frame/state model, transformations, export/print contract, routes and MVP acceptance. Wins over older game descriptions. |
| Technical director | [`MONDRIAN-CASCADE.md`](MONDRIAN-CASCADE.md) | Twenty preflight decisions, the ordered programme with falsifiable gates, master paste, hard constraints, layer map, closing protocol, resume rule, amendments to the pitch, target repository layout. |
| Private correspondence | `_private/` (gitignored) | Student preflight and department/ECSIT emails. Only status/dates enter tracked reports; addresses, replies and signed material remain private. |
| Grounding | [`grounding/ANDRZEJEWSKI-2010.md`](grounding/ANDRZEJEWSKI-2010.md) · [`JSON`](grounding/ANDRZEJEWSKI-2010.json) · [`prior-art queue`](grounding/PRIOR-ART-DISCOVERY.md) | Ahmes extraction, Athanor injection/retrieval, full node/page anchors, limits, unresolved gates and candidates for the next evidence pass. |
| Origin | [`PITCH.md`](PITCH.md) | The 22 Oct decision document: matrix, hue formula, frame contract, art-historical contract, rights, 50 risks. Still authoritative where the cascade §7 does not amend it. |
| AI grading sufficiency | [`AI-EVALUATION-SUFFICIENCY-REVIEW.md`](AI-EVALUATION-SUFFICIENCY-REVIEW.md) | Instructor-only: spine vs operational gaps vs TTOD close-out; what to add before M1 templates freeze. |
| AI operating contract | [`AI-CRITICAL-OPERATING-ADDENDUM.md`](AI-CRITICAL-OPERATING-ADDENDUM.md) | Required PR log, human/assistant verification boundary, formative checkpoint and instructor signs; shared rubric remains the only summative instrument. |
| Git / contribution sufficiency | [`GIT-HYGIENE-AND-CONTRIBUTION-SUFFICIENCY-REVIEW.md`](GIT-HYGIENE-AND-CONTRIBUTION-SUFFICIENCY-REVIEW.md) | Instructor-only: port TTOD Git hygiene + PR-review automation; rewrite CONTRIBUTING from student M1 feedback. |
| Phases | [M0](PHASE-M0.md) preflight · [M1](PHASE-M1.md) `git init` → Pages · [M2](PHASE-M2.md) contracts · [M3](PHASE-M3.md) shell/story · [M4](PHASE-M4.md) analyzer · [M5](PHASE-M5.md) API · [M6](PHASE-M6.md) editor/print · [M7](PHASE-M7.md) kiosk · [M8](PHASE-M8.md) corpus (parallel) · [M9](PHASE-M9.md) research + brief | One paste-ready runbook each. Do not invert. |

Closing: each phase → VERIFYING → `PHASE-Mn-COLD-REVIEW.md` → amend if needed → `PHASE-Mn-REPORT.md` → DONE. The implementer never self-certifies.

## One-sentence claims

- **Product:** a kiosk-first and handheld editor where a measured Mondrian
  composition enters an A4/digital surface at its original ratio, then can be
  resized, reflected, repositioned, recoloured, saved as SVG/PNG and printed—
  every source number preserved and every visitor change reproducible.
- **Engineering:** immutable work data plus separate surface/state contracts;
  vanilla-JS/zod/pydantic conformance; inspectable CSS Grid editor, canonical SVG
  export, semantic HTML preview from FastAPI; static/offline Pages app, no client
  framework.

## Programme snapshot

| Step | Deliverable | Status |
| --- | --- | --- |
| M0 | Decisions ratified, probes, private communications, reference works + rights | READY |
| M1 | Repo from `git init`, CI/Pages, Git/PR/AI contribution contract | BLOCKED (M0) |
| M2 | Work/surface/state contracts, matrix core, conformance, reference work | BLOCKED (M1) |
| M3 | Product shell, gallery, About story/About Us/method | BLOCKED (M2) |
| M4 | Classical analyzer + line weights + evaluation (Python lane) | BLOCKED (M2) |
| M5 | API JSON + HTML/CSS preview semantic conformance | BLOCKED (M2; M4 for `/analyze`) |
| M6 | Full MVP editor, export and calibrated print | BLOCKED (M3) |
| M7 | Kiosk/PWA + QR handoff + real touch device | BLOCKED (M6) |
| M8 | Corpus: references 2–3 + one work per student (parallel lane) | BLOCKED (M2) |
| M9 | Declaration, pseudonymisation, defence, brief EN/ES, dataset, abstract | BLOCKED (M7, M8) |

## Live snapshot (25 Oct 2026 — checked this session, not assumed)

| Fact | Value | Where checked |
| --- | --- | --- |
| Branch base | `mondrian-project-cascade` created from `main` @ `82320d2`; initial cascade commit `1896415` | `git log`, 25 Oct 2026; working-tree state intentionally omitted because this document is edited during review |
| Node / pnpm / Python on instructor machine | v22.22.0 / 10.30.0 / 3.14.7 | `node -v`, `pnpm -v`, `python3 --version` |
| `uv` installed | **yes: 0.13.5** | `uv --version`, 25 Oct 2026 |
| Andrzejewski paper grounding | 118 nodes, 202 entities, 73 relations; Athanor injection complete; scoped retrieval resolved full UUIDs/pages | [`grounding/ANDRZEJEWSKI-2010.md`](grounding/ANDRZEJEWSKI-2010.md) |
| Bibliographic gate | DOI `10.1117/12.840558`; APA and node citations evaluator-safe at confidence 0.95 | Ahmes manual DOI dry-run + live Crossref verification + `query --cite --require-evaluator-safe` |
| Remaining grounding limit | DevIAC GraphRAG cannot see the `scholar` library under its current vault root | Receipt records the fail-closed capability check; Athanor full-node retrieval succeeded |
| Baseline 2026 newly available | container style queries, `@scope`, `field-sizing`, `contrast-color()`, `shape()`, anchor positioning (Jan 2026), `crisp-edges`, active view transition | web.dev/baseline/2026; MDN `anchor()` |
| `if()`, `@function` | not Baseline; limited | web.dev/baseline/2026 (absent); State of CSS 2026 |
| Astro current major | 6.0 (10 Mar 2026); official Pages action `withastro/action@v6`, default Node 24, pnpm@10 accepted | astro.build/blog/astro-6; docs.astro.build/en/guides/deploy/github |
| pnpm Python support | experimental, pnpm 12.4+; uv workspace shared env in 12.5 | pnpm.io/python; pnpm.io/blog/releases/12.5 |
| Screen Wake Lock | Baseline 2025; HTTPS; released on hidden | MDN Screen Wake Lock API |
| Keyboard Lock | only in JS fullscreen; Chrome keeps 2 s Esc | Chrome docs (via search synthesis) — re-verify in M0 |
| Prior DH work | Andrzejewski, Stork, Zhu, Spronk (2010) is Ahmes-resolved; other candidates remain discovery-only | [`grounding/ANDRZEJEWSKI-2010.md`](grounding/ANDRZEJEWSKI-2010.md) · [`grounding/PRIOR-ART-DISCOVERY.md`](grounding/PRIOR-ART-DISCOVERY.md) |
| FE I session table | S1–S13; no Jekyll/Astro/Bootstrap/Tailwind session; GSAP S11; Vite first at S27 | `web-foundations/docs/tracks/en/udit/2627-fei/index.md` |
| Shared defence rubric | v2.0.3, frozen 2026-09-01, FE I row "any AI-assisted project" | `web-foundations/docs/evaluation/shared/ai-declaration-oral-defence-rubric/index.md` |
| TTOD institutional letter template | exists; addressees: grado coordination, Full-Stack/Data-Science direction, ECSIT IP | `~/src/ttod/docs/research/institutional/SOLICITUD-AUTORIZACION-PEDAGOGICA-ES.md` |
| Tao of HCD source | Spanish chapter, ten sections, parked for TTOD merge | `~/src/ttod/sources/tao-of-human-centered-design/{README,es}.md` |

## Where things go after M1

| Now | After M1 |
| --- | --- |
| This folder: INDEX, RATIONALE, CASCADE, PHASE-M*, PITCH | Product repo `docs/DEV_PLAN/MONDRIAN/` (canonical) |
| — | This folder keeps `PITCH.md` + an `INDEX.md` pointer |
| `_private/` correspondence | Remains local and gitignored; never copied into the public product repo |
| — | Student brief: product repo `docs/brief/` **and** `web-foundations` S13 lesson (M9) |
