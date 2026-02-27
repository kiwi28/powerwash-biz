import { NextRequest, NextResponse } from 'next/server';

const locales = ['ro', 'en'] as const;
const defaultLocale = 'ro' as const;

type Locale = typeof locales[number];

function getLocale(request: NextRequest): Locale {
  // Check URL path for locale prefix FIRST - this is the source of truth
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    return segments[0] as Locale;
  }

  // If URL has no locale, check cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE');
  if (cookieLocale && locales.includes(cookieLocale.value as Locale)) {
    return cookieLocale.value as Locale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Extract the first language (e.g., 'en-US' -> 'en', 'ro-RO' -> 'ro')
    const firstLang = acceptLanguage.split(',')[0].split('-')[0];
    if (locales.includes(firstLang as Locale)) {
      return firstLang as Locale;
    }
  }

  // Default to Romanian
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);

  // Skip middleware for admin routes, API routes, static files, etc.
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Get the target locale
  const locale = getLocale(request);

  // Check if pathname has a locale prefix
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    // URL has locale prefix
    const currentLocale = segments[0] as Locale;

    // If locale doesn't match detected locale, redirect
    if (currentLocale !== locale) {
      const newPathname = pathname.replace(`/${currentLocale}`, `/${locale}`);
      return NextResponse.redirect(new URL(newPathname, request.url));
    }

    // Locale matches, proceed
    return NextResponse.next();
  }

  // URL has no locale prefix, rewrite to locale
  const response = NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));

  // Set cookie
  response.cookies.set('NEXT_LOCALE', locale, {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
  });

  return response;
}

export const config = {
  // Match all routes except admin, API routes, static files, and Next.js internals
  matcher: [
    '/((?!admin|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
