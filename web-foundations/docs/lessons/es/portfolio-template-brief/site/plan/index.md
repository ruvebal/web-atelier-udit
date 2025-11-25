---
layout: methodology
title: 'Plan de desarrollo: Showcase del brief de plantilla de portfolio'
title_alt: 'Plan de desarrollo: Showcase del brief de plantilla de portfolio'
slug: portfolio-template-brief-showcase-plan
date: 2025-01-27
author: 'Auto (AI Agent)'
lang: es
permalink: /lessons/es/portfolio-template-brief/site/plan/
description: 'Plan de desarrollo para refactorizar la arquitectura CSS y construir una página showcase con diseño de nivel premios que demuestre las mejores prácticas de diseño web trabajadas en las lecciones.'
tags: [development-plan, css-architecture, showcase, web-design, teaching-innovation]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

> **Nota meta‑plan:**
> Este plan se ha generado siguiendo la metodología en dos fases descrita en el brief del reto. La Fase 1 (Planificación) se documenta aquí. La Fase 2 (Implementación) solo comenzará cuando este plan se revise y se apruebe. Porque, como el propio brief recuerda con cariño, el «código generado sin rumbo» es el enemigo de la arquitectura intencional. (Y sí, somos muy conscientes de la ironía de que este plan sea tan largo. Haz lo que decimos, no lo que hacemos.)

---

## Resumen ejecutivo: el reto

**La misión:** Transformar el brief de la plantilla de portfolio en una **página showcase** que demuestre diseño web digno de premios, y al mismo tiempo **refactorizar la arquitectura CSS** hacia un sistema modular tipo _barrel_ mantenible. No es solo una lección: es una **meta‑demostración** de los principios que enseñamos.

**Las restricciones:**

- Debe funcionar dentro del pipeline de markdown→HTML de Jekyll (la automatización es sagrada).
- Debe ser abordable con un solo prompt a un agente de IA (no estamos levantando una catedral barroca).
- Debe mantener el humor afilado y auto‑crítico que define el atelier.
- Debe integrar técnicas de las lecciones: parallax, glassmorphism, tipografía fluida, GSAP, Tailwind, diseño intrínseco.
- Debe permitir la opción de inlining de CSS y JS para optimización de rendimiento.

**La filosofía:** Estamos haciendo «investigación docente» (_teaching innovation_). Esta página debe ser a la vez **herramienta pedagógica** y **artefacto de investigación** — demostrando que practicamos lo que predicamos.

---

## Parte 1: Refactorización de la arquitectura CSS

### Estado actual

**Qué tenemos:**

- `site.css` (1000 líneas) — archivo monolítico con todo mezclado.
- `tailwind.css` (202 líneas) — directivas de Tailwind y componentes personalizados.
- `tailwind-processed.css` (3355 líneas) — salida de PostCSS (auto‑generado).
- Directorio `modules/` vacío — listo para modularizar.

**Qué falla:**

- `site.css` viola el principio de responsabilidad única (variables, resets, layout, componentes, utilidades, estilos de impresión… todo junto).
- No hay separación clara de responsabilidades.
- Es difícil de mantener y extender.
- Es muy probable que haya estilos sin uso (no se ha hecho auditoría).
- No existe patrón tipo _barrel/index_ para centralizar imports.

**Qué necesitamos:**

Una arquitectura CSS modular siguiendo el patrón ejemplificado en el barrel del ejemplo:

```text
assets/css/
├── index.css              # Barrel: centraliza todos los imports
├── base/
│   ├── reset.css          # Resets/normalize
│   ├── variables.css      # Custom properties (design tokens)
│   └── typography.css     # Sistema tipográfico base
├── layout/
│   ├── containers.css     # Contenedores, max-widths
│   ├── grid.css           # Layouts grid (home, lecciones)
│   └── flexbox.css        # Utilidades flex
├── components/
│   ├── navigation.css     # Header, footer, nav
│   ├── cards.css          # Cards de lecciones, recursos
│   ├── buttons.css        # Botones
│   ├── code-blocks.css    # Bloques de código y botón de copia
│   ├── tables.css         # Tablas
│   └── forms.css          # Formularios (si los hay)
├── utilities/
│   ├── accessibility.css  # Skip‑links, focus, sr-only
│   ├── animations.css     # Transiciones y keyframes
│   └── print.css          # Estilos de impresión
└── theme/
    └── dark-mode.css      # Overrides para modo oscuro
```

