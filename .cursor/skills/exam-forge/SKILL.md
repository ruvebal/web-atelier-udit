---
name: exam-forge
description: >-
  Generate LMS-ready exam banks from YAML sources with dual export to Moodle
  (XML + GIFT) and Blackboard (QTI 2.1 + tab-delimited TXT). Includes anti-AI
  question design patterns that defeat ChatGPT and penalize longest-answer bias.
  Use when creating exams, quiz banks, question pools, MCQ, true/false, matching,
  essay, or gapselect questions for any course.
---

# Exam Forge — LMS Exam Generation Skill

Generate rigorous, AI-resistant exam banks that export to **Moodle** and
**Blackboard Ultra** from a single YAML source of truth.

> **Portability:** To use this pack in another course repo, read `PORTABILITY.md`.
> **Git:** Author banks in `private/exams/`; write exports to `private/exams-out/`
> (both gitignored — see `templates/gitignore-snippet.txt`).

## Quick start

1. Create gitignored dirs: `mkdir -p private/exams private/exams-out`
2. Author the bank: `private/exams/my-exam.yml` (schema below).
3. Export (outputs go to `private/exams-out/my-exam/` by default):

```bash
# One-time setup
cd .cursor/skills/exam-forge/scripts && npm install

# Recommended: export from private/exams → private/exams-out
.cursor/skills/exam-forge/scripts/export-exam.sh private/exams/my-exam.yml

# Manual paths (still use exams-out for generated files)
node .cursor/skills/exam-forge/scripts/yaml-to-moodle-xml.js \
  --input=private/exams/my-exam.yml \
  --output=private/exams-out/my-exam/my-exam-moodle.xml

node .cursor/skills/exam-forge/scripts/yaml-to-qti.js \
  --input=private/exams/my-exam.yml \
  --outdir=private/exams-out/my-exam/my-exam-qti
```

Do **not** commit `private/exams/` or `private/exams-out/` to public repositories.

---

## YAML Bank Schema

Every exam bank is a single `.yml` file with three top-level keys.

```yaml
metadata:
  title: 'Exam Title'
  course: '25/26-DEGREE-SUBJECT'
  duration_minutes: 90
  total_points: 100
  language: en          # en | es
  date_created: '2026-05-18'
  author: 'Name, PhD'

categories:
  - id: cat-slug
    name: 'Category Display Name'
    description: 'What this category covers'

questions:
  - id: q001
    category: cat-slug
    type: multichoice    # multichoice | truefalse | matching | essay | gapselect
    name: 'Short title'
    points: 2
    single: true         # true = radio, false = checkbox (multichoice only)
    shuffleanswers: true
    question: |
      <p>HTML question stem.</p>
    answers:             # multichoice / truefalse
      - text: 'Option A'
        fraction: 100    # 0 = wrong, 100 = correct, 50 = partial
        feedback: 'Why this is correct.'
      - text: 'Option B'
        fraction: 0
        feedback: 'Why this is wrong.'
    subquestions:         # matching only
      - premise: 'Left side'
        answer: 'Right side'
    response_lines: 20   # essay only
    grader_info: |        # essay only — rubric for human graders
      <p>What to look for.</p>
```

### Field reference

| Field | Types | Required | Notes |
|-------|-------|----------|-------|
| `id` | all | yes | Unique, prefixed: `q*` objective, `p*` project essay, `r*` reflection |
| `category` | all | yes | Must match a `categories[].id` |
| `type` | all | yes | `multichoice`, `truefalse`, `matching`, `essay`, `gapselect` |
| `name` | all | yes | Short display title |
| `points` | all | yes | Numeric weight |
| `question` | all | yes | HTML string (XHTML-valid for QTI) |
| `single` | multichoice | no | Default `true`; `false` = multiple correct |
| `shuffleanswers` | multichoice | no | Default `true` |
| `answers[]` | multichoice, truefalse | yes | `.text`, `.fraction`, `.feedback` |
| `subquestions[]` | matching | yes | `.premise`, `.answer` |
| `groups[]` | gapselect | yes | `.group` (int), `.options` (string array) |
| `response_lines` | essay | no | Hint for textarea height |
| `grader_info` | essay | no | HTML rubric for markers |

---

## Validation

Run `validate-exam.js` before exporting (or let `export-exam.sh` run it automatically):

```bash
node .cursor/skills/exam-forge/scripts/validate-exam.js --input=private/exams/my-exam.yml
# --strict  treats warnings as errors
```

**Errors** (block export): missing fields, invalid types, orphan categories, duplicate IDs,
malformed XHTML, missing `answers[]`/`subquestions[]`/`groups[]`, no correct answer.

**Warnings** (reported, export continues): points mismatch vs `metadata.total_points`,
longest-answer bias, low local-anchor coverage, missing feedback, essays without rubrics.

---

## Export Formats

All four exporters are bundled in `scripts/`. `export-exam.sh` runs validation + all four.

### 1. Moodle XML (`yaml-to-moodle-xml.js`)

Full-featured. Supports all five question types including `gapselect`.
Import via: *Question bank → Import → Moodle XML format*.

### 2. Moodle GIFT (`yaml-to-gift.js`)

Compact plain text. Supports MCQ, T/F, matching, essay. No `gapselect` (degraded to essay).
No images or HTML in stems. Import via: *Question bank → Import → GIFT format*.

### 3. Blackboard QTI 2.1 (`yaml-to-qti.js`)

