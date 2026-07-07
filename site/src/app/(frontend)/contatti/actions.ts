'use server'

import { getPayloadClient } from '@/lib/api'

export type LeadFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

/** Server action condivisa dai form contatti e diventa-partner → collection LeadRequests. */
export async function submitLeadRequest(
  _previous: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const type = formData.get('type') === 'partner' ? 'partner' : 'contact'
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const company = String(formData.get('company') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  const requestedTierRaw = String(formData.get('requestedTier') ?? '')
  const requestedTier = ['base', 'premium', 'top'].includes(requestedTierRaw)
    ? (requestedTierRaw as 'base' | 'premium' | 'top')
    : undefined
  const privacyConsent = formData.get('privacyConsent') === 'on'
  // honeypot anti-spam: campo invisibile che i bot compilano
  const honeypot = String(formData.get('website_url') ?? '')

  if (honeypot) return { status: 'success' }
  if (!name || !email) {
    return { status: 'error', message: 'Nome ed email sono obbligatori.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Inserisci un indirizzo email valido.' }
  }
  if (!privacyConsent) {
    return { status: 'error', message: 'Devi accettare l’informativa privacy per inviare la richiesta.' }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'lead-requests',
      data: {
        type,
        name,
        email,
        company: company || undefined,
        phone: phone || undefined,
        message: message || undefined,
        requestedTier,
        privacyConsent,
      },
      overrideAccess: true,
    })
    return {
      status: 'success',
      message: 'Richiesta inviata. Ti risponderemo il prima possibile.',
    }
  } catch (error) {
    console.error('submitLeadRequest failed:', error)
    return {
      status: 'error',
      message: 'Si è verificato un errore. Riprova tra qualche minuto.',
    }
  }
}
