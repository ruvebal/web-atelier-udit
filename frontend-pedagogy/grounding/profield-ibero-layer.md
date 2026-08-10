<!--
SYNCED ARTEFACT — do not edit here.
Source of truth: /Users/ruvebal/src/profield/runs/frontend-pedagogy/01/pass1b.edited.md
Synced: 2026-08-10 · Ibero-American layer (Spain · Portugal · Brazil · Mexico)
Re-sync by copying the source file over this one and restoring this banner.
-->

# Omnibus Research Landscape Map — CANONICAL REFERENCE

## Front-end / interface-layer pedagogy in higher education — Ibero-American layer

_Last updated: 2026-08-09_
**Status:** reference map after Pass 3b tool-verify
Base: `pass1b.raw.md` · Audit: `pass2b.raw.md` · Verify: `pass3b.raw.md`

## Evidence tags

- **[ESTABLISHED]** Strongly supported by standards, curriculum frameworks, legislation, canonical literature, or repeated regional evidence.
- **[EMERGING]** Supported by recent 2024–2026 studies, preprints, working groups, surveys, or experience reports.
- **[UNVERIFIED]** Plausible but not sufficiently checkable after Pass 3b.
- **Blank to update** = do not infer; rerun later.

### Method note

Pass 2b spot-checked laws, Spain-cluster citations, UNAM, and IST. Pass 3b re-resolved Crossref/landing pages and OA PDFs for the Pass-2b “provisional” cluster, and filled Pass-2b coverage gaps (Colombia/Chile accessibility norms; SBIE/CLEI/W3C Brasil as venue expectations). Confidence tags below follow **Pass 3b**.

This Ibero-American map is a **regional subsection** beside the global front-end pedagogy map (`pass1.edited.md` / prior global digest)—not a replacement. Global spine: platform-first fundamentals, GenAI as epistemic disturbance, WCAG curricular hardening. Regional spine: accessibility + public digital services + programming education + GenAI/integrity + inclusion.

---

# 0. Regional executive synthesis

- [ESTABLISHED] Ibero-America does **not** yet have a mature, named research subfield equivalent to “front-end web development pedagogy in higher education.” The strongest regional evidence comes from adjacent literatures: programming education, computing education, accessibility education, project-based learning, digital competence, AI in higher education, academic integrity, and public-sector web accessibility.

- [ESTABLISHED] Spain and Portugal are shaped by the EU accessibility regime: Spain’s **Real Decreto 1112/2018** (BOE-A-2018-12699); Portugal’s **Decreto-Lei n.º 83/2018** (transposition of Directive 2016/2102; EN 301 549 / WCAG 2.1 AA; accessibility statements; AccessMonitor). _(Pass 2b confirmed Spain; Pass 3b confirmed Portugal.)_

- [ESTABLISHED] Brazil’s distinctive frame is **eMAG** (Modelo de Acessibilidade em Governo Eletrônico), a Brazilian specialization of WCAG for government sites/portals, bridging technical front-end practice and public-service obligation.

- [ESTABLISHED] Mexico publishes federal web-accessibility provisions referencing **WCAG 2.0** for Federal Public Administration agencies and state productive enterprises (gob.mx accessibility page).

- [EMERGING] Argentina has strong recent evidence that inaccessible e-government services produce autonomy loss and emotional burden for people with disabilities — **Harari, Luján-Mora & Díaz 2025**, _UAIS_, DOI `10.1007/s10209-025-01226-2`. _(Pass 3b: full author list; not single-author.)_

- [EMERGING] Spain supplies the clearest HE teaching case for accessibility-through-service-learning: **Iniesto & Rodrigo 2024** (ACM Interacción, DOI `10.1145/3657242.3658591`) and **Iniesto & Rodrigo 2025** (_UAIS_ 24(4):3241–3255, DOI `10.1007/s10209-025-01252-0`), evaluating **94** Spanish city-council websites. _(Pass 3b restores the “94” figure Pass 2b left unverified.)_

