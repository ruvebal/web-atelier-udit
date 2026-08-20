# Front-end curriculum gap harvest: research landscape map beyond settled AI accessibility and assessment

> **Link normalization (2026-08-16):** Opaque ChatGPT `` markers were removed because they are not portable links. DOI strings are now clickable `doi.org` links. Claims whose source has no DOI or stable URL remain human-readable but require bibliography completion before evaluator-safe use; the untouched exported source is retained as `pass1.gpt.deep-research.export.md`.

Evidence cut-off: **15 August 2026**. Confidence tags follow your requested scheme. `[UNVERIFIED-GAP]` is paired with `[UNVERIFIED]` where the search found adjacent work but no directly on-scope 2024–2026 higher-education evidence. `[PLATFORM]` marks standards/vendor/platform material rather than pedagogical research. “HE evidence” below means the technology itself is a learning object or assessed skill, not merely infrastructure used to deliver another subject.

## state_of_art_2024_2026

**Metaframework and islands architecture higher education pedagogy**

- [UNVERIFIED][UNVERIFIED-GAP] **No verifiable peer-reviewed 2024–2026 HE study was found that treats islands architecture, partial hydration, or JavaScript metaframework choice as an explicit pedagogical object.** The closest recent academic work is Joel Hassan Noor, *A Comparative Evaluation of Meta-Frameworks in Modern Web Development* (Aalto University MSc thesis, 2024), which compares Next.js, Astro and Qwik City and adds a developer survey about architectural qualities and adoption factors; it is a software-architecture evaluation, not an education study.
- [EMERGING] **The technical frontier that a future pedagogy literature would have to track is already moving beyond “SPA versus SSR” towards partial execution and resumability.** Recent technical literature describes “disappearing frameworks” as attempts to combine SPA developer ergonomics with less shipped/running client JavaScript, while Vepsäläinen and colleagues describe *resumability* as a distinct web-application primitive. Neither source evaluates student learning.
- [UNVERIFIED][UNVERIFIED-GAP] **No named research lab with a sustained 2024–2026 publication programme specifically on metaframework/islands pedagogy was verifiable in the searched SIGCSE/ITiCSE/ICER/web-engineering literature.** The identifiable activity is currently closer to web-architecture research and individual curriculum/thesis work than to a consolidated computing-education subfield.

**Progressive Web App and service worker teaching research**

