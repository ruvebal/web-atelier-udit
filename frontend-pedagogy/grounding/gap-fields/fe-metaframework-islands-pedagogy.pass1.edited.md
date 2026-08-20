# Metaframework / islands pedagogy

> **Pass-2 audited edit (2026-08-16).** Source: `pass1.gpt.deep-research.raw.md`. Audit: `pass2.claude.audit.raw.md`.
> Mechanical: strip ChatGPT citation chips / `+N` counters; promote numbered areas to `##` headings where detected.
> Required Pass-2 amendments applied inline as **[NEEDS CHECK]** / preprint flags — see `pass2.claude.audit.ledger.md`.
> **Citation rule:** Athanor/DevIAC hits are discovery only. Evaluator-safe claims require Ahmes `⟨coat⟩ · nodo · p.` with `evaluator_safe=yes`.

Evidence window and confidence tags are retained from Pass 1 unless Pass 2 required softening.


Field map · Metaframework and islands architecture pedagogy — Astro, Next, Remix/React Router and multi-paradigm front-end education

Scope status: literature checked through 16 August 2026. [PLATFORM] marks first-party framework documentation rather than independent research; [PRACTITIONER] marks influential practitioner architecture discourse. The strongest directly relevant academic cluster currently comes from Juho Vepsäläinen, Arto Hellas and Petri Vuorimaa at Aalto University, whose work on disappearing frameworks, resumability and edge-powered islands supplies a technical research vocabulary for the field. I found no equivalently mature SIGCSE/ITiCSE research programme specifically devoted to teaching Astro/Next/Remix metaframework architecture in higher education. 


## 1. Metaframework pedagogy in higher-education web development


[EMERGING] State of the art · technical field. Academic web-engineering literature now explicitly recognizes a category above component libraries: Vepsäläinen, Hellas & Vuorimaa call Astro a meta-framework and distinguish this layer from React/Vue-style UI libraries and conventional frameworks. Their sharper research term, “disappearing frameworks,” describes systems designed to minimize framework/runtime cost at the client rather than simply adding more abstraction. Vepsäläinen, Hellas & Vuorimaa, The State of Disappearing Frameworks in 2023, WEBIST 2023; Vepsäläinen, Hellas & Vuorimaa, The Rise of Disappearing Frameworks in Web Development, ICWE 2023, DOI 10.1007/978-3-031-34444-2_23. 

[UNVERIFIED] State of the art · pedagogy. No verifiable 2024–2026 SIGCSE/ITiCSE comparative study was located that experimentally compares teaching an undergraduate React-follow-on course through Astro versus Next.js versus Remix/React Router. The recent literature does contain advanced-web-development education studies and courses using contemporary frameworks, but that is not evidence for a settled metaframework pedagogy. Alpizar-Chacon & Keuning, Student's Use of Generative AI as a Support Tool in an Advanced Web Development Course, ITiCSE 2025, DOI 10.1145/3724363.3729106; Suleiman, Ecosystem-Centric Capstone: Lessons from Simulating a ..., 2026.  **[NEEDS CHECK — no DOI]**

[ESTABLISHED] Foundation. The durable curricular object is broader than any current JavaScript framework: CS2023 is explicitly a framework for constructing competency-oriented undergraduate CS programmes rather than a prescription for a specific front-end vendor stack. ACM/IEEE-CS/AAAI, Computer Science Curricula 2023, 2024, DOI 10.1145/3664191. 

[EMERGING] Adjacent terminology. meta-framework is useful but fast-moving; rendering strategy, component orientation, hydration, static generation, server rendering, client rendering, progressive enhancement, and request/response architecture are more durable conceptual vocabulary. Vepsäläinen et al. explicitly characterize contemporary systems through component orientation, templating and hydration before differentiating newer architectures. 

[UNVERIFIED] Open problem / blank. No verified study was found asking whether students who already understand React learn rendering architecture better from a second, contrasting metaframework paradigm than from deeper specialization in one React-based ecosystem. This remains a genuine [UNVERIFIED-GAP], not a demonstrated pedagogical effect. The nearest established transfer literature concerns moving between programming languages/paradigms rather than front-end metaframeworks: Kao, From One Language to the Next: Applications of Analogical Reasoning to Programming Language Transfer, 2022, DOI 10.1145/3487051. 

