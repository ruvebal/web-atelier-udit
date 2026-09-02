---
layout: lesson
title: 'Manipulación del DOM en el Navegador: Cadenas, API del DOM, Plantillas y DOM Virtual'
title_alt: 'DOM Manipulation in the Browser: Strings, DOM API, Templates, and the Virtual DOM'
slug: js-dom-manipulation
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-dom-manipulation/
tags: [javascript, dom, security, history, pedagogy]
description: 'Una visión general crítica y orientada a la práctica de enfoques de manipulación del DOM: cadenas de plantilla, APIs del DOM nativas, <template>, y el DOM Virtual — con historia, advertencias y ejercicios.'
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El renderizado es una frontera de confianza.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** APIs del DOM, plantillas, inserción de texto y conciencia XSS. **Señal de frontera:** abstracciones de componentes y DOM virtual no eliminan responsabilidad de seguridad ni accesibilidad.</p>
</aside>

> **Prueba de estudio:** Compara renderizado por cadenas, nativo y plantilla con input no confiable.

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 8** — comparar renderizado por cadenas, API nativa y `<template>` en tu repo; practicar actualizaciones seguras frente a XSS.

**No para:** implementar React/DOM virtual (solo puente conceptual) ni tooling npm (Sesión 10+).

**Al terminar esta sesión tendrás:** el mismo fragmento de UI renderizado de dos formas, una advertencia XSS documentada y un commit.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesión 7 completa (`main.js` + eventos) | Sí |
| Repo portfolio con HTML semántico | Sí |
| Cadena no confiable para demo XSS | Incluida en la lección |

**Tiempo oficial:** 3 h de clase + 1 h de laboratorio.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Repasa la historia — por qué `innerHTML` es riesgoso | Breve Historia |
| 2 | Renderiza una tarjeta con template literals | Basado en cadenas |
| 3 | Reconstruye con `createElement` + `textContent` | API nativa |
| 4 | Opcional: clona desde `<template>` | Plantilla HTML |
| 5 | Nota ATELIER: patrón por defecto | Reflexión |
| 6 | Commit | Entrega |

---

## Comprueba antes de salir

- [ ] Input no confiable falla de forma segura con `textContent`
- [ ] Mismo resultado visual sin `innerHTML` para texto de usuario
- [ ] Puedes nombrar un vector XSS y una mitigación
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Qué hacer |
| --- | --- | --- |
| Se ejecuta script inyectado | `innerHTML` con input de usuario | Usa `textContent` o sanitizador |
| Nodo vacío tras append | Falta `appendChild` | Registra parent e hijo en Consola |
| Plantilla inerte | Clon sin `.content` | `template.content.cloneNode(true)` |
| Listeners duplicados | Re-render completo del árbol | Actualiza solo el contenedor |
| Funciona en CodePen, no en repo | Rutas distintas | Iguala estructura del repo |

---

## Entrega (evidencia Sesión 8)

- Commit con ambos enfoques de renderizado
- Nota breve: patrón por defecto en tu portfolio y por qué

---

## 🎯 Objetivos de Aprendizaje

- **Comprender las principales estrategias de manipulación del DOM**: renderizado basado en cadenas, APIs del DOM nativas, HTML `<template>`, y enfoques de DOM Virtual/componentes
- **Comprender historia y compensaciones**: por qué surgieron estos patrones y cómo evolucionaron
- **Escribir código DOM seguro**: evitar XSS, preferir `textContent`, y entender sanitización
- **Practicar a través de la metodología de atelier**: exploración → reflexión → conceptualización → producción → exhibición
- **Reconocer el camino hacia React y frameworks modernos** (JSX, DOM Virtual, plantillas)

---

## 📜 Una Breve Historia: Cómo Llegamos Aquí