- [UNVERIFIED][UNVERIFIED-GAP] **The recent literature contains PWAs used to build educational, therapeutic and accessible applications, but little evidence that service-worker lifecycle, caching, offline behaviour or installation are themselves being studied as HE learning outcomes in 2024–2026.** For example, Jiménez-Honrado et al., *Progressive Web Application for Storytelling Therapy Support* (ACM, 2024, DOI [10.1145/3657242.3658588](https://doi.org/10.1145/3657242.3658588)) is a PWA application paper rather than a web-development pedagogy study.
- [ESTABLISHED] **The strongest directly relevant computing-education precedent remains older:** Case, Steeve and Woolery, *Progressive Web Apps are a Game-Changer! Use Active Learning to Engage Students and Convert Any Website into a Mobile-Installable, Offline…* (ACM SIGCSE Technical Symposium, 2020, DOI [10.1145/3328778.3367007](https://doi.org/10.1145/3328778.3367007)). It explicitly frames PWA conversion as an active-learning activity.
- [ESTABLISHED][PLATFORM] **The practitioner curriculum remains substantially richer than the research literature.** Google’s web.dev “Learn PWA” material continues to treat installability, service workers and offline-capable application behaviour as a coherent developer skill set; that is curriculum material, not evidence of learning effectiveness.

**Web performance budgets and Core Web Vitals classroom pedagogy**

- [UNVERIFIED][UNVERIFIED-GAP] **No directly on-scope 2024–2026 HE study was found that experimentally or qualitatively studies teaching performance budgets, Lighthouse/Core Web Vitals debugging, or performance-as-a-requirement in a front-end course.** Recent academic work instead studies web performance as a measurement/engineering problem.
- [ESTABLISHED][PLATFORM] **The current technical object is well specified:** Google’s current Core Web Vitals set centres on Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift, with accompanying field/lab measurement guidance. This gives instructors a stable-enough measurement vocabulary, but it is not pedagogical evidence.
- [EMERGING] **Performance is increasingly intersecting with sustainability and AI-assisted coding research rather than forming its own education strand.** For example, *EcoAssist: Embedding Sustainability into AI-Assisted…* (ACM, 2026) explicitly connects techniques such as progressive enhancement, lazy loading and content prioritisation to resource use; it does not establish a Core Web Vitals classroom pedagogy.

**WebSocket realtime UI and stateful API literacy education**

- [EMERGING] **There is educational-platform evidence, but not yet much evidence about WebSocket mental models as the thing being learned.** Humphrys’ *Ancient Brain: A JavaScript Coding Platform for Education* (ACM, 2024) includes multi-user WebSocket-enabled programming experiences; this demonstrates curricular feasibility rather than measuring realtime/stateful API literacy.
- [UNVERIFIED][UNVERIFIED-GAP] **No 2024–2026 HE study was found that isolates concepts such as connection lifetime, message ordering, reconnection, distributed state, optimistic UI or back-pressure as assessed front-end learning outcomes.** The contemporary standards landscape is nonetheless widening: WebSocket remains the standard bidirectional browser API, while the July 2026 WebTransport specification adds multiple streams and reliable/unreliable transport options.
- [ESTABLISHED] **The research base on the technology itself is stronger than its pedagogy.** Murley et al., *WebSocket Adoption and the Landscape of the Real-Time Web* (2021, DOI [10.1145/3442381.3450063](https://doi.org/10.1145/3442381.3450063)) empirically characterises WebSocket use at web scale, providing a load-bearing systems reference for what “realtime web” means in practice.

**IoT robotics control-panel interface-layer pedagogy**

- [ESTABLISHED] **This is one of the fourteen areas where a genuine education literature already exists.** Abichandani, Sivakumar, Lobo, Iaboni and Shekhar, *Internet-of-Things Curriculum, Pedagogy, and Assessment for STEM Education: A Review of Literature* (IEEE Access 10, 2022, pp. 38351–38369, DOI [10.1109/ACCESS.2022.3164709](https://doi.org/10.1109/ACCESS.2022.3164709)) reviewed 60 K–12 and university studies and explicitly analysed curricula across sensing, networking, services and **interface** layers.
- [ESTABLISHED] **The review makes interface-layer work more precise than generic “IoT dashboards”: it places human-factors/UI–UX methods and verification in an interface layer whose distinctive purpose is contextualising interaction around embedded-device actions.** It also documents environmentally themed projects in which students build dashboards for sensor data.
- [EMERGING] **Recent HE work is moving towards browser-mediated authentic robotics environments.** Krūmiņš et al., *Open Remote Web Lab for Learning Robotics and ROS With Physical and Simulated Robots in an Authentic Developer Environment* (IEEE Transactions on Learning Technologies 17, 2024, DOI [10.1109/TLT.2024.3381858](https://doi.org/10.1109/TLT.2024.3381858)) provides browser access to physical and simulated robots and ROS tooling.
- [ESTABLISHED] **A named research group is verifiable here:** the 2022 review’s first author is affiliated with the Robotics and Data Laboratory (RADLab), New Jersey Institute of Technology.

**Python-backed dashboard and FastAPI front-end teaching**

- [EMERGING] **There is now direct SIGCSE evidence for Python-centred full-stack pedagogy.** Austin Cory Bart and Nazim Karaca, *Drafter: A Python Library for Full-Stack Web Development in CS1* (ACM SIGCSE Technical Symposium 2025), presents a Python library intended to expose full-stack web development in an introductory course; both authors were at the University of Delaware.
- [UNVERIFIED][UNVERIFIED-GAP] **FastAPI specifically remains under-mapped as a front-end teaching object.** Searches found courses/platform papers that use Python back ends and occasional curriculum descriptions mentioning Flask/FastAPI, but no strong 2024–2026 comparative study of what students learn about browser–API boundaries when FastAPI is paired with a modern front end.
- [ESTABLISHED][PLATFORM] **FastAPI’s own documentation is therefore currently technique literature rather than pedagogy:** it defines the contemporary Python/ASGI/API toolchain that such studies would be teaching, but supplies no HE learning-effect evidence.

**React Three Fiber, WebGL and shader literacy in higher education**

- [ESTABLISHED] **WebGL/shader pedagogy is real and load-bearing, even though React Three Fiber pedagogy is not.** Edward Angel and Dave Shreiner, *The Future of Teaching Computer Graphics* (ACM SIGGRAPH Educator’s Forum, 2024, DOI [10.1145/3641235.3664433](https://doi.org/10.1145/3641235.3664433)), continue a long-running graphics-education argument that graphics APIs and shader-level concepts remain appropriate objects of instruction.
- [UNVERIFIED][UNVERIFIED-GAP] **No peer-reviewed 2024–2026 HE study was found that specifically evaluates React Three Fiber as a pedagogical abstraction over Three.js/WebGL, or asks whether it improves or weakens shader/graphics-pipeline literacy.** React Three Fiber appears in technical comparisons of browser XR/3D frameworks rather than a computing-education evidence base.
- [EMERGING] **The live curricular controversy is therefore abstraction level rather than “whether graphics belongs in the curriculum”:** current SIGGRAPH education work continues to teach shader concepts while other recent graphics-education work argues for modern OpenGL 4.5/4.6 pathways.

**Web Audio API and generative-audio web pedagogy**

- [EMERGING] **Direct 2025 pedagogical research exists.** Hans Lindetorp, *A Platform for Authoring Interactive Web Audio Learning Objects* (Web Audio Conference 2025), reports a design study using WebAudioXML, Web Audio Modules and p5.js, evaluated in a workshop and semi-structured interviews with three sound/music-technology experts.
- [EMERGING] **This is stronger evidence for authoring and curriculum tooling than for student learning outcomes.** The study’s stated target is custom interactive content for local curricula, and its evaluation concerns expert assessment of authoring/learning-object design rather than a controlled HE cohort.
- [ESTABLISHED] **There is an unusually coherent active publication community:** the Web Audio Conference explicitly covers Web Audio API, WebRTC, WebSockets, JavaScript, development, design, academic/artistic research and standards; the 2025 meeting at IRCAM also included work on audio creativity, education, technical ear training and live coding.
- [ESTABLISHED][PLATFORM] **The W3C Audio Working Group remains an active standards node:** Web Audio became a Recommendation in 2021 and Web Audio 1.1 was published as a First Public Working Draft in November 2024.

**Progressive enhancement versus SPA-first curriculum evidence**

- [UNVERIFIED][UNVERIFIED-GAP] **No controlled, longitudinal or strong comparative HE evidence was found for progressive-enhancement-first versus SPA/framework-first sequencing in 2024–2026.** Contemporary web courses can be documented as teaching React alongside HTTP/API/full-stack concepts, but that is not evidence that one curricular order outperforms another. Russo, Sáenz and De Russis’ 2026 web-course study, for example, describes a React front end and Express/JSON/HTTP back end without testing progressive-enhancement sequencing.
- [ESTABLISHED][PLATFORM] **Progressive enhancement itself is not fringe terminology:** W3C material describes the web platform in terms of standards, device independence and graceful/progressive capability, while older W3C Web Standards Curriculum material explicitly teaches “graceful degradation versus progressive enhancement”.
- [UNVERIFIED][UNVERIFIED-GAP] **The missing piece is empirical curriculum comparison, not definition of the design philosophy.** The literature search surfaced progressive enhancement in web engineering and accessibility standards discourse, but not a recent HE cohort study pitting it against SPA-first instruction.

**Web-development-specific generative-AI cognitive-offloading studies**

- [EMERGING] **This is the most evidence-rich of the fourteen new blanks.** Isa et al., *From Code Generation to Conceptual Learning: Student Use of LLMs in a Web Programming Course* (CHI 2026, DOI [10.1145/3772318.3793207](https://doi.org/10.1145/3772318.3793207)) investigates organic LLM use in an advanced web-programming course rather than extrapolating from generic CS1.
- [EMERGING] **Self-regulation and offloading are being measured directly in web-programming tasks.** López-Pernas et al., *The Dynamics of the Self-Regulation Process in Student-AI…* (Koli Calling 2025, DOI [10.1145/3769994.3770043](https://doi.org/10.1145/3769994.3770043)) analyses 2,376 student–AI interactions from 120 undergraduates completing an undergraduate Web Programming assignment and explicitly frames the behaviour through self-regulated-learning/cognitive-offloading concerns.
- [EMERGING] **Advanced-web-development evidence independently converges on mixed benefit and dependency risk.** Isaac Alpizar-Chacon and Hieke Keuning, *Student’s Use of Generative AI as a Support Tool in an Advanced Web Development Course* (ITiCSE 2025, DOI [10.1145/3724363.3729106](https://doi.org/10.1145/3724363.3729106)), collected assignments, reflections, logs and a survey; students reported learning/productivity benefits but also concern about over-reliance and incorrect solutions.
- [EMERGING] **Tool-specific experimental work also exists:** Shihab et al., *The Effects of GitHub Copilot on Computing Students…* (ACM, 2025, DOI [10.1145/3702652.3744219](https://doi.org/10.1145/3702652.3744219)) includes HTML/CSS/JavaScript web-programming tasks, putting code-completion effects closer to front-end practice than generic algorithm exercises.

**Immersive WebXR accessibility education**

- [EMERGING] **XR accessibility itself advanced materially in 2026, but mainly as developer-practice research rather than education research.** Killough, Ji, Zhang, Hu, Huang, Du and Zhao, *How Well Can 3D Accessibility Guidelines Support XR Development? An Interview Study with XR Practitioners in Industry* (CHI 2026, DOI [10.1145/3772318.3790520](https://doi.org/10.1145/3772318.3790520)), interviews 25 XR practitioners and identifies mismatches between existing 3D accessibility guidance and XR’s spatial/kinesthetic interaction requirements.
- [UNVERIFIED][UNVERIFIED-GAP] **No 2024–2026 HE study was found that teaches WebXR accessibility to student developers and measures resulting accessibility knowledge or artefact quality.** Earlier WebXR educational-platform work demonstrates that browser XR can be used for teaching, but does not establish disability-accessibility pedagogy.
- [ESTABLISHED][PLATFORM] **The technical standards community is active and identifiable:** the W3C Immersive Web Working Group develops WebXR and related modules, while W3C Accessible Platform Architectures has explicitly reviewed WebXR accessibility architecture.
- [EMERGING][PLATFORM] **WebXR itself remains frontier infrastructure rather than a frozen platform:** the WebXR Device API was a W3C Candidate Recommendation Draft dated 9 June 2026, and the AR module still records unresolved Working Group issues.

**Assessing AI-assisted front-end framework artefacts with process evidence**

- [EMERGING] **A directly on-scope 2026 paper now exists:** Francesca Russo, Juan Pablo Sáenz and Luigi De Russis, *Investigating Web Project Assessment in an AI World* (CHI Extended Abstracts 2026, DOI [10.1145/3772363.3798887](https://doi.org/10.1145/3772363.3798887)), studies assessment in a web course whose front end uses React and whose back end covers Express, JSON and HTTP APIs.
- [EMERGING] **Process evidence is also becoming an explicit general HE assessment construct.** Nikolić and Basta Nikolić, *Designing AI-resilient assessment in higher education: a four-pillar conceptual framework* (Frontiers in Artificial Intelligence, 2026, DOI [10.3389/frai.2026.1841682](https://doi.org/10.3389/frai.2026.1841682)), places process documentation, oral defence, authentic tasks and transparent AI use at the centre of assessment redesign; the authors explicitly present it as conceptual rather than empirically validated.
- [EMERGING] **Front-end-specific machine evaluation is advancing faster outside pedagogy.** Zhu et al., *FrontendBench: A Benchmark for Evaluating LLMs on Front-End Development via Automatic Evaluation* (arXiv:2506.13832, 2025), supplies 148 prompt–test pairs and sandboxed interactive evaluation, reporting 90.54% agreement with expert human judgements; this is a model benchmark, not evidence that the same procedure validly measures student understanding.

**Fundamentals-first versus framework-first longitudinal web cohorts**

- [UNVERIFIED][UNVERIFIED-GAP] **No longitudinal 2024–2026 cohort study was found that compares fundamentals-first and framework-first web curricula while holding student population, assessment and exposure reasonably constant.** Recent course descriptions show blended approaches, but not causal comparison.
- [EMERGING] **Current courses do provide useful descriptive evidence of what “blended” now means:** advanced web instruction can combine HTML/CSS/JavaScript and HTTP/API concepts with React and server frameworks, while first-year programmes are also introducing front-end vocabulary and React logic. These are curriculum snapshots, not longitudinal evidence.
- [UNVERIFIED][UNVERIFIED-GAP] **No named research programme specialising in longitudinal web-framework sequencing was identifiable in the searched SIGCSE/ITiCSE/ICER literature.** The question remains largely embedded in broader web-curriculum and industry-alignment debates.

**Cross-platform interface-layer transferability education research**

- [UNVERIFIED][UNVERIFIED-GAP] **No strong 2024–2026 HE evidence was found that tests whether front-end/interface knowledge transfers across browser, native-mobile, hybrid, XR, IoT-dashboard or desktop targets.** Current search results mainly concern building cross-platform systems or mobile-learning platforms rather than measuring transfer of interface-layer competence.
- [ESTABLISHED] **There is older, directly relevant educational precedent.** Huynh and Ghimire, *Browser App Approach: Can It Be an Answer to the Challenges in Cross-Platform App Development?* (Journal of Information Technology Education: Innovations in Practice, 2017) explicitly frames cross-platform development as a challenge for developers, IS educators and students, and examines browser-based apps as an alternative to platform-specific development.
- [ESTABLISHED] **A second canonical teaching strand is mobile cross-platform programming:** Muyan-Özçelik, *A Hands-On Cross-Platform Mobile Programming…* (2017) and earlier ACM mobile-development education papers treat platform choice and cross-platform tooling as curricular questions, but they do not operationalise “interface-layer transferability” in the learning-sciences sense.

## foundational_canonical

**Metaframework and islands architecture higher education pedagogy**

- [EMERGING] **There is not yet a stable pedagogical canon; the load-bearing technical background is the shift from client-heavy SPA architectures towards partial hydration/resumability.** *The Rise of Disappearing Frameworks in Web Development* (2023) is a useful academic-facing statement of that architectural movement, while Noor’s 2024 thesis supplies a comparative Next.js/Astro/Qwik framing.
- [ESTABLISHED][PLATFORM] **Astro’s “islands” documentation is a primary platform source for the concrete pattern now meant by islands architecture.** It should be treated as framework documentation rather than evidence about how the concept should be taught.

**Progressive Web App and service worker teaching research**

- [ESTABLISHED] **Case, Steeve and Woolery’s SIGCSE 2020 PWA active-learning paper is the clearest canonical computing-education reference located**, DOI [10.1145/3328778.3367007](https://doi.org/10.1145/3328778.3367007). Its importance here is precisely that the 2024–2026 search did not surface a comparably direct successor.
- [ESTABLISHED][PLATFORM] **The durable technical foundation is the PWA/service-worker model documented by the web platform rather than any single framework.** Current “Learn PWA” material continues to organise the topic around installability and offline-capable behaviour.

**Web performance budgets and Core Web Vitals classroom pedagogy**

- [ESTABLISHED][PLATFORM] **Core Web Vitals is the current canonical performance vocabulary for user-facing web experience measurement**, with LCP, INP and CLS as the headline metrics.
- [UNVERIFIED][UNVERIFIED-GAP] **No comparably canonical academic reference for “performance-budget pedagogy” was located.** “Performance budget” is well established in practitioner practice, but the searched computing-education venues did not yield a foundational experimental teaching paper comparable to the PWA SIGCSE paper. The nearest recent scholarship studies performance measurement itself.

**WebSocket realtime UI and stateful API literacy education**

- [ESTABLISHED][PLATFORM] **The protocol/API foundation remains the WebSocket standard:** the W3C’s 2011 API defines two-way communication from web pages to a remote host, while the current WebSocket standard continues the connection/message model.
- [ESTABLISHED] **Murley et al., *WebSocket Adoption and the Landscape of the Real-Time Web* (2021, DOI [10.1145/3442381.3450063](https://doi.org/10.1145/3442381.3450063)) is a load-bearing empirical systems reference** for real-world adoption and deployment patterns.
- [UNVERIFIED][UNVERIFIED-GAP] **No equivalent canonical paper on teaching stateful browser communication was found.** Educational uses such as Ancient Brain come later and use WebSockets as an enabling mechanism rather than studying learner misconceptions.

**IoT robotics control-panel interface-layer pedagogy**

- [ESTABLISHED] **Abichandani et al. 2022 is the canonical map for this intersection because it explicitly decomposes IoT education into sensing, networking, service and interface layers**, DOI [10.1109/ACCESS.2022.3164709](https://doi.org/10.1109/ACCESS.2022.3164709).
- [ESTABLISHED] **Its interface-layer framing is particularly load-bearing for your scope:** it prevents “IoT pedagogy” from collapsing into electronics/networking and makes UI/UX, embedded actions and dashboard interaction visible as curricular content.
- [EMERGING] **Krūmiņš et al. 2024 is becoming a useful canonical reference for browser-mediated authentic robotics laboratories**, DOI [10.1109/TLT.2024.3381858](https://doi.org/10.1109/TLT.2024.3381858).

**Python-backed dashboard and FastAPI front-end teaching**

- [EMERGING] **The subfield is too young for a settled FastAPI-specific canon.** Bart and Karaca’s *Drafter* paper at SIGCSE 2025 is presently the clearest direct academic reference for deliberately reducing the front/back language boundary by teaching full-stack web development through Python.
- [ESTABLISHED][PLATFORM] **FastAPI documentation is canonical for the technical API framework but not for pedagogy.** It should therefore be cited separately from evidence about learning.
- [UNVERIFIED][UNVERIFIED-GAP] **No older load-bearing study was found that demonstrates whether a Python-backed dashboard sequence improves later front-end/browser understanding relative to a JavaScript-first or polyglot sequence.**

**React Three Fiber, WebGL and shader literacy in higher education**

- [ESTABLISHED] **Edward Angel, *The Case for Teaching Computer Graphics with WebGL: A 25-Year Perspective* (IEEE Computer Graphics and Applications 37(2), 2017, pp. 106–112, DOI [10.1109/MCG.2017.26](https://doi.org/10.1109/MCG.2017.26)) remains the key canonical pedagogical reference.**
- [ESTABLISHED] **Angel and Shreiner’s 2024 SIGGRAPH Educator’s Forum piece shows that this lineage remains active rather than merely historical.**
- [UNVERIFIED][UNVERIFIED-GAP] **React Three Fiber has not yet acquired a corresponding education canon.** Its scholarly visibility is mainly as a technical layer in browser 3D/XR implementations.

**Web Audio API and generative-audio web pedagogy**

- [ESTABLISHED][PLATFORM] **The Web Audio API Recommendation (W3C, 17 June 2021) is the technical foundation:** it defines a browser audio-routing graph of connected `AudioNode`s for processing and synthesis.
- [ESTABLISHED] **Hongchan Choi and Jonathan Berger’s WAAX work at NIME 2013 is an early canonical web-audio/music-computing reference**, while the NIME archive supplies a continuing peer-reviewed community around new musical interfaces and browser music systems.
- [ESTABLISHED] **Freeman et al.’s EarSketch work is load-bearing for code-plus-music pedagogy.** The 2019 *Communications of the ACM* account describes a browser environment in which programming and music creation are joined through web audio technologies.
- [EMERGING] **Lindetorp 2025 extends that lineage from learner environments to educator-authored Web Audio Learning Objects.**

**Progressive enhancement versus SPA-first curriculum evidence**

- [ESTABLISHED][PLATFORM] **Progressive enhancement has a much older conceptual canon than the current framework debate.** W3C’s Web Standards Curriculum explicitly includes “graceful degradation versus progressive enhancement” and the separation of HTML, CSS and JavaScript responsibilities.
- [ESTABLISHED] **“Learning JavaScript” (ACM, 2013) is a useful education-era reference because it explicitly uses progressive enhancement to separate behavioural JavaScript from the other web-design layers.**
- [ESTABLISHED] **Connolly et al., *Facing Backwards While Stumbling Forwards* (ACM, 2019) is load-bearing for the larger curriculum problem:** it argues that university web-development education and rapidly changing professional practice are poorly aligned.

**Web-development-specific generative-AI cognitive-offloading studies**

- [ESTABLISHED] **The immediate prehistory comes from general programming-education studies of generated explanations and LLM assistance.** MacNeil et al., *Experiences from Using Code Explanations Generated by Large Language Models in a Web Software Development E-Book* (ACM, 2023) is especially relevant because the instructional context itself is web software.
- [EMERGING] **For genuinely web-specific AI behaviour, the canonical set is now forming around Alpizar-Chacon & Keuning 2025, López-Pernas et al. 2025 and Isa et al. 2026.** Collectively they move the literature from “can an LLM generate code?” towards logs, self-regulation, use patterns and conceptual learning in web courses.

**Immersive WebXR accessibility education**

- [ESTABLISHED][PLATFORM] **The canonical platform reference is the WebXR Device API maintained by the W3C Immersive Web Working Group.** Its purpose is cross-device browser access to XR hardware and interaction capabilities.
- [ESTABLISHED][PLATFORM] **Accessibility has been present at architecture-review level for years:** W3C APA material documents WebXR accessibility review and the broader “WebXR Standards and Accessibility Architecture Issues” work.
- [EMERGING] **Killough et al. 2026 is now the key empirical accessibility reference because it tests existing 3D guidance against actual XR practitioner experience rather than merely restating guidelines.**
- [UNVERIFIED][UNVERIFIED-GAP] **There is still no equivalent canonical WebXR-accessibility *education* paper located.**

**Assessing AI-assisted front-end framework artefacts with process evidence**

- [EMERGING] **A front-end-specific canon is only beginning to form in 2026.** Russo, Sáenz and De Russis’ CHI EA paper is the first directly on-scope source located in this pass, DOI [10.1145/3772363.3798887](https://doi.org/10.1145/3772363.3798887).
- [ESTABLISHED] **The broader conceptual foundation is authentic/project-based assessment in which evidence extends beyond a final deliverable.** Zheng et al.’s 2024 work on AI in project-based learning explicitly considers AI-use data as possible assessment material, providing a bridge to interaction traces and process evidence.
- [EMERGING] **FrontendBench is a useful technical counterpoint rather than an educational canon:** it shows how functional browser interaction can be automatically tested, but educational validity cannot be inferred from benchmark validity.

**Fundamentals-first versus framework-first longitudinal web cohorts**

- [ESTABLISHED] **Connolly et al. 2019 remains the load-bearing curriculum reference because it identifies the web-development curriculum/industry mismatch that motivates sequencing debates.**
- [ESTABLISHED] **Earlier JavaScript teaching work supplies a fundamentals-oriented lineage in which HTML structure, styling and behavioural JavaScript are separable conceptual layers.**
- [UNVERIFIED][UNVERIFIED-GAP] **No canonical longitudinal head-to-head study of framework-first versus fundamentals-first cohorts was located; claims on either side therefore rest more on curriculum philosophy and practitioner experience than on longitudinal causal evidence.**

**Cross-platform interface-layer transferability education research**

- [ESTABLISHED] **Huynh and Ghimire’s 2017 JITE work is the clearest canonical browser-based cross-platform education reference located.** It explicitly names “browser-based apps”, “cross-platform web app”, “WORA” and “hybrid development framework” as its conceptual vocabulary.
- [ESTABLISHED] **Older mobile-computing education papers establish platform choice as a curricular problem rather than only an industry problem.** ACM work such as *Smart smartphone development: iOS versus Android* (2011) describes an active education debate over platform and software choice.
- [UNVERIFIED][UNVERIFIED-GAP] **What is missing from that canon is a modern learning-sciences operationalisation of transfer:** whether conceptual knowledge acquired in one UI/runtime stack transfers to another, and over what time scale, was not directly tested in the sources found.

## open_problems

**Metaframework and islands architecture higher education pedagogy**

- [UNVERIFIED][UNVERIFIED-GAP] **No field-authored 2024–2026 education paper was found that explicitly formulates the core pedagogy question—what students understand or misunderstand when rendering, routing, hydration and state are split across server/client boundaries.** Existing work identifies learnability and extensibility as framework-adoption factors but does not turn them into measured learning outcomes. Noor 2024 is the nearest source.
- [EMERGING] **The technical field itself flags architectural instability:** disappearing-framework/resumability work argues that the conventional fully hydrated SPA is not the endpoint of web architecture. That leaves any curriculum tied to one hydration model exposed to rapid conceptual churn.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no verified study was found comparing learner transfer from framework-specific concepts such as Astro islands or Qwik resumability to general browser/server architectural reasoning.

**Progressive Web App and service worker teaching research**

- [UNVERIFIED][UNVERIFIED-GAP] **The field has not produced a recent empirical answer to whether students can reason correctly about service-worker lifecycle, cache invalidation, offline failure, version activation and network fallback after an instructional intervention.** The 2020 SIGCSE activity demonstrates a teaching pattern but not a mature misconception/transfer literature.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no verifiable 2024–2026 paper in the searched computing-education venues explicitly identifies which PWA concepts persist after the assignment or transfer to ordinary web reliability work. Recent PWA papers are primarily application-development studies.

**Web performance budgets and Core Web Vitals classroom pedagogy**

- [UNVERIFIED][UNVERIFIED-GAP] **No recent HE paper was found that explicitly asks whether performance metrics become durable engineering judgement rather than “make Lighthouse green” checklist behaviour.** The standards/tool literature defines what to measure but not how novices conceptualise causality between code, loading, rendering and user experience.
- [EMERGING] **Metric evolution is an explicit moving target for the field:** current Core Web Vitals use INP alongside LCP and CLS, so curriculum studies that encode a fixed metric set can become stale independently of the deeper performance concepts they intend to teach.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no controlled comparison was found between teaching a numeric performance budget, teaching underlying browser/network mechanisms, or combining the two.

**WebSocket realtime UI and stateful API literacy education**

- [UNVERIFIED][UNVERIFIED-GAP] **The unresolved education question is not WebSocket syntax but stateful/distributed reasoning, and no source found explicitly measures that construct in HE web students.** Existing education platforms demonstrate realtime interaction without isolating connection-state or distributed-state understanding.
- [EMERGING][PLATFORM] **The underlying technology space is widening rather than simplifying:** WebTransport explicitly adds multiple streams, unidirectional streams, out-of-order delivery and reliable/unreliable modes relative to WebSocket. That makes “realtime API literacy” a broader construct than learning one socket API.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no study located compares student reasoning about polling, Server-Sent Events, WebSocket and newer transports as architectural alternatives.

**IoT robotics control-panel interface-layer pedagogy**

- [ESTABLISHED] **The IoT-education literature itself identifies future-research needs rather than treating curriculum as solved.** Abichandani et al. explicitly devote part of their review to challenges, mitigation strategies and future IoT-education research after mapping curricula and assessment across the four layers.
- [EMERGING] **Recent remote-lab work keeps “authentic developer environment” as an explicit design concern.** Krūmiņš et al. frame browser access to physical/simulated robots in relation to authentic ROS development rather than merely simulation convenience, leaving authenticity and transfer central to evaluation.
- [UNVERIFIED][UNVERIFIED-GAP] **The interface-specific blank remains narrower:** no 2024–2026 study found isolates dashboard/control-panel design, feedback latency, command safety, mode awareness or error recovery from the larger robotics/IoT course and measures those as interface-layer learning outcomes.

**Python-backed dashboard and FastAPI front-end teaching**

- [EMERGING] **Drafter opens rather than closes the main research question: how much web-system complexity should be exposed in CS1.** Its existence shows active interest in making full-stack web artefacts accessible through Python, but the 2025 evidence does not constitute a longitudinal comparison with conventional HTML/CSS/JavaScript-plus-back-end pathways.
- [UNVERIFIED][UNVERIFIED-GAP] **No source located explicitly resolves whether Python-native abstractions improve motivation/productivity while weakening—or preserving—knowledge of HTTP, DOM, browser execution and front/back separation.** No verifiable source found for that outcome claim; it remains a blank rather than a conclusion.
- [UNVERIFIED][UNVERIFIED-GAP] **FastAPI-specific blank to update:** no robust HE evidence found for teaching asynchronous endpoints, schema generation and client API consumption as a joined front-end learning sequence.

**React Three Fiber, WebGL and shader literacy in higher education**

- [ESTABLISHED] **Graphics educators continue to flag the abstraction-level question.** Angel and Shreiner’s 2024 position keeps API choice and enduring graphics concepts in view, while modern-OpenGL teaching work provides an alternative to browser-first WebGL.
- [UNVERIFIED][UNVERIFIED-GAP] **No evidence found answers whether a React declarative scene abstraction helps or harms students’ mental models of transforms, buffers, shader stages, coordinate systems and the GPU pipeline.** React Three Fiber has not yet been subjected to that pedagogical comparison.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no longitudinal evidence was found on transfer from React Three Fiber/Three.js to raw WebGL, GLSL or another graphics API.

**Web Audio API and generative-audio web pedagogy**

- [EMERGING] **Lindetorp explicitly identifies authoring friction as unresolved:** educators wanting local, custom interactive audio material face substantial audio-programming skill and time requirements.
- [EMERGING] **The evaluators in that study explicitly asked for a graphical WALO authoring tool and more detailed control over student-challenge settings.** These are field-reported future-design needs, not inferred gaps.
- [UNVERIFIED][UNVERIFIED-GAP] **The student-learning blank remains larger than the authoring blank:** the 2025 study does not establish whether browser synthesis improves DSP, auditory, creative-coding or generative-composition learning compared with desktop/native environments.

**Progressive enhancement versus SPA-first curriculum evidence**

- [ESTABLISHED] **The older web-education literature explicitly flags curriculum–practice mismatch as a persistent problem.** Connolly et al. 2019 is the clearest source for that unresolved alignment problem.
- [UNVERIFIED][UNVERIFIED-GAP] **What the field has not supplied is the crucial comparative evidence:** no recent study found tests whether beginning with semantic documents/progressive enhancement yields stronger debugging, accessibility, performance or transfer outcomes than starting in a component/SPA framework.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no study found separates the effect of *sequencing* from the effect of *content coverage*—for example, two cohorts ultimately learning the same HTML/CSS/JS/React material but in opposite orders.

**Web-development-specific generative-AI cognitive-offloading studies**

- [EMERGING] **Over-reliance is explicitly field-reported rather than speculative.** Alpizar-Chacon and Keuning’s advanced-web students reported concern about dependence on GenAI and incorrect solutions, alongside perceived gains in learning and productivity.
- [EMERGING] **The literature is now asking process questions rather than only output-quality questions.** López-Pernas et al.’s interaction-log study analyses how students regulate their work with AI over a web-programming assignment, directly exposing when and how cognitive work is delegated.
- [EMERGING] **Conceptual learning after code generation remains unresolved enough to be an explicit 2026 research target.** Isa et al.’s title—*From Code Generation to Conceptual Learning*—and learning-science framing signal that successful task completion cannot be treated as proof of conceptual acquisition.
- [EMERGING] **Prompting literacy itself is unsettled:** Alpizar-Chacon and Keuning report that students wanted more training in prompting strategies, meaning “AI literacy” cannot yet be assumed merely because experienced programmers use the tools frequently.

**Immersive WebXR accessibility education**

- [EMERGING] **Killough et al. explicitly identify design gaps between existing 3D accessibility guidance and XR’s interaction requirements.** Their 25-practitioner study finds implementation barriers around XR-specific spatial and kinesthetic interactions and argues for XR-appropriate guidance/support tools.
- [ESTABLISHED][PLATFORM] **Accessibility architecture is also unfinished at standards level.** W3C’s WebXR accessibility pages record review questions around alternative media and XR architecture rather than presenting the accessibility problem as closed.
- [UNVERIFIED][UNVERIFIED-GAP] **Education blank to update:** no source found tests whether students can apply emerging XR accessibility principles while implementing WebXR interactions, or whether accessibility instruction transfers between conventional 2D web interfaces and immersive scenes.

**Assessing AI-assisted front-end framework artefacts with process evidence**

- [EMERGING] **Empirical validation is an explicit unresolved problem in the general process-assessment literature.** Nikolić and Basta Nikolić describe their 2026 four-pillar model as conceptual rather than empirically validated.
- [EMERGING] **Front-end automatic evaluation has its own explicitly stated benchmark problem:** Zhu et al. argue that prior LLM coding benchmarks use overly simple tasks, weak test cases and inadequate end-to-end validation, motivating FrontendBench’s interactive browser tests.
- [EMERGING] **Educational validity remains separate from technical validity.** FrontendBench’s reported 90.54% human–automatic agreement concerns correctness evaluation of generated front-end artefacts; it does not show that the score distinguishes student understanding from AI-mediated production.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no mature study found establishes which combination of commit history, prompt/response traces, debugging logs, oral explanation and final artefact yields reliable front-end learning evidence without over-weighting tool-use style. Russo et al. 2026 marks the issue’s arrival in web-project assessment rather than its resolution.

**Fundamentals-first versus framework-first longitudinal web cohorts**

- [UNVERIFIED][UNVERIFIED-GAP] **The central longitudinal question remains empirically unanswered in the literature found.** Contemporary course descriptions establish that both fundamentals and frameworks are taught; they do not tell us whether ordering changes retention, debugging transfer or employability.
- [ESTABLISHED] **Curricular currency is itself an explicitly recognised problem:** Connolly et al. document the difficulty of aligning web-development education with rapidly changing professional practice.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no multi-year follow-up was found comparing what graduates retain after framework churn when their initial education was framework-centred versus standards/fundamentals-centred.

**Cross-platform interface-layer transferability education research**

- [ESTABLISHED] **Older cross-platform education literature explicitly frames platform proliferation as a learning problem for educators and students.** Huynh and Ghimire ask how developers and IS learners can acquire skills for apps that run across platforms.
- [UNVERIFIED][UNVERIFIED-GAP] **What remains missing is transfer measurement:** the sources found do not test whether learning interface state, event handling, component composition or networking in one platform reduces learning cost on another.
- [UNVERIFIED][UNVERIFIED-GAP] **Blank to update:** no 2024–2026 study located compares browser → React Native/mobile, browser → WebXR, browser → IoT control UI, or comparable interface-layer transfer paths using pre/post or delayed-transfer measures.

## adjacent_terminology

**Metaframework and islands architecture higher education pedagogy**

- [ESTABLISHED] **Durable terminology:** `SSR`, `SSG`, `CSR`, routing, hydration and client/server rendering boundaries are sharper long-lived terms than “modern framework pedagogy”, because they describe architectural behaviours rather than products. Noor’s comparison explicitly structures Next.js/Astro/Qwik around rendering and architectural factors.
- [EMERGING] **Frontier terminology:** `partial hydration`, `islands architecture`, `resumability` and `disappearing frameworks` better capture the current research frontier than simply “metaframeworks”.

**Progressive Web App and service worker teaching research**

- [ESTABLISHED][PLATFORM] **Durable terminology:** `service worker lifecycle`, `offline-first`, `installability`, caching strategy and network fallback are more precise educational constructs than “PWA skills”.
- [EMERGING][PLATFORM] **Frontier terminology:** capabilities such as background/push behaviour and increasingly “capable web” APIs sit in a broader web-application-capabilities discourse rather than belonging uniquely to the PWA label.

**Web performance budgets and Core Web Vitals classroom pedagogy**

- [ESTABLISHED][PLATFORM] **Durable terminology:** `web performance engineering`, `performance budget`, `lab measurement`, `field/RUM measurement`, critical rendering/loading behaviour and responsiveness are more durable than any one metric name. Current Core Web Vitals documentation distinguishes the measurement layer from the larger optimisation problem.
- [EMERGING][PLATFORM] **Frontier terminology:** `Interaction to Next Paint (INP)` belongs in the fast-moving layer; the broader concept—interaction responsiveness—is more durable than the particular metric.

**WebSocket realtime UI and stateful API literacy education**

- [ESTABLISHED] **Durable terminology:** `event-driven programming`, `bidirectional messaging`, `connection state`, `distributed state`, `publish/subscribe` and `realtime web` are sharper conceptual labels than “WebSocket teaching”. The empirical WebSocket literature itself uses “real-time web” as the larger domain.
- [EMERGING][PLATFORM] **Frontier terminology:** `WebTransport`, multiplexed streams and reliable/unreliable browser transport increasingly widen the relevant literacy beyond sockets.

**IoT robotics control-panel interface-layer pedagogy**

- [ESTABLISHED] **Durable terminology:** `IoT interface layer`, `human–robot interaction`, `teleoperation`, `remote laboratory`, `cyber-physical systems`, `UI/UX for embedded-device actions` and `human factors` are all sharper than generic “robotics dashboard”. Abichandani et al.’s four-layer model directly supports “interface-layer curriculum” as an academic term.
- [EMERGING] **Frontier terminology:** browser-mediated `authentic developer environments` and remote/physical–simulated robotics laboratories capture recent work such as Krūmiņš et al. more precisely than “IoT web UI”.

**Python-backed dashboard and FastAPI front-end teaching**

- [ESTABLISHED] **Durable terminology:** `full-stack web development`, HTTP/API literacy, client–server architecture, server-side rendering and REST-style API consumption are more stable academic constructs than “FastAPI teaching”.
- [EMERGING] **Frontier terminology:** `Python-native full-stack` or `single-language full-stack pedagogy` more accurately names the instructional move represented by Drafter; FastAPI/ASGI are implementation choices within that larger design space.

**React Three Fiber, WebGL and shader literacy in higher education**

- [ESTABLISHED] **Durable terminology:** `computer-graphics pipeline`, `shader programming`, `GLSL`, transformations, rasterisation and GPU programming are the educational fundamentals beneath any Three.js/React layer. Angel’s 2017 and Angel–Shreiner’s 2024 work foreground this conceptual layer.
- [EMERGING] **Frontier terminology:** `declarative 3D`, `scene-graph abstraction`, React Three Fiber and browser XR/3D framework interoperability describe the fast-moving library layer.

**Web Audio API and generative-audio web pedagogy**

- [ESTABLISHED][PLATFORM] **Durable terminology:** `audio graph`, digital signal processing, synthesis, audio-rate/control-rate processing, computer music and interactive music systems are more durable than a specific JavaScript library. The Web Audio specification itself centres on an audio-routing graph.
- [EMERGING] **Frontier terminology:** `Web Audio Learning Object (WALO)`, WebAudioXML (`WAXML`) and Web Audio Modules (`WAM`) precisely name the current pedagogical-authoring strand.
- [ESTABLISHED] **`creative coding`, `live coding` and `computational music` are useful adjacent education literatures**, with NIME and WAC serving as specialist venues.

**Progressive enhancement versus SPA-first curriculum evidence**

- [ESTABLISHED][PLATFORM] **Durable terminology:** `progressive enhancement`, `graceful degradation`, `semantic HTML`, `unobtrusive JavaScript` and `standards-based web development` are the specialist vocabulary already embedded in W3C curriculum material.
- [EMERGING] **Frontier terminology:** the modern architecture discussion often appears instead under `disappearing frameworks`, server rendering, partial hydration and resumability; searching only “progressive enhancement vs SPA” will therefore miss part of the contemporary debate.

**Web-development-specific generative-AI cognitive-offloading studies**

- [ESTABLISHED] **Durable terminology:** `cognitive offloading`, `self-regulated learning`, metacognition and help-seeking are sharper learning-sciences terms than generic “AI dependence”. López-Pernas et al. explicitly analyse web-programming AI use through self-regulation.
- [EMERGING] **Frontier terminology:** `AI-assisted programming`, `student–AI interaction traces`, prompt strategies, AI-mediated debugging and conceptual learning after code generation now name the web-specific research questions more precisely.

**Immersive WebXR accessibility education**

- [ESTABLISHED] **Durable terminology:** `XR accessibility`, inclusive immersive interaction, multimodal interaction, spatial interaction and assistive access are more robust research labels than “accessible WebXR”.
- [EMERGING][PLATFORM] **Frontier terminology:** `WebXR DOM overlays`, WebXR AR modules and device-independent immersive web are part of the standards layer in which accessibility questions now arise.
- [ESTABLISHED][PLATFORM] **`Immersive Web` is itself the W3C’s durable umbrella term for the open-web XR platform and its working/community groups.**

**Assessing AI-assisted front-end framework artefacts with process evidence**

- [ESTABLISHED] **Durable terminology:** `authentic assessment`, `process evidence`, oral defence, project-based assessment and assessment validity are sharper than “AI-proof assessment”. The 2026 Frontiers framework explicitly organises several of these constructs.
- [EMERGING] **Frontier terminology:** `AI interaction logs/traces`, provenance, debugging traces, code-iteration history and browser-executed functional evaluation increasingly describe the evidence layer.
- [EMERGING] **For model-generated front ends, `visual-interactive code-generation evaluation` and executable/sandboxed front-end benchmarking are a rapidly developing adjacent research vocabulary.**

**Fundamentals-first versus framework-first longitudinal web cohorts**

- [ESTABLISHED] **Durable terminology:** `instructional sequencing`, scaffolding, conceptual foundations, transfer of learning and curriculum–industry alignment are academically stronger search terms than “vanilla-first”.
- [UNVERIFIED] **`framework-first` and `fundamentals-first` are useful descriptive labels but do not appear to constitute a mature named research dichotomy in the HE literature found.** Practitioner sources use the contrast more explicitly than peer-reviewed computing-education work.

**Cross-platform interface-layer transferability education research**

- [ESTABLISHED] **Durable terminology:** `transfer of learning`, `cross-platform application development`, `platform independence`, `write once, run anywhere (WORA)` and hybrid/browser-based app development are the closest established literatures.
- [UNVERIFIED] **“Interface-layer transferability” itself does not appear to be a settled specialist term in the sources found.** For future searches, it maps more closely to transfer of learning across programming environments/platforms than to the software-engineering phrase “cross-platform” alone. The older literature measures development approach more often than cognitive transfer.
- [ESTABLISHED][PLATFORM] **The web’s device/platform independence is a relevant technical foundation:** W3C explicitly characterises the browser platform as cross-device and operating-system independent.

## critiques_controversies

**Metaframework and islands architecture higher education pedagogy**

- [EMERGING] **The strongest critique is framework churn itself.** “Disappearing frameworks” research argues that the architectural target is actively shifting away from conventional fully client-executed SPAs; a course evaluated against today’s framework taxonomy may therefore be studying a transient abstraction rather than a durable concept.
- [EMERGING] **The available empirical base is also methodologically thin for education claims.** Noor’s 2024 work is a single MSc thesis combining framework comparison and a developer survey; it can ground technical distinctions but not claims about student learning or curricular superiority.
- [UNVERIFIED][UNVERIFIED-GAP] **Accordingly, claims that islands/resumability are inherently “better to teach” are currently unverified.** No comparative student-outcome source was found.

**Progressive Web App and service worker teaching research**

- [ESTABLISHED] **The early education literature itself carried strong promotional framing—Case et al.’s title calls PWAs a “Game-Changer”—but the evidence base did not subsequently expand into a large comparative HE literature.** The appropriate reading is therefore an instructional experience/active-learning precedent, not consensus that PWA teaching produces superior outcomes.
- [UNVERIFIED][UNVERIFIED-GAP] **There is a methodological risk of conflating “students successfully built an installable/offline app” with durable understanding of service-worker failure modes.** No verifiable study located tests delayed retention or transfer of those concepts.

**Web performance budgets and Core Web Vitals classroom pedagogy**

- [ESTABLISHED][PLATFORM] **Core Web Vitals should not be treated as timeless fundamentals: the current metric set is a maintained platform construct.** Teaching the deeper concepts of loading, responsiveness and layout stability is therefore analytically distinct from teaching a particular dashboard score.
- [UNVERIFIED][UNVERIFIED-GAP] **No evidence found supports the common curricular leap from “metric compliance” to “performance literacy”.** The recent research base measures sites and optimisation outcomes, not whether students can causally explain performance behaviour after optimisation tooling has guided them.
- [EMERGING] **Sustainability research further complicates performance-as-a-single-score narratives:** techniques can be discussed in terms of energy/resource use as well as user-experience metrics.

**WebSocket realtime UI and stateful API literacy education**

- [ESTABLISHED] **“WebSocket literacy” risks being too protocol-specific.** The real-time-web literature documents WebSocket as one deployed mechanism, while current standards introduce WebTransport with materially different stream and reliability semantics.
- [UNVERIFIED][UNVERIFIED-GAP] **Educational uses of WebSockets should not be mistaken for evidence that students learn distributed-state reasoning.** Ancient Brain demonstrates an environment in which multi-user socket applications can be made, but does not establish a validated learning progression for stateful APIs.

**IoT robotics control-panel interface-layer pedagogy**

- [ESTABLISHED] **A central critique of overly broad “IoT education” claims is already answered by the Abichandani review’s layer model:** sensing, networking, services and interface learning are not interchangeable outcomes. Studies evaluating an entire IoT project cannot automatically substantiate interface-layer learning.
- [EMERGING] **Remote-lab research is also sensitive to what counts as authentic practice.** Krūmiņš et al. explicitly foreground an “authentic developer environment”; this signals that convenient browser access alone is not considered sufficient to claim authentic robotics skill development.
- [UNVERIFIED][UNVERIFIED-GAP] **The interface-specific evidence remains underpowered relative to whole-system project evidence.** No source found cleanly attributes learning gains to the control-panel/interface portion of a robotics exercise rather than the robotics/ROS activity as a whole.

**Python-backed dashboard and FastAPI front-end teaching**

- [EMERGING] **The pedagogical attraction of a single-language stack creates an unresolved abstraction trade-off.** Drafter deliberately makes full-stack web work accessible in CS1, but its 2025 publication does not establish whether later transfer to ordinary multi-language browser/server stacks is equivalent.
- [UNVERIFIED] **It would therefore be premature to claim either that Python-first full-stack instruction “hides too much web” or that it “reduces only accidental complexity”.** No comparative longitudinal source found settles either position.
- [UNVERIFIED][UNVERIFIED-GAP] **FastAPI hype and production popularity cannot substitute for curriculum evidence.** In this map it remains `[PLATFORM]` technology until a learner-outcome literature appears.

**React Three Fiber, WebGL and shader literacy in higher education**

- [ESTABLISHED] **There is a genuine within-field abstraction/API controversy.** Angel’s WebGL-first argument treats browser graphics as an appropriate teaching vehicle; contemporary work advocating OpenGL 4.5/4.6 demonstrates that graphics educators do not agree on a single API path.
- [ESTABLISHED] **The more durable consensus is around graphics concepts and shader reasoning, not a particular library.** Angel and Shreiner’s 2024 contribution continues to frame graphics education around conceptual content amid changing APIs.
- [UNVERIFIED][UNVERIFIED-GAP] **Claims that React Three Fiber is a superior introductory graphics pedagogy are unsupported by the literature found.** Its abstraction benefits are presently practitioner/technical claims, not demonstrated HE learning effects.

**Web Audio API and generative-audio web pedagogy**

- [EMERGING] **The field itself pushes back against the idea that browser delivery automatically makes specialist audio authoring easy.** Lindetorp reports that creating custom Web Audio learning material can demand substantial audio-programming expertise and production time.
- [ESTABLISHED][PLATFORM] **Conversely, the underlying API is no longer reasonably characterised as merely experimental browser technology:** Web Audio has been a W3C Recommendation since 2021 and is broadly deployed. The frontier is therefore pedagogy/authoring and higher-level tooling, not basic legitimacy of browser audio.
- [UNVERIFIED][UNVERIFIED-GAP] **There is insufficient evidence to claim that web delivery itself improves generative-audio learning relative to native DAWs or creative-coding environments.** The current WALO study does not make that comparison.

**Progressive enhancement versus SPA-first curriculum evidence**

- [ESTABLISHED] **The controversy is heavily normative and weakly comparative.** Progressive enhancement has durable standards-based arguments behind it, while contemporary HE courses demonstrably use React/full-stack architectures; the searched literature does not adjudicate the two pedagogies with matched cohorts.
- [ESTABLISHED] **Connolly et al.’s critique cautions against curricula lagging professional web practice, but that critique does not logically imply “framework-first”.** It establishes an alignment problem, not a preferred instructional sequence.
- [UNVERIFIED][UNVERIFIED-GAP] **Claims on either side that one sequence is inherently more “fundamental”, employable or future-proof should therefore be treated as unverified unless tied to outcomes.** No such comparative 2024–2026 HE outcome study was located.

**Web-development-specific generative-AI cognitive-offloading studies**

- [EMERGING] **The evidence rejects both simple hype and simple prohibition narratives.** Advanced web students report perceived learning/productivity benefits while simultaneously reporting incorrect AI solutions and concern over dependence.
- [EMERGING] **Methodological pushback is moving towards behaviour traces because self-report alone cannot show where cognitive work moved.** López-Pernas et al.’s 2,376 interaction records and Isa et al.’s course-level usage data represent this shift towards process evidence.
- [EMERGING] **Task completion is increasingly treated as an inadequate proxy for learning.** The CHI 2026 study explicitly frames its question as movement from code generation towards conceptual learning.
- [EMERGING] **The present evidence is nevertheless still recent and context-sensitive.** Alpizar-Chacon and Keuning is an experience report in an advanced course; Isa et al. concerns a particular web-programming setting. Neither warrants a universal claim about all front-end learners.

**Immersive WebXR accessibility education**

- [EMERGING] **The strongest current critique is that ordinary 3D accessibility guidance does not cleanly transfer to XR.** Killough et al. find fundamental mismatches associated with XR-specific spatial tracking and kinesthetic interaction, despite substantial agreement around existing 3D guidance.
- [EMERGING] **This directly challenges checklist-style accessibility claims for immersive work:** the authors argue that guidelines are more useful as design/“transformation” catalysts than simple compliance lists and call for support suited to XR’s distinctive constraints.
- [UNVERIFIED][UNVERIFIED-GAP] **A course claiming to “teach accessible WebXR” solely by importing conventional web-accessibility or 3D-game checklists would therefore outrun the current evidence.** No HE validation of that transfer was found.

**Assessing AI-assisted front-end framework artefacts with process evidence**

- [EMERGING] **The main methodological controversy is construct validity: a good artefact is increasingly weak evidence of unaided understanding.** Russo, Sáenz and De Russis’ *Investigating Web Project Assessment in an AI World* makes that problem explicit in a real web-course context.
- [EMERGING] **The opposite extreme—assuming more process data automatically means more valid assessment—is also not established.** Nikolić and Basta Nikolić explicitly acknowledge that their process-oriented framework still requires empirical validation.
- [EMERGING] **Automatic front-end graders solve a different problem from educational assessment.** FrontendBench demonstrates technically credible browser-level functional checking, but its expert-agreement figure concerns output correctness, not attribution of knowledge, authorship or conceptual understanding.
- [UNVERIFIED][UNVERIFIED-GAP] **No source found establishes a consensus on how much prompt/log/provenance capture is pedagogically necessary versus intrusive or burdensome in front-end assessment.** The current literature should therefore be described as emerging rather than settled.

**Fundamentals-first versus framework-first longitudinal web cohorts**

- [UNVERIFIED][UNVERIFIED-GAP] **The central controversy is much louder in practitioner discourse than in longitudinal research.** Practitioner material explicitly contrasts library/framework-first and first-principles sequences; the HE literature located provides course designs but not matched multi-year outcome evidence.
- [ESTABLISHED] **“Industry relevance” does not settle the sequencing argument.** Connolly et al. document a gap between education and practice, but rapid industry change is itself why a tool-specific curriculum can age quickly.
- [UNVERIFIED] **It is therefore unverified that framework-first improves durable professional readiness, and equally unverified that fundamentals-first improves long-term framework transfer.** No longitudinal source found directly tests either causal claim.

**Cross-platform interface-layer transferability education research**

- [ESTABLISHED] **Cross-platform education has historically been motivated by platform fragmentation and the cost of learning/maintaining multiple native stacks.** Huynh and Ghimire explicitly frame that difficulty for developers, educators and students and investigate browser apps as one response.
- [ESTABLISHED] **The long-running counterpoint is that “cross-platform” is not a single technical equivalence class:** native, cross-platform and web-based approaches have different toolchains and affordances, a distinction explicitly preserved in mobile-development literature.
- [UNVERIFIED][UNVERIFIED-GAP] **Consequently, “one interface layer transfers everywhere” is currently a hypothesis, not an established educational result.** The sources found demonstrate cross-platform construction; they do not show that abstraction over platform differences produces durable conceptual transfer.
- [UNVERIFIED][UNVERIFIED-GAP] **This is arguably the least empirically developed of the fourteen anchors when stated specifically as *interface-layer transferability*.** The closest established literature uses terms such as cross-platform development, WORA and browser-based app development rather than measuring transfer as a cognitive outcome.
