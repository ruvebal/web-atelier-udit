# PWA / offline pedagogy

> **Pass-2 audited edit (2026-08-16).** Source: `pass1.gpt.deep-research.raw.md`. Audit: `pass2.claude.audit.raw.md`.
> Mechanical: strip ChatGPT citation chips / `+N` counters; promote numbered areas to `##` headings where detected.
> Required Pass-2 amendments applied inline as **[NEEDS CHECK]** / preprint flags — see `pass2.claude.audit.ledger.md`.
> **Citation rule:** Athanor/DevIAC hits are discovery only. Evaluator-safe claims require Ahmes `⟨coat⟩ · nodo · p.` with `evaluator_safe=yes`.

Evidence window and confidence tags are retained from Pass 1 unless Pass 2 required softening.


Field map · Progressive Web App and offline-first pedagogy in higher education

PASS 1 · State of the field · 2024–2026

Evidence boundary. Across targeted searches of ACM/SIGCSE, IEEE-indexed material, Springer, ScienceDirect, W3C/MDN/Chrome documentation, and recent computing-education literature, I could verify very little 2024–2026 higher-education research whose object of study is specifically how students learn PWA/service-worker/offline architecture. The strongest directly relevant computing-education precedent remains Case, Steeve & Woolery’s SIGCSE 2020 PWA workshop, while Connolly’s broader SIGCSE 2019 analysis establishes the curricular difficulty of keeping web-development teaching aligned with a fast-moving platform. Recent literature is much richer in three adjacent categories: PWAs used to deliver education, technical research about PWA architectures, and general GenAI/programming pedagogy. These categories are kept separate below. Case, Steeve & Woolery, Progressive Web Apps are a Game-Changer!, SIGCSE 2020, DOI 10.1145/3328778.3367007; Connolly, Facing Backwards While Stumbling Forwards: The Future of Teaching Web Development, SIGCSE 2019, DOI 10.1145/3287324.3287433. 
dl.acm.org


## 1. Progressive Web App education in higher education


[ESTABLISHED] State of the art / verified pedagogical baseline. The clearest HE-specific precedent located is Denise M. Case, Colton Steeve & Matthew Woolery, Progressive Web Apps are a Game-Changer! Use Active Learning to Engage Students and Convert Any Website into a Mobile-Installable, Offline-Capable, Interactive App (SIGCSE 2020, DOI 10.1145/3328778.3367007). The workshop explicitly framed PWA construction as a computing-learning activity and covered the computer-science principles behind converting web sites into installable/offline-capable applications. 

[ESTABLISHED] Foundational curricular context. Randy Connolly’s Facing Backwards While Stumbling Forwards: The Future of Teaching Web Development (SIGCSE 2019, pp. 518–523, DOI 10.1145/3287324.3287433) remains load-bearing because it treats web-development pedagogy itself as a curricular problem: the platform changes faster than conventional curriculum revision and web development has historically occupied an unstable position inside CS programs. 

[EMERGING] 2024–2026 evidence is mostly “PWA for education,” not “education about PWA.” Recent studies include PWA-based educational or institutional systems—for example Wang’s 2026 mobile-first pharmacology model and recent offline-first educational applications—but these evaluate delivery, usability, access, or learning interventions rather than students’ acquisition of service-worker architecture knowledge. Wang et al., Mobile-First Blended Learning for Pharmacology Education Reform (International Journal of Mobile and Blended Learning, 2026), DOI 10.4018/IJMBL.408838.  **[NEEDS CHECK]**
ScienceDirect

[UNVERIFIED] Blank — 2024–2026 HE PWA pedagogy research program. No verifiable recent multi-paper research program, named lab, or sustained SIGCSE/ITiCSE research thread specifically studying how university students learn PWA architecture was found in the searches conducted for this map. This is therefore a genuine prospecting blank, not evidence that no such work exists anywhere.

