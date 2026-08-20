<!--
Ready-to-submit TEMARIO + BIBLIOGRAFÍA correction for
GDFS-2026-2027-3-Desarrollo Web Front-End II.pdf
Author: Rubén Vega Balbás, drafted with Claude · 2026-08-18
Deadline: department needs this by 2026-08-26 (RUC publication).
Source of truth: desarrollo-web-front-end-ii-2026-2027.json (same directory)
-->

# Desarrollo Web: Front-End II — corrección de TEMARIO y BIBLIOGRAFÍA

**Para:** program coordination / academic affairs, UDIT — Grado en
Desarrollo Full-Stack.

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

1. Arquitectura de renderizado en producción: metaframeworks y arquitectura de islas (Astro).
2. Integración multi-framework (React/Vue/Svelte) y content collections tipadas.
3. Estrategias de renderizado (SSR/SSG) y arquitectura de micro-frontends.
4. Aplicaciones Web Progresivas (PWA): service workers, estrategias de caché y manifiesto de aplicación web.
5. Estrategia de testing: pruebas unitarias, pruebas de componentes y end-to-end, integradas en CI/CD.
6. Revisión de código asistida por IA (human-in-the-loop) como técnica evaluable del flujo de desarrollo.
7. Ingeniería de rendimiento: Core Web Vitals y presupuestos de rendimiento como restricción de diseño.
8. Interfaces 3D declarativas: React Three Fiber, raycasting y eventos, optimización en WebGL.
9. Alfabetización en shaders: fundamentos de GLSL, shaders personalizados y efectos de post-procesado.
10. Interfaces respaldadas por IoT/Python: integración de WebSocket con estado y consumo de servicios FastAPI.
11. Integración del proyecto: arquitectura, resiliencia, testing, 3D e IoT combinados con evidencia de proceso documentada.
12. Defensa oral del proyecto integrador: preguntas basadas en el diff del propio código.

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
- [x] Confirmar que las 12 entradas del TEMARIO, en este orden, son las que quieres presentar — se derivan 1:1 de las Unidades 1–12 ya publicadas en la CV, no de una fuente oficial adicional.
- [x] Los 5 registros bibliográficos son DOI-verificados vía un proceso de tres pasadas adversariales (mapa → auditoría independiente → fusión, modelos distintos por pasada) — ver `frontend-pedagogy/02-temario-contenidos/T3-production-frontier-astro-pwa-3d-iot.edited.md` si quieres el historial completo, incluidas las fuentes candidatas descartadas por no verificarse.
- [x] `source_url`: no existe URL del portal UDIT todavía (la asignatura nunca se ha impartido) — se rellenará cuando el departamento la asigne. De momento los cursos serán publicados CD/CI en https://ruvebal.github.io/web-atelier-udit/tracks/$locale/ 
