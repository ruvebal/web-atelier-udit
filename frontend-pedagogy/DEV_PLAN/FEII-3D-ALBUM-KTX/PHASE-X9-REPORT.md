# PHASE-X9 report — GitHub aggregator scaffold

**Status:** DONE (orchestrator, 2026-11-05, after round-2 cold review; implementer stopped at VERIFYING) (the implementer stops here; cold review and DONE belong to others)

**Implementer:** cascade-phase-executor (Claude). Worktree: `web-atelier-udit-album-FEII-3D-ALBUM-KTX-9`. Before doing anything I checked that `.cascade-lane` = `FEII-3D-ALBUM-KTX` and that `git status` was clean.
- I did not commit anything in the cascade worktree. This report is the only file I wrote there.
- I did not run `PHASE-X9.exit-gate.sh`. I ran each of its checks by hand instead (see below).
- I did not push web-atelier-udit. I never used `--force` or `--no-verify`.
- I used react-template read-only (`git status` there is clean). I copied its `package-lock.json` to seed the new repo's install.

**Repo:** <https://github.com/ruvebal/feii-album-covers> (PRIVATE). Local copy: `/Users/ruvebal/projects/ruvebal/scholar/udit/courses-repos/feii-album-covers`. Two commits are on `origin/main`, and CI is green on both.

**Resume point (after triage round 1):** harness `verify PHASE-X9.md` (exit gate), then a cold re-review of the F1 and F2 diffs in aggregator commit `bb5e324`. See "Triage round 1" at the end. Before triage the line read: run the harness `verify PHASE-X9.md`, then the cold reviewer (`PHASE-X9-COLD-REVIEW.md`), then triage. Surprises **S1–S3** below need an orchestrator ruling because they touch X10/X11 or published lessons.

---

## Tree (`git ls-files`, 45 files; plus `node_modules/`, which is ignored)

```
.cursor/rules/00-project.mdc
.cursor/rules/20-r3f-patterns.mdc
.cursor/rules/30-shaders.mdc
.cursor/rules/40-asset-pipeline.mdc
.cursor/rules/50-performance.mdc
.github/pull_request_template.md
.github/workflows/lint-and-build.yml
.gitignore
CODEOWNERS
CONTRIBUTING.md
README.md
covers/_studio/docs/README.md          # X10 placeholder note
covers/_studio/public/.gitkeep         # empty (D8; X10 adds original art)
covers/_studio/src/Cover.jsx           # stub, five props, builds
covers/_studio/src/parts.js
covers/_template/README.md
covers/_template/docs/ai-3d-merge-log.md
covers/_template/docs/ktx2-note.md
covers/_template/docs/renderer-info.md
covers/_template/docs/shader-note.md
covers/_template/public/sleeve.png     # ORIGINAL 256×256 placeholder, 968 B (generated, stdlib PNG writer)
covers/_template/src/Cover.jsx         # Unit 8 cover Template, byte-identical below a 13-line header
covers/_template/src/budget.js         # CEILING = null
covers/_template/src/parts.js          # Unit 8 cover parts Template, byte-identical
covers/_template/src/sleevePicture.js  # route-relative picture pattern
covers/registry.json                   # []
eslint.config.js
index.html
package-lock.json
package.json
scripts/check-registry.mjs
scripts/encode-cover.mjs               # stub
src/App.jsx
src/gallery/CanvasErrorBoundary.jsx
src/gallery/CoverRoute.jsx             # THE ROUTE
src/gallery/Home.jsx
src/gallery/registry.js                # registry.json + import.meta.glob
src/index.css
src/lib/BudgetProbe.jsx
src/lib/budget.js
src/lib/types.js                       # JSDoc typedefs (CoverProps = the contract)
src/lib/usePrefersReducedMotion.js
src/main.jsx
src/theme/tokens.js                    # colour tokens, single source → CSS vars
vite.config.js
```

---

## How the route contract is implemented (file:line)

Paths are relative to the aggregator root, at commit `0e87d73`.

