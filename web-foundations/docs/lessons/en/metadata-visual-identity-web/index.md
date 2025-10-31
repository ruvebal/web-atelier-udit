---
layout: lesson
title: 'Metadata and Visual Identity in Web Documentation'
title_alt: 'Metadatos e identidad visual en la documentación Web'
slug: metadata-visual-identity-web
date: 2025-09-10
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/metadata-visual-identity-web/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }
- TOC
{:toc}

<!-- prettier-ignore-end -->

---

## Objective:

> "In code, as in art, visibility is not always in what is seen, but in what the system interprets."

**Metadata, README, Favicon, License, .gitignore and Manifest: Documentation and Metadata in Web Repositories**

Understand the importance of documentation and metadata in a web project, learning to complete the `<head>` in your `html` files and to properly incorporate a `README.md` file, a `favicon`, a `LICENSE` and a `manifest.json` in a repository.

---

## What are metadata and why do they matter?

**Metadata** describes content without being a visible part of it.  
On the web, metadata is mainly defined in the `<head>` of each HTML page.

- They help **search engines** (SEO) classify the site.
- They improve **accessibility**, indicating language or authorship.
- They facilitate **institutional coherence** and integration with social networks (Open Graph, Twitter Cards).
- They reinforce the **digital identity** of a project.

### Basic metadata example

```html
<head>
	<meta charset="utf-8" />
	<title>My Website</title>
	<meta name="description" content="Brief description of the website." />
	<meta name="keywords" content="design, web, educational" />
	<meta name="author" content="Author name" />
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
</head>
```

**Explanation:**

- `<title>` appears in the browser tab and in search results.
- `<meta name="description">` generates the summary in search engines (≈150–160 characters).
- `<meta name="author">` defines authorship, useful in academic or collaborative contexts.
- `<link rel="icon">` adds the favicon, a visual symbol of your identity.

👉 _Expand with social network tags (Open Graph, Twitter Card):_

```html
<meta property="og:title" content="My website" />
<meta property="og:description" content="Brief description for sharing." />
<meta property="og:image" content="https://mywebsite.com/preview-image.jpg" />
<meta property="og:url" content="https://mywebsite.com" />
```

