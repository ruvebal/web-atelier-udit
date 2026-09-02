---
layout: lesson
title: 'Portfolio SPA con Tailwind — Guía de Arquitectura'
title_alt: 'Tailwind Portfolio SPA — Architecture Guide'
slug: tailwind-portfolio-spa-architecture
date: 2025-09-10
updated: 2025-10-07
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/tailwind/portfolio-template/
description: 'Guía de arquitectura del portafolio como Single Page Application (SPA) con Tailwind, cubriendo estilos, ruteo, animaciones, ciclo de vida y despliegue.'
tags: [tailwindcss, spa, arquitectura, routing, gsap]
---

# 🎓 Portfolio SPA — Guía de Arquitectura

> _"La desarrolladora maestra escribe código que se explica solo, pero documenta el **por qué** de sus decisiones."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

Esta guía explica la arquitectura de nuestro portafolio como **Single Page Application (SPA)**, cubriendo cuatro sistemas interconectados: **estilos con Tailwind CSS**, **ruteo basado en hash**, **animaciones con GSAP** y **gestión del ciclo de vida**.

---

## Tabla de contenidos

1. [El sistema de estilos: Tailwind CSS 4](#1-el-sistema-de-estilos-tailwind-css-4)
2. [El router: navegación basada en hash](#2-el-router-navegacion-basada-en-hash)
3. [El motor de animación: GSAP & ScrollTrigger](#3-el-motor-de-animacion-gsap--scrolltrigger)
4. [El ciclo de vida: hooks de montaje y desmontaje](#4-el-ciclo-de-vida-hooks-de-montaje-y-desmontaje)
5. [Ejercicios de pensamiento crítico](#5-ejercicios-de-pensamiento-critico)

---

## 1. El sistema de estilos: Tailwind CSS 4

> _"Mil clases utilitarias, pero fluyen como un solo río. La desarrolladora sabia nombra las cosas por su propósito, no por su apariencia."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 1.1 ¿Qué es Tailwind CSS?

Tailwind es un **framework CSS utility-first**. En lugar de escribir CSS personalizado, compones estilos directamente en tu HTML usando clases predefinidas.

```html
<!-- Enfoque tradicional con CSS -->
<button class="my-button">Click me</button>
<style>
	.my-button {
		background-color: blue;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
	}
</style>

<!-- Enfoque con Tailwind -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">Click me</button>
```

**¿Por qué utility-first?**

- No hay cambio de contexto constante entre archivos HTML y CSS
- No necesitas inventar nombres de clase como `.card-wrapper-inner-container`
- Los estilos están **co-localizados** con el marcado que afectan
- La eliminación de CSS no utilizado es automática

### 1.2 Arquitectura CSS modular (patrón "barrel")

Nuestro proyecto organiza el CSS usando un **patrón barrel** — un único punto de entrada que importa todos los módulos:

```
src/styles/
├── index.css              ← Punto de entrada (el "barrel")
├── theme.css              ← Configuración @theme de Tailwind 4
└── tokens/
    ├── typography.css     ← Tamaños de fuente, alturas de línea
    ├── colors.css         ← Paleta para modo claro
    ├── colors-dark.css    ← Overrides para modo oscuro
    └── spacing.css        ← Espaciado, radios, sombras
```

> _"Separa lo que cambia por razones diferentes. Los colores cambian con la marca. La tipografía cambia por cuestiones de legibilidad. Deben vivir separados."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

#### El punto de entrada (`index.css`)

```css
/* ¡El orden de importación importa! */
@import 'tailwindcss'; /* 1. Framework base */
@import './theme.css'; /* 2. Configuración de tema */
@import './tokens/typography.css'; /* 3. Design tokens */
@import './tokens/colors.css';
@import './tokens/colors-dark.css';
@import './tokens/spacing.css';
```

**Pregunta crítica:** _¿Por qué importa el orden de importación?_

Respuesta: Las importaciones posteriores pueden sobreescribir a las anteriores. Los estilos base de Tailwind deben ir primero para que nuestros tokens puedan construirse sobre ellos.

### 1.3 Design tokens: la única fuente de verdad

Los design tokens son **valores con nombre** que representan decisiones de diseño:

```css
/* tokens/colors.css */
@layer base {
	:root {
		--color-primary: #0052a3; /* ← El token */
		--color-primary-foreground: #ffffff;
	}
}
```

Luego **referenciamos** estos tokens en el bloque `@theme` de Tailwind:

```css
/* theme.css */
@theme {
	--color-primary: var(--color-primary); /* Tailwind lee este valor */
}
```

**Resultado:** ¡Puedes usar las clases `bg-primary` y `text-primary` en cualquier parte!

```html
<button class="bg-primary text-primary-foreground">This button uses our design tokens</button>
```

### 1.4 Modo oscuro: el intercambio de variables CSS

El modo oscuro funciona **redefiniendo variables CSS** bajo una clase `.dark`:

```css
/* Modo claro (por defecto) */
:root {
	--color-background: #e5e7eb; /* Gris claro */
	--color-foreground: #0f172a; /* Texto oscuro */
}

/* Modo oscuro */
.dark {
	--color-background: #0a0a0a; /* Casi negro */
	--color-foreground: #fafafa; /* Texto claro */
}
```

Cuando JavaScript activa o desactiva la clase `dark` en `<html>`:

```javascript
document.documentElement.classList.toggle('dark');
```

¡Todos los componentes que usan `bg-background` y `text-foreground` se actualizan automáticamente!

> _"El sistema sabio cambia muchas cosas cambiando una sola cosa."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

---

## 2. El router: navegación basada en hash

> _"La URL es un contrato con la persona usuaria. Si lo rompes, no podrá volver a donde estaba."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 2.1 ¿Qué es el ruteo basado en hash?

En una Single Page Application no recargamos la página al navegar. En su lugar:

1. Escuchamos cambios en la URL
2. Intercambiamos el contenido dinámicamente
3. Actualizamos el historial del navegador

El **ruteo basado en hash** usa el fragmento de la URL (`#`) para la navegación:

```
https://mysite.com/#/about    ← Ruta: /about
https://mysite.com/#/contact  ← Ruta: /contact
https://mysite.com/#/#gallery ← Ruta: / con sección: gallery
```

**¿Por qué el hash?**

- El navegador no envía los cambios de hash al servidor
- No se necesita configuración especial en el servidor
- Funciona en hosting estático (GitHub Pages, Netlify)

### 2.2 La clase `SimpleRouter`

```javascript
export class SimpleRouter {
	constructor(routes) {
		this.routes = routes;
		this.currentView = null;

		// Escuchar eventos de navegación
		window.addEventListener('hashchange', () => this.handleRoute());
		window.addEventListener('load', () => this.handleRoute());
	}
}
```

**Flujo de eventos:**

```
Persona usuaria hace clic en un enlace (#/about)
        ↓
El navegador lanza el evento 'hashchange'
        ↓
El router llama a handleRoute()
        ↓
El router encuentra la configuración de ruta correspondiente
        ↓
El router llama a onUnmount() en la vista anterior
        ↓
El router obtiene y renderiza la nueva plantilla
        ↓
El router llama a onMount() en la nueva vista
```

### 2.3 Configuración de rutas

Las rutas se definen como un objeto plano:

```javascript
export const views = {
	'/': {
		templateId: 'view-home',
		templateUrl: './src/views/home.html',
		onMount: (container) => {
			initScrollView(container); // Inicializa animaciones
		},
		onUnmount: () => {
			cleanupScrollView(); // Limpia animaciones
		},
	},
	'/about': {
		templateId: 'view-about',
		templateUrl: './src/views/about.html',
	},
	404: {
		templateId: 'view-404',
		templateUrl: './src/views/404.html',
	},
};
```

**Anatomía de una ruta:**

| Propiedad     | Propósito                                      |
| ------------- | ---------------------------------------------- |
| `templateId`  | ID del elemento `<template>`                   |
| `templateUrl` | Ruta desde la que se carga la plantilla        |
| `onMount`     | Función llamada después de renderizar          |
| `onUnmount`   | Función llamada antes de abandonar la vista    |

### 2.4 Gestión de navegación por secciones

Un reto: ¿cómo combinamos el ruteo por hash (`#/about`) con anclas dentro de la página (`#gallery`)?

**Solución:** parsear el hash en ruta + sección:

```javascript
async handleRoute() {
  const fullHash = window.location.hash.slice(1) || '/';
  // "//#gallery" → ruta: "/", sección: "gallery"
  const [routeHash, sectionHash] = fullHash.split('#');
  const hash = routeHash || '/';

  // Navegar a la ruta...

  // Y luego hacer scroll a la sección si se especifica
  if (sectionHash) {
    const section = document.querySelector(`#${sectionHash}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
```

> _"Cuando dos sistemas deben coexistir, encuentra la costura donde pueden comunicarse."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

---

## 3. El motor de animación: GSAP & ScrollTrigger

> _"La animación sin propósito es decoración. La animación con propósito es comunicación."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 3.1 ¿Qué es GSAP?

**GSAP** (GreenSock Animation Platform) es una librería profesional de animación en JavaScript. Nos ofrece:

- Animaciones fluidas y con buen rendimiento
- Secuencias con timelines
- Disparadores basados en scroll
- Un ecosistema de plugins

### 3.2 Registro de plugins

GSAP usa una arquitectura de plugins. Registramos los plugins una vez al cargar el módulo:

```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
```

| Plugin           | Propósito                                          |
| ---------------- | -------------------------------------------------- |
| `ScrollTrigger`  | Disparar animaciones según la posición del scroll |
| `ScrollToPlugin` | Hacer scroll suave hacia elementos                |

### 3.3 La animación "fade-up"

Los elementos con `data-animate="fade-up"` se animan al entrar en la vista:

```javascript
initFadeUp(container) {
  const elements = gsap.utils.toArray(
    container.querySelectorAll('[data-animate="fade-up"]')
  );

  elements.forEach((el) => {
    // Estado inicial: invisible, desplazado hacia abajo
    gsap.set(el, { opacity: 0, y: 40 });

    // Animación: visible, en su posición original
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,           // Elemento que dispara la animación
        start: 'top 85%',      // Cuando la parte superior llega al 85% del viewport
        toggleActions: 'play none none none'
      }
    });
  });
}
```

**En HTML:**

```html
<h2 data-animate="fade-up">This heading fades up when scrolled into view</h2>
```

### 3.4 El efecto parallax

El parallax crea sensación de profundidad moviendo elementos a diferentes velocidades:

```javascript
initParallax(container) {
  container.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.2;

    gsap.to(el, {
      yPercent: -100 * speed,  // Se mueve hacia arriba mientras la persona hace scroll hacia abajo
      ease: 'none',            // Movimiento lineal
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom',   // Empieza cuando el padre entra en el viewport
        end: 'bottom top',     // Termina cuando el padre sale
        scrub: true            // Vincula la animación a la posición del scroll
      }
    });
  });
}
```

**En HTML:**

```html
<div class="relative overflow-hidden">
	<img data-parallax="0.3" src="background.jpg" alt="Parallax background" />
