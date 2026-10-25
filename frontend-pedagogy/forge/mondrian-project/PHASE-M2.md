# PHASE-M2: The contracts — work, surface, composition state

> **Track:** L0 contract, L1 first reference work, L2 matrix core. Freezes the spine every later phase depends on.
> **Status:** BLOCKED (M1 DONE)

## Goal

Write immutable `work.schema.json`, mirror it in zod and pydantic, and prove
the three agree. Define separate `surface.schema.json` and
`composition-state.schema.json` from the MVP spec. Build the plain-ESM
matrix/state core. Source measurement and visitor customization must never share
a model.

## Deliverables

- `packages/works/schema/work.schema.json` (JSON Schema 2020-12), from pitch
  §6 plus: `lineTracks { columns: integer[], rows: integer[] }` with unique
  zero-based indexes, each in range for its boundary vector, and at least one
  line track across the two axes;
  `provenance { method: hand|analyzer, measured_by, date, reproduction {
  source, px_w, px_h, crop }, analyzer_version? }`; `rights { eu, us,
  checked_by, date }`; `swatch.<role>.measured: boolean`. A listed line-track
  baseline is its boundary delta normalized by its canvas axis. Non-colours
  otherwise use renderer constants.
- `packages/matrix/schema/{surface,composition-state,recipe}.schema.json`,
  matching `MVP-PRODUCT-SPEC.md` §3. A `Recipe` contains both surface and
  composition state. Frame/offset/margins are normalized; physical dimensions,
  units and orientation remain explicit; enums cover presets/palette/reflections;
  line-weight scale has safe bounds.
- `packages/works/fixtures/valid.yml` = the first reference work; `fixtures/broken/*.yml` = the valid file with exactly one corruption each (non-increasing bound, endpoint ≠ canvas, ragged `role`, unknown role, missing swatch, `h` = 360, no black cell).
- `packages/works/works/<ref-1>/work.yml` + `MEASUREMENT.md` (what was measured, from which reproduction, how long it took, where the uncertainty is).
- `packages/matrix/src/`: `validate.js`, `derive.js`, `surface.js` (presets,
  printable area, maximal original-ratio frame), `state.js` (defaults, bounds,
  deterministic URL parse/serialize), `render-grid.js`, `hue.js`, `index.js`.
- `packages/matrix/styles/matrix.css`: role → colour via custom properties and relative colour syntax; non-colours as constants; `@property --theta`.
- Vitest: work + surface + state tests; area shares sum to 1; hue wrap;
  malformed input; grid tracks; every preset frame bounded; URL state round-trip.
- Python:
  `packages/works/python/src/mondrian_work_schema/models.py` (installable
  pydantic model, generated or hand-mirrored) + pytest over the same fixtures.
- Astro: `services/web/src/content.config.ts` zod schema + `works` collection loading `packages/works/works/*/work.yml`.
- `scripts/conformance.sh`: runs the three validators over `fixtures/`, asserts identical accept/reject per file and the same first error `path`.
- `PHASE-M2-COLD-REVIEW.md`, `PHASE-M2-REPORT.md`.

## Scope

**In:** the above; the hand measurement of reference work 1 (time-box: one afternoon; record the actual time).
**Out:** pages (M3), the editor (M6), the analyzer (M4), the API (M5), the other two reference works (M8 opens with them).

## Prompt (Implementation Agent)

```text
Implement PHASE-M2 per docs/DEV_PLAN/MONDRIAN/PHASE-M2.md.

## Deliver
1. work.schema.json first. Every constraint the pitch §6 validate() lists must be expressible in the schema OR
   in a documented "semantic check" list (strictly increasing bounds, endpoints = canvas, role shape = gaps, swatch
   present for each used chromatic role, ≥1 chromatic and ≥1 black cell,
   unique/in-range line-track indexes, ≥1 line track) — JSON Schema cannot express all of them;
   list which are structural (schema) and which are semantic (validator code), and implement the semantic ones
   identically in JS and Python with the same error path strings (e.g. "x[3]", "role[2]", "swatch.red").
2. Fixtures: valid.yml is the measured reference work, not an invention. Each broken fixture derives from valid.yml
   with ONE change and a comment naming it.
3. Surface/state/recipe schemas next. Test A4 portrait and landscape, square,
   story and a custom surface.
   `defaultState(work, surface)` maximizes original ratio inside printable area;
   `clampFrame` keeps every edge inside. URL serialization is deterministic and
   round-trips the complete recipe, including surface dimensions, unit,
   orientation and margins.
4. packages/matrix as plain ESM, no dependencies, JSDoc types. Keep every function under ~40 lines; a student
   reads these.
5. matrix.css: `.cell[data-role="red"]` uses relative HSL; grid cells use
   background-color; `--swatch-*`, typed `--theta`, `--line-weight-scale`;
   the exact HSL inversion from the product spec and reflection transforms.
   @property with initial 0deg. Non-colours: `--white`, `--gray`, `--black` constants. No per-work CSS files.
6. Python work mirror + pytest; Astro zod work mirror; scripts/conformance.sh. Run it: it must print one line per fixture
   with three columns (js, zod, py) and exit 0 only when all agree.
7. Full suite: pnpm -r test && pnpm -r build && uv run pytest. Import every module you touched.
8. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- Schema changes after this phase go through amend-on-surprise; design it to be right once.
- No `document.createElement("rect")`. No CSS borders for lines. No `hsl(θ 100% 50%)`.
- Do not commit unless asked.
```

## Acceptance

- `scripts/conformance.sh` exit 0; its output shows `valid.yml: js=ok zod=ok py=ok` and, for every broken fixture, three rejections with the same first error `path`.
- `pnpm --filter @mondrian/matrix test` green, including `derive` sum-to-one, the wrap-around `mod` case, and the `?theta=banana → 0` case.
- State tests prove A4 = 210×297 mm; every preset default frame is bounded;
  source work remains deep-equal after transformations; every state field survives
  serialize→parse; every custom surface field and orientation survives the
  recipe round-trip; malformed/out-of-range input falls back or clamps.
- Line-track tests cover a partial black line, a full black band and a black
  plane: only explicit indexes are scaled. For each axis, multiply selected
  positive boundary deltas, then normalize all deltas by their new sum; every
  track stays positive and the sum remains 1 over the full safe scale range.
  Duplicate, negative and out-of-range indexes fail identically in JS/Python.
  Applying palette inversion twice restores every source value.
- Removing the semantic check for "strictly increasing bounds" from the JS validator makes `broken/non-increasing.yml` pass JS and the conformance script **fail** (this proves the check is load-bearing; record the run).
- `packages/works/works/<ref-1>/MEASUREMENT.md` names the catalogue, the reproduction's pixel size and crop, and the wall time.
- `astro check` and `astro build` pass with the collection loaded; `getCollection('works')` returns 1 entry.
- Cold review filed; blocking findings closed.

## Risks

- JSON Schema vs semantic split confuses the lanes → the schema folder's README states the split in a two-column table; the conformance script is the arbiter.
- Measuring by hand takes longer than the time-box → ship with the uncertainty recorded in `MEASUREMENT.md`; partial precision is a fact, an invented bound is a failure.
- `@property` or relative colour syntax missing in a target browser → `hue.js` keeps a JS fallback that writes computed `fill`s when `CSS.supports('color', 'hsl(from red calc(h + 10deg) s l)')` is false; amend D-07 if the fallback becomes the main path.
