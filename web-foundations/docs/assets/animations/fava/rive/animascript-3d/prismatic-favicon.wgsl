struct Frame {
  time: f32,
  aspect: f32,
  pointer_x: f32,
  pointer_y: f32,
}

@group(0) @binding(0) var<uniform> frame: Frame;

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) colour: vec3<f32>,
  @location(2) world: vec3<f32>,
}

const TAU: f32 = 6.28318530718;

fn rotate_x(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3(p.x, p.y * c - p.z * s, p.y * s + p.z * c);
}

fn rotate_y(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3(p.x * c + p.z * s, p.y, -p.x * s + p.z * c);
}

fn rotate_z(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3(p.x * c - p.y * s, p.x * s + p.y * c, p.z);
}

fn facet_centre(index: u32) -> vec3<f32> {
  let centres = array<vec3<f32>, 13>(
    vec3(-0.82,  0.68, 0.00), vec3(-0.27,  0.69, 0.02), vec3( 0.34,  0.68, 0.04),
    vec3( 0.84,  0.63, 0.06), vec3(-0.83,  0.20, 0.08), vec3(-0.26,  0.18, 0.10),
    vec3( 0.34,  0.18, 0.12), vec3( 0.82,  0.16, 0.14), vec3(-0.64, -0.34, 0.16),
    vec3(-0.04, -0.35, 0.18), vec3( 0.57, -0.34, 0.20), vec3(-0.29, -0.78, 0.22),
    vec3( 0.36, -0.76, 0.24)
  );
  return centres[index];
}

fn palette(index: u32) -> vec3<f32> {
  let colours = array<vec3<f32>, 5>(
    vec3(0.18, 0.38, 0.93),
    vec3(0.51, 0.38, 0.84),
    vec3(0.88, 0.84, 0.12),
    vec3(0.20, 0.65, 0.95),
    vec3(0.95, 0.36, 0.55)
  );
  return colours[index % 5u];
}

fn prism_position(vertex: u32) -> vec3<f32> {
  let a = vec3(-0.33, -0.25, -0.12);
  let b = vec3( 0.34, -0.25, -0.12);
  let c = vec3( 0.00,  0.34, -0.12);
  let d = vec3(-0.33, -0.25,  0.12);
  let e = vec3( 0.34, -0.25,  0.12);
  let f = vec3( 0.00,  0.34,  0.12);
  let vertices = array<vec3<f32>, 24>(
    a, c, b, d, e, f,
    a, b, e, a, e, d,
    b, c, f, b, f, e,
    c, a, d, c, d, f
  );
  return vertices[vertex];
}

fn prism_normal(vertex: u32) -> vec3<f32> {
  let front = vec3(0.0, 0.0, -1.0);
  let back = vec3(0.0, 0.0, 1.0);
  let bottom = vec3(0.0, -1.0, 0.0);
  let right = normalize(vec3(0.87, 0.49, 0.0));
  let left = normalize(vec3(-0.87, 0.49, 0.0));
  let normals = array<vec3<f32>, 24>(
    front, front, front, back, back, back,
    bottom, bottom, bottom, bottom, bottom, bottom,
    right, right, right, right, right, right,
    left, left, left, left, left, left
  );
  return normals[vertex];
}

@vertex
fn vertexMain(
  @builtin(vertex_index) vertex: u32,
  @builtin(instance_index) instance: u32,
) -> VertexOutput {
  let cycle = frame.time * TAU / 9.0;
  let unfold = 0.5 - 0.5 * cos(cycle);
  let seed = f32(instance);
  let orbit = cycle * 0.58 + seed * 0.48;

  var centre = facet_centre(instance);
  let radial = vec3(cos(orbit), sin(orbit * 1.27), sin(orbit));
  centre += radial * unfold * vec3(0.42, 0.30, 0.70);
  centre.z += sin(seed * 1.71 + cycle * 1.4) * unfold * 0.32;

  var local = prism_position(vertex);
  let facet_scale = 0.76 + 0.08 * sin(seed * 2.1);
  local = vec3(local.x * facet_scale, local.y * facet_scale, local.z);
  local.z *= 1.0 + unfold * 1.65;
  local = rotate_z(local, seed * 0.73 + unfold * sin(seed) * 0.7);
  local = rotate_y(local, unfold * (0.55 + 0.18 * sin(seed)));

  var normal = prism_normal(vertex);
  normal = rotate_z(normal, seed * 0.73 + unfold * sin(seed) * 0.7);
  normal = rotate_y(normal, unfold * (0.55 + 0.18 * sin(seed)));

  var world = centre + local;
  let group_yaw = 0.26 * sin(cycle * 0.5) + unfold * 0.42;
  let group_pitch = -0.12 + 0.16 * sin(cycle * 0.34);
  world = rotate_y(rotate_x(world, group_pitch), group_yaw);
  normal = rotate_y(rotate_x(normal, group_pitch), group_yaw);

  let camera_z = world.z + 4.8;
  let focal = 2.25;
  let near = 0.1;
  let far = 12.0;
  let clip_z = far / (far - near) * camera_z - (far * near) / (far - near);

  var output: VertexOutput;
  output.position = vec4(world.x * focal / frame.aspect, world.y * focal, clip_z, camera_z);
  output.normal = normal;
  output.colour = palette(instance);
  output.world = world;
  return output;
}

@fragment
fn fragmentMain(input: VertexOutput) -> @location(0) vec4<f32> {
  let n = normalize(input.normal);
  let light = normalize(vec3(-0.45, 0.72, -0.55));
  let diffuse = max(dot(n, light), 0.0);
  let view = normalize(vec3(0.0, 0.0, -1.0));
  let rim = pow(1.0 - max(dot(n, view), 0.0), 2.2);
  let pulse = 0.94 + 0.06 * sin(frame.time * 1.7 + input.world.z * 2.0);
  let colour = input.colour * (0.34 + diffuse * 0.78) * pulse + rim * vec3(0.25, 0.42, 0.75);
  return vec4(colour, 1.0);
}
