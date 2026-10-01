---
layout: lesson
title: 'Diseño Web Intrínseco: Container Queries y Subgrid'
title_alt: 'Intrinsic Web Design: Container Queries & Subgrid'
slug: intrinsic-web-design
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/intrinsic-web-design/
week: 3
description: 'Layout responsivo sin media queries de viewport: grid fluido, @container y subgrid sobre tu galería portfolio.'
tags: [css, container-queries, subgrid, intrinsic-design, responsive]
status: complete
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El layout responsivo es consciente de relaciones, no de dispositivos.</p>
<p><strong>Lente de campo:</strong> <strong>Ancla de práctica:</strong> el diseño responsivo adapta contenido al espacio disponible. <strong>Señal de frontera:</strong> container queries y subgrid mueven la respuesta del viewport al contexto del componente.</p>
</aside>

> **Prueba de estudio:** Prueba el mismo componente dentro de tres anchos de contenedor padre.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 5** — container queries + subgrid sobre tu landing portfolio (base CSS Sesiones 3–4).

**No para:** librerías JS de layout ni frameworks grid — esta sesión es CSS nativo intrínseco.

**Al terminar:** galería (o grid de tarjetas) con grid fluido + `@container` y/o `subgrid`, probada en tres anchos de padre, más commit + reflexión crítica.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Landing Sesiones 3–4 con tokens CSS | Sí |
| Navegador moderno (Chrome/Edge/Firefox actual) | Sí |
| Flujo Git de Sesión 2 | Sí |

**Tiempo oficial:** 2 h de clase + 1 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Interiorizar el kit sin `@media` de layout | Por qué no enseñamos media queries aquí |
| 2 | Montar grid fluido `auto-fit` + `minmax` | Herramienta 1 |
| 3 | Marcar padre con `container-type` y reflujo interno con `@container` | Herramienta 2 |
| 4 | Alinear títulos/pies entre tarjetas con `subgrid` | Herramienta 3 |
| 5 | Probar el mismo componente en sidebar estrecho + main ancho | Demo / Prueba de estudio |
| 6 | Commit + reflexión crítica 3–5 frases | Commit y reflexión |

---

## Comprueba antes de salir

- [ ] El layout del componente cambia cuando cambia el ancho del **padre**, no solo del viewport
- [ ] La galería reflujo sin `@media (min-width: …)` de layout
- [ ] Foco de teclado visible en ítems interactivos
- [ ] Sin scroll horizontal a ~320px de ancho de contenedor
- [ ] Fallback `@supports` o degradación documentada
- [ ] Commit subido mencionando container queries / subgrid

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Container query no dispara | Falta `container-type` en ancestro | Fijarlo en el wrapper padre |
| Mismo comportamiento que media query | Usas `@media` en vez de `@container` | `@container (min-width: …)` |
| Líneas subgrid desalineadas | Padre no es grid o falta `span` | Padre `display: grid`; hijo `grid-row: span N` + `subgrid` |
| Galería rota en Safari antiguo | Feature sin fallback | `@supports`; simplificar layout |
| Sin commit | Olvidada reflexión | Completar Commit y reflexión |

---

## Entrega (evidencia Sesión 5)

- URL repo + commit `feat: responsive gallery · container queries…`
- Reflexión crítica 3–5 frases (Critical Coding for a Better Living)

---

## Convenciones de código en esta sesión

- **CodeSandbox-ready** — HTML+CSS completo; pégalo en un HTML estático, CodePen, o en tu `index.html` + CSS.
- **Excerpt** — fragmento que asume el demo o tu landing.
- **Template** — sustituye textos, colores y rutas de imagen por los tuyos.

Demo en vivo (misma página que el bloque completo de abajo): [demo de galería intrínseca]({{ '/lessons/es/intrinsic-web-design/demo/' | relative_url }}).

---

## Objetivos

1. Construir layout responsivo **sin media queries de viewport** para columnas y tarjetas.
2. Usar `@container` cuando el *interior* del componente deba cambiar según el cajón.
3. Usar `subgrid` para alinear secciones entre tarjetas vecinas.
4. Entregar commit + reflexión crítica.

---

## Por qué no enseñamos media queries aquí

<aside class="lesson-idea" aria-label="Idea clave">
<p><strong>Idea clave:</strong> En esta sesión el espacio que manda es el del <em>contenedor</em>, no el del dispositivo. No necesitas una clase aparte de media queries para sacar una galería responsiva.</p>
</aside>

