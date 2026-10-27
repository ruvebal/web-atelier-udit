# Mondrian Project — visual assets index

## Preferred kit (product identity)

| Kit | Release | What | Prefer for |
| --- | --- | --- | --- |
| **kit-qfa2** | [`83a2d71c19ea9786`](kit-qfa2/release-83a2d71c19ea9786/) · [`kit-qfa2-current.json`](kit-qfa2-current.json) | Andrzejewski white canvas + primaries; **neoplastic-macro** recursive grids; colour gates; trees demoted to prologue | Product chrome, heroes, figures, logos |

Inventories: [`INDEX-QFA2.md`](INDEX-QFA2.md) · release [`preview.html`](kit-qfa2/release-83a2d71c19ea9786/preview.html) · rationale [`../scripts/generate-mondrian-asset-kit-qfa2.RATIONALE.md`](../scripts/generate-mondrian-asset-kit-qfa2.RATIONALE.md)

### Grammar roles (kit-qfa2 @ 2.1.0)

| Grammar | Count | Use |
| --- | --- | --- |
| `neoplastic-grid` | 19 | Product identity (figures, heroes, textures, logos) |
| `neoplastic-macro` | 10 | Fractalizer × orthogonal Mondrian (nested constructivist macros) |
| `wash-fill` / `silhouette-matrix` / `isometric-grid` | 16 | Fills, masks, teaching figures |
| `mondrian-tree` | 6 | **Prologue only** — early-tree atmosphere the matrix refuses |

## Archive / A/B twins

| Kit | Release | Notes |
| --- | --- | --- |
| **kit-qfa1** | [`dd7ac8a068d23bd8`](kit-qfa1/release-dd7ac8a068d23bd8/) | Dark-field neo defects; trees via Q-FA1 module — A/B only |
| **kit** | [`ecaf67cb0ab1c057`](kit/release-ecaf67cb0ab1c057/) | Hand-rolled trees — A/B only |

Diff qfa1↔hand-rolled: [`KIT-DIFF.md`](KIT-DIFF.md)

## Other deliveries

| Path | Role |
| --- | --- |
| [`mondrian-tree/`](mondrian-tree/) | Q-FA1 pitch atmospheres (3 families) |
| Course copies | `web-foundations/docs/assets/images/mondrian-tree/` |

## Regenerate

```bash
# Preferred (gates + macros + colour QA)
node frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit-qfa2.mjs
node frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit-qfa2.mjs --check

# Archive twins
node frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit-qfa1.mjs
node frontend-pedagogy/forge/mondrian-project/scripts/generate-mondrian-asset-kit.mjs
```
