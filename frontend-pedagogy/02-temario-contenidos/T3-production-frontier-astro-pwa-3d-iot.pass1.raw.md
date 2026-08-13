uitectura de renderizado en producción / Production rendering architecture
A · Técnico / Technical

[ESTABLISHED] La arquitectura de micro-frontends dispone ya de una literatura empírica que permite enseñar beneficios y costes —autonomía de equipos, despliegue independiente, duplicación, payload y complejidad operativa— sin convertirla en una receta universal. 
researchgate.net
+1

cite: Severi Peltonen, Luca Mezzalira, Davide Taibi, Motivations, Benefits, and Issues for Adopting Micro-Frontends: A Multivocal Literature Review, 2021, Information and Software Technology 136, Elsevier

doi: 10.1016/j.infsof.2021.106571

isbn: none

ES: Micro-frontends: motivaciones, beneficios, costes y criterios de adopción

EN: Micro-frontends: motivations, benefits, costs, and adoption criteria

fit_ES: Permite enseñar micro-frontends como decisión arquitectónica condicionada por escala organizativa y técnica, no como simple fragmentación de componentes.

fit_EN: It supports teaching micro-frontends as an architectural decision conditioned by organisational and technical scale rather than mere component fragmentation.

scope: interface-layer

[EMERGING] Las arquitecturas de “islas” recuperan HTML generado fuera del cliente y limitan deliberadamente el JavaScript/hidratación a regiones interactivas, una línea académica ya explícita aunque todavía joven. 
researchgate.net
+1

cite: Juho Vepsäläinen, Arto Hellas, Petri Vuorimaa, The Rise of Disappearing Frameworks in Web Development, 2023, Web Engineering: 23rd International Conference, ICWE 2023, Springer LNCS 13893

doi: 10.1007/978-3-031-34444-2_23

isbn: none

ES: Arquitectura de islas, hidratación parcial y frameworks que desaparecen

EN: Islands architecture, partial hydration, and disappearing frameworks

fit_ES: Da fundamento académico para comparar SPA hidratada, SSR/SSG y enfoques de islas atendiendo al coste real de JavaScript en el cliente.

fit_EN: It provides an academic basis for comparing hydrated SPAs, SSR/SSG, and islands approaches in terms of actual client-side JavaScript cost.

scope: web-platform

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] Los micro-frontends trasladan al interfaz principios de descomposición, ownership y despliegue independiente procedentes de arquitecturas de servicios, pero requieren coordinar composición, comunicación y experiencia de usuario. 
O'Reilly Media
+1

cite: Luca Mezzalira, Building Micro-Frontends: Scaling Teams and Projects, Empowering Developers, 2021, O'Reilly Media

doi: none

isbn: 978-1492082996

ES: Descomposición arquitectónica del front-end y autonomía de equipos

EN: Front-end architectural decomposition and team autonomy

fit_ES: Es una referencia profesional suficientemente sistemática para separar el patrón arquitectónico de implementaciones concretas como Module Federation o un metaframework determinado.

fit_EN: It is systematic enough to separate the architectural pattern from particular implementations such as Module Federation or any single metaframework.

scope: practitioner

C · Académico / Academic

[ESTABLISHED] Estudios sistemáticos recientes confirman que los micro-frontends constituyen una arquitectura contextual con beneficios y costes recurrentes, no un reemplazo automático del front-end monolítico. 
researchgate.net

cite: Giovanni Cunha de Amorim, Edna Dias Canedo, Micro-Frontend Architecture in Software Development: A Systematic Mapping Study, 2025, Proceedings of the 27th International Conference on Enterprise Information Systems (ICEIS 2025), Volume 2

doi: 10.5220/0013195800003929

isbn: 978-989-758-749-8

ES: Evidencia sistemática sobre adopción de micro-frontends

EN: Systematic evidence on micro-frontend adoption

fit_ES: Sirve para que el alumnado contraste beneficios proclamados con patrones, condiciones de adopción y retos encontrados en la literatura.

fit_EN: It lets students contrast claimed benefits with patterns, adoption conditions, and challenges found in the literature.

scope: interface-layer

PWA y resiliencia offline / PWA and offline resilience
A · Técnico / Technical

[UNVERIFIED] Service Workers constituyen la primitiva normativa para interceptar peticiones y habilitar procesamiento en segundo plano y experiencias offline; a agosto de 2026 la especificación sigue en Candidate Recommendation Draft, no debe presentarse como Recommendation final. 
W3C
+1

