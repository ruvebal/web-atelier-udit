# Cover shaders deck outline — satellite, inside the Units 8–9 lab window

1. This is not Unit 9 — Unit 9 is the introduction; the bulb reads no picture
2. The sleeve shader never paints the sleeve: it looks up a colour in the sleeve picture at a place
3. Two plain words first: the picture (`sampler2D uMap`) and the place (UV, `vUv`, 0 to 1)
4. The placeholder picture prints its own UV in each corner — check which way it landed
5. The GPU holds the picture as a grid of texels, one stored colour each; a lookup usually blends the nearest few, so what comes back is often a mix (memory story: KTX2/Basis satellite)
6. Two kinds of effect: move the place, or change the answer
7. The reference sheen: one diagonal band, 7.5 s per crossing, driven by `uTime` from React; reduced motion parks it off the picture
8. Two colour lines: tag the picture as screen colours, pack the result back for the screen — leave one out and the sleeve is too dark or washed out
9. Cost: one lookup per pixel, no loop, no discard; the panel's textures count goes up by one — the picture
10. Explain this shader — the seven-line checklist
11. On the assignment: task2 on your route; KTX2 is task3

Speaker claims only. The research precedent is durable shader concepts across changing APIs (Angel and Shreiner 2024, 1–2); no claim that this sequence is validated.
