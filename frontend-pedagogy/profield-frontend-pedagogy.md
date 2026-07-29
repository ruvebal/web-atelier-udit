# Omnibus Research Landscape Map

## Front-end / Web Development Pedagogy in Higher Education

_Last updated: 2026-07-29_ (pass-2 audit + pass-3 Ollama conciliation; checklist meta-text cleaned)

## Evidence tags

- **[ESTABLISHED]** Strongly supported by standards, curriculum frameworks, canonical literature, or repeated empirical findings.
- **[EMERGING]** Supported by recent 2024–2026 studies, preprints, working groups, or early empirical work, but not yet settled.
- **[UNVERIFIED]** Plausible field claim, but no sufficiently checkable source found in this pass.
- **Blank to update** = do not infer; rerun later.

---

# 0. Executive synthesis

**[ESTABLISHED]** The dominant structure for web-development pedagogy is now best described as a **platform-first / framework-later model**: semantic HTML, CSS, JavaScript, HTTP/browser/DOM concepts, accessibility, and version control form the durable layer; frameworks are treated as a volatile professional layer. MDN’s curriculum explicitly frames its learning pathway around the “fundamental skills and knowledge” needed for front-end employability and longevity, while its framework guidance warns that overreliance on JavaScript frameworks can obscure semantic HTML and accessibility.

**[ESTABLISHED]** CS2023 formally strengthens web-platform legitimacy inside computer-science curricula by including a **Web Platforms** knowledge unit under Specialized Platform Development (alongside Mobile, Robot, Embedded, Game, and Interactive Computing Platforms), covering web languages, frameworks/meta-frameworks, DOM, accessibility, cloud services, security, privacy, architecture, and storage.

**[EMERGING]** The most disruptive current development is not React, WebGPU, or any single tool, but **AI-assisted coding as an epistemic disturbance**: students can produce plausible artefacts faster while potentially weakening durable comprehension through cognitive offloading, overreliance, and “false mastery.” Recent work in AI-assisted programming education increasingly frames the challenge as balancing scaffolding and offloading.

**[ESTABLISHED]** Accessibility has hardened from “good practice” into a curricular and legal-standard concern. WCAG 2.2 is the current W3C Recommendation; in the EU, the Accessibility Act’s enforcement from 28 June 2025 supplies a concrete legal backdrop. CS2023 includes a companion curricular article on accessibility, and computing-education literature argues for accessibility across the CS curriculum rather than confinement to HCI or optional ethics units.

**[EMERGING]** Studio, project-based learning, and self-coded portfolios are becoming more important under GenAI because they shift assessment from the final artefact toward process, critique, reflection, authorship, versioning, and explanation. A 2025 Education Sciences study of 176 undergraduates in a web design and development course used weekly coding tasks culminating in a self-coded portfolio.

**[EMERGING]** 3D web pedagogy is technologically active but pedagogically under-theorised: WebGL, Three.js, React Three Fiber, A-Frame, WebXR, shaders, WebGPU, and browser-native simulation are visible in practice, but there is not yet a mature HE-specific research literature equivalent to CS1, HCI education, or accessibility education.

---

# 1. Fundamentals vs. frameworks: the durable core

## 1.1 State of the art, 2024–2026

**[ESTABLISHED]** The strongest defensible formulation is not “everyone agrees on fundamentals before frameworks,” but rather: **major web-learning and curriculum references justify fundamentals as the durable spine of front-end learning**. MDN states that its front-end curriculum aims to provide the fundamental skills and knowledge needed for employability and longevity, and its learning pathway foregrounds web standards, browser behaviour, HTML, CSS, and JavaScript before framework specialization.

**[ESTABLISHED]** MDN’s framework material supports a **framework-critical** rather than framework-hostile position: frameworks are useful for scalability, predictability, and maintainability, but unnecessary for some sites and potentially harmful when they cause students to lose sight of semantic HTML and accessibility.

**[ESTABLISHED]** Framework knowledge is professionally relevant: MDN explicitly states that JavaScript frameworks are an essential part of modern front-end development and that many front-end jobs require framework experience.

**[EMERGING]** React remains highly visible in professional front-end ecosystems, but “React is the dominant industry framework” should be stated carefully because evidence comes from developer surveys, ecosystem studies, Stack Overflow analyses, and practitioner data rather than a single canonical academic source. Recent React-related Stack Overflow studies treat React as popular and widely used, and the State of React / State of JavaScript surveys show continuing ecosystem centrality, though these surveys are self-selecting.

