'use client';

import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, Users, Zap, Search, FileText, Phone } from 'lucide-react';
import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import { Locale } from '@/lib/getLocalePath';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { ServiceCardProps } from '@/components/ServiceCard';

export default function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations('landing');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  // Get current locale from URL path
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale = pathSegments[0] === 'en' ? 'en' : 'ro';

  // Define services array dynamically based on translations
  const services: ServiceCardProps[] = [
    {
      title: currentLocale === 'en' ? 'Driveway Cleaning' : t('items.curatareAlei.title'),
      description: currentLocale === 'en' ? 'Effective removal of moss, algae, and stains from concrete and gravel driveways.' : t('items.curatareAlei.description'),
      priceRange: '5-8',
      icon: <Zap className="h-6 w-6 text-primary" />,
      slug: 'curatare-alei',
    },
    {
      title: currentLocale === 'en' ? 'Exterior Wall Cleaning' : t('items.curatarePereti.title'),
      description: currentLocale === 'en' ? 'Restoring the original appearance of exterior walls with professional washing equipment.' : t('items.curatarePereti.description'),
      priceRange: '8-12',
      icon: <Shield className="h-6 w-6 text-primary" />,
      slug: 'curatare-pereti',
    },
    {
      title: currentLocale === 'en' ? 'Deck Cleaning' : t('items.curatareTerase.title'),
      description: currentLocale === 'en' ? 'Clean and safe decks, perfect for immediate use after treatment.' : t('items.curatareTerase.description'),
      priceRange: '6-10',
      icon: <Award className="h-6 w-6 text-primary" />,
      slug: 'curatare-terase',
    },
    {
      title: currentLocale === 'en' ? 'Facade Cleaning' : t('items.curatareFatada.title'),
      description: currentLocale === 'en' ? 'Complete facade cleaning services to restore the shine of buildings.' : t('items.curatareFatada.description'),
      priceRange: '10-15',
      icon: <Users className="h-6 w-6 text-primary" />,
      slug: 'curatare-fatada',
    },
  ];

  // Define benefits array dynamically based on translations
  const benefits = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: currentLocale === 'en' ? 'Professional Equipment' : t('whyUs.benefits.equipment.title'),
      description: currentLocale === 'en' ? 'We only use high-pressure equipment and certified cleaning products.' : t('whyUs.benefits.equipment.description'),
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: currentLocale === 'en' ? 'Work Warranty' : t('whyUs.benefits.warranty.title'),
      description: currentLocale === 'en' ? 'We offer warranty for all our pressure washing services.' : t('whyUs.benefits.warranty.description'),
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: currentLocale === 'en' ? 'Fast Execution' : t('whyUs.benefits.fast.title'),
      description: currentLocale === 'en' ? 'Our efficient team completes work in the shortest possible time.' : t('whyUs.benefits.fast.description'),
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: currentLocale === 'en' ? 'Experience' : t('whyUs.benefits.experience.title'),
      description: currentLocale === 'en' ? 'Over 10 years of experience in professional cleaning.' : t('whyUs.benefits.experience.description'),
    },
  ];

  // Define steps array dynamically based on translations
  const steps = [
    {
      number: 1,
      title: currentLocale === 'en' ? 'Request a Quote' : t('howItWorks.steps.1.title'),
      description: currentLocale === 'en' ? 'Contact us for a free personalized quote based on your needs.' : t('howItWorks.steps.1.description'),
    },
    {
      number: 2,
      title: currentLocale === 'en' ? 'Scheduling' : t('howItWorks.steps.2.title'),
      description: currentLocale === 'en' ? 'Together we set the most suitable date and time for the work.' : t('howItWorks.steps.2.description'),
    },
    {
      number: 3,
      title: currentLocale === 'en' ? 'Execution & Warranty' : t('howItWorks.steps.3.title'),
      description: currentLocale === 'en' ? 'We perform the work professionally and offer warranty for results.' : t('howItWorks.steps.3.description'),
    },
  ];

  // Define testimonials array dynamically based on translations
  const testimonials = [
    {
      name: 'Maria Ionescu',
      rating: 5,
      review: currentLocale === 'en' ? 'Excellent service! My driveway looks like new after cleaning. Highly recommend.' : t('testimonials.reviews.maria.review'),
      service: currentLocale === 'en' ? 'Driveway Cleaning' : t('testimonials.reviews.maria.service'),
    },
    {
      name: 'Alexandru Popescu',
      rating: 5,
      review: currentLocale === 'en' ? 'Professionalism and promptness. The team respected deadlines and the work looks impeccable.' : t('testimonials.reviews.alexandru.review'),
      service: currentLocale === 'en' ? 'Facade Cleaning' : t('testimonials.reviews.alexandru.service'),
    },
    {
      name: 'Elena Dumitrescu',
      rating: 5,
      review: currentLocale === 'en' ? 'I was pleasantly surprised by the result. My deck was cleaned quickly and efficiently.' : t('testimonials.reviews.elena.review'),
      service: currentLocale === 'en' ? 'Deck Cleaning' : t('testimonials.reviews.elena.service'),
    },
  ];

  // Define before/after gallery items dynamically based on translations
  const galleryItems = [
    { emoji: '🏠', title: currentLocale === 'en' ? 'Driveway Before' : t('gallery.items.beforeAlley.title'), subtitle: currentLocale === 'en' ? 'Surface with moss' : t('gallery.items.beforeAlley.subtitle') },
    { emoji: '✨', title: currentLocale === 'en' ? 'Driveway After' : t('gallery.items.afterAlley.title'), subtitle: currentLocale === 'en' ? 'Professionally cleaned' : t('gallery.items.afterAlley.subtitle') },
    { emoji: '🏢', title: currentLocale === 'en' ? 'Facade Before' : t('gallery.items.beforeFacade.title'), subtitle: currentLocale === 'en' ? 'Stained color' : t('gallery.items.beforeFacade.subtitle') },
    { emoji: '🌟', title: currentLocale === 'en' ? 'Facade After' : t('gallery.items.afterFacade.title'), subtitle: currentLocale === 'en' ? 'New look' : t('gallery.items.afterFacade.subtitle') },
    { emoji: '🌳', title: currentLocale === 'en' ? 'Deck Before' : t('gallery.items.beforeTerrace.title'), subtitle: currentLocale === 'en' ? 'Thick dirt layer' : t('gallery.items.beforeTerrace.subtitle') },
    { emoji: '💎', title: currentLocale === 'en' ? 'Deck After' : t('gallery.items.afterTerrace.title'), subtitle: currentLocale === 'en' ? 'Clean surface' : t('gallery.items.afterTerrace.subtitle') },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('services.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('services.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href={currentLocale === 'en' ? '/en/servicii' : '/servicii'}>
                {currentLocale === 'en' ? 'View All Services' : t('services.viewAll')}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('whyUs.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('whyUs.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{benefit.icon}</div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('howItWorks.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorks.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl mb-3 text-center">{step.title}</h3>
                    <p className="text-muted-foreground text-center">{step.description}</p>
                  </CardContent>
                </Card>
                {step.number < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                    <Zap className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Preview Gallery Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('gallery.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('gallery.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4 text-center">{item.emoji}</div>
                  <h3 className="font-semibold text-lg text-center mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground text-center">{item.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t('testimonials.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('testimonials.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Search className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">{t('serviceArea.title')}</h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t('serviceArea.description')}
            </p>
            <p className="text-muted-foreground">
              {t('serviceArea.contactText')}
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('cta.title')}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={currentLocale === 'en' ? '/en/solicita-oferta' : '/solicita-oferta'}>
                  <FileText className="mr-2 h-4 w-4" />
                  {currentLocale === 'en' ? 'Request a Quote' : t('cta.quoteButton')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a href="tel:07XXXXXXXX">
                  <Phone className="mr-2 h-4 w-4" />
                  {t('cta.phoneButton')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
