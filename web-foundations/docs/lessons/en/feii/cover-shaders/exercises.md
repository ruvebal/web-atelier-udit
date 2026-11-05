# Cover shaders exercises — individual, decontextualised

These drills stay away from your album cover on purpose. The sleeve shader on your route is team lab work (assignment task2), not an individual exercise. Submit these separately from the team lab.

1. **A picture and a place, from memory.** Without looking at the lesson, write the four GLSL lines a sampling shader needs: the picture uniform, the place varying, the vertex line that fills the varying, and the fragment line that looks the colour up. Solvable without AI — declare it as such.
2. **Two moves.** For each effect, say whether it moves the place or changes the answer, and name the variable it changes: a sheen band, a ripple, a duotone, a slow zoom, a fade to black. Solvable without AI — declare it as such.
3. **Diagnose the dark sleeve.** A classmate's sleeve shows the right picture, but every colour is too dark. Their texture has `colorSpace = SRGBColorSpace`, and their fragment shader ends with `gl_FragColor = vec4(color, 1.0);`. Explain in two sentences what is missing and why the picture comes out darker, then write the one-line repair. Then say what the sleeve would look like if they had the opposite mistake.
4. **Past the edge.** On paper, a square picture with a red left half and a blue right half. Sketch what a square face shows when the shader looks the picture up at `vUv * 2.0`, with the texture's default edge setting (clamp to edge). Then sketch it again with the texture set to repeat.
5. **Not the bulb.** In three sentences, explain to someone who has only seen Unit 9 why multiplying a view-direction rim by the texture lookup still makes the sleeve's look depend on the camera rather than on the picture.

What a correct answer must show: the picture and the place named in plain words before any GLSL word; every claim tied to one line of code; no copied shader.
