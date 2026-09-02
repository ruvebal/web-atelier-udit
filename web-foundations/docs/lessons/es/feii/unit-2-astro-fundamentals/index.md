---
layout: lesson
title: 'Unidad 2: Astro meta-framework — Arquitectura de islas y SSR'
title_alt: 'Unit 2: Astro Meta-Framework — Islands Architecture & SSR'
slug: feii-unit-2-astro-fundamentals
date: 2026-08-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/feii/unit-2-astro-fundamentals/
description: 'Fundamentos del meta-framework Astro: arquitectura de islas, renderizado en servidor, generación estática e integración multi-framework.'
tags:
  [
    feii,
    astro,
    meta-framework,
    ssr,
    islands-architecture,
    multi-framework,
  ]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> La <strong>hidratación</strong> no es magia del framework: es un <strong>modelo de coste</strong> (red, CPU, memoria, batería). Tras recibir HTML del servidor, el cliente descarga JavaScript, reconstruye el componente en memoria y <strong>engancha</strong> los manejadores de eventos (clic, teclado, formularios) al DOM real. Astro trata ese coste como opcional: por defecto <strong>0&nbsp;KB de JS en cliente</strong>; solo pagas hidratación donde marcas una isla con <code>client:*</code>.</p>
<p><strong>Lente de campo:</strong></p>
<ul>
<li><strong>Ancla de práctica:</strong> combinar <abbr title="Static Site Generation — generación estática">SSG</abbr>/<abbr title="Server-Side Rendering — renderizado en servidor">SSR</abbr> con hidratación selectiva obliga decisiones de entrega explícitas (qué es HTML puro y qué es isla).</li>
<li><strong>Señal de frontera:</strong> la <em>resumability</em> (reanudabilidad; p. ej. Qwik) y el render en edge cuestionan el default de hidratar “toda la app” de las <abbr title="Single Page Application — aplicación de una sola página">SPA</abbr> tradicionales.</li>
<li><strong>Estado pedagógico:</strong> no hay comparación directa en <abbr title="Higher Education — educación superior">HE</abbr> de secuencias docentes Astro/islands; esta unidad es un piloto informado por transferencia, no un hallazgo causal.</li>
</ul>
</aside>

> **Prueba de estudio:** Compara una región estática (0&nbsp;KB JS), una isla hidratada y el coste que transfieres al cliente (bundle + CPU de hidratación).

### Siglas en esta unidad

| Sigla | Significado | Primera aparición |
| --- | --- | --- |
| **SPA** | *Single Page Application* — aplicación de una sola página; todo el UI suele hidratar junto | § ¿Por qué Astro? |
| **SSR** | *Server-Side Rendering* — HTML generado en el servidor por petición | § Estrategias de renderizado |
| **SSG** | *Static Site Generation* — HTML generado en build | § Estrategias de renderizado |
| **CSR** | *Client-Side Rendering* — UI montada solo en el navegador con JavaScript | § Hidratación |
| **SEO** | *Search Engine Optimization* — visibilidad en buscadores | § ¿Por qué Astro? |
| **TTI** | *Time to Interactive* — tiempo hasta que la página responde a interacción | § Hidratación |
| **MCP** | *Model Context Protocol* — protocolo para conectar documentación viva al IDE | § IA y MCP |
| **CI** | *Continuous Integration* — integración continua (p. ej. GitHub Actions) | Comprueba antes de salir |
| **PR** | *Pull Request* — solicitud de revisión/merge en Git | Sigue este camino |

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
| Ejercicios Unidad 1 entregados | Sí |
| Node.js LTS + npm | Sí |
| Astro Docs MCP configurado (véase § IA y MCP — *Model Context Protocol*) | Muy recomendado |
| Repo de equipo / issue backlog Entrega 1 | Para lab B2 |

**Tiempo oficial:** 3 h magistral + 2 h lab (equipo) + 2 h resolución de ejercicios (individual, B3).

---

## Sigue este camino