- [EMERGING] Brazil has a dense programming-education and institutional-accessibility evidence base: **Gonçalves et al. 2025** SLR (arXiv `2501.17278`); **Vinadé & Marczak 2024** accessibility knowledge gaps (SBQS/ACM DOI `10.1145/3701625.3701689`); **Batista & Baluz** HEI website WCAG evaluation (_iSys_, DOI `10.5753/isys.2025.5401`); **Correa, Vitoriano & Llanos 2025** SIGAA academic-management accessibility (_Informatics_, DOI `10.3390/informatics12030063`).

- [EMERGING] Latin America has a major GenAI-in-HE signal: **Digital Education Council AI in Higher Education LATAM Survey 2026** — >30,000 responses from 29 HEIs (with Tec de Monterrey / IFE).

- [EMERGING] Mexico’s 2026 UNAM entrance-exam crisis is regionally important for **assessment integrity under digital/AI-mediated HE**, but must be framed precisely: UNAM ordered an _examen de control presencial_ for ~58,783 aspirants after irregularities in the online process; AI appears in proctoring/monitoring and press hypotheses, **not** as confirmed individual AI-cheating for the full cohort. _(Pass 2b precision flag; Pass 3b confirms control-exam framing.)_

---

# 1. What changes when the field is regionalised?

## 1.1 From “front-end web development” to “interface-layer development”

- [ESTABLISHED] Front-end remains the human-facing interface layer; web technologies remain the dominant teaching substrate. Regionally this matters because public-sector accessibility, e-government, mobile-first access, online learning, institutional websites, and digital inclusion are strong contextual drivers across Spain, Portugal, Brazil, Mexico, and Argentina.

- [EMERGING] Civic/public-service orientation is well evidenced: Spanish CS students evaluating city-council websites (Iniesto & Rodrigo); Brazilian work on HEI websites and academic management systems (Batista & Baluz; Correa et al.).

- [EMERGING] Digital-divide / competence context: **CEPAL 2024** report on digital competences in Latin America and the Caribbean (PISA 2022–linked), covering Argentina, Brazil, Chile, Colombia, Costa Rica, Mexico, Uruguay, and others.

## 1.2 Regional field diagnosis

- [ESTABLISHED] Direct regional research on “front-end pedagogy” is thin; the reliable map assembles programming education, accessibility education/evaluation, digital-competence policy, PBL, AI in HE, academic integrity, and public-sector digital regulation.

- [UNVERIFIED] No clear Ibero-American consensus source on sequencing HTML/CSS/JS vs React/Vue/Svelte, Python-backed interfaces, IoT dashboards, or 3D web in HE front-end courses. **Blank to update.**

- [EMERGING] Specialist venue coverage that a regional auditor expects (Pass 2b _missing_ → Pass 3b add as search targets, not empirical claims): **SBIE** (Simpósio Brasileiro de Informática na Educação), **CLEI** (Congreso Latinoamericano de Informática / computing-education tracks), **W3C Brasil** (alongside eMAG), and historically **RELPE**. Future passes should mine these systematically.

---

# 2. Spain

## 2.1 State of the art, 2024–2026

- [ESTABLISHED] **Real Decreto 1112/2018** regulates accessibility of public-sector websites and mobile apps, including mechanisms to report non-compliance and request accessible alternatives.

- [EMERGING] Service-learning accessibility pedagogy: Iniesto & Rodrigo 2024 (ACM Interacción); Iniesto & Rodrigo 2025 (_UAIS_) — **94** city-council websites; positive student feedback; WCAG error/success patterns (AAA-heavy errors under Perceivable; AA successes under Operable).

- [ESTABLISHED] **ITiCSE 2026** at Universidad Rey Juan Carlos (Madrid) makes Spain a near-term computing-education research node for Europe and Ibero-America.

## 2.2 Foundational / canonical regional sources

