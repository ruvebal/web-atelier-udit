# 3D terminology exercises — individual, decontextualised

These drills stay away from your album cover on purpose. Saying the oral paragraph about your sleeve is studio / assignment rehearsal, not an individual exercise. Submit these separately from the team lab.

1. **Match the term.** Pair each sentence with exactly one term from: pixel, texel, UV, texture, `sampler2D`. (a) “Two numbers from 0 to 1 that say where on the picture.” (b) “A coloured dot on the screen.” (c) “One stored colour in the grid the GPU holds.” (d) “The whole grid on the GPU, not the file on disk.” (e) “The uniform that names the picture the fragment shader looks into.” Solvable without AI — declare it as such.
2. **Spot the wrong “compressed”.** Three classmates speak. Which one mixed the two jobs, and what should they have said instead? (A) “JPEG is file packing for the download.” (B) “ETC1S is GPU-resident packing for the room.” (C) “My KTX2 is more compressed, so the GPU uses less memory — look, textures stayed at 2.” Solvable without AI — declare it as such.
3. **Count or weight?** A note reads: “GPU bytes: textures 2 after load.” Name the two mistakes in one sentence each, and say which number belongs in the GPU-bytes column.
4. **Order before brands.** Rewrite this sentence so pixel, UV, texel, and texture appear before any format name, without deleting the format names: “I used UASTC in a KTX2 box because the title type is sharp; my texel grid sits at UV on the texture, and each screen pixel samples it.”
5. **Assign, never convert.** A packed sleeve looks washed out. `texture.colorSpace` logs `'srgb-linear'`. In two sentences: which encode flag relabels screen colours correctly, and why `--convert_oetf srgb` is the wrong fix on a sleeve photo.

What a correct answer must show: picture words before format words; file packing vs GPU-resident packing kept apart; `memory.textures` treated as a count; no invented numbers.
