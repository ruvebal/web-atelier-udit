---
layout: lesson
title: 'Introducción a JS'
title_alt: 'Introduction to JS'
slug: js-intro
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-intro/
status: complete
tags: [javascript, fundamentals, events, dom, devtools]
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> JavaScript es un modelo de navegador/runtime, no solo sintaxis.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** eventos, DOM, tipos, control de flujo y ejecución en el navegador. **Señal de frontera:** las APIs del navegador y la interacción asíncrona amplían la frontera del runtime.</p>
</aside>

> **Prueba de estudio:** Dibuja el bucle evento → DOM → feedback al usuario antes de programar.

> _"El río no empuja; permite. El maestro desarrollador no fuerza el desplazamiento: canaliza su flujo."_
> — Tao of Development, `js-002`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 7** — fundamentos de JavaScript, el DOM y el modelo de eventos en `assets/js/main.js` de tu repo de portfolio (después de las Sesiones 3–6 de CSS).

**No para:** módulos ES (Sesión 9), configuración de linting (Sesión 10), frameworks ni React (semestre 2).

**Al terminar esta sesión tendrás:** JS funcionando en `main.js`, al menos una actualización del DOM provocada por el usuario y notas de DevTools en tu reflexión ATELIER.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesiones 3–6 completas (HTML semántico + CSS en el repo) | Sí |
| Existe `assets/js/main.js` (puede estar vacío) | Sí |
| Live Server (VS Code) o cualquier servidor estático | Sí |
| Chrome o Edge con DevTools | Sí |
| [Trabajo previo: Fundamentos de JavaScript]({{ '/lessons/es/js-fundamentals/' | relative_url }}) — de variables a objetos, errores (MDN Core 6.1–6.8) | Sí (≈ 3–4 h autónomas) |

**Tiempo oficial:** 3 h en clase (≈ 0,5 h encuadre · 0,5 h ejercicios guiados · 1,5 h laboratorio).

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Dibuja en papel el bucle evento → DOM → feedback | El modelo de ejecución |
| 2 | Abre DevTools; ejecuta expresiones; cambia un nodo con `$0` | Primero, DevTools |
| 3 | Conoce `window` y `document`; selecciona un nodo y cambia su texto desde JS | `window` y `document` · El DOM |
| 4 | Conecta un botón a un listener que actualice la página | Eventos |
| 5 | Haz los tres commits en `main.js` | Laboratorio |
| 6 | Push + reflexión de una línea + línea de IA | Entrega |

---

## Comprueba antes de salir

- [ ] `main.js` carga sin errores de consola en tu URL de Pages
- [ ] Al menos una acción del usuario cambia **contenido visible de la página** (no un `alert`)
- [ ] Sabes explicar `addEventListener` frente a `onclick` en línea en una frase
- [ ] Has usado el panel Elements para inspeccionar un nodo que cambiaste desde JS
- [ ] Sin mirar el código, puedes narrar tu handler como *evento → nodo → cambio* (si un asistente escribió parte, esta casilla demuestra que lo entiendes)
- [ ] Commit subido a GitHub

---

## Fallos frecuentes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| `main.js` no se ejecuta | Script sin enlazar o ruta incorrecta | `<script src="assets/js/main.js" defer></script>` dentro de `<head>` |
| `null` al consultar el DOM | El script corre antes de que exista el HTML | Usa `defer` o envuelve en `DOMContentLoaded` |
| Los cambios no se ven | Elemento equivocado o selector con errata | Haz `console.log(document.querySelector(...))` |
| El botón no hace nada | Listener en el nodo equivocado, o un `<form>` recarga la página | Inspecciona el nodo; llama a `event.preventDefault()` en `submit` |
| El asistente propone `import`, JSX, `$(...)` o un framework | La IA sugiere el stack que más ha visto, no el que necesita esta sesión | Recházalo. Esta semana: `main.js` sin librerías |

---

## Entrega (evidencia Sesión 7)

