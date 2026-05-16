/**
 * Content Loaders
 * Synchronous JSON imports for normalised content
 */

import type { Business, OpeningHours, NormalisedMenu, MenuCategory, MenuItem } from '@/schemas/content.types';

// Import normalised JSON files
import businessData from '../../content/normalised/business.json';
import hoursData from '../../content/normalised/hours.json';
import menuData from '../../content/normalised/menu.json';

export const business: Business = businessData as Business;
export const hours: OpeningHours = hoursData as OpeningHours;
export const menu: NormalisedMenu = menuData as NormalisedMenu;

/**
 * Get all menu categories, sorted by sort_order
 */
export function getCategories(): MenuCategory[] {
  return [...menu.categories].sort((a, b) => a.sort_order - b.sort_order);
}

/**
 * Get a category by slug
 */
export function getCategoryBySlug(slug: string): MenuCategory | undefined {
  return menu.categories.find(cat => cat.slug === slug);
}

/**
 * Get all items for a specific category
 */
export function getItemsByCategory(categorySlug: string): MenuItem[] {
  return menu.items.filter(item => item.categorySlug === categorySlug);
}

/**
 * Get a specific dish by slug
 */
export function getDishBySlug(slug: string): MenuItem | undefined {
  return menu.items.find(item => item.slug === slug);
}

/**
 * Get items by dietary tag
 */
export function getItemsByDietaryTag(tag: string): MenuItem[] {
  return menu.items.filter(item => item.dietaryTags.includes(tag));
}

/**
 * Get items by spice level
 */
export function getItemsBySpiceLevel(level: number): MenuItem[] {
  return menu.items.filter(item => item.spiceLevel === level);
}

/**
 * Search items by name or description
 */
export function searchItems(query: string): MenuItem[] {
  const lowerQuery = query.toLowerCase();
  return menu.items.filter(
    item =>
      item.name.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get all unique dietary tags
 */
export function getAllDietaryTags(): string[] {
  const tags = new Set<string>();
  menu.items.forEach(item => {
    item.dietaryTags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get all unique allergens
 */
export function getAllAllergens(): string[] {
  const allergens = new Set<string>();
  menu.items.forEach(item => {
    item.allergens.forEach(allergen => allergens.add(allergen));
  });
  return Array.from(allergens).sort();
}

/**
 * Get spice level emoji
 */
export function getSpiceLevelEmoji(level: number | null): string {
  if (level === null) return '';
  return '🌶️'.repeat(level);
}

/**
 * Format opening hours for display
 */
export function formatOpeningHours(day: keyof typeof hours.normalised): string {
  if (!hours.normalised) return 'Hours not available';
  const dayHours = hours.normalised[day];
  if (!dayHours) return 'Closed';

  // Convert 24h format to 12h
  const [open, close] = dayHours.split('-');
  return `${format24to12(open)} - ${format24to12(close)}`;
}

function format24to12(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'pm' : 'am';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')}${period}`;
}

/**
 * Check if restaurant is currently open
 */
export function isOpen(): boolean {
  if (!hours.normalised) return false;

  const now = new Date();
  const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()] as keyof typeof hours.normalised;
  const dayHours = hours.normalised[day];

  if (!dayHours || dayHours === 'Closed') return false;

  const [open, close] = dayHours.split('-');
  const [openHour, openMin] = open.split(':').map(Number);
  const [closeHour, closeMin] = close.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}
