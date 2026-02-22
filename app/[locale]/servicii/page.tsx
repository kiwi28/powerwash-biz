'use client';

import { ServiceCard } from '@/components/ServiceCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Award, Users } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ServiceCardProps } from '@/components/ServiceCard';

export default function ServicesPage() {
  const t = useTranslations('servicesPage');
  const tServiceCard = useTranslations('serviceCard');
  const pathname = usePathname();

  // Get current locale from URL path
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale: 'en' | 'ro' = pathSegments[1] === 'en' ? 'en' : 'ro';

  // Define services array dynamically based on translations
  const services: (ServiceCardProps & { id: string; details: string; faq: Array<{ q: string; a: string }> })[] = [
    {
      id: 'alei',
      title: currentLocale === 'en' ? 'Driveway Cleaning' : t('serviceItems.alei.title'),
      description: currentLocale === 'en' ? 'Effective removal of moss, algae, and stains from concrete and gravel driveways.' : t('serviceItems.alei.description'),
      priceRange: '5-8',
      icon: <Zap className="h-6 w-6 text-primary" />,
      slug: 'curatare-alei',
      details: t('serviceItems.alei.details'),
      faq: t.raw('serviceItems.alei.faq') as unknown as Array<{ q: string; a: string }>,
    },
    {
      id: 'pereti',
      title: currentLocale === 'en' ? 'Exterior Wall Cleaning' : t('serviceItems.pereti.title'),
      description: currentLocale === 'en' ? 'Restoring original appearance of exterior walls with professional washing equipment.' : t('serviceItems.pereti.description'),
      priceRange: '8-12',
      icon: <Shield className="h-6 w-6 text-primary" />,
      slug: 'curatare-pereti',
      details: t('serviceItems.pereti.details'),
      faq: t.raw('serviceItems.pereti.faq') as unknown as Array<{ q: string; a: string }>,
    },
    {
      id: 'terase',
      title: currentLocale === 'en' ? 'Deck Cleaning' : t('serviceItems.terase.title'),
      description: currentLocale === 'en' ? 'Clean and safe decks, perfect for immediate use after treatment.' : t('serviceItems.terase.description'),
      priceRange: '6-10',
      icon: <Award className="h-6 w-6 text-primary" />,
      slug: 'curatare-terase',
      details: t('serviceItems.terase.details'),
      faq: t.raw('serviceItems.terase.faq') as unknown as Array<{ q: string; a: string }>,
    },
    {
      id: 'garduri',
      title: currentLocale === 'en' ? 'Fence Cleaning' : t('serviceItems.garduri.title'),
      description: currentLocale === 'en' ? 'Complete fence cleaning services to restore shine and aesthetic appearance.' : t('serviceItems.garduri.description'),
      priceRange: '7-11',
      icon: <Users className="h-6 w-6 text-primary" />,
      slug: 'curatare-garduri',
      details: t('serviceItems.garduri.details'),
      faq: t.raw('serviceItems.garduri.faq') as unknown as Array<{ q: string; a: string }>,
    },
  ];

  return (
    <>
      {/* Page Intro Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('intro.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('intro.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards Grid Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('mainServices.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('mainServices.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 md:py-24 bg-muted/50" id="detalii">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('details.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('details.description')}
            </p>
          </div>

          {services.map((service, index) => (
            <div key={service.id} className="mb-16 last:mb-0">
              {/* Service Card Header */}
              <div id={service.slug} className="mb-8 scroll-mt-24">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{t('details.priceLabel')}:</span>
                          <span className="text-sm text-primary font-semibold">
                            {tServiceCard('price')} {service.priceRange} {tServiceCard('priceUnit')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Service Details Accordion */}
              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value={`details-${service.id}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {t('details.detailsLabel')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="p-6">
                        <div className="prose prose-sm max-w-none">
                          {service.details.split('\n').map((paragraph, i) => {
                            if (paragraph.startsWith('•')) {
                              return (
                                <li key={i} className="mb-2 text-muted-foreground ml-6">
                                  {paragraph.substring(1).trim()}
                                </li>
                              );
                            }
                            return paragraph ? (
                              <p key={i} className="mb-4 text-muted-foreground">
                                {paragraph}
                              </p>
                            ) : null;
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible>
                <AccordionItem value={`faq-${service.id}`}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {t('details.faqLabel')}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {service.faq.map((item, faqIndex) => (
                            <div key={faqIndex}>
                              <h4 className="font-semibold mb-2">{item.q}</h4>
                              <p className="text-sm text-muted-foreground">{item.a}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {index < services.length - 1 && (
                <div className="border-t border-border my-12" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {t('cta.description')}
            </p>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/solicita-oferta">
                {t('cta.button')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
