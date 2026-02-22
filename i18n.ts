import { getRequestConfig } from 'next-intl/server';

export const locales = ['ro', 'en'] as const;
export const defaultLocale = 'ro' as const;

export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
