---
layout: lesson
title: 'Desarrollo Frontend Moderno: Secuencia Didáctica de React'
slug: react
category: react
tags: [react, curriculum, overview]
date: 2025-01-15
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/react/
status: draft
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->


> _"El viaje de mil apps comienza con un solo commit."_

---

## 🎯 Visión general del currículo

Esta secuencia didáctica guía al alumnado desde los fundamentos filosóficos hasta el dominio de React, preparándoles para un desarrollo autónomo y crítico en la era de la programación asistida por IA.

### El arco de aprendizaje

```
┌─────────────────────────────────────────────────────────┐
│                    ARCO DEL SEMESTRE                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  FASE 1: FUNDAMENTOS (Semanas 1-3)                       │
│  ════════════════════════════════                        │
│  1. Filosofía y visión ───► Por qué codificamos críticamente
│  2. Comparativa de frameworks ► Elegir herramientas con intención
│  3. Estado e IU ───────────► El núcleo de la interactividad
│  4. Dev asistido por IA ───► Usar IA como colaboradora
│                                                          │
│  FASE 2: INMERSIÓN EN REACT (Semanas 4-7)                │
│  ═══════════════════════════════════                      │
│  5. Fundamentos de React ─► Componentes, props, eventos   │
│  6. Dominio de hooks ─────► useState, useEffect, custom   │
│  7. Arquitectura de estado ► Context, reducers, patrones  │
│  8. Routing y navegación ─► React Router, rutas protegidas│
│                                                          │
│  FASE 3: INTEGRACIÓN (Semanas 8-10)                      │
│  ════════════════════════════════                         │
│  9. Integración backend ───► Fetch, React Query, APIs     │
│  10. Autenticación ───────► JWT, sesiones, seguridad      │
│  11. Testing ─────────────► Vitest, RTL, Cypress          │
│                                                          │
│  FASE 4: MAESTRÍA (Semanas 11-12)                         │
│  ════════════════════════════                             │
│  12. Rendimiento ─────────► Memoization, code splitting   │
│  13. Despliegue ──────────► Vercel, CI/CD, entorno        │
│  14. Presentación ────────► Demo day, memoria/monografía  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📖 Fase 1: Fundamentos

### Lección 1: Filosofía y visión pedagógica

**Archivo**: [`modern-fe-intro`](./modern-fe-intro/)

| Aspecto          | Detalles                                            |
| ---------------- | -------------------------------------------------- |
| **Duración**     | 3 horas                                            |
| **Concepto núcleo** | La mentalidad del Tao Developer                 |
| **Resultados clave** | Entender el modelo atelier, 5 pilares, ideas de proyecto |

**Qué aprende el alumnado**:

- Por qué importa “Critical Coding for a Better Living”
- Los cinco pilares: maestría, autonomía, ética, simplicidad, futuro
- Cómo evaluar ideas de proyecto
- Estructura del semestre y expectativas

**Conexión con la siguiente lección**: Tras establecer el _por qué_ codificamos críticamente, exploramos _qué herramientas_ usar.

---

### Lección 2: Fundamentos de frameworks

**Archivo**: [`frameworks-comparative`](./frameworks-comparative/)

| Aspecto          | Detalles                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Duración**     | 4 horas (2 sesiones)                                       |
| **Concepto núcleo** | Selección tecnológica informada                         |
| **Resultados clave** | Construir la misma app en Vanilla/React/Vue, articular trade-offs |

**Qué aprende el alumnado**:

- Qué son los frameworks y por qué existen
- React vs Vue vs Vanilla: comparación práctica
- Matriz de decisión para la selección tecnológica
- Setup con Vite y tooling moderno

**Conexión con la siguiente lección**: Con el paisaje de frameworks entendido, profundizamos en _estado_—el corazón de la interactividad.

---

### Lección 3: Estado e IU

**Archivo**: [`state-and-ui`](./state-and-ui/)

| Aspecto          | Detalles                                              |
| ---------------- | ---------------------------------------------------- |
| **Duración**     | 3 horas                                              |
| **Concepto núcleo** | El estado como memoria de la interacción          |
| **Resultados clave** | Modelar IU como FSM, identificar antipatrónes, elegir herramientas |

**Qué aprende el alumnado**:

- Definiciones formales (FSM) y prácticas (IU) de estado
- Taxonomía de estado (IU, formularios, servidor, URL, compartido)
- Statecharts para flujos complejos
- Antipatrones: estado derivado, explosión de booleanos, closures obsoletos

**Conexión con la siguiente lección**: Comprender el estado nos prepara para el desarrollo asistido por IA, donde la validación sustituye a la certeza.

---

### Lección 4: Fundamentos de desarrollo asistido por IA

**Archivo**: [`ai-assisted-development-foundations`](/methodology/en/ai-assisted-development-foundations/)

| Aspecto          | Detalles                                                  |
| ---------------- | -------------------------------------------------------- |
| **Duración**     | 2 horas                                                  |
| **Concepto núcleo** | IA como colaboradora, no sustituta                    |
| **Resultados clave** | Mapear IA a patrones de arquitectura, entender modelos de confianza |

**Qué aprende el alumnado**:

- LLMs como motores de razonamiento probabilístico
- Arquitectura clásica (contratos, descomposición, seguridad)
- Conectar IA con patrones MVC/MVVM
- Observabilidad y diseño human-in-the-loop

**Conexión con la siguiente fase**: Con los fundamentos sólidos, construimos fluidez en React.

---

## 📖 Fase 2: Inmersión en React

### Lección 5: Fundamentos de React (próximamente)

**Archivo sugerido**: `react-fundamentals.md`

| Tema               | Contenido                            |
| ------------------ | ---------------------------------- |
| **Modelo de componentes** | Componentes funcionales, sintaxis JSX |
| **Props**           | Paso de datos, tipos, children     |
| **Eventos**          | Clicks, formularios, teclado       |
| **Renderizado**      | Condicionales, listas, keys        |
| **Setup de proyecto** | Vite + React + TypeScript         |

**Hands-on**: construir una librería de componentes con `Button`, `Card`, `Input`, `Modal`.

---

### Lección 6: Dominio de hooks

**Archivo sugerido**: `react-hooks.md`

| Tema                   | Contenido                                  |
| ---------------------- | ---------------------------------------- |
| **useState**            | Estado local, actualizaciones, updates funcionales |
| **useEffect**           | Efectos secundarios, cleanup, dependencias |
| **useRef**              | Refs DOM, valores mutables                 |
| **useMemo/useCallback** | Optimización de rendimiento                |
| **Custom hooks**        | Extraer lógica reutilizable                |

**Hands-on**: construir hooks: `useFetch`, `useLocalStorage`, `useDebounce`.

---

### Lección 7: Arquitectura de estado

**Archivo sugerido**: `react-state-architecture.md`

| Tema                  | Contenido                            |
| --------------------- | ---------------------------------- |
| **useReducer**         | Lógica de estado compleja, acciones |
| **Context API**        | Compartir estado en el árbol        |
| **Librerías externas** | Zustand, Redux Toolkit              |
| **Cuándo usar qué**    | Árbol de decisión para gestión de estado |

**Hands-on**: carrito de compra con context + reducer.

---

### Lección 8: Routing y navegación

**Archivo sugerido**: `react-routing.md`

| Tema                | Contenido                   |
| ------------------- | ------------------------- |
| **React Router v6**  | Routes, Link, useNavigate |
| **Rutas dinámicas**  | Parámetros URL, useParams |
| **Rutas anidadas**   | Layouts, Outlet           |
| **Rutas protegidas** | Guards de auth, redirects |

**Hands-on**: app multipágina con dashboard protegido.

---

## 📖 Fase 3: Integración

### Lección 9: Integración backend

**Archivo sugerido**: `react-backend-integration.md`

| Tema              | Contenido                         |
| ----------------- | ------------------------------- |
| **Fetch API**      | GET, POST, manejo de errores     |
| **Patrones async** | Estados de carga, race conditions |
| **React Query**    | Caché, refetch, mutations        |
| **GraphQL**        | Opcional: bases de Apollo        |

---

### Lección 10: Autenticación

**Archivo sugerido**: `react-authentication.md`

| Tema              | Contenido                          |
| ----------------- | -------------------------------- |
| **Conceptos de auth**  | JWT, sesiones, OAuth             |
| **Implementación**     | Formularios de login, almacenamiento de tokens |
| **Seguridad**          | Cookies httpOnly, prevención XSS |
| **Terceros**           | Firebase Auth, Auth0             |

---

### Lección 11: Testing

**Archivo sugerido**: `react-testing.md`

| Tema                 | Contenido                        |
| -------------------- | ------------------------------ |
| **Unit testing**      | Vitest, testear funciones puras |
| **Testing de componentes** | React Testing Library      |
| **Integración**       | Testing con APIs mockeadas      |
| **E2E**               | Bases de Cypress                |

---

## 📖 Fase 4: Maestría

### Lección 12: Rendimiento

**Archivo sugerido**: `react-performance.md`

| Tema               | Contenido                          |
| ------------------ | -------------------------------- |
| **React DevTools**  | Profiler, resaltado de componentes |
| **Memoization**     | React.memo, useMemo, useCallback |
| **Code splitting**  | lazy(), Suspense                 |
| **Análisis de bundle** | Entender qué se entrega        |

---

### Lección 13: Despliegue

**Archivo sugerido**: `react-deployment.md`

| Tema                     | Contenido               |
| ------------------------ | --------------------- |
| **Proceso de build**      | Vite production build |
| **Vercel/Netlify**        | Deploy desde GitHub    |
| **Variables de entorno**  | Gestión de secretos    |
| **CI/CD**                 | Bases de GitHub Actions |

---

### Lección 14: Presentación final

| Componente              | Peso |
| ---------------------- | ---- |
| Aplicación funcional   | 40%  |
| Demo en vivo           | 15%  |
| Presentación técnica   | 15%  |
| Memoria/monografía     | 20%  |
| Calidad de la reflexión| 10%  |

---

## 🗺️ Grafo de dependencias entre lecciones

```
                    ┌─────────────────┐
                    │  1. Filosofía   │
                    │  modern-fe-intro│
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  2. Frameworks  │
                    │   comparative   │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              ▼                              ▼
    ┌─────────────────┐            ┌─────────────────┐
    │   3. Estado/IU  │            │ 4. Dev con IA   │
    │    extended     │            │   foundations   │
    └────────┬────────┘            └────────┬────────┘
             │                              │
             └──────────────┬───────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │  5. React       │
                   │  Fundamentals   │
                   └────────┬────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐
    │ 6. Hooks  │   │ 7. Estado │   │ 8.Routing │
    │  Mastery  │   │   Arch    │   │           │
    └─────┬─────┘   └─────┬─────┘   └─────┬─────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │9. Backend │ │10. Auth   │ │11. Testing│
    └─────┬─────┘ └─────┬─────┘ └─────┬─────┘
          │             │             │
          └─────────────┼─────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
      ┌───────────┐       ┌───────────┐
      │12. Perf   │       │13. Deploy │
      └─────┬─────┘       └─────┬─────┘
            │                   │
            └─────────┬─────────┘
                      ▼
              ┌───────────────┐
              │ 14. Final     │
              │ Presentation  │
              └───────────────┘