| Enfoque | Pregunta que responde | ¿Lo usamos hoy? |
| --- | --- | --- |
| `@media (min-width: …)` | ¿Cuánto mide la **ventana**? | No para layout de componentes |
| Grid fluido (`auto-fit` + `minmax`) | ¿Cuántas columnas caben en este hueco? | Sí — base |
| `@container` | ¿Cuánto mide el **cajón** del componente? | Sí — estructura interna |
| `subgrid` | ¿Comparto las líneas del cajón de arriba? | Sí — alineación |
| `@media (prefers-*)` | ¿Preferencias del usuario? | Sí — solo accesibilidad |

**En resumen:** las media queries de *preferencia* (`prefers-reduced-motion`, contraste, esquema de color) siguen siendo útiles. Las de *breakpoints de layout* (`min-width: 768px` → “modo tablet”) quedan fuera de esta sesión: el kit intrínseco las sustituye en tu portfolio.

---

## Kit intrínseco (tres herramientas)

### 1. Grid fluido — columnas sin breakpoints

<aside class="lesson-idea">
<p><strong>Idea:</strong> <code>repeat(auto-fit, minmax(…))</code> calcula cuántas columnas caben. Tú fijas el mínimo legible; CSS reparte el resto.</p>
</aside>

**Excerpt** — columnas que se crean y destruyen solas:

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	gap: 1rem;
}
```

- `min(100%, 14rem)` evita overflow en cajones más estrechos que 14rem.
- Cero `@media`. Redimensiona el padre (no solo la ventana) y observa.

### 2. Container queries — el cajón, no la ventana

<aside class="lesson-idea">
<p><strong>Idea:</strong> Primero declares el contenedor (<code>container-type: inline-size</code>). Luego preguntas con <code>@container</code>.</p>
</aside>

**Excerpt:**

```css
.region {
	container-type: inline-size;
	container-name: region;
}