| Fase | Quién | Acción | Sección |
| --- | --- | --- | --- |
| 1 | Individual | Conectar Astro Docs MCP; una pregunta API versionada | IA y MCP |
| 2 | Individual | Scaffold `feii-astro-demo`; landing estática | Configuración del proyecto Astro |
| 3 | Individual | Añadir isla React + elegir `client:*` con justificación de una línea | Integración de islas React |
| 4 | Equipo | Issue real Entrega 1; PR con isla + CI (*Continuous Integration*) verde | B2 · Lab |
| 5 | Individual | Completar ejercicios B3 sin IA en el ítem 3 | B3 · Ejercicios |

---

## Comprueba antes de salir

- [ ] Puedes explicar en una frase qué hace la hidratación (HTML visible → JS → listeners en el DOM real)
- [ ] El HTML estático se ve con JS desactivado (casi toda la página)
- [ ] La isla hidrata; DevTools muestra bundle separado
- [ ] Respuesta MCP verificada contra https://docs.astro.build
- [ ] El PR documenta la elección `client:*` y métrica antes/después (Lighthouse o tamaño de bundle)
- [ ] Fila de log aceptar/rechazar IA si usaste asistencia (disciplina prospectiva Unidad 6)

---

## Fallos frecuentes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Toda la página hidrata como SPA | Falta límite de isla / integración incorrecta | Patrón `.astro` + `client:load` |
| `client:load` en todas partes | Default sin análisis de coste | Tabla de decisión ejercicio B3.2 |
| MCP devuelve API obsoleta | Servidor incorrecto o sin verificación | Contrastar con proyecto en ejecución |
| Lab de equipo bloqueado | Sin issue en backlog | Usar issue semilla del profesor |

---

## Entrega (evidencia Unidad 2)

- **Individual:** respuestas de ejercicios + URL del demo Astro o ruta del repo
- **Equipo:** enlace al issue, enlace al PR, nota de release con efecto medido (definición de hecho B2)

---

> _"Astro no es solo otro framework. Es un paradigma distinto para componer interfaces."_

> **Declaración de asistencia IA:** Esta unidad integra desarrollo asistido por IA siguiendo la metodología docs-first. Planes, prompts e informes de implementación se documentan durante todo el proceso.

---

## Convenciones de código en esta unidad

Mismo vocabulario que las lecciones React de Front-End I y la Unidad 5 de FE II — comprueba la etiqueta antes de pegar:

- **CodeSandbox-ready** — archivo completo; copiar-pegar; funciona con el scaffold del sandbox.
- **Excerpt** — patrón parcial, ilustrativo. **No** ejecuta tal cual.
- **Template** — copiar y sustituir valores marcados antes de usar.

La mayoría de bloques abajo son **Excerpt**: asumen un proyecto Astro scaffolded. El bloque CLI es un comando shell ejecutable, no código de app.

---

## 🎯 Objetivos de aprendizaje

Al final de esta unidad podrás:

- **Comprender la hidratación como modelo de coste** — red, CPU, TTI; emparejar event listeners al DOM real solo donde hace falta
- **Comprender la filosofía central de Astro** — content-first, cero JS por defecto y patrón islands architecture
- **Configurar un proyecto Astro** — scaffolding CLI, estructura y configuración
- **Implementar islands architecture** — hidratar componentes concretos con React/Vue/Svelte manteniendo el resto estático
- **Elegir estrategias de renderizado** — SSG frente a SSR frente a mixto estático/dinámico (`prerender` por ruta)
- **Integrar varios frameworks** — componentes React dentro de Astro, entendiendo el límite servidor/cliente

---

## 📖 ¿Por qué Astro? El segundo paradigma

En FE I aprendiste React como paradigma único para interfaces — una **SPA** (*Single Page Application*: una sola página donde casi todo el UI se monta e hidrata en cliente). Astro te da un **segundo paradigma** — especialmente potente en sitios content-heavy y micro-frontends.

### Filosofía content-first

Astro parte de una premisa distinta a la mayoría de frameworks SPA:

- **La mayoría:** todo es componente, todo es JavaScript en cliente
- **Astro:** todo es HTML/CSS por defecto; JavaScript solo donde hace falta

