---
layout: lesson
title: 'Pseudo-Elementos y Estilos Basados en Estado: Enfoques Críticos para CSS Dinámico'
slug: pseudo-elementos-y-estilos-de-estado
date: 2025-10-30
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/pseudo-elementos-y-estilos-de-estado/
description: 'Domina las pseudo-clases y pseudo-elementos para crear interfaces dinámicas y accesibles con pensamiento crítico sobre rendimiento, accesibilidad y mejora progresiva'
tags: [css, pseudo-clases, pseudo-elementos, accesibilidad, gestión-de-estado, diseño-interactivo]
status: complete
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

Al finalizar esta lección, podrás:

- Distinguir rápidamente entre pseudo-clases y pseudo-elementos
- Mejorar estados de interacción sin perder accesibilidad
- Aplicar decoraciones con pseudo-elementos sin alterar el contenido
- Evaluar cuándo un selector afecta el rendimiento
- Documentar decisiones para sostener la mejora progresiva

## Lo Esencial en Cinco Ideas

- **Pseudo-clases** reaccionan a estados (`:hover`, `:focus-visible`, `:nth-child()`)
- **Pseudo-elementos** añaden refuerzos visuales (`::before`, `::after`, `::selection`)
- **Accesibilidad** exige foco visible y atributos ARIA sincronizados
- **Rendimiento** mejora con selectores cortos y poco anidamiento
- **Mejora progresiva** usa `@supports` y `:focus` como fallback seguro

## Mapa de Pseudo-Selectores

### Pseudo-clases por intención

| Intención             | Selectores clave                                       | Aplicación práctica                                   |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| Interacción           | `:hover`, `:focus-visible`, `:active`, `:focus-within` | Retroalimentación inmediata y accesible               |
| Estructura            | `:first-child`, `:nth-of-type(odd)`, `:last-child`     | Ritmo visual sin clases auxiliares                    |
| Formularios           | `:required`, `:valid`, `:placeholder-shown`, `:has()`  | Validación inmediata y estados dependientes de campos |
| Estado sin JavaScript | `:target`, `:checked`, `:focus-within`                 | Acordeones, popovers y tabs controlados solo con CSS  |

```css
/* Referencias rápidas a la hora de auditar estados */
.nav a:focus-visible {
	outline: 2px solid var(--focus-ring);
	outline-offset: 2px;
}

input:required:invalid {
	border-color: #f87171;
	box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.35);
}
```

### Pseudo-elementos por propósito

| Propósito         | Selectores                                      | Ejemplo rápido                                             |
| ----------------- | ----------------------------------------------- | ---------------------------------------------------------- |
| Decoración visual | `::before`, `::after`, `::marker`               | Iconos inline, contadores y separadores                    |
| Tipografía        | `::first-letter`, `::first-line`, `::selection` | Capitulare, titulares destacados y selección personalizada |
| Experiencia       | `::placeholder`, `::backdrop`, `::cue`          | Ajustar texto de ayuda, overlays y pistas multimedia       |

```css
/* Decoración ligera sin alterar el HTML */
.badge::before {
	content: '●';
	color: currentColor;
	margin-inline-end: 0.25rem;
}
```

### Demo: Tipografía con pseudo-elementos (solo CSS)

<iframe src="./demo/typography.html" title="Tipografía personalizada con pseudo-elementos" style="width:100%;min-height:360px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Patrones sin JavaScript

Las pseudo-clases gestionan gran parte de la interacción si combinas HTML semántico y controles nativos:

- `:focus-within` abre menús, acordeones o tooltips al recibir foco desde teclado o pantalla táctil.
- `:checked` y `details[open]` alternan paneles sin necesitar scripts.
- `:target` permite modales o pestañas enlazables mediante el hash de la URL.

```html
<input type="checkbox" id="info-toggle" class="accordion__toggle" />
<label for="info-toggle" class="accordion__label">Ver contenidos</label>
<div class="accordion__panel">Contenido accesible sin JavaScript.</div>
```

```css
.accordion__toggle {
	position: absolute;
	inline-size: 1px;
	block-size: 1px;
	opacity: 0;
}

.accordion__panel {
	max-block-size: 0;
	overflow: hidden;
	transition: max-block-size 0.3s ease;
}

.accordion__toggle:checked + .accordion__label + .accordion__panel {
	max-block-size: 20rem;
}
```

### Demo: Tooltip accesible sin JavaScript

<iframe src="./demo/tooltip.html" title="Tooltip solo con CSS utilizando pseudo-elementos" style="width:100%;min-height:220px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Taller Exprés: Dropdown Accesible

1. **Estructura mínima**

