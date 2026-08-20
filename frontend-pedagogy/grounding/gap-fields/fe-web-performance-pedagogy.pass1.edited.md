# Web performance pedagogy

> **Pass-2 audited edit (2026-08-16).** Source: `pass1.gpt.deep-research.raw.md`. Audit: `pass2.claude.audit.raw.md`.
> Mechanical: strip ChatGPT citation chips / `+N` counters; promote numbered areas to `##` headings where detected.
> Required Pass-2 amendments applied inline as **[NEEDS CHECK]** / preprint flags — see `pass2.claude.audit.ledger.md`.
> **Citation rule:** Athanor/DevIAC hits are discovery only. Evaluator-safe claims require Ahmes `⟨coat⟩ · nodo · p.` with `evaluator_safe=yes`.

Evidence window and confidence tags are retained from Pass 1 unless Pass 2 required softening.


Research landscape map — Web performance engineering as taught practice: budgets, Core Web Vitals, and imposed optimization

Scope date: 16 August 2026.
Evidence rule used here: [PLATFORM] marks authoritative platform/standards documentation where it establishes the technical state of practice but is not evidence of pedagogical efficacy. [HE] marks higher-education/computing-education evidence. [ADJACENT] marks evidence imported cautiously from programming/software-engineering education. Where searches did not locate direct HE evidence, the blank is stated rather than filled inferentially.


## 1. Web performance pedagogy in higher education


[EMERGING] State of the art (2024–2026). Direct empirical research treating web performance engineering itself as a higher-education pedagogical object remains thin. The strongest recent overview of adjacent web-design pedagogy is Kharchenko & Semerikov, A systematic review of research on teaching web design to secondary school students through HTML and CSS (2025), which found only nine qualifying empirical studies from 2007–2024; at HE level, the established literature remains broader work on experiential/project web-development teaching rather than controlled studies of performance competence. Tzafilkou et al., Experiential learning in web development courses (Education and Information Technologies, 2022); Kharchenko & Semerikov (2025). 
Springer Link

[ESTABLISHED] Foundational/canonical. The technically durable substrate is much more settled than the pedagogy: browser critical-rendering-path knowledge, network/resource timing, user-centric measurement, profiling, and lab-versus-field measurement. W3C Web Performance WG maintains Navigation Timing, Resource Timing, Performance Timeline and User Timing; MDN defines the Critical Rendering Path as DOM → CSSOM → render tree → layout/paint. W3C, Web Performance Working Group; MDN, Critical rendering path (updated 2025). [PLATFORM] 

[UNVERIFIED] Open problem / blank. I found no verifiable 2024–2026 primary HE study that compares alternative pedagogies for teaching web-performance engineering—e.g. audit-at-end versus measurement-driven iteration, explicit budgets versus unconstrained projects, or profiler-first versus optimization-recipe instruction. This remains a genuine literature blank in this search rather than evidence that one method is superior.

[ESTABLISHED] Sharper terminology. Durable specialist terms are web performance engineering, user-centric performance measurement, synthetic/lab testing, field measurement / Real User Monitoring (RUM), critical rendering path, and performance profiling. Google explicitly distinguishes lab data from field/RUM data; W3C standardizes the underlying timing APIs. [FUNDAMENTALS] Google/web.dev, Core Web Vitals workflows with Google tools; W3C Web Performance WG. 

[ESTABLISHED] Critique/controversy. A major methodological danger is reducing competence to a single audit score. Lighthouse itself warns that scores vary with underlying testing conditions and that performance is better understood as a distribution than as one number; lab results can disagree substantially with field experience. Thus “Lighthouse score literacy” and “performance engineering competence” are not equivalent constructs. Google, Lighthouse performance scoring; Walton, Why lab and field data can be different (2022). [PLATFORM] 


## 2. Core Web Vitals education and classroom measurement


