export const GalleryItems = {
  slug: 'gallery-items',
  admin: {
    useAsTitle: 'caption',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine Înainte',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Imagine După',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categorie',
      options: [
        'alei',
        'pereti',
        'terase',
        'comercial',
      ],
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Descriere',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Locație',
    },
    {
      name: 'dateCompleted',
      type: 'date',
      label: 'Data Finalizare',
    },
  ],
}
