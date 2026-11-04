# PHASE-X9: GitHub aggregator scaffold

> **Track:** L3 · `feii-album-covers` local + `gh repo create --private`.
> **Status:** BLOCKED until X8 DONE

## Goal

Create the instructor-owned aggregator the students were promised: one GitHub repo, **their own routes** (`/covers/<slug>`), a gallery the instructor can walk by URL. Recycle `react-template` pins and `index.md` **rules**, not `corpus-to-boilerplate`.

## Deliverables

- Local tree per [REPO-SHAPE.md](REPO-SHAPE.md)
- `gh repo create ruvebal/feii-album-covers --private --source . --remote origin --push` (or fallback name D16)
- CONTRIBUTING.md (copy REPO-SHAPE D21 spec), CODEOWNERS, `.github/pull_request_template.md`, `.github/workflows/lint-and-build.yml`
- `_template`, empty `registry.json` array + `_studio` stub Cover.jsx
- `.cursor/rules/` 00, 20, 30, 40, 50 only
- `PHASE-X9-COLD-REVIEW.md`, `PHASE-X9-REPORT.md`

## Scope

**In:** scaffold, git init, GitHub create+push of **this** repo, CONTRIBUTING + PR template + lint-and-build CI, encode script stub, original placeholder in `_studio/public` (may be empty until X10).
**Out:** Finished `_studio` scene (X10). Executing corpus-to-boilerplate. shadcn/Stitch. Pushing web-atelier-udit. Porting TTOD `pr-review.yml` / quote-proposal pipeline.

## Prompt (Implementation Agent)

```text
Implement PHASE-X9 per
frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X9.md
and REPO-SHAPE.md.

## Deliver
1. Create ~/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers
   from react-template pins (copy package.json deps, not the beacon as
   the gallery). Gallery App.jsx + import.meta.glob for covers/*/src/Cover.jsx.
2. covers/_template, covers/_studio stub, covers/registry.json.
   Students never replace App.jsx.
3. CONTRIBUTING.md from REPO-SHAPE.md D21 (TTOD contributing.md mapped
   to cover routes). Branch pattern cover-<slug>-task<N>-<topic>.
   Cite qa-007 by ID. Do not copy TTOD Astro seam names or quote-proposal
   two-touchpoint.
4. .github/pull_request_template.md (contract / acceptance / lint-build /
   a11y / AI Review Log). .github/workflows/lint-and-build.yml
   (pull_request → npm ci → lint → build; no deploy, no secrets).
5. Recycle cursor-rules 00/20/30/40/50 from
   web-foundations/private/ai-assisted-3d/cursor-rules/index.md — there
   are no separate .mdc files; each rule is a fenced ```mdc block under a
   `## \`NN-name.mdc\`` heading. Extract those five fences to
   .cursor/rules/NN-name.mdc. Skip 10-react-router and 70-shadcn.
   Do not run corpus-to-boilerplate.
6. scripts/encode-cover.mjs stub (usage on missing toktx).
7. npm install && npm run build && npm run lint.
8. git init -b main if needed. Initial commit.
9. gh repo create ruvebal/feii-album-covers --private --source . --remote
   origin --push. If name taken: feii-album-covers-udit once. If gh auth
   fails: leave local tree, BLOCKED with `gh auth login` — do not skip
   the local scaffold.
10. After create: attempt branch protection (required lint-and-build +
    1 review, no force-push). 403 is still-success if the workflow exists.
11. Hand off for cold review — do NOT mark DONE.

## Constraints
- JavaScript + JSDoc. Same pins as react-template.
- No commercial sleeve in git.
```

## Acceptance

- [ ] `package.json` pins equal `react-template` for react, three, fiber, drei
- [ ] `npm run build` exit 0
- [ ] `covers/_template/src/Cover.jsx` and `covers/registry.json` exist
- [ ] `src/App.jsx` does **not** require students to edit it to add a cover
- [ ] README/CONTRIBUTING: aggregator + IP + no MCP homework + TTOD branch/PR ritual (D21)
- [ ] `.github/pull_request_template.md` has AI Review Log; workflow `lint-and-build.yml` exists
- [ ] CONTRIBUTING does **not** tell students to use TTOD seam names `content`/`graph`/`oracle`/`pwa`/`accounts`
- [ ] `git remote -v` shows github.com/ruvebal/feii-album-covers (or fallback) **or** report BLOCKED on gh auth with local tree complete
- [ ] No `openai` / `anthropic` dependency
- [ ] Cold review filed; blocking Fn closed

## Risks

`gh` not logged in. Still-success: local aggregator complete; GitHub create is the only BLOCKED line. Name collision: one fallback, then stop. Branch-protection 403: still-success if the workflow file exists.