[ESTABLISHED] State of the art (2024–2026 technical substrate). Current Core Web Vitals are Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS); INP replaced First Input Delay as a stable Core Web Vital on 12 March 2024. CrUX provides real-user data and feeds PageSpeed Insights and other Google tooling. Wagner & Pollard, Interaction to Next Paint; Google, Interaction to Next Paint is officially a Core Web Vital (2024). [PLATFORM] 

[ESTABLISHED] Foundational/canonical. Core Web Vitals are explicitly framed as field metrics representing aspects of real-world user experience, with thresholds intended to classify experiences as good/needs-improvement/poor. The canonical conceptual distinction is therefore user experience → measurable field signal, not “SEO score.” Google, How the Core Web Vitals metrics thresholds were defined (2020); Web Vitals. [PLATFORM] 

[UNVERIFIED] Open problem / blank. I found no controlled HE evidence validating CWV gains as a learning-outcome proxy. A student can improve a particular LCP/CLS/INP measurement without necessarily demonstrating transferable understanding of browser scheduling, network critical paths, rendering, variability, or RUM interpretation. No direct performance-pedagogy validation study located.

[ESTABLISHED] Sharper terminology. CWV is [FRONTIER/STABLE-BUT-EVOLVING], whereas user-centric performance metrics, field measurement, percentile/distributional measurement, and RUM are more durable [FUNDAMENTALS]. Google explicitly notes that “stable” Web Vitals can still be replaced—as FID was by INP—and promises controlled rather than permanent metric stability. Google, Web Vitals. 

[ESTABLISHED] Critique/controversy. CWV are an intentionally selective metric set, not a complete theory of UX or application performance. Google itself maintains other diagnostic metrics and emphasizes differences between laboratory and real-user conditions; consequently, treating CWV thresholds as exhaustive quality criteria overclaims what they measure. Google, Getting started with measuring Web Vitals (2025); Walton, Why lab and field data can be different. 


## 3. Performance budgets as design constraints in curricula


[ESTABLISHED] State of the art. In professional web practice a performance budget is a predefined limit on performance-relevant quantities—page/resource weight, resource counts, timing metrics, etc.—and can be enforced automatically rather than merely inspected after completion. Lighthouse/LightWallet and build/CI integration established this workflow well before 2024 and it remains current as a durable practice. Hempenius, Use Lighthouse for performance budgets (2019); Mihajlija, Performance budgets 101 (2018). [PLATFORM] 

[ESTABLISHED] Foundational/canonical. The load-bearing idea is constraint before feature accretion: the budget serves as a decision boundary for design and technology choices. Build tools can fail CI when asset thresholds are exceeded; web.dev documents this explicitly for both Lighthouse and Angular CLI budgets. Google/web.dev, Incorporate performance budgets into your build process; Performance budgets with the Angular CLI. 

[UNVERIFIED] Open problem / blank. No primary HE comparison was located testing whether imposed budgets produce better performance reasoning or retention than retrospective Lighthouse grading. The practitioner rationale for budgets is strong; the pedagogical causal claim remains unverified.

[ESTABLISHED] Sharper terminology. Performance budgeting, performance thresholds, quality gates, regression prevention, and continuous performance testing are sharper than simply “optimization.” [FUNDAMENTALS] The distinction matters because the practice regulates acceptable degradation over the lifecycle rather than rewarding a one-off optimization pass. Google, How to stay fast?; Chrome, Introduction to Lighthouse. 

[EMERGING] Critique/controversy. Fixed universal budgets are methodologically weaker than context-sensitive ones: network, hardware, application function and user population change what constitutes acceptable performance. Current DevTools increasingly grounds throttling recommendations in actual field data and calibrated hardware rather than one generic device assumption. Chrome DevTools, Recommended throttling settings (2025); Accurate DevTools performance debugging using real-world data (2025). 


## 4. Teaching bundle optimization and the critical rendering path


[ESTABLISHED] State of the art. Current tooling exposes duplicated/legacy JavaScript, network dependency chains, render-blocking requests, image delivery and LCP phases directly in Chrome Performance/Lighthouse insights. Chrome 137 added explicit Duplicated JavaScript and Legacy JavaScript insights in 2025. Chrome DevTools Team, What’s new in DevTools, Chrome 137 (2025). [PLATFORM] 

