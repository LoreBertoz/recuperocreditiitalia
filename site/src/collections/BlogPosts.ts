import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access'
import { seoFields, slugField } from '@/fields/slug'

/** Guide e articoli (asset SEO+GEO). Pubblici solo i post pubblicati (versions + drafts). */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Guida / Articolo', plural: 'Guide / Articoli' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', '_status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return { _status: { equals: 'published' } }
    },
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      label: 'Titolo',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'cover',
      label: 'Immagine di copertina',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'excerpt',
      label: 'Estratto',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'Riassunto per liste e meta description (2-3 frasi).' },
    },
    {
      name: 'body',
      label: 'Contenuto',
      type: 'richText',
      required: true,
    },
    {
      name: 'author',
      label: 'Autore',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      label: 'Data di pubblicazione',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date().toISOString()
            return value
          },
        ],
      },
    },
    {
      name: 'tags',
      label: 'Tag',
      type: 'array',
      admin: { position: 'sidebar' },
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'faq',
      label: 'FAQ',
      type: 'array',
      admin: { description: 'Domande frequenti in coda all’articolo (markup FAQPage).' },
      fields: [
        { name: 'question', label: 'Domanda', type: 'text', required: true },
        { name: 'answer', label: 'Risposta', type: 'textarea', required: true },
      ],
    },
    seoFields,
  ],
}
