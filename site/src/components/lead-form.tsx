'use client'

import Link from 'next/link'
import React, { useActionState } from 'react'

import { submitLeadRequest, type LeadFormState } from '@/app/(frontend)/contatti/actions'

const initialState: LeadFormState = { status: 'idle' }

/** Form lead riutilizzabile: contatti generici o richiesta partner (con scelta tier). */
export function LeadForm({
  type,
  defaultTier,
}: {
  type: 'contact' | 'partner'
  defaultTier?: 'base' | 'premium' | 'top'
}) {
  const [state, formAction, pending] = useActionState(submitLeadRequest, initialState)

  if (state.status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <p className="font-semibold text-primary">Richiesta inviata ✔</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {state.message ?? 'Ti risponderemo il prima possibile.'}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value={type} />
      {/* honeypot anti-spam */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website_url">Non compilare questo campo</label>
        <input id="website_url" name="website_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="text-sm font-medium">
            Nome e cognome *
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="lead-company" className="text-sm font-medium">
            {type === 'partner' ? 'Nome agenzia *' : 'Azienda (facoltativo)'}
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            required={type === 'partner'}
            autoComplete="organization"
            className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="text-sm font-medium">
            Email *
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="text-sm font-medium">
            Telefono (facoltativo)
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>
      </div>

      {type === 'partner' && (
        <div>
          <label htmlFor="lead-tier" className="text-sm font-medium">
            Pacchetto di interesse
          </label>
          <select
            id="lead-tier"
            name="requestedTier"
            defaultValue={defaultTier ?? ''}
            className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
          >
            <option value="">Non so ancora</option>
            <option value="base">Base — 49 €/mese</option>
            <option value="premium">Premium — 149 €/mese</option>
            <option value="top">Top — 349 €/mese</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="lead-message" className="text-sm font-medium">
          Messaggio
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={5}
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          placeholder={
            type === 'partner'
              ? 'Raccontaci la tua agenzia: zone coperte, servizi, da quanto operate…'
              : 'Scrivi qui la tua richiesta…'
          }
        />
      </div>

      <div className="flex items-start gap-2">
        <input id="lead-privacy" name="privacyConsent" type="checkbox" required className="mt-1" />
        <label htmlFor="lead-privacy" className="text-xs text-muted-foreground">
          Ho letto l’
          <Link href="/privacy" className="text-primary hover:underline">
            informativa privacy
          </Link>{' '}
          e acconsento al trattamento dei dati per rispondere alla mia richiesta. *
        </label>
      </div>

      {state.status === 'error' && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {pending ? 'Invio in corso…' : 'Invia richiesta'}
      </button>
    </form>
  )
}