[ESTABLISHED] Foundational/canonical. The Critical Rendering Path (CRP) remains the durable explanatory model: HTML parsing/DOM construction, CSSOM, render-tree construction, layout and paint, with JavaScript/network dependencies capable of delaying these stages. MDN, Critical rendering path (updated 2025); How browsers work (updated 2025). [FUNDAMENTALS] 
MDN Web Docs

[UNVERIFIED] Open problem / blank. No recent HE experiment located separates students who can mechanically reduce bundle size from students who can causally explain why a given byte, request, parse task or render-blocking dependency affects user-visible performance. That distinction appears pedagogically important but is not directly validated by the located literature.

[ESTABLISHED] Sharper terminology. Durable terms include resource delivery, code splitting, lazy loading, tree shaking/dead-code elimination, render blocking, dependency chain, JavaScript parse/compile/execute cost, and critical rendering path. MDN now groups CRP, lazy loading, RUM versus synthetic monitoring and performance budgets under “performance fundamentals.” [FUNDAMENTALS] MDN, Performance fundamentals (2025). 
MDN Web Docs

[ESTABLISHED] Critique/controversy. “Kilobytes = performance” is too reductive: transmission cost dominates under constrained networks, while parse/compile/execution and main-thread work become especially important on CPU-constrained devices. Google’s JavaScript-startup guidance explicitly separates transmission size from CPU parsing costs. Osmani, JavaScript Start-up Optimization (2017). [PLATFORM] 


## 5. Runtime performance profiling for front-end students


[ESTABLISHED] State of the art. Chrome’s Performance panel now combines CPU profiles, network information, live CWV measurements, trace insights and field context. It can record JavaScript call stacks, identify long-running work and inspect rendering events; this constitutes a substantially richer practice than running Lighthouse alone. Chrome, Performance panel: Analyze your website’s performance (2024–2025). [PLATFORM] 

[ESTABLISHED] Foundational/canonical. Runtime performance is grounded in the main thread, tasks/call stacks, rendering pipeline, layout/reflow, painting and timing APIs. W3C's Long Tasks work explicitly defines tasks that monopolize the UI thread and prevent timely input handling. W3C Web Performance WG, Long Tasks API / Web Performance roadmap. 

[UNVERIFIED] Open problem / blank. I found no validated progression or assessment instrument for trace literacy in undergraduate front-end education—for example, whether students should progress from flame-chart reading → task attribution → causal hypothesis → code intervention → remeasurement.

[ESTABLISHED] Sharper terminology. Prefer runtime profiling, trace analysis, main-thread contention, long tasks, event-loop/task scheduling, layout/reflow, paint/compositing, and interaction latency over generic “speed optimization.” [FUNDAMENTALS] The current INP model explicitly decomposes interaction latency around event processing and the next presentable frame. Wagner & Pollard, Interaction to Next Paint (updated 2025). 

[ESTABLISHED] Critique/controversy. Desktop profiling without calibrated slowdown can systematically hide problems encountered by slower devices. Chrome states that CPU throttling remains an approximation—the desktop and mobile architectures differ—and identifies remote debugging on a real mobile device as the reference method. Chrome DevTools, Accurate DevTools performance debugging using real-world data; Performance features reference (2025). 


## 6. Why students rarely request optimization hints in AI tutors


[ESTABLISHED] State of the art — adjacent evidence only. The relevant finding is real but not a web-development cohort. Phung, Choi, Wu, Singla & Brooks studied 102 students in an introductory data-science programming course using metacognitively structured AI hints; optimization hints—defined around skill improvement rather than immediate completion—were only 8% of total hint requests. Phung et al., Plan More, Debug Less: Applying Metacognitive Theory to AI-Assisted Programming Education (2025), DOI 10.1007/978-3-031-98414-3_1. [ADJACENT] 

