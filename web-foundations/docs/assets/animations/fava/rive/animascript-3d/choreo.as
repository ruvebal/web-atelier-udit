// Choreography contract for the canonical favicon scene (X3).
// Every value here is a pure function of elapsed time, facet identity and
// selection state, so the GPU vertex shader (through the uniform block), the
// CPU picker and the JS reference verifier all evaluate the same motion.
// WGSL and verify-picking.mjs mirror these formulas; change them here first,
// then in both. Constants that the shader needs arrive through the uniform
// block so the WGSL has no duplicated literals.
//
// Loop (period LOOP_PERIOD seconds, phase phi in [0,1)):
//   [0.00,0.10)  assembled hold      extrusion 0, frontal camera
//   [0.10,0.42)  extrude             per-facet staggered 0 -> 1
//   [0.42,0.72)  inspect hold        extrusion 1, camera oblique
//   [0.45,0.93)  separation bump     facets translate along hashed 3D dirs
//   [0.72,0.97)  retract             per-facet staggered 1 -> 0 (reverse order)
//   [0.97,1.00)  assembled hold      exact rest pose
import { Mat4 } from "rive/mat4";

export const LOOP_PERIOD: f64 = 9.0;
export const FACET_STAGGER: f64 = 0.5;
export const SEPARATION_DIST: f64 = 0.1;
export const SELECT_OFFSET_Z: f64 = 0.08;
export const EXTRUDE_START: f64 = 0.1;
export const EXTRUDE_SPAN: f64 = 0.32;
export const RETRACT_START: f64 = 0.72;
export const RETRACT_SPAN: f64 = 0.25;
export const SEP_RISE_START: f64 = 0.45;
export const SEP_SPAN: f64 = 0.15;
export const SEP_FALL_END: f64 = 0.93;
export const DISCARD_E: f64 = 0.001;
export const INSPECT_YAW: f64 = 2.2;
export const INSPECT_PITCH: f64 = 0.45;
export const CAMERA_DISTANCE: f64 = 3.0;
export const FIT_MARGIN: f64 = 1.06;
export const ORBIT_LAMBDA: f64 = 6.0;
export const DRAG_DEADZONE: f64 = 3.0;
export const MAX_USER_YAW: f64 = 1.2;
export const MAX_USER_PITCH: f64 = 0.9;
export const MAX_SELECT_FACETS: u32 = 256;
export const PICK_TIE_EPS: f64 = 0.00001;

export function smoothstep(x: f64): f64 {
    let t = x < 0 ? 0 : x > 1 ? 1 : x;
    return t * t * (3 - 2 * t);
}

export function loopPhase(elapsed: f64): f64 {
    let p = elapsed / LOOP_PERIOD;
    return p - Math.floor(p);
}

// Per-facet extrusion amount in [0,1]. Stagger spreads each facet's ramp
// across half the window so neighbours never move in lockstep. Retract runs
// the same windows in reverse facet order.
export function facetExtrusion(phase: f64, facet: u32, facetCount: u32): f64 {
    let n = facetCount > 1 ? facetCount : 1;
    let stagger = facetCount > 1 ? <f64>facet / <f64>(n - 1) * FACET_STAGGER : 0;
    if (phase < EXTRUDE_START) return 0;
    if (phase < RETRACT_START) {
        let u = (phase - EXTRUDE_START) / EXTRUDE_SPAN;
        return smoothstep((u - stagger * 0.5) / (1 - FACET_STAGGER * 0.5));
    }
    if (phase < RETRACT_START + RETRACT_SPAN) {
        let v = (phase - RETRACT_START) / RETRACT_SPAN;
        let reverse = facetCount > 1 ? <f64>(n - 1 - facet) / <f64>(n - 1) * FACET_STAGGER : 0;
        return 1 - smoothstep((v - reverse * 0.5) / (1 - FACET_STAGGER * 0.5));
    }
    return 0;
}

// Global separation bump in [0,1]: rises after extrusion, falls during retract.
export function separation(phase: f64): f64 {
    return smoothstep((phase - SEP_RISE_START) / SEP_SPAN) * smoothstep((SEP_FALL_END - phase) / SEP_SPAN);
}

// Camera inspect weight: 0 at assembled rest, 1 through the inspect hold.
export function inspectWeight(phase: f64): f64 {
    return smoothstep((phase - 0.12) / 0.25) * smoothstep((0.98 - phase) / 0.22);
}

