# Verify log — PHASE-X2.md

**Run by:** cascade-harness.sh (runner process, not the implementing session)
**Worktree:** /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-2
**Commit:** 9f733466bd3622e286d2a4db48300cf97a0cb74c
**Started:** 2026-11-13T10:44:53Z

```
[11:44:53.178] rive  verified (0 bytes, 82ms, 0 errors, 0 warnings)
PASS A1: pipeline vertex layout 36B/3attrs, depth32float write=on, blobs 96336B+10392B, counts 2676/5196 from provider
PASS A2: all 13 facet fills verified at interior samples (worst 99.7%), 13189 samples, bg 6134/6134, nanEdge=0
PASS A3: rest capture vs SVG raster: IoU 0.9930, chamfer 0.004px (normalised 220 grid)
PASS A4: oblique t=3.5s: reference back=62914 side=36237 px; capture matches back 15/15, side 32/32
PASS A5: depth = 0.04+(0.22-0.04)*sqrt(area/max): manifest dev 2.5e-10, packed Z dev 3.6e-9/3.6e-9, largest facet facet-01 deepest in buffer
PASS A6: narrow 400x800 and wide 1200x400 captures contain the object, aspect within 8% of reference, IoU>=0.85
PASS A7: world→view→clip→depth distinct per fixture; front depth 0.1562 < back 0.8438; front-centre: appZ=0.0000 viewZ=-2.8900 depth=0.1562 ndc=(0.000,0.000) px=(360,240) | back-centre: appZ=-0.2200 viewZ=-3.1100 depth=0.8438 ndc=(0.000,0.000) px=(360,240) | front-top-right: appZ=0.0000 viewZ=-2.8900 depth=0.1562 ndc=(0.638,0.943) px=(590,14) | back-bottom-left: appZ=-0.2200 viewZ=-3.1100 depth=0.8438 ndc=(-0.638,-0.943) px=(130,466)
PASS A8: normals unit (max err 6.7e-11), classes f/b/s=446,446,1784, side normals = contour edge normals 2676/2676, axis err 0.0e+0
PASS X2: 8 acceptance items match /Users/ruvebal/projects/ruvebal/scholar/udit/web-atelier-udit-CANONICAL-FAVICON-RIVE-3D-2/frontend-pedagogy/DEV_PLAN/CANONICAL-FAVICON-RIVE-3D/PHASE-X2.md
```

**Exit code:** 0
**Verdict:** exit-gate PASSED. Eligible for VERIFYING -> COLD_REVIEW.
**Reminder:** the runner does not flip status to DONE. A separate verifier session must review before promotion.
