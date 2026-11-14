// Canonical favicon: indexed generated mesh, CPU-side camera, X3 choreography.
// Coordinate contract (see PHASE-X2/X3 reports / MATH-CONTRACTS):
//   application Z  - model units from geometry.json (y up, front faces +z at z=0)
//   view Z         - camera space after Mat4.lookAt (camera looks down -z)
//   clip Z         - NDC z in [0,1] produced by Mat4.ortho; this single
//                    scalar is both the projected depth and the value the
//                    depth32float attachment stores (depthStoreOp discards)
//   depth buffer   - depth32float, compare less-equal, written per fragment
// The three Z values stay distinct: the shader only ever sees clip position.
//
// Choreography constants arrive through the uniform block (single source:
// choreo.as on the CPU side); only the formulas are mirrored here.

struct Frame {
  mvp: mat4x4<f32>,        // 64 bytes
  c0: vec4<f32>,           // phase, elapsed, facetCount, facetStagger
  c1: vec4<f32>,           // extrudeStart, extrudeSpan, retractStart, retractSpan
  c2: vec4<f32>,           // sepRiseStart, sepSpan, sepFallEnd, selectOffsetZ
  c3: vec4<f32>,           // separationDist, discardE, spare, spare
  highlight: vec4<f32>,    // selection highlight rgb, spare
  camDir: vec4<f32>,       // xyz: unit vector toward the camera, w spare
  selection: array<vec4<u32>, 2>,// 256-bit selection bitmask, source-order facets
}

@group(0) @binding(0) var<uniform> frame: Frame;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) colour: vec3<f32>,
  @location(2) tags: vec2<f32>, // x: extrusion amount, y: selected flag
}

fn ss(t: f32) -> f32 {
  let x = clamp(t, 0.0, 1.0);
  return x * x * (3.0 - 2.0 * x);
}

// Mirror of choreo.facetExtrusion: staggered extrude/retract windows.
fn facetExtrusion(phase: f32, facet: u32, count: u32) -> f32 {
  let nf = max(count, 1u);
  var stagger = 0.0;
  var reverse = 0.0;
  if (count > 1u) {
    stagger = f32(facet) / f32(count - 1u) * frame.c0.w;
    reverse = f32(nf - 1u - facet) / f32(nf - 1u) * frame.c0.w;
  }
  if (phase < frame.c1.x) { return 0.0; }
  if (phase < frame.c1.z) {
    let u = (phase - frame.c1.x) / frame.c1.y;
    return ss((u - stagger * 0.5) / (1.0 - frame.c0.w * 0.5));
  }
  if (phase < frame.c1.z + frame.c1.w) {
    let v = (phase - frame.c1.z) / frame.c1.w;
    return 1.0 - ss((v - reverse * 0.5) / (1.0 - frame.c0.w * 0.5));
  }
  return 0.0;
}

// Mirror of choreo.hashDir: 32-bit wrapping multiply-xor hash, normalised.
fn hashDir3(f: u32) -> vec3<f32> {
  var h = f * 2654435761u;
  h ^= h >> 16u; h *= 2246822519u; h ^= h >> 13u;
  let a = f32(h & 65535u) / 65535.0;
  h = h * 3266489917u + 1u; h ^= h >> 16u;
  let b = f32(h & 65535u) / 65535.0;
  h = h * 668265263u + 1u; h ^= h >> 15u;
  let c = f32(h & 65535u) / 65535.0;
  let v = vec3<f32>(a * 2.0 - 1.0, b * 2.0 - 1.0, c * 2.0 - 1.0);
  let l = length(v);
  if (l < 1e-9) { return vec3<f32>(1.0, 0.0, 0.0); }
  return v / l;
}

@vertex
fn vertexMain(
  @location(0) position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) colour: vec3<f32>,
  @location(3) facet: f32,
) -> VertexOutput {
  var output: VertexOutput;
  let f = u32(facet);
  let phase = frame.c0.x;
  let e = facetExtrusion(phase, f, u32(frame.c0.z));

  // Separation bump and per-facet hash direction, shared with the picker.
  let sepW = ss((phase - frame.c2.x) / frame.c2.y) * ss((frame.c2.z - phase) / frame.c2.y);
  let sep = sepW * frame.c3.x;
  let dir = hashDir3(f) * sep;

  // Selection bitmask, clamped for meshes beyond 256 facets. The 8 u32 words
  // pack as vec4<u32> x 2 to satisfy uniform alignment.
  let word = min(f >> 5u, 7u);
  let selBit = (frame.selection[word >> 2u][word & 3u] >> (f & 31u)) & 1u;
  // Selection pops toward the camera along camDir, matching the picker.
  let selVec = frame.camDir.xyz * (f32(selBit) * frame.c2.w);

  var pos = position;
  pos.x += dir.x + selVec.x;
  pos.y += dir.y + selVec.y;
  pos.z = position.z * e + dir.z + selVec.z;
  output.position = frame.mvp * vec4<f32>(pos, 1.0);
  output.normal = normal;
  output.colour = select(colour, frame.highlight.rgb, selBit == 1u);
  output.tags = vec2<f32>(e, f32(selBit));
  return output;
}

// Materials are classified in object space from the generated face normal:
// front (nz > 0.5) keeps the exact source fill (or the selection highlight),
// back (nz < -0.5) is shaded down, side walls take a mid tone. At extrusion
// ~0 the collapsed back/side fragments are discarded so the assembled pose
// stays pixel-exact. Unlit on purpose: the front view must reproduce the SVG
// fills byte for byte.
@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4<f32> {
  if (input.tags.x < frame.c3.y && input.normal.z < 0.5) {
    discard;
  }
  var rgb = input.colour;
  let nz = input.normal.z;
  if (nz < -0.5) {
    rgb *= 0.45;
  } else if (nz < 0.5) {
    rgb *= vec3<f32>(0.72, 0.74, 0.78);
  }
  return vec4<f32>(rgb, 1.0);
}
