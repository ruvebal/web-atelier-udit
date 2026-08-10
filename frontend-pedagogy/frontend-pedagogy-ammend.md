You are editing the Markdown research-field specification at:

`/Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit/frontend-pedagogy/profield-frontend-pedagogy.md`

Your task is to amend the document after a 2024–2026 research refresh on **front-end / interface-layer development pedagogy in higher education**.

Do **not** turn the document into a course design. Do **not** write recommendations for a specific syllabus. Preserve the document as a reusable **Profield / research landscape / retrieval specification**.

The central conceptual correction is this:

> Front-end development should not be collapsed into website production.
> Treat front-end development as the design and implementation of the **human-facing interaction layer** of digital systems.
> Web technologies remain the primary teaching substrate because the browser is open, inspectable, accessible, cross-platform, deployable, and professionally central. However, the transferable field also includes application interfaces, dashboards, IoT/robotics control panels, Python-backed tools, data interfaces, creative coding systems, 3D web, WebXR, and WebGPU.

## 1. Rename / reframe the field

Where the document currently frames the field as mostly “front-end web development pedagogy,” broaden it to:

```yaml
id: frontend-interface-pedagogy
title: Front-end and interface-layer development pedagogy in higher education
```

Add or revise the scope statement to say:

```markdown
This field maps the pedagogy and didactics of front-end development understood as the human-facing interaction layer of digital systems. Web technologies remain the privileged teaching substrate because they are open, inspectable, accessible, cross-platform, and professionally central; however, the conceptual object is broader than website production. It includes transferable front-end concepts for web applications, application dashboards, data tools, IoT/robotics control panels, Python-backed services, creative coding environments, 3D/immersive interfaces, and other interactive systems.
```

Rationale to encode in the document:

- CS2023 includes **Specialized Platform Development** and treats **Web Platforms** as a curricular area rather than merely as scripting or page-making. It also places web alongside other platform contexts such as mobile, IoT, robotics, and multimedia. Source: ACM/IEEE-CS/AAAI, _Computer Science Curricula 2023_, DOI `10.1145/3664191`.
- MDN’s current learning pathway presents core front-end skills through semantic HTML, CSS, JavaScript, accessibility, browser/web fundamentals, and frameworks, supporting a “durable core before volatile frameworks” reading.
- Therefore the amended field should say: **web is the main laboratory, not the conceptual prison.**

## 2. Add a durable-core / volatile-layer distinction

Create or revise a section called:

```markdown
## Durable core vs. volatile layer
```

Add this analytical distinction:

```markdown
The field should separate durable interface fundamentals from fast-moving implementation technologies.

Durable core:

- semantic structure
- HTML / document structure
- CSS layout and cascade
- JavaScript fundamentals
- DOM and browser mental model
- interaction states
- forms and validation
- accessibility
- responsive behaviour
- state and data flow
- API interaction
- version control
- debugging
- performance awareness
- deployment literacy
- user feedback and error states

Volatile layer:

- JavaScript frameworks
- component libraries
- build tools
- meta-frameworks
- package ecosystems
- deployment platforms
- AI coding tools
- 3D / XR / GPU toolchains
```

Use the terminology:

```markdown
skill half-life
technical volatility
framework literacy
platform-first pedagogy
web standards literacy
semantic substrate
browser mental model
component-based UI pedagogy
```

Important nuance:

Do **not** claim that “all researchers agree” on fundamentals-before-frameworks. Instead write:

> Major curriculum and practitioner-learning references support a defensible fundamentals-first structure: teach the slow-moving web/interface substrate before treating frameworks as replaceable professional layers.

Evidence to encode:

- MDN’s Core modules include semantic HTML, CSS, JavaScript, accessibility, and JavaScript frameworks, and describe these as essential skills/practices for front-end developers.
- MDN’s accessibility and semantic HTML material supports treating semantic structure and accessibility as core, not optional.
- CS2023 includes web platforms and frameworks/meta-frameworks but does not prescribe React, Vue, Angular, Svelte, etc., which supports framework literacy over framework fixation.

## 3. Expand the keyword set

Replace or extend the current keywords with the following public, non-confidential keyword set.