// Deterministic direction per facet in [-1,1]^3, normalised. Identical 32-bit
// wrapping multiply-xor hash in WGSL, AnimaScript and the JS verifier.
export function hashDir(facet: u32): Array<f64> {
    let h = facet * <u32>2654435761;
    h = h ^ (h >> 16);
    h = h * <u32>2246822519;
    h = h ^ (h >> 13);
    let a = <f64>(h & 65535) / 65535;
    h = h * <u32>3266489917 + 1;
    h = h ^ (h >> 16);
    let b = <f64>(h & 65535) / 65535;
    h = h * <u32>668265263 + 1;
    h = h ^ (h >> 15);
    let c = <f64>(h & 65535) / 65535;
    let x = a * 2 - 1;
    let y = b * 2 - 1;
    let z = c * 2 - 1;
    let l = Math.sqrt(x * x + y * y + z * z);
    if (l < 1e-9) return [1, 0, 0];
    return [x / l, y / l, z / l];
}

// ---- quaternions [x,y,z,w], for camera orientation interpolation ----
export function quatIdentity(): Array<f64> {
    return [0, 0, 0, 1];
}

export function quatMul(a: Array<f64>, b: Array<f64>): Array<f64> {
    let ax = a[0], ay = a[1], az = a[2], aw = a[3];
    let bx = b[0], by = b[1], bz = b[2], bw = b[3];
    return [
        aw * bx + ax * bw + ay * bz - az * by,
        aw * by - ax * bz + ay * bw + az * bx,
        aw * bz + ax * by - ay * bx + az * bw,
        aw * bw - ax * bx - ay * by - az * bz,
    ];
}

export function quatNormalize(q: Array<f64>): Array<f64> {
    let l = Math.sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
    if (l < 1e-12) return quatIdentity();
    return [q[0] / l, q[1] / l, q[2] / l, q[3] / l];
}

export function quatFromAxisAngle(axisX: f64, axisY: f64, axisZ: f64, angle: f64): Array<f64> {
    let l = Math.sqrt(axisX * axisX + axisY * axisY + axisZ * axisZ);
    if (l < 1e-12) return quatIdentity();
    let s = Math.sin(angle / 2) / l;
    return [axisX * s, axisY * s, axisZ * s, Math.cos(angle / 2)];
}

// Yaw about +Y then pitch about local +X, matching the orbit order the X2
// camera used.
export function quatFromYawPitch(yaw: f64, pitch: f64): Array<f64> {
    let qy = quatFromAxisAngle(0, 1, 0, yaw);
    let qx = quatFromAxisAngle(1, 0, 0, pitch);
    return quatNormalize(quatMul(qy, qx));
}

export function quatRotate(q: Array<f64>, x: f64, y: f64, z: f64): Array<f64> {
    // v' = q * v * q^-1, expanded for unit q.
    let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
    let tx = 2 * (qy * z - qz * y);
    let ty = 2 * (qz * x - qx * z);
    let tz = 2 * (qx * y - qy * x);
    return [
        x + qw * tx + qy * tz - qz * ty,
        y + qw * ty + qz * tx - qx * tz,
        z + qw * tz + qx * ty - qy * tx,
    ];
}

// Shortest-arc slerp; t in [0,1]. Near-identical inputs fall back to nlerp.
export function quatSlerp(a: Array<f64>, b: Array<f64>, t: f64): Array<f64> {
    let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    let bb = b;
    if (d < 0) {
        d = -d;
        bb = [-b[0], -b[1], -b[2], -b[3]];
    }
    if (d > 0.9995) {
        return quatNormalize([
            a[0] + (bb[0] - a[0]) * t,
            a[1] + (bb[1] - a[1]) * t,
            a[2] + (bb[2] - a[2]) * t,
            a[3] + (bb[3] - a[3]) * t,
        ]);
    }
    let th = Math.acos(Math.min(d, 1));
    let s = Math.sin(th);
    let wa = Math.sin((1 - t) * th) / s;
    let wb = Math.sin(t * th) / s;
    return [
        a[0] * wa + bb[0] * wb,
        a[1] * wa + bb[1] * wb,
        a[2] * wa + bb[2] * wb,
        a[3] * wa + bb[3] * wb,
    ];
}

// Exact exponential damping step: alpha = 1 - exp(-lambda * dt). With a
// constant target the residual multiplies by exp(-lambda * dt) per step, so
// the result after equal elapsed time is frame-rate independent.
export function dampStep(current: f64, target: f64, dt: f64, lambda: f64): f64 {
    let k = 1 - Math.exp(-lambda * dt);
    return current + (target - current) * k;
}

