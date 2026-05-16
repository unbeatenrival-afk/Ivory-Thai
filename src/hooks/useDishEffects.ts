/**
 * useDishEffects Hook
 * Simplified hook for triggering dish-specific audio and VFX
 */

import { useCallback, useEffect, useRef, useMemo } from 'react';
import { getDishEffects, SpiceLevel, DietaryTag, CategorySlug, ingredientEffects, EffectConfig } from '@/config/audioVfx.config';
import { audioManager } from '@/lib/audioManager';
import { vfxManager } from '@/lib/vfxEngine';
import { useAudioVFXStore } from '@/store/audioVfxStore';
import { enhanceDish } from '@/lib/dishEnhancer';

interface UseDishEffectsParams {
  spiceLevel: SpiceLevel;
  dietaryTags: DietaryTag[];
  categorySlug: CategorySlug;
  dishId: string;
  dishName?: string;
  dishDescription?: string;
}

export function useDishEffects({
  spiceLevel,
  dietaryTags,
  categorySlug,
  dishId,
  dishName = '',
  dishDescription = '',
}: UseDishEffectsParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loopAudioId = useRef<string | null>(null);

  const soundEnabled = useAudioVFXStore((state) => state.soundEnabled);
  const motionEnabled = useAudioVFXStore((state) => state.motionEnabled);

  // Get base effects config
  const baseEffects = getDishEffects(spiceLevel, dietaryTags, categorySlug);

  // Get ingredient-based effects
  const ingredientEnhancements = useMemo(() => {
    if (!dishName && !dishDescription) return [];
    const enhancement = enhanceDish(dishName, dishDescription);
    return enhancement.effects;
  }, [dishName, dishDescription]);

  // Merge ingredient effects with base effects
  const effects = useMemo(() => {
    const merged: EffectConfig = {
      audio: { ...baseEffects.audio },
      vfx: { ...baseEffects.vfx },
    };

    // Add ingredient-based VFX
    ingredientEnhancements.forEach((ingredientEffect) => {
      const effectConfig = ingredientEffects[ingredientEffect];
      if (effectConfig) {
        // Merge VFX (combine arrays)
        if (effectConfig.vfx.active) {
          if (!merged.vfx.active) merged.vfx.active = [];
          merged.vfx.active = [...merged.vfx.active, ...effectConfig.vfx.active];
        }
        // Merge audio (prefer existing)
        if (effectConfig.audio.loop && !merged.audio.loop) {
          merged.audio.loop = effectConfig.audio.loop;
        }
      }
    });

    return merged;
  }, [baseEffects, ingredientEnhancements]);

  /**
   * Play hover sound and show hover VFX
   */
  const onHover = useCallback(() => {
    if (!soundEnabled || !effects.audio.hover) return;

    audioManager.play(effects.audio.hover, `${dishId}-hover`);
  }, [soundEnabled, effects.audio.hover, dishId]);

  /**
   * Play select sound, start VFX, and loop audio
   */
  const onSelect = useCallback(() => {
    // Play one-shot select sound
    if (soundEnabled && effects.audio.select) {
      audioManager.play(effects.audio.select, `${dishId}-select`);
    }

    // Start loop audio
    if (soundEnabled && effects.audio.loop) {
      loopAudioId.current = `${dishId}-loop`;
      audioManager.play(effects.audio.loop, loopAudioId.current);
    }

    // Start VFX
    if (motionEnabled && effects.vfx.active && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      effects.vfx.active.forEach((vfxConfig, index) => {
        vfxManager.start(`${dishId}-vfx-${index}`, vfxConfig, x, y, containerRef.current!);
      });
    }
  }, [soundEnabled, motionEnabled, effects, dishId, spiceLevel, dietaryTags]);

  /**
   * Stop all effects on deselect
   */
  const onDeselect = useCallback(() => {
    // Stop loop audio
    if (loopAudioId.current) {
      audioManager.stop(loopAudioId.current, 250);
      loopAudioId.current = null;
    }

    // Stop VFX
    if (effects.vfx.active) {
      effects.vfx.active.forEach((_, index) => {
        vfxManager.stop(`${dishId}-vfx-${index}`);
      });
    }
  }, [effects.vfx.active, dishId]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      onDeselect();
    };
  }, [onDeselect]);

  return {
    containerRef,
    onHover,
    onSelect,
    onDeselect,
  };
}
