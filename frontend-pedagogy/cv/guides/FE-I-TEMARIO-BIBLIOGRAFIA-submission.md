# Desarrollo Web: Front-End I — TEMARIO y BIBLIOGRAFÍA (2026/2027)

**Para:** Jefe/a de Departamento — Grado en Desarrollo Full-Stack (y cohortes compartidas con Ciencia de Datos e IA donde aplique).

**De:** Rubén Vega Balbás, PhD — Profesor de la asignatura (`ruben.vega@udit.es`).

**Asunto:** Propuesta de TEMARIO y BIBLIOGRAFÍA para la Guía Docente de *Desarrollo Web: Front-End I*, curso **anual** (6 ECTS, 150 h), derivada de la planificación curricular ya publicada en el track `/tracks/fei/` y en `frontend-pedagogy/cv/udit-ruvebal-frontend-i-cv.md`.

**Qué aporta este documento:** texto listo para copiar y pegar en las secciones `TEMARIO` y `BIBLIOGRAFÍA / WEBGRAFÍA` de la guía docente. Los campos `CONTENIDOS`, `RESULTADOS DE APRENDIZAJE`, `ACTIVIDADES FORMATIVAS` y `SISTEMAS DE EVALUACIÓN` siguen la guía oficial vigente (`desarrollo-web-front-end-i-2025-2026.json` / PDF correspondiente) y **no se modifican aquí**.

**Nota sobre TEMARIO frente a CONTENIDOS:** en la guía oficial, `CONTENIDOS` describe competencias y bloques temáticos; `TEMARIO` es la lista numerada de temas que se imparten en el aula. Este TEMARIO se deriva 1:1 del plan de sesiones cerrado en `web-foundations/docs/_data/tracks.yml` (`fei:`), agrupando las 29 sesiones planificadas (semestre 1: vanilla HTML/CSS/JS; semestre 2: React moderno con IA asistida).

---

## TEMARIO

*(Formato desarrollado — bloque temático + subtemas. Semestre 1: vanilla HTML/CSS/JS. Semestre 2: React moderno con IA asistida.)*

---

### Semestre 1

Entorno de desarrollo profesional y flujo de trabajo colaborativo.

    Configuración del entorno: VS Code, extensiones, terminal y depuración básica.
    Git y GitHub: commits, ramas, pull requests y publicación en GitHub Pages.
    Convenciones de repositorio personal: README, .gitignore y trazabilidad del trabajo.

Estructura semántica y diseño fluido.

    Estructura semántica del HTML5 y fundamentos del diseño fluido: flex, grid, media queries y la función clamp().
    Diseño intrínseco: container queries y subgrids.
    Claridad estructural, jerarquía visual y adaptabilidad tipográfica.
    Pseudo-clases, pseudo-elementos e interactividad accesible por teclado (:focus-visible, estados de foco).

CSS moderno: frameworks y librerías de componentes.

    Creación de interfaces accesibles, limpias y personalizadas.
    Diseño utilitario (Tailwind CSS) frente a CSS modular y convenciones BEM.
    Integración de librerías accesibles modernas (Bootstrap, componentes reutilizables).
    Variables CSS (custom properties) y sistemas de color tipográficos fluidos.

JavaScript moderno en el navegador.

    Fundamentos ES6+: let/const, arrow functions, desestructuración, módulos import/export.
    Manipulación del DOM, delegación de eventos, plantillas y prevención de XSS.
    Asincronía: Promesas, async/await y Fetch API para consumo de datos.
    Bundlers (Vite), integración de librerías de terceros y calidad de código (ESLint, Prettier, Stylelint).

Animación web (CSS + JavaScript).

    Animación visual y microinteracciones.
    Técnicas declarativas con CSS: transiciones, @keyframes y transformaciones.
    Técnicas programáticas mediante JavaScript y librerías (GSAP: timelines, stagger, ScrollTrigger).
    Easing, delays y animación secuencial.

