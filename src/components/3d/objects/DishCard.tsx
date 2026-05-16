'use client';

/**
 * 3D Dish Card
 * Individual menu item display (for future use in category view)
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { MenuItem } from '@/schemas/content.types';
import { getSpiceLevelEmoji } from '@/lib/content';

interface DishCardProps {
  item: MenuItem;
  position: [number, number, number];
  rotation?: [number, number, number];
  onClick?: () => void;
}

export function DishCard({
  item,
  position,
  rotation = [0, 0, 0],
  onClick,
}: DishCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  // Animate on hover
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      );
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group position={position} rotation={rotation}>
      {/* Card base */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={onClick}
        castShadow
      >
        <RoundedBox args={[1.5, 2, 0.15]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={hovered ? '#2a2a2a' : '#1f1f1f'}
            metalness={0.5}
            roughness={0.4}
          />
        </RoundedBox>
      </mesh>

      {/* Dish name */}
      <Text
        position={[0, 0.7, 0.1]}
        fontSize={0.15}
        maxWidth={1.3}
        lineHeight={1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
      >
        {item.name}
      </Text>

      {/* Price */}
      <Text
        position={[0, 0.4, 0.1]}
        fontSize={0.2}
        color="#ff6b35"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {item.price}
      </Text>

      {/* Spice level */}
      {item.spiceLevel && item.spiceLevel > 0 && (
        <Text
          position={[0, -0.6, 0.1]}
          fontSize={0.12}
          anchorX="center"
          anchorY="middle"
        >
          {getSpiceLevelEmoji(item.spiceLevel)}
        </Text>
      )}

      {/* Dietary tags */}
      {item.dietaryTags.length > 0 && (
        <Text
          position={[0, -0.8, 0.1]}
          fontSize={0.08}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {item.dietaryTags.join(' • ')}
        </Text>
      )}

      {/* Hover details */}
      {hovered && (
        <Html
          position={[0, 1.2, 0]}
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div className="bg-black/95 text-white p-3 rounded-lg max-w-[200px]">
            <p className="text-xs leading-relaxed">{item.description}</p>
            {item.allergens.length > 0 && (
              <p className="text-[10px] text-orange-400 mt-2">
                Contains: {item.allergens.join(', ')}
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}