[ESTABLISHED] Terminology. “Progressive Web App” remains a useful platform term, but academically sharper durable terms include service-worker architecture, offline-capable web applications, resilient web applications, client-side caching, and web application lifecycle. “PWA” itself bundles installability, offline/background capabilities, and OS integration that are technically separable; current MDN explicitly treats manifest/installability and service-worker offline behavior as separable capabilities. 
MDN Web Docs

[ESTABLISHED] Critique. Treating “PWA” as a single stable technology is misleading pedagogically: its core rests on durable Web APIs, while install criteria and optional platform integrations vary by browser and evolve independently. MDN currently states that service workers are optional for installability even though they are central to offline behavior. 
MDN Web Docs


## 2. Service worker pedagogy and caching-strategy literacy


[ESTABLISHED] Durable technical core [PLATFORM]. Service workers are event-driven workers acting as programmable intermediaries between application and network; their lifecycle includes download/registration, installation, waiting/activation, and subsequent handling of events such as fetch. MDN, Service Worker API and Using Service Workers, updated 2025–2026. 
MDN Web Docs

[ESTABLISHED] Caching literacy is decision literacy, not API memorisation [PLATFORM]. Chrome’s Workbox documentation explicitly defines a caching strategy as the interaction between a service worker’s fetch event and the Cache interface, and notes that different resource classes may require different strategies. That distinction supports treating cache-first/network-first/stale-while-revalidate as architectural policies rather than interchangeable recipes. Chrome for Developers, Strategies for service worker caching. 

[ESTABLISHED] Canonical strategies [PLATFORM]. CacheFirst, NetworkFirst, and StaleWhileRevalidate encode materially different freshness, availability, latency and network-use trade-offs. Workbox documents, for example, that stale-while-revalidate serves an available cached response while refreshing in the background, whereas network-first prioritises a fresh network response and falls back to cache on failure. 

[ESTABLISHED] Cache API ≠ HTTP cache [PLATFORM]. Chrome’s documentation explicitly warns that the Cache interface is separate from the HTTP cache and is controlled through JavaScript; Cache-Control directives do not themselves decide what is stored in the service-worker Cache API. This distinction is a durable conceptual threshold for caching literacy. 

[ESTABLISHED] Foundational implementation mechanism [PLATFORM]. Precaching stores known assets during service-worker installation, while runtime caching handles resources encountered during use. Workbox exposes both patterns and automates revision-aware precaching. Chrome for Developers, workbox-precaching; Caching resources during runtime. 

[UNVERIFIED] Blank — pedagogy of cache-strategy misconceptions. I found no 2024–2026 HE study experimentally comparing ways of teaching cache-first, network-first and stale-while-revalidate, nor a validated misconception inventory for service-worker caching. No verifiable source found.

[ESTABLISHED] Terminology. Durable: request interception, cache invalidation, runtime caching, precaching, freshness/availability trade-off, application shell, offline fallback. Fast-moving/tool-specific: individual Workbox modules and recipes. Workbox itself describes its purpose as simplifying common service-worker routing and caching rather than changing the underlying model. 

[ESTABLISHED] Critique. Abstraction can hide consequential behavior. Workbox is explicitly an abstraction over complex service-worker APIs; therefore evidence that a student can configure Workbox is not, by itself, evidence that the student understands lifecycle, interception or invalidation semantics. The first clause is documented; the pedagogical implication is a distinction in what can legitimately be claimed from an assessment, not an empirical claim that Workbox causes misunderstanding. 


## 3. Offline-first web application teaching


[ESTABLISHED] Technical meaning [PLATFORM]. MDN uses “offline first” for applications configured to serve cached assets and remain useful without connectivity before consulting or recovering through the network. MDN, Using Service Workers, updated May 2026. 
MDN Web Docs

[ESTABLISHED] Offline is broader than static asset caching [PLATFORM]. Current MDN separates application UI from service-worker background/offline responsibilities and describes offline handling, background synchronization, periodic synchronization, and background fetch as distinct mechanisms. 
MDN Web Docs

