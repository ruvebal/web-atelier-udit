# Make Sound Visible

Student challenge brief for the three-studio sprint: three sessions, four hours each, one accumulating product.

## The challenge

Create a small audiovisual instrument that makes a listener notice something new. Local audio must drive a real depth-tested 3D scene through the shared Web Audio → Rust/Wasm → visualizer boundary. Choose a visual metaphor, map sound deliberately, make the controls usable, test the quiet and broken cases, and defend every important decision.

The winning project is not the one with the most effects. It is the one whose form, code and evidence belong together.

## Choose a direction

| Concept | Minimum viable interpretation | Ambitious extension |
| --- | --- | --- |
| Spectral sculpture | Three bands deform one low-poly mesh | Instanced facets and seeded presets |
| Rhythm city | Instanced buildings respond to energy bands | Camera paths with tested onset cues |
| Orbital ensemble | Bass, energy and highs control orbiting bodies | User-composed parameter relationships |
| Kinetic instrument | One articulated object responds to an envelope | Rive control skin plus Three.js body |
| Resonant garden | Stems bend with energy and return to rest | Instanced growth and seed presets |
| Particle chamber | A bounded cloud expands and changes colour | Compute path only after profiling |
| Listening room | Calm spatial changes reveal contrast and silence | Accessible alternate visual mode |

Propose another concept if it satisfies the same evidence contract. More particles, paid assets or more frameworks do not earn marks by themselves.

## Required core

1. A student-owned `createVisualizer({ scene, THREE, features, options })` module with an identifiable spatial composition and real depth occlusion.
2. Student-authored Rust compiled to WebAssembly performs a meaningful bounded transformation: smoothing, an envelope, a nonlinear mapping or a small stateful simulation. It must handle normal, silence and discontinuity inputs.
3. Web Audio supplies normalized readings such as RMS, bass and high-band energy. Do not call energy “beat detection” without implementing and testing an onset rule.
4. Three.js/WebGL2 (or another instructor-approved true-3D renderer) supplies the scene, camera, materials and depth-tested output.
5. Play/pause, seek, gain, loop, reset, keyboard access, reduced motion and a readable status/error path.
6. Tests or repeatable checks covering the mapping, silence, one invalid input or failure path, and the student’s most important interaction.
7. A concept statement, feature → property → perception table, asset credits, two-minute defence and `AI-USE.md` declaration.

WebSockets, Rive, a second client, microphone input and beat/event detection are stretch work. They cannot replace the required core. X1 deliberately has no relay or runtime plugin loader.

## Evidence by studio

### A1 — Signal to form

One working Wasm mapping, one visible 3D response, silence-safe output, a concept sketch, a data-path diagram and one prediction checked in the browser.

### A2 — Playable composition

An original 3D composition with two meaningful controls, deterministic pause/seek/reset, responsive layout, reduced-motion behavior and a short stack decision comparing two plausible approaches.

### A3 — Exhibition release

The A2 product hardened with tests, clean console, resource disposal, failure fallback, evidence screenshots or recordings, asset credits, AI declaration, and an individual defence.

## Assessment proposal — assignment rubric, not course-wide weights

| Criterion | Points | Evidence |
| --- | ---: | --- |
| Concept and audiovisual authorship | 15 | Specific metaphor and intentional mapping; not a generic equalizer. |
| Audio and Rust/Wasm understanding | 20 | Correct trace from local audio to features, Rust and bounded visual values; explains silence. |
| 3D/GPU craft | 20 | Depth-tested geometry, materials, camera and spatial composition; usable performance. |
| Interaction and accessibility | 15 | Transport controls, keyboard path, labels, status and reduced motion. |
| Engineering quality and evidence | 15 | Tests/checks, disposal, responsive behavior, failure path and reproducible run. |
| Defence and critical judgement | 10 | Rejected alternative, limitation and trade-off explained from the student’s work. |
| AI practice and declaration | 5 | Tool, contribution and verification recorded; student can explain the result. |
| **Total** | **100** | |

AI use is not rewarded for volume. A student who writes every line without understanding cannot receive full marks; a student who uses AI selectively, documents it and verifies the result can.

## Required AI-use declaration

Add `AI-USE.md`:

```md
# AI-use declaration

## Tools and dates
- Tool/model:
- Dates or sessions:
- What I supplied as context:

## Contributions
- Explanation, planning or debugging assistance:
- Code or prose generated or transformed:
- Files and sections affected:

## Verification
- Tests and commands I ran:
- Behaviours I checked in the browser:
- One suggestion I rejected and why:
- One limitation or uncertainty that remains:

## Authorship statement
I can explain the architecture, the feature-to-visual mapping, the main interaction path,
and the failure behavior in my own words. I accept responsibility for the submitted work.
```

“I used AI” or “AI was only a helper” is insufficient. Do not paste private recordings, credentials or another person’s code into a model. Do not present generated citations, benchmark numbers or understanding that you did not verify.

## Stack defence

Answer individually, in two minutes:

| Question | Required answer |
| --- | --- |
| What experience did you intend? | Listener, musical feature and spatial metaphor |
| What did Rust contribute? | Function, data types, bounded contract and test |
| What owns UI, audio time and rendering? | Named files and interfaces |
| Which alternative did you reject? | One fair comparison, including cost or risk |
| What fails on a weaker device? | Observed failure and fallback |
| Which AI suggestion did you change or reject? | Suggestion, reasoning and verification |