cite: Monica Chintala, Yoshisato Yanagisawa et al., Service Workers 1, 2026, W3C Web Applications Working Group, Candidate Recommendation Draft

doi: none

isbn: none

identifier: https://www.w3.org/TR/service-workers/

status: no-doi-no-isbn

ES: Service Workers, ciclo de vida, FetchEvent y almacenamiento offline

EN: Service Workers, lifecycle, FetchEvent, and offline storage

fit_ES: Es la fuente normativa adecuada para enseñar la infraestructura sobre la que se construyen cache-first, network-first y stale-while-revalidate.

fit_EN: It is the appropriate normative source for teaching the infrastructure underlying cache-first, network-first, and stale-while-revalidate strategies.

scope: web-platform

[UNVERIFIED] El Web Application Manifest normaliza metadatos de identidad, presentación y lanzamiento de una aplicación web, aunque la especificación continúa en Recommendation Track como Working Draft en julio de 2026. 
W3C

cite: W3C Web Applications Working Group, Web Application Manifest, 2026, World Wide Web Consortium

doi: none

isbn: none

identifier: https://www.w3.org/TR/appmanifest/

status: no-doi-no-isbn

ES: Manifest, identidad de aplicación e instalación

EN: Manifest, application identity, and installation

fit_ES: Permite tratar la instalabilidad como parte de la arquitectura de producto sin confundirla con la resiliencia offline proporcionada por Service Workers.

fit_EN: It allows installability to be treated as part of product architecture without conflating it with offline resilience provided by Service Workers.

scope: web-platform

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] La característica diferencial de una PWA no es “parecer nativa”, sino coordinar capacidades web como service workers, manifest y comportamiento progresivamente mejorado a través de distintos contextos de acceso. 
Google Research
+1

cite: Thomas Steiner, What is in a Web View? An Analysis of Progressive Web App Features When the Means of Web Access is not a Web Browser, 2018, Companion Proceedings of The Web Conference 2018

doi: 10.1145/3184558.3188742

isbn: none

ES: Capacidades PWA y contexto de ejecución

EN: PWA capabilities and execution context

fit_ES: Ayuda a distinguir el conjunto arquitectónico PWA de la idea reductora de una “web instalable”.

fit_EN: It helps distinguish the PWA architectural capability set from the reductive notion of merely an “installable website.”

scope: web-platform

C · Académico / Academic

[ESTABLISHED] El caching de una PWA tiene efectos medibles tanto sobre tiempos de carga como sobre consumo energético, conectando resiliencia offline, rendimiento y sostenibilidad. 
researchgate.net
+1

cite: Ivano Malavolta, Katerina Chinnappan, Lukas Jasmontas, Sarthak Gupta, Kaveh Ali Karam Soltany, Evaluating the Impact of Caching on the Energy Consumption and Performance of Progressive Web Apps, 2020, IEEE/ACM 7th International Conference on Mobile Software Engineering and Systems (MOBILESoft 2020)

doi: 10.1145/3387905.3388593

isbn: none

ES: Estrategias de caché, rendimiento y coste energético en PWA

EN: Caching strategies, performance, and energy cost in PWAs

fit_ES: Ofrece evidencia empírica para que las políticas de caché se razonen como decisiones de ingeniería y no como snippets de Workbox memorizados.

fit_EN: It provides empirical evidence for reasoning about caching policies as engineering decisions rather than memorised Workbox snippets.

scope: web-platform

Ingeniería de rendimiento / Performance engineering
A · Técnico / Technical

[UNVERIFIED] Core Web Vitals operacionaliza experiencia de carga, respuesta y estabilidad mediante LCP, INP y CLS, con evaluación de campo basada en el percentil 75; no sustituye el diagnóstico técnico más amplio. 
web.dev
+1

cite: Philip Walton, Barry Pollard et al., Web Vitals, 2020–2026, web.dev / Chrome Developers

doi: none

isbn: none

identifier: https://web.dev/articles/vitals

status: no-doi-no-isbn

ES: Core Web Vitals: LCP, INP, CLS y medición de campo

EN: Core Web Vitals: LCP, INP, CLS, and field measurement

fit_ES: Es apropiado para convertir objetivos difusos de “web rápida” en métricas verificables sin reducir performance exclusivamente a Lighthouse.

