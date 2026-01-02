# Portfolio Self-Assessment Exam — Rationale & Design Document

> **Course:** Web Foundations (24/25-GDMG-FDW)  
> **Duration:** 60-90 minutes  
> **Total Points:** 100  
> **Author:** Rubén Vega Balbás, PhD  
> **Generated:** 2026-01-02

---

## 1. Alignment with Web Atelier Methodology

The Web Atelier methodology emphasizes **"learning by doing, with theory, practice, and shared reflection."** This exam embodies all three pillars:

### Theory → Practice → Reflection Cycle

| Pillar | How the Exam Addresses It |
|--------|---------------------------|
| **Theory** | Questions reference course lessons (responsive design, CSS architecture, JavaScript modules, accessibility) requiring students to demonstrate theoretical understanding |
| **Practice** | Students must describe their actual implementations, specific techniques used, and concrete decisions made in their portfolios |
| **Reflection** | Essay questions require critical analysis of learning outcomes, challenges overcome, and future improvements |

### The "Fishing Net" Philosophy

The portfolio project brief states: *"You're creating a fishing net, not catching a single fish."* This exam tests whether students internalized this philosophy by asking about:

- Template reusability and customization
- Design token organization for theming
- Modular CSS architecture
- Documentation quality

---

## 2. Question Design Principles

### 2.1 Self-Assessment Focus

Unlike traditional technical exams, this assessment prioritizes **metacognition**—students demonstrating understanding of *their own work*:

- **"What did YOU implement?"** not "What is the definition of X?"
- **"Why did YOU choose this approach?"** not "What is the best approach?"
- **"What would YOU improve?"** requiring honest self-evaluation

### 2.2 Question Type Distribution

| Type | Count | Points | Purpose |
|------|-------|--------|---------|
| **Essay** | 22 | ~85 | Deep reflection, personalized responses |
| **Multiple Choice** | 8 | ~16 | Concept verification |
| **True/False** | 7 | ~14 | Quick knowledge checks |
| **Matching** | 5 | ~15 | Relationship understanding |

The heavy emphasis on **essay questions** (22 of 42) reflects the self-assessment nature—students must articulate their own understanding rather than select from options.

### 2.3 Grader Information

Each essay question includes `<graderinfo>` with:
- Expected keywords and concepts
- Evaluation criteria
- What distinguishes excellent from adequate responses

This ensures consistent grading across multiple evaluators.

---

## 3. Category Alignment with Course Topics

The exam covers **12 categories** mapped directly to course lessons:

| Category | Lesson Reference | Key Questions |
|----------|------------------|---------------|
| Project Self-Understanding | Portfolio Brief | Framework choice, learning outcomes, challenges |
| Responsive Design | `responsive/`, `intrinsic-web-design/` | Fluid typography, mobile-first, layout techniques |
| CSS Architecture | `tailwind/design-tokens/`, barrel pattern | Design tokens, custom properties, organization |
| JavaScript Usage | `js-intro/`, `js-modules/`, `js-dom-manipulation/` | DOM manipulation, ES6 modules, event handling |
| Accessibility & Semantics | `accessibility-performance/` | WCAG, semantic HTML, reduced motion |
| Deployment & Infrastructure | `build-deploy/` | GitHub Pages, HTTPS, CDNs |
| Version Control | Development environment | Git concepts, GitHub relationship |
| Web Ecosystem | Web analysis, PWA lessons | APIs, Web 3.0, progressive enhancement |
| Design Principles | `typography-color/`, `web-design-trends/` | Visual direction, web vs. print |
| AI Usage & Ethics | Portfolio Brief AI policy | Tool disclosure, learning impact, two-phase workflow |
| Learning & Reflection | Methodology | Course philosophy, template reusability |
| Frameworks & Tools | Bootstrap/Tailwind roadmaps | Framework trade-offs, build tools |

---

## 4. AI Usage Assessment

Given the course's explicit **two-phase AI workflow** requirement, dedicated questions assess:

1. **Transparency:** Did students disclose AI usage?
2. **Documentation:** Did they create `docs/plan1.md`, `plan2.md`, etc.?
3. **Learning Impact:** Did AI enhance or hinder deep learning?
4. **Methodology Compliance:** Did they follow planning-before-implementation?

These questions are **non-punitive**—honest disclosure of extensive AI use is valued over hidden usage with false claims of independence.

---

## 5. Scoring Philosophy

### Point Distribution by Skill Type

| Skill Category | Points | Percentage |
|----------------|--------|------------|
| Technical Implementation | ~40 | 40% |
| Critical Reflection | ~35 | 35% |
| Conceptual Understanding | ~25 | 25% |

This mirrors the project rubric's 60/40 split between Technical Excellence and Design/Human Factors.

### Time Estimation

- **Essay questions:** ~3-4 minutes each (22 × 3.5 = 77 min)
- **Objective questions:** ~1 minute each (20 × 1 = 20 min)
- **Buffer/Review:** ~5-10 minutes
- **Total:** 75-90 minutes

---

## 6. Moodle Import Instructions

### File Location
```
web-foundations/docs/_data/exam-portfolio-self-assessment-moodle.xml
```

### Import Steps

1. Navigate to **Course Administration → Question Bank → Import**
2. Select **Moodle XML format**
3. Upload `exam-portfolio-self-assessment-moodle.xml`
4. Verify category structure: `$course$/top/[Category Name]`
5. Review imported questions in Question Bank

### Creating the Quiz

1. **Add Activity → Quiz**
2. Configure settings:
   - Time limit: 75 minutes (recommended)
   - Grade: 100 points
   - Shuffle questions: Yes (within categories)
   - Review options: After quiz closes
3. **Edit Quiz → Add from Question Bank**
4. Select questions by category for balanced coverage

### Recommended Question Selection (for 75-minute exam)

| Category | Suggested Questions |
|----------|---------------------|
| Project Self-Understanding | 3-4 essays |
| Responsive Design | 2 essays + 2 objective |
| CSS Architecture | 2 essays + 1 objective |
| JavaScript Usage | 1 essay + 2 objective |
| Accessibility | 2 essays + 1 objective |
| Deployment | 1 essay + 1 objective |
| Version Control | 2 essays + 1 matching |
| Web Ecosystem | 1 essay + 1 matching |
| Design Principles | 2 essays |
| AI Usage | 2 essays + 1 T/F |
| Learning & Reflection | 2 essays |

**Total:** ~20-25 questions for 75 minutes

---

## 7. XML Validation

The generated XML follows [Moodle XML format specification](https://docs.moodle.org/501/en/Moodle_XML_format):

### Supported Question Types
- `<question type="essay">` — Open-ended reflection
- `<question type="multichoice">` — Single/multiple answer
- `<question type="truefalse">` — Binary choice
- `<question type="matching">` — Premise-answer pairs
- `<question type="category">` — Organization structure

### XML Structure Compliance
- UTF-8 encoding declaration
- CDATA wrapping for HTML content
- Proper nesting of feedback elements
- Unique `<idnumber>` for each question
- Default grade and penalty values

### Validation Command
```bash
xmllint --noout exam-portfolio-self-assessment-moodle.xml
```

---

## 8. Files Generated

| File | Purpose |
|------|---------|
| `exam-portfolio-self-assessment.yml` | Question bank in YAML (human-readable source) |
| `yaml-to-moodle-xml.js` | Node.js transformation script |
| `exam-portfolio-self-assessment-moodle.xml` | Moodle-importable XML |
| `exam-portfolio-self-assessment-rationale.md` | This document |

---

## 9. Future Enhancements

- [ ] Add Spanish translations for bilingual support
- [ ] Create question variants for exam security
- [ ] Implement rubric-based grading for essays
- [ ] Add multimedia questions (screenshot analysis)
- [ ] Integrate with GitHub Classroom for portfolio verification

---

*This exam was designed to assess not just what students know, but how well they understand their own learning journey—the ultimate goal of the Web Atelier methodology.*