Por qué importa:

- **Rendimiento:** páginas sin JS cargan al instante, sin penalización de hidratación (véase § Hidratación)
- **SEO** (*Search Engine Optimization*): HTML completo para buscadores, sin depender de **CSR** (*Client-Side Rendering*) para el contenido principal
- **Mejora progresiva:** el contenido funciona sin JS; la interacción lo refina

### Arquitectura de islas

La innovación clave es la **arquitectura de islas**:

```
┌─────────────────────────────────────────────────────────┐
│                   ARQUITECTURA DE ISLAS                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│   Océano estático (HTML renderizado en servidor)         │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│   │ Isla 1       │  │ Isla 2       │  │ Isla 3       │  │
│   │ (React)      │  │ (Vue)        │  │ (Svelte)     │  │
│   │ Interactiva  │  │ Interactiva  │  │ Interactiva  │  │
│   └─────────────┘  └─────────────┘  └─────────────┘  │
│                                                          │
│   Las islas hidratan de forma independiente → sin bundle monolítico │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Lo mejor de ambos mundos:
- **Océano estático** — rápido, SEO-friendly, cero JS en casi toda la página
- **Islas interactivas** — React/Vue/Svelte donde necesitas interactividad

Es fundamentalmente distinto de una SPA React donde toda la app hidrata a la vez.

---

## 💧 Hidratación: qué es y por qué es un coste

En FE I, React construyó una **SPA**: casi todo el UI vive en JavaScript en cliente. En Astro, la mayor parte de la página es **HTML estático** generado en build (<abbr title="Static Site Generation">SSG</abbr>) o en servidor (<abbr title="Server-Side Rendering">SSR</abbr>). La **hidratación** es el puente entre ese HTML ya visible y la interactividad.

### Definición operativa (sin jerga oculta)

**Hidratación (*hydration*):** el navegador ya recibió HTML pintado (título, párrafos, botones visibles). Entonces el framework:

1. **Descarga** el JavaScript del componente.
2. **Reconstruye** en memoria una copia lógica del UI (en React, el *DOM virtual* — una representación en JS, no el DOM del navegador).
3. **Empareja** (*attach*) los manejadores de eventos — `click`, `input`, `submit` — del DOM virtual al **DOM real** que el usuario ve.

> **Traducción pedagógica del paso 3:** el botón *se ve* desde el primer HTML, pero **no responde** hasta que la hidratación engancha su `onClick`. Por eso medimos **TTI** (*Time to Interactive*): tiempo hasta que la página deja de ser solo “cartel” y pasa a ser usable.

Documentación canónica: [Concepto de islas](https://docs.astro.build/es/concepts/islands/) · [Directivas `client:*`](https://docs.astro.build/es/reference/directives-reference/#directivas-client)

### Modelo de coste: SPA/SSR tradicional frente a islas

```
   SSR/SSG por defecto (0 KB JS en cliente)
                    │
    ┌───────────────┴───────────────┐
    ▼                               ▼
 Isla interactiva              (Unidad 3: estado compartido
 client:visible / load          entre islas — Nanostores, etc.)
    │
    └──────────────► Frontera avanzada (transferencia)
                     resumability (Qwik) · render en edge
