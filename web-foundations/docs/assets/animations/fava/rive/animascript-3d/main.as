import { Layout, Context } from "rive/host";
import { PointerEvent } from "rive/events";
import { Renderer } from "rive/renderer";
import { ImageSampler } from "rive/image";
import { BlendMode } from "rive/paint";
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
    FACET_COUNT,
    INDEX_COUNT,
} from "./favicon_mesh";
import * as choreo from "./choreo";
import { CameraFrame } from "./choreo";
import { pickFacet } from "./pick";

// Exact frontal object in Rive GPU Canvas: the generated svg-to-rive-3d mesh
// ships as two blob assets plus a per-vertex facet id, drawn with one
// drawIndexed call. X3 adds the shared choreography contract (choreo.as),
// CPU picking over the same blobs (pick.as), click/tap selection with a
// bounded z-offset and highlight, drag orbit with deadzone + exponential
// damping, and empty-space reset. Loop phase is a pure function of elapsed
// time, so captures and picks are deterministic.
export class Main extends Layout {
    canvas: GPUCanvas? = null;
    depth: GPUTexture? = null;
    depthView: GPUTextureView? = null;
    pipeline: GPUPipeline? = null;
    vertices: GPUBuffer? = null;
    indices: GPUBuffer? = null;
    frameBuffer: GPUBuffer? = null;
    frameGroup: GPUBindGroup? = null;
    frameBytes: ArrayBuffer = new ArrayBuffer(192);
    vertexBytes: ArrayBuffer? = null;
    indexBytes: ArrayBuffer? = null;
    frame: CameraFrame? = null;
    ctx: Context? = null;
    elapsed: f64 = 0;
    aspect: f64 = 1;
    cssW: f64 = 1;
    cssH: f64 = 1;
    sampler: ImageSampler = ImageSampler();

    // Orbit: targets change on drag, damped values feed the camera.
    userYawTarget: f64 = 0;
    userPitchTarget: f64 = 0;
    userYaw: f64 = 0;
    userPitch: f64 = 0;

    // Selection: per-facet bool plus the 256-bit shader bitmask.
    selected: Array<bool> = [];
    selWords: Array<u32> = [0, 0, 0, 0, 0, 0, 0, 0];
    selCount: i32 = 0;

    // Pointer/drag state.
    isDown: bool = false;
    pointerMoved: bool = false;
    downX: f64 = 0;
    downY: f64 = 0;
    lastX: f64 = 0;
    lastY: f64 = 0;

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
        vertexLayout.stride = 40;
        vertexLayout.attributes = [
            new GPUVertexAttribute(VertexFormat.float3, 0, 0),
            new GPUVertexAttribute(VertexFormat.float3, 1, 12),
            new GPUVertexAttribute(VertexFormat.float3, 2, 24),
            new GPUVertexAttribute(VertexFormat.float1, 3, 36),
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

        let frameBuffer = new GPUBuffer(BufferUsage.uniform, 192);
        let frameGroup = new GPUBindGroup(
            pipeline.getBindGroupLayout(0),
            [new GPUBindGroupUBO(0, frameBuffer)],
        );

        for (let i = 0; i < FACET_COUNT; i++) this.selected.push(false);

        this.canvas = canvas;
        this.pipeline = pipeline;
        this.vertices = vertices;
        this.indices = indices;
        this.frameBuffer = frameBuffer;
        this.frameGroup = frameGroup;
        this.vertexBytes = vertexBytes;
        this.indexBytes = indexBytes;
        this.ctx = context;
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
        this.cssW = width;
        this.cssH = height;
        this.aspect = width / height;
        this.updateUniforms();
    }

    override advance(seconds: f64): bool {
        // Elapsed time drives the loop exactly; only the camera damping uses
        // a bounded delta so a long frame cannot teleport the orbit.
        this.elapsed += seconds;
        let dt = Math.min(seconds, 0.5);
        this.userYaw = choreo.dampStep(this.userYaw, this.userYawTarget, dt, choreo.ORBIT_LAMBDA);
        this.userPitch = choreo.dampStep(this.userPitch, this.userPitchTarget, dt, choreo.ORBIT_LAMBDA);
        this.updateUniforms();
        return true;
    }

