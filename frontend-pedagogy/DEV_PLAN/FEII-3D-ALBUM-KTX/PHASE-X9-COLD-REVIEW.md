# PHASE-X9 cold review: GitHub aggregator scaffold

**Reviewer:** cascade-cold-reviewer, a fresh session. I did not implement X9 and I did not trust the report. I re-ran or rendered every claim below myself.
**Reviewed:** aggregator `feii-album-covers` at `0e87d73` (parent `4deb186`), plus GitHub state, read-only. Cascade worktree at `257d6ed`.
**Date:** 2026-11-05

**Verdict: NOT DONE. 2 blocking findings (F1, F2, both P1).** Both fixes are small, and nothing is P0. Everything else in the scaffold holds up when it runs:
- clean install, lint and build;
- the exit gate;
- the route contract under a subfolder base;
- the IP rules;
- version pins;
- D21 fidelity.

What I did not touch: the aggregator and the lessons (no edits), git (nothing committed, nothing pushed), GitHub settings (unchanged), and phase status (DONE is not mine to set).
- Scratch clones were made with `git clone` under the scratchpad, never `git worktree add` on the aggregator, and were deleted afterwards.
- `git -C feii-album-covers status --short` is empty, and `worktree list` shows only `main`.
- The exit-gate re-run rebuilt the ignored `dist/` in the real tree. That folder already existed, and the harness does the same on every run.

---

## 1. Runnable evidence

### 1.1 Clean install, lint and build (scratch clone of `0e87d73`, Node 24.22.1 / npm 11.19.1)
```
$ git clone -q feii-album-covers $S/agg && cd $S/agg
$ npm ci          → ci=0
$ npm run lint    → "registry ok (0 covers)"   lint=0
$ npm run build   → ✓ built in 1.61s           build=0
$ git status --short   → (empty; dist/ is ignored)
```

### 1.2 Cascade exit gate, re-run by me (not read from the log)
```
$ bash PHASE-X9.exit-gate.sh
pins match; no cloud SDK
origin: git@github.com:ruvebal/feii-album-covers.git
OK PHASE-X9.exit-gate.sh
GATE EXIT 0
```
This matches `PHASE-X9-VERIFY-LOG.md` (exit 0, commit 257d6ed).

### 1.3 Route contract, assembled from the lesson's own fences (scratch)
I took the code from the lessons themselves, not from `_template`:
- `lesson-Cover.jsx` and `lesson-parts.js` from the Unit 8 fences;
- `lesson-SleeveMaterial.jsx` and `lesson-sleevePicture-canvas.js` from the cover-shaders fences.

First, `_template` against the lesson:
```
tail -n +14 covers/_template/src/Cover.jsx | diff - lesson-Cover.jsx  → COVER-IDENTICAL
diff covers/_template/src/parts.js lesson-parts.js                    → PARTS-IDENTICAL
```
Then I built three routes. None of them edits `App.jsx` or anything under `src/`.

| Route | Contents |
| --- | --- |
| `fork-a` | Only the Unit 8 fork's `Cover.jsx` and `parts.js`. **No `budget.js`, no `sleevePicture.js`.** |
| `shader-b` | Task2 per cover-shaders: the lesson's `SleeveMaterial.jsx`, the canvas `sleevePicture.js`, and the "three changes" applied to `Cover.jsx`. |
| `photo-c` | `_template`'s route-relative `sleevePicture.js` with a 49 KB PNG (over Vite's 4 KB inline limit), and the lesson's `SleeveMaterial.jsx` with one fragment line changed to red. Same `SleeveShader` name. |

Each route got one registry row. Lint passed: `registry ok (3 covers)`.

I built with `BASE_PATH=/feii-album-covers/`, served it with `vite preview --base /feii-album-covers/`, and drove headless Chrome 156 (SwiftShader) over CDP, navigating inside the SPA. Output from `#root`:
```
/                 → lists Fork A, Shader B, Photo C with /covers/<slug>
/covers/fork-a    → [CANVAS] … Sleeve Vinyl Stage … calls 3 · triangles 280 · geometries 3 · textures 1 · no CEILING in src/budget.js yet
/covers/shader-b  → [CANVAS] … textures 2 · no CEILING in src/budget.js yet
/covers/photo-c   → [CANVAS] …   img requests: http://localhost:4179/feii-album-covers/assets/sleeve-CgLf3e9-.png 200
/covers/nope      → No cover at /covers/nope  A route exists only when covers/registry.json lists the slug and covers/nope/src/Cover.jsx exists.
/covers/_template → No cover at /covers/_template  _template is never a route: copy it to covers/<slug>/.
/covers/_studio   → No cover at /covers/_studio …   (registry is [] at X9; X10 lights it)
deep-link reload /feii-album-covers/covers/fork-a → [CANVAS] … renders
```
Built URL for the picture: `new URL("/feii-album-covers/assets/sleeve-CgLf3e9-.png",import.meta.url).href`.

What this run shows:
- **The budget line sampled.** So `useFrame` ticks in the gallery Canvas. The implementer's run could not show that.
- **The panel works.** A second CDP run emulated `prefers-reduced-motion: reduce` (`matchMedia … true`) and clicked "Vinyl": `{"pressed":["Sleeve=false","Vinyl=true","Stage=false"],"live":"Replace: how the disc sits against the sleeve, …"}`.
- **The typo claim in `sleevePicture.js` holds.** I renamed the file in the URL to `sleve.png`. The build printed `new URL("../public/sleve.png", import.meta.url) doesn't exist at build time, it will remain unchanged…` and **still exited 0**. CI does not catch the typo; the doc only promises a warning, so the doc is accurate.
- **The README's subfolder command works.** `BASE_PATH=/feii-album-covers/ npm run preview` returns 200 for `/`, `/covers/fork-a` and `/assets/`.

### 1.4 Registry checker and encode stub
`check-registry.mjs` exits 1 on every bad case I tried:
- `_template` as a slug;
- `"Bad Slug"`;
- a missing `ghost/src/Cover.jsx`;
- a duplicate slug;
- `{}` instead of an array;
- an empty title with empty authors.

`npm run encode`:
- no arguments → exit 2 and the usage text;
- toktx present at `/usr/local/bin/toktx`, source file missing → error plus usage;
- toktx removed from PATH → `ERROR: toktx not found on PATH.` plus the install hint.

