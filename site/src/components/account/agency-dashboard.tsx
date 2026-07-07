'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BadgeCheck, ExternalLink, LogOut } from 'lucide-react'

import type { Agency } from '@/payload-types'

const statusLabel: Record<Agency['subscriptionStatus'], { text: string; className: string }> = {
  active: { text: 'Attivo — scheda pubblica', className: 'bg-green-100 text-green-800' },
  pending: { text: 'In attesa di attivazione', className: 'bg-amber-100 text-amber-800' },
  suspended: { text: 'Sospeso — scheda non visibile', className: 'bg-red-100 text-red-800' },
}

const tierLabel: Record<Agency['sponsorTier'], string> = {
  base: 'Base',
  premium: 'Premium',
  top: 'Top',
}

/**
 * Dashboard self-service dell'agenzia: modifica dei campi consentiti.
 * Tier, stato abbonamento e badge restano gestiti dallo staff (field access control).
 */
export function AgencyDashboard({ agency, userEmail }: { agency: Agency; userEmail: string }) {
  const router = useRouter()
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null)
  const [pending, setPending] = useState(false)
  const status = statusLabel[agency.subscriptionStatus]

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setPending(true)
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch(`/api/agencies/${agency.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          descriptionShort: String(formData.get('descriptionShort') ?? ''),
          contactPhone: String(formData.get('contactPhone') ?? ''),
          contactEmail: String(formData.get('contactEmail') ?? '') || undefined,
          website: String(formData.get('website') ?? ''),
          whatsapp: String(formData.get('whatsapp') ?? ''),
        }),
      })
      if (!response.ok) {
        const body = await response.json().catch(() => null)
        setMessage({
          kind: 'error',
          text: body?.errors?.[0]?.message ?? 'Salvataggio non riuscito. Controlla i campi.',
        })
        return
      }
      setMessage({ kind: 'ok', text: 'Modifiche salvate. La scheda pubblica è aggiornata.' })
      router.refresh()
    } catch {
      setMessage({ kind: 'error', text: 'Errore di connessione. Riprova.' })
    } finally {
      setPending(false)
    }
  }

  async function logout() {
    await fetch('/api/users/logout', { method: 'POST', credentials: 'include' })
    router.refresh()
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agency.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Connesso come {userEmail}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex h-9 items-center gap-1.5 rounded-md border px-3 text-sm font-medium hover:bg-accent"
        >
          <LogOut className="size-4" aria-hidden="true" />
          Esci
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Stato abbonamento
          </p>
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
          >
            {status.text}
          </span>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Piano sponsor
          </p>
          <p className="mt-2 font-semibold">{tierLabel[agency.sponsorTier]}</p>
          <Link href="/diventa-partner" className="text-xs text-primary hover:underline">
            Fai upgrade
          </Link>
        </div>
        <div className="rounded-xl border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Verifica
          </p>
          <p className="mt-2 flex items-center gap-1 text-sm font-semibold">
            {agency.verified ? (
              <>
                <BadgeCheck className="size-4 text-primary" aria-hidden="true" /> Sponsor
                verificato
              </>
            ) : (
              'Non verificato'
            )}
          </p>
        </div>
      </div>

      {agency.subscriptionStatus === 'active' && (
        <p className="mt-4 text-sm">
          <Link
            href={`/agenzie/${agency.slug}`}
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            Vedi la tua scheda pubblica <ExternalLink className="size-3.5" aria-hidden="true" />
          </Link>
        </p>
      )}

      <form onSubmit={save} className="mt-10 space-y-5">
        <h2 className="text-xl font-bold tracking-tight">Dati della scheda</h2>
        <p className="text-sm text-muted-foreground">
          Qui puoi aggiornare descrizione e contatti. Per modificare servizi, zone di copertura,
          logo o piano, scrivi allo staff dai{' '}
          <Link href="/contatti" className="text-primary hover:underline">
            contatti
          </Link>
          .
        </p>

        <div>
          <label htmlFor="dash-desc" className="text-sm font-medium">
            Descrizione breve (max 300 caratteri)
          </label>
          <textarea
            id="dash-desc"
            name="descriptionShort"
            rows={3}
            maxLength={300}
            defaultValue={agency.descriptionShort}
            required
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-ring/50 focus:ring-2"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="dash-phone" className="text-sm font-medium">
              Telefono
            </label>
            <input
              id="dash-phone"
              name="contactPhone"
              type="tel"
              defaultValue={agency.contactPhone ?? ''}
              className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="dash-email" className="text-sm font-medium">
              Email pubblica
            </label>
            <input
              id="dash-email"
              name="contactEmail"
              type="email"
              defaultValue={agency.contactEmail ?? ''}
              className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="dash-website" className="text-sm font-medium">
              Sito web
            </label>
            <input
              id="dash-website"
              name="website"
              type="url"
              placeholder="https://…"
              defaultValue={agency.website ?? ''}
              className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
            />
          </div>
          <div>
            <label htmlFor="dash-whatsapp" className="text-sm font-medium">
              WhatsApp
            </label>
            <input
              id="dash-whatsapp"
              name="whatsapp"
              type="tel"
              defaultValue={agency.whatsapp ?? ''}
              className="mt-1 h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
            />
          </div>
        </div>

        {message && (
          <p
            role={message.kind === 'error' ? 'alert' : 'status'}
            className={`text-sm font-medium ${message.kind === 'error' ? 'text-destructive' : 'text-green-700'}`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {pending ? 'Salvataggio…' : 'Salva modifiche'}
        </button>
      </form>
    </div>
  )
}
