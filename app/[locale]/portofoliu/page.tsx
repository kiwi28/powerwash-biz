'use client';

import { useState } from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface GalleryItem {
  id: string;
  category: string;
}

interface Testimonial {
  name: string;
  rating: number;
  review: string;
  service: string;
}

const categoryKeys = ['all', 'alei', 'pereți', 'terase', 'comercial'];

const categoryEmojis: Record<string, string> = {
  alei: '🛣️',
  pereti: '🧱',
  terase: '🏛️',
  comercial: '🏢'
};

export default function PortfolioPage() {
  const t = useTranslations('portfolio');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleryItems: GalleryItem[] = categoryKeys.slice(1).map(category => ({
    id: category,
    category
  }));

  const testimonials: Testimonial[] = [
    {
      name: t.raw('testimonials.reviews.andrei.name'),
      rating: 5,
      review: t.raw('testimonials.reviews.andrei.review'),
      service: t.raw('testimonials.reviews.andrei.service')
    },
    {
      name: t.raw('testimonials.reviews.maria.name'),
      rating: 5,
      review: t.raw('testimonials.reviews.maria.review'),
      service: t.raw('testimonials.reviews.maria.service')
    },
    {
      name: t.raw('testimonials.reviews.cristian.name'),
      rating: 5,
      review: t.raw('testimonials.reviews.cristian.review'),
      service: t.raw('testimonials.reviews.cristian.service')
    }
  ];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems.flatMap(item =>
      Array.from({ length: 3 }, (_, i) => ({ id: `${item.id}-${i}`, category: item.id, index: i }))
    )
    : galleryItems.flatMap(item =>
      Array.from({ length: 3 }, (_, i) => ({ id: `${item.id}-${i}`, category: item.id, index: i }))
    ).filter(item => item.category === selectedCategory);

  const filteredItemsSimple = selectedCategory === 'all'
    ? Array.from({ length: 9 }, (_, i) => ({ id: String(i + 1), category: i < 3 ? 'alei' : i < 6 ? 'pereți' : i < 9 ? 'terase' : 'comercial' }))
    : Array.from({ length: 9 }, (_, i) => {
        const cat = i < 3 ? 'alei' : i < 6 ? 'pereți' : i < 9 ? 'terase' : 'comercial';
        return { id: String(i + 1), category: cat };
      })
      .filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categoryKeys.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {t(`categories.${category}` as any)}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItemsSimple.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl">{categoryEmojis[item.category]}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {t(`gallery.items.${item.id}.title` as any)}
                </h3>
                <p className="text-gray-600 text-sm">
                  📍 {t(`gallery.items.${item.id}.location` as any)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            {t('testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                rating={testimonial.rating}
                review={testimonial.review}
                service={testimonial.service}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" className="text-lg px-8 py-6">
            {t('cta.button')}
          </Button>
        </div>
      </div>
    </div>
  );
}