### 1.5 Pins, cloud SDKs, images, private links
- **Pins.** Every dependency and devDependency in `package.json` equals `react-template`'s. The lockfiles resolve the same versions: three 0.185.1, react 19.3.1, fiber 9.8.2, drei 10.7.9, vite 7.3.7, eslint 9.39.5.
- **Cloud SDKs.** `grep -c -iE "openai|anthropic"` returns 0 for both `package.json` and `package-lock.json`.
- **Images.** Across every commit in the repo there is exactly one image: `covers/_template/public/sleeve.png`. It is a 256×256 RGB PNG of 968 bytes with no tEXt, iTXt, zTXt or eXIf chunks. I viewed it: a navy ground, an orange disc with a hole, a cream square at the bottom left (the uv 0,0 marker) and a cream bar along the top. It is original geometry, not album art.
- **Private links.** `grep -rn "private/ai-assisted|corpus-to-boilerplate|ai-assisted-3d/index|AUDIT-GROUNDED"` over the repo (excluding node_modules, dist and .git) has no hits. The covenant is linked from both README and CONTRIBUTING (D20 satisfied).

### 1.6 GitHub, read-only
```
gh repo view → {"isPrivate":true,"name":"feii-album-covers","viewerPermission":"ADMIN","visibility":"PRIVATE","defaultBranchRef":{"name":"main"}}
gh run list  → completed success (0e87d73 push, 31s); completed success (4deb186 push, 29s)
gh api …/branches/main/protection → 403 "Upgrade to GitHub Pro or make this repository public to enable this feature."
gh api repos/… → owner_type "User", allow_forking true, merge/squash/rebase all allowed
gh run view 41926743003 → annotations: Node 20 deprecated for actions/checkout@v4 and setup-node@v4; ubuntu-latest → Ubuntu 26 notice
```

---

## 2. Acceptance, item by item

| # | Acceptance | Result | Evidence |
| --- | --- | --- | --- |
| 1 | Route contract: the five props, a route-relative picture, CONTRIBUTING states both | **PASS** for the five props and the picture rule (§1.3). The contract text is in CONTRIBUTING §Route contract 1 and 2. F1 is a contract gap the item does not name. | `CoverRoute.jsx:94–100`; render and network log in §1.3 |
| 2 | Pins equal react-template for react, three, fiber, drei | **PASS** | §1.5 |
| 3 | `npm run build` exits 0 | **PASS** | §1.1 and §1.2 |
| 4 | `_template/src/Cover.jsx` and `registry.json` exist | **PASS** | tree |
| 5 | `App.jsx` needs no student edit | **PASS** | §1.3: three routes lit with `src/` untouched |
| 6 | README and CONTRIBUTING cover the aggregator, IP, no MCP homework, and the D21 ritual | **PASS, with F2 and F9** | §4 |
| 7 | PR template has an AI Review Log; `lint-and-build.yml` exists | **PASS** | file present; CI green |
| 8 | No TTOD seam names as branches | **PASS** | `grep -wiE "content\|graph\|oracle\|pwa\|accounts"` has one hit, "content hash" at CONTRIBUTING:83 |
| 9 | `git remote -v` shows ruvebal/feii-album-covers | **PASS** | gate output; `gh repo view` |
| 10 | No openai or anthropic dependency | **PASS** | §1.5 |
| 11 | Cold review filed; blocking findings closed | **OPEN**: F1 and F2 | this file |

---

## 3. Findings

### F1: P1, blocks DONE. R3F `extend` names are global, so two routes that both register `SleeveShader` swap shaders

**Evidence.** In R3F 9.8.2, `extend` writes into one shared catalogue (`node_modules/@react-three/fiber/dist/events-e51d7528.esm.js:16588`):
```js
function extend(objects) {
  if (typeof objects === 'function') { const Component = `${i++}`; catalogue[Component] = objects; return Component; }
  else { Object.assign(catalogue, objects); }
}
```
The cover-shaders lesson's `SleeveMaterial.jsx` calls `extend({ SleeveShader })` at module level. Cover-shaders lab step 2 says to move that file into `covers/<slug>/src/`, and task2 requires each team's own effect, so every team ends up with a different `SleeveShader` class under the same name. Each cover chunk runs once when it first loads, and whichever chunk loaded last owns the name.

I put a probe in each route's material, logging whether the compiled fragment shader is the red one, and walked the routes in one SPA session:
```
/covers/shader-b → PROBE route=shader-b red=false
/covers/photo-c  → PROBE route=photo-c  red=true
/covers/shader-b → PROBE route=shader-b red=true     ← shader-b now renders photo-c's shader
```
On the second visit the panel also changed from `textures 2` to `textures 1`: the red shader never samples `uMap`.

**Impact.**
- The phase goal is "a gallery the instructor can walk by URL". Walking it shows some teams the wrong shader, which is exactly how the instructor grades task2.
- X10 step 2 says to "Reuse the cover-shaders lesson's SleeveMaterial.jsx … unchanged". So `_studio` will collide with every student route too.
- "Moves over unchanged" is true for `Cover.jsx`. It is false for the `SleeveMaterial.jsx` that cover-shaders step 2 also moves.

**Fix.** The product owner picks the convention; X9 enforces it.
1. Add **Route contract item 3** to CONTRIBUTING, `_template/README.md` and rule 20: "R3F `extend` names are shared by every route. Register yours under a slug-unique name (`extend({ OkComputerSleeve: SleeveShader })` → `<okComputerSleeve …/>`), or use the component form `const Sleeve = extend(SleeveShader)`." The component form is valid per the source above, but I did not exercise it.
2. Add a guard to `scripts/check-registry.mjs`, which already runs in CI: collect every `extend({ Key… })` key under `covers/*/src/**` and fail when two slugs use the same key. The second team's PR then fails CI with a readable message instead of corrupting the gallery silently.
3. **Amend PHASE-X10.md step 2:** `_studio` registers its material under a studio-unique name. "Unchanged" becomes "unchanged except the `extend` key".
4. **Amend PHASE-X11.md step 6:** cover-shaders "Lab mapping" step 2 gets one sentence on renaming the `extend` key on the aggregator. Unit 9's `RimMaterial` never goes on a route, so it is unaffected.

Per amend-on-surprise, the X10 and X11 amendments belong in the same commit as this review.

### F2: P1, blocks DONE. Shipped files describe branch protection that does not exist; CONTRIBUTING never says the merge rule is a convention

