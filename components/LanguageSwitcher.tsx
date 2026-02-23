'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { locales } from '@/i18n';
import { useEffect } from 'react';

type Locale = typeof locales[number];

export default function LanguageSwitcher() {
  const pathname = usePathname();

  // Get the current locale from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale = pathSegments[0] === 'en' ? 'en' : 'ro';

  // Get the other locale
  const otherLocale: Locale = currentLocale === 'ro' ? 'en' : 'ro';

  // Get the path without locale prefix
  let pathWithoutLocale = pathname;
  if (currentLocale === 'en') {
    pathWithoutLocale = pathname.replace('/en', '') || '/';
  }

  // Construct the target URL
  const targetUrl = otherLocale === 'en' ? `/en${pathWithoutLocale}` : (pathWithoutLocale || '/');

  const localeLabels: Record<Locale, string> = {
    ro: 'RO',
    en: 'EN',
  };

  // Set cookie when clicking the language toggle
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.cookie = `NEXT_LOCALE=${otherLocale}; path=/; max-age=31536000; SameSite=lax`;
    window.location.href = targetUrl;
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="flex items-center space-x-1"
      aria-label={`Switch to ${otherLocale === 'ro' ? 'Romanian' : 'English'}`}
    >
      <Link href={targetUrl} onClick={handleClick}>
        <Globe className="h-4 w-4" />
        <span className="font-medium">{localeLabels[currentLocale]}</span>
      </Link>
    </Button>
  );
}
