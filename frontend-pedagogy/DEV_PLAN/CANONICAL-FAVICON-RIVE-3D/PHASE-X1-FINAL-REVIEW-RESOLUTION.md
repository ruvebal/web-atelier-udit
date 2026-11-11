# PHASE-X1 final cold-review resolution

**Source review:** `PHASE-X1-FINAL-COLD-REVIEW.md`
**Disposition:** blocking paint-semantics finding corrected; external rerun and fresh closure review required

Compiler V1 now has a closed paint boundary instead of accepting arbitrary CSS colour strings. Accepted fills are opaque 3/6-digit hex or bounded comma-form `rgb()`. Separate opacity and alpha-bearing fill are excluded at this phase. Inline style may resolve only `fill`, `fill-rule`, and `stroke:none`; path and root attribute allowlists reject class, opacity/fill-opacity, inherited/variable colours, paint functions irrespective of case, and unknown presentation attributes.

Implementation and independent A9 tests now reject every adversarial case named by the reviewer—`opacity`, `fill-opacity`, `class`, uppercase/mixed-case `URL(...)`, and invalid colour text—plus root opacity, style paint functions, `currentColor`, `var(...)`, alpha hex/`rgba()`, invalid seven-digit hex, and unknown style properties. Positive tests cover both admitted hex widths plus bounded `rgb()`. A13 binds the published paint grammar to the generated manifest.

These assertions fail against commit `8870678`; no acceptance criterion was weakened. Generated outputs and evidence hashes are regenerated from compiler `1.0.2`.
