# Verify log — PHASE-X3.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-3
**Commit:** 604a55a810719b66f7a2685a6151c38649d82ec8
**Started:** 2026-11-13T19:06:44Z

```
[20:06:44.553] rive  built (584360 bytes, 87ms, 0 errors, 0 warnings)
[20:06:44.556] rive  loop phase
[20:06:44.556] rive    PASS phase wraps at the loop period
[20:06:44.556] rive    PASS extrusion is 0 at rest and 1 through inspect
[20:06:44.556] rive    PASS extrude staggers facet 0 ahead of the last facet
[20:06:44.556] rive    PASS retract runs in reverse facet order
[20:06:44.556] rive    PASS separation peaks mid-inspect and is 0 at rest
[20:06:44.556] rive  quaternion camera
[20:06:44.556] rive    PASS identity orientation looks down -z
[20:06:44.556] rive    PASS 90 degree yaw rotates forward to -x
[20:06:44.556] rive    PASS slerp midpoint of identity and 90deg is 45deg
[20:06:44.556] rive    PASS near-identical quaternions slerp stably
[20:06:44.556] rive  frame-rate independent damping
[20:06:44.556] rive    PASS equal elapsed time converges identically at 30/60/144Hz
[20:06:44.556] rive    PASS advance clamps the damping step to 0.5s on long frames
[20:06:44.556] rive  hashDir
[20:06:44.556] rive    PASS deterministic and unit length
[20:06:44.556] rive    PASS distinct facets get distinct directions
[20:06:44.556] rive  picker on synthetic meshes
[20:06:44.556] rive    PASS single front facet picks at centre, misses at corner
[20:06:44.556] rive    PASS 1e-6 view-z separation keeps the nearer facet
[20:06:44.556] rive    PASS equal depth resolves to later source-order facet
[20:06:44.556] rive    PASS nearest positive hit wins over source order
[20:06:44.556] rive    PASS selected offset toward camera can win a depth contest
[20:06:44.556] rive    PASS collapsed backs are invisible at rest, visible when extruded
[20:06:44.556] rive    PASS narrow and wide aspects still map the centre ray
[20:06:44.556] rive  picker on the real blobs
[20:06:44.556] rive    PASS rest centre pick lands on a generated facet
[20:06:44.556] rive    PASS empty corner pick returns -1
[20:06:44.556] rive  22/22 passed
PASS A1: small=facet-03(18v) large=facet-01(810v) overlap=facet-05 cover=[facet-01,facet-05] picks=[2,0,4]
PASS A2: fixtures occl=facet-01 zoff=facet-10 touch=facet-01 sep=[facet-01,facet-03] cull=facet-05(back=facet-01); all matched
PASS A3: nearest-positive picks matched JS mirror across extruded/separated/rest poses
PASS A4: toggle facet-01 sel 1->0 count->0; provider hashes unchanged; GPU sel-vs-unsel diff=70255
PASS A5: reset logged=true rest-pose pixel diff vs fresh rest=0
PASS A6: viewports 400x480,1200x480: [{"vp":"400x480","center":"facet-01->0","off":"facet-01->0"},{"vp":"1200x480","center":"facet-01->0","off":"facet-01->0"}]
PASS A7: irregular advance -> picks 0,0 vs expected 0,0 count=0
PASS A8: deadzone micro-diff=0 (want 0), drag-diff=58108 (want >0)
PASS A9: 3s elapsed at 3 granularities, pixel diffs vs first: [0,0]
PASS A10: 960ms damping diffs=[0,0]; 5s advance pick=0 vs expected 0 (stable)
PASS A11: identity->[0,0,-1] 90->[-1,0,0] mid45->[-0.707,0,-0.707]
PASS X3: 11 acceptance items match /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-3/frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X3.md
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
