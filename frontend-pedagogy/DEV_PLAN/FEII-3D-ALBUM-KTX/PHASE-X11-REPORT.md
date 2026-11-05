# PHASE-X11 report — publication gates and running references

**Status:** DONE

## Cold-review triage

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- |
| F1 — shader diagnostic called a vertex compile error a linker error | P1 | Yes, until fixed | CLOSED by a fresh executor: one-line deletion is now described as a vertex compile error; deleting both vertex-side lines while the fragment still reads `vUv` is the linker-error case. Round-2 review revalidated it. |
| Round-2 findings | — | No | None; build, publication safety, citation conformance, firewall, registry, D24 caveats, and diff integrity all passed. |

## Scope completed

- Registered and rendered the assignment plus both satellites, keeping their
  existing unique lesson slugs and English-only registry keys aligned with the
  source directories.
- Added the carried X6/X7/X8/X9 corrections to the published lab instructions:
  the mandatory Unit 8 fork is explicitly a lab sandbox, `parts.js` is named
  as cover-fork-only, the aggregator owns a route-local `src/budget.js`, and
  the shader lab requires a slug-unique R3F `extend` key.
- Corrected the KTX2 wording so the packed-file transfer tag, rather than the
  hand-tagged PNG path, is what three.js copies into `texture.colorSpace`; an
  embedded-profile tag is not named before the lesson defines colour profile.
- Added the requested D24 running-reference line directly beneath every
  CodeSandbox-ready or Template block in the Unit 8 cover-fork lab, the
  cover-shaders satellite, and the KTX2 satellite.
- Added the assignment's running-reference list, the collaborator-onboarding
  clause, the private `_studio`/`_template` distinction, and D23-consistent
  course-convention wording for `main` and instructor-only merges.

## Files changed

- `web-foundations/docs/lessons/en/feii/unit-8-r3f-fundamentals/index.md`
- `web-foundations/docs/lessons/en/feii/cover-shaders/index.md`
- `web-foundations/docs/lessons/en/feii/ktx2-basis/index.md`
- `web-foundations/docs/lessons/en/feii/units-8-9-assignment/index.md`
- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X11-REPORT.md`

## Runnable evidence

| Check | Observed result |
| --- | --- |
| Worktree identity | `.cascade-lane` is `FEII-3D-ALBUM-KTX`; branch is `cascade/FEII-3D-ALBUM-KTX-11`. |
| Lesson build | With the repository rbenv/NVM PATH, `npm run build` exited 0; publication safety and citation conformance both passed. |
| Liquid | `Liquid Warning` count was 0. |
| Published pages | `_site/lessons/en/feii/units-8-9-assignment/index.html`, `cover-shaders/index.html`, and `ktx2-basis/index.html` exist. |
| Publication firewall | The three rendered paths have no `ahmes`, `deviac`, `evaluator_safe`, or `BIBLIO-GAP` match. |
| Registry | `feii-units-8-9-assignment`, `feii-cover-shaders`, and `feii-ktx2-basis` resolve to existing lesson source files; satellite statuses remain `complete`. |
| Aggregator re-check | `instructor-studio-x10` at `2491a0f` is clean. `npm run lint` and `BASE_PATH=/feii-album-covers/ npm run build` pass. The route passes all five props; its one root `public/basis/` pair is reached by `import.meta.env.BASE_URL + 'basis/'`; route images use `new URL('../public/...', import.meta.url)`; the route-local budget is `covers/<slug>/src/budget.js`. |
| D24 link state | All eleven requested live/source URLs currently return HTTP 404, as expected while `satellites-ex3-ex5` remains unpushed and Pages has not switched/published it. The published lesson text calls them reference routes in `react-template` **(being published)**. Exact required next action: publish react-template first — push the reviewed branch and set Pages source to GitHub Actions. |
| Diff integrity | `git diff --check` exited 0. |
| F1 shader diagnostic repair | The cover-shaders failure-mode bullet now distinguishes the vertex compile error from deleting only `varying vec2 vUv;` (while `vUv = uv;` remains) from the linker error caused by deleting both vertex-side lines while the fragment varying remains. |

## Boundary and uncertainty

- The D24 URLs are deliberately present but not claimed live. Their 404 status
  is a publication dependency, not an invented link or a lesson-build defect.
- The private aggregator reference is accurately described as collaborator-only
  through `npm run dev`; teams copy `_template`, never `_studio`.
- No build, source, credential, or GitHub setting was changed outside this
  phase worktree. No `web-atelier-udit` branch was pushed or merged.

## Exact resume point

Run the X11 harness verification. If it passes, hand this report, the full
verification log, the four-file lesson diff, and the D24 URL-status evidence to
a fresh cold reviewer. The executor has not run the phase exit gate, marked X11
DONE, landed, merged, or pushed `web-atelier-udit`.
