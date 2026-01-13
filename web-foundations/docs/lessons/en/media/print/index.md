---
layout: lesson
title: 'The Tao of Web-to-Print'
title_alt: 'El Tao de Web a Impresión'
slug: the-tao-of-web-to-print
date: 2025-01-09
author: 'Rubén Vega Balbás, PhD'
lang: en
permalink: /lessons/en/media/print/the-tao-of-web-to-print/
---

<!-- prettier-ignore-start -->

## 📋 Table of Contents
{: .no_toc }

- TOC
{:toc}

<!-- prettier-ignore-end -->

---

# The Tao of Web-to-Print

> In the web ecosystem, transforming a web page into a print-friendly format (like a PDF) bridges front-end development and digital publishing/archiving. Creating a print-ready version of your web content is a bit like forcing a dynamic, responsive webpage into a static sheet of paper—a challenge that mixes technical craft with philosophical humor. As the wise web sage might observe: "The finest web pages must one day embrace paper—or at least, a PDF." 😇

---

## Introduction

**Scope & Knowledge Area:** This topic falls under web design & development fundamentals—mastering CSS print style sheets and understanding output media. We'll critically discuss two main output approaches (PDF vs HTML archive) and the workflow to generate them, all while keeping a self-ironic yet wise tone about the ironies of printing modern web content.

The need for web-to-print often arises when academic or institutional archives demand a tangible artifact of online materials—because sometimes a hyperlink just isn't "tangible" enough. In this lesson, we'll outline a practice-oriented approach to styling web content for print, ensuring best practices, accessibility, and readability, and discuss how to "artifact" your content (PDF or zipped HTML) for archiving.

---

## Why Print or Archive Web Lessons?

Academic institutions often require instructors to submit course materials (lessons, slides, assignments) in a stable format for record-keeping. Relying solely on live webpages or hyperlinks isn't ideal for long-term archives—links rot, content changes, or access can be restricted. Thus, creating an **"artifact"**—a preserved copy of the material—is necessary.

There are two primary artifact formats to consider:

### 1. PDF Files

A PDF is like the papyrus scroll of the digital age—fixed layout, widely compatible, and ideal for printing on paper. It's the de facto standard for document exchange (universities love PDFs as proofs of content). PDFs capture content exactly as it was styled on screen (if done right), ensuring the lesson looks the same everywhere.

**Characteristics:**

- ✅ Universally readable format
- ✅ Self-contained single file
- ✅ Preserves layout exactly
- ✅ Can be annotated by students
- ✅ Required/accepted by most institutional archives
- ❌ Loses interactivity
- ❌ Can be large in file size with many images
- ❌ Requires effort to get formatting perfect (page breaks, etc.)
- ❌ Updates require regenerating and redistributing

### 2. Offline HTML (Zip Archive)

This involves saving the complete website (HTML, CSS, images, etc.) in a package (usually a `.zip` file) so it can be viewed offline. Think of it as handing someone the entire mini-website.

**Characteristics:**

- ✅ Exact fidelity to the live site
- ✅ Interactive elements preserved (to an extent)
- ✅ Text is selectable/searchable
- ✅ Efficient compression for text
- ❌ Less user-friendly for non-technical users
- ❌ External resources (fonts, embeds) may not work offline
- ❌ Some archive systems prefer single files

> 📌 **Fun irony:** After building a modern Jekyll-based lesson website with CI deployment and all, we're back to printing to PDF or zipping HTML like it's 1999. Embrace the paradox with a smile—this is the Tao of web wisdom: _the medium is the message, and sometimes the medium must change to preserve the message._

