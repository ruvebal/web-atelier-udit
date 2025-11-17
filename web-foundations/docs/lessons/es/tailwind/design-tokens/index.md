---
layout: lesson
title: 'Tailwind CSS: Design Tokens & style.css — Guía rápida'
title_alt: 'Tailwind CSS: Design Tokens & style.css — Quick Guide'
slug: tailwind-design-tokens
date: 2025-11-03
updated: 2025-11-03
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/design-tokens/
description: 'Cómo definir design tokens en Tailwind y cuándo usar style.css. Ejemplos claros y buenas prácticas.'
tags: [tailwindcss, tokens, style, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

# Design Tokens en Tailwind y su relación con style.css

> **Ejemplo:**
>
> - En Tailwind v3:
>   1. Tienes un archivo `style.css` con `@tailwind base;`, `@tailwind components;`, y `@tailwind utilities;`.
>   2. Tus design tokens (como colores y espaciados) se definen en `tailwind.config.js`.
>   3. Cuando construyes, PostCSS procesa `style.css`, y Tailwind lee tu configuración, generando clases de utilidad para esos tokens.
>
> - En Tailwind v4:
>   1. Tu `style.css` importa Tailwind con `@import "tailwindcss";`.
>   2. Tus design tokens se escriben como propiedades CSS personalizadas dentro de bloques `@theme { ... }` directamente en tu CSS.
>   3. PostCSS procesa `style.css` y Tailwind toma los tokens del bloque `@theme` para generar utilidades.

## Cómo funciona el post-procesamiento de CSS

Tailwind CSS es un **plugin de PostCSS** que transforma tu CSS durante el tiempo de construcción. Este es el flujo real:

1. **`style.css` (o `tailwind.css`)** es tu **punto de entrada** — el archivo fuente que se procesa.
2. **PostCSS** lee este archivo y ejecuta plugins en secuencia (Tailwind → Autoprefixer → cssnano).
3. **Plugin de Tailwind** lee `tailwind.config.js` (v3) o directivas `@theme` (v4) para entender qué tokens generar.
4. **Tailwind escanea** tus archivos de contenido (HTML, JS, etc.) para detectar qué clases de utilidad se usan realmente.
5. **Tailwind genera** solo las utilidades CSS que necesitas, basándose en tu configuración y uso real.
6. **Salida** es un archivo CSS procesado con todas las utilidades, estilos base y tu CSS personalizado combinados.

### La relación entre archivos

- **`style.css`**: El **archivo fuente** que PostCSS procesa. Contiene:

  - Directivas `@tailwind` (`base`, `components`, `utilities`) que indican a Tailwind dónde inyectar el CSS generado
  - Tu CSS personalizado (estilos globales, clases de componentes, sobrescrituras)
  - En v4: bloques `@theme` que definen design tokens directamente en CSS

- **`tailwind.config.js`** (v3): El **archivo de configuración** que define:

  - Design tokens (colores, espaciados, tipografía, etc.)
  - Rutas de contenido (dónde escanear para uso de clases)
  - Configuración de plugins
  - Extensiones de tema

- **`postcss.config.js`**: Define el **pipeline de procesamiento** (qué plugins se ejecutan y en qué orden)

### Tailwind v3 vs v4: Enfoques de configuración

**Tailwind CSS v3** (Recomendado: Variables CSS + Mapeo en Config):

- **Recomendado**: Tokens definidos como variables CSS en `@layer base { :root { ... } }` en `style.css`, luego referenciados en `tailwind.config.js` usando `var(--token-name)`
- **Alternativa**: Tokens definidos directamente en `tailwind.config.js` (objeto JavaScript)
- El archivo CSS importa Tailwind mediante directivas `@tailwind`
- PostCSS procesa CSS → Tailwind lee la configuración JS → genera utilidades
- **Sintaxis clave**: `@layer base { :root { --token: value; } }` en CSS + `var(--token)` en config
- Beneficios: Fuente única de verdad, flexibilidad en tiempo de ejecución, mejor soporte de herramientas

**Tailwind CSS v4** (CSS-first):

- Tokens definidos directamente en CSS usando bloques `@theme { ... }` (no se necesita envoltorio `:root`)
- No se requiere `tailwind.config.js` (aunque todavía se admite por compatibilidad)
- El archivo CSS usa `@import "tailwindcss"` y bloques `@theme { ... }`
- **Sintaxis clave**: `@theme { --token: value; }` en CSS (reemplaza `@layer base { :root { ... } }`)
- Más alineado con CSS nativo, aprovecha propiedades CSS personalizadas
- Detección de contenido sin configuración (escanea automáticamente archivos del proyecto)

**La diferencia:**

- **v3**: Usa `@layer base { :root { --token: value; } }` en CSS, luego mapea a utilidades en `tailwind.config.js`
- **v4**: Usa `@theme { --token: value; }` directamente en CSS (no se necesita `@layer base` ni `:root`)

### TL;DR

- **`style.css`** es el punto de entrada que PostCSS procesa — es donde Tailwind se invoca.
- **v3 (Recomendado)**: Define tokens como variables CSS en `style.css`, refiérelos en `tailwind.config.js`.
- **v4**: Define tokens directamente en CSS usando bloques `@theme`.
- PostCSS transforma tu archivo fuente CSS usando Tailwind como plugin.
- Tailwind genera utilidades basándose en tu configuración y uso real de clases en tus archivos de contenido.
- **Principio**: CSS contiene los valores, Tailwind los mapea a utilidades.

## Ejemplo: Configuración de Tailwind v3

### Enfoque recomendado: Variables CSS + Mapeo en Config

El patrón recomendado para Tailwind v3 es **definir tokens como variables CSS** en `style.css` y **referenciarlos** en `tailwind.config.js`. Esto proporciona una fuente única de verdad, flexibilidad en tiempo de ejecución y mejor soporte de herramientas.

### 1. Definir tokens en CSS (`style.css`)

Define los **valores** de tus design tokens como propiedades CSS personalizadas:

```css
/* style.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
	:root {
		/* ===== TOKENS DE TIPOGRAFÍA RESPONSIVA ===== */
		/* Tamaños de fuente: mínimo, preferido (basado en vw), máximo */
		--text-2xs: clamp(0.25rem, 0.3vw + 0.15em, 0.5rem);
		--text-xs: clamp(0.375rem, 0.4vw + 0.2em, 0.625rem);
		--text-sm: clamp(0.5rem, 0.5vw + 0.25em, 0.75rem);
		--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
		--text-lg: clamp(0.75rem, 0.8vw + 0.4em, 1rem);
		--text-xl: clamp(0.875rem, 1vw + 0.5em, 1.2rem);
		--text-2xl: clamp(1rem, 1.5vw + 0.8em, 1.5rem);
		--text-3xl: clamp(1.125rem, 2vw + 1em, 2rem);
		--text-4xl: clamp(1.25rem, 2.5vw + 1.2em, 2.5rem);
		--text-5xl: clamp(1.5rem, 3vw + 1.5em, 3.25rem);
		--text-6xl: clamp(1.75rem, 3.5vw + 1.8em, 4rem);
		--text-7xl: clamp(2rem, 4vw + 2em, 4.5rem);

		/* ===== TOKENS DE ALTURA DE LÍNEA ===== */
		--line-height-2xs: 1.2;
		--line-height-xs: 1.2;
		--line-height-sm: 1.35;
		--line-height-base: 1.7;
		--line-height-lg: 1.6;
		--line-height-xl: 1.35;
		--line-height-2xl: 1.25;
		--line-height-3xl: 1.2;
		--line-height-4xl: 1.15;
		--line-height-5xl: 1.1;
		--line-height-6xl: 1.05;
		--line-height-7xl: 1.05;

		/* ===== TOKENS DE ESPACIADO DE LETRAS ===== */
		--letter-spacing-xl: -0.005em;
		--letter-spacing-2xl: -0.01em;
		--letter-spacing-3xl: -0.01em;
		--letter-spacing-4xl: -0.015em;
		--letter-spacing-5xl: -0.02em;
		--letter-spacing-6xl: -0.025em;
		--letter-spacing-7xl: -0.03em;

		/* ===== TOKENS DE COLOR ===== */
		--color-primary-50: #eff6ff;
		--color-primary-500: #3b82f6;
		--color-primary-900: #1e3a8a;
		--color-surface-light: #f8fafc;
		--color-surface-dark: #1e293b;
		--color-content: #0f172a;
		--color-content-muted: #64748b;
		--color-content-inverted: #ffffff;
	}
}

/* Tus estilos de componentes personalizados */
@layer components {
	.btn-primary {
		@apply bg-primary-500 text-white px-4 py-2 rounded;
	}
}
```

### 2. Referenciar tokens en la configuración (`tailwind.config.js`)

Mapea variables CSS a utilidades de Tailwind. Puedes **sobrescribir** colores (reemplazar los predeterminados de Tailwind) o **extenderlos** (agregar nuevos colores manteniendo los predeterminados):

#### Opción A: Sobrescribir colores (Reemplazar predeterminados de Tailwind)

Cuando defines `theme.colors` (no en `extend`), reemplazas la paleta de colores predeterminada de Tailwind. Usa este patrón para preservar los predeterminados mientras sobrescribes colores semánticos específicos:

```javascript
// tailwind.config.js
import { colors as defaultColors } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		// Referenciar variables CSS para tamaños de fuente
		fontSize: {
			'2xs': ['var(--text-2xs)', { lineHeight: 'var(--line-height-2xs)' }],
			xs: ['var(--text-xs)', { lineHeight: 'var(--line-height-xs)' }],
			sm: ['var(--text-sm)', { lineHeight: 'var(--line-height-sm)' }],
			base: ['var(--text-base)', { lineHeight: 'var(--line-height-base)' }],
			lg: ['var(--text-lg)', { lineHeight: 'var(--line-height-lg)' }],
			xl: ['var(--text-xl)', { lineHeight: 'var(--line-height-xl)', letterSpacing: 'var(--letter-spacing-xl)' }],
			'2xl': ['var(--text-2xl)', { lineHeight: 'var(--line-height-2xl)', letterSpacing: 'var(--letter-spacing-2xl)' }],
			'3xl': ['var(--text-3xl)', { lineHeight: 'var(--line-height-3xl)', letterSpacing: 'var(--letter-spacing-3xl)' }],
			'4xl': ['var(--text-4xl)', { lineHeight: 'var(--line-height-4xl)', letterSpacing: 'var(--letter-spacing-4xl)' }],
			'5xl': ['var(--text-5xl)', { lineHeight: 'var(--line-height-5xl)', letterSpacing: 'var(--letter-spacing-5xl)' }],
			'6xl': ['var(--text-6xl)', { lineHeight: 'var(--line-height-6xl)', letterSpacing: 'var(--letter-spacing-6xl)' }],
			'7xl': ['var(--text-7xl)', { lineHeight: 'var(--line-height-7xl)', letterSpacing: 'var(--letter-spacing-7xl)' }],
		},
		// Sobrescribir colores: preservar predeterminados, agregar colores semánticos personalizados
		colors: {
			// Preservar los colores predeterminados de Tailwind (rojo, azul, verde, etc.)
			...defaultColors,

			// Sobrescribir/agregar colores semánticos usando variables CSS
			// Estos son comúnmente usados por bibliotecas de componentes (p. ej., shadcn/ui)
			border: 'var(--color-border)',
			input: 'var(--color-input)',
			ring: 'var(--color-ring)',
			background: 'var(--color-background)',
			foreground: 'var(--color-foreground)',

			// Colores semánticos con variantes de foreground
			// Uso: bg-primary, text-primary-foreground
			primary: {
				DEFAULT: 'var(--color-primary)',
				foreground: 'var(--color-primary-foreground)',
			},
			secondary: {
				DEFAULT: 'var(--color-secondary)',
				foreground: 'var(--color-secondary-foreground)',
			},
			destructive: {
				DEFAULT: 'var(--color-destructive)',
				foreground: 'var(--color-destructive-foreground)',
			},
			muted: {
				DEFAULT: 'var(--color-muted)',
				foreground: 'var(--color-muted-foreground)',
			},
			accent: {
				DEFAULT: 'var(--color-accent)',
				foreground: 'var(--color-accent-foreground)',
			},
			popover: {
				DEFAULT: 'var(--color-popover)',
				foreground: 'var(--color-popover-foreground)',
			},
			card: {
				DEFAULT: 'var(--color-card)',
				foreground: 'var(--color-card-foreground)',
			},
		},
		extend: {
			// Extender: Agregar nuevos colores sin reemplazar predeterminados
			// Uso: bg-surface-light, text-content-muted
			colors: {
				surface: {
					light: 'var(--color-surface-light)',
					dark: 'var(--color-surface-dark)',
				},
				content: {
					DEFAULT: 'var(--color-content)',
					muted: 'var(--color-content-muted)',
					inverted: 'var(--color-content-inverted)',
				},
			},
			// Otros tokens también pueden referenciar variables CSS
			spacing: {
				18: '4.5rem',
				88: '22rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
	plugins: [],
};
```

#### Entender `defaultColors` y la sobrescritura de colores

**`import { colors as defaultColors } from 'tailwindcss/defaultTheme'`**:

Esta sintaxis:
```js
import { colors as defaultColors } from 'tailwindcss/defaultTheme'
```
hace lo siguiente:

- Importa la paleta de colores predeterminada de Tailwind CSS (como azul, rojo, verde, gris, etc.) del tema interno de Tailwind.
- La variable `defaultColors` contendrá un objeto que incluye todos los nombres de colores estándar de Tailwind, cada uno con su rango completo de tonos (como 50, 100, 200, hasta 900), como `defaultColors.red[500]`.
- Cuando usas el operador de propagación `...defaultColors` dentro de tu configuración `theme.colors`, copia todos estos colores integrados en tu configuración. Esto significa que mantienes acceso a las clases de utilidad de colores predeterminadas de Tailwind (como `bg-blue-500`, `text-red-700`, etc.) en lugar de reemplazarlas por completo.

En resumen:
- `import { colors as defaultColors } ...` obtiene todos los objetos de colores predeterminados
- `...defaultColors` los agrega a tu propia paleta para que las clases de utilidad predeterminadas permanezcan disponibles junto con tus colores personalizados


**Sobrescritura de colores vs Extensión**:

- **`theme.colors`** (sobrescritura): Reemplaza toda la paleta de colores. Usa `...defaultColors` para preservar los predeterminados mientras agregas sobrescrituras.
- **`theme.extend.colors`** (extensión): Agrega nuevos colores sin afectar los existentes. Mejor para agregar colores de marca junto con los predeterminados.

**Patrón de color semántico** (con variantes de foreground):

```javascript
primary: {
	DEFAULT: 'var(--color-primary)',           // bg-primary, border-primary
	foreground: 'var(--color-primary-foreground)', // text-primary-foreground
},
```

Este patrón es usado por bibliotecas de componentes (como shadcn/ui) para garantizar el contraste adecuado:

- `bg-primary` + `text-primary-foreground` = texto legible garantizado en fondo primario
- Útil para botones, tarjetas y otros componentes donde el color del texto debe coincidir con el fondo

#### Opción B: Extender colores (Mantener todos los predeterminados)

Si solo quieres agregar nuevos colores sin sobrescribir, usa `extend`:

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontSize: {
			// ... tamaños de fuente ...
		},
		extend: {
			// Extender: Agrega nuevos colores, mantiene todos los predeterminados de Tailwind
			colors: {
				primary: {
					50: 'var(--color-primary-50)',
					500: 'var(--color-primary-500)',
					900: 'var(--color-primary-900)',
				},
				surface: {
					light: 'var(--color-surface-light)',
					dark: 'var(--color-surface-dark)',
				},
				// Todos los colores predeterminados de Tailwind (rojo, azul, etc.) permanecen disponibles
			},
		},
	},
};
```

### Beneficios de este enfoque

- **Fuente única de verdad**: Los valores viven en CSS, no duplicados en JavaScript
- **Mantenimiento más fácil**: Cambia valores en un solo lugar (`style.css`)
- **Flexibilidad en tiempo de ejecución**: Las variables CSS pueden cambiarse dinámicamente mediante JavaScript o media queries
- **Separación clara**: CSS = tokens (valores), Config = mapeo (utilidades)
- **Amigable para herramientas**: Las variables CSS funcionan perfectamente con las DevTools del navegador
- **Tokens responsivos**: Usa `clamp()` y unidades de viewport directamente en variables CSS

### Por qué funciona esto

1. **CSS define los design tokens** (los valores reales)
2. **La configuración de Tailwind mapea tokens a utilidades** (los nombres de clases)
3. **PostCSS procesa ambos** y genera el CSS final
4. **Principio**: CSS contiene los valores, Tailwind los mapea a utilidades

Este patrón sigue el principio: **CSS contiene los valores, Tailwind los mapea a utilidades**.

### 3. Configuración de PostCSS: `postcss.config.js`

Define el pipeline de procesamiento:

```javascript
// postcss.config.js
module.exports = {
	plugins: [
		require('tailwindcss'), // Tailwind procesa directivas @tailwind
		require('autoprefixer'), // Agrega prefijos de proveedores
		...(process.env.NODE_ENV === 'production'
			? [require('cssnano')({ preset: 'default' })] // Minifica en producción
			: []),
	],
};
```

## Ejemplo: Configuración de Tailwind v4 (CSS-first)

En Tailwind v4, defines tokens directamente en tu archivo CSS usando bloques `@theme` (no se necesita envoltorio `@layer base` ni `:root`):

```css
/* style.css */
@import 'tailwindcss';

