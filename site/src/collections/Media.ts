import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user), // admin e agenzie (logo proprio)
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'alt',
      label: 'Testo alternativo',
      type: 'text',
      required: true,
      admin: { description: 'Descrizione dell’immagine per accessibilità e SEO.' },
    },
  ],
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 160, height: 160, position: 'centre' },
      { name: 'card', width: 640, height: 360, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
}
