'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle, Send, ArrowLeft, ArrowRight } from 'lucide-react';

const quoteFormSchema = zod.object({
  fullName: zod.string().min(2, { message: 'Numele trebuie să aibă cel puțin 2 caractere' }),
  phone: zod
    .string()
    .regex(/^(07[0-9]{8}|\+407[0-9]{8})$/, { message: 'Numărul de telefon trebuie să fie un număr valid din România' }),
  email: zod.string().email({ message: 'Email-ul trebuie să fie valid' }),
  address: zod.string().min(5, { message: 'Adresa trebuie să aibă cel puțin 5 caractere' }),
  serviceType: zod.enum(['curatare-alei', 'curatare-pereti', 'curatare-terase', 'curatare-fatada', 'alta'], {
    required_error: 'Alegeți tipul de serviciu',
  }),
  surfaceArea: zod.string().min(1, { message: 'Suprafața este obligatorie' }),
  surfaceType: zod.enum(['beton', 'pietra', 'lemn', 'gips', 'alta'], {
    required_error: 'Alegeți tipul de suprafață',
  }),
  preferredDate: zod.string().min(1, { message: 'Data preferată este obligatorie' }),
  preferredTime: zod.enum(['dimineata', 'pranz', 'dupa-amiaza'], {
    required_error: 'Alegeți ora preferată',
  }),
  urgency: zod.enum(['normala', 'urgenta', 'foarte-urgenta'], {
    required_error: 'Alegeți nivelul de urgență',
  }),
  notes: zod.string().optional(),
});

type QuoteFormValues = zod.infer<typeof quoteFormSchema>;

const STEPS = ['personal-info', 'service-details', 'notes'] as const;
type Step = (typeof STEPS)[number];

export function QuoteForm() {
  const t = useTranslations('quoteForm');
  const [currentStep, setCurrentStep] = useState<Step>('personal-info');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      serviceType: 'curatare-alei',
      surfaceArea: '',
      surfaceType: 'beton',
      preferredDate: '',
      preferredTime: 'dimineata',
      urgency: 'normala',
      notes: '',
    },
  });

  const watchedFields = form.watch();

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/quote-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setShowSuccessModal(true);
      form.reset();
      setCurrentStep('personal-info');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('A apărut o eroare. Vă rugăm încercați din nou.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate: Record<Step, (keyof QuoteFormValues)[]> = {
      'personal-info': ['fullName', 'phone', 'email', 'address'],
      'service-details': ['serviceType', 'surfaceArea', 'surfaceType', 'preferredDate', 'preferredTime', 'urgency'],
      'notes': [],
    };

    const fields = fieldsToValidate[currentStep];
    if (fields.length > 0) {
      const isValid = await form.trigger(fields as any);
      if (!isValid) return;
    }

    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const isLastStep = currentStep === 'notes';

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicită o Ofertă</CardTitle>
              <CardDescription>
                Completează formularul pentru a primi o ofertă personalizată
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {STEPS.map((step, index) => (
                  <div key={step} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        STEPS.indexOf(currentStep) >= index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`flex-1 h-1 mx-2 ${index < STEPS.length - 1 ? 'bg-muted' : ''}`}
                      style={{
                        backgroundColor:
                          index < STEPS.length - 1 && STEPS.indexOf(currentStep) > index
                            ? 'var(--primary)'
                            : undefined,
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Step 1: Personal Info */}
              {currentStep === 'personal-info' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Informații Personale</h3>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nume Complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Ion Popescu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefon</FormLabel>
                        <FormControl>
                          <Input placeholder="0712345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="ion@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresă</FormLabel>
                        <FormControl>
                          <Input placeholder="Strada Exemplului nr. 10, Iași" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 'service-details' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Detalii Serviciu</h3>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tip de Serviciu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Alegeți tipul de serviciu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="curatare-alei">Curățare Alei</SelectItem>
                            <SelectItem value="curatare-pereti">Curățare Pereți Exteriori</SelectItem>
                            <SelectItem value="curatare-terase">Curățare Terasă</SelectItem>
                            <SelectItem value="curatare-fatada">Curățare Fațadă</SelectItem>
                            <SelectItem value="alta">Altul</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surfaceArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suprafață (mp)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="surfaceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tip de Suprafață</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Alegeți tipul de suprafață" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beton">Beton</SelectItem>
                            <SelectItem value="pietra">Piatră</SelectItem>
                            <SelectItem value="lemn">Lemn</SelectItem>
                            <SelectItem value="gips">Gips</SelectItem>
                            <SelectItem value="alta">Altul</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Preferată</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ora Preferată</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Alegeți ora preferată" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dimineata">Dimineața</SelectItem>
                            <SelectItem value="pranz">Prânz</SelectItem>
                            <SelectItem value="dupa-amiaza">După-amiaza</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgență</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Alegeți nivelul de urgență" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="normala">Normală</SelectItem>
                            <SelectItem value="urgenta">Urgentă</SelectItem>
                            <SelectItem value="foarte-urgenta">Foarte Urgentă</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Notes */}
              {currentStep === 'notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Note Adiționale</h3>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observații (Opțional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Orice alte detalii pe care doriți să le menționați..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Form Summary */}
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2">
                    <h4 className="font-semibold">Rezumat Cerere</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">Nume:</span> {watchedFields.fullName}</p>
                      <p><span className="font-medium">Telefon:</span> {watchedFields.phone}</p>
                      <p><span className="font-medium">Email:</span> {watchedFields.email}</p>
                      <p><span className="font-medium">Adresă:</span> {watchedFields.address}</p>
                      <p><span className="font-medium">Serviciu:</span> {watchedFields.serviceType}</p>
                      <p><span className="font-medium">Suprafață:</span> {watchedFields.surfaceArea} mp</p>
                      <p><span className="font-medium">Data:</span> {watchedFields.preferredDate}</p>
                      <p><span className="font-medium">Ora:</span> {watchedFields.preferredTime}</p>
                      <p><span className="font-medium">Urgență:</span> {watchedFields.urgency}</p>
                      {watchedFields.notes && (
                        <p><span className="font-medium">Note:</span> {watchedFields.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 'personal-info'}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Înapoi
                </Button>
                {isLastStep ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      'Se trimite...'
                    ) : (
                      <>
                        Trimite Cererea
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>
                    Continuă
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
              <DialogTitle className="text-2xl">Cerere Trimisă!</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Vă mulțumim pentru solicitare. Vă vom contacta în cel mai scurt timp pentru a stabili detaliile.
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessModal(false)}>
              Închide
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
