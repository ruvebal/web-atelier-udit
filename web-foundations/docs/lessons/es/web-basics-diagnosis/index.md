---
layout: lesson
title: 'Conocimientos Básicos Ecosistema Web'
title_alt: 'Basic Web Ecosystem'
slug: web-basics-diagnosis
date: 2025-09-08
author: 'Rubén Vega Balbás, PhD'
lang: es
date: 2025-09-08
permalink: /lessons/es/web-basics-diagnosis/
---

## ✅ Checklist de diagnóstico inicial

**Repositorio de trabajo:** [student-project-template](https://github.com/ruvebal/web-atelier-udit/tree/main/student-project-template)

**Objetivo:** comprobar en 30 minutos que todos partimos de unos mínimos comunes.  
👉 Marca con una de estas opciones cada ítem:

| Estado | Significado  |
| :----: | ------------ |
|   🟢   | Sí, me lo sé |
|   🟡   | Más o menos  |
|   🔴   | No, ni idea  |

---

### 🔹 HTML + CSS

| Concepto                                                                                                | Referencia canónica                                                                                         |    Estado    |
| :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- | :----------: |
| Crear un documento `index.html` con estructura mínima (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`) | [MDN: HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) | 🟢 / 🟡 / 🔴 |
| Usar etiquetas semánticas (`<header>`, `<main>`, `<footer>`)                                            | [MDN: Semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html)             | 🟢 / 🟡 / 🔴 |
| Enlazar `css/index.css` en el `<head>`                                                                  | [MDN: HTML `<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)                        | 🟢 / 🟡 / 🔴 |
| Propiedades básicas de color (`color`, `background-color`)                                              | [MDN: CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color)                                    | 🟢 / 🟡 / 🔴 |
| Crear y reutilizar clases CSS                                                                           | [MDN: CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)                        | 🟢 / 🟡 / 🔴 |

---

### 🔹 Tipografía y diseño responsivo

| Concepto                                           | Referencia canónica                                                                                                                                                      |    Estado    |
| :------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Cargar una **web font** (Google Fonts, @font-face) | [MDN: CSS @font-face](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) · [Google Fonts](https://fonts.google.com/)                                           | 🟢 / 🟡 / 🔴 |
| Tipografía fluida con `clamp()`, `em`, `rem`       | [MDN: CSS clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)                                                                                               | 🟢 / 🟡 / 🔴 |
| Layouts con **Flexbox** o **CSS Grid**             | [MDN: Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) · [MDN: Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids) | 🟢 / 🟡 / 🔴 |

---

### 🔹 JavaScript

| Concepto                                              | Referencia canónica                                                                                      |    Estado    |
| :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :----------: |
| Enlazar `js/index.js` en `index.html` con `<script>`  | [MDN: `<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)                      | 🟢 / 🟡 / 🔴 |
| `console.log()` en la consola                         | [MDN: console.log()](https://developer.mozilla.org/en-US/docs/Web/API/console/log)                       | 🟢 / 🟡 / 🔴 |
| Selección de elementos con `document.querySelector()` | [MDN: querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)          | 🟢 / 🟡 / 🔴 |
| Modificar texto (`innerText`, `textContent`)          | [MDN: textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)                    | 🟢 / 🟡 / 🔴 |
| Manejo de eventos (`addEventListener`)                | [MDN: addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) | 🟢 / 🟡 / 🔴 |

---

### 🔹 Navegador y DevTools

| Concepto                                        | Referencia canónica                                                                                           |    Estado    |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :----------: |
| Usar **Inspector (DevTools)** en Chrome/Firefox | [Chrome DevTools overview](https://developer.chrome.com/docs/devtools/)                                       | 🟢 / 🟡 / 🔴 |
| Editar estilos en pestaña **Elements**          | [Chrome DevTools: CSS](https://developer.chrome.com/docs/devtools/css/)                                       | 🟢 / 🟡 / 🔴 |
| Revisar solicitudes en **Network**              | [Chrome DevTools: Network panel](https://developer.chrome.com/docs/devtools/network/)                         | 🟢 / 🟡 / 🔴 |
| Desactivar caché en Network                     | [Chrome DevTools: Disable cache](https://developer.chrome.com/docs/devtools/network/reference/#disable-cache) | 🟢 / 🟡 / 🔴 |
| Simular móvil con **Device Toolbar**            | [Chrome DevTools: Device mode](https://developer.chrome.com/docs/devtools/device-mode/)                       | 🟢 / 🟡 / 🔴 |

---

### 🔹 Entorno de desarrollo

| Concepto                               | Referencia canónica                                                                                                        |    Estado    |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Tener instalado **Visual Studio Code** | [VS Code docs](https://code.visualstudio.com/docs)                                                                         | 🟢 / 🟡 / 🔴 |
| Prettier funcionando al guardar        | [Prettier: Editor integration](https://prettier.io/docs/en/editors.html)                                                   | 🟢 / 🟡 / 🔴 |
| Linter activo (HTMLHint/ESLint)        | [ESLint](https://eslint.org/docs/latest/use/getting-started) · [HTMLHint](https://github.com/htmlhint/HTMLHint#readme)     | 🟢 / 🟡 / 🔴 |
| Clonar repo en VS Code                 | [GitHub Docs: Clone repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) | 🟢 / 🟡 / 🔴 |
| Hacer un commit de prueba              | [Git basics – Git SCM](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)                      | 🟢 / 🟡 / 🔴 |

---

### 🔹 Conceptos básicos del ecosistema web

(Revisa también: [FreeCodeCamp: How the Web Works](https://www.freecodecamp.org/news/how-the-web-works-a-primer-for-newcomers-to-web-development-or-anyone-really-b4584e63585c/))

| Concepto                                                                        | Referencia canónica                                                                                                                     |    Estado    |
| :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Historia y evolución de la Web (Tim Berners-Lee, orígenes, estándares abiertos) | [MDN: The web and web standards](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/The_web_and_web_standards) | 🟢 / 🟡 / 🔴 |
| Estándares web y organismos (W3C, WHATWG, IETF)                                 | [W3C Standards](https://www.w3.org/standards/) · [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)                           | 🟢 / 🟡 / 🔴 |
| Cómo funciona la Web (HTTP, DNS, hosting, navegadores)                          | [MDN: How the Internet works](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work) | 🟢 / 🟡 / 🔴 |
| Web 1.0 → Web 2.0 → Web 3.0                                                     | [MDN: Evolución del protocolo HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Guides/Evolution_of_HTTP)                            | 🟢 / 🟡 / 🔴 |
| Accesibilidad web (WCAG, WAI-ARIA)                                              | [W3C WAI: Accessibility standards](https://www.w3.org/WAI/standards-guidelines/) · [WebAIM Principles](https://webaim.org/intro/)       | 🟢 / 🟡 / 🔴 |
| Diseño responsivo y adaptable                                                   | [MDN: Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)                               | 🟢 / 🟡 / 🔴 |
| SEO (Search Engine Optimization) básico                                         | [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)                                    | 🟢 / 🟡 / 🔴 |
| Impacto visual y jerarquía en diseño web                                        | [Interaction Design Foundation: Web Design Basics](https://www.interaction-design.org/literature/topics/web-design)                     | 🟢 / 🟡 / 🔴 |

---

### 🔹 Git, GitHub y CI/CD

| Concepto                                                              | Referencia canónica                                                                                                                                                                 |    Estado    |
| :-------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------: |
| Qué es un sistema de control de versiones y por qué se usa Git        | [Git SCM – About](https://git-scm.com/about)                                                                                                                                        | 🟢 / 🟡 / 🔴 |
| Diferencia entre repositorio local y remoto (GitHub)                  | [GitHub Docs: About repositories](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories)                                                    | 🟢 / 🟡 / 🔴 |
| Crear un repositorio y clonarlo en local                              | [GitHub Docs: Clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)                                                  | 🟢 / 🟡 / 🔴 |
| Flujo básico: `git add`, `git commit`, `git push`                     | [Git SCM – Recording Changes](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)                                                                        | 🟢 / 🟡 / 🔴 |
| Crear y cambiar de ramas (`git branch`, `git checkout`, `git switch`) | [Git SCM – Branches](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)                                                                                           | 🟢 / 🟡 / 🔴 |
| Pull Requests y revisiones de código en GitHub                        | [GitHub Docs: About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) | 🟢 / 🟡 / 🔴 |
| Publicar un sitio en GitHub Pages                                     | [GitHub Docs: About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)                                                            | 🟢 / 🟡 / 🔴 |
| Qué es CI/CD (Integración y Entrega Continua)                         | [Atlassian CI/CD guide](https://www.atlassian.com/continuous-delivery/ci-vs-ci-vs-cd)                                                                                               | 🟢 / 🟡 / 🔴 |
| Configuración básica de un workflow en GitHub Actions                 | [GitHub Docs: About workflows](https://docs.github.com/en/actions/using-workflows/about-workflows)                                                                                  | 🟢 / 🟡 / 🔴 |

### 🧪 Actividad en clase

1. Completa este checklist en tu repo clonado `student-project-template`.
2. Prueba en práctica los ítems dudosos (HTML, CSS, JS, DevTools, Git).
3. Marca 🟢 / 🟡 / 🔴 en cada ítem.
4. Haz un commit con el archivo actualizado:

```bash
git add .
git commit -m "diagnostic: checklist fundamentos completado"
```