import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileSearch, Handshake, ListChecks } from 'lucide-react'

import { AgencyCard } from '@/components/agency/agency-card'
import { JsonLd } from '@/components/json-ld'
import { ItalyMap } from '@/components/map/italy-map'
import { SearchBar } from '@/components/search/search-bar'
import {
  getAllLocations,
  getAllServices,
  getFeaturedAgencies,
  getPublishedPosts,
} from '@/lib/api'
import { organizationJsonLd, webSiteJsonLd } from '@/lib/jsonld'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const steps = [
  {
    icon: FileSearch,
    title: '1. Cerca per zona e servizio',
    text: 'Indica dove si trova il tuo debitore e che tipo di recupero ti serve: stragiudiziale, giudiziale, B2B, verso privati e altro.',
  },
  {
    icon: ListChecks,
    title: '2. Confronta le agenzie',
    text: 'Vedi le agenzie attive nella zona, ordinate per vicinanza: servizi trattati, zone coperte, badge di verifica e recapiti.',
  },
  {
    icon: Handshake,
    title: '3. Contatta direttamente',
    text: 'Telefono, email o WhatsApp: parli direttamente con l’agenzia, senza intermediari e senza costi per te.',
  },
]

export default async function HomePage() {
  const [locations, services, featured, posts] = await Promise.all([
    getAllLocations(),
    getAllServices(),
    getFeaturedAgencies(3),
    getPublishedPosts(3),
  ])

  const regions = locations.filter((location) => location.type === 'regione')
  const searchLocations = locations.map((location) => ({
    id: location.id,
    name: location.name,
    slug: location.slug,
    type: location.type,
    lat: location.lat,
    lng: location.lng,
  }))
  const searchServices = services.map((service) => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
  }))

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={webSiteJsonLd()} />

      {/* HERO: mappa interattiva + ricerca */}
      <section className="border-b bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_minmax(280px,420px)] lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              La directory nazionale del recupero crediti
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Trova l’agenzia di recupero crediti più vicina a te
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Privati e aziende con crediti da recuperare: cerca per regione, provincia o città e
              per tipologia di servizio. Contatti diretti, nessuna commissione.
            </p>
            <div className="mt-8">
              <SearchBar locations={searchLocations} services={searchServices} />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Oppure seleziona una regione sulla mappa.
            </p>
          </div>
          <div className="mx-auto hidden w-full max-w-sm lg:block">
            <ItalyMap />
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="come-funziona-h">
        <h2 id="come-funziona-h" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Come funziona
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-xl border bg-card p-6">
              <step.icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servizi principali */}
      <section className="border-y bg-muted/30" aria-labelledby="servizi-h">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 id="servizi-h" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Servizi di recupero crediti
            </h2>
            <Link
              href="/servizi"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              Tutti i servizi <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/servizi/${service.slug}`}
                className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary"
              >
                <h3 className="font-semibold group-hover:text-primary">{service.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Agenzie in evidenza */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="evidenza-h">
          <h2 id="evidenza-h" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Agenzie in evidenza
          </h2>
          <p className="mt-2 text-muted-foreground">
            Gli sponsor del portale, verificati e attivi su tutto il territorio.
          </p>
          <div className="mt-6 space-y-4">
            {featured.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>
      )}

      {/* Regioni */}
      <section className="border-y bg-muted/30" aria-labelledby="regioni-h">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="regioni-h" className="text-2xl font-bold tracking-tight sm:text-3xl">
            Recupero crediti regione per regione
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
            {regions.map((region) => (
              <li key={region.id}>
                <Link
                  href={`/recupero-crediti/${region.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Recupero crediti in {region.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Guide */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="guide-h">
          <div className="flex items-end justify-between gap-4">
            <h2 id="guide-h" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Guide al recupero crediti
            </h2>
            <Link
              href="/guide"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
            >
              Tutte le guide <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/guide/${post.slug}`}
                className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary"
              >
                <h3 className="font-semibold leading-snug group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA partner */}
      <section className="border-t bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Sei un’agenzia di recupero crediti?
            </h2>
            <p className="mt-1 text-primary-foreground/85">
              Fatti trovare da chi ti sta cercando: entra nella directory come sponsor.
            </p>
          </div>
          <Link
            href="/diventa-partner"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-background px-6 text-sm font-semibold text-foreground shadow hover:bg-background/90"
          >
            Diventa partner
          </Link>
        </div>
      </section>
    </>
  )
}
