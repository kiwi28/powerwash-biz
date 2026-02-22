import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Contactează-ne
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Suntem aici să te ajutăm cu orice întrebare sau să îți oferim o ofertă personalizată.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-center">Telefon</CardTitle>
              <CardDescription className="text-center text-base">
                Sună-ne pentru o ofertă rapidă
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="tel:+40712345678"
                className="text-lg font-semibold text-blue-600 hover:text-blue-700"
              >
                +40 712 345 678
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Disponibil Luni-Vineri<br />8:00 - 18:00
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-center">Email</CardTitle>
              <CardDescription className="text-center text-base">
                Trimite-ne un email oricând
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <a
                href="mailto:contact@example.com"
                className="text-lg font-semibold text-green-600 hover:text-green-700"
              >
                contact@example.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                Răspuns în maxim 24 de ore
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-center">Locație</CardTitle>
              <CardDescription className="text-center text-base">
                Zona de acoperire
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg font-semibold text-purple-600">
                Iași și zonele învecinate
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Acoperim județul Iași<br />și localitățile apropiate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Working Hours Section */}
        <div className="mb-12">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Clock className="w-6 h-6" />
                Program de Lucru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Luni - Vineri</span>
                  <span className="text-primary font-semibold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Sâmbătă</span>
                  <span className="text-primary font-semibold">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Duminică</span>
                  <span className="text-muted-foreground">Închis</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Pentru urgențe în afara programului, ne puteți suna pentru a stabili o programare specială.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* What to Expect Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Ce Se Întâmplă După Ce Ne Contactezi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Ne contactezi prin telefon, email sau formularul de ofertă.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Ofertă</h3>
              <p className="text-sm text-muted-foreground">
                Îți pregătim o ofertă personalizată în maximum 24 de ore.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Execuție</h3>
              <p className="text-sm text-muted-foreground">
                Programăm și executăm lucrarea profesional și în timp util.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-12">
          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                De Ce Să Ne Alegeți?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Răspuns Rapid</h4>
                    <p className="text-sm text-muted-foreground">
                      Răspundem la cereri în maximum 24 de ore
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Oferte Transparente</h4>
                    <p className="text-sm text-muted-foreground">
                      Prețuri clare, fără costuri ascunse
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Garanție</h4>
                    <p className="text-sm text-muted-foreground">
                      Oferim garanție pentru toate serviciile
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Profesionalism</h4>
                    <p className="text-sm text-muted-foreground">
                      Echipă cu peste 10 ani de experiență
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
            Gata să Transformi Spațiul Tău?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactează-ne astăzi pentru o ofertă gratuită și vezi cum putem face diferența.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/solicita-oferta">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Solicită o Ofertă Gratuită
              </Button>
            </Link>
            <a href="tel:+40712345678">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                Sună Acum
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
