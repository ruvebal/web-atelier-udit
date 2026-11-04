# KTX2/Basis deck outline — satellite, inside the Units 8–9 lab window

1. You already know this part: `<img>` downloads a packed file, decodes it into a grid, paints it — you never named the grid
2. A 3D sleeve needs the grid named, because its shader asks the picture for a colour at each screen dot
3. Three words for one picture: pixel (screen dot), UV (where on the picture, 0 to 1), texel (one stored colour in the GPU picture; a lookup usually blends neighbours), texture (the whole grid on the GPU)
4. The suitcase and the room: a 1024 × 1024 picture is about 200 KB on disk and 4,194,304 bytes unpacked
5. The panel counts, it does not weigh: `renderer.info.memory.textures` goes 1 → 2 for any picture of any size; GPU bytes are computed
6. Like with like: PNG gets mipmaps by default (× ~4/3); count all levels on both sides or level 0 on both; record `texture.format`
7. Two meanings of “compressed”: file packing (JPEG/PNG — the download) vs GPU-resident packing (the room)
8. Only now, three names: KTX2 is the box, ETC1S and UASTC are two packings, Basis Universal translates at load time for this GPU
9. Two traps: a packed sleeve is not flipped on upload (encode it flipped), and its colour space comes from the file (must read `srgb`; fix the encode, keep `colorspace_fragment`)
10. The placeholder table: the UASTC file was larger on disk than the PNG and far smaller on the GPU — and a flat graphic flatters every encoder
11. The written choice: mode, one honest reason, licence, file bytes, GPU bytes — then say the paragraph out loud

Speaker claims only. No study validates this sequence; graphics concepts outlasting APIs is the nearest precedent (Angel and Shreiner 2024, 1–2), and it does not speak to KTX2. Khronos and three.js are dated platform notes, not evidence. No quote-database epigraphs on this satellite.