```yaml
keywords:
 # Core field
 - front-end development education
 - front-end pedagogy in higher education
 - interface-layer development education
 - user-interface development pedagogy
 - human-facing software layers
 - web interfaces for interactive systems
 - front-end engineering education

 # Web substrate
 - front-end web development education
 - web development pedagogy
 - HTML CSS JavaScript education
 - semantic HTML pedagogy
 - CSS layout pedagogy
 - JavaScript programming education
 - DOM and browser APIs education
 - browser mental model education
 - computing curriculum for web platforms
 - web standards literacy

 # Curriculum guidance
 - CS2023 Web Platforms
 - Specialized Platform Development curriculum
 - computing curriculum for the web
 - ACM IEEE AAAI computing curricula
 - competency-based computing curricula

 # Fundamentals vs frameworks
 - fundamentals-before-frameworks pedagogy
 - framework literacy in front-end education
 - JavaScript framework teaching
 - React education in higher education
 - component-based UI pedagogy
 - meta-frameworks in web education
 - skill half-life in computing education
 - technical volatility in web curricula

 # Cross-platform front-end layer
 - application interface development education
 - dashboard development pedagogy
 - data visualization interface education
 - IoT dashboard education
 - robotics control interface pedagogy
 - Python web interface education
 - local-first application interfaces
 - creative coding interface pedagogy
 - human-machine interface pedagogy

 # AI-assisted coding
 - AI-assisted coding in programming education
 - generative AI in computing education
 - AI pair programming education
 - cognitive offloading in programming education
 - cognitive scaffolding in AI-assisted programming
 - cognitive outsourcing in programming education
 - cognitive atrophy and AI in education
 - deferred AI assistance
 - access timing as scaffolding
 - hint-writing with AI
 - metacognitive prompting in programming
 - self-regulated learning in programming
 - AI-assisted code review in education

 # Project / studio / portfolio
 - project-based learning in computing education
 - studio-based learning in computing education
 - critique-based pedagogy in computing
 - authentic assessment in web development education
 - self-coded digital portfolios
 - process-based assessment in programming
 - oral code defence
 - learning journals in computing education
 - version-history assessment
 - commit narrative

 # Accessibility
 - digital accessibility education
 - WCAG education
 - WCAG 2.2 education
 - accessibility across the computer science curriculum
 - teaching accessibility
 - teaching accessibly
 - digital accessibility literacy
 - inclusive design pedagogy
 - accessibility-first front-end development
 - assistive technology literacy
 - accessibility testing pedagogy
 - legal-framework literacy for accessibility

 # Assessment integrity
 - assessment integrity in the age of generative AI
 - programming assessment with generative AI
 - AI-use declarations in education
 - academic integrity by design
 - code authorship assessment
 - explainability of submitted code
 - formative assessment in AI-assisted programming
 - viva assessment in programming
 - process evidence in programming assessment

 # 3D / immersive web
 - 3D web development education
 - WebGL pedagogy
 - WebXR education
 - WebGPU education
 - Three.js education
 - React Three Fiber pedagogy
 - immersive web pedagogy
 - shader literacy education
 - spatial interaction design education
 - browser-based XR education
```

## 4. Extend the analytical lenses

If the document has an `areas:` list, extend it as follows:

```yaml
areas:
 - state_of_art_2024_2026
 - foundational_canonical
 - open_problems
 - adjacent_terminology
 - critiques_controversies
 - evidence_strength
 - curriculum_implications
 - assessment_implications
 - transferability_beyond_web
 - durable_core_vs_volatile_layer
 - accessibility_implications
 - ai_assisted_learning_risks
 - cross_platform_interface_relevance
 - 3d_immersive_web_relevance
```

Add a note that every research pass must distinguish:

```markdown
- web-platform claims
- front-end/interface-layer claims
- general programming-education claims
- accessibility-education claims
- 3D / WebXR / WebGPU claims
- practitioner-source claims
- peer-reviewed-source claims
```

## 5. Add / revise thematic buckets

Use these retrieval themes:

```yaml
themes:
 - fe-interface-foundations
 - fe-web-platforms-curriculum
 - fe-framework-literacy
 - fe-cross-platform-interfaces
 - fe-ai-assisted-coding
 - fe-accessibility
 - fe-assessment-integrity
 - fe-project-studio-portfolio
 - fe-3d-immersive-web
 - fe-iot-robotics-dashboards
 - fe-python-backed-interfaces
```

