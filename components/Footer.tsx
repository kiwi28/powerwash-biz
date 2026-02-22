'use client';

import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Locale } from '@/lib/getLocalePath';

export default function Footer() {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  // Get current locale from URL path
  const pathSegments = usePathname().split('/').filter(Boolean);
  const currentLocale: Locale = pathSegments[0] === 'en' ? 'en' : 'ro';

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.siteName')}</h3>
            <p className="text-sm text-muted-foreground">
              {currentLocale === 'en'
                ? 'Professional pressure washing services in Iași. Transform your outdoor spaces with our superior quality services.'
                : 'Servicii profesionale de spălare cu presiune în Iași. Transformați spațiile exterioare cu serviciile noastre de calitate superioară.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentLocale === 'en' ? 'Quick Links' : 'Link-uri Rapide'}</h3>
            <nav className="flex flex-col gap-2">
              <Link href={currentLocale === 'en' ? '/en' : '/'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.home')}
              </Link>
              <Link href={currentLocale === 'en' ? '/en/servicii' : '/servicii'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.services')}
              </Link>
              <Link href={currentLocale === 'en' ? '/en/portofoliu' : '/portofoliu'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.portfolio')}
              </Link>
              <Link href={currentLocale === 'en' ? '/en/despre' : '/despre'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.about')}
              </Link>
              <Link href={currentLocale === 'en' ? '/en/contact' : '/contact'} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentLocale === 'en' ? 'Contact' : 'Contact'}</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:07XXXXXXXX" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                <span>07XX XXX XXX</span>
              </a>
              <a href="mailto:contact@powerwash.ro" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                <span>contact@powerwash.ro</span>
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Iași, România</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentLocale === 'en' ? 'Follow Us' : 'Urmărește-ne'}</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {t('common.siteName')}. {currentLocale === 'en' ? 'All rights reserved.' : 'Toate drepturile rezervate.'}</p>
        </div>
      </div>
    </footer>
  );
}