/* Definir design tokens directamente en CSS usando @theme */
/* Nota: No se necesita envoltorio @layer base { :root { ... } } en v4 */
@theme {
	/* Colores */
	--color-primary-50: #eff6ff;
	--color-primary-500: #3b82f6;
	--color-primary-900: #1e3a8a;

	--color-surface-light: #f8fafc;
	--color-surface-dark: #1e293b;

	--color-content: #0f172a;
	--color-content-muted: #64748b;
	--color-content-inverted: #ffffff;

	/* Espaciados */
	--spacing-18: 4.5rem;
	--spacing-88: 22rem;

	/* Tipografía */
	--font-family-display: ui-sans-serif, system-ui, 'Segoe UI', Inter, Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
		sans-serif;
	--font-family-body: ui-sans-serif, system-ui, Inter, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;

	/* Radio de borde */
	--radius-4xl: 2rem;

	/* Sombra de caja */
	--shadow-elevated: 0 12px 30px -12px rgba(59, 130, 246, 0.35);
}

/* Tu CSS personalizado */
@layer components {
	.btn-primary {
		@apply bg-primary-500 text-white px-4 py-2 rounded;
	}
}
```

### Comparación lado a lado: sintaxis v3 vs v4

**Tailwind v3 (Enfoque recomendado):**

```css
@layer base {
	:root {
		--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
		--color-primary-500: #3b82f6;
	}
}
```

Luego referenciar en `tailwind.config.js`:

```javascript
fontSize: {
	base: ['var(--text-base)', { lineHeight: '1.7' }],
},
colors: {
	primary: {
		500: 'var(--color-primary-500)',
	},
},
```

**Tailwind v4:**

```css
@theme {
	--text-base: clamp(0.625rem, 0.6vw + 0.3em, 0.875rem);
	--color-primary-500: #3b82f6;
}
```

No se necesita archivo de configuración — Tailwind genera automáticamente utilidades a partir de los tokens `@theme`.

**Diferencias clave en v4:**

- **Sintaxis**: `@theme { ... }` reemplaza `@layer base { :root { ... } }`
- No se requiere `tailwind.config.js` (aunque todavía se admite por compatibilidad)
- Tokens definidos como propiedades CSS personalizadas en bloques `@theme`
- Más alineado con estándares CSS nativos
- Detección de contenido sin configuración (escanea automáticamente archivos del proyecto)

## Justificación del post-procesamiento de CSS

### ¿Por qué PostCSS?

PostCSS es una herramienta que transforma CSS usando plugins de JavaScript. No es un preprocesador (como Sass) o un postprocesador en el sentido tradicional — es un **transformador de CSS** que se ejecuta durante tu proceso de construcción.

**Beneficios del enfoque PostCSS:**

1. **Tree-shaking**: Tailwind escanea tus archivos de contenido y genera solo las utilidades que realmente usas. Esto reduce drásticamente el tamaño del archivo CSS final (de ~3MB de utilidades posibles a solo lo que necesitas, a menudo <50KB).

2. **Compilación Just-in-Time (JIT)**: En Tailwind v3+, las utilidades se generan bajo demanda basándose en tu marcado. Si escribes `bg-primary-500`, Tailwind genera esa clase específica. Si nunca usas `bg-purple-900`, nunca se genera.

3. **Ecosistema de plugins**: PostCSS permite un rico ecosistema de plugins. Tu pipeline de construcción puede incluir:

   - **Tailwind**: Genera clases de utilidad
   - **Autoprefixer**: Agrega prefijos de proveedores (`-webkit-`, `-moz-`, etc.)
   - **cssnano**: Minifica CSS para producción
   - **Plugins de PostCSS**: Transformaciones personalizadas

4. **Fuente de verdad**: Tu archivo `style.css` es el punto de entrada. PostCSS lo procesa, y la salida es un archivo CSS único y optimizado que los navegadores pueden consumir.

### El flujo del proceso de construcción

```
┌─────────────────┐
│   style.css     │  ← Archivo fuente (tú escribes esto)
│  (@tailwind...) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    PostCSS      │  ← Lee CSS, ejecuta plugins
└────────┬────────┘
         │
         ├──► Plugin de Tailwind
         │    ├── Lee tailwind.config.js (v3) o @theme (v4)
         │    ├── Escanea archivos de contenido para uso de clases
         │    └── Genera clases de utilidad
         │
         ├──► Autoprefixer
         │    └── Agrega prefijos de proveedores
         │
         └──► cssnano (solo producción)
              └── Minifica CSS
         │
         ▼
