---
layout: lesson
title: 'Bootstrap CSS: Sistema de Rejilla y Contenedores — Arquitectura de Diseño Responsivo'
title_alt: 'Bootstrap CSS: Sistema de Rejilla y Contenedores — Arquitectura de Diseño Responsivo'
slug: bootstrap-layout-grid-containers
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/bootstrap/layout-grid-containers/
description: 'Sistema de rejilla de Bootstrap, puntos de interrupción responsivos, y contenedores para diseños modernos.'
tags: [bootstrapcss, sistema-rejilla, diseño-responsivo, contenedores]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Bootstrap CSS: Sistema de Rejilla y Contenedores — Arquitectura de Diseño Responsivo

## Resumen de Sesión

Esta sesión profundiza en **el sistema de rejilla de Bootstrap** y la arquitectura de contenedores. Los estudiantes aprenderán cómo crear diseños responsivos usando la rejilla de 12 columnas de Bootstrap, entender los puntos de interrupción, y construir estructuras de página flexibles que se adaptan perfectamente a todos los dispositivos.

## Objetivos de Aprendizaje

- Dominar el sistema de rejilla de 12 columnas de Bootstrap
- Entender los puntos de interrupción responsivos y su aplicación
- Aprender la diferencia entre tipos de contenedores
- Construir diseños responsivos complejos con estructura apropiada

## Conceptos Core

### Sistema de Rejilla de Bootstrap

**El sistema de rejilla de Bootstrap** es un diseño flexbox mobile-first con 12 columnas. Está diseñado para ser responsivo y funciona con cualquier tamaño de pantalla.

**Características Clave:**

- **Sistema de 12 columnas** - Cada fila se divide en 12 columnas de ancho igual
- **Mobile-first** - Diseñado para dispositivos móviles primero, luego mejorado para pantallas más grandes
- **Basado en flexbox** - Usa CSS flexbox moderno para diseño
- **Puntos de interrupción responsivos** - Se adapta automáticamente a diferentes tamaños de pantalla

### Tipos de Contenedores

Bootstrap proporciona dos tipos principales de contenedores:

#### `.container`

- **Contenedor de ancho fijo** con márgenes responsivos
- **Contenido centrado** con ancho máximo en cada punto de interrupción
- **Padding responsivo** que se ajusta basado en el tamaño de pantalla

#### `.container-fluid`

- **Contenedor de ancho completo** que abarca todo el ancho del viewport
- **Sin restricciones de ancho máximo**
- **Diseño de borde a borde** del contenido

#### `.container-{breakpoint}` (fluido hasta el punto de corte)

- Se comporta como `.container-fluid` por debajo del breakpoint y pasa a ser de ancho fijo en y por encima del mismo
- Variantes: `.container-sm` (≥576px), `.container-md` (≥768px), `.container-lg` (≥992px), `.container-xl` (≥1200px), `.container-xxl` (≥1400px)

Ejemplo:

```html
<div class="container-md">
	<div class="row">
		<div class="col">Fluido por debajo de 768px, fijo desde md</div>
	</div>
</div>
```

### Puntos de Interrupción Responsivos

Bootstrap usa un conjunto de puntos de interrupción responsivos que corresponden a tamaños comunes de dispositivos:

| Punto de Interrupción | Infijo de Clase | Dimensiones | Descripción                           |
| --------------------- | --------------- | ----------- | ------------------------------------- |
| Extra pequeño         | Ninguno         | <576px      | Teléfonos móviles                     |
| Pequeño               | `sm`            | ≥576px      | Teléfonos grandes / tabletas pequeñas |
| Mediano               | `md`            | ≥768px      | Tabletas                              |
| Grande                | `lg`            | ≥992px      | Escritorios                           |
| Extra grande          | `xl`            | ≥1200px     | Escritorios grandes                   |
| XXL                   | `xxl`           | ≥1400px     | Pantallas extra grandes               |

### Clases de Columnas

Bootstrap proporciona varias clases de columnas para diferentes comportamientos responsivos:

#### Columnas de Diseño Automático

```html
<div class="row">
	<div class="col">Columna de tamaño automático</div>
	<div class="col">Columna de tamaño automático</div>
	<div class="col">Columna de tamaño automático</div>
</div>
```

#### Columnas de Ancho Fijo

```html
<div class="row">
	<div class="col-4">25% de ancho</div>
	<div class="col-4">25% de ancho</div>
	<div class="col-4">25% de ancho</div>
</div>
```

#### Columnas Responsivas

```html
<div class="row">
	<div class="col-sm-8 col-md-6">Columna responsiva</div>
	<div class="col-sm-4 col-md-6">Columna responsiva</div>
</div>
```

