// X3 interaction tests: choreography contract, quaternion camera
// interpolation, frame-rate-independent damping, and the CPU picker on
// synthetic meshes plus the real generated blobs. The end-to-end expected-ID
// fixtures live in verify-picking.mjs, which reimplements the same math
// independently in JS.
import { Tests } from "rive/test";
import { Buffer } from "rive/buffer";
import * as choreo from "../choreo";
import { CameraFrame } from "../choreo";
import { pickFacet } from "../pick";
import { Main } from "../main";
import {
    BOUNDS_MAX_X,
    BOUNDS_MAX_Y,
    BOUNDS_MAX_Z,
    BOUNDS_MIN_X,
    BOUNDS_MIN_Y,
    BOUNDS_MIN_Z,
    FACET_COUNT,
} from "../favicon_mesh";

const STRIDE: f64 = 40;
const ZERO_SEL: Array<u32> = [0, 0, 0, 0, 0, 0, 0, 0];

class Mesh {
    v: ArrayBuffer = new ArrayBuffer(0);
    i: ArrayBuffer = new ArrayBuffer(0);
}

function makeMesh(verts: Array<f64>, indices: Array<u32>): Mesh {
    // verts: 10 f64 per vertex - x,y,z, nx,ny,nz, r,g,b, facet
    let vb = Buffer.create(<f64>verts.length / 10 * STRIDE);
    for (let v = 0; v < verts.length / 10; v++) {
        for (let c = 0; c < 10; c++) {
            Buffer.writef32(vb, v * STRIDE + c * 4, verts[v * 10 + c]);
        }
    }
    let ib = Buffer.create(<f64>indices.length * 2);
    for (let i = 0; i < indices.length; i++) Buffer.writeu16(ib, i * 2, <f64>indices[i]);
    let m = new Mesh();
    m.v = vb;
    m.i = ib;
    return m;
}

function restFrame(phase: f64, aspect: f64, minX: f64, maxX: f64, minY: f64, maxY: f64, minZ: f64, maxZ: f64): CameraFrame {
    return choreo.computeCamera(phase, phase * choreo.LOOP_PERIOD, 0, 0, aspect, minX, maxX, minY, maxY, minZ, maxZ);
}

function pick(
    mesh: Mesh,
    frame: CameraFrame,
    facetCount: u32,
    sel: Array<u32>,
    px: f64,
    py: f64,
    w: f64,
    h: f64
): f64 {
    return <f64>pickFacet(mesh.v, mesh.i, frame, facetCount, sel, px, py, w, h);
}

// One big triangle covering the centre; nz=-1 makes it a back cap.
function centreTri(facet: f64, z: f64, nz: f64): Array<f64> {
    return [
        -1, -1, z, 0, 0, nz, 1, 1, 1, facet,
        1, -1, z, 0, 0, nz, 1, 1, 1, facet,
        0, 1, z, 0, 0, nz, 1, 1, 1, facet,
    ];
}

