// Pedagogical specimen — Rive + AnimaScript audio processor.
// Pattern adapted from https://rive.app/rasc/docs/audio.html (Hum / Snapshot).
//
// Ownership:
//   Layout (main lane) publishes Level and starts the processor.
//   Hum (audio lane / AudioWorklet on the web) renders interleaved samples.
//   Snapshot crosses by id — no allocation in process().
//
// Browser note: live processors need a threaded web build; without threads,
// Audio.start fails and AudioHandle.failed explains why.

import { Layout, Context } from "rive/host";
import { Audio, AudioHandle, AudioProcessor } from "rive/audio";
import { Snapshot } from "rive/shared";

/** Gain published from the main lane; the audio lane reads the latest copy. */
export class Level {
  gain: f64 = 0.08;
}

/**
 * AudioProcessor lane — runs on the audio thread.
 * init: once. process: every block; must not wait or allocate.
 */
export class Hum extends AudioProcessor<Snapshot<Level>> {
  level: Snapshot<Level>? = null;
  current: Level = new Level();
  channels: i32 = 2;
  phase: f64 = 0;
  step: f64 = 0;

  override init(
    sampleRate: f64,
    maxFrames: i32,
    channels: i32,
    level: Snapshot<Level>
  ): void {
    this.level = level;
    this.channels = channels;
    // Soft 110 Hz — pitched low so a render-audio WAV is easy to hear in review.
    this.step = (2 * Math.PI * 110) / sampleRate;
  }

  override process(out: StaticArray<f32>, frames: i32, startFrame: f64): void {
    // startFrame is the engine clock for this block — stamp scheduled events against it.
    this.level!.latestInto(this.current);
    const channels = this.channels;
    for (let i = 0; i < frames; i++) {
      const sample = <f32>(Math.sin(this.phase) * this.current.gain);
      for (let c = 0; c < channels; c++) {
        out[i * channels + c] = sample;
      }
      this.phase += this.step;
    }
  }
}

/** Main lane — owns Snapshot publish + AudioHandle lifetime. */
export class Humming extends Layout {
  level: Snapshot<Level> = Snapshot.create<Level>();
  hum: AudioHandle? = null;
  elapsed: f64 = 0;

  override init(context: Context): bool {
    this.level.publish(new Level());
    // Keep the handle in a field; collecting it stops the processor.
    this.hum = Audio.start(() => new Hum(), this.level);
    return true;
  }

  override advance(seconds: f64): bool {
    this.elapsed += seconds;
    // Gentle gain pulse so a 2s render-audio capture is not a flat tone.
    const next = new Level();
    next.gain = 0.05 + 0.04 * (0.5 + 0.5 * Math.sin(this.elapsed * 2.2));
    this.level.publish(next);

    const hum = this.hum;
    if (hum != null && hum.failed != null) {
      // Web without threads: failed is set; lesson teaches reading this, not ignoring it.
      return true;
    }
    return true;
  }
}