[ESTABLISHED] Critique. Web-development education has repeatedly faced a mismatch between rapidly changing industrial tooling and durable curricular knowledge. Connolly's SIGCSE paper describes modern web development as substantially broader than explicit HTML/CSS/HTTP technologies, while CS2023 intentionally defines curricular competencies rather than freezing specific tools. Connolly, Facing Backwards While Stumbling Forwards, SIGCSE 2019, DOI 10.1145/3287324.3287433; ACM/IEEE-CS/AAAI, CS2023, 2024. 


## 2. Astro islands architecture education


[ESTABLISHED] State of the art · architecture. Astro's islands model renders most of a page as HTML and selectively attaches JavaScript to interactive regions; independent academic work situates Astro among “disappearing frameworks” designed to reduce client-side JavaScript. Astro, Islands architecture [PLATFORM]; Vepsäläinen, Hellas & Vuorimaa, The Rise of Disappearing Frameworks in Web Development, ICWE 2023, DOI 10.1007/978-3-031-34444-2_23. 
docs.astro.build

[EMERGING] 2024–2026 frontier. Islands research has progressed beyond static/client islands toward server/edge-powered islands. Vepsäläinen, Vuorimaa & Hellas investigate combining serverless edge execution with independently dynamic portions of otherwise static pages. The Potential of Serverless Edge-powered Islands for Web Development, Journal of Web Engineering 24(1), 2025, DOI 10.13052/jwe1540-9589.2411. 
journals.riverpublishers.com

[ESTABLISHED] Foundation. The architecture predates Astro as a product. Jason Miller's 2020 formulation describes server-rendered pages containing independently hydrated dynamic regions and credits the original “islands” terminology to Katie Sylor-Miller. Miller, Islands Architecture, 2020 [PRACTITIONER]. 
jasonformat.com

[ESTABLISHED] Foundation · conceptual lineage. Vepsäläinen et al. characterize islands as an evolution of progressive enhancement: static regions coexist with independently activated interactive regions rather than treating the entire document as one client application. 

[EMERGING] Teaching resources, not teaching evidence. Astro itself now supplies a structured tutorial that progresses from ordinary pages and reusable layouts into an islands unit, including an explicit exercise adding Preact and a later content-collections exercise. This is evidence of a teachable platform sequence, not evidence that the sequence improves undergraduate learning. Astro, Build your first Astro blog — Unit 6: Astro Islands [PLATFORM]. 
docs.astro.build

[UNVERIFIED] Open pedagogical problem. No peer-reviewed HE experiment was located comparing an Astro-islands intervention against a conventional React SPA intervention for students who already know React. [UNVERIFIED-GAP].

[ESTABLISHED] Technical open problems. The disappearing-framework literature itself asks about the cost of islands, optimal deferred-loading strategies, composition across island boundaries, scaling with application size, and compatibility with micro-frontends. These are explicitly stated research questions rather than inferred gaps. Vepsäläinen, Hellas & Vuorimaa, ICWE 2023. 

[EMERGING] Sharper terminology. partial hydration, selective hydration, independent hydration, client islands, server islands, and disappearing frameworks are more precise than simply “Astro architecture.” Hydration is durable; individual Astro client:* directives are frontier/platform-specific. 
docs.astro.build

[ESTABLISHED] Critique. Islands are not universally superior: the foundational technical literature explicitly flags cross-island composition problems and notes poor fit for applications whose interfaces are globally and continuously interactive. 


## 3. Next.js App Router teaching in computing curricula


[ESTABLISHED] State of the platform. Current Next.js App Router architecture combines file-system routing with React Server Components, Suspense and server-side functions; therefore teaching “Next.js” now entails reasoning about execution location and server/client boundaries, not merely React routing. Next.js, App Router and Server and Client Components [PLATFORM]. 
Next.js

[EMERGING] Curricular presence. Current computing-education publications show React and Next.js appearing in project/capstone environments, demonstrating curricular uptake, but they do not yet establish a validated pedagogy for App Router concepts. Suleiman, Ecosystem-Centric Capstone: Lessons from Simulating a ..., 2026.  **[NEEDS CHECK — no DOI]**

[UNVERIFIED] Pedagogical evidence. No controlled SIGCSE/ITiCSE study was found evaluating how undergraduates understand Server Components, Client Components, Server Actions, streaming, cache/revalidation, or App Router rendering boundaries. This is an [UNVERIFIED-GAP].