export class ChoreoTests extends Tests {
    override run(): void {
        group("loop phase", () => {
            test("phase wraps at the loop period", (expect) => {
                expect.that(choreo.loopPhase(0)).is(0);
                expect.that(choreo.loopPhase(4.5)).is(0.5);
                expect.that(Math.abs(choreo.loopPhase(9.0)) < 1e-12).is(true);
                expect.that(Math.abs(choreo.loopPhase(13.5) - 0.5) < 1e-12).is(true);
            });
            test("extrusion is 0 at rest and 1 through inspect", (expect) => {
                for (let f = 0; f < 13; f++) {
                    expect.that(choreo.facetExtrusion(0, f, 13)).is(0);
                    expect.that(choreo.facetExtrusion(0.5, f, 13)).is(1);
                    expect.that(choreo.facetExtrusion(0.98, f, 13)).is(0);
                }
            });
            test("extrude staggers facet 0 ahead of the last facet", (expect) => {
                let e0 = choreo.facetExtrusion(0.3, 0, 13);
                let eLast = choreo.facetExtrusion(0.3, 12, 13);
                expect.that(e0 > eLast).is(true);
                expect.that(e0 > 0 && e0 < 1).is(true);
                expect.that(eLast > 0 && eLast < 1).is(true);
            });
            test("retract runs in reverse facet order", (expect) => {
                let e0 = choreo.facetExtrusion(0.8, 0, 13);
                let eLast = choreo.facetExtrusion(0.8, 12, 13);
                expect.that(eLast < e0).is(true);
                expect.that(e0 > 0 && e0 < 1).is(true);
                expect.that(eLast > 0 && eLast < 1).is(true);
            });
            test("separation peaks mid-inspect and is 0 at rest", (expect) => {
                expect.that(choreo.separation(0.2)).is(0);
                expect.that(Math.abs(choreo.separation(0.7) - 1) < 1e-9).is(true);
                expect.that(choreo.separation(0.95)).is(0);
            });
        });

        group("quaternion camera", () => {
            test("identity orientation looks down -z", (expect) => {
                let q = choreo.quatFromYawPitch(0, 0);
                let f = choreo.quatRotate(q, 0, 0, -1);
                expect.that(Math.abs(f[0]) < 1e-9).is(true);
                expect.that(Math.abs(f[1]) < 1e-9).is(true);
                expect.that(Math.abs(f[2] + 1) < 1e-9).is(true);
            });
            test("90 degree yaw rotates forward to -x", (expect) => {
                let q = choreo.quatFromYawPitch(Math.PI / 2, 0);
                let f = choreo.quatRotate(q, 0, 0, -1);
                expect.that(Math.abs(f[0] + 1) < 1e-9).is(true);
                expect.that(Math.abs(f[1]) < 1e-9).is(true);
                expect.that(Math.abs(f[2]) < 1e-9).is(true);
            });
            test("slerp midpoint of identity and 90deg is 45deg", (expect) => {
                let a = choreo.quatIdentity();
                let b = choreo.quatFromYawPitch(Math.PI / 2, 0);
                let m = choreo.quatSlerp(a, b, 0.5);
                let f = choreo.quatRotate(m, 0, 0, -1);
                let s = 1 / Math.sqrt(2);
                expect.that(Math.abs(f[0] + s) < 1e-6).is(true);
                expect.that(Math.abs(f[2] + s) < 1e-6).is(true);
            });
            test("near-identical quaternions slerp stably", (expect) => {
                let a = choreo.quatFromYawPitch(0.3, 0.1);
                let b = [a[0] + 1e-7, a[1] - 1e-7, a[2] + 1e-7, a[3]];
                let m = choreo.quatSlerp(a, choreo.quatNormalize(b), 0.5);
                let f = choreo.quatRotate(m, 0, 0, -1);
                expect.that(Number.isFinite(f[0]) && Number.isFinite(f[1]) && Number.isFinite(f[2])).is(true);
                let fa = choreo.quatRotate(a, 0, 0, -1);
                expect.that(Math.abs(f[0] - fa[0]) < 1e-3).is(true);
                expect.that(Math.abs(f[1] - fa[1]) < 1e-3).is(true);
                expect.that(Math.abs(f[2] - fa[2]) < 1e-3).is(true);
            });
        });

        group("frame-rate independent damping", () => {
            test("equal elapsed time converges identically at 30/60/144Hz", (expect) => {
                let slow: f64 = 0;
                let fast: f64 = 0;
                for (let i = 0; i < 30; i++) slow = choreo.dampStep(slow, 1, 1 / 30, choreo.ORBIT_LAMBDA);
                for (let i = 0; i < 144; i++) fast = choreo.dampStep(fast, 1, 1 / 144, choreo.ORBIT_LAMBDA);
                expect.that(Math.abs(slow - fast) < 1e-9).is(true);
                expect.that(Math.abs(slow - 1) < 0.01).is(true);
            });
            test("advance clamps the damping step to 0.5s on long frames", (expect) => {
                // advance(5) must integrate damping with dt=0.5, not dt=5:
                // dampStep(0,1,0.5) != dampStep(0,1,5) and both are finite.
                let m = new Main();
                m.userYawTarget = 1;
                m.advance(5);
                let want = choreo.dampStep(0, 1, 0.5, choreo.ORBIT_LAMBDA);
                expect.that(Math.abs(m.userYaw - want) < 1e-9).is(true);
                expect.that(m.userYaw < choreo.dampStep(0, 1, 5, choreo.ORBIT_LAMBDA)).is(true);
                expect.that(m.elapsed == 5).is(true);
            });
        });

        group("hashDir", () => {
            test("deterministic and unit length", (expect) => {
                let a = choreo.hashDir(7);
                let b = choreo.hashDir(7);
                let l = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                expect.that(a[0] == b[0] && a[1] == b[1] && a[2] == b[2]).is(true);
                expect.that(Math.abs(l - 1) < 1e-9).is(true);
            });
            test("distinct facets get distinct directions", (expect) => {
                let unique = 0;
                for (let f = 0; f < 13; f++) {
                    let d = choreo.hashDir(f);
                    let dup = false;
                    for (let g = 0; g < f; g++) {
                        let o = choreo.hashDir(g);
                        if (o[0] == d[0] && o[1] == d[1] && o[2] == d[2]) dup = true;
                    }
                    if (!dup) unique += 1;
                }
                expect.that(unique).is(13);
            });
        });

        group("picker on synthetic meshes", () => {
            // 100x100 viewport, mesh bounds [-1,1]^2 at z=0.
            const SX = 100;
            const SY = 100;

            test("single front facet picks at centre, misses at corner", (expect) => {
                let mesh = makeMesh(centreTri(0, 0, 1), [0, 1, 2]);
                let frame = restFrame(0, 1, -1, 1, -1, 1, -0.1, 0.1);
                expect.that(pick(mesh, frame, 1, ZERO_SEL, 50, 50, SX, SY)).is(0);
                expect.that(pick(mesh, frame, 1, ZERO_SEL, 2, 2, SX, SY)).is(-1);
            });

            test("1e-6 view-z separation keeps the nearer facet", (expect) => {
                // Two identical facets separated by 1e-6 in view z: inside
                // any tolerance band, but their depth32float values differ,
                // so the nearer facet must win over later source order.
                let frame = restFrame(0.45, 1, -1, 1, -1, 1, -0.3, 0.1);
                let vzPerZ =
                    <f64>frame.view.transformPoint(<f32>0, <f32>0, <f32>1).z -
                    <f64>frame.view.transformPoint(<f32>0, <f32>0, <f32>0).z;
                let off = 0.000001 / Math.abs(vzPerZ);
                for (let flip of [false, true]) {
                    let za = flip ? 0.0 + off : 0.0 - off;
                    let zb = flip ? 0.0 - off : 0.0 + off;
                    let verts = centreTri(0, za, 1).concat(centreTri(1, zb, 1));
                    let mesh = makeMesh(verts, [0, 1, 2, 3, 4, 5]);
                    let vza = <f64>frame.view.transformPoint(<f32>0, <f32>0, <f32>za).z;
                    let vzb = <f64>frame.view.transformPoint(<f32>0, <f32>0, <f32>zb).z;
                    expect.that(Math.abs(vza - vzb) > 5e-7).is(true);
                    expect.that(pick(mesh, frame, 2, ZERO_SEL, 50, 50, SX, SY)).is(vza > vzb ? 0 : 1);
                }
            });

            test("equal depth resolves to later source-order facet", (expect) => {
                let verts = centreTri(0, 0, 1).concat(centreTri(1, 0, 1));
                let mesh = makeMesh(verts, [0, 1, 2, 3, 4, 5]);
                let frame = restFrame(0, 1, -1, 1, -1, 1, -0.1, 0.1);
                expect.that(pick(mesh, frame, 2, ZERO_SEL, 50, 50, SX, SY)).is(1);
            });

            test("nearest positive hit wins over source order", (expect) => {
                // Facet 0 sits nearer the inspect camera (more -z) than the
                // later facet 1; depth must beat the later-order tie-break.
                // Phase 0.45: fully extruded, separation still 0.
                let verts = centreTri(0, -0.2, 1).concat(centreTri(1, 0, 1));
                let mesh = makeMesh(verts, [0, 1, 2, 3, 4, 5]);
                let frame = restFrame(0.45, 1, -1, 1, -1, 1, -0.3, 0.1);
                expect.that(pick(mesh, frame, 2, ZERO_SEL, 50, 50, SX, SY)).is(0);
            });

            test("selected offset toward camera can win a depth contest", (expect) => {
                // Facet 0 is a hair nearer; selecting facet 1 pops it toward
                // the camera by SELECT_OFFSET_Z and it wins.
                // Phase 0.45 keeps intrinsic z live with zero separation.
                let verts = centreTri(0, -0.01, 1).concat(centreTri(1, 0, 1));
                let mesh = makeMesh(verts, [0, 1, 2, 3, 4, 5]);
                let frame = restFrame(0.45, 1, -1, 1, -1, 1, -0.2, 0.1);
                expect.that(pick(mesh, frame, 2, ZERO_SEL, 50, 50, SX, SY)).is(0);
                let sel: Array<u32> = [2, 0, 0, 0, 0, 0, 0, 0]; // bit 1 of word 0
                expect.that(pick(mesh, frame, 2, sel, 50, 50, SX, SY)).is(1);
            });

            test("collapsed backs are invisible at rest, visible when extruded", (expect) => {
                let mesh = makeMesh(centreTri(0, 0, -1), [0, 1, 2]);
                let rest = restFrame(0, 1, -1, 1, -1, 1, -0.1, 0.1);
                expect.that(pick(mesh, rest, 1, ZERO_SEL, 50, 50, SX, SY)).is(-1);
                let extruded = restFrame(0.5, 1, -1, 1, -1, 1, -0.1, 0.1);
                expect.that(pick(mesh, extruded, 1, ZERO_SEL, 50, 50, SX, SY)).is(0);
            });

            test("narrow and wide aspects still map the centre ray", (expect) => {
                let mesh = makeMesh(centreTri(0, 0, 1), [0, 1, 2]);
                for (let aspect of [0.5, 1, 2]) {
                    let frame = restFrame(0, aspect, -1, 1, -1, 1, -0.1, 0.1);
                    let w = 100;
                    let h = 100 / aspect;
                    expect.that(pick(mesh, frame, 1, ZERO_SEL, w / 2, h / 2, w, h)).is(0);
                }
            });
        });

        group("picker on the real blobs", () => {
            test("rest centre pick lands on a generated facet", (expect) => {
                let verts = this.blob("favicon-vertices");
                let indices = this.blob("favicon-indices");
                expect.that(verts != null).is(true);
                expect.that(indices != null).is(true);
                if (verts == null || indices == null) return;
                let frame = restFrame(0, 720 / 480,
                    BOUNDS_MIN_X, BOUNDS_MAX_X, BOUNDS_MIN_Y, BOUNDS_MAX_Y, BOUNDS_MIN_Z, BOUNDS_MAX_Z);
                let f = pickFacet(verts, indices, frame, FACET_COUNT, ZERO_SEL, 360, 240, 720, 480);
                expect.that(f >= 0 && f < FACET_COUNT).is(true);
            });
            test("empty corner pick returns -1", (expect) => {
                let verts = this.blob("favicon-vertices");
                let indices = this.blob("favicon-indices");
                if (verts == null || indices == null) return;
                let frame = restFrame(0, 720 / 480,
                    BOUNDS_MIN_X, BOUNDS_MAX_X, BOUNDS_MIN_Y, BOUNDS_MAX_Y, BOUNDS_MIN_Z, BOUNDS_MAX_Z);
                let f = pickFacet(verts, indices, frame, FACET_COUNT, ZERO_SEL, 8, 8, 720, 480);
                expect.that(f).is(-1);
            });
        });
    }
}
