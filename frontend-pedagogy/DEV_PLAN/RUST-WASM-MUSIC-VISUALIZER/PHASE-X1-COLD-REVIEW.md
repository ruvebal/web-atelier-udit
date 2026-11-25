# Phase X1 cold review

**Cold-Review Phase X1: Audit Report**

**Verdict:** **FAIL** (Blocks X1 Closure)
The prototype demonstrates a functional Rust/Wasm kernel and Three.js scene, but it fundamentally violates the core architectural mandate of Phase X1: **"One Leptos CSR UI... Rust control state visible in the scene."** The current implementation uses vanilla HTML/JS for all UI controls, explicitly deferring the Rust UI layer to X2. This is not a vertical slice of the *intended* architecture; it is a vertical slice of a *different* architecture.

### Findings

**F1: Missing Rust UI Layer (P0 - Blocks Closure)**
*   **Evidence:** `prototype/README.md` states: *"The HTML controls are host controls in this first slice. A Rust-rendered UI layer is a deliberate X2 decision... this prototype must not be described as a completed Leptos implementation."* `index.html` contains static `<input type="range">` elements wired via `addEventListener` in `main.js`.
*   **Constraint Violation:** PHASE-X1.md Acceptance requires: *"Changing a Rust-rendered control reaches the Rust mapping..."* and Scope requires *"One Leptos CSR UI."*
*   **Impact:** The core pedagogical goal—proving the Rust UI → Wasm kernel boundary—is unproven. The current setup proves JS → Wasm, which is a different interop model.
*   **Remedy:** Implement a minimal Leptos CSR component that renders the Gain/Smoothing sliders. These components must call the Wasm `set_gain`/`set_smoothing` exports directly. The static HTML controls must be removed or replaced by the Rust-rendered DOM.

**F2: Incomplete Audio State Machine (P1 - Blocks Closure)**
*   **Evidence:** `main.js` handles `play` and `pause` but lacks explicit handling for `seek`, `end`, and `unsupported input` states as required by Acceptance. The `file` input handler resets `audioElement` but does not update the `source` node in the AudioContext graph, leading to a broken audio path if a new file is selected after initial start.
*   **Constraint Violation:** PHASE-X1.md Acceptance: *"loading, pause, seek, end, silence and unsupported input have coherent states."*
*   **Impact:** The player is fragile. Selecting a new file after starting audio will result in silence because the `MediaElementSource` is still connected to the old element.
*   **Remedy:** Implement a robust state machine. On file change, disconnect the old source, create a new `MediaElementSource`, and reconnect the analyser. Add explicit `seek` and `end` event listeners to update UI state.

**F3: No Browser-Side Wasm Boundary Tests (P1 - Blocks Closure)**
*   **Evidence:** `package.json` only runs `cargo test` (native). There are no JS/TS tests verifying that the Wasm module loads, exports are callable, and the JS↔Wasm data boundary works in a browser environment.
*   **Constraint Violation:** PHASE-X1.md Acceptance: *"tests run on the native kernel and browser Wasm boundary."*
*   **Impact:** The "browser Wasm boundary" is unverified. A silent failure in `WebAssembly.instantiateStreaming` or export binding would only be caught by manual browser testing, which is not reproducible.
*   **Remedy:** Add a lightweight test suite (e.g., Vitest or Jest with jsdom) that loads the `.wasm` file, instantiates it, and calls `step`, `set_gain`, etc., asserting expected outputs.

**F4: Missing Measured Baseline & Calibration (P2 - Does Not Block, but Incomplete)**
*   **Evidence:** `VERIFICATION` section claims *"120 FPS"* but provides no methodology, device specs, or calibration data. No `getOutputTimestamp()` usage or latency measurement is present in `main.js`.
*   **Constraint Violation:** PHASE-X1.md Acceptance: *"record timings, artifact sizes, console/network errors and the calibration method."*
*   **Impact:** The "measured clock/renderer baseline" deliverable is missing. The 80ms p95 offset target is not calibrated.
*   **Remedy:** Add a diagnostic mode that logs `performance.now()` vs `audioContext.currentTime` and `getOutputTimestamp()` if available. Record these metrics in a `BASELINE.md` file with device/browser details.

**F5: Asset Provenance & Licensing (P2 - Does Not Block)**
*   **Evidence:** `main.js` loads `/audio/fixture-tone.wav`. No license information is provided for this asset.
*   **Constraint Violation:** PHASE-X1.md Scope: *"Generate/license small audio fixtures."*
*   **Impact:** Unclear provenance.
*   **Remedy:** Add a `LICENSES.md` or comment in `main.js` specifying the source and license of `fixture-tone.wav`.

### What Is Honestly Stated
The README is honest about the missing Leptos layer. It does not falsely claim to be a complete plugin system. It correctly identifies the boundary as "Rust kernel owns smoothing... browser owns Web Audio."

### What Is Not Yet Proven
1.  **Rust UI → Wasm Boundary:** The core X1 goal.
2.  **Robust Audio Lifecycle:** Seek, end, and file-switching states.
3.  **Reproducible Browser Tests:** Only native Rust tests exist.
4.  **Latency Calibration:** No evidence of the 80ms p95 target being measured.

### Conclusion
**X1 is NOT DONE.** The prototype is a functional demo of a JS-driven Wasm kernel, but it fails the primary acceptance criterion of demonstrating a **Rust-rendered UI** controlling the Wasm kernel. This is a P0 blocker. The team must implement the Leptos UI layer, fix the audio state machine, and add browser-side tests before requesting re-review. Do not proceed to X2 until the Rust UI boundary is proven.
