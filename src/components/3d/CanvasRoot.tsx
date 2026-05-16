'use client';

/**
 * Canvas Root Component
 * Main React Three Fibre canvas with performance optimisations
 */

import { Canvas } from '@react-three/fiber';
import { Preload, PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { Loader } from './Loader';

interface CanvasRootProps {
  children: React.ReactNode;
  className?: string;
}

export function CanvasRoot({ children, className = '' }: CanvasRootProps) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, dpr]}
        camera={{
          position: [0, 2, 8],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        shadows={false} // Disable shadows for performance - enable if needed
        flat={false}
        linear={false}
      >
        {/* Performance monitoring - reduces DPR if FPS drops */}
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </PerformanceMonitor>

        {/* Preload all assets */}
        <Preload all />
      </Canvas>
    </div>
  );
}