[ESTABLISHED] Foundational reference. Darren Sauble’s Offline First Web Development (Packt, 2015) is still cited in later PWA architecture work, but the stronger conceptual lineage now extends into local-first software rather than remaining confined to PWA terminology. Fibrian et al. 2025 cite Sauble explicitly in their offline-first PWA architectural study.  **[NEEDS CHECK]**
Journal Unipdu

[EMERGING] Recent adjacent technical work. Fibrian et al., Architectural Consideration for Gamified Learning Systems: An Exploration of Offline-First Progressive Web Application (Register, 2025, DOI 10.26594/register.v11i2.5087) shows continued architectural interest in offline-first PWAs, but it is a system-design study rather than a study of teaching offline architecture. 
Journal Unipdu

[EMERGING] Connectivity resilience is active in educational-technology research. Arapai (Walusimbi et al., 2026) investigates an entirely offline AI educational architecture for constrained environments, illustrating that “offline-first education” is active as an infrastructure/equity problem even where PWA pedagogy is absent. Arapai: An Offline-First AI Chatbot Architecture for Low-Connectivity Educational Environments, arXiv:2603.03339.  **[NEEDS CHECK]**

[UNVERIFIED] Blank — degraded-connectivity pedagogy in front-end HE. I found no controlled HE study in which students were explicitly taught to reason across states such as online / slow / intermittent / stale / offline / resynchronizing and then assessed on architectural transfer. No verifiable source found.

[ESTABLISHED] Terminology. Durable: offline-first, network resilience, graceful degradation, eventual synchronization, availability, stale data, failure-state UX. Adjacent frontier: local-first software, which adds data ownership, multi-device synchronization and collaboration rather than merely caching server-owned representations. Kleppmann et al., 2019, DOI 10.1145/3359591.3359737. 

[ESTABLISHED] Critique. “Works offline” is too weak a systems claim: a cached shell may launch while application data, writes, authentication or reconciliation still fail. Current MDN itself separates resource caching from background tasks and structured client-side storage, confirming that offline behavior comprises multiple independent concerns. 
MDN Web Docs


## 4. Web app manifest, installability and UX education


[ESTABLISHED] Durable technical foundation [PLATFORM]. The W3C Web Application Manifest specification defines a JSON-based metadata format for web applications, including names, icons and preferred launch URL. W3C, Web Application Manifest, current Recommendation-track specification. 

[ESTABLISHED] Current installability [PLATFORM]. MDN’s 2025 guidance states that supporting browsers require a manifest plus browser-specific installability conditions; Chromium-family requirements include name/short_name, appropriate icons, start_url, display/display_override, and secure delivery. A service worker is not itself a universal installability requirement. 
MDN Web Docs

[ESTABLISHED] Installability and offline capability must therefore be taught as separate axes [PLATFORM]. MDN explicitly describes the manifest as mandatory to the PWA/installability model while describing service workers as optional for installation but useful for offline behavior. 
MDN Web Docs

[ESTABLISHED] UX extends beyond “add to home screen.” Manifest display modes alter browser chrome and standalone presentation; custom install prompts using beforeinstallprompt are conditional and are not available when the app fails installation criteria or the environment does not support installation. MDN, display and Trigger installation from your PWA, 2025. 
MDN Web Docs

[UNVERIFIED] Blank — installability ethics as a studied HE topic. I found no empirical higher-education literature evaluating whether students understand when an install prompt is appropriate, when a browser tab is preferable, or how consent/expectation changes when a website presents as an installed application. No verifiable source found.

[ESTABLISHED] Terminology. Durable: web application manifest, installability, display mode, launch context, application identity, permission UX. Frontier/browser-sensitive: display_override, customized install flows, OS-level integration members. 
MDN Web Docs

[ESTABLISHED] Critique. “Native-like” is not a neutral pedagogical target: hiding browser chrome and moving a web origin into an application-like launch context can change users’ security and provenance cues. Recent PWA security work makes this problem concrete rather than merely philosophical. Wang & Gu’s 2025 GuardianPWA reports installation-lifecycle inconsistencies and origin-display failures across browsers. 


