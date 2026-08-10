# **Guía Curricular Avanzada de Desarrollo Front-End (Frontend II)**

A continuación se detallan los **objetivos de aprendizaje**, el contenido organizado por bloques, las actividades prácticas, la coordinación con backend, y tendencias futuras.

## **Objetivos de Aprendizaje**

**Conocimientos (CN):**

- **CN03:** Identificar los fundamentos del **diseño** y la **programación** de aplicaciones web y móviles, incluyendo principios de UX/UI, arquitectura front-end y herramientas modernas.

**Habilidades (HB):**

- **HB02:** Utilizar herramientas y tecnologías de desarrollo web actuales para crear programas o aplicaciones tanto en dispositivos móviles como en computadoras (frameworks, librerías, bundlers, etc.).

- **HB05:** Valorar y aplicar recursos que combinen **estética, diseño y funcionalidad** en el desarrollo de aplicaciones web, asegurando interfaces atractivas y usables.

- **HB06:** Determinar las **herramientas de software**, **lenguajes de programación** y **entornos de desarrollo** más apropiados para solucionar un problema web dado, tomando decisiones informadas sobre qué framework, librería o técnica utilizar en cada caso.

**Competencias (CM):**

- **CM01:** Diseñar **interfaces persona-computador** (UI) garantizando **accesibilidad** y **usabilidad** según estándares de experiencia de usuario vigentes en la industria del software. Esto implica crear interfaces responsivas, inclusivas (cumpliendo WCAG) y centradas en el usuario, asegurando una experiencia consistente en diferentes dispositivos.

## Fundamento Pedagógico

> _Critical Coding for a Better Living._

Frontend II parte de donde Frontend I termina: no vuelve a explicar componentes, hooks, enrutamiento o testing básico de React — eso ya es territorio construido en el semestre 2 de Frontend I (`docs/lessons/en/react/`) — sino que enseña a pensar en **sistemas de interfaces**, no solo interfaces sueltas: arquitectura de producción, resiliencia offline, testing profesional, rendimiento, y la frontera de la capa de interfaz más allá del navegador (3D, IoT/robótica, servicios respaldados por Python). El **núcleo duradero** aquí es el modelo de componentes (props, estado, hooks); la **capa volátil** es el destino de renderizado — DOM, WebGL, APIs de dispositivo — que cambia mientras el modelo de pensamiento permanece. El desarrollo asistido por IA se practica de forma **transparente, documentada y verificada** (docs-first: plan antes que implementación), y se extiende aquí a una competencia propia de esta asignatura — la **revisión de código asistida por IA** como técnica enseñada explícitamente, no como atajo prohibido. Los sistemas para los que se programa se amplían aquí más allá del navegador: las GPU que renderizan las escenas 3D, las APIs de los dispositivos que este curso conecta, y los servicios backend que consume. Ingeniería de rendimiento y accesibilidad son dos caras de la misma moneda — respeto por los recursos computacionales y la atención humana que consume nuestro trabajo.

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
