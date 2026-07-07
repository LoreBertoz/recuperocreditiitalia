import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminFieldLevel, readActiveAgenciesOnly, updateOwnAgency } from '@/access'
import { seoFields, slugField } from '@/fields/slug'

/**
 * Le agenzie sponsor. REGOLA D'ORO: pubblica solo se subscriptionStatus === 'active'
 * (applicata sia nell'access control sia nelle query frontend).
 */
export const Agencies: CollectionConfig = {
  slug: 'agencies',
  labels: { singular: 'Agenzia', plural: 'Agenzie' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sponsorTier', 'subscriptionStatus', 'verified'],
    listSearchableFields: ['name', 'slug'],
  },
  access: {
    read: readActiveAgenciesOnly,
    create: isAdmin,
    update: updateOwnAgency,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      label: 'Nome agenzia',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'descriptionShort',
      label: 'Descrizione breve',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'Mostrata nei risultati di ricerca (2-3 frasi).' },
    },
    {
      name: 'descriptionLong',
      label: 'Descrizione estesa',
      type: 'richText',
      admin: { description: 'Contenuto della scheda agenzia.' },
    },
    {
      name: 'services',
      label: 'Servizi offerti',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
    },
    {
      name: 'coverageAreas',
      label: 'Zone di copertura',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      required: true,
      admin: {
        description:
          'Regioni/province/città in cui l’agenzia opera. Determina in quali pagine località compare.',
      },
    },
    {
      name: 'headquarters',
      label: 'Sede',
      type: 'group',
      fields: [
        { name: 'address', label: 'Indirizzo', type: 'text', required: true },
        { name: 'city', label: 'Città', type: 'text', required: true },
        { name: 'province', label: 'Provincia (sigla)', type: 'text', maxLength: 2 },
        { name: 'postalCode', label: 'CAP', type: 'text', maxLength: 5 },
        {
          type: 'row',
          fields: [
            { name: 'lat', label: 'Latitudine', type: 'number', required: true },
            { name: 'lng', label: 'Longitudine', type: 'number', required: true },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'contactPhone', label: 'Telefono', type: 'text' },
        { name: 'contactEmail', label: 'Email', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'website', label: 'Sito web', type: 'text' },
        { name: 'whatsapp', label: 'WhatsApp', type: 'text' },
      ],
    },
    {
      name: 'sponsorTier',
      label: 'Livello sponsor',
      type: 'select',
      required: true,
      defaultValue: 'base',
      index: true,
      options: [
        { label: 'Base', value: 'base' },
        { label: 'Premium', value: 'premium' },
        { label: 'Top', value: 'top' },
      ],
      admin: { position: 'sidebar' },
      access: {
        update: isAdminFieldLevel, // il tier lo cambia solo lo staff (pagamento manuale)
      },
    },
    {
      name: 'subscriptionStatus',
      label: 'Stato abbonamento',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'In attesa', value: 'pending' },
        { label: 'Attivo', value: 'active' },
        { label: 'Sospeso', value: 'suspended' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Solo le agenzie ATTIVE sono visibili sul sito pubblico.',
      },
      access: {
        update: isAdminFieldLevel, // attivazione manuale dallo staff dopo il pagamento
      },
    },
    {
      name: 'verified',
      label: 'Sponsor verificato',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Mostra il badge "Sponsor verificato".' },
      access: {
        update: isAdminFieldLevel,
      },
    },
    {
      name: 'stripeCustomerId',
      label: 'Stripe Customer ID',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Predisposizione Stripe (non attivo — pagamenti manuali).',
        readOnly: true,
      },
      access: {
        update: isAdminFieldLevel,
      },
    },
    seoFields,
  ],
}