As one community discussion noted: _"PDF comes closest as a widely supported format—but ZIP's a good choice for its superior editability… maybe use both solutions!"_ [[1]](#references)

---

## Option 1: Creating a PDF of Your Web Lesson

**Approach:** Use CSS print styles to format the content, then generate a PDF. You can simply use the browser's "Print to PDF" function, but for multiple pages or automation, you might script it.

### Key Principles

#### 1. Print Stylesheet

Create a separate CSS (or section in your CSS) for print. You can include a print-specific stylesheet in your HTML head:

```html
<link rel="stylesheet" media="print" href="print.css" />
```

Or use `@media print { ... }` in your main CSS to override styles when printing [[2]](#references). This lets you tailor the appearance specifically for paper/PDF without affecting screen display.

#### 2. Layout Adjustments

Remove or hide non-essential elements. Navigation menus, sidebars, or interactive widgets are usually pointless on paper.

```css
@media print {
	#nav,
	.sidebar,
	.interactive-map {
		display: none !important;
	}
}
```

It's perfectly fine to simplify for print—we're not trying to print every pixel, but rather present a clean, readable version [[4]](#references). Also, ensure text that was white-on-dark (for dark mode) is forced to black on a white background for print [[6]](#references).

#### 3. Page Size & Margins

Unlike fluid web layouts, a printed page has fixed dimensions. Define page settings with the `@page` rule in CSS—one of the rare times CSS uses physical units [[7]](#references):

```css
@page {
	size: A4;
	margin: 2cm;
}
```

This ensures content isn't chopped off and provides consistent margins. For educational materials, consider slightly larger margins to allow students to jot notes on the printout [[8]](#references).

#### 4. Avoiding Awkward Page Breaks

Nothing is worse than a section header orphaned at the bottom of a page, or an image cut in half. Use CSS break rules:

```css
@media print {
	h1,
	h2,
	h3 {
		page-break-after: avoid;
	}

	table,
	figure,
	ul,
	ol {
		page-break-inside: avoid;
	}

	.chapter {
		page-break-before: always;
	}
}
```

This keeps headings with their content, tables/images intact, and starts major sections fresh [[9]](#references)[[10]](#references).

#### 5. Print-Friendly Enhancements

**Hyperlinks:** On paper, you can't click them. A common trick is to append URLs after link text:

```css
@media print {
	a[href^='http']:after {
		content: ' (' attr(href) ')';
		font-size: 0.8em;
		color: #666;
	}
}
```

This way, a link like "see more on MDN" becomes "see more on MDN (https://developer.mozilla.org/...)" in the print copy [[11]](#references).

**Images:** Consider using higher resolution images or SVG for print—on paper, a low-res image that looked okay on screen might appear blurry. Ideally, use vector graphics or 300 DPI images [[12]](#references).

**Interactive Media:** Provide a fallback (e.g., a note like "[Video: Lecture 1]" or expand all accordion content before print).

#### 6. Accessibility in PDF

If the PDF is destined for others to use (especially students with disabilities), ensure it's accessible:

- Use semantic HTML—headings, lists, alt text carry over
- Some print-to-PDF tools preserve structure as PDF tags
- Use a legible font size (typically ~12pt for body text)
- Consider a serif font for long text on paper
- Ensure high color contrast

### Generating the PDF: Tools & Workflow

#### Manual in Browser

Easiest for a quick result—open your page in Chrome/Firefox, press "Print," choose "Save as PDF." Modern browsers will apply your print CSS automatically.

#### Automated via Script

For a more automated approach, use a headless browser or conversion tool:

**Puppeteer (Node.js):**

```javascript
const puppeteer = require('puppeteer');

async function generatePDF(url, outputPath) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: 'networkidle0' });
	await page.pdf({
		path: outputPath,
		format: 'A4',
		printBackground: true,
		margin: { top: '2cm', right: '2cm', bottom: '2cm', left: '2cm' },
	});
	await browser.close();
}
```

**wkhtmltopdf (Command-line):**

```bash
wkhtmltopdf https://example.github.io/lessonpage/ lesson.pdf
```

This grabs the live page and prints it, respecting CSS [[13]](#references).

#### Pandoc

If your source is Markdown (as in a Jekyll site), Pandoc can convert Markdown or HTML to PDF directly:

```bash
pandoc lesson.md -o lesson.pdf --pdf-engine=wkhtmltopdf --css=print.css
```

#### Specialized Tools (Advanced)

- **PrinceXML:** Very powerful with CSS Paged Media, supports page numbers, running headers (commercial, but with free trial)
- **WeasyPrint:** Python-based, open source, understands CSS Paged Media

> 💡 **Pro Tip:** Keep a version number or date on the PDF (in a footer perhaps)—so if you update the lesson and re-upload, it's clear which version is which.

---

## Option 2: Creating an Offline HTML Archive (ZIP)

**Approach:** Package the actual web files for offline use. This typically means providing a ZIP file containing the static HTML, CSS, JS, and image files exactly as your static site generator produced them.

### Key Considerations

#### 1. Parallel "Print" Version Site

You might generate a simplified version specifically for offline use—all pages concatenated or a single-page version. However, often simply zipping the static files is cleaner.

**Link Handling:** If your site navigation uses absolute paths (e.g., `/lessons/en/web-analysis/`), an offline copy might break those links. Make internal links relative, or use a tool like **SingleFile**, **SiteSucker**, or **HTTrack** to save pages with dependencies.

#### 2. Automation via CI

Add a GitHub Action to zip the site after each build:

```yaml
- name: Create Archive
  run: |
   cd _site
   zip -r ../lesson-archive.zip .

- name: Upload Artifact
  uses: actions/upload-artifact@v4
  with:
   name: lesson-archive
   path: lesson-archive.zip
```

This creates an exact snapshot at each build—satisfying the "tangible proof" requirement.

### Pros & Cons Summary

| Aspect                 | PDF                     | ZIP Archive           |
| ---------------------- | ----------------------- | --------------------- |
| **Universal Access**   | ✅ Opens anywhere       | ⚠️ Requires unzipping |
| **Interactivity**      | ❌ Static               | ✅ Preserved          |
| **Fidelity**           | ⚠️ Conversion artifacts | ✅ Exact copy         |
| **File Management**    | ✅ Single file          | ⚠️ Multiple files     |
| **External Resources** | ⚠️ Embedded at creation | ❌ May not load       |

### Hybrid Approach

**Why not both?** Providing an archival PDF _and_ a zipped site covers all bases. Storage is cheap, after all [[1]](#references).

---

## Automation Workflows 🤖

Since you likely have a Jekyll + GitHub Pages setup, let's talk workflow for generating artifacts efficiently:

### 1. Jekyll Build Process

GitHub Pages (managed Jekyll) might not let you run custom PDF generation. A workaround: build via CI (GitHub Actions) instead:

```yaml
name: Build and Archive

on:
 push:
  branches: [main]

jobs:
 build:
  runs-on: ubuntu-latest
  steps:
   - uses: actions/checkout@v4

   - name: Setup Ruby
     uses: ruby/setup-ruby@v1
     with:
      ruby-version: '3.2'
      bundler-cache: true

   - name: Build Jekyll
     run: bundle exec jekyll build

   - name: Generate PDF
     uses: docker://pandoc/latex:latest
     with:
      args: >-
       --from=html
       --to=pdf
       --output=lesson.pdf
       _site/index.html

   - name: Create ZIP
     run: zip -r lesson-archive.zip _site/

   - name: Upload Artifacts
     uses: actions/upload-artifact@v4
     with:
      name: lesson-artifacts
      path: |
       lesson.pdf
       lesson-archive.zip
```

### 2. Maintaining Single Source of Truth

Maintain one source (Markdown content) with multiple output formats. Don't fork content manually—rely on automated transformations.

### 3. Testing the Outputs

Part of workflow wisdom: verify artifact quality. A script can:

- Check PDF isn't blank or oddly formatted
- Verify expected files exist in the ZIP
- Run an HTML proofer for broken links

### 4. Keeping it Zen

As you automate, remember the Tao: **don't fight the medium**. If something is very hard to print (e.g., a complex interactive diagram), accept that it won't be fully preserved and provide a graceful alternative:

```markdown
> _Interactive diagram omitted in print. See online version._
```

Not every web feature translates to print, and that's okay. Wisdom is knowing what to let go of. 😉

---

## Best Practices Summary (Web-to-Print Wisdom)

### 1. Treat Print as a First-Class Citizen

Just as you design for mobile and desktop, design for print. Considering print styling as part of responsive design ensures your audience isn't left with a broken hardcopy [[17]](#references)[[18]](#references).

### 2. Use Print Style Sheets

Separate concerns by tailoring CSS for print media. Hide navigational elements, enforce readable colors, and use CSS Paged Media rules (`@page`) [[5]](#references)[[6]](#references).

### 3. Optimize Content Flow

Add CSS rules to prevent bad page breaks—avoid orphaned headings, keep images and lists intact [[9]](#references)[[10]](#references).

### 4. Preserve Necessary Info

Make URLs visible for reference, include citations directly in text (no hover tooltips), and add print-only notes for interactive content [[11]](#references).

### 5. Mind Accessibility and Readability

Choose fonts and contrast that work on paper. Use sufficiently large font sizes (no one should need a magnifying glass). Maintain document structure for PDF accessibility features.

### 6. Automate Artifact Generation

Set up workflows to create PDFs/ZIPs automatically. This reduces human error and keeps archives up-to-date.

### 7. Test the Outputs

Test your PDFs (does everything display? Are pages formatted well?) and test your offline HTML (do links work locally? Are all assets loading?).

### 8. Philosophical Posture—The Tao of Output

Stay flexible and pragmatic. Recognize the strengths of each medium—the web page is dynamic and interactive, the PDF is static but reliable. By understanding this yin-yang, you produce better content.

> _Be like water—flow into whatever container (medium) is needed. Today it's a PDF, tomorrow it might be an e-book._

---

## The Tao of Output Media (A Critical Reflection) 🌀

Let's step back for a self-aware reflection (with a pinch of irony). We spend our days crafting responsive, animated, HTML5 wonders that dance across screens… only to freeze-dry that experience onto paper.

It's like a Zen koan for web designers: _"What is the sound of one hand clicking a print button?"_ 🤔

### Medium Shapes Message

A webpage and a printed page are siblings, not twins. The web can do things print cannot (and vice versa). The tao is to let each medium play to its strengths. Your lesson can live as an interactive web page _and_ as a nicely formatted PDF—each format conveying the core knowledge in its own style.

**Mastery is when the content remains clear and effective no matter the medium.**

### Simplicity is Key

Printed output teaches us the value of simplicity. Fancy CSS tricks or JavaScript-dependent content might fall flat on paper. By planning for print, you naturally simplify and solidify your content structure—often improving the web version too.

### A Bit of Humor Goes a Long Way

Acknowledge the absurdity: _"We'll use cutting-edge CSS3… to make PDFs."_ 😂 By confronting the irony head-on, we turn it into a learning opportunity about the evolution of media.

### Digital Wisdom

Ultimately, digital wisdom means knowing when and how to preserve information. A website is ephemeral—servers go down, frameworks become obsolete—but a PDF can sit on a shelf for decades. Neither is superior; they serve different goals.

> _The wise web architect produces both the living website and the snapshot artifact, catering to both the present and the future._

---

## The Final Koan 🌅

_A student asked the master: "How do I know when my print styles are ready?"_

_The master replied: "Open your browser. Press Ctrl+P. If the preview shows your navigation menu, you have work to do. If it shows clean, readable content, you are learning. If you see a well-formatted PDF that could serve anyone—sighted or blind, connected or offline—you have understood._

_But if your content serves its purpose regardless of the medium, then you have achieved the Tao of Web-to-Print."_

---

_May your print stylesheets be clean, your page breaks be wise, and your artifacts serve generations to come._ ✨

---

## References

1. [What's the best "file format" for saving complete web pages?](https://stackoverflow.com/questions/260058/whats-the-best-file-format-for-saving-complete-web-pages-images-etc-in-a) - Stack Overflow
2. [Printing - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing) - Print media queries
3. [Using @media print rules](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing) - MDN
4. [Tips and Tricks for Print Style Sheets](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
5. [Hide navigation and background images](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
6. [Print-friendly colors](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
7. [Writing print style sheets with @page](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
8. [Consider increasing print margins for notes](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
9. [Avoiding orphaned headings](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
10. [Preventing split content across pages](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
11. [Making URLs visible in print](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
12. [Using high-resolution images for print](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing) - MDN
13. [Converting Jekyll pages to PDF](https://stackoverflow.com/questions/52396579/can-i-convert-github-pages-with-jekyll-to-pdf) - Stack Overflow
14. [Pandoc for PDF generation](https://stackoverflow.com/questions/52396579/can-i-convert-github-pages-with-jekyll-to-pdf) - Stack Overflow
15. [PDF generation with PrinceXML](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_generating_pdfs.html) - Jekyll Theme Documentation
16. [Automated PDF generation in CI](https://idratherbewriting.com/documentation-theme-jekyll/mydoc_generating_pdfs.html) - Jekyll Theme Documentation
17. [Print as part of responsive design](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine
18. [Web developers and print optimization](https://www.smashingmagazine.com/2013/03/tips-and-tricks-for-print-style-sheets/) - Smashing Magazine

---

**Source:** _The Tao of the Developer_ - Chapter on Web-to-Print Best Practices
**Ancestral Text:** [The Tao of Programming](https://www.mit.edu/~xela/tao.html) by Geoffrey James
**Transcribed by:** The Digital Scribes
**For:** Students seeking the path of web-to-print mastery
