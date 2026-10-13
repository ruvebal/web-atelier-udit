---
layout: lesson
title: 'JavaScript Fundamentals (Session 7 pre-work)'
title_alt: 'Fundamentos de JavaScript (trabajo previo de la Sesión 7)'
slug: js-fundamentals
date: 2026-10-13
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/js-fundamentals/
status: complete
tags: [javascript, fundamentals, variables, functions, objects, pre-work]
description: 'Self-study pre-work for Session 7: the core language — values, text, arrays, decisions, loops, functions, objects and errors — practised in the DevTools Console.'
---

<aside class="lesson-framing" aria-label="Master idea and field lens">
<p><strong>Master idea:</strong> A program is data plus decisions; the language is how you name both.</p>
<p><strong>Field lens:</strong> **Practice anchor:** values, collections, control flow, functions and objects, tried line by line in the Console. **Frontier signal:** assistants write syntax instantly — predicting what a line does is the skill that stays yours.</p>
</aside>

> **Studio test:** Predict the output of a line before you run it — then explain any surprise.

> _"Build → Write → Understand - The three stages of code enlightenment."_
> — Tao of Development, `cc-011`

{% include lesson-semantic-graphic.html %}
<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## For / Not for

**For:** Front-End I **Session 7 pre-work** — the core JavaScript language, studied on your own before the Session 7 class (browser runtime, DOM, events).

**Not for:** the DOM and events (Session 7 in class), rendering (Session 8), modules (Session 9), async code and `fetch()` (later in the course).

**When you finish this pre-work you will have:** a `practice.js` file built from the exercises, the self-check answered in your ATELIER notes, and the vocabulary Session 7 assumes on day one.

---

## Before you start

| Requirement | Required? |
| --- | --- |
| Chrome or Edge with DevTools | Yes |
| VS Code (Session 1) | Yes |
| Any prior programming (C++, PHP, Python…) | No — helpful, not assumed |

**Official time:** self-study before Session 7, ≈ 3–4 h at your own pace (not class time). Session 7 opens with five minutes on the self-check.

---

## Follow this path

| Step | Action | Section |
| --- | --- | --- |
| 1 | Open the DevTools Console on any page | How to practise |
| 2 | Work through sections 1–8, running every snippet | Variables → Objects |
| 3 | Read the three error types and break something on purpose | Errors |
| 4 | Build the mini-project in `practice.js` | Mini-project |
| 5 | Answer the self-check without running code, then check | Self-check |
| 6 | Note what surprised you in your ATELIER notes | Submit below |

---

## Verify before Session 7

- [ ] You can say what `let`, `const`, `===`, `[]`, `{}` and `=>` mean, one line each
- [ ] You predicted at least 8 of the 10 self-check outputs before running them
- [ ] Your mini-project prints the filtered project list with template literals
- [ ] You triggered and read a `ReferenceError` and a `TypeError` on purpose
- [ ] When an assistant explained something, you rewrote the explanation in your own words before moving on

---

## Common failures

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `"5" + 3` gives `"53"` | One operand is a string, so `+` joins text | Convert first: `Number("5") + 3` |
| `TypeError: Assignment to constant variable` | Reassigning a `const` | Use `let` for values that change |
| `ReferenceError: x is not defined` | Typo, or the name is outside the current scope | Check spelling; declare where it is used |
| `undefined` from a function | No `return` statement | `return` the value you computed |
| `==` says two different things are equal | Loose equality converts types | Use `===` |
| An assistant hands you finished answers for the self-check | Asked it to solve, not to explain | Predict first, run second; ask the assistant *why*, never *what* |

---

## Submit (pre-work evidence)

- `practice.js` committed to your portfolio repo (it is not linked from `index.html`; it is your scratchpad)
- Self-check: your predictions, the real outputs, and one sentence on each miss — in your ATELIER notes
- **AI line:** `AI: <tool> / none · one explanation I rewrote in my own words` — the habit graded later with the [AI declaration and oral-defence rubric]({{ '/evaluation/shared/ai-declaration-oral-defence-rubric/' | relative_url }})

---

## Objectives

- Store and change values with `let` and `const`, and name them well.
- Compute with numbers and compare with `===`.
- Build text with template literals and common string methods.
- Hold lists in arrays and transform them with `map()` and `filter()`.
- Choose paths with conditionals and repeat work with loops.
- Package logic in functions, and know what scope a name lives in.
- Model things as objects and read their properties.
- Read the three common error messages instead of guessing.

---

## How code works in this lesson