- Iniesto, F., & Rodrigo, C. (2024). Exploring the accessibility evaluation of city council websites by computer science students using a service-learning approach. ACM Interacción 2024. https://doi.org/10.1145/3657242.3658591
- Iniesto, F., & Rodrigo, C. (2025). Service-learning for accessibility: understanding WCAG errors and successes in Spanish city council websites. _Universal Access in the Information Society, 24_(4), 3241–3255. https://doi.org/10.1007/s10209-025-01252-0
- Real Decreto 1112/2018, BOE-A-2018-12699.

## 2.3 Open problems

- [EMERGING] Strong accessibility teaching evidence, but still thin literature on front-end **framework** pedagogy, web-app pedagogy, or AI-assisted front-end assessment in Spain.
- [EMERGING] Scaling service-learning accessibility beyond CS (design schools, audiovisual, creative-technology curricula) remains under-evidenced.

## 2.4 Sharper terminology (Spain)

`aprendizaje-servicio` · `evaluación de accesibilidad web` · `WCAG en currículo de informática` · `accesibilidad del sector público` · `interfaces cívicas` · `alfabetización en estándares web`

---

# 3. Portugal

## 3.1 State of the art, 2024–2026

- [ESTABLISHED] **Decreto-Lei n.º 83/2018** defines public-sector web/mobile accessibility requirements (EU Directive transposition; EN 301 549 / WCAG 2.1 AA; public accessibility statements). _(Pass 3b upgrade from Pass 2b provisional.)_

- [ESTABLISHED] **acessibilidade.gov.pt** + **AccessMonitor** make Portugal relevant for teaching front-end accessibility as measurable public-sector practice.

- [EMERGING] Computing-education visibility is currently stronger in **K–12** than HE front-end: Neves & Oliveira 2024 (arXiv `2411.10142`) — ENSICO: 4,500 students, 35 schools, 100 teachers; computational thinking / functional-programming modelling.

- [EMERGING] Instituto Superior Técnico Guinness record (2024): largest in-person programming lesson, **1,668** participants — public literacy signal, not HE pedagogy research.

## 3.2 Foundational / canonical regional sources

- Decreto-Lei n.º 83/2018 (Diário da República).
- AccessMonitor / acessibilidade.gov.pt.
- Neves, F. L., & Oliveira, J. N. (2024). First Steps towards K-12 Computer Science Education in Portugal — Experience Report. https://arxiv.org/abs/2411.10142

## 3.3 Open problems

- [UNVERIFIED] Portugal-specific HE evidence on front-end/web-development pedagogy, JavaScript/framework teaching, and AI-assisted web assessment remains weak. **Blank to update** (TEEM, CISTI, FIE/EDUCON, Portuguese repositories).

## 3.4 Sharper terminology (Portugal)

`acessibilidade digital` · `WCAG 2.1 AA` · `EN 301 549` · `declaração de acessibilidade` · `AccessMonitor` · `ensino de programação` · `pensamento computacional`

---

# 4. Brazil

## 4.1 State of the art, 2024–2026

- [ESTABLISHED] **eMAG** — Brazilian e-Government Accessibility Model (WCAG specialization for government websites/portals).

- [EMERGING] **Vinadé & Marczak (2024)** — accessibility knowledge gaps among Brazilian students/practitioners; SBQS 2024 / ACM DOI `10.1145/3701625.3701689`. _(Pass 3b: authors Renata Vinadé, Sabrina Marczak.)_

- [EMERGING] **Batista & Baluz** — WCAG 2.1 evaluation of major Brazilian federal/state university websites; _iSys_ DOI `10.5753/isys.2025.5401` (OA PDF). _(Pass 3b: full author names; not “Batista” alone.)_

- [EMERGING] **Correa, Vitoriano & Llanos (2025)** — SIGAA academic-management accessibility against eMAG/WCAG; living-lab with visually impaired students; curriculum gaps in IT training; DOI `10.3390/informatics12030063`. _(Pass 3b: expands target object beyond public websites.)_

