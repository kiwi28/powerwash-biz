'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

// Temporary mock i18n function
const t = (key: string) => key;

export function Hero() {

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {t('headline')}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {t('subheadline')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/solicita-oferta">
                {t('cta')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="tel:07XXXXXXXX">
                <Phone className="mr-2 h-4 w-4" />
                {t('phoneLabel')}: 07XX XXX XXX
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