- **CodeSandbox-ready** — complete: paste it into the DevTools Console (or a `.js` file) and it runs as shown.
- **Excerpt** — a fragment that needs context around it.
- **Template** — a starting point you must adapt.

There is no project setup: open DevTools (**Cmd ⌘ + ⌥ + I** / **Ctrl + Shift + I**), choose **Console**, paste a block, press Enter. Each block starts fresh names, so if the Console says a name "has already been declared", reload the page. The routed React sandbox convention used in later units does not apply here.

---

## JavaScript references

The three references this course uses in every JavaScript session:

| Role | Reference |
| --- | --- |
| Standard — current reference | [ECMAScript® Language Specification (ECMA-262), Ecma International](https://262.ecma-international.org/) |
| Recommended documentation | [MDN Web Docs — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| Trademark | [JavaScript at Oracle](https://www.oracle.com/developer/javascript/) — as MDN states: “Both "Java" and "JavaScript" are trademarks or registered trademarks of Oracle in the U.S. and other countries.” |
| Learning path | [MDN Curriculum — Core 6. JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/) — this pre-work covers 6.1–6.8 and the error basics of 6.15; Session 7 continues with 6.9 DOM scripting and 6.10 Events. |

Reference pages for this pre-work: [Dynamic scripting with JavaScript (MDN Learn)](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) · [Grammar and types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types) · [JavaScript error reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors).

---

## 1. Variables and values (MDN 6.1)

A variable is a named box for a value. `let` boxes can be refilled; `const` boxes cannot.

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

- Five kinds of value you will meet daily: **string**, **number**, **boolean**, **array**, **object**.
- Default to `const`; switch to `let` only when the value must change. Avoid `var` (older, looser scoping).
- Name for meaning: `completedSessions`, not `cs` or `data`. JavaScript uses `camelCase`.

## 2. Numbers and operators (MDN 6.2)

**CodeSandbox-ready**

```js
const price = 19.99;
const quantity = 3;
console.log(price * quantity);

console.log('5' + 3); // text join
console.log(Number('5') + 3); // math

let count = 0;
count += 2;
count++;
console.log(count);

console.log(5 === 5, 5 === '5', 5 == '5');
console.log(Math.floor(Math.random() * 6) + 1); // a dice roll
```

- `+ - * /` work as expected on numbers; with a string, `+` joins text instead.
- Compare with `===` / `!==` (value **and** type). `==` converts types first and surprises people.
- Operator precedence follows maths: `2 + 3 * 4` is `14`; use parentheses to be explicit.

## 3. Text (MDN 6.3)

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

- Single or double quotes must match; inside, escape with `\` (`'It\'s'`) or switch quote style.
- **Template literals** (backticks) embed values with `${…}` and can span lines — Session 8 builds HTML with them, so get comfortable here.

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

- Index from `0`; the last item is `array[array.length - 1]`.
- `map()` returns a **new** array of transformed items; `filter()` returns a new array of the items that pass a test; `forEach()` just runs code for each item.

## 5. Conditionals (MDN 6.5)

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

- `&&` (and), `||` (or), `!` (not) combine tests.
- The ternary `test ? a : b` picks one of two values — handy inside template literals.
- `switch` exists for many fixed cases; `if … else if` covers what you need now.

## 6. Loops (MDN 6.6)

**CodeSandbox-ready**

```js
for (let i = 1; i <= 3; i++) {
	console.log(`Session ${i}`);
}

const colors = ['red', 'green', 'blue', 'stop', 'violet'];
for (const color of colors) {
	if (color === 'green') continue; // skip this one
	if (color === 'stop') break; // leave the loop
	console.log(color);
}
```

- Use a counting `for` when you need the number; `for … of` when you need each item.
- With arrays, `map`/`filter`/`forEach` often replace a hand-written loop.

## 7. Functions (MDN 6.7)

**CodeSandbox-ready**

```js
function area(width, height) {
	return width * height;
}
console.log(area(4, 3));

const toSlug = (text) => text.toLowerCase().replaceAll(' ', '-');
console.log(toSlug('Typography Poster'));

const siteName = 'Portfolio'; // global scope: visible everywhere below
function label(page) {
	const separator = ' · '; // function scope: only inside label()
	return `${page}${separator}${siteName}`;
}
console.log(label('Home'));

function twice(action) {
	action();
	action();
}
twice(() => console.log('callback ran'));
```

- **Parameters** are the names in the definition; **arguments** are the values you pass.
- Without `return`, a function gives back `undefined`.
- **Scope:** a name declared inside `{ … }` exists only there. Names at the top level are global — Session 9 shows why too many globals hurt.
- A **callback** is a function passed to another function. Session 7's `addEventListener('click', () => …)` is exactly this.
- A **method** is a function stored on an object: `title.toUpperCase()`, `console.log()`.

## 8. Objects (MDN 6.8)

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

const { title, year } = project; // destructuring
console.log(title, year);
```

- Dot syntax `project.title` for known names; bracket syntax `project[key]` when the name is in a variable.
- Inside a method, `this` is the object the method was called on.
- Almost everything you touch in the browser is an object: `document`, `window`, `console`, arrays, elements.

## Errors: read the message first (MDN 6.15)

**CodeSandbox-ready** — run it and read each message the Console prints.

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

| Error | What it usually means |
| --- | --- |
| `SyntaxError` | The code cannot even be read: a missing `)`, `}` or quote. Nothing in the file runs. |
| `ReferenceError` | A name that does not exist here: typo or wrong scope. |
| `TypeError` | The value exists but cannot do that: calling a method on `null` / `undefined`, reassigning a `const`. |

`try … catch` lets a program survive an error it expects; `throw` raises your own. In Session 7 you will meet `null` errors constantly — `document.querySelector()` returns `null` when nothing matches.

---

## Mini-project: portfolio data in `practice.js`

Everything above, together, on data Session 8 will render.

**Template** — create `assets/js/practice.js` in your repo, replace the projects with yours, and run it with the Console open (drag the file into a tab, or paste it).

```js
const projects = [
	{ title: 'Typography poster', year: 2025, tags: ['type', 'print'] },
	{ title: 'Grid study', year: 2026, tags: ['css', 'layout'] },
	{ title: 'Colour system', year: 2026, tags: ['css', 'colour'] },
];

function formatProject(project) {
	return `${project.title} (${project.year}) — ${project.tags.join(', ')}`;
}

const recentProjects = projects.filter((project) => project.year >= 2026);

for (const line of recentProjects.map(formatProject)) {
	console.log(line);
}

console.log(`${recentProjects.length} of ${projects.length} projects are from 2026.`);
```

Extend it: add a `featured: true` field to one project and print `★` before its title with a ternary.

**Excerpt**

```bash
git add assets/js/practice.js
git commit -m "chore(js): fundamentals pre-work practice"
```

---

## Self-check (predict, then run)

Write your prediction for each line **before** running it. Answers are below.

**Excerpt** — ten independent lines; run each on its own.

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

**Answers:** `'number'` · `'71'` · `6` · `false` · `20` · `[10, 20, 30]` · `[2, 4]` · `'Total: 5'` · `undefined` · `2`.
The usual surprise is `'7' - 1`: `-` has no text meaning, so JavaScript converts `'7'` to a number — while `+` joins text. That asymmetry is why you convert with `Number()` on purpose.

---

## Optional deep dive: JavaScript in context

Background, if you want it; nothing here is needed for Session 7.

**Short history**

- **1995** — Brendan Eich creates JavaScript at Netscape (Mocha → LiveScript → JavaScript).
- **1997** — ECMAScript standardises the language across browsers.
- **2000s** — AJAX: pages load data without reloading (Gmail, Google Maps).
- **2009** — Node.js runs JavaScript on the server.
- **2015 →** — ES2015 (`let`/`const`, arrow functions, classes, modules, Promises); yearly releases since.

**If you already know C++ or PHP**

| Concept | C++ | JavaScript | PHP / Laravel |
| --- | --- | --- | --- |
| Variable | `int x = 10;` | `let x = 10;` / `const x = 10;` | `$x = 10;` |
| Typing | static, strong | dynamic (type decided at runtime) | dynamic |
| Function | `int add(int a, int b)` | `const add = (a, b) => a + b;` | `function add($a, $b)` |
| Object | `struct` / `class` | `{ name: 'Ana' }` / `class` | associative array / `class` |
| Runs in | compiled native binary | browser engine (or Node.js) | server |
| Reacts to users | GUI event loop | DOM events, without reload | on request (form submit) |

**Node.js** runs the same language on the server; you meet it as a tool runner in the [development environment lesson]({{ '/lessons/en/development-environment/' | relative_url }}#taste-node) (section 8, "Taste Node.js locally").

---

## Further reading

- [MDN Learn — Dynamic scripting with JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) — the tutorials behind each MDN 6.x outcome.
- [*Eloquent JavaScript*](https://eloquentjavascript.net/), Marijn Haverbeke — free online edition; chapters 1–4 cover this pre-work in more depth.

Next: [Session 7 — Introduction to JavaScript]({{ '/lessons/en/js-intro/' | relative_url }}).
