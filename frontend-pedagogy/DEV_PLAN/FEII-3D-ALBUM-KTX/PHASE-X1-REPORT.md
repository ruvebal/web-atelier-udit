# PHASE-X1 report — autonomous Profield research

**Status:** DONE

## Cold-review triage

| Finding | Severity | Blocks DONE | Disposition |
| --- | --- | --- | --- |
| F1 — host disk capacity prevented the reviewer's independent full site build | P2 | No | Accepted as an environment risk for later build-dependent phases. X1 is research-only, its harness gate exited 0, and citation conformance passed. Re-check capacity before the next `wf_build` gate; do not alter X1 artifacts to mask it. |

## Scope completed

- Created the dated Profield run at
  `/Users/ruvebal/src/profield/runs/ai-assisted-3d-web/20261104/`.
- Exercised `profield cycle-start` and its confidentiality gate using a public
  seed lexicum; the accepted run reports `gate clean, 23 terms checked`.
- Built Pass 1 from the 20260814 map plus operator WebSearch/WebFetch of
  Khronos, Basis Universal, Three.js, R3F/Drei, JSDoc, and bibliographic
  metadata. It was not sent to a cloud model.
- Ingested Pass 1 with provenance `surface: operator-web-tools`.
- Checked `ollama ps` before use; no model was loaded. Called
  `qwen2.5:32b-instruct` through `http://localhost:11434/api/chat` with
  `stream:false` for the bounded Pass-2 audit, then ingested that audit with a
  local surface label.
- Preserved the model's one concrete output defect (it echoed the document
  title under “Model Name”) instead of silently correcting the raw reply.

## Files created or updated

External L2 run:

- `runs/ai-assisted-3d-web/20261104/lexicum.seed.yaml`
- `runs/ai-assisted-3d-web/20261104/pass1.prompt.md`
- `runs/ai-assisted-3d-web/20261104/pass1.raw.md`
- `runs/ai-assisted-3d-web/20261104/pass1.json`
- `runs/ai-assisted-3d-web/20261104/pass2.raw.md`
- `runs/ai-assisted-3d-web/20261104/pass2.json`
- `runs/ai-assisted-3d-web/20261104/CONSOLIDATED.md`
- `runs/ai-assisted-3d-web/20261104/manifest.json`
- `runs/ai-assisted-3d-web/20261104/research-cycle.md`
- `runs/ai-assisted-3d-web/20261104/run.log`

Cascade worktree:

- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X1-REPORT.md`

## Runnable evidence

| Check | Observed result |
| --- | --- |
| Worktree identity | `.cascade-lane` = `FEII-3D-ALBUM-KTX`; branch `cascade/FEII-3D-ALBUM-KTX-1` |
| Profield confidentiality gate | `ready: lexicum.seed.yaml, pass1.prompt.md, research-cycle.md (gate clean, 23 terms checked)` |
| Pass-1 ingestion | `pass1 · 2 claims, 1 citations, 0 needing review`; manifest surface label `operator-web-tools` |
| Pass-2 model availability | `ollama ps` empty; `ollama list` includes `qwen2.5:32b-instruct` |
| Pass-2 ingestion | `pass2 · 0 claims, 0 citations, 0 needing review`; manifest surface label `ollama-local-qwen2.5-32b-instruct` |
| Required topic rows | `CONSOLIDATED.md` contains UASTC, ETC1S, glTF, GLSL/R3F/Drei, and JSDoc sections |
| HE pedagogy state | KTX2/Basis teaching remains `[UNVERIFIED-GAP]`; no DOI is invented for it |
| URL hygiene | Fetched URL ledger is present; `rg 'utm_source=chatgpt'` found no match |
| SDK boundary | `rg '(^|[^a-z])(import|from) +(openai|anthropic)'` found no match in the run |

## Source and identifier disposition

- Normative platform sources: Khronos KTX 2.0 and glTF 2.0 registries.
- Current implementation sources: Basis Universal, Three.js `KTX2Loader`,
  R3F/Drei, and JSDoc official documentation.
- Retained research DOI after bibliographic verification:
  `10.1109/LLM4Code66737.2025.00017` (Kels, Dahou, and Mathiak,
  ShaderMatch/LLM4Code 2025).
- No peer-reviewed higher-education KTX2 paper was verified; the map does not
  turn a platform note into HE evidence.

## Uncertainty and exact resume point

- The focused map is intentionally a delta, not a second attempt to rewrite all
  thirteen 20260814 areas. Profield's parser extracted two claims from Pass 1;
  the complete operator map and URL ledger remain preserved in the raw and
  consolidated artifacts.
- Run the harness verification for `PHASE-X1.md`. On success, hand the phase
  diff, this report, the run directory, and the full verification transcript to
  a fresh cold reviewer. This executor has not run the exit gate, marked X1
  DONE, landed, merged, or pushed `web-atelier-udit`.