### Estrategia de refactorización

**Paso 1: Auditoría y limpieza**

- Usar DevTools (Coverage) para detectar reglas CSS no usadas.
- Eliminar estilos que no se referencian en ningún layout o include.
- Documentar qué se elimina y por qué (transparencia).

**Paso 2: Modularizar `site.css`**

Dividir el monolito de 1000 líneas en módulos lógicos:

1. **Variables** (líneas 2–105) → `base/variables.css`
   - Todas las custom properties en `:root`.
   - Variables de dark mode.
   - Tokens de escala tipográfica.

2. **Reset y base** (líneas 129–146) → `base/reset.css`
   - `box-sizing`, `text-size-adjust`.
   - Defaults de `body`, stack tipográfico de sistema.

3. **Layout** (líneas 162–177, 430–434, etc.) → `layout/containers.css`, `layout/grid.css`
   - `.container`, `.site-header`, `.site-footer`.
   - Sistemas grid (`.lessons-grid`, `.methodology-grid`, etc.).

4. **Tipografía** (líneas 200–285, 674–687) → `base/typography.css`
   - Estilos `.prose`.
   - Jerarquía de headings.
   - Estilos de bloques de código.

5. **Componentes** (líneas 288–641) → `components/*.css`
   - Navegación, cards, botones, recursos.
   - Hero, _sidebar_ de información, etc.

6. **Utilidades** (líneas 644–1000) → `utilities/*.css`
   - Helpers de accesibilidad.
   - Estilos de impresión.
   - Breakpoints responsive.

**Paso 3: Crear el archivo barrel**

Crear `index.css` que importe todos los módulos en el orden correcto:

```css
/* =============================================================================
   WEB ATELIER (UDIT) – Arquitectura CSS
   Barrel: centraliza todos los imports
   ============================================================================= */

/* 1. Capa base: fundamentos */
@import url('./base/reset.css');
@import url('./base/variables.css');
@import url('./base/typography.css');

/* 2. Capa de layout: estructura */
@import url('./layout/containers.css');
@import url('./layout/grid.css');
@import url('./layout/flexbox.css');

/* 3. Capa de componentes: UI */
@import url('./components/navigation.css');
@import url('./components/cards.css');
@import url('./components/buttons.css');
@import url('./components/code-blocks.css');
@import url('./components/tables.css');

/* 4. Capa de utilidades: helpers */
@import url('./utilities/accessibility.css');
@import url('./utilities/animations.css');
@import url('./utilities/print.css');

/* 5. Capa de tema: theming */
@import url('./theme/dark-mode.css');
```

**Paso 4: Actualizar el include de `<head>` de Jekyll**

Modificar `_includes/head.html` para cargar el barrel en lugar de `site.css`:

```liquid
<link rel="stylesheet" href="{{ '/assets/css/tailwind-processed.css' | relative_url }}" />
<link rel="stylesheet" href="{{ '/assets/css/index.css' | relative_url }}" />
```

**Paso 5: Verificación y pruebas**

- Ejecutar build de Jekyll: `npm run build`.
- Comprobar que todas las páginas se renderizan correctamente.
- Revisar DevTools en busca de estilos que falten.
- Verificar que el toggle de dark mode sigue funcionando.
- Probar estilos de impresión.

---

## Parte 2: Arquitectura de la página showcase

### La visión: diseño de nivel premios en Markdown

**El reto:** Necesitamos una página showcase que demuestre:

- Parallax scrolling (según la lección de tendencias de diseño).
- Efectos de glassmorphism.
- Tipografía fluida con `clamp()`.
- Animaciones con GSAP ScrollTrigger (opcional).
- Diseño intrínseco responsive.
- Toggle de modo oscuro.
- Animaciones suaves ligadas al scroll.
- Jerarquía visual profesional.

**La restricción:** Debe escribirse en **Markdown** (para mantener la automatización de Jekyll), no como HTML artesanal. Eso implica:

1. Usar Liquid/Jekyll para inyectar HTML personalizado donde haga falta.
2. Aprovechar clases CSS aplicables desde Markdown (por ejemplo, clases Kramdown).
3. Crear un layout o includes específicos para componentes de showcase.
4. Usar bloques HTML dentro del Markdown cuando sea necesario (`parse_block_html: true` está activado).

### Estructura de la página showcase

**Archivo:** `web-foundations/docs/lessons/es/portfolio-template-brief/site/index.md`

**Front matter:**

```yaml
---
layout: showcase  # Layout personalizado para esta página
title: 'Brief de Plantilla de Portfolio: Showcase de Diseño Web Moderno'
title_alt: 'Brief de Plantilla de Portfolio: Showcase de Diseño Web Moderno'
slug: portfolio-template-brief-showcase
date: 2025-01-27
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/portfolio-template-brief/site/
description: 'Página showcase con diseño de nivel premios que demuestra parallax, glassmorphism, tipografía fluida y otras técnicas modernas del currículo del curso.'
tags: [showcase, web-design, parallax, glassmorphism, teaching-innovation]
showcase: true  # Flag para estilos específicos
---
```

**Secciones de la página (Markdown + HTML estratégico):**

1. **Hero con parallax**
   - Titular en tipografía fluida de gran tamaño.
   - Efecto parallax de fondo (CSS `animation-timeline: scroll()` o GSAP).
   - Card glassmorphism con resumen del proyecto.
   - Indicador de scroll suave.

2. **Grid de principios de diseño**
   - CSS Grid con `auto-fit` y `minmax()` (diseño intrínseco).
   - Cards que representan: Responsive, Animaciones, Tipografía, Accesibilidad.
   - Hover con efecto glassmorphism.
   - Cada card enlaza a la lección correspondiente.

3. **Línea temporal/proceso interactivo**
   - Visualización de los 5 sprints del plan de desarrollo.
   - Reveals ligados al scroll (GSAP ScrollTrigger o `@scroll-timeline`).
   - Revelado progresivo de la información.

4. **Showcase de técnicas**
   - Demos embebidas (iframe o mini playgrounds).
   - Comparaciones lado a lado (antes/después, técnica A vs. B).
   - Ejemplos de código interactivos con botón de copia.

5. **Alineación con criterios de premios**
   - Sección que mapea decisiones de diseño con criterios de Awwwards/Webby.
   - Diseño visual, UX, creatividad, contenido, excelencia técnica.
   - Anotaciones auto‑críticas (qué mejoraríamos en la siguiente iteración).

6. **Footer con meta‑reflexión**
   - Sección «Cómo se ha construido esta página».
   - Enlaces al plan de desarrollo (este documento).
   - Créditos y notas metodológicas.

### Layout personalizado: `_layouts/showcase.html`

Crear un layout que:

- Extienda `default.html`, pero añada clases wrapper específicas.
- Incluya GSAP si se usa (animaciones avanzadas).
- Inyecte JS específico de showcase.
- Soporte inlining de CSS/JS vía plugin de Jekyll o script de build.

{% raw %}
```liquid
---
layout: default
---
{% assign showcase_css = '/assets/css/showcase.css' | relative_url %}
{% assign showcase_js = '/assets/js/showcase.js' | relative_url %}

{% if jekyll.environment == 'production' %}
  {% comment %} Inline CSS/JS para rendimiento {% endcomment %}
  <style>
    {% include_relative ../assets/css/showcase.css %}
  </style>
  <script>
    {% include_relative ../assets/js/showcase.js %}
  </script>
{% else %}
  <link rel="stylesheet" href="{{ showcase_css }}" />
  <script src="{{ showcase_js }}" defer></script>
{% endif %}

<article class="showcase-page">
  {{ content }}
</article>
```
{% endraw %}

### CSS específico de showcase: `assets/css/showcase.css`

Este archivo deberá mostrar:

- Parallax scrolling con CSS moderno (`animation-timeline: scroll()`).
- Glassmorphism con `backdrop-filter: blur()`.
- Tipografía fluida con `clamp()`.
- Animaciones suaves ligadas a scroll.
- Soporte de modo oscuro.
- Layouts responsive e intrínsecos.