fit_EN: It turns vague “fast web” goals into verifiable metrics without reducing performance exclusively to Lighthouse.

scope: practitioner

[ESTABLISHED] Critical CSS es una optimización verificable del camino crítico de renderizado cuyo efecto debe medirse, no asumirse; la evidencia experimental muestra además que rendimiento y energía no siempre mejoran en paralelo. 
ACM Digital Library

cite: Kevin Janssen et al., On the Impact of the Critical CSS Technique on the Performance and Energy Consumption of Mobile Web Apps, 2022, Proceedings of the International Conference on Evaluation and Assessment in Software Engineering

doi: 10.1145/3530019.3530033

isbn: none

ES: Critical CSS, camino crítico y validación experimental

EN: Critical CSS, critical rendering path, and experimental validation

fit_ES: Introduce la disciplina de medir cada optimización y cuestionar mejoras supuestas por tooling o recetas de build.

fit_EN: It introduces the discipline of measuring each optimisation and questioning improvements merely assumed by tooling or build recipes.

scope: web-platform

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] El rendimiento puede definirse desde diseño como una restricción cuantificable sobre imágenes, tipografía, markup e interacción, en vez de tratarse como una reparación posterior. 
Lehmanns
+1

cite: Lara Callender Hogan, Designing for Performance: Weighing Aesthetics and Speed, 2014, O'Reilly Media

doi: none

isbn: 978-1491902516

ES: Presupuestos de rendimiento como restricción de diseño

EN: Performance budgets as a design constraint

fit_ES: Encaja directamente con introducir budgets desde el inicio del proyecto y hacer visibles las consecuencias técnicas de las decisiones visuales.

fit_EN: It directly supports introducing budgets at project inception and making the technical consequences of visual decisions visible.

scope: practitioner

[ESTABLISHED] Optimizar el front-end exige tratar CSS, JavaScript, imágenes, fuentes, caché y entrega como un sistema de costes interdependientes y automatizables. 
O'Reilly Media

cite: Jeremy Wagner, Web Performance in Action: Building Faster Web Pages, 2017, Manning Publications

doi: none

isbn: 978-1617293771

ES: Optimización sistemática de recursos y pipeline front-end

EN: Systematic front-end resource and pipeline optimisation

fit_ES: Funciona como fundamento procedural estable por debajo de las métricas y herramientas que cambian con mayor frecuencia.

fit_EN: It works as a stable procedural foundation beneath metrics and tools that change more frequently.

scope: practitioner

C · Académico / Academic

[EMERGING] La eficiencia energética del front-end puede variar materialmente con compresión de imágenes, lazy loading y minificación, reforzando que el presupuesto de rendimiento también puede justificarse como restricción ambiental. 
ACM Digital Library

cite: Authors as listed by ACM, Energy-Efficient Web Design: Measuring Impact of Front-End Optimization Techniques, 2025, ACM conference proceedings

doi: 10.1145/3777555.3777561

isbn: none

ES: Rendimiento front-end y eficiencia energética

EN: Front-end performance and energy efficiency

fit_ES: Amplía la discusión de performance más allá de conversión y UX hacia el coste material del software entregado.

fit_EN: It extends performance discussion beyond conversion and UX toward the material cost of delivered software.

scope: research-context-only

[EMERGING] La medición directa del consumo de aplicaciones web está madurando como línea propia de ingeniería de software sostenible, pero aún no existe una equivalencia simple entre un “performance score” y consumo energético. 
ACM Digital Library

cite: L. Khrouf et al., On the Energy Consumption of Web Applications, 2025, GREENS 2025

doi: 10.1109/GREENS66463.2025.00012

isbn: none

ES: Coste energético medido de aplicaciones web

EN: Measured energy cost of web applications

fit_ES: Es útil para introducir límites de las métricas proxy y exigir medición antes de atribuir sostenibilidad a una optimización.

fit_EN: It is useful for introducing the limits of proxy metrics and requiring measurement before attributing sustainability to an optimisation.

scope: research-context-only

Frontera 3D y estética en la web / 3D and aesthetic frontier on the web
A · Técnico / Technical

[ESTABLISHED] WebGL exige comprender explícitamente pipeline gráfico, recursos GPU, draw calls, texturas y shaders; las abstracciones declarativas no eliminan esos costes. 
Routledge
+1

cite: Patrick Cozzi, ed., WebGL Insights, 2015, A K Peters/CRC Press

