# Planning pack cold review

Reviewer: local Ollama qwen3.8:27b · 2026-11-24

**Cold Review Report: RUST-WASM-MUSIC-VISUALIZER Planning Pack**

**Reviewer:** Fresh Local Qwen (Cold Review)
**Date:** 2026-11-24
**Status:** COLD_REVIEW
**Blocks Plan Acceptance:** **NO** (Plan is structurally sound, feasible, and honest. P0/P1 items are execution prerequisites, not plan defects.)

### Executive Summary
The planning pack is consistent, explicitly distinguishes between planning and implementation, and adheres to all hard constraints (local AI, private provenance, no fabricated citations). The 3x4h feasibility is logically sound *conditional* on the stated prior knowledge (JS, Git, basic 3D). The Rust/Wasm/GPU boundaries are clearly defined. The assessment alignment is robust. No phase is marked DONE. The plan does not claim the app exists.

### Findings

**F1: P1 — Cohort Prerequisite Verification Gap**
*   **Evidence:** `RATIONALE.md` states: "Twelve contact hours are enough... conditional on prior JavaScript, Git, browser debugging and basic 3D experience." `PHASE-X0.md` lists "cohort readiness checklist" as a deliverable but does not specify *how* this prerequisite is verified or what happens if it is not met. `CURRICULUM.md` assumes this baseline.
*   **Risk:** If the cohort lacks basic 3D/JS, the 12-hour window is infeasible for the required Rust/Wasm/GPU integration. The plan treats this as a "planning judgement to test in the rehearsal," but X0 must explicitly gate on this.
*   **Remedy:** In `PHASE-X0.md`, add an explicit acceptance criterion: "Verify cohort prior knowledge via a pre-assessment or survey. If <80% meet the JS/3D baseline, trigger the 'simplify integration' stop condition defined in `TECHNICAL-DIRECTOR-CASCADE.md` before proceeding to X1."

**F2: P1 — Rive True-3D Capability Ambiguity**
*   **Evidence:** `CHALLENGE.md` states: "Standard Rive vector animation alone does not meet the true-3D criterion. Pair it with a 3D renderer or use the instructor-verified Rive 3D specimen." `ARCHITECTURE.md` notes: "verify true-3D capability separately." `SOURCES.md` notes: "The attempted Rive `/runtimes/audio` URL was inaccessible; no claim rests on it."
*   **Risk:** Students may attempt to use Rive for "true 3D" based on marketing or incomplete docs, failing the "visible 3D occlusion" requirement. The plan relies on an "instructor-verified specimen" that is not yet built (X4).
*   **Remedy:** In `CHALLENGE.md`, explicitly state: "Rive is primarily a 2D/vector animation tool. For this challenge, 'True 3D' requires WebGL2/WebGPU depth testing. Rive may be used for UI skins or 2D overlays, but the core spatial composition must be rendered by Three.js or wgpu. Do not use Rive as the primary 3D renderer unless the instructor provides a verified 3D Rive specimen in X4."

**F3: P2 — Clock/Network Correctness Boundary**
*   **Evidence:** `ARCHITECTURE.md` defines `AudioFrame` with `contextTimeSeconds` and `trackTimeSeconds`. It states: "Neither is a globally synchronized network clock." `CHALLENGE.md` requires: "One WebSocket-controlled parameter or preset... local operation after disconnect."
*   **Risk:** Students may conflate audio clock synchronization with network state synchronization. The plan correctly separates them, but the assessment rubric ("Timing, reliability and performance") might penalize students for network-induced visual lag if not clearly distinguished from audio-clock drift.
*   **Remedy:** In `CURRICULUM.md` L5, add a specific learning objective: "Distinguish between audio-clock-driven motion (local) and network-state-driven parameters (remote). Explain why network latency does not affect audio playback timing but may affect visual parameter updates."

**F4: P2 — Rust UI Scope Clarification**
*   **Evidence:** `RATIONALE.md` states: "Rust UI means actual Rust components rendering semantic DOM. Student-specified controls are rendered by that host." `ARCHITECTURE.md` states: "Leptos is the recommended starting point... Students compare alternatives in the ADR."
*   **Risk:** Students may interpret "Rust UI" as requiring them to build a full UI framework from scratch, which is infeasible in 12 hours. The plan correctly limits this to "two declared controls," but the language could be misread.
*   **Remedy:** In `CHALLENGE.md`, Requirement 4, clarify: "You do not need to build a UI framework. You must declare two parameters in your plugin manifest, and the host Rust UI (Leptos) will render them. Your job is to ensure your Rust kernel consumes these parameters correctly."

