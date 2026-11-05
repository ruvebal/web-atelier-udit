# PHASE-X16: Exhibition readiness, deployment and closing audit

> **Track:** L3 production + cascade close. Product-owner amend 2026-11-05 (D26).  
> **Status:** BLOCKED until X15 DONE  
> **Depends on:** X14–X15, D21–D26, live GitHub Pages

## Goal

Build and **deploy** the production aggregator, verify the exhibition on the **live** GitHub Pages origin (not only a local build), re-run relevant earlier gates, and update the closing audit against D21–D26 with exact URLs and runnable evidence.

A local `npm run build` is **not** proof of deployment.

## Deliverables

- Production deploy of `feii-album-covers` (Pages workflow green)
- Live verification notes: gallery, selector, `_studio`, WebGL fixture, DOM/hybrid fixture
- Direct-link / reload checks under `/feii-album-covers/`
- A11y / reduced-motion / mobile / route-failure recovery checks
- Isolation proof (CSS / R3F / runtime) and lazy-load confirmation
- Updated [CLOSING-AUDIT.md](CLOSING-AUDIT.md) for D21–D26
- `PHASE-X16-COLD-REVIEW.md`, `PHASE-X16-REPORT.md` with exact live URLs

## Scope

**In:**
- Push/deploy as authorised; wait for Pages workflow; record commit SHA + workflow run URL
- Browser (or equivalent) checks of live URLs — include SPA deep links (HTTP 404 + 404.html body is acceptable if the app boots; document it)
- Re-run X11/X12/X13/X14/X15 exit gates that still apply
- Confirm one throwing route does not remove exhibition navigation
- Confirm routes remain separately lazy-loaded in the deployed asset graph
- Closing audit rows for D21–D26

**Out:**
- Merging `cascade/FEII-3D-ALBUM-KTX` into `web-atelier-udit` `main` (professor)
- Adding students as collaborators (professor)
- Publishing `react-template` satellites (professor, D24) — note status only

## Prompt (Implementation Agent)

```text
Implement PHASE-X16 per
frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X16.md.

## Deliver
1. Ensure main of feii-album-covers has X14–X15; push; confirm Pages
   workflow succeeds. Record run URL and live base URL.
2. Verify on the LIVE origin:
   - https://ruvebal.github.io/feii-album-covers/
   - /covers/_studio
   - WebGL fixture slug
   - DOM/hybrid fixture slug
   Direct open + reload each. Selector prev/next/all. Keyboard.
   prefers-reduced-motion. Narrow viewport. Forced route error recovery.
3. Confirm lazy chunks and isolation claims with evidence (network
   panel / built asset list / deliberate CSS clash test).
4. Re-run applicable exit gates (X11–X15 as relevant).
5. Update CLOSING-AUDIT.md against D21–D26 with PASS/FAIL + URLs.
6. Do NOT treat local build as deployment proof.
7. Do NOT push web-atelier-udit.
8. Hand off VERIFYING — do NOT mark DONE.
```

## Acceptance

- [ ] Pages workflow green for the landed commit; live base URL returns the gallery
- [ ] Live checks recorded for `/`, `_studio`, WebGL fixture, DOM/hybrid fixture (direct link + reload)
- [ ] Selector + prev/next/all work on live origin
- [ ] Keyboard, reduced motion, mobile layout, route failure recovery checked
- [ ] Lazy loading and cross-route isolation confirmed with evidence
- [ ] Earlier applicable gates re-run
- [ ] CLOSING-AUDIT.md updated for D21–D26 with exact URLs
- [ ] Cold review filed; blocking Fn closed
- [ ] Report lists live URLs; no “local only” completion claim

## Risks

GitHub Pages caching / workflow delay. Still-success: wait and re-fetch; record the workflow run that matches the SHA. SPA deep links may show HTTP 404 with working app — document, do not fail solely on `curl -I` status if the HTML shell boots the router.
