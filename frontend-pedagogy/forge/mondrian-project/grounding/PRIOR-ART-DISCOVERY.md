# Prior-art discovery queue

**Status:** discovery only. None of these items is citation-ready until it has
passed the Ahmes → Athanor → complete-node → evaluator-safe citation gate.

This queue keeps unlike traditions separate. Mondrian/De Stijl/Neo-Plasticism
is the project's subject. Kandinsky, Malevich/Suprematism and Russian
Constructivism may be comparative contexts; they are not aliases or one style.

## Authority and object records

- [The Mondrian Papers](https://edition.mondrianpapers.org/) — RKD/Huygens
  digital scholarly edition; candidate authority for Mondrian's terminology and
  theoretical statements.
- [Piet Mondrian: Catalogue Raisonné](https://pietmondrian.rkdstudies.nl/foreword/)
  — candidate authority for identifiers, dates, dimensions, media, provenance
  and collection records.
- [Victory Boogie Woogie research data](https://www.rkd.nl/en/current/news/research-data-on-mondrians-victory-boogie-woogie-now-available-online)
  — RKD/RCE/Kunstmuseum technical dataset; candidate for a later account of
  revision states, not for the MVP corpus excluded by D-12.
- Martins et al., “The making of *Broadway Boogie Woogie*”,
  [Heritage Science (2016)](https://www.nature.com/articles/s40494-016-0091-4)
  — candidate conservation study of underlayers and revision.

## Computational and mathematical precedents

- Andrzejewski, Stork, Zhu and Spronk, “Inferring compositional style in the
  neo-plastic paintings of Piet Mondrian by machine learning” — locally
  extracted; see [`ANDRZEJEWSKI-2010.md`](ANDRZEJEWSKI-2010.md).
- Park, “Stylistic Reproductions of Mondrian's Composition with Red, Blue and
  Yellow through Evolutionary Computation,”
  [CAADRIA 2020](https://doi.org/10.52842/conf.caadria.2020.2.133) — candidate
  shape-grammar/parametric precedent; a computational hypothesis, not evidence
  that Mondrian painted algorithmically.
- Koçer Özgün and Alaçam, “Pixel-Based Geometric Decoding of Piet Mondrian's
  Paintings,” [SIGraDi 2021](https://doi.org/10.5151/sigradi2021-72) —
  candidate normalized geometry and spatial-relation precedent.
- Fallahzadeh, Gamache and Araújo, “Equilibrium and Rhythm in the Art of Piet
  Mondrian,” [Cogent Arts & Humanities
  2018](https://doi.org/10.1080/23311983.2018.1525858) — candidate theoretical
  bridge from measurable relations to dynamic equilibrium and living rhythm.
- Spayd, Reynolds and Lansinger, “Geometric Elements in the Art of Piet
  Mondrian,” [Journal of Humanistic Mathematics
  2019](https://scholarship.claremont.edu/jhm/vol9/iss1/6/) — candidate
  mathematical interpretation and explicit comparison with Moholy-Nagy.
- Schirillo and Plumhoff, “Mondrian, Eye Movements, and the Oblique Effect,”
  [Perception 2009](https://doi.org/10.1068/p6160) — candidate orientation
  study; small sample, so no general user-preference claim.

## Interaction precedents

- [Mondrian Maker](https://studiodigital.kunstmuseum.de/piet-mondrian-mondrian-maker),
  Kunstmuseum Den Haag — institutional interaction precedent for line,
  thickness, colour and lozenge controls; implementation inspiration only.
- [Mondrian in Style](https://chaoyue-zhao.github.io/mondrian-in-style/) —
  responsive recomposition precedent; not scholarly evidence.
- [Make Your Own Mondrian](https://googlecreativelab.github.io/coder-projects/projects/mondrian/)
  — HTML/CSS teaching precedent whose fixed-position implementation should not
  determine this project's modern architecture.

## Comparative digital-humanities precedents

- [Ode to Construction](https://odetoconstruction.com/) — code-to-vector,
  print and installation practice around Russian avant-garde construction;
  comparative practice-based research, not Mondrian evidence.
- [Digital Formalism: Vienna Vertov
  Collection](https://www.vr.tuwien.ac.at/projects/digital-formalism/) —
  institutional precedent for computationally operationalizing formal concepts
  in an archive; not a source for Neo-Plastic rules.

## M0 decisions this queue must inform

1. Build a source matrix with `work identifier → observed feature →
   interpretation → implementation decision → confidence`.
2. Label every modeled property as `documented`, `inferred`,
   `computational-hypothesis` or `visitor-transformation`.
3. Reconstruct a catalogue-identified source state before exposing
   transformations.
4. Treat responsive behaviour as an experiment: proportional scale,
   constraint-preserving reflow and controlled recomposition must not be
   conflated.
5. Keep generation, authenticity scoring and claims about Mondrian's internal
   process outside the MVP.
