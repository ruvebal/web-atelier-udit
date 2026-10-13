---
layout: lesson
title: 'Manipulación del DOM en el Navegador: Cadenas, API del DOM, Plantillas y DOM Virtual'
title_alt: 'DOM Manipulation in the Browser: Strings, DOM API, Templates, and the Virtual DOM'
slug: js-dom-manipulation
date: 2025-10-27
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-dom-manipulation/
status: complete
tags: [javascript, dom, security, xss, rendering]
description: 'Renderiza la misma interfaz con cadenas, APIs nativas del DOM y <template>, observa cómo un payload XSS se ejecuta y cómo falla, y elige un patrón seguro por defecto para tu portfolio.'
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> El renderizado es una frontera de confianza.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** APIs del DOM, plantillas, inserción de texto y conciencia XSS. **Señal de frontera:** abstracciones de componentes y DOM virtual no eliminan responsabilidad de seguridad ni accesibilidad.</p>
</aside>

> **Prueba de estudio:** Compara renderizado por cadenas, nativo y plantilla con input no confiable.

> _"Hazlo todo tan simple como sea posible, pero no más."_
> — Tao of Development, `cc-055`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 8** — comparar renderizado con cadenas, DOM nativo y `<template>`; ver un payload XSS ejecutarse y fallar; aplicar el patrón seguro en tu repo de portfolio.

**No para:** implementar React/DOM virtual (solo puente conceptual), librerías de sanitización ni tooling de build con npm (Sesión 10+).

**Al terminar esta sesión tendrás:** el mismo fragmento de interfaz renderizado de dos formas (cadena frente a API nativa), una advertencia XSS documentada y un commit.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesión 7 completa (`main.js` + eventos funcionando) | Sí |
| Repo de portfolio con HTML semántico | Sí |
| Las cuatro páginas demo en [`./demo/`](./demo/01-strings.html) (ábrelas con doble clic o Live Server) | Incluidas |

**Tiempo oficial:** 3 h en clase (≈ 0,5 h encuadre · 0,5 h ejercicios guiados · 1 h laboratorio · 1 h recorrido de demos y debate).

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee la tabla de los cuatro enfoques | Cuatro enfoques |
| 2 | Abre la demo 1; marca **Modo inseguro**; observa cómo se ejecuta el payload; desmárcalo | Ejercicio 1 |
| 3 | Abre la demo 2; mismos datos, sin necesidad de escapar | Ejercicio 2 |
| 4 | Renderiza una lista en tu portfolio con `createElement` + `textContent` | Ejercicio 3 (laboratorio) |
| 5 | Escribe la nota ATELIER: tu patrón por defecto y por qué | Entrega |
| 6 | Opcional: `<template>` y el helper `h()` | Profundización opcional |

---

## Comprueba antes de salir

- [ ] En la demo 1, **Modo inseguro** muestra el banner rojo (el payload se ejecutó) y el modo seguro no: has visto ambos
- [ ] La lista de tu portfolio muestra el texto con `textContent`, no con `innerHTML`
- [ ] Sabes nombrar un vector XSS y una mitigación de esta sesión
- [ ] Si un asistente escribió una función de renderizado por ti, la probaste con el payload de la demo 1 antes de quedártela
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Se ejecuta código inyectado | `innerHTML` con datos no confiables | Usa `textContent`, o escapa antes de construir la cadena |
| Nodo vacío tras añadir | Olvidaste `append` o el padre es otro | Haz log del padre y del hijo en la Console |
| La plantilla no muestra nada | Clonaste el elemento `<template>` en vez de su `.content` | `document.importNode(template.content, true)` |
| Listeners duplicados | Volver a renderizar reasigna handlers por elemento | Un solo listener en el padre (delegación de eventos) |
| “Funciona en CodePen, no en el repo” | Rutas distintas u orden de scripts | Replica la estructura del repo; `defer` en el script; revisa la Console |
| El asistente propone `innerHTML = \`…${textoUsuario}…\`` | Es el patrón más corto de sus datos de entrenamiento, así que los modelos lo sugieren primero | Trátalo como la respuesta incorrecta por defecto: reescríbelo con `createElement` + `textContent` |

