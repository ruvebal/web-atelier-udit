---
layout: lesson
title: 'Unidad 1: Lanzamiento — De React FE I a arquitectura de producción'
title_alt: 'Unit 1: Kickoff — From FE I React to Production Architecture'
slug: feii-unit-1-kickoff
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/feii/unit-1-kickoff/
description: 'Sesión de orientación que enlaza los fundamentos React de FE I con la arquitectura de producción de FE II, el pensamiento en capa de interfaz y los sistemas de interfaces.'
tags: [feii, orientacion, arquitectura, capa-interfaz, produccion, pensamiento-sistemico]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El front-end de producción no es un <code>index.html</code> que sirve un bundle ejecutable en un navegador de escritorio. Es una <strong>capa de orquestación</strong> — una red distribuida de puntos de contacto entre navegador/dispositivo, edge/servicio, backend y persona usuaria.</p>
<p><strong>Lente de campo:</strong></p>
<ul>
<li><strong>Ancla de práctica:</strong> dejar de programar solo «páginas» y diseñar <strong>flujos de orquestación multi-capa</strong> (qué vive en cliente, qué en edge, qué en API, qué responde al contexto de la persona usuaria).</li>
<li><strong>Señal de frontera:</strong> edge computing, capacidades de dispositivo/<abbr title="Progressive Web App — aplicación web progresiva">PWA</abbr>, tiempo real (<abbr title="Conflict-free Replicated Data Type — tipo de dato replicado sin conflictos">CRDT</abbr>, WebSocket) y sistemas multi-superficie amplían dónde termina «el front-end».</li>
<li><strong>Estado pedagógico:</strong> esta unidad es orientación sin ancla <abbr title="Contenidos oficiales de la guía docente">CONTENIDOS</abbr> técnica; el marco prepara el piloto de las unidades 2–12.</li>
</ul>
</aside>

> **Prueba de estudio:** Dibuja las superficies, contratos y límites de fallo de un producto — no solo componentes UI, sino CDN/edge, caché, auth y degradación offline.

### Siglas en esta unidad

| Sigla | Significado | Primera aparición |
| --- | --- | --- |
| **SPA** | *Single Page Application* — aplicación de una sola página | § Replanteamiento |
| **PWA** | *Progressive Web App* — web con capacidades offline e instalable | § Vector de conexión |
| **BFF** | *Backend for Frontend* — API adaptada a necesidades de la capa de interfaz | § Vector de conexión |
| **CDN** | *Content Delivery Network* — red de distribución de contenido | § Vector de conexión |
| **CI/CD** | *Continuous Integration / Continuous Delivery* — integración y entrega continuas | § Vector de conexión |
| **a11y** | *Accessibility* — accesibilidad (11 letras entre «a» y «y») | § Vector de conexión |
| **CRDT** | *Conflict-free Replicated Data Type* — sincronización de estado distribuido | § Señal de frontera |
| **API** | *Application Programming Interface* — contrato de servicio | § Replanteamiento |
| **SSR** | *Server-Side Rendering* — HTML generado en servidor por petición | § Meta-frameworks |
| **SSG** | *Static Site Generation* — HTML generado en build | § Meta-frameworks |
| **RSC** | *React Server Components* — componentes que renderizan solo en servidor (ecosistema React) | § Meta-frameworks |
| **DX** | *Developer Experience* — experiencia de desarrollo | § Meta-frameworks |

---
<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

{% include lesson-semantic-graphic.html %}

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| FE I semestre 2 completado (app React desplegada) | Sí |
| Acceso al índice del track + `exercises.md` de esta unidad | Sí |
| Repositorio de equipo para Entrega 1 | Aún no — empieza en Unidad 2 |

---

## Sigue este camino (orientación — sin lab)

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Leer el sistema distribuido de interfaces | El front-end como sistema distribuido |
| 2 | Completar la tabla del vector cuatripartito (ejercicio 1) | Vector de conexión cuatripartito |
| 3 | Distinguir meta-framework frente a micro-frontend | Meta-frameworks frente a micro-frontends |
| 4 | Revisar el calendario del curso en el índice del track (no duplicado aquí) | [Índice FE II]({{ '/tracks/feii/' | relative_url }}) |
| 5 | Anotar el puente FE I → FE II | Conexión con FE I |
| 6 | Leer reglas de declaración IA en FE II | Desarrollo asistido por IA en FE II |
| 7 | Completar **3 ejercicios individuales** (1 h) | Ejercicios (individual) |
| 8 | Ojear lecturas canónicas para Unidad 2 | Lecturas recomendadas |