**(a) The five props.** The gallery route owns the state and passes the same props as the Unit 8 fork's `App.jsx`.
- `src/App.jsx:24` mounts `<Route path="/covers/:slug" element={<CoverRoute />} />`. `CoverRoute` is lazy (`:17`). Students never edit this file: its doc comment, lines 4–15, explains why.
- `src/gallery/CoverRoute.jsx:24` runs `findCover(slug)`. An unknown slug gets DOM copy and no Canvas (`:26–48`). `_template` gets its own message.
- `src/gallery/CoverRoute.jsx:51` renders `<CoverStage key={cover.slug} …>`. When the slug changes, the state and the WebGL context start fresh.
- `src/gallery/CoverRoute.jsx:69` sets `reduced = usePrefersReducedMotion()`. The hook is the same as the Unit 8 sandbox's, at `src/lib/usePrefersReducedMotion.js`.
- `src/gallery/CoverRoute.jsx:70–71` hold `useState(null)` for `hovered` and `selected`.
- `src/gallery/CoverRoute.jsx:87`: the gallery supplies `<Canvas camera dpr>` with the Unit 8 camera, DPR cap and target (`:13–15`), and the Unit 8 lights.
- `src/gallery/CoverRoute.jsx:94–100` renders `<Cover hovered={hovered} selected={selected} reduced={reduced} onHover={setHovered} onSelect={setSelected} />` inside `<Suspense fallback={null}>`. This is the same JSX as the Unit 8 fork excerpt.
- The panel lives in the gallery route: part buttons with `aria-pressed`, the `aria-live` note, the hover readout and the budget line. It reads the route's own `parts.js` (`PARTS`) and `budget.js` (`CEILING`) through eager globs (`src/gallery/registry.js:18–22, 73–74`).
- `src/lib/types.js` defines `@typedef CoverProps`, the written contract.
- `covers/_template/src/Cover.jsx:44` is `export default function Cover({ hovered, selected, reduced, onHover, onSelect })`. I diffed it against the Unit 8 lesson: **the body below the header is identical**, and so is `parts.js`. A fork's `Cover.jsx` therefore replaces it unchanged.
- `covers/_studio/src/Cover.jsx:52` has the same signature. It uses `reduced` in one motion that stops under reduced motion.

**(b) Each route references its own pictures.**
- `covers/_template/src/sleevePicture.js:23`: `export const SLEEVE_URL = new URL('../public/sleeve.png', import.meta.url).href;`. `useSleevePicture()` wraps it in `useTexture(SLEEVE_URL, tagScreenColours)`. That is the Cover-shaders "own photo" Template with the root path replaced by the route-relative URL. It accepts and ignores the title argument, so the Cover-shaders `Cover.jsx` changes still apply.
- `covers/_template/public/sleeve.png` is an original placeholder: a flat ground, a disc, a uv-0,0 marker square and a top-edge bar. It is not album art (D8).
- The gate grep `['"]/sleeve\.(jpg|png)` finds no hits in `covers/_template`.

**Gallery wiring.**
- `src/gallery/registry.js:17` runs `import.meta.glob('../../covers/*/src/Cover.jsx')`. The path is relative to `src/gallery/`.
- `:67–75` joins that glob to `covers/registry.json`, filters out `_template`, and calls `React.lazy` once per cover **at module level**, never during render.
- `missingModules` (`:83`) is listed on the index page.

**Vite base path.**
- `vite.config.js:8` reads `base: process.env.BASE_PATH || '/'`.
- `src/main.jsx:18` builds `basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'`, and `:22` passes it to `<BrowserRouter basename>`.
- I did not vendor the Basis transcoder: there is no root `public/`, as X10 requires.

**Documentation.**
- The contract is written up in `CONTRIBUTING.md` § "Route contract" (props in 1, pictures in 2), in the README summary, in `covers/_template/README.md`, and in the PR template's contract checklist.

---

## Commands and real output

### Install (one install, seeded from react-template's lockfile)
```
$ npm install
found 0 vulnerabilities
npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:
npm warn install-scripts   esbuild@0.28.2 (postinstall: node install.js)
npm warn install-scripts   fsevents@2.3.3 (install: (install scripts present))
$ du -sh node_modules → 244M
$ npm ls --depth=0
├── @react-three/drei@10.7.9  ├── @react-three/fiber@9.8.2  ├── react@19.3.1  ├── react-dom@19.3.1
├── react-router-dom@7.18.5   ├── three@0.185.1  ├── vite@7.3.7  ├── eslint@9.39.5  (…devDeps)
```

### Lint (final tree)
```
$ npm run lint
> eslint . && node scripts/check-registry.mjs
registry ok (0 covers)
LINT EXIT 0
```
On the first pass lint failed with `covers/_studio/src/Cover.jsx 49:52 'reduced' is defined but never used`. I fixed it by giving the stub one motion that respects reduced motion. I did not rename the prop or suppress the error.

### Build (final tree)
```
$ npm run build
✓ 616 modules transformed.
dist/index.html                                0.42 kB
dist/assets/index-DmsotmQT.css                 2.18 kB
dist/assets/Cover-DFFNkw2K.js                  1.22 kB   ← _template Cover (glob compiles it every build)
dist/assets/Cover-DKqjKL1x.js                  1.23 kB   ← _studio stub
dist/assets/CoverRoute-Dibj8xol.js            25.00 kB
dist/assets/index-dXLbnANi.js                266.51 kB
dist/assets/events-e51d7528.esm-DQw3TIrz.js  906.66 kB   (three/R3F; >500 kB warning, informational)
✓ built in 1.50s
BUILD EXIT 0
```

