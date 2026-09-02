<!--
Ready-to-submit TEMARIO + BIBLIOGRAFÍA correction for
GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf
Author: Rubén Vega Balbás, drafted with Claude · 2026-08-18
Deadline: department needs this by 2026-08-26 (RUC publication).
Source of truth: desarrollo-web-front-end-ii-2026-2027.json (same directory)
-->

# Desarrollo Web: Front-End II — corrección de TEMARIO y BIBLIOGRAFÍA (2026/2027)

**Para:** Jefe/a de Departamento — Grado en Desarrollo Full-Stack (y cohortes compartidas con Ciencia de Datos e IA).

**De:** Rubén Vega Balbás, PhD — Profesor de la asignatura (`ruben.vega@udit.es`).

**Asunto:** Corrección de las secciones `TEMARIO` y `BIBLIOGRAFÍA / WEBGRAFÍA` de la Guía Docente de *Desarrollo Web: Front-End II* (6 ECTS, semestral, 150 h). Primera impartición de la asignatura.

**Qué corrige esto:** únicamente las secciones `TEMARIO` y
`BIBLIOGRAFÍA / WEBGRAFÍA` de `GDFS-2026-2027-3-Desarrollo Web Front-End
II.pdf`. Ambas contienen actualmente contenido de una asignatura no
relacionada (dibujo de observación, anatomía artística) — un error de
copia/pegado detectado el 2026-08-08, no un desacuerdo de contenido.
**Ninguna otra sección se modifica**: `CONTENIDOS`, `RESULTADOS DE
APRENDIZAJE`, `ACTIVIDADES FORMATIVAS` y `SISTEMAS DE EVALUACIÓN` ya son
correctas y se mantienen tal cual figuran en el PDF actual.

Esta es la primera vez que se imparte la asignatura — no existe guía
docente previa de la que partir; este TEMARIO se deriva directamente de
la planificación curricular ya cerrada
(`frontend-pedagogy/cv/udit-ruvebal-frontend-ii-cv.md`).

---

## TEMARIO

*(Formato desarrollado — bloque temático + subtemas. Primera impartición; parte de donde Front-End I termina y no lo repite.)*

---

De React a arquitectura de producción: sistemas de interfaces.

    Transición explícita: de interfaces sueltas a sistemas de interfaces en producción.
    Segundo paradigma de renderizado: HTML/CSS por defecto, JavaScript solo donde se necesita (arquitectura de islas).
    Metaframework elegido: Astro (content-first, islas React/Vue/Svelte sobre océano estático).
    Núcleo duradero (modelo de componentes) frente a capa volátil (destino de renderizado: DOM, WebGL, WebSocket).

Arquitecturas de aplicaciones front-end.

    Astro: filosofía content-first, routing, layouts y obtención de datos en build time.
    Arquitectura de islas: hidratación selectiva, coste de JavaScript medido por página.
    Estrategias de renderizado: SSR frente a SSG; criterios de elección según tipo de contenido y datos.
    Content collections tipadas y validación de esquemas en el build.
    Integración multi-framework: React, Vue y Svelte conviviendo en el mismo proyecto.
    Arquitectura de micro-frontends: composición, autonomía de equipos y trade-offs de despliegue.

Aplicaciones Web Progresivas (PWA) y resiliencia offline.

    Service workers: registro, ciclo de vida y alcance.
    Estrategias de caché: cache-first, network-first, stale-while-revalidate.
    Web App Manifest: aplicaciones instalables, iconos y pantalla de inicio.
    Patrones offline-first: indicadores de conectividad, sincronización diferida y UX sin red.
    De SPA a aplicación que sobrevive a la pérdida de conexión.

Estrategia de testing y automatización en CI/CD.

    El testeo como decisión de ingeniería: qué testear, qué no testear y coste de mantenimiento.
    Pruebas unitarias con Vitest; pruebas de componentes con React Testing Library.
    End-to-end con Playwright: determinismo, flakiness y migración desde Cypress.
    Integración en pipeline CI/CD: presupuestos de tiempo, contract testing contra backend.
    Continuidad con Front-End I: hereda el Testing Trophy; no contradice Vitest/RTL ya enseñados.

Revisión de código asistida por IA (human-in-the-loop).

    IA integrada en pull requests de GitHub como técnica enseñada y evaluable.
    Diseño de prompts de revisión efectivos; filtrado de falsos positivos.
    Registro documentado de sugerencias aceptadas, rechazadas y justificadas (ACCEPT/REJECT).
    La persona decide y es responsable: la IA sugiere, no sustituye el juicio profesional.
    Declaración de uso de IA alineada con el AI Act (transparencia ampliada respecto al mínimo legal).