---

## Entrega (evidencia Sesión 8)

- Commit con una lista del portfolio renderizada con la API nativa del DOM (la versión con cadenas, en un comentario o en una rama para comparar)
- Nota breve: patrón por defecto para tu portfolio y por qué
- **Línea de IA:** `IA: <herramienta> / ninguna · una sugerencia que rechacé y por qué` — consulta la [rúbrica de declaración de IA y defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objetivos de aprendizaje

- **Renderizar** los mismos datos con cadenas de plantilla y con la API nativa del DOM.
- **Explicar** por qué `innerHTML` con datos no confiables es un riesgo XSS, y demostrarlo.
- **Usar por defecto** `createElement` + `textContent` para texto que aporta el usuario.
- **Agrupar** actualizaciones con `DocumentFragment`.
- **Reconocer** `<template>` y los helpers de componentes como el mismo DOM por debajo (puente a React en el semestre 2).

---

## Cómo funciona el código en esta lección

- **CodeSandbox-ready** — completo y ejecutable tal cual.
- **Excerpt** — un fragmento de un archivo demo o de tu proyecto; léelo en su contexto.
- **Template** — un punto de partida que adaptas a tu portfolio.

La fuente ejecutable de referencia es la carpeta [`demo/`](./demo/01-strings.html) junto a esta página: cada ejercicio es un trío HTML + CSS + JS que puedes abrir con doble clic. La convención de sandbox React con rutas de unidades posteriores no se aplica a esta sesión vanilla.

---

## Referencias de JavaScript

Las tres referencias que este curso usa en todas las sesiones de JavaScript:

| Función | Referencia |
| --- | --- |
| Estándar — referencia vigente | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) (en inglés) |
| Documentación recomendada | [MDN Web Docs — JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) |
| Marca registrada | [JavaScript en Oracle](https://www.oracle.com/developer/javascript/) (en inglés) — como indica MDN: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries” (“Java” y “JavaScript” son marcas comerciales o registradas de Oracle en EE. UU. y otros países). |

Páginas de referencia de esta sesión: [`createElement()`](https://developer.mozilla.org/es/docs/Web/API/Document/createElement) · [`textContent`](https://developer.mozilla.org/es/docs/Web/API/Node/textContent) · [`DocumentFragment`](https://developer.mozilla.org/es/docs/Web/API/DocumentFragment) · [`replaceChildren()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren) (en inglés).

---

## Cuatro enfoques (y cuándo usarlos)

| Enfoque | Cómo | Fortaleza | Riesgo / coste | Úsalo para |
| --- | --- | --- | --- | --- |
| 1. Cadenas + `innerHTML` | Construyes HTML con template literals y lo asignas de una vez | Corto, rápido para prototipar | **XSS** si los datos no son confiables; reemplaza nodos y sus listeners | Solo marcado estático y confiable |
| 2. API nativa del DOM | `createElement`, `textContent`, `append`, `DocumentFragment` | Seguro por defecto; actualizaciones finas | Verboso | **Tu opción por defecto** para datos de usuarios o APIs |
| 3. `<template>` + clonado | Marcado inerte en el HTML, clonado y rellenado desde JS | La estructura se queda en el HTML | Sigue necesitando código para enlazar datos | Tarjetas, filas o elementos repetidos |
| 4. Componentes / DOM virtual | Funciones que devuelven descripciones de UI; un runtime actualiza el DOM (React, Preact, Lit) | Composición a escala | Tooling, runtime, curva de aprendizaje | Semestre 2 — el mismo DOM por debajo |

Cómo llegamos aquí, en una línea: `innerHTML` (finales de los 90) hizo fáciles y arriesgadas las actualizaciones con cadenas → jQuery (2006) hizo cómoda la selección → `<template>` y Web Components (años 2010) separaron la estructura → React (2013) describió la UI como funciones compiladas a llamadas tipo `createElement`.

---

## Seguridad esencial (léela antes de programar)

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-08-trust-boundary-es-3b0f04f7c7aa.svg' | relative_url }}" width="680" height="324" alt="Una cadena, dos sumideros" aria-describedby="fe-i-08-trust-boundary-caption" loading="lazy" />
<figcaption id="fe-i-08-trust-boundary-caption"><strong>Una cadena, dos sumideros.</strong> La misma cadena no confiable cruza dos veces la frontera de confianza. Con <code>innerHTML</code> se interpreta y su código <code>onerror</code> se ejecuta; con <code>textContent</code> sigue siendo texto y no se ejecuta nada: justo lo que alterna la demo 1. <span class="image-credit">Figura de @ruvebal con visual-forger 1.2.0.</span></figcaption>
</figure>

- **Trata como no confiable toda cadena que venga de fuera de tu código:** campos de formulario, parámetros de URL, respuestas de API y todo lo que un asistente haya generado a partir de ellos.
- **Sabe qué se ejecuta de verdad.** `innerHTML` no ejecuta etiquetas `<script>` inyectadas, pero sí atributos de evento como `<img src=x onerror=…>`; por eso el payload de la demo 1 es una imagen.
- **`textContent` nunca interpreta HTML.** Es la primitiva segura más simple para texto (MDN; OWASP califica `innerHTML` de sumidero inseguro y recomienda `textContent`).
- **Añade comportamiento con `addEventListener`,** nunca construyendo cadenas `onclick="…"`.
- **Más allá de FE I:** Trusted Types — Baseline en todos los navegadores desde febrero de 2026 — permite que un sitio prohíba cadenas crudas en `innerHTML`. Lo verás en código de producción, no en este laboratorio.

Verificado el 2026-10-13: [MDN `Element.innerHTML`](https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML), [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [MDN Trusted Types](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API).

---

## Ejercicio 1 — Cadenas, y el payload

Abre [`demo/01-strings.html`](./demo/01-strings.html). Tres productos se renderizan como tarjetas; el nombre del tercero es una cadena maliciosa.

1. Deja **Modo inseguro** sin marcar: la tercera tarjeta muestra el marcado crudo como texto. No se ejecuta nada.
2. Marca **Modo inseguro**: aparece un banner rojo. Se ha ejecutado código procedente del "nombre del producto" en tu página.
3. Inspecciona la tercera tarjeta en **Elements**: en modo inseguro hay un nodo `<img>` real con un atributo `onerror`.

**Excerpt** — `demo/01-strings.js` (las partes que importan; abre el archivo para la versión completa).

```js
function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function render(products, unsafe) {
	const list = document.getElementById('list');
	const clean = unsafe ? (value) => String(value) : escapeHtml;

	// map() convierte cada producto en una cadena HTML; join('') las une en un solo bloque.
	const html = `
		<div class="grid">
			${products
				.map(
					(p) => `
						<article class="card" data-id="${p.id}">
							<h3>${clean(p.name)}</h3>
							<p class="desc">${clean(p.description)}</p>
							<p class="price">$${p.price.toFixed(2)}</p>
						</article>
					`
				)
				.join('')}
		</div>
	`;
	document.getElementById('xss-banner').hidden = true;
	list.innerHTML = html;
}
```

Cómo se construye la cadena: un template literal (comillas invertidas) te deja incrustar `${expresión}`; `map` convierte cada producto en una cadena HTML y `join('')` las une en un bloque. Basta con olvidar una llamada a `escapeHtml` en cualquier parte de esa cadena para que el payload se ejecute: por eso las cadenas son "simples, pero más simples" de lo que es seguro.

---

## Ejercicio 2 — API nativa del DOM + `DocumentFragment`

Abre [`demo/02-dom-api.html`](./demo/02-dom-api.html). Mismos datos, mismo payload, ninguna función de escape… y no se ejecuta nada.

**Excerpt** — `demo/02-dom-api.js`.

```js
function createCard(product) {
	const article = document.createElement('article');
	article.className = 'card';
	article.dataset.id = String(product.id);

	const h3 = document.createElement('h3');
	h3.textContent = product.name; // texto, nunca se interpreta como HTML

	const pDesc = document.createElement('p');
	pDesc.className = 'desc';
	pDesc.textContent = product.description;

	const pPrice = document.createElement('p');
	pPrice.className = 'price';
	pPrice.textContent = `$${product.price.toFixed(2)}`;

	article.append(h3, pDesc, pPrice);
	return article;
}

const list = document.getElementById('list');
const frag = document.createDocumentFragment();
products.forEach((p) => frag.append(createCard(p)));
list.replaceChildren(frag); // una inserción, un repintado
```

La razón es estructural: “Given a string, `createTextNode` gives us a text node that we can insert into the document to make it show up on the screen” (Haverbeke 2024, cap. 14). [Traducción propia: «A partir de una cadena, `createTextNode` nos da un nodo de texto que podemos insertar en el documento para que aparezca en pantalla».] Un nodo de texto se muestra, nunca se interpreta: `textContent` da la misma garantía en una sola asignación.

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/marijn_haverbeke_eloquent_javascript_no_starch_press_2024_6eab5aec; node: 43e22d53-b256-5398-962a-9fef6de148e8
Locator: EPUB spine page_index=40 = OPS/xhtml/ch14.xhtml "14. THE DOCUMENT OBJECT MODEL" -> public "chap. 14". Verbatim checked against EPUB XHTML. Year: coat/registry 2024; copyright page reads (c) 2025.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

| Método | Qué hace |
| --- | --- |
| `document.createElement(tag)` | Elemento nuevo, sin insertar |
| `node.textContent = …` | Fija texto; el HTML se muestra literal |
| `node.className` / `classList` | Fija clases |
| `node.dataset.key = …` | Fija un atributo `data-key` |
| `parent.append(a, b, …)` | Inserta nodos o cadenas (como texto) |
| `parent.replaceChildren(…)` | Vacía e inserta en una sola llamada |
| `document.createDocumentFragment()` | Contenedor fuera del DOM para agrupar |
| `parent.addEventListener(…)` en un contenedor | Un listener para muchos elementos (delegación) |

---

## Ejercicio 3 — Laboratorio en tu portfolio

Lleva el patrón seguro a tu repo: renderiza una lista (proyectos, habilidades, enlaces) a partir de un array.

**Control de IA:** si pides esta función a un asistente, pega el nombre malicioso de la demo 1 en tu array antes de aceptar la respuesta. Si el payload se ejecuta, la respuesta queda rechazada: anótalo en tu línea de IA.

**Template** — sustituye el array por tu contenido y `#projects` por un contenedor que exista en `index.html`.

```js
const projects = [
	{ title: 'Cartel tipográfico', url: 'https://example.com/poster', year: 2026 },
	{ title: 'Estudio de retícula', url: 'https://example.com/grid', year: 2026 },
];

function createProjectItem(project) {
	const li = document.createElement('li');
	const link = document.createElement('a');
	link.href = project.url;
	link.textContent = `${project.title} (${project.year})`;
	li.append(link);
	return li;
}

const container = document.querySelector('#projects');

if (container) {
	const frag = document.createDocumentFragment();
	projects.forEach((p) => frag.append(createProjectItem(p)));
	container.replaceChildren(frag);
}
```

Después escribe debajo, como comentario, la versión con cadenas de `createProjectItem`, y una frase sobre cuál conservas y por qué.

**Excerpt**

```bash
git add assets/js/main.js index.html
git commit -m "feat(js): render project list with DOM API (textContent)"
```

---

## Profundización opcional: `<template>` y el camino a los componentes

### `<template>` + clonado

Abre [`demo/03-template.html`](./demo/03-template.html). El marcado de la tarjeta vive dentro de un `<template>` inerte; JS lo clona y lo rellena.

**Excerpt** — `demo/03-template.js`.

```js
function renderCard(product) {
	const fragment = document.importNode(template.content, true);
	fragment.querySelector('.card').dataset.id = String(product.id);
	fragment.querySelector('.title').textContent = product.name;
	fragment.querySelector('.desc').textContent = product.description;
	fragment.querySelector('.price').textContent = `$${product.price.toFixed(2)}`;
	return fragment;
}
```

`template.content` es un `DocumentFragment` que no está en la página viva. MDN recomienda `document.importNode(template.content, true)` en lugar de `cloneNode(true)` para que los custom elements internos se construyan con las definiciones del documento actual; con HTML normal ambos funcionan. Rellenar con `textContent` mantiene intacta la frontera de confianza.

### Un pequeño helper hyperscript

Abre [`demo/04-hyperscript.html`](./demo/04-hyperscript.html). Una función `h(type, props, ...children)` envuelve `createElement`, `textContent` y `append`.

**Excerpt** — `demo/04-hyperscript.js`.

```js
function Card({ id, name, description, price }) {
	return h(
		'article',
		{ className: 'card', 'data-id': String(id) },
		h('h3', {}, name),
		h('p', { className: 'desc' }, description),
		h('p', { className: 'price' }, `$${price.toFixed(2)}`)
	);
}
```

Esa es la forma a la que se compila [JSX](https://es.react.dev/learn/writing-markup-with-jsx) en React: una sintaxis parecida a HTML se convierte en llamadas a funciones, y un runtime transforma el resultado en nodos del DOM. Los frameworks cambian *cómo describes* la UI; no eliminan la frontera de confianza: la vía de escape de React para HTML crudo se llama literalmente `dangerouslySetInnerHTML`.

---

## Preguntas críticas del Atelier

- **Exploración:** ¿qué es lo más rápido para prototipar? ¿Qué es lo más seguro por defecto?
- **Reflexión:** ¿cuándo son aceptables las cadenas? (Marcado estático y confiable que has escrito tú.)
- **Conceptualización:** ¿qué significa "UI = datos + render" en la demo 2?
- **Producción:** ¿puedes refactorizar la demo 1 hasta la demo 2 sin cambiar lo que ve el usuario?
- **Exhibición:** enseña el modo inseguro a un compañero y explica por qué el `<img>` se ejecuta pero un `<script>` no lo haría.

---

## Ampliaciones (opcional)

- Haz clic en una tarjeta para activar una clase `selected`, con **un** listener en la retícula (delegación de eventos).
- Añade un input de filtro que vuelva a renderizar la lista; compara cadenas frente a actualizaciones incrementales del DOM.

---

## Lecturas recomendadas

- [MDN — Element.innerHTML (consideraciones de seguridad)](https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML)
- [MDN — elemento `<template>`](https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/template)
- [OWASP — Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [react.dev — Escribir marcado con JSX](https://es.react.dev/learn/writing-markup-with-jsx) (antes de React en el semestre 2)

---

## Lo que ahora deberías entender

- Hay varias formas válidas de cambiar el DOM, cada una con un coste de confianza distinto.
- Por qué `textContent` + `createElement` es el patrón seguro por defecto para datos de usuario.
- Cómo ver un payload XSS ejecutarse y demostrar que tu código lo detiene.
- Por qué los frameworks de componentes se apoyan en el mismo DOM y en la misma frontera.

{% comment %}
outcome-graphic-selection:
  source-section: "Lo que ahora deberías entender"
  visual-grammar: "rendering-trust-boundary — untrusted input crossing a guarded rendering boundary into a safe document surface"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Referencias

- Haverbeke, Marijn. 2024. *Eloquent JavaScript: A Modern Introduction to Programming*. 4.ª ed. San Francisco: No Starch Press.