┌─────────────────┐
│  output.css     │  ← CSS procesado final (el navegador consume esto)
│  (utilidades +  │
│   tu CSS)       │
└─────────────────┘
```

### El papel de las herramientas de construcción (Vite, Webpack, Rollup, etc.)

Las herramientas de construcción como **Vite**, **Webpack** o **Rollup** orquestan todo el proceso de construcción, incluyendo el procesamiento de CSS. Así es como integran PostCSS y Tailwind:

#### Cómo las herramientas de construcción integran PostCSS

**Vite** (y la mayoría de las herramientas de construcción modernas) detecta y procesa PostCSS automáticamente:

```javascript
// vite.config.js (o vite.config.ts)
import { defineConfig } from 'vite';

export default defineConfig({
	// Vite detecta automáticamente postcss.config.js
	// ¡No se necesita configuración adicional para PostCSS!

	// Opcional: Personalizar procesamiento de CSS
	css: {
		postcss: './postcss.config.js', // Ruta explícita (opcional)
		// o configuración PostCSS inline:
		// postcss: {
		//   plugins: [
		//     require('tailwindcss'),
		//     require('autoprefixer'),
		//   ],
		// },
	},
});
```

**Cómo funciona:**

1. **Detección de importación de CSS**: Cuando Vite encuentra `import './style.css'` en tus archivos JavaScript/TypeScript, lo reconoce como una dependencia CSS.

2. **Procesamiento automático de PostCSS**: Vite automáticamente:

   - Lee `postcss.config.js` (o `postcss.config.cjs`)
   - Procesa el archivo CSS a través de plugins de PostCSS
   - Ejecuta Tailwind, Autoprefixer y otros plugins en secuencia

3. **Modo desarrollo** (`vite dev`):

   - Procesa CSS bajo demanda a medida que cambian los archivos
   - Hot Module Replacement (HMR) actualiza estilos sin recarga completa de página
   - Actualización rápida para retroalimentación instantánea

4. **Modo producción** (`vite build`):
   - Procesa todos los archivos CSS
   - Ejecuta cssnano para minificación (si está configurado)
   - Agrupa y optimiza la salida CSS
   - Genera mapas de origen (si está habilitado)

#### Flujo de construcción completo con Vite

```
┌──────────────────┐
│  main.js         │  ← Punto de entrada
│  import './style.css' │   ← CSS importado vía JS
│  O               │
│  index.html       │  ← Punto de entrada
│  <link rel="stylesheet" href="./style.css"> │   ← CSS enlazado directamente en HTML
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│     Vite         │  ← Herramienta de construcción orquesta todo
└────────┬─────────┘
         │
         ├──► Agrupación de JavaScript (esbuild/rollup)
         │
         └──► Procesamiento de CSS
              │
              ▼
         ┌──────────────────┐
         │   style.css      │  ← Vite extrae importación de CSS
         │   (@tailwind...) │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │    PostCSS       │  ← Vite invoca PostCSS
         └────────┬─────────┘
                  │
                  ├──► Plugin de Tailwind
                  │    ├── Lee tailwind.config.js
                  │    ├── Escanea archivos de contenido
                  │    └── Genera utilidades
                  │
                  ├──► Autoprefixer
                  │
                  └──► cssnano (producción)
                       │
                       ▼
         ┌──────────────────┐
         │  output.css      │  ← CSS final
         │  (o inyectado    │
         │   en <style>)    │
         └──────────────────┘
