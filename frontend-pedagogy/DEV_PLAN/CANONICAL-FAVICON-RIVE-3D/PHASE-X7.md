# PHASE-X7 · Promote verified knowledge and open implementation PR A

**Status:** BLOCKED — X6 post-review promotion gate must pass

## Goal

Promote the independently verified general backend and SVG adapter from
experimental to verified studio skills, then open the evidence-backed
implementation PR.

## Deliverables

- verified studio-canonical `rive-animascript-3d` skill, independent of SVG;
- verified studio-canonical `svg-to-rive-3d` adapter with a one-way dependency on the general skill;
- updated `canvas-25d-content-hero` routing to the two true-3D skills;
- synchronized Codex adapters/references in substance;
- ownership-specific commits/evidence for the studio skill root and Web Atelier repository;
- PR A description assembled from real commits, reports, cold reviews and captures.

## Acceptance

- [ ] **A1** General skill contains source-agnostic scene, geometry, animation, interaction, GPU/runtime, responsive/fallback and verification contracts without importing SVG concepts.
- [ ] **A2** SVG adapter contains the supported subset, D4 depth mapping, D19 picking contract, dynamic `N`, diagnostics and hand-off to the general scene contract.
- [ ] **A3** Repo-specific paths/palette remain in the linked case study, not universal instructions.
- [ ] **A4** Canonical skills and Codex adapters are synchronized in substance.
- [ ] **A5** Each repository/root records its own actual commit evidence.
- [ ] **A6** PR A exists and its description links real checks and names deferred P2s.

## Risks

Skill and repository live in different roots. Never claim one repository commit contains the other.
