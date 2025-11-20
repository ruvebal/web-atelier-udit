# Final Course Portfolio Project Brief

## Plan Overview

Create a focused, professional final project brief document at `/web-foundations/docs/lessons/en/portfolio-template-brief/challenge/index.md` that guides students through building a production-ready portfolio template across three grade levels.

## Document Structure

### 1. Front Matter & Introduction

- Jekyll front matter with proper layout (methodology), title, permalink
- Epigraph on AI usage: If using AI agents/assistants, students must request a plan first and document it in `./docs/plan.md` before implementation
- Opening with Chinese proverb metaphor (teaching to fish vs giving fish)
- Atelier methodology philosophy reference
- Project rationale: building a reusable template, not just one-time portfolio

### 2. Three Grade Level Specifications

Each level clearly distinguished with:

- **First Grade (Vanilla)**: HTML, CSS, JS fundamentals via CDN
- **Second Grade (Bootstrap+GSAP)**: Bootstrap 5 + GSAP animations via CDN, JS intermediate
- **Third Grade (Tailwind+Vite)**: Node/Vite setup, Tailwind, SPA with vanilla JS routing

### 3. Common Requirements (All Levels)

- Repository setup and GitHub Pages deployment
- Responsive design (fluid + elastic + intrinsic from responsive lesson)
- HTML5 semantic structure
- Coherent directory structure
- Metadata and visual identity (Open Graph, favicon, etc.)
- Custom 404 page
- README with live link at top
- Complete .gitignore
- Code quality: Prettier + ESLint/Stylelint
- Basic accessibility: color contrast, prefers-reduced-motion

### 4. Web Professional Standards Checklist

Comprehensive pre-submission QA checklist covering:

- Repository conventions
- Deployment verification
- Responsive behavior (mobile, tablet, desktop)
- Code quality (linted, formatted)
- HTML semantics
- Design implementation (typography, animations, modern trends)
- Metadata completeness
- Performance basics
- Accessibility basics (color contrast, motion preferences)

### 5. Technical Components to Implement

Reference to specific lessons for:

- CSS animations (transitions, keyframes, scroll-driven)
- GSAP animations (for 2nd/3rd grade)
- Typography techniques (fluid with clamp)
- Design trends (glassmorphism, parallax, dark mode, etc.)
- Main component patterns from lessons
- Others taht can be proposed as inspirations (they can count on AIs (see on agents ussage) and professor's assistance and partners because sprints will be hold during sessions)

### 6. Grading Rubric (Total: 100 points)

**Technical Excellence (60 points):**

- Code quality & architecture (15 pts)
- Deployment & repository setup (10 pts)
- Responsive design implementation (15 pts)
- Animations & interactivity (10 pts)
- HTML semantics & accessibility (10 pts)

**Design & Human Factors (40 points):**

- Visual aesthetics & coherence (12 pts)
- Creativity & personal signature (12 pts)
- Narrativity & storytelling (8 pts)
- Pragmatics & usability (8 pts)

### 7. Submission Requirements

- Create git tag (v1.0.0)
- Create GitHub release with tag
- Self-index in professor's course repository (specific sprint task)
- Verify live deployment URL

### 8. Five Sprint Development Plan

**Sprint 1 (Week 1): Foundation & Setup (1.5-2 hours)**

- Repository creation and initial structure
- Basic HTML skeleton with semantic structure
- CSS architecture setup (variables, reset)
- Initial deployment to GitHub Pages
- README initialization

**Sprint 2 (Week 2): Responsive Layout & Core Sections (2-3 hours)**

- Implement fluid/elastic responsive design
- Build main sections (hero, about, projects, contact)
- Typography system with clamp()
- Mobile-first media queries
- Test across breakpoints

**Sprint 3 (Week 3): Animations & Interactivity (2-4 hours)**

- CSS animations/transitions
- GSAP animations (for 2nd/3rd grade)
- Scroll-driven effects
- Interactive components (nav, cards, forms)
- Motion accessibility (prefers-reduced-motion)

**Sprint 4 (Week 4): Visual Identity & Polish (2-3 hours)**

- Metadata implementation
- Favicon and visual identity
- Custom 404 page
- Design trends implementation (glassmorphism, parallax, etc.)
- Personal creativity signature
- Self-index in course repository

**Sprint 5 (Week 5): Quality Assurance & Submission (1.5-2 hours)**

- Run through complete checklist
- Code formatting and linting
- Cross-browser testing
- Performance optimization
- Create git tag and release
- Final documentation in README

### 9. Level-Specific Considerations

- Vanilla: Focus on fundamentals, clean structure
- Bootstrap: Leverage framework patterns, GSAP for advanced animations
- Tailwind: Component architecture, SPA routing, build optimization

### 10. Linked Resources

Internal links to lessons:

- `/lessons/en/responsive/` (canonical responsive lesson)
- `/lessons/en/web-animations/css/`
- `/lessons/en/web-animations/gsap/`
- `/lessons/en/typography-color/`
- `/lessons/en/modern-web-design-trends/`
- `/lessons/en/metadata-visual-identity-web/`
- `/lessons/en/linting-and-formatting/`
- `/lessons/en/bootstrap/final-project-deployment/` (for 2nd grade)
- `/lessons/en/tailwind/build-deploy/` (for 3rd grade)

### 11. Atelier Touches

- Self-critical humor about perfectionism vs practicality
- Acknowledgment that templates evolve (it's a fishing net you'll repair and improve)
- Encouragement about iterative improvement
- Reference to learning-by-doing methodology

## Implementation Notes

- Use methodology layout for TOC and atelier branding
- Professional but encouraging tone
- Clear, actionable instructions
- Distinguish requirements vs recommendations
- Include code examples where helpful
- Ensure all lesson links are relative and correct