## 5. Cache API and Workbox in computing curricula


[ESTABLISHED] Platform versus library distinction. The Cache API is a Web Platform facility for storing request/response pairs and can be used independently, although it is commonly paired with service workers; Workbox is a Google-maintained module set that abstracts recurring routing, precaching and caching patterns. MDN, Client-side storage; Chrome for Developers, What is Workbox?. 
MDN Web Docs

[ESTABLISHED] Foundational curriculum value. The platform-level concepts—fetch, Request/Response, Cache Storage, lifecycle and invalidation—are more durable than Workbox APIs because Workbox explicitly wraps those underlying mechanisms. 

[ESTABLISHED] Current Workbox functionality [PRACTITIONER]. Workbox currently supplies reusable routing, precaching, runtime caching and strategy modules; its strategy layer includes the established cache-first/network-first/stale-while-revalidate families. Chrome for Developers, Workbox documentation. 

[ESTABLISHED] Operational trade-offs belong to the architecture, not merely tooling. Chrome explicitly warns that precaching can waste bandwidth and should be curated, particularly for users without fast or unlimited connectivity. Expectations around service worker deployment, Chrome for Developers. 

[UNVERIFIED] Blank — Workbox-versus-raw-service-worker learning outcomes. No credible HE study was found comparing conceptual understanding between students who implement caching directly with Service Worker/Cache APIs and students who begin with Workbox abstractions. No verifiable source found.

[ESTABLISHED] Terminology. Durable: Cache Storage, fetch interception, precache, runtime cache, cache versioning/invalidation. Frontier/tooling: Workbox recipes, individual Workbox package interfaces and bundler integrations. 

[EMERGING] Curricular controversy. The relevant tension is not “Workbox good/bad” but whether abstraction precedes or follows mechanism. The field supplies documentation for both levels but, in the searches conducted, no empirical pedagogy evidence resolves the sequencing question.


## 6. Teaching resilience and degraded connectivity in front-end courses


[ESTABLISHED] Resilience is a platform concern, not just an optimization. MDN’s current PWA guidance explicitly frames offline/background APIs around intermittent network connectivity and maintaining useful behavior when the application is not continuously connected. 
MDN Web Docs

[ESTABLISHED] A robust state space includes more than binary online/offline. Network-first, cache-first and stale-while-revalidate exist precisely because applications must make different choices about freshness, latency and failure across varying connectivity conditions. Chrome for Developers, Strategies for service worker caching. 

[EMERGING] Digital-inclusion research reinforces the importance of degraded networks. Bhuiyan, Varvello, Staicu & Zaki’s 2025 large-scale study of 100,000 Global-South websites explicitly situates mobile web inclusion within contexts of mobile dependence and slow/unreliable networks, while finding substantial accessibility deficits. Non-Western Perspectives on Web Inclusivity: A Study of Accessibility Practices in the Global South, 2025. 

[EMERGING] Offline-first educational systems are being researched for infrastructure-constrained settings, including fully local AI tutoring such as Arapai, but these studies examine access and deployment rather than front-end resilience pedagogy. Walusimbi et al., 2026, arXiv:2603.03339. 

[UNVERIFIED] Blank — resilience as an assessed HE front-end competency. No validated curriculum framework or assessment instrument was located that operationalizes degraded-connectivity reasoning as a front-end student competency. No verifiable source found.

[ESTABLISHED] Terminology. Sharper durable terms include resilient web design, fault tolerance, graceful degradation, progressive enhancement, network-aware UX, offline fallback, and eventual consistency. “PWA” is narrower than the full resilience problem because much resilient behavior remains relevant to non-installable sites. MDN’s separation of installability from service-worker offline capability supports that distinction. 
MDN Web Docs

[ESTABLISHED] Critique. Equating resilience with “cache everything” conflicts with platform guidance: Chrome warns about data cost and recommends selective caching, while different resources legitimately require different caching strategies. 