doi: none

isbn: 978-1498716079

ES: Pipeline WebGL, GPU y rendimiento gráfico

EN: WebGL pipeline, GPU, and graphics performance

fit_ES: Proporciona el conocimiento situado bajo Three.js/R3F necesario para que la escena declarativa no se convierta en una caja negra.

fit_EN: It provides the knowledge beneath Three.js/R3F needed to prevent the declarative scene from becoming a black box.

scope: 3d-immersive

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] La alfabetización gráfica mínima para interfaces 3D requiere geometría de cámara, iluminación, rasterización, materiales, texturas y shaders, independientemente de la librería JavaScript empleada. 
Routledge
+1

cite: Tomas Akenine-Möller, Eric Haines, Naty Hoffman et al., Real-Time Rendering, Fourth Edition, 2018, A K Peters/CRC Press

doi: none

isbn: 978-1138627000

ES: Fundamentos de renderizado en tiempo real y shaders

EN: Real-time rendering and shader foundations

fit_ES: Es una referencia de contexto para seleccionar conceptos transferibles —pipeline, shading, aliasing, visibilidad y coste— sin convertir la asignatura en graphics engineering.

fit_EN: It is a contextual reference for selecting transferable concepts—pipeline, shading, aliasing, visibility, and cost—without turning the subject into graphics engineering.

scope: research-context-only

C · Académico / Academic

[ESTABLISHED] La comparación empírica de frameworks XR web muestra que la abstracción de alto nivel sigue condicionada por utilización de GPU, complejidad de escena y trabajo de cámara/sensores en dispositivos móviles. 
ACM Digital Library
+1

cite: Weichen Bi, Yun Ma, Deyu Tian, Qi Yang, Mingtao Zhang, Xiang Jing, Demystifying Mobile Extended Reality in Web Browsers: How Far Can We Go?, 2023, Proceedings of the ACM Web Conference 2023

doi: 10.1145/3543507.3583329

isbn: none

ES: Rendimiento de frameworks 3D/XR en navegador

EN: Browser-based 3D/XR framework performance

fit_ES: Da evidencia para enseñar que una API declarativa no exime de presupuestar geometría, renderizado y recursos en cliente.

fit_EN: It supplies evidence for teaching that a declarative API does not remove the need to budget geometry, rendering, and client resources.

scope: 3d-immersive

[EMERGING] React puede actuar como modelo declarativo para escenas XR además de para árboles DOM: existen sistemas de investigación que emplean React Three Fiber como renderer, aunque esto no constituye todavía una pedagogía HE consolidada. 
ACM Digital Library
+1

cite: Héctor Rivas Pagador, Sergio Cabrero Barros, HiruXR: a Web Library for Collaborative and Interactive Data Visualizations in XR and 2D, 2022, ACM International Conference on Interactive Media Experiences (IMX '22)

doi: 10.1145/3505284.3532981

isbn: none

ES: Transferencia del componente declarativo a escenas XR

EN: Transferring the declarative component model to XR scenes

fit_ES: Es especialmente útil para mostrar la continuidad conceptual React → renderer → escena 3D sin afirmar que R3F sea ya un estándar curricular.

fit_EN: It is particularly useful for showing the conceptual continuity React → renderer → 3D scene without claiming R3F is already a curricular standard.

scope: 3d-immersive

Capa de interfaz más allá de la página web / Interface layer beyond the browser page
A · Técnico / Technical

[ESTABLISHED] Las interfaces WebSocket introducen comunicación bidireccional persistente y obligan a razonar sobre protocolos, eventos y estados distribuidos, no únicamente sobre Fetch request/response. 
arXiv

cite: Anson Miu, Francisco Ferreira, Nobuko Yoshida, Fangyi Zhou, Generating Interactive WebSocket Applications in TypeScript, 2020, Proceedings of the 13th ACM SIGPLAN International Symposium on Scala / related ACM proceedings

doi: 10.1145/3426422.3426984

isbn: none

ES: WebSockets, protocolos de interacción y estado distribuido

EN: WebSockets, interaction protocols, and distributed state

fit_ES: Permite conectar componentes React y máquinas de estado con protocolos reales de comunicación y corrección de interacciones.

fit_EN: It connects React components and state machines to real communication protocols and interaction correctness.

scope: interface-layer

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] Los patrones de interfaz son transferibles entre web, aplicaciones, dispositivos y otros canales siempre que se separen modelo de interacción, representación visual y fuente de datos. 
O'Reilly Media
+1