---

## Comprueba antes de salir

- [ ] Puedes explicar «interfaz única» frente a «sistema de interfaces» en un párrafo
- [ ] Puedes nombrar **una decisión de arquitectura** por cada pilar del vector (navegador, servicio, despliegue, persona usuaria)
- [ ] Puedes nombrar los temas de las Unidades 2, 5 y 11 sin mirar
- [ ] Los ejercicios distinguen **velocidad** de **comprensión** (ejercicio 2)
- [ ] Sabes dónde se conectará Astro Docs MCP (avance Unidad 2)

---

## Fallos frecuentes

| Error | Por qué importa | Evítalo |
| --- | --- | --- |
| Tratar el kickoff como «semana libre» | El lab de Unidad 2 asume este marco | Entrega los ejercicios |
| Esperar tarea de lab en equipo | 0 h de lab es oficial | Espera a Unidad 2 |
| Usar IA en el ejercicio 2 | Marcado «resoluble sin IA» | Escribe dos frases tú mismo/a |

---

## Entrega (evidencia Unidad 1)

Entrega los tres ejercicios por el canal del profesor (Moodle / issue en repo — según se anuncie en clase). No hay PR de equipo en esta unidad.

---

> _"Antes de la primera línea de código, prepara la forja. Antes de la primera consulta, carga la memoria. La documentación no es un epílogo — es el primer acto de arquitectura."_
> — Tao of Development, `wis-014`
{: .tao-development-quote }

> **Declaración de asistencia IA:** Esta unidad integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso.

