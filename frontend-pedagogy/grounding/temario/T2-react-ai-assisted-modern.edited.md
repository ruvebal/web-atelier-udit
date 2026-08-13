# Temario bibliography — T2 React / AI-assisted modern — edited merge
<!-- pass1 + pass2 reconciled · bilingual ES/EN · frontend-pedagogy -->

## Provenance

- pass1_prompt: `T2-react-ai-assisted-modern.pass1.prompt.md`
- pass1_artifact: `T2-react-ai-assisted-modern.pass1.raw.md`
- pass1_surface: ChatGPT Deep Research · external model A
- pass2_artifact: `T2-react-ai-assisted-modern.pass2.raw.md`
- pass2_surface: Claude Cloud · external model B
- merge_surface: Codex careful human+tools · Pass 3
- date: 2026-08-11
- merge_policy: promoted only pass2-confirmed or pass2-disputed-corrected records with DOI/ISBN; unresolved records remain in Quarantine

## Filosofía de frameworks y alfabetización del estado / Framework philosophy and state literacy

### A · Técnico / Technical

- [ESTABLISHED] Un currículo moderno de informática debe distinguir principios duraderos de tecnologías concretas y enseñar diseño de software, interacción y desarrollo web como conocimientos transferibles.
  - cite: ACM/IEEE-CS/AAAI Joint Task Force, *Computer Science Curricula 2023: Curriculum Guidelines for Undergraduate Degree Programs in Computer Science*, 2024, ACM
  - doi: 10.1145/3664191
  - isbn: 979-8-4007-1033-9
  - ES: Principios curriculares duraderos frente a tecnologías volátiles
  - EN: Durable curriculum principles versus volatile technologies
  - fit_ES: Justifica una progresión desde plataforma y componentes hacia frameworks sin convertir React en el objetivo final.
  - fit_EN: It justifies progressing from platform and components to frameworks without making React the endpoint.
  - scope: programming-general
  - verified_by: pass2-confirmed

### B · Canónico-teórico / Canonical-theoretical

No se promueve Harel: Pass 2 lo dejó `unverifiable` aunque el DOI sea formalmente plausible.

### C · Académico / Academic

- [EMERGING] La investigación contemporánea sobre componentes de UI trata el componente reutilizable como unidad arquitectónica independiente de React, Vue o Angular.
  - cite: Priyan Vaithilingam, Alan Leung, Jeffrey Nichols, and Titus Barik, *The Way We Notice, That’s What Really Matters: Instantiating UI Components with Distinguishing Variations*, 2026, CHI Conference on Human Factors in Computing Systems
  - doi: 10.1145/3772318.3790621
  - ES: Variaciones distinguibles en componentes de UI
  - EN: Distinguishing variations in UI components
  - fit_ES: Refuerza enseñar primero el modelo de componentes y después su implementación en React u otro framework.
  - fit_EN: It supports teaching the component model before its implementation in React or another framework.
  - scope: interface-layer
  - verified_by: pass2-disputed-corrected
  - verification_url: https://static.barik.net/barik/publications/chi2026/vaithilingam_celestial_chi26.pdf

- [ESTABLISHED] La literatura sobre desarrollo multiplataforma muestra que los frameworks deben compararse por arquitectura, mecanismos de ejecución y trade-offs.
  - cite: Andreas Biørn-Hansen, Tim A. Majchrzak, Tor-Morten Grønli, *Progressive Web Apps: The Possible Web-native Unifier for Mobile Development*, 2017, *Proceedings of the 13th International Conference on Web Information Systems and Technologies (WEBIST 2017)*
  - doi: 10.5220/0006353703440351
  - isbn: 978-989-758-246-2
  - ES: Comparación arquitectónica de aplicaciones web progresivas
  - EN: Architectural comparison of progressive web applications
  - fit_ES: Permite enseñar trade-offs de ejecución y plataforma sin presentar un framework como universalmente superior.
  - fit_EN: It supports teaching execution and platform trade-offs without treating one framework as universally superior.
  - scope: web-platform
  - verified_by: pass2-disputed-corrected
  - verification_url: https://www.scitepress.org/Papers/2017/63537/63537.pdf

## React como sustrato docente / React as a teaching substrate

### A · Técnico / Technical

No se promueven documentación de React, TanStack, React Router u OWASP: Pass 2 las dejó `unverifiable` y no tienen DOI/ISBN bibliográfico.

### B · Canónico-teórico / Canonical-theoretical

No se promueve una monografía de React/estado en esta merge: los ISBN de Banks/Porcello, Norman y Kleppmann quedaron `unverifiable`.

