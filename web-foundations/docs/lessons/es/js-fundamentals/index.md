---
layout: lesson
title: 'Fundamentos de JavaScript (trabajo previo de la Sesión 7)'
title_alt: 'JavaScript Fundamentals (Session 7 pre-work)'
slug: js-fundamentals
date: 2026-10-13
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-fundamentals/
status: complete
tags: [javascript, fundamentals, variables, functions, objects, pre-work]
description: 'Trabajo previo autónomo para la Sesión 7: el núcleo del lenguaje — valores, texto, arrays, decisiones, bucles, funciones, objetos y errores — practicado en la Console de DevTools.'
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> Un programa son datos más decisiones; el lenguaje es cómo nombras ambos.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** valores, colecciones, control de flujo, funciones y objetos, probados línea a línea en la Console. **Señal de frontera:** los asistentes escriben sintaxis al instante; predecir qué hace una línea es la habilidad que sigue siendo tuya.</p>
</aside>

> **Prueba de estudio:** Predice la salida de una línea antes de ejecutarla y explica cualquier sorpresa.

> _"Construir → Escribir → Comprender - Las tres etapas de la iluminación del código."_
> — Tao of Development, `cc-071`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** **trabajo previo de la Sesión 7** de Front-End I — el núcleo del lenguaje JavaScript, estudiado por tu cuenta antes de la clase de la Sesión 7 (runtime del navegador, DOM, eventos).

**No para:** el DOM y los eventos (Sesión 7 en clase), el renderizado (Sesión 8), los módulos (Sesión 9), el código asíncrono y `fetch()` (más adelante en el curso).

**Al terminar este trabajo previo tendrás:** un archivo `practice.js` construido con los ejercicios, la autoevaluación respondida en tus notas ATELIER y el vocabulario que la Sesión 7 da por sabido el primer día.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Chrome o Edge con DevTools | Sí |
| VS Code (Sesión 1) | Sí |
| Programación previa (C++, PHP, Python…) | No — ayuda, pero no se da por sabida |

**Tiempo oficial:** estudio autónomo antes de la Sesión 7, ≈ 3–4 h a tu ritmo (no es tiempo de clase). La Sesión 7 empieza con cinco minutos sobre la autoevaluación.

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Abre la Console de DevTools en cualquier página | Cómo practicar |
| 2 | Recorre las secciones 1–8 ejecutando cada fragmento | Variables → Objetos |
| 3 | Lee los tres tipos de error y rompe algo a propósito | Errores |
| 4 | Construye el miniproyecto en `practice.js` | Miniproyecto |
| 5 | Responde la autoevaluación sin ejecutar código y luego comprueba | Autoevaluación |
| 6 | Anota lo que te sorprendió en tus notas ATELIER | Entrega |

---

## Comprueba antes de la Sesión 7

- [ ] Sabes decir qué significan `let`, `const`, `===`, `[]`, `{}` y `=>`, una línea cada uno
- [ ] Predijiste al menos 8 de las 10 salidas de la autoevaluación antes de ejecutarlas
- [ ] Tu miniproyecto imprime la lista filtrada de proyectos con template literals
- [ ] Provocaste y leíste a propósito un `ReferenceError` y un `TypeError`
- [ ] Cuando un asistente te explicó algo, reescribiste la explicación con tus palabras antes de seguir

---

## Fallos frecuentes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| `"5" + 3` da `"53"` | Un operando es una cadena, así que `+` une texto | Convierte primero: `Number("5") + 3` |
| `TypeError: Assignment to constant variable` | Reasignar una `const` | Usa `let` para valores que cambian |
| `ReferenceError: x is not defined` | Errata, o el nombre está fuera del ámbito actual | Revisa la ortografía; declara donde se usa |
| Una función devuelve `undefined` | Falta `return` | Devuelve con `return` el valor calculado |
| `==` dice que dos cosas distintas son iguales | La igualdad laxa convierte tipos | Usa `===` |
| Un asistente te da las respuestas de la autoevaluación hechas | Le pediste que resolviera, no que explicara | Predice primero, ejecuta después; pregúntale *por qué*, nunca *qué* |