**Evidence.** Branch protection returns 403 on this plan (§1.6). The README's Instructor notes (line 74) say so honestly. The other files do not:
- `CODEOWNERS:1`: "A PR touching any of these **needs** the instructor's review." Without protection and "require code-owner review", CODEOWNERS only *requests* a review.
- `CODEOWNERS:3`: "the human approval **required by branch protection** can come from a peer." There is no branch protection.
- `.github/workflows/lint-and-build.yml:1`: "Required check for every PR into main (**branch protection**: `lint-and-build`)."
- `CONTRIBUTING.md:127`, the student-facing file: "The required `lint-and-build` check must pass and **one human** must approve." Nothing in CONTRIBUTING says GitHub does not enforce this. TTOD's source says the opposite of the current state ("both are enforced automatically, not by convention"). The implementer correctly dropped that sentence but put no honest one in its place.

There is also a hazard the docs never mention. The repo is user-owned (`owner_type: User`), and on a personal repository a collaborator gets push access; there is no read-only collaborator role. Without protection, any student added as a collaborator can push or force-push `main`. The published assignment page (`units-8-9-assignment/index.md:111`) repeats the "must pass … must approve" wording.

**Fix.**
- In CONTRIBUTING step 6, add one sentence: "On the current plan GitHub does not enforce this: never push to `main`, never force-push; a direct push to `main` breaks the contract and is visible in the Actions log."
- Correct the two CODEOWNERS comments and the workflow comment.
- Record the professor decision as a new DECISIONS row (see the S1 ruling) **before** any student is added as a collaborator.

### F3: P2, does not block. `budget.js` (S2) is optional and works, but no published lesson names it

**Evidence.**
- `fork-a`, with no `budget.js`, renders and prints `· no CEILING in src/budget.js yet` (§1.3). The route lights without it.
- `grep -rn "budget\.js" web-foundations/docs/lessons/en/feii/` returns no hits.
- Unit 8 step 7 says "write it into `CEILING`", which in the fork lives in `BudgetProbe.jsx`, and that file does not move.
- cover-shaders line 152: "Until you update `CEILING`, the verdict reads `over ceiling`". On the aggregator, with no `budget.js` or a null `CEILING`, there is no verdict at all.
- CONTRIBUTING's task1 row, `_template/docs/renderer-info.md` and the PR-template checks all mention `src/budget.js`. Only the lessons are silent.

**Fix.** Add to PHASE-X11 one sentence each:
- in the Unit 8 Deliverable paragraph (line 959): "On your route the accepted `CEILING` moves to `covers/<slug>/src/budget.js` (copied from `_template`)";
- in cover-shaders Lab mapping step 3: "update `CEILING` in `src/budget.js`".

### F4: P2, does not block. README instructor review command fails as written

**Evidence**, in a scratch clone of the teaching repo on `main`:
```
$ git worktree add ../feii-album-covers-review main
fatal: 'main' is already used by worktree at '…/agg'      exit=128
```
TTOD's `reviewing-cohort-prs.md:61` has the same bug, so the README copied it.

**Fix.** `git worktree add --detach ../feii-album-covers-review origin/main`. `gh pr checkout` then moves it onto each PR branch. The TTOD guide is out of scope here; mention it to the owner.

### F5: P2, does not block. A post-processing pass cannot be measured, or even added, on the aggregator

**Evidence.**
- `src/lib/BudgetProbe.jsx` is the Unit 8 probe. Unit 9's own table (lines 444–447) shows the Unit 8 probe reading `calls 1` with Bloom on, against 23 for the per-frame probe.
- Unit 9 step 5 tells students to swap the probe if they add a pass. On the aggregator, `src/lib/` is instructor-owned (CONTRIBUTING:19, CODEOWNERS).
- `@react-three/postprocessing` is not a dependency, and `package.json` is instructor-owned.
- The assignment allows one pass with before-and-after readings.

**Fix.** Amend PHASE-X10 to ship Unit 9's per-frame probe as `src/lib/BudgetProbe.jsx`. Unit 9 measured it identical to the Unit 8 probe without a composer: 6 / 1368 / 6 / 1. Then either add the post-processing pin, or have X11 state on the assignment page that the aggregator supports zero passes.

### F6: P2, does not block. Every team's task1 PR conflicts on `covers/registry.json`

**Evidence**, in a scratch clone: two branches each append one object to `[]`. I squash-merged A, then ran `git rebase main` on B: `Could not apply 5addd39... # b`. Concurrent appends to one JSON array always touch the same lines.

**Fix.** Add one sentence to CONTRIBUTING step 2: "If `registry.json` conflicts, rebase on `main` and keep both objects; `npm run lint` checks the result." A per-slug metadata file would remove the conflict entirely, but it changes REPO-SHAPE, D4 and D15, so it is out of scope for X9.

### F7: P2, does not block. Present tense for a transcoder that does not exist yet

**Evidence.**
- `CONTRIBUTING.md:83`: "the gallery **vendors** one shared copy at the site root".
- `covers/_template/src/sleevePicture.js:16–17`: same present tense.
- There is no repo-root `public/` at `0e87d73`.
- `README.md:76` correctly says "when the KTX2 loader lands".

**Fix.** Either change the wording to "will vendor (X10)", or leave it: X10 Acceptance already requires `public/basis/`, so the text becomes true once X10 lands. Re-check during X10's cold review.

### F8: P2, does not block. CODEOWNERS leaves instructor documents unowned

**Evidence.** `CODEOWNERS` does not list `/README.md`, `/CONTRIBUTING.md`, `/index.html` or `/.gitignore`. A student PR that edits the contract text does not auto-request the instructor. Leaving `covers/registry.json` unowned is intentional and correct.

**Fix.** Add those four paths. Adding `_template` beyond what REPO-SHAPE lists is fine; see §5.

### F9: P2, does not block. "No MCP homework" never says "MCP"

**Evidence.**
- CONTRIBUTING:169: "**Assistant-server, design-generator, or editor-plugin installs** as homework".
- README:65: "No assistant servers, design generators, or editor plugins".
- The assignment page names "An MCP server, MCP shopping, Stitch, 21st.dev".

The intent is met, but a student searching for "MCP" finds nothing.

**Fix.** Name them plainly, as the assignment page does.

### F10: P2, does not block. The exit gate's prop check would pass against a route that never passes the props

