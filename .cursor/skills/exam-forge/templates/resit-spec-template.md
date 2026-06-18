# Resit exam specification template

Copy to `private/<term>-resit_exams/INDEX.md` and fill per course.

## Roster row

| Slug | Course | Lang | LMS | Tier |
|------|--------|------|-----|------|
| `resit-YYYY-slug` | Course name | en/es | Moodle / Blackboard | 2–4 |

## Architecture

- 20 auto × 0.25 pts + 10 essays × 0.5 pts = 10 pts total, 90 min
- `assessment_mode: concept`, `resit: true`
- `metadata.honeypot_ids`: exactly 3 hidden-span **essay** traps (`r011`–`r013`)
- Mandatory: `web_theory`, `ai_methodology`
- Essay: design↔code reflection (wording varies by audience)

## Export

```bash
EXAM_FORGE_OUT=private/<term>-resit_exams/out \
  .cursor/skills/exam-forge/scripts/export-exam.sh \
  private/<term>-resit_exams/banks/<slug>.yml
```

See full example: `web-foundations/private/0626-resit_exams/INDEX.md`.