### Gate checks, run by hand (not the gate script)
```
ok covers/registry.json … ok scripts/encode-cover.mjs   (all 8 files)
.cursor/rules: 00-project 20-r3f-patterns 30-shaders 40-asset-pipeline 50-performance; no 70-*
ok-branch (cover-<slug>-task)  ok-qa007  ok-no-seams (no `git checkout -b <seam>-`)  ok-airl
ok prop hovered / selected / reduced / onHover / onSelect   (rg in src/**/*.jsx)
ok-no-root-sleeve   ok-glob
pins match (deps+devDeps); no cloud SDK      ← react, react-dom, three, fiber, drei, react-router-dom, and all devDeps equal react-template
ok-no-private-links (no private/ai-assisted or corpus-to-boilerplate references)
```
The only case-insensitive seam-word hit in CONTRIBUTING is "content hash" (line 83). It is not a branch instruction.

### Route contract exercised at runtime (scratch copy, not committed)
The shipped registry is `[]`, so the shipped build never mounts a route. To exercise the contract I made a scratch copy at `…/scratchpad/x9-contract`, with `node_modules` symlinked:
1. I copied `_template` to `covers/test-fork` and applied the Cover-shaders pattern: `Cover.jsx` calls `useSleevePicture()` and sets `map={map}` on the sleeve.
2. The scratch registry was `[_studio, test-fork]`. Lint passed: `registry ok (2 covers)`.
3. `BASE_PATH=/feii-album-covers/ npm run build` exited 0.
   - With the 968 B placeholder, the PNG is inlined as `data:image/png;base64` in the test-fork chunk, because it is under Vite's 4 KB inline limit.
   - With a PNG over 4 KB it is emitted as `dist/assets/sleeve-BPfbbWd0.png` and referenced as `feii-album-covers/assets/sleeve-BPfbbWd0.png`. The route-relative URL therefore survives a subfolder base.
4. I ran `BASE_PATH=/feii-album-covers/ vite preview` and headless Chrome (SwiftShader) with `--dump-dom`. Text extracted from `#root`:
   ```
   /                      → Album covers — FE II Units 8–9 … Studio stub … /covers/_studio  Placeholder Album … /covers/test-fork
   /covers/test-fork      → [CANVAS] ← All covers  Placeholder Album  Nobody — Placeholder (2026) · test  Sleeve Vinyl Stage  Click a mesh or a button. … Hover: —  Sampling…
   /covers/_studio        → [CANVAS] ← All covers  Studio stub … Sleeve Vinyl Stage …
   /covers/nope           → No cover at /covers/nope  A route exists only when covers/registry.json lists the slug …
   /covers/_template      → No cover at /covers/_template …
   ```
   (The `_template` copy was changed after this run, to "`_template` is never a route…".)
   - The Canvas mounted and the error boundary did not fire, including with `useTexture` on the route-relative URL.
   - The budget line stayed at "Sampling…". Headless virtual time probably does not advance rAF, so **this run does not prove that `useFrame` ticks.**
5. Negative tests for `check-registry.mjs`, which exits 1. It caught all of these: `_template` as a slug, `"Bad Slug"`, an unknown field, an empty title, empty authors, a missing `covers/ghost/src/Cover.jsx`, and a duplicate slug.
6. `encode-cover.mjs`:
   - no args: usage, exit 2;
   - toktx found: "NOT IMPLEMENTED … land in X10", exit 3;
   - toktx removed from PATH: `ERROR: toktx not found on PATH.` plus an install hint, exit 127.
   - The hint first said `brew install ktx-software`. Neither a formula nor a cask by that name exists (`brew info` reports both missing), so I replaced it with the Khronos releases page and the .pkg route. That route matches how toktx is installed on this machine (`pkgutil`: `com.khronos.ktx.tools`).

### git init + commit
```
$ git init -b main ; git config user.name → Rubén Vega Balbás ; user.email → ruvebal@crea-comm.net
$ git commit  → 4deb186480153c868e866eaa726b69ec5c52d88e  "feat: scaffold FE II album-cover aggregator (gallery + per-team routes)"
  (message ends with: Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>)
```

