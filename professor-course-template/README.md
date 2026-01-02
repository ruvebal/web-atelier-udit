# WEB ATELIER (UDIT) · Professor's Course Template

_Critical Coding for a Better Living._

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen)](https://pages.github.com/)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-red)](https://jekyllrb.com/)
[![License: MIT](https://img.shields.io/badge/Code-MIT-blue)](LICENSE-CODE)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--NC--SA%204.0-lightgrey)](LICENSE-CONTENT)

**Author:** Rubén Vega Balbás, PhD
**Institution:** UDIT, University of Design, Innovation and Technology
**ORCID:** [0000-0001-6862-9081](https://orcid.org/0000-0001-6862-9081)
**Website:** [udit.es](https://www.udit.es)

---

## Quick Start: Create Your Course

### Option 1: Use as GitHub Template (Recommended)

1. **Click "Use this template"** on GitHub (green button, top right)
2. **Name your repository** (e.g., `web-design-2025-fall`)
3. **Clone your new repository:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

4. **Configure your course** (see [Configuration](#configuration) below)
5. **Enable GitHub Pages** in repository Settings → Pages → Source: `main` branch

### Option 2: Fork and Customize

```bash
# 1. Fork via GitHub UI, then clone your fork
git clone https://github.com/YOUR_USERNAME/professor-course-template.git
cd professor-course-template

# 2. Rename origin and add upstream for updates
git remote rename origin upstream
git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git

# 3. Push to your new repository
git push -u origin main
```

### Option 3: Manual Clone (Fresh Start)

```bash
# Clone without git history
git clone --depth 1 https://github.com/ruvebal/web-atelier-udit.git temp-clone
cp -r temp-clone/professor-course-template ./my-course
rm -rf temp-clone
cd my-course

# Initialize fresh git repository
rm -rf .git
git init
git add .
git commit -m "Initial commit: course site from WEB ATELIER template"

# Add your remote and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## Configuration

### 1. Update `_config.yml`

```yaml
title: 'Your Course Name'
description: 'Course description for SEO'
url: 'https://YOUR_USERNAME.github.io'
baseurl: '/YOUR_REPO_NAME'
repository: 'YOUR_USERNAME/YOUR_REPO_NAME'
```

### 2. Update Course Data

Edit `_data/courses/2025-fall/en.yml` and `es.yml`:

```yaml
university: 'Your University Name'
course_name: 'Your Course Name'
term: '2025 · Fall'
canonical_lessons_base: 'https://ruvebal.github.io/web-atelier-udit'
```

### 3. Customize Semester Pages

- Edit `2025-fall/en/index.md` and `2025-fall/es/index.md`
- Update lesson links to match your syllabus
- Modify the schedule table with your dates

### 4. Add Students (During Semester)

Create individual YAML files in `_data/students/2025-fall/`:

```yaml
# _data/students/2025-fall/jane-doe.yml
name: 'Jane Doe'
project_title: 'Portfolio Website'
repo: 'https://github.com/janedoe/portfolio'
site: 'https://janedoe.github.io/portfolio'
```

---

## Local Development

### Prerequisites

- Ruby 3.x
- Bundler (`gem install bundler`)
- Node.js (optional, for scripts)

### Setup

```bash
# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve --livereload

# View at http://localhost:4000/YOUR_BASEURL/
```

### Build for Production

```bash
bundle exec jekyll build
# Output in _site/
```

---

## Repository Structure

```plaintext
professor-course-template/
├── _config.yml                   # Jekyll configuration
├── _layouts/
│   └── default.html              # Main layout with dark mode
├── _includes/
│   ├── head.html                 # Meta, styles, theme script
│   ├── header.html               # Sticky nav with lang/theme toggle
│   ├── footer.html               # UDIT branding, licenses
│   ├── lang-switcher.html        # EN/ES language toggle
│   ├── head-hreflang.html        # Multilingual SEO tags
│   ├── head-jsonld.html          # Structured data (JSON-LD)
│   └── students-list-by-files.html # Student showroom generator
├── _data/
│   ├── courses/2025-fall/        # Course metadata (en.yml, es.yml)
│   ├── lessons/2025-fall/        # Lesson links (en.yml, es.yml)
│   ├── students/2025-fall/       # Student YAML files
│   └── locales.yml               # Supported languages
├── 2025-fall/
│   ├── index.html                # Semester redirect (lang detection)
│   ├── en/index.md               # English course page
│   └── es/index.md               # Spanish course page
├── assets/css/
│   └── site.css                  # Local style overrides
├── docs/                         # Course policies
│   ├── ACCESSIBILITY.md
│   ├── AI_POLICY.md
│   ├── ETHICS.md
│   ├── PRIVACY.md
│   └── SUSTAINABILITY.md
├── .github/workflows/
│   ├── pages.yml                 # GitHub Pages deployment
│   ├── critical.yml              # Build validation
│   └── validate-students-pr.yml  # Student PR validation
├── index.html                    # Root redirect to current semester
├── Gemfile                       # Ruby dependencies
├── package.json                  # Node.js scripts
├── LICENSE-CODE                  # MIT License
├── LICENSE-CONTENT               # CC BY-NC-SA 4.0
└── README.md                     # This document
```

---

## Features

### Inherited from Web Foundations

- **Dark Mode** – Toggle with localStorage persistence
- **Skip Link** – Accessibility improvement
- **Code Copy Button** – One-click copy for code blocks
- **Sticky Header** – With backdrop blur effect
- **Responsive Design** – Mobile-first approach
- **Kramdown Typography** – Smart quotes, typographic symbols
- **JSON-LD** – Structured data for SEO and scholarly indexing

### Course-Specific

- **Bilingual Support** – EN/ES with automatic language detection
- **Student Showroom** – Auto-generated from YAML files
- **Lesson Grid** – Visual card layout linking to Web Foundations
- **Schedule Table** – Weekly deliverables tracking
- **PR Validation** – Automated student submission checks

---

## Workflows

### Student Submission Flow (Week 4)

1. Student forks the course repository
2. Creates `_data/students/2025-fall/their-name.yml`
3. Opens Pull Request
4. GitHub Action validates YAML schema
5. Professor reviews and merges
6. Showroom automatically updates

### Adding a New Semester

```bash
# Copy semester folder
cp -r 2025-fall 2026-spring

# Copy data files
cp -r _data/courses/2025-fall _data/courses/2026-spring
cp -r _data/lessons/2025-fall _data/lessons/2026-spring
mkdir -p _data/students/2026-spring

# Update index.html redirect to new semester
# Update _config.yml defaults if needed
```

---

## Relationship to Web Foundations

This template **links to** [Web Foundations](https://ruvebal.github.io/web-atelier-udit/) for canonical lessons. It does **not** duplicate lesson content.

| Repository                  | Purpose                                   |
| --------------------------- | ----------------------------------------- |
| `web-foundations`           | Canonical lessons, methodology, templates |
| `professor-course-template` | Semester course site, student showroom    |
| `student-project-template`  | Individual student portfolio projects     |

**Important:** Do NOT fork `web-foundations` for your course. Use this template instead.

---

## Pedagogical Approach

### One Student, One Repository, One Project

- Students build a single web project throughout the semester
- Each class ends with a commit documenting progress
- The commit log becomes a learning journal

### Critical Coding for a Better Living

- Technical skills integrated with ethical reflection
- Accessibility as a core requirement, not an afterthought
- Discussions on wellbeing, inclusivity, and responsible design

### Agile Adapted for Education

- Weekly "mini-sprints" with flexibility for learning
- Buffer weeks for reinforcement or creative exploration
- Professional practices (CI/CD, version control) at learner-centered pace

---

## Licensing

| Content                       | License                                                  |
| ----------------------------- | -------------------------------------------------------- |
| Code (HTML, CSS, JS, configs) | MIT – see [LICENSE-CODE](LICENSE-CODE)                   |
| Content (text, images, docs)  | CC BY-NC-SA 4.0 – see [LICENSE-CONTENT](LICENSE-CONTENT) |

© 2025 Rubén Vega Balbás, PhD — WEB ATELIER (UDIT)

---

## References

- Nelson & Ponciano (2021). [Experiences and insights from using GitHub Classroom to support Project-Based Courses](https://arxiv.org/abs/2103.07242). arXiv.
- Vega, Jiménez & Villalobos (2012). [Implementing an Incremental Project-Based Learning Solution](http://www.scitepress.org/Papers/2012/39005/). CSEDU.
- Neumann & Baumann (2021). [Agile Methods in Higher Education](https://doi.org/10.48550/arXiv.2106.12166). IEEE FIE.
- Wallet, B. (2025). [It's not you: your UX design job is frustrating](https://uxdesign.cc/its-not-you-your-ux-design-job-is-frustrating-and-unfulfilling-14d5180800d7). UX Collective.

---

## Support

- **Issues:** [GitHub Issues](https://github.com/ruvebal/web-atelier-udit/issues)
- **Canonical Lessons:** [Web Foundations](https://ruvebal.github.io/web-atelier-udit/)
- **Contact:** UDIT – Universidad de Diseño, Innovación y Tecnología
