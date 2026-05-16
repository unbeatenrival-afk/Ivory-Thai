'use client';

/**
 * 3D Menu Page
 * Full-screen immersive menu experience
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { CanvasRoot } from '@/components/3d/CanvasRoot';
import { MenuScene } from '@/components/3d/MenuScene';
import { useMenuStore } from '@/store/menu.store';
import { useUIStore } from '@/store/ui.store';
import { getItemsByCategory } from '@/lib/content';

export default function MenuPage() {
  const selectedCategory = useMenuStore((s) => s.selectedCategory);
  const selectedItem = useMenuStore((s) => s.selectedItem);
  const setSelectedCategory = useMenuStore((s) => s.setSelectedCategory);
  const viewMode = useMenuStore((s) => s.viewMode);
  const sceneReady = useMenuStore((s) => s.sceneReady);

  const items = selectedCategory ? getItemsByCategory(selectedCategory.slug) : [];

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      setSelectedCategory(null);
    };
  }, [setSelectedCategory]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Canvas */}
      <CanvasRoot className="absolute inset-0">
        <MenuScene />
      </CanvasRoot>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-auto">
          {/* Back button */}
          <Link
            href="/"
            className="flex items-centre gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-black/90 transition-colours"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Home</span>
          </Link>

          {/* Title */}
          <div className="text-centre">
            <h1 className="text-white text-2xl font-bold">3D Menu</h1>
            {selectedCategory && (
              <p className="text-white/60 text-sm mt-1">{selectedCategory.name}</p>
            )}
          </div>

          {/* Placeholder for balance */}
          <div className="w-24" />
        </div>

        {/* Loading indicator */}
        {!sceneReady && (
          <div className="absolute inset-0 flex items-centre justify-centre bg-black/50 backdrop-blur-sm">
            <div className="text-white text-lg">Loading 3D experience...</div>
          </div>
        )}

        {/* Instructions */}
        {sceneReady && !selectedCategory && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
            <div className="bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4 text-centre">
              <p className="text-white/80 text-sm mb-3">
                Click on a category to explore
              </p>
              <div className="flex items-centre justify-centre gap-6 text-white/60 text-xs">
                <div className="flex items-centre gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">Click</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-centre gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">Drag</kbd>
                  <span>Rotate</span>
                </div>
                <div className="flex items-centre gap-2">
                  <kbd className="px-2 py-1 bg-white/10 rounded">Scroll</kbd>
                  <span>Zoom</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category items list */}
        {selectedCategory && items.length > 0 && (
          <div className="absolute right-6 top-24 bottom-6 w-96 max-w-[90vw] pointer-events-auto">
            <div className="h-full bg-black/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 overflow-y-auto">
              <h2 className="text-white text-2xl font-bold mb-6">{selectedCategory.name}</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.slug}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colours cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold">{item.name}</h3>
                      <span className="text-orange-400 font-bold text-lg whitespace-nowrap ml-4">
                        {item.price}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-white/60 text-sm mb-2">{item.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {item.spiceLevel && item.spiceLevel > 0 && (
                        <span className="text-xs">
                          {'🌶️'.repeat(item.spiceLevel)}
                        </span>
                      )}
                      {item.dietaryTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.allergens.length > 0 && (
                        <span className="text-xs text-orange-400">
                          Contains: {item.allergens.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
