# Why build the canonical favicon as real 3D?

The existing specimen proves that Rive can package AnimaScript, WGSL, perspective, lighting, and a depth buffer. It does not yet prove that this stack can preserve the identity of an authored SVG: every instance is currently the same triangular prism arranged approximately like the mark.

The canonical specimen makes the comparison intellectually honest. The same 13 coloured source facets shown by CSS, SMIL, WAAPI, JavaScript libraries, Canvas 2.5D, and Three.js become the front faces of real meshes. The learner can therefore see what changes when the **spatial model** changes while the artwork does not.

## Value of the stack

- **Rive owns the portable asset and playback contract.** The signed `.riv` carries runtime logic rather than requiring page-global animation code.
- **AnimaScript owns time, state, input, selection, and GPU resource orchestration.** The behavior stays close to the asset and can be verified from source.
- **GPU Canvas and WGSL own space and pixels.** Indexed meshes, depth testing, normals, lighting, back faces, and occlusion make the scene genuinely three-dimensional.
- **HTML still owns the web contract.** Responsive containment, an equivalent static image, reduced motion, status text, keyboard alternatives, and failure recovery remain explicit.

This is not the economical choice for a decorative logo tilt. Inline SVG or Canvas 2.5D wins that task. It earns its cost here because the lesson needs a compact object that demonstrates geometry, interaction, portability, and the boundary between renderer and scene model.

## The visual promise

The loop begins as the exact, calm, frontal favicon. Its facets acquire area-derived thickness, separate, reveal their side walls, orbit just enough to prove occlusion, then rebuild without drift. Interaction never turns the mark into visual noise: selection is persistent and deliberate; ambient motion is optional; reduced motion preserves inspection without an automatic loop.

The result should feel like a small diamond of software animation: compact, exact, legible, responsive, and internally coherent—not a technology showroom detached from the source artwork.