**Evidence.** `rg -q "\bhovered\b" src -g '*.jsx'` is satisfied by the `useState` line in `CoverRoute.jsx:70` alone (failure mode 3). The contract does hold: I verified it by rendering (§1.3), not through this check.

**Fix**, for later gates: a multiline grep for `<Cover[\s\S]*?hovered=\{` in `CoverRoute.jsx`, or a build of a route assembled from the lesson's fences, as in §1.3.

### F11: P2, does not block. CI action majors run on deprecated Node 20

**Evidence.** The run annotation in §1.6. The jobs pass because the runner forces Node 24.

**Fix.** Bump `actions/checkout` and `actions/setup-node` once their current majors are verified. This is cosmetic.

---

## 4. D21 fidelity (TTOD → cover routes)

I checked against `~/src/ttod/docs/public/guides/contributing.md`, `reviewing-cohort-prs.md` and `.github/pull_request_template.md`.

| D21 element | Aggregator | OK |
| --- | --- | --- |
| Named branch from `main` | `cover-<slug>-task<N>-<short-topic-name>` (CONTRIBUTING:95, `_template/README`, PR template comment) | yes |
| Own boundary | `covers/<slug>/**` plus one registry object (CONTRIBUTING:14–19) | yes |
| PR template | Same section order as TTOD. "Contract adherence" is remapped to the route. "Test coverage" becomes "Checks". A "Rights" section is added. AI Review Log and the "AI never approves or merges" line are verbatim. Complete against the REPO-SHAPE list. | yes |
| CI plus one human approval | Workflow `pull_request` + push to main, then `npm ci`, lint, build; no secrets; `permissions: contents: read`. Enforcement: see F2. | partly (F2) |
| AI Review Log | Two columns; "incomplete, not under-documented"; a bot comment is not the log (TTOD wording carried over) | yes |
| Small staged PRs | task1 to task4 table | yes |
| Cross-cover PR and review | task4, plus "Cross-cover work" with `gh pr review` | yes |
| Bots never approve or merge | CONTRIBUTING:127, PR template, README | yes |
| `qa-007` | Epigraph text matches `ttod.yml:2597` exactly | yes |
| No seam names as branches | §2 item 8 | yes |
| No quote-proposal | Only named as "does not ask for" | yes |
| No cloud `pr-review.yml` | `.github/workflows/` holds only `lint-and-build.yml` | yes |
| Instructor review in a sibling worktree | README Instructor notes. The command is defective (F4). | partly (F4) |
| Covenant linked; no private links (D20) | §1.5 | yes |

---

## 5. Rulings

**S1: branch protection returns 403.**
- PHASE-X9 Risks call this still-success when the workflow exists, and it does. The 403 alone does not block.
- What blocks is that three shipped files say the opposite (F2).
- The professor must decide before any student becomes a collaborator. Record it as a new DECISIONS row (D23):

  | Option | Effect |
  | --- | --- |
  | (a) Upgrade the owner account (GitHub Pro, or a GitHub Education teacher benefit; check current terms) | Enables protection and rulesets on this repo |
  | (b) Transfer the repo to an organisation on a Team/Education plan | Also brings a **Read** role and required code-owner review |
  | (c) Make the repo public | **Ruled out by D6/D8** |
  | (d) Accept convention-only enforcement | Document the force-push risk in writing and keep local mirrors |

- X10 step 7 ("not a direct commit to main if protection is live") is consistent with today's facts and needs no change.

**S2: `budget.js`.**
- It is not a hidden requirement. A route lights without it (verified), so "moves over unchanged" holds for `Cover.jsx` and `parts.js`.
- What it is: an undocumented *relocation* of a value students set in the fork. X11 must add the two sentences in F3.
- The assignment page also needs nothing beyond what CONTRIBUTING's task1 row already says, once Unit 8 names the file.

**S3: links to cover-shaders and ktx2-basis return 404 on the live site.**
- Confirmed today: both return 404. The assignment, covenant, Unit 8, Unit 6 and both TTOD guide links return 200.
- Cause: those lessons are unpublished (D14 forbids pushing web-atelier). The links are correct for the configured baseurl.
- Does not block X9. Whatever phase publishes must re-check them; X12 or the merge checklist should own a link probe after publication.

**Deviations from the brief and REPO-SHAPE.** All are accepted. None should be reverted.

- **`_template/public/sleeve.png` instead of only `.gitkeep`.** Accept. The pattern needs a real file to resolve, and the file is original geometry (§1.5). The report records how it was made (a stdlib PNG writer). Optional: commit the generator, or add one line on it to `_template/README`.
- **`scripts/check-registry.mjs`.** Keep. Every negative case fails (§1.4), CI gets a meaningful schema check, and it is the natural home for F1's guard.
- **`src/theme/tokens.js`.** Keep. It matches the owner's standing preference for no hard-coded design values, and the values equal the Unit 8 sandbox's.
- **`CanvasErrorBoundary`.** Keep. It is rule 00's DOM fallback, and it resets per slug because `CoverStage` is keyed by slug.
- **`_template` in CODEOWNERS.** Keep. It is consistent with CONTRIBUTING:19.
- **Cursor rules adapted rather than extracted.**
  - What I checked: I extracted the five `mdc` fences from the private source (`b38bc07e…`, the same file the report names) and diffed each against the shipped rule. The structure is kept: frontmatter, description, section headings, and every invariant that still applies.
  - What was replaced: the stack, structure and glob lines were rewritten for this repo (JavaScript, no shadcn or Tailwind, `covers/<slug>` layout).
  - Rule 30: "`#version 300 es`" became "three prepends it", and precision is set only through `material.precision`. This deviation is **justified**. Unit 9 lines 380 and 384 say exactly that, its failure list at line 411 names the double-precision trap, and cover-shaders' `SleeveMaterial` sets `material.precision = 'mediump'` in the callback. I confirmed that three 0.185.1 prepends the version at `WebGLProgram.js:805`.
  - Rule 20: `dpr [1,2]` became `[1,1.5]`, matching Unit 8.
  - Dropping the LFS and asset-manifest lines is appropriate.
  - Exactly 00, 20, 30, 40 and 50 ship; no 10, 60 or 70.
  - Accept. Record in D7 that the rules are "recycled and adapted", so the next reader does not expect byte-identical extracts.
- **Additions do not contradict any published lesson.** The `extend` gap (F1) and the probe limitation (F5) come from what the scaffold lacks, not from these additions.

---

## 6. Agentic failure modes

