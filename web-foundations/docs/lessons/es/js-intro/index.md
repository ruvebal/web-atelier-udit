---
layout: lesson
title: 'Introducción a JS'
title_alt: 'Introduction to JS'
slug: js-intro
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
permalink: /lessons/es/js-intro/
---

<!-- prettier-ignore-start -->

## 📋 Tabla de Contenidos
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

## 🎯 Objetivos

- Comprender **por qué JavaScript es esencial en el desarrollo web**.
- Conectar con conocimientos previos en **C++** y **_Laravel_**.
- Introducir los **fundamentos del lenguaje JS**.
- Conocer el **_DOM_** y cómo manipularlo.
- Aprender el **modelo de eventos**.
- Contextualizar el rol de **_Node.js_** en el ecosistema.
- Realizar prácticas con **_Chrome DevTools_** y el archivo `assets/js/main.js`.

---

## 📜 Línea del Tiempo: Evolución Histórica de JavaScript

```text
1995 ── 🚀 Nace JavaScript
        • Brendan Eich lo crea en 10 días para Netscape.
        • Llamado Mocha → LiveScript → JavaScript.
        • Introducido en Netscape Navigator 2.0.
        • Primeros scripts para validar formularios y animar páginas.

1997 ── 📏 Estandarización ECMAScript (ES1)
        • ECMA International crea el estándar para evitar fragmentación.
        • Sentó las bases del lenguaje común entre navegadores.

2000s ── 🌐 AJAX y Web 2.0
        • AJAX permite cargar datos sin recargar página.
        • Surgen aplicaciones dinámicas como Gmail y Google Maps.
        • Inicio del concepto "Web 2.0": la web como plataforma interactiva.

2009 ── ⚡ Node.js y Full-Stack JS
        • Ryan Dahl lanza Node.js con motor V8.
        • JavaScript llega al backend.
        • Boom de frameworks como Express.js.
        • JS se convierte en lenguaje full-stack.

2015 ── 🔑 ECMAScript 6 (ES6)
        • Nueva sintaxis moderna: let, const, clases, módulos, arrow functions.
        • Introducción de Promesas para asincronía.
        • Punto de inflexión hacia aplicaciones a gran escala.

2016+ ── 🏗️ Frameworks modernos
        • React, Angular y Vue se vuelven estándar para frontend.
        • Desarrollo modular y basado en componentes.
        • JavaScript domina la creación de interfaces dinámicas.
        • Evolución anual del estándar (ES7, ES8… async/await, optional chaining, etc.).
```

**Comparación:**