[ESTABLISHED] Foundation. The durable concepts underneath App Router include request/response processing, SSR, static generation, component boundaries, client-side state, data fetching and hydration. Next.js itself distinguishes static rendering from dynamic rendering by when rendering/data fetching occurs. Next.js Learn, Static and Dynamic Rendering [PLATFORM]. 
Next.js

[EMERGING] Adjacent terminology. React Server Components (RSC), server/client component boundary, streaming, static rendering, and dynamic rendering describe App Router more precisely than “SSR.” RSC and its APIs are fast-moving; server/client execution and HTTP rendering are durable concepts. 
Next.js

[EMERGING] Controversy. Framework APIs are sufficiently volatile that curricular material tied to individual App Router mechanisms can age faster than the architecture concepts underneath them. React Router's contemporary RSC support, for example, still labels parts of its RSC implementation unstable, illustrating that RSC ecosystem conventions remain in motion. React Router, React Server Components [PLATFORM]. 
React Router

[UNVERIFIED] Named pedagogy lab. No research group specializing specifically in Next.js App Router pedagogy was verified in the searched SIGCSE/ITiCSE/web-engineering literature.


## 4. SSR, SSG and hybrid-rendering literacy for undergraduates


[ESTABLISHED] State of the art. Modern web architectures no longer divide cleanly into “SPA versus server-rendered site”; static generation, request-time SSR, client rendering, hydration, islands, streaming and edge execution can coexist within one application. Vepsäläinen, Hellas & Vuorimaa, ICWE 2023; Vepsäläinen, Vuorimaa & Hellas, Journal of Web Engineering, 2025, DOI 10.13052/jwe1540-9589.2411. 

[ESTABLISHED] Foundation. SSG generates HTML before requests, SSR generates it around request time, and CSR delegates substantial rendering work to the browser; this distinction remains load-bearing even though contemporary metaframeworks blend them. Next.js Learn, Static and Dynamic Rendering [PLATFORM]; Vepsäläinen et al., The Rise of Disappearing Frameworks, 2023. 
Next.js

[EMERGING] Frontier. Edge computing is making the static/dynamic distinction increasingly granular: serverless edge-powered islands allow isolated dynamic regions within aggressively cacheable/static pages. Vepsäläinen, Vuorimaa & Hellas, 2025. 
journals.riverpublishers.com

[EMERGING] Alternative paradigm. Resumability is now a research-backed alternative to conventional hydration: Vepsäläinen, Hevery & Vuorimaa describe serializing enough execution state into the delivered document to avoid reconstructive hydration work. Resumability—A New Primitive for Developing Web Applications, IEEE Access 12, 2024, pp. 9038–9046, DOI 10.1109/ACCESS.2024.3352891. 

[ESTABLISHED] Adjacent terminology. CSR, SSR, SSG, MPA, SPA, hydration, partial hydration, resumability, edge rendering, and rendering strategy form a more precise vocabulary than a single “server-side/front-end” dichotomy. 

[UNVERIFIED] Open pedagogical problem. I found no validated concept inventory for undergraduate render-target literacy—for example, determining which code executes at build time, server request time or in the browser across mixed-rendering frameworks. [UNVERIFIED-GAP].

[ESTABLISHED] Technical open problem. The disappearing-framework programme explicitly identifies unresolved comparisons among hydration, islands and incumbent approaches, including user/developer costs and scalability. 


## 5. Progressive enhancement versus SPA-first curriculum debate


[ESTABLISHED] Foundation. Progressive enhancement is not a new counter-fashion to React; it predates contemporary SPA frameworks and treats accessible content/basic functionality as the baseline upon which richer client behaviour is layered. React Router's current framework documentation explicitly retains this model. React Router, Progressive Enhancement [PLATFORM]; Vepsäläinen, Hellas & Vuorimaa, 2023. 
React Router

[EMERGING] State of the art. Recent “disappearing framework” and HTML-first research reframes progressive enhancement as part of a broader move toward lower-JavaScript and server/hypermedia-oriented web architecture, rather than merely a graceful-degradation technique. Vepsäläinen, The Case for HTML First Web Development, 2026; Vepsäläinen, Hellas & Vuorimaa, 2023.  **[NEEDS CHECK — confirm preprint/venue]**

