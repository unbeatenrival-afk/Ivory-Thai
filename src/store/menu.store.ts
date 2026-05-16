/**
 * Menu Store
 * 3D menu interaction state management
 */

import { create } from 'zustand';
import type { MenuCategory, MenuItem } from '@/schemas/content.types';

interface MenuStore {
  // Selected category in 3D scene
  selectedCategory: MenuCategory | null;
  setSelectedCategory: (category: MenuCategory | null) => void;

  // Selected menu item
  selectedItem: MenuItem | null;
  setSelectedItem: (item: MenuItem | null) => void;

  // Hovered category (for preview)
  hoveredCategory: MenuCategory | null;
  setHoveredCategory: (category: MenuCategory | null) => void;

  // Camera animation state
  cameraAnimating: boolean;
  setCameraAnimating: (animating: boolean) => void;

  // View mode: 'overview' | 'category' | 'item'
  viewMode: 'overview' | 'category' | 'item';
  setViewMode: (mode: 'overview' | 'category' | 'item') => void;

  // Search/filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  activeFilters: {
    spiceLevel?: number;
    dietaryTags?: string[];
    priceRange?: [number, number];
  };
  setActiveFilters: (filters: MenuStore['activeFilters']) => void;
  clearFilters: () => void;

  // Scene readiness
  sceneReady: boolean;
  setSceneReady: (ready: boolean) => void;

  // Reset to overview
  resetToOverview: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),

  hoveredCategory: null,
  setHoveredCategory: (category) => set({ hoveredCategory: category }),

  cameraAnimating: false,
  setCameraAnimating: (animating) => set({ cameraAnimating: animating }),

  viewMode: 'overview',
  setViewMode: (mode) => set({ viewMode: mode }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  activeFilters: {},
  setActiveFilters: (filters) => set({ activeFilters: filters }),
  clearFilters: () => set({ activeFilters: {} }),

  sceneReady: false,
  setSceneReady: (ready) => set({ sceneReady: ready }),

  resetToOverview: () =>
    set({
      selectedCategory: null,
      selectedItem: null,
      hoveredCategory: null,
      viewMode: 'overview',
    }),
}));