## 7. PWA accessibility and security considerations for students


[ESTABLISHED] Accessibility remains ordinary web accessibility. PWA delivery does not exempt an application from semantic HTML, keyboard interaction, WCAG or assistive-technology compatibility; MDN’s PWA best-practice guidance explicitly includes accessibility among PWA quality requirements. 
MDN Web Docs

[ESTABLISHED] PWA-specific accessibility evidence exists outside pedagogy. Konstantinos I. Roumeliotis & Nikolaos D. Tselikas, Evaluating Progressive Web App Accessibility for People with Disabilities (Network, 2022, 2(2), 350–369, DOI 10.3390/network2020022) directly evaluates accessibility in PWAs and remains a load-bearing domain-specific reference. 

[EMERGING] Recent HE accessibility pedagogy is broader than PWA. ACM computing-education work in 2024–2025 has studied embedding accessibility assignments and accessibility practice into computing/software-engineering projects, but the retrieved studies do not isolate PWA-specific accessibility learning. Mapping Accessibility Assignments into Core Computer Science Courses (CHI 2024 context) and Accessibility Insights from Student's Software Engineering Projects are relevant adjacent pedagogy. 

[ESTABLISHED] Security starts with secure contexts [PLATFORM]. Service workers require HTTPS outside trusted local-development contexts because they can intercept and modify application requests and responses. MDN, Using Service Workers. 
MDN Web Docs

[ESTABLISHED] Canonical security critique. Lee et al.’s Pride and Prejudice in Progressive Web Apps (CCS 2018, DOI 10.1145/3243734.3243867) conducted an early systematic investigation of security/privacy properties unique to PWAs and documented browser/security problems; it remains foundational for rejecting the assumption that “HTTPS + service worker” exhausts PWA security. 

[EMERGING] Security remains active in 2025. Wang & Gu’s GuardianPWA and Demystifying Progressive Web Application Permission Systems report browser inconsistencies affecting installation provenance and permission boundaries, including issues acknowledged by vendors. These are current technical-research frontiers, not HE pedagogy findings. 

[UNVERIFIED] Blank — combined PWA accessibility/security pedagogy. No 2024–2026 HE study was located that assesses whether students can reason jointly about offline caches, sensitive local data, permission prompts, application identity, accessibility and installability. No verifiable source found.

[ESTABLISHED] Terminology. Durable: secure context, origin, scope, permission model, client-side storage security, WCAG, accessible rich internet application. Frontier: browser-specific PWA installation lifecycle and permission harmonization. 


## 8. AI-assisted development of service workers and offline UX


[ESTABLISHED] General computing-education evidence exists; PWA-specific evidence does not. Agbo et al.’s 2025 systematic review of GenAI in computing education reviewed 21 studies and concluded that AI code generators can assist learners/instructors but require mitigation of associated risks. Computing education using generative artificial intelligence: A systematic review, 2025. 
ScienceDirect

[ESTABLISHED] A broader 2025 systematic review similarly identifies intentional pedagogy and assessment as central. Nathaniel et al., Literature Review on the Integration of Generative AI in Programming Education (International Journal of Artificial Intelligence in Education, 2025) synthesized 40 empirical studies and emphasizes structured integration rather than unexamined code generation. 
Springer Link

[EMERGING] Code comprehension is becoming a specific concern. Qiao, Shihab & Hundhausen’s 2025 systematic review of 31 studies on GenAI code-comprehension assistance reports unreliable/unclear explanations and difficulties for novices in effectively using GenAI support. arXiv:2510.17894. 

[EMERGING] The 2026 computing-education frontier is moving toward AI-assisted software-engineering curricula, with recent work explicitly mapping new AI-assisted development curricula and studying AI-assisted code review. These remain general software/programming-education developments rather than service-worker studies. 

