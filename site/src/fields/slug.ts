import type { Field } from 'payload'

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

/** Campo slug: generato dal campo sorgente se lasciato vuoto. */
export function slugField(sourceField = 'name'): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description: `Usato nell'URL. Se vuoto viene generato da "${sourceField}".`,
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          const source = (data?.[sourceField] as string | undefined) ?? ''
          if (typeof value === 'string' && value.length > 0) return slugify(value)
          if (source) return slugify(source)
          return value
        },
      ],
    },
  }
}

/** Gruppo di campi SEO riutilizzabile (metaTitle/metaDescription). */
export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 120,
      admin: { description: 'Title tag (ideale ≤ 60-70 caratteri). Se vuoto viene generato.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 300,
      admin: { description: 'Meta description (ideale ≤ 160 caratteri). Se vuota viene generata.' },
    },
  ],
}