### C · Académico / Academic

- [ESTABLISHED] Los asistentes de código pueden completar tareas, pero su comportamiento no constituye evidencia de comprensión del alumno.
  - cite: James Prather et al., *“It’s Weird That it Knows What I Want”: Usability and Interactions with Copilot for Novice Programmers*, 2023, *ACM Transactions on Computer-Human Interaction*
  - doi: 10.1145/3617367
  - ES: Copilot, usabilidad y comprensión de programadores noveles
  - EN: Copilot, usability, and novice programmers’ understanding
  - fit_ES: Justifica mantener objetivos conceptuales explícitos al enseñar un sustrato de framework.
  - fit_EN: It supports keeping explicit conceptual objectives when teaching with a framework substrate.
  - scope: programming-general
  - verified_by: pass2-confirmed

## Testing y delivery literacy / Testing and delivery literacy

### A · Técnico / Technical

- [EMERGING] Los agentes de coding pueden producir suites con exceso de mocking, por lo que los tests generados por IA deben revisarse contra comportamiento real.
  - cite: Andre Hora and Romain Robbes, *Are Coding Agents Generating Over-Mocked Tests? An Empirical Study*, 2026, *23rd International Conference on Mining Software Repositories (MSR ’26)*
  - doi: 10.1145/3793302.3793362
  - ES: Mocking excesivo en tests generados por agentes
  - EN: Over-mocking in agent-generated tests
  - fit_ES: Introduce revisión crítica de tests generados y exige comprobar qué comportamiento validan.
  - fit_EN: It introduces critical review of generated tests and requires checking what behavior they validate.
  - scope: programming-general
  - verified_by: pass2-disputed-corrected
  - verification_url: https://andrehora.github.io/pub/2026-msr-agents-over-mocked-tests.pdf

### B · Canónico-teórico / Canonical-theoretical

No se promueven Jorgensen/DeVries, Testing Library ni Playwright: quedaron `unverifiable` en Pass 2.

### C · Académico / Academic

No se promueven Enoiu et al. ni Lam et al.: sus DOI quedaron `unverifiable` en Pass 2.

## Studio-project assessment under GenAI

### A · Técnico / Technical

No se promueve una documentación de herramienta como evidencia de evaluación; el ancla se mantiene separada de la literatura pedagógica.

### B · Canónico-teórico / Canonical-theoretical

- [ESTABLISHED] El aprendizaje basado en proyectos gana fuerza cuando el producto se acompaña de oportunidades para explicar decisiones, revisar progresivamente el trabajo y demostrar conocimiento individual.
  - cite: Andrés Lara et al., *A Project-based Learning Experience in a Compilers Course*, 2019, *SIGCSE Technical Symposium on Computer Science Education*
  - doi: 10.1145/3300115.3309502
  - ES: Evaluación de proyecto con explicación y revisión progresiva
  - EN: Project assessment with explanation and progressive review
  - fit_ES: Apoya defensas orales y evidencias de proceso para complementar el artefacto final.
  - fit_EN: It supports oral defenses and process evidence alongside the final artifact.
  - scope: programming-general
  - verified_by: pass2-confirmed

### C · Académico / Academic

- [EMERGING] La evaluación de proyectos web universitarios está estudiando cómo GenAI debilita la equivalencia entre aplicación terminada y comprensión demostrada.
  - cite: Francesca Russo, Juan Pablo Saenz, and Luigi De Russis, *Investigating Web Project Assessment in an AI World*, 2026, *CHI Conference on Human Factors in Computing Systems Extended Abstracts (CHI EA ’26)*
  - doi: 10.1145/3772363.3798887
  - ES: Evaluación de proyectos web en contexto GenAI
  - EN: Web-project assessment in a GenAI context
  - fit_ES: Justifica evaluar explicación, decisiones y comprensión además de la aplicación entregada.
  - fit_EN: It supports assessing explanation, decisions, and understanding beyond the delivered application.
  - scope: interface-layer
  - verified_by: pass2-disputed-corrected
  - verification_url: https://iris.polito.it/handle/11583/3008077

## Cross-cut · AI-assisted coding methodology

### A · Técnico / Technical

No se promueven las citas de Copilot/brownfield ni las guías de GenAI cuyos DOI quedaron `unverifiable`; el único estudio de Copilot promovido aparece una vez arriba.

### B · Canónico-teórico / Canonical-theoretical