[EMERGING] Framework convergence. React Router's framework mode explicitly supports progressively enhanced forms and server rendering, showing that progressive enhancement and React are no longer necessarily opposing curricular camps. React Router, Progressive Enhancement and <Form> [PLATFORM]. 
React Router

[ESTABLISHED] Sharper terminology. HTML-first, MPA, hypermedia, progressive enhancement, transitional web application, sprinkles architecture, and disappearing framework provide more discriminating language than “traditional web versus SPA.” Vepsäläinen et al. specifically identify “sprinkles architecture” and transitional approaches as conceptual relatives of disappearing frameworks. 

[EMERGING] Critique of SPA-default thinking. Vepsäläinen et al. argue that SPA architectures improve rich interactivity and developer experience but impose client-side JavaScript and can create performance/SEO costs; importantly, they also caution that application architecture is context-dependent rather than asserting that MPAs/islands always dominate. 

[EMERGING] Critique of HTML-first claims. The 2026 HTML-first paper itself states that the magnitude of its claimed benefits and its fit with AI-driven development remain open questions; its evidence base therefore should not be read as a settled empirical victory over SPA development. Vepsäläinen, The Case for HTML First Web Development, 2026. 

[UNVERIFIED] Curricular blank. No comparative HE study was located testing an HTML-first → enhancement teaching sequence against a React/SPAs-first sequence while controlling for prior programming ability. [UNVERIFIED-GAP].


## 6. Multi-framework islands — React, Vue, Svelte/Preact in one project


[ESTABLISHED] State of the art. Astro's architecture permits UI-framework components to be inserted as independently interactive islands, while the research literature identifies Astro's UI-library agnosticism as a significant distinction from more opinionated disappearing frameworks. Astro, Islands architecture [PLATFORM]; Vepsäläinen, Hellas & Vuorimaa, The State of Disappearing Frameworks in 2023. 
docs.astro.build

[ESTABLISHED] Foundation. Component orientation is the common abstraction enabling this plurality: Vepsäläinen et al. identify reusable encapsulated UI components as one of the principal commonalities across modern front-end frameworks. 

[EMERGING] Pedagogical affordance, unverified effect. Astro's official introductory material deliberately demonstrates islands by introducing Preact into an Astro page, making cross-framework boundaries visible in a small example. This demonstrates platform affordance but not a measured pedagogical advantage. Astro, Build your first Astro island [PLATFORM]. 
docs.astro.build

[ESTABLISHED] Transfer foundation. Computing-education research supports explicitly teaching correspondences and differences when learners move between programming languages, rather than expecting transfer to happen automatically. Kao, From One Language to the Next, 2022, DOI 10.1145/3487051; Tshukudu, Cutts & Giacaman, Semantic Transfer in Programming Languages, 2020. 

[UNVERIFIED] Pedagogical blank. There is no verified evidence that mixing React/Vue/Svelte components inside one Astro project produces better framework-independent component literacy than studying those frameworks sequentially. [UNVERIFIED-GAP].

[ESTABLISHED] Critique. Islands introduce architectural boundaries that can make cross-component composition difficult; therefore multi-framework capability also creates integration/composition costs rather than automatically yielding modularity. Vepsäläinen, Hellas & Vuorimaa, ICWE 2023. 

[EMERGING] Terminology. UI-library agnostic, polyglot frontend, component interoperability, and island boundary are useful terms; of these, component interoperability is relatively durable while framework-specific integration adapters are frontier tooling. Astro and Vepsäläinen et al. directly support the UI-library-agnostic/island-boundary framing. 


## 7. Teaching a second paradigm after a first React course


[ESTABLISHED] Foundational pedagogy. Research on second-language programming learning identifies analogical transfer as a real instructional problem: students carry concepts and misconceptions from the first language into the next, and pedagogy can make mappings and mismatches explicit. Kao, From One Language to the Next: Applications of Analogical Reasoning to Programming Language Transfer, 2022, DOI 10.1145/3487051. 

[ESTABLISHED] Foundation. Semantic-transfer research similarly treats migration between languages as a normal part of computing education rather than a fresh-start learning task. Tshukudu et al., Semantic Transfer in Programming Languages, ITiCSE 2020. 

[EMERGING] Architectural contrast available. React-SPA knowledge can now be contrasted with materially different execution models—HTML-first islands, server-oriented progressive enhancement, RSC, or resumability—rather than simply another JSX component API. Vepsäläinen et al., 2023; Vepsäläinen, Hevery & Vuorimaa, 2024, DOI 10.1109/ACCESS.2024.3352891. 

