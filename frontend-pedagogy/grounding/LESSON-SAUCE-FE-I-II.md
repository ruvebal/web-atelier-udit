# Lesson sauce map — Front-End I + Front-End II

**Two-pass grounding receipt · 2026-08-23**

This is the instructor-side intersection used to season the student lessons. It
does not replace the official FE I/FE II contract, and it does not turn vector
retrieval into evidence.

## Passes

### Pass 1 — Athanor discovery

- **Project:** `profield-frontend-pedagogy`
- **Library:** `scholar`
- **Embedder:** local Ollama `nomic-embed-text:latest`
- **Clusters:** durable web core; accessibility; JavaScript/DOM/modules; motion,
  trends, and portfolios; React/frameworks/state; AI-assisted programming;
  production architecture/PWA; testing/performance; 3D/shaders; IoT/dashboard
  interfaces; capstone/oral defence.
- **Rule:** results were discovery pointers only.

### Pass 2 — Profield × lesson intersection

Each canonical FE I and FE II lesson was mapped to one durable master idea,
one or two established field trends, one emerging or frontier trend, and one
studio move. The intersection deliberately distinguishes:

- **Established:** a defensible curricular or technical baseline.
- **Emerging:** active practice or research whose transfer should be framed,
  not advertised as settled pedagogy.
- **Gap:** the course can teach the primitive and assess the learner's
  explanation, but the current corpus does not validate this exact sequence.

### Gap-pass repair receipt — 2026-08-24

The targeted FE II pass re-ran Ahmes citation resolution after a scoped
`profield-frontend-pedagogy` Athanor discovery pass. It promoted evaluator-safe
anchors for Fibrian (offline-first/PWA architecture), Angel & Shreiner
(graphics education under API churn), and Abichandani et al. (IoT curriculum,
interface layer, UI/UX, and assessment). The pass also rechecked the existing
Liu/Fan/Pan, Fisseler, AI Co-Artist, and Ciungan records; they remain unsafe or
metadata-incomplete and therefore remain explicit `[BIBLIO-GAP]`/excluded
records. No student lesson uses those records as ordinary author-year evidence.

## Evidence ledger

These are the Ahmes nodes retained after page inspection and citation
resolution. A vector hit is never cited.

| Evidence use | Source node | Page | Citation gate | Transfer boundary |
| --- | --- | ---: | --- | --- |
| Self-coded portfolios, weekly coding, technical PBL | Garcia, *Self-Coded Digital Portfolios…* · `b21e9ee9-b013-556e-b364-f7715ec768e9` | 2 | `(Garcia 2025, 3)`, `evaluator_safe=yes` | Web-design/development cohort; supports portfolio/process framing, not every FE outcome. |
| Portfolio building as integrated technical learning | Garcia · `2b984934-29df-562d-83c9-8ea8a58a7cf7` | 9 | `(Garcia 2025, 10)`, `evaluator_safe=yes` | Supports ownership and integration; does not prove a specific rubric improves learning. |
| AI productivity versus durable learning | Liu, Fan & Pan · `56b11a3c-86e7-59db-9e6a-50984ed8d125` | 1 | `[BIBLIO-GAP]` | Programming-general; retained as a declared framing gap, not a clean citation. |
| Digital accessibility literacy / encoding and decoding | Fisseler · `528860c1-f142-59b5-a994-348a54ab0810` | 2 | `[BIBLIO-GAP]` | Conceptual framework; supports literacy framing, not a measured FE intervention. |
| AI-assisted brownfield coding and review pressure | Shihab et al. · `a869e15d-e6bd-5ae5-b78f-7030ffaf6757` | 3 | `(Shihab 2025, 4)`, `evaluator_safe=yes` | Computing-student brownfield task; supports review/verification design, not web-specific pedagogy. |
| Islands and deferred work | Vepsäläinen, Hevery & Vuorimaa · `b62c9fe4-9a4b-5d39-906d-17463592ad4d` | 30 | `(Vepsäläinen 2025, 31)`, `evaluator_safe=yes` | Technical architecture evidence, not evidence that an Astro lesson works. |
| Offline-first architecture | Fibrian et al. · `81557067-5e47-5df1-b1c5-5a8c98a1a206` | 3 | `(Fibrian 2026, 4)`, `evaluator_safe=yes` | Prototype/architecture context; does not close the PWA pedagogy gap. |
| Graphics/shader teaching under API churn | Angel & Shreiner · `a5ccf7b9-3431-521f-85c0-332d3f027115` | 0 | `(Angel 2024, 1)`, `evaluator_safe=yes` | Computer-graphics education; adjacent to R3F/shaders, not a validated FE sequence. |
| IoT interface-layer curriculum and assessment | Abichandani et al. · `0b94a031-2b3c-5dd5-83d7-6fb593ddc68f` | 6 | `(Abichandani 2022, 7)`, `evaluator_safe=yes` | IoT curriculum review; interface-layer transfer to this FE sequence remains open. |
| AI-resilient assessment design | Nikolić et al. · `8b8e7378-2359-58b9-886d-d270985ec10e` | 0 | `(Nikolić 2026, 1)`, `evaluator_safe=yes` | Conceptual framework, not an empirical validation of the course rubric. |

