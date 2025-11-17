---
layout: lesson
title: 'Tailwind CSS: Guía de Implementación de Modo Oscuro — Enfoque de Codificación Crítica'
title_alt: 'Tailwind CSS: Dark Mode Implementation Guide — Critical Coding Approach'
slug: tailwind-dark-mode
date: 2025-11-03
updated: 2025-11-03
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/dark-mode/
description: 'Guía completa para implementar modo oscuro en Tailwind CSS v3+. Cubre preferencias del sistema, toggles manuales, enfoques basados en selectores, accesibilidad y migración a v4.'
tags: [tailwindcss, modo-oscuro, accesibilidad, design-tokens, pedagogía]
---

<!-- prettier-ignore-start -->

## 📋 Tabla de contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## Guía de Implementación de Modo Oscuro para Tailwind CSS v3+

## Un Enfoque de Codificación Crítica

> Esta guía sigue la metodología Web Atelier de [https://ruvebal.github.io/web-atelier-udit/methodology/es/](https://ruvebal.github.io/web-atelier-udit/methodology/es/).
> Cada sección se mueve a través de: **Exploración → Reflexión → Conceptualización → Producción → Exhibición**.
> El objetivo no es solo aprender _cómo_ implementar modo oscuro, sino entender _por qué_ estas decisiones importan para usuarios, cultura y ética.

---

## 1. Introducción: Por qué el Modo Oscuro como Decisión de Diseño Crítica

### Exploración

- Visita 3–5 sitios web que ofrezcan modo oscuro (p. ej. editores de código, blogs, dashboards).
- Observa:
  - Cómo activas el modo oscuro (sistema vs. toggle manual).
  - Si el cambio se siente cómodo, discordante o confuso.
  - Qué ocurre con el contraste, estados de foco y legibilidad.

Toma 3–4 notas por sitio. Las usarás más tarde en tu reflexión.

### Reflexión

El modo oscuro no es solo un "tema genial"; se intersecta con:

- **Accesibilidad**
  - Algunos usuarios experimentan fatiga visual o fotofobia con fondos brillantes.
  - Otros encuentran los temas oscuros de bajo contraste _más difíciles_ de leer.
  - Las reglas de contraste WCAG se aplican en _ambos_ modos.
- **Cultura y estética**
  - Las interfaces oscuras señalan estados de ánimo "profesional", "nocturno", "desarrollador" o "cinematográfico".
  - Las interfaces claras señalan "editorial", "similar a papel", "abierto".
- **Energía y medio ambiente**
  - En OLED/AMOLED, los píxeles más oscuros pueden reducir el uso de energía (aunque el impacto real varía).
- **Agencia del usuario**
  - El modo oscuro a menudo se enmarca como "preferencia del usuario", pero tú eliges los valores predeterminados y las opciones.

Pregúntate:

- ¿Quién se beneficia del modo oscuro en mi proyecto?
- ¿Quién podría quedar excluido si lo diseño mal?

### Conceptualización

Trataremos el modo oscuro como parte del **diseño inclusivo**, no como una ocurrencia decorativa:

- Proporciona al menos una paleta clara accesible y una paleta oscura accesible.
- Permite a los usuarios expresar preferencia _y_ respeta la configuración del sistema cuando sea apropiado.
- Asegura que la implementación degrade graciosamente (funciona cuando JS falla).

### Tailwind y Versiones

- Esta guía usa **Tailwind CSS v3.4+**.
- También apunta hacia conceptos de **Tailwind v4** (CSS-first, `@custom-variant`), para que tus decisiones de hoy sean más fáciles de migrar más tarde.

---

## 2. Método 1: Preferencia del Sistema (`darkMode: 'media'`)

El modo oscuro predeterminado de Tailwind usa la configuración del sistema operativo vía `prefers-color-scheme`.

### Exploración

1. En DevTools, emula la preferencia del sistema oscuro/claro:
   - Chrome: `DevTools → Rendering → Emulate CSS media feature → prefers-color-scheme`.
2. Observa tu sitio cambiando estilos cuando usas variantes `dark:`.

### Reflexión

Preguntas éticas:

- Si el SO está configurado en oscuro, ¿debería el sitio web seguir siempre?
- ¿Qué pasa si un usuario comparte un dispositivo? ¿Qué pasa si cambiaron la configuración del SO para una sola app?

Detalles técnicos:

- `darkMode: 'media'` le dice a Tailwind que compile las variantes `dark:` en un bloque `@media (prefers-color-scheme: dark)`.
- El navegador aplica automáticamente el bloque coincidente dependiendo del tema del SO.

### Conceptualización

Usa la preferencia del sistema cuando:

- Quieres **cero JavaScript**.
- Aceptas que los usuarios cambien la configuración del SO para expresar preferencia.
- El control del usuario dentro de tu sitio _no es crítico_.

Ten cuidado cuando:

- Tu audiencia puede no saber cómo cambiar las preferencias del SO.
- Quieres ofrecer control explícito dentro de la UI.

### Ejemplo

```js
// tailwind.config.js
export default {
	darkMode: 'media', // predeterminado
	// ...
};
```

```html
<main class="bg-background text-foreground dark:bg-slate-900 dark:text-slate-50">
	<h1 class="text-3xl font-bold">Hello, world</h1>
</main>
```

**Análisis crítico:**

- **Pros**: sin JS, respeta el SO, mejora progresiva.
- **Contras**: sin sobrescritura por sitio, asume configuración del SO = intención actual del usuario.

---

## 3. Método 2: Toggle Manual con Clase (`darkMode: 'class'`)

Aquí controlas el modo oscuro vía una clase `dark` en el elemento raíz.

### Exploración

Configuramos Tailwind y construimos un toggle simple.

```js
// tailwind.config.js
export default {
	darkMode: 'class', // buscar una clase .dark
	// ...
};
```

```html
<!-- index.html -->
<html lang="es" class="">
	<head>
		…
	</head>
	<body class="bg-background text-foreground">
		<button
			type="button"
			id="theme-toggle"
			class="px-4 py-2 rounded bg-primary text-primary-foreground"
			aria-pressed="false">
			Cambiar tema
		</button>
		<!-- content -->
		<script type="module" src="/src/theme-toggle.js"></script>
	</body>
</html>
```

```js
// src/theme-toggle.js
function applyThemeFromStorage() {
	const saved = localStorage.getItem('theme');
	if (!saved) return;
	document.documentElement.classList.toggle('dark', saved === 'dark');
}

function toggleTheme() {
	const root = document.documentElement;
	const isDark = root.classList.toggle('dark');
	localStorage.setItem('theme', isDark ? 'dark' : 'light');

	const btn = document.querySelector('#theme-toggle');
	if (btn) {
		btn.setAttribute('aria-pressed', String(isDark));
	}
}

applyThemeFromStorage();

const btn = document.querySelector('#theme-toggle');
if (btn) {
	btn.addEventListener('click', toggleTheme);
}
```

Y en tus utilidades HTML/CSS:

```html
<div class="bg-background text-foreground dark:bg-slate-900 dark:text-slate-50">
	<p>Contenido consciente del tema</p>
</div>
```

Copia esta estructura en tu `src/style.css` para obtener tokens claros/oscuros que coincidan con tu configuración de Tailwind.

```css
/* src/style.css: Ejemplo de definiciones de color */

@layer base {
	:root {
		/* Colores de modo claro */
		--color-background: #c4c9ce;
		--color-foreground: #305261;

		--color-primary: #009ee0;
		--color-primary-foreground: #ffffff;

		--color-secondary: #e2007a;
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #615130;
		--color-muted-foreground: #475569;

		--color-border: #e2e8f0;
		--color-input: #e2e8f0;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}

	.dark {
		/* Sobrescrituras de modo oscuro */
		--color-background: #18181b;
		--color-foreground: #fafafa;

		--color-primary: #7dd3fc;
		--color-primary-foreground: #0c0a09;

		--color-secondary: #f472b6;
		--color-secondary-foreground: #0c0a09;

		--color-accent: #fde68a;
		--color-accent-foreground: #292524;

		--color-muted: #334155;
		--color-muted-foreground: #cbd5e1;

		--color-border: #334155;
		--color-input: #475569;
		--color-ring: #a5b4fc;

		--color-destructive: #ef4444;
		--color-destructive-foreground: #fafafa;
	}
}
```

### Reflexión

Detrás de escena:

- `documentElement.classList.toggle('dark')` cambia la lista de clases del raíz.
- Todas las utilidades `dark:` ahora se aplican porque Tailwind las compiló en `.dark .some-class`.
- Si JS falla:
  - El sitio permanece en el modo que el raíz tenía inicialmente (a menudo claro).

Preguntas éticas:

- ¿Somos claros con los usuarios sobre qué hace este toggle?
- ¿Proporcionamos una forma de volver a "seguir sistema" (en lugar de forzar una elección para siempre)?

### Conceptualización

Este patrón trata sobre **agencia del usuario**:

- El sitio ya no sigue ciegamente el SO.
- Responsabilidad: ahora debes manejar persistencia y casos límite.

### Análisis crítico

- **Pros**: Control completo, modelo mental simple, funciona con cualquier marcado.
- **Contras**: Requiere JS, puede causar FOUC, puede conflictuar con otros usos de `.dark` si no se delimita cuidadosamente.

---

## 4. Método 3: Basado en Selector (`darkMode: ['selector', '[data-theme="dark"]']`)

Este es el enfoque más semántico, alineado con v4.

### Exploración

Configura Tailwind para buscar un selector específico:

```js
// tailwind.config.js
export default {
	darkMode: ['selector', '[data-theme="dark"]'],
	// ...
};
```

En HTML:

```html
<html lang="es" data-theme="light">
	<body class="bg-background text-foreground">
		<!-- ... -->
	</body>
</html>
```

Toggle JS:

```js
// src/theme-toggle-data-theme.js
function resolveInitialTheme() {
	const saved = localStorage.getItem('theme');
	if (saved === 'dark' || saved === 'light') return saved;
	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
}

function applyTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	localStorage.setItem('theme', theme);
}

(function initTheme() {
	applyTheme(resolveInitialTheme());
})();

const btn = document.querySelector('#theme-toggle');
if (btn) {
	btn.addEventListener('click', () => {
		const current = document.documentElement.getAttribute('data-theme') ?? 'light';
		applyTheme(current === 'dark' ? 'light' : 'dark');
	});
}
```

Usando la variante:

```html
<div class="bg-background text-foreground [data-theme=\"dark\"]:bg-slate-950 [data-theme=\"dark\"]:text-slate-50">
  <p>Contenido consciente del tema</p>
</div>
```

### Reflexión

¿Por qué atributos?

- `data-theme` expresa _estado_ ("este documento está en tema oscuro").
- Las clases pueden permanecer enfocadas en estilos o roles de componentes.
- Esto refleja cómo muchos sistemas de diseño gestionan el estado (p. ej. `data-state`, `data-color-mode`).

### Conceptualización

El modo oscuro basado en selector encaja en **sistemas de diseño y bibliotecas de componentes**:

- Evita colisiones accidentales con clases `.dark` no relacionadas.
- Se mapea limpiamente a la filosofía CSS-first de Tailwind v4 (donde `@custom-variant` puede definir variantes usando selectores).

### Análisis crítico

- **Pros**: Semántico, escalable, listo para v4, bajo riesgo de conflictos de clases.
- **Contras**: Sintaxis ligeramente más verbosa en HTML, requiere comprensión de selectores de atributos.

---

## 5. Implementación JavaScript: Gestión Robusta de Temas

Aquí ponemos todo junto con una estrategia robusta y ética de valores predeterminados.

### Exploración

Implementaremos:

1. Resolución de preferencia: `localStorage` → `prefers-color-scheme` → fallback.
2. Aplicación inmediata para evitar FOUC.
3. Un toggle que actualiza tanto `data-theme` como el estado ARIA.

```html
<!-- fragmento head de index.html -->
<script>
	(function () {
		try {
			const stored = localStorage.getItem('theme');
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = stored || (systemPrefersDark ? 'dark' : 'light');
			document.documentElement.setAttribute('data-theme', theme);
		} catch (e) {
			// Si algo falla (p. ej. almacenamiento bloqueado), volver a claro
			document.documentElement.setAttribute('data-theme', 'light');
		}
	})();
</script>
```

Más tarde, en un módulo:

```js
// src/theme-toggle-full.js
function getCurrentTheme() {
	return document.documentElement.getAttribute('data-theme') ?? 'light';
}

function setTheme(theme) {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		localStorage.setItem('theme', theme);
	} catch {
		// El almacenamiento podría estar deshabilitado; fallamos silenciosamente pero el tema aún funciona para esta sesión
	}
}

export function initThemeToggle(buttonSelector = '#theme-toggle') {
	const btn = document.querySelector(buttonSelector);
	if (!btn) return;

	const syncButtonState = () => {
		const isDark = getCurrentTheme() === 'dark';
		btn.setAttribute('aria-pressed', String(isDark));
		btn.textContent = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
	};

	btn.addEventListener('click', () => {
		const current = getCurrentTheme();
		setTheme(current === 'dark' ? 'light' : 'dark');
		syncButtonState();
	});

	syncButtonState();
}
```

### Reflexión

Piensa:

- ¿Qué pasa si localStorage está bloqueado? (Respuesta: el tema vuelve al sistema / predeterminado; aún funcionas.)
- ¿Qué pasa si JS falla al cargar? (Respuesta: obtienes el `data-theme` establecido por el script del head o tu HTML estático.)

Estás diseñando un sistema **resiliente**, no solo "hacer que funcione en tu máquina".

### Conceptualización

- Esto es mejora progresiva: el sitio es usable sin JS, y _mejorado_ con JS.
- Equilibras:
  - Preferencia del usuario.
  - Preferencia del sistema.
  - Fallback sensato.

---

## 6. Integración con Tokens de Color Existentes (`src/style.css`)

Tu proyecto ya usa design tokens vía propiedades CSS personalizadas. El modo oscuro simplemente cambia sus valores.

Mostraremos ambos:

- Método A: Clase `.dark`.
- Método B: Atributo `[data-theme="dark"]`.

### Exploración

Tokens de modo claro actuales (simplificados de `src/style.css`):

```css
@layer base {
	:root {
		/* Tokens de tipografía omitidos por brevedad */

		/* Tokens de color de modo claro */
		--color-background: #c4c9ce;
		--color-foreground: #305261;
		--color-card: #bbbfc4;
		--color-card-foreground: var(--color-foreground);
		--color-popover: #ffffff;
		--color-popover-foreground: var(--color-foreground);

		--color-primary: #009ee0;
		--color-primary-foreground: #ffffff;

		--color-secondary: #e2007a;
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #615130;
		--color-muted-foreground: #475569;
		--color-muted-foreground-rgb: 71, 85, 105;

		--color-border: #e2e8f0;
		--color-input: #e2e8f0;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}
}
```

### Reflexión

Idea clave:

- Los componentes nunca usan valores hex directamente.
- Usan semánticas como `bg-background`, `text-foreground`, `bg-card`, etc.
  Tailwind mapea esas clases a `var(--color-*)` vía `tailwind.config.js`.
- El modo oscuro debería _solo_ cambiar los valores `--color-*`. Los componentes simplemente siguen.

### Método A: Basado en clase (`darkMode: 'class'`)

```css
@layer base {
	:root {
		/* Modo claro (igual que antes) */
		--color-background: #c4c9ce;
		--color-foreground: #305261;
		--color-card: #bbbfc4;
		--color-card-foreground: var(--color-foreground);
		--color-popover: #ffffff;
		--color-popover-foreground: var(--color-foreground);

		--color-primary: #009ee0;
		--color-primary-foreground: #ffffff;

		--color-secondary: #e2007a;
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #615130;
		--color-muted-foreground: #475569;
		--color-muted-foreground-rgb: 71, 85, 105;

		--color-border: #e2e8f0;
		--color-input: #e2e8f0;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}

	.dark {
		/* Paleta de modo oscuro */
		--color-background: #1a1a2a;
		--color-foreground: #f8fafc;

		--color-card: #252238;
		--color-card-foreground: var(--color-foreground);

		--color-popover: #000000;
		--color-popover-foreground: var(--color-foreground);

		--color-primary: #e2007a; /* Magenta como primario */
		--color-primary-foreground: #ffffff;

		--color-secondary: #009ee0; /* Cyan como secundario */
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #305261;
		--color-muted-foreground: #94a3b8;
		--color-muted-foreground-rgb: 148, 163, 184;

		--color-border: #334155;
		--color-input: #334155;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}
}
```

**Cómo funciona**:

- Cuando `<html class="dark">` está presente, el bloque `.dark` sobrescribe las variables `:root`.
- El `bg-background` de Tailwind → `background-color: var(--color-background)` ahora usará el valor oscuro.

### Método B: Atributo de datos (`darkMode: ['selector', '[data-theme="dark"]']`)

Si eliges el método basado en selector, el CSS es casi idéntico, solo cambia el selector:

```css
@layer base {
	:root {
		/* Modo claro (igual que antes) */
		--color-background: #c4c9ce;
		--color-foreground: #305261;
		--color-card: #bbbfc4;
		--color-card-foreground: var(--color-foreground);
		--color-popover: #ffffff;
		--color-popover-foreground: var(--color-foreground);

		--color-primary: #009ee0;
		--color-primary-foreground: #ffffff;

		--color-secondary: #e2007a;
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #615130;
		--color-muted-foreground: #475569;
		--color-muted-foreground-rgb: 71, 85, 105;

		--color-border: #e2e8f0;
		--color-input: #e2e8f0;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}

	[data-theme='dark'] {
		/* Paleta de modo oscuro (igual que en el ejemplo .dark) */
		--color-background: #1a1a2a;
		--color-foreground: #f8fafc;

		--color-card: #252238;
		--color-card-foreground: var(--color-foreground);

		--color-popover: #000000;
		--color-popover-foreground: var(--color-foreground);

		--color-primary: #e2007a;
		--color-primary-foreground: #ffffff;

		--color-secondary: #009ee0;
		--color-secondary-foreground: #ffffff;

		--color-accent: #ffed00;
		--color-accent-foreground: #251260;

		--color-muted: #305261;
		--color-muted-foreground: #94a3b8;
		--color-muted-foreground-rgb: 148, 163, 184;

		--color-border: #334155;
		--color-input: #334155;
		--color-ring: #6779c7;

		--color-destructive: #e05100;
		--color-destructive-foreground: #ffffff;
	}
}
```

**Cómo funciona**:

- Cuando `<html data-theme="dark">` está presente, la regla de atributo sobrescribe las variables `:root`.
- Las clases de Tailwind aún leen `var(--color-*)`, así que los componentes se adaptan automáticamente.

### Mapeo Completo de Tokens y Configuración de Tailwind

En `tailwind.config.js`, ya mapeas estas variables:

```js
import { colors as defaultColors } from 'tailwindcss/defaultTheme';

export default {
	// darkMode puede ser 'media', 'class', o ['selector', '[data-theme="dark"]']
	theme: {
		colors: {
			...defaultColors,
			border: 'var(--color-border)',
			input: 'var(--color-input)',
			ring: 'var(--color-ring)',
			background: 'var(--color-background)',
			foreground: 'var(--color-foreground)',
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
	},
};
```

Como el mapeo siempre pasa por `var(--color-*)`, el modo oscuro es puramente una cuestión de cambiar esas variables.

### Usando Tokens Semánticos en Componentes

Ejemplo de botón que se adapta automáticamente:

```html
<button
	class="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md
         bg-primary text-primary-foreground hover:bg-primary/90
         focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
	Acción primaria
</button>
```

- En modo claro, esto usa la paleta clara.
- En modo oscuro, las mismas clases usan la paleta oscura.

Aún puedes usar variantes oscuras explícitas donde sea necesario:

```html
<section class="bg-background text-foreground dark:bg-card dark:text-card-foreground">…</section>
```

---

## 7. Accesibilidad y Buenas Prácticas: Ética en Práctica

### Exploración

Prueba tu implementación de modo oscuro con:

- Verificador de contraste de DevTools del navegador.
- axe DevTools o WAVE.
- Lectores de pantalla (VoiceOver, NVDA, JAWS).
- Simuladores de daltonismo.
- Configuraciones de alto contraste y movimiento reducido del SO.

### Reflexión

La accesibilidad no es un bonus; es un **requisito**:

- Contraste WCAG:
  - 4.5:1 para texto normal.
  - 3:1 para texto grande y componentes de UI.
- Un modo oscuro pobre puede dañar a los usuarios (fatiga visual, incapacidad para leer, desorientación).

Pregunta:

- ¿Mi paleta oscura mantiene el contraste requerido?
- ¿Los anillos de foco siguen siendo visibles en ambos modos?
- ¿El toggle de tema funciona con navegación solo por teclado y lectores de pantalla?

### Conceptualización

Principios de diseño inclusivo:

- Diseña para los bordes, no solo para el usuario "promedio".
- El modo oscuro es una acomodación para algunos, una elección estética para otros.
- Ambas experiencias deben ser robustas.

### Errores Comunes

- Olvidar estilizar estados de foco en modo oscuro.
- Usar negro puro y blanco puro, llevando a contraste duro.
- Iconos de tema crípticos sin etiqueta accesible.
- FOUC cuando el tema se aplica tarde.

### Ejercicio Crítico

Escribe una lista corta de verificación de accesibilidad para tu implementación de modo oscuro. Para cada elemento, nota:

- Cómo lo probaste.
- Qué encontraste.
- Qué cambiaste como resultado.

---

## 8. Análisis Crítico: Cuándo, Por Qué y Cuándo No

### Exploración

Analiza al menos tres sitios del mundo real:

- Uno con modo oscuro **excelente**.
- Uno con modo oscuro **problemático**.
- Uno que intencionalmente **no** ofrece modo oscuro.

Toma notas sobre:

- Paleta, contraste y movimiento.
- Cómo se presenta el toggle.
- Si la documentación explica la elección.

### Reflexión

Las decisiones de diseño son políticas:

- No ofrecer modo oscuro podría justificarse por intención de marca o artística.
- Ofrecerlo mal puede ser peor que no ofrecerlo en absoluto.
- El costo de implementación (tiempo, complejidad, QA) también es un factor.

### Conceptualización

Considera:

- ¿Tu proyecto realmente se beneficia del modo oscuro?
- ¿Quién es tu audiencia? ¿Es probable que lo necesiten/esperen?
- ¿Cómo se alinea con tu identidad de marca y narrativa?

### Preguntas Críticas

- ¿Tu proyecto **necesita** modo oscuro? Justifica en 5–10 oraciones.
- ¿Qué suposiciones estás haciendo sobre las habilidades, entornos y dispositivos de tus usuarios?
- ¿Qué pasa en tu implementación cuando:
  - ¿JS falla?
  - ¿localStorage no está disponible?
  - ¿El usuario cambia el tema del SO a mitad de sesión?

### Mejora Progresiva

Incluso si usas toggles JS, asegúrate:

- Un tema claro usable y de alto contraste funciona sin JS.
- `prefers-color-scheme` aún puede actuar como una pista.

---

## 8.5. Guía Rápida de Implementación: Método 2 en Práctica

### Experiencia de Implementación Real

Basado en implementar el Método 2 (modo oscuro basado en clase) en este repositorio, aquí hay una guía paso a paso probada en batalla:

#### Paso 1: Configurar Tailwind (2 minutos)

Agrega `darkMode: 'class'` a tu `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
	darkMode: 'class', // Agrega esta línea
	theme: {
		// ... resto de tu configuración
	},
};
```

#### Paso 2: Agregar Tokens de Color de Modo Oscuro (5 minutos)

En `src/style.css`, agrega un bloque `.dark` después de tus colores `:root`:

```css
@layer base {
	:root {
		/* Tus colores de modo claro existentes */
		--color-background: #c4c9ce;
		--color-foreground: #305261;
		/* ... todos tus otros tokens ... */
	}

	/* Sobrescrituras de modo oscuro */
	.dark {
		--color-background: #1a1a2a;
		--color-foreground: #f8fafc;
		--color-card: #252238;
		--color-primary: #e2007a;
		--color-secondary: #009ee0;
		--color-accent: #ffed00;
		--color-muted: #305261;
		--color-muted-foreground: #94a3b8;
		--color-border: #334155;
		--color-input: #334155;
		--color-ring: #6779c7;
		--color-destructive: #e05100;
		/* Mapea todos tus tokens con valores apropiados para oscuro */
	}
}
```

**Consejo de diseño**: Para fondos oscuros, usa `#1a1a2a` (azul-púrpura profundo) en lugar de negro puro para mejor legibilidad.

#### Paso 3: Crear Módulo de Toggle de Tema (10 minutos)

Crea `src/theme-toggle.js`:

```js
/**
 * Resolver tema inicial: localStorage > preferencia del sistema > predeterminado
 */
function resolveInitialTheme() {
	try {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') return stored;
	} catch (e) {
		console.warn('localStorage no disponible:', e);
	}

	const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	return prefersDark ? 'dark' : 'light';
}

/**
 * Aplicar tema y persistir
 */
function applyTheme(theme) {
	const root = document.documentElement;

	if (theme === 'dark') {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}

	try {
		localStorage.setItem('theme', theme);
	} catch (e) {
		console.warn('localStorage no disponible:', e);
	}
}

/**
 * Alternar entre temas
 */
function toggleTheme() {
	const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
	const newTheme = current === 'dark' ? 'light' : 'dark';
	applyTheme(newTheme);
	syncButtonState();
}

/**
 * Sincronizar estado ARIA y contenido del botón
 */
function syncButtonState() {
	const btn = document.querySelector('#theme-toggle');
	if (!btn) return;

	const isDark = document.documentElement.classList.contains('dark');
	btn.setAttribute('aria-pressed', String(isDark));
	btn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');

	const icon = isDark ? '☀️' : '🌙';
	const text = isDark ? 'Modo claro' : 'Modo oscuro';
	btn.innerHTML = `<span aria-hidden="true">${icon}</span> <span class="sr-only sm:not-sr-only">${text}</span>`;
}

/**
 * Inicializar toggle de tema
 */
export function initThemeToggle() {
	const initialTheme = resolveInitialTheme();
	applyTheme(initialTheme);

	const btn = document.querySelector('#theme-toggle');
	if (btn) {
		btn.addEventListener('click', toggleTheme);
		syncButtonState();
	}

	// Escuchar cambios de preferencia del sistema
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		try {
			const stored = localStorage.getItem('theme');
			if (!stored) {
				applyTheme(e.matches ? 'dark' : 'light');
				syncButtonState();
			}
		} catch (err) {
			// Ignorar errores de localStorage
		}
	});
}
```

#### Paso 4: Agregar Botón Toggle a HTML (3 minutos)

En tu navegación (`index.html`), agrega:

```html
<button
	type="button"
	id="theme-toggle"
	class="px-3 py-2 rounded-md bg-background text-foreground
	       hover:bg-background/80 focus:outline-none focus:ring-2
	       focus:ring-ring focus:ring-offset-2 transition-colors"
	aria-pressed="false"
	aria-label="Cambiar tema">
	🌙
	<span class="sr-only sm:not-sr-only">Modo oscuro</span>
</button>
```

**Nota de accesibilidad**: Usamos `aria-pressed` para indicar el estado del toggle, y proporcionamos tanto iconos como etiquetas de texto.

#### Paso 5: Inicializar en Tu App (1 minuto)

En `src/main.js`, importa e inicializa:

```js
import { initThemeToggle } from './theme-toggle.js';

// Después de tus otras inicializaciones
initThemeToggle();
```

#### Paso 6: Probar (5 minutos)

**Antes de probar, inicia tu servidor de desarrollo:**

```bash
npm run dev
```

Ahora sigue estas pruebas en orden:

1. **Prueba visual**:

   - Haz clic en el botón de toggle de tema en la navegación (lado derecho, junto a los enlaces de navegación)
   - Todos los colores deberían invertirse suavemente
   - El icono del botón debería cambiar de 🌙 a ☀️ (o viceversa)

2. **Prueba de persistencia**:

   - Actualiza la página (F5 o Cmd+R / Ctrl+R)
   - El tema debería permanecer como lo estableciste
   - El estado del botón debería coincidir con el tema actual

3. **Prueba de accesibilidad por teclado**:

   - Tab al botón con el teclado (tecla Tab)
   - Presiona Enter o Espacio para alternar
   - El tema debería cambiar y el foco debería permanecer en el botón
   - El botón debería ser claramente visible con anillo de foco

4. **Prueba de preferencia del sistema**:

   - Abre la consola del navegador (F12 → pestaña Console)
   - Ejecuta: `localStorage.clear()`
   - Cambia el tema de tu SO (Configuración del Sistema → Apariencia)
   - Recarga la página
   - El sitio ahora debería seguir tu preferencia del SO

5. **Verificación de contraste**:

   - Abre Chrome DevTools (F12)
   - Ve a la pestaña Elements
   - Selecciona cualquier elemento de texto
   - Abre el panel de Accesibilidad (en la barra lateral derecha)
   - Verifica las proporciones de contraste:
     - Texto normal: mínimo 4.5:1
     - Texto grande (18px+): mínimo 3:1
   - Prueba en ambos modos claro y oscuro

6. **Prueba de lector de pantalla** (opcional pero recomendado):

   - Usa VoiceOver (Mac) o NVDA (Windows)
   - Navega al botón de toggle
   - Verifica que las etiquetas ARIA se anuncien correctamente
   - El toggle debería anunciar el estado actual ("presionado" o "no presionado")

7. **Prueba de caso límite**:
   - En DevTools, deshabilita JavaScript (Configuración → Preferencias → Depurador → Deshabilitar JavaScript)
   - Recarga la página
   - El sitio debería permanecer en modo claro pero seguir siendo completamente usable
   - Todo el contenido debería ser legible

### Errores Comunes y Soluciones

**Error 1: FOUC (Flash of Unstyled Content)**

- **Problema**: Ves el modo claro brevemente antes de que se aplique el modo oscuro.
- **Solución**: Aplica el tema en `initThemeToggle()` inmediatamente, antes de que el DOM esté completamente listo. La función se ejecuta tan pronto como se carga el módulo.

**Error 2: El estado del botón toggle no se sincroniza**

- **Problema**: El botón muestra el icono incorrecto después del toggle.
- **Solución**: Siempre llama a `syncButtonState()` después de `applyTheme()`.

**Error 3: El tema no persiste**

- **Problema**: El tema se restablece al actualizar.
- **Solución**: Verifica que `localStorage.setItem()` esté funcionando. Algunos navegadores lo bloquean en modo privado. Nuestro código maneja esto con try/catch.

**Error 4: Contraste pobre en modo oscuro**

- **Problema**: El texto es difícil de leer.
- **Solución**: Prueba con el verificador de contraste de Chrome DevTools. Apunta a 4.5:1 como mínimo. Evita fondos de negro puro (`#000`)—usa `#1a1a2a` en su lugar.

### Inversión de Tiempo

- **Configuración**: 20-30 minutos para la primera implementación
- **Pruebas**: 10-15 minutos para pruebas exhaustivas de accesibilidad
- **Pulido**: 5-10 minutos para ajustar colores a tu marca

**Total**: ~1 hora para un modo oscuro listo para producción.

### Lo Que Obtienes

✓ Toggle suave de modo oscuro/claro
✓ Respeta las preferencias del sistema como predeterminado
✓ Persiste la elección del usuario entre sesiones
✓ Completamente accesible por teclado
✓ Compatible con lectores de pantalla
✓ Degradación graciosa sin JS
✓ Cambio automático de tokens de color

---

## 9. Producción: Implementar Modo Oscuro en Tu Portafolio

Aquí conectamos todo a tu propio proyecto.

### Exploración (Paso a paso)

1. **Elige una estrategia**: `media`, `class`, o `selector` (`[data-theme="dark"]`).
   Para proyectos nuevos, prefiere el enfoque basado en selector (amigable con v4).
2. **Configura Tailwind** en consecuencia.
3. **Extiende `src/style.css`** con mapeos completos de tokens de modo oscuro (usando `.dark` o `[data-theme="dark"]`).
4. **Construye un botón toggle** con:
   - Etiqueta clara.
   - Atributos ARIA apropiados (`aria-pressed`, texto accesible).
5. **Implementa JS**:
   - Resuelve tema inicial (localStorage → sistema → fallback).
   - Persiste preferencia.
   - Evita FOUC.
6. **Prueba**:
   - Accesibilidad.
   - Casos límite.

### Reflexión

Documenta:

- Por qué elegiste tu estrategia (media/class/selector).
- Cómo tus elecciones de paleta apoyan legibilidad y marca.
- Qué compensaciones aceptaste (complejidad vs. control).

### Conceptualización

Conecta tu implementación a:

- Temas del curso (codificación crítica, diseño inclusivo).
- Flujos de trabajo profesionales (mensajes de commit, documentación, revisión de código).

### Exhibición

- Haz commit de tus cambios con un mensaje de commit **reflexivo**, p. ej.:

  > `feat(theme): implementar modo oscuro vía selector data-theme` > `Se alinea con patrones de Tailwind v4, usa tokens CSS para paleta.` > `Probado contraste en ambos modos y verificado toggle con VoiceOver.`

- Prepara 3–5 capturas de pantalla o un screencast corto demostrando:
  - Antes/después.
  - Toggle en acción.
  - Herramientas de accesibilidad en uso.

---

## 10. Ruta de Migración a Tailwind v4

Tailwind v4 mueve la configuración a CSS y fomenta `@custom-variant` para variantes.

Conceptualmente:

- Tu modo oscuro **basado en selector** ya se alinea con:
  - `@custom-variant dark (&[data-theme="dark"] &);`
  - Flujos de trabajo CSS-first.
- Tu paleta **basada en tokens** (`--color-*`) funciona naturalmente con cualquier herramienta futura.

Al migrar:

- Re-expresa `dark` como una variante personalizada usando el mismo selector `[data-theme="dark"]`.
- Mantén las mismas variables CSS; solo cambian las conexiones.

---

## Notas de Implementación (Metodología de Codificación Crítica)

- Esta guía está diseñada para aprendizaje incremental basado en proyectos: un estudiante, un repo, un portafolio en evolución.
- Cada sección intencionalmente mezcla:
  - **Exploración**: probar cosas de forma práctica.
  - **Reflexión**: preguntar por qué funcionan y a quién afectan.
  - **Conceptualización**: conectar código a diseño y ética.
  - **Producción**: implementar en tu propio repositorio.
  - **Exhibición**: publicar y documentar tu trabajo.
- Usa esta guía no solo para "hacer modo oscuro", sino para:
  - Practicar escribir mensajes de commit significativos.
  - Practicar documentar decisiones de diseño.
  - Construir una interfaz accesible, mantenible y considerada éticamente.

---

> Siguiente: [Componentes y Sistema de Diseño →]({{ '/lessons/es/tailwind/components-design-system/' | relative_url }})