```

#### PostCSS independiente vs Integración con herramienta de construcción

**PostCSS independiente** (CLI - usado en algunas configuraciones):

```bash
# Uso directo de PostCSS CLI
postcss src/style.css -o dist/style.css

# O con modo watch
postcss src/style.css -o dist/style.css --watch
```

- Útil para generadores de sitios estáticos (Jekyll, Hugo)
- Control explícito sobre el procesamiento de CSS
- Ejecutar por separado del agrupamiento de JavaScript

**Integración con herramienta de construcción** (Vite, Webpack, Rollup):

```html
<!-- En tu index.html -->
<link rel="stylesheet" href="/style.css" />
```
O

```javascript
// En tu JavaScript/TypeScript
import './style.css'; // Vite procesa esto automáticamente
```

- Integrado en el pipeline de construcción
- Procesamiento automático cuando se importa CSS
- Soporte HMR en desarrollo
- División de código CSS en producción

#### Por qué importan las herramientas de construcción

Las herramientas de construcción como Vite proporcionan:

1. **Pipeline unificado**: JavaScript, CSS y otros recursos procesados juntos
2. **Hot Module Replacement**: Los cambios de CSS se reflejan instantáneamente en desarrollo
3. **Optimización**: División de código automática, tree-shaking y minificación
4. **Seguridad de tipos**: Soporte de TypeScript para importaciones de CSS (con plugins apropiados)
5. **Rendimiento**: Construcciones de desarrollo rápidas con esbuild, construcciones de producción optimizadas

**Ejemplo con Vite:**

```javascript
// src/main.js
import { createApp } from 'vue';
import './style.css'; // ← Vite procesa esto a través de PostCSS/Tailwind

