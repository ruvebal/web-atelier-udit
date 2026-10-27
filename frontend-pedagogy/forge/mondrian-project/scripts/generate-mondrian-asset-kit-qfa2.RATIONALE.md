<!--
Mondrian Project — rationale for generate-mondrian-asset-kit-qfa2.mjs
26 October 2026
-->

# Asset kit qfa2: rationale

`generate-mondrian-asset-kit-qfa2.mjs` replaces
`generate-mondrian-asset-kit-qfa1.mjs` as the preferred kit generator. Base
matrix matches qfa1’s 41 roles; **v2.1.0 (Q-FA4)** adds 10 neoplastic-macro
assets (5 figures + 5 heroes). Trees stay as prologue only. Canonical Q-FA1
tree module unchanged (`θ=26°`, `R=1.45`, depth 6). Writes to
`assets/kit-qfa2/` and `assets/originals/kit-qfa2/`.

> **Naming:** generator folder `qfa2` = second pass over the Q-FA1 twin.
> WORK-QUEUE **Q-FA2** is the hand-rolled kit. This QA/macro ship is
> **Q-FA4**. Current release: `83a2d71c19ea9786` (`@2.1.0`).

## 1. Draw the representation the project actually adopted

Grounding: [`grounding/ANDRZEJEWSKI-2010.md`](../grounding/ANDRZEJEWSKI-2010.md),
§3.2 anchors on p. 5. Lines are black, have a centre and an extent, and are
drawn *over* rectangles. Unfilled space is white. Roles are
white/red/yellow/blue/black, plus the project's single-gray extension.

| qfa1 defect | Evidence | qfa2 change |
| --- | --- | --- |
| Hero, logo and isometric armature drawn `#0f172a` on a `#0b1220` field | Contrast **1.05:1**, so the armature is invisible in the PNGs | Neoplastic content sits on a white canvas (armature **17.06:1**). The hero keeps the dark UDIT field and puts the canvas in a panel that bleeds off the right edge. |
| Every line spans the full canvas | §3.2 gives lines an *extent* (two orthogonal grid points) | One axis is primary (full span). Secondary lines may stop on a primary line or a border, making T-junctions. The share rises along the density ladder (0 → 0.5). |
| Cuts can land arbitrarily close (doubled lines) | `partitions()` sampled cuts with no spacing | `cuts()` samples uniformly over configurations where cuts are ≥ `gap` apart (constructive, no rejection loop) |
| Planes overlap and overwrite each other | No occupancy check | Planes claim grid cells. Overlap is impossible, and the `planes-disjoint` gate re-checks it. |
| White planes, and colours that may never include a primary | Uniform pick from `[red, yellow, blue, white, white, gray]` | The first three planes are a seeded shuffle of the primaries; later planes use primaries or gray. White is the ground, not a plane. |
| Texture used circles | Circles are outside the orthogonal points/planes/lines vocabulary | Small squares at crossings; full-span lines only, so the tile is seamless by construction |
| Isometric study: flat floating rhombi, vertical edges only | Plane-only projection, black on dark | White floor carrying the full armature, planes extruded as shaded blocks, painter's order by depth |
| Tree favicon: the 1600×900 crop shrunk into 64 px (a sliver) | Hard-coded `translate(-51.2,-29.4)` | The Q-FA1 branching (depth 4, recorded as `tree_overrides`) is fitted to its own bounding box. 16/32/180 px PNGs are added. |
| One layout is not shared across grammars | n/a | Figure, silhouette, wash, isometric and texture of the same density use one layout. The silhouette registers 1:1 with the figure and can serve as its mask. |

The tree envelope is unchanged (the mode contract fixes θ, R and depth). The
density ladder for trees only widens the stroke-weight range (0.55 → 1.65,
where qfa1 used 0.75 → 1.2).

## 2. Gate before writing

qfa1 wrote files one by one and could throw halfway through, leaving a
partial release. qfa2 builds all 41 SVGs in memory and runs these gates:

| Gate | Why |
| --- | --- |
| `finite` | No `NaN`/`Infinity` coordinates leaking from geometry |
| `unique-ids` | Ids are prefixed with the asset slug. qfa1 used `id="t"`/`id="d"` in every file, which breaks `aria-labelledby` when two kit SVGs are inlined in one page. |
| `title-safe` | Mode contract §Brand/crop: the left 43% of a background stays void. Checked against the panel edge, and against the tree's transformed extent plus a glow margin. |
| `contrast(...)` | Armature ≥ 3:1 (WCAG 2.2 SC 1.4.11, non-text). The decorative texture is ≥ 1.4:1 (perceptible, stays quiet under text; actual 1.72:1). |
| `line-gap≥2×line` | No doubled or touching lines at any render size (the logo is the tight case) |
| `planes-disjoint` | Re-checks the layout invariant |
| `size-budget` | Favicons ≤ 16 KB, everything else ≤ 192 KB |