**[UNVERIFIED]** The “skill half-life” argument is a useful informal conceptual frame: framework/tool knowledge decays faster than platform knowledge, while semantic HTML, CSS layout, JavaScript fundamentals, HTTP, DOM, accessibility, browser performance, and version control remain transferable. This is partly supported by long-standing accounts of JavaScript ecosystem churn, but “skill half-life” as a named formal construct in front-end / higher education (HE) pedagogy literature remains unverified — treat it as a volatility metaphor, not a settled term of art.

**[EMERGING]** A related but distinct curricular debate is **progressive enhancement vs. SPA-first** teaching: whether students should learn multi-layer, standards-resilient delivery before single-page application architectures, or reverse that order. This is not identical to the framework-vs-fundamentals sequencing question; it concerns platform resilience, document semantics, and graceful degradation as pedagogical priorities.

## 1.2 Foundational references

- **Park & Wiedenbeck**, “Learning web development: challenges at an earlier stage of computing education,” ICER 2011, DOI: `10.1145/2016911.2016937`. Canonical for student difficulties and help-seeking in early web development. _(Earlier map drafts misattributed this DOI to Dorn & Guzdial; related Dorn/Guzdial web-designer work exists but is a different paper.)_
- **ACM/IEEE-CS/AAAI CS2023**, especially the Web Platforms knowledge unit under Specialized Platform Development.
- **MDN Learn Web Development / MDN Curriculum**, not peer-reviewed but canonical as a practitioner-facing web curriculum.

## 1.3 Open problems

**[EMERGING]** The field has not settled the optimal sequencing of framework teaching: how much HTML/CSS/JS runway is needed before React/Vue/Svelte/Angular/meta-frameworks, and whether the first framework should be taught as a professional tool, an architectural case study, or a replaceable instance of component-based UI thinking. No verified HE consensus source found in this pass.

**[UNVERIFIED]** Specific claims about React-first vs. fundamentals-first effects on long-term learning outcomes in HE web-development cohorts remain a blank.

## 1.4 Sharper terminology

`platform-first pedagogy` · `web standards literacy` · `framework literacy` · `front-end engineering education` · `component-based UI pedagogy` · `skill half-life` · `technical volatility` · `transferable concepts` · `semantic substrate` · `DOM literacy`

## 1.5 Critiques / controversies

**[ESTABLISHED]** The main controversy is **hireability vs. durability**: curricula must prepare students for current jobs while avoiding narrow tool training that ages quickly. CS2023 recognises web frameworks/meta-frameworks in the Web Platforms knowledge unit (Specialized Platform Development), but does not prescribe specific frameworks, reinforcing the idea that curriculum guidance operates above the level of React/Vue/Svelte choices.

**[EMERGING]** A second controversy is **framework abstraction vs. semantic/accessibility literacy**: framework-heavy teaching may accelerate production but can obscure the document semantics and accessibility foundations that WCAG-oriented web work requires. MDN explicitly warns that writing whole applications in JavaScript can lead to unsemantic and inaccessible HTML.

**[EMERGING]** A third controversy is **progressive enhancement vs. SPA-first** as a curricular stance: whether resilient, multi-layer web delivery is taught as the default mental model before SPA architectures, or whether SPA-first professional practice should drive early course design. This debate is adjacent to, but not reducible to, framework sequencing.

---

# 2. Computing-curriculum guidance for web

## 2.1 State of the art, 2024–2026

**[ESTABLISHED]** CS2023 is the current major ACM/IEEE-CS/AAAI computer-science curriculum framework and the first major CS curriculum revision since CS2013. It uses knowledge and competency framing and includes contemporary areas such as AI, security, ethics, and the Web Platforms knowledge unit under Specialized Platform Development.

**[ESTABLISHED]** CS2023’s Web Platforms knowledge unit (Specialized Platform Development — sibling units include Mobile, Robot, Embedded, Game, and Interactive Computing Platforms) gives web development curricular legitimacy beyond “just scripting”: it includes languages, frameworks/meta-frameworks, accessibility, security/privacy, cloud services, data management, architecture, and storage.

**[ESTABLISHED]** CC2020 remains useful for locating web development across computing disciplines: CS, IT, software engineering, information systems, cybersecurity, and data science. Web teaching often belongs between CS programming, IT systems integration, HCI, software engineering, and design-oriented computing.

**[EMERGING]** IT2027 is now an active curriculum-guideline development area, but its precise implications for front-end/web pedagogy remain a blank to update.