</div>
```

**Entendiendo `scrub: true`:**

| Valor de `scrub` | Comportamiento                                         |
| ---------------- | ------------------------------------------------------ |
| `false`          | La animación se ejecuta una vez cuando se dispara     |
| `true`           | La posición de la animación sigue la del scroll       |
| `0.5`            | La animación sigue el scroll con suavizado de 0.5 s   |

### 3.5 Aparición escalonada de tarjetas

Varios elementos aparecen con un retardo en cascada:

```javascript
initProjectCards(container) {
  const cards = container.querySelectorAll('.project-card');

  // Estado inicial
  gsap.set(cards, { y: 50, opacity: 0 });

  // Animación en lote con stagger
  ScrollTrigger.batch(cards, {
    onEnter: (batch) => {
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,  // 120 ms de retraso entre cada una
        ease: 'power2.out'
      });
    },
    start: 'top 90%',
    once: true  // Solo se anima una vez
  });
}
```

> _"El stagger es el ritmo. Demasiado rápido se siente caótico. Demasiado lento se siente pesado. Encuentra la respiración entre cada golpe."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 3.6 Respetar las preferencias de la persona usuaria

Siempre comprueba la preferencia de reducción de movimiento:

```javascript
const config = {
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

init(container) {
  if (config.reducedMotion) {
    console.log('⚠️ Reduced motion detected — animations disabled');
    this.showAllElements(container);  // Mostrar sin animaciones
    return;
  }
  // ... continuar con las animaciones
}
```

**Por qué importa:**

- Algunas personas experimentan mareos o malestar con el movimiento
- La accesibilidad no es opcional
- El sistema operativo expone esta preferencia — hay que respetarla

---

## 4. El ciclo de vida: hooks de montaje y desmontaje

> _"Todo recurso adquirido debe ser liberado. Todo listener añadido debe ser eliminado. Así evitamos pérdidas de memoria."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 4.1 El problema

En una SPA, las vistas se crean y destruyen dinámicamente. Sin una limpieza adecuada:

- Los event listeners se acumulan
- Las animaciones siguen ejecutándose sobre elementos eliminados
- El uso de memoria crece indefinidamente

### 4.2 La solución: hooks de ciclo de vida

```javascript
// Definición de ruta con hooks de ciclo de vida
'/': {
  templateId: 'view-home',
  templateUrl: './src/views/home.html',
  onMount: (container) => {
    // Llamado DESPUÉS de renderizar la vista
    initScrollView(container);
  },
  onUnmount: () => {
    // Llamado ANTES de navegar a otra ruta
    cleanupScrollView();
  }
}
```

**Flujo:**

```
Navegar a /about
        ↓
El router llama a home.onUnmount()
        ↓
cleanupScrollView() se ejecuta:
  - ScrollTrigger.getAll().forEach(t => t.kill())
  - gsap.killTweensOf('*')
        ↓
El router renderiza about.html
        ↓
El router llama a about.onMount() (si está definido)
```

### 4.3 La función de limpieza

```javascript
export function cleanupScrollView() {
	// Eliminar todas las instancias de ScrollTrigger
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

	// Detener todas las animaciones de GSAP
	gsap.killTweensOf('*');

	console.log('🧹 Scroll view cleaned up');
}
```

### 4.4 Gestión de event listeners

El módulo de navegación lleva un registro de sus event listeners para poder limpiarlos:

```javascript
const navigation = {
	eventListeners: [], // Seguir la pista de todos los listeners

	initSmoothScroll(container) {
		const clickHandler = (e) => {
			/* ... */
		};

		anchor.addEventListener('click', clickHandler);

		// Guardar la referencia para limpiarla después
		this.eventListeners.push({
				 element: anchor,
				 event: 'click',
				 handler: clickHandler,
		});
	},

	destroy() {
		// Eliminar todos los listeners almacenados
		this.eventListeners.forEach(({ element, event, handler }) => {
				 element.removeEventListener(event, handler);
		});
		this.eventListeners = [];
	},
};
```

> _"La persona principiante añade listeners. Quien está en el camino los elimina. La maestra los registra desde el momento de su creación."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

---

## 5. Despliegue: CI/CD con GitHub Actions

> _"Automatiza lo tedioso. El pipeline debe ser invisible hasta que falle."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 5.1 El pipeline de despliegue

Nuestra aplicación usa GitHub Actions para construir y desplegar automáticamente en GitHub Pages:

```
Push a main
     ↓
Se dispara GitHub Actions
     ↓
Instalar dependencias (npm ci)
     ↓
Build con Vite (npm run build)
     ↓
Subir dist/ como artefacto
     ↓
Desplegar a GitHub Pages
     ↓
Sitio en vivo en https://username.github.io/repo-name/
```

### 5.2 Puntos clave de configuración

| Archivo                        | Propósito                               |
| ------------------------------ | --------------------------------------- |
| `.github/workflows/deploy.yml` | Definición del pipeline de CI/CD       |
| `vite.config.js`               | Configuración de build y ruta `base`   |

### 5.3 El problema de la ruta base

GitHub Pages sirve tu sitio desde un subdirectorio:

- **Local:** `http://localhost:5173/`
- **Producción:** `https://user.github.io/portafolio-tailwind/`

**Solución:** ruta base dinámica en Vite:

```javascript
base: process.env.NODE_ENV === 'production' ? '/repo-name/' : '/';
```

Sin esto, todas las rutas de los assets se rompen porque el navegador busca:

- ❌ `https://user.github.io/assets/main.js` (incorrecto)
- ✅ `https://user.github.io/portafolio-tailwind/assets/main.js` (correcto)

### 5.4 Carga de plantillas en producción

Como nuestro router carga plantillas HTML dinámicamente, debemos asegurarnos de que estén disponibles en producción:

1. **Opción A:** Copiar las plantillas al directorio `public/`
2. **Opción B:** Usar `vite-plugin-static-copy` para incluirlas en el build
3. **Opción C:** Usar `import.meta.env.BASE_URL` para construir rutas correctas

> _"La ruta que funciona en desarrollo también debe funcionar en producción. Prueba el build localmente antes de desplegar."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

### 5.5 Por qué `npm ci` en CI/CD

| Comando       | Caso de uso                                          |
| ------------- | ---------------------------------------------------- |
| `npm install` | Desarrollo (actualiza `package-lock.json`)          |
| `npm ci`      | CI/CD (falla si `package-lock.json` no coincide)    |

`npm ci` garantiza:

- Builds reproducibles
- Instalaciones más rápidas (omite la resolución de dependencias)
- Fallos tempranos si las dependencias están desincronizadas

### 5.6 Estructura del workflow

```yaml
jobs:
 build:
  # Instalar, construir, subir artefacto
 deploy:
  # Desplegar el artefacto a GitHub Pages
```

**¿Por qué separar jobs?**

- Separación clara de responsabilidades
- Permite añadir tests entre build y deploy
- Facilita depurar fallos

> _"El pipeline que es fácil de entender es fácil de arreglar."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

**Para instrucciones completas de despliegue, consulta:** [`docs/DEPLOYMENT_PLAN.md`](./DEPLOYMENT_PLAN.md)

---

## 6. Ejercicios de pensamiento crítico

### Ejercicio 1: El reto de los tokens

Observa este código de `colors.css`:

```css
--color-primary: #0052a3;
--color-primary-foreground: #ffffff;
```

**Preguntas:**

1. ¿Por qué tenemos variantes `-foreground`?
2. ¿Qué ocurre si `primary` cambia a un amarillo muy claro?
3. ¿Cómo resuelve este problema la paleta de modo oscuro?

### Ejercicio 2: El misterio del router

Dada esta URL: `http://localhost:5173/#/about#team`

**Preguntas:**

1. ¿Qué ruta coincidirá con el router?
2. ¿A qué sección hará scroll?
3. ¿Qué pasa si hacemos clic en un enlace a `#team` mientras estamos en `/contact`?

### Ejercicio 3: Auditoría de animaciones

```javascript
gsap.to(el, {
	opacity: 1,
	y: 0,
	duration: 0.8,
	ease: 'power2.out',
	scrollTrigger: {
		trigger: el,
		start: 'top 85%',
		toggleActions: 'play none none none',
	},
});
```

**Preguntas:**

1. ¿Qué significa `start: 'top 85%'` en lenguaje cotidiano?
2. ¿Qué representan los cuatro valores de `toggleActions`?
3. ¿Por qué usar `power2.out` en lugar de `linear`?

### Ejercicio 4: Caza de memory leaks

```javascript
element.addEventListener('click', () => {
	console.log('clicked');
});
```

**Preguntas:**

1. ¿Por qué este código puede ser problemático en una SPA?
2. ¿Cómo lo reescribirías para permitir la limpieza?
3. ¿Qué patrón usa nuestro código para resolver esto?

### Ejercicio 5: Filosofía de sistemas de diseño

> _"El sistema que sobrevive no es el más complejo, sino el más adaptable."_

**Preguntas:**

1. ¿Por qué separamos los colores en archivos distintos para modo claro y oscuro?
2. ¿Qué ocurriría si una diseñadora pidiera un tema de "alto contraste"?
3. ¿Cómo añadirías un tercer tema (por ejemplo, "modo sepia")?

### Ejercicio 6: El reto del despliegue

**Preguntas:**

1. ¿Por qué usamos `npm ci` en lugar de `npm install` en CI?
2. ¿Qué pasa si `base` no está configurado correctamente en `vite.config.js`?
3. ¿Cómo añadirías un entorno de staging que despliegue a una rama diferente?
4. ¿Qué se rompería si las plantillas de vista no se copian a `dist/` durante el build?

---

## Resumen: los cuatro pilares

| Pilar          | Tecnología           | Propósito                                     |
| -------------- | -------------------- | --------------------------------------------- |
| **Estilos**    | Tailwind CSS 4       | CSS utility-first con design tokens           |
| **Ruteo**      | SimpleRouter         | Navegación basada en hash sin recargar página |
| **Animación**  | GSAP + ScrollTrigger | Animaciones de scroll con buen rendimiento    |
| **Ciclo de vida** | onMount/onUnmount | Gestión y limpieza de recursos                |
| **Despliegue** | GitHub Actions       | CI/CD automatizado hacia GitHub Pages         |

> _"Cinco corrientes, un solo río. Los estilos pintan la interfaz. El router guía a la persona usuaria. La animación dirige la atención. El ciclo de vida mantiene la armonía. El despliegue automatiza la salida. Juntos crean la experiencia."_
> — El Tao de la Desarrolladora
{: .tao-development-quote }

---

## Lecturas adicionales

- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de GSAP](https://gsap.com/docs/v3/)
- [Guía de ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
- [WCAG: Motion Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Guía de despliegue de Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Deployment Plan](./DEPLOYMENT_PLAN.md) - Guía completa de configuración de CI/CD

---

_Documento creado con fines educativos. Que el código te acompañe._ 🙏