createApp(App).mount('#app');
```

Cuando ejecutas `vite dev`, Vite:

- Procesa `style.css` a través de PostCSS (Tailwind → Autoprefixer)
- Inyecta CSS procesado en la página
- Observa cambios y actualiza vía HMR

Cuando ejecutas `vite build`, Vite:

- Procesa todas las importaciones de CSS
- Genera paquete CSS optimizado y minificado
- Extrae CSS a archivo separado (o inserta CSS pequeño)

### ¿Por qué no solo escribir CSS regular?

Podrías escribir CSS regular, pero el enfoque de Tailwind ofrece:

- **Consistencia**: Los design tokens garantizan espaciado, colores y tipografía consistentes en toda tu aplicación.
- **Mantenibilidad**: Cambia un token una vez, actualiza en todas partes donde se usa.
- **Experiencia del desarrollador**: Las clases de utilidad son más rápidas de escribir que CSS personalizado para patrones comunes.
- **Rendimiento**: Solo el CSS que usas se incluye en el paquete final.

## Buenas prácticas

### Definición de tokens

- **v3 (Recomendado)**: Define tokens como variables CSS en `style.css` (en `@layer base { :root { ... } }`), luego refiérelos en `tailwind.config.js` usando `var(--token-name)`. Esto proporciona una fuente única de verdad y flexibilidad en tiempo de ejecución.
- **v3 (Alternativa)**: Define tokens directamente en `tailwind.config.js` bajo `theme.extend`. Más simple pero menos flexible.
- **v4**: Define tokens en bloques `@theme` en tu archivo CSS. Esto se alinea con CSS nativo y hace que los tokens sean más descubribles.

### Usar tokens en marcado

- **Evita valores arbitrarios**: En lugar de `bg-[#3b82f6]`, usa `bg-primary-500` (definido en tus tokens).
- **Nomenclatura semántica**: Usa nombres como `content-muted` en lugar de `gray-500` para desacoplar el color del significado.
- **Espaciado consistente**: Usa tokens de espaciado (`p-4`, `gap-8`) en lugar de valores arbitrarios (`p-[1.5rem]`).

### CSS personalizado en style.css

Usa `style.css` para:

- **Estilos globales**: Variables `:root`, resets, estilos de elementos base
- **Clases de componentes**: Estilos de componentes reutilizables usando `@layer components`
- **Selectores complejos**: Estilos que requieren características CSS que Tailwind no cubre
- **Sobrescrituras de terceros**: Ajustar estilos de bibliotecas externas

### Proceso de construcción

- **Desarrollo**: Ejecuta PostCSS en modo watch para ver cambios inmediatamente
- **Producción**: Asegúrate de que cssnano esté habilitado para minificar la salida final
- **Rutas de contenido**: En v3, asegúrate de que `content` en `tailwind.config.js` incluya todos los archivos donde usas clases de Tailwind

---

> Siguiente: [Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})