[EMERGING] Foundational/canonical for this subproblem. The same study separates planning, debugging and optimization hints under a metacognitive planning–monitoring–evaluation framing; planning requests correlated consistently with higher achievement, while harder tasks increased debugging requests rather than optimization/help-seeking. This is evidence about programming-help behaviour, not evidence that web students neglect Lighthouse/CWV optimization. Phung et al. (2025). 

[ESTABLISHED] Open problem flagged by the authors. Phung et al. explicitly state that further research is needed to make optimization hints more attractive and effective for mastery learning. That author-identified problem can legitimately motivate research on imposed optimization constraints, but it cannot establish their effectiveness in web courses. 

[EMERGING] Sharper terminology. Help-seeking behaviour, metacognitive scaffolding, next-step hints, planning/debugging/optimization hints, and instructor-in-the-loop AI assistance are the specialist education terms. Follow-up work reports that some AI feedback remained incorrect or insufficient and that students seldom escalated problematic hints. Phung et al., Closing the Loop (2025/2026). [ADJACENT; FRONTIER] 

[ESTABLISHED] Critique/controversy. It would be an ecological-validity error to relabel this result “web-performance students rarely ask for optimization.” The verified population, task type and outcome domain were programming/data-science exercises. No verifiable web-performance cohort establishing the same behaviour was located.


## 7. Sustainable web design education: energy and carbon literacy


[EMERGING] State of the art. The standards landscape became materially stronger in 2024–2026: the Green Software Foundation's Software Carbon Intensity methodology became ISO/IEC 21031:2024, while SCI for Web entered active development as a web-specific extension covering servers, networks, third-party services and end-user devices. Green Software Foundation, Software Carbon Intensity Specification; SCI for Web (2026). [STANDARD/FRONTIER]  **[NEEDS CHECK — verify against ISO catalogue before ESTABLISHED]**
sci.greensoftware.foundation

[EMERGING] Foundational/canonical. W3C's Web Sustainability Guidelines (WSG) now frame sustainability using planet/people/prosperity, systems thinking, accessibility, resilience and cross-functional practice rather than reducing sustainability to page weight. The current WSG was published as a W3C Group Note on 5 August 2026; the work is associated with the W3C Sustainable Web Interest Group. W3C, Web Sustainability Guidelines (2026).  **[NEEDS CHECK — confirm W3C WSG publication date]**

[ESTABLISHED] Open problems flagged by the field. Measurement remains unsettled enough that W3C explicitly describes sustainability as an emerging field with research gaps, while SCI for Web exists precisely because generic software-carbon methods require web-specific system boundaries and functional units. W3C WSG; Green Software Foundation, SCI for Web. 

[ESTABLISHED] Sharper terminology. Prefer sustainable web design, green software, software carbon intensity, operational emissions, embodied emissions, energy proportionality, and functional unit over an undifferentiated “website carbon footprint.” [FUNDAMENTALS + MATURING STANDARDIZATION] SCI explicitly models operational energy/carbon plus embodied hardware emissions per functional unit. 
sci.greensoftware.foundation

[ESTABLISHED] Critique/controversy. Claims such as “fewer transferred bytes directly equal X grams of CO₂” require strong methodological qualification. Recent research continues to develop alternative measurement models; Mahoney et al.'s longitudinal COP-site study explicitly notes the lack of an established methodology for its historical assessment, while SCI for Web is being built to define fuller system boundaries. Mahoney et al., An analysis of UNFCCC COP host country websites (1995–2025), PLOS Climate (2025), DOI 10.1371/journal.pclm.0000767; GSF SCI for Web. 
PLOS
PLOS


## 8. AI-assisted performance remediation with human verification


[EMERGING] State of the art. AI-assisted performance diagnosis became a first-party browser-tool capability during 2025. Chrome 132 introduced Gemini assistance for performance tasks; Chrome 137 exposed AI interrogation of LCP phases, render-blocking requests, layout-shift causes and document latency; by Chrome 142 the assistant could reason over an entire recorded performance trace. Chrome DevTools Team, How we introduced Gemini to Chrome DevTools (2025); What’s new in Chrome 137; Chrome 142. [PLATFORM/FRONTIER] 

