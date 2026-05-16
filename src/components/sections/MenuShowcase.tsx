'use client';

/**
 * Menu Showcase
 * Teaser section showing menu categories with CTA to 3D menu
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { getCategories } from '@/lib/content';
import { kebabToTitle } from '@/lib/format';

export function MenuShowcase() {
  const categories = getCategories();

  return (
    <section className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-centre mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Our Menu
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            Explore our authentic Thai dishes with search and filtering
          </motion.p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {categories.slice(0, 10).map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 hover:border-orange-500/50 transition-all"
            >
              <div className="absolute inset-0 flex flex-col items-centre justify-centre p-6 text-centre">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(category.slug)}
                </span>
                <h3 className="text-sm font-semibold text-white group-hover:text-orange-400 transition-colours">
                  {category.name}
                </h3>
                <p className="text-xs text-white/50 mt-2 line-clamp-2">
                  {category.description}
                </p>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* CTA to 3D menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-centre"
        >
          <Link
            href="/menu"
            className="inline-flex items-centre gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-orange-500/50"
          >
            <span>View Full Menu</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <p className="text-sm text-white/50 mt-4">
            Search functionality • Filter by category • Dietary information
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Get category icon/emoji
 */
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