**Técnicas clave a mostrar:**

```css
/* Hero con parallax */
.showcase-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.showcase-hero__background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  animation: parallax-scroll linear;
  animation-timeline: scroll();
  animation-range: 0% 100%;
}

@keyframes parallax-scroll {
  to {
    transform: translateY(-20%);
  }
}

/* Card glassmorphism */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Tipografía fluida */
.showcase-title {
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
  line-height: 1.2;
  font-weight: 800;
}

/* Reveal ligado a scroll */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(2rem);
  animation: reveal linear;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Parte 3: Proceso de build y estrategia de inlining

### Inlining de CSS/JS para rendimiento

**¿Por qué inlinar?**

- Reduce el número de peticiones HTTP (clave en el primer render).
- Elimina el CSS bloqueante de render para contenido above‑the‑fold.
- Mejora las puntuaciones de Lighthouse.
- Demuestra optimización de rendimiento (criterio de excelencia técnica).

**Opciones de implementación:**

**Opción A: Plugin de Jekyll (recomendada)**
*(Ejemplo conceptual — si se implementa, recuerda envolver el código en `{% raw %}` en los planes para que Jekyll no lo ejecute.)*

```ruby
# _plugins/inline_assets.rb
module Jekyll
  class InlineAssets < Liquid::Tag
    def initialize(tag_name, path, tokens)
      super
      @path = path.strip
    end

    def render(context)
      site = context.registers[:site]
      file_path = File.join(site.source, @path)
      if File.exist?(file_path)
        File.read(file_path)
      else
        Jekyll.logger.warn "InlineAssets: File not found: #{@path}"
        ""
      end
    end
  end
end

Liquid::Template.register_tag('inline_css', Jekyll::InlineAssets)
```

Uso en el layout (envuelto en `{% raw %}` para que en este documento se muestre como ejemplo y no se ejecute):

{% raw %}
```liquid
<style>
  {% inline_css assets/css/showcase.css %}
</style>
```
{% endraw %}

**Opción B: Script post‑build**

Crear un script en Node.js que:

1. Lea los HTML generados.
2. Busque `<link rel="stylesheet">` con atributo `data-inline`.
3. Incluya el contenido CSS inline en `<style>`.
4. Elimine la etiqueta `<link>`.
5. Escriba de nuevo el HTML modificado.

**Opción C: Inlining manual (fallback)**

Para compatibilidad con GitHub Pages si el plugin no se puede usar:

- Documentar un pequeño paso manual (copiar CSS crítico a `<style>` en la página showcase).
- Dejar el resto de CSS como archivo externo.

### Mejora de scripts de build

Actualizar `package.json` para incluir el paso de inlining:

```json
{
  "scripts": {
    "postcss:build": "postcss docs/assets/css/tailwind.css -o docs/assets/css/tailwind-processed.css",
    "css:modularize": "node scripts/modularize-css.mjs",
    "inline:assets": "node scripts/inline-assets.mjs",
    "build": "npm run postcss:build && npm run css:modularize && bundle exec jekyll build --source docs --destination _site --config _config.yml && npm run inline:assets"
  }
}
```

---

## Parte 4: Prompt para el agente de IA

### Prompt completo para la implementación

**Agente objetivo:** Claude 4.5 (ver razonamiento más abajo)

**Prompt (en inglés, para maximizar compatibilidad con la herramienta):**

```text
You are a creative technologist working on a teaching innovation project (investigación docente) for a web development course. Your task is to refactor a CSS architecture and build an award-winning showcase page that demonstrates modern web design techniques.

CONTEXT:
- This is a Jekyll static site (Ruby-based, markdown-to-HTML)
- Current CSS is monolithic (1000 lines in site.css)
- We need modular, barrel-pattern CSS architecture
- The showcase page must be authored in Markdown (for automation)
- Must demonstrate: parallax, glassmorphism, fluid typography, GSAP (optional), intrinsic design
- Must support CSS/JS inlining for performance
- Maintain sharp, self-critical humor in content

