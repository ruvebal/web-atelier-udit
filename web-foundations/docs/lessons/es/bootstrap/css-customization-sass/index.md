---
layout: lesson
title: 'Bootstrap CSS: Personalización CSS y Sass — Sistema de Diseño y Temas'
title_es: 'Bootstrap CSS: Personalización CSS y Sass — Sistema de Diseño y Temas'
slug: bootstrap-css-customization-sass
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/bootstrap/css-customization-sass/
description: 'Personalización de Bootstrap, temas Sass, anulaciones CSS, y sistemas de diseño.'
tags: [bootstrapcss, sass, temas, personalización, sistemas-de-diseño]
---

# Bootstrap CSS: Personalización CSS y Sass — Sistema de Diseño y Temas

## Resumen de Sesión

Esta sesión explora **la personalización de Bootstrap** y estrategias de temas. Los estudiantes aprenderán cómo crear sistemas de diseño cohesivos personalizando los estilos predeterminados de Bootstrap, trabajando con variables Sass, e implementando flujos de trabajo de temas profesionales.

## Objetivos de Aprendizaje

- Entender la arquitectura de temas de Bootstrap
- Aprender a personalizar Bootstrap usando anulaciones CSS
- Dominar la personalización de variables Sass para temas comprehensivos
- Crear y mantener sistemas de diseño cohesivos

## Conceptos Core

### Arquitectura de Temas de Bootstrap

**El sistema de temas de Bootstrap** está construido alrededor de propiedades CSS personalizadas y variables Sass que controlan colores, tipografía, espaciado, y estilos de componentes. Esta arquitectura permite:

- **Tokens de diseño consistentes** a través de todos los componentes
- **Personalización fácil** sin modificar archivos fuente
- **Escalabilidad de temas** para múltiples marcas o contextos
- **Hojas de estilo mantenibles** con decisiones de diseño centralizadas

### Propiedades CSS Personalizadas (Variables CSS)

Bootstrap 5 usa **propiedades CSS personalizadas** para temas en tiempo de ejecución:

```css
:root {
	--bs-primary: #007bff;
	--bs-secondary: #6c757d;
	--bs-success: #28a745;
	--bs-danger: #dc3545;
	--bs-warning: #ffc107;
	--bs-info: #17a2b8;
	--bs-light: #f8f9fa;
	--bs-dark: #343a40;
}
```

### Variables Sass para Personalización en Tiempo de Construcción

Para temas más comprehensivos, Bootstrap proporciona **variables Sass** que se compilan en CSS:

```scss
// Variables de tema personalizadas
$primary: #ff6b35;
$secondary: #f7931e;
$success: #28a745;
$danger: #dc3545;

// Tipografía
$font-family-base: 'Inter', sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.6;

// Espaciado
$spacer: 1rem;

// Radio de borde
$border-radius: 0.375rem;
$border-radius-lg: 0.5rem;
```

## Métodos de Personalización

### Método 1: Anulaciones CSS (Personalización Rápida)

El enfoque más simple es **anular los estilos predeterminados de Bootstrap** con CSS personalizado:

```css
/* Color primario personalizado */
.bg-primary {
	background-color: #ff6b35 !important;
}

.btn-primary {
	background-color: #ff6b35;
	border-color: #ff6b35;
}

.btn-primary:hover {
	background-color: #e55a2b;
	border-color: #e55a2b;
}

/* Estilizado personalizado de navbar */
.navbar-brand {
	font-weight: 700;
	font-size: 1.5rem;
}

.navbar-nav .nav-link {
	font-weight: 500;
	transition: color 0.3s ease;
}

/* Estilizado personalizado de tarjetas */
.card {
	border: none;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### Método 2: Personalización de Variables Sass (Enfoque Profesional)

Para temas comprehensivos, personaliza Bootstrap en la fuente usando Sass:

```scss
// 1. Importar funciones y variables de Bootstrap
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

// 2. Anular variables predeterminadas ANTES de importar Bootstrap
$primary: #ff6b35;
$secondary: #f7931e;
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.5rem;

// 3. Importar componentes de Bootstrap (después de anular variables)
@import 'bootstrap/scss/bootstrap';
```

### Método 3: Propiedades CSS Personalizadas (Temas en Tiempo de Ejecución)

Usa las propiedades CSS integradas de Bootstrap para temas dinámicos:

```css
/* Anular propiedades CSS personalizadas de Bootstrap */
:root {
	--bs-primary: #ff6b35;
	--bs-secondary: #f7931e;
	--bs-font-sans-serif: 'Inter', sans-serif;
}
```

## Práctica Práctica

### Ejercicio 1: Tema Básico con Anulaciones CSS

Crea un tema personalizado usando anulaciones CSS:

```html
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Tema Bootstrap Personalizado</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
		<link href="tema-personalizado.css" rel="stylesheet" />
	</head>
	<body>
		<nav class="navbar navbar-expand-lg">
			<div class="container">
				<a class="navbar-brand" href="#">Marca Personalizada</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav ms-auto">
						<li class="nav-item"><a class="nav-link" href="#">Inicio</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Acerca de</a></li>
						<li class="nav-item"><a class="nav-link" href="#">Contacto</a></li>
					</ul>
				</div>
			</div>
		</nav>

		<div class="container mt-5">
			<div class="row">
				<div class="col-md-8">
					<div class="card tarjeta-personalizada">
						<div class="card-body">
							<h2 class="card-title">Tarjeta con Estilo Personalizado</h2>
							<p class="card-text">
								Esta tarjeta usa anulaciones CSS personalizadas para crear un diseño único mientras mantiene el comportamiento
								responsivo de Bootstrap.
							</p>
							<button class="btn btn-primary">Botón Primario Personalizado</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
	</body>
