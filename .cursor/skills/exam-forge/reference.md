# Exam Forge — Format Reference

Complete specifications for all supported input and output formats.

> **Portability:** Copy this pack to another course repo — see `PORTABILITY.md`.
> **Git:** Store YAML in `private/exams/`; export to `private/exams-out/` (gitignored).
> Add `templates/gitignore-snippet.txt` to the repo `.gitignore`.

---

## 1. YAML Bank (source of truth)

### Minimal valid bank

```yaml
metadata:
  title: 'Midterm Quiz'
  course: '25/26-GDFS-FEI'
  duration_minutes: 60
  total_points: 50
  language: en
  date_created: '2026-05-18'
  author: 'Instructor Name'

categories:
  - id: fundamentals
    name: 'Web Fundamentals'
    description: 'HTML, CSS, JS basics'

questions:
  - id: q001
    category: fundamentals
    type: multichoice
    name: 'Semantic HTML'
    points: 2
    single: true
    shuffleanswers: true
    question: |
      <p>Which element is most semantically appropriate for a site-wide navigation bar?</p>
    answers:
      - text: '<nav>'
        fraction: 100
        feedback: 'Correct — <nav> is the semantic landmark for navigation.'
      - text: '<div class="nav">'
        fraction: 0
        feedback: '<div> has no semantic meaning.'
      - text: '<header> containing a list of anchor elements without <nav>'
        fraction: 0
        feedback: 'A <header> can contain nav, but alone lacks navigation semantics.'
      - text: '<section aria-label="navigation"> with role="navigation" added manually'
        fraction: 0
        feedback: 'Redundant — use the native <nav> element instead of ARIA workarounds.'
```

### Question type templates

#### multichoice (single correct)

```yaml
- id: q010
  category: cat-id
  type: multichoice
  name: 'Title'
  points: 2
  single: true
  shuffleanswers: true
  question: |
    <p>Stem in HTML.</p>
  answers:
    - text: 'Correct option'
      fraction: 100
      feedback: 'Why correct.'
    - text: 'Distractor 1'
      fraction: 0
      feedback: 'Why wrong.'
    - text: 'Distractor 2'
      fraction: 0
      feedback: 'Why wrong.'
    - text: 'Distractor 3'
      fraction: 0
      feedback: 'Why wrong.'
```

#### multichoice (multiple correct)

```yaml
- id: q020
  category: cat-id
  type: multichoice
  name: 'Select all that apply'
  points: 3
  single: false
  shuffleanswers: true
  question: |
    <p>Which of the following are true? (Select ALL correct answers)</p>
  answers:
    - text: 'Correct A'
      fraction: 50
      feedback: 'Explanation.'
    - text: 'Correct B'
      fraction: 50
      feedback: 'Explanation.'
    - text: 'Wrong C'
      fraction: -50
      feedback: 'Explanation.'
    - text: 'Wrong D'
      fraction: -50
      feedback: 'Explanation.'
```

Fraction values for multi-correct must sum to 100 for all correct answers.
Negative fractions penalize wrong selections.

#### truefalse

Two patterns are accepted. The `answers[]` pattern is preferred for new banks:

```yaml
# Pattern A — answers[] with fraction (preferred, consistent with MCQ)
- id: q030
  category: cat-id
  type: truefalse
  name: 'Statement check'
  points: 1
  question: |
    <p><code>Array.prototype.map()</code> modifies the original array.</p>
  answers:
    - text: 'True'
      fraction: 0
      feedback: 'map() returns a new array without mutating the original.'
    - text: 'False'
      fraction: 100
      feedback: 'Correct — map() is non-mutating.'
```

```yaml
# Pattern B — correct: bool + feedback_true/feedback_false (legacy, still supported)
- id: q031
  category: cat-id
  type: truefalse
  name: 'staleTime vs gcTime'
  points: 1
  correct: false
  question: |
    <p>staleTime and gcTime mean the same thing in React Query v5.</p>
  feedback_true: 'Incorrect: staleTime controls freshness; gcTime controls GC.'
  feedback_false: 'Correct: they are distinct concepts.'
```

#### matching

```yaml
- id: q040
  category: cat-id
  type: matching
  name: 'Match hooks to purposes'
  points: 3
  question: |
    <p>Match each React hook with its primary purpose:</p>
  subquestions:
    - premise: 'useState'
      answer: 'Local component state'
    - premise: 'useEffect'
      answer: 'Side effects after render'
    - premise: 'useRef'
      answer: 'Mutable value that persists across renders without triggering re-render'
    - premise: 'useMemo'
      answer: 'Memoize expensive computation result'
```

#### essay

```yaml
- id: p001
  category: cat-id
  type: essay
  name: 'Architecture reflection'
  points: 10
  question: |
    <p><strong>Describe your project architecture.</strong></p>
    <ul>
      <li>How did you organize services?</li>
      <li>What patterns did you apply?</li>
    </ul>
    <p><em>Include code snippets. Write at least 3 paragraphs.</em></p>
  response_lines: 20
  grader_info: |
    <p>Look for: separation of concerns, concrete examples, code evidence.</p>
```

