# KTX2/Basis exercises — individual, decontextualised

These drills stay away from your album cover on purpose. The packed sleeve on your route is team lab work (assignment task3), not an individual exercise. Submit these separately from the team lab.

1. **Four words, no brands.** Define pixel, UV, texel, and texture in one line each. Do not use any file or format name. Then say in one sentence why the colour a shader gets back is often not one texel. Solvable without AI — declare it as such.
2. **Suitcase and room, by hand.** A 1024 × 512 PNG is 180,000 bytes on disk. Compute its GPU bytes at level 0 when three.js unpacks it to four bytes per texel. Then compute the full mipmap chain (1024 × 512, 512 × 256, … down to 1 × 1) and compare the total with your level-0 number × 4/3. Say which of your numbers is the file bytes and which is the GPU bytes. Solvable without AI — declare it as such.
3. **Count or weight?** A classmate's renderer note reads: “textures: 2 — the KTX2 saved memory compared with the PNG, which was also 2.” Explain in two sentences what `renderer.info.memory.textures` measures, why both versions read 2, and which number they should have written instead.
4. **Diagnose the washed-out sleeve.** A packed sleeve loads without an error, but every colour looks pale, as if behind milky glass. The console shows `texture.colorSpace` as `'srgb-linear'`. Explain where that value came from (file, loader, or shader). Name the one encode flag that fixes it, and the one tempting flag that would make the pixels themselves brighter for good. Then say why deleting `#include <colorspace_fragment>` is not a fix.
5. **Box, packing, translator.** Sort these into container, packing mode, or run-time translator: KTX2, ETC1S, UASTC, the transcoder `.wasm`. Then write the sentence “I used KTX2” again so that it is a complete choice for a sleeve covered in sharp white title type.

What a correct answer must show: the picture words before any format word; every number labelled as file bytes or GPU bytes; no single word “compressed” doing two jobs; no copied answer.
