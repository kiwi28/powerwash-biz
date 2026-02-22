'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  rating: number;
  review: string;
  service?: string;
}

export default function TestimonialCard({
  name,
  rating,
  review,
  service,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= rating ? 'fill-current text-yellow-500' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <blockquote className="mb-4 text-gray-700">
          "{review}"
        </blockquote>
        <div className="flex items-center justify-between">
          <p className="font-semibold">{name}</p>
          {service && <p className="text-gray-500">{service}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
