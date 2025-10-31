---
layout: lesson
title: 'Práctica: HTML semántico + Fundamentos de CSS'
title_alt: 'Práctica: HTML semántico + Fundamentos de CSS'
slug: html-css-basics
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/html-css-basics/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## ⏰ Duración estimada

90 minutos (1 sesión completa)

## 🎯 Objetivos

- Practicar la **estructura semántica en HTML** según las guías de [Mozilla](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/).
- Aplicar los **fundamentos de CSS** de [Mozilla](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/).
- Modificar **landing page inicial** en tu proyecto `index.html`.
- Usar **Git y commits** para documentar tu proceso en tu repositorio ATELIER:  
  👉 [Metodología ATELIER](https://ruvebal.github.io/web-atelier-udit/methodology/es/).

---

## 📂 Punto de partida

- Tu repositorio clonado:  
  [`student-project-template`](https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template)
- Archivos clave:
  - `index.html` → estructura del landing.
  - `assets/css/index.css` → estilos básicos.

---

## 🔑 Elementos de UI a crear en tu landing

1. **Header con navegación** (`<header>` + `<nav>`).

   - Logo o título del sitio.
   - Menú con enlaces internos (`Sobre mí`, `Proyectos`, `Contacto`).

2. **Hero section** (bloque inicial con `<h1>` y subtítulo).

   - Breve frase que explique de qué trata la web.
   - Opción: incluir imagen o color de fondo destacado.

3. **Sección “Sobre mí”** (`<section>`).

   - Párrafo de presentación.
   - Imagen opcional de perfil.

4. **Galería de proyectos** (`<section>` + `<article>`).

   - Al menos 2 `<article>` con título y descripción.
   - Opcional: captura de pantalla o `<figure>`.

5. **Formulario de contacto** (`<form>` con `<input>` + `<textarea>` + `<button>`).

   - Simbólico (no tiene que enviar nada).

6. **Footer** (`<footer>`).
   - Información de copyright.
   - Enlaces a redes sociales o GitHub.

---

## 📋 Actividades

### 1. Explorar y observar (15 min)

1. Abre `index.html` en VSCode.
2. Analiza su estructura. ¿Hay `<header>`, `<main>`, `<footer>`?
3. Consulta [MDN: HTML semántico](https://developer.mozilla.org/en-US/curriculum/core/semantic-html/).
4. En el navegador, inspecciona tu página con DevTools para ver cómo se renderizan los elementos.

---

### 2. Intervenir: crear tu landing semántica (30 min)

- Estructura mínima que debes crear en `index.html`:

```html
<header>
	<h1>Mi landing</h1>
	<nav>
		<a href="#about">Sobre mí</a>
		<a href="#projects">Proyectos</a>
		<a href="#contact">Contacto</a>
	</nav>
</header>

<main>
	<section id="hero">
		<h2>Bienvenido</h2>
		<p>Una frase inspiradora para mi sitio.</p>
	</section>

	<section id="about">
		<h2>Sobre mí</h2>
		<p>Texto de presentación personal.</p>
	</section>

	<section id="projects">
		<h2>Proyectos</h2>
		<article>
			<h3>Proyecto 1</h3>
			<p>Descripción breve.</p>
		</article>
		<article>
			<h3>Proyecto 2</h3>
			<p>Descripción breve.</p>
		</article>
	</section>

	<section id="contact">
		<h2>Contacto</h2>
		<form>
			<input type="text" placeholder="Tu nombre" required />
			<input type="email" placeholder="Tu email" required />
			<textarea placeholder="Tu mensaje"></textarea>
			<button type="submit">Enviar</button>
		</form>
	</section>
</main>

<footer>
	<p>© 2025 · Mi Nombre</p>
</footer>
```

### 3. Estilos en CSS (30 min)

En `assets/css/index.css` aplica fundamentos de [CSS](https://developer.mozilla.org/en-US/curriculum/core/css-fundamentals/):

```css
body {
	font-family: sans-serif;
	line-height: 1.5;
	max-width: 900px;
	margin: 0 auto;
	padding: 1rem;
}

header,
footer {
	background: #f0f0f0;
	padding: 1rem;
}

nav a {
	margin-right: 1rem;
	text-decoration: none;
	color: #0066cc;
}

section {
	margin-bottom: 2rem;
}

form {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}
```

### 4. Reflexión (10 min)

Al final de `index.html`, añade:

```html
<!-- Reflexión ATELIER: Aprendí que los elementos semánticos mejoran la accesibilidad 
y que CSS me permite dar jerarquía visual sin alterar la estructura del HTML. -->
```

---

### 💡 Prompts sugeridos para mejorar tu `index.html` con Copilot

Estos prompts son frases que puedes escribir como **comentarios en tu código**.  
Copilot generará sugerencias que luego **tú deberás revisar críticamente** (no aceptes nada sin entenderlo).

### 🎨 Estructura y contenido HTML

```html
<!-- Crear una sección "hero" con un título principal, subtítulo y un botón de llamada a la acción -->
```

```html
<!-- Añadir un artículo con imagen, título y párrafo dentro de la sección de proyectos -->
```

```html
<!-- Generar un formulario de contacto con nombre, email y mensaje -->
```

```html
<!-- Crear un footer con enlaces a redes sociales (GitHub, LinkedIn, Instagram) -->
```

```html
<!-- Incluir una sección de testimonios con tres citas y nombres de personas -->
```

---

## 🎨 Estilos CSS

```css
/* Crear un estilo para el hero con un fondo degradado y texto centrado */
```

```css
/* Añadir estilos responsive: que el menú de navegación se convierta en columna en pantallas pequeñas */
```

```css
/* Aplicar un grid de dos columnas a la galería de proyectos */
```

```css
/* Definir estilos para los botones con hover y transición suave */
```

```css
/* Dar un estilo consistente al formulario: inputs con bordes redondeados y padding */
```

---

### 🧭 Reflexión ATELIER

Después de usar un prompt, añade un comentario con tu evaluación:

```html
<!-- Reflexión ATELIER: Copilot me sugirió un hero con imagen de fondo. Lo adapté a texto porque mejora accesibilidad. -->
```

---

### ⚠️ Nota crítica

- Copilot **no siempre sigue buenas prácticas semánticas o accesibles**.
- Verifica que las etiquetas sean correctas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Ajusta el código a tu propio estilo y diseño.

---

## ✅ Entregable

- `index.html` poblado con tu landing (con todos los elementos de UI).
- `assets/css/index.css` con estilos aplicados.
- Comentario final de reflexión ATELIER.
- Commit en tu repo:

```bash
git add index.html assets/css/index.css
git commit -m "Populate semantic landing page with CSS fundamentals"
git push
```