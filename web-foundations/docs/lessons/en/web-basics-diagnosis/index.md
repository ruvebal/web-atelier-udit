---
layout: lesson
title: 'Basic Web Ecosystem'
title_alt: 'Basic Web Ecosystem'
slug: web-basics-diagnosis
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/web-basics-diagnosis/
---

## ✅ Initial diagnostic checklist

**Working repository:** [student-project-template](https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template)

**Objective:** verify in 30 minutes that we all share some common minimums.  
👉 Mark each item with one of these options:

| Status | Meaning     |
| :----: | ----------- |
|   🟢   | Yes, I know |
|   🟡   | So-so       |
|   🔴   | No, no idea |

---

### 🔹 HTML + CSS

| Concept                                                                                                  | Canonical reference                                                                                         |    Status    |
| :------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------: |
| Create an `index.html` document with minimum structure (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`) | [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) | 🟢 / 🟡 / 🔴 |
| Use semantic tags (`<header>`, `<main>`, `<footer>`)                                                     | [MDN: Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)             | 🟢 / 🟡 / 🔴 |
| Link `css/index.css` in the `<head>`                                                                     | [MDN: HTML `<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)                        | 🟢 / 🟡 / 🔴 |
| Basic color properties (`color`, `background-color`)                                                     | [MDN: CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)                                    | 🟢 / 🟡 / 🔴 |
| Create and reuse CSS classes                                                                             | [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)                        | 🟢 / 🟡 / 🔴 |

---

### 🔹 Typography and responsive design