- 1997–2000: **DOM Level 1/2** estandarizó el árbol del documento y las APIs de manipulación
- 2000s: Los navegadores expusieron `innerHTML` — las actualizaciones basadas en cadenas se volvieron comunes (rápidas pero arriesgadas)
- 2006: **jQuery** popularizó la selección/eventos/manipulación ergonómica
- 2009–2012: Templating de lógica-en-cadenas (Mustache/Handlebars, plantillas Underscore)
- 2013: **React** introdujo el DOM Virtual y **[JSX](https://www.typescriptlang.org/docs/handbook/jsx.html)** (compilado a llamadas `createElement`)
- 2014+: El elemento `<template>` se envió; Los Componentes Web maduraron
- 2018+: Bibliotecas de plantillas etiquetadas (lit-html, htm) refinaron seguridad/ergonomía de cadenas

> La historia es de moverse desde cadenas ad-hoc hacia componentes estructurados y declarativos.

---

## 🧭 Cuatro Enfoques Principales (y Cuándo Usarlos)

### 1) Renderizado basado en cadenas (template literals + `innerHTML`)

- **Qué**: Construir una cadena HTML (a menudo con `` `template literals` ``) y asignar a `element.innerHTML`.
- **Pros**: Conciso, rápido para contenido simple, fácil de prototipar.
- **Contras**: **Riesgo de XSS** si se interpolan datos no confiables; re-adjuntar eventos; difícil de actualizar incrementalmente.
- **Seguridad**: Escapar o sanitizar entrada no confiable. Preferir `textContent` cuando sea posible.

### 2) API del DOM Nativa (`document.createElement`, `append`, `textContent`)

- **Qué**: Crear nodos programáticamente, establecer atributos, adjuntar vía `DocumentFragment`.
- **Pros**: Más seguro por defecto (las cadenas van a través de `textContent`), actualizaciones de grano fino, ergonómico con helpers.
- **Contras**: Verboso comparado con cadenas.

### 3) HTML `<template>` + clonación

- **Qué**: Definir HTML inerte en `<template>`, clonar con `content.cloneNode(true)`, y llenar slots.
- **Pros**: Separar estructura de lógica, clonación rápida, mantiene el marcado legible.
- **Contras**: Todavía necesita código para vincular datos y eventos.

### 4) DOM Virtual / Componentes (camino React) y plantillas etiquetadas

- **Qué**: Describir UI como funciones/componentes; un runtime reconcilia cambios (React/Preact), o las plantillas se compilan (Svelte), o los literales etiquetados renderizan de forma segura (lit-html).
- **Pros**: Composabilidad, actualizaciones predecibles, gran ecosistema.
- **Contras**: Sobrecarga de tooling/runtime; curva de aprendizaje; pasos de compilación.

> La idea central de React: escribir componentes que devuelven una descripción de UI (JSX → `createElement`), luego reconciliar cambios eficientemente. Se construye sobre los mismos fundamentos del DOM.

---

## 🔒 Esenciales de Seguridad (Leer Antes de Codificar)

- Tratar cualquier cadena proporcionada por el usuario como insegura. Usar `textContent` o escapar antes de `innerHTML`.
- Evitar construir event handlers vía cadenas. Añadir listeners con `addEventListener`.
- Preferir asignación de atributos sobre atributos HTML concatenados con cadenas.
- Considerar **Tipos Confiables** del navegador en aplicaciones complejas; aprender qué hace el sanitizador de tu framework.

---

## 🏗️ Taller de Atelier: Técnicas Progresivas del DOM

Cada ejercicio incluye archivos de demo ejecutables en esta carpeta: `./demo/*.html`, `./demo/*.css`, `./demo/*.js`.

### Ejercicio 1 — Cadenas con Template Literals (De Forma Segura)

Objetivo: Renderizar una lista con template literals mientras se escapan datos no confiables.

```
┌──────────────────┐      ┌─────────────────┐      ┌──────────────────┐
│  Construir HTML  │ ────▶│  Escapar Datos   │ ────▶│  innerHTML       │
│  Template String │      │  (sanitizar)     │      │  (renderizar una │
│                  │      │                  │      │   vez)           │
└──────────────────┘      └─────────────────┘      └──────────────────┘
```

**Figura:** Renderizado basado en cadenas con protección XSS vía escape HTML.

Archivos creados para ti:

```html
<!-- demo/01-strings.html -->
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ejercicio 1 — Cadenas</title>
		<link rel="stylesheet" href="01-strings.css" />
	</head>
	<body>
		<main class="container">
			<h1>Productos (Renderizado con Cadenas)</h1>
			<div id="list"></div>
		</main>
		<script src="01-strings.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/01-strings.css */
:root {
	--bg: #0b1020;
	--fg: #f1f5f9;
	--card: #111827;
	--muted: #94a3b8;
	--accent: #3b82f6;
}
html,
body {
	margin: 0;
	padding: 0;
	background: var(--bg);
	color: var(--fg);
	font-family: system-ui, sans-serif;
}
.container {
	max-width: 800px;
	margin: 2rem auto;
	padding: 1rem;
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 1rem;
}
.card {
	background: var(--card);
	border: 1px solid #1f2937;
	border-radius: 0.75rem;
	padding: 1rem;
}
.price {
	color: var(--accent);
	font-weight: 700;
}
.desc {
	color: var(--muted);
	font-size: 0.95rem;
}
```

### Template literals

Los template strings en JavaScript están envueltos en backticks (\`), por lo que puedes incrustar variables y expresiones dentro con `${...}`.

```js
const name = 'Mundo';
console.log(`Hola, ${name}!`); // Salida: Hola, Mundo!
```

- El código usa `Array.prototype.map` para convertir cada objeto de producto `p` en una cadena HTML:
  - Para cada ítem, la función flecha `(p) = ...` devuelve una tarjeta de producto como una cadena.
  - Esto hace un nuevo array de todas las cadenas de tarjetas.
  - Luego, `Array.prototype.join('')` las combina en un solo bloque HTML.

### Lectura adicional:

- [Array (docs MDN)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Array.prototype.forEach](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [Array.prototype.map](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.join](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

```javascript
// demo/01-strings.js
const products = [
	{ id: 1, name: 'Taza Segura', price: 19.99, description: 'Taza duradera para el día a día.' },
	{ id: 2, name: 'Botella de Viaje', price: 29.5, description: 'Mantiene bebidas frías.' },
	// Simular un payload malicioso proveniente de entrada de usuario o API externa
	{
		id: 3,
		name: '<img src=x onerror="alert(`XSS`);document.body.innerHTML=`<h1>Pwned</h1>`">',
		price: 9.99,
		description: '¡Intenta romper el DOM!',
	},
];

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function render(products) {
	const list = document.getElementById('list');
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${escapeHtml(p.name)}</h3>
							<p class="desc">${escapeHtml(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	list.innerHTML = html;
}
render(products);
```

**¿Por qué se necesita `escapeHtml`? Respuesta y Explicación:**

Si eliminas `escapeHtml`, los datos suministrados por el usuario—como nombres o descripciones de productos—serán inyectados directamente en tu HTML usando `innerHTML` sin ninguna protección. Esto significa que si los datos contienen caracteres HTML especiales (como `<`, `>`, `"`), serán interpretados como etiquetas o atributos HTML reales.

Por ejemplo, si un nombre de producto contiene HTML peligroso, y no lo escapas, el navegador puede interpretarlo como marcado real—lo que podría permitir que scripts no deseados se ejecuten en tu página (un riesgo de seguridad conocido como XSS, o Cross-Site Scripting). Esto puede dejar que atacantes ejecuten código, lo que podría robar datos o dañar usuarios.

Usar `escapeHtml` transforma caracteres especiales en sus formas de entidad HTML seguras (`<` se convierte en `&lt;`, `"` se convierte en `&quot;`, etc.). Como resultado, el navegador muestra el nombre del producto como texto plano en lugar de parsearlo como código, neutralizando cualquier script incrustado.

**En resumen:** Eliminar `escapeHtml` hace tu código vulnerable a ataques XSS. Siempre sanitiza cualquier dato dinámico antes de inyectarlo como HTML, especialmente al renderizar entrada de usuario o datos de fuentes externas.

---

### Ejercicio 2 — API del DOM Nativa + DocumentFragment

Objetivo: Construir la misma UI con `createElement`, `textContent`, y un `DocumentFragment`.

```
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Crear Elemento  │ ────▶│  Establecer      │ ────▶│  Adjuntar de     │
│  Jerarquía       │      │  textContent     │      │  Forma Segura    │
│                  │      │  (auto-escape)   │      │  a Fragment      │
└──────────────────┘      └──────────────────┘      └──────────────────┘
```

**Figura:** Construcción con API del DOM con seguridad XSS incorporada vía `textContent`.

```html
<!-- demo/02-dom-api.html -->
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ejercicio 2 — API del DOM</title>
		<link rel="stylesheet" href="02-dom-api.css" />
	</head>
	<body>
		<main class="container">
			<h1>Productos (API del DOM)</h1>
			<div id="list"></div>
		</main>
		<script src="02-dom-api.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/02-dom-api.css */
@import url('01-strings.css');
```

**Métodos Clave del DOM a Usar:**

- El objeto `document` es el punto de entrada al DOM de la página; lo usas para crear o buscar elementos. Cada nodo que creas o seleccionas es un `element` dentro de este árbol del documento.
- `document.createElement(elementName)`: Crea un nuevo elemento DOM del nombre dado.
- `element.textContent = value`: Establece contenido de texto plano de forma segura (auto-escapa HTML).
- `element.className = value` o `element.setAttribute(attr, value)`: Añade clases o atributos.
- `document.createDocumentFragment()`: Crea un contenedor ligero y eficiente en memoria para construir elementos fuera de pantalla.
- `parent.appendChild(child)` o `parent.append(...)`: Añade elementos al árbol del DOM.
- `element.dataset`: Lee/escribe atributos de datos.
- `document.getElementById(id)`/`document.querySelector()`/`element.querySelector()`: Selecciona elementos del DOM.

Estos métodos nativos te permiten construir UI de forma segura y flexible, con protección automática contra XSS cuando usas `textContent`.

```javascript
// demo/02-dom-api.js
const products = [
	{ id: 1, name: 'Taza Segura', price: 19.99, description: 'Taza duradera para el día a día.' },
	{ id: 2, name: 'Botella de Viaje', price: 29.5, description: 'Mantiene bebidas frías.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: '¡Endurece tu código!' },
];

function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // texto seguro

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

function render(products) {
	const list = document.getElementById('list');
	const grid = document.createElement('div');
	grid.className = 'grid';

	const frag = document.createDocumentFragment();
	products.forEach((p) => frag.appendChild(createCard(p)));
	grid.appendChild(frag);

	list.textContent = '';
	list.appendChild(grid);
}

render(products);
```

Reflexiona: ¿Qué versión es más fácil de mantener? ¿Cuál es más fácil de asegurar?

**Referencias**:

- [MDN: DocumentFragment](https://developer.mozilla.org/es/docs/Web/API/DocumentFragment)
- [MDN: Element.dataset](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset)
- [MDN: document.createElement()](https://developer.mozilla.org/es/docs/Web/API/Document/createElement)
- [MDN: HTMLTemplateElement](https://developer.mozilla.org/es/docs/Web/API/HTMLTemplateElement)

---

### Ejercicio 3 — HTML `<template>` y clonación

Objetivo: Separar marcado de lógica con `<template>` y clonar por ítem.
[https://developer.mozilla.org/es/docs/Web/HTML/Element/template](https://developer.mozilla.org/es/docs/Web/HTML/Element/template)

El elemento HTML nativo <template> permite a los desarrolladores definir fragmentos reutilizables de marcado que no se renderizan inmediatamente pero pueden ser clonados e insertados en la página usando JavaScript.

Este enfoque separa limpiamente estructura (HTML) de comportamiento (JS), reduce duplicación, y mejora mantenibilidad.

Hoy en día, el elemento <template> tiene buen soporte en todos los navegadores principales. Se usa comúnmente en proyectos de vanilla JS y frameworks y bibliotecas populares para construir UIs dinámicas rápidas, seguras y mantenibles—especialmente para renderizar listas, tablas o tarjetas. Por ejemplo, <template> es **un bloque de construcción clave** en componentes web y también se usa detrás de escenas en toolkits de UI como Material Web Components.

```html
<!-- demo/03-template.html -->
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ejercicio 3 — HTML Template</title>
		<link rel="stylesheet" href="03-template.css" />
	</head>
	<body>
		<main class="container">
			<h1>Productos (HTML Template)</h1>
			<template id="card-template">
				<article class="card">
					<h3 class="title"></h3>
					<p class="desc"></p>
					<p class="price"></p>
				</article>
			</template>
			<div id="list" class="grid"></div>
		</main>
		<script src="03-template.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/03-template.css */
@import url('01-strings.css');
```

### Métodos Clave del DOM para Contenido Dinámico

Antes de implementar renderizado dinámico con plantillas, es valioso entender algunos métodos y estructuras fundamentales del DOM usados para manipulación eficiente y segura de HTML en JavaScript:

- **`.content` en `<template>`:** Te da un document fragment del HTML interno de la plantilla, mantenido separado del DOM en vivo hasta que lo necesites.
- **`.cloneNode(deep)`**: Clona elementos o fragmentos. Con `deep: true`, todos los descendientes son duplicados. Esencial para hacer copias de contenido de plantilla.
- **`DocumentFragment`**: Un contenedor ligero para hacer actualizaciones del DOM por lotes. Puedes adjuntar múltiples nodos a un fragmento, luego insertar el fragmento completo en el documento para minimizar reflows y repaints.
- **`.appendChild()` y `.append()`**: Métodos usados para colocar nuevos nodos en el documento o fragmentos.

Entender estos es crucial para escribir código robusto y rápido que actualiza el DOM dinámicamente, en masa y de forma segura.

Para seleccionar elementos dentro del DOM, se usa a menudo el método `querySelector`. Por ejemplo, después de clonar tu fragmento de plantilla, puedes encontrar elementos dentro de él así:

```js
// 1. Clonar la plantilla
// 2. Llenar datos, añadir a un fragmento
// 3. Insertar el fragmento en el DOM
```

_Consejo: ¡Hacer actualizaciones por lotes con DocumentFragment es mucho más rápido que insertar cada ítem uno por uno!_

**demo/03-template.js**

```javascript
// demo/03-template.js
const products = [
	{ id: 1, name: 'Taza Segura', price: 19.99, description: 'Taza duradera para el día a día.' },
	{ id: 2, name: 'Botella de Viaje', price: 29.5, description: 'Mantiene bebidas frías.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: '¡Endurece tu código!' },
];

const template = document.getElementById('card-template');
const list = document.getElementById('list');

// Helper: clonar el <template> y llenarlo con datos de producto, luego devolver el fragmento
function renderCard(product) {
	const { id, name, description, price } = product;
	const fragment = template.content.cloneNode(true); // clonación profunda del fragmento de plantilla
	const article = fragment.querySelector('.card');
	article.dataset.id = String(id);
	fragment.querySelector('.title').textContent = name;
	fragment.querySelector('.desc').textContent = description;
	fragment.querySelector('.price').textContent = `$${price.toFixed(2)}`;
	return fragment;
}

// - Hacemos batch de todas las tarjetas de producto en un `DocumentFragment` llamado `batch`.
// - Después de llenar todas las tarjetas, adjuntamos `batch` a `list` (el contenedor en el DOM), para que todas las tarjetas aparezcan a la vez sin muchos repaints lentos.
const batch = document.createDocumentFragment();
products.forEach((product) => batch.appendChild(renderCard(product)));
list.appendChild(batch);
```

La función helper basada en plantilla (`renderCard`) simplifica la tarea de generar múltiples elementos DOM similares de algunas maneras poderosas:

- **`.content` en `<template>`**:  
  La propiedad `.content` viene de la [API HTMLTemplateElement](https://developer.mozilla.org/es/docs/Web/API/HTMLTemplateElement/content). Cuando tienes un elemento `<template>` en tu HTML, acceder a su propiedad `.content` te da un _document fragment_ especial que contiene la estructura HTML de la plantilla—pero este fragmento **no está en el DOM en vivo todavía**. Esto te permite definir layouts reutilizables en tu HTML y "estampar" copias para llenar con datos vía JavaScript, manteniendo tu código DRY y separando claramente tu estructura de tu lógica.

- **`.cloneNode(true)`**:  
  Cada vez que necesites una nueva "tarjeta", puedes clonar _profundamente_ el contenido de la plantilla con `.cloneNode(true)`. Esto te da un subárbol DOM _fresco_ y listo para personalizar para cada producto, previniendo bugs que vienen de reutilizar el mismo elemento.

- **`.dataset`**: <sup>[Referencia MDN](https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset)</sup>
  La propiedad `.dataset` es una forma conveniente de establecer/leer todos los atributos `data-*` en un elemento.  
  Por ejemplo:

  ```js
  article.dataset.id = String(id);
  ```

  Esta línea es equivalente a:

  ```js
  article.setAttribute('data-id', id);
  ```

  Adjunta datos extra que podrías necesitar más tarde (por ejemplo, identificar el producto o manejar eventos), sin afectar el layout o la lógica de JavaScript.

- **Batch con `DocumentFragment`**:  
  En lugar de añadir tarjetas al DOM **una a la vez** (¡que es lento!), usas un `DocumentFragment` como contenedor temporal. Adjuntas todas las tarjetas a este fragmento, y **solo una llamada** a `list.appendChild(batch)` las empuja todas al DOM en vivo a la vez.
  Esto mejora el rendimiento limitando reflows/repaints costosos y mantiene tu código legible.

**Resumen:**  
Usar `<template>`, `.content`, `.cloneNode`, `.dataset`, y hacer batch vía `DocumentFragment` lleva a código que es:

- Más legible (estructura en HTML; llenado en JS).
- Más reutilizable y DRY.
- Más robusto y seguro, ya que no puedes insertar código accidentalmente directamente como HTML (así se evita XSS).
- Mucho más rápido para actualizaciones en masa.

Reflexiona: ¿Cómo mejora `<template>` la legibilidad y reutilizabilidad?

#### Referencias

- [MDN: ejemplo de template](https://developer.mozilla.org/es/docs/Web/HTML/Element/template#examples)
- [MDN: Usando templates y slots](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_templates_and_slots)
- [Material Web Components](https://github.com/material-components/material-components-web-components)

---

### Ejercicio 4 — Un Pequeño Helper Hyperscript (Linaje de React)

Objetivo: Este es tu primer vistazo de cómo [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) (una sintaxis popular de JavaScript usada en React) realmente se convierte en llamadas de función JavaScript regulares—como este simple helper `h()`. ¡Veremos que lo que parece HTML dentro de JavaScript es realmente solo llamar una función para cada elemento!

```html
<!-- demo/04-hyperscript.html -->
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Ejercicio 4 — Hyperscript</title>
		<link rel="stylesheet" href="04-hyperscript.css" />
	</head>
	<body>
		<main class="container">
			<h1>Productos (Hyperscript)</h1>
			<div id="app"></div>
		</main>
		<script src="04-hyperscript.js" type="module"></script>
	</body>
</html>
```

```css
/* demo/04-hyperscript.css */
@import url('01-strings.css');
```

```javascript
// demo/04-hyperscript.js
function h(type, props = {}, ...children) {
	const el = document.createElement(type);
	for (const [k, v] of Object.entries(props)) {
		if (k === 'className') el.className = v;
		else if (k.startsWith('on') && typeof v === 'function') {
			el.addEventListener(k.slice(2).toLowerCase(), v);
		} else {
			el.setAttribute(k, v);
		}
	}
	for (const child of children.flat()) {
		if (child == null) continue;
		if (typeof child === 'string' || typeof child === 'number') {
			el.appendChild(document.createTextNode(String(child)));
		} else {
			el.appendChild(child);
		}
	}
	return el;
}

const products = [
	{ id: 1, name: 'Taza Segura', price: 19.99, description: 'Taza duradera para el día a día.' },
	{ id: 2, name: 'Botella de Viaje', price: 29.5, description: 'Mantiene bebidas frías.' },
	{ id: 3, name: '<img onerror=alert("XSS") src=x>', price: 9.99, description: '¡Endurece tu código!' },
];

function Card({ id, name, description, price }) {
	return h(
		'article',
		{ className: 'card', 'data-id': String(id) },
		h('h3', {}, name),
		h('p', { className: 'desc' }, description),
		h('p', { className: 'price' }, `$${price.toFixed(2)}`)
	);
}

function App() {
	return h(
		'div',
		{ className: 'grid' },
		products.map((p) => Card(p))
	);
}

document.getElementById('app').appendChild(App());
```

Reflexiona: [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) es azúcar sintáctica para llamadas como `h(type, props, ...children)`. React añade un diff de DOM Virtual para actualizar eficientemente.

---

## 🎓 Preguntas Críticas del Atelier

### Exploración

- ¿Qué es más rápido de prototipar? ¿Qué es más seguro por defecto?

### Reflexión

- ¿Cuándo serían aceptables las cadenas? ¿Cuándo debes cambiar a APIs del DOM o plantillas?

### Conceptualización

- ¿Cómo nos ayudan los componentes a pensar sobre UI como datos + render?

### Producción

- ¿Puedes refactorizar el Ejercicio 1 al Ejercicio 2 o 3 sin cambiar la UI?

### Exhibición

- Muestra tus demos, explica consideraciones de seguridad y compensaciones.

---

## 🔧 Extensiones de Práctica

- Añadir interactividad: clic en una tarjeta para alternar selección; preferir delegación de eventos en un padre.
- Añadir controles de filtrado/ordenamiento; comparar costo de re-render con cadenas vs DOM incremental.
- Reemplazar el `h()` del Ejercicio 4 con una pequeña plantilla etiquetada (ej., `html\`...\``) que devuelva nodos DOM usando `template.content`.

---

## 📚 Lectura Adicional

- MDN — Template literals
- MDN — API del DOM (`Document`, `Element`, `DocumentFragment`)
- MDN — HTML `<template>`
- OWASP — Cross-Site Scripting (XSS)
- Google — Tipos Confiables (avanzado)
- [TypeScript Handbook — JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) — referencia de sintaxis a nivel de lenguaje (primera lectura antes de React S18)
- Docs de React — Renderizando elementos; JSX en profundidad
- lit.dev — Lit y plantillas etiquetadas `html`

---

## ✅ Lo Que Deberías Entender Ahora

- Múltiples caminos válidos para manipular el DOM, cada uno con compensaciones
- Por qué surgió el enfoque de React de técnicas anteriores
- Cómo evitar XSS y escribir código UI seguro
- Cómo elegir la herramienta correcta para el trabajo y evolucionar tu codebase con el tiempo