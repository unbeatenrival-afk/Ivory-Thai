/**
 * Routing Utilities
 * Helpers for generating URLs and slugs
 */

/**
 * Generate slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get menu item URL
 */
export function getMenuItemUrl(categorySlug: string, itemSlug: string): string {
  return `/menu/${categorySlug}/${itemSlug}`;
}

/**
 * Get category URL
 */
export function getCategoryUrl(categorySlug: string): string {
  return `/menu/${categorySlug}`;
}

/**
 * Get full URL with origin
 */
export function getFullUrl(path: string, origin?: string): string {
  const baseOrigin = origin || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${baseOrigin}${path}`;
}