---

## Entrega (evidencia del trabajo previo)

- `practice.js` subido a tu repo de portfolio (no se enlaza desde `index.html`: es tu borrador)
- Autoevaluación: tus predicciones, las salidas reales y una frase por cada fallo, en tus notas ATELIER
- **Línea de IA:** `IA: <herramienta> / ninguna · una explicación que reescribí con mis palabras` — el hábito que se evalúa después con la [rúbrica de declaración de IA y defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objetivos

- Guardar y cambiar valores con `let` y `const`, y nombrarlos bien.
- Calcular con números y comparar con `===`.
- Construir texto con template literals y métodos de cadena comunes.
- Guardar listas en arrays y transformarlas con `map()` y `filter()`.
- Elegir caminos con condicionales y repetir trabajo con bucles.
- Empaquetar lógica en funciones y saber en qué ámbito vive un nombre.
- Modelar cosas como objetos y leer sus propiedades.
- Leer los tres mensajes de error habituales en lugar de adivinar.

---

## Cómo funciona el código en esta lección

- **CodeSandbox-ready** — completo: pégalo en la Console de DevTools (o en un archivo `.js`) y se ejecuta tal cual.
- **Excerpt** — un fragmento que necesita contexto alrededor.
- **Template** — un punto de partida que debes adaptar.

No hay configuración de proyecto: abre DevTools (**Cmd ⌘ + ⌥ + I** / **Ctrl + Shift + I**), elige **Console**, pega un bloque y pulsa Enter. Cada bloque declara sus propios nombres, así que si la Console dice que un nombre "has already been declared", recarga la página. La convención de sandbox React con rutas de unidades posteriores no se aplica aquí.

---

## Referencias de JavaScript

Las tres referencias que este curso usa en todas las sesiones de JavaScript:

| Función | Referencia |
| --- | --- |
| Estándar — referencia vigente | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) (en inglés) |
| Documentación recomendada | [MDN Web Docs — JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) |
| Marca registrada | [JavaScript en Oracle](https://www.oracle.com/developer/javascript/) (en inglés) — como indica MDN: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries” (“Java” y “JavaScript” son marcas comerciales o registradas de Oracle en EE. UU. y otros países). |
| Itinerario de aprendizaje | [MDN Curriculum — Core 6. JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) (en inglés) — este trabajo previo cubre 6.1–6.8 y lo básico de errores de 6.15; la Sesión 7 sigue con 6.9 DOM scripting y 6.10 Events. |

Páginas de referencia de este trabajo previo: [Scripting dinámico con JavaScript (MDN Learn)](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting) · [Gramática y tipos](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types) · [Referencia de errores de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Errors).

---

## 1. Variables y valores (MDN 6.1)

Una variable es una caja con nombre para un valor. Las cajas `let` se pueden rellenar de nuevo; las `const`, no.

**CodeSandbox-ready**

```js
const studentName = 'Ana';
let completedSessions = 6;
completedSessions = completedSessions + 1;

const isEnrolled = true;
const skills = ['HTML', 'CSS'];
const profile = { name: studentName, sessions: completedSessions };

console.log(typeof studentName, typeof completedSessions, typeof isEnrolled);
console.log(Array.isArray(skills), typeof profile);
```

- Cinco tipos de valor que verás a diario: **string**, **number**, **boolean**, **array**, **object**.
- Usa `const` por defecto; pasa a `let` solo si el valor debe cambiar. Evita `var` (más antiguo, ámbito más laxo).
- Nombra por significado: `completedSessions`, no `cs` ni `data`. JavaScript usa `camelCase`.

## 2. Números y operadores (MDN 6.2)

**CodeSandbox-ready**

```js
const price = 19.99;
const quantity = 3;
console.log(price * quantity);

console.log('5' + 3); // une texto
console.log(Number('5') + 3); // suma

let count = 0;
count += 2;
count++;
console.log(count);

console.log(5 === 5, 5 === '5', 5 == '5');
console.log(Math.floor(Math.random() * 6) + 1); // una tirada de dado
```

- `+ - * /` funcionan como esperas con números; con una cadena, `+` une texto.
- Compara con `===` / `!==` (valor **y** tipo). `==` convierte tipos primero y sorprende.
- La precedencia sigue a las matemáticas: `2 + 3 * 4` es `14`; usa paréntesis para ser explícito.

## 3. Texto (MDN 6.3)

**CodeSandbox-ready**

```js
const first = 'Ana';
const city = "Madrid";
const greeting = `Hello, ${first} from ${city}!`;
console.log(greeting);

const title = 'Typography Poster';
console.log(title.length, title.toUpperCase(), title.includes('Poster'));
console.log(title.slice(0, 10), title.replace('Poster', 'Study'));

const multiline = `Line one
Line two`;
console.log(multiline);
```

- Las comillas simples o dobles deben coincidir; dentro, escapa con `\` (`'It\'s'`) o cambia de tipo de comilla.
- Los **template literals** (comillas invertidas) incrustan valores con `${…}` y pueden ocupar varias líneas; la Sesión 8 construye HTML con ellos, así que acostúmbrate aquí.

## 4. Arrays (MDN 6.4)

**CodeSandbox-ready**

```js
const tools = ['VS Code', 'Git', 'DevTools'];
console.log(tools[0], tools.length);

tools.push('Figma');
tools[1] = 'GitHub';
console.log(tools.join(' · '));
console.log('a,b,c'.split(','));

const years = [2024, 2025, 2026];
const doubled = years.map((year) => year * 2);
const recent = years.filter((year) => year >= 2025);
years.forEach((year) => console.log(`Year ${year}`));
console.log(doubled, recent);
```

- Se indexa desde `0`; el último elemento es `array[array.length - 1]`.
- `map()` devuelve un array **nuevo** con los elementos transformados; `filter()`, un array nuevo con los que pasan una prueba; `forEach()` solo ejecuta código por cada elemento.

## 5. Condicionales (MDN 6.5)

**CodeSandbox-ready**

```js
const hour = 15;
if (hour < 12) {
	console.log('Good morning');
} else if (hour < 20) {
	console.log('Good afternoon');
} else {
	console.log('Good evening');
}

const hasRepo = true;
const hasPagesUrl = false;
console.log(hasRepo && hasPagesUrl, hasRepo || hasPagesUrl, !hasPagesUrl);

const status = hasPagesUrl ? 'published' : 'draft';
console.log(status);
```

- `&&` (y), `||` (o), `!` (no) combinan pruebas.
- El ternario `prueba ? a : b` elige uno de dos valores; muy útil dentro de template literals.
- `switch` existe para muchos casos fijos; con `if … else if` tienes lo que necesitas ahora.

## 6. Bucles (MDN 6.6)

**CodeSandbox-ready**

```js
for (let i = 1; i <= 3; i++) {
	console.log(`Session ${i}`);
}

const colors = ['red', 'green', 'blue', 'stop', 'violet'];
for (const color of colors) {
	if (color === 'green') continue; // salta este
	if (color === 'stop') break; // sal del bucle
	console.log(color);
}
```

- Usa un `for` con contador cuando necesites el número; `for … of` cuando necesites cada elemento.
- Con arrays, `map`/`filter`/`forEach` sustituyen a menudo a un bucle escrito a mano.

## 7. Funciones (MDN 6.7)

**CodeSandbox-ready**

```js
function area(width, height) {
	return width * height;
}
console.log(area(4, 3));

const toSlug = (text) => text.toLowerCase().replaceAll(' ', '-');
console.log(toSlug('Typography Poster'));

const siteName = 'Portfolio'; // ámbito global: visible en todo lo de abajo
function label(page) {
	const separator = ' · '; // ámbito de función: solo dentro de label()
	return `${page}${separator}${siteName}`;
}
console.log(label('Home'));

function twice(action) {
	action();
	action();
}
twice(() => console.log('callback ran'));
```

- Los **parámetros** son los nombres de la definición; los **argumentos**, los valores que pasas.
- Sin `return`, una función devuelve `undefined`.
- **Ámbito:** un nombre declarado dentro de `{ … }` solo existe ahí. Los nombres de nivel superior son globales; la Sesión 9 muestra por qué demasiados globales hacen daño.
- Un **callback** es una función que se pasa a otra función. El `addEventListener('click', () => …)` de la Sesión 7 es exactamente esto.
- Un **método** es una función guardada en un objeto: `title.toUpperCase()`, `console.log()`.

## 8. Objetos (MDN 6.8)

**CodeSandbox-ready**

```js
const project = {
	title: 'Grid study',
	year: 2026,
	tags: ['css', 'layout'],
	author: { name: 'Ana', city: 'Madrid' },
	describe() {
		return `${this.title} (${this.year})`;
	},
};

console.log(project.title, project['year']);
console.log(project.tags[0], project.author.city);
console.log(project.describe());

const { title, year } = project; // desestructuración
console.log(title, year);
```

- Sintaxis de punto `project.title` para nombres conocidos; de corchetes `project[key]` cuando el nombre está en una variable.
- Dentro de un método, `this` es el objeto sobre el que se llamó.
- Casi todo lo que tocas en el navegador es un objeto: `document`, `window`, `console`, los arrays, los elementos.

## Errores: lee primero el mensaje (MDN 6.15)

**CodeSandbox-ready** — ejecútalo y lee cada mensaje que imprime la Console.

```js
try {
	console.log(totla); // ReferenceError: totla is not defined
} catch (error) {
	console.error(error.name, error.message);
}

try {
	const nothing = null;
	nothing.toUpperCase(); // TypeError: Cannot read properties of null
} catch (error) {
	console.error(error.name, error.message);
}

function requirePositive(n) {
	if (n <= 0) throw new Error('Expected a positive number');
	return n;
}
try {
	requirePositive(-1);
} catch (error) {
	console.error(error.message);
}
```

| Error | Qué suele significar |
| --- | --- |
| `SyntaxError` | El código ni siquiera se puede leer: falta un `)`, una `}` o una comilla. No se ejecuta nada del archivo. |
| `ReferenceError` | Un nombre que no existe aquí: errata o ámbito equivocado. |
| `TypeError` | El valor existe pero no puede hacer eso: llamar a un método sobre `null` / `undefined`, reasignar una `const`. |

`try … catch` permite que un programa sobreviva a un error que espera; `throw` lanza uno propio. En la Sesión 7 verás errores de `null` continuamente: `document.querySelector()` devuelve `null` cuando nada coincide.

---

## Miniproyecto: datos del portfolio en `practice.js`

Todo lo anterior junto, con datos que la Sesión 8 renderizará.

**Template** — crea `assets/js/practice.js` en tu repo, sustituye los proyectos por los tuyos y ejecútalo con la Console abierta (arrastra el archivo a una pestaña o pégalo).

```js
const projects = [
	{ title: 'Cartel tipográfico', year: 2025, tags: ['tipo', 'impresión'] },
	{ title: 'Estudio de retícula', year: 2026, tags: ['css', 'layout'] },
	{ title: 'Sistema de color', year: 2026, tags: ['css', 'color'] },
];

