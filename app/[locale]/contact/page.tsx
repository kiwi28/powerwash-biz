'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h1 className="text-5xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            {t('hero.description')}
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-center">{t('info.phone.title')}</CardTitle>
              <CardDescription className="text-center text-base">
                {t('info.phone.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="tel:+40712345678"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700"
              >
                {t('info.phone.number')}
              </a>
              <p className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('info.phone.availability') }} />
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-center">{t('info.email.title')}</CardTitle>
              <CardDescription className="text-center text-base">
                {t('info.email.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="mailto:contact@example.com"
                className="text-lg font-semibold text-green-600 hover:text-green-700"
              >
                {t('info.email.address')}
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                {t('info.email.responseTime')}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-center">{t('info.location.title')}</CardTitle>
              <CardDescription className="text-center text-base">
                {t('info.location.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold text-purple-600">
                {t('info.location.area')}
              </p>
              <p className="text-sm text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: t('info.location.details') }} />
            </CardContent>
          </Card>
        </div>

        {/* Working Hours Section */}
        <div className="mb-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                {t('workingHours.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">{t('workingHours.mondayFriday')}</span>
                  <span className="text-primary font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">{t('workingHours.saturday')}</span>
                  <span className="text-primary font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">{t('workingHours.sunday')}</span>
                  <span className="text-muted-foreground">{t('workingHours.closed')}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {t('workingHours.emergencyNote')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What to Expect Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            {t('whatHappens.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">{t('whatHappens.steps.1.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whatHappens.steps.1.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">{t('whatHappens.steps.2.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whatHappens.steps.2.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">{t('whatHappens.steps.3.title')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whatHappens.steps.3.description')}
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {t('whyChooseUs.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('whyChooseUs.fastResponse.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('whyChooseUs.fastResponse.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('whyChooseUs.transparentOffers.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('whyChooseUs.transparentOffers.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('whyChooseUs.warranty.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('whyChooseUs.warranty.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{t('whyChooseUs.professionalism.title')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('whyChooseUs.professionalism.description')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/solicita-oferta">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                {t('cta.quoteButton')}
              </Button>
            </Link>
            <a href="tel:+40712345678">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                {t('cta.callButton')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