IMS QTI 2.1 package. `export-exam.sh` auto-creates the ZIP with `imsmanifest.xml` at root.
See `BLACKBOARD-QTI-RULES.md`. Import via: *Course Content → Import Content → Import Package*.

### 4. Blackboard Tab-Delimited TXT (`yaml-to-bb-txt.js`)

One question per line. Supports MC, MA, TF, ESS, MAT. Max 500 questions per file.
Import via: *Tests, Surveys, and Pools → Pools → Upload Questions*.

---

## Anti-AI Question Design

**Read `anti-ai-playbook.md` before writing any question.** Summary of
mandatory patterns:

### Defeating longest-answer bias

The correct answer must NOT be the longest. Apply one of:

1. **Pad distractors** — add plausible technical detail to wrong answers.
2. **Trim the correct answer** — use the most concise accurate phrasing.
3. **Equalize length** — all four options within ±15% character count.
4. **Invert the pattern** — make the correct answer the *shortest*.

### Detecting ChatGPT use (honeypots and fingerprints)

| Technique | How it works |
|-----------|--------------|
| **Honeypot option** | Include the answer GPT would give (pre-tested) as a wrong option with a subtle but critical error. |
| **Local anchor** | Reference specific slides, exercises, or class repo paths that only course participants know. |
| **Fabricated authority** | Cite a plausible-sounding but nonexistent API, method, or RFC. GPT will treat it as real; students who attended class will not. |
| **Contradictory cluster** | Two questions whose "obvious" answers contradict each other. Humans resolve via nuance; GPT picks the surface match in both. |
| **Negation trap** | "Which is NOT…" — GPT tends to select the first correct-sounding option instead of excluding it. |
| **Code with subtle bug** | A snippet that looks correct but has an off-by-one, scope leak, or missing `await`. Students who ran code will catch it. |
| **Version-specific trap** | Use syntax from a specific library version taught in class; GPT defaults to the most popular version in its training data. |

### Statistical fingerprinting (post-exam)

Design 3–5 question clusters where:
- Questions are independent but share a latent difficulty pattern.
- A student who understands the topic answers them consistently.
- GPT answers with a characteristic signature (high confidence on easy + wrong on
  "trick" questions from the same topic).

Flag submissions whose response vector matches the GPT signature using a
simple cosine-similarity check. See `anti-ai-playbook.md §4` for the method.

---

## Generation Workflow

When the user asks you to generate an exam:

1. **Confirm scope**: subject, language (en/es), question count, type mix, points, duration.
2. **Draft the YAML bank** at `private/exams/<slug>.yml` (gitignored). Never place
   live exam content in tracked public paths unless the repo is explicitly private.
3. **Apply anti-AI patterns** to every MCQ — verify no longest-answer bias.
4. **Pre-test honeypots**: mentally simulate what GPT would answer for each MCQ;
   ensure the honeypot option is wrong but attractive to GPT.
5. **Include local anchors** in at least 20% of questions.
6. **Balance difficulty**: ~30% easy, ~50% medium, ~20% hard.
7. **Validate HTML**: all `question:` fields must be valid XHTML (for QTI compat).
8. **Export** to `private/exams-out/<slug>/` via `export-exam.sh`; confirm paths are gitignored.

---

## Portability to another course repo

**Full instructions:** `PORTABILITY.md` (copy checklist, `.gitignore` snippet, setup).

Summary:

1. Copy `.cursor/skills/exam-forge/` and `.cursor/rules/exam-authoring.mdc` to the target repo.
2. Paste `templates/gitignore-snippet.txt` into the target `.gitignore`.
3. Run `npm install` in `exam-forge/scripts/`.
4. Use `private/exams/` + `private/exams-out/` in every course (or equivalent gitignored paths).

Symlink option: `~/.cursor/skills/exam-forge` → shared pack across repos.

Legacy: `web-foundations/private/*.yml` in this repo remains valid; new banks go in `private/exams/`.

---

## Pack layout

```
exam-forge/
├── SKILL.md
├── PORTABILITY.md
├── reference.md
├── anti-ai-playbook.md
├── BLACKBOARD-QTI-RULES.md
├── templates/
│   ├── gitignore-snippet.txt
│   └── README.md
└── scripts/
    ├── package.json
    ├── README.md
    ├── .gitignore
    ├── export-exam.sh        ← validate + all 4 formats + ZIP
    ├── validate-exam.js      ← schema, points, XHTML, bias, anti-AI
    ├── resolve-path.js
    ├── yaml-to-moodle-xml.js
    ├── yaml-to-gift.js
    ├── yaml-to-qti.js
    └── yaml-to-bb-txt.js
```

---

## Supporting files

| File | Content |
|------|---------|
| `reference.md` | Complete format specs: YAML schema, Moodle XML, GIFT, Blackboard TXT, QTI 2.1 |
| `anti-ai-playbook.md` | Detailed anti-AI techniques, honeypot design, statistical fingerprinting |
| `PORTABILITY.md` | Copy this pack to another course repo |
| `templates/gitignore-snippet.txt` | Lines to add to `.gitignore` |
| `scripts/validate-exam.js` | Schema, points, XHTML, bias, and anti-AI linter |
| `scripts/export-exam.sh` | Validate + 4-format export + Blackboard ZIP |
| `scripts/yaml-to-*.js` | Individual exporters (Moodle XML, GIFT, QTI, Bb TXT) |
| `BLACKBOARD-QTI-RULES.md` | QTI packaging rules for Blackboard Ultra |
