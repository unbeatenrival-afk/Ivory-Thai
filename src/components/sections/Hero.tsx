'use client';

/**
 * Hero Section
 * Landing section with brand, CTAs, and key information
 */

import { motion } from 'framer-motion';
import Link from 'next/link';
import { business, isOpen, formatOpeningHours } from '@/lib/content';
import { formatPhoneNumber } from '@/lib/format';

export function Hero() {
  const restaurantOpen = isOpen();

  return (
    <section className="relative min-h-screen flex items-centre justify-centre overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/images/hero/pattern.svg')] bg-repeat animate-slow-pan" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-centre">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-centre gap-2 px-4 py-2 mb-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              restaurantOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-white/80">
            {restaurantOpen ? 'Open Now' : 'Currently Closed'}
          </span>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          {business.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/70 mb-4 max-w-2xl mx-auto"
        >
          Authentic Thai Cuisine in North Ryde
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base text-white/50 mb-12"
        >
          {business.address.street}, {business.address.suburb} {business.address.state} {business.address.postcode}
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-centre mb-16"
        >
          <Link
            href="/menu"
            className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
          >
            <span className="relative z-10">View Menu</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {business.ordering_links[0] && (
            <a
              href={business.ordering_links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              Order Online
            </a>
          )}

          {business.reservation_links[0] && (
            <a
              href={business.reservation_links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all hover:scale-105"
            >
              Book a Table
            </a>
          )}
        </motion.div>

        {/* Quick info cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {/* Hours */}
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-sm font-semibold text-white/50 mb-2 uppercase tracking-wider">
              Opening Hours
            </h3>
            <p className="text-white font-medium">
              Mon - Sun
            </p>
            <p className="text-white/80 text-sm mt-1">
              11:30am - 9:00pm
            </p>
          </div>

          {/* Phone */}
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-sm font-semibold text-white/50 mb-2 uppercase tracking-wider">
              Call Us
            </h3>
            <a
              href={`tel:${business.phone}`}
              className="text-white font-medium hover:text-orange-400 transition-colours"
            >
              {formatPhoneNumber(business.phone)}
            </a>
          </div>

          {/* Location */}
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h3 className="text-sm font-semibold text-white/50 mb-2 uppercase tracking-wider">
              Location
            </h3>
            <a
              href={business.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-orange-400 transition-colours text-sm"
            >
              Get Directions →
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-centre gap-2 text-white/40">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-centre p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 bg-white/40 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
