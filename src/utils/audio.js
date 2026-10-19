/**
 * Gentle Web Audio Synthesizer for Whimsical Chimes
 * Safe, zero-asset, procedural garden chimes.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Respect user by default
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.init();
      this.playChime(659.25, 'sine', 0.15); // gentle high E confirmation chime
    }
    return this.isMuted;
  }

  playChime(frequency = 523.25, type = 'sine', duration = 0.35) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

      // Gentle bell envelope
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio is an optional enhancement; silently ignore if blocked by browser policy
    }
  }

  playEmoteTone(frequency, type = 'sine') {
    this.playChime(frequency, type, 0.45);
  }
}

export const soundEngine = new SoundEngine();