- [EMERGING] **Gonçalves et al. (2025)** SLR of programming in Brazilian HE and high school (arXiv `2501.17278`) — implementation/standardisation challenges; robotics/gaming prevalence in reviewed methods.

- [EMERGING] Distance-education / platform infrastructure remains a contextual driver for interface-layer pedagogy (policy commentary exists; treat vendor blogs as [EMERGING] with commercial interest).

## 4.2 Foundational / canonical regional sources

- eMAG — Modelo de Acessibilidade em Governo Eletrônico.
- Vinadé, R., & Marczak, S. (2024). Educating for Accessibility…. SBQS 2024. https://doi.org/10.1145/3701625.3701689
- Batista, H. E. N., & Baluz, R. A. R. S. Evaluation of Higher Education Institution Websites… WCAG 2.1. _iSys_. https://doi.org/10.5753/isys.2025.5401
- Correa, M., Vitoriano, M. A., & Llanos, C. H. (2025). Web Accessibility in an Academic Management System in Brazil…. _Informatics, 12_(3), 63. https://doi.org/10.3390/informatics12030063
- Gonçalves, S. C. L., et al. (2025). Programming in Brazilian Higher Education and High School: A Systematic Literature Review. https://arxiv.org/abs/2501.17278

## 4.3 Open problems

- [EMERGING] Strong programming-education and accessibility evidence; named **front-end pedagogy** still underdeveloped.
- [UNVERIFIED] Brazil-specific evidence on React/Vue/Svelte (or meta-framework) teaching in HE remains a blank.
- [EMERGING] Future searches should include **SBIE** and **W3C Brasil** materials alongside eMAG.

## 4.4 Sharper terminology (Brazil)

`ensino de programação` · `educação em computação` · `acessibilidade digital` · `eMAG` · `WCAG` · `sistemas acadêmicos` · `educação a distância` · `interfaces de serviços públicos` · `letramento digital`

---

# 5. Mexico

## 5.1 State of the art, 2024–2026

- [ESTABLISHED] Federal WCAG 2.0–linked web-accessibility provisions for FAP agencies / state productive enterprises (gob.mx).

- [EMERGING] Institutional web-accessibility recommendations linked to UNAM/DGTIC technical literature (soft pin; Pass 3b did not fully re-resolve author/title).

- [EMERGING] Spanish-language GenAI-in-HE programming pedagogy appears in venues such as **RITE** 2025 (“Transformando la Enseñanza con Inteligencia Artificial”) — treat as issue-level pin pending article-level identity.

- [EMERGING] **UNAM 2026 online entrance-exam integrity event**: ~58k _examen de control presencial_ after irregularities; AI in monitoring + press hypotheses; do **not** assert confirmed mass AI-cheating. Case-study opportunity for digital assessment legitimacy.

- [EMERGING] **González-Videgaray et al. (2026)**, _Figuras_ — academic integrity, plagiarism, and generative AI disruption in HE; DOI `10.22201/fesa.26832917e.2026.7.2.466` (multi-author UNAM cluster; OA). _(Pass 3b: not a single anonymous “Figuras article.”)_

## 5.2 Foundational / canonical regional sources

- Gobierno de México, federal accessibility page / WCAG 2.0 provisions.
- González-Videgaray, M. del C., et al. (2026). Integridad académica y plagio… IA generativa. _Figuras, 7_(2), 53–74. https://doi.org/10.22201/fesa.26832917e.2026.7.2.466
- UNAM 2026 selection-process / control-exam institutional and press corpus (Guardian, Proceso, CNN Español — use for event facts, not pedagogy theory).

## 5.3 Open problems

- [EMERGING] Clear relevance for GenAI, integrity, institutional accessibility, and programming education; bridge to **front-end/web-development pedagogy** still needs deeper Mexican engineering-education search.
- [EMERGING] Reframe: UNAM is a **live institutional case study**, not primarily an “unanswered research question about how Mexico should respond.” _(Pass 2b / Pass 3b.)_

## 5.4 Sharper terminology (Mexico)

