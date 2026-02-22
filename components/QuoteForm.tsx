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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle, Send, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const quoteFormSchema = zod.object({
  fullName: zod.string().min(2, { message: 'Numele trebuie să aibă cel puțin 2 caractere' }),
  phone: zod.string().regex(/^(07[0-9]{8}|\+407[0-9]{8})$/, { message: 'Numărul de telefon trebuie să fie un număr valid din România' }),
  email: zod.string().email({ message: 'Email-ul trebuie să fie valid' }),
  address: zod.string().min(5, { message: 'Adresa trebuie să aibă cel puțin 5 caractere' }),
  serviceType: zod.enum(['curatare-alei', 'curatare-pereti', 'curatare-terase', 'curatare-fatada', 'alta']),
  surfaceArea: zod.string().min(1, { message: 'Suprafața este obligatorie' }),
  surfaceType: zod.enum(['beton', 'pietra', 'lemn', 'gips', 'alta']),
  preferredDate: zod.string().min(1, { message: 'Data preferată este obligatorie' }),
  preferredTime: zod.enum(['dimineata', 'pranz', 'dupa-amiaza']),
  urgency: zod.enum(['normala', 'urgenta', 'foarte-urgenta']),
  notes: zod.string().optional(),
});

type QuoteFormValues = zod.infer<typeof quoteFormSchema>;

const STEPS = ['personal-info', 'service-details', 'notes'] as const;
type Step = (typeof STEPS)[number];

export function QuoteForm() {
  const t = useTranslations('form');
  const tCommon = useTranslations('common');
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

  // Custom error messages
  const getErrorMessage = (error: any) => {
    if (error?.type === 'too_small') {
      if (error.path.includes('fullName')) return t('errors.fullName');
      if (error.path.includes('address')) return t('errors.address');
    }
    if (error?.type === 'invalid_string') {
      if (error.path.includes('phone')) return t('errors.phone');
      if (error.path.includes('email')) return t('errors.email');
    }
    if (error?.type === 'required' || error?.type === 'too_small') {
      if (error.path.includes('surfaceArea')) return t('errors.surfaceArea');
      if (error.path.includes('preferredDate')) return t('errors.preferredDate');
    }
    return '';
  };

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
      alert(t('errors.submitError'));
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
              <CardTitle>{t('title')}</CardTitle>
              <CardDescription>
                {t('description')}
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
                  <h3 className="text-lg font-semibold mb-4">{t('steps.personalInfo')}</h3>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.fullName.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('fields.fullName.placeholder')} {...field} />
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
                        <FormLabel>{t('fields.phone.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('fields.phone.placeholder')} {...field} />
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
                        <FormLabel>{t('fields.email.label')}</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder={t('fields.email.placeholder')} {...field} />
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
                        <FormLabel>{t('fields.address.label')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('fields.address.placeholder')} {...field} />
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
                  <h3 className="text-lg font-semibold mb-4">{t('steps.serviceDetails')}</h3>
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.serviceType.label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('fields.serviceType.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="curatare-alei">{t('fields.serviceType.options.alei')}</SelectItem>
                            <SelectItem value="curatare-pereti">{t('fields.serviceType.options.pereti')}</SelectItem>
                            <SelectItem value="curatare-terase">{t('fields.serviceType.options.terase')}</SelectItem>
                            <SelectItem value="curatare-fatada">{t('fields.serviceType.options.fatada')}</SelectItem>
                            <SelectItem value="alta">{t('fields.serviceType.options.alta')}</SelectItem>
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
                        <FormLabel>{t('fields.surfaceArea.label')}</FormLabel>
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
                        <FormLabel>{t('fields.surfaceType.label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('fields.surfaceType.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beton">{t('fields.surfaceType.options.beton')}</SelectItem>
                            <SelectItem value="pietra">{t('fields.surfaceType.options.pietra')}</SelectItem>
                            <SelectItem value="lemn">{t('fields.surfaceType.options.lemn')}</SelectItem>
                            <SelectItem value="gips">{t('fields.surfaceType.options.gips')}</SelectItem>
                            <SelectItem value="alta">{t('fields.surfaceType.options.alta')}</SelectItem>
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
                        <FormLabel>{t('fields.preferredDate.label')}</FormLabel>
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
                        <FormLabel>{t('fields.preferredTime.label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('fields.preferredTime.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="dimineata">{t('fields.preferredTime.options.dimineata')}</SelectItem>
                            <SelectItem value="pranz">{t('fields.preferredTime.options.pranz')}</SelectItem>
                            <SelectItem value="dupa-amiaza">{t('fields.preferredTime.options.dupa-amiaza')}</SelectItem>
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
                        <FormLabel>{t('fields.urgency.label')}</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('fields.urgency.placeholder')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="normala">{t('fields.urgency.options.normala')}</SelectItem>
                            <SelectItem value="urgenta">{t('fields.urgency.options.urgenta')}</SelectItem>
                            <SelectItem value="foarte-urgenta">{t('fields.urgency.options.foarte-urgenta')}</SelectItem>
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
                  <h3 className="text-lg font-semibold mb-4">{t('steps.notes')}</h3>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('fields.notes.label')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('fields.notes.placeholder')}
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
                    <h4 className="font-semibold">{t('summary.title')}</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="font-medium">{t('summary.name')}:</span> {watchedFields.fullName}</p>
                      <p><span className="font-medium">{t('summary.phone')}:</span> {watchedFields.phone}</p>
                      <p><span className="font-medium">{t('summary.email')}:</span> {watchedFields.email}</p>
                      <p><span className="font-medium">{t('summary.address')}:</span> {watchedFields.address}</p>
                      <p><span className="font-medium">{t('summary.service')}:</span> {watchedFields.serviceType}</p>
                      <p><span className="font-medium">{t('summary.surface')}:</span> {watchedFields.surfaceArea} {tCommon('mp')}</p>
                      <p><span className="font-medium">{t('summary.date')}:</span> {watchedFields.preferredDate}</p>
                      <p><span className="font-medium">{t('summary.time')}:</span> {watchedFields.preferredTime}</p>
                      <p><span className="font-medium">{t('summary.urgency')}:</span> {watchedFields.urgency}</p>
                      {watchedFields.notes && (
                        <p><span className="font-medium">{t('summary.notes')}:</span> {watchedFields.notes}</p>
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
                  {t('buttons.back')}
                </Button>
                {isLastStep ? (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      t('buttons.submitting')
                    ) : (
                      <>
                        {t('buttons.submit')}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep}>
                    {t('buttons.continue')}
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
              <DialogTitle className="text-2xl">{t('success.title')}</DialogTitle>
              <DialogDescription className="text-base mt-2">
                {t('success.message')}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessModal(false)}>
              {t('success.close')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
