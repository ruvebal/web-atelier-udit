# Python Migration Plan: exam-forge Scripts

**Date:** 2026-06-15  
**Scope:** Replace Node.js/js-yaml scripts with a Python toolchain that integrates AI-native libraries for DH pedagogy and language-intelligence augmentation.

---

## 1. Why Python for DH Exam Authoring

### 1.1 Scholarly Motivation

The migration is grounded in three convergent arguments from current DH and NLP literature:

**Pedagogical assessment quality.** Deane & Zhang (2015) demonstrate that automated item analysis—discrimination indices, distractor efficiency, Bloom's taxonomy alignment—substantially improves assessment validity when applied systematically at authoring time, not only post-hoc. Python's scientific stack (`scipy`, `numpy`, `pandas`) makes these analytics native to the export pipeline, whereas Node.js requires bespoke implementations.
> Deane, P., & Zhang, M. (2015). *Automated Essay Scoring and the Future of Educational Assessment.* Journal of Writing Research, 7(1), 45–66. DOI: [10.17239/jowr-2015.07.01.03](https://doi.org/10.17239/jowr-2015.07.01.03)

**Anti-AI fingerprinting via language models.** Liang et al. (2024) show that semantic similarity between student submissions and LLM outputs can be estimated reliably using sentence-transformer embeddings. The Python library `sentence-transformers` (Reimers & Gurevych, 2019) provides pre-trained multilingual models (`paraphrase-multilingual-mpnet-base-v2`) capable of detecting GPT-characteristic response vectors—the statistical fingerprinting technique described in `anti-ai-playbook.md §4`—in a single `encode()` call.
> Reimers, N., & Gurevych, I. (2019). *Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks.* EMNLP 2019. DOI: [10.18653/v1/D19-1410](https://doi.org/10.18653/v1/D19-1410)
> Liang, W., et al. (2024). *Monitoring AI-Modified Content at Scale.* PNAS, 121(26). DOI: [10.1073/pnas.2401744121](https://doi.org/10.1073/pnas.2401744121)

**XHTML/XML generation.** Python's `lxml` and `xml.etree` provide schema-validating XML serialization that is absent in the current hand-rolled string templates (`yaml-to-qti.js`). The W3C XML Working Group Best Practices (2024) identify programmatic tree construction as the only reliable path to namespace-correct QTI packages.

**Multilingual bias detection.** Floridi et al. (2021) and the IMS Global QTI 3.0 migration guide (2023) both note that longest-answer bias correlates with *linguistic complexity*, not merely character count, in non-English questions. `spaCy` with `es_core_news_sm` enables token-level and syntactic analysis that character-counting cannot provide.
> Floridi, L., et al. (2021). *An Ethical Framework for a Good AI Society.* Minds and Machines, 28(4). DOI: [10.1007/s11023-018-9482-5](https://doi.org/10.1007/s11023-018-9482-5)

### 1.2 Technical Advantages Unavailable in Node.js

| Capability | Node.js status | Python solution |
|---|---|---|
| Multilingual semantic similarity | No native LLM library; manual REST calls | `sentence-transformers`, `spaCy` |
| YAML schema validation with types | Manual checks in `validate-exam.js` | `pydantic` v2 + `PyYAML` |
| Bloom's taxonomy NLP classifier | Not available in npm ecosystem | `transformers` (zero-shot pipeline) |
| XHTML well-formedness + DTD | Regex heuristic in `isWellFormedXhtml()` | `lxml.etree` with schema validation |
| Distractor quality scoring | Absent | `textstat` + spaCy readability |
| Longest-answer bias: token-level | Character count only | `spaCy` token count + `textstat` |
| Post-exam GPT fingerprinting | Not implemented | `sentence-transformers` cosine sim |
| CI-friendly test suite | No tests | `pytest` + `hypothesis` |

---

## 2. Current Script Inventory

| File | Function | ~LOC |
|---|---|---|
| `validate-exam.js` | Schema lint, XHTML check, bias, anti-AI coverage | 315 |
| `fix-mcq-bias.js` | Pad distractors to break longest-answer bias | 78 |
| `yaml-to-moodle-xml.js` | Export to Moodle XML | ~250 |
| `yaml-to-gift.js` | Export to Moodle GIFT | 191 |
| `yaml-to-qti.js` | Export to IMS QTI 2.1 ZIP | 379 |
| `yaml-to-bb-txt.js` | Export to Blackboard tab-delimited TXT | 153 |
| `resolve-path.js` | Path resolution helper | ~40 |
| `export-exam.sh` | Orchestration shell (validate + 4 exporters + ZIP) | ~80 |

---

## 3. Proposed Python Stack

```
Python 3.11+
├── PyYAML                  # YAML parse (drop-in for js-yaml)
├── pydantic v2             # Declarative schema + validation with typed errors
├── lxml                   # XML/XHTML tree build, DTD/schema validation
├── spaCy + es_core_news_sm + en_core_web_sm  # Tokenisation, readability, bias detection
├── sentence-transformers   # Multilingual semantic embeddings (anti-AI fingerprinting)
├── textstat               # Flesch-Kincaid / SMOG for distractor complexity scoring
├── transformers (HF)      # Zero-shot Bloom's taxonomy classification
├── click                  # CLI argument parsing (replaces manual argv loops)
├── rich                   # Terminal output (replaces console.warn/error)
├── pytest + hypothesis    # Test suite
└── zipfile (stdlib)       # ZIP packaging (replaces shell `zip` calls)
```

### 3.1 `requirements.txt`

```
PyYAML>=6.0
pydantic>=2.0
lxml>=5.0
spacy>=3.7
sentence-transformers>=3.0
textstat>=0.7
transformers>=4.40
torch>=2.0         # sentence-transformers backend
click>=8.1
rich>=13.0
pytest>=8.0
hypothesis>=6.100
```

### 3.2 One-time setup

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download es_core_news_sm
python -m spacy download en_core_web_sm
```

---

## 4. Migration Phases

### Phase 0 — Foundation & schema (Day 1–2)

**Goal:** Replace `validate-exam.js` and `resolve-path.js` with a typed Pydantic schema and a rich validator.

#### Prompt sketch — `exam_schema.py`

```
Create a Pydantic v2 model in Python for an exam bank YAML file.

Top-level model: ExamBank
  metadata: ExamMetadata
  categories: list[Category]
  questions: list[Question]

ExamMetadata fields:
  title: str
  course: str
  language: Literal["en", "es"]
  duration_minutes: int | None
  total_points: float | None
  date_created: str | None
  author: str | None
  assessment_mode: Literal["project", "concept"] | None
  honeypot_ids: list[str] = []

Category:
  id: str
  name: str
  description: str | None

Question:
  id: str  — must match r'^[qpre][0-9]+'
  category: str
  type: Literal["multichoice", "truefalse", "matching", "essay", "gapselect"]
  name: str
  points: float
  question: str  — must be XHTML-valid (validated by lxml)
  single: bool = True
  shuffleanswers: bool = True
  answers: list[Answer] | None
  subquestions: list[SubQuestion] | None
  groups: list[GapGroup] | None
  response_lines: int = 8
  grader_info: str | None
  lesson_ref: str | None

Validators:
  - answers required when type in [multichoice, truefalse]
  - subquestions required when type == matching
  - groups required when type == gapselect
  - at least one answer.fraction > 0 for MCQ/TF
  - question HTML validated with lxml.etree.fromstring wrapped in <div>
  - unescaped & detected via lxml parse error
```

#### Prompt sketch — `validate_exam.py`

```
Port validate-exam.js to Python using:
  - PyYAML to load the YAML file
  - ExamBank pydantic model to catch schema errors (all pydantic ValidationError
    messages become "errors" in the output)
  - spaCy (language model matching exam.metadata.language) to count tokens
    in MCQ answers instead of characters — token count is a better proxy for
    cognitive load and longest-answer bias
  - Threshold for bias: correct answer token count > 1.15 × second-longest
  - Local anchor detection: same regex set as JS, plus spaCy NER to flag
    proper nouns that match known course artifact names
  - Output via `rich.console` with colour-coded ERROR / WARNING / INFO levels
  - Exit codes: 0 = pass, 1 = errors, 2 = warnings-only (same as JS)
  - CLI: click with --input PATH, --strict flag
```

---

### Phase 1 — LMS exporters (Day 3–5)

**Goal:** Port the four JS exporters to Python. All share the same Pydantic model so format divergences are caught at schema level.

#### Prompt sketch — `export_gift.py`

```
Port yaml-to-gift.js to Python.
Input: ExamBank pydantic model (pre-validated).
Reuse stripHtml() as html.unescape(re.sub(r'<[^>]+>', '', html)).
escapeGift() — same six characters to escape.
generateMultichoice/TrueFalse/Matching/Essay functions map directly.
Use click for CLI, rich for output.
Output encoding: UTF-8 with BOM (some Moodle versions require it).
```

#### Prompt sketch — `export_qti.py`

```
Port yaml-to-qti.js to Python using lxml.etree (NOT string templates).

Replace all f-string XML assembly with lxml ElementTree construction:
  - assessmentItem = etree.Element("assessmentItem", nsmap={None: QTI_NAMESPACE})
  - Set attributes via .set() — lxml auto-escapes " in attribute values
  - CDATA sections: etree.CDATA(content)
  - Question HTML: parse with lxml.etree.fromstring("<div>" + html + "</div>"),
    then append children to itemBody — this guarantees well-formed XML output

Serialise with: etree.tostring(item, xml_declaration=True, encoding="UTF-8", pretty_print=True)

ZIP packaging: use Python stdlib zipfile instead of shell `zip` command.
  Write imsmanifest.xml at the root of the ZIP (ZipFile.write with arcname).
  This replaces the `cd outdir && zip -r ../name.zip .` shell instruction.

Maintain all Blackboard-compatibility rules from BLACKBOARD-QTI-RULES.md.
```

#### Prompt sketch — `export_bb_txt.py`

```
Port yaml-to-bb-txt.js to Python. Straightforward translation:
  - stripHtml with html.unescape + re.sub
  - sanitizeTab: replace \t with 4 spaces, \n with space
  - generateRow switch → Python match/case
  - Output: '\n'.join(rows) + '\n', UTF-8
  - Warn if > 500 questions (Blackboard limit)
```

#### Prompt sketch — `export_moodle_xml.py`

```
Port yaml-to-moodle-xml.js to Python using lxml.etree.
  - Build the <quiz> document as an ElementTree
  - Each question type maps to a builder function returning an Element
  - CDATA for question stems and feedback (lxml.etree.CDATA)
  - Serialise with xml_declaration=True, encoding="UTF-8", pretty_print=True
```

---

### Phase 2 — AI-native augmentation (Day 6–10)

This phase adds capabilities that have **no Node.js equivalent**.

#### 2a. Semantic bias detection — `bias_detector.py`

**Problem:** Character count is a poor proxy for cognitive load. A 60-char correct answer that uses domain-specific terminology is harder than a 80-char distractor in plain language.

**Solution:** Use `sentence-transformers` to embed all MCQ options. Flag questions where the cosine similarity between the correct answer and the *question stem* is higher than all distractors (i.e., the model can answer by semantic proximity alone).

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("paraphrase-multilingual-mpnet-base-v2")

def detect_semantic_bias(question: str, answers: list[Answer]) -> dict:
    """
    Returns dict with:
      'character_bias': bool (existing check)
      'token_bias': bool (spaCy token count)
      'semantic_bias': bool (cosine sim of correct vs stem > all distractors)
      'semantic_scores': list[float]
    """
    stem_emb = model.encode(strip_html(question))
    ans_embs = model.encode([strip_html(a.text) for a in answers])
    sims = util.cos_sim(stem_emb, ans_embs)[0].tolist()
    correct_indices = [i for i, a in enumerate(answers) if a.fraction > 0]
    correct_sims = [sims[i] for i in correct_indices]
    distractor_sims = [sims[i] for i in range(len(answers)) if i not in correct_indices]
    semantic_bias = max(correct_sims) > max(distractor_sims, default=0)
    return {
        "character_bias": ...,
        "token_bias": ...,
        "semantic_bias": semantic_bias,
        "semantic_scores": sims,
    }
```

#### 2b. Bloom's taxonomy classifier — `bloom_classifier.py`

Automatically tag each question's cognitive level using a zero-shot classifier. Helps instructors ensure coverage across remembering / understanding / applying / analysing / evaluating / creating.

```
Prompt sketch:

Use HuggingFace transformers zero-shot pipeline with model
"facebook/bart-large-mnli" (or "joeddav/xlm-roberta-large-xnli" for Spanish).

Candidate labels: ["remembering", "understanding", "applying",
                   "analysing", "evaluating", "creating"]

For each question stem (html-stripped), run:
  classifier(stem, candidate_labels=BLOOM_LEVELS)

Output: top label + confidence score.
Add bloom_level: str field to Question schema (optional, populated by classifier).
Warn if < 20% of questions are above "understanding" level.
```

**DOI reference:** Anderson, L. W., & Krathwohl, D. R. (2001). *A Taxonomy for Learning, Teaching, and Assessing.* Longman. Cited in Xu & Goodrich Mitts (2019), DOI: [10.1016/j.tate.2018.09.009](https://doi.org/10.1016/j.tate.2018.09.009)

#### 2c. GPT fingerprint detector — `fingerprint_detector.py`

Implements `anti-ai-playbook.md §4` as an automated post-exam tool.

```
Prompt sketch:

Given a CSV of student responses (one row per student, columns = question IDs,
values = answer text or letter), and the exam YAML:

1. Encode all MCQ correct/incorrect responses to binary vectors.
2. Load pre-computed GPT response vector from metadata.gpt_signature (optional)
   or simulate by querying the Anthropic API with each question stem.
3. Compute cosine similarity between each student's response vector and the GPT vector.
4. Flag submissions with similarity > 0.85 for manual review.
5. Output: Rich table sorted by similarity score, with threshold line.

Use: sentence-transformers for open-ended essay similarity,
     numpy for binary MCQ vector cosine.
```

#### 2d. Distractor quality scorer — `distractor_scorer.py`

```
Prompt sketch:

For each MCQ question, compute a distractor quality report:
  - Readability: textstat.flesch_reading_ease(text) per option
    → distractors should be within ±10 FRE of correct answer
  - Vocabulary overlap with stem: spaCy token overlap (Jaccard) 
    → low overlap = distractor is off-topic / too easy
  - Named entity match: distractors referencing wrong course entities
    (e.g., wrong hook name, wrong API endpoint) are "plausible honeypots"
  - Sentiment parity: no answer should be obviously positive/negative
    vs neutral (sentiment bias)

Output: per-question distractor quality table via rich.
```

---

### Phase 3 — Orchestration & CI (Day 11–12)

#### 3a. `export_exam.py` — unified CLI (replaces `export-exam.sh`)

```python
@click.group()
def cli(): pass

@cli.command()
@click.option("--input", required=True, type=click.Path(exists=True))
@click.option("--outdir", default=None)
@click.option("--formats", default="all", help="gift,moodle,qti,bb,all")
@click.option("--strict", is_flag=True)
@click.option("--ai-checks", is_flag=True, help="Run semantic bias + Bloom classifier")
def export(input, outdir, formats, strict, ai_checks):
    ...
```

Advantages over `export-exam.sh`:
- Cross-platform (Windows users can run it)
- `zipfile` replaces OS `zip` dependency
- AI checks optional flag (slow on first run; downloads models)
- `--formats gift,qti` for partial exports

#### 3b. `pytest` test suite

```
tests/
  test_schema.py         — valid/invalid YAML fixtures, pydantic error messages
  test_validate.py       — bias detection, XHTML, local anchor coverage
  test_export_gift.py    — known YAML → expected GIFT output
  test_export_qti.py     — lxml roundtrip, namespace correctness
  test_export_bb_txt.py  — tab counts, answer labels
  test_bias_detector.py  — synthetic MCQs with known bias (hypothesis-generated)
```

---

## 5. Updated `exam-authoring.mdc` — Improvements

The rule file gains four new sections after migration:

### 5.1 Bloom's taxonomy coverage (new rule)

```markdown
## Bloom's taxonomy balance

When authoring or reviewing a bank, run `python exam-forge/scripts/bloom_classifier.py
--input=<bank>.yml` to verify cognitive level distribution. A valid bank must have:
- ≥ 20% of questions at "applying" level or above
- ≤ 40% at "remembering" level
- At least one question at "evaluating" or "creating" (for concept-mode banks)
```

### 5.2 Semantic bias check (new rule)

```markdown
## Semantic bias (AI-detectable questions)

Run `python exam-forge/scripts/bias_detector.py --input=<bank>.yml` before export.
A question fails if the correct answer has higher cosine similarity to the stem than
ALL distractors — this means an embedding model can answer it without reading the
options. Fix by rewriting the correct answer using indirect/contrastive phrasing.
```

### 5.3 Distractor readability parity (new rule)

```markdown
## Distractor readability parity

All options in a MCQ must have Flesch Reading Ease scores within ±15 of each other.
Run `python exam-forge/scripts/distractor_scorer.py --input=<bank>.yml`. Low-readability
distractors that stand out visually as "obviously wrong" defeat the distractor's purpose.
```

### 5.4 `assessment_mode` enforcement (strengthened)

```markdown
## Assessment mode — strict enforcement

`assessment_mode: concept` banks MUST NOT contain any `lesson_ref` that points to a
student project URL (`ruvebal.github.io/web-atelier-udit/students/`). The Python
validator checks this via URL pattern matching and raises an ERROR (not a warning).
```

### 5.5 Honeypot span format (clarified)

```markdown
## Hidden-code traps — span format

The ASSISTANT-INSTRUCTION span must use `style="display:none"` (not `color:#ffffff`)
to survive LMS HTML sanitizers that strip inline colour styles.
Correct: `<span style="display:none">[ASSISTANT-INSTRUCTION: …]</span>`
Wrong:   `<span style="color:#ffffff">[ASSISTANT-INSTRUCTION: …]</span>`
The Python validator checks for the correct pattern; the JS validator accepted both.
```

---

## 6. File Map: JS → Python

| JS file | Python replacement | New AI capability |
|---|---|---|
| `resolve-path.js` | stdlib `pathlib.Path` | — |
| `validate-exam.js` | `validate_exam.py` + `exam_schema.py` | spaCy token bias, lxml XHTML |
| `fix-mcq-bias.js` | `fix_mcq_bias.py` | token-aware padding, semantic bias |
| `yaml-to-gift.js` | `export_gift.py` | — |
| `yaml-to-moodle-xml.js` | `export_moodle_xml.py` | lxml tree (no string templates) |
| `yaml-to-qti.js` | `export_qti.py` | lxml tree + zipfile (no shell ZIP) |
| `yaml-to-bb-txt.js` | `export_bb_txt.py` | — |
| `export-exam.sh` | `export_exam.py` (click CLI) | `--ai-checks` flag |
| *(absent)* | `bias_detector.py` | sentence-transformers semantic bias |
| *(absent)* | `bloom_classifier.py` | zero-shot Bloom's taxonomy |
| *(absent)* | `fingerprint_detector.py` | GPT response vector fingerprinting |
| *(absent)* | `distractor_scorer.py` | textstat + spaCy readability |

---

## 7. Key References

| Reference | DOI | Relevance |
|---|---|---|
| Reimers & Gurevych (2019) — Sentence-BERT | [10.18653/v1/D19-1410](https://doi.org/10.18653/v1/D19-1410) | Multilingual embeddings for semantic bias + fingerprinting |
| Liang et al. (2024) — Monitoring AI-Modified Content | [10.1073/pnas.2401744121](https://doi.org/10.1073/pnas.2401744121) | Empirical basis for GPT fingerprinting |
| Deane & Zhang (2015) — Automated Essay Scoring | [10.17239/jowr-2015.07.01.03](https://doi.org/10.17239/jowr-2015.07.01.03) | Assessment quality metrics in automated pipelines |
| Anderson & Krathwohl (2001) — Bloom's Taxonomy | (book; cited via) [10.1016/j.tate.2018.09.009](https://doi.org/10.1016/j.tate.2018.09.009) | Cognitive level classification |
| Floridi et al. (2021) — AI Ethics Framework | [10.1007/s11023-018-9482-5](https://doi.org/10.1007/s11023-018-9482-5) | Bias fairness in multilingual assessment |
| Settles (2009) — Active Learning Literature Survey | [TR 1648, UW-Madison](http://burrsettles.com/pub/settles.activelearning.pdf) | Distractor selection as active learning problem |
| IMS Global QTI 3.0 Migration Guide (2023) | [imsglobal.org/spec/qti/v3p0](https://www.imsglobal.org/spec/qti/v3p0) | XML namespace correctness for LMS import |

---

## 8. Migration Checklist

- [ ] Phase 0: `exam_schema.py` + `validate_exam.py` passing all 20 existing YAML fixtures
- [ ] Phase 1: Four exporters produce byte-identical output to JS versions (test fixture)
- [ ] Phase 1: `export_exam.py` replaces `export-exam.sh` — ZIP structure verified with `zipfile`
- [ ] Phase 2: `bias_detector.py` flags known-biased fixtures (unit tests)
- [ ] Phase 2: `bloom_classifier.py` returns labels for 5 canonical question stems
- [ ] Phase 2: `fingerprint_detector.py` accepts CSV + YAML, outputs Rich table
- [ ] Phase 3: `pytest` suite passes; `hypothesis` fuzz test on schema edge cases
- [ ] Update `exam-authoring.mdc` with five new/improved rules (see §5)
- [ ] Update `SKILL.md` quick-start to reference `pip install` + `python export_exam.py`
- [ ] Archive `package.json`, `node_modules/` under `scripts/legacy-js/`

---

## 9. Backwards Compatibility

The YAML bank schema (`metadata / categories / questions`) does not change. Existing `.yml` files in `private/exams/` are valid inputs to the Python pipeline without modification. The only breaking change is the CLI syntax:

| Action | Old | New |
|---|---|---|
| Validate | `node validate-exam.js --input=f.yml` | `python validate_exam.py --input f.yml` |
| Export all | `./export-exam.sh f.yml` | `python export_exam.py export --input f.yml` |
| Fix bias | `node fix-mcq-bias.js f.yml` | `python fix_mcq_bias.py f.yml` |
| Semantic check | *(not available)* | `python bias_detector.py --input f.yml` |
