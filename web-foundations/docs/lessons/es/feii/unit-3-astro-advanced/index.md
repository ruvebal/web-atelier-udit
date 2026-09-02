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
| Importar `z` desde `"zod"` | La versión del paquete npm puede no coincidir con el validador de Astro | Usar `import { z } from 'astro/zod'`, no `import * as z from "zod"` |
| «Funciona en dev, falla en build» | Fetch SSR solo en servidor de desarrollo | Ejecutar `npm run build` antes de abrir PR |
| La página fetcha como SPA | Isla cliente donde bastan datos en build | Preferir `fetch` en frontmatter de `.astro` para contenido SEO público |
| Patrones Next.js en `.astro` | Copiado `getServerSideProps` de docs React | Usar fetch en frontmatter Astro (véase excerpt de obtención de datos) |
| Hinchazón de bundle multi-framework | Cada isla usa `client:load` | Escalonar con `client:visible` / `client:idle`; justificar cada isla |
| Lab de equipo bloqueado | Sin issue en backlog | Usar issue semilla del profesor; no inventar funcionalidades ficticias |
| `/en/…` o `/es/…` devuelve 404 tras build | Falta `i18n` o páginas fuera de carpetas de locale | Configurar `i18n` en `astro.config.mjs`; duplicar rutas según [routing i18n de Astro](https://docs.astro.build/es/guides/internationalization/) |
| El selector de idioma salta a ruta incorrecta | URLs hard-coded sin prefijo de locale | Usar `getRelativeLocaleUrl()` / `getAbsoluteLocaleUrl()` de `astro:i18n` |

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
- **Template** — copiar y sustituir valores marcados antes de usar, sobre todo el esquema Zod y los bloques de content collection, que codifican campos de ejemplo de esta lección, no los tuyos.
- **Zod en collections** — siempre `import { z } from 'astro/zod'`; nunca `import * as z from "zod"` para esquemas de content collection.

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

**Template** — la configuración de collections vive en `src/content.config.ts` (Astro 5+; proyectos legacy Astro 4 pueden usar `src/content/config.ts`). Sustituye nombres de campo y rutas por los de tu proyecto.

> **Regla de importación Zod:** usa `import { z } from 'astro/zod'`. **No** uses `import * as z from "zod"` — Astro fija la versión del validador en `astro/zod` para que las comprobaciones en build coincidan con los tipos generados.

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    tags: z.array(z.string()),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
```

El glob `**/*.{md,mdx}` acepta Markdown plano (`.md`) y [MDX](https://mdxjs.com/) (`.mdx`) — Markdown con componentes JSX embebidos.

### Usar collections en plantillas

```astro
---
import { getCollection } from 'astro:content';
import BlogPost from '../components/BlogPost.astro';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts
  .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
  .slice(0, 10);
---

{sortedPosts.map((post) => (
  <BlogPost post={post} />
))}
```

Esto te da:
- **Datos type-safe** — Los esquemas Zod validan el frontmatter Markdown
- **API de consulta** — Ordenar, filtrar y paginar contenido de forma programática
- **Cero JS por defecto** — El contenido se renderiza como HTML estático salvo que añadas interactividad

---

## 🔄 Patrones de obtención de datos

Astro admite varias estrategias de obtención de datos:

### Carga de datos en servidor (SSR)

**Excerpt** — Astro carga datos en el frontmatter (servidor/tiempo de build), no con `getServerSideProps` al estilo Next.js:

```astro
---
const response = await fetch('https://api.example.com/data');
const data = await response.json();
---

<h1>{data.title}</h1>
```

### Hidratación en cliente (islas)

**Excerpt** — asume hooks de React importados en el archivo del componente:

```astro
---
import DataComponent from '../components/DataComponent.jsx';
---

<DataComponent client:load />
```

```jsx
// DataComponent.jsx — Excerpt
import { useEffect, useState } from 'react';

export default function DataComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <p>Loading...</p>;
  return <h1>{data.title}</h1>;
}
```

### Funciones edge

```js
// src/pages/api/data.json.ts
export async function GET({ request }) {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
```

**Elige según:**
- **SSR** — Contenido necesario para SEO, datos que cambian con frecuencia
- **Cliente** — Datos específicos de usuario, actualizaciones en tiempo real
- **Edge** — Contenido personalizado con baja latencia

---

## 🌍 Routing de internacionalización (obligatorio para Entrega 1)

Entrega 1 debe publicar un **sitio Astro bilingüe** usando el [routing i18n integrado de Astro](https://docs.astro.build/es/guides/internationalization/) — no un selector de idioma solo en cliente. Esto continúa el patrón `/es/…` y `/en/…` de FE I, pero con el router de Astro en lugar de React Router.

**Contrato mínimo:**

- `astro.config.mjs` declara `defaultLocale`, `locales: ['es', 'en']` y una estrategia `routing` explícita
- Al menos una página compartida existe en ambos locales (p. ej. home + una ruta interior)
- Los enlaces de locale usan helpers de Astro — sin cadenas `/en/foo` hard-coded repartidas en componentes

**Template** — sustituye códigos de locale y `prefixDefaultLocale` por la decisión de tu equipo en Entrega 1; documenta la elección en `decisions.md`:

```js
// astro.config.mjs — Excerpt
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false, // es en /, en en /en/ — o true para /es/ + /en/
    },
  },
});
```

**Excerpt** — enlace consciente del locale en un layout (ajusta rutas de import):

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n';

const esHome = getRelativeLocaleUrl('es', '/');
const enHome = getRelativeLocaleUrl('en', '/');
---

<nav aria-label="Idioma">
  <a href={esHome} hreflang="es">ES</a>
  <a href={enHome} hreflang="en">EN</a>
</nav>
```

Organiza páginas bajo `src/pages/` siguiendo la [estructura de carpetas de la guía i18n de Astro](https://docs.astro.build/es/guides/internationalization/#create-localized-pages) según tu `prefixDefaultLocale`. Ejecuta `npm run build` e inspecciona `dist/` — ambas URLs de entrada de locale deben existir antes de Entrega 1.

> **No cuenta para Entrega 1:** un sitio Astro monolingüe con diccionario en cliente y sin rutas con prefijo de locale.

---

## 🌐 Integración multi-framework

La arquitectura de islas de Astro facilita mezclar frameworks:

### Configurar varios frameworks

```bash
npx astro add react vue svelte
```

### Usar frameworks juntos

```astro
---
import ReactCounter from '../components/ReactCounter.jsx';
import VueChart from '../components/VueChart.vue';
import SvelteMap from '../components/SvelteMap.svelte';
---

<h1>Multi-Framework Dashboard</h1>

<div class="dashboard-grid">
  <ReactCounter client:load />
  <VueChart client:visible />
  <SvelteMap client:idle />
</div>
```

**Beneficios:**
- **La herramienta adecuada** — React para estado complejo, Vue para reactividad simple, Svelte para rendimiento
- **Sin guerras de frameworks** — Equipos trabajan en su framework preferido dentro del mismo proyecto
- **Bundles aislados** — Cada framework carga solo su código, sin bundle monolítico

### Cuándo usar multi-framework

- **Equipos con perfiles mixtos** — Desarrolladores React poseen islas React, Vue poseen islas Vue
- **Migración legacy** — Migrar gradualmente componentes Vue antiguos a un proyecto Astro nuevo
- **Casos especializados** — Svelte para widgets críticos en rendimiento, React para gestión de estado compleja

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
│   Enfoque B: Composición primero (Astro)                  │
│   ┌──────────────────────────────────────────────┐     │
│   │ Router Astro                                 │     │
│   │   ├─ Isla React (widget interactivo)        │     │
│   │   ├─ Isla Vue (componente formulario)        │     │
│   │   └─ Isla Svelte (visualización mapa)        │     │
│   └──────────────────────────────────────────────┘     │
│   Routing, estilos y datos compartidos (ligero)        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

El enfoque composición-primero de Astro te da:
- **Routing compartido** — Una estructura de URL para todo el sitio
- **Estilos compartidos** — Tokens CSS y design system entre frameworks
- **Datos compartidos** — La carga en servidor alimenta todas las islas
- **Despliegues independientes** — Las islas pueden actualizarse sin redesplegar todo el sitio

### Objetivos de build

**Excerpt** — modo de salida del sitio en `astro.config.mjs` (los esquemas de collections siguen en `src/content.config.ts`):

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static', // SSG
  // output: 'server', // SSR — flags prerender por ruta (véase Unidad 2)
  adapter: vercel(), // con SSR: Vercel, Netlify, Cloudflare, etc.
});
```

**Elige según:**
- **Estático** — Sitios de contenido, blogs, documentación (más rápido, más barato)
- **Servidor** — Contenido dinámico, páginas por usuario (más complejo; usa `export const prerender = false` en rutas dinámicas)
- **Mixto** — `output: 'server'` con flags `prerender` por ruta (sustituye al legacy `output: 'hybrid'`)

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
