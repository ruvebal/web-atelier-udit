# Amendment D26 — student-owned route endpoints (2026-11-05)

**Authorised by:** product owner (this session).  
**Keep:** same cascade `FEII-3D-ALBUM-KTX`. Do **not** open a second cascade.  
**Landed on:** integration branch `cascade/FEII-3D-ALBUM-KTX` (never `web-atelier-udit` `main`).

## Audit — live evidence (do not trust prior claims)

Checked 2026-11-05 against the live aggregator and the integration pack.

| Claim / prior state | Live finding | Implication |
| --- | --- | --- |
| Aggregator is private (D6) | `gh api` → `visibility: public`, Pages workflow live | Exhibition is public; IP (D8) and scrape bans are harder, not softer |
| Pages at project path | `https://ruvebal.github.io/feii-album-covers/` → HTTP 200 SPA shell | Base path `/feii-album-covers/` is load-bearing |
| Deep link `/covers/_studio` | Server returns HTTP 404; `pages.yml` copies `index.html` → `404.html` | Browser SPA fallback exists; X16 must verify in a real browser, not `curl -I` alone |
| Route contract | `CoverRoute.jsx` owns `<Canvas>`, camera, lights, OrbitControls, hover/select state, side panel, BudgetProbe; `Cover.jsx` is an R3F tree with five fixed props | Contradicts product-owner freedom; students cannot own DOM/hybrid/multi-scene formats |
| Glob / CI | `import.meta.glob('…/Cover.jsx')`; `check-registry.mjs` requires `Cover.jsx` and forbids unknown registry fields | Blocks a `Route.jsx` endpoint contract until X14 |
| `_template` | Sleeve / vinyl / stage aesthetic + five-prop Cover | Prescriptive starter; X15 must neutralise |
| Assignment lesson | Requires “composed R3F scene”, sleeve shader, KTX2 for every team; calls aggregator “private”; `_studio` “not a deployed public page” | Stale vs public Pages + D26; X15 must rewrite without adding hours |
| Closing audit | PASS vs D1–D22 under the scene-only contract | Still valid for contribution/IP/hours; **incomplete** for route freedom — X16 re-audits D21–D26 |
| X13 | READY; terminology satellite not yet built | Execute X13 first, then X14–X16 |

## Decision conflict analysis (preserve intent, replace scene lock)

| Decision | Intent to keep | What changes |
| --- | --- | --- |
| **D4** | Hand-in = TTOD-shaped PRs that light `/covers/<slug>` | Clarify: lighting the route means a complete student-authored **endpoint**, not a scene fragment inside a shared Canvas |
| **D6** | One aggregator, one gallery, per-student `/covers/<slug>`; do not overwrite `react-template` | Keep. Record that the repo is now **public** with GitHub Pages (live check); privacy is no longer the IP control — D8 + licence text are |
| **D15** | `App.jsx` pre-wires routing; students never replace the router; students add under `covers/<slug>/` | Keep shell ownership. Replace “page module = `Cover.jsx` R3F tree” with “page module = `Route.jsx` complete endpoint” |
| **D21** | Branch / staged PR / AI Review Log / CI / human approve / cross-cover ritual | **Unchanged.** Format freedom must not weaken contribution discipline |
| Closing audit | Student/instructor split, no corpus-to-boilerplate, hours closed | Re-run in X16 against D21–D26; do not delete prior PASS rows — extend them |

## Frozen addition

**D26** (see [DECISIONS.md](DECISIONS.md)): each `/covers/<slug>` is a complete student-authored endpoint. The student controls format, DOM, Canvas, camera, interaction and visual language. The aggregator owns discovery, routing, project switching, isolation and production checks. `_studio` is a reference, not a prescribed composition.

## Programme extension (same cascade)

| Step | File | Role |
| --- | --- | --- |
| 13 | [PHASE-X13.md](PHASE-X13.md) | Terminology satellite (unchanged; still first) |
| 14 | [PHASE-X14.md](PHASE-X14.md) | Complete `Route.jsx` architecture + fixtures |
| 15 | [PHASE-X15.md](PHASE-X15.md) | Neutral templates, registry, gallery, student docs/lesson |
| 16 | [PHASE-X16.md](PHASE-X16.md) | Live Pages exhibition audit + closing audit D21–D26 |

## Improved risks (baked into X14–X16 gates)

1. **Global CSS / runtime contamination** — route CSS and catalogues must not leak across slugs.
2. **WebGL / audio / listener cleanup** — unmount must dispose loops, textures, contexts.
3. **Shared R3F `extend` catalogue** — keep unique-key CI; fixtures must prove isolation.
4. **Eager `parts.js` / `budget.js` assumption** — optional; not every format has PARTS.
5. **Layout theft by shell** — project selector is collapsed/fixed; must not consume route layout.
6. **Error isolation** — one failing student route must leave gallery nav alive.
7. **GitHub Pages SPA** — deep links under `BASE_PATH`; verify browser, not headers alone.
8. **Assignment contradiction** — Unit 8 lab may still teach a sleeve fork; the **hand-in** must not mandate that composition.
9. **Legacy `Cover.jsx`** — temporary shim only if evidence requires; removal gate in X14/X15.
10. **Public IP** — scraped commercial covers on a public Pages site are a hard fail (D8).

## Git discipline for this amendment

- Planning edits land on `cascade/FEII-3D-ALBUM-KTX` via a named amend merge (local), never on `web-atelier-udit` `main`.
- Aggregator code changes happen only inside X14–X16, committed/pushed to `feii-album-covers` when that phase authorises it (prefer PR → squash for non-instructor fixtures; instructor may land architecture on `main` when collaborators are not yet mid-task).
- Phase loop unchanged: `autopilot.sh start` → executor → `verify` → cold reviewer → DONE → `land`.
