'use client';

/**
 * Scene Lighting
 * Ambient and directional lights with soft shadows
 */

export function Lights() {
  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.4} />

      {/* Key light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow={false}
        color="#ffffff"
      />

      {/* Fill light */}
      <directionalLight
        position={[-5, 4, -5]}
        intensity={0.6}
        color="#ffeedd"
      />

      {/* Rim light from behind */}
      <directionalLight
        position={[0, 2, -8]}
        intensity={0.4}
        color="#ffaa88"
      />

      {/* Soft point light from above */}
      <pointLight
        position={[0, 10, 0]}
        intensity={0.5}
        distance={20}
        decay={2}
        color="#fff5ee"
      />
    </>
  );
}