cite: Jenifer Tidwell, Charles Brewer, Aynne Valencia, Designing Interfaces: Patterns for Effective Interaction Design, Third Edition, 2020, O'Reilly Media

doi: none

isbn: 978-1492051961

ES: Patrones de interacción transferibles entre dispositivos y superficies

EN: Interaction patterns transferable across devices and surfaces

fit_ES: Sustenta conceptualmente la idea de “misma capa de interfaz, diferente dispositivo o fuente de datos” más allá de una API concreta.

fit_EN: It conceptually supports “same interface layer, different device or data source” beyond any particular API.

scope: interface-layer

C · Académico / Academic

[EMERGING] Los laboratorios IoT remotos demuestran arquitecturas educativas donde dispositivos físicos, broker MQTT y una interfaz web forman un único sistema interactivo, aunque el foco pedagógico suele estar en IoT y microcontroladores, no en advanced front-end. 
ACM Digital Library
+1

cite: Manos Garefalakis, Zacharias Kamarianakis, Spyros Panagiotakis, Remote Laboratory for Developing an IoT System, 2025, Proceedings of the 28th Pan-Hellenic Conference on Progress in Computing and Informatics with International Participation (PCI 2024)

doi: 10.1145/3716554.3716602

isbn: none

ES: Interfaces web para sistemas IoT y laboratorios remotos

EN: Web interfaces for IoT systems and remote laboratories

fit_ES: Es una referencia válida para transferir estado de interfaz hacia telemetría/control físico, marcada como evidencia adyacente y no como pedagogía front-end establecida.

fit_EN: It supports transferring interface state toward physical telemetry/control while remaining adjacent evidence rather than established front-end pedagogy.

scope: research-context-only

[ESTABLISHED] La enseñanza de IoT mediante laboratorios remotos dispone de evidencia de diseño para programación de microcontroladores y acceso web a hardware físico. 
researchgate.net

cite: Manos Garefalakis, Zacharias Kamarianakis, Spyros Panagiotakis, Towards a Supervised Remote Laboratory Platform for Teaching Microcontroller Programming, 2024, Information 15(4), 209

doi: 10.3390/info15040209

isbn: none

ES: Laboratorios remotos, dispositivos físicos y capa web

EN: Remote laboratories, physical devices, and the web layer

fit_ES: Sirve para situar la interfaz como capa de observación y control de un sistema físico, aunque la evaluación principal del trabajo no sea React.

fit_EN: It situates the interface as the observation and control layer of a physical system even though React is not the primary object of evaluation.

scope: research-context-only

Cross-cut · AI-assisted code review (human-in-the-loop)
A · Técnico / Technical

[ESTABLISHED] La revisión automática debe enseñarse como señal falible que exige inspección humana: incluso herramientas de análisis consolidadas producen falsos positivos que deben clasificarse y descartarse. 
ACM Digital Library

cite: Zhenpeng Guo et al., Mitigating False Positive Static Analysis Warnings, 2023, IEEE Transactions on Software Engineering

doi: 10.1109/TSE.2023.3329667

isbn: none

ES: Falsos positivos, triage y responsabilidad del revisor

EN: False positives, triage, and reviewer responsibility

fit_ES: Proporciona el antecedente metodológico para exigir decisiones ACCEPT/REJECT justificadas en lugar de aceptar automáticamente comentarios generados.

fit_EN: It provides the methodological precedent for requiring justified ACCEPT/REJECT decisions rather than automatically accepting generated comments.

scope: programming-general

B · Canónico-teórico / Canonical-theoretical

[ESTABLISHED] La calidad del código puede enseñarse mediante inspección explícita, static analysis, reparación y razonamiento sobre defectos antes de incorporar el LLM como una capa adicional de feedback. 
researchgate.net
+1

cite: Eman Abdullah AlOmar, Nurturing Code Quality: Leveraging Static Analysis and Large Language Models for Software Quality in Education, 2025, ACM Transactions on Computing Education

doi: 10.1145/3722229

isbn: none

ES: Calidad del código, análisis estático y revisión asistida por LLM

EN: Code quality, static analysis, and LLM-assisted review

fit_ES: Vincula herramientas deterministas y feedback LLM, útil para enseñar que la IA complementa una disciplina de calidad preexistente.