## 6. Add evidence policy

Add this evidence policy:

```yaml
evidence_policy:
 claim_tags:
  - ESTABLISHED
  - EMERGING
  - UNVERIFIED
 requirements:
  - cite_real_checkable_sources
  - prefer_ACM_IEEE_W3C_peer_reviewed_or_curriculum_frameworks
  - mark_web_specific_blanks_explicitly
  - do_not_infer_from_general_programming_to_front_end_without_warning
  - distinguish_practitioner_sources_from_peer_reviewed_sources
  - distinguish_web_platform_claims_from_cross_platform_interface_claims
  - distinguish technical_state_of_the_art from pedagogy_state_of_the_art
  - use "blank to update" instead of filling gaps rhetorically
```

Also add:

```markdown
When the field outpaces peer-reviewed literature, mark the subsection as `[EMERGING]` or `[UNVERIFIED]`. Do not manufacture consensus. Practitioner ecosystems such as MDN, WebGPU learning resources, Three.js learning resources, and developer surveys may be used as contextual evidence, but must be labelled differently from peer-reviewed computing-education research.
```

## 7. Add updated research claims

Create or revise a section:

```markdown
## Current state-of-the-art claims to test
```

Add these claims with tags:

```markdown
### Front-end as interface layer

- [ESTABLISHED] Front-end development should be defined as the human-facing interaction layer of digital systems, not merely as website production.
- [ESTABLISHED] Web technologies remain the strongest common pedagogical substrate because the browser is inspectable, cross-platform, standards-based, accessible, and deployable.
- [EMERGING] Cross-platform interface-layer pedagogy should include dashboards, Python-backed services, IoT/robotics panels, data tools, creative coding interfaces, and 3D/immersive systems as boundary cases.

### Durable fundamentals vs frameworks

- [ESTABLISHED] Semantic HTML, CSS, JavaScript, DOM/browser concepts, accessibility, and version control constitute a durable front-end core.
- [ESTABLISHED] Frameworks are professionally important but curricularly volatile; teach them as transferable component/state/tooling concepts rather than as fixed vocational endpoints.
- [EMERGING] Skill half-life / technical volatility is a useful axis for deciding which knowledge belongs in the stable spine and which belongs in replaceable frontier modules.
- [UNVERIFIED] Specific longitudinal evidence comparing React-first and fundamentals-first approaches in higher-education web-development cohorts remains weak.

### AI-assisted coding

- [EMERGING] Recent AI-assisted programming-education research frames the central risk as a balance between cognitive scaffolding and cognitive offloading.
- [EMERGING] Deferred assistance, access timing, hint-writing, metacognitive prompting, and instructor/human-in-the-loop review are emerging mitigation patterns.
- [EMERGING] AI-assisted code review may be useful when designed as scaffolded feedback rather than solution replacement.
- [UNVERIFIED] Web-development-specific effect sizes for cognitive offloading remain a blank; most evidence still comes from general programming, CS1, Python, or data-science contexts.

### Accessibility

- [ESTABLISHED] WCAG 2.2 is the current W3C Recommendation for web content accessibility.
- [ESTABLISHED] Accessibility education is now an explicit computing-curriculum concern, with CS2023 companion material arguing for teaching accessibility in CS education.
- [ESTABLISHED] Distinguish teaching accessibility from teaching accessibly.
- [EMERGING] Adoption remains uneven because guidance is ahead of staff capacity, disability-sensitisation, teaching materials, and institutional resources.
- [EMERGING] Digital accessibility literacy is a better educational target than checklist compliance alone.

### Project / studio / portfolio

- [ESTABLISHED] Project-based and studio-based learning remain strong signature-pedagogy candidates for web/interface education because students create, critique, iterate, and explain artefacts.
- [EMERGING] Self-coded digital portfolios are directly evidenced as authentic project-based assessment in web design/development education.
- [EMERGING] AI-era assessment is shifting from final-product evaluation to process evidence: version history, commit narrative, walkthroughs, learning journals, oral code defence, and critique records.

### 3D / immersive web

- [EMERGING] 3D web now spans WebGL, Three.js, React Three Fiber, WebXR, A-Frame, shaders, WebGPU, browser performance, and GPU compute.
- [EMERGING] The technical field is moving faster than higher-education pedagogy.
- [UNVERIFIED] A mature HE-specific pedagogy of 3D web / WebXR / WebGPU remains a blank to update.
- [UNVERIFIED] Accessibility pedagogy for immersive/3D interfaces remains under-mapped compared with 2D WCAG-oriented web accessibility.
```

