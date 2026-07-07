import type { Access, FieldAccess, Where } from 'payload'

import type { User } from '@/payload-types'

export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  const onlySelf: Where = { id: { equals: user.id } }
  return onlySelf
}

export const anyone: Access = () => true

function agencyIdOf(user: User | null): number | null {
  if (!user || user.role !== 'agency' || !user.agency) return null
  return typeof user.agency === 'object' ? user.agency.id : user.agency
}

/**
 * Regola d'oro del progetto: un'agenzia è pubblica SOLO se subscriptionStatus === 'active'.
 * Gli admin vedono tutto; un utente-agenzia vede anche la propria scheda non attiva.
 */
export const readActiveAgenciesOnly: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  const activeOnly: Where = { subscriptionStatus: { equals: 'active' } }
  const ownAgencyId = agencyIdOf(user)
  if (ownAgencyId) {
    const activeOrOwn: Where = { or: [activeOnly, { id: { equals: ownAgencyId } }] }
    return activeOrOwn
  }
  return activeOnly
}

/** L'agenzia può aggiornare solo la propria scheda; l'admin tutte. */
export const updateOwnAgency: Access = ({ req: { user } }) => {
  if (user?.role === 'admin') return true
  const ownAgencyId = agencyIdOf(user)
  if (ownAgencyId) {
    const onlyOwn: Where = { id: { equals: ownAgencyId } }
    return onlyOwn
  }
  return false
}
