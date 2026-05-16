/**
 * Home Page
 * Landing page with Enhanced Hero and MenuShowcase
 */

import { Navbar } from '@/components/sections/Navbar';
import { HeroEnhanced } from '@/components/sections/HeroEnhanced';
import { MenuShowcaseEnhanced } from '@/components/sections/MenuShowcaseEnhanced';
import { business } from '@/lib/content';

export const metadata = {
  title: `${business.name} - Authentic Thai Cuisine in North Ryde`,
  description: 'Experience authentic Thai cuisine at Ivory Thai North Ryde. Explore our immersive 3D menu, order online, or book a table. Open 7 days.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      <HeroEnhanced />

      {/* Menu Showcase - Commented out per user request, can be uncommented later */}
      {/* <MenuShowcaseEnhanced /> */}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-amber-100 to-orange-100 border-t border-amber-300/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Address */}
            <div>
              <h3 className="text-amber-900 font-bold mb-3">Location</h3>
              <p className="text-amber-800 text-sm">
                {business.address.street}<br />
                {business.address.suburb} {business.address.state} {business.address.postcode}<br />
                {business.address.country}
              </p>
              <a
                href={business.google_maps_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-semibold text-sm mt-2 inline-block"
              >
                Get Directions →
              </a>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-amber-900 font-bold mb-3">Contact</h3>
              <p className="text-amber-800 text-sm">
                <a href={`tel:${business.phone}`} className="hover:text-amber-900 transition-colours">
                  {business.phone}
                </a>
              </p>
              <p className="text-amber-800 text-sm mt-1">
                <a href={`mailto:${business.email}`} className="hover:text-amber-900 transition-colours">
                  {business.email}
                </a>
              </p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-amber-900 font-bold mb-3">Opening Hours</h3>
              <p className="text-amber-800 text-sm">
                Monday - Sunday<br />
                11:30am - 9:00pm
              </p>
            </div>
          </div>

          {/* Social & Copyright */}
          <div className="border-t border-amber-300/50 pt-8 flex flex-col md:flex-row justify-between items-centre gap-4">
            <div className="flex gap-4">
              {business.social_profiles.map((profile, i) => (
                <a
                  key={i}
                  href={profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-orange-600 transition-colours font-semibold"
                >
                  {profile.includes('facebook') && 'Facebook'}
                </a>
              ))}
            </div>
            <p className="text-amber-700 text-sm font-medium">
              © {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
