'use client';

/**
 * 3D Category Card
 * Interactive card displaying menu category
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { MenuCategory } from '@/schemas/content.types';
import { useMenuStore } from '@/store/menu.store';

interface CategoryCardProps {
  category: MenuCategory;
  position: [number, number, number];
  rotation?: [number, number, number];
  isSelected?: boolean;
  onClick?: () => void;
}

export function CategoryCard({
  category,
  position,
  rotation = [0, 0, 0],
  isSelected = false,
  onClick,
}: CategoryCardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const setHoveredCategory = useMenuStore((s) => s.setHoveredCategory);

  // Animate on hover and selection
  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = isSelected ? 1.2 : hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Gentle floating animation when selected
      if (isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    setHoveredCategory(category);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredCategory(null);
    document.body.style.cursor = 'auto';
  };

  return (
    <Float
      speed={isSelected ? 2 : 1}
      rotationIntensity={isSelected ? 0.5 : 0.2}
      floatIntensity={isSelected ? 0.5 : 0.3}
    >
      <group position={position} rotation={rotation}>
        {/* Card base */}
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onClick={onClick}
          castShadow
        >
          <RoundedBox args={[2, 2.5, 0.2]} radius={0.1} smoothness={4}>
            <meshStandardMaterial
              color={isSelected ? '#ff6b35' : hovered ? '#ff8c61' : '#1a1a1a'}
              metalness={0.6}
              roughness={0.3}
              emissive={isSelected ? '#ff4500' : '#000000'}
              emissiveIntensity={isSelected ? 0.2 : 0}
            />
          </RoundedBox>
        </mesh>

        {/* Category name */}
        <Text
          position={[0, 0.5, 0.15]}
          fontSize={0.25}
          maxWidth={1.8}
          lineHeight={1.2}
          textAlign="center"
          font="/fonts/inter-bold.woff"
          anchorX="center"
          anchorY="middle"
          color={isSelected || hovered ? '#ffffff' : '#e0e0e0'}
        >
          {category.name}
        </Text>

        {/* Category description */}
        <Text
          position={[0, -0.2, 0.15]}
          fontSize={0.12}
          maxWidth={1.6}
          lineHeight={1.1}
          textAlign="center"
          font="/fonts/inter-regular.woff"
          anchorX="center"
          anchorY="middle"
          color="#999999"
        >
          {category.description}
        </Text>

        {/* Sort order indicator */}
        <Text
          position={[0, -0.9, 0.15]}
          fontSize={0.15}
          color="#666666"
          anchorX="center"
          anchorY="middle"
        >
          {String(category.sort_order + 1).padStart(2, '0')}
        </Text>

        {/* Interactive hint when hovered */}
        {hovered && !isSelected && (
          <Html
            position={[0, 1.5, 0]}
            center
            distanceFactor={8}
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-black/90 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap">
              Click to explore
            </div>
          </Html>
        )}

        {/* Selected indicator */}
        {isSelected && (
          <>
            {/* Glow ring */}
            <mesh position={[0, 0, -0.05]} rotation={[0, 0, 0]}>
              <torusGeometry args={[1.3, 0.03, 16, 100]} />
              <meshStandardMaterial
                color="#ff6b35"
                emissive="#ff4500"
                emissiveIntensity={0.8}
                toneMapped={false}
              />
            </mesh>

            {/* Navigation hint */}
            <Html
              position={[0, -1.5, 0]}
              center
              distanceFactor={8}
              style={{ pointerEvents: 'none' }}
            >
              <div className="bg-orange-500/90 text-white px-4 py-2 rounded-lg text-sm">
                <div className="flex items-centre gap-2">
                  <span>← →</span>
                  <span>Navigate</span>
                  <span className="mx-2">|</span>
                  <span>ESC</span>
                  <span>Back</span>
                </div>
              </div>
            </Html>
          </>
        )}
      </group>
    </Float>
  );
}