**F5: P2 — Citation Provenance Honesty**
*   **Evidence:** `SOURCES.md` explicitly flags "BIBLIO-GAP" for Rust book metadata and "metadata discrepancy" for Turner/Leonard. It states: "Do not silently substitute a polished citation for those outputs."
*   **Risk:** Low. The plan is honest about gaps. However, `CURRICULUM.md` references "Rust book chs. 1, 4–6, 9" without noting the metadata gap.
*   **Remedy:** In `CURRICULUM.md`, add a footnote to the reading selections: "Citations are based on verified content nodes. Bibliographic metadata gaps are documented in SOURCES.md and do not affect the technical accuracy of the reading selections."

**F6: P2 — Feasibility of "Meaningful Rust Feature-to-Motion Function"**
*   **Evidence:** `CHALLENGE.md` Requirement 2: "Student-authored Rust compiled to WebAssembly performs a meaningful feature-to-motion calculation. A pass-through wrapper... is insufficient."
*   **Risk:** Defining "meaningful" is subjective. Students may write trivial functions (e.g., `x * 2`) and claim it is meaningful.
*   **Remedy:** In `CHALLENGE.md`, provide examples of "meaningful" vs. "pass-through": "Meaningful: Smoothing, envelope following, non-linear mapping, or stateful simulation. Pass-through: Directly returning input values without transformation or logic."

**F7: P2 — GPU 3D Depth Testing Verification**
*   **Evidence:** `CHALLENGE.md` Requirement 1: "visible 3D occlusion." `ARCHITECTURE.md` states: "Three.js WebGL2... Reuse familiar GPU 3D concepts."
*   **Risk:** Students may use 2D sprites or billboards that appear 3D but lack true depth testing.
*   **Remedy:** In `CURRICULUM.md` L3, add a specific check: "Verify that objects correctly occlude each other based on Z-depth. Use a test scene with two intersecting objects to confirm depth buffer behavior."

**F8: P2 — Local AI Only Constraint**
*   **Evidence:** `TECHNICAL-DIRECTOR-CASCADE.md` states: "Use local Ollama for embeddings, cold reviews and teaching translations." `SOURCES.md` states: "No cloud reviewer, no implementer wearing a reviewer role."
*   **Risk:** Low. The plan explicitly enforces this. However, `SOURCES.md` mentions "Local Qwen reviews the planning pack." Ensure the review transcript in `evidence/planning-checks.json` reflects local execution.
*   **Remedy:** Confirm that the `evidence/planning-checks.json` file was generated by a local script, not a cloud service. (Assumed true based on context, but verify in X0.)

**F9: P2 — No New Pipeline Code**
*   **Evidence:** `TECHNICAL-DIRECTOR-CASCADE.md` states: "Do not change Ahmes/Athanor pipeline code." `PHASE-X0.md` states: "Do not rewrite shared pipelines."
*   **Risk:** Low. The plan respects this boundary.
*   **Remedy:** None.

**F10: P2 — No Claim That Planned App Exists**
*   **Evidence:** `RATIONALE.md` states: "This is a planning judgement... not a measured learning claim." `ARCHITECTURE.md` states: "Proposed architecture; X1 must validate it before it becomes starter code."
*   **Risk:** Low. The plan is honest about its status.
*   **Remedy:** None.

**F11: P2 — Assessment Alignment**
*   **Evidence:** `CHALLENGE.md` rubric aligns with `CURRICULUM.md` outcomes. "Musical and visual interpretation" (25%) aligns with L2/L3. "Rust/Wasm and engineering explanation" (20%) aligns with L1. "3D interaction and accessibility" (20%) aligns with L3/L6. "Timing, reliability and performance" (20%) aligns with L4/L5. "Individual understanding and process" (15%) aligns with B3/Defence.
*   **Risk:** Low. Alignment is strong.
*   **Remedy:** None.

**F12: P2 — Evidence Honesty**
*   **Evidence:** `SOURCES.md` explicitly separates "Verified evidence anchors" from "Platform notes." It states: "No claim is made that the corpus proves six lessons... These are explicit pilot design decisions."
*   **Risk:** Low. The plan is honest about the limits of its evidence.
*   **Remedy:** None.

### Conclusion
The plan is acceptable for proceeding to X0. The P1 items (F1, F2) must be addressed in the X0 runbook to ensure cohort readiness and clear Rive boundaries. The P2 items are minor clarifications that can be addressed during X1/X2 implementation.

**Action Items for X0:**
1.  Add cohort prerequisite verification to X0 acceptance criteria.
2.  Clarify Rive's role as a 2D/UI tool, not a primary 3D renderer, in the challenge brief.
3.  Provide examples of "meaningful" Rust functions in the challenge brief.
4.  Verify that all local AI tools (Ollama/Qwen) are configured and tested for the review process.

**Safe Resume Point:**
Proceed to X0 implementation. Do not mark X0 as DONE until the cohort readiness checklist is completed and the Rive boundary is explicitly clarified in the draft challenge brief.
