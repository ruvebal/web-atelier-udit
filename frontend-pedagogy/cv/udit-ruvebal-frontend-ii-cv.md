# **Guía Curricular Avanzada de Desarrollo Front-End (Frontend II)**

A continuación se detallan los **objetivos de aprendizaje**, el contenido organizado por bloques, las actividades prácticas, la coordinación con backend, y tendencias futuras.

## **Objetivos de Aprendizaje**

> **Nota editorial (2026-08-18):** esta sección describía hasta ahora la
> redacción de Frontend I casi palabra por palabra (`CN03`, `HB02`, `HB05`,
> `HB06`, `CM01` — comparar con `desarrollo-web-front-end-i-2025-2026.json`),
> heredada porque **no existe guía oficial de Frontend II** en el portal
> público de UDIT (`unicrawler` probe, 2026-07-28: *"Subject 'Desarrollo Web:
> Front-End II' not found in UDIT portal study"*) — un vacío institucional
> distinto del error de TEMARIO/bibliografía ya detectado y en curso de
> corrección (`2026-27-syllabus-renewal-plan.md` §1), no el mismo. Siguiendo
> la misma decisión ya tomada allí (autorar el contenido correcto en vez de
> señalar-y-esperar), los códigos se mantienen — probablemente pertenecen al
> catálogo de competencias del título, compartido entre asignaturas — pero la
> redacción bajo cada código ahora describe lo que Frontend II realmente
> enseña (Bloques 1–7 abajo), no una copia de los fundamentos de Frontend I.

**Conocimientos (CN):**

- **CN03:** Aplicar los fundamentos de **diseño** y **programación** de aplicaciones web ya adquiridos en Frontend I a **sistemas de interfaz en producción**: arquitectura de renderizado (SSR/SSG/islas con Astro), resiliencia offline (PWA), y la extensión de la capa de interfaz más allá del navegador (3D, dispositivos IoT respaldados por Python).

**Habilidades (HB):**

- **HB02:** Utilizar metaframeworks, herramientas de testing (Vitest, React Testing Library, Playwright) y pipelines CI/CD para construir y verificar aplicaciones web de nivel de producción, incluyendo la integración multi-framework (React/Vue/Svelte) dentro de un mismo proyecto.

- **HB05:** Valorar y aplicar el **rendimiento** (Core Web Vitals, presupuestos de rendimiento) y la **estética de vanguardia** (shaders, escenas 3D con React Three Fiber) como restricciones de diseño desde el inicio del proyecto, no como auditorías o efectos añadidos al final.

- **HB06:** Determinar, con criterio informado, la estrategia de renderizado (SSR frente a SSG, isla frente a hidratación completa), el metaframework y las técnicas de revisión de código asistida por IA más apropiadas para un problema de arquitectura front-end dado.

**Competencias (CM):**

- **CM01:** Diseñar **interfaces persona-computador** que se sostengan a escala de producción — accesibles, usables y resilientes sin conexión — y que extiendan el modelo de interacción a fuentes de datos con estado (WebSocket, dispositivos IoT/robótica) y a superficies no tradicionales (3D, shaders), garantizando los mismos estándares de accesibilidad y usabilidad que Frontend I estableció como base.

## Fundamento Pedagógico

> _Critical Coding for a Better Living._

Frontend II parte de donde Frontend I termina: no vuelve a explicar componentes, hooks, enrutamiento o testing básico de React — eso ya es territorio construido en el semestre 2 de Frontend I (`docs/lessons/en/react/`) — sino que enseña a pensar en **sistemas de interfaces**, no solo interfaces sueltas: arquitectura de producción, resiliencia offline, testing profesional, rendimiento, y la frontera de la capa de interfaz más allá del navegador (3D, IoT/robótica, servicios respaldados por Python). El **núcleo duradero** aquí es el modelo de componentes (props, estado, hooks); la **capa volátil** es el destino de renderizado — DOM, WebGL, APIs de dispositivo — que cambia mientras el modelo de pensamiento permanece. El desarrollo asistido por IA se practica de forma **transparente, documentada y verificada** (docs-first: plan antes que implementación), y se extiende aquí a una competencia propia de esta asignatura — la **revisión de código asistida por IA** como técnica enseñada explícitamente, no como atajo prohibido. **¿Mejor vivir para quién?** No solo para quien lee. El código que hace menos trabajo consume menos energía, y la energía gastada se convierte en calor — en un móvil, en la GPU que renderiza una escena, en el centro de datos que responde a un WebSocket. Ese coste no se detiene en el dispositivo: recae sobre un clima compartido y, por tanto, sobre todo lo que vive en él. Somos seres tecnológicos, y la línea entre lo vivo y lo construido nunca fue limpia; si estás vivo, ya estás dentro de esto. Por eso el rendimiento y la accesibilidad se enseñan aquí como **ética, no como optimización**: ambos preguntan lo mismo — qué cuesta esto al mundo donde se ejecuta, y quién lo paga.

## **Desarrollo Web: Front-End II**

Este segundo curso asume la arquitectura de producción como su columna vertebral: metaframeworks, PWA, testing profesional con revisión asistida por IA, rendimiento, y la expansión de la capa de interfaz hacia el 3D y los servicios IoT/Python. Se imparte a estudiantes tanto del Grado en Desarrollo Full-Stack como del Grado en Ciencia de Datos e IA (ambos grados comparten esta asignatura — de ahí que el Bloque 6 tenga peso curricular propio, no sea un simple añadido). 6 ECTS, semestral, 150h totales (10h lección magistral / 30h prácticas de laboratorio / 14h resolución de ejercicios / 94h estudio autónomo / 2h evaluación).

**Decisión de metaframework:** Astro, elegido al inicio de esta reconstrucción curricular por su filosofía content-first y su arquitectura de islas — permite introducir un **segundo paradigma** de renderizado (HTML/CSS por defecto, JavaScript solo donde se necesita) sin abandonar React, que sigue siendo el componente cliente dentro de cada "isla".

### Bloque 1 — Arquitectura de Producción: Astro y Renderizado Moderno (Unidades 1–3)

La Unidad 1 abre el semestre con un reencuadre explícito: "ya construiste interfaces; ahora construyes sistemas de interfaces". Las Unidades 2–3 introducen Astro como segundo paradigma frente al React de Frontend I: arquitectura de islas (cada componente interactivo es una "isla" independiente sobre un "océano" estático de HTML servido), estrategias de renderizado (SSR vs. SSG), integración de islas React dentro de páginas Astro, content collections tipadas, patrones de obtención de datos, integración multi-framework (React/Vue/Svelte conviviendo en el mismo proyecto), y arquitectura de micro-frontends. El objetivo no es sustituir React sino demostrar que el modelo de componentes es transferible entre paradigmas de renderizado.

### Bloque 2 — PWA y Resiliencia Offline (Unidad 4)

Service workers, estrategias de caché (cache-first, network-first, stale-while-revalidate), y el web app manifest para aplicaciones instalables. Convierte una SPA en una aplicación que sobrevive a la pérdida de conexión — una expectativa profesional, no un extra.

### Bloque 3 — Estrategia de Testing y Revisión de Código Asistida por IA (Unidades 5–6)

La Unidad 5 enseña la pirámide de testing de forma escalonada: pruebas unitarias con Vitest, pruebas de componentes con React Testing Library, y end-to-end con Playwright, integradas en CI/CD. La Unidad 6 es la aplicación directa de investigación reciente a la práctica docente: basada en Oliveira et al. (2026) sobre revisión de código asistida por IA, enseña la IA como revisora de pull requests dentro de un flujo **human-in-the-loop** explícito — la IA sugiere, la persona decide y es responsable de la decisión final. Se enseña como técnica evaluable (diseño de prompts de revisión efectivos, filtrado crítico de falsos positivos), no como atajo para saltarse la revisión.

### Bloque 4 — Ingeniería de Rendimiento (Unidad 7)

Core Web Vitals como objetivo medible, no como cifra abstracta: optimización de bundles, optimización de assets, CSS crítico y optimización del renderizado, y presupuestos de rendimiento (performance budgets) como restricción de diseño desde el principio del proyecto, no una auditoría al final.

### Bloque 5 — 3D y Estética de Interfaz de Vanguardia (Unidades 8–9)

Frontera explícitamente delimitada como **ejercicio de transferencia de la capa de interfaz**, no como curso de gráficos aislado: React Three Fiber aplica el mismo modelo de estado y hooks de React a escenas 3D declarativas — raycasting y eventos, optimización de rendimiento en WebGL (Unidad 8) — y una introducción a alfabetización en shaders — fundamentos de GLSL, shaders personalizados dentro de R3F, efectos de post-procesado (bloom, aberración cromática) — para que la estética de vanguardia sea código entendido, no una librería de efectos usada a ciegas (Unidad 9).

### Bloque 6 — IoT/Robótica e Interfaces Respaldadas por Python (Unidad 10)

**Unidad de carga curricular real, no un añadido decorativo** — es la vía directa por la que esta asignatura resulta legible tanto para estudiantes de Full-Stack como de Ciencia de Datos e IA. La idea central: el modelo de componentes no cambia — props, estado, hooks — solo cambia la fuente de datos (WebSocket bidireccional y con estado, en vez de REST/GraphQL sin estado). Cubre integración de WebSocket en React, patrones de consumo de APIs de dispositivos IoT/robótica, y consumo de servicios respaldados por Python (FastAPI). **Nota de honestidad institucional:** la fuente de datos de esta unidad es actualmente un placeholder explícitamente etiquetado (`ws://localhost:8000/device-stream`, esquema `{ deviceId, sensorType, value, timestamp }`) a la espera de la hoja de sinergia con Back-End II (Fase 5 del cascade de renovación) — no se presenta como integración real hasta que ese acuerdo exista.

### Bloque 7 — Capstone: Integración y Defensa Oral (Unidades 11–12)

Cierre del curso sobre los ejes `verify`/`narrate`: evidencia de proceso documentada (decisions.md, iterations.md), declaración de uso de IA por unidad y por herramienta, y defensa oral de 15 minutos con preguntas basadas en el diff del propio código — se examina la capacidad de explicar y modificar en el momento, no solo el artefacto entregado.

**Actividades y entregables por bloque:**

- **Entrega 1** (Unidades 2–6): proyecto arquitectónico Astro con estrategia de testing y pipeline CI/CD.
- **Entrega 2** (Unidades 8–10): interfaz 3D con R3F junto con panel de control IoT/Python-backed.
- **Entrega 3 / Examen Final** (Unidades 11–12): proyecto integrador con evidencia de proceso, declaración de IA, y defensa oral.

## **Proyecto integrador de Frontend II**

A diferencia del planteamiento original (proyecto de equipo replicando un CRUD genérico), el proyecto integrador ahora es la culminación natural de los Bloques 1–6: cada estudiante (o equipo, según se confirme en Fase 3/5) integra arquitectura de producción (Astro), resiliencia offline (PWA), testing con CI/CD, una interfaz 3D o de shaders, y el panel IoT/Python de la Unidad 10, documentado con evidencia de proceso completa y defendido oralmente. El backend de referencia para la Unidad 10 se coordina con Back-End II mediante la hoja de sinergia (Fase 5) en vez de asumirse sin verificar.

## **Evaluación**

Pesos oficiales elegidos dentro del rango de la guía docente (Pruebas 30–50% / Trabajos 40–60% / Portafolio 10–20%):

| Componente | Peso |
| --- | --- |
| Pruebas | 30% |
| Trabajos, entregables y proyectos | 50% |
| Portafolio (resolución de problemas) | 20% |

Desglose alineado con la filosofía de evaluación del Web Atelier (misma que Frontend I, para que la transición entre asignaturas sea legible para el estudiante): Técnica 40% / Reflexión y Documentación 35% / Comprensión Conceptual 25%.

---

_Nota de alcance (2026-08-09):_ esta guía sustituye la versión anterior (Módulos 4–7: introducción a frameworks, React, testing con Jest/RTL/Cypress, despliegue en Vercel/Netlify), que duplicaba casi 1:1 el semestre 2 ya construido de Frontend I. El territorio de comparativa de frameworks, fundamentos de React, hooks, enrutamiento, testing básico y despliegue queda íntegramente en Frontend I; esta asignatura abre donde esa termina.

---

---

## Fundamentación académica de las decisiones curriculares

_Añadido 2026-08-10. Evidencia **exclusivamente de los bundles soberanos Ahmes** (manifiestos `fe-main` y `fe-ibero`; 17 `content_hash` únicos, deduplicados). Cada afirmación resuelve a `extraction.db` con `node_id` y página. Convención: `⟨coat⟩ · nodo ⟨id⟩ · p. ⟨n⟩`. Duplicados resueltos a favor de `liu_fan_pan…dc2bd27d` y `digital_accessibility_literacy…91241359`; el erratum `correction_to_tool_tutor…4429a07e` no se cita._

**El resultado es deliberadamente desigual, y esa desigualdad es el argumento:** los bloques que dan identidad a Frontend II carecen de respaldo porque **el campo aún no lo ha producido**.

**Capa crítica transversal — fuentes centrales del corpus (añadido 2026-08-18):** Postman (*Technopoly*, 1992), Orrange (*The Corporate State*, 2020) y Anderson & Krathwohl (revisión de Bloom, 2001) se incorporaron a la Bibliografía oficial de esta guía (ver `cv/guides/desarrollo-web-front-end-ii-2026-2027.json`) por ser, verificado con `scripts/corpus_centrality.py` (`grounding-graph`), las fuentes de mayor centralidad ponderada de `profield-didactics` — no solo por ajuste temático. Postman se comparte con Frontend I por diseño (`curriculum-forger` SKILL.md §4A es transversal a ambas). No cierran las lagunas de Bloques 2/5/6 abajo — ninguna trata PWA, 3D o IoT — y no se presentan como si lo hicieran.

### Bloques respaldados

**Bloque 3 · Revisión de código asistida por IA (Unidad 6)**
`liu_fan_pan…dc2bd27d` · nodo `1db27080` · p. 1 — la pregunta central: *"do they reflect genuine learning facilitated by effective scaffolding, or do they co-occur with superficial dependency enabled by cognitive offloading?"*
Voz estudiantil, nodo `c3157096` · p. 12: *"I got good grades on all the projects, but now I have the final exam next week without Copilot… and honestly, I'm terrified. I'm not sure what I actually know."*
`kazemitabaar…23259ff1` · nodo `c2a108d2` · p. 0 — asistentes que *"reveal direct answers with code, which may hinder deep conceptual engagement"*; CodeAid entrega ayuda sin revelar la solución.
> Fundamenta el flujo *human-in-the-loop* y, sobre todo, que se evalúe el **rechazo razonado** de sugerencias: el registro de decisiones ACCEPT/REJECT es la contramedida directa al testimonio anterior.

> El diseño *human-centred* de la asistencia de IA debe traducir valores humanos en requisitos perceptibles por el usuario, funcionales y éticos, junto con principios accionables y gobernanza *human-in-the-loop*. En Frontend II, la transferencia es concreta: revisar, adaptar, rechazar y explicar una sugerencia forma parte del aprendizaje evaluable; el estudio no se presenta como evidencia de resultados específicos en front-end.
> — **[BIBLIO-GAP]** Göbels et al., *Aligning AI with human values: Design principles for human-centered AI* (2026), *Procedia CIRP* / CIRP Design, abstract/conclusión (pp. 1, 5)
> Ahmes anchor: `research/computational-authorship/11-extraction-db/scholar/documents/aligning_ai_with_human_values_design_principles_for_human_c_2026_procedia_c_6bcffa72/` · nodos `8c205585-33ae-5016-bec7-3af2bb49a457`, `616c81b4-4b67-544f-800f-a5150cabc4b1` · `evaluator_safe=no` (metadatos bibliográficos derivados del slug)

> La guía de Horizon Europe permite usar IA generativa junto con cautela, revisión y validación exhaustivas, responsabilidad humana sobre el resultado y transparencia sobre las herramientas empleadas. En Frontend II, esto refuerza que la revisión de código asistida por IA deje rastro de qué se aceptó, qué se rechazó y por qué; la guía no es evidencia de resultados específicos de aprendizaje en front-end.
> — **[BIBLIO-GAP]** European Commission, *Standard briefing slides for experts: Horizon Europe* (2026), orientación sobre uso de IA (pp. 23–24)
> Ahmes anchor: `svcm/documents/standard_briefing_slides_for_experts_he_en_9af85191/` · nodos `5db6cdbe-a497-5c30-82dc-fa275855a567`, `8e1627d8-ff7e-5b36-a6bc-b27f36967119`, `1ef2552c-0c8c-56d6-95dc-154c7e48643a`, `655b1064-6e2a-526d-98ca-2f1bc5093859` · `evaluator_safe=no` (año ausente / desajuste en metadatos de portada)

> La obligación legal de transparencia del AI Act cubre, entre otros supuestos, el texto generado o manipulado por IA que se publica para informar al público sobre asuntos de interés público (art. 50(4), aplicable desde el 2 de agosto de 2026). Frontend II adopta una regla docente más amplia: toda contribución material de IA al código o documentación entregados se declara junto con la herramienta, la contribución y la verificación humana.
> — European Parliament and Council, *Regulation (EU) 2024/1689* (2024), art. 50(4); aplicación art. 113
> Official legal anchor: [EUR-Lex, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=en)

**Bloque 4 · Rendimiento como restricción impuesta**
`phung_et_al…ea8cf54c` · nodo `cc62b45e` · p. 5 — *"debugging hints being requested the most, followed by planning hints, while **optimization hints were rarely used**"*.
> Hallazgo con consecuencia curricular directa: **la optimización no se demanda espontáneamente**. Si el rendimiento no se impone como presupuesto evaluable, no ocurre. Es la justificación empírica del *performance budget* de la Unidad 7 — no la parte climática, que sigue sin respaldo (véase lagunas).

**Bloque 3 · Acceso escalonado a la IA**
`singh_et_al…37173a2a` · nodo `95f7d0fa` · p. 5 — analiza si el alumnado detecta errores **omitidos** por la pista de GPT o si **descarta** la pista. Modelo para diseñar pruebas con IA diferida.

**Bloques 2–11 · "Una cohorte, un repositorio" como decisión metodológica fundada**
`2106_12166v1…e472eb4e` · nodo `86bd504a` · p. 0 — Neumann, *Agile Methods in Higher Education: Adapting and Using eduScrum with Real World Projects*; términos indexados (nodo `37bb7aae` · p. 0): *"Agile education, eduscrum, agile methods, class room, project management"*.
> Hasta ahora, el paso de *un repositorio por estudiante* (FE I) a *un repositorio por cohorte* (FE II) era una decisión razonada **sin respaldo**. eduScrum documenta la adaptación de métodos ágiles a aula universitaria **con proyectos reales**, que es exactamente el régimen de las Prácticas de Laboratorio de esta asignatura.
> **Alcance:** no es front-end ni estudio controlado; es adaptación metodológica documentada.

**Bloque 7 · Capstone, evidencia de proceso y defensa oral**
`garcia_self_coded…8fef58f2` · nodo `ba2fa258` · p. 0 — portafolio autocodificado como evaluación auténtica de ABP (única cohorte de desarrollo web del vault; FEU, Manila — nodo `7cac84dd` · p. 3).
`nelson_and_ponciano_2021…f1031131` · nodo `ed82afbb` · p. 0 — GitHub Classroom como *"shared, structured, and persistent repository to support project-based courses"* (Ingeniería del Software, PUC Minas). Respalda que la **evidencia de proceso del capstone** (historial de commits, `decisions.md`, `iterations.md`) descanse en infraestructura de repositorio y no en entregas sueltas.
`gonzalez_videgaray…078b0a6a` · nodo `fbe705f2` · p. 6 — la IA generativa como *"asistencia situada dentro de la Zona de Desarrollo Próximo"*, actuando como *"par más capaz"*.
`digital_education_council…20489b0b` · nodo `b15014c1` · p. 2 — *"A clear majority of students (65%) worry about AI leading to shallow learning and an absence of fairness in assessment (56%)"*.
> La defensa oral responde a una **demanda estudiantil documentada** en América Latina, no solo a una inquietud del profesorado.

**Bloque 5 · Técnica avanzada opcional — MCPs oficiales en el flujo 3D/shader (Unidades 8–9)**
_Añadido 2026-08-20. Grounding acotado: esta entrada respalda únicamente la
**técnica opcional** (qué servidor MCP usar, si se usa alguno), no la
pedagogía central de R3F/shaders de Unidades 8–9, que sigue **sin
evidencia en el vault** (tabla abajo)._

Verificación directa (no descrita en un vault, comprobada contra el
registro npm/GitHub real el mismo día): de seis servidores MCP propuestos
para Three.js/Astro/Tailwind/GSAP, solo uno (`threejs-devtools-mcp`)
funcionaba como se describía, y **uno de los nombres reclamados
(`@astrojs/mcp-server`) ocupa el espacio de nombres npm oficial de Astro
sin publicación real** — exactamente el patrón de riesgo que la
literatura de seguridad de MCP nombra formalmente:

> Capabilities: Supply chain adversaries can publish MCP servers to public registries (npm, PyPI, GitHub), modify previously-trusted servers after adoption (rugpull attacks), embed malicious logic in tool implementations, inject harmful instructions in tool descriptions or responses, and execute arbitrary code on user machines when their server runs.
> — **[BIBLIO-GAP]** Errico, H., Sojan, S., & Ngiam, J., *Securing the Model Context Protocol (MCP): Risks, Controls, and Governance* (2025), arXiv:2511.20920v1, "2.2.2. Adversary Type 2: Supply Chain Adversaries"
> Ahmes anchor: `scholar/documents/2511_20920v1_43fed367/extract/extraction.db` · nodo `33f6f8e1-e1d7-5805-8f0e-c0ff3ec907df` · p. 3 · `evaluator_safe=no` (arXiv preprint, cascada de metadatos aún sin resolver)

> The second major threat category arises from the challenge of evaluating which MCP servers to trust. Unlike traditional APIs, which undergo developer security review before integration, MCP servers can be installed directly by end users who may lack security expertise.
> — **[BIBLIO-GAP]** mismo documento, nodo `170c5680-e021-50cf-906a-b264284d0a2f` · p. 4 · `evaluator_safe=no`

**Regla de la asignatura, consecuencia directa de lo anterior:** en
Unidades 8–9, MCP se enseña como **técnica avanzada opcional**, restringida
a servidores **oficiales del proveedor** — Astro Docs MCP (`withastro`,
endpoint remoto, sin instalación local), MCP incorporado en la CLI oficial
de `shadcn` (`npx shadcn@latest mcp`), y las Agent Skills oficiales de
GSAP (formato skill, no MCP, pero es la vía que el propio proveedor eligió
en lugar de publicar un MCP). `threejs-devtools-mcp` queda **fuera** del
currículo oficial por no ser mantenimiento del proveedor (real y
funcional, pero un solo mantenedor, sin actividad desde hace meses) — se
menciona solo como ejemplo en la guía de metodología IA (ver
`ai-assisted-development-foundations`), no como técnica recomendada aquí.

Ganancia de eficiencia real, para quien evalúe adoptar composición de
servidores conscientes del contexto en el futuro (no una recomendación de
esta asignatura, solo el estado del arte citado):

> Efficiency: Across both benchmarks, execution time dropped by 67-74% due to reduced reliance on central LLM inference.
> — **[BIBLIO-GAP]** Jayanti, M. A., & Han, X. Y., *Enhancing Model Context Protocol (MCP) with Context-Aware Server Collaboration* (2026), arXiv:2601.11595v2, §5
> Ahmes anchor: `scholar/documents/2601_11595v2_b2eb0acf/extract/extraction.db` · nodo `064705e4-e0a2-5ea1-b889-2158566c0d89` · p. 6 · `evaluator_safe=no`

**Bloque 6 · Legibilidad para Ciencia de Datos e IA**
`phung_et_al…ea8cf54c` y `singh_et_al…37173a2a` operan en cursos de **programación para ciencia de datos**; `rcs…91103623` · nodo `9fabe333` revisa sistemáticamente la IA generativa en enseñanza de matemáticas y programación.
> Respalda que el alumnado de datos es audiencia real de este diseño — aunque **ninguna** de estas fuentes trata la capa de interfaz, que es justamente lo que aporta la Unidad 10.

**Accesibilidad sostenida en tercer curso (Unidad 5)**
`batista_baluz…0d28c6a5` · nodo `301dc884` · p. 0 (ausencia de textos alternativos y contraste insuficiente en webs universitarias) y `correa_vitoriano_llanos…ac71e73e` · nodo `0b8e3a74` · p. 0 (SIGAA y eMAG). `digital_accessibility_literacy…91241359` · nodo `89cdb78b` · p. 1 para la accesibilidad como alfabetización (codificar y descodificar). `teaching_digital_accessibility…d57634a5` · nodo `b2fc2c85` · p. 6 recoge además el **contraargumento** de parte del profesorado: la empatía *"is not an appropriate learning outcome for CS courses"*.
> Justifica mantener aserciones automáticas de accesibilidad en la suite de pruebas: el sector sigue fallando en lo básico.

**Rango curricular**
`3664191_da20f30d` (CS2023) · nodo `ae35ed39` · p. 265 — *"SPD-Web: Web Platforms (2 hours)"*.
> Dos horas en el currículo internacional de referencia. Legitima el área y, a la vez, evidencia por qué una titulación de desarrollo web necesita asignaturas propias.

**Eficiencia como obligación ética — respaldo normativo (no empírico)**
`381137eng` (vault SVCM/unesco) — **Recomendación de la UNESCO sobre la Ética de la Inteligencia Artificial**, adoptada por los Estados Miembros · nodo `630c7152` · p. 29: obliga a evaluar *"the direct and indirect environmental impact throughout the AI system life cycle, including… its **carbon footprint, energy consumption** and the environmental impact of raw material extraction"* · nodo `17ccc7a8` · p. 30: *"favour **data, energy and resource-efficient AI methods**"*.
> Convierte la eficiencia de **compromiso razonado** en **obligación con mandato internacional**: es la base normativa del binomio rendimiento/accesibilidad como ética y no como optimización.
> ⚠️ **Clase de fuente:** instrumento **normativo**, no estudio. **Obliga, no mide.** Ninguna fuente del corpus cuantifica el efecto en carbono de una decisión de ingeniería front-end, y su objeto son los **sistemas de IA** — cubre el método asistido por IA de esta asignatura, no autoriza una afirmación directa front-end→carbono. **Sin cifras inventadas.**

### Bloques SIN respaldo en el vault — el argumento del piloto

Ninguna fuente extraída sostiene la pedagogía de:

| Bloque | Contenido | Estado |
| --- | --- | --- |
| **1** | Metaframeworks, Astro, arquitectura de islas, SSR/SSG, micro-frontends | sin evidencia en el vault |
| **2** | PWA, service workers, resiliencia offline | sin evidencia en el vault |
| **4** | Pedagogía de la ingeniería de rendimiento (más allá del hallazgo de Phung sobre demanda) | sin evidencia en el vault |
| **5** | 3D web, React Three Fiber, alfabetización en shaders | sin evidencia en el vault — **excepto** la técnica opcional MCP añadida 2026-08-20 (ver "Bloques respaldados"), que sí tiene grounding propio y acotado |
| **6** | Capa de interfaz para IoT/robótica y servicios Python | sin evidencia en el vault |

Coincide con el diagnóstico de [`profield-frontend-pedagogy.md`](../profield-frontend-pedagogy.md), donde estos temas figuran como **`[UNVERIFIED-GAP]`**: ausencias reales del campo, no de esta búsqueda.

> **Frontend II se declara asignatura piloto.** Propone una secuenciación donde la literatura no ofrece ninguna, y lo hace explícito ante el alumnado y ante el departamento. No se rellena con normativa no ingerida ni con fuentes ajenas al vault. La honestidad sobre la laguna es parte del contenido: el alumnado de tercero debe ver cómo se trabaja en la frontera de un campo, no creer que todo currículo descansa sobre evidencia consolidada.

### Disciplina de alcance

- **Garcia** es la única cohorte de desarrollo web (Filipinas). **Phung, Singh, Kazemitabaar, Liu** son de programación general o ciencia de datos. **Parthasarathy & Joshi** (India), **Batista** y **Correa** (Brasil). **Ninguna cohorte española** en el vault.
- **Calidad bibliográfica desigual (host-heading / 12G.4, no “falta de RIS”):** coats de Liu (`TI - Abstract`), Phung y Singh (`TI - 1 Introduction`) y CodeAid (`TI - Paul Denny`) → `host_registry_mismatch` (también tras `--force-meta --online`). Causa: Ahmes **12G.4** (SHIPPED); re-enrich, no inventar AU/TI. Completos: Garcia (DOI `10.3390/educsci15091150`), Parthasarathy & Joshi (DOI `10.1145/3632620.3671122`), CS2023.
- **Vault de creatividad digital / moda: fuera de alcance** para estas guías; no se ha citado.