**Reference:** [MDN Web Docs — Meta tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

> 💭 **Critical questions (Atelier):**
>
> - What information do you decide to show and what to hide?
> - What identity do your metadata project: technical, institutional, artistic?
> - Who benefits from this data, you or the platforms?

---

## README.md

### What is a README.md?

A `README.md` is a file written in **Markdown** that acts as the main documentation of a project. It is usually placed in the root of the repository and provides essential information to users and contributors.

📌 **Basic structure of a README.md:**

1. **Project Description**: Brief introduction about what the project is and what it does.
2. **Installation Instructions**: Step-by-step guide to set up and run the project (prerequisites and dependencies).
3. **Usage**: Explanations and examples of project use, including commands or workflows.
4. **Contribution Guide**: Standards for contributing to the code, coding standards and pull request processes.
5. **License**: Information about usage rights, modification and distribution of the code.
6. **Contact**: Contact details of project maintainers.
7. **Additional Resources**: Links to relevant documentation, websites or related tutorials.

**Reference link:**

- Markdown Documentation: [https://commonmark.org/](https://commonmark.org/)

**Recommended tool for editing Markdown:**

- **Dillinger** (cloud editor, compatible with offline storage): [https://dillinger.io/](https://dillinger.io/)
- **Zettlr** Zettlr is Free and Open Source Software [https://www.zettlr.com/download](https://www.zettlr.com/download)

**Important:**

- Include in the _Readme_ the URL of your site published via _GitHub Pages_

---

## Favicon: Visual Identity of the Project

The **visual identity** of a website reflects the personality of the project: logo, colors, typography, favicon, visual coherence.  
Everything communicates, even the technical details of the HTML header.

### What is a favicon?

It is a small icon associated with a website. It is displayed in:

- The browser's address bar.
- Browser tabs.
- The bookmarks list.
- Specific applications that use custom icons.

**Where to integrate a favicon:**

1. In the `<head>` of the HTML file:
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon" />
   <meta name="theme-color" content="#222222" />
   ```
2. In the `manifest.json` file (for Progressive Web Apps - PWAs):
   ```json
   {
   	"icons": [
   		{
   			"src": "favicon-192.png",
   			"sizes": "192x192",
   			"type": "image/png"
   		}
   	]
   }
   ```

**Practical steps:**

1. Design a simple **favicon** (16×16 px or 32×32 px).  
   It can be a reduced logo or an abstract shape that represents your brand.
2. Create with a favicon generator tool a package containing `favicon.ico` or `favicon.png` and place them in `/assets/images/` or `/assets/icons/`.
3. Index them in your `<head>` and in your `manifest`
4. Define a main color with `theme-color` for mobile devices.
5. Review how it looks in tabs, favorites and previews.

**Reference:** [MDN — The head metadata in HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)

> 💭 **Critical questions (Atelier):**
>
> - What values does the color palette you've chosen communicate?
> - Does your favicon or logo dialogue with your identity as an author or designer?
> - What happens when branding is imposed by a platform or client?

**Official References:**

- HTML Specification: [https://html.spec.whatwg.org/multipage/links.html#rel-icon](https://html.spec.whatwg.org/multipage/links.html#rel-icon)

**Tools for generating favicons:**

- [https://realfavicongenerator.net/](https://realfavicongenerator.net/)
- [https://thenounproject.com/icons/](https://thenounproject.com/icons/)

---

## LICENSE: Defining the Terms of Use of the Code

### What is a LICENSE file?

It is a text file in the root of the project that specifies the legal terms for using the code.

📌

- **Attribution**: Credit must be given to the original author.
- **Rights and Permissions**: What can be done with the code (use, modify, redistribute, etc.).

**HTML specification on licenses:**
[https://html.spec.whatwg.org/multipage/links.html#link-type-license](https://html.spec.whatwg.org/multipage/links.html#link-type-license)

**Popular Open Source License Types:**

#### MIT License:

- A permissive license that allows reuse with **few restrictions**. You can **use, copy, modify, merge, publish and distribute** the software, as long as the original license is included in all copies or substantial portions of the software.
- **Use case**: Ideal for projects where **maximum freedom for users** is desired.

#### Apache 2.0 License:

- Similar to the MIT License, but includes an **explicit grant of patent rights** from contributors to users. It also establishes requirements for **modifications to be documented**.
- **Use case**: Suitable for projects that may involve **patent claims** or where you want to ensure that **contributions remain open**.

#### GNU General Public License (GPL):

- A **copyleft** license that requires that **all modified versions of the project** also be open source and licensed under the GPL. This ensures that **derivative works remain free and open**.
- **Use case**: Ideal for projects that seek to **keep code free and open for all users**.

#### BSD License:

- A permissive license **similar to the MIT License**, but with additional clauses about **advertising and recognition of the original author**.
- **Use case**: Commonly used in projects that seek to **maximize freedom** for users, **but requiring attribution**.

#### Creative Commons Licenses:

- Used mainly for **creative works instead of software**. They offer **different levels of permissions** on the use, modification and sharing of content.
- **Use case**: Excellent for documentation, **design resources** and other content **other than code**.

**License Generator:**

- [https://choosealicense.com/](https://choosealicense.com/)

### Ways to include the license on a website

In addition to the `LICENSE` file in the root of the repository, it is recommended to include references to the license in:

1. **The `<head>` of each HTML document:**
   ```html
   <link rel="license" href="LICENSE.txt" />
   ```
2. **Images and multimedia content** using `figure` and `figcaption`:
   ```html
   <figure>
   	<img src="image.jpg" alt="Image description" />
   	<figcaption>
   		Image licensed under
   		<a rel="license" href="LICENSE.txt">MIT License</a>
   		.
   	</figcaption>
   </figure>
   ```
3. **CSS and JavaScript files:** Add comments at the top of the file.

   ```css
   /*
   * Stylesheet file
   * License: MIT License
   * See LICENSE.txt for more details.
   */
   ```

   ```javascript
   //
   // Script file
   // License: MIT License
   // See LICENSE.txt for more details.
   ```

📌 **Practical exercise:**

1. **Create an `index.html` file and include the license reference in the `<head>`.**
2. **Add an image inside `figure` with `figcaption` referencing the license.**
3. **Create a `styles.css` file and include the comment with the license.**
4. **Create a `script.js` file and include the comment with the license.**
5. **Upload these files to a repository on GitHub and verify that the information is clear and accessible.**

---

## .gitignore File

📌 **What is a `.gitignore`?**
A file that excludes certain files from version control in Git.

📌 **Example of `.gitignore` for web projects:**

```
# System files (Example: MacOS)
.DS_Store

# Dependencies
node_modules/
package-lock.json

# Compiled files
/dist/
/build/

# Environment variables
.env
```

---

## Manifest.json: Configuration for Web Apps

### What is the manifest.json file?

Defines essential metadata for **Progressive Web Apps (PWAs)**, allowing configuration of how the app behaves when installed on devices.

📌 **Basic example of manifest.json:**

```json
{
	"name": "My App",
	"short_name": "App",
	"start_url": "/index.html",
	"display": "standalone",
	"background_color": "#ffffff",
	"theme_color": "#000000",
	"icons": [
		{
			"src": "icon.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	]
}
```

**Official References:**

- W3C Web App Manifest: [https://www.w3.org/TR/appmanifest/](https://www.w3.org/TR/appmanifest/)
- Mozilla MDN Docs: [https://developer.mozilla.org/en-US/docs/Web/Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- HTML Specification: [https://html.spec.whatwg.org/multipage/links.html#link-type-manifest](https://html.spec.whatwg.org/multipage/links.html#link-type-manifest)

---

## Additional Elements for Documentation

### `CONTRIBUTING.md`

Defines the rules for contributing to the project.
📌 **Example:**

```
1. Fork the repository.
2. Create a branch: `git checkout -b new-feature`
3. Follow the style guide in `.editorconfig`
4. Submit a Pull Request.
```

### `SECURITY.md`

Defines how to report security vulnerabilities.
📌 **Example:**

```
# Security Policy
If you find a vulnerability, report it to security@project.com.
```

### `docs/` Folder

Stores extended documentation.
**Example:**

```
docs/
├── architecture.md
├── endpoints.md
├── project_structure.md
```

### `robots.txt` and `sitemap.xml`

- **`robots.txt`**: Indicates which parts of the site can be indexed.
- **`sitemap.xml`**: Helps search engines index the site.

**Example of `robots.txt`:**

```
User-agent: *
Disallow: /admin/
Allow: /
```

**Example of `sitemap.xml`:**

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-01</lastmod>
  </url>
</urlset>
```

---

## Conclusion and Practical Application

1. **Review your current `<head>`:**  
   Check if your site includes `<meta charset>`, `<title>`, `<meta name="description">`, `<meta name="author">`, and `<link rel="icon">`.

2. **Add or improve essential metadata:**  
   Include at least:

   ```html
   <meta charset="utf-8" />
   <title>Site title</title>
   <meta name="description" content="Short and clear description." />
   <meta name="author" content="Your name" />
   ```

3. **Create a favicon:**  
   Use an online generator or graphic software.  
   Example: [Favicon.io](https://favicon.io).

4. **Test Open Graph (for sharing on networks):**  
   Use [Open Graph Preview](https://www.opengraph.xyz/) to check how your site would look when shared on social networks.

5. **Document your digital identity:**  
   Add a section in your README or documentation explaining your visual choices (colors, logo, metadata).

> 💭 **Critical questions (Atelier):**
>
> - How does your visual choice relate to design ethics and representation?
> - What are the implications of sharing your identity on a public web?

---

## Canonical References

- [MDN Web Docs — Meta tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
- [MDN — Favicons and manifest.json](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
- [Google Developers — Metadata & SEO](https://developers.google.com/search/docs/appearance/structured-data/intro)
- [W3C — HTML Living Standard](https://html.spec.whatwg.org/)
- [Open Graph Protocol](https://ogp.me/)

---

> **Atelier Methodology — Learning from critical practice**  
> In the Atelier, every line of code is an act of design.  
> Reflect on how your metadata and digital aesthetics become an identity footprint.  
> The goal is not just to be visible, but **to be aware** of how and why what is shown is shown.

**Why is it important to properly document and configure these files? How does it impact the accessibility and usability of the project?**

- **Improves accessibility**: A good README and well-defined metadata facilitate navigation and understanding of the project.
- **Facilitates collaboration**: Documenting helps more people understand and improve the code.
- **Ensures compatibility**: A well-configured manifest allows the app to work properly on multiple devices and browsers.
- **Protects copyright**: A clear license avoids legal misunderstandings and defines the permitted use of the code.