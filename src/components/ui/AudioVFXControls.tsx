/**
 * Audio & VFX Controls
 * Global toggles for sound and motion preferences
 *
 * Features:
 * - Sound toggle (mute/unmute)
 * - Motion toggle (enable/disable particles)
 * - Volume slider
 * - Persisted preferences
 * - Accessible labels and keyboard control
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioVFXStore } from '@/store/audioVfxStore';
import { audioManager } from '@/lib/audioManager';

export function AudioVFXControls() {
  const [isOpen, setIsOpen] = useState(false);

  const soundEnabled = useAudioVFXStore((state) => state.soundEnabled);
  const motionEnabled = useAudioVFXStore((state) => state.motionEnabled);
  const volume = useAudioVFXStore((state) => state.volume);
  const toggleSound = useAudioVFXStore((state) => state.toggleSound);
  const toggleMotion = useAudioVFXStore((state) => state.toggleMotion);
  const setVolume = useAudioVFXStore((state) => state.setVolume);

  // Unlock audio context on first interaction
  const handleSoundToggle = async () => {
    if (!soundEnabled && !audioManager['isUnlocked']) {
      await audioManager.unlock();
    }
    toggleSound();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-charcoal-800/90 backdrop-blur-xl border border-charcoal-600/50 shadow-premium-lg flex items-center justify-center text-charcoal-100 hover:bg-charcoal-700/90 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Audio and visual effects settings"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      </motion.button>

      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-72 bg-charcoal-800/95 backdrop-blur-xl border border-charcoal-600/50 rounded-3xl p-6 shadow-premium-lg"
          >
            <h3 className="text-lg font-semibold text-charcoal-50 mb-4">Settings</h3>

            <div className="space-y-4">
              {/* Sound toggle */}
              <div className="flex items-center justify-between">
                <label htmlFor="sound-toggle" className="text-sm text-charcoal-200 cursor-pointer">
                  Sound
                </label>
                <button
                  id="sound-toggle"
                  role="switch"
                  aria-checked={soundEnabled}
                  onClick={handleSoundToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-charcoal-800 ${
                    soundEnabled ? 'bg-jade-500' : 'bg-charcoal-600'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Volume slider */}
              <div className={soundEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}>
                <label htmlFor="volume-slider" className="text-sm text-charcoal-200 mb-2 block">
                  Volume: {Math.round(volume * 100)}%
                </label>
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={volume * 100}
                  onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                  disabled={!soundEnabled}
                  className="w-full h-2 bg-charcoal-600 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-charcoal-800 slider"
                  style={{
                    background: soundEnabled
                      ? `linear-gradient(to right, #2A9D5F 0%, #2A9D5F ${volume * 100}%, #57534E ${volume * 100}%, #57534E 100%)`
                      : '#57534E',
                  }}
                />
              </div>

              {/* Motion toggle */}
              <div className="flex items-center justify-between pt-2">
                <label htmlFor="motion-toggle" className="text-sm text-charcoal-200 cursor-pointer">
                  Visual Effects
                </label>
                <button
                  id="motion-toggle"
                  role="switch"
                  aria-checked={motionEnabled}
                  onClick={toggleMotion}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2 focus:ring-offset-charcoal-800 ${
                    motionEnabled ? 'bg-jade-500' : 'bg-charcoal-600'
                  }`}
                >
                  <motion.span
                    layout
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      motionEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Help text */}
              <p className="text-xs text-charcoal-400 pt-2 border-t border-charcoal-700">
                Control audio cues and visual effects for menu items. Settings are saved automatically.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
