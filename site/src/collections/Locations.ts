import type { CollectionConfig } from 'payload'

import { anyone, isAdmin } from '@/access'
import { seoFields, slugify } from '@/fields/slug'

/**
 * Gerarchia geografica: regione → provincia → città.
 * Lo slug è unico per tipo (es. provincia "milano" e città "milano" possono coesistere:
 * il livello dell'URL li disambigua).
 */
export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: { singular: 'Località', plural: 'Località' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'parent'],
    listSearchableFields: ['name', 'slug'],
  },
  access: {
    read: anyone,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  indexes: [{ fields: ['type', 'slug'], unique: true }],
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: { position: 'sidebar', description: 'Se vuoto viene generato dal nome.' },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.length > 0) return slugify(value)
            const source = (data?.name as string | undefined) ?? ''
            return source ? slugify(source) : value
          },
        ],
      },
    },
    {
      name: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Regione', value: 'regione' },
        { label: 'Provincia', value: 'provincia' },
        { label: 'Città', value: 'citta' },
      ],
    },
    {
      name: 'parent',
      label: 'Località padre',
      type: 'relationship',
      relationTo: 'locations',
      index: true,
      admin: {
        description: 'Regione per le province, provincia per le città. Vuoto per le regioni.',
        condition: (data) => data?.type !== 'regione',
      },
      filterOptions: ({ data }) => {
        if (data?.type === 'provincia') return { type: { equals: 'regione' } }
        if (data?.type === 'citta') return { type: { equals: 'provincia' } }
        return false
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'lat', label: 'Latitudine', type: 'number', required: true },
        { name: 'lng', label: 'Longitudine', type: 'number', required: true },
      ],
    },
    {
      name: 'description',
      label: 'Testo descrittivo SEO',
      type: 'textarea',
      admin: {
        description:
          'Paragrafo unico per la pagina località. Se vuoto viene usato un testo generato variato (mai pagine vuote).',
      },
    },
    seoFields,
  ],
}