## 8. Add source-grounded evidence ledger

Add a source ledger section. Use these sources as the first curated backbone. Preserve citation metadata, DOI when available, and source type.

```markdown
## Source ledger — first backbone

### Curriculum / standards

1. ACM/IEEE-CS/AAAI. _Computer Science Curricula 2023_. DOI: `10.1145/3664191`.
   Use for: CS2023, web platforms, specialized platform development, curriculum legitimacy, knowledge/competency framing.

2. MDN Web Docs. _MDN Curriculum_ and _Learn Web Development — Core modules_. Last updated 2025.
   Use for: practitioner-facing front-end curriculum, semantic HTML, CSS, JavaScript, accessibility, JavaScript frameworks, employability-oriented core skills.
   Evidence type: practitioner curriculum, not peer-reviewed research.

3. W3C. _Web Content Accessibility Guidelines WCAG 2.2_. W3C Recommendation, 5 October 2023.
   Use for: accessibility standards baseline.

4. W3C WAI. _WCAG 2 Overview_.
   Use for: WCAG as shared international accessibility standard family.

5. European Commission / JRC. _DigCompEdu: European Framework for the Digital Competence of Educators_.
   Use for: EU-level digital competence framing; do not treat as granular front-end curriculum.

### Web-development pedagogy foundations

6. Dorn, Brian; Guzdial, Mark. “Learning web development: challenges at an earlier stage of computing education.” ACM. DOI: `10.1145/2016911.2016937`.
   Use for: early web-development learning challenges, help-seeking, fragmented empirical base.

### Accessibility education

7. Ladner, Richard E.; Ludi, Stephanie; Domanski, Robert J. “Teaching about Accessibility in Computer Science Education.” CS2023 companion article.
   Use for: teaching accessibility in CS, distinction between accessibility content and accessible teaching practice.

8. Coverdale et al. “Digital Accessibility Education in Context: Expert Perspectives.” ACM TOCE, 2024. DOI: `10.1145/3649508`.
   Use for: expert perspectives, barriers, institutional context, capacity-building.

9. Parthasarathy, P. D.; Joshi, Swaroop. “Teaching Digital Accessibility in Computing Education: Views of Educators in India.” 2024.
   Use for: uneven adoption, Global South perspective, staff training, disability sensitisation, barriers.

10. Fisseler. “Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility.” 2024.
    Use for: digital accessibility literacy beyond checklist compliance.

### AI-assisted programming education

11. Sapoglu. “Scaffolded AI Assistance for Programming Education.” OASIcs / ICPEC 2026.
    Use for: scaffolded AI assistance, educational AI design, risks of reduced reasoning.

12. Phung et al. “Plan More, Debug Less: Applying Metacognitive Theory to AI-Assisted Programming Education.” 2025.
    Use for: planning/debugging/optimisation hints, metacognitive scaffolding.

13. Ma et al. “Scaffolding Metacognition in Programming Education: Understanding Student-AI Interactions and Design Implications.” 2025.
    Use for: large-scale student-AI interaction logs, metacognitive engagement, AI assistant design.

14. Oliveira et al. “AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report.” 2026.
    Use for: GitHub PR-integrated AI reviewer, code quality, self-regulated learning, human-in-the-loop feedback.

15. Rotter, Benazet i Montobbio, Hernández-Leo. “Access Timing as Scaffolding: A Reinforcement Learning Approach to GenAI in Education.” 2026.
    Use for: timing of AI access as implicit scaffolding, comparison with unrestricted and fully restricted GenAI use.

16. “Mitigating Epistemic Debt in Generative AI-Scaffolded Programming.” 2026.
    Use for: cognitive offloading vs cognitive outsourcing, corrective competence, unrestricted GenAI environments.
    Mark as emerging.

### Project / studio / portfolio

17. Hundhausen et al. “Exploring Studio-Based Instructional Models for Computing Education.” SIGCSE 2008. DOI: `10.1145/1352135.1352271`.
    Use for: studio-based learning in computing, critique, artefact construction.

18. Carter & Hundhausen. “A Review of Studio-Based Learning in Computer Science.” 2011.
    Use for: studio-learning foundations.

19. Garcia, Manuel B. “Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education: Evidence from a Web Design and Development Course.” _Education Sciences_, 2025. DOI: `10.3390/educsci15091150`.
    Use for: 176 undergraduates, weekly coding tasks, self-coded portfolio as authentic PBL assessment.

### 3D / immersive / GPU web

20. WebGPU learning resources / WebGPU Fundamentals / MDN WebGPU documentation.
    Use for: current practitioner learning ecosystem around WebGPU, rendering pipelines, compute shaders, and browser GPU programming.
    Evidence type: technical/practitioner source, not pedagogy research.

21. XR and computer-science education literature, 2025–2026.
    Use for: XR as emerging educational technology; treat as adjacent unless specifically tied to front-end, WebXR, browser interfaces, or 3D web pedagogy.

22. WebGPU privacy/security papers, 2026.
    Use for: advanced WebGPU teaching should include privacy, fingerprinting, and browser/GPU security implications.
    Evidence type: technical security research, not front-end pedagogy.
```