`accesibilidad web institucional` · `educación superior e IA generativa` · `integridad académica` · `enseñanza de programación` · `examen de control` · `sitios institucionales universitarios` · `brecha digital`

---

# 6. Argentina

## 6.1 State of the art, 2024–2026

- [EMERGING] **Harari, Luján-Mora & Díaz (2025)** — web accessibility from PwD perception in Argentina; _UAIS_ DOI `10.1007/s10209-025-01226-2`; autonomy / emotional burden; CRPD review context.

- [ESTABLISHED] TE&ET / UNLP venue ecosystem for educational technology and programming pedagogy.

- [EMERGING] **PBL + data science in programming HE**: TE&ET article `4111` (2025), OA PDF — project-based learning integrating data science in higher-education programming.

- [ESTABLISHED] **Scrum as programming-learning methodology**: Tymkiw/Bournissen/Tumino TE&ET article `1299` (“Scrum como Herramienta Metodológica…”) plus related CACIC/WICC conference lineage.

- [EMERGING] **RIO 2025** CS summer school (UNRC) — regional advanced undergraduate/graduate infrastructure.

## 6.2 Foundational / canonical regional sources

- Harari, I., Luján-Mora, S., & Díaz, J. (2025). Web accessibility evaluation from the perception of people with disabilities: case of Argentina. _UAIS, 24_, 2687–2703. https://doi.org/10.1007/s10209-025-01226-2
- Tymkiw, N., Bournissen, J. M., & Tumino, M. C. Scrum como Herramienta Metodológica para el Aprendizaje de la Programación. TE&ET. https://teyet-revista.info.unlp.edu.ar/TEyET/article/view/1299
- Aprendizaje basado en proyectos integrando ciencia de datos… (2025). TE&ET. https://teyet-revista.info.unlp.edu.ar/TEyET/article/view/4111
- RIO 2025 — https://rio2025.dc.exa.unrc.edu.ar/

## 6.3 Open problems

- [UNVERIFIED] Argentina-specific HE evidence on front-end/web-development pedagogy and AI-assisted web assessment remains thin.
- [EMERGING] Strong adjacent evidence for programming pedagogy, PBL, and accessibility-as-citizenship; not yet a mature front-end-pedagogy literature.

## 6.4 Sharper terminology (Argentina)

`enseñanza de la programación` · `aprendizaje basado en proyectos` · `tecnología educativa` · `accesibilidad web` · `servicios de gobierno electrónico` · `autonomía digital` · `metodologías ágiles en educación`

---

# 7. Other Ibero-American / Latin American countries

## 7.1 Colombia, Chile, and wider LATAM

- [ESTABLISHED] **Colombia — Resolución MinTIC 1519 de 2020**: obligated subjects must meet WCAG 2.1 AA for portals/electronic seats (from 1 Jan 2022). _(Pass 2b missing → Pass 3b add.)_

- [ESTABLISHED] **Chile — Decreto Supremo N°1 / 2015** (SEGPRESS) on state websites + **Ley 20.422** inclusion frame; WCAG-oriented public-sector accessibility. Private-sector obligation remains comparatively weak. _(Pass 2b missing → Pass 3b add.)_

- [EMERGING] Spanish-language systematic review on GenAI for teaching mathematics and programming in HE: _Revista de Ciencias Sociales_ article `45578` (2026), OA PDF.

- [EMERGING] CEPAL 2024 digital-competences report — structural inequality lens for interface-layer pedagogy across LAC.

---

# 8. Cross-cutting thematic findings

## 8.1 Fundamentals vs frameworks

- [ESTABLISHED] Global fundamentals-before-frameworks stance remains a defensible curriculum position; Ibero-America lacks strong local comparative studies on framework sequencing.
- [EMERGING] Regional formulation: teach durable web/interface fundamentals because they support employability, accessibility compliance, public digital services, institutional platforms, and transfer to dashboards/IoT/Python-backed systems.
- [UNVERIFIED] React-/Vue-/Angular-first vs fundamentals-first comparative HE evidence — **blank**.