TASK 1: CSS ARCHITECTURE REFACTORING
1. Audit site.css (1000 lines) and identify unused styles
2. Break down into modules:
   - base/ (reset, variables, typography)
   - layout/ (containers, grid, flexbox)
   - components/ (navigation, cards, buttons, code-blocks, tables)
   - utilities/ (accessibility, animations, print)
   - theme/ (dark-mode)
3. Create index.css barrel file importing all modules in correct order
4. Update _includes/head.html to load index.css instead of site.css
5. Verify no visual regressions

TASK 2: SHOWCASE PAGE CREATION
1. Create docs/lessons/en/portfolio-template-brief/site/index.md with:
   - Hero section with parallax (CSS scroll-driven animations)
   - Design principles grid (intrinsic CSS Grid)
   - Interactive timeline (scroll-triggered reveals)
   - Technique showcases with live demos
   - Award criteria alignment section
   - Meta-reflection footer
2. Create _layouts/showcase.html extending default.html
3. Create assets/css/showcase.css demonstrating:
   - Parallax with animation-timeline: scroll()
   - Glassmorphism with backdrop-filter
   - Fluid typography with clamp()
   - Scroll-driven reveals
   - Dark mode support
4. Ensure all techniques are responsive and accessible (prefers-reduced-motion)

TASK 3: BUILD PROCESS
1. Create scripts/modularize-css.mjs to automate CSS splitting (optional helper)
2. Document inlining strategy (Jekyll plugin or post-build script)
3. Update package.json build scripts if needed

CONSTRAINTS:
- Must work with Jekyll's markdown pipeline (use HTML blocks where needed)
- Maintain existing functionality (dark mode, navigation, etc.)
- Follow existing code style and naming conventions
- Test in both development and production builds
- Document any breaking changes

DELIVERABLES:
1. Modularized CSS files in assets/css/ structure
2. index.css barrel file
3. showcase/index.md with front matter and content
4. _layouts/showcase.html
5. assets/css/showcase.css
6. Updated _includes/head.html
7. Build script updates (if any)
8. Brief documentation of changes

