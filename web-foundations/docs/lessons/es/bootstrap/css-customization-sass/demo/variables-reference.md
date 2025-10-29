# 📘 Referencia Rápida: Variables Bootstrap Personalizables

Esta guía proporciona una referencia completa de las variables más comunes de Bootstrap que puedes personalizar.

## 🎨 Colores

### Colores de Tema Principal

```scss
// Sass Variables
$primary: #0d6efd;
$secondary: #6c757d;
$success: #198754;
$danger: #dc3545;
$warning: #ffc107;
$info: #0dcaf0;
$light: #f8f9fa;
$dark: #212529;
```

```css
/* CSS Variables */
:root {
	--bs-primary: #0d6efd;
	--bs-secondary: #6c757d;
	--bs-success: #198754;
	--bs-danger: #dc3545;
	--bs-warning: #ffc107;
	--bs-info: #0dcaf0;
	--bs-light: #f8f9fa;
	--bs-dark: #212529;
}
```

### Colores de Escala de Grises

```scss
$white: #fff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black: #000;
```

### Colores del Body

```scss
$body-bg: #fff;
$body-color: #212529;
$body-text-align: null;
```

---

## 📝 Tipografía

### Fuentes

```scss
// Sistema de fuentes
$font-family-sans-serif: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;

// Fuente base
$font-family-base: $font-family-sans-serif;
$font-family-code: $font-family-monospace;
```

### Tamaños de Fuente

```scss
// Tamaño base
$font-size-base: 1rem; // 16px por defecto

// Tamaños relativos
$font-size-sm: $font-size-base * 0.875; // 14px
$font-size-lg: $font-size-base * 1.25; // 20px

// Encabezados
$h1-font-size: $font-size-base * 2.5; // 40px
$h2-font-size: $font-size-base * 2; // 32px
$h3-font-size: $font-size-base * 1.75; // 28px
$h4-font-size: $font-size-base * 1.5; // 24px
$h5-font-size: $font-size-base * 1.25; // 20px
$h6-font-size: $font-size-base; // 16px
```

### Pesos de Fuente

```scss
$font-weight-lighter: lighter;
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-bolder: bolder;

// Peso base
$font-weight-base: $font-weight-normal;
```

### Altura de Línea

```scss
$line-height-base: 1.5;
$line-height-sm: 1.25;
$line-height-lg: 2;

// Para encabezados
$headings-line-height: 1.2;
```

---

## 📐 Espaciado

### Espaciador Base

```scss
$spacer: 1rem; // 16px
```

### Mapa de Espaciadores

```scss
$spacers: (
	0: 0,
	1: $spacer * 0.25,
	// 4px
	2: $spacer * 0.5,
	// 8px
	3: $spacer,
	// 16px
	4: $spacer * 1.5,
	// 24px
	5: $spacer * 3,
	// 48px
);
```

**Uso en HTML:**

```html
<div class="mt-3">margin-top: 1rem (16px)</div>
<div class="p-4">padding: 1.5rem (24px)</div>
<div class="mb-5">margin-bottom: 3rem (48px)</div>
```

### Espaciado Negativo

```scss
$enable-negative-margins: false; // Cambiar a true para habilitar

// Cuando está habilitado:
// mt-n1, mt-n2, etc.
```

---

## 🔲 Bordes y Radios

### Bordes

```scss
$border-width: 1px;
$border-widths: (
	1: 1px,
	2: 2px,
	3: 3px,
	4: 4px,
	5: 5px,
);

$border-style: solid;
$border-color: $gray-300;
```

### Radios de Borde

```scss
$border-radius: 0.375rem; // 6px
$border-radius-sm: 0.25rem; // 4px
$border-radius-lg: 0.5rem; // 8px
$border-radius-xl: 1rem; // 16px
$border-radius-2xl: 2rem; // 32px

// Formas especiales
$border-radius-pill: 50rem; // Completamente redondeado
```

**Uso en HTML:**