### Explicit gaps carried into the lessons

- **FE I:** direct evidence for the exact React-first/fundamentals-first
  sequence, AI-assisted FE learning outcomes, and framework-specific HE
  pedagogy remains limited. General programming evidence is labelled as
  transfer, never as front-end proof.
- **FE II Units 2–4:** architecture evidence supports the primitives; exact
  pedagogy for Astro/islands/resumability and PWA/offline teaching remains a
  gap.
- **FE II Units 8–9:** the graphics source supports explanation-first teaching
  under API churn, but R3F/shader pedagogy is still a declared pilot.
- **FE II Unit 10:** IoT interface-layer literature supports the object of
  study, but front-end transfer to WebSocket/Python control panels is still a
  declared gap.
- **FE II Units 11–12:** process evidence and oral defence are defensible design
  instruments; the AI-resilient assessment framework is conceptual and not
  psychometrically validated.

## Lesson-by-lesson intersection

### FE I — Semester 1: vanilla core

| Lesson | Master idea | Established trend to nail | Emerging / frontier trend | Studio move |
| --- | --- | --- | --- | --- |
| S1 Development Environment | A professional interface is a reproducible system, not a personal folder. | Version control, readable setup, and repeatable workflows make change inspectable. | AI-assisted setup increases the need for provenance and verification. | Commit a reproducible setup and a short environment note. |
| S2 Git & GitHub Flow | Version history is part of the interface's evidence. | Commits, branches, review, and rollback support collaboration. | Repository history is increasingly part of authorship/process evidence under GenAI. | Write one commit narrative and demonstrate a reversible change. |
| S3 Semantic HTML + CSS | Semantics are the interface's durable contract. | Semantic structure and accessibility belong in the substrate. | Platform-first teaching resists hiding the document contract behind frameworks. | Inspect the page with keyboard and with JavaScript disabled. |
| S4 Typography & Color | Visual style is a communication system with access and hierarchy. | Typographic scale, contrast, readable rhythm, and meaningful tokens. | Fluid type, wider colour spaces, and preference-aware themes are volatile layers. | Build a small token system and justify contrast and hierarchy decisions. |
| S5 Intrinsic Web Design | Responsive layout is relationship-aware, not device-shaped. | Responsive design adapts content to available space. | Container queries and subgrid move responsiveness from viewport recipes to component context. | Test the same component inside three parent widths. |
| S6 Pseudo-elements & State | Interaction states are semantic feedback, not decoration. | Focus, hover, active, and reduced-motion states communicate status. | Native CSS state selectors and preference media queries expand the state vocabulary. | Keyboard-test every state and provide a non-motion fallback. |
| S7 JavaScript Introduction | JavaScript is a browser/runtime model, not just syntax. | Events, DOM, types, control flow, and browser execution. | Browser APIs and asynchronous interaction keep expanding the runtime boundary. | Draw the event → DOM → user-feedback loop before coding. |
| S8 DOM Manipulation | Rendering is a trust boundary. | DOM APIs, templates, text insertion, and XSS awareness. | Component/virtual-DOM abstractions do not remove security or accessibility responsibility. | Compare string, native, and template rendering with untrusted input. |
| S9 JavaScript Modules | Modularity keeps change local. | Explicit imports/exports and dependency boundaries reduce accidental coupling. | ESM, package graphs, and build tooling continue to evolve. | Produce an import graph and explain one boundary. |
| S10 Linting & Formatting | Quality tools encode team decisions; they do not supply judgment. | Formatting, linting, and automated checks improve shared readability. | AI autofix and AI review can scale checks while also scaling false confidence. | Reject or revise one rule with a written rationale. |
| S11 GSAP Animation | Motion is a temporal communication layer with cost. | Timing, easing, hierarchy, feedback, and performance-aware animation. | Scroll-driven and 3D/GPU motion are expanding the expressive layer. | Add reduced-motion behaviour and a performance observation. |
| S12 Modern Design Trends | A trend is a design hypothesis, not a requirement. | Trends must serve communication, usability, and context. | Immersive, AI-shaped, and 3D aesthetics are active but pedagogically unsettled. | Choose two trends, state the user goal, and record what you refused. |
| S13 Portfolio Template | A portfolio is evidence of process and authorship, not a gallery. | Authentic, self-coded project work integrates design and technical decisions. | AI-resilient assessment shifts attention toward checkpoints, reflection, and defence. | Keep weekly commits, decision notes, and a final trade-off statement. |