1. **Load every module.** Every `src/` and `covers/*/src/` module was loaded by a real build and by a headless render, including route chunks loaded lazily over the network. The two scripts were run directly.
2. **Full suite.** The repo has no test suite. The lint (ESLint plus the registry check) and the build are the suite, and both pass from a clean `npm ci`. CI is green on both commits.
3. **Would the gate have failed against broken code?** Not for the prop check (F10). The pins, file and seam checks would.
4. **Arity and shapes.** `withinCeiling(sample, ceiling)` matches its callers. `BudgetProbe`'s `onSample` shape matches the panel. The `import: 'CEILING'` glob returns the value or `undefined`, mapped to `null`. Rendering confirmed all three.
5. **Discriminated modes.** Not applicable. The one tri-state, `withinCeiling` returning null, true or false, is documented and rendered.
6. **Docs are claims.** I ran the README's run commands, `BASE_PATH` build and preview, and worktree command (it fails: F4). I ran CONTRIBUTING's lint and build and the `_template` copy flow, and its typo claim (holds). The protection claims are false in CODEOWNERS and the workflow (F2); the present-tense transcoder claim is premature (F7).

---

## 7. Downstream phase amendments (amend on surprise; same commit as this review)

| Phase file | Add |
| --- | --- |
| `PHASE-X10.md` | (F1) Step 2: `_studio`'s material uses a studio-unique `extend` key, so "reuse unchanged" means "except the key". (F5) Ship Unit 9's per-frame `BudgetProbe` in `src/lib`. (F7) The transcoder lands at root `public/basis/` (already in Acceptance). |
| `PHASE-X11.md` | (F1) Cover-shaders Lab mapping step 2: the `extend`-key sentence. (F3) Unit 8 Deliverable and cover-shaders step 3: `CEILING` lives in `covers/<slug>/src/budget.js`. (F2) Assignment line 111: wording matching whatever S1 decision is recorded. (F5) The post-pass rule on the aggregator, if X10 does not add the dependency. |
| `DECISIONS.md` | D23, the protection decision (S1). D7 note: rules "recycled and adapted". |

To close X9: fix F1 (CONTRIBUTING item 3 plus the `check-registry` guard) and F2 (CONTRIBUTING sentence plus the CODEOWNERS and workflow comments) in the aggregator, push, confirm CI is green, then re-review those two diffs. F3 to F11 can ride with X10 and X11 as listed.

---

## Round 2

**Reviewer:** cascade-cold-reviewer, a fresh session. I did not implement X9, its triage, or the orchestrator's pack amendments.
**Reviewed:** aggregator `bb5e324` (parent `0e87d73`, equal to `origin/main`), CI run `41999332138`, and the uncommitted pack diff in the X9 worktree (X9 gate, X10, X11, DECISIONS D7 and D23).
**Date:** 2026-11-05

**Verdict: F1 and F2 are closed. 0 blocking findings.** The five new findings (G1–G5) are all P2. X9 can go to the product owner for DONE.

What I did not touch:
- the aggregator, the lessons and the pack (only this file was appended);
- git (nothing committed, nothing pushed);
- GitHub settings (read-only calls only).

Afterwards, `git -C feii-album-covers status --short` is empty, `worktree list` shows only `main`, and HEAD is `bb5e324`.
- The scratch clone (`git clone` under the scratchpad), its headless Chrome profile and the preview server were deleted or stopped.
- I kept the evidence scripts: `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/r2x9/walk.mjs`, `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/r2x9/mkmat.py` and `/private/tmp/claude-501/-Users-ruvebal-projects-ruvebal-scholar-udit-web-atelier-udit/bba99ff2-c426-4720-aead-b92b596d32b2/scratchpad/r2x9/mkcover.py`.
- My exit-gate re-run rebuilt the ignored `dist/` in the real tree, as every harness run does.

### R2.1 F1: runnable evidence (scratch clone of `bb5e324`, `npm ci` exit 0)

**The lesson code was extracted by me from the published fences, not taken from the implementer's scratch files:**
- `SleeveMaterial.jsx`: cover-shaders lines 248–324;
- `sleevePicture.js`: lines 168–236;
- `Cover.jsx` and `parts.js`: Unit 8's cover-fork Templates.

My `SleeveMaterial.jsx` is byte-identical to the implementer's `lesson-SleeveMaterial.jsx`. `_template` still matches Unit 8: `COVER-IDENTICAL` below the header, `PARTS-IDENTICAL`. `Cover-shader.jsx` is the lesson `Cover.jsx` with cover-shaders' "three changes" applied verbatim (`mkcover.py`).

**(a) Two routes, the lesson's `SleeveMaterial.jsx` unchanged** (`cmp` confirms both are byte-identical to the fence):
```
$ npm run lint      # registry: blue-lines, ok-computer
R3F extend key "SleeveShader" is registered by "blue-lines" (covers/blue-lines/src/SleeveMaterial.jsx) and "ok-computer"
(covers/ok-computer/src/SleeveMaterial.jsx). Extend keys are shared by every route, … See Route contract 3 in CONTRIBUTING.md.
LINT EXIT=1
```
**(b) Slug-unique keys and (c) the component form.** I ran `mkmat.py` on the lesson file. Each copy changes only the extend line and the JSX element, and adds a `// MARK <slug>` line in the fragment shader plus a `useEffect` probe that pushes `{route, mark (from the material's fragmentShader), own: ref instanceof this file's SleeveShader}`.

| Route | How the material is registered |
| --- | --- |
| `blue-lines` | `extend({ BlueLinesSleeve: SleeveShader })` |
| `ok-computer` | `extend({ OkComputerSleeve: SleeveShader })` |
| `comp-a`, `comp-b` | `const Sleeve = extend(SleeveShader)` → `<Sleeve …/>` |
| `ctl-a`, `ctl-b` | **Control:** the shared lesson key `SleeveShader` (lint refuses it, but the build does not) |
| `fork-a` | The Unit 8 fork's `Cover.jsx` and `parts.js` only: no `budget.js`, no `sleevePicture.js` |

