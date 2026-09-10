---
layout: lesson
title: 'Unidad 3: Astro avanzado e integración multi-framework'
title_alt: 'Unit 3: Advanced Astro Architecture & Multi-Framework Integration'
slug: feii-unit-3-astro-advanced
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/feii/unit-3-astro-advanced/
description: 'Patrones avanzados de Astro: content collections, obtención de datos, islas multi-framework y arquitectura micro-frontend.'
tags:
  [
    feii,
    astro,
    advanced-architecture,
    content-collections,
    multi-framework,
    micro-frontends,
    data-fetching,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> La arquitectura coordina contenido, datos, islas de framework y límites de despliegue.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** esquemas de contenido, obtención de datos y límites de integración explícitos. **Señal de frontera:** islas en servidor/edge y composición multi-framework siguen siendo práctica activa. **Estado pedagógico:** no hay comparación HE directa de secuencias docentes multi-framework; esta lección es un piloto informado por transferencia.</p>
</aside>

> **Prueba de estudio:** Dibuja un mapa de límites y nombra un coste de integración.

> **Caso de estudio de esta unidad:** todos los fragmentos de código marcados **TTOD real** provienen tal cual del repositorio público de [TTOD — 道 The Tao of Development](https://github.com/ruvebal/ttod) (`services/frontend/src/`), un proyecto Astro en producción con content collections, routing i18n, dos islas de framework (React y Svelte) y un backend FastAPI separado. Puedes explorar el código fuente completo y su [documentación pública](https://ruvebal.github.io/ttod/) mientras sigues esta lección.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Demo Astro de Unidad 2 o repo de equipo en marcha | Sí |
| Al menos una isla React de Unidad 2 | Sí |
| Astro Docs MCP (de Unidad 2) | Muy recomendado |
| Issue de backlog de equipo para Entrega 1 | Para lab B2 |

**Tiempo oficial:** 1 h magistral (B1) + 2 h lab (equipo, B2) + 2 h resolución de ejercicios (individual, B3).

---

## Sigue este camino

| Fase | Quién | Acción | Sección |
| --- | --- | --- | --- |
| 1 | Individual | Esbozar mapa de límites: esquema de contenido, fuente de datos, islas, destino de despliegue | Idea maestra + Content Collections |
| 2 | Individual | Definir un esquema de collection; validar en build | Content Collections |
| 3 | Individual | Configurar routing i18n de Astro (`es` + `en`); verificar ambas URLs de locale en el build | Routing de internacionalización |
| 4 | Individual | Elegir SSR, isla cliente o ruta edge para un escenario API — justificar en una línea | Patrones de obtención de datos |
| 5 | Individual | Añadir segunda isla de framework **o** documentar por qué basta un solo framework | Integración multi-framework |
| 6 | Equipo | Entregar un ítem real del backlog: collection, ruta localizada, isla o ruta edge/API (B2) | B2 · Lab |
| 7 | Individual | Completar ejercicios B3; ítem 2 declarado sin IA | B3 · Ejercicios |

---

## Comprueba antes de salir

- [ ] `npm run build` pasa sin avisos Zod/esquema silenciosos
- [ ] [Routing i18n de Astro](https://docs.astro.build/es/guides/internationalization/) activo con al menos `es` y `en`; ambas rutas home de locale resuelven (obligatorio para Entrega 1)
- [ ] El mapa de límites nombra contenido, datos, isla(s) de framework y destino de despliegue
- [ ] La nota de release indica elección SSG / SSR / mixto (`prerender` por ruta) y por qué (lenguaje eje narrate)
- [ ] CI verde en el PR de equipo; revisión humana de esquema o ruta generados por IA
- [ ] Ítem 2 de B3 completado sin asistencia IA (declarado)

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Build falla en frontmatter | Desajuste de tipos Zod (fecha vs string, campo ausente) | Alinear esquema en `src/content.config.ts`; leer la línea de error Zod |
| Importar `z` desde `"zod"` | La versión del paquete npm puede no coincidir con el validador de Astro | Usar `import { z } from 'astro:content'` (así lo hace TTOD), no `import * as z from "zod"` |
| «Funciona en dev, falla en build» | Fetch SSR solo en servidor de desarrollo | Ejecutar `npm run build` antes de abrir PR |
| La página fetcha como SPA | Isla cliente donde bastan datos en build | Preferir `fetch` en frontmatter de `.astro` para contenido SEO público |
| Patrones Next.js en `.astro` | Copiado `getServerSideProps` de docs React | Usar fetch en frontmatter Astro (véase excerpt de obtención de datos) |
| Hinchazón de bundle multi-framework | Cada isla usa `client:load` | Escalonar con `client:visible` / `client:idle`; justificar cada isla |
| Lab de equipo bloqueado | Sin issue en backlog | Usar issue semilla del profesor; no inventar funcionalidades ficticias |
| `/en/…` o `/es/…` devuelve 404 tras build | Falta `i18n` o páginas fuera de carpetas de locale | Configurar `i18n` en `astro.config.mjs`; duplicar rutas según [routing i18n de Astro](https://docs.astro.build/es/guides/internationalization/) |
| El selector de idioma salta a ruta incorrecta | URLs hard-coded sin prefijo de locale | Preferir `getRelativeLocaleUrl()` / `getAbsoluteLocaleUrl()` de `astro:i18n`; TTOD usa una regexp manual sobre `Astro.url.pathname` en su lugar — funciona, pero es más frágil (véase Routing de internacionalización) |

---

## Entrega (evidencia Unidad 3)

- **Individual:** respuestas B3 (separadas del repo de equipo) + captura o markdown del mapa de límites
- **Equipo:** enlace al issue, enlace al PR, log de validación de esquema o build, nota de release con estrategia de renderizado

---

> _"La arquitectura es el arte de ordenar el código para que cambiar una parte no rompa todo lo demás."_

> **Declaración de asistencia IA:** Esta unidad integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso.

---

## Convenciones de código en esta unidad

Mismo vocabulario que la Unidad 2 y la Unidad 5 de FE II — comprueba la etiqueta antes de pegar:

- **CodeSandbox-ready** — archivo completo; copiar-pegar; funciona con el scaffold del sandbox.
- **Excerpt** — patrón parcial, ilustrativo. **No** ejecuta tal cual.
- **TTOD real** — código tal cual vive hoy en el repo público de [TTOD](https://github.com/ruvebal/ttod), `services/frontend/src/`. No es un ejemplo de juguete: es el proyecto de referencia que vas a estudiar como caso de arquitectura Astro avanzada durante esta unidad.
- **Template** — copiar y sustituir valores marcados antes de usar, sobre todo el esquema Zod, que codifica campos de ejemplo de esta lección, no los tuyos.
- **Zod en collections** — en Astro 5, `z` se reexporta desde `astro:content`: `import { defineCollection, z } from 'astro:content';`. TTOD usa exactamente esto (véase abajo) — no necesitas el paquete `zod` como dependencia directa ni `astro/zod`.

---

## 🎯 Objetivos de aprendizaje

Al final de esta unidad podrás:

- **Diseñar content collections** — Datos estructurados para blogs, docs o catálogos de producto
- **Configurar routing i18n de Astro** — Prefijos de locale integrados (`/es/`, `/en/`) alineados con FE I (obligatorio para Entrega 1)
- **Implementar patrones de obtención de datos** — Carga en servidor, hidratación en cliente y caché en edge
- **Mezclar varios frameworks** — Islas React, Vue y Svelte en el mismo proyecto Astro
- **Planificar arquitecturas micro-frontend** — Cuándo usar Astro para composición frente a apps monolíticas por framework
- **Optimizar para producción** — Objetivos de build, optimización de assets y estrategias de despliegue

---

## 📖 Content Collections

Las content collections de Astro ofrecen una forma estructurada de gestionar contenido Markdown y [MDX](https://mdxjs.com/):

### Definir una collection

**TTOD real** — la configuración de collections vive en `src/content.config.ts` (Astro 5+; proyectos legacy Astro 4 pueden usar `src/content/config.ts`). Así es exactamente como TTOD define su collection `docs` (documentación docs-first bilingüe, la que estás leyendo tú mismo ahora en modo espejo):

```ts
// services/frontend/src/content.config.ts — TTOD, tal cual en el repo
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['en', 'es']),
    order: z.number().int().nonnegative(),
  }),
});

export const collections = { docs };
```

El glob `**/*.{md,mdx}` acepta Markdown plano (`.md`) y [MDX](https://mdxjs.com/) (`.mdx`) — Markdown con componentes JSX embebidos. Fíjate en el campo `locale: z.enum(['en', 'es'])`: TTOD no tiene una collection por idioma, sino un único esquema con el idioma como dato validado — la misma decisión que vas a tomar tú en Entrega 1.

### Usar collections en plantillas

**TTOD real** — la ruta dinámica `src/pages/[locale]/docs/[...slug].astro` consulta la collection filtrando por el `locale` de la URL y renderiza el Markdown con `render()`:

```astro
---
// services/frontend/src/pages/[locale]/docs/[...slug].astro — TTOD, tal cual en el repo
import { getCollection, render } from 'astro:content';
import Page from '../../../layouts/Page.astro';
import { isLocale, labels } from '../../../content/wisdom';

const locale = Astro.params.locale;
if (!isLocale(locale)) return new Response(null, { status: 404 });
const slug = Astro.params.slug || 'introduction';
const entries = await getCollection('docs', ({ data }) => data.locale === locale);
const entry = entries.find((item) => item.id === `${locale}/${slug}`);
if (!entry) return new Response(null, { status: 404 });
const { Content } = await render(entry);
---

<Page lang={locale} title={entry.data.title}>
  <h1>{entry.data.title}</h1>
  <Content />
</Page>
```

Esto te da:
- **Datos type-safe** — Los esquemas Zod validan el frontmatter Markdown
- **API de consulta** — Ordenar, filtrar y paginar contenido de forma programática
- **Cero JS por defecto** — El contenido se renderiza como HTML estático salvo que añadas interactividad

---

## 🔄 Patrones de obtención de datos

Astro admite varias estrategias de obtención de datos:

### Carga de datos en servidor (SSR)

**TTOD real** — Astro carga datos en el frontmatter (servidor, en cada petición porque `output: 'server'`), no con `getServerSideProps` al estilo Next.js. `src/pages/[locale]/quote.astro` pide una cita en directo al backend FastAPI antes de renderizar:

```astro
---
// services/frontend/src/pages/[locale]/quote.astro — TTOD, tal cual en el repo
const backend = import.meta.env.BACKEND_URL ?? 'http://backend:8000';
const response = await fetch(`${backend}/api/v1/wisdom/sample`, {
  headers: { accept: 'application/json' }
});
if (!response.ok) {
  throw new Error(`Backend quote request failed (${response.status})`);
}
const payload: unknown = await response.json();
const quote = payload.find((entry) => entry?.lang === locale) ?? payload[0];
---

<blockquote>{quote.text}</blockquote>
```

Fíjate en el fallo explícito (`throw new Error`) si el backend no responde, en vez de renderizar una página a medias — una decisión de arquitectura que vale la pena justificar en tu propia nota de release.

### Hidratación en cliente (islas)

**TTOD real** — la isla `GraphIsland.svelte` no recibe datos por props del `.astro` padre; los pide ella misma en `onMount`, en paralelo, desde el navegador:

```astro
---
// services/frontend/src/pages/[locale]/graph.astro — TTOD, tal cual en el repo
import GraphIsland from '../../components/graph/GraphIsland.svelte';
---
<GraphIsland client:load />
```

```svelte
<!-- services/frontend/src/components/graph/GraphIsland.svelte — TTOD, excerpt del onMount -->
<script lang="ts">
  import { onMount } from 'svelte';
  let allNodes = $state([]);
  let loading = $state(true);
  let error = $state('');

  onMount(() => {
    void (async () => {
      try {
        const [graphResponse, wisdomResponse] = await Promise.all([
          fetch('/api/v1/graph', { cache: 'no-store' }),
          fetch('/api/v1/wisdom/sample', { cache: 'no-store' })
        ]);
        if (!graphResponse.ok || !wisdomResponse.ok) throw new Error('The live graph is unavailable.');
        const graph = await graphResponse.json();
        const wisdom = await wisdomResponse.json();
        allNodes = joinTags(graph.nodes, wisdom);
      } catch (reason) {
        error = reason instanceof Error ? reason.message : 'The live graph is unavailable.';
      } finally {
        loading = false;
      }
    })();
  });
</script>
```

Este es Svelte 5 con *runes* (`$state`, `$derived`), no React — pero el patrón (isla se hidrata, isla pide sus propios datos, isla gestiona su propio estado de carga/error) es idéntico al que usarías con `useEffect` + `useState` en React.

### Por qué TTOD no usa funciones edge de Astro

TTOD **no** tiene rutas `src/pages/api/*.ts` dentro de Astro. Toda la obtención de datos —SSR en frontmatter o hidratación en isla— llama a un backend FastAPI independiente (`services/backend/`) por HTTP. Es una decisión de arquitectura real, no una omisión: separa el contrato de API (Python/FastAPI, con su propio ciclo de vida y pruebas) de la capa de presentación (Astro). Si tu proyecto de equipo sí necesita una función edge propia de Astro, la sintaxis es:

```ts
// src/pages/api/data.json.ts — Excerpt genérico, no usado en TTOD
export async function GET({ request }) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Elige según:**
- **SSR (frontmatter `.astro`)** — Contenido necesario para SEO, datos que cambian con frecuencia — así lo hace TTOD en `quote.astro`
- **Cliente (isla)** — Datos específicos de usuario, actualizaciones en tiempo real, o widget que puede fallar/cargar de forma independiente del resto de la página — así lo hace TTOD en `GraphIsland.svelte`
- **Edge (`src/pages/api/*.ts`)** — Contenido personalizado con baja latencia servido por el propio Astro, sin backend separado — patrón disponible pero no elegido por TTOD

---

## 🌍 Routing de internacionalización (obligatorio para Entrega 1)

Entrega 1 debe publicar un **sitio Astro bilingüe** usando el [routing i18n integrado de Astro](https://docs.astro.build/es/guides/internationalization/) — no un selector de idioma solo en cliente. Esto continúa el patrón `/es/…` y `/en/…` de FE I, pero con el router de Astro en lugar de React Router.

**Contrato mínimo:**

- `astro.config.mjs` declara `defaultLocale`, `locales: ['es', 'en']` y una estrategia `routing` explícita
- Al menos una página compartida existe en ambos locales (p. ej. home + una ruta interior)
- Los enlaces de locale usan helpers de Astro — sin cadenas `/en/foo` hard-coded repartidas en componentes

**TTOD real** — así es la configuración `i18n` de `astro.config.mjs` tal cual vive en el repo (nota `prefixDefaultLocale: true`: TTOD prefija **ambos** locales, incluido el por defecto — `/en/` y `/es/`, nunca una ruta sin prefijo):

```js
// services/frontend/astro.config.mjs — TTOD, tal cual en el repo
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: true }
  },
});
```

**TTOD real (con matiz honesto)** — TTOD **no** usa los helpers `getRelativeLocaleUrl()` / `getAbsoluteLocaleUrl()` de `astro:i18n` que la documentación oficial recomienda. En su lugar, cada página lee `Astro.params.locale` (viene de la carpeta dinámica `src/pages/[locale]/`) y construye las rutas a mano; el selector de idioma en `Page.astro` hace el cambio de locale con una regexp sobre la URL actual:

```astro
---
// services/frontend/src/layouts/Page.astro — TTOD, tal cual en el repo
const { lang } = Astro.props; // 'en' | 'es'
const otherLocale = lang === 'en' ? 'es' : 'en';
const switchPath = '/' + otherLocale + Astro.url.pathname.replace(/^\/(en|es)/, '');
---
<a href={switchPath} lang={otherLocale}>{lang === 'en' ? 'Español' : 'English'}</a>
```

Esto **funciona** — es lo que corre en producción — pero es más frágil que los helpers oficiales: la regexp asume que el locale es siempre el primer segmento y no valida el resultado. Es un ejemplo honesto de deuda técnica real, no un patrón ideal a copiar sin más: en tu propio proyecto, preferir `getRelativeLocaleUrl()` te ahorra mantener esa regexp a mano.

Organiza páginas bajo `src/pages/` siguiendo la [estructura de carpetas de la guía i18n de Astro](https://docs.astro.build/es/guides/internationalization/#create-localized-pages) — TTOD usa el patrón de carpeta dinámica `src/pages/[locale]/` con una comprobación de guarda (`if (locale !== 'en' && locale !== 'es') return new Response(null, { status: 404 })`) en vez de duplicar carpetas `en/` y `es/`. Ejecuta `npm run build` e inspecciona `dist/` — ambas URLs de entrada de locale deben existir antes de Entrega 1.

> **No cuenta para Entrega 1:** un sitio Astro monolingüe con diccionario en cliente y sin rutas con prefijo de locale.

---

## 🌐 Integración multi-framework

La arquitectura de islas de Astro facilita mezclar frameworks:

### Configurar varios frameworks

**TTOD real** — la integración de frameworks se declara en `astro.config.mjs` (React y Svelte; TTOD no usa Vue):

```js
// services/frontend/astro.config.mjs — TTOD, tal cual en el repo
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [mdx(), react(), svelte()],
});
```

### Usar frameworks juntos — pero no en la misma página

**TTOD real** — a diferencia del dashboard de ejemplo típico (varios frameworks conviviendo en una sola página), TTOD asigna **un framework por ruta**, cada uno en su propia página `.astro`:

```astro
---
// services/frontend/src/pages/[locale]/oracle.astro — TTOD, isla React
import OracleTerminal from '../../components/oracle/OracleTerminal';
---
<OracleTerminal locale={locale} client:load />
```

```astro
---
// services/frontend/src/pages/[locale]/graph.astro — TTOD, isla Svelte
import GraphIsland from '../../components/graph/GraphIsland.svelte';
---
<GraphIsland client:load />
```

El Oracle (terminal de streaming SSE, estado de conversación) es React; el grafo de conocimiento (layout radial SVG, animaciones GSAP) es Svelte. Ninguna página carga los dos. Es una frontera de framework **por funcionalidad**, no por conveniencia — más fácil de razonar y de asignar en equipo que una única página con tres islas compitiendo por el mismo DOM.

**Beneficios (según se observan en TTOD):**
- **La herramienta adecuada** — React para el estado de conversación con múltiples turnos (Oracle); Svelte para animación e interacción directa con SVG (grafo)
- **Ownership claro por equipo** — quien trabaja el Oracle nunca toca el código Svelte del grafo, y viceversa
- **Bundles aislados** — cada ruta carga solo el framework que necesita; `/oracle` nunca descarga el runtime de Svelte

### Cuándo usar multi-framework

- **Equipos con perfiles mixtos** — Desarrolladores React poseen islas React, Svelte poseen islas Svelte — así reparte TTOD sus dos equipos de isla (Oracle y Grafo)
- **Migración legacy** — Migrar gradualmente componentes antiguos de un framework a un proyecto Astro nuevo
- **Casos especializados** — Svelte para widgets críticos en rendimiento (animación SVG), React para gestión de estado compleja (streaming, historial de conversación)

---

## 🏗️ Arquitectura micro-frontend

Astro encaja especialmente bien en composición micro-frontend:

### Composición frente a implementación

```
┌─────────────────────────────────────────────────────────┐
│           ESTRATEGIA MICRO-FRONTEND                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Enfoque A: Implementación primero                       │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│   │ App React │  │ App Vue   │  │ App Svelte│          │
│   └──────────┘  └──────────┘  └──────────┘          │
│   composición iframe o portal (pesada, lenta)            │
│                                                          │
│   Enfoque B: Composición primero (Astro) — así es TTOD     │
│   ┌──────────────────────────────────────────────┐     │
│   │ Router Astro ([locale] + content collections)│     │
│   │   ├─ /oracle → Isla React (terminal SSE)     │     │
│   │   ├─ /graph  → Isla Svelte (grafo SVG+GSAP)  │     │
│   │   └─ /quote, /wisdom → SSR puro, cero JS      │     │
│   └──────────────────────────────────────────────┘     │
│   Backend FastAPI separado sirve los datos (HTTP)      │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

El enfoque composición-primero de Astro te da:
- **Routing compartido** — Una estructura de URL para todo el sitio
- **Estilos compartidos** — Tokens CSS y design system entre frameworks
- **Datos compartidos** — La carga en servidor alimenta todas las islas
- **Despliegues independientes** — Las islas pueden actualizarse sin redesplegar todo el sitio

### Objetivos de build

**TTOD real** — TTOD elige `output: 'server'` (SSR en todas las rutas, no SSG) con el adaptador Node en modo `standalone`, porque `quote.astro` y la ruta `wisdom` necesitan pedir datos frescos al backend en cada petición, no solo en build:

```js
// services/frontend/astro.config.mjs — TTOD, tal cual en el repo
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

El adaptador Node `standalone` produce un servidor Node.js autocontenido (sin depender de un runtime serverless de terceros) — coherente con el principio del estudio de TTOD de "todo corre en local, sin lock-in de proveedor cloud". Si tu equipo despliega en Vercel/Netlify/Cloudflare, el adaptador cambia pero el resto del código no.

**Elige según:**
- **Estático (`output: 'static'`)** — Sitios de contenido, blogs, documentación (más rápido, más barato) — no es lo que hace TTOD, porque necesita datos en vivo
- **Servidor (`output: 'server'`)** — Contenido dinámico, páginas por usuario — así lo hace TTOD, con `node({ mode: 'standalone' })`
- **Mixto** — `output: 'server'` con flags `prerender` por ruta para las páginas que sí pueden ser estáticas (sustituye al legacy `output: 'hybrid'`)

---

## 🎯 Ejercicio de práctica

**Tiempo:** 1 hora

1. **Crear una content collection** para un blog o catálogo de producto
2. **Activar routing i18n de Astro** — Al menos locales `es` y `en` con rutas prefijadas que funcionen (obligatorio para Entrega 1)
3. **Implementar carga en servidor** — Obtener datos de una API y renderizarlos en servidor
4. **Añadir islas multi-framework** — Integrar al menos dos frameworks (React + Vue o Svelte)
5. **Comparar estrategias de renderizado** — Construir la misma página con SSG y SSR; medir diferencias de rendimiento
6. **Diseñar arquitectura micro-frontend** — Documentar cómo compondrías varios proyectos basados en framework usando Astro

**Entregable:** Proyecto Astro con content collection, routing i18n, islas multi-framework y diagrama de arquitectura

---

## 📚 Lecturas recomendadas

- **Content Collections** — https://docs.astro.build/es/guides/content-collections/
- **Internacionalización (routing i18n)** — https://docs.astro.build/es/guides/internationalization/
- **Data Fetching** — https://docs.astro.build/es/guides/server-side-rendering/
- **Multi-Framework Rendering** — https://docs.astro.build/es/guides/framework-components/
- **Deployment Targets** — https://docs.astro.build/es/guides/deploy/
- **TTOD — código fuente** — https://github.com/ruvebal/ttod/tree/main/services/frontend/src (todos los ejemplos "TTOD real" de esta unidad)
- **TTOD — documentación pública y modelo docente** — https://ruvebal.github.io/ttod/es/teaching/tasks/ (tareas asignables detalladas, útil si tu equipo adopta TTOD como referencia para Entrega 1)

---

## ✅ Resultado de la sesión

Al final de esta unidad deberías:

- Poder diseñar e implementar content collections con esquemas type-safe
- Configurar routing i18n de Astro con URLs de locale en español e inglés (requisito de Entrega 1)
- Entender cuándo usar obtención de datos en servidor frente a cliente
- Mezclar con éxito componentes React, Vue y Svelte en el mismo proyecto Astro
- Planificar arquitecturas micro-frontend usando Astro como capa de composición
- Elegir objetivos de build adecuados (SSG vs SSR vs mixto con `prerender` por ruta) según el caso

Las Unidades 2–3 completan el CONTENIDO oficial **Arquitecturas de aplicaciones front-end** con Astro como meta-framework. El proyecto semilla de Entrega 1 puede construirse ya con estos patrones.

---

> _"La buena arquitectura es invisible. Solo la notas cuando falta."_

> _"La capa interior es la más reutilizable. La exterior, la más prescindible. Construye valor hacia dentro."_
> — Tao of Development, `arch-011`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Resultado de la sesión"
  visual-grammar: "typed-composition-boundaries — typed content collections and framework islands converging through explicit composition boundaries"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Tesis:** componer varios frameworks solo parece barato porque cada isla sigue pagando su propio coste de hidratación por separado — y ya existe un primitivo de frontera diseñado para eliminar ese coste por completo.

La resumability, distinta de la hidratación, se define por re-serializar el estado necesario de la aplicación en el HTML mismo en lugar de re-ejecutar código en cliente para recuperarlo. La misma fuente nombra la arquitectura de islas directamente como optimización *parcial* del coste de hidratación que «no resuelve el problema fundamental… que la resumability evita cambiando los axiomas» (Vepsäläinen 2024, 2).
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
Resumability, as distinct from hydration, is defined by re-serializing the necessary application state into the HTML itself rather than re-executing code on the client to recover it. The same source names islands architecture directly as a *partial* optimization of hydration's cost that "does not solve the fundamental issue… that resumability avoids by changing the axioms" (Vepsäläinen 2024, 2 — Ahmes coat `3d09df05`, node `6589254e-3a63-5095-9571-363afdb8040b`).
-->
{% endif %}

Preséntalo como límite, no como contradicción: el patrón de islas de la Unidad 2 es la respuesta estándar de la industria hoy; la resumability es hacia donde avanza la frontera. Mezclar islas de tres frameworks en una página multiplica el coste de hidratación por isla que describe el artículo — un dato que conviene conocer antes de que un equipo sobre-adopte composición multi-framework por moda.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
**Evidence update (2026-08-23):** the Ahmes sources ground the *technique* — what resumability and islands are, and their trade-offs. The teaching object is now the boundary decision: content schema, data location, framework island, server island, and deployment target must be mapped before implementation. **No Ahmes source supports a claim that teaching content collections, multi-framework composition, or micro-frontend design produces better learning outcomes for this cohort.** The lab remains a transfer-informed pilot; see the dated FE II gap-pass record in the research repository copy.
-->
{% endif %}

**Esquema para el docente:** véase `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · equipo

Issue real del backlog, no inventado: o bien extender una content collection existente (o añadir una nueva) con un esquema que el proyecto del equipo necesite de verdad, **o** añadir una isla de framework adicional (Vue/Svelte, junto a la isla de Unidad 2) al mismo proyecto, **o** implementar una ruta edge/API de obtención de datos que el proyecto necesite. Elige la opción que el backlog contenga.

Definición de hecho: cualquier cambio de esquema de content collection se valida en build — un fallo Zod silencioso no es aceptable; CI verde; revisión humana de cualquier sugerencia generada por IA; nota de release que documente qué estrategia de renderizado (SSG/SSR/mixto con `prerender` por ruta) se eligió para el cambio y por qué, en lenguaje eje narrate (vocabulario Unidad 11, introducido aquí a propósito).

Los roles rotan; no repitas un rol ni una capa ya asumida en el lab de Unidad 2.

Evidencia: rama, PR, salida de validación de esquema (o equivalente para la ruta isla/API elegida), fila de log aceptar/rechazar IA si usaste asistencia.

## B3 · Resolución de ejercicios — 2 h · individual

1. **Diagnóstico:** una entrada de content collection falla su esquema Zod en build. Dado el mensaje de error y el frontmatter, nombra el campo problemático y corrígelo.
2. **Sin IA (declarado):** dados tres escenarios de datos — precio de producto que cambia cada hora, entrada de blog publicada una vez, carrito en vivo de un usuario — decide SSR, generación estática o fetch en cliente para cada uno, y justifica cada elección en una frase, sin asistencia IA.
3. Explica, con tus palabras, por qué añadir un cuarto framework a un proyecto Astro no multiplica la complejidad de build como ocurriría al añadir un cuarto framework a una SPA única.

Los esbozos de respuesta del profesor pertenecen a la copia del instructor. Estos ejercicios están descontextualizados del producto del equipo a propósito.

## Referencias

- Vepsäläinen, Juho. 2024. “Resumability—A New Primitive for Developing Web Applications.” *IEEE Access*. https://doi.org/10.1109/ACCESS.2024.3352891.
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
- Vepsäläinen, J. (2024). *Resumability — A New Primitive for Developing Web Applications.* `10.1109/ACCESS.2024.3352891`. Ahmes coat `3d09df05`, node `6589254e-3a63-5095-9571-363afdb8040b`, p.2. Resolved via `ahmes query &#45;&#45;cite`, `evaluator_safe=yes`.
-->
{% endif %}
{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
located by grep over extract/index.md for "Hydration can be optimized" inside coat 3d09df05 (matrix-named as the resumability coat), node/page resolved via sqlite3 join fission_node × anchor_spatial, cite confirmed via `ahmes query &#45;&#45;cite <db>:<node_id> &#45;&#45;require-evaluator-safe`
-->
{% endif %}
- **Límite de evidencia restante:** esta unidad no establece que enseñar content collections, composición multi-framework o arquitectura micro-frontend produzca mejores resultados de aprendizaje medibles que una secuencia alternativa. La técnica de frontera está documentada; el lab de razonamiento sobre límites es un piloto.