## 2.2 Foundational references

- **ACM/IEEE-CS/AAAI**, _Computer Science Curricula 2023_, DOI: `10.1145/3664191`.
- **ACM/IEEE-CS**, _Computing Curricula 2020_, DOI: `10.1145/3467967`.
- **ACM/IEEE-CS**, _Information Technology Curricula 2017_. Relevant because IT programmes often make web systems and applied integration more explicit than traditional CS programmes.

## 2.3 Open problems

**[ESTABLISHED]** Curriculum frameworks identify web-platform topics but do not resolve local sequencing: whether web belongs in CS1, CS2, HCI, creative computing, software engineering, IT, or capstone contexts. CS2023 supplies topic guidance, not a universal course model.

**[EMERGING]** AI has been integrated into CS2023-era curricular thinking, but the specific impact on web-development pedagogy — especially framework teaching, project work, and assessment — remains underdeveloped.

## 2.4 Sharper terminology

`competency-based computing curricula` · `knowledge areas` · `knowledge units` · `specialized platform development` · `web platforms` · `curriculum mapping` · `programme-level outcomes` · `professional practice in computing`

## 2.5 Critiques / controversies

**[ESTABLISHED]** Curriculum frameworks are useful for legitimacy and coverage but too abstract for tool-level decisions. They can say “web frameworks/meta-frameworks” belong in the curriculum, but they do not answer whether to teach React, Vue, Svelte, Angular, Next.js, Astro, Remix, or no framework at all.

---

# 3. AI-assisted coding in programming and web-development education

## 3.1 State of the art, 2024–2026

**[EMERGING]** The central pattern is a **performance–learning paradox**: GenAI coding tools can improve immediate task performance and support, but may also reduce productive struggle, debugging effort, and transferable understanding when used uncritically. The grounded-theory paper “Tool, tutor, or crutch?” explicitly frames AI-assisted programming education around the tension between cognitive scaffolding and cognitive offloading.

**[EMERGING]** GenAI-enabled coding hints are being studied as scaffolds inside self-regulated programming courses. Huang’s 2025 _British Journal of Educational Technology_ article (DOI: `10.1111/bjet.13589`) reports on GenAI coding hints, cognitive load, and programming performance in an SRL-based **Python** course — programming-general evidence, not web-specific.

**[EMERGING]** Deferred AI assistance is an emerging mitigation strategy: in “Hint-Writing with Deferred AI Assistance” (arXiv: `2604.19931`), students in a **data-science** education setting first wrote hints independently and then revised them with AI assistance; the study found deferred assistance produced the highest-quality hints and supported critical engagement with AI outputs. Do not generalise this as front-end / web-development cohort evidence.

**[EMERGING]** Instructor-in-the-loop systems are another mitigation pattern: a 2025 study deployed AI-generated programming hints with escalation to instructors, finding that students rated 146 of 673 AI hints as unhelpful and that only a subset escalated to instructors.

**[EMERGING]** Metacognitive AI systems are gaining traction: Phung et al., “Plan More, Debug Less” (arXiv: `2509.03171` / AIED 2025) studies AI-generated planning, debugging, and optimisation hints in an introductory **data-science** programming course and reports stronger student engagement with planning hints than optimisation hints.

**[EMERGING]** “Cognitive atrophy” is now appearing at policy level, but the defensible claim is narrower: UTS and the Australian Network for Quality Digital Education warn specifically against **unstructured AI use** and argue for pedagogical structures that preserve critical thinking and self-regulated learning.

**[UNVERIFIED]** Specific effect sizes for AI cognitive offloading in **web-development cohorts** remain unverified. Most empirical evidence is still from Python, CS1, data science, or general programming education rather than HTML/CSS/JS/front-end framework courses.

## 3.2 Foundational references

- **Liu, Fan & Pan**, “Tool, tutor, or crutch?: A grounded theory of cognitive scaffolding and offloading in AI-assisted programming education,” _International Journal of STEM Education_, 2026, DOI: `10.1186/s40594-025-00592-w`. Note associated correction DOI: `10.1186/s40594-026-00611-4` (2026).
- **Huang**, “The impact of GenAI-enabled coding hints on students’ programming performance and cognitive load in an SRL-based Python course,” _British Journal of Educational Technology_, 2025, DOI: `10.1111/bjet.13589`. Scope: Python / SRL, not web.
- **Singh, Brooks, Li, Kim & Wang**, “Hint-Writing with Deferred AI Assistance,” arXiv: `2604.19931`, 2026. Scope: data-science education.
- **Phung et al.**, “Plan More, Debug Less: Applying Metacognitive Theory to AI-Assisted Programming Education,” arXiv: `2509.03171` / AIED 2025. Scope: data-science programming.
- **Kazemitabaar et al.**, “CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant…,” CHI 2024, DOI: `10.1145/3613904.3642773`. Prior landscape source; programming-general classroom deployment (n≈700), not web-specific.

