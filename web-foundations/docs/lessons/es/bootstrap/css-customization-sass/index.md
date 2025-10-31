---
layout: lesson
title: 'Bootstrap CSS: Personalización CSS y Sass — Sistema de Diseño y Temas'
title_alt: 'Bootstrap CSS: Personalización CSS y Sass — Sistema de Diseño y Temas'
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

### ¿Qué es Sass y Por Qué Usarlo?

**Sass (Syntactically Awesome Style Sheets)** es un **preprocesador CSS** que extiende CSS con características poderosas:

- **Variables**: Define valores reutilizables (`$primary: #ff6b35;`)
- **Anidamiento**: Escribe CSS más organizado y legible
- **Mixins**: Crea bloques de estilos reutilizables
- **Funciones**: Manipula colores, tamaños, y más
- **Importaciones**: Organiza tu CSS en módulos

#### ¿Necesitas una Herramienta de Construcción?

**SÍ**, para usar Sass necesitas una herramienta que **compile** archivos `.scss` a `.css`:

| Herramienta     | Mejor Para         | Configuración | Velocidad    |
| --------------- | ------------------ | ------------- | ------------ |
| **Vite** 🚀     | Proyectos modernos | Muy fácil     | Súper rápido |
| **Webpack** 📦  | Proyectos grandes  | Compleja      | Rápido       |
| **Parcel** ⚡   | Configuración cero | Automática    | Rápido       |
| **Sass CLI** 🔧 | Proyectos simples  | Manual        | Normal       |

**Recomendación**: Usa **Vite** para la mayoría de proyectos. Es rápido, fácil de configurar, y tiene soporte excelente para Sass.

### Variables Sass para Personalización en Tiempo de Construcción

Para temas comprehensivos, Bootstrap proporciona **variables Sass** que se compilan en CSS:

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

**Ventaja clave**: Las variables Sass se aplican **antes** de que Bootstrap compile, afectando **todo el sistema** de forma consistente.

## Métodos de Personalización

### Comparación de Métodos

| Método             | Herramientas Requeridas | Dificultad      | Alcance  | Mejor Para                                  |
| ------------------ | ----------------------- | --------------- | -------- | ------------------------------------------- |
| **CSS Overrides**  | Ninguna                 | ⭐ Fácil        | Limitado | Proyectos pequeños, cambios rápidos         |
| **CSS Variables**  | Ninguna                 | ⭐⭐ Medio      | Medio    | Temas dinámicos, cambios en tiempo real     |
| **Sass Variables** | Vite/Webpack/etc.       | ⭐⭐⭐ Avanzado | Completo | Proyectos profesionales, sistemas de diseño |

### Método 1: Anulaciones CSS (Personalización Rápida)

**✅ No requiere herramientas de construcción** - Perfecto para principiantes

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

**👉 Ver Demo**: [01-css-overrides.html](demo/01-css-overrides.html)

**Ventajas:**

- Sin configuración de herramientas
- Cambios inmediatos
- Fácil de entender

**Desventajas:**

- Requiere `!important` frecuentemente
- No afecta todo el sistema
- CSS más grande

### Método 2: Personalización de Variables Sass (Enfoque Profesional)

**⚠️ REQUIERE herramienta de construcción** (Vite, Webpack, etc.)

Para temas comprehensivos, personaliza Bootstrap en la fuente usando Sass:

```scss
// 1. PRIMERO: Importar funciones de Bootstrap
@import 'bootstrap/scss/functions';

// 2. PERSONALIZAR variables ANTES de importar Bootstrap
$primary: #ff6b35;
$secondary: #f7931e;
$font-family-base: 'Inter', sans-serif;
$border-radius: 0.5rem;

// Personalizar espaciado
$spacer: 1rem;
$spacers: (
	0: 0,
	1: $spacer * 0.25,
	2: $spacer * 0.5,
	3: $spacer,
	4: $spacer * 1.5,
	5: $spacer * 3,
);

// 3. Importar variables y mixins
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

// 4. FINALMENTE: Importar Bootstrap
@import 'bootstrap/scss/bootstrap';

// 5. Tus estilos personalizados
.card:hover {
	transform: translateY(-5px);
	box-shadow: 0 0.5rem 1.5625rem rgba($primary, 0.2);
}
```

**👉 Ver Demo**: [02-sass-customization/](demo/02-sass-customization/)

**Orden Importante:**

1. **Primero**: Funciones de Bootstrap
2. **Segundo**: Tus variables personalizadas
3. **Tercero**: Variables y mixins de Bootstrap
4. **Cuarto**: Bootstrap completo
5. **Quinto**: Tus estilos adicionales

**Ventajas:**

- Cambios sistemáticos y consistentes
- CSS final más pequeño (elimina código no usado)
- No necesitas `!important`
- Control total del sistema

**Desventajas:**

- Necesitas configurar herramienta de construcción
- Curva de aprendizaje de Sass
- Tiempo de compilación

#### Configuración Rápida con Vite

```bash
# 1. Instalar dependencias
npm install bootstrap sass vite

# 2. Crear archivo de configuración (opcional)
# vite.config.js ya está listo por defecto

# 3. Ejecutar servidor de desarrollo
npm run dev
```

### Método 3: Propiedades CSS Personalizadas (Temas en Tiempo de Ejecución)

**✅ No requiere herramientas de construcción** - Cambios dinámicos

Usa las propiedades CSS integradas de Bootstrap para temas dinámicos:

