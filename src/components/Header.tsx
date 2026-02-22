'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/servicii' },
  { key: 'portfolio', href: '/portofoliu' },
  { key: 'about', href: '/despre' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
              P
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              {t('common.siteName')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          {/* Phone Number and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="tel:+40712345678"
              className="hidden sm:flex items-center space-x-2 text-sm font-medium hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              <span>+40 712 345 678</span>
            </a>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <a
                href="tel:+40712345678"
                className="flex items-center space-x-2 text-sm font-medium hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                <span>+40 712 345 678</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
