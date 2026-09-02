# FE II gap pass — Astro/PWA, R3F/shaders, and IoT/interface transfer

> **Pass completed:** 2026-08-23
> **Scope:** FE II Units 2–4 and 8–10; student lessons, forge packs, and grounding indexes.
> **Evidence rule:** current web sources inform the platform note and research watch; student-facing scholarly claims use Ahmes nodes with `evaluator_safe=yes`.

## Result

The gaps are narrowed, not falsely erased:

| Area | Evidence now available | Remaining boundary | Curriculum status |
| --- | --- | --- | --- |
| Astro / islands | Safe Ahmes technique sources plus current Astro documentation; transfer framing from the metaframework field map | No direct HE comparison of Astro/islands teaching sequences | Transfer-informed pilot |
| PWA / offline | Safe Ahmes offline-first architecture source plus current PWA guidance; a 2026 offline-first education case is a web-only lead | No direct FE/HE intervention comparison in Ahmes | Failure-mode pilot |
| R3F / shaders | Safe 2024 graphics-education paper explicitly addresses API churn, WebGL/WebGPU, shaders, and concept-first sequencing | No R3F-specific or minimum-GLSL comparative HE study | Graphics-grounded pilot |
| IoT / interface transfer | Safe Ahmes IoT curriculum review covers interface layer, dashboards, UI/UX, testing, JavaScript/Python, and active learning | No study isolates transfer from a FE component/state model to device/Python interfaces | Transfer pilot |

The master ideas remain the framing device:

- **Astro:** hydration is a cost model; a boundary is a learning object.
- **PWA:** offline is a product promise designed as a failure mode.
- **R3F/shaders:** abstraction is useful only when the learner can transfer the rendering concept across APIs.
- **IoT/interface:** the interface is the application layer that turns telemetry into evidence and safe action.

## Discovery record

### Athanor

Read-only vector discovery ran against the configured project:

- `profield-frontend-pedagogy` in the `scholar` library.
- Queries: `Astro islands architecture PWA offline-first front-end pedagogy higher education learning outcomes`; `computer graphics shader WebGPU React Three Fiber pedagogy transfer higher education`; `IoT interface layer dashboard WebSocket Python human machine interface project based learning transfer front-end`.
- Results were treated as discovery candidates only. The source page and citation resolver below define evidence.

### Current web watch — not Ahmes lesson citations

These sources were read on 2026-08-23 and are retained as dated platform/research leads, not as student-facing bibliography records until extracted and passed through Ahmes:

- [Astro islands](https://docs.astro.build/en/concepts/islands/) and [server islands](https://docs.astro.build/en/guides/server-islands/): static HTML with explicitly hydrated client islands; `server:defer` for independently rendered dynamic regions.
- [MDN PWA overview](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app) and [offline/background operation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation): feature detection, fallbacks, worker lifetime, bounded retries, and the distinction between installability and offline behavior.
- Turchyn, *Offline-first PWA with Controlled Generative AI Support for Teaching Informatics in a Near-frontline School* (2026), [article page](https://fmo-journal.org/index.php/fmo/en/article/view/413): 84 school learners, process traces, planned outage conditions, and explicit verification rules. This is an adjacent school case, not FE/HE causal evidence.
- [R3F first scene](https://github.com/pmndrs/react-three-fiber/blob/master/docs/getting-started/your-first-scene.mdx) and [R3F performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance): scene/camera abstraction, render-loop participation, demand rendering, and explicit invalidation.
- [Three.js TSL](https://threejs.org/docs/TSL.html), [WebGPURenderer](https://threejs.org/docs/pages/WebGPURenderer.html), [MDN WebGPU](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API), and [W3C WGSL](https://www.w3.org/TR/WGSL/all/): renderer-agnostic shader graphs, WGSL/GLSL targets, WebGL fallback, limited browser availability, and an active Candidate Recommendation Draft.
- Zambrano-Mieles et al., *Integrating ESP32-Based IoT Architectures and Cloud Visualization to Foster Data Literacy in Early Engineering Education* (2026), [article page](https://www.mdpi.com/2073-431x/15/1/51): 91 first-year engineering students, four-layer architecture, and dashboards as HCI artifacts. It is not FE transfer evidence.
- Jeyanathan, P. & Anitha, *Bridging Theory and Practice: Assessing Project and Problem-Based Learning in Undergraduate IoT Course* (2026), [article page](https://www.journaleet.in/index.php/jeet/article/view/3663): 123 students and a P2BL/control comparison. It supports project-based IoT teaching, not the specific FE interface transfer claim.

## Ahmes evidence retained

### Astro and PWA

- Fibrian, Utomo, Lukmana & Muttaqin (2026), *Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application*, coat `483a966a`, nodes `0b798a69-350e-518d-b48b-5f6869217adf` p.1, `5f2f1897-0d07-5516-bd4b-4ad44d0903f0` p.2, and `81557067-5e47-5df1-b1c5-5a8c98a1a206` p.4; `(Fibrian 2026, 1)`, `(Fibrian 2026, 2)`, `(Fibrian 2026, 4)`, all `evaluator_safe=yes`. It grounds offline-first architecture, service workers, caching, and the prototype's limits; it does **not** prove a PWA teaching effect.
- Vepsäläinen (2024/2025), resumability and edge-powered islands, remains the safe technical spine already cited in Units 2–3. It grounds rendering trade-offs, not a validated Astro pedagogy.

### R3F and shaders

- Angel & Shreiner (2024), *The Future of Teaching Computer Graphics*, SIGGRAPH Educators Forum '24, DOI `10.1145/3641235.3664433`, coat `e2e9b45c`, nodes `348bd016-3aee-5eb3-ae93-b3d422e137df` p.1 and `92a534c1-6aff-5d5e-b1e5-2a7d2e2c65a9` p.2; `(Angel 2024, 1)` and `(Angel 2024, 2)`, `evaluator_safe=yes`. It supports concept-first graphics teaching across API churn, WebGL/WebGPU continuity, and shader/render-function transfer. It does **not** validate R3F or this minimum-GLSL sequence.

### IoT and interface transfer

- Abichandani, Sivakumar, Lobo, Iaboni & Shekhar (2022), *Internet-of-Things Curriculum, Pedagogy, and Assessment for STEM Education: A Review of Literature*, IEEE Access 10, DOI `10.1109/ACCESS.2022.3164709`, coat `08eb5ba5`, nodes `ed35202e-baa9-59d9-b12b-73134e0b5127` and `0b94a031-2b3c-5dd5-83d7-6fb593ddc68f` p.7; `(Abichandani 2022, 7)`, `evaluator_safe=yes`. It supports the interface-layer vocabulary: dashboards, alerts, UI/UX planning, human factors, and testing.
- The same review's dashboard and active-learning nodes `cc6fa3cc-85e3-5eda-8622-380b11e830e5` and `0ea742b2-67e3-54a4-af0a-cebef3ef1c7f` p.8 resolve `(Abichandani 2022, 8)`, `evaluator_safe=yes`. They support web dashboards, JavaScript/Python tooling, and project/problem-based IoT work, but not a React-to-device transfer effect.
- Murley et al. (2021), Stelea et al. (2025), and Shihab et al. (2025) remain safe adjacent sources for WebSocket adoption, accessible dashboards, and AI verification respectively; their existing lesson boundaries remain unchanged.

## Unresolved bibliography gates

The repair pass did not invent metadata:

- Ciungan et al. (2025), *Enhancing IoT Education Through Hybrid Robotic Arm Integration*, remains `evaluator_safe=no` in Ahmes; it is excluded from student claims.
- AI Co-Artist remains `evaluator_safe=no` because the resolver still lacks a safe bibliographic record; it is removed from Unit 9 rather than used as a citation.
- Liu, Fan & Pan and Fisseler remain unresolved in the general sauce ledger; the affected gap lessons use safe replacement nodes or retain an explicit boundary. No unsafe record was promoted.

## Research/teaching boundary

The web leads and Ahmes sources justify the revised labs and assessment gates. They do not justify the sentence “this sequence improves learning.” That claim remains a local pilot question requiring approved consent/DPO gates before data collection.