If any gate fails, the script exits with code 1 and **writes nothing**. Each
index row lists the gates applied to that asset.

## 3. Releases are reproducible and verifiable

- An existing release is **verified, not re-stamped**. qfa1 rewrote
  `index.json`, `figcaption-data.json` and the README with a new `created_at`
  on every run, inside a supposedly content-addressed release.
- `created_at` honours `SOURCE_DATE_EPOCH`.
- PNG SHA-256 values are recorded. qfa1 hashed SVGs only.
- `--check` re-hashes the current release against its `index.json`.
- `--dry-run` builds, gates and reports the delta, then writes nothing.
- `--no-png` runs without `rsvg-convert`. A missing rasteriser now fails at
  start-up with a hint, not on the first PNG.
- The release id hashes `[slug, sha]` pairs, so renaming a role changes it.

## 4. Public/private split

qfa1 wrote its private receipt (absolute paths) to
`assets/kit-qfa3-<id>.private.json`. That name carried the wrong kit label,
and the file sat in a non-ignored folder beside public assets. qfa2 writes the
receipt to `_private/kit-receipts/kit-qfa2-<id>.private.json`, which the
repo-root `_private/` rule ignores. Public JSON and markdown contain only
relative paths.

## 5. Inspectable outputs

- `layouts.json` holds each seed's grid points, lines (centre, extent, weight)
  and rectangles in normalized coordinates, after §3.2. It has *not* been
  validated against `work.schema.json` (D-05).
- `preview.html` is a static contact sheet: a checkerboard behind transparent
  assets and the UDIT field behind dark ones.
- `index.json` carries `delta`: identical, changed, added and removed counts
  against the current `kit-qfa1` release, keyed by `category/role/density`.
- Citations: Andrzejewski et al. is now in Chicago Author-Date (qfa1 had APA).
  It is built from the Crossref-verified record in
  `grounding/ANDRZEJEWSKI-2010.json`. **Verify** the expanded given names and
  the editors against Crossref before public use.

## 6. Code hygiene

Removed from qfa1:

- the unused `silhouetteSvg`;
- the discarded `lines` and `pad` in `textureSvg`;
- the ignored `rotate` argument passed to `treeSvg`;
- four copies of the same citation;
- the silent `PROVENANCE[...] || neoplastic_grid` fallback, which now throws.

The script also XML-escapes title and description text.

## Expected delta against kit-qfa1

All 41 SVGs differ. 39 change by design. The other two, the `mark-grid` and
`mark-silhouette` favicons, keep their geometry: only their namespaced ids
and whitespace change their bytes.

## 7. Q-FA4 — colour + neoplastic macros (27 Oct 2026)

| Defect in preferred chrome | Fix in `@2.1.0` |
| --- | --- |
| Trees read as “the Mondrian look” | Prefer `neoplastic-grid` + new `neoplastic-macro`; trees captioned prologue |
| Primaries missing / gray muddy | Plane pick forces R/Y/B when ≥3 planes; gray ≤1 plane and ≤35% of coloured area before write; gate `colour-primaries` / `colour-gray≤40%` |
| Over-painted canvas | Gate `colour-fill` (58% / 72% by density) |
| Complexity only via tree branching | `macroTree()` nests orthogonal layouts in empty cells (fractalizer on product grammar); nests clip-pathed |
| Macro line overhangs | Nested groups clipped to cell inset |

### Non-goals

- Promoting Bountis tree equations into the product schema.
- Dropping tree prologue assets (they remain for pitch “what the matrix refuses”).

## Known limits

- `treeMinX` mirrors `renderTreeAtmosphereSvg`'s internal centre and scale
  (`0.8w`, `0.522h`, `1.85 + 0.25·phase`). If the module changes, update the
  gate too, or have the module export its transform.
- The isometric painter's order sorts by centroid depth. That is exact for
  disjoint cells of similar height. Tall blocks placed diagonally could still
  overlap slightly wrongly.
- Both the originals and delivery trees are still written, matching the
  qfa1/kit convention. Together they double disk use (~3.5 MB per release).
