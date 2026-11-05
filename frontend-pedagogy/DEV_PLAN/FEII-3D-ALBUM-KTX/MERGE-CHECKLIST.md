# Merge checklist — `cascade/FEII-3D-ALBUM-KTX` → `main`

For the professor, before merging and pushing `web-atelier-udit` (a **public** repo). Autopilot never does these steps.

## 1. Private audit file is versioned on this branch (P1, from the X3 audit, 2026-11-04 evening)

X3 added a `.gitignore` exception so that `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md` could be committed (the phase worktree otherwise had no copy). On `main`, all of `web-foundations/private/` is ignored and has never been committed. The file names Ahmes nodes, coats and local paths. It is not on Pages (`private/` is outside `docs/`), but a push would put it on public GitHub. That breaks the repo's own “never bypass” rule in `.gitignore` and the D20 instructor-private boundary.

Recommended (keep it private), after X12 is DONE:

```bash
cd ~/projects/ruvebal/scholar/udit/web-atelier-udit-album
# keep the addendum in your local private copy
cp web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md \
   ../web-atelier-udit/web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md
git rm --cached web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md
git checkout main -- .gitignore          # drop the exception
git commit -m "chore: keep AUDIT-GROUNDED instructor-private (revert X3 exception)"
```

The alternative, publishing it on purpose, is your call. If you choose it, say so in the commit body, as `.gitignore` asks.

## 2. Superseded pack copy in the main checkout

`../web-atelier-udit/frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/` is the untracked pre-bootstrap copy. Delete it before merging, or `git merge` will refuse because it would overwrite untracked files.

## 3. Read before you push

- `git log --oneline main..cascade/FEII-3D-ALBUM-KTX` and `git diff --stat main...cascade/FEII-3D-ALBUM-KTX`
- The assignment page is `status: complete` and links `github.com/ruvebal/feii-album-covers`. Push only after X9 created that repo and students are added as collaborators.
- Lesson prose in X6–X8 is partly drafted by thessia-scholar-v3 and reviewed only by agents. Read Unit 8, Unit 9, cover-shaders and ktx2-basis once yourself.
- **Professor release required (agent-written, not Thessia):** Unit 9's cover lab lines; cover-shaders idea-1 paragraph; ktx2-basis §1, §3, §5; the X8 triage plain-words paragraphs ("Four colour words first", "Phone and editor photos"). Each has a hidden provenance comment naming the Claude executor.
- **Thessia training hygiene:** exclude from any tuning batch the records whose published text is executor-written: `…feii-cover-shaders-idea1`, `…feii-ktx2-basis-s1`, `…-s3`, `…-s5`, and the U9 lab record. The rejected attempts can stay as negative examples if your pipeline labels them so.
- **Decisions amended without you (amend-on-surprise):** D3/D22 measurement is now **computed GPU bytes**, because `renderer.info.memory.textures` only counts textures (FINDINGS F16). The KTX2 encode uses `--assign_oetf srgb`, never `--convert_oetf` (X8 S1). Confirm or overrule.

## 3b. Aggregator repo — your decisions (X9, 2026-11-04)

- `https://github.com/ruvebal/feii-album-covers` is created **private**, and CI `lint-and-build` is green.
- **Branch protection is NOT enforced — decided (D23, 2026-11-05):** stay on the personal `ruvebal` account, regular plan. “CI must pass / one human approves” is convention; you merge only through PRs. Collaborators can technically push to `main`, so watch the commit log for direct pushes.
- Add the students as collaborators (out of cascade scope).

## 4. Host

The disk filled to 0 bytes during the run (2026-11-04 ~21:00) and crashed Docker; DevIAC is down. ~24 GB was freed (brew cleanup, npm cache, Ollama log, `llama3.2-vision`, app caches). Phases X6–X12 do not need DevIAC. Keep Docker off until the run ends, then check `df -h` before starting it (its VM file is 23 GB and grows).

`~/src/deviac/fine-tuning/.venv` is broken: it links to Homebrew `python@3.14/3.14.3_1`, which was replaced by 3.14.7 around Aug–Sep 2026 (before tonight's cleanup). Because of that, `thessia_generate.py` could not run in X6. The executor used a stdlib HTTP shim (`scribe_http.py`, copied into the U8 tuning record). To restore the canonical lesson-scribe path, rebuild that venv on 3.14.7 and reinstall its requirements.