### GitHub create (D16 primary name; no fallback needed)
```
$ gh repo view ruvebal/feii-album-covers
GraphQL: Could not resolve to a Repository with the name 'ruvebal/feii-album-covers'. (repository)
$ gh repo create ruvebal/feii-album-covers --private --source . --remote origin --push
https://github.com/ruvebal/feii-album-covers
To github.com:ruvebal/feii-album-covers.git
 * [new branch]      HEAD -> main
branch 'main' set up to track 'origin/main'.
EXIT 0
$ git remote -v
origin	git@github.com:ruvebal/feii-album-covers.git (fetch)
origin	git@github.com:ruvebal/feii-album-covers.git (push)
$ gh repo view … --json → {"defaultBranchRef":{"name":"main"},"name":"feii-album-covers","url":"https://github.com/ruvebal/feii-album-covers","visibility":"PRIVATE"}
```

### Branch protection attempt (still-success: the workflow exists)
```
$ gh api -X PUT repos/ruvebal/feii-album-covers/branches/main/protection --input protection.json
  (required_status_checks.contexts=["lint-and-build"], strict; required_approving_review_count=1;
   dismiss_stale_reviews; allow_force_pushes=false; allow_deletions=false)
{"message":"Upgrade to GitHub Pro or make this repository public to enable this feature.","documentation_url":"https://docs.github.com/rest/branches/branch-protection#update-branch-protection","status":"403"}
gh: Upgrade to GitHub Pro or make this repository public to enable this feature. (HTTP 403)

$ gh api -X POST repos/ruvebal/feii-album-covers/rulesets --input ruleset.json   (same intent via rulesets)
{"message":"Upgrade to GitHub Pro or make this repository public to enable this feature.","documentation_url":"https://docs.github.com/rest/repos/rules#create-a-repository-ruleset","status":"403"}
```
Both routes return 403 because of a plan limitation. Nothing is enforced on `main` right now. I pushed a second commit, `0e87d73 docs(readme): …`, so the README Instructor notes say this plainly instead of implying the protection is configured.

### CI on GitHub
```
completed  success  feat: scaffold …                      lint-and-build  main  push  41926550585  29s
completed  success  docs(readme): record that branch …   lint-and-build  main  push  41926743003  31s
  ✓ npm ci  ✓ npm run lint  ✓ npm run build
ANNOTATIONS: Node.js 20 deprecated for actions/checkout@v4, actions/setup-node@v4 (forced to Node 24);
             ubuntu-latest → Ubuntu 26 migration notice.
```

---

## Acceptance (implementer's self-check; the cold reviewer decides)

| Acceptance | Evidence |
| --- | --- |
| Route contract pinned (five props, route-relative picture, CONTRIBUTING states both) | file:line above; CONTRIBUTING § Route contract 1 and 2 |
| Pins = react-template (react, three, fiber, drei) | python check; react-dom, router and devDeps also equal |
| `npm run build` exit 0 | above |
| `_template/src/Cover.jsx`, `registry.json` exist | tree |
| `src/App.jsx` not edited to add a cover | glob + registry; App.jsx doc comment |
| README/CONTRIBUTING: aggregator + IP + no MCP homework + D21 ritual | README § Collaboration / Rights; CONTRIBUTING § Rights / "does not ask for" ("assistant-server … installs as homework") |
| PR template has AI Review Log; `lint-and-build.yml` exists | files; CI green |
| CONTRIBUTING has no TTOD seam branch names | grep; seam names are not listed at all, only "TTOD's seam vocabulary" |
| `git remote -v` shows github.com/ruvebal/feii-album-covers | above |
| No openai/anthropic dependency | python check (lockfile grep also empty) |
| Cold review filed | **not mine**: pending |

---

## Surprises and uncertainties (for the cold reviewer and orchestrator)

- **S1 — Branch protection is not enforced (plan 403).** CONTRIBUTING says `lint-and-build` "must pass" and one human "must approve". On GitHub Free with a private repo, neither rule is enforced, and CODEOWNERS only auto-requests reviews. The options are product-owner decisions, not mine:
  - GitHub Pro, or Education/Teacher benefits;
  - an organisation plan;
  - accepting convention-only enforcement.
  - Making the repo public conflicts with D6/D8.
- **S2 — Two route files beyond the five props: `parts.js` and `budget.js`.** The panel has to live in the gallery, because the route owns the state. It therefore reads `PARTS` from the route's `parts.js` (unchanged from the fork) and `CEILING` from a new `covers/<slug>/src/budget.js`.
  - In the fork, `CEILING` lived in `BudgetProbe.jsx`. Unit 8 lab step 7 says "write it into `CEILING`", which still holds, but no published lesson names `budget.js`.
  - Unit 8 already defers to the repo ("Where the state and the panel live on a route is set by that repository's `_template`"), so nothing published is contradicted.
  - X10 or X11 may want one sentence on this in the assignment page or Unit 8. `budget.js` is optional: without it the panel prints "no CEILING in src/budget.js yet".
