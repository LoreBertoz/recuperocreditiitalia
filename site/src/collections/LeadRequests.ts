import type { CollectionConfig } from 'payload'

import { anyone, isAdmin } from '@/access'

/** Richieste dai form: "Diventa partner" e contatti generici. Creazione pubblica, lettura solo staff. */
export const LeadRequests: CollectionConfig = {
  slug: 'lead-requests',
  labels: { singular: 'Richiesta', plural: 'Richieste' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['type', 'name', 'email', 'status', 'createdAt'],
  },
  access: {
    create: anyone,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'type',
      label: 'Tipo richiesta',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Diventa partner (agenzia)', value: 'partner' },
        { label: 'Contatto generico', value: 'contact' },
      ],
    },
    { name: 'name', label: 'Nome e cognome', type: 'text', required: true },
    { name: 'company', label: 'Ragione sociale', type: 'text' },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Telefono', type: 'text' },
    {
      name: 'requestedTier',
      label: 'Pacchetto richiesto',
      type: 'select',
      options: [
        { label: 'Base', value: 'base' },
        { label: 'Premium', value: 'premium' },
        { label: 'Top', value: 'top' },
      ],
      admin: { condition: (data) => data?.type === 'partner' },
    },
    { name: 'message', label: 'Messaggio', type: 'textarea' },
    {
      name: 'privacyConsent',
      label: 'Consenso privacy',
      type: 'checkbox',
      required: true,
      admin: { description: 'Obbligatorio: informativa privacy accettata (GDPR).' },
    },
    {
      name: 'status',
      label: 'Stato',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Nuova', value: 'new' },
        { label: 'Contattato', value: 'contacted' },
        { label: 'Chiusa', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}
