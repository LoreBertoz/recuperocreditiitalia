import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminFieldLevel, isAdminOrSelf } from '@/access'

/**
 * Utenti del pannello: staff admin + account delle agenzie per l'area riservata.
 * Gli utenti "agency" sono collegati alla propria scheda tramite il campo `agency`.
 */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utente', plural: 'Utenti' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role'],
  },
  auth: true,
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    // Solo gli admin accedono al pannello /admin completo; le agenzie usano l'area riservata frontend
    admin: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      label: 'Nome',
      type: 'text',
    },
    {
      name: 'role',
      label: 'Ruolo',
      type: 'select',
      required: true,
      defaultValue: 'agency',
      options: [
        { label: 'Admin (staff portale)', value: 'admin' },
        { label: 'Agenzia', value: 'agency' },
      ],
      access: {
        // Solo un admin può assegnare/cambiare i ruoli
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      saveToJWT: true,
    },
    {
      name: 'agency',
      label: 'Agenzia collegata',
      type: 'relationship',
      relationTo: 'agencies',
      admin: {
        condition: (data) => data?.role === 'agency',
        description: 'La scheda agenzia gestita da questo utente nell’area riservata.',
      },
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      saveToJWT: true,
    },
  ],
}
