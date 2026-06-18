# Exam Forge — Export Scripts

Validator + 4-format LMS exporter. Single dependency: `js-yaml`.

> **Portability:** See `../PORTABILITY.md` — copy `exam-forge/` to any course repo.
> **Git:** Write exports under `private/exams-out/` (never commit to public repos).

## Setup (once per machine or repo)

```bash
cd .cursor/skills/exam-forge/scripts
npm install
mkdir -p private/exams private/exams-out   # from repo root
```

## Full pipeline (recommended)

```bash
# validate + export all 4 formats + Blackboard ZIP
.cursor/skills/exam-forge/scripts/export-exam.sh private/exams/my-exam.yml
```

Outputs in `private/exams-out/my-exam/`:

| File | Format | LMS |
|------|--------|-----|
| `my-exam-moodle.xml` | Moodle XML | Moodle |
| `my-exam.gift.txt` | GIFT | Moodle |
| `my-exam-qti/` | IMS QTI 2.1 | Blackboard Ultra |
| `my-exam-qti.zip` | ZIP (auto-created) | Blackboard Ultra |
| `my-exam-bb-pool.txt` | Tab-delimited | Blackboard (pool upload) |

## Selective modes

```bash
./export-exam.sh exam.yml --validate-only     # lint only, no export
./export-exam.sh exam.yml --moodle-only       # validate + Moodle XML
./export-exam.sh exam.yml --gift-only         # validate + GIFT
./export-exam.sh exam.yml --qti-only          # validate + QTI + ZIP
./export-exam.sh exam.yml --bb-txt-only       # validate + Blackboard TXT
./export-exam.sh exam.yml --skip-validation   # export without validation
```

## Individual scripts

```bash
node validate-exam.js --input=exam.yml [--strict]
node yaml-to-moodle-xml.js --input=exam.yml --output=out.xml
node yaml-to-gift.js --input=exam.yml --output=out.gift.txt
node yaml-to-qti.js --input=exam.yml --outdir=exam-qti
node yaml-to-bb-txt.js --input=exam.yml --output=out-bb-pool.txt
```

## Files

| Script | Output |
|--------|--------|
| `validate-exam.js` | Schema, points, XHTML, longest-answer bias, anti-AI coverage |
| `yaml-to-moodle-xml.js` | Moodle quiz XML |
| `yaml-to-gift.js` | Moodle GIFT plain text |
| `yaml-to-qti.js` | IMS QTI 2.1 package |
| `yaml-to-bb-txt.js` | Blackboard tab-delimited pool |
| `export-exam.sh` | All of the above + Blackboard ZIP |
| `resolve-path.js` | Shared cwd-first path resolution |

Blackboard packaging rules: `../BLACKBOARD-QTI-RULES.md`

## Validation checks

**Errors** (block export):
- Missing `metadata`, `categories`, `questions`
- Missing `metadata.language`
- Missing required fields on questions (`id`, `category`, `type`, `name`, `points`, `question`)
- Unknown question types
- Orphan category references
- Duplicate question IDs
- Malformed XHTML (unclosed tags, unescaped `&`)
- Missing `answers[]` on MCQ/TF, `subquestions[]` on matching, `groups[]` on gapselect
- No correct answer (fraction > 0)

**Warnings** (export continues):
- `metadata.total_points` vs actual sum mismatch
- MCQ longest-answer bias (correct answer >15% longer than next)
- Local-anchor coverage < 20%
- Missing answer feedback
- Essays without grader_info rubric

`--strict` mode treats warnings as errors.

## Portability

```bash
cp -r .cursor/skills/exam-forge /other-repo/.cursor/skills/
cp .cursor/rules/exam-authoring.mdc /other-repo/.cursor/rules/
# Add ../templates/gitignore-snippet.txt lines to /other-repo/.gitignore
cd /other-repo/.cursor/skills/exam-forge/scripts && npm install
mkdir -p /other-repo/private/exams /other-repo/private/exams-out
```

Full checklist: `../PORTABILITY.md`
