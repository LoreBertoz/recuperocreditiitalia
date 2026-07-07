import type { CollectionConfig } from 'payload'

import { anyone, isAdmin } from '@/access'
import { seoFields, slugField } from '@/fields/slug'

/** Tipologie di servizio di recupero crediti (alimentano filtri e pagine /servizi/[servizio]). */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Servizio', plural: 'Servizi' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order'],
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'shortDescription',
      label: 'Descrizione breve',
      type: 'textarea',
      required: true,
      admin: { description: 'Mostrata nelle card e nei risultati di ricerca (1-2 frasi).' },
    },
    {
      name: 'description',
      label: 'Descrizione completa',
      type: 'richText',
      required: true,
      admin: {
        description:
          'Contenuto della pagina /servizi/[slug]. Testo esaustivo e utile: definizione, quando serve, come funziona (SEO/GEO).',
      },
    },
    {
      name: 'faq',
      label: 'FAQ',
      type: 'array',
      admin: { description: 'Domande frequenti per la pagina servizio (markup FAQPage).' },
      fields: [
        { name: 'question', label: 'Domanda', type: 'text', required: true },
        { name: 'answer', label: 'Risposta', type: 'textarea', required: true },
      ],
    },
    {
      name: 'order',
      label: 'Ordine',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'Ordinamento nelle liste (crescente).' },
    },
    seoFields,
  ],
}