## 3.3 Open problems

**[EMERGING]** The field has not solved how to distinguish legitimate AI scaffolding from harmful cognitive offloading. Recent work converges on metacognitive friction, staged help, hint-writing, instructor escalation, and reflection, but comparative long-term evidence is limited.

**[EMERGING]** There is no stable consensus on what students must be able to do unaided in an AI-rich programming course: write code from scratch, explain generated code, debug code, evaluate AI outputs, design prompts, or justify architecture.

**[UNVERIFIED]** Web-specific AI pedagogy remains a blank: we need studies on AI use in HTML/CSS/JavaScript, React/Vue/Svelte, accessibility remediation, browser debugging, and front-end project assessment.

## 3.4 Sharper terminology

`AI-assisted programming education` · `LLM-mediated programming` · `cognitive offloading` · `cognitive scaffolding` · `cognitive atrophy` · `productive struggle` · `desirable difficulties` · `deferred assistance` · `hint-writing` · `metacognitive prompting` · `self-regulated learning` · `critical engagement` · `AI pair programming`

## 3.5 Critiques / controversies

**[EMERGING]** The major controversy is whether AI tools are best understood as **tools, tutors, or crutches**. The answer appears context-dependent: structured AI can scaffold learning, while unstructured AI may substitute for thinking and produce false mastery.

**[EMERGING]** A second controversy is equity: paid AI tools, uneven access, language background, institutional policy, and instructor readiness complicate any simple “allow” or “ban” approach.

---

# 4. Curriculum and accessibility: fundamentals that recently hardened

## 4.1 State of the art, 2024–2026

**[ESTABLISHED]** Accessibility is now an explicit curricular concern in CS2023. The CS2023 companion article “Teaching about Accessibility in Computer Science Education” argues for practical, intellectual, and social reasons to integrate accessibility into CS curricula.

**[ESTABLISHED]** WCAG 2.2 is the current W3C Recommendation for web content accessibility, and W3C’s WCAG overview positions WCAG as the central international guideline family for web accessibility. WCAG 3.0 remains a Working Draft.

**[ESTABLISHED]** Legal and policy hardening is concrete in the EU: the **European Accessibility Act** (Directive 2019/882) began enforcement on **28 June 2025**. The harmonized technical path is EN 301 549 (currently incorporating WCAG 2.1 AA; WCAG 2.2 AA is the practical forward-looking target). This legal backdrop is why “accessibility has hardened” is not merely a standards slogan for EU-facing professional practice.

**[ESTABLISHED]** The distinction between **teaching accessibility** and **teaching accessibly** is central: one concerns accessibility as curricular content; the other concerns inclusive delivery of teaching itself. This distinction is explicitly used in computing-education accessibility literature.

**[EMERGING]** Adoption remains uneven. Parthasarathy & Joshi’s 2024 ICER study on educators in India reports that few CS faculty teach accessibility and that barriers include need for faculty training, disability sensitisation, and exposure to accessibility pedagogy.

**[EMERGING]** Accessibility education in design-oriented HE programmes often cohabits with broader **UX / usability pedagogy** (heuristic evaluation in the Nielsen Norman Group tradition, e-commerce usability research such as Baymard, and usability-testing coursework). Treating accessibility in curricular isolation from evaluation and user research undersells how these strands are typically taught together.

**[EMERGING]** DigCompEdu is relevant to the European higher-education frame because it includes “Accessibility and inclusion” as competence 5.1 and is intended as a general reference for educators’ digital competence. However, DigCompEdu is broad; whether it is granular enough for front-end craft, WCAG practice, and code-level accessibility remains an open issue rather than an established conclusion.

**[EMERGING]** The European Commission has started updating DigCompEdu to reflect rapid changes in education, making it a moving framework rather than a settled accessibility solution for front-end curricula.

## 4.2 Foundational references