```

| Fase | SPA / SSR “hidratación total” (p. ej. Next/Nuxt clásico) | Islas (Astro) |
| --- | --- | --- |
| **Red** | HTML + **todo** el JS de la app | HTML + **solo** JS de islas marcadas con `client:*` |
| **CPU** | Re-ejecutar componentes en cliente | Igual, pero **solo dentro del límite de la isla** |
| **CPU (hidratación)** | Emparejar listeners en **toda** la superficie | Emparejar listeners **solo** donde pediste interactividad |
| **Coste base Astro** | — | **0&nbsp;KB JS** en cliente por defecto ([filosofía Astro](https://docs.astro.build/es/concepts/why-astro/)) |

**Resultado medible:** menor *JavaScript execution time*, menor **TBT** (*Total Blocking Time* — tiempo que el hilo principal no puede responder) y mejor **TTI** en páginas content-heavy (blog, catálogo, documentación).

### Matriz de decisiones de entrega (Ancla de práctica)

Usa esta tabla en el ejercicio B3.2 y en tu PR de Entrega 1. Cada fila debe tener **una frase de justificación**, no solo la directiva.

| Componente | Caso de uso | Estrategia Astro | Coste JS |
| --- | --- | --- | --- |
| Header / nav | Menú responsive | `client:media="(max-width: 768px)"` | JS **solo** bajo la media query |
| Artículo / contenido | Lectura | SSG / SSR puro (`.astro` sin `client:*`) | **0&nbsp;KB** |
| Gráfico bajo el pliegue | Analytics al scroll | `client:visible` | **0&nbsp;KB** hasta entrar en viewport |
| Carrito / checkout | Estado crítico al cargar | `client:load` | Hidratación inmediata — pagas el coste a propósito |

Referencia oficial de directivas: [Referencia `client:*`](https://docs.astro.build/es/reference/directives-reference/#directivas-client)

### Señal de frontera (no confundir islas con “cero hidratación”)

- **Islas (Astro):** reduces **dónde** pagas hidratación; **dentro** de cada isla React/Vue/Svelte el mecanismo sigue siendo hidratación clásica. Véase [Arquitectura de islas](https://docs.astro.build/es/concepts/islands/).
- **Resumability / reanudabilidad (Qwik, algunos Server Components):** intenta **evitar** re-ejecutar todo el árbol en cliente; serializa estado en HTML y carga handlers bajo demanda. Es contraste conceptual para postgrado — **no** es requisito de Entrega 1.
- **Edge:** render más cerca del usuario reduce latencia de red; las islas siguen importando que el payload JS enviado desde el edge sea mínimo.

---

## 🏗️ Configuración del proyecto Astro

### Scaffolding CLI

```bash
npm create astro@latest feii-astro-demo
cd feii-astro-demo
npm run dev
```

Estructura típica:

```
src/
  pages/           # Routing por archivos (SSG por defecto)
  components/      # Componentes Astro (.astro)
  layouts/         # Layouts de página
  content/         # Archivos Markdown para collections (opcional hasta Unidad 3)
  content.config.ts  # Esquema de content collections (Unidad 3 — `astro:content` + `astro/zod`)
public/            # Assets estáticos
astro.config.mjs   # Config del sitio (no esquemas de collections)
```

### Componentes Astro (.astro)

HTML primero, JavaScript opcional:

```astro
---
// Lógica del componente (solo servidor)
const { title } = Astro.props;
---

<!-- Plantilla (HTML + CSS) -->
<h1>{title}</h1>
<p>Esto es HTML estático por defecto.</p>

<script>
  // Islas: las etiquetas <script> solo hidratan si usas un framework
  // Déjalo vacío para componentes estáticos
</script>
```

Separación explícita:
- **Frontmatter (---)** — lógica en servidor, nunca en el navegador
- **Plantilla** — HTML/CSS, siempre renderizado
- **Script** — islas que hidratan con React/Vue/Svelte

---

## 🚀 Integración de islas React

Astro facilita usar componentes React dentro del proyecto:

### Instalación

```bash
npx astro add react
```

Instala:
- renderer `@astrojs/react`
- React y ReactDOM
- plugin Vite React

### Uso de componentes React

```astro
---
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---

<h1>Integración Astro + React</h1>

<!-- Este componente React hidrata como isla -->
<InteractiveCounter client:load />

<p>El resto de esta página es HTML estático.</p>
```

La directiva `client:*` controla **cuándo** pagas el coste de hidratación de cada isla ([documentación oficial](https://docs.astro.build/es/reference/directives-reference/#directivas-client)):
- `client:load` — hidrata al cargar la página
- `client:idle` — hidrata cuando el navegador está idle
- `client:visible` — hidrata al entrar en viewport
- `client:media` — hidrata cuando coincide una media query

Este control granular es imposible en una SPA React pura.

---

## 🔄 Estrategias de renderizado

Astro admite varios modos:

### Generación estática (SSG — *Static Site Generation*)

Por defecto en la mayoría de páginas. HTML en build; no hace falta servidor en runtime.

**Excerpt** — solo config del sitio; los esquemas de collections van en `src/content.config.ts` (Unidad 3). Docs: [Modo estático](https://docs.astro.build/es/guides/on-demand-rendering/#modo-estático)

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static', // Default
});
```