Visuales generativos y shaders.

    Creación visual generativa con código.
    Introducción conceptual a shaders y semilla 3D (puente hacia Front-End II).
    Repetición, interacción, aleatoriedad y manipulación gráfica.
    Tendencias de diseño web contemporáneo: parallax, glassmorphism, dark mode y demos interactivas.

Front dinámico básico: estado y data local.

    Manejo del estado local y la persistencia básica de datos en el navegador (localStorage, sessionStorage).
    Simulación de flujos de datos internos y condiciones de interfaz (loading, error, empty states).
    Consumo de APIs REST sencillas y coordinación con Backend I.

Diseño interactivo, micro UX y accesibilidad web.

    Mejora de la experiencia de usuario a través de patrones de interacción visual y accesibilidad.
    Interfaces intuitivas y comprensibles: microinteracciones, estados visuales condicionales, navegación enriquecida.
    Heurísticas de usabilidad (Nielsen) aplicadas al código propio del estudiante.
    WCAG 2.2 en la práctica: contraste, texto alternativo, etiquetas de formulario, navegación por teclado y roles ARIA básicos.
    Límite de alcance frente a la asignatura hermana de UX/UI: implementación accesible en código; la investigación UX profunda queda en la asignatura de diseño de interfaces.

Herramientas y tecnologías relevantes.

    Revisión de las tecnologías ampliamente utilizadas que forman parte del legado y presente de la web: Bootstrap, jQuery, Jekyll, etc.
    Aplicaciones actuales, limitaciones y relevancia en proyectos reales como emails responsive o sitios legacy.
    Criterios para elegir herramienta frente a CSS/JS nativo.

Proyecto integrador del semestre 1.

    Portfolio template en tres niveles: vanilla, Bootstrap+GSAP, Tailwind+Vite.
    Despliegue en GitHub Pages, diseño responsive y criterios de accesibilidad mínimos.
    Evidencia de proceso: historial de commits y reflexión ATELIER.

---

### Semestre 2

Filosofía de frameworks y desarrollo asistido por IA.

    Núcleo duradero frente a capa volátil: qué sobrevive al cambio de framework.
    Metodología docs-first: plan antes que implementación, prompts documentados, validación crítica.
    Declaración de uso de IA y límites éticos de la asistencia (human-in-the-loop).
    Los Cinco Pilares de Critical Coding for a Better Living.

Comparativa React / Vue / Vanilla DOM.

    Introducción a los conceptos de reactividad y componentización.
    Comparativa de las aproximaciones de React, Vue y JavaScript clásico: arquitecturas, sintaxis y escalabilidad.
    Modelado de estado como máquina de estados finitos y taxonomía de antipatrones.
    Criterios de selección de framework para un problema dado.

React: componentes, hooks y arquitectura de estado.

    Componentes funcionales, JSX, props, eventos y renderizado condicional.
    Hooks: useState, useEffect, useRef, useMemo, useCallback y hooks personalizados.
    Arquitectura de estado: useReducer, Context API, Zustand/Redux Toolkit (árbol de decisión explícito).

Enrutamiento, integración con backend y autenticación.

    React Router v7: rutas dinámicas, anidadas, layouts y rutas protegidas.
    Integración con backend: Fetch, React Query (caching, mutations) y GraphQL opcional.
    Autenticación: JWT, sesiones, OAuth, cookies httpOnly y prevención XSS.

SSR, internacionalización y Framework Mode.

    React Router v7 Framework Mode: renderizado en servidor, loaders y actions.
    Autenticación del lado servidor e i18n por locale (:locale).
    Patrones de despliegue SSR (PM2, nginx) como puente hacia Front-End II.

Testing, rendimiento y despliegue en producción.

    Testing unitario (Vitest), testing de componentes (React Testing Library) y end-to-end (Cypress) — Testing Trophy.
    Optimización React: Profiler, React.memo, code-splitting (lazy/Suspense) y análisis de bundle.
    Build de producción con Vite, despliegue en Vercel/Netlify, variables de entorno y CI/CD con GitHub Actions.