- **W3C**, _Web Content Accessibility Guidelines 2.2_.
- **European Accessibility Act** (Directive 2019/882), enforcement from 28 June 2025; related: EN 301 549.
- **Ladner, Ludi & Domanski**, “Teaching about Accessibility in Computer Science Education,” CS2023 companion article.
- **Parthasarathy & Joshi**, “Teaching Digital Accessibility in Computing Education: Views of Educators in India,” ICER 2024, DOI: `10.1145/3632620.3671122`.
- **DigCompEdu**, European Commission / JRC framework, including competence 5.1 Accessibility and inclusion.
- **Fisseler**, “Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility,” 2024, DOI: `10.48550/arXiv.2410.11931` (arXiv: `2410.11931`).

## 4.3 Open problems

**[ESTABLISHED]** The largest implementation gap is resourcing: guidance exists, but faculty expertise, curriculum space, teaching materials, and institutional accessibility maturity lag behind.

**[EMERGING]** The **baseline floor** for what a front-end graduate should know about accessibility is largely settled in practice: WCAG 2.2 AA plus the CS2023 accessibility companion already give a widely cited core (semantic HTML, keyboard navigation, contrast, ARIA where appropriate). What remains contested is the **upper bound** — how much beyond that floor (disability culture, assistive-technology literacy, legal fluency, inclusive research) belongs in HE front-end curricula. Framing this as “no universal rubric exists” overstates uncertainty.

**[EMERGING]** DigCompEdu gives a European competence frame, but it is not granular enough by itself to define front-end accessibility craft. This is an evidence-informed inference from the framework’s broad educator focus, not a direct quoted critique.

**[EMERGING]** How tightly accessibility curricula should integrate adjacent UX/usability-testing pedagogy remains under-specified in computing-education literature relative to design-programme practice.

## 4.4 Sharper terminology

`digital accessibility education` · `digital accessibility literacy` · `accessibility across the CS curriculum` · `teaching accessibility` · `teaching accessibly` · `inclusive design pedagogy` · `WCAG literacy` · `accessibility curriculum infusion` · `assistive technology literacy` · `legal-framework literacy` · `European Accessibility Act`

## 4.5 Critiques / controversies

**[ESTABLISHED]** WCAG compliance is necessary but insufficient as pedagogy: students need standards literacy, but also inclusive design judgement, disability-aware practice, user testing, and ethical reasoning.

**[EMERGING]** Accessibility mandates can produce checklist pedagogy if not tied to actual code review, testing, user needs, and design decisions. This critique is supported by the field’s move toward “digital accessibility literacy” rather than standards compliance alone.

---

# 5. Signature pedagogy: project-based, studio-based, portfolio-based web learning

## 5.1 State of the art, 2024–2026

**[ESTABLISHED]** Project-based and studio-based learning remain the closest thing to a signature pedagogy for web/design education because web development is naturally artefact-centred, iterative, public-facing, and critique-friendly. Earlier computing-studio literature adapts architecture/design studio models to computing through artefact construction, critique, and reflection.

**[EMERGING]** Self-coded portfolios are now directly evidenced as authentic PBL assessment in web-design/development education. Garcia’s 2025 _Education Sciences_ study reports 176 undergraduates completing weekly coding tasks culminating in a self-coded digital portfolio.

**[EMERGING]** In the GenAI context, the assessment object is shifting from **final product** to **formation process**: commit history, pull-request review, design rationale, code walkthroughs, oral/viva explanations (including defence of diffs), journals, critique records, and peer review become integrity-relevant evidence. GitHub-based process evidence and related commit-graph / version-history analysis are an active operationalisation of this shift, even where no single canonical HE citation yet pins the method. This is supported by AI-era peer-assessment and assessment-redesign literature.

## 5.2 Foundational references

- **Hundhausen, Narayanan & Crosby**, “Exploring Studio-Based Instructional Models for Computing Education,” SIGCSE 2008, DOI: `10.1145/1352135.1352271`.
- **Carter & Hundhausen**, “A Review of Studio-Based Learning in Computer Science,” _Journal of Computing Sciences in Colleges_, 27(1):105–111, 2011. No article-level DOI; venue record verified.
- **Garcia**, “Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education: Evidence from a Web Design and Development Course,” _Education Sciences_, 2025, DOI: `10.3390/educsci15091150`.

## 5.3 Open problems

**[EMERGING]** Studio/PBL pedagogy is expensive to scale because critique, feedback, revision, and process assessment require instructor time. AI-assisted feedback may reduce bottlenecks, but it introduces risks of inaccurate feedback and overreliance.