## 9. Add exclusions

Add or revise exclusions:

```yaml
exclusions:
 - purely back-end web development
 - general software engineering without a human-facing interface layer
 - generic UX research without implementation pedagogy
 - pure graphic design without computational interface implementation
 - AI-in-education literature not connected to programming, interfaces, assessment, or computing curricula
 - robotics or IoT education without an interface/control/visualization layer
 - 3D graphics education without browser, interface, WebXR, WebGPU, or front-end relevance
 - generic digital competence literature unless it directly informs front-end, accessibility, assessment, or interface pedagogy
```

## 10. Add open-problem map

Create a section:

```markdown
## Open problems to track
```

Add:

```markdown
1. How to assess individual learning when AI collaboration is ambient.
2. How to sequence fundamentals and frameworks under rapid tool churn.
3. How to preserve productive struggle while allowing professional AI workflows.
4. How to measure cognitive offloading specifically in web/front-end cohorts.
5. How to resource the accessibility mandate: staff expertise, teaching materials, institutional support.
6. How to move accessibility education beyond WCAG checklist compliance toward digital accessibility literacy.
7. How to map DigCompEdu and EU digital-competence frameworks onto granular front-end craft.
8. How to build a mature pedagogy for 3D web, WebXR, WebGPU, shaders, spatial interaction, and immersive accessibility.
9. How to assess AI-assisted React/Vue/Svelte/Three.js/WebGPU artefacts through process evidence rather than product polish.
10. How to teach front-end as an interface layer for Python services, IoT devices, robotics panels, dashboards, and creative tools without losing the coherence of the web substrate.
```

## 11. Add lexicum

Add or revise the lexicum:

```yaml
lexicum:
 durable_core:
  - semantic substrate
  - web standards literacy
  - DOM literacy
  - browser mental model
  - accessibility-first front-end
  - interface-layer thinking
  - human-facing software layer
  - operational membrane
  - progressive enhancement
  - interaction state
  - feedback loop
  - input validation
  - error-state design
  - API-facing interface

 volatile_layer:
  - framework literacy
  - component-based UI
  - technical volatility
  - skill half-life
  - framework churn
  - meta-frameworks
  - toolchain literacy
  - build-system literacy
  - deployment-platform literacy

 ai_learning:
  - cognitive offloading
  - cognitive outsourcing
  - cognitive scaffolding
  - cognitive atrophy
  - productive struggle
  - desirable difficulties
  - deferred assistance
  - access timing
  - hint-writing
  - critical engagement
  - AI pair programming
  - human-in-the-loop tutoring
  - false mastery
  - epistemic debt

 assessment:
  - process-based assessment
  - authentic assessment
  - oral code defence
  - viva
  - AI-use declaration
  - version-history evidence
  - commit narrative
  - learning journal
  - authorship transparency
  - explainability of submitted code
  - code walkthrough
  - formative trace

 accessibility:
  - teaching accessibility
  - teaching accessibly
  - digital accessibility literacy
  - WCAG literacy
  - inclusive design pedagogy
  - assistive technology literacy
  - accessibility testing pedagogy
  - legal-framework literacy
  - disability sensitisation

 interface_expansion:
  - dashboard pedagogy
  - IoT control interface
  - robotics control panel
  - Python-backed interface
  - local-first interface
  - data tool interface
  - creative coding interface
  - WebXR interface
  - WebGPU interface
  - spatial interaction
  - shader literacy
```