[UNVERIFIED] Blank — AI-generated service workers [PRACTITIONER]. I found no peer-reviewed HE study specifically evaluating whether students can verify AI-generated service-worker lifecycle code, caching policies, cache invalidation, offline fallbacks or synchronization behavior. Claims about ChatGPT/Copilot making service-worker development “easier” should therefore be classified as practitioner experience unless separately studied.

[UNVERIFIED] Blank — characteristic GenAI errors in service workers. No peer-reviewed error taxonomy specifically for LLM-generated service workers was located. It would be unsafe to assert a documented PWA-specific hallucination profile from general code-generation studies.

[ESTABLISHED] Terminology. Durable educational terms: AI-assisted programming, code comprehension, verification, human oversight, code review. Fast-moving terms: individual model/tool names and “vibe coding.” Current systematic-review evidence supports studying comprehension and verification rather than assuming generated code equals learned architecture. 

[ESTABLISHED] Controversy. The general programming-education literature now documents a tension between productivity/support and superficial learning or overreliance. A 2025 systematic review of AI agents in programming education identifies overreliance and AI errors among recurring concerns; this evidence is programming-general and must not be represented as PWA-specific. Elnaffar, Rashidi & Abualkishik, 2025, arXiv:2510.03884. 


## 9. Assessing student understanding of offline architectures


[ESTABLISHED] Direct PWA assessment research is missing. The verified SIGCSE PWA precedent demonstrates teaching activity, but the accessible record does not establish a validated PWA/offline-architecture assessment framework. Case, Steeve & Woolery 2020, DOI 10.1145/3328778.3367007. 

[EMERGING] GenAI has made artifact-only programming assessment less informative. ACM’s July 2026 reporting on programming assessment under GenAI describes broad educator concern about whether students can still demonstrate coding knowledge when AI systems can produce substantial portions of solutions. This is computing-education-wide evidence, not offline-specific. 
ACM

[ESTABLISHED] Architecture understanding is not equivalent to a working artifact. Service-worker correctness depends on lifecycle states, update behavior, route matching, cache policy and failure behavior that may not be visible during a normal online demonstration. The underlying lifecycle/update complexity is directly documented by MDN. 
MDN Web Docs

[UNVERIFIED] Blank — validated conceptual questions. No published 2024–2026 instrument was found for assessing student reasoning about stale caches, version transitions, offline mutation queues, synchronization conflicts, fallback hierarchies or browser shutdown of workers. No verifiable source found.

[UNVERIFIED] Blank — assessment comparison. No study was found comparing implementation grading with architecture explanation, network-failure testing, code tracing or oral defence specifically for PWA learning. No verifiable source found.

[ESTABLISHED] Terminology. More precise durable constructs are conceptual understanding, program comprehension, architecture reasoning, failure-mode reasoning, code tracing, and software testing under fault conditions. The current GenAI code-comprehension literature reinforces program comprehension as a distinct object of learning. 

[ESTABLISHED] Critique. Lighthouse-style or functional PWA checks can establish observable properties of an artifact but cannot, without additional evidence, establish that a student understands why those properties arise. This is a measurement-validity distinction; I found no PWA-specific empirical study quantifying the size of that gap.


## 10. Background sync and push notifications as curriculum scope


[ESTABLISHED] Background Sync [PLATFORM]. The Background Synchronization API enables deferred work to run through a service worker after stable connectivity returns. MDN, Background Synchronization API. 
MDN Web Docs

[ESTABLISHED] But Background Sync is not universal [PLATFORM]. MDN currently marks the service-worker sync event as Limited availability / not Baseline, meaning it does not work across some widely used browsers. This makes it unsuitable as an unqualified “standard PWA capability” claim. 
MDN Web Docs

[ESTABLISHED] Periodic Background Sync is still more clearly frontier [PLATFORM]. MDN marks periodicsync and PeriodicSyncManager experimental and not Baseline because of incomplete browser support. 
MDN Web Docs

[ESTABLISHED] Background work has lifecycle limits. MDN notes that service workers are not continuously running and may be terminated; background sync jobs must therefore tolerate interruption/retry rather than assuming a permanently resident process. 
MDN Web Docs

