import { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Nume Complet',
    },
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
      required: true,
      label: 'Adresă / Locație',
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      label: 'Tip Serviciu',
      options: [
        'alei',
        'pereti',
        'terase',
        'garduri',
        'acoperis',
        'comercial',
        'altele',
      ],
    },
    {
      name: 'surfaceArea',
      type: 'number',
      label: 'Suprafață (m²)',
    },
    {
      name: 'surfaceType',
      type: 'select',
      label: 'Tip Suprafață',
      options: [
        'beton',
        'piatra',
        'caramida',
        'lemn',
        'nu-stiu',
      ],
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'Data Preferată',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'preferredTime',
      type: 'select',
      label: 'Ora Preferată',
      options: [
        'dimineata',
        'pranz',
        'dupa-amiaza',
        'oricand',
      ],
    },
    {
      name: 'urgency',
      type: 'select',
      label: 'Urgență',
      options: [
        'normal',
        'urgent',
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Alte Detalii',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        'new',
        'contacted',
        'quoted',
        'scheduled',
        'completed',
        'cancelled',
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Note Admin (Privat)',
      admin: {
        condition: (data) => data.status !== 'new',
      },
    },
  ],
}
