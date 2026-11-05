# 3D terminology deck outline — satellite, inside the Units 8–9 lab window

1. Not a numbered unit under Bloque 5; say the oral paragraph first — pixel, texel, UV before any box or packing name
2. Screen and picture: pixel (screen), texel (one stored colour; lookups blend), UV (where), texture (GPU grid), `sampler2D` (the uniform)
3. Scene + shader: mesh, vertex, triangle, material, draw call; vertex / fragment, uniform, varying, `shaderMaterial`
4. Memory: file bytes vs GPU bytes; upload inflation; mipmaps; `memory.textures` is a count
5. Colour + packing: screen colours / sRGB / assign-never-convert; KTX2 is the box; ETC1S / UASTC are the choice; Basis transcodes
6. Two traps: “compressed” (file packing vs GPU-resident packing) and “texture” (file vs GPU grid)
7. Studio test: fill mode, reason, file bytes, GPU bytes from your machine

Speaker claims only. No new technical claim beyond Units 8–9, cover-shaders, and ktx2-basis. No quote-database epigraphs on this satellite.