Proyecto integrador individual (Individual React Capstone) y evaluación final.

    Aplicación SSR bilingüe con al menos dos APIs geofísicas públicas (USGS, Open-Meteo, NOAA, etc.).
    React Query con staleTime e initialData en SSR; al menos una ruta protegida con auth por cookie httpOnly.
    Evidencia de proceso: docs/plans/, docs/reports/, declaración de uso de IA en README.
    Presentación final: demo en vivo, monografía reflexiva y defensa oral del diff propio.

---

## BIBLIOGRAFÍA / WEBGRAFÍA

### Bibliografía básica

*(Referencias curriculares y de enseñanza directamente vinculadas a los contenidos impartidos — DOI/ISBN verificados en pasadas T1/T2 del temario, 2026-08-11.)*

- Park, T. H., Dorn, B., y Forte, A. (2015). *An Analysis of HTML and CSS Syntax Errors in a Web Development Course*. *ACM Transactions on Computing Education*. https://doi.org/10.1145/2700514 *(Semestre 1 — HTML/CSS)*
- Tsai, C.-Y., Shih, W.-L., Hsieh, F.-P., Chen, Y.-A., y Lin, C.-L. (2022). Applying the Design-Based Learning Model to Foster Undergraduates' Web Design Skills: The Role of Knowledge Integration. *International Journal of Educational Technology in Higher Education*. https://doi.org/10.1186/s41239-021-00308-4 *(Semestre 1 — diseño web y proyectos)*
- Dianat, I., Adeli, P., Jafarabadi, M. A., y Karimi, M. A. (2019). User-centred Web Design, Usability and User Satisfaction: The Case of Online Banking Websites in Iran. *Applied Ergonomics*. https://doi.org/10.1016/j.apergo.2019.102892 *(Módulo UX/UI)*
- Krug, S. (2014). *Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability* (3.ª ed.). New Riders. ISBN 978-0-321-96551-6 *(Módulo UX/UI)*
- Nielsen, J., y Molich, R. (1990). Heuristic Evaluation of User Interfaces. *Proceedings of CHI '90*. https://doi.org/10.1145/97243.97281 *(Módulo UX/UI)*
- Lazar, J., Goldstein, D. F., y Taylor, A. (2015). *Ensuring Digital Accessibility through Process and Policy*. Morgan Kaufmann/Elsevier. ISBN 978-0-12-800646-7 *(Accesibilidad web)*
- Holmes, K. (2018). *Mismatch: How Inclusion Shapes Design*. MIT Press. ISBN 978-0-262-03888-1 *(Accesibilidad e inclusión)*
- Parthasarathy, S., y Joshi, U. (2024). Teaching Digital Accessibility in Computing Courses: An Experience Report. *Proceedings of the 2024 ACM Conference on International Computing Education Research (ICER '24)*. https://doi.org/10.1145/3632620.3671122 *(Accesibilidad en CS — voces docentes)*
- ACM/IEEE-CS/AAAI Joint Task Force. (2024). *Computer Science Curricula 2023: Curriculum Guidelines for Undergraduate Degree Programs in Computer Science*. ACM. https://doi.org/10.1145/3664191 *(Marco curricular — plataformas web y principios duraderos)*
- Vaithilingam, P., Leung, A., Nichols, J., y Barik, T. (2026). The Way We Notice, That's What Really Matters: Instantiating UI Components with Distinguishing Variations. *CHI Conference on Human Factors in Computing Systems*. https://doi.org/10.1145/3772318.3790621 *(Semestre 2 — modelado de componentes)*

### Bibliografía complementaria

*(Perspectiva crítica, evaluación bajo GenAI, y fundamento pedagógico transversal — compartida con Front-End II por diseño donde se indica.)*

- Postman, N. (1992). *Technopoly: The Surrender of Culture to Technology*. Knopf Doubleday. *(Capa crítica transversal — corpus-central `profield-didactics`; compartida con FE II)*
- Tenner, E. (1997). *Why Things Bite Back: Technology and the Revenge of Unintended Consequences*. Vintage. ISBN 978-0679747567 *(Consecuencias no intencionadas de la optimización tecnológica; compartida con FE II)*
- Norman, D. A. (2013). *The Design of Everyday Things* (rev. ed.). Basic Books. *(Affordances y diseño centrado en el usuario — CN03/HB05)*
- Anderson, L. W., y Krathwohl, D. R. (Eds.). (2001). *A Taxonomy for Learning, Teaching, and Assessing: A Revision of Bloom's Taxonomy of Educational Objectives*. Longman. *(Marco de evaluación por competencias)*
- Prather, J., et al. (2023). "It's Weird That it Knows What I Want": Usability and Interactions with Copilot for Novice Programmers. *ACM Transactions on Computer-Human Interaction*. https://doi.org/10.1145/3617367 *(IA asistida — comprensión vs. completitud)*
- Prather, J., Reeves, B. N., Leinonen, J., MacNeil, S., Randrianasolo, A. S., Becker, B. A., Kimmel, B., Wright, J., y Briggs, B. (2024). The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers. *ACM Conference on International Computing Education Research*. https://doi.org/10.1145/3632620.3671116 *(GenAI y brecha de validación)*
- Russo, F., Saenz, J. P., y De Russis, L. (2026). Investigating Web Project Assessment in an AI World. *CHI Conference on Human Factors in Computing Systems Extended Abstracts*. https://doi.org/10.1145/3772363.3798887 *(Evaluación de proyectos web bajo GenAI)*
- Lara, A., et al. (2019). A Project-based Learning Experience in a Compilers Course. *SIGCSE Technical Symposium on Computer Science Education*. https://doi.org/10.1145/3300115.3309502 *(Evidencia de proceso y defensa oral)*
- García, M. (2025). Self-Coded Digital Portfolios as Authentic Assessment in Project-Based Learning. *Education Sciences*. https://doi.org/10.3390/educsci15091150 *(Portafolio autocodificado — única cohorte web del vault)*
- Nelson, M. A., y Ponciano, L. (2021). Experiences and Insights from Using GitHub Classroom to Support Project-Based Courses. *Third International Workshop on Software Engineering Education for the Next Generation (SEENG)*. https://doi.org/10.1109/SEENG53126.2021.00013 *(Infraestructura «un estudiante, un repositorio»)*
- Zimmerman, B. J. (2000). Attaining Self-Regulation: A Social Cognitive Perspective. En M. Boekaerts, P. R. Pintrich y M. Zeidner (Eds.), *Handbook of Self-Regulation* (pp. 13–39). Academic Press. https://doi.org/10.1016/B978-012109890-2/50031-7 *(Autorregulación en workflows con IA)*

### Webgrafía

*(Documentación técnica oficial de las herramientas impartidas — no bibliografía académica.)*

- MDN Web Docs — https://developer.mozilla.org/es/
- W3C — Web Content Accessibility Guidelines (WCAG) 2.2 — https://www.w3.org/TR/WCAG22/
- React Documentation — https://react.dev
- React Router Documentation — https://reactrouter.com
- Vite Documentation — https://vite.dev
- Vitest Documentation — https://vitest.dev
- React Testing Library — https://testing-library.com/react
- Cypress Documentation — https://docs.cypress.io
- GitHub Docs — https://docs.github.com

---

## Cobertura declarada — lagunas honestas

| Bloque temático | Bibliografía académica |
| --- | --- |
| Semestre 1 — CSS/JS vanilla | citado (Park, Tsai) |
| UX/UI y accesibilidad | citado (Dianat, Krug, Nielsen, Lazar, Holmes, Parthasarathy) |
| Semestre 2 — React / frameworks | citado (CS2023, Vaithilingam, Prather) |
| Animación / GSAP / 3D introductorio | **sin respaldo pedagógico verificado en el vault** — se apoya en documentación de plataforma y práctica profesional |
| Capa crítica / GenAI / evaluación | citado (Postman, Tenner, Norman, Prather, Russo, García, Nelson) |

---

## Antes de enviar — verificación humana pendiente

- [ ] Confirmar redacción final en castellano antes de pegar en Word (formato desarrollado: bloque + subtemas).
