import type { Metadata } from 'next'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'

import { AgencyDashboard } from '@/components/account/agency-dashboard'
import { LoginForm } from '@/components/account/login-form'
import { getPayloadClient } from '@/lib/api'
import type { Agency } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Area riservata agenzie',
  description:
    'Accesso riservato alle agenzie partner: gestisci la tua scheda, i servizi e le zone di copertura.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/area-riservata' },
}

export default async function ReservedAreaPage() {
  const payload = await getPayloadClient()
  const requestHeaders = await getHeaders()
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Area riservata agenzie</h1>
        <p className="mt-3 text-muted-foreground">
          Accedi con le credenziali ricevute all’attivazione della sponsorizzazione per gestire la
          tua scheda.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Non sei ancora partner?{' '}
          <Link href="/diventa-partner" className="text-primary hover:underline">
            Scopri i piani di sponsorizzazione
          </Link>
          . Credenziali smarrite?{' '}
          <Link href="/contatti" className="text-primary hover:underline">
            Contattaci
          </Link>
          .
        </p>
      </div>
    )
  }

  if (user.role === 'admin') {
    return (
      <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Ciao, staff 👋</h1>
        <p className="mt-3 text-muted-foreground">
          Sei connesso come amministratore: la gestione completa avviene dal pannello.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Vai al pannello admin
        </Link>
      </div>
    )
  }

  // utente agenzia: carica la scheda collegata (bypass access: filtriamo per id esplicito)
  const agencyId = typeof user.agency === 'object' ? user.agency?.id : user.agency
  let agency: Agency | null = null
  if (agencyId) {
    agency = await payload.findByID({
      collection: 'agencies',
      id: agencyId,
      depth: 1,
      overrideAccess: true,
    })
  }

  if (!agency) {
    return (
      <div className="mx-auto max-w-md px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Area riservata</h1>
        <p className="mt-3 text-muted-foreground">
          Il tuo account non è ancora collegato a una scheda agenzia.{' '}
          <Link href="/contatti" className="text-primary hover:underline">
            Contatta lo staff
          </Link>{' '}
          per completare l’attivazione.
        </p>
      </div>
    )
  }

  return <AgencyDashboard agency={agency} userEmail={user.email} />
}