[UNVERIFIED] Direct evidence gap. No study was located establishing the optimal second front-end paradigm after React, nor comparing Astro/islands, Next/RSC, React Router/progressive enhancement or another framework as the second exposure. [UNVERIFIED-GAP].

[ESTABLISHED] Sharper academic terminology. The academically grounded terms are knowledge transfer, semantic transfer, analogical reasoning, multiple programming paradigms, and language/paradigm-overarching competence, rather than “framework hopping.” Kao 2022; a language-and-paradigm-overarching programming competency model was proposed by Hubwieser et al.-related competency work in 2020. 

[UNVERIFIED] Controversy. Claims that exposure to multiple front-end frameworks automatically produces “framework-independent thinking” remain unverified in the HE metaframework literature located here; the transfer literature instead indicates that transfer requires attention to structural similarities and differences. 


## 8. Content collections and content-driven sites in education


[ESTABLISHED] State of the platform. Astro's content collections provide typed, queryable sets of structured content and support local documents as well as remotely sourced data; contemporary versions distinguish build-time collections from live collections. Astro, Content collections [PLATFORM]. 
docs.astro.build

[EMERGING] Educational tooling. Astro places content collections inside its official introductory blog sequence after pages, layouts and islands, so the platform itself treats content modelling as part of introductory full-site literacy rather than only advanced CMS integration. Astro, Build a blog tutorial: Make a content collection [PLATFORM]. 
docs.astro.build

[ESTABLISHED] Foundation. The underlying concerns—structured content, schema validation, separation of content from presentation, static generation and CMS-style publishing—long predate Astro. Vepsäläinen et al. situate CMSs and static/content-oriented web architectures in the historical development from early server-rendered web systems to SPAs and newer disappearing frameworks. 

[EMERGING] Sharper terminology. content-driven development, structured content, content schema, content pipeline, static-site generation, and headless CMS are more durable terms than Astro's particular Content Collections API; the latter is explicitly versioned platform machinery. 
docs.astro.build

[UNVERIFIED] Pedagogical blank. No HE study was found testing whether typed content collections improve students' understanding of content/data separation, schema literacy or static generation compared with ad hoc Markdown/JSON or conventional CMS workflows. [UNVERIFIED-GAP].

[EMERGING] Controversy. Content APIs themselves are volatile: Astro's collections have evolved from build-time local collections toward live remote collections, illustrating why the durable instructional concept cannot be equated with one framework API. Astro Content Collections API [PLATFORM]. 
docs.astro.build


## 9. Micro-frontends pedagogy versus monolithic-SPA teaching


[ESTABLISHED] State of the architecture field. Micro-frontends decompose a frontend into independently developed sub-applications, usually to support organisational/team scalability; their benefits come with payload duplication, coupling and monitoring complexity. Peltonen, Mezzalira & Taibi, Motivations, Benefits, and Issues for Adopting Micro-Frontends: A Multivocal Literature Review, 2020. 

[EMERGING] 2025 evidence. Kojo et al.'s e-commerce case study found a successful micro-frontend adoption but concluded it was not strictly necessary and that a monolithic alternative could have met the organisation's needs; infrastructure reuse and an existing microservice trajectory made the architecture convenient in that particular case. Kojo et al., Exploring Micro Frontends: A Case Study Application in E-Commerce, 2025. 

[EMERGING] State of systematic research. Recent mapping work continues to characterize micro-frontends as an evolving architecture with adoption benefits and substantial integration/coordination challenges rather than a universally preferred successor to monolithic frontends. Amorim & Canedo, Micro-Frontend Architecture in Software Development: A Systematic Mapping Study, 2025. 
ScitePress

[ESTABLISHED] Foundation. The architectural concern is organisational as much as technical: independently deployable front-end slices parallel some motivations for backend microservices, particularly autonomous teams. Peltonen, Mezzalira & Taibi, 2020. 

[ESTABLISHED] Sharper terminology. micro-frontend architecture, frontend decomposition, runtime/build-time composition, independent deployment, vertical slice, backend-for-frontend, and team autonomy are more precise than simply “multiple frameworks.” Kojo et al. explicitly combine micro-frontends with API Gateway/BFF patterns. 