fit_EN: It links deterministic tooling with LLM feedback, supporting the teaching principle that AI augments an existing quality discipline.

scope: programming-general

C · Académico / Academic

[EMERGING] Ya existe evidencia HE directamente alineada con un LLM integrado como revisor de pull requests y mantenido explícitamente dentro de un proceso dirigido por estudiantes y humanos. 
arXiv
+1

cite: Eduardo Araujo Oliveira, Michael Fu, Patanamon Thongtanunam, Sonsoles López-Pernas, Mohammed Saqr, AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report, 2026, International Conference on Software Engineering (ICSE 2026), Software Engineering Education and Training

doi: 10.1145/3786580.3786956

isbn: none

ES: LLM como revisor de PR con supervisión humana

EN: LLM as a human-supervised PR reviewer

fit_ES: Es la referencia de mayor ajuste para integrar revisión IA dentro de GitHub PRs, discutir comentarios, corregir código y mantener responsabilidad humana.

fit_EN: It is the closest-fit reference for integrating AI review into GitHub PRs, discussing comments, revising code, and retaining human responsibility.

scope: programming-general

[EMERGING] Software-engineering education está empezando a evaluar específicamente herramientas de IA dentro del proceso de revisión de pull requests, pero la evidencia longitudinal sigue siendo reducida. 
ACM Digital Library
+1

cite: E. Parra, S. Willingham, Towards Implementing and Evaluating AI-Assisted Pull Requests in Software Engineering Education, 2025, 37th IEEE/ACM International Conference on Software Engineering Education and Training (CSEE&T)

doi: 10.1109/CSEET66350.2025.00008

isbn: none

ES: Diseño y evaluación de revisión de pull requests asistida por IA

EN: Design and evaluation of AI-assisted pull-request review

fit_ES: Justifica tratar el review asistido como una práctica educativa evaluable y no simplemente como acceso genérico a un chatbot.

fit_EN: It supports treating assisted review as an assessable educational practice rather than generic access to a chatbot.

scope: programming-general

[ESTABLISHED] La adopción docente de GenAI en informática es heterogénea y requiere políticas y actividades explícitas, por lo que una práctica limitada y documentada de review es más defendible que un permiso inespecífico para “usar IA”. 
researchgate.net
+1

cite: James Prather, Jamie Gorson Benario, Narges Norouzi, Leo Porter, David H. Smith IV, Juho Leinonen, Sam Lau, Simone Opel, Brent N. Reeves, Sven Strickroth, Natalie Kiesler, Stephen MacNeil, Virginia Pettit, Jaromir Savelka, Daniel Zingaro, How Instructors Incorporate Generative AI into Teaching Computing, 2024, Proceedings of the 2024 Conference on Innovation and Technology in Computer Science Education V.2

doi: 10.1145/3649405.3659534

isbn: none

ES: Integración explícita y delimitada de IA generativa en educación informática

EN: Explicit and bounded integration of generative AI in computing education

fit_ES: Sirve de marco HE para documentar propósito, límites y responsabilidad antes de concretarlos en la técnica de AI-assisted code review.

fit_EN: It provides an HE framework for documenting purpose, boundaries, and responsibility before specialising them into AI-assisted code review.

scope: programming-general

[EMERGING] Estudios profesionales de revisión asistida por LLM encuentran que los desarrolladores negocian utilidad, confianza y nivel de intervención del asistente, lo que apoya una práctica explícita de verificación humana en vez de delegación automática. 
ACM Digital Library

cite: A. Alami et al., How Software Engineers Perceive and Engage with AI-Assisted Code Reviews, 2025, IEEE/ACM International Conference on Cooperative and Human Aspects of Software Engineering (CHASE)

doi: 10.1109/CHASE66643.2025.00016

isbn: none

ES: Confianza, verificación y agencia humana en code review asistido por LLM

EN: Trust, verification, and human agency in LLM-assisted code review

fit_ES: Aporta evidencia profesional para pedir al estudiante que evalúe cada sugerencia y documente por qué la acepta, modifica o rechaza.

fit_EN: It provides professional evidence for requiring students to evaluate every suggestion and record why it is accepted, modified, or rejected.

scope: programming-general

Gaps

[UNVERIFIED] Pedagogía HE específica de metaframeworks e islands. La literatura académica encontrada sustenta islands, rendering architectures y micro-frontends como arquitectura, pero no establece todavía un cuerpo pedagógico maduro sobre cómo enseñar Astro/Next/Nuxt-style metaframework architecture en advanced front-end.