## 12. Add profield operational axes

Add:

```yaml
profield_axes:
 volatility:
  definition: >
   Separates durable platform/interface concepts from fast-decaying tools,
   frameworks, and build ecosystems.

 narrate:
  definition: >
   Requires students/research artefacts to expose process, rationale, authorship,
   version history, and explanation rather than only final product.

 verify:
  definition: >
   Tests whether the learner can debug, justify, modify, and explain submitted code
   under AI-assisted conditions.

 access:
  definition: >
   Treats accessibility as a front-end fundamental and ethical/legal design practice,
   not a late-stage compliance checklist.

 defer:
  definition: >
   Treats delayed or staged AI access as a scaffold to preserve productive struggle,
   planning, and metacognition.

 critique:
  definition: >
   Uses peer, instructor, and AI-assisted review as explicit learning evidence.

 interface:
  definition: >
   Prevents the field from collapsing into website production by tracking how
   front-end concepts transfer to dashboards, application layers, IoT/robotics,
   data tools, creative systems, and immersive interfaces.
```

## 13. Add re-run search strings

Add:

```text
"front-end development education" "higher education" HTML CSS JavaScript
"front-end pedagogy" "higher education" web development
"web platforms" CS2023 "Specialized Platform Development"
"Computer Science Curricula 2023" "Web Platforms" accessibility
"MDN Curriculum" "front-end developer" semantic HTML accessibility frameworks
"Learning web development" Dorn Guzdial DOI 10.1145/2016911.2016937
"React education" "higher education" "computing education"
"JavaScript framework teaching" "computing education"
"skill half-life" computing education web development frameworks
"AI-assisted programming education" cognitive offloading scaffolding
"deferred AI assistance" programming education
"access timing as scaffolding" GenAI education programming
"hint-writing" "AI assistance" programming education
"AI-assisted code review" "self-regulated learning" programming education
"metacognitive prompting" AI-assisted programming education
"assessment integrity" "generative AI" programming education
"oral code defence" programming assessment generative AI
"process-based assessment" programming education AI
"digital accessibility education" "computer science curriculum"
"teaching accessibility" "teaching accessibly"
"WCAG 2.2" education "web development"
"accessibility across the CS curriculum"
"Digital Accessibility Education in Context" TOCE 2024
"Teaching Digital Accessibility in Computing Education" India 2024
"Digital Accessibility Literacy" 2024
"self-coded digital portfolios" "web design and development course"
"studio-based learning" computing education web development
"project-based learning" web development higher education
"WebXR" education higher education front-end
"WebGPU" education pedagogy WebGL
"Three.js" education pedagogy higher education
"React Three Fiber" education
"3D web development" pedagogy higher education
"IoT dashboard" education web interface
"robotics control interface" education web dashboard
"Python web interface" education dashboard programming
```

## 14. Preserve confidentiality

Keep this rule:

```markdown
# Profield FieldSpec — public keywords only.

# Never add project internals here: the confidentiality gate blocks export on any hit.
```

Do not add private project names, client names, internal repo architecture, unpublished research claims, credentials, local-only URLs, or proposal-specific confidential concepts. Public concepts such as “front-end/interface-layer pedagogy,” “AI-assisted programming education,” “WCAG,” “CS2023,” “WebXR,” “WebGPU,” “IoT dashboard,” and “robotics control interface” are acceptable.

## 15. Final editorial instruction

After amending the document, ensure it reads as a rigorous research-field specification, not as a syllabus. The final document should make this conceptual move unmistakable:

> Web development is the central pedagogical substrate.
> Front-end development is the broader disciplinary object.
> Interface-layer thinking is the transferable competence.

The most valuable amendments are: **rename the field**, add `transferability_beyond_web`, add AI-assessment/process-evidence axes, explicitly include accessibility as a durable core, and create a 3D/IoT/robotics boundary-case layer so the students are not implicitly trained to think “front-end = websites only.”

--> Verify every reference before including it
