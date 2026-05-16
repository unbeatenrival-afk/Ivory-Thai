#!/usr/bin/env tsx
/**
 * Content Normalisation Script
 * Transforms raw knowledge_base.json into app-ready normalised JSON files
 *
 * Usage: npm run build:content
 *
 * Outputs:
 * - content/normalised/business.json
 * - content/normalised/hours.json
 * - content/normalised/menu.json
 * - content/normalised/pages.json
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { KnowledgeBase, NormalisedMenu, MenuCategory, MenuItem, RawMenuItem } from '../src/schemas/content.types';

const ROOT_DIR = join(__dirname, '..');
const RAW_DIR = join(ROOT_DIR, 'content', 'raw');
const NORMALISED_DIR = join(ROOT_DIR, 'content', 'normalised');

/**
 * Convert string to kebab-case slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_]+/g, '-')   // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Trim hyphens
}

/**
 * Main normalisation function
 */
function normaliseContent() {
  console.log('🔄 Reading raw knowledge base...');

  const rawPath = join(RAW_DIR, 'knowledge_base.json');
  const rawData: KnowledgeBase = JSON.parse(readFileSync(rawPath, 'utf-8'));

  console.log(`✓ Loaded knowledge base from ${rawData.meta.target_url}`);
  console.log(`  Pages crawled: ${rawData.meta.pages_crawled}`);
  console.log(`  Menu categories: ${rawData.menu.categories.length}`);
  console.log(`  Menu items: ${rawData.menu.items.length}`);

  // Normalise business data
  console.log('\n📍 Normalising business data...');
  const business = {
    ...rawData.business,
    updated_at: new Date().toISOString(),
  };
  writeFileSync(
    join(NORMALISED_DIR, 'business.json'),
    JSON.stringify(business, null, 2),
    'utf-8'
  );
  console.log('✓ business.json');

  // Normalise hours
  console.log('\n⏰ Normalising hours...');
  const hours = {
    ...rawData.hours,
    updated_at: new Date().toISOString(),
  };
  writeFileSync(
    join(NORMALISED_DIR, 'hours.json'),
    JSON.stringify(hours, null, 2),
    'utf-8'
  );
  console.log('✓ hours.json');

  // Normalise menu with slugs
  console.log('\n🍽️  Normalising menu...');

  const categories: MenuCategory[] = rawData.menu.categories.map((cat, idx) => ({
    ...cat,
    slug: slugify(cat.name),
    sort_order: cat.sort_order ?? idx,
  }));

  const categoryMap = new Map(categories.map(c => [c.name, c.slug]));

  const items: MenuItem[] = rawData.menu.items.map(item => {
    const categorySlug = categoryMap.get(item.category) || slugify(item.category);

    return {
      ...item,
      slug: slugify(item.name),
      categorySlug,
      spiceLevel: item.spice_level ?? null,
      dietaryTags: item.dietary_tags ?? [],
      allergens: item.allergens ?? [],
      image: item.image ?? null,
      availability: item.availability ?? null,
    };
  });

  const normalisedMenu: NormalisedMenu = {
    categories,
    items,
  };

  writeFileSync(
    join(NORMALISED_DIR, 'menu.json'),
    JSON.stringify(normalisedMenu, null, 2),
    'utf-8'
  );
  console.log('✓ menu.json');
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Items: ${items.length}`);

  // Verify all items have valid categories
  const orphanedItems = items.filter(item => !categoryMap.has(item.category));
  if (orphanedItems.length > 0) {
    console.warn(`⚠️  Warning: ${orphanedItems.length} items with invalid categories`);
    orphanedItems.forEach(item => {
      console.warn(`   - ${item.name} → category: "${item.category}"`);
    });
  }

  // Normalise pages
  console.log('\n📄 Normalising pages...');
  const pages = rawData.pages.map(page => ({
    path: page.path,
    title: page.title,
    template: page.template_guess,
    meta_description: page.meta_description,
    headings: page.headings,
  }));

  writeFileSync(
    join(NORMALISED_DIR, 'pages.json'),
    JSON.stringify(pages, null, 2),
    'utf-8'
  );
  console.log('✓ pages.json');
  console.log(`  Pages: ${pages.length}`);

  // Output quality notes
  if (rawData.data_quality_notes && rawData.data_quality_notes.length > 0) {
    console.log('\n📝 Data Quality Notes:');
    rawData.data_quality_notes.forEach(note => {
      console.log(`   • ${note}`);
    });
  }

  console.log('\n✅ Content normalisation complete!');
  console.log(`📂 Output: ${NORMALISED_DIR}/`);
}

// Run normalisation
try {
  normaliseContent();
} catch (error) {
  console.error('❌ Error during normalisation:', error);
  process.exit(1);
}
