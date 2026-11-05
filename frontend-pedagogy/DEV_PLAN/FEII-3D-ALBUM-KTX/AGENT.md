# Operator agents

Canonical copies — do not duplicate their body here:

| Role | Cursor load path | Canonical |
| --- | --- | --- |
| Implement one phase, stop at VERIFYING | `cascade-phase-executor` (Cursor Task or Claude Code agent type) | `~/src/.agents/agents/cascade-phase-executor.md` |
| Cold review after harness verify | `cascade-cold-reviewer` | `~/src/.agents/agents/cascade-cold-reviewer.md` |
| Autopilot loop | — | [AUTOPILOT.md](AUTOPILOT.md) |
| Lesson prose (X6–X8) | skill `lesson-scribe` | `~/src/.cursor/skills/lesson-scribe/SKILL.md` · `thessia-scholar-v3` |
| Curriculum structure | `curriculum-forger` + `fe-unit-forge.mdc` | studio skill + `frontend-pedagogy/fe-unit-forge.mdc` |
| Profield (X1–X2) | CLI | `~/src/profield` — **no cloud paste**; D17 |
| Cite-grade (X3) | `curriculum-publication-head` | `frontend-pedagogy/.cursor/skills/curriculum-publication-head/SKILL.md` |

## Never

- Implementer must not mark DONE.
- Cold reviewer must not share the implementer’s conversation.
- Lesson-scribe must not freehand a whole lesson in one prompt.
- Cloud LLM SDKs; clipboard Pass 1 is not required and must not stall X1.
- Force-push, skip hooks, push `web-atelier-udit`.
- Execute `corpus-to-boilerplate/` against `feii-album-covers`.
- Invent a second git culture. D21: TTOD contributing.md mapped onto cover slugs.
- Check student PRs out of the teaching clone (use `../feii-album-covers-review`).

## Harness

Use [autopilot.sh](autopilot.sh), which wraps `~/src/.cursor/skills/cascade-forge/scripts/cascade-harness.sh` against the **integration worktree** pack and handles prep/merge/cleanup:

```bash
AP=~/projects/ruvebal/scholar/udit/web-atelier-udit-album/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/autopilot.sh
"$AP" next ; "$AP" start ; "$AP" verify PHASE-Xn.md ; "$AP" land PHASE-Xn.md
```

Calling the bare harness on the main-checkout copy is wrong: that copy is untracked, so a harness worktree does not contain the pack and `verify` refuses.