#### gapselect (Moodle only)

```yaml
- id: q050
  category: cat-id
  type: gapselect
  name: 'Fill the blanks'
  points: 2
  question: |
    <p>The hook [[1]] lets you read URL parameters, while [[2]] lets you
    navigate programmatically.</p>
  groups:
    - group: 1
      options: ['useParams', 'useLocation']
    - group: 2
      options: ['useNavigate', 'useSearchParams']
```

**Warning**: `gapselect` degrades to essay in QTI export. Moodle XML handles it natively.

---

## 2. Moodle XML Format

### Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<quiz>
  <!-- Category header -->
  <question type="category">
    <category>
      <text>$course$/top/Category Name</text>
    </category>
  </question>

  <!-- Multiple choice (single) -->
  <question type="multichoice">
    <name><text>Question Title</text></name>
    <questiontext format="html">
      <text><![CDATA[<p>Question stem HTML</p>]]></text>
    </questiontext>
    <defaultgrade>2</defaultgrade>
    <single>true</single>
    <shuffleanswers>1</shuffleanswers>
    <answer fraction="100" format="html">
      <text><![CDATA[Correct answer text]]></text>
      <feedback format="html">
        <text><![CDATA[Why correct]]></text>
      </feedback>
    </answer>
    <answer fraction="0" format="html">
      <text><![CDATA[Wrong answer text]]></text>
      <feedback format="html">
        <text><![CDATA[Why wrong]]></text>
      </feedback>
    </answer>
  </question>

  <!-- True/False -->
  <question type="truefalse">
    <name><text>Title</text></name>
    <questiontext format="html">
      <text><![CDATA[<p>Statement</p>]]></text>
    </questiontext>
    <defaultgrade>1</defaultgrade>
    <answer fraction="100" format="moodle_auto_format">
      <text>false</text>
      <feedback format="html">
        <text><![CDATA[Explanation]]></text>
      </feedback>
    </answer>
    <answer fraction="0" format="moodle_auto_format">
      <text>true</text>
      <feedback format="html">
        <text><![CDATA[Explanation]]></text>
      </feedback>
    </answer>
  </question>

  <!-- Matching -->
  <question type="matching">
    <name><text>Title</text></name>
    <questiontext format="html">
      <text><![CDATA[<p>Match prompt</p>]]></text>
    </questiontext>
    <defaultgrade>3</defaultgrade>
    <shuffleanswers>1</shuffleanswers>
    <subquestion format="html">
      <text><![CDATA[Left side]]></text>
      <answer><text>Right side</text></answer>
    </subquestion>
  </question>

  <!-- Essay -->
  <question type="essay">
    <name><text>Title</text></name>
    <questiontext format="html">
      <text><![CDATA[<p>Essay prompt</p>]]></text>
    </questiontext>
    <defaultgrade>10</defaultgrade>
    <responseformat>editor</responseformat>
    <responserequired>1</responserequired>
    <responsefieldlines>20</responsefieldlines>
    <graderinfo format="html">
      <text><![CDATA[<p>Rubric for graders</p>]]></text>
    </graderinfo>
  </question>
</quiz>
```

### Import path

*Site administration → Question bank → Import → Moodle XML format* → upload `.xml`.

---

## 3. Moodle GIFT Format

GIFT is plain text. More compact than XML but limited to simple formatting.

### Syntax

```
// Comment line — not imported

// Category
$CATEGORY: $course$/top/Web Fundamentals

// Multiple choice (single correct)
::Question Title:: Which element is for navigation? {
  =<nav>  // correct
  ~<div class\="nav">  // wrong (escape special chars)
  ~<header>
  ~<section>
}

// Multiple choice with feedback
::Title:: Question stem {
  =Correct answer # Feedback for correct
  ~Wrong 1 # Feedback for wrong 1
  ~Wrong 2 # Feedback for wrong 2
}

// Multiple choice with weights
::Title:: Select all correct {
  ~%50%Option A
  ~%50%Option B
  ~%-50%Option C (wrong)
  ~%-50%Option D (wrong)
}

// True/False
::Statement:: The DOM is a Web API, not part of JavaScript. {TRUE}

// Short answer
::Title:: What does CSS stand for? {=Cascading Style Sheets =cascading style sheets}

// Matching
::Title:: Match hooks to purposes {
  =useState -> Local state
  =useEffect -> Side effects
  =useRef -> Persistent mutable ref
}