```
lint (without ctl-*)  → registry ok (5 covers; 2 R3F extend keys, none shared)   exit 0
lint (with ctl-*)     → R3F extend key "SleeveShader" is registered by "ctl-a" … and "ctl-b" …  exit 1
BASE_PATH=/feii-album-covers/ npm run build → ✓ built in 1.54s   exit 0
```
I served the build with `vite preview --base /feii-album-covers/` and drove headless Chrome (SwiftShader) over CDP with `walk.mjs`. The driver navigates by **clicking the gallery's own links**: Home → route → "All covers" → next route. That is one SPA session, with one navigation entry for the whole walk.
```
blue-lines   probe={"route":"blue-lines","mark":"blue-lines","own":true}
ok-computer  probe={"route":"ok-computer","mark":"ok-computer","own":true}
blue-lines   probe={"route":"blue-lines","mark":"blue-lines","own":true}
ok-computer  probe={"route":"ok-computer","mark":"ok-computer","own":true}
comp-a       probe={"route":"comp-a","mark":"comp-a","own":true}
comp-b       probe={"route":"comp-b","mark":"comp-b","own":true}
comp-a       probe={"route":"comp-a","mark":"comp-a","own":true}
comp-b       probe={"route":"comp-b","mark":"comp-b","own":true}
ctl-a        probe={"route":"ctl-a","mark":"ctl-a","own":true}
ctl-b        probe={"route":"ctl-b","mark":"ctl-b","own":true}
ctl-a        probe={"route":"ctl-a","mark":"ctl-b","own":false}      ← control: the F1 defect still reproduces
blue-lines   probe={"route":"blue-lines","mark":"blue-lines","own":true}   ← unaffected after the collision
comp-b       probe={"route":"comp-b","mark":"comp-b","own":true}
fork-a       #root: … Sleeve Vinyl Stage … calls 3 · triangles 280 · geometries 3 · textures 1 · no CEILING in src/budget.js yet
full page loads during walk: 1 (initial 1)
console errors/warnings/exceptions: warning THREE.Clock: This module has been deprecated…   (already present; from R3F/three)
```
The control matters. The same harness that shows both remedies correct also shows the shared key failing, so the probe can tell the cases apart.

**(c) The component form, in source** (R3F `9.8.2`, `node_modules/@react-three/fiber/dist/events-e51d7528.esm.js`):
- `:16588–16596`: `if (typeof objects === 'function') { const Component = \`${i++}\`; catalogue[Component] = objects; return Component; }`.
- The lookup is `catalogue[toPascalCase(type)]` (`:16581`, `:16614`). `toPascalCase("0")` is `"0"`.
- The typings declare it officially: `dist/declarations/src/core/extend.d.ts:11`, `extend<T extends ConstructorRepresentation>(objects: T): React.ExoticComponent<ThreeElement<T>>`.
- `react-three-fiber.esm.js:40`, `useMemo(() => extend(THREE), [])`, confirms why three.js names are banned.

**The guard's blind spots.** Each case below ran `node scripts/check-registry.mjs` with `ok-computer` already holding `OkComputerSleeve` and a second file in `fork-a`:

| Case | Result |
| --- | --- |
| `import { extend as reg } …; reg({ OkComputerSleeve: X })` | exit 0. **Missed** (disclosed by the implementer) |
| `const re = /'/;` before `extend({ OkComputerSleeve: X })` | exit 0. **Missed** (disclosed) |
| JSX text `<p>Don't panic</p>` before `extend({ OkComputerSleeve: X })` in the same file | exit 0. **Missed, not disclosed** (G1) |
| `const mats = { OkComputerSleeve: X }; extend(mats)` | exit 0. **Missed, not disclosed**: treated like the component form (G1) |
| `R3F.extend({ OkComputerSleeve: X })` (namespace import) | exit 1. Caught |
| Plain duplicate / `extend({ Mesh: X })` / `_studio/src/materials/` vs a student | exit 1 / exit 1 / exit 1. Caught |

**Judgment: acceptable at P2.**
- Every miss is a false negative; none is a false positive.
- Each miss needs the extend call written in an unusual form, or an apostrophe in JSX *before* the call in the same file. The lesson places `extend` at module top, before any JSX.
- The lesson's own form, the one every team starts from, is caught.

### R2.2 F2: D23 wording, checked file by file

I ran `git grep -n -i -E "required|protect|enforc|force-push|must pass|must approve|convention|D23|ruleset"` and `… "approv|merg|push"` over `bb5e324`.

**No shipped file claims GitHub enforcement.** The remaining "required"/"enforce" hits are the AI Review Log heading and rule-file style headings.

| File:line at `bb5e324` | Says | Matches D23 |
| --- | --- | --- |
| `CODEOWNERS:1–7` | requests a review, does not block a merge; course rule held by the instructor merging only through PRs | yes |
| `lint-and-build.yml:1–2` | "A course rule, not GitHub branch protection (not available on this plan…)" | yes |
| `CONTRIBUTING.md:8` | "a CI check that must pass" (the word "required" is gone) | yes |
| `CONTRIBUTING.md:158–160` | course rule; GitHub enforces neither the check nor the approval; collaborators have push access including to `main`; **"never push or force-push `main` yourself; always open a PR"** | yes. The force-push sentence is present |
| `README.md:64` | course rule, instructor merges only through PRs, links step 6 | yes |
| `README.md:75` | "Merge rule (D23, option d)": the 403 quoted; personal account; **"a student could push or force-push `main`"**; keep a local mirror | yes. The force-push risk sentence is present |
| `README.md:76` | CODEOWNERS "requests…; it does not block a merge" | yes |
| `.github/pull_request_template.md:46` | "AI never approves or merges… A human approves." | consistent |

The DECISIONS D23 row in the worktree diff says: convention-only on personal `ruvebal`; 403 on protection and rulesets; "course rule, enforced by the instructor merging only through PRs"; collaborators technically have push access; CONTRIBUTING says never push or force-push `main`; no Pro, no org, not public. **That is the same rule the files state.** Two precision gaps remain; see G4.

GitHub state, read-only:
- `branches/main/protection` still returns 403;
- the repository is `PRIVATE`;
- collaborators: `["ruvebal"]`, so no student has push access yet, and D23 was recorded in time;
- `codeowners/errors` has length 0.

### R2.3 P2 closures