[ESTABLISHED] Long-running transfers are a separate problem. MDN distinguishes Background Fetch from Background Sync because sync is unsuitable for long-running operations that may exceed service-worker execution lifetime. 
MDN Web Docs

[ESTABLISHED] Push/background features raise permission and attention questions. The current W3C Permissions model treats access to powerful features as an explicit user decision with granted/denied/prompt states, while PWA permission-security research documents inconsistencies across browsers. 

[UNVERIFIED] Blank — curriculum-scope evidence. No HE comparative study was found asking whether background sync, push, periodic sync or background fetch belong in a core undergraduate front-end syllabus versus an advanced elective. No verifiable source found.

[ESTABLISHED] Terminology. Durable: event-driven background execution, deferred synchronization, push messaging, permission model, worker lifetime. Frontier: Periodic Background Sync and browser-specific background execution policies. 
MDN Web Docs

[ESTABLISHED] Critique. Teaching “PWAs support background sync” without browser-support qualification is presently inaccurate. Background Sync and especially Periodic Background Sync remain compatibility-sensitive capabilities. 
MDN Web Docs


## 11. Local-first software pedagogy adjacent to PWA teaching


[ESTABLISHED] Canonical reference. Martin Kleppmann, Adam Wiggins, Peter van Hardenberg & Mark McGranaghan, Local-first software: you own your data, in spite of the cloud (Onward! 2019, DOI 10.1145/3359591.3359737) established “local-first software” as an architecture in which local data and offline operation coexist with synchronization, collaboration, privacy and long-term user control. 

[ESTABLISHED] PWA/offline-first and local-first are adjacent, not synonyms. A PWA may cache server responses yet remain server-authoritative; local-first architecture makes local state primary and introduces synchronization/replication semantics. Kleppmann et al. explicitly include offline work, multi-device synchronization and collaboration among the local-first ideals. 

[EMERGING] Local-first remains an active systems-research frontier. Klokmose et al., MyWebstrates: Webstrates as Local-first Software (2024, DOI 10.1145/3654777.3676445), and Köhler et al., Enforcing Safety and Invariants for Local-First Applications (IEEE Transactions on Software Engineering, 2025, DOI 10.1109/TSE.2024.3477723) show ongoing work on programming models and safety/invariants for replicated local-first systems. 

[ESTABLISHED] Earlier formal-programming work is also load-bearing. Haas et al.’s LoRe: Local-First Reactive Programming with Verified Safety Properties and related programming-support work investigate languages/verification for local-first applications rather than simple HTTP-response caching. 

[UNVERIFIED] Blank — local-first pedagogy in undergraduate web curricula. Despite an active technical research community, I found no established 2024–2026 HE pedagogy literature showing how undergraduates learn CRDT-style synchronization, replicated invariants or local-first architecture as a successor/extension to PWA offline caching. No verifiable source found.

[ESTABLISHED] Named active research lineage. Ink & Switch is the research lab associated with the 2019 local-first formulation; recent academic work by Kleppmann-associated and Webstrates researchers extends the technical agenda. The available evidence supports naming this as an active research lineage, but not as a documented HE-pedagogy lab. 

[ESTABLISHED] Terminology. Durable: local-first, replication, conflict resolution, eventual consistency, CRDT, offline availability, local ownership. PWA-specific terms such as service-worker cache strategies address a lower/different layer of the architecture. 

[ESTABLISHED] Critique. Substituting “local-first” for “offline-capable PWA” overstates what a conventional cached web app provides; local-first introduces synchronization correctness and ownership properties not guaranteed by Cache API/service workers. 


## 12. Mobile web versus native expectations in PWA courses


[ESTABLISHED] Historical PWA framing. PWAs were explicitly positioned as web applications capable of acquiring selected app-like properties—installation, offline use and richer OS integration—without requiring separate native codebases. Current MDN still describes them as installable web applications enhanced by manifests and optional service-worker capabilities. 
MDN Web Docs