**[EMERGING]** Portfolio assessment is promising but can become performative unless it captures process, authorship, reflection, and explanation rather than only polished final artefacts. Garcia’s 2025 study supports the self-coded portfolio model but does not close the broader integrity question. Open-source / GitHub-based portfolio assessment (commit narrative, PR review, oral defence of diffs) is a concrete strand that operationalises process-over-product but still needs stronger HE-specific validation.

## 5.4 Sharper terminology

`signature pedagogy` · `project-based learning` · `studio-based learning` · `critique-based pedagogy` · `authentic assessment` · `self-coded portfolio` · `process portfolio` · `learning journal` · `oral code defence` · `viva` · `evaluative judgement` · `reflective artefact`

## 5.5 Critiques / controversies

**[EMERGING]** The AI-era critique is that a polished web artefact no longer reliably proves individual learning. Process-based and oral/written verification methods are emerging because they require students to narrate, justify, and debug their own work.

---

# 6. Assessment integrity and design under generative AI

## 6.1 State of the art, 2024–2026

**[EMERGING]** Assessment integrity is shifting away from pure AI detection and toward assessment redesign: structured AI-use policies, process evidence (including version-control history, PRs, and oral defence of diffs), oral explanations, written quizzes, peer review, and authentic tasks. The field increasingly treats AI detection as insufficient for proving authorship or learning.

**[EMERGING]** Open AI-use policies plus individual mastery checks are an emerging compromise: students may use AI in development, but must explain, defend, or reproduce understanding through quizzes, walkthroughs, or viva-style tasks.

**[EMERGING]** Peer assessment is being reconsidered because students must read, compare, and critique code, which can create learning evidence beyond the submitted product.

## 6.2 Open problems

1. **[EMERGING]** How to assess individual learning when AI collaboration is ambient.
2. **[EMERGING]** How to preserve productive struggle without banning professional AI workflows.
3. **[EMERGING]** How to make AI-use declarations meaningful rather than performative.
4. **[EMERGING]** How to avoid inequity when students have different access to paid tools, institutional support, or AI literacy.
5. **[UNVERIFIED]** What counts as acceptable AI assistance in front-end-specific tasks such as CSS debugging, ARIA repair, React component generation, or browser performance optimisation.

## 6.3 Sharper terminology

`academic integrity by design` · `process-based assessment` · `authentic assessment` · `AI-use declaration` · `explainability of submitted code` · `code authorship` · `assessment validity` · `assessment security` · `oral code defence` · `assignment-driven quizzes` · `formation evidence`

## 6.4 Critiques / controversies

**[EMERGING]** Detection-heavy approaches risk false accusations and a surveillance culture; redesign-heavy approaches improve validity but increase workload. The literature has not resolved this trade-off.

**[EMERGING]** “Authentic assessment” is now contested because authentic professional practice increasingly includes AI, while authentic educational assessment still requires evidence that the student understands the artefact.

---

# 7. State of the art in 3D web pedagogy

## 7.1 State of the art, 2024–2026

**[EMERGING]** The technical 3D web stack now spans Canvas/WebGL, Three.js, React Three Fiber, shaders, asset pipelines, WebXR, A-Frame, WebGPU, browser performance, and web-native simulation. However, practitioner resources are far ahead of peer-reviewed HE pedagogy.

**[EMERGING]** WebXR is central to browser-based immersive learning because it enables VR/AR experiences through web technologies rather than native-only pipelines. Prior landscape sources identified recent ACM WebXR toolkit work, but the pedagogy literature remains thin.

**[EMERGING]** A-Frame and declarative XR frameworks matter pedagogically because they lower the entry barrier to immersive web development, but they may also hide graphics fundamentals. This remains an evidence-informed pedagogical inference, not a settled HE research result.

**[EMERGING]** WebGPU is a frontier topic for advanced 3D web, simulation, graphics, and GPU compute, but its curricular implications are unsettled: shader literacy, browser compatibility, performance profiling, device constraints, and security all become part of the teaching problem.

**[UNVERIFIED]** No mature, HE-specific research map was found for “3D web development pedagogy” equivalent to research areas such as CS1, HCI education, or accessibility education. Blank to update.

## 7.2 Foundational / canonical references

- **WebGL / Three.js practitioner curricula**, useful as informal pedagogy but not sufficient as research evidence.
- **WebXR / A-Frame literature**, useful for immersive-web learning environments but still fragmented.
- **WebGPU technical literature**, useful for frontier capability, not yet for pedagogy.

## 7.3 Open problems

