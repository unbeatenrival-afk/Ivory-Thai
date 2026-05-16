'use client';

/**
 * 2D Menu Page (Temporary - until R3F supports React 19)
 * Full menu with filtering and search
 */

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategories, getItemsByCategory, getSpiceLevelEmoji } from '@/lib/content';
import { useDishEffects } from '@/hooks/useDishEffects';
import { AudioVFXControls } from '@/components/ui/AudioVFXControls';
import { enhanceDish, getPrimaryEmoji } from '@/lib/dishEnhancer';
import type { CategorySlug, DietaryTag } from '@/config/audioVfx.config';

interface MenuItem {
  slug: string;
  name: string;
  description: string;
  price: string;
  spiceLevel: number | null;
  dietaryTags: string[];
  allergens: string[];
  categorySlug: string;
}

export default function MenuPage() {
  const categories = useMemo(() => getCategories(), []);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);

  const selectedCategory = categories.find(c => c.slug === selectedCategorySlug);
  const items = selectedCategory ? getItemsByCategory(selectedCategory.slug) : [];

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  return (
    <div className="min-h-screen bg-hero-dark">
      {/* Floating orbs background - premium palette */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[
          { color: 'rgba(212, 175, 55, 0.06)', size: 500, left: '15%', top: '10%' },
          { color: 'rgba(42, 157, 95, 0.05)', size: 600, left: '65%', top: '30%' },
          { color: 'rgba(159, 90, 184, 0.04)', size: 550, left: '40%', top: '60%' },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${orb.color}, transparent)`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: orb.left,
              top: orb.top,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-charcoal-900/95 border-b border-charcoal-700/50 elevation-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-charcoal-200 hover:text-jade-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>

            <h1 className="text-2xl font-bold text-brand-gradient">Menu</h1>

            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Selection */}
        {!selectedCategory ? (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-charcoal-50 mb-4">Our Menu</h2>
              <p className="text-xl text-charcoal-300">Select a category to explore</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <motion.button
                  key={category.slug}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedCategorySlug(category.slug)}
                  whileHover={{ scale: 1.03, rotateY: 3, rotateX: 3 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative aspect-square rounded-3xl overflow-hidden backdrop-blur-xl bg-charcoal-800/40 border border-charcoal-600/30 hover:border-jade-500/50 transition-all p-6 text-left elevation-md perspective-1000"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <span className="text-4xl">{getCategoryIcon(category.slug)}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal-50 group-hover:text-gold-400 transition-colors mb-1">
                        {category.name}
                      </h3>
                      <p className="text-xs text-charcoal-400 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Premium gold glow on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08), transparent 70%)',
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          /* Menu Items View */
          <div>
            {/* Category Header */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setSelectedCategorySlug(null);
                  setSearchQuery('');
                }}
                className="flex items-center gap-2 text-charcoal-400 hover:text-jade-400 transition-colors mb-4"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>All Categories</span>
              </button>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-4xl font-bold text-charcoal-50 mb-2">{selectedCategory.name}</h2>
                  <p className="text-charcoal-300">{selectedCategory.description}</p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes..."
                    className="w-full px-4 py-3 bg-charcoal-800/30 border border-charcoal-600/30 rounded-full text-charcoal-100 placeholder-charcoal-500 focus:outline-none focus:border-jade-500 focus:bg-charcoal-800/50 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-500 hover:text-charcoal-200"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.slug}
                      layout
                      initial={{ opacity: 0, scale: 0.95, rotateX: -5 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                      exit={{ opacity: 0, scale: 0.95, rotateX: 5 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.01, rotateY: 1, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDish(item as MenuItem)}
                      className="group relative backdrop-blur-xl bg-charcoal-800/40 border border-charcoal-600/30 rounded-3xl p-6 hover:border-jade-500/40 transition-all elevation-md perspective-1000 cursor-pointer"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Subtle gold glow on hover */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at top right, rgba(212, 175, 55, 0.06), transparent 60%)',
                        }}
                      />

                      {/* Item Details */}
                      <div className="relative z-10 mb-4">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="text-xl font-semibold text-charcoal-50 group-hover:text-gold-400 transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-2xl font-bold text-gold-500 whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-charcoal-300 text-sm leading-relaxed mb-3">
                            {item.description}
                          </p>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {item.spiceLevel && item.spiceLevel > 0 && (
                            <span className="px-2 py-1 bg-chilli-950/50 border border-chilli-700/30 text-chilli-300 text-xs rounded-full">
                              {getSpiceLevelEmoji(item.spiceLevel)} Spicy
                            </span>
                          )}
                          {item.dietaryTags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-jade-950/50 border border-jade-700/30 text-jade-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Allergens */}
                        {item.allergens.length > 0 && (
                          <p className="text-xs text-gold-400/70 mt-3">
                            Contains: {item.allergens.join(', ')}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-charcoal-500 text-lg">No dishes found matching "{searchQuery}"</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Dish Details Modal */}
      <AnimatePresence>
        {selectedDish && (
          <DishDetailsModal
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </AnimatePresence>

      {/* Audio/VFX Controls */}
      <AudioVFXControls />
    </div>
  );
}

/**
 * Dish Details Modal with Audio/VFX
 * Opens when clicking on a dish, triggers sound effects and particles
 */
function DishDetailsModal({ dish, onClose }: { dish: MenuItem; onClose: () => void }) {
  const { containerRef, onSelect, onDeselect } = useDishEffects({
    spiceLevel: dish.spiceLevel as any,
    dietaryTags: dish.dietaryTags as DietaryTag[],
    categorySlug: dish.categorySlug as CategorySlug,
    dishId: dish.slug,
    dishName: dish.name,
    dishDescription: dish.description,
  });

  // Get enhanced dish info (emojis and description)
  const enhancement = useMemo(
    () => enhanceDish(dish.name, dish.description),
    [dish.name, dish.description]
  );

  const primaryEmoji = useMemo(
    () => getPrimaryEmoji(dish.name, dish.description),
    [dish.name, dish.description]
  );

  // Trigger effects on mount
  React.useEffect(() => {
    onSelect();
    return () => {
      onDeselect();
    };
  }, [onSelect, onDeselect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        ref={containerRef}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-charcoal-800/95 backdrop-blur-2xl border border-charcoal-600/50 rounded-3xl p-8 elevation-lg overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-charcoal-700/50 hover:bg-chilli-600 text-charcoal-200 hover:text-white transition-all z-20"
          aria-label="Close dish details"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{primaryEmoji}</span>
              <h2 className="text-4xl font-bold text-charcoal-50 flex-1">{dish.name}</h2>
            </div>
            {enhancement.emojis.length > 1 && (
              <div className="flex gap-2 mb-3">
                {enhancement.emojis.slice(0, 8).map((emoji, idx) => (
                  <span key={idx} className="text-2xl">
                    {emoji}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-gold-500">{dish.price}</span>
              {dish.spiceLevel && dish.spiceLevel > 0 && (
                <span className="px-3 py-1.5 bg-chilli-950/50 border border-chilli-600/30 text-chilli-300 text-sm rounded-full">
                  {getSpiceLevelEmoji(dish.spiceLevel)} Spice Level {dish.spiceLevel}
                </span>
              )}
              {dish.dietaryTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-jade-950/50 border border-jade-600/30 text-jade-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          {enhancement.enhancedDescription && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-charcoal-400 mb-2 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-lg text-charcoal-200 leading-relaxed">{enhancement.enhancedDescription}</p>
            </div>
          )}

          {/* Allergens */}
          {dish.allergens.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-charcoal-400 mb-2 uppercase tracking-wider">
                Allergens
              </h3>
              <p className="text-charcoal-300">{dish.allergens.join(', ')}</p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="w-full px-8 py-4 bg-jade-500 hover:bg-jade-600 text-white font-bold text-lg rounded-full transition-all elevation-md hover:elevation-lg">
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getCategoryIcon(slug: string): string {
  const icons: Record<string, string> = {
    'ivory-special': '⭐',
    'entree': '🥟',
    'salad': '🥗',
    'bbq': '🍖',
    'soup': '🍜',
    'stir-fry': '🍲',
    'curry': '🍛',
    'noodle-rice': '🍝',
    'side-dish': '🥢',
    'dessert': '🍮',
  };
  return icons[slug] || '🍽️';
}
