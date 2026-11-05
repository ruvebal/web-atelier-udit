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
5. Carried from X6 round-2 review (P2): (G1) Unit 8 lab step 3 — add one
   clause that the mandatory fork is a lab sandbox, not the hand-in
   (assignment “does not ask for a second sandbox” means the hand-in);
   (G2) Unit 8 `src/parts.js` Template label — add “in the cover fork”.
6. Carried from X7 round-2 review: (G1) re-check that cover-shaders lab
   step 2's promise holds on the real aggregator — the /covers/:slug route
   passes hovered/selected/reduced/onHover/onSelect and _template's
   picture path is route-relative; fix the lesson or the repo, whichever
   is wrong. (G4, P2) cover-shaders L449: deleting only `varying vec2 vUv;`
   while `vUv = uv;` remains is a vertex COMPILE error (undeclared
   identifier); the Unit 9 link error needs both lines gone — reword.
7. Carried from X8 cold review F2: re-check ktx2-basis L314 / L343 / L513 (lab step 3)
   against the built aggregator — one shared transcoder at root
   public/basis/ (path from import.meta.env.BASE_URL), routes reference
   their .ktx2 the way _template references its picture.
8. Carried from X8 round-2 (P2): (G4) ktx2-basis L377 uses "colour
   profile" one paragraph before its definition at L379 — reorder or
   gloss; (G5) L373 "three.js copies the file's tag" → "for a packed
   (KTX2) file", since the PNG example was tagged by hand.
9. Carried from X9 cold review: (F1) cover-shaders Lab mapping step 2 —
   one sentence: on the aggregator rename the `extend` key to something
   slug-unique (or use `const Sleeve = extend(SleeveShader)`), because
   extend names are shared by every route; CI's check-registry refuses
   duplicates. (F3) Unit 8 Deliverable (~L959) and cover-shaders step 3 —
   CEILING lives in optional covers/<slug>/src/budget.js on the
   aggregator. (F2) assignment ~L111 — match D23 (CONFIRMED: convention-only on
   the personal account; instructor merges only through PRs). (F5) state the
   post-pass rule on the aggregator if X10 did not add the dependency.
   Also re-check the two satellite links once published (X9 S3).
10. D24: link the react-template reference routes from Unit 8 (cover
   fork lab), cover-shaders and ktx2-basis as the running reference
   (/ex3-cover, /ex4-cover-shader, /ex5-ktx2). If branch
   satellites-ex3-ex5 is not yet pushed or merged by the professor, name the
   routes and the repo without a branch URL, and say "reference routes in
   react-template (being published)". Never invent a URL.
11. D24 + professor request (2026-11-05): every CodeSandbox-ready and
   Template block in the Unit 8 cover-fork lab, cover-shaders and
   ktx2-basis gets one line directly under it:
   "Running reference: [live route](https://ruvebal.github.io/react-template/<route>) · [source](https://github.com/ruvebal/react-template/blob/main/src/cover/<file>)".
   Use the exact files and routes on branch satellites-ex3-ex5. The X11
   gate checks the lines exist and curls each URL. If any URL is not 200
   (the professor has not yet pushed react-template or switched Pages to
   GitHub Actions), the gate WARNS and the report lists the URLs as
   "publish react-template first". The links are correct once published;
   do not invent other URLs.
12. Assignment page (professor question 2026-11-05): add a short
   "Running references" list near the satellites line (L36):
   react-template /ex3-cover, /ex4-cover-shader, /ex5-ktx2 (live links,
   same publish rule as step 11), and the instructor reference cover
   /covers/_studio in the aggregator. Say it is visible to collaborators
   through `npm run dev` (the repo is private and not deployed), and that
   teams copy covers/_template, never _studio. Also check that L34's private
   repo link reads correctly for students who are not yet collaborators
   (one clause: "you will be added as a collaborator").
13. Hand off for cold review — do NOT mark DONE.

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
