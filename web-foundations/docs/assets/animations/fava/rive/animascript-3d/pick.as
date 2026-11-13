// CPU picking for the canonical favicon scene (X3). Deterministic ray /
// triangle tests over the same packed blobs the GPU draws, evaluated at the
// current animated transforms. The ray is unprojected through the shared
// CameraFrame (same view/projection the renderer uses), animated per-facet
// exactly as choreo.as and the WGSL vertex shader compute them, and the
// winner is the nearest positive visible hit. Equal-depth hits resolve to the
// later source-order facet, matching the GPU lessEqual + index-order tie-break
// recorded in PHASE-X3.md.
//
// Vertex record is 40 bytes: f32 x3 position, f32 x3 normal, f32 x3 colour,
// f32 facetId at byte 36. facetId is the manifest source-order index, so
// identity never depends on array position guesses or colour.
import { Buffer } from "rive/buffer";
import * as choreo from "./choreo";
import { CameraFrame } from "./choreo";

const VERTEX_STRIDE: f64 = 40;

function vertF32(verts: ArrayBuffer, v: u32, component: u32): f64 {
    // component indexes the 10 f32 slots: 0-2 pos, 3-5 normal, 6-8 colour, 9 facet
    return Buffer.readf32(verts, <f64>v * VERTEX_STRIDE + <f64>component * 4);
}

function facetSelected(selWords: Array<u32>, facet: u32): bool {
    if (facet >= choreo.MAX_SELECT_FACETS) return false;
    let w = <i32>(facet >> 5);
    if (w >= selWords.length) return false;
    return (selWords[w] & <u32>(1 << <i32>(facet & 31))) != 0;
}

// Möller-Trumbore ray/triangle intersection. dir must be normalised; returns
// t or -1.
function rayTri(
    ox: f64, oy: f64, oz: f64,
    dx: f64, dy: f64, dz: f64,
    ax: f64, ay: f64, az: f64,
    bx: f64, by: f64, bz: f64,
    cx: f64, cy: f64, cz: f64
): f64 {
    let e1x = bx - ax, e1y = by - ay, e1z = bz - az;
    let e2x = cx - ax, e2y = cy - ay, e2z = cz - az;
    let px = dy * e2z - dz * e2y;
    let py = dz * e2x - dx * e2z;
    let pz = dx * e2y - dy * e2x;
    let det = e1x * px + e1y * py + e1z * pz;
    if (det > -1e-12 && det < 1e-12) return -1;
    let inv = 1 / det;
    let tx = ox - ax, ty = oy - ay, tz = oz - az;
    let u = (tx * px + ty * py + tz * pz) * inv;
    if (u < -1e-9 || u > 1 + 1e-9) return -1;
    let qx = ty * e1z - tz * e1y;
    let qy = tz * e1x - tx * e1z;
    let qz = tx * e1y - ty * e1x;
    let v = (dx * qx + dy * qy + dz * qz) * inv;
    if (v < -1e-9 || u + v > 1 + 1e-9) return -1;
    let t = (e2x * qx + e2y * qy + e2z * qz) * inv;
    return t > 1e-9 ? t : -1;
}

