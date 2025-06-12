
/// <reference types="vite/client" />

// WebGPU type declarations
declare global {
  interface Navigator {
    readonly gpu?: GPU;
  }

  interface GPU {
    requestAdapter(options?: GPURequestAdapterOptions): Promise<GPUAdapter | null>;
  }

  interface GPURequestAdapterOptions {
    powerPreference?: "low-power" | "high-performance";
    forceFallbackAdapter?: boolean;
  }

  interface GPUAdapter {
    readonly features: GPUSupportedFeatures;
    readonly limits: GPUSupportedLimits;
    readonly info: GPUAdapterInfo;
    requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice>;
  }

  interface GPUSupportedFeatures extends ReadonlySet<string> {}
  
  interface GPUSupportedLimits {
    readonly maxTextureDimension1D: number;
    readonly maxTextureDimension2D: number;
    readonly maxTextureDimension3D: number;
  }

  interface GPUAdapterInfo {
    readonly vendor: string;
    readonly architecture: string;
    readonly device: string;
    readonly description: string;
  }

  interface GPUDeviceDescriptor {
    label?: string;
    requiredFeatures?: Iterable<string>;
    requiredLimits?: Record<string, number>;
  }

  interface GPUDevice extends EventTarget {
    readonly features: GPUSupportedFeatures;
    readonly limits: GPUSupportedLimits;
    readonly queue: GPUQueue;
    destroy(): void;
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
  }

  interface GPUQueue {
    submit(commandBuffers: Iterable<GPUCommandBuffer>): void;
    writeBuffer(buffer: GPUBuffer, bufferOffset: number, data: BufferSource, dataOffset?: number, size?: number): void;
  }

  interface GPUBuffer {
    readonly size: number;
    readonly usage: number;
    destroy(): void;
    mapAsync(mode: number, offset?: number, size?: number): Promise<void>;
  }

  interface GPUCommandBuffer {}

  interface GPUBufferDescriptor {
    label?: string;
    size: number;
    usage: number;
    mappedAtCreation?: boolean;
  }
}

export {};
