import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Clock, Sparkles, Award } from 'lucide-react';

export default function DesprePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Despre Noi
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Suntem dedicați să transformăm spațiile exterioare în opere de artă funcțională, cu profesionalism și atenție la fiecare detaliu.
          </p>
        </div>

        {/* Personal Story Section */}
        <div className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Povestea Noastră</CardTitle>
              <CardDescription className="text-lg">
                De la o pasiune la o afacere de succes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Povestea noastră a început în urmă cu mai mulți ani, când am descoperit pasiunea pentru transformarea spațiilor exterioare. Ceea ce a început ca un proiect personal s-a transformat într-o afacere de familie, construită pe încredere, calitate și satisfacerea clienților.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                De-a lungul anilor, am completat sute de proiecte, de la simple alei de grădină până la spații comerciale complexe. Fiecare proiect ne-a învățat ceva nou și ne-a ajutat să ne perfecționăm meșteșugul.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Astăzi, suntem mândri să fim partenerul de încredere pentru clienți din toată țara, oferind servicii de pavaj și amenajări exterioare care depășesc așteptările.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            De Ce Să Ne Alegeți
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Calitate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Folosim doar materiale premium și tehnici dovedite pentru rezultate durabile.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Punctualitate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Respectăm termenele limită și livrăm proiectele la timp, fără excepții.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Profesionalism</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Echipa noastră este formată din experți cu ani de experiență în domeniu.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Transparență</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Oferte clare, fără costuri ascunse și comunicare deschisă pe tot parcursul proiectului.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Valorile Noastre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Excelență</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ne angajăm să depășim așteptările clienților noștri prin calitate superioară în fiecare aspect al muncii noastre.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Integritate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Operăm cu onestitate și transparență în toate relațiile noastre de afaceri, construid încredere pe termen lung.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Inovație</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Îmbrățișăm tehnologii și tehnici noi pentru a oferi soluții moderne și eficiente pentru nevoile clienților.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Sustenabilitate</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Ne preocupăm de mediu și folosim materiale și practici durabile oriunde este posibil în proiectele noastre.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team/Equipment Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Echipa și Echipamentele Noastre
          </h2>
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-8xl">🔧</span>
            </div>
            <CardContent className="p-6">
              <p className="text-gray-700 text-center text-lg">
                Echipa noastră profesionistă, cu echipamente moderne și de ultimă generație, este pregătită să preia orice proiect.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">
            Gata să începem proiectul dvs.?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contactați-ne astăzi pentru o consultanță gratuită și o ofertă personalizată.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
              Contactați-ne
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