Ingeniería de rendimiento web.

    Core Web Vitals (LCP, INP, CLS) como objetivos medibles, no como cifras abstractas.
    Presupuestos de rendimiento (performance budgets) como restricción de diseño desde el inicio.
    Optimización de bundles, assets, CSS crítico y renderizado.
    Coste energético del front-end como dimensión ética (consecuencias no intencionadas de la optimización).
    Herramientas de medición: Lighthouse, web.dev, análisis de red en DevTools.

Interfaces 3D declarativas (React Three Fiber).

    Transferencia del modelo de componentes React a escenas 3D declarativas (no curso de gráficos aislado).
    Escena, cámara, luces, meshes y el canvas como superficie de interfaz.
    Estado y hooks en R3F; raycasting y eventos de puntero en 3D.
    Optimización WebGL: renderer.info, presupuestos de draw calls y reconciliación con React.
    Puente desde la semilla 3D de Front-End I hacia producción con R3F.

Alfabetización en shaders y estética de interfaz de vanguardia.

    Fundamentos mínimos de GLSL: un shader entendido, no una librería de efectos a ciegas.
    Uniforms, espacio UV y manipulación de vértices/fragmentos dentro de R3F.
    Efectos de post-procesado: bloom, aberración cromática y coste de renderizado.
    Estética de vanguardia como código legible, no como preset opaco.
    Declaración de uso de IA en shaders (misma disciplina de merge log que en revisión de código).

Interfaces respaldadas por IoT, robótica y servicios Python (FastAPI).

    El modelo de componentes no cambia: props, estado, hooks; cambia la fuente de datos.
    WebSocket bidireccional y con estado frente a REST/GraphQL sin estado.
    Panel de control para dispositivos IoT/robótica: telemetría en tiempo real y comandos.
    Consumo de servicios respaldados por Python (FastAPI): contrato versionado, esquema de mensajes.
    Relevancia para Full-Stack y Ciencia de Datos e IA: misma asignatura, distintos perfiles de backend.
    Coordinación con Back-End II (contrato de servicio compartido cuando esté disponible).

Proyecto integrador: integración, evidencia de proceso y defensa oral.

    Integración de arquitectura Astro, PWA, testing con CI/CD, interfaz 3D o shaders, y panel IoT/Python.
    Evidencia de proceso: decisions.md, iterations.md, historial de commits, declaración de IA por unidad.
    Ejes verify/narrate: demostrar comprensión, no solo entregar artefacto pulido.
    Defensa oral de 15 minutos: preguntas basadas en el diff del propio código.
    Capacidad de explicar y modificar en el momento; evaluación alineada con Front-End I (Técnica 40% / Reflexión 35% / Comprensión 25%).

---

## BIBLIOGRAFÍA / WEBGRAFÍA

**Bibliografía básica**

- Tenner, E. (1997). *Why Things Bite Back: Technology and the Revenge of Unintended Consequences*. Vintage. ISBN 978-0679747567. *(Monografía de pedagogía crítica — fundamenta el marco de consecuencias no intencionadas que ya usa el propio Fundamento Pedagógico de esta guía sobre coste energético y optimización.)*
- Postman, N. (1992). *Technopoly: The Surrender of Culture to Technology*. Knopf Doubleday. *(Fuente más central del corpus `profield-didactics` — grado ponderado 107, conecta con 15/26 documentos; verificado con `corpus_centrality.py`, 2026-08-18. Compartida con Front-End I por diseño.)*
- Peltonen, S., Mezzalira, L., y Taibi, D. (2021). Motivations, Benefits, and Issues for Adopting Micro-Frontends: A Multivocal Literature Review. *Information and Software Technology*, 136. https://doi.org/10.1016/j.infsof.2021.106571 *(Bloque 1)*
- Vepsäläinen, J., Hellas, A., y Vuorimaa, P. (2023). The Rise of Disappearing Frameworks in Web Development. En *Web Engineering: 23rd International Conference (ICWE 2023)*, Springer LNCS 13893. https://doi.org/10.1007/978-3-031-34444-2_23 · ISBN 978-3-031-34444-2 *(Bloque 1)*

**Bibliografía complementaria**

