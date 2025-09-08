# Development Guide - WEB ATELIER (UDIT)

This guide explains how to set up and work with the WEB ATELIER (UDIT) framework locally.

## Prerequisites

- **Ruby** 3.2+ (for Jekyll)
- **Node.js** 20+ (for tooling and validation)
- **Git** (for version control)
- **Bundler** (`gem install bundler`)

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/ruvebal/web-atelier-udit.git
cd web-atelier-udit
```

### 2. Set Up Web Foundations (Core Lessons)

```bash
cd web-foundations
bundle install
npm install
npm run dev  # Starts Jekyll server at http://localhost:4000
```

### 3. Set Up Professor Course Template

```bash
cd ../professor-course-template
bundle install
npm install
npm run dev  # Starts Jekyll server at http://localhost:4000
```

### 4. Set Up Student Project Template

```bash
cd ../student-project-template
npm install
npm run dev  # Starts live-server at http://localhost:3000
```

## Project Structure Overview

```
web-atelier-udit/
├── web-foundations/              # 🎓 Canonical lessons & methodology
│   ├── docs/                     # Jekyll source (published to GitHub Pages)
│   │   ├── lessons/es/           # Spanish lessons
│   │   ├── lessons/en/           # English lessons
│   │   ├── _data/lessons.yml     # Lesson index
│   │   └── _config.yml           # Jekyll config
│   ├── Gemfile                   # Ruby dependencies
│   ├── package.json              # Node.js tools
│   └── scripts/wrap-lessons.mjs  # I18n automation
│
├── professor-course-template/    # 👨‍🏫 Course instance template
│   ├── 2025-fall/               # Semester content
│   │   ├── es/index.md          # Spanish course page
│   │   └── en/index.md          # English course page
│   ├── _data/
│   │   ├── course/              # Course metadata
│   │   └── students/2025-fall/  # Individual student files
│   ├── _includes/               # Jekyll templates
│   ├── Gemfile                  # Ruby dependencies
│   └── package.json             # Node.js tools
│
└── student-project-template/    # 👩‍🎓 Individual student project
    ├── index.html               # Semantic HTML starter
    ├── assets/                  # Modern asset structure
    │   ├── css/style.css        # Responsive stylesheet
    │   └── js/main.js           # JavaScript functionality
    ├── project.yaml             # Project metadata
    ├── project-brief.md         # Project definition
    ├── .github/workflows/       # CI/CD automation
    └── package.json             # Development tools
```

## Development Workflows

### Working with Lessons (web-foundations)

1. **Add a new lesson:**

   ```bash
   cd web-foundations
   # Create lesson files in docs/lessons/{es,en}/
   # Update docs/_data/lessons.yml
   npm run validate:lessons
   ```

2. **Auto-generate i18n scaffolds:**

   ```bash
   npm run wrap:i18n  # Runs scripts/wrap-frontmatter-i18n.mjs
   ```

3. **Local development:**
   ```bash
   npm run dev  # Jekyll serve with live reload
   ```

### Managing Students (professor-course-template)

1. **Add a student:**

   ```bash
   cd professor-course-template/_data/students/2025-fall/
   cp sample-student.yml john-doe.yml
   # Edit john-doe.yml with student details
   ```

2. **Validate student data:**

   ```bash
   npm run validate:students
   ```

3. **Preview course site:**
   ```bash
   npm run dev
   ```

### Student Project Development

1. **Initial setup:**

   ```bash
   cd student-project-template
   npm install
   # Edit project.yaml and project-brief.md
   ```

2. **Development with validation:**

   ```bash
   npm run dev        # Live server
   npm run validate:all  # HTML, CSS, JS, YAML validation
   ```

3. **Quality checks:**
   ```bash
   npm run lighthouse  # Performance audit
   ```

## Key Features Implemented

### 🗂️ File-Based Student Indexing

- Students are stored as individual YAML files
- Path: `_data/students/{semester}/{username}.yml`
- Benefits: Better Git history, easier collaboration, scalable

### 🎨 Modern Asset Structure

- Organized `assets/css/` and `assets/js/` directories
- Responsive CSS with accessibility features
- JavaScript with modern practices

### 🔄 CI/CD Integration

- **Web Foundations:** Automated lesson wrapping and site building
- **Professor Template:** YAML validation and Jekyll builds
- **Student Template:** HTML/CSS/JS validation, accessibility checks

### 🌍 Consistent Internationalization

- Spanish (es) and English (en) throughout
- Proper `hreflang` and SEO metadata
- Language switching capabilities

### 📊 Quality Assurance

- YAML linting for data integrity
- HTML validation for semantic correctness
- CSS/JS linting for code quality
- Lighthouse audits for performance/accessibility

## Common Tasks

### Add a New Semester

```bash
cd professor-course-template
mkdir -p 2026-spring/{es,en}
mkdir -p _data/students/2026-spring
# Copy and modify index.md files
# Update _data/course/ files
```

### Update Canonical Lessons URL

```bash
# Update in professor-course-template/_data/course/{en,es}.yml
canonical_lessons_base: 'https://your-domain.github.io/web-atelier-udit'
```

### Troubleshooting Jekyll Builds

```bash
bundle exec jekyll build --trace  # Detailed error output
bundle exec jekyll doctor         # Check site health
```

## GitHub Pages Deployment

The project is configured for automatic deployment:

1. **Web Foundations** publishes to `https://ruvebal.github.io/web-atelier-udit/`
2. **Professor templates** can be deployed to individual course repositories
3. **Student projects** deploy to `https://username.github.io/project-name/`

## Contributing

1. Follow the established file structure
2. Maintain bilingual content (es/en)
3. Validate YAML and HTML before committing
4. Update documentation when changing structure
5. Test locally before pushing

## Support

- 📖 **Documentation:** Each subdirectory has detailed READMEs
- 🔧 **Issues:** Use GitHub Issues for bugs and feature requests
- 💬 **Discussions:** GitHub Discussions for questions and ideas

---

**Author:** Rubén Vega Balbás, PhD (UDIT)  
**License:** MIT (Code) · CC BY-NC 4.0 (Content)
