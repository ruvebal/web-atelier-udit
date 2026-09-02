# Fractal Architect Development Cascade

Run each phase in a fresh agent session. The output of a phase is input to the
next phase; it does not authorize changes outside that phase's stated scope.

The target is a formula-governed generative asset pipeline with immutable
source SVG/PNG, a publication-safe figcaption manifest, private formula proof,
and a local semantic index. Public output must never reveal local corpus names,
node identifiers, crop hashes, or evaluator state.

Start at [phase-1-contract.md](phase-1-contract.md). Do not skip a failed
gate; return `BLOCKED` with evidence instead.
