# Omnibus Research Landscape Map

> **This file is the GLOBAL layer only.** Two further grounding layers live in [`grounding/`](./grounding/) and are required reading before authoring curriculum: the **Ibero-American layer** ([`grounding/profield-ibero-layer.md`](./grounding/profield-ibero-layer.md) — Spain, Portugal, Brazil, Mexico) and the **authorities directory** ([`grounding/profield-authorities-directory.md`](./grounding/profield-authorities-directory.md) — venues, standards, centres, awards). See [`grounding/README.mdc`](./grounding/README.mdc) for which layer is canonical where, and for the **per-unit evidence matrix** governing the remaining FE II lessons.
>
> Sync note (2026-08-10): **this file is ahead of `profield/runs/frontend-pedagogy/01/pass1.edited.md`** (pass-2/3, no Ahmes dressing). Do not overwrite it from that source.

## Front-end and Interface-Layer Development Pedagogy in Higher Education

_Last updated: 2026-08-10_ (pass-5 Ahmes dressing: seven unique PDFs from `profield/runs/frontend-pedagogy/01/pdfs/.ahmes` matched to field arguments via fission nodes + `anchor_semantic` / `verbatim_quote` tags; verbatim student/faculty quotes and abstract-level claims inserted under §4–§6; new §16 documents how Ahmes improves perspective without changing claim tags. Prior pass-4: field renamed to interface-layer pedagogy; durable-core/volatile-layer axis, cross-platform transferability, AI-assessment axes; accessibility as durable core; five 2026 AI sources; Park & Wiedenbeck DOI correction — §14 item 10)

```yaml
id: frontend-interface-pedagogy
title: Front-end and interface-layer development pedagogy in higher education
```

**Scope statement**

> This field maps the pedagogy and didactics of front-end development understood as the human-facing interaction layer of digital systems. Web technologies remain the privileged teaching substrate because they are open, inspectable, accessible, cross-platform, and professionally central; however, the conceptual object is broader than website production. It includes transferable front-end concepts for web applications, application dashboards, data tools, IoT/robotics control panels, Python-backed services, creative coding environments, 3D/immersive interfaces, and other interactive systems.

**The central conceptual move**

> Web development is the central pedagogical substrate.
> Front-end development is the broader disciplinary object.
> Interface-layer thinking is the transferable competence.

Rationale:

- CS2023 includes a **Specialized Platform Development** knowledge area and treats **Web Platforms** as one curricular unit among siblings — Mobile, Robot, Embedded, Game, and Interactive Computing Platforms — rather than as scripting or page-making in isolation. Source: ACM/IEEE-CS/AAAI, _Computer Science Curricula 2023_, DOI `10.1145/3664191`.
- MDN's current learning pathway teaches core front-end skills through semantic HTML, CSS, JavaScript, accessibility, browser/web fundamentals, and frameworks — consistent with a "durable core before volatile frameworks" reading, and stable across its 2024–2025 updates.
- Therefore: **web is the main laboratory, not the conceptual prison.** The browser stays the privileged teaching substrate for epistemic reasons — inspectability, open standards, ubiquity, deployability, professional centrality — not because front-end development _is_ website production.

---

## Evidence tags

- **[ESTABLISHED]** Strongly supported by standards, curriculum frameworks, canonical literature, or repeated empirical findings.
- **[EMERGING]** Supported by recent 2024–2026 studies, preprints, working groups, or early empirical work, but not yet settled.
- **[UNVERIFIED-GAP]** No sufficiently checkable source was found, but the absence is itself a legitimate, well-motivated curricular or research frontier — "not yet, but worth building toward." Signal, not noise: a candidate brief for a pilot module, canonical exercise, or small action-research study.
- **[UNVERIFIED-NOISE]** A claim that merely *sounds* plausible — pattern-completion by a model or by secondary-source drift — with no independent anchor and no real design lever attached. Do not build curriculum on it; keep it labelled only as a caution against reification.
- **Blank to update** = do not infer; rerun later.

### Triaging UNVERIFIED: GAP vs. NOISE

This distinction is the field's main defence against two opposite failure modes: treating a real frontier as if it were nothing (under-claiming), or treating an LLM's smooth-sounding synthesis as if it were a finding (over-claiming). Use this heuristic when tagging or re-tagging a claim:

**Signs of GAP** (a legitimate absence — pursue it):