```

---

## 📋 Plantilla de lección

Usa esta plantilla al crear nuevas lecciones:

```markdown
# [Emoji] [Título de la lección]

> _"Cita inspiradora"_

---

## 📜 Tabla de contenidos

[Generada a partir de encabezados]

---

## Objetivos de aprendizaje

Al final de esta lección, podrás:

- [ ] Objetivo 1 (Nivel de Bloom: Comprender/Aplicar/Analizar/Evaluar/Crear)
- [ ] Objetivo 2
- [ ] Objetivo 3

---

## Conocimientos previos

| Concepto   | Dónde se cubre |
| ---------- | -------------- |
| [Previo 1] | [Enlace]       |
| [Previo 2] | [Enlace]       |

---

## [Secciones principales]

...

---

## Actividades prácticas

### 🔬 Actividad 1: [Nombre]

**Tarea**: ...
**Entregable**: ...

---

## Preguntas de reflexión

> 💭 _[Pregunta 1]_
> 💭 _[Pregunta 2]_

---

## Ideas clave

- Idea 1
- Idea 2
- Idea 3

---

## Referencias

- [Documentación]
- [Artículos]
- [Libros]

---

## 🔗 Navegación

| Anterior                        | Actual            | Siguiente                                             |
| ------------------------------ | ---------------- | ---------------------------------------------------- |
| [Todas las lecciones](/lessons/es/) | **React (visión general)** | [Comparativa de frameworks](./frameworks-comparative/) |

