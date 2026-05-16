'use client';

/**
 * Enhanced Menu Showcase
 * 3D holographic cards with perspective transforms
 */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { getCategories } from '@/lib/content';
import { Carousel3D } from '../ui/Carousel3D';

export function MenuShowcaseEnhanced() {
  const categories = getCategories();

  // Featured items for carousel
  const featured = [
    {
      id: '1',
      title: 'Ivory Special',
      subtitle: 'Chef\'s Signature Dishes',
      gradient: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
    },
    {
      id: '2',
      title: 'Thai Classics',
      subtitle: 'Authentic Traditional Flavors',
      gradient: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
    },
    {
      id: '3',
      title: 'Spicy Delights',
      subtitle: 'For The Brave Souls',
      gradient: 'bg-gradient-to-br from-red-500 via-pink-500 to-purple-500',
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated golden background elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-amber-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl md:text-8xl font-bold mb-6">
              <span
                className="bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto', textShadow: '0 2px 30px rgba(255, 153, 51, 0.2)' }}
              >
                Our Menu
              </span>
            </h2>
            <p className="text-2xl text-amber-900 max-w-3xl mx-auto font-medium">
              Explore authentic Thai dishes crafted with passion
            </p>
          </motion.div>
        </div>

        {/* 3D Carousel */}
        <div className="mb-20">
          <Carousel3D items={featured} />
        </div>

        {/* Category grid with 3D cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {categories.slice(0, 10).map((category, index) => (
            <HolographicCard key={category.slug} category={category} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/menu">
            <motion.button
              className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white text-xl font-bold rounded-full overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.05, rotateX: 10, boxShadow: '0 20px 60px rgba(255, 153, 51, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View Full Menu
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-orange-600 to-amber-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </Link>
          <p className="text-sm text-amber-700 mt-6 font-medium">
            100+ dishes • Dietary options • Spice levels indicated
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Holographic 3D Card Component
 */
function HolographicCard({ category, index }: { category: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="perspective-1000"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative group aspect-square cursor-pointer"
      >
        {/* Card container */}
        <div className="relative w-full h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/90 to-amber-50/80 border-2 border-amber-300/60 shadow-2xl">
          {/* Golden gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'linear-gradient(45deg, #FFC107, #FFD54F, #FF9800, #FFEB3B, #FFA726)',
              backgroundSize: '400% 400%',
            }}
            animate={
              isHovered
                ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-[2px] rounded-3xl bg-gradient-to-br from-amber-50/95 to-orange-50/95 backdrop-blur-xl" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            <motion.div
              className="text-6xl mb-4"
              animate={
                isHovered
                  ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {icons[category.slug] || '🍽️'}
            </motion.div>

            <h3 className="text-lg font-bold text-amber-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-amber-700 group-hover:bg-clip-text transition-all">
              {category.name}
            </h3>

            <p className="text-xs text-amber-800 line-clamp-2">{category.description}</p>
          </div>

          {/* Golden shine effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                'linear-gradient(45deg, transparent 30%, rgba(255, 193, 7, 0.3) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
            animate={
              isHovered
                ? {
                    backgroundPosition: ['-200% -200%', '200% 200%'],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
