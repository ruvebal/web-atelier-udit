<!--
Unit 10 (IoT/Python-backed) real-data-source dependency — draft
Author: ruvebal@crea-comm.net (Claude-assisted, cloud-orchestrated —
per AI-MANIFEST.md §2 disclosure) · 2026-08-19
-->

# Back-End II synergy sheet — draft

**Status: DRAFT, not a signed cross-course agreement.** Closes the
placeholder named in `grounding/README.mdc:148` ("Unit 10 real data source:
placeholder pending Back-End II synergy sheet") enough for Unit 10 to be
forged as a **declared-pilot** unit with a real interface design, not as an
open question — but the actual coordination with the Back-End II professor
still has to happen; nothing here is binding until that conversation does.

## Why this sheet exists

FE II Unit 10 teaches IoT/Python-backed interfaces — the front-end side of
a WebSocket connection to a real backend. Without a real backend to point
at, the unit either invents a toy mock (loses the "real interface" lesson)
or points at nothing (stays a placeholder). This sheet is the interface
contract two courses' students need to agree on before either side can
build against the other.

> *A synergy that has to be explained in advance is already half-lost — the
> useful kind shows up as one side's rough edge becoming the other side's
> exact fit, discovered in the building, not decreed before it.*
> — no attribution; this sheet's own working definition, not Fuller's.

## Stakeholder expectations

| Side | Expects | Gives |
| --- | --- | --- |
| FE II student | A real WebSocket/REST endpoint with documented shape, stable enough to build a connection-lifetime UI against for one sprint | A working front-end consuming it, real bug reports on the interface (not the pedagogy) |
| Back-End II student | A real consumer exercising their API beyond their own test suite — the actual point of Unit 10's "interface-transfer" gap the matrix names | Endpoint docs (OpenAPI/AsyncAPI or equivalent), a stable-enough deploy window during FE II's Unit 10 week |
| Back-End II professor | A scoped, time-boxed ask — not a semester-long dependency; FE II owns its own grading | A named contact point, sign-off on which weeks are stable enough to point students at |
| FE II professor (Rubén) | An interface FE II doesn't have to invent from scratch, closing Unit 10's declared pedagogy gap with something real instead of a mock | This sheet, the coordination effort, the actual teaching |

## Pedagogical grounding — cooperation, cowork, creative-mind

Reusing anchors this studio has already verified and cited elsewhere,
rather than inventing new ones for a one-off cross-course sheet:

- **Cooperation / team-lab structure** — Neumann's eduScrum team-lab
  design, already grounded and cited for FE II Unit 11
  (`forge/FE-II-WAVE-1.execute.md` §Unit 11 Step A) — the same "one
  cohort, one shared surface" logic extends naturally to a cross-course
  version: two cohorts, one shared interface, each side accountable for
  their own half.
- **Incremental, scoped delivery** — Vega's incremental-PBL grounding,
  same citation set — Unit 10 doesn't need the full Back-End II API
  surface, only the one endpoint the WebSocket lab actually exercises.
  Scope the ask down before asking a professor to commit to it.
- **Creative-mind / interface-not-mock** — the pedagogical bet this sheet
  makes: students learn more from a real, slightly-messy interface than
  a clean invented one, because the failure modes (latency, a field that
  changes shape, a connection that drops) are the actual lesson content
  Unit 10's `evidence_state` names ("interface-transfer pedagogy still
  NONE") — this sheet doesn't close that gap by citation, it closes it by
  giving the unit something real to transfer *to*.

## Interface contract sketch (fill in with the real Back-End II endpoint)

```
Endpoint:        <TBD — Back-End II to name>
Protocol:        WebSocket (matches Unit 10's "connection-lifetime" framing)
Auth:            <TBD>
Message shape:   <TBD — OpenAPI/AsyncAPI doc link>
Stability window:<TBD — which week(s) of the semester>
Contact:         <TBD — Back-End II professor/TA>
```

## Next steps — not done by this draft

1. Take this to the Back-End II professor; fill in the interface contract
   sketch together, not unilaterally.
2. Once real, update `grounding/README.mdc` Unit 10 row — remove
   "placeholder" language, cite the actual endpoint doc.
3. Unit 10's teaching-pack (`forge/teaching-packs/unit-10-iot-python-backend.md`)
   can then be forged against a real interface instead of a declared gap.
