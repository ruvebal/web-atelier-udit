# PHASE-M1: Repository from `git init` — monorepo skeleton, CI, Pages, contribution surface

> **Track:** L3 skeleton, L6 process surface. Creates the product repository.
> **Status:** BLOCKED (M0 DONE)

## Goal

Create `mondrian-project` from nothing: one commit history that starts with
`git init`, a pnpm + uv workspace, an Astro 6 app that builds to GitHub Pages
through Actions, Python packages with import smoke tests, and the whole
contribution surface. Move this cascade into `docs/DEV_PLAN/MONDRIAN/` and
leave a pointer in the forge. The phase ends when the Pages URL serves the
placeholder home and CI is green on `main`.

## Owners

- **Accountable:** instructor/product owner — repository, protection, private
  boundary, review policy and phase sign-off.
- **Responsible:** nominated Full-stack technical lead — workspace, CI and
  contribution fixtures; AI & Data Science lead — Python import gates.
- **Review:** one human cross-lane reviewer; local Ollama may comment only.

## Deliverables

- Repository at `~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project/`, remote `ruvebal/mondrian-project`, `main` protected (require PR + 1 review + green CI).
- Layout exactly as cascade §8, with empty-but-building packages:
  `services/web` (Astro), `packages/matrix` (ESM + vitest, one import test),
  `packages/works` (data/schema), `packages/works/python` (shared installable
  schema package), `packages/analyzer` and `services/api` (three uv members;
  each Python package has a passing import smoke test).
- `.github/workflows/ci.yml` (pnpm install, `pnpm -r build`, `pnpm -r test`, `uv sync`, `uv run pytest`) and `deploy-pages.yml` (`withastro/action@v6`, `path: services/web`, then `actions/deploy-pages@v5`).
- `README.md` index: what the project is (two sentences from the rationale), live URL, **How to contribute** section linking `CONTRIBUTING.md` and `/contribute/`, lanes table, licences, link to `/declaration/` (placeholder until M9).
- `CONTRIBUTING.md` as the student operating contract: sync current `main`;
  branch `lane/<handle>-issue-<n>-<slug>`; one concern per PR; own conflicts;
  never rename an open-PR branch; same-branch amend loop; exact
  `Ready for re-review`; cross-lane human approval; branch-behind-main is
  hygiene, not a rejection reason. It also teaches plan-before-code, expects
  one defended REJECT per semester, separates coding assistants from analyzer
  ML, and links the shared v2.0.3 rubric. `CODEOWNERS`, PR template and three
  issue templates enforce the relevant parts.
- PR template keeps plan link, declaration delta, measurement source and
  reviewer, and adds the required assisted-work AI Review Log from
  `AI-CRITICAL-OPERATING-ADDENDUM.md`.
- `docs/guides/reviewing-cohort-prs.md`, `scripts/pr-review/` and instructor
  commands `make review-queue` / `make review-pr PR=<n> POST=1`, adapted from
  TTOD. Review uses local Ollama, comments `MUST FIX|NIT`, and has no code path
  that approves or merges.
- `AGENTS.md` in the studio format (dev environment table, verification commands, do-not list) and a `CLAUDE.md` redirect.
- `docs/DEV_PLAN/MONDRIAN/` = this pack, including `MVP-PRODUCT-SPEC.md`,
  grounding receipts and both sufficiency reviews/addendum; private
  correspondence is not copied. The forge keeps `PITCH.md` and an `INDEX.md`
  pointer.
- `PHASE-M1-COLD-REVIEW.md`, `PHASE-M1-REPORT.md`.

## Scope