</html>
```

**tema-personalizado.css:**

```css
/* Esquema de color personalizado */
:root {
	--primario-personalizado: #ff6b35;
	--secundario-personalizado: #f7931e;
	--acento-personalizado: #ffcc02;
}

/* Anular componentes de Bootstrap */
.navbar-brand {
	color: var(--primario-personalizado) !important;
	font-weight: 700;
	font-size: 1.5rem;
}

.navbar-nav .nav-link {
	color: var(--secundario-personalizado) !important;
	font-weight: 500;
	transition: color 0.3s ease;
}

.navbar-nav .nav-link:hover {
	color: var(--primario-personalizado) !important;
}

.tarjeta-personalizada {
	background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
	border: 2px solid var(--acento-personalizado);
	border-radius: 1rem;
	box-shadow: 0 8px 25px rgba(255, 107, 53, 0.15);
}

.btn-primary {
	background-color: var(--primario-personalizado);
	border-color: var(--primario-personalizado);
	padding: 0.75rem 2rem;
	font-weight: 600;
	border-radius: 2rem;
	transition: all 0.3s ease;
}

.btn-primary:hover {
	background-color: #e55a2b;
	border-color: #e55a2b;
	transform: translateY(-2px);
	box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
}

/* Clases utilitarias personalizadas */
.text-primary-custom {
	color: var(--primario-personalizado) !important;
}

.bg-gradient-custom {
	background: linear-gradient(135deg, var(--primario-personalizado) 0%, var(--secundario-personalizado) 100%);
}
```

## Preguntas Críticas de Reflexión

### Exploración

- ¿Cómo afectó personalizar los estilos predeterminados de Bootstrap tu entendimiento de la arquitectura CSS?
- ¿Qué te sorprendió más sobre la relación entre variables Sass y CSS compilado?

### Reflexión

- ¿Cómo se compara el enfoque de temas de Bootstrap con construir un sistema de diseño desde cero?
- ¿De qué maneras refleja la personalización principios de mejora progresiva?

### Conceptualización

- ¿Cómo se relacionan los tokens de diseño con la identidad de marca y consistencia a través de productos digitales?
- ¿Cuáles son las implicaciones de accesibilidad de sistemas de color y tipografía personalizados?

### Producción

- ¿Cómo podría escalar el enfoque de temas de Bootstrap para proyectos más grandes o equipos?
- ¿Cuáles son las implicaciones de rendimiento de temas personalizados versus usar estilos predeterminados de Bootstrap?

### Exhibición

- ¿Cómo demostrarás la cohesión y profesionalismo de tu tema Bootstrap personalizado?
- ¿Qué enfoques alternativos de temas podrían lograr consistencia de sistema de diseño similar?

## Referencias y Lecturas Adicionales

### Documentación Oficial

- [Temas de Bootstrap](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Variables Sass de Bootstrap](https://getbootstrap.com/docs/5.3/customize/sass/)
- [Propiedades CSS Personalizadas](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)

### Sistemas de Diseño y Temas

- [Tokens de Diseño](https://design-tokens.github.io/)
- [Construyendo Sistemas de Diseño](https://www.designsystems.com/)
- [Temas con Propiedades CSS Personalizadas](https://web.dev/building-a-theme-system/)

### Sass y Herramientas de Construcción

- [Documentación de Sass](https://sass-lang.com/documentation)
- [Webpack con Sass](https://webpack.js.org/loaders/sass-loader/)
- [Vite con Sass](https://vitejs.dev/guide/features.html#css-pre-processors)

### Teoría de Color y Accesibilidad

- [Teoría de Color para Diseñadores](https://www.smashingmagazine.com/2010/02/color-theory-for-designers-part-1-the-meaning-of-color/)
- [Contraste de Color de WebAIM](https://webaim.org/resources/contrastchecker/)
- [Paletas de Color Inclusivas](https://stripe.com/docs/payments/elements/design#inclusive-color-palettes)

> **Siguiente:** [S5 - Interactividad y Componentes JavaScript →]({{ '/lessons/es/bootstrap/interactivity-js-components/' | relative_url }})
