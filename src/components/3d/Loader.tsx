'use client';

/**
 * 3D Scene Loader
 * Fallback loader for Suspense
 */

import { Html, useProgress } from '@react-three/drei';

export function Loader() {
  const { progress, active } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-centre gap-4 p-8 bg-black/80 backdrop-blur-sm rounded-lg">
        <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-sm font-medium">
          {active ? 'Loading experience...' : 'Ready'}
        </p>
      </div>
    </Html>
  );
}
