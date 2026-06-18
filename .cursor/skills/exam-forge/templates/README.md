# Exam directory templates

Recommended layout for any course repo using exam-forge:

| Path | Purpose | Git |
|------|---------|-----|
| `private/exams/` | YAML question banks (source of truth) | **Ignore** |
| `private/exams-out/` | Moodle XML, QTI dirs, ZIPs | **Ignore** |

Add lines from `gitignore-snippet.txt` to your repo root `.gitignore`.

Full portability steps: see `../PORTABILITY.md`.
