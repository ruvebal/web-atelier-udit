# Web-to-Print Implementation Plan

> **Status:** Draft
> **Created:** 2025-01-09
> **Author:** Rubén Vega Balbás
> **Related Lesson:** `/lessons/en/media/print/the-tao-of-web-to-print/`

---

## Executive Summary

This document outlines the implementation strategy for generating printable and archived versions of the Web Atelier lessons. Based on the guidance from "The Tao of Web-to-Print" lesson, this plan provides actionable steps, tooling choices, and CI/CD integration for automated artifact generation.

---

## Table of Contents

1. [Objectives](#objectives)
2. [Architecture Overview](#architecture-overview)
3. [Phase 1: CSS Print Stylesheet Setup](#phase-1-css-print-stylesheet-setup)
4. [Phase 2: PDF Generation Tooling](#phase-2-pdf-generation-tooling)
5. [Phase 3: ZIP Archive Generation](#phase-3-zip-archive-generation)
6. [Phase 4: CI/CD Integration](#phase-4-cicd-integration)
7. [Phase 5: Testing & Validation](#phase-5-testing--validation)
8. [Semantic Transformation Prompt](#semantic-transformation-prompt)
9. [Implementation Checklist](#implementation-checklist)
10. [Timeline](#timeline)

---

## Objectives

### Primary Goals

1. **Archival Compliance:** Produce stable artifacts (PDF/ZIP) suitable for institutional record-keeping
2. **Accessibility:** Ensure all outputs are accessible to users with disabilities
3. **Automation:** Integrate artifact generation into CI/CD pipeline for zero-maintenance updates
4. **Quality:** Maintain professional formatting with proper page breaks, typography, and layout

### Success Criteria

- [ ] Print stylesheet renders clean, readable output in browser print preview
- [ ] PDF generation produces valid, accessible documents
- [ ] ZIP archives contain all necessary assets for offline viewing
- [ ] CI/CD pipeline runs automatically on each deploy
- [ ] Artifacts are versioned and stored appropriately

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Source (Markdown)                          │
│                           ↓                                     │
│                    Jekyll Build                                 │
│                           ↓                                     │
│              ┌───────────┴───────────┐                          │
│              ↓                       ↓                          │
│     Static HTML/CSS              Print CSS                      │
│              ↓                       ↓                          │
│    ┌────────┴────────┐     ┌────────┴────────┐                  │
│    ↓                 ↓     ↓                 ↓                  │
│  GitHub           ZIP    Puppeteer/      Single-page           │
│  Pages           Archive  WeasyPrint       PDF                  │
│                                                                 │
│              OUTPUTS:                                           │
│    • Live Website (GitHub Pages)                                │
│    • lesson-archive-{version}.zip                               │
│    • lesson-{slug}-{version}.pdf                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: CSS Print Stylesheet Setup

### 1.1 Create Print Stylesheet

**File:** `web-foundations/docs/assets/css/print.css`

```css
/* ==========================================================================
   WEB ATELIER - Print Stylesheet
   Purpose: Optimize lesson content for PDF/print output
   ========================================================================== */

@media print {
	/* --------------------------------------------------------------------------
     1. Page Setup
     -------------------------------------------------------------------------- */
	@page {
		size: A4;
		margin: 2.5cm 2cm 2.5cm 2cm;

		@top-center {
			content: 'Web Atelier - Lessons';
			font-size: 9pt;
			color: #666;
		}

		@bottom-center {
			content: counter(page) ' / ' counter(pages);
			font-size: 9pt;
			color: #666;
		}
	}

	@page :first {
		@top-center {
			content: none;
		}
	}

	/* --------------------------------------------------------------------------
     2. Hide Non-Essential Elements
     -------------------------------------------------------------------------- */
	nav,
	.sidebar,
	.nav-toggle,
	.search-container,
	.breadcrumb,
	.footer-nav,
	.edit-on-github,
	.interactive-demo,
	video,
	iframe,
	.no-print {
		display: none !important;
	}

	/* --------------------------------------------------------------------------
     3. Typography & Colors
     -------------------------------------------------------------------------- */
	body {
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: 11pt;
		line-height: 1.5;
		color: #000 !important;
		background: #fff !important;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: 'Helvetica Neue', Arial, sans-serif;
		color: #000 !important;
		page-break-after: avoid;
		break-after: avoid;
	}

	h1 {
		font-size: 20pt;
		margin-top: 0;
	}
	h2 {
		font-size: 16pt;
		margin-top: 1.5em;
	}
	h3 {
		font-size: 13pt;
		margin-top: 1.2em;
	}

	/* --------------------------------------------------------------------------
     4. Page Break Control
     -------------------------------------------------------------------------- */
	h1,
	h2,
	h3,
	h4 {
		page-break-after: avoid;
		break-after: avoid;
	}

	p,
	li {
		orphans: 3;
		widows: 3;
	}

	pre,
	code,
	table,
	figure,
	img,
	ul,
	ol {
		page-break-inside: avoid;
		break-inside: avoid;
	}

	.chapter,
	.lesson-section {
		page-break-before: always;
		break-before: page;
	}

	/* --------------------------------------------------------------------------
     5. Links - Show URLs
     -------------------------------------------------------------------------- */
	a[href^='http']:after,
	a[href^='https']:after {
		content: ' (' attr(href) ')';
		font-size: 0.8em;
		color: #666;
		word-break: break-all;
	}

	/* Don't show URL for anchor links or internal links */
	a[href^='#']:after,
	a[href^='/']:after {
		content: none;
	}

	/* --------------------------------------------------------------------------
     6. Code Blocks
     -------------------------------------------------------------------------- */
	pre {
		background: #f5f5f5 !important;
		border: 1px solid #ddd;
		padding: 1em;
		font-size: 9pt;
		overflow-x: visible;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	code {
		font-family: 'Consolas', 'Monaco', monospace;
		font-size: 0.9em;
		background: #f5f5f5;
		padding: 0.1em 0.3em;
	}

	/* --------------------------------------------------------------------------
     7. Tables
     -------------------------------------------------------------------------- */
	table {
		border-collapse: collapse;
		width: 100%;
		margin: 1em 0;
	}

	th,
	td {
		border: 1px solid #333;
		padding: 0.5em;
		text-align: left;
	}

	th {
		background: #f0f0f0 !important;
		font-weight: bold;
	}

	/* --------------------------------------------------------------------------
     8. Images
     -------------------------------------------------------------------------- */
	img {
		max-width: 100% !important;
		height: auto !important;
	}

	figure {
		margin: 1em 0;
		text-align: center;
	}

	figcaption {
		font-size: 0.9em;
		font-style: italic;
		color: #666;
	}

	/* --------------------------------------------------------------------------
     9. Blockquotes & Callouts
     -------------------------------------------------------------------------- */
	blockquote {
		border-left: 3px solid #333;
		margin: 1em 0;
		padding-left: 1em;
		font-style: italic;
		color: #333;
	}

	.callout,
	.note,
	.warning,
	.tip {
		border: 1px solid #333;
		padding: 1em;
		margin: 1em 0;
		background: #f9f9f9 !important;
	}

	/* --------------------------------------------------------------------------
     10. Print-Only Elements
     -------------------------------------------------------------------------- */
	.print-only {
		display: block !important;
	}

	.print-footer {
		position: fixed;
		bottom: 0;
		font-size: 8pt;
		color: #999;
	}
}

/* Hide print-only elements on screen */
@media screen {
	.print-only {
		display: none;
	}
}
```

### 1.2 Include Print Stylesheet

**Modify:** `web-foundations/docs/_includes/head.html`

```html
<!-- Print Stylesheet -->
<link rel="stylesheet" href="{{ '/assets/css/print.css' | relative_url }}" media="print" />
```

### 1.3 Add Print Metadata to Lessons

**Template modification:** Add versioning and date to lesson frontmatter

```yaml
---
layout: lesson
title: 'Lesson Title'
version: '1.0.0'
print_date: 2025-01-09
---
```

---

## Phase 2: PDF Generation Tooling

### 2.1 Tool Comparison & Selection

| Tool            | Pros                              | Cons                                 | Recommendation |
| --------------- | --------------------------------- | ------------------------------------ | -------------- |
| **Puppeteer**   | Full Chrome rendering, JS support | Node.js dependency, larger footprint | ✅ Primary     |
| **WeasyPrint**  | Python, CSS Paged Media support   | Limited JS, some CSS gaps            | ✅ Alternative |
| **wkhtmltopdf** | Simple CLI, fast                  | Outdated WebKit, deprecated          | ⚠️ Legacy      |
| **PrinceXML**   | Best CSS support, page numbers    | Commercial license                   | ❌ Cost        |

**Selected Tooling:**

- **Primary:** Puppeteer (for full fidelity)
- **Fallback:** WeasyPrint (for CI simplicity)

### 2.2 PDF Generation Script

**File:** `scripts/generate-pdf.js`

```javascript
#!/usr/bin/env node
/**
 * PDF Generation Script for Web Atelier Lessons
 *
 * Usage: node scripts/generate-pdf.js [url] [output]
 * Example: node scripts/generate-pdf.js http://localhost:4000/lessons/en/media/print/ lesson.pdf
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DEFAULT_OPTIONS = {
	format: 'A4',
	printBackground: true,
	margin: {
		top: '2.5cm',
		right: '2cm',
		bottom: '2.5cm',
		left: '2cm',
	},
	displayHeaderFooter: true,
	headerTemplate: `
    <div style="font-size: 9px; color: #666; width: 100%; text-align: center; padding-top: 5mm;">
      Web Atelier - Lessons
    </div>
  `,
	footerTemplate: `
    <div style="font-size: 9px; color: #666; width: 100%; text-align: center; padding-bottom: 5mm;">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>
  `,
};

async function generatePDF(url, outputPath, options = {}) {
	const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

	console.log(`📄 Generating PDF from: ${url}`);
	console.log(`📁 Output: ${outputPath}`);

	const browser = await puppeteer.launch({
		headless: 'new',
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});

	try {
		const page = await browser.newPage();

		// Wait for full load including lazy-loaded content
		await page.goto(url, {
			waitUntil: ['networkidle0', 'domcontentloaded'],
			timeout: 60000,
		});

		// Expand any collapsed sections for print
		await page.evaluate(() => {
			document.querySelectorAll('details').forEach((el) => (el.open = true));
		});

		// Add print-specific class to body
		await page.evaluate(() => {
			document.body.classList.add('printing');
		});

		// Generate PDF
		await page.pdf({
			path: outputPath,
			...mergedOptions,
		});

		console.log(`✅ PDF generated successfully: ${outputPath}`);

		// Verify file was created
		const stats = fs.statSync(outputPath);
		console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);

		return outputPath;
	} finally {
		await browser.close();
	}
}

// CLI Interface
if (require.main === module) {
	const args = process.argv.slice(2);

	if (args.length < 2) {
		console.error('Usage: node generate-pdf.js <url> <output.pdf>');
		process.exit(1);
	}

	const [url, output] = args;

	generatePDF(url, output)
		.then(() => process.exit(0))
		.catch((err) => {
			console.error('❌ PDF generation failed:', err.message);
			process.exit(1);
		});
}

module.exports = { generatePDF };
```

### 2.3 Batch PDF Generation

**File:** `scripts/generate-all-pdfs.sh`

```bash
#!/usr/bin/env bash
# Generate PDFs for all lessons
# Usage: ./scripts/generate-all-pdfs.sh [base_url]

set -euo pipefail

BASE_URL="${1:-http://localhost:4000}"
OUTPUT_DIR="./artifacts/pdfs"
VERSION=$(date +%Y%m%d)

mkdir -p "$OUTPUT_DIR"

# List of lesson URLs to convert
LESSONS=(
  "/lessons/en/media/print/the-tao-of-web-to-print/"
  "/lessons/en/media/images/the-tao-of-web-images/"
  "/lessons/en/media/video/the-tao-of-moving-images/"
  # Add more lessons as needed
)

echo "📚 Generating PDFs for ${#LESSONS[@]} lessons..."

for lesson in "${LESSONS[@]}"; do
  slug=$(echo "$lesson" | sed 's/.*\///' | sed 's/-$//; s/^-//')
  output_file="${OUTPUT_DIR}/${slug}-${VERSION}.pdf"

  echo "→ Processing: $lesson"
  node scripts/generate-pdf.js "${BASE_URL}${lesson}" "$output_file"
done

echo "✅ All PDFs generated in: $OUTPUT_DIR"
ls -la "$OUTPUT_DIR"
```

---

## Phase 3: ZIP Archive Generation

### 3.1 Archive Script

**File:** `scripts/create-archive.sh`

```bash
#!/usr/bin/env bash
# Create offline HTML archive of the Jekyll site
# Usage: ./scripts/create-archive.sh

set -euo pipefail

SITE_DIR="${1:-./_site}"
OUTPUT_DIR="./artifacts"
VERSION=$(date +%Y%m%d)
ARCHIVE_NAME="web-atelier-lessons-${VERSION}.zip"

mkdir -p "$OUTPUT_DIR"

echo "📦 Creating archive from: $SITE_DIR"

# Verify site directory exists
if [[ ! -d "$SITE_DIR" ]]; then
  echo "❌ Error: Site directory not found: $SITE_DIR"
  echo "   Run 'bundle exec jekyll build' first."
  exit 1
fi

# Create archive
cd "$SITE_DIR"
zip -r "../$OUTPUT_DIR/$ARCHIVE_NAME" . \
  -x "*.git*" \
  -x "*.DS_Store" \
  -x "*.map"

cd -

echo "✅ Archive created: $OUTPUT_DIR/$ARCHIVE_NAME"
ls -lh "$OUTPUT_DIR/$ARCHIVE_NAME"

# Generate checksum for integrity verification
cd "$OUTPUT_DIR"
sha256sum "$ARCHIVE_NAME" > "${ARCHIVE_NAME}.sha256"
echo "🔐 Checksum: $(cat ${ARCHIVE_NAME}.sha256)"
```

### 3.2 Offline Compatibility Checks

**File:** `scripts/validate-archive.sh`

```bash
#!/usr/bin/env bash
# Validate offline archive integrity
# Usage: ./scripts/validate-archive.sh <archive.zip>

set -euo pipefail

ARCHIVE="${1:-}"
TEMP_DIR=$(mktemp -d)

if [[ -z "$ARCHIVE" ]]; then
  echo "Usage: ./validate-archive.sh <archive.zip>"
  exit 1
fi

echo "🔍 Validating archive: $ARCHIVE"

# Extract to temp directory
unzip -q "$ARCHIVE" -d "$TEMP_DIR"

# Check for required files
REQUIRED_FILES=(
  "index.html"
  "assets/css/style.css"
)

MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$TEMP_DIR/$file" ]]; then
    echo "❌ Missing: $file"
    MISSING=$((MISSING + 1))
  fi
done

# Check for broken internal links (basic)
echo "🔗 Checking internal links..."
HTML_FILES=$(find "$TEMP_DIR" -name "*.html" | head -20)
for html in $HTML_FILES; do
  # Extract href values and check if files exist
  hrefs=$(grep -oP 'href="[^"]*"' "$html" 2>/dev/null | grep -v "http" | grep -v "#" | sed 's/href="//; s/"$//' || true)
  for href in $hrefs; do
    target="$TEMP_DIR/$(dirname "$html" | sed "s|$TEMP_DIR||")/$href"
    target=$(realpath --relative-to="$TEMP_DIR" "$target" 2>/dev/null || echo "$href")
    if [[ ! -f "$TEMP_DIR/$target" && ! -d "$TEMP_DIR/$target" ]]; then
      echo "⚠️  Possible broken link in $(basename "$html"): $href"
    fi
  done
done

# Cleanup
rm -rf "$TEMP_DIR"

if [[ $MISSING -eq 0 ]]; then
  echo "✅ Archive validation passed"
  exit 0
else
  echo "❌ Archive validation failed: $MISSING required files missing"
  exit 1
fi
```

---

## Phase 4: CI/CD Integration

### 4.1 GitHub Actions Workflow

**File:** `.github/workflows/build-artifacts.yml`

```yaml
name: Build Lesson Artifacts

on:
 push:
  branches: [main]
  paths:
   - 'web-foundations/docs/**'
 workflow_dispatch:
  inputs:
   generate_pdf:
    description: 'Generate PDF artifacts'
    required: false
    default: 'true'
    type: boolean
   generate_zip:
    description: 'Generate ZIP archive'
    required: false
    default: 'true'
    type: boolean

jobs:
 build:
  runs-on: ubuntu-latest

  steps:
   - name: Checkout repository
     uses: actions/checkout@v4

   - name: Setup Ruby
     uses: ruby/setup-ruby@v1
     with:
      ruby-version: '3.2'
      bundler-cache: true
      working-directory: web-foundations/docs

   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
      node-version: '20'
      cache: 'npm'

   - name: Install Node dependencies
     run: npm ci

   - name: Build Jekyll site
     working-directory: web-foundations/docs
     run: bundle exec jekyll build

   - name: Generate PDF artifacts
     if: ${{ github.event.inputs.generate_pdf != 'false' }}
     run: |
      # Start local server in background
      cd web-foundations/docs/_site && python3 -m http.server 8080 &
      sleep 3

      # Generate PDFs
      ./scripts/generate-all-pdfs.sh http://localhost:8080

   - name: Create ZIP archive
     if: ${{ github.event.inputs.generate_zip != 'false' }}
     run: ./scripts/create-archive.sh web-foundations/docs/_site

   - name: Upload PDF artifacts
     if: ${{ github.event.inputs.generate_pdf != 'false' }}
     uses: actions/upload-artifact@v4
     with:
      name: lesson-pdfs-${{ github.run_number }}
      path: artifacts/pdfs/*.pdf
      retention-days: 90

   - name: Upload ZIP archive
     if: ${{ github.event.inputs.generate_zip != 'false' }}
     uses: actions/upload-artifact@v4
     with:
      name: lesson-archive-${{ github.run_number }}
      path: |
       artifacts/*.zip
       artifacts/*.sha256
      retention-days: 90

   - name: Create Release (on tag)
     if: startsWith(github.ref, 'refs/tags/')
     uses: softprops/action-gh-release@v1
     with:
      files: |
       artifacts/pdfs/*.pdf
       artifacts/*.zip
       artifacts/*.sha256
      generate_release_notes: true
```

### 4.2 Package.json Scripts

**Add to root `package.json`:**

```json
{
	"scripts": {
		"build:site": "cd web-foundations/docs && bundle exec jekyll build",
		"build:pdf": "./scripts/generate-all-pdfs.sh",
		"build:archive": "./scripts/create-archive.sh",
		"build:artifacts": "npm run build:site && npm run build:pdf && npm run build:archive",
		"validate:archive": "./scripts/validate-archive.sh"
	},
	"devDependencies": {
		"puppeteer": "^22.0.0"
	}
}
```

---

## Phase 5: Testing & Validation

### 5.1 Print Preview Testing Checklist

- [ ] Open lesson in browser
- [ ] Press `Ctrl+P` (or `Cmd+P`)
- [ ] Verify navigation/sidebar is hidden
- [ ] Verify code blocks are readable (no overflow)
- [ ] Verify images fit within page
- [ ] Verify no orphaned headings
- [ ] Verify links show URLs
- [ ] Check all pages in preview

### 5.2 PDF Validation Script

**File:** `scripts/validate-pdf.py`

```python
#!/usr/bin/env python3
"""
PDF Validation Script
Checks that generated PDFs are valid and contain expected content.
"""

import sys
import subprocess
from pathlib import Path

def validate_pdf(pdf_path: str, expected_keywords: list[str] = None) -> bool:
    """
    Validate PDF file.

    Args:
        pdf_path: Path to PDF file
        expected_keywords: List of keywords that should appear in the PDF

    Returns:
        True if valid, False otherwise
    """
    pdf_file = Path(pdf_path)

    if not pdf_file.exists():
        print(f"❌ File not found: {pdf_path}")
        return False

    # Check file size (should be > 10KB for a real PDF)
    size_kb = pdf_file.stat().st_size / 1024
    if size_kb < 10:
        print(f"❌ PDF too small ({size_kb:.1f}KB), likely empty or corrupt")
        return False

    print(f"✅ PDF size: {size_kb:.1f}KB")

    # Extract text and check for keywords (requires pdftotext)
    if expected_keywords:
        try:
            result = subprocess.run(
                ['pdftotext', str(pdf_file), '-'],
                capture_output=True,
                text=True,
                timeout=30
            )
            text = result.stdout.lower()

            missing = [kw for kw in expected_keywords if kw.lower() not in text]
            if missing:
                print(f"⚠️  Missing expected keywords: {missing}")
                return False
            print(f"✅ All {len(expected_keywords)} expected keywords found")

        except FileNotFoundError:
            print("⚠️  pdftotext not installed, skipping content check")
        except subprocess.TimeoutExpired:
            print("⚠️  PDF text extraction timed out")

    return True


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: validate-pdf.py <pdf_path> [keyword1 keyword2 ...]")
        sys.exit(1)

    pdf_path = sys.argv[1]
    keywords = sys.argv[2:] if len(sys.argv) > 2 else ["lesson", "web"]

    if validate_pdf(pdf_path, keywords):
        print(f"✅ {pdf_path} is valid")
        sys.exit(0)
    else:
        print(f"❌ {pdf_path} validation failed")
        sys.exit(1)
```

### 5.3 Accessibility Validation

```bash
# Install axe-core for accessibility testing
npm install -g @axe-core/cli

# Run accessibility check on generated PDF (via HTML source)
axe http://localhost:4000/lessons/en/media/print/ --rules wcag2a,wcag2aa
```

---

## Semantic Transformation Prompt

The following improved prompt should be used when semantically transforming XML/DocBook content into Markdown lessons:

---

### AI Prompt for XML-to-Markdown Lesson Transformation

````markdown
## Task: Transform XML/DocBook Content to Markdown Lesson

Transform the provided XML/DocBook document into a well-structured Markdown lesson file following these specifications:

### Input Format

- XML/DocBook document with `<article>`, `<sect1>`, `<sect2>`, `<para>`, `<orderedlist>`, `<ulink>` tags

### Output Format Requirements

#### 1. Frontmatter (YAML)

Include Jekyll-compatible frontmatter with:

- `layout: lesson`
- `title`: Main title (remove emojis from XML if present, add meaningful ones)
- `title_alt`: Spanish translation of title
- `slug`: URL-friendly lowercase-hyphenated slug
- `date`: Creation date (YYYY-MM-DD)
- `author`: 'Rubén Vega Balbás, PhD'
- `lang`: 'en'
- `permalink`: Full path following pattern `/lessons/en/{category}/{subcategory}/{slug}/`

#### 2. Document Structure

- Add Kramdown-compatible Table of Contents block
- Use semantic heading hierarchy (# for title, ## for major sections, ### for subsections)
- Add horizontal rules (---) between major sections
- Include anchor links where referenced

#### 3. Content Transformation

- Convert `<para>` to paragraphs with blank lines between
- Convert `<orderedlist>/<listitem>` to numbered markdown lists
- Convert `<ulink>` references to markdown links with proper anchors
- Extract inline code patterns and wrap in backticks
- Convert XML code examples to fenced code blocks with language tags

#### 4. Style Guidelines

- Maintain the philosophical "Tao" style with wisdom quotes and koans
- Preserve humor and self-ironic tone
- Add relevant emojis sparingly (📌 for tips, ✅/❌ for pros/cons, 🤖 for automation)
- Use blockquotes (>) for philosophical insights
- Use callout boxes for practical tips

#### 5. Code Blocks

- Use fenced code blocks with language identifiers (`css, `html, `bash, `yaml)
- Include comments explaining complex code
- Keep examples concise but complete

#### 6. References Section

- Convert XML citations to numbered markdown references
- Group related references
- Include full URLs

#### 7. Quality Checks

- Ensure all internal links resolve
- Verify code syntax highlighting works
- Check that emojis render correctly
- Validate frontmatter YAML syntax

### Example Transformation

**XML Input:**

```xml
<para>Use CSS print styles to format content<ulink url="https://...">[2]</ulink>.</para>
```
````

**Markdown Output:**

```markdown
Use CSS print styles to format content [[2]](#references).
```

### Additional Enhancements

- Add a "Final Koan" section following the Tao tradition
- Include practical code examples where the XML has conceptual descriptions
- Add a references section with proper academic-style citations
- Ensure accessibility of all code examples with proper ARIA considerations noted

```

---

## Implementation Checklist

### Phase 1: CSS Setup (Priority: High)
- [x] Create `print.css` file
- [x] Add print stylesheet link to head template
- [ ] Test print preview in Chrome, Firefox, Safari
- [ ] Verify page breaks work correctly
- [ ] Ensure code blocks don't overflow

### Phase 2: PDF Tooling (Priority: High)
- [ ] Install Puppeteer: `npm install puppeteer`
- [ ] Create `scripts/generate-pdf.js`
- [ ] Create `scripts/generate-all-pdfs.sh`
- [ ] Test PDF generation locally
- [ ] Verify PDF accessibility

### Phase 3: Archive Setup (Priority: Medium)
- [ ] Create `scripts/create-archive.sh`
- [ ] Create `scripts/validate-archive.sh`
- [ ] Test ZIP generation
- [ ] Verify offline functionality

### Phase 4: CI/CD Integration (Priority: Medium)
- [ ] Create GitHub Actions workflow
- [ ] Configure artifact retention
- [ ] Set up manual trigger for on-demand generation
- [ ] Test full pipeline

### Phase 5: Documentation & Validation (Priority: Low)
- [ ] Document usage in README
- [ ] Create validation scripts
- [ ] Add accessibility testing
- [ ] Train team on process

---

## Timeline

| Phase | Duration | Dependencies | Owner |
|-------|----------|--------------|-------|
| Phase 1: CSS | 2 days | None | Front-end |
| Phase 2: PDF | 3 days | Phase 1 | DevOps |
| Phase 3: Archive | 1 day | Phase 1 | DevOps |
| Phase 4: CI/CD | 2 days | Phase 2, 3 | DevOps |
| Phase 5: Testing | 2 days | Phase 4 | QA |

**Total Estimated Duration:** 10 working days

---

## Appendix: Troubleshooting

### Common Issues

**PDF generation fails with timeout:**
- Increase `timeout` in Puppeteer options
- Check for infinite loops in JavaScript
- Ensure network resources are accessible

**Page breaks in wrong places:**
- Add `page-break-inside: avoid` to containers
- Use `page-break-before: always` for section starts
- Check for conflicting flexbox/grid layouts

**Images missing in PDF:**
- Verify images use absolute URLs or are embedded
- Check `printBackground: true` is set
- Ensure images aren't lazy-loaded

**ZIP archive too large:**
- Exclude `.map` files and development assets
- Compress images before archiving
- Use `--exclude` patterns in zip command

---

_This implementation plan is a living document. Update as requirements evolve._

**Last Updated:** 2025-01-09
**Version:** 1.0.0
```
