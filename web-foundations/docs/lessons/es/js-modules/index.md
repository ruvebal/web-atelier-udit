---
layout: lesson
title: 'Módulos JavaScript: Del Caos a la Modularidad'
title_alt: 'JavaScript Modules: From Chaos to Modularity'
slug: js-modules
date: 2025-10-20
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-modules/
status: complete
tags: [javascript, modules, esm, architecture]
---

<aside class="lesson-framing" aria-label="Idea maestra y lente de campo">
<p><strong>Idea maestra:</strong> La modularidad mantiene el cambio local.</p>
<p><strong>Lente de campo:</strong> **Ancla de práctica:** imports/exports explícitos y límites de dependencia. **Señal de frontera:** ESM, grafos de paquetes y tooling de build siguen evolucionando.</p>
</aside>

> **Prueba de estudio:** Produce un grafo de imports y explica un límite de módulo.

> _"Cuando el espacio de nombres se ensancha demasiado, su significado se vuelve delgado. Cuando es demasiado estrecho, su futuro se asfixia."_
> — Tao of Development, `cc-056`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Para quién es / Para quién no

**Para:** Front-End I **Sesión 9** — dividir tu `main.js` en módulos ES con `import`/`export` en tu portfolio vanilla, usando ESM nativo del navegador servido por HTTP.

**No para:** bundlers (Vite llega en el Nivel 3 del portfolio), paquetes npm, CommonJS/`require` ni módulos de React (semestre 2).

**Al terminar esta sesión tendrás:** al menos tres archivos `.js` con exports explícitos, `index.html` cargando una única entrada `type="module"` y un grafo de imports en tu README o nota ATELIER.

---

## Antes de empezar

| Requisito | ¿Obligatorio? |
| --- | --- |
| Sesiones 7–8 completas (`main.js` con eventos + una lista renderizada) | Sí |
| Live Server u otro servidor estático (los módulos necesitan HTTP, no `file://`) | Sí |
| Historial de Git de las Sesiones 7–8 | Recomendado |

**Tiempo oficial:** 2 h en clase (≈ 0,5 h encuadre · 0,5 h ejercicios guiados · 1 h laboratorio).

---

## Sigue este camino

| Paso | Acción | Sección |
| --- | --- | --- |
| 1 | Lee por qué existen los módulos (una pantalla) | Por qué módulos |
| 2 | Aprende las cuatro reglas que cambian con `type="module"` | Qué cambia |
| 3 | Lee un par de export con nombre y uno por defecto | Sintaxis |
| 4 | Divide tu `main.js` en `utils.js`, `projects.js`, `header.js` | Laboratorio |
| 5 | Dibuja el grafo de imports y explica un límite | Prueba de estudio |
| 6 | Commit | Entrega |

---

## Comprueba antes de salir

- [ ] La página carga desde `http://127.0.0.1:…` o `http://localhost:…` (no con doble clic en `file://`)
- [ ] La Console no muestra errores de CORS, 404 ni `Cannot use import statement`
- [ ] Al menos un export con nombre, un export por defecto y sus imports, en archivos distintos
- [ ] Sabes explicar export por defecto frente a export con nombre en una frase
- [ ] Dibujaste el grafo de imports **antes** de pedir a un asistente que refactorizara, y el código final coincide con tu dibujo
- [ ] Commit subido

---

## Fallos frecuentes

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| `Cannot use import statement outside a module` | Falta `type="module"` | `<script type="module" src="assets/js/main.js"></script>` |
| 404 en un archivo de módulo | Ruta incorrecta en el `import` | Las rutas de `import` son relativas al **archivo que importa**, empiezan por `./` o `../` e incluyen `.js` |
| Error CORS con `file://` | HTML abierto con doble clic | Sirve con Live Server (o `python3 -m http.server`) |
| `does not provide an export named …` | Mezcla de export con nombre y por defecto | `export function x` ↔ `import { x }`; `export default` ↔ `import x` |
| Un valor es `undefined` al arrancar | Dos archivos se importan mutuamente (circular) | Mueve el código compartido a un tercer archivo |
| El asistente añade `vite.config.js`, `package.json`, `require(...)` o imports desde CDN | La IA supone un entorno de build que ha visto más a menudo que el ESM nativo del navegador | Recházalo. Esta sesión no necesita instalación, configuración ni build |

---

## Entrega (evidencia Sesión 9)

- Commit con la división en módulos + una etiqueta de script `type="module"`
- Grafo de imports (ASCII o lista) en el README o la reflexión, con una frase sobre un límite
- **Línea de IA:** `IA: <herramienta> / ninguna · una sugerencia que rechacé y por qué` — consulta la [rúbrica de declaración de IA y defensa oral]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objetivos de aprendizaje

