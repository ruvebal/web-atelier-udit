import { Layout, Context } from "rive/host";
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
} from "rive/gpu";
import {
    BufferUsage,
    CompareFunction,
    CullMode,
    FaceWinding,
    LoadOp,
    StoreOp,
    TextureFormat,
} from "rive/gpu_enums";

const WIDTH: u32 = 720;
const HEIGHT: u32 = 480;
const FACET_COUNT: u32 = 13;
const VERTICES_PER_PRISM: u32 = 24;

// True 3D in a Rive file: AnimaScript owns time and GPU resources while
// WGSL owns instanced geometry, camera projection, lighting, and colour.
export class Main extends Layout {
    canvas: GPUCanvas? = null;
    depth: GPUTexture? = null;
    depthView: GPUTextureView? = null;
    pipeline: GPUPipeline? = null;
    frameBuffer: GPUBuffer? = null;
    frameGroup: GPUBindGroup? = null;
    frameBytes: ArrayBuffer = new ArrayBuffer(16);
    elapsed: f32 = 0;
    sampler: ImageSampler = ImageSampler();

    override init(context: Context): bool {
        let shader = context.shader("prismatic-favicon");
        let canvas = context.gpuCanvas(WIDTH, HEIGHT);
        if (shader == null || canvas == null) return false;

        let depthDesc = new GPUTextureDesc();
        depthDesc.width = WIDTH;
        depthDesc.height = HEIGHT;
        depthDesc.format = TextureFormat.depth32float;
        depthDesc.renderTarget = true;
        let depth = new GPUTexture(depthDesc);

        let colour = new GPUColorTargetDesc();
        colour.format = <TextureFormat>canvas.format;
        let depthState = new GPUDepthStencilDesc();
        depthState.format = TextureFormat.depth32float;
        depthState.compare = CompareFunction.less;
        depthState.write = true;

        let pipelineDesc = new GPUPipelineDesc();
        pipelineDesc.vertexModule = shader;
        pipelineDesc.fragmentModule = shader;
        pipelineDesc.vertexEntryPoint = "vertexMain";
        pipelineDesc.fragmentEntryPoint = "fragmentMain";
        pipelineDesc.colorTargets = [colour];
        pipelineDesc.depthStencil = depthState;
        pipelineDesc.cullMode = CullMode.back;
        pipelineDesc.winding = FaceWinding.counterClockwise;
        let pipeline = new GPUPipeline(pipelineDesc);

        let frameBuffer = new GPUBuffer(BufferUsage.uniform, 16);
        let frameGroup = new GPUBindGroup(
            pipeline.getBindGroupLayout(0),
            [new GPUBindGroupUBO(0, frameBuffer)],
        );

        this.canvas = canvas;
        this.depth = depth;
        this.depthView = depth.view();
        this.pipeline = pipeline;
        this.frameBuffer = frameBuffer;
        this.frameGroup = frameGroup;
        return true;
    }

    override unsafe advance(seconds: f64): bool {
        this.elapsed += <f32>seconds;
        let address = changetype<usize>(this.frameBytes);
        store<f32>(address, this.elapsed);
        store<f32>(address + 4, <f32>WIDTH / <f32>HEIGHT);
        store<f32>(address + 8, 0);
        store<f32>(address + 12, 0);
        this.frameBuffer!.update(0, this.frameBytes);
        return true;
    }

    override draw(renderer: Renderer): void {
        let canvas = this.canvas;
        let pipeline = this.pipeline;
        let group = this.frameGroup;
        let depthView = this.depthView;
        if (canvas == null || pipeline == null || group == null || depthView == null) return;

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
        passDesc.label = "ruvebal prismatic favicon";

        let pass = canvas.beginRenderPass(passDesc);
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, group);
        pass.draw(VERTICES_PER_PRISM, FACET_COUNT);
        pass.finish();
        renderer.drawImage(canvas.image, this.sampler, BlendMode.srcOver, 1);
    }
}
