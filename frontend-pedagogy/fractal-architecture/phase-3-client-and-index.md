# Phase 3: Client And Semantic Index

Prompt for a cold session:

> Consume the public figcaption manifest in the client. The rendered caption
> must visibly state the mathematical formula, its short explanation, Chicago
> reference, authorship, date, and asset hash without revealing private audit
> metadata. Build a local Ollama embedding index from the public-safe records;
> treat it as retrieval only, never as a citation or formula validator.

Dependencies: Phases 1-2.

Gate: the client rejects missing/mismatched figure records and public builds
contain no private provenance labels or local paths.
