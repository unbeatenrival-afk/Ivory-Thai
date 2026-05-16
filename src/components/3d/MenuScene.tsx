'use client';

/**
 * 3D Menu Scene
 * Interactive circular layout of menu categories
 * Keyboard navigation: Arrow keys to rotate, Enter to select, Esc to go back
 */

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useMenuStore } from '@/store/menu.store';
import { getCategories } from '@/lib/content';
import { Lights } from './objects/Lights';
import { Effects } from './objects/Effects';
import { CategoryCard } from './objects/CategoryCard';

export function MenuScene() {
  const categories = useMemo(() => getCategories(), []);
  const selectedCategory = useMenuStore((s) => s.selectedCategory);
  const setSelectedCategory = useMenuStore((s) => s.setSelectedCategory);
  const setViewMode = useMenuStore((s) => s.setViewMode);
  const setSceneReady = useMenuStore((s) => s.setSceneReady);

  const { camera } = useThree();
  const controlsRef = useRef<any>();

  // Circular layout parameters
  const radius = 5;
  const centerY = 0;

  // Calculate positions for categories in a circle
  const categoryPositions = useMemo(() => {
    return categories.map((category, index) => {
      const angle = (index / categories.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      return {
        category,
        position: [x, centerY, z] as [number, number, number],
        angle,
      };
    });
  }, [categories, radius]);

  // Animate camera to selected category
  useEffect(() => {
    if (selectedCategory) {
      const categoryPos = categoryPositions.find(
        (cp) => cp.category.slug === selectedCategory.slug
      );

      if (categoryPos) {
        const [x, y, z] = categoryPos.position;

        // Move camera closer to category
        const targetPosition = new THREE.Vector3(
          x * 0.5,
          y + 1,
          z * 0.5 + 3
        );

        // Smooth camera animation
        const startPosition = camera.position.clone();
        const startTime = Date.now();
        const duration = 1000; // 1 second

        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);

          // Easing function (ease-out-cubic)
          const eased = 1 - Math.pow(1 - progress, 3);

          camera.position.lerpVectors(startPosition, targetPosition, eased);
          camera.lookAt(x, y, z);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setViewMode('category');
          }
        };

        animate();
      }
    } else {
      // Reset to overview
      const targetPosition = new THREE.Vector3(0, 2, 8);
      const startPosition = camera.position.clone();
      const startTime = Date.now();
      const duration = 800;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        camera.position.lerpVectors(startPosition, targetPosition, eased);
        camera.lookAt(0, 0, 0);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setViewMode('overview');
        }
      };

      animate();
    }
  }, [selectedCategory, categoryPositions, camera, setViewMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCategory) {
        // In overview mode
        if (e.key === 'Enter' && categories.length > 0) {
          setSelectedCategory(categories[0]);
        }
      } else {
        // In category view
        const currentIndex = categories.findIndex(
          (c) => c.slug === selectedCategory.slug
        );

        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          // Previous category
          const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
          setSelectedCategory(categories[prevIndex]);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          // Next category
          const nextIndex = (currentIndex + 1) % categories.length;
          setSelectedCategory(categories[nextIndex]);
        } else if (e.key === 'Escape') {
          // Back to overview
          setSelectedCategory(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, categories, setSelectedCategory]);

  // Mark scene as ready
  useEffect(() => {
    setSceneReady(true);
  }, [setSceneReady]);

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

      {/* Orbit controls - disable when category is selected */}
      <OrbitControls
        ref={controlsRef}
        enabled={!selectedCategory}
        enablePan={false}
        enableZoom={true}
        minDistance={5}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0, 0]}
      />

      {/* Lighting */}
      <Lights />

      {/* Category cards in circular layout */}
      {categoryPositions.map(({ category, position, angle }) => (
        <CategoryCard
          key={category.slug}
          category={category}
          position={position}
          rotation={[0, -angle + Math.PI / 2, 0]}
          isSelected={selectedCategory?.slug === category.slug}
          onClick={() => setSelectedCategory(category)}
        />
      ))}

      {/* Centre platform/pedestal */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[4, 4.5, 0.2, 32]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Post-processing effects */}
      <Effects />

      {/* Background colour */}
      <color attach="background" args={['#0a0a0a']} />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 10, 30]} />
    </>
  );
}
