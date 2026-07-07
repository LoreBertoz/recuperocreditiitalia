import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { getAllServices } from '@/lib/api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Servizi di recupero crediti: tipologie e specializzazioni',
  description:
    'Tutte le tipologie di recupero crediti: stragiudiziale, giudiziale, commerciale B2B, verso privati, internazionale, cessione del credito e altro. Scopri quale fa per te.',
  alternates: { canonical: '/servizi' },
}

export default async function ServicesIndexPage() {
  const services = await getAllServices()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Servizi', href: '/servizi' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Servizi di recupero crediti
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Non tutti i crediti si recuperano allo stesso modo: una fattura B2B, un affitto non pagato
        e un credito verso un cliente estero richiedono strumenti e specialisti diversi. Qui trovi
        le principali tipologie di servizio e, per ognuna, le agenzie specializzate.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.id}
            href={`/servizi/${service.slug}`}
            className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary"
          >
            <h2 className="text-lg font-semibold group-hover:text-primary">{service.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{service.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