// Everything the camera needs for one frame, shared verbatim by the renderer
// (uniform block) and the CPU picker.
export class CameraFrame {
    phase: f64 = 0;
    elapsed: f64 = 0;
    sep: f64 = 0;
    halfHeight: f64 = 1;
    nearZ: f64 = 0.1;
    farZ: f64 = 10;
    aspect: f64 = 1;
    towardX: f64 = 0; // unit vector from scene toward the camera
    towardY: f64 = 0;
    towardZ: f64 = 1;
    mvp: Mat4 = Mat4.identity();
    view: Mat4 = Mat4.identity();
    viewInv: Mat4 = Mat4.identity();
}

// Builds the camera for a loop phase and damped user orbit. Quaternion slerp
// between the frontal rest orientation and the inspect orientation keeps
// orientation interpolation off Euler angles. Ortho fit recomputes the view
// volume from the eight rotated world bounds corners every frame.
export function computeCamera(
    phase: f64,
    elapsed: f64,
    userYaw: f64,
    userPitch: f64,
    aspect: f64,
    minX: f64,
    maxX: f64,
    minY: f64,
    maxY: f64,
    minZ: f64,
    maxZ: f64
): CameraFrame {
    let frame = new CameraFrame();
    frame.phase = phase;
    frame.elapsed = elapsed;
    frame.sep = separation(phase);
    frame.aspect = aspect;

    let centreX = (minX + maxX) / 2;
    let centreY = (minY + maxY) / 2;
    let centreZ = (minZ + maxZ) / 2;

    let w = inspectWeight(phase);
    let qBase = quatSlerp(quatIdentity(), quatFromYawPitch(INSPECT_YAW, INSPECT_PITCH), w);
    let qUser = quatFromYawPitch(userYaw, userPitch);
    let q = quatNormalize(quatMul(qBase, qUser));
    let forward = quatRotate(q, 0, 0, -1);
    let up = quatRotate(q, 0, 1, 0);
    frame.towardX = -forward[0];
    frame.towardY = -forward[1];
    frame.towardZ = -forward[2];
    let eyeX = centreX - forward[0] * CAMERA_DISTANCE;
    let eyeY = centreY - forward[1] * CAMERA_DISTANCE;
    let eyeZ = centreZ - forward[2] * CAMERA_DISTANCE;

    let view = Mat4.lookAt(
        <f32>eyeX, <f32>eyeY, <f32>eyeZ,
        <f32>centreX, <f32>centreY, <f32>centreZ,
        <f32>up[0], <f32>up[1], <f32>up[2]
    );
    frame.view = view;
    let inv = view.invertAffine();
    frame.viewInv = inv != null ? inv : Mat4.identity();

    // Fit the ortho volume to the rotated bounding box.
    let maxVX: f32 = 0;
    let maxVY: f32 = 0;
    let minVZ: f32 = 0;
    let maxVZ: f32 = 0;
    for (let ix = 0; ix < 2; ix++) {
        for (let iy = 0; iy < 2; iy++) {
            for (let iz = 0; iz < 2; iz++) {
                let wx = ix == 0 ? <f32>minX : <f32>maxX;
                let wy = iy == 0 ? <f32>minY : <f32>maxY;
                let wz = iz == 0 ? <f32>minZ : <f32>maxZ;
                let p = view.transformPoint(wx, wy, wz);
                maxVX = Mathf.max(maxVX, Mathf.abs(p.x));
                maxVY = Mathf.max(maxVY, Mathf.abs(p.y));
                if (ix == 0 && iy == 0 && iz == 0) {
                    minVZ = p.z;
                    maxVZ = p.z;
                } else {
                    minVZ = Mathf.min(minVZ, p.z);
                    maxVZ = Mathf.max(maxVZ, p.z);
                }
            }
        }
    }
    let halfHeight: f64 = Mathf.max(maxVY, maxVX / <f32>aspect) * FIT_MARGIN;
    let nearZ: f64 = Mathf.max(-maxVZ - 0.05, 0.01);
    let farZ: f64 = -minVZ + 0.05;
    frame.halfHeight = halfHeight;
    frame.nearZ = nearZ;
    frame.farZ = farZ;

    let projection = Mat4.ortho(
        <f32>(-halfHeight * aspect), <f32>(halfHeight * aspect),
        <f32>(-halfHeight), <f32>halfHeight,
        <f32>nearZ, <f32>farZ
    );
    frame.mvp = projection * view;
    return frame;
}
