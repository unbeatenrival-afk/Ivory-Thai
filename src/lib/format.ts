/**
 * Formatting Utilities
 * Australian English formatting for currency, text, etc.
 */

/**
 * Format price string (already formatted in data, but can be used for consistency)
 */
export function formatPrice(price: string | number): string {
  if (typeof price === 'string') {
    return price.startsWith('$') ? price : `$${price}`;
  }
  return `$${price.toFixed(2)}`;
}

/**
 * Convert to title case
 */
export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Convert kebab-case to Title Case
 */
export function kebabToTitle(kebab: string): string {
  return kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format phone number for display (Australian format)
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // Format based on length
  if (digits.startsWith('02') || digits.startsWith('03') || digits.startsWith('07') || digits.startsWith('08')) {
    // Landline: (02) 9888 7773
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)} ${digits.slice(6)}`;
  } else if (digits.startsWith('04')) {
    // Mobile: 0412 345 678
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  // Default: return as-is
  return phone;
}

/**
 * Pluralise word based on count
 */
export function pluralise(word: string, count: number, plural?: string): string {
  if (count === 1) return word;
  return plural || `${word}s`;
}
