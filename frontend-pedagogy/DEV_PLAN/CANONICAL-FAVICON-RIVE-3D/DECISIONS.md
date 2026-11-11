# Frozen decisions

| ID | Decision | Reason |
| --- | --- | --- |
| D1 | `fava-mark-static.svg` is the sole geometry and base-colour authority. | Prevents the demo, fallback, and favicon from drifting. |
| D2 | Generated geometry is committed; hand-edited generated buffers are forbidden. | Makes review and rebuild deterministic. |
| D3 | Every source path receives `facet-01` … `facet-13` in source order. | Preserves painter order and stable interaction identity. |
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
