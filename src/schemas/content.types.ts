/**
 * TypeScript type definitions for Ivory Thai content
 * Australian English spelling throughout
 */

export interface Address {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface Business {
  name: string;
  address: Address;
  geo: GeoLocation | null;
  phone: string;
  email: string;
  ordering_links: string[];
  reservation_links: string[];
  social_profiles: string[];
  google_maps_link: string;
}

export interface NormalisedHours {
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
  sun: string;
}

export interface VerbatimHours {
  text: string;
  source: string;
}

export interface OpeningHours {
  normalised: NormalisedHours | null;
  verbatim: VerbatimHours[];
}

export interface MenuCategory {
  name: string;
  slug: string;
  description: string;
  sort_order: number;
}

export interface MenuItem {
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  categorySlug: string;
  spiceLevel: number | null; // 0-3 or null
  dietaryTags: string[];
  allergens: string[];
  image: string | null;
  availability: string | null;
  source: string;
}

export interface PageHeadings {
  h1: string[];
  h2: string[];
  h3: string[];
}

export interface ContactSignals {
  address_text: string;
  phone_numbers: string[];
  emails: string[];
  map_links: string[];
}

export interface CTA {
  label: string;
  href: string;
}

export interface PageImage {
  src: string;
  alt: string;
}

export interface PageMeta {
  url: string;
  path: string;
  template_guess: string;
  title: string;
  meta_description: string;
  canonical: string;
  headings: PageHeadings;
  main_content: string[];
  images: PageImage[];
  ctas_detected: CTA[];
  contact_signals: ContactSignals;
  structured_data_jsonld: any[];
}

export interface Asset {
  type: 'image' | 'pdf' | 'logo';
  url: string;
  alt: string;
  source: string;
}

export interface ExternalServices {
  ordering: string[];
  reservations: string[];
}

export interface KnowledgeBaseMeta {
  collected_at: string;
  target_url: string;
  allowed_domains: string[];
  pages_crawled: number;
}

export interface KnowledgeBase {
  meta: KnowledgeBaseMeta;
  business: Business;
  hours: OpeningHours;
  menu: {
    categories: Omit<MenuCategory, 'slug'>[];
    items: Omit<MenuItem, 'slug' | 'categorySlug'>[];
  };
  pages: PageMeta[];
  assets: Asset[];
  external_services: ExternalServices;
  data_quality_notes: string[];
}

export interface NormalisedMenu {
  categories: MenuCategory[];
  items: MenuItem[];
}