- URL del repo en GitHub + commit(s) que toquen `assets/js/main.js`
- Nota de una línea: qué evento has gestionado y qué feedback ve el usuario en el DOM
- **Línea de IA:** `IA: <herramienta> / ninguna · una sugerencia que rechacé y por qué` — este hábito se evalúa más adelante con la [rúbrica de declaración de IA y defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objetivos

- Explicar qué hace JavaScript **en el navegador**: parsear → DOM → escuchar → reaccionar → repintar.
- Usar **DevTools** (Console, Elements, Sources) como primera herramienta de depuración.
- **Seleccionar** y **cambiar** nodos del DOM de forma segura con `textContent` y `classList`.
- Añadir **listeners de eventos** y dar feedback visible al usuario.
- Dejar tres commits pequeños y explicados en `assets/js/main.js`.

---

## Cómo funciona el código en esta lección

Cada bloque de código lleva etiqueta:

- **CodeSandbox-ready** — completo y ejecutable tal cual.
- **Excerpt** — un fragmento: pégalo en la Console o en un archivo existente; depende de su contexto.
- **Template** — un punto de partida que debes adaptar (nombres, selectores, textos).

El código ejecutable vive en **tu repo de portfolio** (`index.html` + `assets/js/main.js`), no en un sandbox; la convención de sandbox React con rutas de unidades posteriores no se aplica a esta sesión vanilla.

---

## Referencias de JavaScript

Las tres referencias que este curso usa en todas las sesiones de JavaScript:

| Función | Referencia |
| --- | --- |
| Estándar — referencia vigente | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) (en inglés) |
| Documentación recomendada | [MDN Web Docs — JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) |
| Marca registrada | [JavaScript en Oracle](https://www.oracle.com/developer/javascript/) (en inglés) — como indica MDN: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries” (“Java” y “JavaScript” son marcas comerciales o registradas de Oracle en EE. UU. y otros países). |
| Itinerario de aprendizaje | [MDN Curriculum — Core 6. JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) (en inglés) — esta sesión cubre 6.9 DOM scripting (`Window`, `Document`, seleccionar nodos, `classList`), 6.10 Events y 6.15 Debugging. 6.1–6.8 (de variables a objetos) están en el [trabajo previo]({{ '/lessons/es/js-fundamentals/' | relative_url }}). |

Páginas de referencia de esta sesión: [`Window`](https://developer.mozilla.org/es/docs/Web/API/Window) · [`Document`](https://developer.mozilla.org/es/docs/Web/API/Document) · [`Introducción al DOM`](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Introduction) · [`querySelector()`](https://developer.mozilla.org/es/docs/Web/API/Document/querySelector) · [`textContent`](https://developer.mozilla.org/es/docs/Web/API/Node/textContent) · [`classList`](https://developer.mozilla.org/es/docs/Web/API/Element/classList) · [`addEventListener()`](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener).

---

## El modelo de ejecución

Antes de la sintaxis, la forma de lo que ocurre:

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-07-event-loop-es-a5fe9fdf650c.svg' | relative_url }}" width="680" height="366" alt="El bucle de eventos de esta sesión" aria-describedby="fe-i-07-event-loop-caption" loading="lazy" />
<figcaption id="fe-i-07-event-loop-caption"><strong>El bucle de eventos de esta sesión.</strong> Una vez, al cargar, <code>main.js</code> registra los listeners. Después, cada interacción recorre el mismo bucle: evento → listener → cambio en el DOM → repintado → feedback perceptible. El paso resaltado es lo que comprueba la prueba de estudio. <span class="image-credit">Figura de @ruvebal con visual-forger 1.2.0.</span></figcaption>
</figure>

Tres hechos sostienen casi toda la sesión:

1. **JS espera.** Tras la primera ejecución, tu código está casi siempre inactivo hasta que se dispara un evento.
2. **El DOM no es el archivo HTML.** Es el árbol vivo que el navegador construyó a partir de él; JS edita el árbol, nunca el archivo.
3. **El feedback debe ser perceptible.** Si el usuario no puede ver u oír (lector de pantalla) el cambio, el bucle no se cierra.

---

## Primero, DevTools

Abre DevTools: **Cmd ⌘ + ⌥ + I** (macOS) / **Ctrl + Shift + I** (Windows/Linux).

### Console — ejecuta JS en vivo

**Excerpt** — escribe cada línea en la Console.

```js
1 + 2;
document.title;
typeof window;
console.table([{ name: 'Ana', skills: 3 }, { name: 'Leo', skills: 5 }]);
```

### Elements — inspecciona y cambia el DOM

Clic derecho en cualquier elemento → **Inspeccionar**. El nodo seleccionado está disponible en la Console como `$0`.

**Excerpt** — ejecútalo en la Console con un nodo seleccionado en Elements.

```js
$0.textContent = 'Cambiado desde la Console';
$0.classList.add('highlighted');
$0.parentElement;
```

Minirreto: cambia el texto de tu `h1` sin recargar y después recarga: el cambio desaparece. Esa es la diferencia DOM frente a archivo, hecha visible.

### Sources — pausa tu propio código

1. Abre `assets/js/main.js` en **Sources**.
2. Haz clic en un número de línea para poner un breakpoint (marca azul) y provoca el código (recarga o haz clic).
3. En pausa, pasa el ratón por las variables o añádelas a **Watch**; usa **Step over** (F10) y **Step into** (F11).
4. O escribe `debugger;` en tu código: la ejecución se detiene ahí con DevTools abierto. Quítalo antes del commit.

> Prefiere breakpoints y `console.log` a `alert()`: `alert` bloquea la página y oculta el estado que intentas ver.

---

## `window` y `document`: donde empieza tu código

Todo script de una página arranca con dos objetos ya disponibles.

| Objeto | Qué representa | Para qué lo usas |
| --- | --- | --- |
| [`window`](https://developer.mozilla.org/es/docs/Web/API/Window) | La pestaña del navegador — viewport, URL, temporizadores — y el **objeto global** | `scrollY`, `innerWidth`, `location`; escuchar `scroll` / `resize` |
| [`document`](https://developer.mozilla.org/es/docs/Web/API/Document) | La página cargada en esa pestaña — la puerta de entrada al árbol DOM | `querySelector()`, `createElement()`, `title`, `body` |

`document` es a su vez una propiedad de `window`, así que `window.document === document`. Como `window` es el objeto global, puedes escribir `document` en lugar de `window.document` e `innerWidth` en lugar de `window.innerWidth`. En un script clásico, las declaraciones `function` y `var` de nivel superior también se convierten en propiedades de `window`: el ámbito global compartido que la Sesión 9 sustituye por módulos.

**Excerpt** — ejecútalo en la Console, redimensiona la ventana y vuelve a ejecutar las dos últimas líneas.

```js
window.document === document; // true
document.title;
window.innerWidth;
window.location.href;
```

Regla práctica: escucha en `window` los eventos de pestaña y viewport (`scroll`, `resize`); escucha en los elementos lo que el usuario hace con el contenido (`click`, `input`, `submit`).

---

## El DOM: seleccionar y cambiar

**Excerpt** — supone que existe `<h1 id="title">Hola</h1>` en tu HTML.

```js
const title = document.querySelector('#title');

if (title) {
	title.textContent = 'Modificado con JS';
	title.classList.add('is-updated');
}
```

| Tarea | Usa | Evita esta semana |
| --- | --- | --- |
| Encontrar un nodo | `document.querySelector('#id')` / `('.clase')` | Adivinar — haz log primero |
| Cambiar texto | `node.textContent = '…'` | `innerHTML` (la Sesión 8 muestra por qué) |
| Cambiar estilo | `node.classList.add/remove/toggle('…')` + regla CSS | Cadenas largas de `node.style.*` |
| Leer un campo | `input.value` | — |

Protege siempre con `if (node)`: un selector que devuelve `null` es el error más común de la Sesión 7.

---

## Eventos: la lógica del front end

**Excerpt** — supone un `<button id="btn">` y un `<p id="status">`.

```js
const btn = document.querySelector('#btn');
const status = document.querySelector('#status');

btn.addEventListener('click', (event) => {
	status.textContent = `Pulsado a las ${new Date().toLocaleTimeString()}`;
	console.log('target:', event.target);
});
```

En el resumen de Haverbeke, “Event handlers make it possible to detect and react to events happening in our web page. The `addEventListener` method is used to register such a handler” (Haverbeke 2024, cap. 15). [Traducción propia: «Los manejadores de eventos permiten detectar y reaccionar a los eventos que ocurren en nuestra página web. El método `addEventListener` se usa para registrar ese manejador».]

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/marijn_haverbeke_eloquent_javascript_no_starch_press_2024_6eab5aec; node: b9a81fd8-78d7-5336-b4a8-7d3fa9dbe9d4
Locator: EPUB spine page_index=42 = OPS/xhtml/ch15.xhtml "15. HANDLING EVENTS" -> public "chap. 15". Verbatim checked against EPUB XHTML (extraction drops spaces around inline code). Year: coat/registry 2024 + printer key "24 1"; copyright page reads (c) 2025.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

**Por qué `addEventListener` y no `onclick="…"` en el HTML:** el comportamiento se queda en `main.js`, puedes añadir varios listeners y el HTML sigue siendo semántico.

| Evento | Uso típico |
| --- | --- |
| `click` | Botones, enlaces, interruptores |
| `input` | Actualizar mientras se escribe |
| `submit` | Formularios (llama a `event.preventDefault()` para quedarte en la página) |
| `keydown` | Atajos; acceso por teclado |
| `scroll` | Estado del header, indicadores de progreso |
| `DOMContentLoaded` | Ejecutar cuando el DOM está parseado (innecesario con `defer`) |

Notas de UX:

- Usa elementos `<button>` reales: reciben foco y disparan `click` con Enter/Espacio sin código extra.
- Los eventos de alta frecuencia (`scroll`, `pointermove`) deben hacer poco trabajo; marca los listeners de scroll con `{ passive: true }`.
- Anuncia los cambios a lectores de pantalla con `aria-live="polite"` en el nodo de feedback.

---

## Laboratorio: tres commits en `assets/js/main.js`

**Control de IA (explica antes de pegar):** antes de aceptar cualquier sugerencia para estos pasos, escribe una frase en tus notas: *"Cuando el usuario ___, el nodo ___ cambia a ___."* Si no puedes escribirla, no pegues el código.

### Requisitos previos

- Tu repo de portfolio abierto en VS Code y servido con Live Server.
- `index.html` enlaza el script una sola vez, en `<head>`:

**Excerpt** — la única etiqueta de script que necesitas en esta sesión.

```html
<script src="assets/js/main.js" defer></script>
```

### Commit 1 — Conectar y cambiar un nodo

**Template** — sustituye `#title` por un selector que exista en tu página.

```js
console.log('main.js cargado');

const title = document.querySelector('#title');

if (title) {
	title.textContent = 'Texto cambiado desde main.js';
}
```

Comprueba en **Console**: aparece el mensaje y el texto del encabezado ha cambiado.
Si ves `null` en un log → el selector no coincide con nada de tu HTML.

**Excerpt**

```bash
git add assets/js/main.js
git commit -m "feat(js): connect main.js and update title"
```

### Commit 2 — Un clic que cambia la página

Añade un botón y un nodo de feedback a `index.html`:

**Template** — colócalo donde tenga sentido en tu maquetación; adapta el texto.

```html
<button id="btn-action" type="button">Ver disponibilidad</button>
<p id="status" aria-live="polite"></p>
```

**Template** — adapta el mensaje a tu portfolio.

```js
const btn = document.querySelector('#btn-action');
const status = document.querySelector('#status');
let clicks = 0;

if (btn && status) {
	btn.addEventListener('click', () => {
		clicks += 1;
		status.textContent = `Disponible para proyectos — lo has preguntado ${clicks} vez/veces.`;
	});
}
```

Comprueba: clic → el texto del párrafo cambia y el contador crece. Inspecciona `#status` en **Elements** y míralo actualizarse.
Si no pasa nada → pon un breakpoint dentro del listener y vuelve a hacer clic.

**Excerpt**

```bash
git add index.html assets/js/main.js
git commit -m "feat(js): button updates status text"
```

### Commit 3 — Estado de scroll mediante una clase CSS

Comportamiento en JS, apariencia en CSS:

**Template** — adapta los colores a los tokens de diseño de las Sesiones 3–6.

```css
header {
	transition: background-color 0.2s, color 0.2s;
}
header.is-scrolled {
	background-color: rgb(0 0 0 / 0.8);
	color: white;
}
```

**Excerpt** — añádelo al final de `main.js`.

```js
const header = document.querySelector('header');

if (header) {
	window.addEventListener(
		'scroll',
		() => {
			header.classList.toggle('is-scrolled', window.scrollY > 100);
		},
		{ passive: true }
	);
}
```

Comprueba: baja → el header cambia; sube → vuelve. En **Elements** mira cómo se activa y desactiva el atributo `class`.
Si la clase nunca aparece → puede que tu página sea demasiado corta para pasar de 100 px.

**Excerpt**

```bash
git add assets/css assets/js/main.js
git commit -m "feat(js): header state on scroll via class toggle"
```

### Resumen

Tras los tres commits tu `main.js`:

1. Demuestra que está conectado y cambia un nodo (Commit 1).
2. Responde a un clic con feedback visible y anunciado (Commit 2).
3. Activa una clase CSS desde un evento de scroll (Commit 3).

{% comment %}
outcome-graphic-selection:
  source-section: "Resumen"
  visual-grammar: "browser-event-runtime — browser events moving through runtime, state, and document response"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Extra (opcional)

**Excerpt** — refleja un input en la página mientras el usuario escribe.

```js
const input = document.querySelector('input');
const output = document.querySelector('#output');

if (input && output) {
	input.addEventListener('input', () => {
		output.textContent = input.value;
	});
}
```

**Excerpt** — registra teclas (útil para atajos y pruebas de accesibilidad).

```js
document.addEventListener('keydown', (event) => {
	console.log('Tecla pulsada:', event.key);
});
```

---

## Metodología ATELIER aplicada

- **Observar**: mira cómo cambia el DOM en Elements mientras interactúas.
- **Intervenir**: un commit pequeño por comportamiento.
- **Reflexionar**: escribe la frase evento → nodo → cambio de cada commit.
- **Compartir**: haz push y enseña a un compañero el bucle que dibujaste.

---

## Referencias

- Haverbeke, Marijn. 2024. *Eloquent JavaScript: A Modern Introduction to Programming*. 4.ª ed. San Francisco: No Starch Press.