cite: Juho Vepsäläinen, Arto Hellas, Petri Vuorimaa, The Rise of Disappearing Frameworks in Web Development, 2023, ICWE 2023; Astro documentation, Islands Architecture, current documentation 
Aalto University's research portal
+1

doi: none

isbn: none

identifier: https://docs.astro.build/en/concepts/islands/

status: no-doi-no-isbn

ES: Gap — didáctica universitaria de metaframeworks e islands

EN: Gap — higher-education pedagogy for metaframeworks and islands

fit_ES: Debe justificarse como frontera curricular basada en arquitectura web verificable, no como pedagogía HE ya consolidada.

fit_EN: It should be justified as a curricular frontier grounded in verifiable web architecture rather than as an already established HE pedagogy.

scope: web-platform

[UNVERIFIED] Multi-framework islands. Está documentada como capacidad de toolchains contemporáneos, pero la búsqueda no localiza evidencia robusta de que mezclar React/Vue/Svelte en islands sea una competencia pedagógica establecida o generalmente deseable.

cite: Astro, Islands Architecture, current documentation 
Astro Docs

doi: none

isbn: none

identifier: https://docs.astro.build/en/concepts/islands/

status: no-doi-no-isbn

ES: Gap — multi-framework islands como objetivo docente

EN: Gap — multi-framework islands as a teaching objective

fit_ES: Conviene tratarlo como demostración arquitectónica de desacoplamiento y no como requisito de producción por sí mismo.

fit_EN: It is better treated as an architectural demonstration of decoupling rather than a production requirement in itself.

scope: practitioner

[UNVERIFIED] “Installability as professional expectation”. Manifest e instalación son capacidades vigentes de plataforma, pero no aparece base académica suficiente para afirmar que toda aplicación web profesional deba ser instalable; debe plantearse como decisión de producto/contexto.

cite: W3C Web Applications Working Group, Web Application Manifest, 2026, W3C 
W3C

doi: none

isbn: none

identifier: https://www.w3.org/TR/appmanifest/

status: no-doi-no-isbn

ES: Gap — instalabilidad PWA como expectativa universal

EN: Gap — PWA installability as a universal professional expectation

fit_ES: Evita convertir una capacidad técnica contextual en norma profesional no demostrada.

fit_EN: It avoids turning a contextual technical capability into an unsupported universal professional norm.

scope: web-platform

[UNVERIFIED] Performance budgets en educación superior. Existe una tradición profesional fuerte de presupuestar peso, requests y tiempos desde diseño, pero la búsqueda no identifica una literatura HE equivalente suficientemente consolidada para afirmar consenso pedagógico.

cite: Lara Callender Hogan, Designing for Performance: Weighing Aesthetics and Speed, 2014, O'Reilly Media 
larahogan.me

doi: none

isbn: 978-1491902516

ES: Gap — evidencia HE sobre performance budgets

EN: Gap — HE evidence for performance budgets

fit_ES: El contenido es profesionalmente defendible, pero debe etiquetarse como transferencia de buena práctica de ingeniería más que como método docente validado.

fit_EN: The content is professionally defensible but should be labelled as transferred engineering practice rather than a validated teaching method.

scope: practitioner

[UNVERIFIED] React Three Fiber como contenido pedagógico HE. R3F aparece en sistemas XR e investigación aplicada, pero la búsqueda no muestra todavía estudios pedagógicos robustos que comparen su eficacia docente con Three.js/WebGL directo u otras abstracciones.

cite: Héctor Rivas Pagador, Sergio Cabrero Barros, HiruXR: a Web Library for Collaborative and Interactive Data Visualizations in XR and 2D, 2022, ACM IMX '22 
ACM Digital Library

doi: none

isbn: none

identifier: https://pmndrs.github.io/react-three-fiber/

status: no-doi-no-isbn

ES: Gap — pedagogía de React Three Fiber

EN: Gap — React Three Fiber pedagogy

fit_ES: La transferencia del component model es curricularmente plausible y técnicamente demostrable, pero no debe confundirse con evidencia de superioridad pedagógica.

fit_EN: Component-model transfer is curricularly plausible and technically demonstrable but should not be confused with evidence of pedagogical superiority.

scope: 3d-immersive

