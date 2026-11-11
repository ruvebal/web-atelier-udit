# Deterministic SVG extrusion compiler

`cli.mjs` converts the supported SVG subset into a manifest, indexed geometry provider, Rive scene-contract fragment, and canonical fallback.

```sh
node scripts/svg-extrusion/cli.mjs --input docs/assets/icons/fava-mark-static.svg --output build/favicon-3d --config scripts/svg-extrusion/fixtures/config.json
```

V1 accepts one closed filled contour per `path`, absolute or relative `M/L/C/Z`, implicit repeated coordinate groups, solid resolved fills, and path-local affine `matrix`, `translate`, `scale`, or `rotate` transforms in written order. The tokenizer accepts decimal signs and exponents. SVG coordinates are baked, Y-inverted, and mapped into a centered right-handed model whose X/Y units equal one `viewBox` maximum dimension. Front faces are CCW at Z=0; backs extend toward negative Z. Matrices use column vectors.

V1 rejects XML entities/DOCTYPE, groups with transforms, multiple subpaths/holes, strokes, text/images, masks, clips, filters, gradients/patterns, unsupported path commands, degenerate or self-intersecting contours. `manifest.json` is `svg-to-rive-3d/v1`; `geometry.json` is `rive-animascript-3d/generated-provider/v1` with triangle-list positions, unit normals, indices, and per-facet spans. Facet count is always parsed data; only the favicon golden test asserts 13.
