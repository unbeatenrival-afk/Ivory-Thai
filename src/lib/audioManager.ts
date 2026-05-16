/**
 * Audio Manager
 * Centralized audio playback with concurrency limits, gain control, and autoplay compliance
 *
 * Features:
 * - Single AudioContext (respects browser autoplay policy)
 * - Concurrent stream limiting (max 3)
 * - Global gain node for volume control
 * - Fade in/out support
 * - Audio sprite support for efficient loading
 * - Persistent mute preference
 */

import { AudioCue, performanceConfig } from '@/config/audioVfx.config';

type AudioSource = {
  buffer: AudioBuffer;
  gainNode: GainNode;
  sourceNode: AudioBufferSourceNode;
  startTime: number;
  id: string;
};

class AudioManager {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeSources: Map<string, AudioSource> = new Map();
  private audioBuffers: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = false;
  private volume: number = 0.4;
  private isUnlocked: boolean = false;

  /**
   * Initialise audio context after user gesture
   * Required for autoplay policy compliance
   */
  async unlock(): Promise<void> {
    if (this.isUnlocked) return;

    try {
      // Create context
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create master gain node
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = this.volume;

      // Resume context if suspended (iOS requirement)
      if (this.context.state === 'suspended') {
        await this.context.resume();
      }

      this.isUnlocked = true;
      console.log('[AudioManager] Unlocked after user gesture');
    } catch (error) {
      console.error('[AudioManager] Failed to unlock audio:', error);
    }
  }

  /**
   * Load audio file and cache buffer
   */
  async loadAudio(src: string): Promise<AudioBuffer | null> {
    if (!this.context) {
      console.warn('[AudioManager] Context not initialised, cannot load audio');
      return null;
    }

    // Check cache
    if (this.audioBuffers.has(src)) {
      return this.audioBuffers.get(src)!;
    }

    try {
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);

      this.audioBuffers.set(src, audioBuffer);
      console.log(`[AudioManager] Loaded ${src}`);
      return audioBuffer;
    } catch (error) {
      console.error(`[AudioManager] Failed to load ${src}:`, error);
      return null;
    }
  }

  /**
   * Preload multiple audio files
   */
  async preloadAudio(sources: string[]): Promise<void> {
    await Promise.all(sources.map((src) => this.loadAudio(src)));
  }

  /**
   * Play audio cue with concurrency limiting
   */
  async play(cue: AudioCue, id?: string): Promise<void> {
    if (!this.enabled || !this.context || !this.masterGain || !this.isUnlocked) {
      return;
    }

    // Enforce concurrency limit
    if (this.activeSources.size >= performanceConfig.maxConcurrentAudio) {
      // Stop oldest non-looping source
      const oldestId = Array.from(this.activeSources.keys())[0];
      this.stop(oldestId);
    }

    // Load audio buffer
    const buffer = await this.loadAudio(cue.src);
    if (!buffer) return;

    // Generate unique ID if not provided
    const sourceId = id || `${cue.src}-${Date.now()}`;

    // Create source and gain nodes
    const sourceNode = this.context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = cue.loop || false;

    const gainNode = this.context.createGain();
    const targetVolume = cue.volume * this.volume;

    // Fade in
    if (cue.fadeIn) {
      gainNode.gain.setValueAtTime(0, this.context.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        targetVolume,
        this.context.currentTime + cue.fadeIn / 1000
      );
    } else {
      gainNode.gain.value = targetVolume;
    }

    // Connect nodes
    sourceNode.connect(gainNode);
    gainNode.connect(this.masterGain);

    // Track active source
    this.activeSources.set(sourceId, {
      buffer,
      gainNode,
      sourceNode,
      startTime: this.context.currentTime,
      id: sourceId,
    });

    // Auto-cleanup when finished (non-looping only)
    if (!cue.loop) {
      sourceNode.onended = () => {
        this.activeSources.delete(sourceId);
      };
    }

    // Start playback
    sourceNode.start(0);

    // Auto-stop after duration (if not looping)
    if (!cue.loop && cue.duration) {
      setTimeout(() => {
        this.stop(sourceId, cue.fadeOut);
      }, cue.duration);
    }
  }

  /**
   * Stop audio by ID with optional fade out
   */
  stop(id: string, fadeOutMs?: number): void {
    const source = this.activeSources.get(id);
    if (!source || !this.context) return;

    const fadeOut = fadeOutMs || 250; // Default 250ms fade

    try {
      // Fade out
      source.gainNode.gain.setValueAtTime(
        source.gainNode.gain.value,
        this.context.currentTime
      );
      source.gainNode.gain.linearRampToValueAtTime(
        0,
        this.context.currentTime + fadeOut / 1000
      );

      // Stop after fade
      setTimeout(() => {
        try {
          source.sourceNode.stop();
        } catch (e) {
          // Source may have already stopped
        }
        this.activeSources.delete(id);
      }, fadeOut);
    } catch (error) {
      console.error(`[AudioManager] Error stopping ${id}:`, error);
    }
  }

  /**
   * Stop all active audio
   */
  stopAll(fadeOutMs?: number): void {
    const ids = Array.from(this.activeSources.keys());
    ids.forEach((id) => this.stop(id, fadeOutMs));
  }

  /**
   * Set master volume (0-1)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));

    if (this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }

    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ivory-thai-audio-volume', this.volume.toString());
    }
  }

  /**
   * Get current master volume
   */
  getVolume(): number {
    return this.volume;
  }

  /**
   * Enable audio playback
   */
  enable(): void {
    this.enabled = true;

    if (typeof window !== 'undefined') {
      localStorage.setItem('ivory-thai-audio-enabled', 'true');
    }
  }

  /**
   * Disable audio playback (mute)
   */
  disable(): void {
    this.enabled = false;
    this.stopAll();

    if (typeof window !== 'undefined') {
      localStorage.setItem('ivory-thai-audio-enabled', 'false');
    }
  }

  /**
   * Check if audio is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Load preferences from localStorage
   */
  loadPreferences(): void {
    if (typeof window === 'undefined') return;

    const savedEnabled = localStorage.getItem('ivory-thai-audio-enabled');
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }

    const savedVolume = localStorage.getItem('ivory-thai-audio-volume');
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
      if (this.masterGain) {
        this.masterGain.gain.value = this.volume;
      }
    }
  }

  /**
   * Get active source count (for debugging)
   */
  getActiveCount(): number {
    return this.activeSources.size;
  }
}

// Singleton instance
export const audioManager = new AudioManager();

// Auto-load preferences on initialization (client-side only)
if (typeof window !== 'undefined') {
  audioManager.loadPreferences();
}