| Concept                                        | Canonical reference                                                                                                                                                      |    Status    |
| :--------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Load a **web font** (Google Fonts, @font-face) | [MDN: CSS @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) · [Google Fonts](https://fonts.google.com/)                                           | 🟢 / 🟡 / 🔴 |
| Fluid typography with `clamp()`, `em`, `rem`   | [MDN: CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)                                                                                               | 🟢 / 🟡 / 🔴 |
| Layouts with **Flexbox** or **CSS Grid**       | [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) · [MDN: Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) | 🟢 / 🟡 / 🔴 |

---

### 🔹 JavaScript

| Concept                                            | Canonical reference                                                                                      |    Status    |
| :------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :----------: |
| Link `js/index.js` in `index.html` with `<script>` | [MDN: `<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)                      | 🟢 / 🟡 / 🔴 |
| `console.log()` in the console                     | [MDN: console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log)                       | 🟢 / 🟡 / 🔴 |
| Element selection with `document.querySelector()`  | [MDN: querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)          | 🟢 / 🟡 / 🔴 |
| Modify text (`innerText`, `textContent`)           | [MDN: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)                    | 🟢 / 🟡 / 🔴 |
| Event handling (`addEventListener`)                | [MDN: addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) | 🟢 / 🟡 / 🔴 |

---

### 🔹 Browser and DevTools

| Concept                                        | Canonical reference                                                                                           |    Status    |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :----------: |
| Use **Inspector (DevTools)** in Chrome/Firefox | [Chrome DevTools overview](https://developer.chrome.com/docs/devtools/)                                       | 🟢 / 🟡 / 🔴 |
| Edit styles in the **Elements** panel          | [Chrome DevTools: CSS](https://developer.chrome.com/docs/devtools/css/)                                       | 🟢 / 🟡 / 🔴 |
| Review requests in **Network**                 | [Chrome DevTools: Network panel](https://developer.chrome.com/docs/devtools/network/)                         | 🟢 / 🟡 / 🔴 |
| Disable cache in Network                       | [Chrome DevTools: Disable cache](https://developer.chrome.com/docs/devtools/network/reference/#disable-cache) | 🟢 / 🟡 / 🔴 |
| Simulate mobile with **Device Toolbar**        | [Chrome DevTools: Device mode](https://developer.chrome.com/docs/devtools/device-mode/)                       | 🟢 / 🟡 / 🔴 |

---

### 🔹 Development environment

| Concept                               | Canonical reference                                                                                                        |    Status    |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Have **Visual Studio Code** installed | [VS Code docs](https://code.visualstudio.com/docs)                                                                         | 🟢 / 🟡 / 🔴 |
| Prettier working on save              | [Prettier: Editor integration](https://prettier.io/docs/en/editors.html)                                                   | 🟢 / 🟡 / 🔴 |
| Linter active (HTMLHint/ESLint)       | [ESLint](https://eslint.org/docs/latest/use/getting-started) · [HTMLHint](https://github.com/htmlhint/HTMLHint#readme)     | 🟢 / 🟡 / 🔴 |
| Clone repo in VS Code                 | [GitHub Docs: Clone repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) | 🟢 / 🟡 / 🔴 |
| Make a test commit                    | [Git basics – Git SCM](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)                      | 🟢 / 🟡 / 🔴 |

---

### 🔹 Basic concepts of the web ecosystem

(Also see: [FreeCodeCamp: How the Web Works](https://www.freecodecamp.org/news/how-the-web-works-a-primer-for-newcomers-to-web-development-or-anyone-really-b4584e63585c/))

| Concept                                                                     | Canonical reference                                                                                                                     |    Status    |
| :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| History and evolution of the Web (Tim Berners-Lee, origins, open standards) | [MDN: The web and web standards](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/The_web_and_web_standards) | 🟢 / 🟡 / 🔴 |
| Web standards and bodies (W3C, WHATWG, IETF)                                | [W3C Standards](https://www.w3.org/standards/) · [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)                           | 🟢 / 🟡 / 🔴 |
| How the Web works (HTTP, DNS, hosting, browsers)                            | [MDN: How the Internet works](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work) | 🟢 / 🟡 / 🔴 |
| Web 1.0 → Web 2.0 → Web 3.0                                                 | [MDN: Evolution of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP)                                    | 🟢 / 🟡 / 🔴 |
| Web accessibility (WCAG, WAI-ARIA)                                          | [W3C WAI: Accessibility standards](https://www.w3.org/WAI/standards-guidelines/) · [WebAIM Principles](https://webaim.org/intro/)       | 🟢 / 🟡 / 🔴 |
| Responsive and adaptive design                                              | [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)                               | 🟢 / 🟡 / 🔴 |
| Basic SEO (Search Engine Optimization)                                      | [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)                                    | 🟢 / 🟡 / 🔴 |
| Visual impact and hierarchy in web design                                   | [Interaction Design Foundation: Web Design Basics](https://www.interaction-design.org/literature/topics/web-design)                     | 🟢 / 🟡 / 🔴 |

---

### 🔹 Git, GitHub and CI/CD

| Concept                                                                 | Canonical reference                                                                                                                                                                 |    Status    |
| :---------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| What is a version control system and why Git                            | [Git SCM – About](https://git-scm.com/about)                                                                                                                                        | 🟢 / 🟡 / 🔴 |
| Difference between local and remote repositories (GitHub)               | [GitHub Docs: About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)                                                    | 🟢 / 🟡 / 🔴 |
| Create a repository and clone it locally                                | [GitHub Docs: Clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)                                                  | 🟢 / 🟡 / 🔴 |
| Basic workflow: `git add`, `git commit`, `git push`                     | [Git SCM – Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)                                                                        | 🟢 / 🟡 / 🔴 |
| Create and switch branches (`git branch`, `git checkout`, `git switch`) | [Git SCM – Branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)                                                                                           | 🟢 / 🟡 / 🔴 |
| Pull Requests and code reviews on GitHub                                | [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) | 🟢 / 🟡 / 🔴 |
| Publish a site on GitHub Pages                                          | [GitHub Docs: About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)                                                            | 🟢 / 🟡 / 🔴 |
| What is CI/CD (Continuous Integration and Delivery)                     | [Atlassian CI/CD guide](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd)                                                                                               | 🟢 / 🟡 / 🔴 |
| Basic workflow setup in GitHub Actions                                  | [GitHub Docs: About workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)                                                                                  | 🟢 / 🟡 / 🔴 |

### 🧪 In-class activity

1. Complete this checklist in your cloned repo `student-project-template`.
2. Try out the doubtful items in practice (HTML, CSS, JS, DevTools, Git).
3. Mark 🟢 / 🟡 / 🔴 on each item.
4. Make a commit with the updated file:

```bash
git add .
git commit -m "diagnostic: fundamentals checklist completed"
```