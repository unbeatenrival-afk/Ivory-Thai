'use client';

/**
 * Post-Processing Effects
 * Bloom, tone mapping, and anti-aliasing
 */

import { EffectComposer, Bloom, ToneMapping, SMAA } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

export function Effects() {
  return (
    <EffectComposer>
      {/* Anti-aliasing */}
      <SMAA />

      {/* Subtle bloom for highlights */}
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {/* Tone mapping for better colours */}
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
