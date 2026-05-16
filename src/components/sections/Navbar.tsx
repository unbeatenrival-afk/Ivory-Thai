'use client';

/**
 * Navigation Bar
 * Sticky navigation with CTAs
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { business } from '@/lib/content';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-amber-300/50 shadow-lg'
          : 'bg-white/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-centre justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="relative group">
            <Image
              src="/assets/images/brand/logo-transparent.webp"
              alt={business.name}
              width={160}
              height={50}
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-centre gap-8">
            <Link
              href="/"
              className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
            >
              Menu
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
            >
              Contact
            </a>
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-centre gap-4">
            {business.ordering_links[0] && (
              <a
                href={business.ordering_links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg"
              >
                Order Now
              </a>
            )}

            {business.reservation_links[0] && (
              <a
                href={business.reservation_links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white border-2 border-amber-500 text-amber-900 rounded-full font-bold hover:bg-amber-50 hover:scale-102 transition-all shadow-md"
              >
                Book Table
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-amber-900 p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-amber-300/50 pt-4"
            >
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/menu"
                  className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <a
                  href={`tel:${business.phone}`}
                  className="text-amber-900 hover:text-orange-600 transition-colours font-semibold"
                >
                  Contact
                </a>

                <div className="flex flex-col gap-2 mt-2">
                  {business.ordering_links[0] && (
                    <a
                      href={business.ordering_links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-centre rounded-full font-bold shadow-lg"
                    >
                      Order Now
                    </a>
                  )}

                  {business.reservation_links[0] && (
                    <a
                      href={business.reservation_links[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-white border-2 border-amber-500 text-amber-900 text-centre rounded-full font-bold shadow-md"
                    >
                      Book Table
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
