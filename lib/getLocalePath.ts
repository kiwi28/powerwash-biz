import { locales } from '@/i18n';

export type Locale = typeof locales[number];

/**
 * Get locale-aware path for navigation links
 * @param locale - The target locale
 * @param path - The navigation path
 * @returns The path to use (same for all locales - only locale prefix changes)
 */
export function getLocalePath(locale: Locale, path: string): string {
  // Return path as-is for all locales
  // The locale prefix is handled separately in the component (e.g., /ro/servicii vs /en/servicii)
  return path;
}