**[UNVERIFIED]** There is no settled sequencing model for 3D web in HE: creative coding → Canvas → WebGL → Three.js → shaders → React Three Fiber → WebXR → WebGPU is plausible, but not verified as consensus.

**[UNVERIFIED]** Accessibility for immersive/3D web pedagogy remains a major blank. WCAG-oriented accessibility education does not map cleanly onto spatial, embodied, XR, or shader-heavy environments.

**[UNVERIFIED]** No strong evidence was found on how to assess individual learning in AI-assisted 3D web projects, where students may use AI to generate shaders, Three.js scenes, React components, or interaction code.

## 7.4 Sharper terminology

`3D web development education` · `WebGL pedagogy` · `WebXR learning environments` · `immersive web` · `browser-based XR` · `creative coding pedagogy` · `shader literacy` · `GPU programming education` · `React Three Fiber pedagogy` · `spatial interaction design` · `web-native simulation`

## 7.5 Critiques / controversies

**[EMERGING]** 3D web pedagogy risks becoming demo-driven tool training unless students learn scene graphs, transforms, cameras, lighting, materials, shaders, accessibility, asset optimisation, performance budgets, and interaction design. This is a reasoned synthesis from the stack, not yet a mature empirical finding.

---

# 8. Consolidated open-problem map

1. **Assessing individual learning under ambient AI.** Product evidence is weak; process, explanation, critique, version-control evidence, and mastery checks are becoming central. AI-assisted assessment validity for front-end-specific tasks remains open.
2. **Sequencing under framework churn.** Fundamentals-first is defensible, but the exact transition point into React/Vue/Svelte/meta-frameworks is not settled. Progressive-enhancement vs. SPA-first is a related, still under-mapped curricular debate.
3. **Resourcing accessibility.** CS2023, WCAG 2.2, and (in the EU) the Accessibility Act harden the mandate, but faculty capacity and teaching materials lag. The baseline floor (WCAG 2.2 AA + CS2023 companion) is settled; upper-curriculum scope (culture, AT literacy, legal fluency, UX co-teaching) remains contested.
4. **Measuring cognitive offloading in web-development cohorts.** Most evidence remains programming-general, Python, CS1, or data-science oriented (Huang, Phung, Singh, Liu) — not HTML/CSS/JS/React cohort studies.
5. **EU competence granularity.** DigCompEdu includes accessibility and inclusion, but it is too broad to function alone as a front-end accessibility curriculum.
6. **3D web pedagogy.** The technical field is accelerating faster than HE pedagogy; WebXR/WebGPU/Three.js/R3F teaching remains under-mapped.
7. **Framework-specific assessment.** No verified consensus found for how to assess AI-assisted React/Vue/Svelte work beyond general programming-assessment strategies. GitHub/process operationalisation is active practice but under-cited in HE literature.

---

# 9. Lexicum for reuse / profield axis

## 9.1 Core pedagogical lexicon

`signature pedagogy` · `studio-based learning` · `project-based learning` · `constructionism` · `constructivism` · `productive struggle` · `desirable difficulties` · `self-regulated learning` · `metacognitive scaffolding` · `evaluative judgement`

## 9.2 Web/front-end lexicon

`platform-first pedagogy` · `framework literacy` · `web standards literacy` · `semantic substrate` · `DOM literacy` · `component-based UI pedagogy` · `browser mental model` · `progressive enhancement` · `SPA-first` · `accessibility-first front-end` · `usability-testing pedagogy`

## 9.3 AI-learning lexicon

`cognitive offloading` · `cognitive scaffolding` · `false mastery` · `cognitive atrophy` · `deferred AI assistance` · `hint-writing` · `critical engagement` · `AI pair programming` · `human-in-the-loop tutoring` · `solution withholding`

## 9.4 Assessment lexicon

`process-based assessment` · `authentic assessment` · `AI-use declaration` · `oral code defence` · `viva` · `learning journal` · `version-history evidence` · `commit narrative` · `pull-request review` · `formation process` · `authorship transparency` · `GitHub-based portfolio assessment`

## 9.5 Profield operational axes

- `volatility`: separates durable platform knowledge from fast-decaying tool/framework knowledge.
- `narrate`: requires students to explain the formation process, not merely submit the artefact.
- `verify`: tests whether the student can debug, justify, and modify submitted code.
- `access`: treats accessibility as core craft, not a compliance afterthought.
- `defer`: delays AI assistance until after independent cognitive effort.
- `critique`: turns peer, instructor, and AI feedback into explicit learning evidence.

