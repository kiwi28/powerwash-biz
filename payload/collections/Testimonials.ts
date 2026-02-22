import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nume',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      label: 'Rating (1-5)',
      min: 1,
      max: 5,
    },
    {
      name: 'review',
      type: 'textarea',
      required: true,
      label: 'Recenzie',
    },
    {
      name: 'service',
      type: 'select',
      required: true,
      label: 'Serviciu',
      options: [
        'alei',
        'pereti',
        'terase',
        'garduri',
        'acoperis',
        'comercial',
      ],
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data',
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      label: 'Vizibil',
    },
  ],
}