/* Base: tarjeta apilada */
.card {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

/* Si el cajón es ancho: imagen + texto en fila */
@container region (min-width: 28rem) {
	.card {
		flex-direction: row;
		align-items: stretch;
	}

	.card img {
		width: 40%;
		object-fit: cover;
	}
}
```

**Prueba de estudio:** coloca la misma `.card` dentro de un sidebar estrecho y de un main ancho. Con media queries verías el mismo resultado en ambos; con `@container`, cada cajón decide.

### 3. Subgrid — alineación entre tarjetas

<aside class="lesson-idea">
<p><strong>Idea:</strong> Sin subgrid, cada tarjeta mide sus filas sola (títulos “bailan”). Con subgrid, las tarjetas <em>comparten</em> las pistas del padre.</p>
</aside>

**Excerpt:**

```css
.gallery {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	/* Tres pistas verticales que heredarán las tarjetas */
	grid-auto-rows: auto;
	gap: 1rem;
}

.card {
	display: grid;
	grid-template-rows: subgrid;
	grid-row: span 3; /* título · cuerpo · pie */
	gap: inherit;
}
```

---

## Demo completa: galería sin media queries de layout

**CodeSandbox-ready** — un solo HTML (o `index.html` + CSS). Abre también el [demo publicado]({{ '/lessons/es/intrinsic-web-design/demo/' | relative_url }}).

{% raw %}

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Galería intrínseca — demo</title>
		<style>
			:root {
				--surface: #f1f5f9;
				--card: #ffffff;
				--content: #0f172a;
				--muted: #475569;
				--accent: #2563eb;
				--border: #e2e8f0;
				--radius: 0.75rem;
				--gap: 1rem;
				--text: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
			}

			* {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				font-family: system-ui, sans-serif;
				font-size: var(--text);
				line-height: 1.5;
				color: var(--content);
				background: var(--surface);
			}

			/* Página intrínseca: sin @media de layout */
			.page {
				display: grid;
				grid-template-columns: repeat(
					auto-fit,
					minmax(min(100%, 16rem), 1fr)
				);
				gap: var(--gap);
				padding: var(--gap);
				max-width: 72rem;
				margin-inline: auto;
			}

			.region {
				container-type: inline-size;
				container-name: region;
				min-width: 0;
				padding: var(--gap);
				border-radius: var(--radius);
				background: #e2e8f0;
			}

			.region--wide {
				background: transparent;
				padding: 0;
			}

			.gallery {
				display: grid;
				grid-template-columns: repeat(
					auto-fit,
					minmax(min(100%, 13rem), 1fr)
				);
				gap: var(--gap);
			}

			.card {
				display: flex;
				flex-direction: column;
				gap: 0.65rem;
				padding: 0.85rem;
				background: var(--card);
				border: 1px solid var(--border);
				border-radius: var(--radius);
				min-width: 0;
			}

			.card img {
				display: block;
				width: 100%;
				aspect-ratio: 16 / 10;
				object-fit: cover;
				border-radius: calc(var(--radius) - 0.25rem);
				background: #cbd5e1;
			}

			.card h3 {
				margin: 0;
				font-size: 1.05rem;
			}

			.card p {
				margin: 0;
				color: var(--muted);
				font-size: 0.95rem;
				flex: 1;
			}

			.card a {
				color: var(--accent);
			}

			.card a:focus-visible {
				outline: 3px solid #f59e0b;
				outline-offset: 2px;
			}

			/* Misma tarjeta: fila cuando el REGION es ancho */
			@container region (min-width: 28rem) {
				.card {
					flex-direction: row;
					align-items: stretch;
				}

				.card img {
					width: min(42%, 12rem);
					flex-shrink: 0;
					aspect-ratio: 1 / 1;
					align-self: stretch;
				}

				.card-body {
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					min-width: 0;
					flex: 1;
				}
			}
		</style>
	</head>
	<body>
		<div class="page">
			<aside class="region" aria-label="Sidebar estrecho">
				<div class="gallery">
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier1/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Proyecto A</h3>
							<p>En cajón estrecho la tarjeta se apila.</p>
							<footer><a href="#">Ver</a></footer>
						</div>
					</article>
				</div>
			</aside>

			<main class="region region--wide" aria-label="Contenido principal">
				<div class="gallery">
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier2/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Proyecto B</h3>
							<p>Cajón ancho → imagen + cuerpo en fila.</p>
							<footer><a href="#">Ver</a></footer>
						</div>
					</article>
					<article class="card">
						<img
							src="https://picsum.photos/seed/atelier3/640/400"
							alt=""
							width="640"
							height="400"
						/>
						<div class="card-body">
							<h3>Proyecto C</h3>
							<p>Descripción breve.</p>
							<footer><a href="#">Ver</a></footer>
						</div>
					</article>
				</div>
			</main>
		</div>
	</body>
</html>
```

{% endraw %}

<aside class="lesson-summary" aria-label="Resumen del demo">
<p><strong>Resumen:</strong> la página usa <code>auto-fit</code> fluido (cero media queries de layout). Las tarjetas pasan de apiladas a fila con <code>@container region</code>. En DevTools, restringe solo un <code>.region</code> — el cambio ocurre <em>sin</em> redimensionar el viewport.</p>
</aside>

---

## Laboratorio en tu portfolio

1. Envuelve tu galería/proyectos en un padre con `container-type: inline-size`.
2. Sustituye columnas fijas o media queries de layout por `auto-fit` + `minmax`.
3. Si la tarjeta tiene imagen + texto, cambia a fila con `@container`, no con `@media`.
4. Opcional: `subgrid` + `grid-row: span N` para alinear título / cuerpo / pie.
5. Prueba de estudio: tres anchos de padre (DevTools → restringir el contenedor, no solo la ventana).
6. Añade `@media (prefers-reduced-motion: reduce)` solo si tienes animaciones.

**Template** — esqueleto mínimo a pegar en tu CSS:

```css
.projects {
	container-type: inline-size;
	container-name: projects;
}

.projects-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	gap: 1rem;
}

.project-card {
	display: grid;
	grid-template-rows: subgrid;
	grid-row: span 3;
	gap: 0.75rem;
}

@container projects (min-width: 28rem) {
	.project-card {
		/* ajusta estructura interna si hace falta */
	}
}
```

---

## Accesibilidad (aplica ya)

- `alt` significativo, o `alt=""` si la imagen es decorativa junto a un título visible.
- Contraste ≥ 4.5:1 en texto de cuerpo.
- `:focus-visible` visible en enlaces de tarjetas.
- Preferencia de movimiento: `@media (prefers-reduced-motion: reduce)` — la única media query “obligatoria” de esta sesión si animas.

---

## Commit y reflexión crítica

```bash
git add .
git commit -m "feat: responsive gallery · container queries + subgrid (+a11y)"
git push
```

Escribe 3–5 frases: cómo el diseño por *contexto de componente* (no por dispositivo) mejora cuidado, inclusión o atención sostenible — alineado con **Critical Coding for a Better Living**.

---

{% comment %}
outcome-graphic-selection:
  source-section: "Commit y reflexión crítica"
  visual-grammar: "relationship-aware-layout — layout regions adapting through intrinsic relationships rather than device-specific breakpoints"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Recursos

- [MDN — Container queries](https://developer.mozilla.org/es/docs/Web/CSS/CSS_containment/Container_queries)
- [MDN — Subgrid](https://developer.mozilla.org/es/docs/Web/CSS/CSS_grid_layout/Subgrid)
- [web.dev — Container queries](https://web.dev/learn/css/container-queries)
- [LogRocket — Subgrid + container queries](https://blog.logrocket.com/using-css-subgrids-container-queries/)
