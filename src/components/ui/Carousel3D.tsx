'use client';

/**
 * 3D Carousel Component
 * Immersive carousel with perspective transforms
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface Carousel3DProps {
  items: {
    id: string;
    title: string;
    subtitle?: string;
    image?: string;
    gradient?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel3D({ items, autoPlay = true, interval = 5000 }: Carousel3DProps) {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction < 0 ? 45 : -45,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + items.length) % items.length;
    setCurrentIndex([newIndex, newDirection]);
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      paginate(1);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-2000 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent blur-3xl" />
      </div>

      {/* Carousel container */}
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
              rotateY: { duration: 0.4 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full cursor-grab active:cursor-grabbing"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <motion.div
                className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden shadow-3d"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Card background */}
                <div
                  className={`absolute inset-0 ${
                    items[currentIndex].gradient ||
                    'bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500'
                  }`}
                >
                  {/* Animated pattern overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                    animate={{
                      backgroundPosition: ['0px 0px', '60px 60px'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />

                  {/* Holographic shine */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['-200% -200%', '200% 200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center text-white">
                  <motion.h3
                    className="text-5xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {items[currentIndex].title}
                  </motion.h3>
                  {items[currentIndex].subtitle && (
                    <motion.p
                      className="text-2xl text-white/80"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {items[currentIndex].subtitle}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-4 z-20 p-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors shadow-holo"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => paginate(1)}
          className="absolute right-4 z-20 p-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-colors shadow-holo"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex([i, i > currentIndex ? 1 : -1])}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-white scale-125 shadow-neon'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