### Gutters (espaciado entre columnas)

- Usa `g-*` para ambos ejes, `gx-*` para horizontal, `gy-*` para vertical (`0..5`)

```html
<div class="container">
	<div class="row g-3">
		<div class="col"><div class="border p-3">A</div></div>
		<div class="col"><div class="border p-3">B</div></div>
		<div class="col"><div class="border p-3">C</div></div>
	</div>
</div>
```

### Auto-conteo de columnas con `row-cols-*`

Deja que la rejilla determine cuántas columnas por fila en cada breakpoint.

```html
<div class="container">
	<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
		<div class="col"><div class="border p-3">1</div></div>
		<div class="col"><div class="border p-3">2</div></div>
		<div class="col"><div class="border p-3">3</div></div>
		<div class="col"><div class="border p-3">4</div></div>
	</div>
</div>
```

## Andamiaje de Prueba (CDN)

Usa este HTML mínimo para probar cualquier ejemplo rápidamente (sin herramientas de build):

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Prueba Rejilla Bootstrap</title>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
			crossorigin="anonymous" />
	</head>
	<body class="p-3">
		<!-- Pega aquí el markup de los ejercicios -->
	</body>
</html>
```

## Práctica Práctica

### Ejercicio 1: Diseño Básico de Rejilla

Crea un diseño responsivo usando el sistema de rejilla de Bootstrap:

```html
<div class="container">
	<div class="row g-3">
		<main class="col-12 col-md-8">
			<h2>Área de Contenido Principal</h2>
			<p>2/3 del ancho desde md (≥768px), ancho completo por debajo.</p>
		</main>
		<aside class="col-12 col-md-4">
			<h3>Barra Lateral</h3>
			<p>1/3 del ancho desde md, se apila debajo en pantallas pequeñas.</p>
		</aside>
	</div>
</div>
```

### Ejercicio 2: Diseño Complejo Responsivo

Construye un diseño más complejo con múltiples secciones:

```html
<div class="container-fluid">
	<!-- Encabezado -->
	<header class="row bg-primary text-white py-4">
		<div class="col-12">
			<h1 class="text-center">Encabezado de Portafolio</h1>
		</div>
	</header>

	<!-- Contenido Principal -->
	<main class="row py-4 g-4">
		<!-- Sección Hero -->
		<section class="col-lg-8">
			<div class="bg-light p-4 rounded h-100">
				<h2>Bienvenido a Mi Portafolio</h2>
				<p>Esta es una sección hero que muestra mi trabajo e introduce a los visitantes mis proyectos.</p>
			</div>
		</section>

		<!-- Barra Lateral -->
		<aside class="col-lg-4">
			<div class="bg-secondary text-white p-3 rounded h-100">
				<h3>Acerca de Mí</h3>
				<p>Información breve sobre mí y mis habilidades.</p>
			</div>
		</aside>
	</main>

	<!-- Rejilla de Proyectos -->
	<section class="row">
		<div class="col-12 mb-3">
			<h2>Mis Proyectos</h2>
		</div>
		<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
			<div class="col">
				<div class="card h-100">
					<div class="card-body">
						<h5 class="card-title">Proyecto 1</h5>
						<p class="card-text">Descripción del proyecto 1.</p>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card h-100">
					<div class="card-body">
						<h5 class="card-title">Proyecto 2</h5>
						<p class="card-text">Descripción del proyecto 2.</p>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card h-100">
					<div class="card-body">
						<h5 class="card-title">Proyecto 3</h5>
						<p class="card-text">Descripción del proyecto 3.</p>
					</div>
				</div>
			</div>
			<div class="col">
				<div class="card h-100">
					<div class="card-body">
						<h5 class="card-title">Proyecto 4</h5>
						<p class="card-text">Descripción del proyecto 4.</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
```

### Ejercicio 3: Técnicas Avanzadas de Rejilla

Practica técnicas de rejilla más avanzadas:

```html
<div class="container">
	<!-- Columnas offset -->
	<div class="row">
		<div class="col-md-4 offset-md-4">
			<h3>Contenido Centrado</h3>
			<p>Esta columna está centrada usando la clase offset.</p>
		</div>
	</div>

	<!-- Filas anidadas -->
	<div class="row">
		<div class="col-md-6">
			<h4>Sección 1</h4>
			<div class="row">
				<div class="col-6"><p>Sub-columna 1</p></div>
				<div class="col-6"><p>Sub-columna 2</p></div>
			</div>
		</div>
		<div class="col-md-6">
			<h4>Sección 2</h4>
			<p>Contenido adyacente con estructura de rejilla anidada.</p>
		</div>
	</div>