```css
/* Anular propiedades CSS personalizadas de Bootstrap */
:root {
	--bs-primary: #ff6b35;
	--bs-secondary: #f7931e;
	--bs-font-sans-serif: 'Inter', sans-serif;
}

/* Temas alternos */
[data-theme='dark'] {
	--bs-primary: #ff8c61;
	--bs-body-bg: #1a1a1a;
	--bs-body-color: #ffffff;
}
```

**Ventajas:**

- Temas dinámicos (cambio en tiempo real)
- Sin compilación
- JavaScript puede modificarlos

**Desventajas:**

- Alcance limitado (no todas las variables)
- Soporte de navegador (aunque ya es excelente)

## Práctica

### 🎨 Template Personalizable Completo

Antes de comenzar con los ejercicios, explora nuestro **template personalizable** que incluye:

- Sistema completo de colores
- Escalas de tamaños de texto
- Sistema de espaciado
- Componentes estilizados
- Guía de personalización incluida

**👉 Abrir Template**: [03-template-customizable.html](demo/03-template-customizable.html)

Este template te permite experimentar con todas las variables CSS personalizables en un solo lugar.

### Ejercicio 1: Tema Básico con Anulaciones CSS

**📁 Ver demo completo:** [01-css-overrides.html](demo/01-css-overrides.html)

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

### Ejercicio 2: Personalización Profesional con Sass

**📁 Ver proyecto completo:** [02-sass-customization/](demo/02-sass-customization/)

Este ejercicio requiere configurar un entorno con Vite:

**Paso 1: Configuración Inicial**

```bash
# Crear carpeta del proyecto
mkdir mi-tema-bootstrap
cd mi-tema-bootstrap

# Inicializar proyecto
npm init -y

# Instalar dependencias
npm install bootstrap sass vite
```

**Paso 2: Crear Estructura de Archivos**

```
mi-tema-bootstrap/
├── index.html
├── _custom.scss
├── package.json
└── vite.config.js (opcional)
```

**Paso 3: Personalizar Bootstrap en `_custom.scss`**

Usa el archivo de ejemplo en [demo/02-sass-customization/\_custom.scss](demo/02-sass-customization/_custom.scss) como base.

**Paso 4: Importar en tu HTML**

```html
<script type="module">
	import './_custom.scss';
</script>
```

**Paso 5: Ejecutar**

```bash
npm run dev
```

### Ejercicio 3: Sistema de Diseño Personalizado

Usando el [template personalizable](demo/03-template-customizable.html), crea un sistema de diseño completo:

**Tareas:**

1. Modifica la paleta de colores para tu marca
2. Ajusta la escala de tamaños de texto
3. Personaliza el sistema de espaciado
4. Crea componentes personalizados
5. Documenta tu sistema de diseño

**Entregables:**

- Archivo HTML con tu sistema personalizado
- Documentación de variables utilizadas
- 3 ejemplos de componentes usando tu sistema

## Recursos Interactivos

### 🎮 Demos Incluidos

1. **[01-css-overrides.html](demo/01-css-overrides.html)**

   - Personalización básica con CSS
   - Sin herramientas de construcción
   - Ideal para principiantes

2. **[02-sass-customization/](demo/02-sass-customization/)**

   - Proyecto completo con Vite
   - Personalización profesional con Sass
   - Incluye package.json y configuración

3. **[03-template-customizable.html](demo/03-template-customizable.html)**
   - Template interactivo completo
   - Sistema de colores y tamaños
   - Guía de personalización incluida

### 🛠️ Herramientas Recomendadas

Para trabajar con Sass, elige una de estas herramientas:

#### Opción 1: Vite (Recomendado)

```bash
npm install -D vite sass
npm run dev
```

- ✅ Configuración automática
- ✅ Muy rápido
- ✅ Hot Module Replacement

#### Opción 2: Webpack

```bash
npm install -D webpack webpack-cli sass-loader sass css-loader style-loader
```

- ✅ Muy configurable
- ✅ Gran ecosistema
- ⚠️ Configuración más compleja

#### Opción 3: Sass CLI

```bash
npm install -g sass
sass _custom.scss output.css --watch
```

- ✅ Simple y directo
- ⚠️ Sin hot reload
- ⚠️ Manual

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
- [Lista Completa de Variables Sass de Bootstrap](https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss)

### Sistemas de Diseño y Temas

- [Tokens de Diseño](https://design-tokens.github.io/)
- [Construyendo Sistemas de Diseño](https://www.designsystems.com/)
- [Temas con Propiedades CSS Personalizadas](https://web.dev/building-a-theme-system/)

### Sass y Herramientas de Construcción

- [Documentación de Sass](https://sass-lang.com/documentation)
- [Guía de Sass (Español)](https://sass-lang.com/guide)
- [Vite - Preprocesadores CSS](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Webpack con Sass](https://webpack.js.org/loaders/sass-loader/)
- [Parcel - Sass](https://parceljs.org/languages/sass/)

### Tutoriales y Guías

- [Bootstrap Theming Guide](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Compiling Bootstrap with npm](https://getbootstrap.com/docs/5.3/getting-started/download/#npm)
- [Vite Quick Start](https://vitejs.dev/guide/)

### Teoría de Color y Accesibilidad

- [Teoría de Color para Diseñadores](https://www.smashingmagazine.com/2010/02/color-theory-for-designers-part-1-the-meaning-of-color/)
- [Contraste de Color de WebAIM](https://webaim.org/resources/contrastchecker/)
- [Paletas de Color Inclusivas](https://stripe.com/docs/payments/elements/design#inclusive-color-palettes)

> **Siguiente:** [S5 - Interactividad y Componentes JavaScript →]({{ '/lessons/es/bootstrap/interactivity-js-components/' | relative_url }})