| # | Evidence | Status |
| --- | --- | --- |
| **F4** | I took the command from `README.md` with `grep -o` and `eval`'d it in a fresh scratch clone with `main` checked out. Output: `Preparing worktree (detached HEAD bb5e324)`, `exit=0`; `worktree list` shows `[main]` and `(detached HEAD)`. Clone deleted. | **closed** |
| **F6** | The recipe is in CONTRIBUTING:128–137. Sort enforcement: `_studio, blue-lines, fork-a, ok-computer` gives `registry ok`; the same list with `_studio` last gives `"_studio" must come before "ok-computer". Expected order: _studio, …` exit 1. **X10 is not broken.** X10 adds `_studio` to an empty array, and `_` (0x5F) sorts before every lowercase-initial slug, so `_studio` stays first for good. No X10, X11 or X12 step and no lesson appends to the registry in a fixed position (`grep -n registry` over those files). The X10 gate's Python reads the registry without caring about order. X10 step 2 now names the rule. | **closed** |
| **F7** | "will vendor … not in the repository yet" appears at CONTRIBUTING:83, `_template/src/sleevePicture.js:15–18` and README:77. There is no repo-root `public/` at `bb5e324` (`ls public` → no such file). Rule 40:21 is present tense with "(lands with the KTX2 loader)", and X10 step 2 now asks for it to be re-checked. | **closed**; re-check at X10 |
| **F8** | CODEOWNERS:17–20 add the four paths. GitHub `codeowners/errors` returns 0 errors. | **closed** |
| **F9** | CONTRIBUTING:202 and README:66 name "MCP servers, MCP shopping, Stitch, 21st.dev". | **closed** |
| **F11** | The tags exist: `actions/checkout` `v7` → `3d3c42e5…` (latest release v7.0.1, 2026-07-20) and `actions/setup-node` `v7` → `949feb24…` (latest v7.1.0, 2026-10-08). Both `action.yml` files at v7 declare `using: node24`. The CI log of run `41999332138` shows `Download action repository 'actions/checkout@v7' (SHA:3d3c42e5…)` and `'actions/setup-node@v7' (SHA:949feb24…)`, which are the same SHAs. Head `bb5e324c…`, conclusion `success`, every step `success`. The only annotation left is the Ubuntu 26 notice, so the Node 20 warning is gone. CI exercised the guard only on an empty registry: `registry ok (0 covers; 0 R3F extend keys, none shared)`. | **closed** |
| F3 | Carried in PHASE-X11 step 9, as text only (G3). | carried |
| F5 | Carried in PHASE-X10 step 2 and PHASE-X11 step 9, as text only (G3). | carried |
| F10 | X9 gate amended. Partly effective (G2). | partly |
| S1 | D23 CONFIRMED (option d). | closed |
| S2 | Carried in X11 (F3). | carried |
| S3 | X11 step 9: "re-check the two satellite links once published". | carried |
| §7 D7 | The D7 status note says "recycled **and adapted** … not extracted byte for byte". | closed |

### R2.4 Regressions

- **Clean tree, scratch clone of `bb5e324`.** `npm ci` exit 0; `npm run lint` gives `registry ok (0 covers; 0 R3F extend keys, none shared)`, exit 0; `npm run build` gives `✓ built in 1.61s`, exit 0.
- **Cascade exit gate (amended), re-run by me on the live aggregator.** Output: `pins match; no cloud SDK` / `origin: git@github.com:ruvebal/feii-album-covers.git` / `OK PHASE-X9.exit-gate.sh`, `GATE EXIT 0`. This agrees with `PHASE-X9-VERIFY-LOG.md`: the log was written at 10:06:20 and the amended gate is dated 09:57:06, so the harness ran the amended gate.
- **Route contract.** `fork-a`, which holds only the Unit 8 fork's `Cover.jsx` and `parts.js` plus one registry row, lights with `calls 3 · triangles 280 · geometries 3 · textures 1` (R2.1). The two shader routes with the lesson's three changes also render, and `src/` was untouched.
- **No new dependencies.** `bb5e324` touches no `package*.json`. `check-registry.mjs` imports `three`, which is already a dependency. `git grep -c -iE "openai|anthropic" -- package.json package-lock.json` finds nothing.
- **IP.** `bb5e324` adds no image (`--stat` lists none).
- **Cursor rules.** `.cursor/rules/` holds exactly `00-project`, `20-r3f-patterns`, `30-shaders`, `40-asset-pipeline`, `50-performance`.

### R2.5 Pack amendments

**DECISIONS.**
- D23 is `CONFIRMED 2026-11-05 (professor; option d …)`.
- D7 carries the "recycled and adapted" note.
- The status column has no `PROPOSED`, `OPEN` or `TBD` row: `grep -n -E "PROPOSED|OPEN|TBD|DECIDED"` hits only the header sentence "No `PROPOSED` rows remain".
- The parent branch's MERGE-CHECKLIST commit `c457510` (not in this worktree) states the same decision.

**X9 gate.** The prop check is better than round 1's but can still be satisfied the wrong way, and the extend check is a word grep (G2).

**X10 and X11.** The amendment text is correct, but none of it reaches Acceptance or a gate (G3). X10 step 7 is now stale (G5).

### Round 2 findings

#### G1: P2, does not block. Two guard blind spots are not in the implementer's disclosed list

**Evidence (R2.1 table).**
- An apostrophe in JSX text (`<p>Don't panic</p>`) before an `extend({ … })` call in the same file. `mask()` treats `'` as the start of a string, runs to the next `'` and blanks everything in between. Result: exit 0.
- `extend(mats)` with an object variable is skipped as if it were the component form, and it is not reported as uncheckable either. Result: exit 0.

The report's "Guard limits" item 4 lists only aliased imports and regex literals.

**Fix**, riding with X10 (instructor-owned `scripts/`):
1. Fail with the existing "cannot be checked" message when `extend` is imported under an alias (`extend as`) and when `extend(` takes an identifier bound to an object literal in the same file.
2. List all four limits in the script header and in CONTRIBUTING item 3 ("lint is a backstop").

The JSX-apostrophe case can be removed by restricting `mask()` to code before the first JSX `return`, or by documenting "call `extend` at module top", which the lesson already does.

#### G2: P2, does not block. The amended X9 gate can still pass the wrong code and fail the right code

**Evidence.**
- **Extend check.** `rg -qi "extend" scripts/check-registry.mjs` passes on the word anywhere, a comment included. It does discriminate against the pre-fix script (`git show 0e87d73:scripts/check-registry.mjs | grep -ci extend` → `0`), but a one-line comment stub would also pass.
- **Prop check.** I mutated a copy of `src/` and ran the gate's own loop:
  ```
  real                                                   -> ok
  M1 onSelect dropped from <Cover>                       -> REFUSED(onSelect)      (good)
  M2 <Cover /> gets NO props; props put on <CoverStage>  -> ok                     (wrong: `<Cover[^>]*` prefix-matches <CoverStage)
  M3 valid code: onHover={(id) => setHovered(id)} before selected= -> REFUSED      (wrong: `[^>]*` stops at the arrow's `>`)
  with anchor `<Cover\s`:  M2 -> REFUSED, real -> ok
  ```

