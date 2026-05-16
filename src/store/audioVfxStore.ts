/**
 * Audio & VFX Settings Store
 * Persistent user preferences for sound and motion
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { audioManager } from '@/lib/audioManager';

interface AudioVFXSettings {
  // Sound preferences
  soundEnabled: boolean;
  volume: number; // 0-1

  // Motion preferences
  motionEnabled: boolean;
  prefersReducedMotion: boolean; // Detected from system

  // Actions
  toggleSound: () => void;
  toggleMotion: () => void;
  setVolume: (volume: number) => void;
  initializeFromSystem: () => void;
}

export const useAudioVFXStore = create<AudioVFXSettings>()(
  persist(
    (set, get) => ({
      // Defaults
      soundEnabled: false, // Start muted (autoplay policy)
      volume: 0.4,
      motionEnabled: true,
      prefersReducedMotion: false,

      // Toggle sound on/off
      toggleSound: () => {
        const newState = !get().soundEnabled;
        set({ soundEnabled: newState });

        if (newState) {
          audioManager.enable();
        } else {
          audioManager.disable();
        }
      },

      // Toggle motion on/off
      toggleMotion: () => {
        set({ motionEnabled: !get().motionEnabled });
      },

      // Set volume (0-1)
      setVolume: (volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        set({ volume: clampedVolume });
        audioManager.setVolume(clampedVolume);
      },

      // Initialize from system preferences
      initializeFromSystem: () => {
        if (typeof window === 'undefined') return;

        // Check prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        set({
          prefersReducedMotion,
          motionEnabled: !prefersReducedMotion, // Respect system preference
        });

        // Sync audio manager
        if (get().soundEnabled) {
          audioManager.enable();
        }
        audioManager.setVolume(get().volume);
      },
    }),
    {
      name: 'ivory-thai-audio-vfx-settings',
      partialize: (state) => ({
        soundEnabled: state.soundEnabled,
        volume: state.volume,
        motionEnabled: state.motionEnabled,
      }),
    }
  )
);

// Auto-initialize on client-side
if (typeof window !== 'undefined') {
  useAudioVFXStore.getState().initializeFromSystem();
}
