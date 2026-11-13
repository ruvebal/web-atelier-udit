import { Layout, Context } from "rive/host";
import { Renderer } from "rive/renderer";
import { ImageSampler } from "rive/image";
import { BlendMode } from "rive/paint";
import { Mat4 } from "rive/mat4";
import {
    GPUBindGroup,
    GPUBindGroupUBO,
    GPUBuffer,
    GPUCanvas,
    GPUColorAttachment,
    GPUColorTargetDesc,
    GPUDepthStencilDesc,
    GPUPassDesc,
    GPUPipeline,
    GPUPipelineDesc,
    GPUTexture,
    GPUTextureDesc,
    GPUTextureView,
    GPUVertexAttribute,
    GPUVertexBufferLayout,
} from "rive/gpu";
import {
    BufferUsage,
    CompareFunction,
    CullMode,
    FaceWinding,
    IndexFormat,
    LoadOp,
    StoreOp,
    TextureFormat,
    VertexFormat,
} from "rive/gpu_enums";
import {
    BOUNDS_MAX_X,
    BOUNDS_MAX_Y,
    BOUNDS_MAX_Z,
    BOUNDS_MIN_X,
    BOUNDS_MIN_Y,
    BOUNDS_MIN_Z,
    INDEX_COUNT,
} from "./favicon_mesh";

// Exact frontal object in Rive GPU Canvas: the generated svg-to-rive-3d mesh
// ships as two blob assets, drawn with one indexed drawIndexed call. The
// camera is a CPU-side Mat4 orbit; at elapsed = 0 it is exactly frontal.
export class Main extends Layout {
    canvas: GPUCanvas? = null;
    depth: GPUTexture? = null;
    depthView: GPUTextureView? = null;
    pipeline: GPUPipeline? = null;
    vertices: GPUBuffer? = null;
    indices: GPUBuffer? = null;
    frameBuffer: GPUBuffer? = null;
    frameGroup: GPUBindGroup? = null;
    frameBytes: ArrayBuffer = new ArrayBuffer(80);
    elapsed: f32 = 0;
    aspect: f32 = 1;
    sampler: ImageSampler = ImageSampler();

    override init(context: Context): bool {
        let shader = context.shader("canonical-favicon");
        let canvas = context.gpuCanvas(0, 0);
        let vertexBytes = context.blob("favicon-vertices");
        let indexBytes = context.blob("favicon-indices");
        if (shader == null || canvas == null || vertexBytes == null || indexBytes == null) return false;

        let vertices = new GPUBuffer(BufferUsage.vertex, <u32>vertexBytes.byteLength, vertexBytes, true);
        let indices = new GPUBuffer(BufferUsage.index, <u32>indexBytes.byteLength, indexBytes, true);

        let colour = new GPUColorTargetDesc();
        colour.format = <TextureFormat>canvas.format;
        let depthState = new GPUDepthStencilDesc();
        depthState.format = TextureFormat.depth32float;
        // Coplanar front facets resolve in source order like SVG painter
        // order: equal depth must pass so later facets win.
        depthState.compare = CompareFunction.lessEqual;
        depthState.write = true;

        let vertexLayout = new GPUVertexBufferLayout();
        vertexLayout.stride = 36;
        vertexLayout.attributes = [
            new GPUVertexAttribute(VertexFormat.float3, 0, 0),
            new GPUVertexAttribute(VertexFormat.float3, 1, 12),
            new GPUVertexAttribute(VertexFormat.float3, 2, 24),
        ];

        let pipelineDesc = new GPUPipelineDesc();
        pipelineDesc.vertexModule = shader;
        pipelineDesc.fragmentModule = shader;
        pipelineDesc.vertexEntryPoint = "vertexMain";
        pipelineDesc.fragmentEntryPoint = "fragmentMain";
        pipelineDesc.colorTargets = [colour];
        pipelineDesc.depthStencil = depthState;
        pipelineDesc.vertexBuffers = [vertexLayout];
        pipelineDesc.cullMode = CullMode.none;
        pipelineDesc.winding = FaceWinding.counterClockwise;
        let pipeline = new GPUPipeline(pipelineDesc);

        let frameBuffer = new GPUBuffer(BufferUsage.uniform, 80);
        let frameGroup = new GPUBindGroup(
            pipeline.getBindGroupLayout(0),
            [new GPUBindGroupUBO(0, frameBuffer)],
        );

        this.canvas = canvas;
        this.pipeline = pipeline;
        this.vertices = vertices;
        this.indices = indices;
        this.frameBuffer = frameBuffer;
        this.frameGroup = frameGroup;
        this.updateUniforms();
        return true;
    }