[UNVERIFIED] GLSL introductorio dentro de advanced front-end. La shader literacy tiene una base técnica sólida, pero no se localiza consenso académico sobre cuánto GLSL pertenece específicamente a un currículo front-end universitario.

cite: Patricio Gonzalez Vivo, Jen Lowe, The Book of Shaders, ongoing web publication; Patrick Cozzi, ed., WebGL Insights, 2015, A K Peters/CRC Press 
The Book of Shaders
+1

doi: none

isbn: none

identifier: https://thebookofshaders.com/

status: no-doi-no-isbn

ES: Gap — profundidad adecuada de GLSL para front-end

EN: Gap — appropriate GLSL depth for front-end

fit_ES: Se sostiene mejor como alfabetización sobre la materialidad de los efectos visuales que como formación completa de graphics programming.

fit_EN: It is best justified as literacy about the material implementation of visual effects rather than full graphics-programming training.

scope: 3d-immersive

[UNVERIFIED] Transferencia explícita React/component model → IoT/robótica. Hay abundante pedagogía IoT y ejemplos de interfaces web para hardware, pero no aparece un cuerpo de investigación que valide específicamente “el mismo component model” como principio docente de transferencia desde React avanzado a robótica.

cite: Manos Garefalakis, Zacharias Kamarianakis, Spyros Panagiotakis, Towards a Supervised Remote Laboratory Platform for Teaching Microcontroller Programming, 2024, Information 15(4), 209; Remote Laboratory for Developing an IoT System, 2025, PCI 2024/2025 proceedings 
researchgate.net
+1

doi: none

isbn: none

identifier: https://doi.org/10.3390/info15040209

status: no-doi-no-isbn

ES: Gap — transferencia del component model a IoT/robótica

EN: Gap — component-model transfer to IoT/robotics

fit_ES: Puede plantearse como hipótesis pedagógica explícita del curso, respaldada por sistemas adyacentes pero no presentada como consenso de investigación.

fit_EN: It can be stated as an explicit pedagogical hypothesis of the course, supported by adjacent systems but not represented as research consensus.

scope: research-context-only

[UNVERIFIED] FastAPI/Python como pareja curricular de un front-end React. La combinación aparece profusamente en sistemas de investigación recientes, pero su uso demuestra interoperabilidad técnica, no una pedagogía específica de advanced front-end.

cite: assorted contemporary research systems using React/front-end clients with FastAPI services; evidence is implementation-context rather than curriculum research 
ACM Digital Library
+1

doi: none

isbn: none

identifier: https://fastapi.tiangolo.com/

status: no-doi-no-isbn

ES: Gap — React + servicios Python como patrón pedagógico

EN: Gap — React + Python services as a pedagogical pattern

fit_ES: Conviene enseñar FastAPI sólo como ejemplo de independencia entre capa de interfaz y backend, no como backend canónico del front-end.

fit_EN: FastAPI is best taught as an example of interface/backend independence rather than as the canonical backend for front-end development.

scope: interface-layer

[EMERGING] AI-assisted PR review es el área con mejor ajuste reciente pero todavía temprana. En 2025–2026 ya aparecen estudios específicamente educativos sobre IA como reviewer dentro de pull requests, incluidos diseños CSEE&T y experiencia real con más de cien estudiantes, pero el corpus sigue siendo demasiado joven para considerar resueltos prompt design, calibration, false positives, cognitive offloading o formatos ACCEPT/REJECT. 
arXiv
+1

cite: Eduardo Araujo Oliveira et al., AI-Assisted Code Review as a Scaffold for Code Quality and Self-Regulated Learning: An Experience Report, 2026, ICSE 2026 SEET; E. Parra, S. Willingham, Towards Implementing and Evaluating AI-Assisted Pull Requests in Software Engineering Education, 2025, CSEE&T

doi: 10.1145/3786580.3786956; 10.1109/CSEET66350.2025.00008

isbn: none

ES: Gap — protocolos pedagógicos maduros para AI-assisted code review

EN: Gap — mature pedagogical protocols for AI-assisted code review

fit_ES: El bloque curricular está bien alineado con una frontera real de investigación, siempre que el alumnado conserve la decisión final, verifique técnicamente cada comentario y deje rastro de aceptación o rechazo.

fit_EN: The curricular block aligns well with a genuine research frontier provided students retain final authority, technically verify each comment, and leave an acceptance/rejection record.

scope: programming-general