- **S3 — Two satellite links 404 on the live site today.** CONTRIBUTING and README link the cover-shaders and ktx2-basis pages on `ruvebal.github.io/web-atelier-udit` (baseurl verified in `_config.yml`). Both return **404** because the cascade branch is not published, and D14 forbids pushing it.
  - The covenant, units-8-9-assignment, Unit 8 and Unit 6 return 200.
  - The TTOD contributing and reviewing guides return 200.
  - The two broken links will resolve once the lessons publish.
- **Deviation from REPO-SHAPE (small).** `covers/_template/public/` ships an original `sleeve.png` instead of only `.gitkeep`, so the route-relative pattern points at a real file. Students who copy `_template` get it and replace it. `_studio/public/` stays empty (`.gitkeep`), as X9 allows.
- **Additions beyond the brief, flagged so they are not silently absorbed:**
  - `scripts/check-registry.mjs`, chained into `npm run lint` so CI checks the registry schema;
  - `src/theme/tokens.js`, the single colour source, written to CSS variables (user preference: no hard-coded design values in render code);
  - a `CanvasErrorBoundary`, which is rule 00's DOM fallback;
  - `covers/_template/` added to CODEOWNERS, which REPO-SHAPE does not list.
  - All are instructor-owned and easy to revert if unwanted.
- **Cursor rules were tuned, not copied.** I extracted the five fences from the main checkout's `private/ai-assisted-3d/cursor-rules/index.md` (sha1 `b38bc07e…`; the file is absent from the worktree). I then rewrote the stack and structure lines for this repo: JavaScript + JSDoc, no shadcn or Tailwind, the `covers/<slug>` layout, globs. Two rules from the original contradicted the published Unit 9 and Cover-shaders lessons, so I aligned rule 30 with the lessons:
  - "`#version 300 es` … `precision highp float`" became "three prepends the version" plus `material.precision` set in one place.
  - The Git LFS and `asset-manifest.json` lines were removed.
  - A reviewer should read the rule files against the source fences.
- **The shipped build mounts no route** (registry `[]`). The contract was exercised only in the scratch run above. Headless Chrome did not show `useFrame` ticking.
- **CI nits:** `actions/checkout@v4` and `setup-node@v4` trigger the Node 20 deprecation annotation. I did not bump them because I could not verify the newest majors here.
  - npm 11's `allowScripts` skipped esbuild's postinstall locally; the build works regardless.
  - The 906 kB three chunk warning is informational.
- **Lockfile** was seeded from react-template's and rewritten by `npm install` (name is `feii-album-covers`). CI `npm ci` succeeded with Node 22 / npm 10.
- **Disk:** about 244 MB of `node_modules`, plus a scratch copy (sources only, `node_modules` symlinked). The headless-Chrome profiles in scratch were deleted.

---

## Triage round 1 (2026-11-05)

**Status stays VERIFYING.** This round amends X9; it is not a new phase.
- I did not run the cascade exit gate. I ran its two new checks by hand (below).
- The only pack file I edited is this report.
- Aggregator: one commit, **`bb5e324`** (parent `0e87d73`), pushed with `git push origin main`. No `--force`, no `--no-verify`.
  - **A direct push to `main` is the instructor's path for now.** Branch protection is not available on this plan (D23, decided as option d by the professor, per the coordinator in this round).
  - The working tree is clean, and `worktree list` shows only `main`.
- No GitHub settings were changed. No web-atelier-udit lessons were touched.

**CI for the new HEAD:** run `41999332138`, head `bb5e324c29101fd06956090f4056805494a4a8ee`, **conclusion: success**.
- All steps passed: `actions/checkout@v7`, `actions/setup-node@v7`, `npm ci`, `npm run lint` (log: `registry ok (0 covers; 0 R3F extend keys, none shared)`), `npm run build` (`✓ built in 4.90s`).
- Annotations: only the `ubuntu-latest → Ubuntu 26` notice. The Node 20 deprecation warning from v4 is gone.

**Local, in the aggregator, final tree:**
- `npm run lint` → exit 0, `registry ok (0 covers; 0 R3F extend keys, none shared)`.
- `npm run build` → exit 0, `✓ built in 1.57s`.

**New gate checks, run by hand (not the gate script):**
- `rg -U -q "<Cover[^>]*\b$prop=\{" src -g '*.jsx'` matches all five props: `ok hovered/selected/reduced/onHover/onSelect`.
- `rg -qi extend scripts/check-registry.mjs` → `ok-extend-word`.