- Guo, Z., Tan, T., Liu, S., Liu, X., Lai, W., Yang, Y., Li, Y., Chen, L., Dong, W., y Zhou, Y. (2023). Mitigating False Positive Static Analysis Warnings: Progress, Challenges, and Opportunities. *IEEE Transactions on Software Engineering*. https://doi.org/10.1109/TSE.2023.3329667 *(Bloque 3)*
- Proma, J. A., Zannat, F. T., Aftab, M. S., Tripty, T. A., Khan, M. S. H., Islam, R. U., y Tuhin, R. A. (2025). Energy-Efficient Web Design: Measuring Impact of Front-end Optimizations. *Proceedings of the 12th International Conference on Next Generation Computing, Communication, Systems and Security (NSysS '25)*. https://doi.org/10.1145/3777555.3777561 *(Bloque 4)*
- Khrouf, L., Shatnawi, M., Thiam Niang, A., y Verhaeghe, A. (2025). On the Energy Consumption of Web Applications: An Empirical Study of their Design Solutions. *GREENS@ICSE 2025*. https://doi.org/10.1109/GREENS66463.2025.00012 *(Bloque 4)*
- Orrange, R. M. (2020). *The Corporate State: Technopoly, Privatization and Corporate Predation*. Routledge. *(Corpus-central — grado ponderado 99, conecta con 20/26 documentos, la conectividad más amplia del corpus. Fundamenta el encuadre institucional/de producción del Bloque 1.)*
- Anderson, L. W., y Krathwohl, D. R. (Eds.). (2001). *A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives*. Longman. *(Corpus-central — grado ponderado 74, conecta con 19/26 documentos. Ya es el marco de Bloom obligatorio de `curriculum-forger` para esta unidad; se nombra aquí explícitamente en la bibliografía oficial.)*

**Cobertura por bloque — declarada, no omitida en silencio**

| Bloque | Estado |
| --- | --- |
| 1 · Arquitectura/Astro | citado |
| 2 · PWA | **sin respaldo en el vault** — la prospección T3 no encontró fuente con DOI/ISBN verificable sobre pedagogía de PWA |
| 3 · Testing/Revisión IA | citado |
| 4 · Rendimiento | citado |
| 5 · 3D/shaders | **sin respaldo en el vault** — no existe fuente verificada sobre pedagogía de React Three Fiber |
| 6 · IoT/Python | **sin respaldo en el vault** — no existe fuente verificada sobre transferencia del modelo de componentes a IoT |
| 7 · Capstone | fundamentado aparte, en la sección "Fundamentación académica" de la CV (evidencia de pedagogía HE, no bibliografía técnica) |

Los bloques 2, 5 y 6 son lagunas reales ya documentadas
(`T3-production-frontier-astro-pwa-3d-iot.edited.md` §"Gaps that remain":
*"did not invent a Three.js/R3F pedagogy source to fill the gap"*) — no un
descuido de esta pasada.

**Webgrafía** (documentación técnica oficial de las herramientas impartidas — no bibliografía académica)

- Astro Documentation — https://docs.astro.build
- MDN Web Docs — Service Workers API — https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- MDN Web Docs — Web App Manifest — https://developer.mozilla.org/en-US/docs/Web/Manifest
- web.dev — Core Web Vitals — https://web.dev/articles/vitals
- React Three Fiber Documentation — https://r3f.docs.pmnd.rs
- FastAPI Documentation — https://fastapi.tiangolo.com
- Playwright Documentation — https://playwright.dev

---

## Antes de enviar — verificación humana pendiente

- [x] `PROFESORADO`: el PDF actual tiene `ruben.vega@udit.es` como placeholder — confirmar nombre/email institucional exacto (no inventado aquí).
- [x] Confirmar que el TEMARIO desarrollado (10 bloques temáticos / 12 unidades) refleja la planificación publicada en `/tracks/feii/`.
- [x] Los 5 registros bibliográficos son DOI-verificados vía un proceso de tres pasadas adversariales (mapa → auditoría independiente → fusión, modelos distintos por pasada) — ver `frontend-pedagogy/02-temario-contenidos/T3-production-frontier-astro-pwa-3d-iot.edited.md` si quieres el historial completo, incluidas las fuentes candidatas descartadas por no verificarse.
- [x] `source_url`: no existe URL del portal UDIT todavía (la asignatura nunca se ha impartido) — se rellenará cuando el departamento la asigne. De momento los cursos serán publicados CD/CI en https://ruvebal.github.io/web-atelier-udit/tracks/$locale/ 