[EMERGING] Foundational/canonical. The significant architectural development is tool-grounded AI: performance evidence—call trees, traces, network information and audit insights—is serialized and supplied as context rather than asking an unconstrained LLM to guess from source code alone. Chrome describes its AiCallTree representation specifically for performance profiles. Chrome DevTools Team, How we introduced Gemini to Chrome DevTools (2025). 

[UNVERIFIED] Open problem / HE blank. I found no 2024–2026 controlled HE study testing whether students who receive AI-generated performance diagnoses can independently verify causal claims using traces/RUM, nor whether such assistance improves or erodes transfer of profiling competence.

[EMERGING] Sharper terminology. AI-assisted debugging, tool-grounded/code-grounded LLM, performance-trace analysis, agentic browser tooling, and Model Context Protocol (MCP) tooling are more precise frontier terms. Chrome's DevTools MCP server can let coding agents record traces and investigate high LCP directly against a running application. Chrome, Chrome DevTools (MCP) for your AI agent (2025). [FRONTIER] 

[ESTABLISHED] Critique/controversy. “AI autofix” should not be equated with validated diagnosis. Adjacent programming-education evidence shows measurable failure in AI hints: in Phung et al.'s instructor-in-the-loop deployment, 22% of 673 AI hints were rated unhelpful, and even escalated human responses were sometimes incorrect/insufficient. That supports verification as a general educational concern, but does not measure web-performance remediation specifically. Phung et al., Closing the Loop (2025/2026). [ADJACENT] 


## 9. Mobile and low-end-device constraints in teaching performance


[ESTABLISHED] State of the art. Chrome 134 introduced calibrated CPU throttling presets for low-tier and mid-tier mobile devices, calculated relative to the developer's actual computer, addressing the weakness of arbitrary universal 4×/6× slowdown presets. Chrome DevTools Team, Accurate DevTools performance debugging using real-world data (4 April 2025). [PLATFORM] 

[ESTABLISHED] Foundational/canonical. Mobile performance involves distinct network and CPU constraints: transfer cost, JavaScript parsing/execution, image decoding, layout/paint and main-thread contention can all behave differently from a high-end desktop. Chrome explicitly recommends real-device remote debugging as the reference when possible. Chrome, Performance features reference; Osmani, JavaScript Start-up Optimization. 

[EMERGING] Open problem from current research. Unequal web performance under constrained infrastructure remains an active systems problem rather than a solved edge case. Pandey et al., MAML: Towards a Faster Web in Developing Regions (ACM, 2025), studies modern-page complexity under weaker network infrastructures, underscoring the continuing geographic/device-performance problem. DOI 10.1145/3696410.3714584. 

[ESTABLISHED] Sharper terminology. Useful durable terms are device/network heterogeneity, CPU throttling, network throttling, low-tier/mid-tier mobile, adaptive loading, capability-aware delivery, and performance equity; “mobile optimization” alone is underspecified. Google defines adaptive loading as delivering a fast core experience under network/hardware constraints and progressively adding high-end features. [FUNDAMENTALS] 

[ESTABLISHED] Critique/controversy. Simulated throttling is not real hardware. Chrome explicitly warns that DevTools cannot truly emulate mobile CPU architectures; therefore results from simulated low-end modes should not be represented as direct measurements of a particular phone population. Chrome, Performance features reference (2025). 


## 10. Accessibility paired with performance as ethical constraints


[EMERGING] State of the art. Recent accessibility education work does combine automated web auditing with hands-on labs: Rahman et al., Fostering Accessible Design Skills with AI-Agents and… (ACM, 2026), describes experiential accessibility laboratories involving axe-core, WAVE and Lighthouse. This is accessibility pedagogy with overlapping tooling, not yet a validated joint performance-accessibility curriculum. 

