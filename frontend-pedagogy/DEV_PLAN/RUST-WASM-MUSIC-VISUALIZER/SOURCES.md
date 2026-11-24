# Source ledger and technical watch

Checked 2026-11-24. This file is instructor-only provenance. It separates technical reading, pedagogical evidence and mutable platform documentation. No extraction databases or full source books are copied into the repository.

## Supplied and discovered books

| Source identity | Verified contents / use | Current citation boundary |
| --- | --- | --- |
| Steve Klabnik, Carol Nichols and Chris Krycho, *The Rust Programming Language*, No Starch Press, supplied 2026 EPUB, ISBN 9781718504455 | OPF lists all three authors; chs. 1, 4–6, 9 and 11 support the reading path. Chapter 17 covers async. Use the book as the Rust foundation. | Fresh extraction initially has no bibliographic metadata rows; resolver returns BIBLIO-GAP. OPF identity is verified separately; do not publish a resolver-safe citation until metadata is resolved. |
| Adam Jones, *Rust Mastery Unlocked: Advanced Techniques for High-Performance Development*, supplied 2025 EPUB | OPF author/date verified. Ch. 7 addresses Rust/Wasm, including bindings and Yew/Seed; chs. 9–10 concern performance/testing. | OPF has placeholder identifier `http://example.com/document`, not a verified ISBN; publisher in filename is not corroborated by the OPF. Missing vault metadata. Use as a secondary topic map, audit every code sample against current APIs. |
| Boris Smus, *Web Audio API: Advanced Sound for Games and Interactive Apps*, supplied 2013 EPUB | Ch. 2 timing/latency and ch. 5 analysis/visualization. Existing 441-node vault reused. | Author/ISBN available, year missing in vault metadata; sampled node unresolved. Historical API examples require modernization. |
| Joshua Reiss, *Working with the Web Audio API*, supplied 2022 EPUB | Existing 3,992-node vault. Substantive analyser and AudioParam timing nodes read. EPUB3 navigation yields 218 TOC entries: ch. 5 scheduling/parameters and ch. 7 analysis/visualization. | Missing year; metadata also lists Francis Rumsey as chair, not a verified co-author. Do not promote that role to authorship. |
| William Turner, *JavaScript for Sound Artists*, edited by Steve Leonard | Existing 2,094-node PDF vault. Ch. 21 “Time” grounds audio-clock scheduling. | **Direct front-matter check:** authored by Turner, edited by Leonard; second edition published **2023**. Registry-derived vault metadata says 2022 and treats Leonard as co-author. Resolver says safe but bibliographic audit rejects those fields; repair before public citation. |
| Indo Yoon, *Beginning Axum: Learning Modern Web Development With Rust*, Apress, 2026 | Found beside supplied Rust books; TOC ch. 5 covers WebSocket, concurrency and authentication. | OPF/TOC scanned only; not ingested, not cited as substantive evidence. Candidate for X0 if server teaching expands. |

The metadata/TOC inventory and SHA-256 digests are in `evidence/epub-inventory.json`. Full texts remain in the local library. Rust Mastery retained 2,790 of 17,101 extracted blocks: extraction success is not code fidelity. Rust book extraction warned about a missing cover-image reference; no claim of complete image extraction is made.

## Verified evidence anchors

| Claim/use | Anchor and actual locator | Gate and transfer limit |
| --- | --- | --- |
| Design from desired results and evidence before activities | Wiggins/McTighe vault ending `6a0018aa`; node `d2d094ae-c2d9-56a6-ace9-5d37e8a126a5`; extraction page index 18; full printed pages **8–9** inspected via pdftotext | evaluator_safe=yes, human metadata. The CLI prints “19” because it uses PDF order; use printed folios. This grounds design order, not an effect size or 12-hour feasibility. |
| Critique, verification journals and fading as proposed pedagogical strategies | Canonical scholar vault `s40594_025_00592_w_dc2bd27d`; node `5ef651db-df6d-5906-b714-1672f8810a22`; page index 16, printed **17** | evaluator_safe=yes, metadata confidence .95. Conclusion and surrounding page read; theory-building account, not efficacy trial. Duplicate vaults with the same source hash have unsafe metadata and are not citation sources. |
| Web Audio scheduling uses the audio context's time in seconds | Turner vault ending `c503004c`; node `75332c3f-df34-519c-9274-cd7eff2de45d`; page index 211, printed **191** | evaluator_safe=yes, .95, but source audit finds year/role mismatch. Use the source-verified 2023/Turner-author identity only after the metadata discrepancy is explicitly resolved. PDF page 212 is not printed p. 191. |
| Analyser provides time/frequency data without changing the signal | Reiss node `8cf15ed4-5e14-5490-94cc-e84dc78d4964`, EPUB section at extraction index 20; adjacent substantive node `da4bfc68-ad87-5c1c-9945-eb0264420b87` read | BIBLIO-GAP; use current platform documentation for implementation while keeping this book as a reading candidate. Index 20 is not a printed page. |

`evidence/citation-audit.json` preserves sampled resolver outputs and exact DB paths. `evidence/didactics-anchors.json` preserves the backward-design audit. Unresolved reasons were established by inspecting metadata: empty fresh Rust metadata; missing year for Smus/Reiss; low-quality/unresolved duplicate Liu coats. Do not silently substitute a polished citation for those outputs.

## Scholarly references retained