**Fix**, in `PHASE-X9.exit-gate.sh` (it is reused when the merge is checked):
- Anchor the pattern as `<Cover\s`.
- Replace the extend word grep with a behavioural check: copy `_template` twice into a temporary clone, drop the lesson's `SleeveMaterial.jsx` into both, and assert that `node scripts/check-registry.mjs` exits 1 and prints both slugs. Delete the clone afterwards.
- M3 is a false refusal, not a false pass. Note it in the gate comment so a later edit to `CoverRoute.jsx` does not get "fixed" the wrong way.

#### G3: P2, does not block. The X10 and X11 carry-overs are prompt text only; no Acceptance line or gate checks them

**Evidence.**
- `PHASE-X10.exit-gate.sh` runs lint. With `_studio` as the only registrant, `extend({ SleeveShader })` there passes lint, because the guard needs two folders. So X10 can ignore its new step-2 key rule and stay green. The first student who drops in the lesson file then gets a CI failure naming `_studio`. That is loud, not silent, which is why this is P2.
- No X10 check covers the per-frame `BudgetProbe`. Unit 9's version is identifiable by `gl.info.autoReset = false` at Unit 9 L482.
- X10 Acceptance has no line for either.
- `PHASE-X11.exit-gate.sh` and X11 Acceptance contain nothing for the four step-9 items (`grep -n -i "extend|budget|force|convention|111"` returns no hits).

**Fix (amend-on-surprise, same commit as this review): `PHASE-X10.md` and `PHASE-X10.exit-gate.sh`.**
- Acceptance line plus gate check `! rg -U "extend\(\s*\{\s*SleeveShader\s*\}" covers/_studio/src`.
- Acceptance line plus gate check `rg -q "autoReset" src/lib/BudgetProbe.jsx`.

**Fix: `PHASE-X11.md` and `PHASE-X11.exit-gate.sh`.** Acceptance lines plus greps:
- the cover-shaders Lab mapping section mentions `extend`;
- `budget.js` appears in Unit 8's Deliverable paragraph and in cover-shaders step 3;
- `units-8-9-assignment` around L111 contains the D23 sentence ("never push or force-push `main`" or equivalent) and no bare "must pass … must approve" without the course-rule qualifier.

#### G4: P2, does not block. Two precision gaps in the D23 wording

**Evidence.**
1. **Who merges.** `CONTRIBUTING.md:158` says "A human merges", and `:160` says the rule is "held by the instructor merging only through pull requests". Neither tells a student not to press **Merge** themselves. On a personal repository a collaborator has write access and can merge their own PR with red CI or no approval; nothing technical stops it. D23's mechanism, the instructor as merger, only works if students do not merge. The D23 row is ambiguous on this too.
2. **What a force-push leaves behind.** `README.md:75` and `CONTRIBUTING.md:160` say a direct push "shows in the commit history and the Actions log". A force-push can *remove* commits from `main`'s history. What survives is the `push` run in Actions (the workflow triggers on push to `main`) and the repository activity view. The parent branch's MERGE-CHECKLIST (`c457510`) says "watch the commit log for direct pushes", which has the same gap. README's "Keep a local mirror" is the real mitigation, and it is present.

**Fix.**
- The product owner states in D23 whether students may press Merge, for example "only the instructor merges". CONTRIBUTING step 6 then says it in one clause.
- Reword the detection claim as: "shows in the Actions log and the repository's activity; a force-push can erase commits from history, which is why the instructor keeps a local mirror."

This can ride with X10, since README and CONTRIBUTING are instructor-owned. X11's assignment-page sentence should match whatever D23 says.

#### G5: P2, does not block. PHASE-X10 step 7 is stale under D23, and the instructor's own direct pushes are not reconciled with "merging only through PRs"

**Evidence.**
- X10 step 7 says "not a direct commit to main **if protection is live**". Under CONFIRMED D23, protection is never live, so the clause now reads as permission to commit directly to `main`.
- The X9 triage pushed `bb5e324` directly to `main` and calls that "the instructor's path for now" (REPORT, Triage round 1).
- D23 says "enforced by the instructor merging only through PRs".
- No student is a collaborator yet (collaborators: `["ruvebal"]`), so nothing was harmed.

**Fix (amend-on-surprise): `PHASE-X10.md` step 7.**
- Either drop the condition ("branch + PR into main, merged by the instructor; no direct commit to main"),
- or record in D23 an explicit carve-out ("the instructor may push directly to `main` until the first student is added as a collaborator").

This is the product owner's choice.

### Notes (not findings)

- `PHASE-X9-REPORT.md` "Not closed" item 1 ("D23 … still reads OPEN") is stale. The worktree's DECISIONS row is now CONFIRMED. Items 2 to 6 are carried by the X10 and X11 amendments.
- A lowercase key (`extend({ okComputerSleeve })`) is not flagged as a duplicate of `OkComputerSleeve`. R3F looks elements up in PascalCase, so the lowercase registration crashes on its own route the first time it is visited in isolation. That makes it self-revealing in `npm run dev`. No action.

### Round 2 verdict

- **F1 closed.** The contract text is in four places; the guard fails the lesson file in two slugs and names both. Rendered over repeated in-session visits, slug-unique keys and the component form each show their own shader, while a control with the shared key still swaps.
- **F2 closed.** No file claims GitHub enforcement, the force-push sentence is present in CONTRIBUTING and README, and the wording matches D23.
- **P2 closures.** F4, F6, F7, F8, F9 and F11 are verified closed. F3 and F5 are carried as text, and F10 is partly closed.
- **No regressions** in lint, build, the route contract, dependencies, IP or the rule set.
- **New findings.** G1–G5, all P2. Blocking count: **0**.
- **Amendments.** G2, G3 and G5 name `PHASE-X9.exit-gate.sh`, `PHASE-X10.md` with `PHASE-X10.exit-gate.sh`, and `PHASE-X11.md` with `PHASE-X11.exit-gate.sh`. They belong in the same commit as this review. G4 needs a one-clause D23 clarification from the product owner.
- **DONE** is the product owner's decision, not this review's.
