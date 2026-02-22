import { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'address',
      type: 'text',
      label: 'Adresă',
    },
    {
      name: 'businessHours',
      type: 'textarea',
      label: 'Program',
    },
    {
      name: 'serviceArea',
      type: 'textarea',
      label: 'Zonă Acoperită',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'facebookUrl',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'instagramUrl',
    },
    {
      name: 'whatsappUrl',
      type: 'text',
      label: 'whatsappUrl',
    },
  ],
};
