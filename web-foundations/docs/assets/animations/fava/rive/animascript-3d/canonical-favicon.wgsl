// Canonical favicon: indexed generated mesh, CPU-side camera.
// Coordinate contract (see PHASE-X2 report / MATH-CONTRACTS):
//   application Z  - model units from geometry.json (y up, front faces +z at z=0)
//   view Z         - camera space after Mat4.lookAt (camera looks down -z)
//   clip Z         - NDC z in [0,1] produced by Mat4.ortho
//   depth buffer   - depth32float, compare less, written per fragment
// The three Z values stay distinct: the shader only ever sees clip position.

struct Frame {
  mvp: mat4x4<f32>,
  misc: vec4<f32>, // x: elapsed seconds, y: canvas aspect, z/w reserved
}

@group(0) @binding(0) var<uniform> frame: Frame;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) colour: vec3<f32>,
}

@vertex
fn vertexMain(
  @location(0) position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) colour: vec3<f32>,
) -> VertexOutput {
  var output: VertexOutput;
  output.position = frame.mvp * vec4<f32>(position, 1.0);
  output.normal = normal;
  output.colour = colour;
  return output;
}

// Materials are classified in object space from the generated face normal:
// front (nz > 0.5) keeps the exact source fill, back (nz < -0.5) is shaded
// down, side walls take a mid tone. Unlit on purpose: the front view must
// reproduce the SVG fills byte for byte.
@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4<f32> {
  var rgb = input.colour;
  let nz = input.normal.z;
  if (nz < -0.5) {
    rgb *= 0.45;
  } else if (nz < 0.5) {
    rgb *= vec3<f32>(0.72, 0.74, 0.78);
  }
  return vec4<f32>(rgb, 1.0);
}
