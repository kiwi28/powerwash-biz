import { locales } from '@/i18n';
import type { Locale } from '@/lib/getLocalePath';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IntlProvider from '@/components/IntlProvider';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Import messages directly for the current locale
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <IntlProvider messages={messages} locale={locale}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </IntlProvider>
  );
}
