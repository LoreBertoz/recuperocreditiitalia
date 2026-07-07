import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { AgencyCard } from '@/components/agency/agency-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { getActiveAgencies, getAllLocations, getAllServices, getServiceBySlug } from '@/lib/api'
import { faqJsonLd } from '@/lib/jsonld'
import { sortByTier } from '@/lib/ranking'

export const revalidate = 3600

type Params = Promise<{ servizio: string }>

export async function generateStaticParams() {
  const services = await getAllServices()
  return services.map((service) => ({ servizio: service.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { servizio } = await params
  const service = await getServiceBySlug(servizio)
  if (!service) return {}
  return {
    title: service.seo?.metaTitle || `${service.name}: come funziona e agenzie specializzate`,
    description: service.seo?.metaDescription || service.shortDescription,
    alternates: { canonical: `/servizi/${service.slug}` },
  }
}

export default async function ServicePage({ params }: { params: Params }) {
  const { servizio } = await params
  const service = await getServiceBySlug(servizio)
  if (!service) notFound()

  const [agencies, locations] = await Promise.all([
    getActiveAgencies({ serviceId: service.id }),
    getAllLocations(),
  ])
  const sorted = sortByTier(agencies)
  const regions = locations.filter((location) => location.type === 'regione')
  const faq = (service.faq ?? []).map((item) => ({ question: item.question, answer: item.answer }))

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
      <Breadcrumbs
        items={[
          { label: 'Servizi', href: '/servizi' },
          { label: service.name, href: `/servizi/${service.slug}` },
        ]}
      />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{service.name}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{service.shortDescription}</p>

      <div className="prose prose-sm mt-6 max-w-none prose-headings:font-semibold prose-headings:tracking-tight">
        <RichText data={service.description} />
      </div>

      {sorted.length > 0 && (
        <section aria-labelledby="agenzie-servizio-h" className="mt-10">
          <h2 id="agenzie-servizio-h" className="text-xl font-bold tracking-tight">
            Agenzie specializzate in {service.name.toLowerCase()}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {sorted.length === 1
              ? '1 agenzia partner offre questo servizio.'
              : `${sorted.length} agenzie partner offrono questo servizio.`}{' '}
            Per risultati ordinati per vicinanza, usa la ricerca per zona.
          </p>
          <div className="mt-4 space-y-4">
            {sorted.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section aria-labelledby="faq-h" className="mt-10">
          <h2 id="faq-h" className="text-xl font-bold tracking-tight">
            Domande frequenti
          </h2>
          <dl className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-xl border bg-card p-5">
                <dt className="font-semibold">{item.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section aria-labelledby="per-regione-h" className="mt-10">
        <h2 id="per-regione-h" className="text-xl font-bold tracking-tight">
          {service.name} nella tua regione
        </h2>
        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
          {regions.map((region) => (
            <li key={region.id}>
              <Link
                href={`/servizi/${service.slug}/${region.slug}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