**In:** everything above; a first Astro page `/` that says what the project is and links `/contribute/`; `base` configured for a project site; `.editorconfig`, Prettier, ESLint flat config, Stylelint, ruff + mypy config.
**Out:** any schema content (M2), any rendering (M2/M3), any Python logic (M4/M5), student onboarding (happens after this phase, using this phase's output).

## Prompt (Implementation Agent)

```text
Implement PHASE-M1 per docs/DEV_PLAN/MONDRIAN/PHASE-M1.md (source copy in the web-atelier-udit forge until moved).

## Deliver
1. `git init` at ~/projects/ruvebal/scholar/udit/courses-repos/mondrian-project; first commit "init: Mondrian
   Project monorepo skeleton" containing only README.md, LICENSE-CODE (MIT), LICENSE-CONTENT (CC BY-NC-SA 4.0),
   .gitignore, .editorconfig. Then one commit per concern below (workspace, web, python, ci, contribution surface,
   cascade move). Do NOT push until the human confirms the remote name (D-01).
2. pnpm workspace: pnpm-workspace.yaml with packages/*, services/*; root package.json scripts: build, test, lint,
   format, check (runs all). .npmrc: engine-strict; packageManager field pinned to the installed pnpm.
3. uv workspace: root pyproject.toml with [tool.uv.workspace] members =
   ["packages/works/python", "packages/analyzer", "services/api"],
   requires-python "==3.12.*", .python-version 3.12; each member a minimal package with pyproject, src layout,
   tests/ with a placeholder test that asserts the package imports. ruff + mypy strict configured.
4. Astro 6 in services/web: `pnpm create astro@latest` minimal, TypeScript strict, no integrations; astro.config
   with site + base from env (BASE defaults to "/mondrian-project"); one layout; src/pages/index.astro;
   src/pages/contribute.astro rendering CONTRIBUTING.md (import as content — do not duplicate text); 404.astro.
   Every link through a base-aware helper (write src/lib/url.ts, one function, tested).
5. packages/matrix: package.json type module, exports ./src/index.js, vitest with one test that imports index.
   packages/works: README.md describing L0/L1, empty schema/ and works/ with .gitkeep.
6. CI: ci.yml on pull_request + push to main; deploy-pages.yml on push to main using withastro/action@v6 and
   actions/deploy-pages@v5; permissions pages: write, id-token: write. Record the Node version the action used.
7. Contribution surface: README index; CONTRIBUTING from D-19; CODEOWNERS
   (handles stay placeholders until students join); task/measurement/bug issue
   templates; PR template with Plan · Declaration delta · Measurement source ·
   Cross-lane reviewer · AI Review Log. State that assistant-run checks are not
   human checks and AI never approves or merges. Add AGENTS.md + redirect.
8. Port the TTOD local review pattern: comments-only local Ollama scripts,
   parseable issue/task matching from the branch name, review queue, instructor
   worktree guide and Make targets. Do not include or configure a cloud AI
   reviewer. Add one staged student-owned conflict exercise before real PR waves.
9. Move the cascade: copy INDEX.md, MVP-PRODUCT-SPEC.md,
   AI-CRITICAL-OPERATING-ADDENDUM.md, both sufficiency reviews,
   MONDRIAN-CASCADE.md, PHASE-M*.md, grounding,
   M0 report/cold review into
   docs/DEV_PLAN/MONDRIAN/; in the forge, replace them with INDEX.md pointing at the repo path (keep PITCH.md and
   MONDRIAN-RATIONALE.md in both places? No: rationale moves too; forge INDEX keeps PITCH + pointer).
10. Verify: pnpm install && pnpm check; uv sync && uv run pytest; pnpm --filter web build with BASE set; serve dist
   and curl the home with the base path. After push (human-confirmed): Pages URL returns 200.
11. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- Zero client-side JavaScript shipped by the placeholder pages (check dist for <script>).
- No dependency beyond astro, vitest, typescript, prettier, eslint, stylelint, ruff, mypy, pytest.
- Do not commit beyond the commits named above without asking; never push without the remote confirmed.
```

## Acceptance

- `git log --oneline | tail -1` is the init commit; `git log --oneline | wc -l` ≥ 6 (one per concern).
- `pnpm install && pnpm check` exit 0; `uv sync && uv run pytest` exit 0 (collects ≥ 2 placeholder tests).
- `BASE=/mondrian-project pnpm --filter web build` exit 0; `grep -rl "<script" services/web/dist` returns nothing.
- After push: `curl -o /dev/null -w '%{http_code}' https://ruvebal.github.io/mondrian-project/` → `200`; `/contribute/` → `200`; a wrong path → the 404 page.
- `README.md` contains a heading `## How to contribute` linking `CONTRIBUTING.md`; `CONTRIBUTING.md` names all four lanes.
- CONTRIBUTING contains the exact branch, conflict, no-rename, amend,
  `Ready for re-review`, human-approval and behind-main rules; the staged
  conflict exercise is runnable.
- A fixture proves a branch created before current `main` is rejected by the
  naming/sync preflight; the instructor guide documents an isolated review
  worktree and `make review-queue`.
- PR-template fixture with assisted work is rejected when its AI Review Log is
  absent; a complete fixture passes. `make review-queue` is read-only;
  a dry-run local review emits only `MUST FIX|NIT` findings and cannot invoke
  GitHub approve/merge endpoints.
- CONTRIBUTING contains the two-phase AI rule, one-semester REJECT
  expectation, coding-assistant/analyzer distinction and shared-rubric link.
- Branch protection on `main` verified with `gh api repos/:owner/:repo/branches/main/protection` (required reviews ≥ 1, required status check = CI).
- `docs/DEV_PLAN/MONDRIAN/MONDRIAN-CASCADE.md` exists in the repo; the forge `INDEX.md` points to it.
- Cold review filed; blocking findings closed.

## Risks

- Astro's `base` handling for assets vs links differs from Jekyll's `relative_url`; a hard-coded `/assets/…` 404s on Pages → the `url.ts` helper plus a Playwright check in M3 catch it; M1's curl of `/contribute/` is the early tripwire.
- `withastro/action@v6` installs its own Node (24) — a lockfile built on Node 22 is fine, but record the version so a later surprise is traceable.
- Students cannot be added as collaborators yet → CODEOWNERS placeholders; the gate does not depend on real handles.