- Wiggins, Grant, and Jay McTighe. 2011. *The Understanding by Design Guide to Creating High-Quality Units*. Alexandria, VA: ASCD. Printed pp. 8–9 verified in the local source.
- Liu, Dandan, Guangrui Fan, and Lihu Pan. 2026. “Tool, Tutor, or Crutch?: A Grounded Theory of Cognitive Scaffolding and Offloading in AI-Assisted Programming Education.” *International Journal of STEM Education* 13, article 10. https://doi.org/10.1186/s40594-025-00592-w. Full author names verified against the local PDF title page; the planning citation uses Liu, Fan, and Pan.

Source-verified reading entry, **pending metadata reconciliation before public citation**: Turner, William. 2023. *JavaScript for Sound Artists: Learn to Code with the Web Audio API*. Edited by Steve Leonard. 2nd ed. CRC Press. https://doi.org/10.1201/9781003201496. Timing passage at printed p. 191. This discrepancy illustrates why resolver safety is not sufficient by itself.

## Discovery scopes and exclusions

- `profield-frontend-pedagogy`, `scholar`: searched for scaffolding, worked examples and programming. Kept the substantive Liu conclusion after opening the actual page. Discarded title-only hits, keywords, a bibliography entry to Shin et al., and a secondary curriculum-as-code snippet as insufficient for direct claims.
- `scholar-technics`, `scholar`: initial audio query returned unrelated AI infrastructure material; discarded. This project was not used as the injection destination.
- `profield-didactics`, `scholar`: not present in the current Athanor project list; explicit search failed. Used the existing local Wiggins/McTighe vault read-only. Do not report a successful vector search over this scope.
- `rust-wasm-music-visualizer`, `scholar`: newly created for this authorized ingestion. Two Rust and three existing audio vaults form its initial technical scope. Injection completion and actual vector coverage are separate checks, recorded in SESSION-RECEIPT.md.

No claim is made that the corpus proves six lessons, particular grading percentages or improved learning from competition. These are explicit pilot design decisions.

## Platform notes — checked 2026-11-24

These are implementation references, not pedagogical bibliography. Version observations are research snapshots, **not a tested compatible lockfile**. X1 must select and freeze a buildable set.

| Topic | Observed current source | Design consequence |
| --- | --- | --- |
| Rust book | [Official book](https://doc.rust-lang.org/book/): text states Rust 1.98.0 or later, edition 2024 | Record actual compiler/MSRV in X1; do not infer newest stable release from the book |
| Bindings | [wasm-bindgen guide](https://wasm-bindgen.github.io/wasm-bindgen/) and [crate docs](https://docs.rs/wasm-bindgen/latest/wasm_bindgen/), 0.2.130 observed | Rust/JS boundary and generated glue; match CLI and crate versions |
| Rust UI | [Leptos docs](https://docs.rs/leptos/latest/leptos/), 0.8.23; [CSR setup](https://book.leptos.dev/getting_started/index.html) | CSR is a supported path; avoid unnecessary SSR infrastructure |
| JS integration | [Leptos interop](https://book.leptos.dev/web_sys.html) | Keep renderer-owned canvas/DOM separate from Rust UI-owned DOM |
| Native relay | [Axum WebSocket module](https://docs.rs/axum/latest/axum/extract/ws/index.html), 0.8.9, `ws` feature | Separate native server; async connection tasks; not browser `std::net` |
| GPU rendering | [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer) | WebGL2 is an actual GPU path; baseline does not need WebGPU |
| Newer renderer | [Three.js WebGPURenderer](https://threejs.org/manual/pages/webgpurenderer) | WebGL2 fallback exists; old ShaderMaterial/EffectComposer recipes do not transfer unchanged; docs call renderer experimental |
| All-Rust graphics option | [wgpu docs](https://docs.rs/wgpu/latest/wgpu/), 30.0.2 observed | WebGPU/WebGL2 on Wasm; extension requires a version-specific tested example |
| Rive | [Web JS runtime](https://rive.app/docs/runtimes/web/web-js) | JS/Wasm runtime with recommended webgl2 package; runtime feature parity must be checked, not assumed |
| Signal extraction | [Web Audio visualization guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API) | Shared analyser, reusable arrays, explicit FFT/time-domain interpretation |
| Clock mapping | [AudioContext.getOutputTimestamp](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/getOutputTimestamp) | Relates audio context position and performance-clock estimate; does not synchronize machines |
| Network bounds | [WebSocket reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) | No automatic receive backpressure; bound/coalesce application traffic |

Package versions for Three.js/Rive and their compatibility with the existing custom 3D runtime are deliberately **not frozen** here. The researched docs are sufficient for a direction; X1/X4 runtime checks are required for a release claim. The attempted Rive `/runtimes/audio` URL was inaccessible; no claim rests on it.

## Existing repository material to reuse

- `web-foundations/docs/lessons/en/3d/threejs-core/index.md` and `3d/animation/index.md`.
- `web-foundations/docs/lessons/en/feii/unit-9-shader-literacy/index.md`.
- `web-foundations/docs/lessons/en/feii/ai-assisted-3d-covenant/index.md`: instructor infrastructure vs student judgement; keep the individual review discipline.
- `web-foundations/docs/lessons/en/web-animations/svg-master-session/agentic-rive-3d/index.md`: sample-clock vs elapsed-time distinction; recorded audio is not live browser worklet evidence.
- `frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/`: precedent for aggregator/contribution shape; its status/version claims are historical, not new verification.

Before lesson publication, reread the exact prerequisite pages, resolve each retained source, and gate private provenance using the site's fail-closed publication switch. This pack has no student-facing publication authorization or deployment action attached to it.