[ESTABLISHED] Foundational/canonical. Accessibility and performance are distinct quality dimensions with overlapping consequences for access. WCAG remains the normative accessibility baseline, while W3C's 2025–2026 Web Sustainability Guidelines explicitly place accessibility, usability and performance within a wider sustainable-web systems frame. W3C, WCAG 2.1; W3C, Web Sustainability Guidelines. [STANDARDS] 

[UNVERIFIED] Open problem / blank. I found no rigorous HE study comparing paired performance+a11y constraints against teaching the two as isolated audit categories. Nor did I locate a validated integrated competence construct measuring whether students can reason about trade-offs among accessibility, latency, data cost, CPU work and visual complexity.

[ESTABLISHED] Sharper terminology. Inclusive performance, performance equity, accessibility engineering, sustainable web design, and quality attributes/non-functional requirements are more precise lenses than treating “ethical design” as a single technical metric. WSG explicitly adopts an intersectional framing in which accessibility, privacy and security can affect sustainability. [FUNDAMENTALS/MATURING] 

[ESTABLISHED] Critique/controversy. Lighthouse's combined interface can encourage false equivalence between its numeric categories. Its accessibility score is itself a weighted aggregation of automated audits, while automated testing cannot establish complete accessibility conformance; accordingly, a high performance score and a high automated accessibility score should not be treated as proof of inclusive UX. Chrome, Lighthouse accessibility score (2025); Rahman et al. (2026) uses multiple tools and assistive technologies rather than Lighthouse alone. 


## 11. Lighthouse, WebPageTest and RUM tools in education


[ESTABLISHED] State of the art. The mature practitioner workflow is now explicitly multi-level: Lighthouse/DevTools for controlled lab diagnosis; CrUX or instrumented RUM for real users; WebPageTest for repeatable synthetic testing and deeper network/loading inspection. web.dev's September 2025 measurement guidance recommends RUM for actual user experience and the Performance panel as a starting point for measurement/debugging. Google, Getting started with measuring Web Vitals (2025); WebPageTest, Web Vitals. [PLATFORM] 

[ESTABLISHED] Foundational/canonical. The durable concept is triangulation rather than tool allegiance. Google defines lab data as hypothetical/controlled experience and field/RUM as what actual users experienced; W3C timing APIs supply browser-level measurement primitives. Google, Core Web Vitals workflows with Google tools; W3C Web Performance WG. 

[UNVERIFIED] Open problem / HE blank. A 2020 SIGCSE course report by Case demonstrates that Lighthouse can be embedded in active learning around PWAs and can expose performance/accessibility/best-practice feedback, but I found no recent controlled study showing which combination of Lighthouse, WebPageTest and RUM best develops transferable undergraduate measurement literacy. D. M. Case, Progressive Web Apps are a Game-Changer! Use Active Learning to Teach Them (SIGCSE 2020), DOI 10.1145/3328778.3367007. 

[ESTABLISHED] Sharper terminology. The key distinction is synthetic monitoring/lab testing versus Real User Monitoring (RUM)/field data, plus observability, instrumentation, and regression monitoring. [FUNDAMENTALS] Google notes that RUM can be collected through site instrumentation and that CrUX is another field-data source with different sampling characteristics. 

[ESTABLISHED] Critique/controversy. Tool outputs are condition-dependent and non-interchangeable. Lighthouse score fluctuation can arise from hardware, extensions, routing or dynamic page content, while CrUX and private RUM can differ because they observe different populations/data collection. Teaching “run the tool and record the number” therefore suppresses central measurement-validity issues documented by the tools themselves. Google, Lighthouse performance scoring; Why is CrUX data different from my RUM data?. 


## 12. Assessing student performance-engineering competence


[EMERGING] State of the art. Computing education has moved broadly toward competency-oriented curriculum specification: Computer Science Curricula 2023 explicitly couples an updated knowledge model to a competency model rather than treating topic exposure alone as attainment. ACM/IEEE-CS/AAAI Joint Task Force, Computer Science Curricula 2023 (CS2023): The Final Report (2024), DOI 10.1145/3664191. [HE/CURRICULUM] 

