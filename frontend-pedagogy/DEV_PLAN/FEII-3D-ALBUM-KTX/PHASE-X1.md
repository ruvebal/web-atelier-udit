# PHASE-X1: Autonomous Profield research (shaders + KTX2)

> **Track:** L2 · `ai-assisted-3d-web` run `20261104`. **No clipboard wait.**
> **Status:** BLOCKED until X0 DONE

## Goal

Fill KTX2 / GLSL / R3F / Drei / glTF / JSDoc blanks with checkable URLs and DOIs. Pass 1 is assembled by the operator using WebSearch/WebFetch + the 20260814 edited map. Pass 2 is a **local Ollama audit**, not a second cloud chat.

## Deliverables

- `~/src/profield/runs/ai-assisted-3d-web/20261104/`
- Seed lexicum (public terms) + `pass1.prompt.md` (denylist passed — even if never sent off-box)
- `pass1.raw.md` with provenance `surface: operator-web-tools` (must list every URL fetched)
- `pass2.raw.md` from Ollama audit of that map (disagreements preserved)
- `CONSOLIDATED.md`: DOIs, ideas, trends, gaps; Khronos URL **without** chatgpt UTM
- `PHASE-X1-COLD-REVIEW.md`, `PHASE-X1-REPORT.md`

## Scope

**In:** FieldSpec keywords + GLSL, shaderMaterial, R3F, Drei, WebGL, three.js, glTF 2.0, KTX2, Basis, UASTC, ETC1S, transcoding, JSDoc. Reuse 20260814 §10 as prior, re-verify.
**Out:** Ahmes batch (X2). Course brands in exported prompts. Cloud SDKs. Waiting for a human paste.

## Prompt (Implementation Agent)

```text
Implement PHASE-X1 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X1.md.

## Deliver
1. mkdir the 20261104 run. Public seed lexicum. No UDIT/studio internals.
2. ~/src/profield/.venv/bin/profield prompt (or cycle-start) — read
   --help first; FieldSpec is fields/ai-assisted-3d-web.yaml — so
   pass1.prompt.md exists and the confidentiality gate is exercised.
   Do not send it to a cloud LLM.
3. Build pass1.raw.md yourself:
   - Start from runs/ai-assisted-3d-web/20260814/pass1.edited.md §10 and shader sections
   - WebSearch / WebFetch Khronos KTX2, Basis Universal UASTC vs ETC1S,
     three.js KTX2Loader, glTF 2.0, R3F shaderMaterial, Drei, JSDoc+three
   - Crossref/OpenAlex for any DOI you keep
   - Tag [ESTABLISHED]|[EMERGING]|[UNVERIFIED-GAP]|[STANDARD]|[PRACTITIONER]
   - Do not fabricate DOIs
4. If profield ingest pass1 works from that file, run it with
   --surface operator-web-tools. If the CLI refuses, keep the files and
   amend the runbook — do not stall.
5. Pass 2: POST http://localhost:11434/api/chat (stream:false) to
   qwen2.5:32b-instruct — the python `ollama` package is NOT installed in
   the profield venv; use curl or urllib. Check ollama ps first. Ask it to
   audit CONSOLIDATED claims for invented venues. Save the raw reply +
   model name as pass2.raw.md.
6. CONSOLIDATED.md must keep HE KTX2 pedagogy as [UNVERIFIED-GAP] unless
   a real paper appeared.
7. Hand off for cold review — do NOT mark DONE.

## Constraints
- No openai/anthropic imports.
- Album-cover assignment is L1 — not a FieldSpec keyword.
```

## Acceptance

- [ ] Run dir has `pass1.prompt.md`, `pass1.raw.md`, `pass2.raw.md`, `CONSOLIDATED.md`
- [ ] `pass1.raw.md` names fetched URLs; Khronos link has no `utm_source=chatgpt`
- [ ] KTX2 UASTC vs ETC1S row + GLSL/R3F/Drei row + glTF row present
- [ ] HE KTX2 pedagogy still `[UNVERIFIED-GAP]` unless a DOI verifies
- [ ] No cloud SDK; Ollama model named
- [ ] Cold review filed; blocking Fn closed

## Risks

WebFetch gets HTML not a spec. Still-success: quote the live Khronos page as `[STANDARD]` with URL and date. Do not invent a PDF.
