'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface ServiceCardProps {
  title: string;
  description: string;
  priceRange: string;
  icon: React.ReactNode;
  slug: string;
}

export function ServiceCard({ title, description, priceRange, icon, slug }: ServiceCardProps) {
  const t = useTranslations('serviceCard');

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t('price')} {priceRange} {t('priceUnit')}</span>
          <Link href={`/servicii#${slug}`}>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
