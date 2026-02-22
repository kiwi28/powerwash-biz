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

// Define services array with id, title, icon, description, priceRange, details, and FAQ
const services = [
  {
    id: 'alei',
    title: 'Curățare Alei',
    description: 'Îndepărtare eficientă a mușchiului, a algelor și a petelor de pe aleile de beton și pietriș.',
    priceRange: '5-8',
    icon: <Zap className="h-6 w-6 text-primary" />,
    slug: 'curatare-alei',
    details: `Serviciul nostru de curățare a aleilor este soluția ideală pentru a reda aspectul curat și primitor aleilor tale. Folosim echipamente profesionale de spălare cu presiune care elimină eficient:

• Mușchiul și algele care se acumulează în timp
• Petele de ulei și alte substanțe
• Praful și murdăria depusă
• Debris-ul organic și resturile vegetale

Procesul de curățare respectă integritatea suprafeței tale, fie că este vorba de beton, pietriș, pavaj natural sau alte materiale. Echipa noastră are experiență în tratarea tuturor tipurilor de alei și intrări.

După curățare, aleea ta va fi sigură pentru circulație pietonală și auto, eliminând riscul de alunecare cauzat de mușchi sau umiditate excesivă.`,
    faq: [
      {
        q: 'Cât durează curățarea unei alei?',
        a: 'Timpul necesar depinde de dimensiunea aleei și de gradul de murdărie. În general, o alee de dimensiuni medii (20-30 m²) poate fi curățată în 1-2 ore.',
      },
      {
        q: 'Este sigur pentru plantele din apropiere?',
        a: 'Da, folosim tehnici și produse care nu afectează plantele și mediul înconjurător. Putem proteja zonele sensibile înainte de începerea lucrării.',
      },
      {
        q: 'Curățarea afectează etanșeitatea aleei?',
        a: 'Nu, procedura noastră menține integritatea suprafeței. Dacă există probleme de etanșeitate preexistente, vă putem recomanda reparații înainte de curățare.',
      },
    ],
  },
  {
    id: 'pereti',
    title: 'Curățare Pereți Exteriori',
    description: 'Restaurarea aspectului original al pereților exteriori cu echipamente profesionale de spălare.',
    priceRange: '8-12',
    icon: <Shield className="h-6 w-6 text-primary" />,
    slug: 'curatare-pereti',
    details: `Serviciul de curățare a pereților exteriori readuce frumusețea originală a clădirii tale. Pereții exteriori sunt expuși constant la elementele naturii, acumulând:

• Praful și poluarea atmosferică
• Pete de mucegai și alge
• Cearcăne de ploaie și pete de apă
• Dejectări de păsări
• Grăsime și reziduuri de la instalații

Echipa noastră utilizează echipamente de înaltă presiune ajustate pentru a curăța eficient fără a deteriora finisajul pereților. Tratăm fiecare tip de suprafață (cărămidă, beton, lemn, tencuială) cu tehnici specifice.

Curățarea regulată a pereților exteriori nu doar îmbunătățește estetica, ci și prelungesc durata de viață a finisajelor și previne deteriorarea cauzată de acumularea de murdărie.`,
    faq: [
      {
        q: 'Pot fi curățați pereții de cărămidă fără a afecta rosturile?',
        a: 'Da, ajustăm presiunea și tehnicile de curățare în funcție de material. Pentru cărămidă și rosturi sensibile, folosim metode delicate dar eficiente.',
      },
      {
        q: 'Este necesară curățarea înainte de vopsire?',
        a: 'Absolut. Curățarea pereților înainte de vopsire asigură o aderență optimă a vopselei și un rezultat durabil. Este un pas esențial în pregătirea suprafeței.',
      },
      {
        q: 'Curățarea funcționează pe pereți de lemn?',
        a: 'Da, avem experiență în curățarea pereților de lemn exteriori. Folosim presiune ajustată și produse compatibile cu lemnul pentru a evita deteriorarea.',
      },
    ],
  },
  {
    id: 'terase',
    title: 'Curățare Teras',
    description: 'Terase curate și sigure, perfecte pentru utilizare imediată după tratament.',
    priceRange: '6-10',
    icon: <Award className="h-6 w-6 text-primary" />,
    slug: 'curatare-terase',
    details: `O terasă curată este o terasă utilizabilă. Serviciul nostru de curățare a teraselor transformă spațiul tău exterior într-o zonă perfectă pentru relaxare și socializare. Eliminăm:

• Straturile de murdărie și praf
• Algele și mușchiul care creează suprafețe alunecoase
• Petele de mâncare, băuturi și grătar
• Resturile vegetale și polenul
• Depunerile de la ploaie și vânt

Fie că terasa ta este din lemn, ceramică, piatră naturală sau materiale compozite, avem expertiza necesară pentru a o curăța eficient și în siguranță.

După curățare, terasa va fi gata de utilizare imediată. Pentru terase din lemn, vă putem recomanda și aplicarea de produse de protecție pentru a prelungi durata de viață a materialului.`,
    faq: [
      {
        q: 'Cât durează curățarea unei terase medii?',
        a: 'O terasă de 20-30 m² poate fi curățată în 2-3 ore, în funcție de gradul de murdărie și de tipul materialului.',
      },
      {
        q: 'Este nevoie să mă mut din mobilierul de pe terasă?',
        a: 'Preferăm ca mobilierul să fie mutat sau acoperit. Dacă nu puteți face acest lucru, echipa noastră poate muta mobilierul cu grijă înainte de a începe curățarea.',
      },
      {
        q: 'Tersele din lemn vor trebui retensionate după curățare?',
        a: 'Curățarea nu afectează integritatea lemnului. Totuși, pentru terasele exposite constant la soare, recomandăm aplicarea unui ulei sau lac protector periodic.',
      },
    ],
  },
  {
    id: 'garduri',
    title: 'Curățare Garduri',
    description: 'Servicii complete de curățare a gardurilor pentru a reda strălucirea și aspectul estetic.',
    priceRange: '7-11',
    icon: <Users className="h-6 w-6 text-primary" />,
    slug: 'curatare-garduri',
    details: `Gardul tău este prima impresie vizuală a proprietății tale. Serviciul nostru de curățare a gardurilor reda frumusețea și integritatea acestora. Curățăm eficient:

• Depunerile de praf și poluare
• Mușchiul și algele care afectează aspectul
• Petele de vopsea veche sau alte contaminanți
• Resturile vegetale și dejectările de păsări
• Oxidarea și decolorarea

Echipa noastră are experiență în curățarea tuturor tipurilor de garduri: din lemn, metal, PVC, beton sau materiale combinate. Fiecare material necesită o abordare specifică pe care o aplicăm cu profesionalism.

Un gard curat nu doar arată mai bine, ci este și mai durabil. Îndepărtarea depunerilor nocive previne deteriorarea prematură și reduce necesitatea reparațiilor costisitoare.`,
    faq: [
      {
        q: 'Pot fi curățate gardurile vechi și deteriorate?',
        a: 'Da, putem curăța gardurile în orice stare. Totuși, pentru garduri cu deteriorări semnificative, vă recomandăm reparații înainte de curățare pentru a evita agravarea problemelor.',
      },
      {
        q: 'Curățarea afectează vopseaua existentă pe gard?',
        a: 'Dacă vopseaua este în stare bună, curățarea nu o afectează. Pentru zone cu vopsea decojită, vă recomandăm reîmprospătarea finisajului după curățare.',
      },
      {
        q: 'Este necesară curățarea înainte de vopsirea gardului?',
        a: 'Este absolut necesară. Vopsirea unui gard murdu nu aderă corect și rezultatele sunt de scurtă durată. Curățarea este primul pas esențial în orice proces de revopsire.',
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Intro Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Serviciile Noastre
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Oferim servicii profesionale de curățare cu presiune pentru toate tipurile de suprafețe exterioare.
              Cu echipamente de înaltă calitate și o echipă experimentată, garantăm rezultate impecabile.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards Grid Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Serviciile Principale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descoperă gama noastră completă de servicii de curățare profesională.
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
            <h2 className="text-3xl font-bold mb-4">Detalii Servicii</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Află mai multe despre fiecare serviciu și răspunsuri la întrebări frecvente.
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
                          <span className="text-sm font-medium">Preț:</span>
                          <span className="text-sm text-primary font-semibold">
                            De la {service.priceRange} RON/m²
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
                    Detalii Complete Serviciu
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
                    Întrebări Frecvente
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
              Ești Gata să Transformi Spațiul Tău?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Contactează-ne astăzi pentru o ofertă gratuită personalizată și vezi cum putem face diferența.
            </p>
            <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link href="/solicita-oferta">
                Solicită o Ofertă
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