[UNVERIFIED] Pedagogical blank. No comparative undergraduate study was found asking whether students should encounter micro-frontends after a monolithic SPA, nor whether the added deployment/organisational complexity provides useful learning outcomes at undergraduate scale. [UNVERIFIED-GAP].

[ESTABLISHED] Technical open question. Compatibility between islands/disappearing-framework architecture and micro-frontends was explicitly identified as an unresolved research question by Vepsäläinen, Hellas & Vuorimaa. 

[ESTABLISHED] Critique. Treating micro-frontends as the inevitable “enterprise” endpoint is not supported by the current evidence: both the multivocal review and 2025 case study document significant complexity costs, and the latter explicitly found that a monolith remained viable. 


## 10. AI-assisted development of metaframework applications


[ESTABLISHED] Direct education evidence. Alpizar-Chacon & Keuning studied GenAI use by experienced undergraduates in an advanced web-development course and found students using it for code generation, ideas and related development tasks; students reported perceived learning/productivity gains while also identifying incorrect outputs and over-reliance as concerns. ITiCSE 2025, DOI 10.1145/3724363.3729106. 

[EMERGING] State of computing pedagogy. Recent computing-education research is moving away from the assumption that “prompting” alone solves AI literacy. Xiao et al. operationalize pedagogical prompting as learning-oriented help-seeking and explicitly call for longitudinal classroom evaluation. Xiao et al., Improving Student-AI Interaction Through Pedagogical Prompting: An Example in Computer Science Education, 2025. 

[UNVERIFIED] Metaframework-specific blank. No peer-reviewed experiment was located on GenAI-assisted learning of Astro islands, Next App Router/RSC, Remix/React Router framework mode, render boundaries, or content collections specifically. [UNVERIFIED-GAP].

[EMERGING] Sharper terminology. AI-assisted programming, human-AI programming, LLM-based help-seeking, pedagogical prompting, verification, and over-reliance are better research terms than framework-specific “AI boilerplate.” Alpizar-Chacon & Keuning 2025; Xiao et al. 2025. 
Utrecht University

[ESTABLISHED] Critique. In advanced web development, students themselves report risks from incorrect generated solutions and excessive dependence on GenAI; consequently, evidence of use or perceived productivity is not equivalent to evidence of conceptual mastery. Alpizar-Chacon & Keuning, ITiCSE 2025. 

[EMERGING] Open problem. Xiao et al. explicitly identify the need for larger-scale longitudinal studies examining AI-help-seeking behaviour together with formative/summative outcomes; this unresolved problem applies to computing education generally and has not yet been resolved for metaframework learning. 

[EMERGING] Architecture/AI intersection. Vepsäläinen's 2026 HTML-first paper separately identifies compatibility/alignment with AI-driven web development as an open research question, meaning even the technical architecture literature has not established which web paradigm best fits AI-mediated development. 


## 11. Hireability versus durability when choosing teaching frameworks


[EMERGING] 2026 evidence. A 2026 study comparing academic preparation with professional software-development demand reports a specific frontend mismatch: React is strongly demanded while graduates report acquiring modern frontend-framework proficiency largely outside formal study, leading the authors to discuss self-directed learning explicitly. da Silva & Brittes, An Analysis of the Relationship Between Academic Training and Professional Demand in the Software Development Market, ICSE/SEiGS 2026, DOI 10.1145/3786176.3788337.  **[NEEDS CHECK — Pass 2 could not locate record; hold §11 hireability argument]**

[ESTABLISHED] Industry-facing foundation. MDN describes framework familiarity as relevant to modern front-end employment while still teaching framework concepts as a category rather than reducing web development to a single library. MDN, JavaScript frameworks and libraries [PLATFORM/REFERENCE]. 
MDN Web Docs

[ESTABLISHED] Curricular counterweight. CS2023 specifies competencies and curriculum-design practices rather than mandating React, Next, Astro or another commercial/open-source framework. ACM/IEEE-CS/AAAI, Computer Science Curricula 2023, DOI 10.1145/3664191. 

[ESTABLISHED] Foundation for durability. Framework-independent concepts visible across modern systems include component orientation, templating, client/server execution, hydration and browser/web-platform behaviour. Vepsäläinen, Hellas & Vuorimaa, 2023. 

[EMERGING] Sharper terminology. employability, industry–academia skills gap, self-directed learning, transferable competence, and framework literacy are more defensible academic categories than a putative numeric “framework half-life.” The 2026 industry/education study directly documents the skills-gap/self-directed-learning issue; no formal, validated front-end framework half-life metric was located. 