> 📐 **Convención de bloques de código:** esta unidad incluye un **Excerpt** ilustrativo (middleware Astro); no es ejecutable en U1. Política completa: [§ Convenciones]({{ '/lessons/en/feii/' | relative_url }}#-conventions-used-across-these-lessons).

---

## 🎯 Objetivos de aprendizaje

Al final de esta sesión de orientación podrás:

- **Enlazar** los fundamentos React de FE I con el foco en arquitectura de producción de FE II
- **Comprender el cambio de capa de interfaz** — de una SPA a un sistema distribuido de interfaces (edge, dispositivo, tiempo real, multi-superficie)
- **Aplicar el vector cuatripartito** — navegador, servicio/API, despliegue/infra y persona usuaria como decisiones de arquitectura, no solo como capas de código
- **Distinguir meta-framework y micro-frontend** — dimensiones distintas (proyecto único vs escala organizacional); convergencia en producción
- **Alinear con la filosofía de núcleo durable** — frameworks como capa volátil, principios como base estable

---

## 📖 Replanteamiento de la capa de interfaz

En FE I aprendiste a construir interfaces — componentes, gestión de estado, routing, autenticación y despliegue. Construiste aplicaciones React sólidas: una **SPA** (*Single Page Application*) con un bundle principal y un objetivo de despliegue claro.

FE II plantea otra pregunta: **¿Qué ocurre cuando las interfaces escalan más allá de esa SPA?**

- No una app React, sino decenas de micro-frontends y meta-frameworks de composición (Unidades 2–3)
- No solo render en navegador, sino caché en **edge**, **PWA**, service workers y experiencias offline-first (Unidad 4)
- No solo APIs REST, sino **BFF**, WebSocket, dispositivos IoT y servicios Python (Unidades 10–11)
- No solo testing de componentes, sino pipelines **CI/CD**, presupuestos de rendimiento y monitorización (Unidades 5–7)

La capa de interfaz ya no es una sola pantalla — es un **sistema distribuido** con componentes orientados a las personas.

---

## 🌐 El front-end como sistema distribuido de interfaces

En software moderno, la interfaz ya no es solo la *view* de un monolito. Es una capa que opera simultáneamente en el **edge**, en dispositivos heterogéneos, mediante eventos en tiempo real y a través de múltiples superficies (móvil, web, embebidos, agentes de IA).

```
                    [ CAPA DE INTERFAZ ]
                            │
     ┌──────────────────────┼──────────────────────┐
     ▼                      ▼                      ▼
[ NAVEGADOR / DISPOSITIVO ] [ EDGE / SERVICIO ] [ PERSONA USUARIA ]
• Micro-frontends           • Edge Functions      • Multi-superficie
• Motores de render         • Middleware / auth     • Accesibilidad (a11y)
• Estado local y storage    • Caché y streaming   • Contexto de red/dispositivo
```

**Ecosistemas heterogéneos:** un mismo sistema de diseño puede alimentar web, webviews nativas, extensiones, widgets embebidos o interfaces de voz — no un solo `index.html`.

**Separación de responsabilidades:** la lógica de interfaz se desplaza dinámicamente entre cliente, red de distribución (edge) y backend según latencia, seguridad y capacidad de procesamiento.

### Vector de conexión cuatripartito (Ancla de práctica)

Deja de dibujar solo componentes UI. Para cada dimensión, escribe **una decisión de arquitectura** — la pregunta que harías en producción:

| Dimensión | Puntos de integración en producción | Decisión de arquitectura |
| --- | --- | --- |
| **Navegador / cliente** | PWA, Service Workers, Storage APIs, capacidades Web | ¿Qué estado vive offline y qué requiere sincronización? |
| **Servicio / API** | GraphQL, **BFF** (*Backend for Frontend*), REST, Server Actions | ¿Cómo se desacopla el modelo de datos del dominio de la vista? |
| **Despliegue / infra** | Edge (Cloudflare Workers, Fastly), **CI/CD**, **CDN** | ¿Qué lógica de render o routing se ejecuta cerca del usuario? |
| **Persona usuaria** | Tipo de dispositivo, contexto de red, preferencias **a11y** | ¿Cómo degrada el sistema con elegancia (*graceful degradation*)? |

Este vector reaparece en Entrega 1 (Astro + edge middleware), Entrega 2 (WebSocket + panel IoT) y el capstone (Unidades 11–12).

### Ejemplo de orquestación: middleware en el edge (vista previa Unidad 2)

**Excerpt** — ilustrativo; no ejecuta en esta unidad. Muestra cómo el edge actúa como **primera capa de orquestación** antes del HTML en el navegador. Docs canónicas: [Middleware en Astro](https://docs.astro.build/es/guides/middleware/)

```ts
// src/middleware.ts — Excerpt (Astro; Unidad 2+)
import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, redirect } = context;
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') ?? '';

  // 1. Contexto geográfico/dispositivo sin tocar el cliente
  locals.isMobile = /mobile/i.test(userAgent);

  // 2. Auth y routing en la frontera (edge)
  if (url.pathname.startsWith('/dashboard') && !request.headers.get('cookie')?.includes('session=')) {
    return redirect('/login', 302);
  }

  const response = await next();

  // 3. Cabeceras de caché del sistema
  response.headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600');
  return response;
});
```

Observa el patrón: **inyectar contexto**, **decidir en la frontera**, **renderizar interfaz**, **fijar política de caché** — sin asumir que todo ocurre en React en cliente.

### La lente de sistemas (FE I → FE II)

FE I te enseñó a pensar componente primero. FE II te enseña a pensar sistema primero:

```
┌─────────────────────────────────────────────────────────┐
│                    CAPA DE INTERFAZ                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Interfaz única (FE I)     Sistema de interfaces (FE II) │
│   ┌─────────────────┐         ┌──────────────────────┐  │
│   │ Componente React│         │ Meta-framework       │  │
│   │ Estado y props  │         │ Micro-frontends      │  │
│   │ Routing SPA     │         │ Edge + middleware    │  │
│   └─────────────────┘         │ PWA / offline        │  │
│                                │ Tiempo real / IoT    │  │
│                                └──────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

El modelo de componentes se mantiene — props, estado, ciclo de vida — pero el **contexto de despliegue** cambia radicalmente.

---

## 🔭 Señal de frontera: ampliando el límite del front-end

Cuatro vectores donde la frontera del front-end se expande hoy (profundización en unidades posteriores):

```
              [ FRONTERA DEL FRONT-END ]
                         │
    ┌────────────┬───────┴───────┬────────────┐
    ▼            ▼               ▼            ▼
[ EDGE ]    [ DISPOSITIVO ]  [ TIEMPO REAL ] [ MULTI-SUPERFICIE ]
Middleware  PWA, WASM,      CRDTs,          Design tokens,
SSR cercano WebGPU, APIs    WebSocket       web + móvil + IA
```

| Vector | Qué cambia | Unidad FE II |
| --- | --- | --- |
| **Edge computing** | SSR parcial, A/B, optimización antes del primer byte | 2–3, 7 |
| **Capacidades de dispositivo** | Navegador como runtime de alto rendimiento (WASM, WebGPU, 3D) | 4, 8–9 |
| **Tiempo real** | Cliente como nodo en red de estado distribuido (**CRDT**, WebSocket) | 10–11 |
| **Multi-superficie** | Misma lógica → web, nativo, embebidos, agentes | 11–12 |

### Actividades de transferencia (piloto)

1. **Diseño de arquitectura:** diagrama para e-commerce o banca global — CDN/edge, caché, auth middleware, hidratación selectiva (Unidad 2) y fallback offline (Unidad 4). Sin mockups UI.
2. **Simulación de degradación:** bajo 3G lento y CPU ×6 (Unidad 7), el sistema debe mantener funciones críticas. En U1, **predice** qué capa fallaría primero.

---

## 🔬 Honestidad académica — por qué el curso abre con disciplina de declaración, no con promesa de velocidad

Esta sesión de orientación **no tiene ancla CONTENIDOS ni afirmación técnica que establecer**. Lo que sí debe enmarcar, antes de la Unidad 2, es *por qué* FE II pide declarar asistencia IA en lugar de limitarse a usarla.

Una tensión recurrente en programación asistida por IA es la diferencia entre
terminar una tarea antes y desarrollar comprensión durable y transferible.
Por eso el curso trata la velocidad como evidencia insuficiente: debes
explicar, probar y defender las decisiones de tu implementación.

---

## Meta-frameworks frente a micro-frontends

Ambos abordan la complejidad del front-end moderno, pero desde **dimensiones distintas**:

- **Meta-framework** — optimiza la *experiencia de desarrollo y ejecución de un proyecto* (un repo, un ciclo de vida cliente/servidor).
- **Micro-frontends** — estrategia *organizacional e infraestructural* para que varios equipos desplieguen partes de la interfaz con autonomía.

> **No son opuestos.** En producción suelen **combinarse**: cada micro-frontend suele ser, por dentro, su propio meta-framework.

### Meta-frameworks: capa de orquestación full-stack

Un meta-framework se construye **encima** de una librería UI (React, Vue, Svelte, Solid) para resolver lo que la librería no cubre sola: routing, **SSR** / **SSG**, optimización de assets y, a menudo, endpoints de API.

| Aspecto | Detalle |
| --- | --- |
| **Objetivo** | Unificar cliente y servidor en un proyecto homogéneo |
| **Mecanismos** | Routing por archivos (`/app`, `/pages`), **RSC** (*React Server Components*, en el ecosistema React), Server Actions, build unificado (Vite, Turbopack) |
| **Ejemplos** | Next.js, Nuxt, SvelteKit, SolidStart — y **Astro** en FE II (meta-framework de **composición** e islas, no SPA monolítica) |

Docs canónicas Astro (tu Unidad 2): [Por qué Astro](https://docs.astro.build/es/concepts/why-astro/) · [Islas](https://docs.astro.build/es/concepts/islands/)

### Micro-frontends: descomposición organizacional

Inspirado en microservicios: varias aplicaciones independientes, despliegue autónomo, composición en navegador o en edge.

| Aspecto | Detalle |
| --- | --- |
| **Objetivo** | Equipos que escalan sin bloquearse mutuamente |
| **Mecanismos** | Module Federation, Web Components, iframes, routing en proxy/edge |
| **Coste** | Red más compleja, dependencias duplicadas, coherencia visual difícil |

### Matriz comparativa

| Dimensión | Meta-framework | Micro-frontends |
| --- | --- | --- |
| **Límite principal** | Un proyecto / aplicación | Sistema de varias aplicaciones |
| **Problema que resuelve** | Rendimiento, SSR/SSG, **DX**, estructura | Escala de equipos, despliegues independientes |
| **Dependencias** | Centralizadas | Fragmentadas o federadas |
| **Integración** | Build time / servidor unificado | Runtime (federation) o proxy en edge |

### Convergencia en producción

```
        [ EDGE / PROXY INVERSO (Cloudflare / NGINX) ]
                         │
     ┌───────────────────┼───────────────────┐
     ▼                   ▼                   ▼
[ Next.js ]         [ Nuxt ]            [ Astro ]
 Equipo checkout     Equipo catálogo     Equipo marketing
 (micro-frontend A)  (micro-frontend B)  (micro-frontend C)
```

En FE II trabajarás primero el **meta-framework Astro** (Unidades 2–3). La composición multi-framework y el diagrama de micro-frontends se profundizan en la Unidad 3 — no confundas «islas en un solo repo Astro» con «varios repos desplegados por equipos distintos» hasta entonces.

**Calendario de 12 unidades, horas de lab y entregables:** solo en el [índice del track FE II]({{ '/tracks/feii/' | relative_url }}) — no se duplica en esta lección.

---

## 🔗 Conexión con FE I

El track React de FE I es **territorio ya recorrido** — no volveremos a enseñar fundamentos React, hooks, routing ni despliegue básico. Eso es tuyo del semestre 2.

FE II empieza donde FE I termina:

- **FE I:** «Construye una app React con routing y auth»
- **FE II:** «Construye un sistema de apps React con Astro, PWA y caché en edge»

Los patrones de componentes que aprendiste en FE I — hooks, context, custom hooks — siguen igual. Cambia cómo se componen y despliegan.

---

## 🤖 Desarrollo asistido por IA en FE II

La asistencia IA en FE II sigue la misma metodología docs-first que FE I, con mayor foco en:

- **Diagramas de arquitectura** — IA para diagramas de sistema, flujos de datos y docs de despliegue
- **Auditorías de rendimiento** — IA para informes de bundle, cuellos de botella y optimizaciones
- **Estrategias de testing** — IA para diseñar suites, casos límite y revisar PRs
- **Revisión de código como técnica evaluable** — Unidades 5–6: flujo PR human-in-the-loop; tú decides aceptar/rechazar/escalar

La IA colabora en diseño de sistemas, no sustituye aprender arquitectura.

---

## Lab (equipo) — 0 h en esta unidad

La Unidad 1 tiene **0 h de laboratorio** de forma explícita: un lab en equipo necesita un artefacto compartido en repositorio, y en el kickoff aún no existe. El primer lab de equipo llega en la Unidad 2, cuando el scaffolding Astro da al grupo algo común. Rellenar esta sección con una tarea ficticia falsearía lo que «lab» significa en el resto del curso.

## Ejercicios (individual) — descontextualizados · 1 h

Tres problemas breves que aíslan el replanteamiento, antes de cualquier ancla CONTENIDOS:

1. **Diagnóstico / arquitectura.** Dada una descripción breve estilo FE I (una SPA React, un objetivo de despliegue), completa el **vector cuatripartito**: para navegador, servicio, despliegue y persona usuaria, indica qué afirmación cambiaría en FE II y cuál permanecería.
2. Con la tensión rendimiento-frente-aprendizaje de arriba, escribe dos frases que distingan qué demuestra que una herramienta IA acelere *tu* tarea y qué no demuestra sobre lo que comprendes. **Resoluble sin IA — declarado como tal.**
3. Consulta el [índice del track FE II]({{ '/tracks/feii/' | relative_url }}) y, sin abrir las lecciones de Unidades 2 y 8, predice en una frase cada una qué necesitarán de la «lente de sistemas» de esta unidad. Autocomprobación — no es pregunta calificable.

Esquema de respuestas del profesor: en `exercises.md`, no en esta página.

---

## 📚 Lecturas recomendadas

Documentación canónica y avance hacia Unidad 2:

- **Por qué Astro** (meta-framework de composición) — https://docs.astro.build/es/concepts/why-astro/
- **Arquitectura de islas** — https://docs.astro.build/es/concepts/islands/
- **Middleware Astro** (orquestación edge/servidor) — https://docs.astro.build/es/guides/middleware/
- **PWA / offline** (avance Unidad 4) — https://web.dev/learn/pwa/
- **Core Web Vitals** (avance Unidad 7) — https://web.dev/articles/vitals
- **Testing Trophy** (contexto Unidades 5–6) — https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications

Índice de la secuencia docente Astro en Web Atelier: [{{ '/lessons/en/astro/' | relative_url }}]({{ '/lessons/en/astro/' | relative_url }})

---

## ✅ Resultado de la sesión

Al terminar esta orientación deberías:

- Entender por qué FE II se centra en **sistemas distribuidos de interfaces** (edge, dispositivo, tiempo real, multi-superficie)
- Poder aplicar el **vector cuatripartito** a un producto real sin reducirlo a componentes UI
- Poder distinguir **meta-framework** (proyecto único, Astro en U2–3) de **micro-frontend** (varios equipos/repos)
- Saber dónde está el arco semestral completo ([índice del track]({{ '/tracks/feii/' | relative_url }}))
- Estar listo/a para **arquitectura meta-framework Astro** en unidades 2–3
- Ver la filosofía de núcleo durable: los frameworks cambian, los principios perduran

---

> _"Un monorepo no es un monolito. Un monolito no es modular. Un sistema modular no tiene por qué ser distribuido."_
> — Tao of Development, `arch-006`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Resultado de la sesión"
  visual-grammar: "production-interface-surfaces — multiple production interface surfaces connected as one durable system"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
