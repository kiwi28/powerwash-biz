'use client';

import { QuoteForm } from '@/components/QuoteForm';
import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';

export default function QuoteRequestPage() {
  const t = useTranslations('quotePage');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {t('title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('whatHappens.title')}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-semibold mb-2">{t('whatHappens.steps.1.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('whatHappens.steps.1.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-semibold mb-2">{t('whatHappens.steps.2.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('whatHappens.steps.2.description')}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-semibold mb-2">{t('whatHappens.steps.3.title')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('whatHappens.steps.3.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">{t('questions.title')}</h2>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                {t('questions.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="tel:07XXXXXXXX"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  07XX XXX XXX
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  contact@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
