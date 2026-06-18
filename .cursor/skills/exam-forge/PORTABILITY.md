# Exam Forge — Portability to Another Course Repo

Copy this skill pack once; use it in every course repository that needs Moodle or
Blackboard exams.

---

## 1. What to copy

Copy these paths from the source repo (e.g. `web-atelier-udit`):

```text
.cursor/skills/exam-forge/          ← entire folder (skill + scripts + rules doc)
.cursor/rules/exam-authoring.mdc    ← optional but recommended
```

Minimum contents of `exam-forge/`:

```text
exam-forge/
├── SKILL.md
├── PORTABILITY.md          ← this file
├── reference.md
├── anti-ai-playbook.md
├── BLACKBOARD-QTI-RULES.md
├── templates/
│   └── gitignore-snippet.txt
└── scripts/
    ├── package.json
    ├── .gitignore
    ├── export-exam.sh        ← validate + all 4 formats + ZIP
    ├── validate-exam.js      ← linter (schema, points, XHTML, bias)
    ├── resolve-path.js
    ├── yaml-to-moodle-xml.js
    ├── yaml-to-gift.js
    ├── yaml-to-qti.js
    └── yaml-to-bb-txt.js
```

---

## 2. One-time setup in the target repo

```bash
# From the target course repo root
cp -r /path/to/web-atelier-udit/.cursor/skills/exam-forge .cursor/skills/
cp /path/to/web-atelier-udit/.cursor/rules/exam-authoring.mdc .cursor/rules/

cd .cursor/skills/exam-forge/scripts
npm install
```

Or symlink for a personal install shared across repos:

```bash
ln -s ~/projects/.../web-atelier-udit/.cursor/skills/exam-forge \
  /path/to/other-repo/.cursor/skills/exam-forge
```

---

## 3. Recommended directory layout (gitignored outputs)

**Never commit** generated LMS files or live exam banks to a public repo. Use a
gitignored tree:

```text
your-course-repo/
├── .gitignore                 ← add snippet from templates/gitignore-snippet.txt
├── private/
│   ├── exams/                 ← YAML sources (author here)
│   │   └── midterm-react.yml
│   └── exams-out/             ← generated exports (scripts write here)
│       └── midterm-react/
│           ├── midterm-react-moodle.xml
│           ├── midterm-react-qti/
│           └── midterm-react-qti.zip
└── .cursor/skills/exam-forge/
```

### Add to `.gitignore` in the target repo

Paste from `templates/gitignore-snippet.txt`, or at minimum:

```gitignore
# Exam Forge — banks and LMS exports (sensitive / not for public repos)
private/exams/
private/exams-out/
*-moodle.xml
*-qti/
*-qti.zip
```

If your course uses a different root (e.g. `course-material/private/`), adjust paths
but keep the same **source vs output** split.

---

## 4. Authoring and export commands

```bash
# Create dirs (once)
mkdir -p private/exams private/exams-out

# Author: private/exams/my-exam.yml  (AI skill or hand-written)

# Full pipeline: validate + 4 formats + Blackboard ZIP
.cursor/skills/exam-forge/scripts/export-exam.sh private/exams/my-exam.yml
# → private/exams-out/my-exam/my-exam-moodle.xml
# → private/exams-out/my-exam/my-exam.gift.txt
# → private/exams-out/my-exam/my-exam-qti.zip
# → private/exams-out/my-exam/my-exam-bb-pool.txt

# Validate only (no export)
node .cursor/skills/exam-forge/scripts/validate-exam.js \
  --input=private/exams/my-exam.yml [--strict]

# Override output root
EXAM_FORGE_OUT=private/exams-out \
  .cursor/skills/exam-forge/scripts/export-exam.sh private/exams/my-exam.yml
```

---

## 5. AI agent instructions (Cursor)

After copying the pack, invoke the skill by name or ask:

> "Use exam-forge to create a 60-minute React final in Spanish, anti-AI level high,
> write YAML to `private/exams/`, export to `private/exams-out/`."

The agent should:

1. Read `.cursor/skills/exam-forge/SKILL.md` and `anti-ai-playbook.md`.
2. Write the bank under `private/exams/<slug>.yml`.
3. Run `validate-exam.js --input=...` to lint the bank.
4. Run `export-exam.sh` → all 4 formats + Blackboard ZIP in `private/exams-out/`.
5. **Not** commit `private/exams/` or `private/exams-out/` unless the repo is private and policy allows it.

---

## 6. web-atelier-udit note

This repo already ignores `private/` in `.gitignore`. Existing banks under
`web-foundations/private/*.yml` remain valid; prefer `private/exams/` for new work
and `private/exams-out/` for exports so outputs stay separated from legacy files.

---

## 7. Checklist

- [ ] Copied `exam-forge/` to `.cursor/skills/`
- [ ] Copied `exam-authoring.mdc` to `.cursor/rules/`
- [ ] Ran `npm install` in `exam-forge/scripts/`
- [ ] Added `gitignore-snippet.txt` lines to repo `.gitignore`
- [ ] Created `private/exams/` and `private/exams-out/`
- [ ] Tested export on one sample `.yml`