```html
<div class="rounded">border-radius: 0.375rem</div>
<div class="rounded-pill">border-radius: 50rem</div>
<div class="rounded-0">sin border-radius</div>
```

---

## 🎭 Sombras

```scss
// Sombras de caja
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15);
$box-shadow-sm: 0 0.125rem 0.25rem rgba($black, 0.075);
$box-shadow-lg: 0 1rem 3rem rgba($black, 0.175);
$box-shadow-inset: inset 0 1px 2px rgba($black, 0.075);
```

**Uso en HTML:**

```html
<div class="shadow-sm">sombra pequeña</div>
<div class="shadow">sombra normal</div>
<div class="shadow-lg">sombra grande</div>
```

---

## 🔘 Botones

### Tamaños y Espaciado

```scss
// Padding
$btn-padding-y: 0.375rem;
$btn-padding-x: 0.75rem;
$btn-font-size: $font-size-base;

// Pequeño
$btn-padding-y-sm: 0.25rem;
$btn-padding-x-sm: 0.5rem;
$btn-font-size-sm: $font-size-sm;

// Grande
$btn-padding-y-lg: 0.5rem;
$btn-padding-x-lg: 1rem;
$btn-font-size-lg: $font-size-lg;
```

### Estilos

```scss
$btn-font-weight: 400;
$btn-border-width: $border-width;
$btn-border-radius: $border-radius;

$btn-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow
		0.15s ease-in-out;
```

---

## 🃏 Tarjetas (Cards)

```scss
$card-spacer-y: 1rem;
$card-spacer-x: 1rem;
$card-border-width: $border-width;
$card-border-radius: $border-radius;
$card-border-color: rgba($black, 0.125);
$card-bg: $white;
$card-cap-bg: rgba($black, 0.03);
```

---

## 🧭 Navbar

```scss
$navbar-padding-y: 0.5rem;
$navbar-padding-x: null;

$navbar-brand-font-size: $font-size-lg;
$navbar-brand-padding-y: 0.3125rem;

$navbar-nav-link-padding-x: 0.5rem;

// Colores dark
$navbar-dark-color: rgba($white, 0.55);
$navbar-dark-hover-color: rgba($white, 0.75);
$navbar-dark-active-color: $white;

// Colores light
$navbar-light-color: rgba($black, 0.55);
$navbar-light-hover-color: rgba($black, 0.7);
$navbar-light-active-color: rgba($black, 0.9);
```

---

## 📱 Grid y Breakpoints

### Breakpoints

```scss
$grid-breakpoints: (
	xs: 0,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1200px,
	xxl: 1400px,
);
```

### Contenedores

```scss
$container-max-widths: (
	sm: 540px,
	md: 720px,
	lg: 960px,
	xl: 1140px,
	xxl: 1320px,
);

$container-padding-x: 1rem;
```

### Grid

```scss
$grid-columns: 12;
$grid-gutter-width: 1.5rem;
$grid-row-columns: 6;
```

---

## 🎯 Componentes Comunes

### Alerts

```scss
$alert-padding-y: 1rem;
$alert-padding-x: 1rem;
$alert-margin-bottom: 1rem;
$alert-border-radius: $border-radius;
$alert-border-width: $border-width;
```

### Badges

```scss
$badge-font-size: 0.75em;
$badge-font-weight: 700;
$badge-padding-y: 0.35em;
$badge-padding-x: 0.65em;
$badge-border-radius: $border-radius;
```

### Modal

```scss
$modal-inner-padding: 1rem;
$modal-dialog-margin: 0.5rem;
$modal-dialog-margin-y-sm-up: 1.75rem;
$modal-backdrop-bg: $black;
$modal-backdrop-opacity: 0.5;
```

### Forms

```scss
$input-padding-y: 0.375rem;
$input-padding-x: 0.75rem;
$input-font-size: $font-size-base;
$input-border-width: $border-width;
$input-border-color: $gray-400;
$input-border-radius: $border-radius;
$input-focus-border-color: tint-color($primary, 50%);
```

