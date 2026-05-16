/**
 * useMeasureFPS Hook
 * Measure and monitor FPS for performance tracking
 */

'use client';

import { useState, useEffect, useRef } from 'react';

export function useMeasureFPS(sampleSize: number = 60): number {
  const [fps, setFps] = useState(60);
  const frameTimesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef(performance.now());
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const measureFrame = () => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;

      frameTimesRef.current.push(delta);

      if (frameTimesRef.current.length > sampleSize) {
        frameTimesRef.current.shift();
      }

      if (frameTimesRef.current.length === sampleSize) {
        const avgFrameTime = frameTimesRef.current.reduce((a, b) => a + b, 0) / sampleSize;
        const currentFps = 1000 / avgFrameTime;
        setFps(Math.round(currentFps));
      }

      lastFrameTimeRef.current = now;
      rafRef.current = requestAnimationFrame(measureFrame);
    };

    rafRef.current = requestAnimationFrame(measureFrame);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [sampleSize]);

  return fps;
}