## 8.2 AI-assisted coding and assessment

- [EMERGING] Strong LATAM GenAI adoption signal (DEC 2026 survey; Spanish-language reviews; Figuras integrity work); weaker evidence specifically about GenAI in **front-end/web-development** cohorts.
- [EMERGING] Assessment-integrity debate is concrete (UNAM control exam), not only theoretical — but mechanism attribution must stay hedged.
- [UNVERIFIED] Web-specific AI offloading / cognitive scaffolding studies in Ibero-American front-end cohorts — **blank**.

## 8.3 Accessibility

- [ESTABLISHED] Accessibility is the strongest regional bridge into front-end pedagogy (Spain/Portugal EU law; Brazil eMAG; Mexico federal provisions; Colombia Res. 1519; Chile DS N°1; Argentina PwD perception research).
- [EMERGING] Service-learning is the most robust pedagogical pattern found for teaching web accessibility (Spain).
- [EMERGING] Brazil expands the object from websites to academic management systems and HE institutional platforms.

## 8.4 Project-based / studio / portfolio

- [EMERGING] Regional evidence supports active methodologies in programming education (Scrum, PBL, data-science projects) — TE&ET Argentina cluster — but not yet a strong named “studio-based front-end pedagogy” literature.
- [EMERGING] Signature pedagogy claim for Ibero-America remains project/studio/portfolio, partly imported from global computing-studio literature, partly grounded in regional programming/PBL/accessibility cases.

## 8.5 3D web / WebXR / WebGPU

- [UNVERIFIED] No strong Ibero-American HE-specific literature found on 3D web / WebXR / WebGPU / R3F pedagogy.
- [EMERGING] Keep as boundary case: technical frontier, weak regional pedagogy evidence.

---

# 9. Regional open problems (re-ranked after Pass 2b/3b)

1. [UNVERIFIED] Where is front-end pedagogy researched **explicitly** in Ibero-America (vs programming education, web accessibility, SE, educational technology)?
2. [EMERGING] How should Spain/Portugal translate EU accessibility regulation into concrete front-end learning outcomes beyond compliance statements?
3. [EMERGING] How should Brazil translate eMAG/WCAG, university-platform accessibility, and EaD infrastructure into interface-layer curricula?
4. [EMERGING] What can the **UNAM 2026 control-exam case** teach about GenAI-era online assessment design without collapsing pedagogy into surveillance? _(Reframed from “how should Mexico respond.”)_
5. [EMERGING] How should Argentina connect public-service web accessibility, autonomy, and emotional burden to computing/interface pedagogy?
6. [UNVERIFIED] Regional evidence for teaching React, Vue, Angular, Svelte, Astro, Next.js, Remix in HE?
7. [UNVERIFIED] Connecting web-interface pedagogy with IoT, robotics, Python, embedded systems in Ibero-American design/engineering programmes?
8. [UNVERIFIED] Regional measures of cognitive offloading / scaffolding / AI overreliance in programming courses?
9. [UNVERIFIED] Regional methods for assessing AI-assisted front-end artefacts via process evidence (commits, walkthroughs, journals, oral defence, accessibility audits, code explanation)?
10. [UNVERIFIED] Ibero-American 3D web/WebXR/WebGPU pedagogy literature — or only isolated technical practice?

---

# 10. Bottom line

The Ibero-American version of the field should be less “front-end frameworks in university courses” and more:

> **front-end/interface-layer pedagogy for public, institutional, accessible, AI-mediated, and socially situated digital systems.**

**Regional strengths:** accessibility + public digital services + programming education + GenAI/integrity + inclusion.
**Regional blanks:** modern front-end framework pedagogy; web-specific AI offloading; cross-platform interface pedagogy for IoT/robotics/Python; 3D web/WebXR/WebGPU pedagogy.

Use this document as the **canonical narrative map** for refcheck and legitimate OA retrieval (`REFERENCES-for-refcheck.md`, `corpus-seed-list-ibero.md`).
