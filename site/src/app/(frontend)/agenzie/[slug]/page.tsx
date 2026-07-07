import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BadgeCheck, Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { getActiveAgencies, getAgencyBySlug } from '@/lib/api'
import { agencyJsonLd } from '@/lib/jsonld'
import type { Location, Media, Service } from '@/payload-types'

export const revalidate = 3600

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const agencies = await getActiveAgencies()
  return agencies.map((agency) => ({ slug: agency.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const agency = await getAgencyBySlug(slug)
  if (!agency) return {}
  return {
    title: agency.seo?.metaTitle || `${agency.name} — Recupero crediti a ${agency.headquarters.city}`,
    description: agency.seo?.metaDescription || agency.descriptionShort,
    alternates: { canonical: `/agenzie/${agency.slug}` },
  }
}

export default async function AgencyPage({ params }: { params: Params }) {
  const { slug } = await params
  const agency = await getAgencyBySlug(slug)
  if (!agency) notFound()

  const logo = agency.logo as Media | null | undefined
  const services = (agency.services ?? []).filter(
    (service): service is Service => typeof service === 'object',
  )
  const coverage = (agency.coverageAreas ?? []).filter(
    (area): area is Location => typeof area === 'object',
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={agencyJsonLd(agency)} />
      <Breadcrumbs
        items={[
          { label: 'Agenzie', href: '/cerca' },
          { label: agency.name, href: `/agenzie/${agency.slug}` },
        ]}
      />

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
        {logo?.url && (
          <Image
            src={logo.sizes?.thumbnail?.url ?? logo.url}
            alt={logo.alt || `Logo ${agency.name}`}
            width={88}
            height={88}
            className="size-22 shrink-0 rounded-xl border object-contain p-1.5"
          />
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{agency.name}</h1>
            {agency.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <BadgeCheck className="size-4" aria-hidden="true" />
                Sponsor verificato
              </span>
            )}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {agency.headquarters.address}, {agency.headquarters.postalCode}{' '}
            {agency.headquarters.city}
            {agency.headquarters.province ? ` (${agency.headquarters.province})` : ''}
          </p>
          <p className="mt-3 text-muted-foreground">{agency.descriptionShort}</p>
        </div>
      </header>

      {/* Contatti diretti */}
      <section aria-label="Contatti" className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {agency.contactPhone && (
          <a
            href={`tel:${agency.contactPhone.replace(/\s+/g, '')}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <Phone className="size-4" aria-hidden="true" />
            {agency.contactPhone}
          </a>
        )}
        {agency.whatsapp && (
          <a
            href={`https://wa.me/${agency.whatsapp.replace(/[^\d]/g, '')}`}
            rel="nofollow noopener"
            target="_blank"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-accent"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp
          </a>
        )}
        {agency.contactEmail && (
          <a
            href={`mailto:${agency.contactEmail}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-accent"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email
          </a>
        )}
        {agency.website && (
          <a
            href={agency.website}
            rel="nofollow noopener"
            target="_blank"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border px-4 text-sm font-medium hover:bg-accent"
          >
            <Globe className="size-4" aria-hidden="true" />
            Sito web
          </a>
        )}
      </section>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
        <div>
          {agency.descriptionLong && (
            <section aria-labelledby="chi-siamo-h">
              <h2 id="chi-siamo-h" className="text-xl font-bold tracking-tight">
                L’agenzia
              </h2>
              <div className="prose prose-sm mt-3 max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
                <RichText data={agency.descriptionLong} />
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <section aria-labelledby="servizi-agenzia-h">
            <h2 id="servizi-agenzia-h" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Servizi offerti
            </h2>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/servizi/${service.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="zone-h">
            <h2 id="zone-h" className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Zone di copertura
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {coverage.map((area) => (
                <li key={area.id}>
                  <span className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">
                    {area.name}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <p className="mt-12 rounded-lg border bg-muted/40 p-4 text-xs text-muted-foreground">
        La presenza sul portale deriva da un rapporto di sponsorizzazione. recuperocreditiitalia.it
        mette in contatto utenti e agenzie e non è parte dei rapporti tra di essi.
      </p>
    </div>
  )
}
