'use client';

import { useState } from 'react';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  location: string;
}

interface Testimonial {
  name: string;
  rating: number;
  review: string;
  service: string;
}

const galleryItems: GalleryItem[] = [
  { id: 1, category: 'alei', title: 'Alee Pavaj Premium', location: 'București' },
  { id: 2, category: 'pereti', title: 'Zid de Gardă Modern', location: 'Cluj-Napoca' },
  { id: 3, category: 'terase', title: 'Terasă Design', location: 'Timișoara' },
  { id: 4, category: 'comercial', title: 'Parcare Comercială', location: 'Iași' },
  { id: 5, category: 'alei', title: 'Alee Grădină', location: 'Brașov' },
  { id: 6, category: 'pereti', title: 'Zid Piatra Naturală', location: 'Sibiu' },
  { id: 7, category: 'terase', title: 'Terasă Piscină', location: 'Constanța' },
  { id: 8, category: 'comercial', title: 'Spațiu Expozițional', location: 'București' },
  { id: 9, category: 'alei', title: 'Alee Curte', location: 'Oradea' },
];

const testimonials: Testimonial[] = [
  {
    name: 'Andrei Popescu',
    rating: 5,
    review: 'Echipa a fost excepțională. Aleea din curtea noastră arată impecabil!',
    service: 'Instalare Alei'
  },
  {
    name: 'Maria Ionescu',
    rating: 5,
    review: 'Terminat rapid și profesional. Recomand cu încredere!',
    service: 'Zid de Gardă'
  },
  {
    name: 'Cristian Dumitrescu',
    rating: 5,
    review: 'Terasa este exact așa cum am visat. Calitate excelentă!',
    service: 'Terasă Premium'
  }
];

const categories = ['toate', 'alei', 'pereti', 'terase', 'comercial'];

const categoryEmojis: Record<string, string> = {
  alei: '🛣️',
  pereti: '🧱',
  terase: '🏛️',
  comercial: '🏢'
};

const categoryTitles: Record<string, string> = {
  toate: 'Toate',
  alei: 'Alei',
  pereti: 'Pereți',
  terase: 'Terase',
  comercial: 'Comercial'
};

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('toate');

  const filteredItems = selectedCategory === 'toate'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Portofoliu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descoperiți proiectele noastre de pavaj și amenajări exterioare realizate cu profesionalism și atenție la detalii.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="min-w-[100px]"
            >
              {categoryTitles[category]}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-6xl">{categoryEmojis[item.category]}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  📍 {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Ce spun clienții noștri
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
            Solicitați o Ofertă Gratuită
          </Button>
        </div>
      </div>
    </div>
  );
}
