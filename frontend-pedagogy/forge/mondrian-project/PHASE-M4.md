# PHASE-M4: Analyzer — image to matrix, with provenance and an evaluation

> **Track:** L4 (Python). Parallel lane with M3/M6 once M2 is DONE. Owned by the Analyzer & API lane.
> **Status:** BLOCKED (M2 DONE)

## Goal

Build `mondrian-analyzer`: a Typer CLI that emits a schema-valid `work.yml`.
The classical pipeline—rectification, line positions and widths, cell roles,
swatches—is the MVP. It must recover **relative black-band weights**, because
the editor exposes a multiplier over that measured baseline. TensorFlow is a
non-blocking research extension only after enough labelled cells exist.

## Deliverables

- `packages/analyzer/src/mondrian_analyzer/{rectify,lines,roles,swatch,emit,cli}.py`, typed, logged (structured JSON logs), no global state; domain functions pure (NumPy in/out), I/O at the edges.
- CLI: `mondrian-analyzer analyze <image> --canvas 80x60 --unit cm --source "<catalogue>" --out work.yml [--roles classical|learned]`; `mondrian-analyzer evaluate <work.yml> --against <hand-measured.yml>` printing per-boundary error in canvas units and as % of side.
- `evaluation/REPORT.md`: method, references, per-boundary and per-line-width
  errors, role confusion matrix, failures and runtime.
- Optional `research/train_roles.py` only if M0 ratifies a labelled split.
  Model files are ignored. It never blocks MVP and never scores authenticity.
- Mapping note vs the 2010 Wisconsin representation (from M0): what maps, what does not, whether their 46 works could be imported as `method: external` entries (licence permitting; otherwise no).
- pytest: unit tests per stage on synthetic rasters rendered **from** the valid fixture (render matrix → PNG → analyze → compare; the round trip must recover the bounds within 1 px); property test that `emit()` output always validates.
- `PHASE-M4-COLD-REVIEW.md`, `PHASE-M4-REPORT.md` (PARTIAL allowed if the learned component is not yet evaluated).

## Scope

**In:** the above; OpenCV, NumPy, scikit-image, PyYAML, Typer and the shared
Pydantic schema package from M2. TensorFlow belongs only to a separately
ratified `learned` optional dependency group.
**Out:** the API (M5); any cloud service; any claim about a painting's "true" colours — swatches from a reproduction are labelled `measured: true` with the reproduction named, which is what they are.

## Prompt (Implementation Agent)

```text
Implement PHASE-M4 per docs/DEV_PLAN/MONDRIAN/PHASE-M4.md.

## Deliver
1. Pure stages. rectify(img, corners?) → canvas-aligned raster; lines(raster) → x bounds, y bounds in px via
   projection profiles of a darkness mask, Hough as cross-check; roles(raster, x, y) → role grid by clustering
   mean cell colour in Lab (k = roles present) with black/white/gray thresholds; swatch(raster, cells) → median
   HSL per chromatic role; emit(...) → dict validated by the M2 pydantic model, scaled to canvas units.
2. Round-trip test first: use packages/matrix render-grid or a tiny Python rasteriser to paint the valid fixture
   at 2000 px wide; analyze it; assert bounds within 1 px and roles exact. This test would fail with any stage
   stubbed — keep it that way.
3. Evaluate on the three hand-measured references (reproductions named in corpus/REFERENCE-WORKS.md; images are
   fetched locally by the operator and never committed). Write evaluation/REPORT.md with real numbers.
4. Relative line weights: emit explicit `lineTracks.columns/rows` indexes.
   Their baselines derive from adjacent normalized bounds; classify a black
   plane separately rather than guessing every black cell is a line. Evaluate
   line-track detection and width separately from boundary position.
5. Optional learned roles only when a held-out split exists; report against the
   same classical baseline. Missing TensorFlow is not PARTIAL for MVP.
5. Structured logging (json lines) with stage, duration_ms, counts. No print.
6. Full suite: uv run pytest (whole workspace), mypy strict on the package; also pnpm -r test (nothing should
   break, prove it).
7. Hand off for cold review — do NOT mark DONE yourself.

## Constraints
- Output is a proposal: `measured_by` is left for the reviewing student; the CLI refuses to write into
  packages/works/works/ directly (writes to --out only).
- No images under version control; fixtures are generated at test time.
- Local inference only; no cloud SDK imports (CI greps for them).
```

## Acceptance

- `uv run pytest packages/analyzer` green; the round-trip test recovers every bound within 1 px at 2000 px.
- `uv run mondrian-analyzer analyze <ref-1 reproduction> --canvas … --out /tmp/ref1.yml` exits 0 and `/tmp/ref1.yml` passes `scripts/conformance.sh` (copied into a temp fixtures dir).
- `evaluation/REPORT.md` reports median boundary error ≤ 1 % of the canvas side on the three references, or states the actual larger number with the failure analysis (a true number above threshold is PARTIAL, not a lie).
- Classical role confusion matrix and line-weight error table are in the report.
  If a learned extension exists, its same-split comparison is appended.
- `grep -rE "import (openai|anthropic|langchain_openai)" packages services` returns nothing (CI step).
- Cold review filed; blocking findings closed.

## Risks

- Reproductions are colour-managed and cropped (pitch risk 10) → rectification needs the canvas corners; the CLI accepts `--corners` and the report records which images needed it.
- TensorFlow is unavailable or unjustified by corpus size → omit it and record
  `not run: insufficient labelled data` (MVP remains complete).
- The lane is tempted to "improve" bounds toward nice ratios → forbidden; the evaluation measures against hand data, not aesthetics.
