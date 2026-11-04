# PHASE-X0: Readiness freeze

> **Track:** live probes. Decisions already frozen 2026-11-04.
> **Status:** READY

## Goal

Re-run FINDINGS probes. Do **not** re-litigate D1–D22 unless a probe falsifies a freeze. This phase exists so autopilot still has a CH0-style chance to amend if hours drifted or `react-template` disappeared.

## Deliverables

- FINDINGS dated delta if anything drifted
- Amend downstream PHASE files only if a probe falsifies a Decision
- `PHASE-X0-COLD-REVIEW.md`, `PHASE-X0-REPORT.md`

## Scope

**In:** probes, FINDINGS delta, INDEX Gate of X1 → READY after DONE.
**Out:** lesson prose, GitHub create (X9), Profield run (X1).

## Prompt (Implementation Agent)

```text
Implement PHASE-X0 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X0.md.

## Deliver
1. Re-run live snapshot commands (tracks hours, lessons, vector KTX2,
   ollama ps/list, react-template pins + HEAD, Ahmes PROCESSED_OK,
   gh auth status, `which toktx`). Vector KTX2 probe: DevIAC MCP if loaded,
   else the HTTP form in the CASCADE Tooling block.
2. Confirm DECISIONS.md has zero PROPOSED rows. If a probe falsifies a
   freeze, AMEND and rewrite downstream phases. Otherwise leave D1–D22.
3. Record gh login: `gh auth status` — needed for X9, not a blocker here.
   Write PHASE-X0-REPORT.md (Status: VERIFYING) — the exit gate requires it
   and greps it for `gh auth`.
4. Hand off for cold review — do NOT mark DONE.

## Constraints
- AUDIT-GROUNDED student/instructor split is not negotiable.
- Autopilot may commit the report in this pack. Do not push web-atelier-udit.
```

## Acceptance

- [ ] `DECISIONS.md` has no `PROPOSED` rows
- [ ] Hour arithmetic still lab=30 and ejercicios=14 on FE II `tracks.yml`
- [ ] `react-template` still has `/ex1-beacon` and `/ex2-shader`
- [ ] Report states `gh auth status` (pass or fail) for X9
- [ ] Cold review filed; blocking Fn closed

## Risks

`gh` not logged in. Still-success: X0 DONE with that note; X9 BLOCKED only if create fails after a retry name.