```html
<nav class="dropdown">
	<button class="dropdown__trigger" aria-haspopup="true" aria-expanded="false">Menú</button>
	<ul class="dropdown__content" hidden>
		<li><a href="#inicio">Inicio</a></li>
		<li><a href="#acerca">Acerca</a></li>
		<li><a href="#contacto">Contacto</a></li>
	</ul>
</nav>
```

2. **Estados clave**

```css
.dropdown {
	position: relative;
	--focus-ring: 2px solid #2563eb;
}

.dropdown__trigger {
	padding: 0.75rem 1rem;
	min-height: 44px;
}

.dropdown__trigger:focus {
	outline: var(--focus-ring);
	outline-offset: 2px;
}

.dropdown__trigger:focus:not(:focus-visible) {
	outline: none;
}
```

3. **Pseudo-elementos + despliegue controlado**

```css
.dropdown__trigger::before {
	content: '▾';
	margin-right: 0.5rem;
	transition: transform 0.2s ease;
}

.dropdown[data-expanded='true'] .dropdown__trigger::before {
	transform: rotate(180deg);
}

.dropdown__content {
	position: absolute;
	inset-inline-start: 0;
	right: 0;
	margin-top: 0.5rem;
	background: white;
	border: 1px solid #e2e8f0;
	box-shadow: 0 8px 16px rgba(15, 23, 42, 0.1);
	list-style: none;
	padding: 0;
}

.dropdown__content[hidden] {
	display: none;
}

.dropdown__content li:nth-child(odd) {
	background: #f7fafc;
}

.dropdown__content li:not(:last-child) {
	border-bottom: 1px solid #e2e8f0;
}
```

```js
const dropdown = document.querySelector('.dropdown');
const trigger = dropdown.querySelector('.dropdown__trigger');
const content = dropdown.querySelector('.dropdown__content');

dropdown.dataset.expanded = trigger.getAttribute('aria-expanded');

trigger.addEventListener('click', () => {
	const expanded = trigger.getAttribute('aria-expanded') === 'true';
	trigger.setAttribute('aria-expanded', String(!expanded));
	content.hidden = expanded;
	dropdown.dataset.expanded = String(!expanded);
});
```

> Mantén `aria-expanded` sincronizado con el estado visual mediante una pequeña función de JavaScript o el mecanismo propio de tu framework.

#### Demo en vivo: Dropdown accesible

<iframe src="./demo/dropdown.html" title="Dropdown accesible con pseudo-clases y pseudo-elementos" style="width:100%;min-height:360px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Checklist Crítica

- Foco visible con `:focus-visible` y fallback en `:focus`
- `Tab`, `Enter` y `Esc` cubren la navegación completa
- `hidden` alterna con `aria-expanded` para lectores de pantalla
- Prefiere selectores simples (`.dropdown__item`) antes que `:nth-child()`

## Ejercicios Guiados

### Ejercicio 1 · Auditoría Exprés

- Revisa un dropdown existente con la checklist
- Documenta dos mejoras de accesibilidad y regístralas como issue o PR
- Prioriza cambios que beneficien a quien navega solo con teclado

### Ejercicio 2 · Dropdown sin JavaScript

- Usa `:focus-within` como disparador principal
- Limita animaciones a 300 ms y respeta `prefers-reduced-motion`
- Prueba en móvil, modo oscuro y alto contraste antes de publicar

### Demo: Patrones combinados (solo CSS + pseudo-elementos)

<iframe src="./demo/exercises.html" title="Navegación y tarjetas usando pseudo-clases y pseudo-elementos" style="width:100%;min-height:420px;border:1px solid #eee;border-radius:6px;overflow:hidden"></iframe>

## Buenas Prácticas

- Mantén el contenido esencial en HTML y reserva pseudo-elementos para decoración
- Combina `:hover` y `:focus` para cubrir mouse y teclado
- Activa mejoras progresivas con `@supports selector(:focus-visible)`
- Evalúa rendimiento con DevTools Performance y accesibilidad con axe DevTools

## Recursos Clave

- [Pseudo-clases (MDN)](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-classes)
- [Pseudo-elementos (MDN)](https://developer.mozilla.org/es/docs/Web/CSS/Pseudo-elements)
- [Checklist de accesibilidad WebAIM](https://webaim.org/techniques/keyboard/)

## Conclusión

Pseudo-clases y pseudo-elementos amplían CSS para responder a la interacción manteniendo el HTML semántico. Con prácticas accesibles y mediciones de rendimiento, tus componentes escalan sin sorpresas.

Ahora, aplica estas técnicas en tus **repositorios de GitHub**, experimenta con diferentes estilos y comparte tus resultados completando un dropdown accesible, documentando dos decisiones de diseño en el README y publicando una captura o GIF del comportamiento final.