</div>
```

## Utilidades de Rejilla de Bootstrap

### Utilidades de Alineación

- `.justify-content-start`, `.justify-content-center`, `.justify-content-end`
- `.align-items-start`, `.align-items-center`, `.align-items-end`
- `.text-center`, `.text-start`, `.text-end`

### Utilidades de Espaciado

- `.m-0` a `.m-5` - Márgenes
- `.p-0` a `.p-5` - Padding
- `.mt-3`, `.mb-3`, `.ms-3`, `.me-3` - Espaciado direccional

### Utilidades Responsivas

- `.d-none`, `.d-sm-block` - Mostrar/ocultar elementos en diferentes puntos de interrupción
- `.order-first`, `.order-last` - Cambiar orden de columnas

## Errores Comunes (lee antes de practicar)

- Coloca siempre `.col-*` dentro de una `.row`. No pongas columnas directamente bajo `.container`.
- Envuelve las filas dentro de `.container` / `.container-*` / `.container-fluid` para obtener el padding horizontal correcto.
- Prefiere `g-*` / `gx-*` / `gy-*` para gutters en lugar de padding ad‑hoc en columnas.
- No mezcles la rejilla de Bootstrap y CSS Grid en la misma fila salvo que sea totalmente intencional.

## Accesibilidad y Semántica

- Prefiere `<header>`, `<main>`, `<aside>`, `<footer>` para regiones semánticas.
- Mantén una jerarquía de encabezados consistente (`h1` → `h2` → `h3`).
- Usa `.img-fluid` para imágenes y proporciona `alt` descriptivo.
- Asegura que los títulos de las cards sean encabezados cuando sean contenido principal.

## Rejilla de Bootstrap vs CSS Grid (¿cuándo usar cuál?)

- La rejilla de Bootstrap (flexbox) destaca para páginas responsivas convencionales de 12 columnas, spanning y alineación.
- CSS Grid destaca para control bidimensional (filas y columnas), layouts asimétricos/editoriales y tracks complejos.
- Regla práctica: usa rejilla de Bootstrap para pantallas estándar; CSS Grid para composiciones editoriales/asimétricas.

## Preguntas Críticas de Reflexión

### Exploración

- ¿Cómo se compara el sistema de rejilla de Bootstrap con CSS Grid o Flexbox al construir diseños responsivos?
- ¿Qué comportamientos responsivos te sorprendieron más al testear diferentes tamaños de pantalla?

### Reflexión

- ¿Cómo afecta el enfoque mobile-first tus decisiones de diseño comparado con diseño desktop-first?
- ¿De qué maneras encarna el sistema de rejilla de Bootstrap principios de mejora progresiva?

### Conceptualización

- ¿Cómo se relaciona la rejilla de 12 columnas con principios de diseño tradicionales como la proporción áurea o regla de tercios?
- ¿Cuáles son las implicaciones de accesibilidad de diseños de rejilla responsivos?

### Producción

- ¿Cómo podría escalar el sistema de rejilla de Bootstrap para proyectos más grandes o equipos?
- ¿Cuáles son las implicaciones de rendimiento de usar la rejilla de Bootstrap versus diseños CSS personalizados?

### Exhibición

- ¿Cómo demostrarás el comportamiento responsivo de tu diseño de rejilla a otros?
- ¿Qué enfoques alternativos de diseño podrían lograr resultados responsivos similares?

## Referencias y Lecturas Adicionales

### Documentación Oficial

- [Sistema de Rejilla de Bootstrap](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Puntos de Interrupción de Bootstrap](https://getbootstrap.com/docs/5.3/layout/breakpoints/)
- [Diseño de Rejilla CSS - MDN](https://developer.mozilla.org/es/docs/Web/CSS/CSS_Grid_Layout)

### Teoría de Diseño

- [Sistemas de Rejilla Responsivos: De 960.gs a Foundation a Bootstrap](https://www.smashingmagazine.com/2011/01/responsive-grid-systems-from-960-gs-to-foundation-to-bootstrap/)
- [La Historia del Diseño Web Responsivo](https://alistapart.com/article/responsive-web-design/)
- [Flexbox vs CSS Grid](https://css-tricks.com/css-grid-vs-flexbox/)

### Rendimiento y Mejores Prácticas

- [Rendimiento de CSS Grid](https://web.dev/css-grid-performance/)
- [Imágenes Responsivas](https://web.dev/responsive-images/)
- [CSS de Ruta Crítica](https://web.dev/critical-css/)

> **Siguiente:** [S3 - Componentes y Patrones de UI →]({{ '/lessons/es/bootstrap/components-navbar-cards/' | relative_url }})