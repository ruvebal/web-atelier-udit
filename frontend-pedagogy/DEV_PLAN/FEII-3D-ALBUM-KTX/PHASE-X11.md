# PHASE-X11: Publish gates

> **Track:** L1 integrity · registry, links, Liquid, citation firewall.
> **Status:** BLOCKED until X10 DONE

## Goal

Students can find the assignment, both satellites, and the repo README from the FE II index; the Pages build does not silently delete JSX; internal coats do not leak.

## Deliverables

- `lessons.yml` complete for assignment + both satellites (status complete only if pages are)
- Internal links via `relative_url`
- Citation/publication gates as in lesson-publishing-integrity §6.1
- `PHASE-X11-COLD-REVIEW.md`, `PHASE-X11-REPORT.md`

## Scope

**In:** web-foundations docs build, lessons.yml, feii index, covenant links, assignment repo URL from X9 (`feii-album-covers`).
**Out:** Pushing GitHub Pages. Spanish.

## Prompt (Implementation Agent)

```text
Implement PHASE-X11 per frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X11.md.

## Deliver
1. Register every new/changed lesson. Unique slugs. Only lang keys that exist.
2. cd web-foundations && npm run build
   - grep Liquid Warning empty
   - permalinks exist under _site
   - no Ahmes/DevIAC/coat/BIBLIO-GAP in built HTML of the new pages
   - cited pages have ## References
3. Sequence tables: feii index, tracks descriptions, lessons.yml titles agree.
4. Link https://github.com/ruvebal/feii-album-covers (or the fallback name
   X9 actually created) in assignment + satellites. If X9 was local-only,
   say “local aggregator, GitHub pending” — do not invent a URL.
5. Hand off for cold review — do NOT mark DONE.

## Constraints
- Autopilot may commit web-atelier lesson files locally. Do not git push web-atelier-udit.
```

## Acceptance

- [ ] `npm run build` exit 0; `grep -i 'Liquid Warning'` empty
- [ ] Built HTML for the two satellites + assignment exists at permalinks
- [ ] `rg -i 'ahmes|deviac|⟨|evaluator_safe|BIBLIO-GAP' _site/lessons/en/feii/{cover-shaders,ktx2-basis,units-8-9-assignment}` empty (adjust paths to actual slugs)
- [ ] lessons.yml slugs match files
- [ ] Cold review filed; blocking Fn closed

## Risks

Stub permalinks from X4 left as “forged in X7”. Still-success: those stubs are gone or redirected.