- Explicar el problema que resuelven los módulos: un único ámbito global compartido.
- Usar `type="module"` y saber qué cambia (ámbito, momento de ejecución, modo estricto, HTTP).
- Escribir e importar exports **con nombre** y **por defecto**.
- Dividir tu propio `main.js` por responsabilidades y dibujar su grafo de imports.

---

## Cómo funciona el código en esta lección

- **CodeSandbox-ready** — completo y ejecutable tal cual.
- **Excerpt** — un fragmento para leer o colocar en un archivo existente.
- **Template** — un punto de partida que adaptas (nombres, selectores, contenido).

Todo el código ejecutable vive en **tu repo de portfolio** (`index.html` + `assets/js/`). Los módulos necesitan un servidor HTTP, así que un archivo abierto con doble clic no los ejecutará. La convención de sandbox React con rutas de unidades posteriores no se aplica a esta sesión vanilla.

---

## Referencias de JavaScript

Las tres referencias que este curso usa en todas las sesiones de JavaScript:

| Función | Referencia |
| --- | --- |
| Estándar — referencia vigente | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) (en inglés) |
| Documentación recomendada | [MDN Web Docs — JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) |
| Marca registrada | [JavaScript en Oracle](https://www.oracle.com/developer/javascript/) (en inglés) — como indica MDN: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries” (“Java” y “JavaScript” son marcas comerciales o registradas de Oracle en EE. UU. y otros países). |
| Itinerario de aprendizaje | [MDN Curriculum — Core 6. JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) (en inglés) — esta sesión parte de 6.7 (ámbito global frente a ámbito de función/bloque); los módulos ES van un paso más allá de ese módulo básico. |

Páginas de referencia de esta sesión: [`import`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import) · [`export`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export) · [`import() (dinámico)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) (en inglés) · [`<script type="module">`](https://developer.mozilla.org/es/docs/Web/HTML/Reference/Elements/script) · [ECMA-262 — Módulos](https://262.ecma-international.org/#sec-modules) (en inglés).

---

## Por qué módulos

Los scripts clásicos comparten **un único ámbito global**. Cada nombre de nivel superior de cada archivo acaba en el mismo sitio:

**Excerpt** — dos scripts clásicos cargados por la misma página.

```html
<script src="gallery.js"></script>  <!-- declara function render() -->
<script src="contact.js"></script>  <!-- también declara function render(): sustituye en silencio a la primera -->
```

Crockford describe el mecanismo: “In web browsers, each `<script>` tag delivers a compilation unit that is compiled and immediately executed. Lacking a linker, JavaScript throws them all together in a common global namespace” (Crockford 2008, cap. 2). [Traducción propia: «En los navegadores web, cada etiqueta `<script>` entrega una unidad de compilación que se compila y ejecuta de inmediato. Al no haber enlazador, JavaScript las junta todas en un espacio de nombres global común».]

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/crockford_douglas_javascript_the_good_parts_o_reilly_media_2008_sans_upgrade_offer_c801bfec; node: c74d0e22-eb4f-5151-88e8-fd2ea6c5dfa7
Source: operator-authorized derived EPUB without O'Reilly upgrade-offer pages (source-derived/DERIVATION.json; original SHA-256 0b18ecdd…, derived c801bfec…).
Locator: EPUB spine page_index=15 = OEBPS/ch02s05.html "Statements" in NCX "2. Grammar" -> public "chap. 2". Verbatim checked against EPUB XHTML.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline-derived.log)
-->
{% endif %}

Problemas: los nombres colisionan, nada es privado y el orden de las etiquetas `<script>` es una lista de dependencias oculta.

Simpson nombra el fallo con precisión: “if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs, and it’s very likely that bugs will occur as one part uses the variable/function in a way the other part doesn’t expect” (Simpson 2020, 101). [Traducción propia: «si usas un nombre de variable o función común y útil en dos partes distintas del programa, pero el identificador procede de un único ámbito compartido (como el ámbito global), se produce una colisión de nombres, y es muy probable que aparezcan bugs cuando una parte use la variable o función de un modo que la otra no espera».]

{% if site.publication.publish_internal_metadata %}
<!-- curriculum-internal:
VERIFIED evaluator_safe=yes (ahmes query --cite --require-evaluator-safe, 2026-10-13)
Ahmes anchor: scholar/you_don_t_know_js_yet_kyle_simpson_you_don_t_know_js_yet_scope_closures_leanpub_2020_46ce42fd; node: c6ec6d64-3b52-5a74-8e4e-ea991b9a9d67
Locator: ahmes cite (Simpson 2020, 119) uses scheme=pdf_order; pdftotext page 119 running head "Chapter 6: Limiting Scope Exposure 101" -> printed page 101. Verbatim checked against PDF.
Run: ~/src/profield/runs/fe-js-canon/20261013 (pipeline.log, grounding-candidates.json)
-->
{% endif %}

En el navegador, ese ámbito compartido es el objeto `window` de la Sesión 7: una `function render()` de nivel superior en un script clásico es accesible como `window.render` desde cualquier otro script. (Las `let`/`const` de nivel superior también comparten el ámbito, pero no se añaden a `window`.)

La comunidad lo esquivó durante veinte años —las **IIFE** envolvían el código en una función para ocultar variables, **CommonJS** (`require`, 2009) dio a los archivos de Node.js su propio ámbito, **AMD** cargaba módulos de forma asíncrona en el navegador— hasta que **ES2015** estandarizó `import`/`export`. Hoy todos los navegadores actuales ejecutan módulos ES de forma nativa, sin ninguna herramienta.

---

## Qué cambia con `type="module"`

| Regla | `<script>` clásico | `<script type="module">` |
| --- | --- | --- |
| Ámbito | Los nombres de nivel superior son globales | Cada archivo tiene su propio ámbito; solo compartes lo que `export`as |
| Momento | Se ejecuta en el acto salvo con `defer` | **Diferido automáticamente**: no hace falta `defer` |
| Modo | No estricto por defecto | Siempre en modo estricto |
| Carga | Funciona desde `file://` | Necesita HTTP (`file://` → error CORS) |
| Rutas en `import` | — | Relativas al archivo que importa; `./` y `.js` son obligatorios |
| Imports repetidos | El mismo archivo dos veces se ejecuta dos veces | Un módulo se ejecuta una vez, lo importen cuantos archivos lo importen |

Verificado el 2026-10-13 con [MDN — Módulos de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules).

---

## Sintaxis: un par con nombre, un par por defecto

**Exports con nombre** — un archivo puede exportar muchas cosas; quien importa las elige por su nombre.

**Excerpt**

```js
// utils.js
export function select(selector) {
	return document.querySelector(selector);
}

// main.js
import { select } from './utils.js';
```

**Export por defecto** — una cosa principal por archivo; quien importa elige el nombre local.

**Excerpt**

```js
// header.js
export default function initHeader(header) {
	/* … */
}

// main.js
import initHeader from './header.js';
```

Regla práctica en este curso: exports **con nombre** para colecciones de helpers y datos; export **por defecto** cuando el archivo existe para una sola cosa.

---

## Laboratorio: divide tu `main.js`

**Control de IA:** dibuja primero el grafo de imports en papel (paso 1). Si después pides a un asistente que haga la división, compara su resultado con tu dibujo y rechaza cualquier archivo, dependencia o herramienta que no hayas planificado.

### 1. Planifica el grafo

**Template** — adapta los nombres de archivo a lo que hace de verdad tu `main.js` tras las Sesiones 7–8.

```text
index.html
  └─ assets/js/main.js        (entrada: conecta todo, sin lógica propia)
       ├─ ./utils.js          select()
       ├─ ./projects.js       projects, renderProjects()
       │    └─ ./utils.js
       └─ ./header.js         default initHeader()
```

### 2. Crea los módulos

**Template** — `assets/js/utils.js`.

```js
export function select(selector) {
	const node = document.querySelector(selector);
	if (!node) console.warn(`Ningún elemento coincide con ${selector}`);
	return node;
}
```

**Template** — `assets/js/projects.js` (tu lista de la Sesión 8, trasladada aquí).

```js
import { select } from './utils.js';

export const projects = [
	{ title: 'Cartel tipográfico', url: 'https://example.com/poster', year: 2026 },
	{ title: 'Estudio de retícula', url: 'https://example.com/grid', year: 2026 },
];

export function renderProjects(selector) {
	const container = select(selector);
	if (!container) return;

	const frag = document.createDocumentFragment();
	for (const project of projects) {
		const li = document.createElement('li');
		const link = document.createElement('a');
		link.href = project.url;
		link.textContent = `${project.title} (${project.year})`;
		li.append(link);
		frag.append(li);
	}
	container.replaceChildren(frag);
}
```

**Template** — `assets/js/header.js` (tu comportamiento de scroll de la Sesión 7, trasladado aquí).

```js
export default function initHeader(header) {
	if (!header) return;
	window.addEventListener(
		'scroll',
		() => header.classList.toggle('is-scrolled', window.scrollY > 100),
		{ passive: true }
	);
}
```

**Template** — `assets/js/main.js` pasa a ser solo el punto de entrada.

```js
import { select } from './utils.js';
import { renderProjects } from './projects.js';
import initHeader from './header.js';

initHeader(select('header'));
renderProjects('#projects');
```

### 3. Cambia la etiqueta de script

**Excerpt** — sustituye la etiqueta de la Sesión 7 en `index.html`.

```html
<script type="module" src="assets/js/main.js"></script>
```

Sin `defer`: los scripts de módulo se difieren automáticamente. Aquí el `src` es relativo a la página; las rutas de `import` dentro de los módulos son relativas a cada archivo de módulo.

### 4. Sirve y comprueba

Abre la página con **Live Server**. Si no lo tienes:

**Excerpt** — desde la raíz del repo.

```bash
python3 -m http.server 8000
```

Después abre `http://localhost:8000`. En **DevTools → Network**, filtra por JS: deberías ver `main.js`, `utils.js`, `projects.js`, `header.js`, cada uno descargado **una vez**, aunque dos archivos importen `utils.js`.

### 5. Commit

**Excerpt**

```bash
git add index.html assets/js
git commit -m "refactor(js): split main.js into ES modules"
```

---

## Prueba de estudio: el grafo de imports

<figure class="lesson-key-figure" markdown="0">
<img src="{{ '/assets/images/lesson-figures/fe-i-09-import-graph-es-0a9b3b065e65.svg' | relative_url }}" width="680" height="362" alt="El grafo de imports del laboratorio" aria-describedby="fe-i-09-import-graph-caption" loading="lazy" />
<figcaption id="fe-i-09-import-graph-caption"><strong>El grafo de imports del laboratorio.</strong> <code>main.js</code> solo conecta módulos. <code>projects.js</code> es el límite: es dueño de los datos y de su renderizado, así que un cambio en el marcado de la tarjeta se queda dentro. <code>utils.js</code> se importa dos veces, pero se descarga y ejecuta una sola. <span class="image-credit">Figura de @ruvebal con visual-forger 1.2.0.</span></figcaption>
</figure>

Copia tu grafo en el README o en tu nota ATELIER y añade una frase sobre un **límite**, por ejemplo:

> `projects.js` es dueño de los datos y de cómo se renderizan; `main.js` solo decide *dónde*. Si cambio el marcado de la tarjeta, ningún otro archivo cambia.

Esa frase es todo el sentido de la sesión: **la modularidad mantiene el cambio local**.

---

## Profundización opcional: barrels e imports dinámicos

**Excerpt** — un archivo "barrel" reexporta desde varios módulos para que otros importen desde un solo sitio.

```js
// assets/js/ui/index.js
export { renderProjects } from '../projects.js';
export { default as initHeader } from '../header.js';
```

**Excerpt** — `import()` carga un módulo solo cuando hace falta y devuelve una Promise.

```js
const button = document.querySelector('#open-gallery');

button?.addEventListener('click', async () => {
	const { openGallery } = await import('./gallery.js');
	openGallery();
});
```

Ambos son útiles en proyectos grandes; ninguno hace falta en el laboratorio de esta sesión.

---

## Reflexión Atelier

- **Observar:** ¿qué archivo cambia si editas el título de un proyecto? ¿Y si cambias el umbral de color del header?
- **Intervenir:** saca una responsabilidad más de `main.js`.
- **Reflexionar:** ¿dónde aparecería un import circular si fueras descuidado?
- **Compartir:** enseña tu grafo a un compañero y deja que adivine qué hace cada archivo por su nombre.

{% comment %}
outcome-graphic-selection:
  source-section: "Reflexión Atelier"
  visual-grammar: "local-change-module-graph — small modules connected through explicit imports so change remains local"
{% endcomment %}
{% include lesson-outcome-graphic.html %}

---

## Lecturas recomendadas

- [MDN — Módulos de JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules) (verificado el 2026-10-13)
- [V8 — JavaScript modules](https://v8.dev/features/modules) (en inglés)
- [ECMA-262 — Módulos](https://262.ecma-international.org/#sec-modules) (referencia, no lectura obligatoria)

Próxima sesión: [Linting y formateo]({{ '/lessons/es/linting-and-formatting/' | relative_url }}) mantiene estos archivos coherentes a medida que se multiplican.

---

## Referencias

- Crockford, Douglas. 2008. *JavaScript: The Good Parts*. 1.ª ed. Sebastopol, CA: O’Reilly Media.
- Simpson, Kyle. 2020. *You Don’t Know JS Yet: Scope & Closures*. 2.ª ed. GetiPub; Leanpub.
