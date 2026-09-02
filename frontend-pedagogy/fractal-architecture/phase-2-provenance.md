# Phase 2: Provenance And Generation

Prompt for a cold session:

> Implement or review the generator as a hexagonal core: formula and citation
> inputs are ports; SVG rasterization, filesystem delivery, Ahmes verification,
> and Ollama embedding are adapters. Generate original SVG/PNG once in a
> content-addressed source release, then copy immutable delivery assets. Append
> releases rather than overwriting them. Fail closed when formula fidelity or
> evaluator-safe citation requirements are absent.

Dependencies: Phase 1 contract.

Gate: source and delivery hashes match, a second run is idempotent, and a
private receipt contains the page-level formula evidence.