---

# 10. Re-run search strings

```text
"front-end web development education" higher education HTML CSS JavaScript SIGCSE ITiCSE ICER
"web platforms" CS2023 curriculum HTML CSS JavaScript accessibility frameworks
"React" "computing education" "higher education" "front-end"
"frameworks before fundamentals" web development education
"AI-assisted programming education" cognitive offloading cognitive scaffolding
"deferred AI assistance" "hint-writing" programming education
"GenAI coding hints" cognitive load programming education BJET
"tool tutor or crutch" AI-assisted programming education
"digital accessibility education" "computer science curriculum" WCAG higher education
"Teaching about Accessibility in Computer Science Education" CS2023
"DigCompEdu" accessibility inclusion digital accessibility critique
"European Accessibility Act" WCAG higher education curriculum
"progressive enhancement" "SPA" curriculum education web development
"self-coded digital portfolios" web design development course 176 undergraduates
"studio-based learning" computing education web development
"commit history" OR "version control" assessment portfolio web development education GenAI
"WebXR" education higher education Three.js A-Frame
"WebGPU" education computer graphics pedagogy
"3D web development" pedagogy higher education WebGL WebXR WebGPU
```

# 11. Minimal source ledger

- ACM/IEEE-CS/AAAI, _Computer Science Curricula 2023_, DOI: `10.1145/3664191`.
- MDN, _Learn Web Development_ / _MDN Curriculum_, 2024–2025 updates.
- MDN, _Introduction to client-side frameworks_, 2025 update.
- W3C, _WCAG 2.2_.
- European Accessibility Act (Directive 2019/882); EN 301 549.
- Ladner, Ludi & Domanski, “Teaching about Accessibility in Computer Science Education,” CS2023 companion article.
- Park & Wiedenbeck, “Learning web development: challenges at an earlier stage of computing education,” ICER 2011, DOI: `10.1145/2016911.2016937`.
- Parthasarathy & Joshi, “Teaching Digital Accessibility in Computing Education: Views of Educators in India,” ICER 2024, DOI: `10.1145/3632620.3671122`.
- Fisseler, “Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility,” 2024, DOI: `10.48550/arXiv.2410.11931`.
- Liu, Fan & Pan, “Tool, tutor, or crutch?: A grounded theory of cognitive scaffolding and offloading in AI-assisted programming education,” _International Journal of STEM Education_, 2026, DOI: `10.1186/s40594-025-00592-w`; correction DOI: `10.1186/s40594-026-00611-4`.
- Huang, “The impact of GenAI-enabled coding hints on students’ programming performance and cognitive load in an SRL-based Python course,” _British Journal of Educational Technology_, 2025, DOI: `10.1111/bjet.13589`.
- Singh et al., “Hint-Writing with Deferred AI Assistance,” arXiv: `2604.19931`, 2026 (data-science education).
- Phung et al., “Plan More, Debug Less,” arXiv: `2509.03171` / AIED 2025 (data-science programming).
- Kazemitabaar et al., CodeAid classroom deployment, CHI 2024, DOI: `10.1145/3613904.3642773`.
- Hundhausen, Narayanan & Crosby, “Exploring Studio-Based Instructional Models for Computing Education,” SIGCSE 2008, DOI: `10.1145/1352135.1352271`.
- Carter & Hundhausen, “A Review of Studio-Based Learning in Computer Science,” _JCSC_ 27(1):105–111, 2011 (no article DOI).
- Garcia, “Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education,” _Education Sciences_, 2025, DOI: `10.3390/educsci15091150`.
- European Commission / JRC, _DigCompEdu_.
- European Commission, DigCompEdu update notice, 2026.

## Bottom line

The merged map supports your main architecture: **fundamentals as durable substrate, frameworks as volatile professional layer, AI as cognitive-risk amplifier, accessibility as hardened curriculum (and EU legal) mandate, and studio/portfolio process as the most defensible assessment signature for web education**. Pass-2 audit corrections tighten bibliographic hygiene (Park & Wiedenbeck attribution; pinned Huang/Phung/Parthasarathy/Fisseler/Kazemitabaar locators; Liu erratum), add progressive-enhancement, UX-adjacency, EU Accessibility Act, and GitHub/process assessment context, and narrow overstated accessibility-rubric uncertainty. The weakest evidence zones remain **web-specific AI offloading**, **framework-specific HE pedagogy**, and **3D web pedagogy**; those should stay marked as active research blanks rather than filled rhetorically.