- [ESTABLISHED] La autorregulación distingue planificación, monitorización y evaluación del propio desempeño, proporcionando una base para workflows con IA.
  - cite: Barry J. Zimmerman, *Attaining Self-Regulation: A Social Cognitive Perspective*, 2000, *Handbook of Self-Regulation*, Academic Press
  - doi: 10.1016/B978-012109890-2/50031-7
  - ES: Autorregulación del aprendizaje en workflows con IA
  - EN: Self-regulated learning in AI-supported workflows
  - fit_ES: Permite exigir pensar antes, durante y después de generar código.
  - fit_EN: It supports requiring thought before, during, and after code generation.
  - scope: programming-general
  - verified_by: pass2-confirmed

- [ESTABLISHED] La carga cognitiva durante la resolución de problemas depende del trabajo mental que recae sobre procesos todavía no automatizados.
  - cite: John Sweller, *Cognitive Load During Problem Solving: Effects on Learning*, 1988, *Cognitive Science*
  - doi: 10.1207/s15516709cog1202_4
  - ES: Carga cognitiva y límites de la asistencia
  - EN: Cognitive load and limits of assistance
  - fit_ES: Fundamenta limitar la ayuda completa cuando elimina la práctica cognitiva relevante.
  - fit_EN: It supports limiting full solutions when they remove relevant cognitive practice.
  - scope: programming-general
  - verified_by: pass2-confirmed

### C · Académico / Academic

- [ESTABLISHED] GenAI puede ampliar diferencias entre novatos al beneficiar especialmente a quienes ya pueden evaluar y corregir sus respuestas.
  - cite: James Prather, Brent N. Reeves, Juho Leinonen, Stephen MacNeil, Arisoa S. Randrianasolo, Brett A. Becker, Bailey Kimmel, Jared Wright, and Ben Briggs, *The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers*, 2024, *ACM Conference on International Computing Education Research*
  - doi: 10.1145/3632620.3671116
  - ES: Beneficios y daños de GenAI para programadores noveles
  - EN: Benefits and harms of GenAI for novice programmers
  - fit_ES: Justifica evaluación diferenciada, verificación y apoyo a estudiantes con menor capacidad de validación.
  - fit_EN: It supports differentiated assessment, verification, and support for students with less validation capacity.
  - scope: programming-general
  - verified_by: pass2-confirmed

## Quarantine

- React Team, TanStack, React Router, OWASP, Testing Library, Playwright — documentation citations without DOI/ISBN; Pass 2 `unverifiable`.
- David Harel, *Statecharts*, DOI 10.1016/0167-6423(87)90035-9 — `unverifiable`.
- Alex Banks and Eve Porcello, *Learning React*, ISBN 978-1-492-05172-5; Don Norman, ISBN 978-0-465-07299-6; Martin Kleppmann, ISBN 978-1-491-90309-4 — `unverifiable`.
- Paul C. Jorgensen and Byron DeVries, ISBN 978-0-367-76762-4; Enoiu et al., DOI 10.1109/ICSTW50294.2020.00042; Lam et al., DOI 10.1109/ICSE43902.2021.00141 — `unverifiable`.
- Joyce Mahon et al., DOI 10.1145/3649217.3653602; Md Istiak Hossain Shihab et al., DOI 10.1145/3702652.3744219; Nils Randall et al., DOI 10.1109/MS.2023.3344682; Margulieux et al., DOI 10.1145/3649217.3653621; Lyu et al., DOI 10.1145/3657604.3662036; Dobson/Karkalas, DOI 10.1145/3789595.3789611; Goyal et al., DOI 10.1145/3788679 — `unverifiable`.
- Suyang Zhu and Zhengtao Liu, *Generative AI in Programming Education…*, DOI 10.1145/3806980.3806985 — Pass 2 could not establish the title/author/DOI pairing; do not promote without an authoritative record.

## Gaps that remain

- React-/front-end-specific evidence for GenAI assessment remains thinner than general programming-education evidence.
- The merge does not claim that documentation or practitioner books are peer-reviewed evidence.

## Change log

- Converted the amended Pass 1 result into a Pass 3 edited merge with explicit Provenance, Quarantine, and per-item `verified_by` fields.
- Corrected the UI-components authors/title, PWA venue/year/DOI/ISBN, Hora authors/venue, and Russo/ Saenz/De Russis venue attribution.
- Promoted only records supported by Pass 2 or an explicit Pass 2 correction; kept the Zhu/Liu item quarantined because the audit could not establish the citation pairing.
- Removed duplicate uses of Mahon, Shihab, and other unresolved references from the promoted bibliography.