TONE:
Maintain the sharp, self-critical humor evident in the existing codebase. This is teaching innovation research—be meta, be intentional, be excellent.
```

### ¿Por qué Claude 4.5 y no ChatGPT 5.1?

**Ventajas de Claude 4.5:**

1. **Mejor manejo de contexto largo:** Esta refactorización exige entender 1000+ líneas de CSS, varios layouts y toda la estructura de Jekyll. La ventana de contexto de Claude (≈200k tokens) permite sostener esa vista global con menos fricción.
2. **Organización de código más sistemática:** Claude tiende a proponer despieces modulares y jerarquías de ficheros más limpias, clave para pasar de un monolito a arquitectura por capas.
3. **Híbrido Markdown + HTML:** El requisito de «Markdown para automatizar, HTML donde haga falta» encaja bien con la capacidad de Claude para razonar sobre pipelines tipo Jekyll (incluyendo `parse_block_html: true` y cómo mezclar contenido).
4. **Tono auto‑crítico y académico:** Por entrenamiento y estilo, Claude suele manejar mejor el registro de «ensayo técnico con humor afilado», ideal para un documento que es a la vez guía docente y artefacto de investigación.
5. **Contexto pedagógico:** Claude suele producir explicaciones más didácticas al justificar decisiones, lo que encaja con la idea de que el código resultante se lea como material de aprendizaje.

**Cuándo podría interesar más ChatGPT 5.1:**

- Si quieres experimentar con **variaciones de diseño** muy creativas o varias alternativas visuales rápidas.
- Si buscas muchas iteraciones cortas sobre el mismo layout con enfoques más «artísticos».
- Si el foco se desplaza más hacia ideación visual que hacia arquitectura de código.

**Veredicto:** Para este encargo concreto (refactorización sistemática + showcase educativo bien documentado), **Claude 4.5 es mejor candidato**. Piensa en Claude como la persona arquitecta y en ChatGPT como la directora de arte que entra después a proponer locuras (controladas).

---

## Parte 5: Checklist de implementación

### Fase 1: Refactorización CSS (primero)

- [ ] Auditar `site.css` en busca de estilos no usados (Coverage de DevTools).
- [ ] Crear estructura de directorios: `assets/css/base/`, `layout/`, `components/`, `utilities/`, `theme/`.
- [ ] Dividir `site.css` en módulos (manteniendo trazabilidad de líneas para depurar).
- [ ] Crear `index.css` como archivo barrel con todos los imports.
- [ ] Actualizar `_includes/head.html` para cargar `index.css`.
- [ ] Probar build de Jekyll: `npm run build`.
- [ ] Hacer una revisión visual (capturas o revisión manual).
- [ ] Verificar que el toggle de dark mode sigue funcionando.
- [ ] Probar estilos de impresión.
- [ ] Commit con mensaje: `refactor(css): modularize site.css into barrel architecture`.

### Fase 2: Página showcase (después)

- [ ] Crear `docs/lessons/es/portfolio-template-brief/site/index.md`.
- [ ] Escribir el front matter con `layout: showcase`.
- [ ] Crear `_layouts/showcase.html` extendiendo `default.html`.
- [ ] Crear `assets/css/showcase.css` con parallax, glassmorphism y tipografía fluida.
- [ ] Redactar el contenido de showcase en Markdown (con bloques HTML donde convenga).
- [ ] Añadir GSAP ScrollTrigger si se usa GSAP (opcional).
- [ ] Probar comportamiento responsive (320px, 768px, 1024px, 1920px).
- [ ] Probar accesibilidad (teclado, lector de pantalla, `prefers-reduced-motion`).
- [ ] Verificar soporte de modo oscuro.
- [ ] Probar rendimiento del scroll (objetivo 60fps).
- [ ] Commit con mensaje: `feat(showcase): add award-winning design demonstration page`.

### Fase 3: Proceso de build (a continuación)

- [ ] Crear helper `scripts/modularize-css.mjs` (opcional).
- [ ] Implementar estrategia de inlining de CSS (plugin de Jekyll o script post‑build).
- [ ] Actualizar scripts de `package.json`.
- [ ] Probar build de producción con assets inlined.
- [ ] Verificar mejora en Lighthouse (Performance, Best Practices).
- [ ] Documentar el proceso de inlining en README o `DEVELOPMENT.md`.
- [ ] Commit con mensaje: `feat(build): add CSS/JS inlining for performance`.

### Fase 4: Documentación y meta‑reflexión

- [ ] Actualizar este plan con una sección «Qué se implementó finalmente».
- [ ] Añadir la página showcase a la navegación/índice del curso.
- [ ] Escribir una breve reflexión sobre el proceso (qué funcionó, qué no).
- [ ] Documentar cualquier desviación del plan y sus motivos.
- [ ] Crear una GitHub Release con notas de cambios.

---

## Parte 6: Riesgos y planes de contingencia

### Riesgo 1: regresiones visuales tras partir el CSS

**Mitigación:**

- Guardar el `site.css` original como `site.css.backup`.
- Comparar antes/después con DevTools o capturas.
- Probar en varias páginas (home, lecciones, metodología).
- Plan de rollback claro: volver temporalmente a `site.css` si algo crítico rompe.

### Riesgo 2: fallo en el build de Jekyll

**Mitigación:**

- Probar siempre el build en local antes de hacer push.
- Usar `bundle exec jekyll build --trace` para tener trazas detalladas.
- Revisar logs de Jekyll en busca de errores de Liquid.
- Verificar todas las rutas de `@import` en `index.css`.

### Riesgo 3: el inlining rompe GitHub Pages

**Mitigación:**

- Probar el proceso de inlining en local sobre `_site`.
- Si el plugin no funciona en GitHub Pages, recurrir a:
  - Script post‑build en CI que genere una rama `gh-pages` ya inlined, o
  - Inlining solo en la página showcase mediante un paso manual documentado.
- Documentar workaround en el README.

### Riesgo 4: la página showcase es demasiado compleja para Markdown

**Mitigación:**

- Usar bloques HTML dentro del Markdown (permitidos por Jekyll).
- Extraer piezas complejas a includes de Liquid reutilizables.
- Si hace falta, adoptar un enfoque híbrido: contenido en Markdown, _scaffolding_ estructural en HTML.

### Riesgo 5: las animaciones degradan el rendimiento

**Mitigación:**

- Probar en dispositivos modestos (throttling de CPU en DevTools).
- Usar `transform` y `opacity` para animar siempre que se pueda.
- Usar `will-change` solo en elementos realmente necesarios.
- Implementar `prefers-reduced-motion` de forma exhaustiva.
- Medir rendimiento antes/después con Lighthouse.

---

## Parte 7: Criterios de éxito

### Excelencia técnica

- [ ] Arquitectura CSS modular y mantenible (patrón barrel).
- [ ] Sin regresiones visuales críticas (las diferencias se documentan).
- [ ] Proceso de build funcional en desarrollo y producción.
- [ ] Performance en Lighthouse ≥ 90.
- [ ] Sin errores de consola en la versión desplegada.
- [ ] Toggle de modo oscuro funcional.
- [ ] Estilos de impresión correctos.

### Excelencia en diseño

- [ ] La página showcase demuestra al menos 4 técnicas de las lecciones.
- [ ] El parallax es suave (objetivo 60fps).
- [ ] Los efectos de glassmorphism son legibles y no recargan.
- [ ] La tipografía fluida escala bien en todos los breakpoints.
- [ ] El diseño responsive funciona de móvil (320px) a escritorio grande (1920px).
- [ ] La jerarquía visual es clara e intencional.

### Valor educativo

- [ ] La página showcase se puede leer como material didáctico.
- [ ] El código está comentado explicando el «por qué», no solo el «qué».
- [ ] Hay una sección de meta‑reflexión sobre decisiones de diseño.
- [ ] Hay enlaces claros a las lecciones relevantes.
- [ ] La alineación con criterios de premios está explicitada.

### Excelencia en el proceso

- [ ] El plan se ha seguido (y las desviaciones se describen).
- [ ] Los commits son significativos y bien titulados.
- [ ] La documentación está actualizada.
- [ ] Este plan refleja lo que realmente se construyó.

---

## Parte 8: Meta‑reflexión (para rellenar tras la implementación)

### Qué ha funcionado bien

_[Por completar tras la implementación]_

### Qué no ha funcionado

_[Por completar tras la implementación]_

### Qué hemos aprendido

_[Por completar tras la implementación]_

### Qué haríamos diferente en la siguiente iteración

_[Por completar tras la implementación]_

### Notas finales

_[Por completar tras la implementación]_

---

## Conclusión: el plan como documento vivo

Este plan es deliberadamente detallado (algún alma cínica diría «verborreico») porque:

1. La **investigación docente** exige documentar **el proceso**, no solo el resultado.
2. La colaboración con **agentes de IA** mejora cuando las instrucciones son explícitas.
3. Las **iteraciones futuras** necesitan un registro claro de decisiones y razonamientos.
4. El **aprendizaje del estudiantado** mejora cuando puede ver «las tripas» del desarrollo profesional.

El plan debería actualizarse a medida que avanza la implementación. Las desviaciones son esperables —y bienvenidas— siempre que se documenten y se justifiquen. Los mejores planes no son los que se cumplen al milímetro, sino los que se adaptan a la realidad sin perder de vista sus objetivos.

**Siguiente paso:** Revisar este plan, aprobarlo (o proponer ajustes) y, después, pasar a la Fase 2: Implementación usando el prompt para el agente de IA descrito más arriba.

---

## Preguntas, dudas y saneamiento de conciencia

Si algo de este plan es poco claro, ambiguo o directamente poco realista para el contexto de la asignatura, mejor levantar la mano **antes** de ponerse a picar código. Es preferible ajustar el plan que descubrir a mitad de sprint que nos hemos montado «un micro‑Figma dentro de Jekyll».
Todas hemos estado a las 3 de la mañana peleándonos con un `display: grid` que funcionaba ayer. Evitemos repetir la experiencia.

---

**Generado por:** Auto (AI Agent)
**Fecha:** 2025-01-27
**Metodología:** Enfoque en dos fases (Planificación → Implementación)
**Estado:** Fase 1 completada — A la espera de aprobación para la Fase 2