### FE I — Semester 2: React and AI-assisted development

| Lesson | Master idea | Established trend to nail | Emerging / frontier trend | Studio move |
| --- | --- | --- | --- | --- |
| S14 Philosophy & Vision | Tools should enlarge judgment, not replace it. | Durable core versus volatile layer is a useful curriculum spine. | AI coding creates a performance–learning tension and a Domain Mastery/Tool Mastery split. | Label each activity as domain learning, tool learning, or both. |
| S15 Framework Comparison | Choose an abstraction by the problem and its trade-offs. | Framework literacy follows web-platform fundamentals. | React, Vue, meta-frameworks, and server-first approaches remain volatile. | Build the same small interaction twice and compare costs. |
| S16 State & UI | State is a model of what can be true; UI renders that model. | State taxonomy and finite-state thinking reduce contradictory UI. | Server, URL, shared, and optimistic state stretch the model across boundaries. | Draw states and transitions before writing components. |
| S17 AI-Assisted Foundations | A generated answer is a hypothesis until verified. | Planning, decomposition, documentation, and tests remain human responsibilities. | Deferred assistance, metacognitive scripting, and solution withholding aim to preserve productive struggle. | Plan first, ask second, verify third, and log the decision. |
| S18 React Fundamentals | Components are contracts at the interface boundary. | Props, events, composition, and semantic output are durable component ideas. | Server components and new rendering models are volatile extensions. | Test a component as a contract: inputs, output, states, and access. |
| S19 Hooks | Effects represent synchronization with external systems; they are not a hiding place for logic. | Hook ownership, lifecycle, cleanup, and derived data. | Compiler-assisted optimisation and new async/rendering APIs may change implementation patterns. | Annotate every effect with the external system it synchronizes. |
| S20 State Architecture | Scale state by ownership and lifecycle, not by library fashion. | Local, server, URL, and shared state need different ownership rules. | External stores, signals, and server caches are competing volatile layers. | Complete a decision table before selecting a library. |
| S21 Routing & Navigation | A URL is a public state contract. | Deep links, nested routes, navigation, and access control. | Data routers, SSR, and edge rendering move more work across the route boundary. | Make a route/state matrix including refresh, error, and unauthorised states. |
| S22 Backend Integration | An API boundary is a failure boundary. | Loading, error, empty, validation, caching, and cancellation states. | Server components, edge APIs, and streaming alter where data work occurs. | Write the contract and design one failure state before the happy path. |
| S23 Authentication | Identity flows are interaction design under adversarial conditions. | Session security, cookies, XSS awareness, and clear error states. | Passkeys, token rotation, and zero-trust service boundaries are changing the surface. | Add a threat model and accessible recovery path. |
| S24 Framework Mode / SSR / i18n | Rendering location is an architectural choice with consequences for data, identity, and language. | SSR, route data, authentication boundaries, and locale-aware URLs. | Edge/server-first rendering and partial hydration keep moving the boundary. | Write a decision memo for render location and locale ownership. |
| S25 Testing | A test suite is a portfolio of risk decisions. | Tests target behaviour, failure modes, and regressions—not line counts. | AI-generated tests and contract testing increase volume without guaranteeing relevance. | Map each test to a risk and delete one low-value test. |
| S26 Performance | Performance is a user and resource budget, not a score to chase. | Measure before optimisation; use budgets and user-facing metrics. | Islands, resumability, edge delivery, and adaptive loading change where work happens. | Set a budget, measure a baseline, and explain one trade-off. |
| S27 Deployment | Deployment is part of the product's reproducibility. | Build, environment configuration, CI, release, and rollback are engineering work. | Managed edge platforms abstract infrastructure while increasing platform dependence. | Add a release checklist and a rollback path. |
| S28 Individual React Capstone | An integrator is a claim about systems, evidenced by trade-offs and failure handling. | Authentic project work joins APIs, state, security, i18n, performance, and deployment. | AI-assisted implementation makes process evidence and corrective competence more important. | Maintain decisions, iterations, verification evidence, and rejected alternatives. |
| S29 Final Presentation | Defence turns an artefact into accountable knowledge. | Explanation, demonstration, questioning, and reflection test understanding beyond polish. | AI-resilient assessment uses oral defence and transparent AI-use evidence. | Explain one line, one trade-off, one failure, and one rejected suggestion. |