[UNVERIFIED] Open problem. No longitudinal study was found determining the optimum balance between current job-market framework exposure and long-lived web-platform/architecture knowledge in undergraduate front-end curricula. [UNVERIFIED-GAP].

[UNVERIFIED] Astro/Next/Remix employability comparison. No rigorous academic source was found establishing that teaching one of these three metaframeworks produces superior graduate employment outcomes. Claims of that form should remain [UNVERIFIED], even when framework popularity or job-posting counts are available.

[ESTABLISHED] Controversy. The evidence does not support either extreme—“teach only durable fundamentals” or “teach whatever is currently most demanded”—as a settled research conclusion. CS2023 foregrounds adaptable competencies, while contemporary skills-gap research shows that industrial framework knowledge can nevertheless be materially underrepresented in formal education. 


## 12. Performance implications of islands versus client-SPA teaching


[ESTABLISHED] Technical state of the art. Islands/disappearing-framework architectures are explicitly motivated by reducing client-side JavaScript and avoiding whole-page hydration where only limited regions need interactivity. Vepsäläinen, Hellas & Vuorimaa, ICWE 2023; Astro, Islands architecture [PLATFORM]. 

[ESTABLISHED] Foundation. The performance argument is architectural rather than an Astro-specific optimization trick: conventional hydration re-executes client application code to recover state/component/event-handler relationships, whereas newer approaches seek to reduce, partition or avoid that work. Vepsäläinen, Hevery & Vuorimaa, Resumability—A New Primitive for Developing Web Applications, IEEE Access 12, 2024, DOI 10.1109/ACCESS.2024.3352891. 
ResearchGate

[EMERGING] Alternative frontier. Resumability demonstrates that the relevant comparison is no longer merely SPA versus islands: compiler-driven resumable systems offer another strategy for controlling startup work and code delivery. Vepsäläinen, Hevery & Vuorimaa, 2024. 

[EMERGING] Edge frontier. The 2025 edge-powered-islands work extends performance reasoning to where dynamic work executes geographically and temporally, combining otherwise static delivery with isolated dynamic edge-rendered regions. Vepsäläinen, Vuorimaa & Hellas, Journal of Web Engineering 24(1), 2025, DOI 10.13052/jwe1540-9589.2411. 
journals.riverpublishers.com

[ESTABLISHED] Sharper terminology. JavaScript payload, hydration cost, partial hydration, resumability, code splitting, deferred loading, static rendering, and edge execution are more analytically useful than simply labelling a framework “fast.” Vepsäläinen et al. explicitly use these architectural distinctions to compare framework families. 

[ESTABLISHED] Technical critique. Islands do not imply universal performance superiority: suitability depends on application holotype/interactivity, composition costs exist, and highly interactive applications may fit the architecture poorly. Vepsäläinen, Hellas & Vuorimaa, ICWE 2023. 

[ESTABLISHED] Open technical problems. The same paper explicitly leaves unresolved the optimal loading strategy, actual island cost, hydration cost inside islands and behaviour as applications scale. 

[UNVERIFIED] Pedagogical blank. No controlled HE study was found in which students implement equivalent functionality as a client SPA and as an islands/HTML-first application and are assessed on whether they can correctly explain why payload, hydration, execution and runtime-performance characteristics differ. [UNVERIFIED-GAP].

[UNVERIFIED] Assessment blank. Likewise, no validated instrument was located for measuring undergraduate understanding of “when JavaScript is actually needed” as distinct from their ability to operate Lighthouse/framework tooling. [UNVERIFIED-GAP].

Field-level status: the underlying architecture research is now substantial enough to distinguish SPA/hydration, partial hydration/islands, progressive enhancement/HTML-first, RSC/server-client composition, and resumability as genuinely different models. The educational research has not caught up: direct 2024–2026 HE comparative evidence for metaframework choice, islands as a second paradigm after React, App Router conceptual learning, multi-framework islands, or islands-versus-SPA performance pedagogy remains largely absent. That absence is itself the most consistently verifiable gap in this map: current computing curricula provide competency frameworks, recent studies address transfer and AI-assisted advanced web development, and industrial architecture research supplies the technical constructs, but these strands have not yet consolidated into an identifiable metaframework pedagogy research subfield.
