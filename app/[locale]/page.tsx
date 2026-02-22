import { getTranslations } from 'next-intl/server';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, Users, Zap, Search, FileText, Phone } from 'lucide-react';
import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import { Locale } from '@/lib/getLocalePath';

// Define services array
const services = [
  {
    title: 'Curățare Alei',
    description: 'Îndepărtare eficientă a mușchiului, a algelor și a petelor de pe aleile de beton și pietriș.',
    priceRange: '5-8',
    icon: <Zap className="h-6 w-6 text-primary" />,
    slug: 'curatare-alei',
  },
  {
    title: 'Curățare Pereți Exteriori',
    description: 'Restaurarea aspectului original al pereț exteriori cu echipamente profesionale de spălare.',
    priceRange: '8-12',
    icon: <Shield className="h-6 w-6 text-primary" />,
    slug: 'curatare-pereti',
  },
  {
    title: 'Curățare Teras',
    description: 'Terase curate și sigure, perfecte pentru utilizare imediată după tratament.',
    priceRange: '6-10',
    icon: <Award className="h-6 w-6 text-primary" />,
    slug: 'curatare-terase',
  },
  {
    title: 'Curățare Fațadă',
    description: 'Servicii complete de curățare a fațadelor pentru a reda strălucirea clădirilor.',
    priceRange: '10-15',
    icon: <Users className="h-6 w-6 text-primary" />,
    slug: 'curatare-fatada',
  },
];

// Define benefits array
const benefits = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: 'Echipament Profesional',
    description: 'Utilizăm doar echipamente de înaltă presiune și produse de curățare certificate.',
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Garanție a Lucrării',
    description: 'Oferim garanție pentru toate serviciile noastre de curățare cu presiune.',
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Execuție Rapidă',
    description: 'Echipa noastră eficientă realizează lucrările în cel mai scurt timp posibil.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Experiență',
    description: 'Peste 10 ani de experiență în domeniul curățării profesionale.',
  },
];

// Define steps array
const steps = [
  {
    number: 1,
    title: 'Solicită o Ofertă',
    description: 'Contactează-ne pentru o ofertă gratuită personalizată în funcție de nevoile tale.',
  },
  {
    number: 2,
    title: 'Programare',
    description: 'Stabilim împreună data și ora celei mai potrivite pentru executarea lucrării.',
  },
  {
    number: 3,
    title: 'Execuție și Garanție',
    description: 'Realizăm lucrarea profesional și oferim garanție pentru rezultate.',
  },
];

// Define testimonials array
const testimonials = [
  {
    name: 'Maria Ionescu',
    rating: 5,
    review: 'Serviciu excelent! Aleea mea arată ca nouă după curățare. Recomand cu încredere.',
    service: 'Curățare Alei',
  },
  {
    name: 'Alexandru Popescu',
    rating: 5,
    review: 'Profesionalism și promptitudine. Echipa a respectat termenele și lucrarea arată impecabil.',
    service: 'Curățare Fațadă',
  },
  {
    name: 'Elena Dumitrescu',
    rating: 5,
    review: 'Am fost plăcut surprinsă de rezultat. Terasa mea a fost curățată rapid și eficient.',
    service: 'Curățare Teras',
  },
];

// Define before/after gallery items
const galleryItems = [
  { emoji: '🏠', title: 'Alee înainte', subtitle: 'Suprafață cu mușchi' },
  { emoji: '✨', title: 'Alee după', subtitle: 'Curățată profesional' },
  { emoji: '🏢', title: 'Fațadă înainte', subtitle: 'Culoare pătată' },
  { emoji: '🌟', title: 'Fațadă după', subtitle: 'Aspect nou' },
  { emoji: '🌳', title: 'Terasă înainte', subtitle: 'Strat gros de murdărie' },
  { emoji: '💎', title: 'Terasă după', subtitle: 'Suprafață curată' },
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = locale as Locale;

  // const t = await getTranslations('hero');

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Serviciile Noastre</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferim servicii profesionale de curățare cu presiune pentru toate tipurile de suprafețe exterioare.
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
                {currentLocale === 'en' ? 'View All Services' : 'Vezi Toate Serviciile'}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">De Ce Noi?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Suntem lideri în domeniul curățării cu presiune în Iași.
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
            <h2 className="text-3xl font-bold mb-4">Cum Funcționează</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Procesul nostru simplu și eficient în 3 pași.
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
            <h2 className="text-3xl font-bold mb-4">Înainte și După</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Vezi diferența pe care o putem face.
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
            <h2 className="text-3xl font-bold mb-4">Ce Spun Clienții</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Feedback-ul clienților noștri ne motivează să fim mereu la înălțime.
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
            <h2 className="text-3xl font-bold mb-4">Zona de Acoperire</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Oferim servicii de curățare cu presiune în Iași și zonele învecinate. Dacă locuiești în Iași sau în localitățile apropiate, suntem disponibili să te ajutăm.
            </p>
            <p className="text-muted-foreground">
              Contactează-ne pentru a verifica dacă acoperim zona ta și pentru a obține o ofertă personalizată.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ești Gata să Transformi Spațiul Tău?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contactează-ne astăzi pentru o ofertă gratuită și vezi cum putem face diferența.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href={currentLocale === 'en' ? '/en/solicita-oferta' : '/solicita-oferta'}>
                  <FileText className="mr-2 h-4 w-4" />
                  {currentLocale === 'en' ? 'Request a Quote' : 'Solicită o Ofertă'}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <a href="tel:07XXXXXXXX">
                  <Phone className="mr-2 h-4 w-4" />
                  07XX XXX XXX
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