// Picks the visible facet under a layout-space point (same units as
// resize(width, height)). Returns the source-order facet index, or -1 when
// the ray hits nothing inside the depth range.
export function pickFacet(
    verts: ArrayBuffer,
    indices: ArrayBuffer,
    frame: CameraFrame,
    facetCount: u32,
    selWords: Array<u32>,
    px: f64,
    py: f64,
    cssW: f64,
    cssH: f64
): i32 {
    if (cssW <= 0 || cssH <= 0 || facetCount == 0) return -1;
    let indexCount = <u32>(Buffer.len(indices) / 2);

    // NDC -> view-space ray. Ortho: direction is constant, so any view z on
    // the ray gives the same world-space result after unprojection.
    let ndcX = (px / cssW) * 2 - 1;
    let ndcY = 1 - (py / cssH) * 2;
    let vx = ndcX * frame.halfHeight * frame.aspect;
    let vy = ndcY * frame.halfHeight;

    // Ray through view (vx, vy, -1) on the shared f64 camera basis — the same
    // arithmetic the JS verifier mirror runs, so picks agree bit-for-bit.
    let eyeA = frame.eye, rightA = frame.right, upA = frame.upv, fwdA = frame.fwd;
    let ox: f64 = eyeA[0] + vx * rightA[0] + vy * upA[0] + fwdA[0];
    let oy: f64 = eyeA[1] + vx * rightA[1] + vy * upA[1] + fwdA[1];
    let oz: f64 = eyeA[2] + vx * rightA[2] + vy * upA[2] + fwdA[2];
    let fl = Math.sqrt(fwdA[0] * fwdA[0] + fwdA[1] * fwdA[1] + fwdA[2] * fwdA[2]);
    let dx: f64 = fwdA[0] / fl;
    let dy: f64 = fwdA[1] / fl;
    let dz: f64 = fwdA[2] / fl;

    let sepBase = choreo.separation(frame.phase) * choreo.SEPARATION_DIST;

    // The GPU stores depth32float of the ortho depth scalar
    // depth = (-viewZ - near) / (far - near); equal depth means equal f32
    // of that scalar, not a tolerance band on view z.
    let bestDepth: f32 = 1e30;
    let bestFacet: i32 = -1;
    let bestTri: i32 = -1;

    for (let t = 0; t < indexCount / 3; t++) {
        let i0 = <u32>Buffer.readu16(indices, <f64>t * 6);
        let i1 = <u32>Buffer.readu16(indices, <f64>t * 6 + 2);
        let i2 = <u32>Buffer.readu16(indices, <f64>t * 6 + 4);
        let facet = <u32>vertF32(verts, i0, 9);
        if (facet >= facetCount) continue;

        // Match the fragment discard: at extrusion ~0 only front caps (nz>0.5)
        // are visible; backs and walls collapse onto the front plane.
        let nz = vertF32(verts, i0, 5); // normal z: components 3-5 are the normal
        let facetE = choreo.facetExtrusion(frame.phase, facet, facetCount);
        if (facetE < choreo.DISCARD_E && nz < 0.5) continue;

        let dir = choreo.hashDir(facet);
        let sepX = dir[0] * sepBase;
        let sepY = dir[1] * sepBase;
        let sepZ = dir[2] * sepBase;
        // Selection pops the facet toward the camera, not fixed +z, so it
        // reads correctly at every orbit angle.
        let selK = facetSelected(selWords, facet) ? choreo.SELECT_OFFSET_Z : 0;
        let selX = frame.towardX * selK;
        let selY = frame.towardY * selK;
        let selZ = frame.towardZ * selK;
        let e = facetE;

        // Animated positions for the three corners.
        let ax = vertF32(verts, i0, 0) + sepX + selX;
        let ay = vertF32(verts, i0, 1) + sepY + selY;
        let az = vertF32(verts, i0, 2) * e + sepZ + selZ;
        let bx = vertF32(verts, i1, 0) + sepX + selX;
        let by = vertF32(verts, i1, 1) + sepY + selY;
        let bz = vertF32(verts, i1, 2) * e + sepZ + selZ;
        let cx = vertF32(verts, i2, 0) + sepX + selX;
        let cy = vertF32(verts, i2, 1) + sepY + selY;
        let cz = vertF32(verts, i2, 2) * e + sepZ + selZ;

        let hit = rayTri(ox, oy, oz, dx, dy, dz, ax, ay, az, bx, by, bz, cx, cy, cz);
        if (hit < 0) continue;

        // Depth in view space: ortho so view z orders visibility directly.
        let hx = ox + dx * hit, hy = oy + dy * hit, hz = oz + dz * hit;
        let ddx = hx - eyeA[0], ddy = hy - eyeA[1], ddz = hz - eyeA[2];
        let pz = -(fwdA[0] * ddx + fwdA[1] * ddy + fwdA[2] * ddz);
        if (pz > -frame.nearZ + 0.001 || pz < -frame.farZ - 0.001) continue;

        // Nearest positive hit wins; a hit ties only when its depth scalar
        // rounds to the same f32 the depth32float attachment stores, then the
        // later source-order facet (then later index-order tri) wins,
        // matching GPU lessEqual semantics.
        let d = <f32>((-pz - frame.nearZ) / (frame.farZ - frame.nearZ));
        let tie = d == bestDepth;
        let orderBetter = facet > <u32>bestFacet || (facet == <u32>bestFacet && <i32>t > bestTri);
        if (bestFacet < 0 || d < bestDepth || (tie && orderBetter)) {
            bestDepth = d;
            bestFacet = <i32>facet;
            bestTri = <i32>t;
        }
    }
    return bestFacet;
}