// Numerical
::Title:: What is 2^10? {#1024:0}

// Essay
::Title:: Describe your architecture. {}
```

### Special character escaping

These characters must be escaped with `\` inside answer text:
`~`, `=`, `#`, `{`, `}`, `:`

### Limitations

- No HTML in stems or answers (plain text only, though Moodle renders basic formatting).
- No images.
- No `gapselect`.
- No per-answer HTML feedback (only plain text after `#`).
- No grader rubrics for essays.

### Import path

*Question bank → Import → GIFT format* → upload `.txt` file (UTF-8).

---

## 4. Blackboard Tab-Delimited TXT (Pool Upload)

One question per line. Fields separated by TAB (`\t`). No header row. No blank lines.

### Row formats by type

**MC — Multiple Choice**
```
MC\tQuestion text\tOption A\tcorrect\tOption B\tincorrect\tOption C\tincorrect\tOption D\tincorrect
```

**MA — Multiple Answer**
```
MA\tQuestion text\tOption A\tcorrect\tOption B\tcorrect\tOption C\tincorrect
```

**TF — True/False**
```
TF\tStatement text\ttrue
TF\tAnother statement\tfalse
```

**ESS — Essay**
```
ESS\tDescribe your project architecture.
```

**MAT — Matching**
```
MAT\tMatch these items\tLeft 1\tRight 1\tLeft 2\tRight 2\tLeft 3\tRight 3
```

**ORD — Ordering**
```
ORD\tArrange in correct order\tFirst\tSecond\tThird\tFourth
```

**FIB — Fill in the Blank**
```
FIB\tCSS stands for ___.\tCascading Style Sheets
```

### Rules

- Answer correctness labels MUST be in English: `correct`, `incorrect`, `true`, `false`.
- Maximum 500 questions per file.
- UTF-8 encoding.
- No HTML in question text (plain text only).
- No blank lines between questions.

### Import path

*Tests, Surveys, and Pools → Pools → Build Pool → Upload Questions* → select `.txt`.

---

## 5. IMS QTI 2.1 (Blackboard Ultra Import)

Full packaging rules are in `BLACKBOARD-QTI-RULES.md`. Key points:

### Package structure

```
exam-qti/
├── imsmanifest.xml        ← MUST be at ZIP root
├── assessment.xml          ← test wrapper (required)
└── items/
    ├── q001.xml
    ├── q002.xml
    └── ...
```

### Namespace (critical)

```xml
xmlns="http://www.imsglobal.org/xsd/imsqti_v2p1"
```

Never use `imsqtiasi_v2p1` — Blackboard rejects it.

### Supported types

| YAML type | QTI interaction | Notes |
|-----------|----------------|-------|
| multichoice | `choiceInteraction` | `maxChoices` from correct count |
| truefalse | `choiceInteraction` (2 choices) | "True" / "False" or localized |
| essay | `extendedTextInteraction` | `responseProcessing` = null |
| matching | `matchInteraction` + `directedPair` | Shuffle enabled |
| gapselect | **Degrades to essay** | No QTI equivalent |

### Validation

```bash
for f in exam-qti/**/*.xml exam-qti/*.xml; do
  xmllint --noout "$f" && echo "OK: $f" || echo "ERROR: $f"
done
```

### ZIP creation

```bash
cd exam-qti && zip -r ../exam-qti.zip . && cd ..
# Verify: imsmanifest.xml must appear at root level
unzip -l exam-qti.zip | head -8
```

---

## 6. Running the bundled exporters

Scripts live in `exam-forge/scripts/`. Install once:

```bash
cd .cursor/skills/exam-forge/scripts && npm install
mkdir -p private/exams private/exams-out
```

**Recommended** — bank in gitignored source dir, exports to gitignored output dir:

```bash
.cursor/skills/exam-forge/scripts/export-exam.sh private/exams/my-exam.yml
# → private/exams-out/my-exam/my-exam-moodle.xml
# → private/exams-out/my-exam/my-exam-qti/
```

Manual paths (paths are relative to `cwd`):

```bash
node .cursor/skills/exam-forge/scripts/yaml-to-moodle-xml.js \
  --input=private/exams/my-exam.yml \
  --output=private/exams-out/my-exam/my-exam-moodle.xml
node .cursor/skills/exam-forge/scripts/yaml-to-qti.js \
  --input=private/exams/my-exam.yml \
  --outdir=private/exams-out/my-exam/my-exam-qti
```

See `scripts/README.md`, `PORTABILITY.md`, and `BLACKBOARD-QTI-RULES.md` for ZIP and validation.

---

## 7. Format Selection Guide

| Need | Best format | Why |
|------|-------------|-----|
| Moodle with rich HTML, images, gapselect | Moodle XML | Full feature support |
| Moodle quick MCQ/TF pool | GIFT | Faster to author, smaller files |
| Blackboard Ultra full exam | QTI 2.1 ZIP | Native import, preserves structure |
| Blackboard quick pool upload | Tab-delimited TXT | Simpler, no XML |
| Dual LMS support | YAML → both scripts | Single source, dual export |
| Archival / version control | YAML | Human-readable, diffable |
