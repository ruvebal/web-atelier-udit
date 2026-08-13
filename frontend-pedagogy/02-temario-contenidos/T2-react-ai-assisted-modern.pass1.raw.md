## Filosofía de frameworks y alfabetización del estado / Framework philosophy and state literacy

### A · Técnico / Technical

* [ESTABLISHED] Un currículo moderno de informática debe distinguir principios duraderos de tecnologías concretas y enseñar diseño de software, interacción y desarrollo web como conocimientos transferibles, no como dominio de un framework particular.

  * cite: ACM/IEEE-CS/AAAI Joint Task Force, *Computer Science Curricula 2023*, 2024, Association for Computing Machinery
  * doi: 10.1145/3664191
  * isbn: none
  * ES: Criterios para elegir abstracciones y tecnologías de interfaz
  * EN: Criteria for choosing interface abstractions and technologies
  * fit_ES: CS2023 permite justificar una progresión vanilla → componentes/frameworks sin convertir React, Vue o cualquier toolchain concreto en el objetivo curricular.
  * fit_EN: CS2023 supports a vanilla → components/frameworks progression without making React, Vue, or any particular toolchain the curricular endpoint.
  * scope: programming-general ([ACM Digital Library][1])

* [UNVERIFIED] La documentación oficial de React distingue explícitamente entre estado local, reducers y Context, y presenta los Effects como mecanismos para sincronizar con sistemas externos más que como un mecanismo general de flujo de datos.

  * cite: React Team, *Managing State* and *Synchronizing with Effects*, 2026, Meta / React Documentation
  * doi: none
  * isbn: none
  * identifier: [https://react.dev/learn/managing-state](https://react.dev/learn/managing-state)
  * status: no-doi-no-isbn
  * ES: Jerarquía de estado local, reducer, Context y efectos
  * EN: Hierarchy of local state, reducers, Context, and effects
  * fit_ES: Es una fuente procedimental útil para enseñar primero la necesidad del estado y solo después aumentar la abstracción.
  * fit_EN: It is a useful procedural source for teaching the need for state first and increasing abstraction only afterwards.
  * scope: interface-layer ([React][2])

### B · Canónico-teórico / Canonical-theoretical

* [ESTABLISHED] Los statecharts ofrecen un modelo formal para representar estados, eventos, transiciones, jerarquía y concurrencia en sistemas reactivos, proporcionando una base más durable que las APIs particulares de una biblioteca de estado.

  * cite: David Harel, *Statecharts: A Visual Formalism for Complex Systems*, 1987, Science of Computer Programming
  * doi: 10.1016/0167-6423(87)90035-9
  * isbn: none
  * ES: Modelado de interfaces como sistemas de estados y transiciones
  * EN: Modeling interfaces as states and transitions
  * fit_ES: Permite enseñar formularios, carga/error/éxito, autenticación y flujos interactivos como máquinas de estado antes de decidir si implementarlos con `useState`, reducers o una store externa.
  * fit_EN: It supports teaching forms, loading/error/success, authentication, and interaction flows as state machines before deciding whether to implement them with `useState`, reducers, or an external store.
  * scope: programming-general ([ScienceDirect][3])

* [ESTABLISHED] El diseño interactivo debe hacer visible el estado del sistema y proporcionar feedback comprensible; esta relación entre acción, estado y feedback sigue siendo una base útil para razonar sobre componentes y UI reactiva.

  * cite: Don Norman, *The Design of Everyday Things: Revised and Expanded Edition*, 2013, Basic Books
  * doi: none
  * isbn: 978-0-465-07299-6
  * ES: Estado visible, feedback y modelos conceptuales de interfaz
  * EN: Visible state, feedback, and conceptual models of interfaces
  * fit_ES: Conecta la gestión técnica del estado con lo que el usuario debe poder percibir y comprender de ese estado.
  * fit_EN: It connects technical state management with what users must be able to perceive and understand about that state.
  * scope: interface-layer ([Archive.org][4])

### C · Académico / Academic

* [EMERGING] La investigación contemporánea sobre componentes de UI sigue tratando el componente reutilizable como unidad arquitectónica independiente de React, Vue o Angular, reforzando la conveniencia de enseñar primero el modelo de componentes y después su implementación en un framework.

  * cite: Yuan et al., *Instantiating UI Components with Distinguishing Variations*, 2026, CHI Conference on Human Factors in Computing Systems
  * doi: 10.1145/3772318.3790621
  * isbn: none
  * ES: Componentes como abstracción de interfaz independiente del framework
  * EN: Components as a framework-independent interface abstraction
  * fit_ES: Refuerza una enseñanza de componentes que sobreviva a cambios de toolchain.
  * fit_EN: It reinforces teaching components as an abstraction that survives toolchain changes.
  * scope: interface-layer ([ACM Digital Library][5])

* [ESTABLISHED] La literatura sobre desarrollo multiplataforma muestra que los frameworks deben compararse en términos de arquitectura, mecanismos de ejecución y trade-offs, no como una jerarquía universal de “mejor” y “peor”.

  * cite: Andreas Biørn-Hansen, Tim A. Majchrzak, Tor-Morten Grønli, *Progressive Web Apps: The Possible Web-Native Unifier for Mobile Development*, 2018, International Conference on Web Information Systems and Technologies / related survey literature
  * doi: 10.1145/3241739
  * isbn: none
  * ES: Comparación de frameworks mediante criterios arquitectónicos
  * EN: Framework comparison through architectural criteria
  * fit_ES: Sirve para presentar React vs Vue vs vanilla como decisión contextual y no como competición de popularidad.
  * fit_EN: It supports presenting React vs Vue vs vanilla as a contextual decision rather than a popularity contest.
  * scope: web-platform ([ACM Digital Library][6])

## React como sustrato docente / React as teaching substrate

### A · Técnico / Technical

* [ESTABLISHED] React ofrece un modelo coherente de componentes funcionales, composición, hooks y actualización declarativa del estado suficientemente compacto para funcionar como sustrato docente posterior a HTML/CSS/JS.

  * cite: Alex Banks, Eve Porcello, *Learning React: Modern Patterns for Developing React Apps*, 2nd ed., 2020, O’Reilly Media
  * doi: none
  * isbn: 978-1-492-05172-5
  * ES: Componentes funcionales, JSX, hooks y composición
  * EN: Functional components, JSX, hooks, and composition
  * fit_ES: Ofrece una transición estructurada desde JavaScript hacia composición de interfaces sin exigir introducir simultáneamente un meta-framework.
  * fit_EN: It offers a structured transition from JavaScript to interface composition without requiring a meta-framework at the same time.
  * scope: interface-layer ([O'Reilly Media][7])

* [UNVERIFIED] La documentación actual de React recomienda escalar desde estado local hacia reducers y Context y advierte que `useEffect` no debe utilizarse para orquestar todo el flujo de datos de una aplicación.

  * cite: React Team, *Built-in React Hooks; Extracting State Logic into a Reducer; Scaling Up with Reducer and Context*, 2026, Meta / React Documentation
  * doi: none
  * isbn: none
  * identifier: [https://react.dev/reference/react/hooks](https://react.dev/reference/react/hooks)
  * status: no-doi-no-isbn
  * ES: Árbol de decisión para hooks y arquitectura de estado
  * EN: Decision tree for hooks and state architecture
  * fit_ES: Es especialmente adecuada para enseñar `useState → useReducer → Context` como escalado motivado por problemas concretos y no como lista de APIs.
  * fit_EN: It is especially suitable for teaching `useState → useReducer → Context` as problem-driven scaling rather than as an API checklist.
  * scope: interface-layer ([React][8])

* [UNVERIFIED] Separar server state de client state introduce una distinción arquitectónica más precisa que tratar toda información de la aplicación como “estado global”.

  * cite: TanStack Contributors, *TanStack Query React Documentation*, 2026, TanStack
  * doi: none
  * isbn: none
  * identifier: [https://tanstack.com/query/latest/docs/framework/react/overview](https://tanstack.com/query/latest/docs/framework/react/overview)
  * status: no-doi-no-isbn
  * ES: Estado cliente frente a estado servidor; caché y sincronización
  * EN: Client state versus server state; caching and synchronization
  * fit_ES: Permite introducir caché, invalidación, refetch y lifecycle de datos después de dominar `fetch`, evitando presentar una store global como solución universal.
  * fit_EN: It introduces caching, invalidation, refetching, and data lifecycles after students understand `fetch`, avoiding a global store as a universal solution.
  * scope: interface-layer ([TanStack][9])

* [UNVERIFIED] El routing moderno de React permite expresar jerarquías anidadas y segmentos dinámicos como parte de la arquitectura de la interfaz.

  * cite: React Router Team, *Routing*, 2026, React Router Documentation
  * doi: none
  * isbn: none
  * identifier: [https://reactrouter.com/start/framework/routing](https://reactrouter.com/start/framework/routing)
  * status: no-doi-no-isbn
  * ES: Routing anidado, dinámico y layouts
  * EN: Nested and dynamic routing and layouts
  * fit_ES: Es suficiente para alfabetización en routing sin convertir SSR o un framework full-stack en un segundo curso.
  * fit_EN: It is sufficient for routing literacy without turning SSR or a full-stack framework into a second course.
  * scope: web-platform ([React Router][10])

* [UNVERIFIED] La seguridad de autenticación en aplicaciones web exige distinguir autenticación, sesión, autorización y almacenamiento/transporte de tokens; un JWT no sustituye ese modelo de seguridad.

  * cite: OWASP Foundation, *Application Security Verification Standard; Authentication Cheat Sheet; Session Management Cheat Sheet*, 2026, OWASP
  * doi: none
  * isbn: none
  * identifier: [https://owasp.org/www-project-application-security-verification-standard/](https://owasp.org/www-project-application-security-verification-standard/)
  * status: no-doi-no-isbn
  * ES: Superficie de autenticación: sesiones, tokens, autorización y XSS
  * EN: Authentication surface: sessions, tokens, authorization, and XSS
  * fit_ES: Proporciona el nivel adecuado de literacy para que alumnado front-end no confunda “guardar un JWT” con implementar autenticación segura.
  * fit_EN: It provides the appropriate literacy level so front-end students do not confuse “storing a JWT” with implementing secure authentication.
  * scope: web-platform ([OWASP Foundation][11])

### B · Canónico-teórico / Canonical-theoretical

* [ESTABLISHED] La separación entre datos locales, coordinación entre componentes y datos remotos puede enseñarse como separación de responsabilidades antes de introducir librerías concretas.

  * cite: Martin Kleppmann, *Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems*, 2017, O’Reilly Media
  * doi: none
  * isbn: 978-1-491-90309-4
  * ES: Ciclos de vida de datos y separación de responsabilidades
  * EN: Data lifecycles and separation of responsibilities
  * fit_ES: Aunque excede el front-end, fundamenta la distinción entre estado de interfaz y datos remotos que después materializan herramientas de server-state.
  * fit_EN: Although broader than front-end development, it grounds the distinction between interface state and remote data later embodied by server-state tools.
  * scope: programming-general ([0-lucas.github.io][12])

### C · Académico / Academic

* [ESTABLISHED] Los asistentes de código pueden resolver o completar tareas de programación, pero su rendimiento y comportamiento no constituyen evidencia de comprensión del alumno, lo que refuerza la necesidad de mantener objetivos conceptuales explícitos al enseñar frameworks.

  * cite: James Prather et al., *“It’s Weird That it Knows What I Want”: Usability and Interactions with Copilot for Novice Programmers*, 2023, ACM Transactions on Computer-Human Interaction
  * doi: 10.1145/3617367
  * isbn: none
  * ES: Comprensión frente a mera producción de código
  * EN: Understanding versus mere code production
  * fit_ES: Sirve para introducir React sin confundir velocidad de generación con dominio de componentes, hooks o estado.
  * fit_EN: It supports teaching React without conflating generation speed with mastery of components, hooks, or state.
  * scope: programming-general ([ACM Digital Library][13])

## Alfabetización en testing y entrega / Testing and delivery literacy

### A · Técnico / Technical

* [ESTABLISHED] Unit, integration/component y system/E2E testing cubren riesgos diferentes y deben entenderse como niveles complementarios de verificación en lugar de como herramientas intercambiables.

  * cite: Paul C. Jorgensen, Byron DeVries, *Software Testing: A Craftsman’s Approach*, 5th ed., 2022, Auerbach Publications / CRC Press
  * doi: none
  * isbn: 978-0-367-76762-4
  * ES: Estrategia multinivel de pruebas
  * EN: Multi-level testing strategy
  * fit_ES: Proporciona una base independiente del toolchain para situar Vitest, Testing Library y Playwright/Cypress dentro de una sola estrategia.
  * fit_EN: It provides a toolchain-independent basis for locating Vitest, Testing Library, and Playwright/Cypress within one strategy.
  * scope: programming-general ([Amazon][14])

* [UNVERIFIED] Testing Library operacionaliza una filosofía de pruebas de componentes basada en comportamiento observable y consultas próximas a cómo interactúa un usuario, evitando depender innecesariamente de detalles internos de implementación.

  * cite: Testing Library Contributors, *Guiding Principles*, 2026, Testing Library
  * doi: none
  * isbn: none
  * identifier: [https://testing-library.com/docs/guiding-principles/](https://testing-library.com/docs/guiding-principles/)
  * status: no-doi-no-isbn
  * ES: Pruebas de componentes orientadas al comportamiento observable
  * EN: Observable-behavior-oriented component testing
  * fit_ES: Es adecuada para evitar que las pruebas de React se conviertan en inspección de estado interno o de la implementación de hooks.
  * fit_EN: It helps prevent React tests from degenerating into inspection of internal state or hook implementation details.
  * scope: interface-layer ([Testing Library][15])

* [UNVERIFIED] Playwright combina navegación real en navegador, assertions con reintento, aislamiento y ejecución multi-browser, por lo que es una referencia procedimental útil para alfabetización E2E y CI.

  * cite: Microsoft, *Playwright Documentation*, 2026, Microsoft
  * doi: none
  * isbn: none
  * identifier: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
  * status: no-doi-no-isbn
  * ES: Pruebas E2E, navegadores reales y ejecución en CI
  * EN: E2E testing, real browsers, and CI execution
  * fit_ES: Permite cerrar el recorrido unit → component → E2E y conectar las pruebas con el proceso de entrega.
  * fit_EN: It closes the unit → component → E2E progression and connects testing to delivery practice.
  * scope: web-platform ([Playwright][16])

### B · Canónico-teórico / Canonical-theoretical

* [ESTABLISHED] El testing es una actividad de razonamiento y resolución de problemas, no simplemente la ejecución mecánica de casos de prueba.

  * cite: Eduard Enoiu, Gerald Tukseferi, Robert Feldt, *Towards a Model of Testers’ Cognitive Processes: Software Testing as a Problem Solving Approach*, 2020, International Conference on Software Testing, Verification and Validation Workshops
  * doi: 10.1109/ICSTW50294.2020.00042
  * isbn: none
  * ES: Testing como razonamiento sobre fallos y comportamiento
  * EN: Testing as reasoning about failures and behavior
  * fit_ES: Ayuda a evaluar que el alumnado sabe formular riesgos, diseñar tests y explicar por qué una prueba aporta evidencia.
  * fit_EN: It helps assess whether students can formulate risks, design tests, and explain why a test provides evidence.
  * scope: programming-general

### C · Académico / Academic

* [ESTABLISHED] Las pruebas UI automatizadas presentan problemas específicos de flakiness, de modo que enseñar E2E exige también enseñar aislamiento, sincronización y diagnóstico y no solo sintaxis de una herramienta.

  * cite: Marko Lam et al., *An Empirical Analysis of UI-Based Flaky Tests*, 2021, IEEE/ACM International Conference on Software Engineering
  * doi: 10.1109/ICSE43902.2021.00141
  * isbn: none
  * ES: Flakiness y fiabilidad de pruebas de interfaz
  * EN: Flakiness and reliability of interface tests
  * fit_ES: Justifica pedagógicamente tratar waits, fixtures, aislamiento y condiciones observables como conceptos de testing.
  * fit_EN: It justifies teaching waits, fixtures, isolation, and observable conditions as testing concepts rather than tool trivia.
  * scope: interface-layer ([ACM Digital Library][17])

* [EMERGING] Los agentes de coding pueden producir suites con exceso de mocking, lo que refuerza la necesidad de revisar críticamente los tests generados por IA y comprobar qué comportamiento real validan.

  * cite: Andre Hora et al., *Are Coding Agents Generating Over-Mocked Tests? An Empirical Study of Mocking in Agent-Generated Test Suites*, 2026, International Conference on Software Engineering
  * doi: 10.1145/3793302.3793362
  * isbn: none
  * ES: Auditoría de pruebas generadas por agentes
  * EN: Auditing agent-generated tests
  * fit_ES: Introduce una práctica profesional concreta: un test generado por IA debe defenderse por su cobertura semántica, no aceptarse porque pase.
  * fit_EN: It introduces a concrete professional practice: an AI-generated test must be defended by its semantic coverage, not accepted merely because it passes.
  * scope: programming-general ([ACM Digital Library][18])

## Evaluación de estudio/proyecto bajo GenAI / Studio-project assessment under GenAI

### A · Técnico / Technical

* [ESTABLISHED] Las guías curriculares recientes para programación reconocen que GenAI obliga a revisar enseñanza y evaluación y recomiendan integrar su uso de manera explícita en lugar de depender únicamente de prohibiciones o detección.

  * cite: Joyce Mahon, Brian Mac Namee, Brett A. Becker, *Guidelines for the Evolving Role of Generative AI in Introductory Programming Based on Emerging Practice*, 2024, Proceedings of ITiCSE 2024
  * doi: 10.1145/3649217.3653602
  * isbn: none
  * ES: Política explícita de IA y evaluación de comprensión
  * EN: Explicit AI policy and assessment of understanding
  * fit_ES: Sustenta una metodología donde se declara el uso de IA y se evalúa lo que el estudiante comprende, modifica y verifica.
  * fit_EN: It supports a method in which AI use is disclosed and assessment focuses on what students understand, modify, and verify.
  * scope: programming-general ([ResearchGate][19])

### B · Canónico-teórico / Canonical-theoretical

* [ESTABLISHED] El aprendizaje basado en proyectos gana fuerza cuando el producto se acompaña de oportunidades para explicar decisiones, revisar progresivamente el trabajo y demostrar conocimiento individual.

  * cite: Andrés Lara et al., *A Project-based Learning Experience in a Compilers Course*, 2019, SIGCSE Technical Symposium on Computer Science Education
  * doi: 10.1145/3300115.3309502
  * isbn: none
  * ES: Proyecto incremental con defensa individual
  * EN: Incremental project with individual defence
  * fit_ES: Aunque procede de compiladores, apoya directamente el uso combinado de entregas por etapas y examen/defensa oral individual.
  * fit_EN: Although drawn from a compilers course, it directly supports combining staged deliverables with an individual oral examination/defence.
  * scope: programming-general ([ACM Digital Library][20])

### C · Académico / Academic

* [EMERGING] En tareas de programación sobre código existente, Copilot modifica tanto la eficiencia como el proceso seguido por estudiantes, haciendo necesario evaluar el proceso y no únicamente la salida final.

  * cite: Md Istiak Hossain Shihab, Christopher Hundhausen, Ahsun Tariq, Summit Haque, Yunhan Qiao, Brian Wise Mulanda, *The Effects of GitHub Copilot on Computing Students’ Programming Effectiveness, Efficiency, and Processes in Brownfield Programming Tasks*, 2025, ACM Conference on International Computing Education Research
  * doi: 10.1145/3702652.3744219
  * isbn: none
  * ES: Evidencia de proceso en programación asistida por IA
  * EN: Process evidence in AI-assisted programming
  * fit_ES: Es una base fuerte para exigir commits, decisiones intermedias, revisión de cambios y explicación de cómo se llegó al código entregado.
  * fit_EN: It strongly supports requiring commits, intermediate decisions, change review, and explanation of how the submitted code was produced.
  * scope: programming-general ([ACM Digital Library][21])

* [EMERGING] La evaluación de proyectos web universitarios está empezando a estudiar específicamente cómo GenAI debilita la equivalencia entre “aplicación terminada” y “comprensión demostrada”.

  * cite: authors not fully exposed in indexed record, *Investigating Web Project Assessment in an AI World*, 2026, ACM computing-education proceedings
  * doi: 10.1145/3772363.3798887
  * isbn: none
  * ES: Evaluación de proyectos web en contexto GenAI
  * EN: Web-project assessment in the GenAI context
  * fit_ES: Es una de las referencias más directamente alineadas con proyectos front-end, pero conviene auditar autoría y resultados completos en Pass 2.
  * fit_EN: It is among the references most directly aligned with front-end projects, but its full authorship and findings should be audited in Pass 2.
  * scope: web-platform ([ACM Digital Library][22])

* [EMERGING] La defensa oral del código aparece en estudios recientes como mecanismo para comprobar si un estudiante puede explicar lógica y decisiones incluso cuando parte del artefacto ha sido generado con IA.

  * cite: S. Zhu, Y. Liu et al., *Generative AI in Programming Education: An Empirical Analysis of Student Performance and Assessment*, 2026, ACM proceedings
  * doi: 10.1145/3806980.3806985
  * isbn: none
  * ES: Defensa oral de código asistido por IA
  * EN: Oral defence of AI-assisted code
  * fit_ES: Se ajusta directamente a una evaluación donde el portfolio cuenta, pero la nota depende también de poder explicar y modificar el código.
  * fit_EN: It directly supports assessment where the portfolio matters but grades also depend on being able to explain and modify the code.
  * scope: programming-general ([semanticscholar.org][23])

## Cross-cut · AI-assisted coding methodology (cutting edge, teachable)

### A · Técnico / Technical

* [EMERGING] La integración responsable de GenAI en programación se está desplazando desde “permitir/prohibir” hacia secuencias explícitas de uso, objetivos pedagógicos y límites sobre qué tareas deben permanecer bajo control cognitivo del estudiante.

  * cite: Joyce Mahon, Brian Mac Namee, Brett A. Becker, *Guidelines for the Evolving Role of Generative AI in Introductory Programming Based on Emerging Practice*, 2024, ITiCSE 2024
  * doi: 10.1145/3649217.3653602
  * isbn: none
  * ES: Uso estructurado y declarado de asistentes de código
  * EN: Structured and disclosed use of coding assistants
  * fit_ES: Fundamenta una metodología docs-first donde problema, arquitectura y criterios de aceptación se escriben antes de solicitar generación.
  * fit_EN: It supports a docs-first method in which problem, architecture, and acceptance criteria are written before generation is requested.
  * scope: programming-general ([ResearchGate][19])

* [EMERGING] Las propuestas recientes de software-engineering education recomiendan tratar herramientas GenAI como parte del entorno profesional, preservando explícitamente competencias de especificación, verificación y juicio técnico.

  * cite: Nils Randall, Daniel Wäckerle, Nicolas Stein, Daniel Goßler, Stefan Bente, *What an AI-Embracing Software Engineering Curriculum Should Look Like: An Empirical Study*, 2024, IEEE Software
  * doi: 10.1109/MS.2023.3344682
  * isbn: none
  * ES: Contratos, verificación y juicio técnico en desarrollo con IA
  * EN: Contracts, verification, and technical judgment in AI-assisted development
  * fit_ES: Ayuda a situar la IA como colaborador probabilístico sujeto a requisitos, tests y revisión, no como fuente de autoridad.
  * fit_EN: It helps position AI as a probabilistic collaborator constrained by requirements, tests, and review rather than as an authority.
  * scope: programming-general ([Manuel B. Garcia][24])

### B · Canónico-teórico / Canonical-theoretical

* [ESTABLISHED] La autorregulación del aprendizaje distingue planificación, monitorización y evaluación del propio desempeño, proporcionando una base teórica adecuada para diseñar workflows con IA que exijan pensar antes, durante y después de generar código.

  * cite: Barry J. Zimmerman, *Attaining Self-Regulation: A Social Cognitive Perspective*, 2000, Handbook of Self-Regulation, Academic Press
  * doi: 10.1016/B978-012109890-2/50031-7
  * isbn: none
  * ES: Planificación, monitorización y reflexión metacognitiva
  * EN: Metacognitive planning, monitoring, and reflection
  * fit_ES: Permite convertir “plan before implementation” en una práctica cognitiva evaluable y no solo en una convención documental.
  * fit_EN: It turns “plan before implementation” into an assessable cognitive practice rather than merely a documentation convention.
  * scope: programming-general

* [ESTABLISHED] La carga cognitiva durante la resolución de problemas depende de cuánto trabajo mental recae sobre procesos que todavía no están automatizados, por lo que una ayuda demasiado completa puede reducir la práctica cognitiva relevante.

  * cite: John Sweller, *Cognitive Load During Problem Solving: Effects on Learning*, 1988, Cognitive Science
  * doi: 10.1207/s15516709cog1202_4
  * isbn: none
  * ES: Andamiaje gradual frente a sustitución de la resolución
  * EN: Graduated scaffolding versus replacement of problem solving
  * fit_ES: Es una base teórica para retrasar autocomplete/generación completa y ofrecer primero hints, preguntas o diagnóstico.
  * fit_EN: It provides a theoretical basis for delaying autocomplete/full generation and offering hints, questions, or diagnosis first.
  * scope: programming-general ([DROPS][25])

### C · Académico / Academic

* [EMERGING] El uso de LLM por programadores noveles interactúa con autorregulación, autoeficacia y miedo al fracaso; la herramienta no produce un efecto pedagógico uniforme entre estudiantes.

  * cite: Lauren E. Margulieux, James Prather, Brent N. Reeves, Brett A. Becker, Gozde Cetin Uzun, Dastyni Loksa, Juho Leinonen, Paul Denny, *Self-Regulation, Self-Efficacy, and Fear of Failure Interactions with How Novices Use LLMs to Solve Programming Problems*, 2024, ITiCSE 2024
  * doi: 10.1145/3649217.3653621
  * isbn: none
  * ES: Autorregulación en resolución de problemas con LLM
  * EN: Self-regulation in LLM-assisted problem solving
  * fit_ES: Apoya workflows que hagan visibles planificación, consultas a IA, comprobación y revisión en vez de medir solo el resultado.
  * fit_EN: It supports workflows that make planning, AI queries, checking, and revision visible rather than measuring only the result.
  * scope: programming-general ([arXiv][26])

* [EMERGING] Estudios longitudinales de aula muestran que el acceso a LLM puede cambiar tanto los resultados como las estrategias empleadas por estudiantes de informática, por lo que es necesario observar comportamiento de aprendizaje y no solo exactitud del código.

  * cite: Weizhe Lyu, Yifan Wang, Tsz R. Chung, Yizhou Sun, Yizhou Zhang, *Evaluating the Effectiveness of LLMs in Introductory Computer Science Education: A Semester-Long Field Study*, 2024, ACM Learning @ Scale
  * doi: 10.1145/3657604.3662036
  * isbn: none
  * ES: Seguimiento longitudinal del aprendizaje con LLM
  * EN: Longitudinal observation of learning with LLMs
  * fit_ES: Refuerza la necesidad de registrar cómo se usa la asistencia y cuándo se retira.
  * fit_EN: It reinforces the need to record how assistance is used and when it is withdrawn.
  * scope: programming-general ([Benyamin Tabarsi][27])

* [EMERGING] Los asistentes que proporcionan scaffolding limitado en lugar de soluciones completas constituyen una línea activa de investigación específicamente orientada a preservar la actividad del estudiante.

  * cite: Lee-Roy Tye Dobson, Sokratis Karkalas, *Exploring Minimally Intrusive GenAI Scaffolding for Introductory Programming Education*, 2026, ICSIE 2026
  * doi: 10.1145/3789595.3789611
  * isbn: none
  * ES: Asistencia mínima, hints y retirada progresiva
  * EN: Minimal assistance, hints, and progressive fading
  * fit_ES: Es una referencia particularmente adecuada para implementar “ayuda diferida”: diagnóstico y pista antes de código completo.
  * fit_EN: It is particularly well suited to implementing “deferred assistance”: diagnosis and hints before complete code.
  * scope: programming-general ([ACM Digital Library][28])

* [EMERGING] El efecto de Copilot sobre estudiantes no se limita a productividad: estudios recientes documentan cambios en los procesos de resolución, lo que hace metodológicamente insuficiente evaluar solo corrección o tiempo.

  * cite: Md Istiak Hossain Shihab et al., *The Effects of GitHub Copilot on Computing Students’ Programming Effectiveness, Efficiency, and Processes in Brownfield Programming Tasks*, 2025, ICER 2025
  * doi: 10.1145/3702652.3744219
  * isbn: none
  * ES: Trazabilidad del proceso de desarrollo asistido
  * EN: Traceability of the AI-assisted development process
  * fit_ES: Encaja directamente con commits, changelogs, notas de decisión y comparación entre propuesta del modelo y código finalmente aceptado.
  * fit_EN: It maps directly to commits, changelogs, decision notes, and comparison between model proposals and the code ultimately accepted.
  * scope: programming-general ([ACM Digital Library][21])

* [ESTABLISHED] GenAI puede ampliar diferencias entre novatos al beneficiar especialmente a quienes ya poseen capacidad suficiente para evaluar y corregir sus respuestas.

  * cite: James Prather, Brent N. Reeves, Juho Leinonen, Stephen MacNeil, Arisoa S. Randrianasolo, Brett A. Becker, Bailey Kimmel, Jared Wright, Ben Briggs, *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers*, 2024, ACM Conference on International Computing Education Research
  * doi: 10.1145/3632620.3671116
  * isbn: none
  * ES: Riesgo de dependencia y ampliación de diferencias de competencia
  * EN: Dependency risk and widening competence gaps
  * fit_ES: Es una razón empírica para no introducir generación ilimitada antes de que el alumnado pueda leer, ejecutar, depurar y cuestionar el código recibido.
  * fit_EN: It provides empirical support for withholding unrestricted generation until students can read, execute, debug, and challenge generated code.
  * scope: programming-general ([arXiv][26])

* [EMERGING] Los sistemas educativos de programación que sustituyen respuestas completas por orientación socrática, preguntas y hints constituyen una respuesta explícita al riesgo de que la IA haga el trabajo cognitivo del alumno.

  * cite: H. Goyal et al., *Sakshm AI: Advancing AI-Assisted Coding Education for Novice Programmers through Socratic Guidance*, 2026, ACM Transactions on Computing Education
  * doi: 10.1145/3788679
  * isbn: none
  * ES: Tutoría socrática para programación asistida
  * EN: Socratic tutoring for AI-assisted programming
  * fit_ES: Sustenta una política de “hints before answers” y de retirada graduada de asistencia.
  * fit_EN: It supports a “hints before answers” policy and graduated withdrawal of assistance.
  * scope: programming-general ([ACM Digital Library][29])

## Gaps

* **Evidencia específicamente front-end.** La mayor parte de la investigación rigurosa sobre GenAI + aprendizaje de programación sigue utilizando CS1, Java, Python, C/C++ o tareas software-engineering generales; existe mucha menos evidencia experimental sobre aprendizaje de React, hooks, routing o arquitectura de estado con Copilot-class tools. El trabajo de 2026 sobre evaluación de proyectos web es una excepción emergente, no todavía un cuerpo consolidado. ([ACM Digital Library][22])

* **React vs Vue vs vanilla como decisión pedagógica.** Hay abundante documentación profesional y comparación técnica, pero falta una literatura empírica fuerte que permita afirmar que un framework concreto produzca mejores resultados de aprendizaje después de una base vanilla. La decisión debe presentarse por ahora como curricular/arquitectónica, no como consenso experimental.

* **Taxonomía académica de anti-patterns de estado SPA.** Existen taxonomías maduras de anti-patterns en otras áreas de ingeniería software y abundante discusión profesional sobre prop drilling, duplicated/derived state, global-state overuse y misuse de Effects, pero una taxonomía académica reciente y ampliamente validada específicamente para estado de React/SPAs sigue siendo delgada. La documentación oficial de React cubre varios de estos errores, pero es `scope: practitioner`. ([React][30])

* **Árbol de decisión para stores externas.** `useState → useReducer → Context → external store` es una secuencia pedagógicamente defendible, pero no aparece como estándar académico único. La distinción client-state/server-state está mejor documentada profesionalmente que evaluada comparativamente en educación. ([React][31])

* **Oral code defence bajo GenAI.** La defensa oral está ganando apoyo explícito en trabajos 2025–2026 y tiene antecedentes pre-GenAI en project-based computing education, pero todavía falta evidencia longitudinal que establezca formatos, duración, fiabilidad interevaluador y escalabilidad óptimos, especialmente para cursos web grandes. ([ACM Digital Library][20])

* **Version history como evidencia de comprensión.** Git/VCS ofrece datos de proceso y existen trabajos de learning analytics que explotan trazas de programación, pero sigue faltando consenso sobre qué patrones de commits constituyen evidencia válida de comprensión cuando un agente puede generar cambios completos, reescribir historial o producir commits plausibles. Por tanto, historial + defensa + tests es más defendible que historial aislado. ([IEEE Xplore][32])

* **Docs-first / architectural contracts antes de implementación.** La literatura de software engineering y GenAI respalda cada vez más especificación, verificación y supervisión humana, pero todavía es escasa la evidencia HE que compare experimentalmente un workflow explícito `requirements → plan → architecture/contracts → implementation → tests → review` frente a prompting directo en estudiantes de front-end.

* **Observabilidad del razonamiento sin invadir privacidad.** Registrar prompts, diffs, tests y decisiones puede hacer visible el proceso, pero todavía faltan marcos consolidados que determinen qué telemetry educativa es necesaria, proporcional y éticamente aceptable.

* **Scaffolded/deferred assistance.** La línea 2025–2026 sobre hints, tutores socráticos y asistencia mínimamente intrusiva es prometedora, pero aún es emergente y mayoritariamente programming-general; no debe presentarse como consenso definitivo para enseñanza de React. ([ACM Digital Library][33])

* **Testing de código generado por agentes.** La evidencia reciente de over-mocking y otros defectos de tests generados vuelve especialmente importante enseñar al alumnado a justificar qué propiedad verifica cada prueba; todavía falta investigación educativa que determine el mejor modo de evaluar esa competencia. ([ACM Digital Library][18])

* **SSR/framework mode/i18n.** Hay documentación técnica madura, pero poca razón bibliográfica para convertirlos en otro núcleo curricular si el objetivo es front-end durable core + React. Se justifican mejor como alfabetización avanzada conectada a rendering, routing, hydration y arquitectura, no como requisito para dominar un segundo meta-framework. ([TanStack][34])

[1]: https://dl.acm.org/doi/book/10.1145/3664191?utm_source=chatgpt.com "Computer Science Curricula 2023 | ACM Other Books"
[2]: https://react.dev/learn/managing-state?utm_source=chatgpt.com "Managing State"
[3]: https://www.sciencedirect.com/science/article/pii/0167642387900359?utm_source=chatgpt.com "Statecharts: a visual formalism for complex systems"
[4]: https://ia902800.us.archive.org/3/items/thedesignofeverydaythingsbydonnorman/The%20Design%20of%20Everyday%20Things%20by%20Don%20Norman.pdf?utm_source=chatgpt.com "The Design of Everyday Things by Don Norman. ..."
[5]: https://dl.acm.org/doi/10.1145/3772318.3790621?utm_source=chatgpt.com "Instantiating UI Components with Distinguishing Variations"
[6]: https://dl.acm.org/doi/fullHtml/10.1145/3241739?utm_source=chatgpt.com "A Survey and Taxonomy of Core Concepts and Research ..."
[7]: https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/?utm_source=chatgpt.com "Learning React, 2nd Edition [Book]"
[8]: https://react.dev/reference/react/useReducer?utm_source=chatgpt.com "useReducer"
[9]: https://tanstack.com/query/latest/docs/framework/react/overview?utm_source=chatgpt.com "Overview | TanStack Query React Docs"
[10]: https://reactrouter.com/start/framework/routing?utm_source=chatgpt.com "Routing"
[11]: https://owasp.org/www-project-application-security-verification-standard/?utm_source=chatgpt.com "OWASP Application Security Verification Standard (ASVS)"
[12]: https://0-lucas.github.io/digital-garden/99.-Books/Martin-Kleppmann---Designing-Data-Intensive-Applications_-O%E2%80%99Reilly-Media-%282017%29.pdf?utm_source=chatgpt.com "designing data intensive applications"
[13]: https://dl.acm.org/doi/10.1145/3617367?utm_source=chatgpt.com "“It's Weird That it Knows What I Want”: Usability and ..."
[14]: https://www.amazon.com/Software-Testing-Craftsmans-Approach-Fifth/dp/0367767627?utm_source=chatgpt.com "Software Testing: Jorgensen, Paul C., DeVries, Byron"
[15]: https://testing-library.com/docs/guiding-principles/?utm_source=chatgpt.com "Guiding Principles"
[16]: https://playwright.dev/docs/intro?utm_source=chatgpt.com "Installation"
[17]: https://dl.acm.org/doi/pdf/10.1109/ICSE43902.2021.00141?utm_source=chatgpt.com "An Empirical Analysis of UI-Based Flaky Tests"
[18]: https://dl.acm.org/doi/10.1145/3793302.3793362?utm_source=chatgpt.com "Are Coding Agents Generating Over-Mocked Tests? An ..."
[19]: https://www.researchgate.net/publication/381958338_Guidelines_for_the_Evolving_Role_of_Generative_AI_in_Introductory_Programming_Based_on_Emerging_Practice?utm_source=chatgpt.com "(PDF) Guidelines for the Evolving Role of Generative AI in ..."
[20]: https://dl.acm.org/doi/pdf/10.1145/3300115.3309502?utm_source=chatgpt.com "A Project-based Learning Experience in a Compilers Course"
[21]: https://dl.acm.org/doi/10.1145/3702652.3744219?utm_source=chatgpt.com "The Effects of GitHub Copilot on Computing Students ..."
[22]: https://dl.acm.org/doi/10.1145/3772363.3798887?utm_source=chatgpt.com "Investigating Web Project Assessment in an AI World"
[23]: https://www.semanticscholar.org/paper/Generative-AI-in-Programming-Education%3A-An-Analysis-Zhu-Liu/b70ae249b711630881912d010965a9a9d868fb06?utm_source=chatgpt.com "Generative AI in Programming Education: An Empirical Analysis ..."
[24]: https://manuelgarcia.info/publication/chatgpt-programming-education?utm_source=chatgpt.com "Teaching and Learning Computer Programming Using ChatGPT"
[25]: https://drops.dagstuhl.de/entities/document/10.4230/OASIcs.ICPEC.2026.8?utm_source=chatgpt.com "Learning, Not Just Coding: Scaffolded AI Assistance ... - DROPS"
[26]: https://arxiv.org/pdf/2501.08864?utm_source=chatgpt.com "The New Calculator? Practices, Norms, and Implications of ..."
[27]: https://benyamintabarsi.com/assets/pdf/Herald%20of%20Advancement%2C%20Disruption%2C%20or%20Both%20A%20Systematic%20Literature%20Review%20on%20Student-Facing%20LLM%20Tools%20in%20Undergraduate%20Computing%20Education.pdf?utm_source=chatgpt.com "A Systematic Literature Review on Student-Facing LLM Tools ..."
[28]: https://dl.acm.org/doi/proceedings/10.1145/3789595?utm_source=chatgpt.com "ICSIE '26: Proceedings of the 2026 14th International ..."
[29]: https://dl.acm.org/doi/full/10.1145/3788679?utm_source=chatgpt.com "Sakshm AI: Advancing AI-Assisted Coding Education for ..."
[30]: https://react.dev/learn/you-might-not-need-an-effect?utm_source=chatgpt.com "You Might Not Need an Effect"
[31]: https://react.dev/learn/scaling-up-with-reducer-and-context?utm_source=chatgpt.com "Scaling Up with Reducer and Context"
[32]: https://ieeexplore.ieee.org/iel8/6287639/10380310/10788690.pdf?utm_source=chatgpt.com "Detecting Learning Behavior in Programming Assignments ..."
[33]: https://dl.acm.org/doi/10.1145/3789595.3789611?utm_source=chatgpt.com "Exploring Minimally Intrusive GenAI Scaffolding for ..."
[34]: https://tanstack.com/query/latest/docs/framework/react/guides/ssr?utm_source=chatgpt.com "Server Rendering & Hydration | TanStack Query React Docs"
