# PHASE-X1 cold review

**Reviewer:** fresh `cascade-cold-reviewer` session; did not implement X1  
**Verdict:** acceptance evidence is green. One non-blocking environment finding is recorded below; it does not invalidate this research-only phase.

## Inputs reviewed

- `PHASE-X1.md` and every Acceptance item
- phase path list and `PHASE-X1-REPORT.md`
- `PHASE-X1-VERIFY-LOG.md` (exit code 0)
- the complete `/Users/ruvebal/src/profield/runs/ai-assisted-3d-web/20261104/` artifact set
- `FEII-3D-ALBUM-KTX-CASCADE.md`, `AUTOPILOT.md`, `DECISIONS.md`, `REPO-SHAPE.md`
- `web-foundations/private/ai-assisted-3d/AUDIT-GROUNDED.md`

## Acceptance evidence

| Acceptance item | Independent evidence | Result |
| --- | --- | --- |
| Required run files exist | `test -s` plus `wc -c` reported `pass1.prompt.md` 5736 bytes, `pass1.raw.md` 6628 bytes, `pass2.raw.md` 2543 bytes, and `CONSOLIDATED.md` 4812 bytes. | PASS |
| Fetched URLs named; no ChatGPT tracker | `pass1.raw.md` contains a 16-entry fetched URL ledger. `rg -n 'utm_source=chatgpt'` returned no match. The Khronos KTX URL opens as the version 2.0 specification. | PASS |
| Required topic rows | `rg` returned KTX2/UASTC/ETC1S, GLSL/R3F/Drei, and glTF rows in both `pass1.raw.md` and `CONSOLIDATED.md`. | PASS |
| HE KTX2 pedagogy remains a gap | `CONSOLIDATED.md` states `[UNVERIFIED-GAP] Higher-education KTX2 pedagogy remains unverified`; no DOI is attached to that claim. | PASS |
| Local model named; no cloud SDK | `pass2.raw.md` frontmatter names `qwen2.5:32b-instruct`, `surface: Ollama localhost HTTP API`, and `stream: false`. `rg -n '(^|[^a-z])(import|from) +(openai|anthropic)'` returned no match. | PASS |
| Cold review filed; blocking findings closed | This file is present. F1 is non-blocking and requires no X1 content change. | PASS |

## Claim and provenance audit

- The current Khronos KTX 2.0 specification describes KTX as a GPU-texture container and distinguishes ETC1S and UASTC payloads.
- The Binomial specification states that UASTC is higher quality and larger in memory than ETC1S (`8-bpp vs. 4-bpp`), matching the bounded comparison in the map.
- Current Three.js documentation says `KTX2Loader` parses KTX 2.0, transcodes supported Basis Universal textures, and requires `detectSupport(renderer)` before loading.
- The Khronos glTF 2.0 specification has separate texture, image, and sampler concepts, matching the map.
- The official R3F documentation identifies R3F as a React renderer for Three.js, documents `useFrame`, and warns against `setState` in that loop. Drei's repository identifies it as a collection of R3F helpers.
- JSDoc's official `@typedef` and `@property` pages support the JavaScript contract claim.
- DOI `10.1109/LLM4Code66737.2025.00017` resolves to Kels, Dahou, and Mathiak, “Evaluating Language Models for Computer Graphics Code Completion,” LLM4Code 2025, pages 96–103. The conference record describes 467 fragment-shader functions and static plus rendered-frame comparison. No venue, author, page range, or identifier was invented.
- Manifest hashes for the seed, prompt, raw passes, parsed passes, and research-cycle file exactly match fresh `shasum -a 256` output. Pass 1 provenance is `operator-web-tools`; Pass 2 provenance is `ollama-local-qwen2.5-32b-instruct`.

## Agentic-change failure modes

1. **Import/load touched modules:** not applicable; X1 added research artifacts and a phase report, not executable modules.
2. **Full existing suite:** the phase-specific harness gate passed with exit 0. An independent full site build was attempted and reached Jekyll generation, then failed with `Errno::ENOSPC: No space left on device`; see F1. The partial `_site` output was cleaned. The source-level citation suite subsequently passed: `Citation conformance passed for canonical lessons.`
3. **Regression-test counterfactual:** no new test was added. The X1 gate would fail if a required artifact, provenance label, URL, UASTC/ETC1S/glTF row, gap marker, or tracker hygiene condition were absent.
4. **Unpack arity / return shapes:** not applicable; no callable implementation changed.
5. **Discriminated modes:** Pass 1 and Pass 2 retain distinct `surface_label` values in `manifest.json`; no runtime data model changed.
6. **Documentation claims:** normative and practitioner claims were checked against the live official sources above; DOI metadata was independently resolved; `git diff --check` exited 0.

## Hard-constraint audit

The exported prompt contains public terms and no UDIT, studio, student, credential, or private-project identifier. The run does not use a cloud SDK, does not turn vector snippets into citations, does not add student MCP/tool-shopping requirements, and does not touch lessons, hours, router code, commercial artwork, `react-template`, or `web-atelier-udit` main. The local Ollama reply's incorrect self-label is preserved as a disagreement rather than silently repaired.

## Findings

### F1 — P2 — non-blocking: host disk capacity prevented an independent full site build

**Blocks DONE:** No for X1. X1 changes only external research artifacts and the cascade report; the phase-specific exit gate passed, the citation suite passed, and no site source or executable module changed. This does threaten later phases whose gates require a full Jekyll build.

**Evidence:** `PATH=/Users/ruvebal/.rbenv/shims:... npm run build` entered Jekyll generation and exited nonzero with `Errno::ENOSPC: No space left on device - fcopyfile`. `df -h` then showed `/System/Volumes/Data` at `100%` with 187 MiB available after cleaning the partial 70 MiB `_site` directory.

**Recommendation:** Before the first later phase whose gate invokes `wf_build`, free sufficient disk space using an operator-approved cleanup, then run that phase's full build gate. Do not attribute this capacity failure to X1 or change the X1 research artifacts to mask it.