    // Shared camera + uniform block. The CameraFrame is kept for the picker so
    // render and pick can never diverge on transforms.
    private unsafe updateUniforms(): void {
        let frameBuffer = this.frameBuffer;
        if (frameBuffer == null) return;

        let phase = choreo.loopPhase(this.elapsed);
        let frame = choreo.computeCamera(
            phase, this.elapsed, this.userYaw, this.userPitch, this.aspect,
            BOUNDS_MIN_X, BOUNDS_MAX_X, BOUNDS_MIN_Y, BOUNDS_MAX_Y, BOUNDS_MIN_Z, BOUNDS_MAX_Z
        );
        this.frame = frame;

        let address = changetype<usize>(this.frameBytes);
        frame.mvp.writeToBuffer(this.frameBytes, 0);
        store<f32>(address + 64, <f32>phase);
        store<f32>(address + 68, <f32>this.elapsed);
        store<f32>(address + 72, <f32>FACET_COUNT);
        store<f32>(address + 76, <f32>choreo.FACET_STAGGER);
        store<f32>(address + 80, <f32>choreo.EXTRUDE_START);
        store<f32>(address + 84, <f32>choreo.EXTRUDE_SPAN);
        store<f32>(address + 88, <f32>choreo.RETRACT_START);
        store<f32>(address + 92, <f32>choreo.RETRACT_SPAN);
        store<f32>(address + 96, <f32>choreo.SEP_RISE_START);
        store<f32>(address + 100, <f32>choreo.SEP_SPAN);
        store<f32>(address + 104, <f32>choreo.SEP_FALL_END);
        store<f32>(address + 108, <f32>choreo.SELECT_OFFSET_Z);
        store<f32>(address + 112, <f32>choreo.SEPARATION_DIST);
        store<f32>(address + 116, <f32>choreo.DISCARD_E);
        store<f32>(address + 120, 0);
        store<f32>(address + 124, 0);
        store<f32>(address + 128, 0.95);
        store<f32>(address + 132, 0.6);
        store<f32>(address + 136, 0.15);
        store<f32>(address + 140, 0);
        for (let i = 0; i < 8; i++) {
            store<u32>(address + 144 + i * 4, this.selWords[i]);
        }
        frameBuffer.update(0, this.frameBytes);
    }

    // ---- pointer interaction ----

    override pointerDown(event: PointerEvent): void {
        this.isDown = true;
        this.pointerMoved = false;
        this.downX = event.position.x;
        this.downY = event.position.y;
        this.lastX = this.downX;
        this.lastY = this.downY;
        event.hit();
    }

    override pointerMove(event: PointerEvent): void {
        if (!this.isDown) return;
        let px = event.position.x;
        let py = event.position.y;
        // Deadzone: pen-scale micro-movement never reaches the orbit target.
        let ddx = px - this.downX;
        let ddy = py - this.downY;
        if (!this.pointerMoved && Math.sqrt(ddx * ddx + ddy * ddy) < choreo.DRAG_DEADZONE) {
            this.lastX = px;
            this.lastY = py;
            return;
        }
        this.pointerMoved = true;
        let dx = px - this.lastX;
        let dy = py - this.lastY;
        this.lastX = px;
        this.lastY = py;
        this.userYawTarget = Math.max(-choreo.MAX_USER_YAW, Math.min(choreo.MAX_USER_YAW, this.userYawTarget - dx * 0.006));
        this.userPitchTarget = Math.max(-choreo.MAX_USER_PITCH, Math.min(choreo.MAX_USER_PITCH, this.userPitchTarget + dy * 0.006));
        event.hit();
    }

    override pointerUp(event: PointerEvent): void {
        if (!this.isDown) return;
        this.isDown = false;
        if (!this.pointerMoved) {
            this.clickPick(event.position.x, event.position.y);
        }
        event.hit();
    }

    override pointerExit(event: PointerEvent): void {
        this.isDown = false;
        event.hit();
    }

    private clickPick(px: f64, py: f64): void {
        let vertexBytes = this.vertexBytes;
        let indexBytes = this.indexBytes;
        let frame = this.frame;
        if (vertexBytes == null || indexBytes == null || frame == null) return;
        let facet = pickFacet(vertexBytes, indexBytes, frame, FACET_COUNT, this.selWords, px, py, this.cssW, this.cssH);
        if (facet < 0) {
            this.resetSelection();
            return;
        }
        this.toggleFacet(facet);
    }

    private toggleFacet(facet: i32): void {
        if (facet < 0 || facet >= FACET_COUNT || facet >= <i32>choreo.MAX_SELECT_FACETS) return;
        let was = this.selected[facet];
        this.selected[facet] = !was;
        let w = facet >> 5;
        let bit = <u32>(1 << (facet & 31));
        if (this.selected[facet]) {
            this.selWords[w] = this.selWords[w] | bit;
            this.selCount += 1;
        } else {
            this.selWords[w] = this.selWords[w] & ~bit;
            this.selCount -= 1;
        }
        this.ctx?.log(`x3pick facet=${facet} selected=${this.selected[facet] ? 1 : 0} count=${this.selCount}`);
        this.ctx?.markNeedsUpdate();
    }

    private resetSelection(): void {
        for (let i = 0; i < this.selected.length; i++) this.selected[i] = false;
        for (let i = 0; i < 8; i++) this.selWords[i] = 0;
        this.selCount = 0;
        this.userYawTarget = 0;
        this.userPitchTarget = 0;
        this.ctx?.log("x3pick reset count=0");
        this.ctx?.markNeedsUpdate();
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