- **C++** → lenguaje compilado, alto rendimiento, usado para sistemas y _apps_ nativas.
- **_Laravel_**/**_PHP_** → lenguaje de servidor para generar **_HTML_** dinámico.
- **JavaScript** → único que corre en el navegador, conecta _backend_ y _frontend_.

**Reflexión ATELIER:** _JS existe porque el usuario necesita **interacción inmediata**, no solo páginas estáticas._

- **Observar**: JS nació como "pegamento" para páginas estáticas → hoy es un lenguaje de ecosistemas complejos.
- **Intervenir**: comparar sintaxis con C++ y **_Laravel_**, practicar en `main.js`.
- **Reflexionar**: JS es **dinámico**, **interpretado** y **adaptable**, lo que lo hace único para la web.

---

## 🔄 Comparación C++ / JavaScript / PHP (Laravel)

### Sintaxis Básica

- **Variable**:
  - C++: `int x = 10;`
  - JavaScript: `let x = 10;` / `const x = 10;`
  - Laravel/PHP: `$x = 10;`
- **Condicional**:
  - C++: `if (x > 5) { ... }`
  - JavaScript: `if (x > 5) { ... }`
  - Laravel/PHP: `if ($x > 5) { ... }`
- **_Bucle_ for**:
  - C++: `for(int i=0;i<5;i++){}`
  - JavaScript: `for(let i=0;i<5;i++){}`
  - Laravel/PHP: `for ($i=0; $i<5; $i++) {}`
- **_Array_/lista**:
  - C++: `int arr[3] = {1,2,3};`
  - JavaScript: `let arr = [1,2,3];`
  - Laravel/PHP: `$arr = [1,2,3];`
- **Función**:
  - C++: `int suma(int a,int b){}`
  - JavaScript: `function suma(a,b){return a+b;}`
  - Laravel/PHP: `function suma($a,$b){return $a+$b;}`

### Sintaxis Ampliada

- **Variables**
  - C++: `int x = 10;`, `const double pi = 3.14;`
  - JavaScript (ES6+): `let x = 10;`, `const pi = 3.14;`
  - Laravel/PHP: `$x = 10;`, `define("PI", 3.14);`
- **_Arrays_**
  - C++: `int arr[3] = {1,2,3};`, `vector<int> v = {1,2,3};`
  - JavaScript: `let arr = [1,2,3];`, `let lista = Array.of(1,2,3);`
  - Laravel/PHP: `$arr = [1,2,3];`
- **Objetos**
  - C++: `struct Persona {string n; int e;};`, `Persona p = {"Ana",20};`
  - JavaScript: `let persona = {nombre:"Ana", edad:20};`
  - Laravel/PHP: `$persona = ["nombre"=>"Ana","edad"=>20];`
- **Clases / _OOP_**
  - C++: `class Coche { string marca; public: Coche(string m){marca=m;} };`
  - JavaScript: `class Coche { constructor(marca){this.marca=marca;} }`
  - Laravel/PHP: `class Coche { public $marca; function __construct($m){$this->marca=$m;} }`
- **Herencia**
  - C++: `class Deportivo: public Coche {...}`
  - JavaScript: `class Deportivo extends Coche {...}`
  - Laravel/PHP: `class Deportivo extends Coche {...}`
- **Funciones**
  - C++: `int suma(int a,int b){return a+b;}`
  - JavaScript: `function suma(a,b){return a+b;}`, `const suma = (a,b)=>a+b;`
  - Laravel/PHP: `function suma($a,$b){return $a+$b;}`
- **Asincronía**
  - C++: hilos (`std::thread`) y concurrencia manual
  - JavaScript: **Promesas** y `async/await` (`async function f(){await fetch(...);}`)
  - Laravel/PHP: tradicional = síncrono; Laravel usa colas, _jobs_ y _async_ con extensiones
- **_Input_/_Output_**
  - C++: `cin >> x; cout << x;`
  - JavaScript: `console.log(x); alert(x);`
  - Laravel/PHP: `echo $x;` o `dd($x);` (_helper_ de Laravel)
- **Uso típico**
  - C++: programas de escritorio, sistemas embebidos
  - JavaScript: _Web_ en navegador, **_APIs_** y _backend_ con **_Node.js_**
  - Laravel/PHP: _Web_ _backend_, **_MVC_**, plantillas **_Blade_**

---

### 🔗 Conexiones y aprendizajes comparativos

- **C++** nos enseña **lógica estricta** → útil para entender control de flujo.
- **_Laravel_**/**_PHP_** nos enseña **arquitectura** _backend_ → útil para entender **_MVC_** [Modelo-vista-controlador](https://es.wikipedia.org/wiki/Modelo%E2%80%93vista%E2%80%93controlador).
- **JS** aporta la **capa interactiva** en cliente y un **ecosistema compartido** con **_Node_**.

**Reflexión ATELIER:**

- **Observar**: leer código en **C++**, **_PHP_** y **JS** y notar paralelismos.
- **Intervenir**: modificar `main.js` y ver cambios en vivo.
- **Reflexionar**: ¿qué aporta JS que no logran **C++** ni **_PHP_** en web?
- **Compartir**: _commit_ en **_GitHub_** con explicación clara en **_README_**.

---

### 🎯 Conclusiones

**JavaScript es el lenguaje del presente y futuro de la web:**

- Vive en el _frontend_ como **actor principal de la interactividad**.
- Se extiende al _backend_ con **_Node.js_**, **unificando** _stack_.
- Conecta lógicas de **C++** (algoritmos, estructuras) y **_Laravel_**/**_PHP_** (servidor, **_MVC_**).

**Síntesis ATELIER:** _El valor de JS no es solo técnico: es un **lenguaje de encuentro** entre lo que el usuario hace, lo que el servidor procesa, y lo que el diseñador imagina._

**Claves:**

- **C++** → **tipado fuerte** y **estático**.
- **JS** → **tipado dinámico** (el tipo se infiere en tiempo de ejecución).
- **_PHP_** → similar a JS en dinamismo, pero corre en servidor.

---

## ✨ Características principales de JavaScript

### 1. Lenguaje interpretado

JavaScript no se compila de antemano como **C++** o **_Java_**, sino que se **interpreta en tiempo real por el motor del navegador** (como **_V8_** en **_Chrome_** o **_SpiderMonkey_** en **_Firefox_**). Esto permite **interacciones dinámicas** y actualizaciones rápidas en páginas web.

**Fuente:** _Wikipedia_ – _Just-in-time compilation_  
[https://en.wikipedia.org/wiki/Just-in-time_compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation)

---

### 2. Basado en eventos

Es un lenguaje **_event-driven_**: responde a **interacciones del usuario** (_clics_, desplazamientos, entradas de teclado). Esto lo hace ideal para construir **aplicaciones reactivas** y **_responsive_**.

- **MDN: DOM events** — Índice completo de eventos:  
  [https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events)

- **MDN: Introduction to events** — Básicos de `events` y `event listeners`  
  [https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events](https://developer.mozilla.org/es/docs/Learn_web_development/Core/Scripting/Events)

- **MDN: addEventListener** — Opciones y buenas prácticas  
  [https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)

---

### 3. Orientado a prototipos

En lugar de clases rígidas, JavaScript utiliza un modelo **basado en prototipos**: los objetos pueden **heredar directamente** de otros objetos.

En palabras simples: puedes crear un objeto sin definir previamente una clase.

**Fuente:** **_MDN_** – _Prototype-based programming_  
[https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming](https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming)

---

### 4. Funciones de primera clase

Las **funciones son tratadas como cualquier otra variable**: se pueden pasar como argumento, devolver desde otra función o asignar a una variable.

**Fuente:** **_MDN_** – _First-class Function_  
[https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)

---

### 5. Asincronía

JavaScript soporta **operaciones asíncronas** que no bloquean el flujo principal:

- `setTimeout`
- **Promesas** (_Promises_)
- `async/await`

Esto permite manejar **tareas largas** (como peticiones a un servidor) sin congelar la interfaz.

**Fuente:** **_MDN_** – _Asynchronous JS_  
[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)

---

### 6. Lenguaje de _scripting_ del lado del cliente

Originalmente fue diseñado para ejecutarse en el **cliente** (el navegador), dando interactividad al **_HTML_**.

Hoy, gracias a **_Node.js_**, también corre en el **servidor**.

**Fuente:** _Wikipedia_ – _Server-side scripting_  
[https://en.wikipedia.org/wiki/Server-side_scripting](https://en.wikipedia.org/wiki/Server-side_scripting)

---

### 7. Sintaxis ligera y flexible

Su sintaxis es relativamente sencilla y **permisiva**, lo que facilita el aprendizaje inicial. A diferencia de **C++** o **_Java_**, no requiere **tipado estricto** ni demasiada configuración para comenzar a usarlo.

---

### 8. Tipado dinámico

Las variables **no están ligadas a un tipo fijo**. El intérprete decide el tipo en tiempo de ejecución según el valor.

**Ejemplo:**

```js
let x = 10; // number
x = 'hola'; // ahora es string
```

**Fuente:** **_MDN_** – _Dynamic typing_  
[https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing)

---

### 9. _Multiplataforma_

JavaScript funciona en casi todos los dispositivos y sistemas operativos gracias a su ejecución en navegadores y motores como **_V8_**, **_SpiderMonkey_** o **_JavaScriptCore_**.

➡️ Esto lo convierte en un **lenguaje verdaderamente universal**.

---

### 10. Ecosistema rico en librerías y _frameworks_

JavaScript cuenta con un **ecosistema enorme y activo**:

- **_Frameworks_** de _frontend_: **_React_**, **_Angular_**, **_Vue_**.
- **Gestores de paquetes**: **_npm_**, **_Yarn_**.
- **Herramientas de compilación**: **_Babel_**, **_Webpack_**, **_Vite_**.

➡️ Esto permite desarrollar **proyectos de gran escala** con rapidez y eficiencia.

### 📌 Conclusión

JavaScript es **ligero**, **flexible** y **_multiplataforma_**.

Su naturaleza **interpretada**, **orientada a eventos** y **asincrónica** lo hacen único para la web.

Además, su **ecosistema** de librerías y _frameworks_ asegura su papel central en el desarrollo moderno, tanto en el _frontend_ como en el _backend_.

---

## 🌐 El DOM: puente entre HTML y JS

El **_Document Object Model_** (**DOM**) convierte el **_HTML_** en un **árbol de nodos** que JS puede manipular.

**Ejemplo:**

```html
<h1 id="titulo">Hola</h1>
```

**JavaScript en el navegador:**

```js
const titulo = document.getElementById('titulo');
titulo.textContent = 'Modificado con JS';
```

---

## ⚡ Eventos: la lógica del _frontend_

JS permite responder a **acciones del usuario** (_clic_, _scroll_, teclado).

```html
<button id="btn">Haz clic</button>
```

```js
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
	alert('¡Botón pulsado!');
});
```

**Comparación:**

- **C++**: un programa de escritorio usa _event listeners_ para _clicks_ en **_GUI_**.
- **_Laravel_**/**_PHP_**: procesa la petición cuando el usuario envía un formulario.
- **JS**: reacciona en el momento, **sin recargar página**.

**Reflexión ATELIER:** _Eventos = improvisación en escena: el usuario "interrumpe" y el programa debe adaptarse al instante._

### Eventos Comunes del Navegador y UX

| Evento                                                               | Descripción / Caso de Uso                                       |
| -------------------------------------------------------------------- | --------------------------------------------------------------- |
| `click`                                                              | Usuario hace clic en un botón/enlace/elemento                   |
| `dblclick`                                                           | Doble clic                                                      |
| `mousedown`, `mouseup`                                               | Presionar / soltar botones del ratón (o puntero)                |
| `mousemove` / `mouseover` / `mouseout` / `mouseenter` / `mouseleave` | Hover del cursor / seguimiento del movimiento del puntero       |
| `keydown`, `keyup`, `keypress`                                       | Entrada de teclado (formularios, atajos)                        |
| `input` / `change`                                                   | Usuario cambia un campo de formulario (texto, checkbox, select) |
| `submit`                                                             | Envío de formulario                                             |
| `focus` / `blur`                                                     | Elemento gana o pierde el foco (accesibilidad)                  |
| `resize`                                                             | Ventana del navegador o contenedor se redimensiona              |
| `scroll`                                                             | Desplazamiento de la página o un contenedor                     |
| `load` / `DOMContentLoaded`                                          | Página y recursos cargan; DOM analizado                         |
| `error`                                                              | Recurso falla al cargar / error en tiempo de ejecución          |
| `contextmenu`                                                        | Clic derecho / menú contextual invocado                         |
| `touchstart`, `touchmove`, `touchend`                                | Interacciones táctiles en dispositivos táctiles                 |
| `pointerdown`, `pointerup`, `pointermove`                            | Eventos de puntero unificados (ratón, táctil, stylus)           |
| `dragstart`, `drag`, `drop`, `dragend`                               | Interacciones de arrastrar y soltar                             |
| `wheel`                                                              | Desplazamiento con rueda del ratón                              |
| `online` / `offline`                                                 | Cambios en la conectividad de red                               |
| `visibilitychange`                                                   | Página/pestaña se oculta o se hace visible                      |
| `beforeunload`, `unload`                                             | Usuario abandona o cierra la página                             |

---

### Consideraciones de UX y Rendimiento

- **Eventos de alta frecuencia** (`mousemove`, `scroll`, `pointermove`) deben ser limitados o debounced.
- Usa **listeners pasivos** para `scroll` y `touchmove` para mejorar el rendimiento.
- Prefiere **listeners con alcance** (en elementos específicos) sobre `document`/`window` para reducir la sobrecarga.
- La accesibilidad importa: no dependas solo de eventos del ratón. Incluye siempre teclado (`keydown`) y gestión del foco.
- Existen diferencias entre navegadores, especialmente con eventos táctiles y de puntero; prueba en múltiples dispositivos.

---

### Reflexión

- ¿Qué eventos se sintieron más naturales de usar?
- ¿Cómo conectan los eventos las _intenciones de UX_ (clic, escribir, desplazar) con el comportamiento del código?
- ¿Qué riesgos existen si vinculas demasiados eventos sin optimización?

---

## 🚀 Node.js y el ecosistema JS

**Antes:** JS solo en navegadores.

**Ahora:** gracias a **_Node.js_** (2009) corre en el servidor.

**_Node_** usa el motor **_V8_** de **_Chrome_**.

Permite construir **_APIs_**, _apps_ en tiempo real, _microservicios_.

**Comparación con** **_Laravel_**:

- **_Laravel_** estructura _backend_ con **_MVC_**.
- **_Node.js_**/**_Express_** permiten _backend_ en JS, **compartiendo lenguaje** con _frontend_.
- En un **_stack_** moderno: **_Laravel_** y JS conviven, o se usa JS _full_ (**_MERN_**, **_MEAN_**).

> Prueba rápida y `package.json` básico: ver "Probar Node.js localmente" en la [lección de Entorno de Desarrollo § Probar Node](/lessons/es/entorno-de-desarrollo/#probar-nodejs-localmente-opcional).

---

## 🔧 Prácticas con Chrome DevTools

**Objetivo:** dominar las herramientas del navegador para observar, intervenir y depurar código con rapidez y método.

### 1) _Console_: ejecutar JS en vivo

- Abre DevTools: **Cmd ⌘ + ⌥ + I** (macOS) / **Ctrl + Shift + I** (Windows/Linux).
- Pruébalo:
  - Escribe `1 + 2`, `document.title`, `typeof window`.
  - Usa `console.log('Hola', Date.now())`, `console.table([1,2,3])`, `console.dir(document.body)`.
  - Limpia con `clear()`.
- Con el elemento seleccionado en **_Elements_**, `$_` es el último resultado y `$0` la referencia al nodo seleccionado. Ej.: `$0.textContent = 'Cambiado desde Console'`.

Mini–reto:

```js
// En Console, crea y muestra un objeto de usuario
const user = { id: 1, name: 'Ana', skills: ['HTML', 'CSS', 'JS'] };
console.table(user);
```

### 2) _Elements_: inspeccionar y modificar _DOM_

- Clic derecho sobre un elemento de la página → “Inspect”.
- Edita el texto en vivo; añade/quita clases en el panel **Styles**.
- Desde **_Console_** con `$0` (nodo activo):

```js
// $0 es una variable especial de Chrome DevTools que referencia el elemento DOM actualmente seleccionado
// Cuando inspeccionas un elemento en la pestaña Elements, ese elemento pasa a ser $0
// Desde la Consola puedes manipularlo directamente:

$0.classList.add('resaltado'); // Añade una clase CSS al elemento seleccionado
$0.style.outline = '3px solid hotpink'; // Aplica estilos inline directamente

// Otras operaciones útiles con $0:
// $0.textContent = 'Texto nuevo';     // Cambiar el texto
// $0.innerHTML = '<em>HTML</em>';     // Cambiar el HTML
// $0.remove();                        // Eliminar el elemento de la página
// $0.parentElement;                   // Acceder al elemento padre
```

- Simula `:hover` y estados para verificar estilos.

Mini–reto:

- Cambia el contenido de un `h1` sin recargar.
- Añade una clase y verifica su efecto en los estilos.

### 3) _Sources_: depurar `assets/js/main.js`

> La depuración es como la repetición a cámara lenta en un partido: ves cada jugada, quién pasó el balón y dónde falló.

- Abre `assets/js/main.js` en la pestaña **_Sources_**.
- Pon un breakpoint (clic en número de línea) y recarga (⌘R / Ctrl+R).
- Usa los controles de paso cuando pauses en un breakpoint:

  - **Step Over** (F10) → ejecuta la línea actual por completo. Si llama a una función, la ejecuta entera sin entrar paso a paso.
  - **Step Into** (F11) → si la línea llama a una función, entra dentro para depurarla línea a línea.
  - **Step Out** (Shift+F11) → termina de ejecutar la función actual y vuelve al punto desde donde se llamó.

- **Watch** variables en tiempo real:

  - En el panel Watch añade nombres de variables a monitorizar.
  - Sus valores se actualizan automáticamente al avanzar.
  - Ej.: añade `a`, `b` y `sum` → observa cómo cambian al ejecutar.

- Revisa la **Call Stack** (quién llamó a qué):

  - Muestra la cadena de llamadas que llevó a la línea actual.
  - Ej.: `main.js:15` → `add()` → `console.log()`.
  - Es como un rastro que explica cómo llegó el programa hasta aquí.

- Pausa forzada con `debugger;`:
  - En lugar de hacer clic para poner breakpoints, puedes escribir `debugger;` en tu código.
  - Cuando el navegador ejecuta esa línea, se detiene automáticamente (como un breakpoint).

Ejemplo para practicar:

```js
function add(a, b) {
	debugger; // La ejecución se detendrá aquí automáticamente
	const sum = a + b; // ← pon también un breakpoint aquí
	return sum;
}
console.log('Resultado:', add(2, 3));
```

### 4) _Network_: solicitudes, caché y _throttling_

- Activa “Disable cache” con DevTools abierto.
- Aplica _throttling_ (ej.: **Fast 3G**) para simular redes lentas.
- Observa el _waterfall_, tamaños, códigos, `Content-Type` y tiempos `TTFB`/`LCP` aproximados.
- Revisa **Headers** y **Preview** de las respuestas.

Mini–reto:

- Identifica el recurso más pesado y justifica una optimización (minificar, diferir, comprimir, cambiar formato, CDN).

### 5) Performance y Lighthouse (rápido)

- En **Performance**: Graba 5–10 segundos navegando; detecta _Long Tasks_ (>50ms) y _layout shifts_.
- En **Lighthouse**: corre un informe “Performance” y “Best Practices” para una página; anota 2 mejoras accionables.

### 6) Flujo recomendado (5 pasos)

1. Reproducir el problema (o hipótesis) y fijar un objetivo.
2. Observar en **_Console_** y **_Elements_** (estado del **_DOM_**, clases, estilos computados).
3. Depurar en **_Sources_** (breakpoints, _watch_, `debugger;`).
4. Medir en **_Network_**/**Performance** (caché, _throttling_, _waterfall_, _long tasks_).
5. Documentar el hallazgo (captura + notas) y aplicar el arreglo.

### 7) Buenas prácticas

- Prefiere breakpoints a `alert()`; usa niveles de `console` (`log`, `warn`, `error`, `time`/`timeEnd`).
- Activa “Preserve log” si necesitas mantener trazas tras navegar.
- Usa _source maps_ al trabajar con bundlers para depurar código fuente real. (Avanzado)
- Borrar _noise_: `clear()` antes de medir, desactivar extensiones al auditar. (Explicar)

Checklist de entrega (opcional):

- 1 captura de **_Elements_** mostrando un cambio en **_DOM_**.
- 1 captura de **_Sources_** con breakpoint y _watch_.
- 1 captura de **_Network_** con _throttling_ y explicación del _bottleneck_.
- 1 lista de 2–3 acciones de mejora priorizadas.

---

## Guía Detallada: Ejercicios progresivos con `assets/js/main.js`

Este documento describe 3 **commits progresivos** para aprender a usar JavaScript en un proyecto web.  
Trabajaremos sobre el archivo `assets/js/main.js` de tu repositorio.

### 🔧 Requisitos previos

- Haber clonado el repositorio `student-project-template`.
- Abrir el proyecto en **Visual Studio Code**.
- Tener instalado **Live Server** (o similar) para ver cambios en el navegador en tiempo real.
- Conocer lo básico de **Git**:
  - `git add .`
  - `git commit -m "mensaje"`
  - `git push`

---

### ✅ Commit 1 — Inicialización básica y conexión

**Objetivo:** comprobar que el archivo JS está conectado al HTML y manipular el DOM de manera simple.

#### Pasos

1. Abrir `assets/js/main.js` y añadir:

   ```js
   // Verificación de conexión
   console.log('✅ main.js cargado correctamente');

   // Selección de un elemento del DOM
   const titulo = document.getElementById('titulo');

   // Cambiar su contenido si existe
   if (titulo) {
   	titulo.textContent = 'Texto cambiado desde main.js';
   }
   ```

2. Abrir el sitio con Live Server.
3. Ir a **DevTools (F12) → Console** y verificar:
   - Aparece el mensaje `✅ main.js cargado correctamente`.
   - El contenido del elemento con id `titulo` ha cambiado.

#### Posibles errores

- ❌ `null` en consola → significa que el `id="titulo"` no existe en tu HTML.
- ❌ No aparece mensaje en consola → probablemente no enlazaste bien tu `main.js` en el HTML (`<script src="assets/js/main.js"></script>`).

#### Commit

```bash
git add assets/js/main.js
git commit -m "Commit 1: Console log y cambio de título desde JS"
```

---

### ✅ Commit 2 — Eventos básicos de usuario

**Objetivo:** añadir un botón que responda a un evento de clic.

#### Pasos

1. En tu `index.html`, añade un botón dentro del `<body>`:

   ```html
   <button id="btn-action">Haz clic aquí</button>
   ```

2. En `main.js`, añade:

   ```js
   const btn = document.getElementById('btn-action');

   if (btn) {
   	btn.addEventListener('click', () => {
   		alert('🚀 Botón pulsado correctamente');
   	});
   }
   ```

3. Guardar y probar en el navegador:
   - Haz clic en el botón.
   - Debería aparecer una alerta.

#### Posibles errores

- ❌ `btn is null` → revisa que el botón tenga exactamente `id="btn-action"`.
- ❌ La alerta no aparece → revisa que tu script se cargue **al final del body** o con `defer` en el `<script>`.

#### Commit

```bash
git add .
git commit -m "Commit 2: Añadido botón con evento click"
```

---

### ✅ Commit 3 — Evento dinámico con scroll

**Objetivo:** hacer que el `header` cambie de color al hacer scroll.

#### Pasos

1. Asegúrate de tener un `<header>` en tu `index.html`.
2. En `main.js`, añade:

   ```js
   const header = document.querySelector('header');

   window.addEventListener('scroll', () => {
   	if (header) {
   		if (window.scrollY > 100) {
   			header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
   			header.style.color = 'white';
   		} else {
   			header.style.backgroundColor = 'transparent';
   			header.style.color = 'inherit';
   		}
   	}
   });
   ```

3. Probar en navegador:
   - Haz scroll hacia abajo.
   - El `header` cambia de color cuando `scrollY > 100`.
   - Vuelve arriba y se restaura.

#### Posibles errores

- ❌ No cambia el color → verifica que tu página tenga suficiente contenido para hacer scroll.
- ❌ `header is null` → revisa que tu HTML tenga realmente un `<header>`.

#### Commit

```bash
git add assets/js/main.js
git commit -m "Commit 3: Evento scroll con cambio dinámico de header"
```

---

### 📌 Resumen final

Después de los 3 commits tu `main.js` debería:

1. Mostrar un mensaje en consola y modificar el DOM (Commit 1).
2. Responder a un clic en un botón con un evento (Commit 2).
3. Cambiar dinámicamente el estilo de un elemento con scroll (Commit 3).

---

### 🧰 Extra (opcional para ampliar)

- **Eventos de teclado**: detectar cuando el usuario escribe.

  ```js
  document.addEventListener('keydown', (e) => {
  	console.log('Tecla pulsada:', e.key);
  });
  ```

- **Eventos de input**: actualizar texto en tiempo real.

  ```js
  const input = document.querySelector('input');
  const salida = document.getElementById('salida');

  input.addEventListener('input', () => {
  	salida.textContent = input.value;
  });
  ```

---

### 🎭 Metodología ATELIER aplicada

- **Observar**: analizar en DevTools cómo reacciona la página.
- **Intervenir**: añadir código en `main.js` paso a paso.
- **Reflexionar**: anotar qué aprendiste con cada commit.
- **Compartir**: subir commits al repositorio y mostrar a tus compañeros.