    override resize(width: f64, height: f64, scale: f64): void {
        let canvas = this.canvas;
        if (canvas == null || width <= 0 || height <= 0) return;
        let pixelWidth = <u32>(width * scale);
        let pixelHeight = <u32>(height * scale);
        if (pixelWidth < 1) pixelWidth = 1;
        if (pixelHeight < 1) pixelHeight = 1;
        if (!canvas.resize(pixelWidth, pixelHeight)) return;

        let oldDepth = this.depth;
        if (oldDepth != null) oldDepth.release();
        let depthDesc = new GPUTextureDesc();
        depthDesc.width = pixelWidth;
        depthDesc.height = pixelHeight;
        depthDesc.format = TextureFormat.depth32float;
        depthDesc.renderTarget = true;
        let depth = new GPUTexture(depthDesc);
        this.depth = depth;
        this.depthView = depth.view();
        this.aspect = <f32>(width / height);
        this.updateUniforms();
    }

    override advance(seconds: f64): bool {
        this.elapsed += <f32>seconds;
        this.updateUniforms();
        return true;
    }

    // CPU camera: orbit angles are pure functions of elapsed time, so the
    // rest pose (elapsed = 0) is exactly frontal and captures are
    // deterministic. World bounds come from the generated constants module.
    private unsafe updateUniforms(): void {
        let frameBuffer = this.frameBuffer;
        if (frameBuffer == null) return;

        let centreX = (BOUNDS_MIN_X + BOUNDS_MAX_X) / 2;
        let centreY = (BOUNDS_MIN_Y + BOUNDS_MAX_Y) / 2;
        let centreZ = (BOUNDS_MIN_Z + BOUNDS_MAX_Z) / 2;
        let halfX = (BOUNDS_MAX_X - BOUNDS_MIN_X) / 2;
        let halfY = (BOUNDS_MAX_Y - BOUNDS_MIN_Y) / 2;
        let halfZ = (BOUNDS_MAX_Z - BOUNDS_MIN_Z) / 2;

        let yaw = 2.8 * Mathf.sin(0.45 * this.elapsed);
        let pitch = 0.45 * Mathf.sin(0.5 * this.elapsed);
        let distance: f32 = 3.0;
        let cy = Mathf.cos(yaw);
        let sy = Mathf.sin(yaw);
        let cp = Mathf.cos(pitch);
        let sp = Mathf.sin(pitch);
        let eyeX = centreX + distance * sy * cp;
        let eyeY = centreY + distance * sp;
        let eyeZ = centreZ + distance * cy * cp;
        let view = Mat4.lookAt(eyeX, eyeY, eyeZ, centreX, centreY, centreZ, 0, 1, 0);

        // Fit the ortho volume to the rotated bounding box, recomputed per
        // frame from the eight corners so any aspect stays undistorted.
        let maxVX: f32 = 0;
        let maxVY: f32 = 0;
        let minVZ: f32 = 0;
        let maxVZ: f32 = 0;
        for (let ix = 0; ix < 2; ix++) {
            for (let iy = 0; iy < 2; iy++) {
                for (let iz = 0; iz < 2; iz++) {
                    let wx = ix == 0 ? BOUNDS_MIN_X : BOUNDS_MAX_X;
                    let wy = iy == 0 ? BOUNDS_MIN_Y : BOUNDS_MAX_Y;
                    let wz = iz == 0 ? BOUNDS_MIN_Z : BOUNDS_MAX_Z;
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
        let halfHeight: f32 = Mathf.max(maxVY, maxVX / this.aspect) * 1.06;
        let near: f32 = Mathf.max(-maxVZ - 0.05, 0.01);
        let far: f32 = -minVZ + 0.05;
        let projection = Mat4.ortho(-halfHeight * this.aspect, halfHeight * this.aspect, -halfHeight, halfHeight, near, far);
        let mvp = projection * view;

        let address = changetype<usize>(this.frameBytes);
        mvp.writeToBuffer(this.frameBytes, 0);
        store<f32>(address + 64, this.elapsed);
        store<f32>(address + 68, this.aspect);
        store<f32>(address + 72, 0);
        store<f32>(address + 76, 0);
        frameBuffer.update(0, this.frameBytes);
    }

    override draw(renderer: Renderer): void {
        let canvas = this.canvas;
        let pipeline = this.pipeline;
        let group = this.frameGroup;
        let depthView = this.depthView;
        let vertices = this.vertices;
        let indices = this.indices;
        if (canvas == null || pipeline == null || group == null || depthView == null || vertices == null || indices == null) return;

        let colour = new GPUColorAttachment();
        colour.loadOp = LoadOp.clear;
        colour.storeOp = StoreOp.store;
        colour.clearR = 0.025;
        colour.clearG = 0.04;
        colour.clearB = 0.09;
        colour.clearA = 1;

        let passDesc = new GPUPassDesc();
        passDesc.color = [colour];
        passDesc.depthView = depthView;
        passDesc.depthLoadOp = LoadOp.clear;
        passDesc.depthStoreOp = StoreOp.discard;
        passDesc.depthClearValue = 1;
        passDesc.label = "canonical favicon";

        let pass = canvas.beginRenderPass(passDesc);
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, group);
        pass.setVertexBuffer(0, vertices);
        pass.setIndexBuffer(indices, <u32>IndexFormat.uint16);
        pass.drawIndexed(INDEX_COUNT);
        pass.finish();
        renderer.drawImage(canvas.image, this.sampler, BlendMode.srcOver, 1);
    }
}