[ESTABLISHED] Foundational/canonical. For performance engineering, authentic professional evidence is inherently measurement → diagnosis → intervention → remeasurement, because platform guidance repeatedly requires measurement before optimization and distinguishes field observation from controlled diagnosis. The technical basis therefore supports assessing reasoning and evidence rather than merely the final page state, although a validated HE rubric for this exact construct was not located. Google, Core Web Vitals workflows with Google tools; Chrome, Performance panel. [PLATFORM; pedagogical extrapolation deliberately not asserted] 

[UNVERIFIED] Open problem / blank. No validated “web-performance engineering competence” assessment instrument was located for undergraduate education. In particular, I found no instrument establishing construct validity across budget-setting, lab/RUM interpretation, network versus main-thread diagnosis, trace reading, optimization selection, regression control and explanation of trade-offs.

[ESTABLISHED] Sharper terminology. Relevant assessment terminology is competency-based assessment, authentic assessment, performance-based assessment, diagnostic reasoning, measurement literacy, observability literacy, and constructive alignment. CS2023 provides the broad competency shift; recent computing-education work continues to investigate constructively aligned software-development competence rather than grades alone. Böttcher et al., Identifying Competence Gaps and Student Struggle… (ACM, 2025), referencing Assessing Software Development Competences Constructively Aligned in an Open-Web Format (2024). 

[ESTABLISHED] Critique/controversy. A terminal Lighthouse score has weak construct coverage for performance-engineering competence: Lighthouse is an automated diagnostic/audit instrument, its score is a weighted aggregation whose weights have changed, and results vary by environment. Assessing competence solely through that scalar would conflate outcome, testing conditions and understanding. Chrome, Lighthouse performance scoring; Introduction to Lighthouse (2025). 

Cross-area field structure

[ESTABLISHED] Durable fundamentals: measure before optimizing; distinguish network/resource delivery from CPU/main-thread/rendering work; understand the browser's critical rendering path; distinguish synthetic/lab measurement from RUM/field evidence; optimize against explicit constraints; and remeasure after intervention. These concepts are represented in W3C performance APIs and current MDN/web.dev guidance despite considerable tooling churn. W3C Web Performance WG; MDN, Performance fundamentals; Google, User-centric performance metrics. 
MDN Web Docs

[EMERGING] Fast-moving frontier: INP/CWV evolution, Performance-panel Insights, calibrated device throttling, Gemini-supported trace interpretation, DevTools MCP/agentic browser debugging, SCI for Web and W3C's maturing sustainability framework. These are current practitioner/standards developments, not yet a corresponding mature HE research programme. 

[ESTABLISHED] Named groups demonstrably active in the technical field: the W3C Web Performance Working Group continues publishing Performance Timeline, Resource Timing, Navigation Timing, LCP and Server Timing work through 2025–2026; the Chrome DevTools / Chrome Web Platform teams maintain CWV measurement and profiling tooling; the W3C Sustainable Web Interest Group maintains WSG; and the Green Software Foundation Software Standards Working Group is developing SCI for Web. 
Green Software Foundation

[UNVERIFIED] Named academic-lab blank: I did not find a clearly identifiable research lab or sustained publication programme whose primary remit in 2024–2026 is specifically higher-education pedagogy of front-end/web performance engineering. The educational evidence currently appears fragmented across web-development education, software/performance-engineering education, AI-assisted programming, accessibility education and green-software research rather than consolidated as a named subfield.

[ESTABLISHED] Overall confidence map: the technical practice layer is mature; sustainability measurement is rapidly standardizing but still methodologically contested; AI-assisted performance diagnosis is frontier tooling; and the direct empirical evidence for how to teach and assess these practices in HE remains sparse. The latter conclusion is consistent with the thin broader web-pedagogy evidence base and the scarcity of performance-specific education studies found here. 
Springer Link