---

## 🎓 Alineación con evaluación

| Bloque              | Tipo de evaluación             | Peso |
| ------------------- | ------------------------------ | ---- |
| 1-4 (Fundamentos)   | Participación + Reflexión      | 10%  |
| 5-8 (React core)    | Retos de componentes           | 20%  |
| 9-11 (Integración)  | Implementación de features     | 25%  |
| 12-13 (Maestría)    | Revisión de código + Optimización | 15% |
| 14 (Final)          | Demo + Monografía              | 30%  |

---

## ✅ Checklist de finalización

### Fase 1: Fundamentos ✓

- [x] `modern-fe-intro.md` — Filosofía y visión
- [x] `frameworks-comparative.md` — Comparativa de frameworks
- [x] `state-and-ui-extended.md` — Estado e IU
- [x] `ai-assisted-development-foundations.md` — Teoría de IA y arquitectura

### 📘 Guías de referencia

- [x] `ai-practical-guide.md` — **Metodología Docs-First** (prompts, informes, MCP, workflows)

### Fase 2-4: React + Integración (Esqueleto listo para iterar)

- [x] `react-fundamentals.md` — Componentes, JSX, props
- [x] `react-hooks.md` — useState, useEffect, custom
- [x] `react-state-architecture.md` — Context, reducers, Zustand
- [x] `react-routing.md` — React Router, rutas protegidas
- [x] `react-backend-integration.md` — Laravel/Hygraph, React Query
- [x] `react-authentication.md` — Patrones de auth, seguridad
- [x] `react-testing.md` — Vitest, RTL, Cypress
- [x] `react-performance.md` — Optimización, Lighthouse
- [x] `react-deployment.md` — Vercel, CI/CD

### ¡Las 14 piezas del currículo creadas! 🎉

---

> _"La próxima generación de Tao developers codificará de forma crítica y autónoma, para un mejor vivir en el borde de la programación asistida por IA."_
```
