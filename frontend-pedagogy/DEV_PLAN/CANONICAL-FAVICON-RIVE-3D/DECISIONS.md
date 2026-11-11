# Frozen decisions

| ID | Decision | Reason |
| --- | --- | --- |
| D1 | `fava-mark-static.svg` is the sole geometry and base-colour authority. | Prevents the demo, fallback, and favicon from drifting. |
| D2 | Generated geometry is committed; hand-edited generated buffers are forbidden. | Makes review and rebuild deterministic. |
| D3 | Every source path receives `facet-01` … `facet-N` in source order; N is parsed from the SVG. IDs use at least two digits, so the current N=13 fixture is `facet-01` … `facet-13`. | Preserves painter order and stable interaction identity without making the favicon's current count an architectural limit. |
| D4 | Intrinsic depth is `minDepth + (maxDepth - minDepth) × sqrt(area / maxArea)`, with `0 ≤ minDepth ≤ maxDepth`. Area is measured after SVG transforms and curve flattening, in normalized viewBox units. | Makes the surface/depth relationship unambiguous and bounded. |
| D5 | Area and depth bounds are generated constants documented in the manifest. | No unexplained shader magic numbers. |
| D6 | Front and back faces plus boundary side walls are generated; back-face viewing must not reveal missing geometry. | Enables a credible 360° inspection. |
| D7 | Rest pose is frontal, assembled, and raster-comparable to the canonical SVG. | Keeps “same artwork, different spatial model” testable. |
| D8 | Selection uses raw pointer coordinates and depth-aware picking; camera smoothing never changes hit identity. | Keeps stylus input accurate without visual jitter. |
| D9 | Click/tap toggles persistent selection; selected facets get a bounded Z offset and palette-state change. | Makes interaction legible and interruptible. |
| D10 | Keyboard and screen-reader equivalents live in semantic HTML/Rive semantics; GPU pixels are never treated as accessible DOM. | Preserves the web contract. |
| D11 | Reduced motion disables the automatic build/orbit loop while retaining deliberate facet inspection. | Motion preference does not remove content or interaction. |
| D12 | Web integration uses a static canonical SVG/WebP fallback and preserves the existing theme. | Failure and unsupported GPU paths remain designed states. |
| D13 | Rive MCP may assist editor composition if available, but the committed CLI/source pipeline remains authoritative. | Keeps the build reproducible and portable beyond one editor session. |
| D14 | Public provenance is generated only from real Git/GitHub events. | No fabricated agentic theatre. |
| D15 | The merge-complete provenance update is a post-hook/docs PR after the implementation PR merges. | A PR cannot truthfully contain its own future merge commit. |
| D16 | The extruder is a reusable SVG-path-to-mesh build tool; the favicon is its golden fixture, not embedded business logic. | Other SVG identities must be able to reuse the verified geometry pipeline. |
| D17 | Reusability requires a second fixture containing a concave contour and a cubic curve. | An abstraction tested only with the favicon is still favicon-specific. |
| D18 | Skill promotion happens only after a successful implementation iteration and independent cold review. | The studio skill should encode observed invariants, not speculative API design. |
| D19 | Picking unprojects raw canvas coordinates through the exact current projection/view/model transforms, intersects the current animated triangles, rejects culled/negative hits, and returns the nearest positive visible facet. | Makes selection agree with GPU depth during separation, rotation, and selected Z offsets. |
| D20 | The compiler publishes a versioned supported-subset schema. V1 accepts filled closed `M/L/C/Z` contours plus affine transforms; it rejects strokes, masks, filters, self-intersections, and multiple subpaths/holes with diagnostics. | “Reusable” must name its domain rather than imply universal SVG support. |
| D21 | The public lesson follows the graphics pipeline as separate ownership layers: vector representation → tessellation/mesh → model/view/projection transforms → visibility/depth → shading/rasterization → input/picking → time/interpolation → web semantics/fallback. | Local graphics sources support teaching architecture rather than a vendor-feature tour. |
| D22 | Animation advances from elapsed time, not frame count; position and orientation interpolation are named separately. | Frame-rate independence and quaternion/rotation interpolation are different technical problems. |
| D23 | Runtime choice is taught as an architectural trade-off: direct SVG DOM targets buy semantic/path interaction; Canvas/GPU pipelines buy centralized pixel/mesh control but require explicit picking and semantic twins. | Preserves the renderer/interactivity boundary found in the SVG monograph evidence. |
| D24 | The lesson exposes GPU setup cost separately from graphics ideas and measures shader bandwidth/computation rather than calling GPU rendering automatically efficient. | Current graphics pedagogy warns that modern API boilerplate can obscure the portable shader/pipeline concepts. |
| D25 | Runtime facet count N is derived from parsed source paths for buffers, draw counts, IDs, picking, and semantic controls. The 13-path favicon is the golden fixture's expected count, not a capacity constant. | Reusable compilation and interaction must work for different supported SVGs. |
| D26 | Normalize SVG paths by applying supported affine transforms, mapping viewBox coordinates to the declared scene orientation, then repairing contour winding before triangulation. SVG's downward-positive Y axis must be converted deliberately; vertex and face normals use normalized cross products. | Prevents area, culling, and normal direction from changing accidentally across coordinate conventions. |
| D27 | Rendering transforms follow model/world → camera/view → perspective projection. Motion is elapsed-time driven: positions use named lerp/easing and orientations use quaternion interpolation as a separate channel. | Separates geometry placement, camera projection, and temporal interpolation contracts. |
| D28 | CPU picking uses signed triangle-area inclusion or ray/triangle intersection over the same transformed, currently visible triangles as rendering; hit selection returns the nearest visible source facet. | Hit identity must remain coherent with depth visibility, motion, and selection offsets. |