function formatProject(project) {
	return `${project.title} (${project.year}) — ${project.tags.join(', ')}`;
}

const recentProjects = projects.filter((project) => project.year >= 2026);

for (const line of recentProjects.map(formatProject)) {
	console.log(line);
}

console.log(`${recentProjects.length} de ${projects.length} proyectos son de 2026.`);
```

Amplíalo: añade un campo `featured: true` a un proyecto e imprime `★` delante de su título con un ternario.

**Excerpt**

```bash
git add assets/js/practice.js
git commit -m "chore(js): fundamentals pre-work practice"
```

---

## Autoevaluación (predice y luego ejecuta)

Escribe tu predicción para cada línea **antes** de ejecutarla. Las respuestas están debajo.

**Excerpt** — diez líneas independientes; ejecuta cada una por separado.

```js
typeof 42;
'7' + 1;
'7' - 1;
3 === '3';
[10, 20, 30][1];
[1, 2, 3].map((n) => n * 10);
[1, 2, 3, 4].filter((n) => n % 2 === 0);
`Total: ${2 + 3}`;
(() => {})();
({ a: 1, b: 2 }).b;
```

**Respuestas:** `'number'` · `'71'` · `6` · `false` · `20` · `[10, 20, 30]` · `[2, 4]` · `'Total: 5'` · `undefined` · `2`.
La sorpresa habitual es `'7' - 1`: `-` no tiene significado para el texto, así que JavaScript convierte `'7'` en número, mientras que `+` une texto. Esa asimetría es la razón para convertir con `Number()` a propósito.

---

## Profundización opcional: JavaScript en contexto

Contexto, por si te interesa; nada de esto hace falta para la Sesión 7.

**Historia breve**

- **1995** — Brendan Eich crea JavaScript en Netscape (Mocha → LiveScript → JavaScript).
- **1997** — ECMAScript estandariza el lenguaje entre navegadores.
- **Años 2000** — AJAX: las páginas cargan datos sin recargar (Gmail, Google Maps).
- **2009** — Node.js ejecuta JavaScript en el servidor.
- **2015 →** — ES2015 (`let`/`const`, funciones flecha, clases, módulos, Promises); versiones anuales desde entonces.

**Si ya conoces C++ o PHP**

| Concepto | C++ | JavaScript | PHP / Laravel |
| --- | --- | --- | --- |
| Variable | `int x = 10;` | `let x = 10;` / `const x = 10;` | `$x = 10;` |
| Tipado | estático, fuerte | dinámico (el tipo se decide en ejecución) | dinámico |
| Función | `int add(int a, int b)` | `const add = (a, b) => a + b;` | `function add($a, $b)` |
| Objeto | `struct` / `class` | `{ name: 'Ana' }` / `class` | array asociativo / `class` |
| Se ejecuta en | binario nativo compilado | motor del navegador (o Node.js) | servidor |
| Reacciona al usuario | bucle de eventos de la GUI | eventos del DOM, sin recargar | en cada petición (envío de formulario) |

**Node.js** ejecuta el mismo lenguaje en el servidor; lo conocerás como ejecutor de herramientas en la [lección de entorno de desarrollo]({{ '/lessons/es/entorno-de-desarrollo/' | relative_url }}#probar-nodejs-localmente-opcional) (sección 9, "Probar Node.js localmente").

---

{% comment %}
outcome-graphic-selection:
  source-section: "Miniproyecto: datos del portfolio en `practice.js`"
  visual-grammar: "data-decision-flow — a list of values filtered and transformed step by step into a result"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Lecturas recomendadas

- [MDN Learn — Scripting dinámico con JavaScript](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting): los tutoriales detrás de cada resultado MDN 6.x.
- [*Eloquent JavaScript*](https://eloquentjavascript.net/) (en inglés), Marijn Haverbeke: edición en línea gratuita; los capítulos 1–4 cubren este trabajo previo con más profundidad.

Siguiente: [Sesión 7 — Introducción a JavaScript]({{ '/lessons/es/js-intro/' | relative_url }}).
