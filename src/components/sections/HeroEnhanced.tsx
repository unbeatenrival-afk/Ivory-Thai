'use client';

/**
 * Enhanced Hero Section
 * Thai Golden Buddha-inspired light theme with video background
 */

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { business, isOpen } from '@/lib/content';
import { formatPhoneNumber } from '@/lib/format';
import { VideoBackground } from '@/components/ui/VideoBackground';

export function HeroEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const restaurantOpen = isOpen();

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // Smooth spring physics
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
    >
      {/* Video Background with Golden Buddha overlay */}
      <VideoBackground />

      {/* Golden shimmer particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { color: 'rgba(255, 153, 51, 0.12)', size: 500, left: '15%', top: '15%' },
          { color: 'rgba(212, 175, 55, 0.15)', size: 600, left: '70%', top: '25%' },
          { color: 'rgba(255, 193, 7, 0.1)', size: 550, left: '40%', top: '65%' },
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
              x: [0, 80, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 25 + i * 4,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: smoothY }}
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="mb-8"
          >
            <motion.div
              className="relative inline-block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/assets/images/brand/logo-transparent.webp"
                  alt={business.name}
                  width={400}
                  height={125}
                  priority
                  className="w-auto h-32 md:h-40 drop-shadow-2xl"
                />
                {/* Golden Buddha glow */}
                <motion.div
                  className="absolute inset-0 blur-3xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 193, 7, 0.5), rgba(255, 153, 51, 0.3), transparent)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 backdrop-blur-xl bg-white/80 border-2 border-amber-300/60 rounded-full shadow-xl"
          >
            <motion.span
              className={`w-3 h-3 rounded-full ${
                restaurantOpen ? 'bg-jade-500' : 'bg-orange-500'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <span className="text-sm font-bold text-amber-900">
              {restaurantOpen ? 'Open Now' : 'Currently Closed'}
            </span>
          </motion.div>

          {/* Main title removed per user request */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="perspective-1000"
          >
            <motion.h1
              className="text-7xl md:text-9xl font-bold mb-6 tracking-tight bg-gradient-to-br from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent drop-shadow-lg"
              style={{
                textShadow: '0 2px 20px rgba(255, 153, 51, 0.3)',
              }}
              whileHover={{
                scale: 1.02,
                rotateX: 3,
                rotateY: 3,
              }}
            >
              {business.name}
            </motion.h1>
          </motion.div> */}

          {/* Tagline - Moved below info cards per user request */}
          {/* <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl text-amber-900 mb-4 max-w-3xl mx-auto font-light"
          >
            Authentic Thai Cuisine
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg text-amber-800 mb-12 font-medium"
          >
            Where tradition meets innovation in North Ryde
          </motion.p> */}

          {/* CTA Buttons with 3D hover */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link href="/menu">
              <motion.button
                className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-lg font-bold rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 50px rgba(255, 153, 51, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Explore Menu ✨</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>

            {business.ordering_links[0] && (
              <a href={business.ordering_links[0]} target="_blank" rel="noopener noreferrer">
                <motion.button
                  className="px-10 py-5 backdrop-blur-xl bg-white/90 border-3 border-amber-400 text-amber-900 text-lg font-bold rounded-full shadow-xl"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    borderColor: 'rgba(251, 191, 36, 1)',
                    boxShadow: '0 10px 40px rgba(251, 191, 36, 0.3)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Order Online 🍜
                </motion.button>
              </a>
            )}
          </motion.div>

          {/* Info cards with golden temple effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          >
            {[
              { icon: '⏰', title: 'Opening Hours', value: 'Mon - Sun', sub: '11:30am - 9:00pm' },
              { icon: '📞', title: 'Call Us', value: formatPhoneNumber(business.phone), sub: 'Quick reservations' },
              { icon: '📍', title: 'Location', value: 'North Ryde', sub: business.address.suburb },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative group perspective-1000"
                whileHover={{ scale: 1.05, rotateY: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative p-8 backdrop-blur-xl bg-white/90 border-2 border-amber-300/60 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Golden glow on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 193, 7, 0.2), transparent 70%)',
                    }}
                  />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-sm font-bold text-amber-700 mb-2 uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-xl font-bold text-amber-900 mb-1">{item.value}</p>
                    <p className="text-sm text-amber-700">{item.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline - Moved below info cards for better visibility */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-center"
          >
            <p className="text-2xl md:text-4xl text-amber-900 mb-4 max-w-3xl mx-auto font-light">
              Authentic Thai Cuisine
            </p>
            <p className="text-lg text-amber-800 font-medium">
              Where tradition meets innovation in North Ryde
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-amber-900"
        >
          <span className="text-sm font-bold">Scroll to explore</span>
          <svg className="w-6 h-10 border-2 border-amber-600 rounded-full p-1" viewBox="0 0 24 40">
            <motion.circle
              cx="12"
              cy="12"
              r="4"
              fill="currentColor"
              className="fill-amber-600"
              animate={{ cy: [10, 20, 10] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