[ESTABLISHED] The “PWA replaces native” proposition is not settled technical fact. Comparative research has repeatedly treated PWA, native, hybrid and conventional mobile-web approaches as architectures with different trade-offs rather than a single dominance ordering. Khan et al., Progressive Web Application Assessment Using AHP (Procedia Computer Science, 2019), explicitly compared these alternatives rather than assuming PWA superiority. 
ScienceDirect

[ESTABLISHED] Energy/performance trade-offs complicate simplistic superiority claims. Huber et al., A comparative study on the energy consumption of Progressive Web Apps (Journal of Systems and Software context, 2022) investigates energy consumption relative to other mobile-development approaches, confirming that architecture choice has measurable systems consequences beyond codebase reuse. 
ScienceDirect

[ESTABLISHED] The Web can now support unusually capable applications, but capability remains uneven. Thomas Steiner’s The Capable Web (2023) explicitly examines arguments both for and against building advanced applications for the Web, making it a useful recent counterweight to both “the web cannot do apps” and “native is obsolete” narratives. 

[EMERGING] 2025 security research further complicates native-like framing. PWA installation and permission behavior can vary across browsers and operating systems, and current research reports inconsistencies affecting provenance and permissions. Wang & Gu, GuardianPWA and Demystifying Progressive Web Application Permission Systems, 2025. 

[UNVERIFIED] Blank — HE evidence for mobile-web-versus-native learning outcomes. I found no recent controlled higher-education study comparing what students learn about mobile architecture when taught native development, conventional responsive web development and PWA development as alternative paradigms. No verifiable source found.

[ESTABLISHED] Terminology. Durable: cross-platform development, mobile web, native application, hybrid application, installable web application, capability gap, progressive enhancement. Fast-moving: exact browser/OS feature parity and installation affordances. 
MDN Web Docs

[ESTABLISHED] Critique / hype boundary. Claims that PWAs are categorically “the future of apps” or categorically replace native applications are stronger than the research evidence supports. The scholarly comparative literature instead evaluates application size, performance, energy, accessibility, security, platform APIs and cross-platform reach as distinct dimensions. 
ScienceDirect
ScienceDirect

Field-level status, August 2026. [ESTABLISHED] The technical fundamentals are mature enough to be named confidently: service-worker lifecycle, fetch interception, Cache API, explicit caching policies, web app manifests, secure contexts, installability, offline fallback and distinctions among ordinary caching, background execution and local-first replication are all well documented in Web Platform specifications/documentation and established systems research. 
MDN Web Docs

[EMERGING] The technical frontier is concentrated less in inventing “PWA” as a new paradigm and more in permission/install security, browser integration, local-first synchronization and safety, plus AI-assisted software development. Wang & Gu 2025; Köhler et al. 2025; Klokmose et al. 2024; recent GenAI computing-education reviews. 
ScienceDirect

[UNVERIFIED] The major research blank remains pedagogy itself: after targeted searches, I cannot verify a 2024–2026 HE literature that experimentally studies how students acquire service-worker lifecycle models, choose caching strategies, reason through stale/offline/synchronization states, verify AI-generated offline code, or demonstrate architectural understanding independently of a working PWA artifact. The directly relevant SIGCSE reference located remains Case, Steeve & Woolery 2020, against the broader curricular backdrop identified by Connolly 2019. 

[ESTABLISHED] Accordingly, the present literature supports a sharp taxonomy for future reruns of this map: [HE-PEDAGOGY] research about learning PWA/offline architecture; [PLATFORM] W3C/MDN/browser documentation establishing what the technologies actually do; [TECHNICAL-RESEARCH] studies of PWA/local-first performance, security, accessibility and architecture; [EDTECH-APPLICATION] research that uses a PWA to deliver education; and [PRACTITIONER] fast-moving tooling such as specific Workbox integrations or AI-generated service-worker workflows. Conflating these categories is currently the main evidentiary hazard in claiming that “PWA pedagogy” is a mature research field.
