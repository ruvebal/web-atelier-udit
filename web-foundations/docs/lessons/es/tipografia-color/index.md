---
layout: lesson
title: Tipografía y sistemas de color
title_alt: Typography & Color
slug: tipografia-color
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tipografia-color/
description: 'Tipografía fluida con clamp(), custom properties CSS, paletas accesibles y verificación de contraste.'
tags: [css, typography, color, accessibility, design-tokens, clamp]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El estilo visual es un sistema de comunicación con acceso y jerarquía.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** escala tipográfica, contraste, ritmo legible y tokens con significado. **Señal de frontera:** tipografía fluida, espacios de color amplios y temas según preferencia son capas volátiles.</p>
</aside>

> **Prueba de estudio:** Construye un sistema pequeño de tokens y justifica decisiones de contraste y jerarquía.

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
| Landing semántico de Sesión 3 commiteado | Sí |
| `assets/css/index.css` enlazado desde `index.html` | Sí |
| DevTools (estilos computados + comprobador de contraste) | Sí |

**Tiempo oficial:** 2 h de clase + 1 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Definir tokens de tipo y color en `:root` | Design tokens en CSS |
| 2 | Aplicar titulares fluidos con `clamp()` | Tipografía fluida |
| 3 | Fijar ritmo del cuerpo (`line-height`, `max-width`) | Ritmo legible |
| 4 | Comprobar contraste (4.5:1 cuerpo, 3:1 texto grande) | Color accesible |
| 5 | Commit + nota ATELIER sobre un trade-off | Entrega |

---

## Comprueba antes de salir

- [ ] Los titulares escalan suavemente de móvil a escritorio (sin saltos bruscos)
- [ ] El texto de cuerpo cumple contraste **WCAG AA** sobre el fondo
- [ ] El color de enlaces se distingue del cuerpo **y** cumple contraste
- [ ] Tokens referenciados con `var(--…)` — sin hex mágicos repetidos en reglas
- [ ] Commit subido; Pages sigue cargando

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Texto minúsculo en móvil, enorme en desktop | min/max de `clamp()` invertidos | Patrón: `clamp(mín, preferido, máx)` |
| Gris sobre gris ilegible | `--text-muted` demasiado cerca de `--surface` | Revisar contraste; oscurecer texto o aclarar fondo |
| Tokens ignorados | Typo en nombre de `var()` | Coincidir exactamente con declaración en `:root` |
| Titulares más gruesos pero mismo tamaño | Solo cambió `font-weight` | Ajustar escala `--text-*` |
| Tamaños `rem` incorrectos | `font-size` raíz sin fijar | `html { font-size: 100%; }` o `%` explícito |

---

## Entrega (evidencia Sesión 4)

- URL del repo + commit con tokens tipografía/color
- Un comentario ATELIER: qué elección de contraste o jerarquía hiciste y por qué
- Opcional: captura de auditoría de contraste en DevTools

---

## Convenciones de código en esta sesión

- **Template** — bloque de tokens `:root`: sustituye familia tipográfica y valores hex por tu marca.
- **Excerpt** — CSS parcial; asume estructura del landing de Sesión 3.

---

## 🎯 Objetivos de aprendizaje

- Definir una **escala tipográfica** con custom properties CSS
- Usar **`clamp()`** para titulares fluidos sin proliferación de media queries
- Construir una **paleta semántica** (surface, content, accent, muted)
- Verificar **contraste WCAG AA** en cuerpo e interactivos
- Documentar una decisión de estilo al estilo reflexión ATELIER

---

## Design tokens en CSS

**Template** — añade al inicio de `assets/css/index.css`:

```css
:root {
  /* Tipografía */
  --font-sans: system-ui, sans-serif;
  --font-display: Georgia, 'Times New Roman', serif;

  --text-sm: clamp(0.875rem, 0.8rem + 0.25vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.35vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1vw, 2rem);
  --text-2xl: clamp(1.875rem, 1.4rem + 1.5vw, 2.5rem);

  /* Color — nombres semánticos, no «azul» literal */
  --surface: #f8fafc;
  --surface-elevated: #ffffff;
  --content: #0f172a;
  --content-muted: #475569;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --focus-ring: #f59e0b;
}
```

Los nombres semánticos sobreviven a cambios de paleta; los nombres literales de color, no.

---

## Tipografía fluida

Aplica tokens a tu landing de Sesión 3:

```css
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--content);
  background: var(--surface);
  max-width: 65ch;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: 1.2;
}

h2 {
  font-size: var(--text-xl);
}

h3 {
  font-size: var(--text-lg);
}

p,
li {
  font-size: var(--text-base);
}
```

---

## Ritmo legible

- **Measure:** `max-width: 65ch` en body o columna principal mantiene líneas cómodas.
- **Interlineado:** 1.5–1.7 en cuerpo; más tight en display grande.
- **Espaciado:** márgenes consistentes entre secciones (refina los de Sesión 3 con tokens si hace falta).

---

## Color accesible

```css
a {
  color: var(--accent);
}

a:hover {
  color: var(--accent-hover);
}

a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}
```

**Comprueba contraste** con DevTools → inspeccionar texto → panel Accesibilidad, o [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

Mínimos (WCAG AA):
- Texto normal: **4.5:1**
- Texto grande (≥ 18pt / 14pt bold): **3:1**

---

## 🎯 Ejercicio práctico

**Tiempo:** 1 hora

1. Sustituye tamaños ad hoc de Sesión 3 por la escala de tokens (personaliza valores).
2. Introduce al menos **cuatro colores semánticos** en `:root` y úsalos en todo el CSS.
3. Corrige cualquier fallo de contraste que reporte el checker.
4. Añade comentario reflexión ATELIER en `index.html` o CSS sobre una decisión de jerarquía.

**Entregable:** landing estilizado con tipo y color tokenizados + commit.

---

## 📚 Lecturas recomendadas

- [MDN: custom properties](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [MDN: clamp()](https://developer.mozilla.org/es/docs/Web/CSS/clamp)
- [WCAG contraste (Understanding 1.4.3)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

## ✅ Resultado de la sesión

Al final de esta sesión deberías:

- Leer y escribir una capa pequeña de tokens en `:root`
- Aplicar tipo fluido sin hacks solo de breakpoints
- Justificar elecciones de color con evidencia de contraste
- Mantener HTML semántico — el estilo vive en tokens CSS, no en estilos inline

---

{% comment %}
outcome-graphic-selection:
  source-section: "✅ Resultado de la sesión"
  visual-grammar: "contrast-and-hierarchy-system — a visual token field balancing contrast, hierarchy, scale, and accessible rhythm"
{% endcomment %}
{% include lesson-outcome-graphic.html %}