### FE II — production architecture and interface-layer frontier

| Lesson | Master idea | Established trend to nail | Emerging / frontier trend | Studio move |
| --- | --- | --- | --- | --- |
| U1 Kickoff | Production front-end is a system of interfaces, not a single app. | Interface-layer thinking connects browser, service, deployment, and user. | Edge, device, real-time, and multi-surface systems widen the boundary. | Draw the surfaces, contracts, and failure boundaries of one product. |
| U2 Astro Fundamentals | Hydration is a cost model; islands are selective interactivity. | SSR/SSG and selective client work make delivery choices explicit. | Resumability and new hydration alternatives challenge mainstream defaults. | Compare a static region, an island, and their transferred cost. |
| U3 Astro Advanced | Architecture coordinates content, data, framework islands, and deployment boundaries. | Content schemas, data fetching, and explicit integration boundaries. | Micro-frontends and multi-framework composition remain active engineering practice. | Produce a boundary map and name one integration cost. |
| U4 PWA / Offline | Offline is a product promise designed as a failure mode. | Service workers, caching, manifests, and recovery states. | Local-first data, sync/conflict resolution, and installability continue to evolve. | Test offline, stale, reconnect, and data-conflict states. |
| U5 Testing Strategy | Testing strategy buys confidence under a budget. | Behavioural tests, deterministic fixtures, failure modes, and reliability. | Contract testing, Playwright migration, and flake triage reshape the suite. | Attach every test to risk, confidence, and maintenance cost. |
| U6 AI Code Review | AI review is a second opinion; human review is the learning evidence. | Code review requires context, criteria, and accountable acceptance/rejection. | PR-integrated AI review is emerging; front-end learning outcomes remain a gap. | Keep an ACCEPT/REJECT log and defend two decisions orally. |
| U7 Performance | Performance engineering chooses what work to do, where, and when. | Budgets, measurement, loading strategy, and runtime diagnosis. | Islands, resumability, edge delivery, and adaptive work scheduling are active. | Compare a baseline with one intervention and report the cost. |
| U8 R3F Fundamentals | 3D interface literacy begins when the learner can explain the scene, not merely render it. | Scene graph, camera, materials, interaction, and renderer budgets. | R3F, WebGPU, spatial interaction, and immersive UI are moving targets. **Pedagogy gap:** declared pilot. | Keep one understood scene, renderer evidence, and a transfer explanation. |
| U9 Shader Literacy | A shader is a small program that transforms data into appearance. | GPU pipeline, coordinates, uniforms, and controlled experimentation. | Generative shader tools and WebGPU expand the frontier. **Pedagogy gap:** declared pilot. | Author or modify one shader and explain each input/output. |
| U10 IoT / Python Interface | A control panel is an operational membrane between live systems and human decisions. | Interface-layer planning, human factors, testing, and safe status feedback. | WebSockets, Python services, robotics, and real-time dashboards are emerging. **Transfer gap:** no validated FE sequence. | Test open/reconnect/close, stale data, safe action, and accessible status. |
| U11 Capstone Integration | Process evidence makes a claim about competence inspectable. | Decision logs, iteration history, verification, and narration. | AI-resilient process evidence and transparent use declarations are emerging. | Assemble verify/narrate evidence before polishing the final artefact. |
| U12 Capstone Defence | A defence tests corrective competence and authorship under questions. | Demonstration, explanation, modification, and reflection. | Oral defence plus transparent AI policy is an AI-resilient design instrument, not a validated guarantee. | Prepare to explain, alter, and critique the submitted system live. |

## Implementation rule used in student pages

Every page receives a compact block immediately after its front matter:

1. **Master idea** — one sentence that frames the lesson.
2. **Field lens** — established and emerging trends, with a gap label where
   appropriate.
3. **Studio test** — one observable action that makes the idea assessable.

The long source ledger stays here so the student pages remain readable. No
vector snippet is treated as a citation, and no general programming finding is
silently upgraded to front-end evidence.
