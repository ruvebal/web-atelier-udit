# PHASE-X14: Complete student-owned route architecture

> **Track:** L3 · `feii-album-covers` architecture. Product-owner amend 2026-11-05 (D26).  
> **Status:** BLOCKED until X13 DONE  
> **Depends on:** [AMENDMENT-D26-ROUTE-FREEDOM.md](AMENDMENT-D26-ROUTE-FREEDOM.md), D15 (amended), D26

## Goal

Replace the mandatory scene-only `Cover.jsx` contract with a complete **`Route.jsx` endpoint** contract. Each `/covers/<slug>` owns its entire experience (DOM, Canvas, camera, controls, state, layout, interaction, visual language). The exhibition shell owns only discovery, routing, a neutral project selector, prev/next/all navigation, lazy loading, route-level error isolation, and production safeguards.

`_studio` migrates without losing current behaviour. It remains a **reference**, not the prescribed composition.

## Deliverables

- Aggregator: `Route.jsx` contract; shell without shared Canvas/camera/lights/panel/budget UI
- Collapsed, fixed, keyboard-accessible project selector (does not consume route layout space)
- Per-route error boundaries; lazy load per slug; cleanup on unmount
- `_studio` migrated to `Route.jsx` (behaviour preserved)
- At least two fixtures proving format freedom: one WebGL, one DOM or hybrid
- Updated `registry.js`, `check-registry.mjs`, README/CONTRIBUTING contract section (architecture only; student brief polish is X15)
- `PHASE-X14-COLD-REVIEW.md`, `PHASE-X14-REPORT.md`

## Scope

**In:**
- Glob `covers/*/src/Route.jsx` (lazy). Registry row + `Route.jsx` lights the route.
- Shell: `App.jsx` / gallery Home / `CoverRoute` (or rename) load the student Route inside an error boundary; supply prev/next/all + selector only.
- Selector: collapsed by default, fixed overlay (or equivalent), keyboard operable (Tab, Enter/Space, Escape, arrow keys where natural), does not push route content.
- Isolation: no shared Canvas; no gallery-owned hover/select/budget panel; route CSS scoped or namespaced; dispose WebGL/audio/listeners on unmount.
- `_studio`: wrap existing experience so behaviour (shader + KTX2 switch + measurements) still works under the new contract.
- Fixtures (instructor-owned demo slugs, original/PD/CC art only): e.g. `_fixture-webgl` and `_fixture-dom` (or hybrid). Registered, lazy, deliberately different.
- Legacy: temporary `Cover.jsx` adapter **only if** evidence shows a mid-migration break; document removal in this phase’s report (must be gone by end of X15 at latest). Prefer migrate `_studio` + fixtures cleanly and drop Cover glob in X14.

**Out:**
- Neutral `_template` redesign and assignment lesson rewrite (X15)
- Live Pages closing audit (X16)
- Overwriting `react-template`; corpus-to-boilerplate; weakening D21
- Forcing students into sleeve/vinyl/stage

## Prompt (Implementation Agent)

```text
Implement PHASE-X14 per
frontend-pedagogy/DEV_PLAN/FEII-3D-ALBUM-KTX/PHASE-X14.md
and D26 in DECISIONS.md / AMENDMENT-D26-ROUTE-FREEDOM.md.

## Deliver
1. Replace the Cover.jsx + shared-Canvas contract with Route.jsx
   endpoints. The student route owns Canvas (if any), camera, lights,
   controls, state, layout and CSS for its experience.
2. Exhibition shell: gallery index, /covers/:slug routing, collapsed
   fixed project selector, prev/next/all links, Suspense lazy load,
   per-route error boundary. Shell must not steal layout height from
   the route (selector overlays / collapses).
3. Migrate covers/_studio to Route.jsx; keep shader + KTX2 compare
   behaviour. Prove with lint + build + manual smoke of /covers/_studio.
4. Add ≥2 fixtures (WebGL + DOM/hybrid), original art only, in registry.
5. Update registry.js globs, check-registry.mjs (require Route.jsx;
   allow expanded metadata fields if already needed for fixtures —
   full student metadata UX is X15), README + CONTRIBUTING route
   contract to match D26.
6. Prevent CSS/runtime contamination: document and enforce cleanup;
   prove switching fixtures does not leave the other’s styles or
   WebGL state in control.
7. Temporary Cover.jsx shim only if you measure a need; otherwise
   remove Cover.jsx from the contract in this phase.
8. Commit and push feii-album-covers as this phase authorises
   (architecture on main or PR — record which). Do NOT push
   web-atelier-udit.
9. Hand off VERIFYING — do NOT mark DONE.

## Constraints
- Preserve D21 contribution ritual.
- Do not remove published reference routes (_studio stays).
- Do not overwrite react-template.
- No cloud SDKs; no force-push; no skipped hooks.
```

## Acceptance

- [ ] `/covers/<slug>` loads `covers/<slug>/src/Route.jsx` (lazy); registry + file required
- [ ] Shell has no mandatory shared Canvas / camera / lights / OrbitControls / five-prop Cover / gallery budget side panel for student routes
- [ ] Collapsed fixed project selector: keyboard accessible; does not consume route layout space
- [ ] Prev / next / all-project navigation works; direct URL + reload work under `BASE_PATH` locally
- [ ] Per-route error boundary: a throwing fixture leaves shell navigation usable
- [ ] Unmount cleans listeners / rAF / audio / textures / WebGL (documented + smoke-tested)
- [ ] `_studio` behaviour preserved under `Route.jsx`
- [ ] ≥2 fixtures: one WebGL, one DOM or hybrid; both in registry; separately lazy-chunked
- [ ] `npm run lint && npm run build` green; check-registry requires `Route.jsx`
- [ ] CONTRIBUTING/README state D26 contract; `_studio` called a reference
- [ ] Legacy Cover path removed or removal ticketed with X15 deadline and evidence
- [ ] Cold review filed; blocking Fn closed

## Risks

See AMENDMENT §Improved risks. Still-success: fixtures prove two formats; `_studio` still demos the pedagogic sleeve/KTX2 chain without mandating it.