---

## 🎬 Transiciones

```scss
$transition-base: all 0.2s ease-in-out;
$transition-fade: opacity 0.15s linear;
$transition-collapse: height 0.35s ease;
```

---

## 🔧 Utilidades

### Habilitar/Deshabilitar Características

```scss
// Habilitar características opcionales
$enable-caret: true;
$enable-rounded: true;
$enable-shadows: false;
$enable-gradients: false;
$enable-transitions: true;
$enable-reduced-motion: true;
$enable-smooth-scroll: true;
$enable-grid-classes: true;
$enable-container-classes: true;
$enable-cssgrid: false;
$enable-button-pointers: true;
$enable-rfs: true;
$enable-validation-icons: true;
$enable-negative-margins: false;
$enable-deprecation-messages: true;
$enable-important-utilities: true;
```

---

## 📋 Ejemplo de Personalización Completa

### Sass

```scss
// 1. Importar funciones
@import 'bootstrap/scss/functions';

// 2. Personalizar variables
$primary: #ff6b35;
$secondary: #f7931e;

$font-family-base: 'Inter', sans-serif;
$font-size-base: 1.125rem;
$line-height-base: 1.7;

$border-radius: 0.5rem;
$border-radius-lg: 1rem;

$spacer: 1rem;
$spacers: (
	0: 0,
	1: $spacer * 0.25,
	2: $spacer * 0.5,
	3: $spacer,
	4: $spacer * 2,
	5: $spacer * 3,
	6: $spacer * 4,
);

$enable-rounded: true;
$enable-shadows: true;

// 3. Importar Bootstrap
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';
@import 'bootstrap/scss/bootstrap';

// 4. Estilos personalizados
.card {
	transition: transform 0.3s ease;
	&:hover {
		transform: translateY(-5px);
	}
}
```

### CSS Variables

```css
:root {
	/* Colores */
	--bs-primary: #ff6b35;
	--bs-secondary: #f7931e;

	/* Tipografía */
	--bs-font-sans-serif: 'Inter', sans-serif;
	--bs-body-font-size: 1.125rem;
	--bs-body-line-height: 1.7;

	/* Bordes */
	--bs-border-radius: 0.5rem;
	--bs-border-radius-lg: 1rem;
}
```

---

## 💡 Tips de Personalización

### 1. Usa Funciones de Color de Sass

```scss
$primary: #ff6b35;

// Crear variantes
$primary-light: tint-color($primary, 20%);
$primary-dark: shade-color($primary, 20%);
```

### 2. Crea Colores Personalizados

```scss
// Agregar al mapa de temas
$custom-colors: (
	'brand': #ff6b35,
	'accent': #ffcc02,
);

@import 'bootstrap/scss/variables';
$theme-colors: map-merge($theme-colors, $custom-colors);
```

### 3. Modifica Breakpoints

```scss
$grid-breakpoints: (
	xs: 0,
	sm: 576px,
	md: 768px,
	lg: 992px,
	xl: 1280px,
	// Modificado
	xxl: 1536px,
	// Modificado
);
```

### 4. Personaliza Componentes Específicos

```scss
// Solo modificar un componente
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

// Importar solo lo necesario
@import 'bootstrap/scss/buttons';
@import 'bootstrap/scss/cards';
```

---

## 🔗 Referencias

- [Variables Sass de Bootstrap (Código Fuente)](https://github.com/twbs/bootstrap/blob/main/scss/_variables.scss)
- [Documentación de Personalización](https://getbootstrap.com/docs/5.3/customize/overview/)
- [Sass Functions](https://getbootstrap.com/docs/5.3/customize/sass/#functions)

---

**💡 Tip Pro**: Abre el archivo `node_modules/bootstrap/scss/_variables.scss` en tu proyecto para ver TODAS las variables disponibles con sus valores predeterminados.