1. It names a *specific, checkable* absence — a named topic, technology, or population against which a search was actually attempted and came back empty — not a vague generality.
2. The phenomenon it gestures at is independently well-motivated by *adjacent* established evidence (e.g., CS2023's platform taxonomy already legitimises cross-platform transfer, even though no one has studied front-end-to-IoT transfer directly — §9).
3. It is actionable now: a concrete lesson, module, pilot, or rubric could be built around it this term, and even an informal classroom-level result would count as real evidence.
4. Rewritten as a question ("Has anyone studied X?"), the question stays meaningful and answerable.

**Signs of NOISE** (reification — flag and discard):

1. It is a smooth synthesis sentence that could be generated for almost any similarly-shaped field without specific grounding — often self-flagged in this document as "a reasoned synthesis, not yet an empirical finding."
2. It asserts a *name* or *formal status* for a concept ("X is a construct," "X is a named framework") that is actually only a metaphor in circulation.
3. It cannot be turned into a falsifiable pilot without first inventing the very thing it claims to describe.
4. Deleting it changes nothing about what you would actually teach — it is decorative confidence, not a design lever.

Applying this heuristic to the current pass: of the 21 substantive UNVERIFIED claims in this document, 20 triage as **GAP** (concentrated in §8 3D/immersive pedagogy and §9 cross-platform transferability — precisely the field's live frontier) and 1 triages as **NOISE** (§2.1/§2.4, the claim that "skill half-life" holds *formal-construct* status in HE pedagogy literature — it does not; it remains a useful classroom metaphor, not a research target worth chasing). That ratio is itself informative: because this document went through direct source verification (§14), most of what survived as "unverified" is real frontier, not fabrication — which is the situation a curriculum designer wants when reading a research-landscape map.

### Claim-type discipline

Every research pass over this field must keep these claim types visibly separate rather than blending them into one undifferentiated "front-end education" register:

- web-platform claims
- front-end / interface-layer claims
- general programming-education claims
- accessibility-education claims
- 3D / WebXR / WebGPU claims
- practitioner-source claims
- peer-reviewed-source claims

Collapsing these categories is the single most common error in this field's secondary literature — e.g. citing a Python CS1 study as if it were web-development-specific evidence, or citing MDN as if it were peer-reviewed.

### Ahmes-grounded dressing (pass-5)

This map was already citation-verified (§14). Pass-5 does something different: it **grounds selected claims in sovereign Ahmes extractions evidence** from the PDF batch under `profield/runs/frontend-pedagogy/01/pdfs/`, so paraphrases can be checked against fission-node text and lexicum tags (`verbatim_quote`, `paraphrase`, `provenance_node`) rather than against secondary summaries alone.

What Ahmes contributes here (method, not magic):

1. **Provenance** — each PDF → content-hash → `extraction.db` + `index.md` under `~/ahmes-library/scholar/documents/…`, so a quote is tied to a page-anchored node, not an LLM recollection.
2. **Semantic triage** — `anchor_semantic` distinguishes high-confidence discourse units (often `digital_humanities` / literacy framing) from WPL lexicum tags that mark *verbatim* student/faculty speech vs. paraphrase. That is how §4–§6 decide which sentences deserve a blockquote and which stay summarised.
3. **Claim–passage matching** — keyword/entity search over fission nodes maps each dressed claim to a checkable passage (see §17 claim↔quote table). Coverage ratios in the batch (e.g. Fisseler 0.88, Liu 0.82, Garcia 0.66) signal how completely semantic tagging covered the document; low coverage means dress lightly.
4. **Perspective sharpening, not tag inflation** — quotes refine *how* an `[EMERGING]` claim is stated (Domain vs Tool Mastery; encoding/decoding literacy; solution-withholding; faculty self-training need). They do **not** promote programming-general evidence into web-specific `[ESTABLISHED]` status. Scope warnings stay.

Batch (unique by content-hash, Correction PDF omitted as erratum-only): Liu/Fan/Pan 2026; Kazemitabaar et al. CHI 2024; Singh et al. 2026; Phung et al. 2025; Garcia 2025; Fisseler 2024; Parthasarathy & Joshi 2024. CS2023 (`3664191.pdf`) is present in the PDF folder but was not in this `.ahmes` manifest — curriculum claims remain ledger-verified, not Ahmes-dressed yet. Full claim↔quote table: §16.

---

# 0. Executive synthesis

**[ESTABLISHED]** Front-end development should be defined as the human-facing interaction layer of digital systems, not merely as website production. Web technologies remain the strongest common pedagogical substrate — open, inspectable, cross-platform, standards-based, accessible, deployable — but the transferable disciplinary object is broader: it extends to application dashboards, IoT/robotics control panels, Python-backed services, data tools, creative coding systems, and 3D/immersive interfaces (§9).

**[ESTABLISHED]** The dominant structure for web-development pedagogy is now best described as a **platform-first / framework-later model**: semantic HTML, CSS, JavaScript, HTTP/browser/DOM concepts, accessibility, and version control form the durable layer; frameworks are treated as a volatile professional layer (§1, §2). MDN's curriculum explicitly frames its learning pathway around the "fundamental skills and knowledge" needed for front-end employability and longevity, while its framework guidance warns that overreliance on JavaScript frameworks can obscure semantic HTML and accessibility.

**[ESTABLISHED]** CS2023 formally strengthens web-platform legitimacy inside computer-science curricula by including a **Web Platforms** knowledge unit under Specialized Platform Development (alongside Mobile, Robot, Embedded, Game, and Interactive Computing Platforms), covering web languages, frameworks/meta-frameworks, DOM, accessibility, cloud services, security, privacy, architecture, and storage.

**[EMERGING]** The most disruptive current development is not React, WebGPU, or any single tool, but **AI-assisted coding as an epistemic disturbance**: students can produce plausible artefacts faster while potentially weakening durable comprehension through cognitive offloading, overreliance, and "false mastery." A 2026 wave of work sharpens this from a general offloading worry into concrete mechanisms — access timing, deferred assistance, metacognitive scripting, and in-workflow AI code review — that aim to preserve scaffolding while allowing professional AI workflows (§4).

**[ESTABLISHED]** Accessibility has hardened from "good practice" into a curricular and legal-standard concern. WCAG 2.2 is the current W3C Recommendation; in the EU, the Accessibility Act's enforcement from 28 June 2025 supplies a concrete legal backdrop. CS2023 includes a companion curricular article on accessibility, and computing-education literature — now including expert-perspective work on institutional capacity — argues for accessibility across the CS curriculum rather than confinement to HCI or optional ethics units (§5).

**[EMERGING]** Studio, project-based learning, and self-coded portfolios are becoming more important under GenAI because they shift assessment from the final artefact toward process, critique, reflection, authorship, versioning, and explanation (§6, §7). A 2025 _Education Sciences_ study of 176 undergraduates in a web design and development course used weekly coding tasks culminating in a self-coded portfolio.

**[EMERGING]** 3D web pedagogy is technologically active but pedagogically under-theorised: WebGL, Three.js, React Three Fiber, A-Frame, WebXR, shaders, WebGPU, and browser-native simulation are visible in practice, but there is not yet a mature HE-specific research literature equivalent to CS1, HCI education, or accessibility education (§8).

**[EMERGING]** Cross-platform interface-layer pedagogy — dashboards, Python-backed services, IoT/robotics panels, data tools, creative coding interfaces, and 3D/immersive systems as boundary cases for "front-end beyond the website" — is conceptually well-motivated by CS2023's platform taxonomy but remains the field's thinnest empirical zone; treat it as an open research programme, not a settled pedagogy (§9).

---

# 1. Durable core vs. volatile layer

The field should separate durable interface fundamentals from fast-moving implementation technologies. This axis cuts across every theme below — fundamentals-vs-frameworks (§2), AI-assisted coding (§4), and cross-platform transferability (§9) are all specific instances of the same underlying split.

**Durable core:**

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

**Volatile layer:**

- JavaScript frameworks
- component libraries
- build tools
- meta-frameworks
- package ecosystems
- deployment platforms
- AI coding tools
- 3D / XR / GPU toolchains

Terminology: `skill half-life` · `technical volatility` · `framework literacy` · `platform-first pedagogy` · `web standards literacy` · `semantic substrate` · `browser mental model` · `component-based UI pedagogy`

**Important nuance.** Do not claim that "all researchers agree" on fundamentals-before-frameworks; the literature does not license that strength of claim. The defensible formulation is narrower:

> Major curriculum and practitioner-learning references support a defensible fundamentals-first structure: teach the slow-moving web/interface substrate before treating frameworks as replaceable professional layers.

Evidence for this narrower claim:

- **[ESTABLISHED]** MDN's Core modules include semantic HTML, CSS, JavaScript, accessibility, and JavaScript frameworks, and describe these as essential skills/practices for front-end developers — with frameworks positioned after, not instead of, the substrate.
- **[ESTABLISHED]** MDN's accessibility and semantic HTML material supports treating semantic structure and accessibility as core, not optional.
- **[ESTABLISHED]** CS2023 includes web platforms and frameworks/meta-frameworks but does not prescribe React, Vue, Angular, or Svelte, which supports framework literacy over framework fixation.
- **[UNVERIFIED-GAP]** No HE-specific comparative study was found that isolates the causal effect of fundamentals-first vs. framework-first sequencing on long-term outcomes (see also §2.3, §10 item 4). The sequencing claim above is a curriculum-design inference, not an empirical finding — keep it labelled as such.

---

# 2. Fundamentals vs. frameworks: the durable core, elaborated

## 2.1 State of the art, 2024–2026

**[ESTABLISHED]** The strongest defensible formulation is not "everyone agrees on fundamentals before frameworks," but rather: **major web-learning and curriculum references justify fundamentals as the durable spine of front-end learning** (see §1). MDN states that its front-end curriculum aims to provide the fundamental skills and knowledge needed for employability and longevity, and its learning pathway foregrounds web standards, browser behaviour, HTML, CSS, and JavaScript before framework specialization.

**[ESTABLISHED]** MDN's framework material supports a **framework-critical** rather than framework-hostile position: frameworks are useful for scalability, predictability, and maintainability, but unnecessary for some sites and potentially harmful when they cause students to lose sight of semantic HTML and accessibility.

**[ESTABLISHED]** Framework knowledge is professionally relevant: MDN explicitly states that JavaScript frameworks are an essential part of modern front-end development and that many front-end jobs require framework experience.

**[EMERGING]** React remains highly visible in professional front-end ecosystems, but "React is the dominant industry framework" should be stated carefully because evidence comes from developer surveys, ecosystem studies, Stack Overflow analyses, and practitioner data rather than a single canonical academic source. Recent React-related Stack Overflow studies treat React as popular and widely used, and the State of React / State of JavaScript surveys show continuing ecosystem centrality, though these surveys are self-selecting.

**[UNVERIFIED-NOISE]** The "skill half-life" argument is a useful informal conceptual frame: framework/tool knowledge decays faster than platform knowledge, while semantic HTML, CSS layout, JavaScript fundamentals, HTTP, DOM, accessibility, browser performance, and version control remain transferable. This is partly supported by long-standing accounts of JavaScript ecosystem churn, but "skill half-life" as a named formal construct in front-end / higher education (HE) pedagogy literature remains unverified — treat it as a volatility metaphor, not a settled term of art.

**[EMERGING]** A related but distinct curricular debate is **progressive enhancement vs. SPA-first** teaching: whether students should learn multi-layer, standards-resilient delivery before single-page application architectures, or reverse that order. This is not identical to the framework-vs-fundamentals sequencing question; it concerns platform resilience, document semantics, and graceful degradation as pedagogical priorities.

## 2.2 Foundational references

- **Park & Wiedenbeck**, "Learning web development: challenges at an earlier stage of computing education," ICER 2011, DOI: `10.1145/2016911.2016937`. Canonical for student difficulties and help-seeking in early web development. _(Recurring hazard: this DOI is sometimes misattributed to Dorn & Guzdial in secondary summaries — including in a draft amendment brief reviewed while preparing this pass — but was re-checked directly against the ACM DL record in this pass. Related Dorn/Guzdial work exists — "Learning on the Job: Characterizing the Programming Knowledge and Learning Strategies of Web Designers," CHI 2010 — but it is a different paper with no DOI overlap; see §14 item 10.)_
- **ACM/IEEE-CS/AAAI CS2023**, especially the Web Platforms knowledge unit under Specialized Platform Development.
- **MDN Learn Web Development / MDN Curriculum**, not peer-reviewed but canonical as a practitioner-facing web curriculum.

## 2.3 Open problems

**[EMERGING]** The field has not settled the optimal sequencing of framework teaching: how much HTML/CSS/JS runway is needed before React/Vue/Svelte/Angular/meta-frameworks, and whether the first framework should be taught as a professional tool, an architectural case study, or a replaceable instance of component-based UI thinking. No verified HE consensus source found in this pass.

**[UNVERIFIED-GAP]** Specific claims about React-first vs. fundamentals-first effects on long-term learning outcomes in HE web-development cohorts remain a blank.

## 2.4 Sharper terminology

`platform-first pedagogy` · `web standards literacy` · `framework literacy` · `front-end engineering education` · `component-based UI pedagogy` · `skill half-life` · `technical volatility` · `transferable concepts` · `semantic substrate` · `DOM literacy`

## 2.5 Critiques / controversies

**[ESTABLISHED]** The main controversy is **hireability vs. durability**: curricula must prepare students for current jobs while avoiding narrow tool training that ages quickly. CS2023 recognises web frameworks/meta-frameworks in the Web Platforms knowledge unit (Specialized Platform Development), but does not prescribe specific frameworks, reinforcing the idea that curriculum guidance operates above the level of React/Vue/Svelte choices.

**[EMERGING]** A second controversy is **framework abstraction vs. semantic/accessibility literacy**: framework-heavy teaching may accelerate production but can obscure the document semantics and accessibility foundations that WCAG-oriented web work requires. MDN explicitly warns that writing whole applications in JavaScript can lead to unsemantic and inaccessible HTML.

**[EMERGING]** A third controversy is **progressive enhancement vs. SPA-first** as a curricular stance: whether resilient, multi-layer web delivery is taught as the default mental model before SPA architectures, or whether SPA-first professional practice should drive early course design. This debate is adjacent to, but not reducible to, framework sequencing.

---

# 3. Computing-curriculum guidance for web

## 3.1 State of the art, 2024–2026

**[ESTABLISHED]** CS2023 is the current major ACM/IEEE-CS/AAAI computer-science curriculum framework and the first major CS curriculum revision since CS2013. It uses knowledge and competency framing and includes contemporary areas such as AI, security, ethics, and the Web Platforms knowledge unit under Specialized Platform Development.

**[ESTABLISHED]** CS2023's Web Platforms knowledge unit (Specialized Platform Development — sibling units include Mobile, Robot, Embedded, Game, and Interactive Computing Platforms) gives web development curricular legitimacy beyond "just scripting": it includes languages, frameworks/meta-frameworks, accessibility, security/privacy, cloud services, data management, architecture, and storage. The same sibling-unit structure is the legitimating anchor for §9's cross-platform transferability claims: CS2023 already treats web as one platform among several human-facing platform contexts, not as a category apart.

**[ESTABLISHED]** CC2020 remains useful for locating web development across computing disciplines: CS, IT, software engineering, information systems, cybersecurity, and data science. Web teaching often belongs between CS programming, IT systems integration, HCI, software engineering, and design-oriented computing.

**[EMERGING]** IT2027 is now an active curriculum-guideline development area, but its precise implications for front-end/web pedagogy remain a blank to update.

## 3.2 Foundational references

- **ACM/IEEE-CS/AAAI**, _Computer Science Curricula 2023_, DOI: `10.1145/3664191`.
- **ACM/IEEE-CS**, _Computing Curricula 2020_, DOI: `10.1145/3467967`.
- **ACM/IEEE-CS**, _Information Technology Curricula 2017_. Relevant because IT programmes often make web systems and applied integration more explicit than traditional CS programmes.

## 3.3 Open problems

**[ESTABLISHED]** Curriculum frameworks identify web-platform topics but do not resolve local sequencing: whether web belongs in CS1, CS2, HCI, creative computing, software engineering, IT, or capstone contexts. CS2023 supplies topic guidance, not a universal course model.

**[EMERGING]** AI has been integrated into CS2023-era curricular thinking, but the specific impact on web-development pedagogy — especially framework teaching, project work, and assessment — remains underdeveloped.

## 3.4 Sharper terminology

`competency-based computing curricula` · `knowledge areas` · `knowledge units` · `specialized platform development` · `web platforms` · `curriculum mapping` · `programme-level outcomes` · `professional practice in computing`

## 3.5 Critiques / controversies

**[ESTABLISHED]** Curriculum frameworks are useful for legitimacy and coverage but too abstract for tool-level decisions. They can say "web frameworks/meta-frameworks" belong in the curriculum, but they do not answer whether to teach React, Vue, Svelte, Angular, Next.js, Astro, Remix, or no framework at all.

---

# 4. AI-assisted coding in programming and web-development education

## 4.1 State of the art, 2024–2026

**[EMERGING]** The central pattern is a **performance–learning paradox**: GenAI coding tools can improve immediate task performance and support, but may also reduce productive struggle, debugging effort, and transferable understanding when used uncritically. The grounded-theory paper "Tool, tutor, or crutch?" explicitly frames AI-assisted programming education around the tension between cognitive scaffolding and cognitive offloading.

> We distinguish immediate task performance from genuine learning: durable, transferable conceptual understanding and evaluative skill, and examine how AI support shapes learning processes, not merely outcomes.
> — Liu, Fan & Pan (2026), abstract (Ahmes fission node, p.0)

> Scaffolding, in a Vygotskian sense, is temporary, adaptive support that helps a learner master a task just beyond their independent ability. In contrast, cognitive offloading occurs when a learner delegates essential mental work to an external tool, bypassing the productive struggle … necessary to build robust, long-term knowledge schemas.
> — Liu, Fan & Pan (2026), introduction (Ahmes, p.1)

Their findings name the field's usable process vocabulary: *Domain Mastery* vs *Tool Mastery*, a *Strategic Dance* of strategy switching, *Trust-but-Can't-Verify* (novices), *Boilerplate Blindspot* (more experienced students), and attenuated metacognitive calibration — synthesised as Scaffolding and Offloading loops. Student speech captured as Ahmes `verbatim_quote` anchors makes the offloading risk audible rather than abstract:

> "I got good grades on all the projects, but now I have the final exam next week without Copilot… and honestly, I'm terrified. I'm not sure what I actually know."
> — Liu (AI-User), Ahmes `verbatim_quote` (conf≈0.95, p.12)

> "At the start, I try to use it to understand things… But when it's 2 AM and the project is due at 9 AM… I'm not trying to learn anymore, I'm just trying to finish."
> — Li (AI-User), Ahmes `verbatim_quote` (conf≈0.85, p.8)

**Perspective sharpening for this field:** Domain Mastery maps onto the durable interface core (§1); Tool Mastery maps onto the volatile AI/framework layer. The midnight "survival" quote is a boundary condition for the `defer` axis (§12.7), not a reason to ban tools.

**[EMERGING]** GenAI-enabled coding hints are being studied as scaffolds inside self-regulated programming courses. Huang's 2025 _British Journal of Educational Technology_ article (DOI: `10.1111/bjet.13589`) reports on GenAI coding hints, cognitive load, and programming performance in an SRL-based **Python** course — programming-general evidence, not web-specific.

**[EMERGING]** Deferred AI assistance is an emerging mitigation strategy: in "Hint-Writing with Deferred AI Assistance" (arXiv: `2604.19931`), students in a **data-science** education setting first wrote hints independently and then revised them with AI assistance. Ahmes-matched abstract text:

> … three designs … (i) writing a hint independently, (ii) writing a hint with on-demand AI assistance, and (iii) deferred AI assistance, in which students first write a hint independently and then revise it with the help of an AI-generated one.
> — Singh et al. (2026), abstract (Ahmes, p.0)

> There are also growing concerns that students may use AI as a crutch rather than a scaffold, bypassing the effortful cognitive processes that drive durable learning.
> — Singh et al. (2026), opening (Ahmes, p.0)

The study's design implication — "meaningful, critical engagement with AI" while "preserv[ing] cognitive effort" (Ahmes, p.1) — is the operational twin of this map's `defer` / `verify` axes. Do not generalise this as front-end / web-development cohort evidence.

**[EMERGING]** Instructor-in-the-loop systems are another mitigation pattern: a 2025 study deployed AI-generated programming hints with escalation to instructors, finding that students rated 146 of 673 AI hints as unhelpful and that only a subset escalated to instructors.

**[EMERGING]** Metacognitive AI systems are gaining traction: Phung et al., "Plan More, Debug Less" (arXiv: `2509.03171` / AIED 2025) studies AI-generated planning, debugging, and optimisation hints in an introductory **data-science** programming course. Ahmes-matched finding:

> Our findings underscore a consistent association between planning hints and higher performance. … In contrast, optimization hints are sometimes …
> — Phung et al. (2025), discussion (Ahmes, p.8); causality not claimed — possible SRL confound noted in-source

Planning-before-optimisation is a transferable curricular cue for web/front-end studios (plan DOM/state/accessibility before framework polish), still awaiting web-cohort replication.

**[EMERGING]** A 2025–2026 wave of work sharpens "cognitive offloading" from a diffuse worry into named, testable mechanisms — none of it web-specific, all of it programming-general:

- **Kazemitabaar et al.**, CodeAid (CHI 2024) — classroom-scale prior landscape source. Ahmes-matched design stance (solution withholding as scaffold):

  > LLM-powered tools like ChatGPT offer instant support, but reveal direct answers with code, which may hinder deep conceptual engagement. We developed CodeAid, an LLM-powered programming assistant delivering helpful, technically correct responses, without revealing code solutions.
  > — Kazemitabaar et al. (2024), abstract (Ahmes, p.0)

  Deployed in a large second-year systems/C course (~700 students). Directly relevant to `solution withholding` / human-in-the-loop tutoring; not a front-end cohort.

- **Ma, Boxuan et al.**, "Scaffolding Metacognition in Programming Education: Understanding Student-AI Interactions and Design Implications," arXiv: `2511.04144`, 2025. A three-year (2023–2025), 248-student, >10,000-dialogue-log study in an introductory **Python** course at a Japanese university; AI use rose from 36.8% to 91.7% of students over the study period, with overreliance and reduced problem-solving named as concerns. Scope: general introductory programming, not front-end.
- **Sapoglu, Necmi Kaan & Mohamed, Abdallah**, "Learning, Not Just Coding: Scaffolded AI Assistance for Programming Education," ICPEC 2026 (OASIcs). Scope: general programming education.
- **Rotter, Janne; Benazet i Montobbio, Pau; Hernández-Leo, Davinia**, "Access Timing as Scaffolding: A Reinforcement Learning Approach to GenAI in Education," arXiv: `2605.15850`, 2026 (Universitat Pompeu Fabra). A 105-participant controlled lab study operationalising **access timing** as scaffolding via a reinforcement-learning agent that decides when students may access GenAI; timed access improved post-test performance and metacognitive accuracy relative to unrestricted access, and reduced errors/time-on-task relative to full restriction. Scope: general HE learning task, not confirmed web-development-specific.
- **Sankaranarayanan, Sreecharan**, "Mitigating 'Epistemic Debt' in Generative AI-Scaffolded Novice Programming using Metacognitive Scripts," arXiv: `2602.20206`, 2026; accepted L@S '26 (13th ACM Conference on Learning at Scale). Sharpens the offloading claim: unrestricted AI risks outsourcing the **intrinsic** cognitive load needed for schema formation (not merely extraneous load), producing "fragile experts" — high functional output, low corrective competence. Proposes metacognitive-script friction as a countermeasure. Scope: novice programming generally. *(Not in this Ahmes PDF batch; still ledger-only.)*
- **Oliveira, Eduardo; Fu, Michael; Thongtanunam, Patanamon; López-Pernas, Sonsoles; Saqr, Mohammed**, "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report," arXiv: `2604.23251`, 2026; accepted ICSE 2026 (SEET track). An in-workflow, GitHub-PR-integrated LLM reviewer across two cohorts (>100 students, 2023–2024) in **software-engineering capstone** courses; iterative activity roughly doubled cohort-over-cohort (581 → 1176 PRs) and responsiveness to AI review held stable (~32–33% of successfully reviewed PRs followed by a subsequent commit). Directly relevant to the "AI-assisted code review as scaffolded feedback" claim (§10), though the cohort is capstone software engineering rather than front-end specifically. *(Not in this Ahmes PDF batch; still ledger-only.)*

**[EMERGING]** "Cognitive atrophy" is now appearing at policy level, but the defensible claim is narrower: UTS and the Australian Network for Quality Digital Education warn specifically against **unstructured AI use** and argue for pedagogical structures that preserve critical thinking and self-regulated learning.

**[UNVERIFIED-GAP]** Specific effect sizes for AI cognitive offloading in **web-development cohorts** remain unverified. Even after this pass's additions, the empirical base is still Python, CS1, data science, general programming, or general software-engineering capstone work rather than HTML/CSS/JS/front-end-framework courses — this blank has not closed, only sharpened in method (access timing, metacognitive scripts, in-workflow review) elsewhere in programming education.

## 4.2 Foundational references

- **Liu, Fan & Pan**, "Tool, tutor, or crutch?: A grounded theory of cognitive scaffolding and offloading in AI-assisted programming education," _International Journal of STEM Education_, 2026, DOI: `10.1186/s40594-025-00592-w`. Note associated correction DOI: `10.1186/s40594-026-00611-4` (2026).
- **Huang**, "The impact of GenAI-enabled coding hints on students' programming performance and cognitive load in an SRL-based Python course," _British Journal of Educational Technology_, 2025, DOI: `10.1111/bjet.13589`. Scope: Python / SRL, not web.
- **Singh, Brooks, Li, Kim & Wang**, "Hint-Writing with Deferred AI Assistance," arXiv: `2604.19931`, 2026. Scope: data-science education.
- **Phung et al.**, "Plan More, Debug Less: Applying Metacognitive Theory to AI-Assisted Programming Education," arXiv: `2509.03171` / AIED 2025. Scope: data-science programming.
- **Kazemitabaar et al.**, "CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant…," CHI 2024, DOI: `10.1145/3613904.3642773`. Prior landscape source; programming-general classroom deployment (n≈700), not web-specific.
- **Ma, Boxuan et al.**, "Scaffolding Metacognition in Programming Education," arXiv: `2511.04144`, 2025.
- **Sapoglu & Mohamed**, "Learning, Not Just Coding: Scaffolded AI Assistance for Programming Education," ICPEC 2026 (OASIcs).
- **Rotter, Benazet i Montobbio & Hernández-Leo**, "Access Timing as Scaffolding," arXiv: `2605.15850`, 2026.
- **Sankaranarayanan**, "Mitigating 'Epistemic Debt' in Generative AI-Scaffolded Novice Programming using Metacognitive Scripts," arXiv: `2602.20206`, 2026 / L@S '26.
- **Oliveira, Fu, Thongtanunam, López-Pernas & Saqr**, "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning," arXiv: `2604.23251`, 2026 / ICSE 2026 SEET.

## 4.3 Open problems

**[EMERGING]** The field has not solved how to distinguish legitimate AI scaffolding from harmful cognitive offloading. Recent work converges on metacognitive friction, staged/timed help, hint-writing, instructor escalation, in-workflow review, and reflection, but comparative long-term evidence is limited.

**[EMERGING]** There is no stable consensus on what students must be able to do unaided in an AI-rich programming course: write code from scratch, explain generated code, debug code, evaluate AI outputs, design prompts, or justify architecture.

**[UNVERIFIED-GAP]** Web-specific AI pedagogy remains a blank: we need studies on AI use in HTML/CSS/JavaScript, React/Vue/Svelte, accessibility remediation, browser debugging, and front-end project assessment. Every mechanism verified in this pass (access timing, metacognitive scripts, in-workflow code review) is a candidate for a web-development-specific replication, not yet an existing one.

## 4.4 Sharper terminology

`AI-assisted programming education` · `LLM-mediated programming` · `cognitive offloading` · `cognitive scaffolding` · `cognitive atrophy` · `epistemic debt` · `corrective competence` · `productive struggle` · `desirable difficulties` · `deferred assistance` · `access timing` · `hint-writing` · `metacognitive prompting` · `metacognitive scripts` · `self-regulated learning` · `critical engagement` · `AI pair programming` · `AI-assisted code review` · `Domain Mastery` · `Tool Mastery` · `Strategic Dance` · `Trust-but-Can't-Verify` · `Boilerplate Blindspot` · `performance–learning paradox` · `solution withholding` · `Illusion of Dialogue`

## 4.5 Critiques / controversies

**[EMERGING]** The major controversy is whether AI tools are best understood as **tools, tutors, or crutches**. The answer appears context-dependent: structured AI can scaffold learning, while unstructured AI may substitute for thinking and produce false mastery. Ahmes-matched Liu categories refine the triad into observable loops (Scaffolding vs Offloading) and evaluation failure modes (Trust-but-Can't-Verify; Boilerplate Blindspot) rather than a personality judgement about tools.

**[EMERGING]** A sharper 2026 formulation of the same controversy: unrestricted AI may not just offload *extraneous* cognitive load (welcome) but also *intrinsic* load needed for schema formation (harmful), producing students who are functionally productive but cannot correct or explain their own output — "fragile experts" in Sankaranarayanan's framing. This reframes "how much AI use" as a secondary question behind "which kind of cognitive load is being offloaded."

**[EMERGING]** A second controversy is equity: paid AI tools, uneven access, language background, institutional policy, and instructor readiness complicate any simple "allow" or "ban" approach.

---

# 5. Curriculum and accessibility: fundamentals that recently hardened

## 5.1 State of the art, 2024–2026

**[ESTABLISHED]** Accessibility is now an explicit curricular concern in CS2023. The CS2023 companion article "Teaching about Accessibility in Computer Science Education" argues for practical, intellectual, and social reasons to integrate accessibility into CS curricula.

**[ESTABLISHED]** WCAG 2.2 is the current W3C Recommendation for web content accessibility, and W3C's WCAG overview positions WCAG as the central international guideline family for web accessibility. WCAG 3.0 remains a Working Draft.

**[ESTABLISHED]** Legal and policy hardening is concrete in the EU: the **European Accessibility Act** (Directive 2019/882) began enforcement on **28 June 2025**. The harmonized technical path is EN 301 549 (currently incorporating WCAG 2.1 AA; WCAG 2.2 AA is the practical forward-looking target). This legal backdrop is why "accessibility has hardened" is not merely a standards slogan for EU-facing professional practice.

**[ESTABLISHED]** The distinction between **teaching accessibility** and **teaching accessibly** is central: one concerns accessibility as curricular content; the other concerns inclusive delivery of teaching itself. This distinction is explicitly used in computing-education accessibility literature.

**[EMERGING]** Adoption remains uneven. Parthasarathy & Joshi's 2024 ICER study on educators in India reports that few CS faculty teach accessibility and that barriers include need for faculty training, disability sensitisation, and exposure to accessibility pedagogy. Ahmes-matched framing and faculty speech:

> … the computer science (CS) courses that ought to prepare future professionals to develop such accessible software hardly cover topics related to accessibility.
> — Parthasarathy & Joshi (2024), opening (Ahmes, p.0)

> "As a computer science teacher… I [should] also know what should be taught" (P7).
> — Faculty Require Accessibility Training theme; Ahmes `verbatim_quote` (conf=1.0, p.7)

> "… lack of awareness, people who are designing need to have an idea about accessibility … not only in terms of disability but if you evaluate an application, most of them are created based on the experience they [developers] are having … inclusive design is not practiced." (P12)
> — Ahmes `verbatim_quote` (conf≈0.95, p.6)

**Perspective sharpening:** the `access` axis is not only a WCAG content problem; Ahmes faculty quotes show it as an **instructor self-efficacy / sensitisation** problem — which is why DigCompEdu 5.1 and CS2023 companion material matter for staff development, not only for student ILOs. A complementary 2024 UK-anchored study broadens this from individual-adoption barriers to institutional and workplace capacity: Coverdale, Lewthwaite & Horton's focus-group study of accessibility-education experts (_ACM Transactions on Accessible Computing_, DOI: `10.1145/3649508`) frames digital accessibility education as a socio-cultural, capacity-building problem spanning both academia and the workplace, not only a curriculum-content gap. *(Coverdale et al. not in this Ahmes PDF batch.)*

**[EMERGING]** Accessibility education in design-oriented HE programmes often cohabits with broader **UX / usability pedagogy** (heuristic evaluation in the Nielsen Norman Group tradition, e-commerce usability research such as Baymard, and usability-testing coursework). Treating accessibility in curricular isolation from evaluation and user research undersells how these strands are typically taught together.

**[EMERGING]** DigCompEdu is relevant to the European higher-education frame because it includes "Accessibility and inclusion" as competence 5.1 and is intended as a general reference for educators' digital competence. However, DigCompEdu is broad; whether it is granular enough for front-end craft, WCAG practice, and code-level accessibility remains an open issue rather than an established conclusion. Fisseler explicitly situates DigCompEdu among educator-competence models while arguing for a literacy concept that goes beyond them (Ahmes, p.1).

**[EMERGING]** The European Commission has started updating DigCompEdu to reflect rapid changes in education, making it a moving framework rather than a settled accessibility solution for front-end curricula.

**[EMERGING]** Digital accessibility literacy — as opposed to checklist compliance — is gaining traction as the more defensible educational target; Fisseler's 2024 conceptual framework argues explicitly for training oriented at literacy rather than a fixed compliance checklist. Ahmes-matched core claim (semantic coverage 0.88 — strongest in this batch):

> Developing digital accessibility expertise is critical to breaking down barriers and ensuring digital inclusion. However, a discourse on a pedagogical culture for teaching digital literacy is still lacking. This article, therefore, … develop[s] the concept of digital accessibility literacy as a fundamental element for promoting a pedagogical culture of digital accessibility. Digital accessibility literacy encompasses both the creation (encoding) and interpretation (decoding) of accessible digital content and technologies.
> — Fisseler (2024), abstract (Ahmes, p.0)

> Current practice in teaching accessibility is often characterized by 'high-agreement, high-certainty territory of standards, guidance and monitoring of best practice.' Everybody does the same because they see their colleagues doing it this way.
> — Fisseler (2024), citing the Lewthwaite & Sloan 'best practice' problem (Ahmes, p.2)

**Perspective sharpening for front-end curricula:** encoding ≈ writing accessible markup/ARIA/forms; decoding ≈ evaluating sites with AT, reading WCAG failures, interpreting user feedback. That encoding/decoding split is a better syllabus spine than a WCAG checklist dump, and it aligns the `access` axis with craft rather than compliance theatre.

## 5.2 Foundational references

- **W3C**, _Web Content Accessibility Guidelines 2.2_.
- **European Accessibility Act** (Directive 2019/882), enforcement from 28 June 2025; related: EN 301 549.
- **Ladner, Ludi & Domanski**, "Teaching about Accessibility in Computer Science Education," CS2023 companion article.
- **Parthasarathy & Joshi**, "Teaching Digital Accessibility in Computing Education: Views of Educators in India," ICER 2024, DOI: `10.1145/3632620.3671122`.
- **Coverdale, Lewthwaite & Horton**, "Digital Accessibility Education in Context: Expert Perspectives on Building Capacity in Academia and the Workplace," _ACM Transactions on Accessible Computing_, 17(2), 2024, DOI: `10.1145/3649508`.
- **DigCompEdu**, European Commission / JRC framework, including competence 5.1 Accessibility and inclusion.
- **Fisseler**, "Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility," 2024, DOI: `10.48550/arXiv.2410.11931` (arXiv: `2410.11931`).

## 5.3 Open problems

**[ESTABLISHED]** The largest implementation gap is resourcing: guidance exists, but faculty expertise, curriculum space, teaching materials, and institutional accessibility maturity lag behind — now evidenced from two independent angles (India-focused faculty survey; UK-anchored expert focus groups spanning academia and workplace).

**[EMERGING]** The **baseline floor** for what a front-end graduate should know about accessibility is largely settled in practice: WCAG 2.2 AA plus the CS2023 accessibility companion already give a widely cited core (semantic HTML, keyboard navigation, contrast, ARIA where appropriate). What remains contested is the **upper bound** — how much beyond that floor (disability culture, assistive-technology literacy, legal fluency, inclusive research) belongs in HE front-end curricula. Framing this as "no universal rubric exists" overstates uncertainty.

**[EMERGING]** DigCompEdu gives a European competence frame, but it is not granular enough by itself to define front-end accessibility craft. This is an evidence-informed inference from the framework's broad educator focus, not a direct quoted critique.

**[EMERGING]** How tightly accessibility curricula should integrate adjacent UX/usability-testing pedagogy remains under-specified in computing-education literature relative to design-programme practice.

**[UNVERIFIED-GAP]** Accessibility pedagogy specifically for immersive/3D interfaces remains under-mapped compared with 2D WCAG-oriented web accessibility (see §8.3).

## 5.4 Sharper terminology

`digital accessibility education` · `digital accessibility literacy` · `accessibility across the CS curriculum` · `teaching accessibility` · `teaching accessibly` · `inclusive design pedagogy` · `WCAG literacy` · `accessibility curriculum infusion` · `assistive technology literacy` · `legal-framework literacy` · `European Accessibility Act` · `accessibility-first front-end development`

## 5.5 Critiques / controversies

**[ESTABLISHED]** WCAG compliance is necessary but insufficient as pedagogy: students need standards literacy, but also inclusive design judgement, disability-aware practice, user testing, and ethical reasoning.

**[EMERGING]** Accessibility mandates can produce checklist pedagogy if not tied to actual code review, testing, user needs, and design decisions. This critique is supported by the field's move toward "digital accessibility literacy" rather than standards compliance alone, and by Coverdale et al.'s finding that capacity-building is socio-cultural, not purely curricular.

---

# 6. Signature pedagogy: project-based, studio-based, portfolio-based web learning

## 6.1 State of the art, 2024–2026

**[ESTABLISHED]** Project-based and studio-based learning remain the closest thing to a signature pedagogy for web/design education because web development is naturally artefact-centred, iterative, public-facing, and critique-friendly. Earlier computing-studio literature adapts architecture/design studio models to computing through artefact construction, critique, and reflection.

**[EMERGING]** Self-coded portfolios are now directly evidenced as authentic PBL assessment in web-design/development education. Garcia's 2025 _Education Sciences_ study reports 176 undergraduates completing weekly coding tasks culminating in a self-coded digital portfolio. Ahmes-matched problem statement and design:

> Digital portfolios have become an essential assessment tool in project-based and student-centered learning environments. Unfortunately, students exert minimal effort in creating digital portfolios because they find the writing component unchallenging. … existing research predominantly focuses on the use of pre-existing platforms for building digital portfolios. … this study employs a project-based learning (PBL) approach within a website design and development course, where 176 undergraduate students completed weekly coding tasks culminating in a self-coded digital portfolio.
> — Garcia (2025), abstract (Ahmes, p.0)

> … there is limited understanding of how students engage with digital portfolios when they are responsible for every layer of development.
> — Garcia (2025), introduction (Ahmes, p.2)

**Perspective sharpening:** Garcia is the batch's only *web-design/development* cohort paper. "Every layer of development" is the assessment twin of this map's durable core (HTML/CSS/JS/accessibility/versioning) versus curated-template portfolios that only exercise Tool Mastery of a builder UI — directly relevant under GenAI, where a polished site can be generated without ownership of learning.

**[EMERGING]** In the GenAI context, the assessment object is shifting from **final product** to **formation process**: commit history, pull-request review, design rationale, code walkthroughs, oral/viva explanations (including defence of diffs), journals, critique records, and peer review become integrity-relevant evidence. Oliveira et al.'s 2026 in-workflow AI-code-review study (§4.1, §4.2) is a concrete operationalisation of GitHub-based process evidence at scale (>100 students, two cohorts), even though its framing is software-engineering capstone rather than front-end-specific. GitHub-based process evidence and related commit-graph / version-history analysis remain an active operationalisation of this shift, even where no single canonical HE citation yet pins the method for front-end courses specifically. This is supported by AI-era peer-assessment and assessment-redesign literature.

## 6.2 Foundational references

- **Hundhausen, Narayanan & Crosby**, "Exploring Studio-Based Instructional Models for Computing Education," SIGCSE 2008, DOI: `10.1145/1352135.1352271`.
- **Carter & Hundhausen**, "A Review of Studio-Based Learning in Computer Science," _Journal of Computing Sciences in Colleges_, 27(1):105–111, 2011. No article-level DOI; venue record verified.
- **Garcia**, "Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education: Evidence from a Web Design and Development Course," _Education Sciences_, 2025, DOI: `10.3390/educsci15091150`.
- **Oliveira, Fu, Thongtanunam, López-Pernas & Saqr**, "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning," arXiv: `2604.23251`, 2026 / ICSE 2026 SEET — process-evidence operationalisation, cross-referenced from §4.

## 6.3 Open problems

**[EMERGING]** Studio/PBL pedagogy is expensive to scale because critique, feedback, revision, and process assessment require instructor time. AI-assisted feedback may reduce bottlenecks, but it introduces risks of inaccurate feedback and overreliance.

**[EMERGING]** Portfolio assessment is promising but can become performative unless it captures process, authorship, reflection, and explanation rather than only polished final artefacts. Garcia's 2025 study supports the self-coded portfolio model but does not close the broader integrity question. Open-source / GitHub-based portfolio assessment (commit narrative, PR review, oral defence of diffs) is a concrete strand that operationalises process-over-product but still needs stronger HE-specific, front-end-specific validation.

## 6.4 Sharper terminology

`signature pedagogy` · `project-based learning` · `studio-based learning` · `critique-based pedagogy` · `authentic assessment` · `self-coded portfolio` · `process portfolio` · `learning journal` · `oral code defence` · `viva` · `evaluative judgement` · `reflective artefact`

## 6.5 Critiques / controversies

**[EMERGING]** The AI-era critique is that a polished web artefact no longer reliably proves individual learning. Process-based and oral/written verification methods are emerging because they require students to narrate, justify, and debug their own work.

---

# 7. Assessment integrity and design under generative AI

## 7.1 State of the art, 2024–2026

**[EMERGING]** Assessment integrity is shifting away from pure AI detection and toward assessment redesign: structured AI-use policies, process evidence (including version-control history, PRs, and oral defence of diffs), oral explanations, written quizzes, peer review, and authentic tasks. The field increasingly treats AI detection as insufficient for proving authorship or learning.

**[EMERGING]** Open AI-use policies plus individual mastery checks are an emerging compromise: students may use AI in development, but must explain, defend, or reproduce understanding through quizzes, walkthroughs, or viva-style tasks.

**[EMERGING]** Peer assessment is being reconsidered because students must read, compare, and critique code, which can create learning evidence beyond the submitted product.

## 7.2 Open problems

1. **[EMERGING]** How to assess individual learning when AI collaboration is ambient.
2. **[EMERGING]** How to preserve productive struggle without banning professional AI workflows.
3. **[EMERGING]** How to make AI-use declarations meaningful rather than performative.
4. **[EMERGING]** How to avoid inequity when students have different access to paid tools, institutional support, or AI literacy.
5. **[UNVERIFIED-GAP]** What counts as acceptable AI assistance in front-end-specific tasks such as CSS debugging, ARIA repair, React component generation, or browser performance optimisation.

## 7.3 Sharper terminology

`academic integrity by design` · `process-based assessment` · `authentic assessment` · `AI-use declaration` · `explainability of submitted code` · `code authorship` · `assessment validity` · `assessment security` · `oral code defence` · `assignment-driven quizzes` · `formation evidence`

## 7.4 Critiques / controversies

**[EMERGING]** Detection-heavy approaches risk false accusations and a surveillance culture; redesign-heavy approaches improve validity but increase workload. The literature has not resolved this trade-off.

**[EMERGING]** "Authentic assessment" is now contested because authentic professional practice increasingly includes AI, while authentic educational assessment still requires evidence that the student understands the artefact.

---

# 8. State of the art in 3D web pedagogy

## 8.1 State of the art, 2024–2026

**[EMERGING]** The technical 3D web stack now spans Canvas/WebGL, Three.js, React Three Fiber, shaders, asset pipelines, WebXR, A-Frame, WebGPU, browser performance, and web-native simulation. However, practitioner resources are far ahead of peer-reviewed HE pedagogy.

**[EMERGING]** WebXR is central to browser-based immersive learning because it enables VR/AR experiences through web technologies rather than native-only pipelines. Prior landscape sources identified recent ACM WebXR toolkit work, but the pedagogy literature remains thin.

**[EMERGING]** A-Frame and declarative XR frameworks matter pedagogically because they lower the entry barrier to immersive web development, but they may also hide graphics fundamentals. This remains an evidence-informed pedagogical inference, not a settled HE research result.

**[EMERGING]** WebGPU is a frontier topic for advanced 3D web, simulation, graphics, and GPU compute, but its curricular implications are unsettled: shader literacy, browser compatibility, performance profiling, device constraints, and security all become part of the teaching problem.

**[UNVERIFIED-GAP]** No mature, HE-specific research map was found for "3D web development pedagogy" equivalent to research areas such as CS1, HCI education, or accessibility education. Blank to update.

**[UNVERIFIED-GAP]** No specific peer-reviewed citation on XR-in-CS-education or on WebGPU privacy/security as a teaching topic was pinned in this pass. Treat both as active literature-search targets (§13) rather than cited claims — do not manufacture a citation where none was verified.

## 8.2 Foundational / canonical references

- **WebGL / Three.js practitioner curricula**, useful as informal pedagogy but not sufficient as research evidence.
- **WebXR / A-Frame literature**, useful for immersive-web learning environments but still fragmented.
- **WebGPU technical literature and practitioner learning resources** (e.g. WebGPU Fundamentals, MDN WebGPU documentation), useful for frontier capability, not yet for pedagogy. Evidence type: technical/practitioner source, not pedagogy research.

## 8.3 Open problems

**[UNVERIFIED-GAP]** There is no settled sequencing model for 3D web in HE: creative coding → Canvas → WebGL → Three.js → shaders → React Three Fiber → WebXR → WebGPU is plausible, but not verified as consensus.

**[UNVERIFIED-GAP]** Accessibility for immersive/3D web pedagogy remains a major blank. WCAG-oriented accessibility education does not map cleanly onto spatial, embodied, XR, or shader-heavy environments (cross-reference §5.3).

**[UNVERIFIED-GAP]** No strong evidence was found on how to assess individual learning in AI-assisted 3D web projects, where students may use AI to generate shaders, Three.js scenes, React components, or interaction code.

## 8.4 Sharper terminology

`3D web development education` · `WebGL pedagogy` · `WebXR learning environments` · `immersive web` · `browser-based XR` · `creative coding pedagogy` · `shader literacy` · `GPU programming education` · `React Three Fiber pedagogy` · `spatial interaction design` · `web-native simulation`

## 8.5 Critiques / controversies

**[EMERGING]** 3D web pedagogy risks becoming demo-driven tool training unless students learn scene graphs, transforms, cameras, lighting, materials, shaders, accessibility, asset optimisation, performance budgets, and interaction design. This is a reasoned synthesis from the stack, not yet a mature empirical finding.

---

# 9. Cross-platform interface-layer transferability

This section is the field's boundary-case layer: the place that keeps front-end development from being implicitly equated with "building websites." It is also, honestly, the thinnest empirical zone in this map — most claims below are conceptual extensions from CS2023's platform taxonomy and durable-core terminology (§1, §3.1), not direct findings from dedicated studies. Mark accordingly.

**[EMERGING]** CS2023's Specialized Platform Development area already treats Web, Mobile, Robot, Embedded, Game, and Interactive Computing as sibling platform contexts (§3.1). This licenses the conceptual move of treating interface-layer thinking — state, interaction, feedback, accessibility, API-facing design — as the transferable core across platforms, with web as the pedagogically privileged instance. It does **not** license claims that HE programmes are currently teaching this transfer explicitly, or that doing so improves outcomes; no such study was located in this pass.

**[EMERGING]** Application dashboards and data-visualization interfaces are a natural extension of front-end teaching (state, layout, data binding, accessibility all transfer directly), and are widely used as capstone/portfolio artefacts in adjacent data-science and HCI teaching, but a dedicated "dashboard-development pedagogy" research literature was not located — treat as practitioner-plausible, academically unverified.

**[UNVERIFIED-GAP]** IoT and robotics **control-panel** interfaces (the human-facing visualization/control layer over embedded or robotic systems, as distinct from the embedded/robot platform work itself) are named explicitly as sibling CS2023 platforms, but no HE pedagogy source specific to teaching the *interface* layer of IoT/robotics systems — as opposed to the embedded/robotics engineering itself — was found in this pass. Blank to update.

**[UNVERIFIED-GAP]** Python-backed interfaces (e.g., dashboard/notebook-adjacent tooling where Python handles logic and a browser-rendered layer handles interaction) are a plausible transfer case for front-end-as-interface-layer teaching, but no peer-reviewed HE pedagogy source was located. Blank to update.

**[UNVERIFIED-GAP]** Creative-coding interfaces are pedagogically well-established as a *motivational* on-ramp into programming broadly, but a specific literature connecting creative coding to front-end/interface-layer transferability (as opposed to programming fundamentals generally) was not located in this pass.

## 9.1 Foundational references

- **ACM/IEEE-CS/AAAI**, _Computer Science Curricula 2023_, DOI: `10.1145/3664191` — Specialized Platform Development, sibling-platform structure (Web, Mobile, Robot, Embedded, Game, Interactive Computing).

## 9.2 Open problems

**[UNVERIFIED-GAP]** No HE pedagogy literature was found that directly studies teaching front-end/interface-layer concepts *as* transferable across web, dashboard, IoT/robotics-control, Python-backed, and creative-coding contexts. This is the field's largest single blank and the primary target for the search strings in §13.

## 9.3 Sharper terminology

`application interface development education` · `dashboard development pedagogy` · `data visualization interface education` · `IoT dashboard education` · `robotics control interface pedagogy` · `Python web interface education` · `local-first application interfaces` · `creative coding interface pedagogy` · `human-machine interface pedagogy` · `interface-layer thinking` · `operational membrane`

## 9.4 Critiques / controversies

**[EMERGING]** The central risk this section exists to guard against is a category error in the opposite direction from §0's correction: treating "transferability beyond web" as already-demonstrated pedagogy rather than as a well-motivated but largely unstudied research programme. Every claim above should be read with that caveat attached.

---

# 10. Current state-of-the-art claims to test

Claims are grouped by theme and tagged per the evidence policy (§15). Where a claim tag differs from how the same claim might appear elsewhere in general AI-in-education discourse, the tag here reflects only what this pass could verify against a checkable source.

### Front-end as interface layer

- **[ESTABLISHED]** Front-end development should be defined as the human-facing interaction layer of digital systems, not merely as website production (§0, CS2023 platform taxonomy).
- **[ESTABLISHED]** Web technologies remain the strongest common pedagogical substrate because the browser is inspectable, cross-platform, standards-based, accessible, and deployable.
- **[EMERGING]** Cross-platform interface-layer pedagogy should include dashboards, Python-backed services, IoT/robotics panels, data tools, creative coding interfaces, and 3D/immersive systems as boundary cases — conceptually motivated (§9), empirically thin.

### Durable fundamentals vs. frameworks

- **[ESTABLISHED]** Semantic HTML, CSS, JavaScript, DOM/browser concepts, accessibility, and version control constitute a durable front-end core (§1).
- **[ESTABLISHED]** Frameworks are professionally important but curricularly volatile; teach them as transferable component/state/tooling concepts rather than as fixed vocational endpoints.
- **[EMERGING]** Skill half-life / technical volatility is a useful axis for deciding which knowledge belongs in the stable spine and which belongs in replaceable frontier modules — a design heuristic, not (yet) a validated empirical construct (§2.1).
- **[UNVERIFIED-GAP]** Specific longitudinal evidence comparing React-first and fundamentals-first approaches in higher-education web-development cohorts remains weak.

### AI-assisted coding

- **[EMERGING]** Recent AI-assisted programming-education research frames the central risk as a balance between cognitive scaffolding and cognitive offloading — and, in 2026 work, more precisely as offloading of *intrinsic* vs. *extraneous* cognitive load (Sankaranarayanan, 2026).
- **[EMERGING]** Deferred assistance, access timing, hint-writing, metacognitive prompting/scripting, and instructor/human-in-the-loop review are converging as concrete, testable mitigation mechanisms (Singh et al. 2026; Rotter et al. 2026; Sankaranarayanan 2026; Phung et al. 2025).
- **[EMERGING]** AI-assisted code review may be useful when designed as scaffolded, in-workflow feedback rather than solution replacement (Oliveira et al. 2026).
- **[UNVERIFIED-GAP]** Web-development-specific effect sizes for cognitive offloading remain a blank; all evidence identified in this pass — including five new 2025–2026 sources — still comes from general programming, CS1, Python, data-science, or general software-engineering-capstone contexts, not HTML/CSS/JS/front-end-framework courses.

### Accessibility

- **[ESTABLISHED]** WCAG 2.2 is the current W3C Recommendation for web content accessibility.
- **[ESTABLISHED]** Accessibility education is now an explicit computing-curriculum concern, with CS2023 companion material arguing for teaching accessibility in CS education.
- **[ESTABLISHED]** Distinguish teaching accessibility from teaching accessibly.
- **[EMERGING]** Adoption remains uneven because guidance is ahead of staff capacity, disability-sensitisation, teaching materials, and institutional resources — now evidenced from both an India-focused faculty-adoption angle (Parthasarathy & Joshi 2024) and a UK-anchored, capacity/socio-cultural angle spanning academia and workplace (Coverdale, Lewthwaite & Horton 2024).
- **[EMERGING]** Digital accessibility literacy is a better educational target than checklist compliance alone.

### Project / studio / portfolio

- **[ESTABLISHED]** Project-based and studio-based learning remain strong signature-pedagogy candidates for web/interface education because students create, critique, iterate, and explain artefacts.
- **[EMERGING]** Self-coded digital portfolios are directly evidenced as authentic project-based assessment in web design/development education (Garcia 2025).
- **[EMERGING]** AI-era assessment is shifting from final-product evaluation to process evidence: version history, commit narrative, walkthroughs, learning journals, oral code defence, and critique records — with in-workflow GitHub PR review now directly evidenced at scale in a related (software-engineering capstone) setting (Oliveira et al. 2026).

### 3D / immersive web

- **[EMERGING]** 3D web now spans WebGL, Three.js, React Three Fiber, WebXR, A-Frame, shaders, WebGPU, browser performance, and GPU compute.
- **[EMERGING]** The technical field is moving faster than higher-education pedagogy.
- **[UNVERIFIED-GAP]** A mature HE-specific pedagogy of 3D web / WebXR / WebGPU remains a blank to update.
- **[UNVERIFIED-GAP]** Accessibility pedagogy for immersive/3D interfaces remains under-mapped compared with 2D WCAG-oriented web accessibility.

---

# 11. Consolidated open-problem map / open problems to track

1. **[EMERGING]** How to assess individual learning under ambient AI. Product evidence is weak; process, explanation, critique, version-control evidence, and mastery checks are becoming central. AI-assisted assessment validity for front-end-specific tasks remains open.
2. **[EMERGING]** How to sequence fundamentals and frameworks under rapid tool churn. Fundamentals-first is defensible as curriculum design, but the exact transition point into React/Vue/Svelte/meta-frameworks is not empirically settled. Progressive-enhancement vs. SPA-first is a related, still under-mapped curricular debate.
3. **[EMERGING]** How to preserve productive struggle while allowing professional AI workflows — the 2025–2026 access-timing / deferred-assistance / metacognitive-script literature (§4) offers mechanisms, none yet validated in web-development cohorts.
4. **[UNVERIFIED-GAP]** How to measure cognitive offloading specifically in web/front-end cohorts. Most evidence remains programming-general, Python, CS1, data-science, or general software-engineering-capstone oriented (Huang; Phung et al.; Singh et al.; Liu, Fan & Pan; Ma et al.; Rotter et al.; Sankaranarayanan; Oliveira et al.) — not HTML/CSS/JS/React cohort studies.
5. **[ESTABLISHED]** How to resource the accessibility mandate: faculty expertise, teaching materials, and institutional support lag the standards/legal mandate. The baseline floor (WCAG 2.2 AA + CS2023 companion) is settled; upper-curriculum scope (culture, AT literacy, legal fluency, UX co-teaching) remains contested.
6. **[EMERGING]** How to move accessibility education beyond WCAG checklist compliance toward digital accessibility literacy (Fisseler 2024).
7. **[EMERGING]** How to map DigCompEdu and EU digital-competence frameworks onto granular front-end craft. DigCompEdu includes accessibility and inclusion (competence 5.1) but is too broad to function alone as a front-end accessibility curriculum.
8. **[UNVERIFIED-GAP]** How to build a mature pedagogy for 3D web, WebXR, WebGPU, shaders, spatial interaction, and immersive accessibility. The technical field is accelerating faster than HE pedagogy.
9. **[UNVERIFIED-GAP]** How to assess AI-assisted React/Vue/Svelte/Three.js/WebGPU artefacts through process evidence rather than product polish. No verified consensus found beyond general programming-assessment strategies; GitHub/process operationalisation (Oliveira et al. 2026) is active practice but under-cited in HE literature and unverified for front-end frameworks specifically.
10. **[UNVERIFIED-GAP]** How to teach front-end as an interface layer for Python services, IoT devices, robotics panels, dashboards, and creative tools without losing the coherence of the web substrate (§9). This is the field's largest structural blank, not a matter of missing citations but of a missing research programme.

---

# 12. Lexicum for reuse / profield axis

## 12.1 Core pedagogical lexicon

`signature pedagogy` · `studio-based learning` · `project-based learning` · `constructionism` · `constructivism` · `productive struggle` · `desirable difficulties` · `self-regulated learning` · `metacognitive scaffolding` · `evaluative judgement`

## 12.2 Web/front-end lexicon

`platform-first pedagogy` · `framework literacy` · `web standards literacy` · `semantic substrate` · `DOM literacy` · `component-based UI pedagogy` · `browser mental model` · `progressive enhancement` · `SPA-first` · `accessibility-first front-end` · `usability-testing pedagogy` · `interface-layer thinking` · `human-facing software layer` · `operational membrane` · `interaction state` · `feedback loop` · `input validation` · `error-state design` · `API-facing interface`

## 12.3 AI-learning lexicon

`cognitive offloading` · `cognitive scaffolding` · `false mastery` · `cognitive atrophy` · `epistemic debt` · `corrective competence` · `deferred AI assistance` · `access timing` · `hint-writing` · `metacognitive scripts` · `critical engagement` · `AI pair programming` · `human-in-the-loop tutoring` · `solution withholding`

## 12.4 Assessment lexicon

`process-based assessment` · `authentic assessment` · `AI-use declaration` · `oral code defence` · `viva` · `learning journal` · `version-history evidence` · `commit narrative` · `pull-request review` · `formation process` · `authorship transparency` · `GitHub-based portfolio assessment` · `explainability of submitted code`

## 12.5 Accessibility lexicon

`teaching accessibility` · `teaching accessibly` · `digital accessibility literacy` · `accessibility encoding` · `accessibility decoding` · `WCAG literacy` · `inclusive design pedagogy` · `assistive technology literacy` · `accessibility testing pedagogy` · `legal-framework literacy` · `disability sensitisation` · `pedagogical culture of accessibility` · `best-practice problem (accessibility teaching)`

## 12.6 Interface-expansion lexicon

`dashboard pedagogy` · `IoT control interface` · `robotics control panel` · `Python-backed interface` · `local-first interface` · `data tool interface` · `creative coding interface` · `WebXR interface` · `WebGPU interface` · `spatial interaction` · `shader literacy` · `human-machine interface pedagogy`

## 12.7 Profield operational axes

- `volatility`: separates durable platform/interface concepts from fast-decaying tools, frameworks, and build ecosystems.
- `narrate`: requires students/research artefacts to expose process, rationale, authorship, version history, and explanation rather than only final product.
- `verify`: tests whether the learner can debug, justify, modify, and explain submitted code under AI-assisted conditions (Liu's Trust-but-Can't-Verify / attenuated calibration).
- `access`: treats accessibility as a front-end fundamental and ethical/legal design practice, not a late-stage compliance checklist — with encoding/decoding literacy (Fisseler) and faculty self-training need (Parthasarathy & Joshi) as co-conditions.
- `defer`: treats delayed or staged AI access as a scaffold to preserve productive struggle, planning, and metacognition (Singh deferred assistance; Phung planning-before-optimisation; CodeAid solution withholding).
- `critique`: uses peer, instructor, and AI-assisted review as explicit learning evidence.
- `interface`: prevents the field from collapsing into website production by tracking how front-end concepts transfer to dashboards, application layers, IoT/robotics, data tools, creative systems, and immersive interfaces.
- `mastery-split` *(Ahmes-dressed addition)*: tracks Domain Mastery vs Tool Mastery as co-developing aims under boundary conditions (time pressure, task complexity, scaffolding norms) — the process vocabulary for hireability-vs-durability (§2.5) under GenAI.

---

# 13. Re-run search strings

```text
"front-end web development education" higher education HTML CSS JavaScript SIGCSE ITiCSE ICER
"front-end development education" "higher education" HTML CSS JavaScript
"front-end pedagogy" "higher education" web development
"web platforms" CS2023 curriculum HTML CSS JavaScript accessibility frameworks
"web platforms" CS2023 "Specialized Platform Development"
"Computer Science Curricula 2023" "Web Platforms" accessibility
"MDN Curriculum" "front-end developer" semantic HTML accessibility frameworks
"Learning web development" Park Wiedenbeck DOI 10.1145/2016911.2016937
"React" "computing education" "higher education" "front-end"
"React education" "higher education" "computing education"
"frameworks before fundamentals" web development education
"JavaScript framework teaching" "computing education"
"skill half-life" computing education web development frameworks
"AI-assisted programming education" cognitive offloading cognitive scaffolding
"deferred AI assistance" "hint-writing" programming education
"access timing as scaffolding" GenAI education programming
"epistemic debt" generative AI programming education
"metacognitive prompting" AI-assisted programming education
"AI-assisted code review" "self-regulated learning" programming education
"GenAI coding hints" cognitive load programming education BJET
"tool tutor or crutch" AI-assisted programming education
"assessment integrity" "generative AI" programming education
"oral code defence" programming assessment generative AI
"process-based assessment" programming education AI
"digital accessibility education" "computer science curriculum" WCAG higher education
"Teaching about Accessibility in Computer Science Education" CS2023
"Digital Accessibility Education in Context" TOCE 2024
"Teaching Digital Accessibility in Computing Education" India 2024
"Digital Accessibility Literacy" 2024
"DigCompEdu" accessibility inclusion digital accessibility critique
"European Accessibility Act" WCAG higher education curriculum
"progressive enhancement" "SPA" curriculum education web development
"self-coded digital portfolios" web design development course 176 undergraduates
"studio-based learning" computing education web development
"project-based learning" web development higher education
"commit history" OR "version control" assessment portfolio web development education GenAI
"WebXR" education higher education front-end
"WebXR" education higher education Three.js A-Frame
"WebGPU" education pedagogy WebGL
"WebGPU" education computer graphics pedagogy
"Three.js" education pedagogy higher education
"React Three Fiber" education
"3D web development" pedagogy higher education WebGL WebXR WebGPU
"IoT dashboard" education web interface
"robotics control interface" education web dashboard
"Python web interface" education dashboard programming
```

---

# 14. Source ledger — consolidated

Preserving citation metadata, DOI/arXiv identifier when available, and source type (peer-reviewed / practitioner / standards-legal / preprint).

### Curriculum / standards

1. ACM/IEEE-CS/AAAI. _Computer Science Curricula 2023_. DOI: `10.1145/3664191`.
   Use for: CS2023, web platforms, specialized platform development, curriculum legitimacy, knowledge/competency framing, cross-platform transferability anchor (§3, §9).
2. ACM/IEEE-CS. _Computing Curricula 2020_. DOI: `10.1145/3467967`.
   Use for: locating web development across CS/IT/SE/IS/cybersecurity/data-science.
3. ACM/IEEE-CS. _Information Technology Curricula 2017_.
   Use for: IT-programme framing of applied web/systems integration.
4. MDN Web Docs. _MDN Curriculum_ and _Learn Web Development — Core modules_. 2024–2025 updates.
   Use for: practitioner-facing front-end curriculum, semantic HTML, CSS, JavaScript, accessibility, JavaScript frameworks, employability-oriented core skills. Evidence type: practitioner curriculum, not peer-reviewed research.
5. MDN Web Docs. _Introduction to client-side frameworks_. 2025 update.
   Use for: framework-critical (not framework-hostile) practitioner guidance.
6. W3C. _Web Content Accessibility Guidelines 2.2_. W3C Recommendation, 5 October 2023.
   Use for: accessibility standards baseline.
7. W3C WAI. _WCAG 2 Overview_.
   Use for: WCAG as shared international accessibility standard family.
8. European Accessibility Act (Directive 2019/882); enforcement from 28 June 2025; related: EN 301 549.
   Use for: EU legal hardening of accessibility.
9. European Commission / JRC. _DigCompEdu: European Framework for the Digital Competence of Educators_ (including competence 5.1, Accessibility and inclusion); 2026 update notice.
   Use for: EU-level digital competence framing; do not treat as granular front-end curriculum.

### Web-development pedagogy foundations

10. **Park, Thomas H. & Wiedenbeck, Susan.** "Learning web development: challenges at an earlier stage of computing education." ICER 2011, pp. 125–132. DOI: `10.1145/2016911.2016937`.
    Use for: early web-development learning challenges, help-seeking, fragmented empirical base. **Verified correction:** this DOI belongs to Park & Wiedenbeck, not Dorn & Guzdial — a misattribution that recurs in secondary summaries (including the draft amendment brief consulted while preparing this pass, which listed it as "Dorn, Brian; Guzdial, Mark") and was re-checked directly against the ACM DL record in this pass. Dorn & Guzdial's related but distinct paper is "Learning on the Job: Characterizing the Programming Knowledge and Learning Strategies of Web Designers," CHI 2010 — cite that one separately if the Dorn/Guzdial claim is specifically needed.

### Accessibility education

11. Ladner, Richard E.; Ludi, Stephanie; Domanski, Robert J. "Teaching about Accessibility in Computer Science Education." CS2023 companion article.
    Use for: teaching accessibility in CS, distinction between accessibility content and accessible teaching practice.
12. Coverdale; Lewthwaite; Horton. "Digital Accessibility Education in Context: Expert Perspectives on Building Capacity in Academia and the Workplace." _ACM Transactions on Accessible Computing_, 17(2), 2024. DOI: `10.1145/3649508`.
    Use for: expert focus-group perspectives, socio-cultural barriers, institutional capacity-building, academia-and-workplace framing.
13. Parthasarathy, P. D.; Joshi, Swaroop. "Teaching Digital Accessibility in Computing Education: Views of Educators in India." ICER 2024. DOI: `10.1145/3632620.3671122`.
    Use for: uneven adoption, Global South perspective, faculty training, disability sensitisation, barriers. **Ahmes-dressed** (pass-5): faculty `verbatim_quote` anchors P7, P12.
14. Fisseler. "Digital Accessibility Literacy: A Conceptual Framework for Training on Digital Accessibility." 2024. DOI: `10.48550/arXiv.2410.11931` (arXiv: `2410.11931`).
    Use for: digital accessibility literacy beyond checklist compliance. **Ahmes-dressed** (pass-5): encoding/decoding definition; best-practice critique; coverage 0.88.

### AI-assisted programming education

15. Liu, Fan & Pan. "Tool, tutor, or crutch?: A grounded theory of cognitive scaffolding and offloading in AI-assisted programming education." _International Journal of STEM Education_, 2026. DOI: `10.1186/s40594-025-00592-w`; correction: `10.1186/s40594-026-00611-4`.
    Use for: scaffolding-vs-offloading grounded theory. **Ahmes-dressed** (pass-5): Domain/Tool Mastery; Scaffolding/Offloading loops; student `verbatim_quote` anchors.
16. Huang. "The impact of GenAI-enabled coding hints on students' programming performance and cognitive load in an SRL-based Python course." _British Journal of Educational Technology_, 2025. DOI: `10.1111/bjet.13589`.
    Use for: GenAI hints, cognitive load, SRL. Scope: Python, not web. *(Not in Ahmes batch pass-5.)*
17. Singh, Brooks, Li, Kim & Wang. "Hint-Writing with Deferred AI Assistance." arXiv: `2604.19931`, 2026.
    Use for: deferred AI assistance, hint quality, critical engagement. Scope: data-science education. **Ahmes-dressed** (pass-5).
18. Phung et al. "Plan More, Debug Less: Applying Metacognitive Theory to AI-Assisted Programming Education." arXiv: `2509.03171` / AIED 2025.
    Use for: planning/debugging/optimisation hints, metacognitive scaffolding. Scope: data-science programming. **Ahmes-dressed** (pass-5): planning-hint association.
19. Kazemitabaar et al. "CodeAid: Evaluating a Classroom Deployment of an LLM-based Programming Assistant…" CHI 2024. DOI: `10.1145/3613904.3642773`.
    Use for: programming-general classroom deployment (n≈700), not web-specific. **Ahmes-dressed** (pass-5): solution-withholding design stance.
20. **Ma, Boxuan et al.** "Scaffolding Metacognition in Programming Education: Understanding Student-AI Interactions and Design Implications." arXiv: `2511.04144`, 2025.
    Use for: large-scale (248-student, 3-year, >10,000-log) student-AI interaction data; AI-adoption trend 2023→2025 in an intro Python course; metacognitive-engagement design implications.
21. **Sapoglu, Necmi Kaan & Mohamed, Abdallah.** "Learning, Not Just Coding: Scaffolded AI Assistance for Programming Education." ICPEC 2026 (OASIcs).
    Use for: scaffolded AI assistance, educational AI design, risks of reduced reasoning.
22. **Oliveira, Eduardo; Fu, Michael; Thongtanunam, Patanamon; López-Pernas, Sonsoles; Saqr, Mohammed.** "AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report." arXiv: `2604.23251`, 2026; accepted ICSE 2026 (SEET track).
    Use for: GitHub-PR-integrated AI reviewer, code quality, self-regulated learning, human-in-the-loop feedback, process-evidence operationalisation at scale.
23. **Rotter, Janne; Benazet i Montobbio, Pau; Hernández-Leo, Davinia.** "Access Timing as Scaffolding: A Reinforcement Learning Approach to GenAI in Education." arXiv: `2605.15850`, 2026.
    Use for: timing of AI access as implicit scaffolding, RL-agent design, comparison with unrestricted and fully restricted GenAI use, 105-participant controlled lab study.
24. **Sankaranarayanan, Sreecharan.** "Mitigating 'Epistemic Debt' in Generative AI-Scaffolded Novice Programming using Metacognitive Scripts." arXiv: `2602.20206`, 2026; accepted L@S '26 (ACM Conference on Learning at Scale).
    Use for: cognitive offloading vs. cognitive outsourcing distinction (intrinsic vs. extraneous load), "fragile expert" / corrective-competence framing, metacognitive-script mitigation. Mark as emerging/single-study.

### Project / studio / portfolio

25. Hundhausen, Narayanan & Crosby. "Exploring Studio-Based Instructional Models for Computing Education." SIGCSE 2008. DOI: `10.1145/1352135.1352271`.
    Use for: studio-based learning in computing, critique, artefact construction.
26. Carter & Hundhausen. "A Review of Studio-Based Learning in Computer Science." _Journal of Computing Sciences in Colleges_, 27(1):105–111, 2011. No article-level DOI; venue record verified.
    Use for: studio-learning foundations.
27. Garcia, Manuel B. "Self-Coded Digital Portfolios as an Authentic Project-Based Learning Assessment in Computing Education: Evidence from a Web Design and Development Course." _Education Sciences_, 2025. DOI: `10.3390/educsci15091150`.
    Use for: 176 undergraduates, weekly coding tasks, self-coded portfolio as authentic PBL assessment. **Ahmes-dressed** (pass-5): only web-design/development cohort in the extraction batch.

### 3D / immersive / GPU web

28. WebGPU learning resources / WebGPU Fundamentals / MDN WebGPU documentation.
    Use for: current practitioner learning ecosystem around WebGPU, rendering pipelines, compute shaders, and browser GPU programming. Evidence type: technical/practitioner source, not pedagogy research.
29. XR-and-computer-science-education literature, 2025–2026 — **blank to update**.
    No specific peer-reviewed citation was pinned in this pass; do not cite as if verified. Use §13 search strings to re-run.
30. WebGPU privacy/security-as-teaching-topic literature, 2026 — **blank to update**.
    No specific peer-reviewed citation was pinned in this pass; the claim that "advanced WebGPU teaching should include privacy/fingerprinting/security implications" is a reasonable curricular inference from WebGPU's browser-GPU access model, not yet a cited finding.

---

# 15. Evidence policy

```yaml
evidence_policy:
  claim_tags:
    - ESTABLISHED
    - EMERGING
    - UNVERIFIED-GAP # legitimate frontier: absence + adjacent grounding + actionable now
    - UNVERIFIED-NOISE # reified metaphor / ungrounded synthesis: flag and discard, do not build on it
  requirements:
    - cite_real_checkable_sources
    - prefer_ACM_IEEE_W3C_peer_reviewed_or_curriculum_frameworks
    - mark_web_specific_blanks_explicitly
    - do_not_infer_from_general_programming_to_front_end_without_warning
    - distinguish_practitioner_sources_from_peer_reviewed_sources
    - distinguish_web_platform_claims_from_cross_platform_interface_claims
    - distinguish_technical_state_of_the_art_from_pedagogy_state_of_the_art
    - use_blank_to_update_instead_of_filling_gaps_rhetorically
    - triage_every_unverified_claim_as_gap_or_noise_using_the_evidence_tags_heuristic
    - when_ahmes_bundle_exists_prefer_fission_node_quotes_over_secondary_paraphrase
    - never_promote_claim_tags_on_ahmes_quotes_alone_without_scope_check
```

When the field outpaces peer-reviewed literature, mark the subsection as `[EMERGING]`, `[UNVERIFIED-GAP]`, or `[UNVERIFIED-NOISE]` — never the bare, untriaged `[UNVERIFIED]`. Do not manufacture consensus. Practitioner ecosystems such as MDN, WebGPU learning resources, Three.js learning resources, and developer surveys may be used as contextual evidence, but must be labelled differently from peer-reviewed computing-education research. Preprints (arXiv) that have not yet completed peer review are labelled `[EMERGING]` at most, even when their findings are internally rigorous — the tag reflects venue/review status, not study quality. A curriculum-design pass over this document (see the companion syllabus-renewal plan) should read `[UNVERIFIED-GAP]` tags as candidate briefs and `[UNVERIFIED-NOISE]` tags as claims to leave out of any syllabus rationale entirely.

---

# 16. Ahmes matched-evidence dressing (pass-5)

## 16.1 Why Ahmes helps this field map

Without Ahmes, a landscape map tends to cite DOIs and then *re-narrate* abstracts from memory or secondary digests. That is exactly how Park & Wiedenbeck's DOI drifted toward Dorn & Guzdial in earlier drafts (§14 item 10), and how "skill half-life" slips from metaphor into fake construct (§2.1).

Ahmes changes the epistemic posture of dressing work:

| Capability | What it yields for this document |
| --- | --- |
| Fission nodes + spatial page anchors | Checkable passage + page for every blockquote in §4–§6 |
| `anchor_semantic` + coverage ratio | Prioritise richly tagged docs (Fisseler 0.88, Liu 0.82) over thinly tagged ones when choosing dress density |
| WPL lexicum `verbatim_quote` | Separate student/faculty speech from author paraphrase — critical for §4 offloading and §5 faculty barriers |
| Entity / relation tables | Fast claim↔source matching without re-reading entire PDFs |
| Content-hash document dirs | Deduplicate Liu vs Tool_tutor copies; omit Correction PDF as erratum-only |
| Sovereign SQLite bundles | Evidence survives independent of ACM paywall HTML and of LLM context windows |

Ahmes does **not** invent pedagogy findings, close `[UNVERIFIED-GAP]` blanks, or make Python/data-science cohorts into web cohorts. It improves **fidelity of perspective** on already-tagged claims.

## 16.2 Batch inventory (unique content-hashes)

| Source (ledger) | Ahmes dir slug (abbrev.) | Sem. anchors | Coverage | Primary field argument |
| --- | --- | --- | --- | --- |
| Liu, Fan & Pan 2026 (§14.15) | `liu_fan_pan_tool_tutor…` | 164 | 0.82 | §4 performance–learning paradox; Domain/Tool Mastery |
| Kazemitabaar et al. CHI 2024 (§14.19) | `kazemitabaar…codeaid…` | 209 | 0.73 | §4 / §7 solution withholding; classroom AI |
| Singh et al. 2026 (§14.17) | `singh…deferred…` | 140 | 0.74 | §4 deferred assistance; `defer` axis |
| Phung et al. 2025 (§14.18) | `phung…plan_more…` | 92 | 0.78 | §4 metacognitive planning hints |
| Garcia 2025 (§14.27) | `garcia_self_coded…` | 117 | 0.66 | §6 self-coded portfolio; **web cohort** |
| Fisseler 2024 (§14.14) | `digital_accessibility_literacy…` | 45 | 0.88 | §5 DAL encoding/decoding; anti-checklist |
| Parthasarathy & Joshi 2024 (§14.13) | `teaching_digital_accessibility…india…` | 143 | 0.61 | §5 adoption / faculty training |

Manifest: `/Users/ruvebal/src/profield/runs/frontend-pedagogy/01/pdfs/.ahmes/batch-manifest.json`.

Not Ahmes-dressed in this pass (ledger-only): CS2023 PDF present on disk but absent from manifest; Coverdale et al.; Huang BJET; Ma/Sapoglu/Rotter/Sankaranarayanan/Oliveira 2025–26 wave; MDN/WCAG/EAA standards.

## 16.3 Claim ↔ quote map

| Field argument | Tag | Matched Ahmes evidence | Perspective improvement |
| --- | --- | --- | --- |
| Performance vs genuine learning (§0, §4.1) | EMERGING | Liu abstract: distinguish "immediate task performance" from "genuine learning" | Makes the paradox definitional, not slogan |
| Scaffolding vs offloading (§4.1, §4.5) | EMERGING | Liu p.1 definitions + Scaffolding/Offloading loops | Gives process model, not tool moralism |
| False mastery / attenuated calibration (§4, `verify`) | EMERGING | Liu `verbatim_quote`: "I'm not sure what I actually know" | Makes process assessment urgent for GenAI studios |
| Time-pressure offloading boundary (§12.7 `defer`) | EMERGING | Liu `verbatim_quote`: 2 AM "survival" switch | Curriculum must plan timed AI access, not only policy text |
| Deferred assistance (§4.1, `defer`) | EMERGING | Singh abstract: independent → revise-with-AI | Operationalises `defer` as a design pattern |
| Planning before optimisation (§4.1) | EMERGING | Phung p.8: planning hints ↔ higher performance | Studio cue: plan interface semantics before framework polish |
| Solution withholding (§4, CodeAid) | EMERGING | CodeAid abstract: help "without revealing code solutions" | Aligns LLM tutors with productive struggle |
| Accessibility literacy > checklist (§5.1, `access`) | EMERGING | Fisseler abstract: encoding + decoding; p.2 best-practice critique | Syllabus spine = literacy strands, not WCAG dump |
| Faculty capacity barrier (§5.1, §11.5) | EMERGING | India study opening + P7/P12 verbatim quotes | Staff development is co-equal with student ILOs |
| Self-coded portfolio authenticity (§6.1) | EMERGING | Garcia abstract: 176 students, weekly coding → portfolio; "every layer" | Only web-course paper in batch; anchors signature pedagogy under GenAI |

## 16.4 Semantic-extraction value for field perspectives

Beyond quotes, taxonomy signals from `anchor_semantic` nudged how this map *talks*:

1. **Literacy framing dominates accessibility PDFs** — Fisseler's high coverage under literacy/syllabum tags supports treating DAL as a named educational object (encoding/decoding), not a synonym for WCAG compliance. Lexicum updated accordingly (§12.5).
2. **Verbatim density is highest where lived barriers matter** — India study and Liu interviews: Ahmes tags tell the dresser to quote speech, not paraphrase it into soft institutional language.
3. **Garcia's lower coverage (0.66) still yields the unique web-cohort anchor** — reminds the field that *most* AI-pedagogy evidence is still wrong-substrate for front-end claims; one strong web paper does not fill the AI×web blank (§4.3, §11.4).
4. **Mastery-split axis** — Domain vs Tool Mastery is now an explicit profield axis (§12.7) because Ahmes made Liu's categories extractable as reusable terms, not buried in a long abstract paraphrase.
5. **Dedup by hash** — prevented double-counting Tool_tutor / Liu copies and Fisseler / Digital_Accessibility copies; Correction PDF correctly excluded from claim dressing.

## 16.5 Next Ahmes passes (optional)

- Extract CS2023 (`3664191.pdf`) and dress §3 / §9 platform-taxonomy quotes.
- Pull Coverdale et al. and Huang BJET into the same batch for §5 capacity and §4 cognitive-load quotes.
- Ingest Ahmes `index.md` chunks into DevIAC vectors with `origin_system=ahmes` so GraphRAG hits this corpus instead of unrelated studio docs.

---

# 17. Profield FieldSpec block (machine-readable appendix)

This block mirrors and extends the sibling `frontend-pedagogy.yaml` FieldSpec. As of this pass, the `.yaml` file has only partially absorbed an earlier round of these amendments (it has `id`, `title`, `scope_statement`, a partial `keywords`/`areas`/`themes`/`lexicum`/`exclusions`/`evidence_policy`, but no `profield_axes` block, and shorter lists throughout than the versions below). Treat this `.md` block as the current authoritative version; the `.yaml` should be resynced against it in a separate, explicit pass.

```markdown
# Profield FieldSpec — public keywords only.
# Never add project internals here: the confidentiality gate blocks export on any hit.
```

Do not add private project names, client names, internal repo architecture, unpublished research claims, credentials, local-only URLs, or proposal-specific confidential concepts. Public concepts such as "front-end/interface-layer pedagogy," "AI-assisted programming education," "WCAG," "CS2023," "WebXR," "WebGPU," "IoT dashboard," and "robotics control interface" are acceptable.

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
  - epistemic debt in AI-assisted programming
  - deferred AI assistance
  - access timing as scaffolding
  - hint-writing with AI
  - metacognitive prompting in programming
  - metacognitive scripts in programming education
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

exclusions:
  - purely back-end web development
  - general software engineering without a human-facing interface layer
  - generic UX research without implementation pedagogy
  - pure graphic design without computational interface implementation
  - AI-in-education literature not connected to programming, interfaces, assessment, or computing curricula
  - robotics or IoT education without an interface/control/visualization layer
  - 3D graphics education without browser, interface, WebXR, WebGPU, or front-end relevance
  - generic digital competence literature unless it directly informs front-end, accessibility, assessment, or interface pedagogy

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
      under AI-assisted conditions (Trust-but-Can't-Verify / attenuated calibration).

  access:
    definition: >
      Treats accessibility as a front-end fundamental and ethical/legal design practice,
      not a late-stage compliance checklist — encoding/decoding literacy plus faculty
      self-training capacity as co-conditions.

  defer:
    definition: >
      Treats delayed or staged AI access as a scaffold to preserve productive struggle,
      planning, and metacognition (deferred assistance, planning-before-optimisation,
      solution withholding).

  critique:
    definition: >
      Uses peer, instructor, and AI-assisted review as explicit learning evidence.

  interface:
    definition: >
      Prevents the field from collapsing into website production by tracking how
      front-end concepts transfer to dashboards, application layers, IoT/robotics,
      data tools, creative systems, and immersive interfaces.

  mastery-split:
    definition: >
      Tracks Domain Mastery versus Tool Mastery as co-developing aims under boundary
      conditions (time pressure, task complexity, scaffolding norms) — process vocabulary
      for hireability-versus-durability under GenAI (Liu, Fan & Pan 2026).
```
---

## Bottom line

The amended map keeps the original architecture intact — **fundamentals as durable substrate, frameworks as volatile professional layer, AI as cognitive-risk amplifier, accessibility as hardened curriculum (and EU legal) mandate, and studio/portfolio process as the most defensible assessment signature for web education** — and adds the reframe this pass was built around: **web development is the central pedagogical substrate; front-end development is the broader disciplinary object; interface-layer thinking is the transferable competence** (§0, §9). Pass-4 corrections and additions: renamed the field to `frontend-interface-pedagogy`; added the durable-core/volatile-layer axis as its own section (§1) rather than leaving it implicit inside the frameworks debate; added §9 as an explicit, honestly-hedged cross-platform transferability section so the field does not implicitly train "front-end = websites only"; verified and integrated five new 2025–2026 AI-assisted-programming sources (Ma et al.; Sapoglu & Mohamed; Rotter, Benazet i Montobbio & Hernández-Leo; Sankaranarayanan; Oliveira et al.), all of which remain programming-general rather than web-specific; added Coverdale, Lewthwaite & Horton (2024) to broaden the accessibility-adoption evidence beyond the existing India-focused study; and caught and corrected a recurring citation misattribution (DOI `10.1145/2016911.2016937` belongs to Park & Wiedenbeck, not Dorn & Guzdial — see §14 item 10) that had resurfaced in the amendment brief driving this pass. The weakest evidence zones remain **web-specific AI offloading**, **framework-specific HE pedagogy**, **cross-platform interface-layer transferability** (§9 — now the field's largest single blank), and **3D web pedagogy**; all four should stay marked as active research blanks rather than filled rhetorically.

A follow-up pass split every `UNVERIFIED` tag into `[UNVERIFIED-GAP]` (a legitimate frontier — absence, adjacent grounding, and something actionable now) or `[UNVERIFIED-NOISE]` (a reified metaphor or ungrounded synthesis sentence — flag and discard) using the heuristic in the Evidence tags section. Of 21 substantive instances, 20 triaged as GAP — concentrated exactly in §8 and §9, i.e. the field's live frontier rather than filler — and only 1 as NOISE (the claim that "skill half-life" holds formal-construct status; it is a classroom metaphor, not a research target). That ratio is itself a quality signal about this document: because claims here were checked against real sources before being written, most of what remains "unverified" is genuine frontier, not fabrication dressed up as caution.
