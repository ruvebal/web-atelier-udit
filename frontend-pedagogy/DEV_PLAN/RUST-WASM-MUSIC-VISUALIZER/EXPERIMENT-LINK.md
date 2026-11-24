# Experiment ↔ lessons contract

The executable application is maintained in the sibling repository:

`/Users/ruvebal/projects/ruvebal/scholar/udit/rust-wasm-music-visualizer`

The teaching repository owns the curriculum, monograph, assessment and challenge brief. It does not own the application source.

## Stable teaching entry points

| Teaching milestone | Experiment entry point | Student evidence |
| --- | --- | --- |
| L1 / A1 | `web-foundations/private/x1-vertical-slice/rust/src/lib.rs` and `src/main.js` | Rust function crosses the Wasm boundary and changes a mesh |
| L2 / A1 | `src/main.js` `featureValues()` | RMS/bass interpretation and silence case |
| L3 / A2 | Three.js scene in `src/main.js` | Depth-tested 3D composition |
| L4 / A2 | `index.html` controls and visualizer selector | Pause/seek/loop, reduced-motion and renderer fallback |
| L5 / A3 | Future X2/X3 plugin and relay milestones | WebSocket preset/control with offline fallback |
| L6 / A3 | Future release tags and test evidence | Performance, accessibility and stack defence |

## Plugin handoff

Students load a same-origin module through the prototype’s **Student visualizer module URL** field. The current experimental contract is documented in the application README; X2 will promote it to a versioned manifest and lifecycle API.

## Release discipline

When the experiment reaches a teaching gate, record the experiment commit/tag in the matching lesson package. Never teach from an untagged working tree. The lesson pack may link forward to an experiment milestone, but experiment code must not import or depend on lesson prose.