### Finding → change → evidence

All files are in the aggregator at `bb5e324`; line numbers are at that commit.

| # | Change (file:line) | Evidence |
| --- | --- | --- |
| **F1 (P1)** (a) contract | `CONTRIBUTING.md:85` adds "### 3. Materials: register under a slug-unique name". It shows both forms, says "everything else stays as the lesson wrote it", and bans three.js names. `:40` notes the one exception to "unchanged". `README.md:30` is the summary item 3. `covers/_template/README.md:34` is item 3 ("This folder registers none"). `.cursor/rules/20-r3f-patterns.mdc:41` adds "## extend — keys are global across routes". | Component form checked in source and at runtime (below). |
| **F1 (P1)** (b) guard | `scripts/check-registry.mjs:84` (section) and `:132` `collectExtendKeys` walk every `covers/<folder>/src/**/*.{js,jsx,mjs}` except `_template`. `:187` `mask()` blanks comments and string insides, so commented examples do not count. The script collects each `extend({ Key… })` key (bare, `Key: Value`, quoted, multiline). It fails, naming both slugs and files, when two folders share a key. It also fails when a key shadows a `three` export (`:91`; R3F's `<Canvas>` re-runs `extend(THREE)` on mount) or when a spread or computed key cannot be checked. `extend(Class)` is not collected: R3F gives it a fresh generated key. | Scratch lint proof (below): the shared key fails, distinct keys and the component form pass. |
| **F2 (P1)** | `CODEOWNERS:1–7`: it *requests* review and does not block. The merge rule is a course rule held by the instructor merging only through PRs, and branch protection is not available on this plan. "Required by branch protection" is removed. `.github/workflows/lint-and-build.yml:1–2`: the same, with no "branch protection" claim. `CONTRIBUTING.md:158–160`, step 6: the course rule, enforced by the instructor merging only through PRs. GitHub enforces neither the check nor the approval. Collaborators technically have push access including `main`, so they must never push or force-push `main` and must open a PR. A direct push shows in history and the Actions log. `:8`: "a required CI check" → "a CI check that must pass". `README.md:64`: Collaboration links step 6. `README.md:75`: "Merge rule (D23, option d)" states it as settled (no "until decided"), with the force-push risk and "keep a local mirror". `:76`: CODEOWNERS requests a review and does not block. | `grep -rni "required\|protect\|enforc"` over `.github covers/_template .cursor CONTRIBUTING.md README.md` leaves no enforcement claim. Remaining hits: the AI Review Log "required" heading, rule-file "(required)/(enforce)" style headings, and the honest sentences above. |
| F4 | `README.md:74`: `git fetch origin && git worktree add --detach ../feii-album-covers-review origin/main` (and why it is detached). | Fresh `git clone` of origin with `main` checked out: `Preparing worktree (detached HEAD 0e87d73)`, `worktree exit=0`, then `worktree list` shows `[main]` plus `(detached HEAD)`. Deleted afterwards. |
| F6 | `CONTRIBUTING.md:128–137` adds the expected `registry.json` conflict recipe: `git rebase origin/main`, keep both objects, keep the array sorted by slug, one object per line, `npm run lint`, `git push --force-with-lease` on your own `cover-…` branch only. `CONTRIBUTING.md:34` and `_template/README.md:11` say "sorted by slug". **Enforced:** `scripts/check-registry.mjs:72` fails with the expected order when the array is unsorted (plain code-point order, so `_studio` sorts after digit-initial slugs and before letters). | Scratch case 4 below. |
| F7 | `CONTRIBUTING.md:83`: "not in the repository yet: the instructor **will vendor** one shared copy at the repo-root `public/basis/` when the KTX2 loader lands (before task3)". `covers/_template/src/sleevePicture.js:15–18`: same. `README.md:77`: "will be vendored … not in the repository yet". `.cursor/rules/40-asset-pipeline.mdc:21` names `public/basis/` and says "lands with the KTX2 loader". | Text only. X10 Acceptance makes it true. |
| F8 | `CODEOWNERS:17–20` add `/README.md`, `/CONTRIBUTING.md`, `/index.html`, `/.gitignore`. `package*.json`, `vite.config.js` and `eslint.config.js` were already listed (`:21–24`). | File. |
| F9 | `CONTRIBUTING.md:202` and `README.md:66` name "MCP servers, MCP shopping, Stitch, 21st.dev". | `grep -n MCP` hits both. |
| F11 | `lint-and-build.yml:25–26`: `actions/checkout@v7`, `actions/setup-node@v7`. Tags verified first: `gh api repos/actions/checkout/git/refs/tags/v7` → `3d3c42e…` (latest release v7.0.1, 2026-07-20); `setup-node` v7 → `949feb2…` (latest v7.1.0, 2026-10-08). Both `action.yml` at v7 declare `using: node24`. `setup-node` v7 still takes `cache: npm`; the v5/v6 breaking changes concern automatic caching, and we set `cache:` explicitly. | CI run `41999332138`: success, and no Node 20 annotation. |
| F3, F5, F10 | No aggregator change. They are handled by the orchestrator's X10/X11 pack amendments and the amended X9 gate. | F10's new gate grep passes against `src/gallery/CoverRoute.jsx` (above). |

### F1 proof 1: the component form works in R3F 9.8.2 (source and rendered)

**Source.** `node_modules/@react-three/fiber/dist/events-e51d7528.esm.js`:
- `:16588` `extend(fn)` stores `catalogue[`${i++}`] = fn` and returns that string.
- `createInstance` (`:16626`) and `validateInstance` (`:16612`) resolve `catalogue[toPascalCase(type)]`. `toPascalCase("0") === "0"`, so the generated key resolves.
- Also relevant: `react-three-fiber.esm.js:40` runs `useMemo(() => extend(THREE), [])` in every `<Canvas>`. That is why the guard also bans three.js names.

**Rendered.** In a scratch clone of `0e87d73` with six probe routes, nothing was committed:
- `obj-a` and `obj-b` both use `extend({ SleeveShader: S })`;
- `comp-a` and `comp-b` use `const Sleeve = extend(S)`;
- `key-a` and `key-b` use the slug-unique keys `ObjAlphaSleeve` and `ObjBetaSleeve`.

Each material's `useEffect` pushes `{route, shader: MARK in fragmentShader, own: ref instanceof its own class}`. I built with `BASE_PATH=/feii-album-covers/`, ran `vite preview`, and drove headless Chrome over CDP with SPA navigation (pushState + popstate). The driver is `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/cdp-walk.mjs`.
```
/covers/obj-b  -> {"route":"obj-b","shader":"obj-b","own":true}
/covers/obj-a  -> {"route":"obj-a","shader":"obj-a","own":true}
/covers/obj-b  -> {"route":"obj-b","shader":"obj-a","own":false}    ← F1 reproduced
/covers/comp-b -> {"route":"comp-b","shader":"comp-b","own":true}
/covers/comp-a -> {"route":"comp-a","shader":"comp-a","own":true}
/covers/comp-b -> {"route":"comp-b","shader":"comp-b","own":true}   ← component form: correct
/covers/key-b  -> {"route":"key-b","shader":"key-b","own":true}
/covers/key-a  -> {"route":"key-a","shader":"key-a","own":true}
/covers/key-b  -> {"route":"key-b","shader":"key-b","own":true}     ← slug-unique keys: correct
```
I ran the same walk under `vite` dev (`/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/cdp-walk-console.mjs` also captures console errors and warnings). The results were identical. The only console output was `THREE.Clock: This module has been deprecated`, which comes from R3F/three and was already there; there were no errors or exceptions. Both remedies are therefore recommended.

### F1 proof 2 and F6: the lint guard (scratch clones, `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/lintcases.sh`)

Each case ran `npm run -s lint` on a fresh `git clone` of the aggregator with the new `check-registry.mjs`. Routes were copied from `_template`. Case 1 uses the cover-shaders lesson's `SleeveMaterial.jsx` fence **verbatim**, extracted to `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/lesson-SleeveMaterial.jsx`.
```
CASE 1  same key SleeveShader in two slugs (lesson fence verbatim)  → lint exit=1
        R3F extend key "SleeveShader" is registered by "blue-lines" (covers/blue-lines/src/SleeveMaterial.jsx) and
        "ok-computer" (covers/ok-computer/src/SleeveMaterial.jsx). Extend keys are shared by every route, so one of these
        covers would render the other's material. Rename yours to a slug-unique key (extend({ OkComputerSleeve: SleeveShader })
        → <okComputerSleeve …/>) or use the component form (const Sleeve = extend(SleeveShader) → <Sleeve …/>). See Route contract 3 in CONTRIBUTING.md.
CASE 2  distinct keys OkComputerSleeve / BlueLinesSleeve            → lint exit=0  "registry ok (2 covers; 2 R3F extend keys, none shared)"; build exit=0
CASE 3  component form in both slugs                                 → lint exit=0  "registry ok (2 covers; 0 R3F extend keys, none shared)"
CASE 4  registry not sorted by slug                                  → lint exit=1  "keep the array sorted by slug — "blue-lines" must come before "ok-computer". Expected order: blue-lines, ok-computer."
CASE 5  extend({ MeshStandardMaterial: Mine })                       → lint exit=1  "shadows three's own MeshStandardMaterial …"
CASE 6  key only in a comment / block comment / string in slug A     → lint exit=0  (the masked scan ignores them)
CASE 7  multiline extend with a quoted 'BlueLinesSleeve' key          → lint exit=1  (names both slugs)
CASE 8  _studio (nested src/materials/) vs a student slug            → lint exit=1  (names "_studio" and "blue-lines")
CASE 9  _template vs a student slug, same key                         → lint exit=0  (_template is never a route; skipped)
CASE 10 extend({ ...more })                                          → lint exit=1  "cannot be checked. List each key by name …"
```
Case 6 failed on the first draft of the parser: it scanned string literals. I fixed it with `mask()`, and every case was re-run on the final script. The output above is from that final run.

### `_template`

`_template` registers no material. That is stated in CONTRIBUTING `:105` and `_template/README.md:34`, and the guard skips it in any case.

### Not closed / for the orchestrator

1. **D23 in `DECISIONS.md` still reads OPEN.** In this round the coordinator relayed the professor's decision: option (d), stay on the personal account, convention plus instructor-only merges. The aggregator docs now say so (README:75 cites "D23, option d"). The pack row is not mine to edit, so the orchestrator should flip it to DECIDED.
2. **X11, assignment page line 111** still has the "must pass … must approve" wording. It should get the settled-rule sentence (course rule, instructor merges only through PRs, never push or force-push `main`), as the cold review §7 asks.
3. **Sort enforcement is new.** Any later writer of `covers/registry.json` (X10 adding `_studio`, X11 examples) must keep the array sorted by slug, or `npm run lint` fails. With a single `_studio` entry this is trivially true.
4. **Guard limits, stated honestly:**
   - JavaScript regex literals are not recognised by `mask()`. A cover file with a quote inside a regex literal could hide a later `extend` call (a false negative, never a false positive).
   - An aliased import (`import { extend as reg }`) is not followed.
   - Neither is likely in a cover. CI is a backstop, not a proof.
5. **TTOD's `reviewing-cohort-prs.md:61`** has the same non-detached worktree bug (cold review F4). It is out of scope here; flagged for the owner.
6. **`.cursor/rules/40-asset-pipeline.mdc:21`** says "the transcoder the instructor vendors at `public/basis/` (lands with the KTX2 loader)". It is present tense with a qualifier; re-check at the X10 cold review.

Scratch artifacts were kept as evidence; the clones were deleted:
- `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/cdp-walk.mjs`
- `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/cdp-walk-console.mjs`
- `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/lintcases.sh`
- `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/lesson-SleeveMaterial.jsx`


## Orchestrator triage (DONE decision)

| Finding | Sev | Outcome |
| --- | --- | --- |
| F1 shared R3F `extend` keys swap shaders between routes | P1 | Closed in `bb5e324`: route contract item 3 + `check-registry` guard. Round 2 proved it (lint refuses the shared key; unique keys and `extend(Class)` render their own shader across visits) |
| F2 docs claimed branch protection | P1 | Closed; wording matches D23 |
| S1 protection 403 | ruling | **D23 CONFIRMED by the professor**: convention-only, personal account. Round-2 G4 clarification: students never press Merge; a force-push can erase commits |
| S2 `budget.js` optional and undocumented | P2 | X11 step 9 + X11 gate (Unit 8 and cover-shaders must name it) |
| S3 satellite links 404 until published | P2 | X11 re-check |
| F3, F5 | P2 | Carried to X10 (Unit 9 per-frame probe) and X11 |
| F4, F6–F9, F11 | P2 | Closed in `bb5e324` (CI run 41999332138 green) |
| F10 / G2 weak gate checks | P2 | X9 gate now anchors `<Cover\s` in `src/gallery` and **functionally** proves that check-registry refuses two routes sharing `SleeveShader` (verified passing on the real repo) |
| G1 guard blind spots (aliased import, regex literal, JSX apostrophe, `extend(objVar)`) | P2 | Accepted: they cause missed duplicates only, never false failures. Documented here. The lesson's own form is caught |
| G3 carry-overs unchecked | P2 | X10 gate: `_studio` must not use the shared key, check-registry must pass, CONTRIBUTING must say the instructor merges. X11 gate: slug-unique extend + `budget.js` in lessons |
| G5 X10 step 7 stale | P2 | X10 opens a PR and does **not** merge (D21); the professor merges. X9 direct pushes were a recorded pre-cohort carve-out under D14 |
| REPORT "Not closed" item 1 (D23 OPEN) | — | Out of date; D23 is CONFIRMED |
