---
layout: lesson
title: 'Introduction to JS'
title_alt: 'Introducción a JS'
slug: js-intro
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-intro/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

## 🎯 Objectives

- Understand **why JavaScript is essential in web development**.
- Connect with prior knowledge in **C++** and **_Laravel_**.
- Introduce the **fundamentals of the JS language**.
- Get to know the **_DOM_** and how to manipulate it.
- Learn the **event model**.
- Contextualize the role of **_Node.js_** in the ecosystem.
- Do practice with **_Chrome DevTools_** and the `assets/js/main.js` file.

---

## 📜 Timeline: Historical Evolution of JavaScript

```text
1995 ── 🚀 JavaScript is born
        • Brendan Eich creates it in 10 days for Netscape.
        • Called Mocha → LiveScript → JavaScript.
        • Introduced in Netscape Navigator 2.0.
        • First scripts to validate forms and animate pages.

1997 ── 📏 ECMAScript (ES1) standardization
        • ECMA International creates the standard to avoid fragmentation.
        • It laid the foundations of a common language among browsers.

2000s ── 🌐 AJAX and Web 2.0
        • AJAX allows loading data without reloading the page.
        • Dynamic applications such as Gmail and Google Maps emerge.
        • Beginning of the "Web 2.0" concept: the web as an interactive platform.

2009 ── ⚡ Node.js and Full‑Stack JS
        • Ryan Dahl launches Node.js with the V8 engine.
        • JavaScript reaches the backend.
        • Boom of frameworks such as Express.js.
        • JS becomes a full‑stack language.

2015 ── 🔑 ECMAScript 6 (ES6)
        • New modern syntax: let, const, classes, modules, arrow functions.
        • Introduction of Promises for asynchrony.
        • Inflection point toward large‑scale applications.

2016+ ── 🏗️ Modern frameworks
        • React, Angular and Vue become frontend standards.
        • Modular and component‑based development.
        • JavaScript dominates dynamic interface creation.
        • Annual evolution of the standard (ES7, ES8… async/await, optional chaining, etc.).
```

**Comparison:**