**Ideal para:** marketing, blogs, documentación, landings

### Renderizado en servidor (SSR — *Server-Side Rendering*)

El servidor renderiza HTML en cada petición. Requiere *adapter*. Docs: [Renderizado bajo demanda](https://docs.astro.build/es/guides/on-demand-rendering/)

**Excerpt** — instala antes `@astrojs/node` (o adapter Vercel/Netlify/Cloudflare):

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

**Ideal para:** contenido dinámico, páginas por usuario, e-commerce

### Estático + dinámico mezclado (antes `output: 'hybrid'`)

Astro 5+ usa `output: 'server'` con flags `prerender` por ruta en lugar del modo `hybrid`:

```js
// astro.config.mjs — requiere adapter de servidor (véase excerpt SSR)
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

```astro
---
// src/pages/casi-estatica.astro — prerender en build
export const prerender = true;
---
```

```astro
---
// src/pages/dinamica.astro — render en cada petición
export const prerender = false;
---
```

**Ideal para:** sitios mayormente estáticos con secciones dinámicas

---

## 🎯 Ejercicio práctico

**Tiempo:** 2 horas

1. **Crear proyecto Astro** con el scaffolding CLI
2. **Landing estática** con:
   - Hero con título y CTA
   - Grid de features (3 ítems)
   - Footer con enlaces
3. **Añadir isla React**:
   - Componente contador simple
   - Integrarlo con `client:load`
   - Verificar hidratación independiente
4. **Comparar SPA vs Astro**:
   - Medir tiempo de carga inicial (Astro debería ser más rápido)
   - Comprobar contenido estático sin JS
   - Inspeccionar pestaña Network: bundles de islas separados

**Entregable:** URL del proyecto Astro + captura de hidratación de isla en DevTools

---

## 🤖 IA y MCP — Astro Docs en tu agente

Antes del scaffold, conecta **Astro Docs MCP** para que Cursor, Windsurf o Claude Desktop lean documentación viva — el mismo patrón de límite que en FE I ([visión general MCP]({{ '/lessons/en/react/ai-assisted-development-foundations/' | relative_url }}#model-context-protocol-mcp)).

| Recurso | URL |
| --- | --- |
| Endpoint MCP remoto | [https://mcp.docs.astro.build/mcp](https://mcp.docs.astro.build/mcp) |
| Construir con herramientas IA | [docs.astro.build — guía IA](https://docs.astro.build/en/guides/build-with-ai/) |
| Índice secuencia docente | [Secuencia docente Astro]({{ '/lessons/en/astro/' | relative_url }}) |

{% raw %}

```json
{
  "mcpServers": {
    "Astro Docs": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.docs.astro.build/mcp"]
    }
  }
}
```

{% endraw %}

**Comprobación de lab:** haz una pregunta versionada (p. ej. API de content collections) y confirma que la respuesta cita docs Astro actuales — luego verifica en el proyecto en ejecución.

---

## 📚 Lecturas recomendadas

Documentación canónica (español; enlaza a la versión en inglés desde el pie de cada página si hace falta):

- **Por qué Astro** — https://docs.astro.build/es/concepts/why-astro/
- **Conceptos core** — https://docs.astro.build/es/basics/astro-components/
- **Arquitectura de islas** — https://docs.astro.build/es/concepts/islands/
- **Directivas `client:*` (hidratación selectiva)** — https://docs.astro.build/es/reference/directives-reference/#directivas-client
- **Integración React** — https://docs.astro.build/es/guides/integrations-guide/react/
- **Modos de renderizado (SSG / SSR / `prerender`)** — https://docs.astro.build/es/guides/on-demand-rendering/
- **Construir con herramientas IA + MCP** — https://docs.astro.build/es/guides/build-with-ai/

---

## ✅ Resultado de la sesión

Al final de esta unidad deberías:

- Entender la hidratación como modelo de coste (red, CPU, TTI) y por qué las islas acotan ese coste
- Entender la filosofía content-first de Astro y cómo difiere de frameworks SPA
- Poder hacer scaffold y configurar un proyecto Astro
- Implementar islands architecture con componentes React
- Elegir estrategias de renderizado (SSG vs SSR vs mixto con `prerender` por ruta)
- Ver los beneficios de rendimiento de páginas con cero JS por defecto

Esta unidad prepara la unidad 3: patrones avanzados de arquitectura Astro e integración multi-framework.

---

> _"La mejor interfaz es la que no notas porque simplemente funciona. Astro te acerca a ese ideal."_

> _"Las dependencias fluyen hacia dentro como el agua busca el centro. Que nada en el centro conozca la forma de la orilla."_
> — Tao of Development, `arch-004`
{: .tao-development-quote }

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Resultado de la sesión"
  visual-grammar: "selective-hydration-islands — interactive islands activated selectively inside a mostly static content surface"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

## B1 · Lección magistral — 1 h

**Afirmación:** el límite de islas — no la elección de framework — es lo que cambia rendimiento y SEO de una página.

FE I entregó un paradigma SPA: React, hidratar todo el árbol y emparejar listeners en toda la superficie. Esta unidad añade un segundo: estático por defecto (0&nbsp;KB JS), hidratar solo las islas que marcas con `client:*`. La Unidad 3 profundiza en componer varios frameworks en ese límite; la Unidad 4 lleva el mismo instinto static-first a la resiliencia offline (**PWA** — *Progressive Web App*).

La arquitectura de islas se define, independiente del marketing de cualquier framework, como forma de «aplazar y potencialmente evitar el coste de cargar contenido» envolviendo porciones dinámicas mientras el resto permanece estático (Vepsäläinen 2025, 3).

**Guion del ponente:** véase `deck-outline.md`.

## B2 · Prácticas de laboratorio — 2 h · equipo

Elige un issue real del backlog Entrega 1 del equipo que necesite un elemento interactivo — filtro, contador, formulario — en una página por lo demás estática. No inventes un ejercicio greenfield.

Definición de hecho: el PR añade la isla con directiva `client:*` explícita y justificación de una línea (no solo `client:load` por defecto); CI verde; revisión humana de sugerencias IA (flujo Unidad 6, enseñado aquí de forma prospectiva); nota de release con cambio y efecto medido.

Roles rotativos: facilitador/a, implementador/a, verificador/a, narrador/a — nadie repite la misma capa en unidades consecutivas.

Evidencia a entregar: enlace al issue, rama, PR, delta bundle-size o Lighthouse antes/después, y fila de log aceptar/rechazar IA si hubo asistencia.

## B3 · Resolución de ejercicios — 2 h · individual

1. Un componente se monta con `client:load` pero su handler interactivo no dispara hasta que el usuario lo scrolla tres pantallas abajo. Nombra el coste desperdiciado y la directiva correcta.
2. Dadas cinco descripciones de componente (footer, caja de búsqueda en vivo, imagen hero, formulario de checkout, banner de cookies), asigna a cada una la directiva `client:*` correcta o «sin hidratación» y justifica en una frase.
3. **Diagnóstico sin IA (declarado):** sin asistencia IA, explica con tus palabras por qué el bundle JS de una isla está aislado del bundle del resto de la página, y qué rompería ese aislamiento.

Esquemas de respuesta del profesor: en copia docente, no en el handout público. Ejercicios descontextualizados del producto del equipo.

## Referencias

- Vepsäläinen, Juho. 2025. “The Potential of Serverless Edge-Powered Islands for Web Development.” *Journal of Web Engineering*. https://doi.org/10.13052/jwe1540-9589.2411.
- **Límite de evidencia restante:** esta unidad no establece que enseñar islands architecture como primer primitivo meta-framework produzca mejores resultados de aprendizaje que otra secuencia. El lab es un piloto informado por transferencia, no un hallazgo causal.