- **C++** → compiled language, high performance, used for systems and native _apps_.
- **_Laravel_**/**_PHP_** → server language to generate dynamic **_HTML_**.
- **JavaScript** → the only one that runs in the browser, connects _backend_ and _frontend_.

**ATELIER Reflection:** _JS exists because the user needs **immediate interaction**, not just static pages._

- **Observe**: JS was born as “glue” for static pages → today it is a language of complex ecosystems.
- **Intervene**: compare syntax with C++ and **_Laravel_**, practice in `main.js`.
- **Reflect**: JS is **dynamic**, **interpreted** and **adaptable**, which makes it unique for the web.

---

## 🔄 Comparison C++ / JavaScript / PHP (Laravel)

### Basic Syntax

- **Variable**:
  - C++: `int x = 10;`
  - JavaScript: `let x = 10;` / `const x = 10;`
  - Laravel/PHP: `$x = 10;`
- **Conditional**:
  - C++: `if (x > 5) { ... }`
  - JavaScript: `if (x > 5) { ... }`
  - Laravel/PHP: `if ($x > 5) { ... }`
- **For _loop_**:
  - C++: `for(int i=0;i<5;i++){}`
  - JavaScript: `for(let i=0;i<5;i++){}`
  - Laravel/PHP: `for ($i=0; $i<5; $i++) {}`
- **_Array_/list**:
  - C++: `int arr[3] = {1,2,3};`
  - JavaScript: `let arr = [1,2,3];`
  - Laravel/PHP: `$arr = [1,2,3];`
- **Function**:
  - C++: `int suma(int a,int b){}`
  - JavaScript: `function suma(a,b){return a+b;}`
  - Laravel/PHP: `function suma($a,$b){return $a+$b;}`

### Extended Syntax

- **Variables**
  - C++: `int x = 10;`, `const double pi = 3.14;`
  - JavaScript (ES6+): `let x = 10;`, `const pi = 3.14;`
  - Laravel/PHP: `$x = 10;`, `define("PI", 3.14);`
- **_Arrays_**
  - C++: `int arr[3] = {1,2,3};`, `vector<int> v = {1,2,3};`
  - JavaScript: `let arr = [1,2,3];`, `let lista = Array.of(1,2,3);`
  - Laravel/PHP: `$arr = [1,2,3];`
- **Objects**
  - C++: `struct Persona {string n; int e;};`, `Persona p = {"Ana",20};`
  - JavaScript: `let persona = {nombre:"Ana", edad:20};`
  - Laravel/PHP: `$persona = ["nombre"=>"Ana","edad"=>20];`
- **Classes / _OOP_**
  - C++: `class Coche { string marca; public: Coche(string m){marca=m;} };`
  - JavaScript: `class Coche { constructor(marca){this.marca=marca;} }`
  - Laravel/PHP: `class Coche { public $marca; function __construct($m){$this->marca=$m;} }`
- **Inheritance**
  - C++: `class Deportivo: public Coche {...}`
  - JavaScript: `class Deportivo extends Coche {...}`
  - Laravel/PHP: `class Deportivo extends Coche {...}`
- **Functions**
  - C++: `int suma(int a,int b){return a+b;}`
  - JavaScript: `function suma(a,b){return a+b;}`, `const suma = (a,b)=>a+b;`
  - Laravel/PHP: `function suma($a,$b){return $a+$b;}`
- **Asynchrony**
  - C++: threads (`std::thread`) and manual concurrency
  - JavaScript: **Promises** and `async/await` (`async function f(){await fetch(...);}`)
  - Laravel/PHP: traditional = synchronous; Laravel uses queues, _jobs_ and _async_ with extensions
- **_Input_/_Output_**
  - C++: `cin >> x; cout << x;`
  - JavaScript: `console.log(x); alert(x);`
  - Laravel/PHP: `echo $x;` or `dd($x);` (Laravel _helper_)
- **Typical use**
  - C++: desktop programs, embedded systems
  - JavaScript: _Web_ in browser, **_APIs_** and _backend_ with **_Node.js_**
  - Laravel/PHP: _Web_ _backend_, **_MVC_**, **_Blade_** templates

---

### 🔗 Connections and comparative learnings

- **C++** teaches us **strict logic** → useful for understanding control flow.
- **_Laravel_**/**_PHP_** teaches us _backend_ **architecture** → useful for understanding **_MVC_** [Model–view–controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
- **JS** provides the **interactive layer** on client and a **shared ecosystem** with **_Node_**.

**ATELIER Reflection:**

- **Observe**: read code in **C++**, **_PHP_** and **JS** and notice parallels.
- **Intervene**: modify `main.js` and see changes live.
- **Reflect**: what does JS provide that **C++** or **_PHP_** do not achieve on the web?
- **Share**: _commit_ on **_GitHub_** with clear explanation in **_README_**.

---

### 🎯 Conclusions

**JavaScript is the language of the present and future of the web:**

- It lives in the _frontend_ as **main actor of interactivity**.
- It extends to the _backend_ with **_Node.js_**, **unifying** _stack_.
- It connects logic from **C++** (algorithms, structures) and **_Laravel_**/**_PHP_** (server, **_MVC_**).

**ATELIER Synthesis:** _The value of JS is not only technical: it is a **meeting language** between what the user does, what the server processes, and what the designer imagines._

**Keys:**

- **C++** → **strong** and **static** typing.
- **JS** → **dynamic** typing (the type is inferred at runtime).
- **_PHP_** → similar to JS in dynamism, but runs on server.

---

## ✨ Main characteristics of JavaScript

### 1. Interpreted language

JavaScript is not compiled beforehand like **C++** or **_Java_**, but **interpreted in real time by the browser engine** (such as **_V8_** in **_Chrome_** or **_SpiderMonkey_** in **_Firefox_**). This allows **dynamic interactions** and quick updates on web pages.

**Source:** _Wikipedia_ – _Just-in-time compilation_  
[https://en.wikipedia.org/wiki/Just-in-time_compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation)

---

### 2. Event‑driven

It is an **_event-driven_** language: it responds to **user interactions** (_clicks_, scrolls, keyboard input). This makes it ideal for building **reactive** and **_responsive_** applications.
Events connect **user actions** and **system changes** to your code.

- **MDN: DOM events** — Complete index of events  
  [https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events)

- **MDN: Introduction to events** — Basics of events and event listeners  
  [https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)

- **MDN: addEventListener** — Options and best practices  
  [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

---

### 3. Prototype‑based

Instead of rigid classes, JavaScript uses a **prototype‑based** model: objects can **inherit directly** from other objects.

In simple words: you can create an object without previously defining a class.

**Source:** **_MDN_** – _Prototype-based programming_  
[https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming](https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming)

---

### 4. First‑class functions

**Functions are treated like any other variable**: they can be passed as an argument, returned from another function, or assigned to a variable.

**Source:** **_MDN_** – _First-class Function_  
[https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)

---

### 5. Asynchrony

JavaScript supports **asynchronous operations** that do not block the main flow:

- `setTimeout`
- **Promises** (_Promises_)
- `async/await`

This allows handling **long tasks** (such as requests to a server) without freezing the interface.

**Source:** **_MDN_** – _Asynchronous JS_  
[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)

---

### 6. Client‑side _scripting_ language

It was originally designed to run on the **client** (the browser), giving interactivity to **_HTML_**.

Today, thanks to **_Node.js_**, it also runs on the **server**.

**Source:** _Wikipedia_ – _Server-side scripting_  
[https://en.wikipedia.org/wiki/Server-side_scripting](https://en.wikipedia.org/wiki/Server-side_scripting)

---

### 7. Lightweight and flexible syntax

Its syntax is relatively simple and **permissive**, which facilitates initial learning. Unlike **C++** or **_Java_**, it does not require **strict typing** or too much configuration to start using it.

---

### 8. Dynamic typing

Variables **are not tied to a fixed type**. The interpreter decides the type at runtime according to the value.

**Example:**

```js
let x = 10; // number
x = 'hello'; // now it is string
```

**Source:** **_MDN_** – _Dynamic typing_  
[https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing)

---

### 9. _Cross‑platform_

JavaScript works on almost all devices and operating systems thanks to its execution in browsers and engines such as **_V8_**, **_SpiderMonkey_** or **_JavaScriptCore_**.

➡️ This makes it a **truly universal language**.

---

### 10. Rich ecosystem of libraries and _frameworks_

JavaScript has a **huge and active ecosystem**:

- **_Frontend frameworks_**: **_React_**, **_Angular_**, **_Vue_**.
- **Package managers**: **_npm_**, **_Yarn_**.
- **Build tools**: **_Babel_**, **_Webpack_**, **_Vite_**.

➡️ This allows developing **large‑scale projects** quickly and efficiently.

### 📌 Conclusion

JavaScript is **lightweight**, **flexible** and **_cross‑platform_**.

Its **interpreted**, **event‑driven** and **asynchronous** nature makes it unique for the web.

In addition, its **ecosystem** of libraries and _frameworks_ ensures its central role in modern development, both in the _frontend_ and in the _backend_.

---

## 🌐 The DOM: bridge between HTML and JS

The **_Document Object Model_** (**DOM**) turns **_HTML_** into a **tree of nodes** that JS can manipulate.

**Example:**

```html
<h1 id="title">Hello</h1>
```

**JavaScript in the browser:**

```js
const title = document.getElementById('title');
title.textContent = 'Modified with JS';
```

---

## ⚡ Events: the logic of the _frontend_

JS allows responding to **user actions** (_click_, _scroll_, keyboard).

```html
<button id="btn">Click</button>
```

```js
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
	alert('Button pressed!');
});
```

**Comparison:**

- **C++**: a desktop program uses _event listeners_ for _clicks_ in **_GUI_**.
- **_Laravel_**/**_PHP_**: processes the request when the user submits a form.
- **JS**: reacts in the moment, **without reloading the page**.

**ATELIER Reflection:** _Events = improvisation on stage: the user "interrupts" and the program must adapt instantly._

### Common Browser & UX Events

| Event                                                                | Description / Use Case                             |
| -------------------------------------------------------------------- | -------------------------------------------------- |
| `click`                                                              | User clicks a button/link/element                  |
| `dblclick`                                                           | Double click                                       |
| `mousedown`, `mouseup`                                               | Pressing / releasing mouse (or pointer) buttons    |
| `mousemove` / `mouseover` / `mouseout` / `mouseenter` / `mouseleave` | Cursor hover / tracking pointer movement           |
| `keydown`, `keyup`, `keypress`                                       | Keyboard input (forms, shortcuts)                  |
| `input` / `change`                                                   | User changes a form field (text, checkbox, select) |
| `submit`                                                             | Form submission                                    |
| `focus` / `blur`                                                     | Element gains or loses focus (accessibility)       |
| `resize`                                                             | Browser window or container is resized             |
| `scroll`                                                             | Scrolling the page or a container                  |
| `load` / `DOMContentLoaded`                                          | Page and resources load; DOM parsed                |
| `error`                                                              | Resource fails to load / runtime error             |
| `contextmenu`                                                        | Right-click / context menu invoked                 |
| `touchstart`, `touchmove`, `touchend`                                | Finger interactions on touch devices               |
| `pointerdown`, `pointerup`, `pointermove`                            | Unified pointer events (mouse, touch, stylus)      |
| `dragstart`, `drag`, `drop`, `dragend`                               | Drag & drop interactions                           |
| `wheel`                                                              | Mouse wheel scroll                                 |
| `online` / `offline`                                                 | Network connectivity changes                       |
| `visibilitychange`                                                   | Page/tab becomes hidden or visible                 |
| `beforeunload`, `unload`                                             | User leaves or closes page                         |

---

### UX & Performance Considerations

- **High-frequency events** (`mousemove`, `scroll`, `pointermove`) should be throttled or debounced.
- Use **passive listeners** for `scroll` and `touchmove` to improve performance.
- Prefer **scoped listeners** (on specific elements) over `document`/`window` to reduce overhead.
- Accessibility matters: don’t rely only on mouse events. Always include keyboard (`keydown`) and focus management.
- Browser differences exist, especially with touch and pointer events; test on multiple devices.

---

### Reflection

- Which events felt most natural to use?
- How do events connect _UX intentions_ (click, type, scroll) with code behavior?
- What risks exist if you bind too many events without optimization?

---

## 🚀 Node.js and the JS ecosystem

**Before:** JS only in browsers.

**Now:** thanks to **_Node.js_** (2009) it runs on the server.

**_Node_** uses the **_V8_** engine of **_Chrome_**.

It allows building **_APIs_**, real‑time _apps_, microservices.

**Comparison with** **_Laravel_**:

- **_Laravel_** structures the _backend_ with **_MVC_** [https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller).
- **_Node.js_**/**_Express_** allow _backend_ in JS, **sharing language** with the _frontend_.
- In a modern **_stack_**: **_Laravel_** and JS coexist, or full JS is used (**_MERN_**, **_MEAN_**).

> Quick taste and `package.json` basics: see "Taste Node.js locally" in the [Development Environment lesson § Taste node]({{ base_url }}/lessons/en/development-environment/#taste-node).

---

## 🔧 Practice with Chrome DevTools

**Objective:** master the browser tools to observe, intervene and debug code quickly and methodically.

### 1) _Console_: run JS live

- Open DevTools: **Cmd ⌘ + ⌥ + I** (macOS) / **Ctrl + Shift + I** (Windows/Linux).
- Try it:
  - Type `1 + 2`, `document.title`, `typeof window`.
  - Use `console.log('Hello', Date.now())`, `console.table([1,2,3])`, `console.dir(document.body)`.
  - Clear with `clear()`.
- With the element selected in **_Elements_**, `$_` is the last result and `$0` the reference to the selected node. E.g.: `$0.textContent = 'Changed from Console'`.

Mini–challenge:

```js
// In Console, create and display a user object
const user = { id: 1, name: 'Ana', skills: ['HTML', 'CSS', 'JS'] };
console.table(user);
```

### 2) _Elements_: inspect and modify the _DOM_

- Right‑click on a page element → "Inspect".
- Edit the text live; add/remove classes in the **Styles** panel.
- From **_Console_** with `$0` (active node):

```js
// $0 is a special Chrome DevTools variable that references the currently selected DOM element
// When you inspect an element in the Elements tab, it becomes $0
// You can then manipulate it directly from the Console:

$0.classList.add('highlighted'); // Add a CSS class to the selected element
$0.style.outline = '3px solid hotpink'; // Apply inline styles directly

// Other useful $0 operations:
// $0.textContent = 'New text';     // Change the text content
// $0.innerHTML = '<em>HTML</em>';  // Change the HTML content
// $0.remove();                     // Remove the element from the page
// $0.parentElement;                // Access the parent element
```

- Simulate `:hover` and states to verify styles.

Mini–challenge:

- Change the content of an `h1` without reloading.
- Add a class and verify its effect in the styles.

### 3) _Sources_: debug `assets/js/main.js`

> Debugging is like slow-motion replay in sports — you can see each move, who passed the ball, and where it went wrong.

> Work inprogress…

- Open `assets/js/main.js` in the **_Sources_** tab.
- Place a breakpoint in a function and reload (⌘R / Ctrl+R):
  - Think of a breakpoint as a pause button you insert into your code.
  - The browser stops exactly on that line so you can see what's happening inside your program.
  - Click on the line number in the Sources tab to set/remove a breakpoint (red dot appears).
  - When code execution reaches that line, it pauses and shows current variable values.
- Use the stepping controls when paused at a breakpoint:

  - **Step Over** (F10) → Execute the current line completely. If it calls a function, run the entire function but don't go inside it step-by-step.
  - **Step Into** (F11) → If the current line calls a function, jump inside that function to debug it line by line.
  - **Step Out** (Shift+F11) → Finish running the current function and return to wherever it was called from.

- **Watch** variables in real-time:

  - The Watch panel lets you add variable names you want to monitor.
  - As your code runs, their values update automatically.
  - Example: add `a`, `b`, and `sum` to Watch → see how they change as you step through.

- Check the **Call Stack** (who called what):

  - Shows the chain of function calls that led to the current line.
  - Example: `main.js:15` → `add()` → `console.log()`.
  - It's like a breadcrumb trail showing how your program got to this point.

- Force pause with `debugger;` statement:
  - Instead of clicking to set breakpoints, you can write `debugger;` directly in your code.
  - When the browser executes that line, it automatically pauses (like hitting a breakpoint).
  ```js
  function add(a, b) {
  	debugger; // Execution will pause here automatically
  	const sum = a + b;
  	return sum;
  }
  ```
  - Remember to remove `debugger;` statements before deploying to production!

### 4) _Network_: requests, cache and _throttling_

- Enable "Disable cache" with DevTools open.
- Apply _throttling_ (e.g.: **Fast 3G**) to simulate slow networks.
- Observe the _waterfall_, sizes, codes, `Content-Type` and approximate `TTFB`/`LCP` times.
- Check **Headers** and **Preview** of responses.

Mini–challenge:

- Identify the heaviest resource and justify an optimization (minify, defer, compress, change format, CDN).

### 5) Performance and Lighthouse (quick)

- In **Performance**: record 5–10 seconds navigating; detect _Long Tasks_ (>50ms) and _layout shifts_.
- In **Lighthouse**: run a "Performance" and "Best Practices" report for a page; note 2 actionable improvements.

### 6) Recommended flow (5 steps)

1. Reproduce the problem (or hypothesis) and set a goal.
2. Observe in **_Console_** and **_Elements_** (state of the **_DOM_**, classes, computed styles).
3. Debug in **_Sources_** (breakpoints, _watch_, `debugger;`).
4. Measure in **_Network_**/**Performance** (cache, _throttling_, _waterfall_, _long tasks_).
5. Document the finding (screenshot + notes) and apply the fix.

### 7) Good practices

- Prefer breakpoints to `alert()`; use `console` levels (`log`, `warn`, `error`, `time`/`timeEnd`).
- Enable "Preserve log" if you need to keep traces after navigating.
- Use _source maps_ when working with bundlers to debug real source code. (Advanced)
- Clear _noise_: `clear()` before measuring, disable extensions when auditing. (Explain)

Delivery checklist (optional):

- 1 screenshot of **_Elements_** showing a change in the **_DOM_**.
- 1 screenshot of **_Sources_** with breakpoint and _watch_.
- 1 screenshot of **_Network_** with _throttling_ and explanation of the _bottleneck_.
- 1 list of 2–3 prioritized improvement actions.

---

## Detailed Guide: Progressive exercises with `assets/js/main.js`

This document describes 3 **progressive commits** to learn to use JavaScript in a web project.  
We will work on the `assets/js/main.js` file of your repository.

### 🔧 Prerequisites

- Have cloned the `student-project-template` repository.
- Open the project in **Visual Studio Code**.
- Have **Live Server** (or similar) installed to see changes in the browser in real time.
- Know the basics of **Git**:
  - `git add .`
  - `git commit -m "message"`
  - `git push`

---

### ✅ Commit 1 — Basic initialization and connection

**Objective:** check that the JS file is connected to the HTML and manipulate the DOM in a simple way.

#### Steps

1. Open `assets/js/main.js` and add:

   ```js
   // Connection check
   console.log('✅ main.js loaded correctly');

   // Selection of a DOM element
   const title = document.getElementById('title');

   // Change its content if it exists
   if (title) {
   	title.textContent = 'Text changed from main.js';
   }
   ```

2. Open the site with Live Server.
3. Go to **DevTools (F12) → Console** and verify:
   - The message `✅ main.js loaded correctly` appears.
   - The content of the element with id `title` has changed.

#### Possible errors

- ❌ `null` in console → means that `id="title"` does not exist in your HTML.
- ❌ No message appears in console → you probably did not link your `main.js` well in the HTML (`<script src="assets/js/main.js"></script>`).

#### Commit

```bash
git add assets/js/main.js
git commit -m "Commit 1: Console log and title change from JS"
```

---

### ✅ Commit 2 — Basic user events

**Objective:** add a button that responds to a click event.

#### Steps

1. In your `index.html`, add a button inside the `<body>`:

   ```html
   <button id="btn-action">Click here</button>
   ```

2. In `main.js`, add:

   ```js
   const btn = document.getElementById('btn-action');

   if (btn) {
   	btn.addEventListener('click', () => {
   		alert('🚀 Button clicked correctly');
   	});
   }
   ```

3. Save and test in the browser:
   - Click the button.
   - An alert should appear.

#### Possible errors

- ❌ `btn is null` → check that the button has exactly `id="btn-action"`.
- ❌ The alert does not appear → check that your script is loaded **at the end of the body** or with `defer` in the `<script>`.

#### Commit

```bash
git add .
git commit -m "Commit 2: Added button with click event"
```

---

### ✅ Commit 3 — Dynamic event with scroll

**Objective:** make the `header` change color when scrolling.

#### Steps

1. Make sure you have a `<header>` in your `index.html`.
2. In `main.js`, add:

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

3. Test in the browser:
   - Scroll down.
   - The `header` changes color when `scrollY > 100`.
   - Go back up and it is restored.

#### Possible errors

- ❌ The color does not change → check that your page has enough content to scroll.
- ❌ `header is null` → check that your HTML really has a `<header>`.

#### Commit

```bash
git add assets/js/main.js
git commit -m "Commit 3: Scroll event with dynamic header change"
```

---

### 📌 Final summary

After the 3 commits your `main.js` should:

1. Show a message in console and modify the DOM (Commit 1).
2. Respond to a click on a button with an event (Commit 2).
3. Dynamically change the style of an element with scroll (Commit 3).

---

### 🧰 Extra (optional to expand)

- **Keyboard events**: detect when the user types.

  ```js
  document.addEventListener('keydown', (e) => {
  	console.log('Key pressed:', e.key);
  });
  ```

- **Input events**: update text in real time.

  ```js
  const input = document.querySelector('input');
  const output = document.getElementById('output');

  input.addEventListener('input', () => {
  	output.textContent = input.value;
  });
  ```

---

### 🎭 ATELIER methodology applied

- **Observe**: analyze in DevTools how the page reacts.
- **Intervene**: add code in `main.js` step by step.
- **Reflect**: note what you learned with each commit.
- **Share**: upload commits to the repository and show your classmates.