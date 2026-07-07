import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { AgencyCard } from '@/components/agency/agency-card'
import { Breadcrumbs } from '@/components/breadcrumbs'
import {
  getAgenciesForLocation,
  getAllLocations,
  getAllServices,
  getLocation,
  getServiceBySlug,
} from '@/lib/api'
import { rankAgencies } from '@/lib/ranking'
import { serviceInLocationIntro } from '@/lib/seo-text'

export const revalidate = 3600

type Params = Promise<{ servizio: string; regione: string }>

/** Combinazioni servizio × regione (long-tail SEO ad alto valore). */
export async function generateStaticParams() {
  const [services, locations] = await Promise.all([getAllServices(), getAllLocations()])
  const regions = locations.filter((location) => location.type === 'regione')
  return services.flatMap((service) =>
    regions.map((region) => ({ servizio: service.slug, regione: region.slug })),
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { servizio, regione } = await params
  const [service, region] = await Promise.all([
    getServiceBySlug(servizio),
    getLocation('regione', regione),
  ])
  if (!service || !region) return {}
  return {
    title: `${service.name} in ${region.name}: agenzie specializzate`,
    description: `${service.name} in ${region.name}: trova le agenzie partner attive nella regione, confronta i servizi e contatta direttamente quella più vicina.`,
    alternates: { canonical: `/servizi/${service.slug}/${region.slug}` },
  }
}

export default async function ServiceRegionPage({ params }: { params: Params }) {
  const { servizio, regione } = await params
  const [service, region] = await Promise.all([
    getServiceBySlug(servizio),
    getLocation('regione', regione),
  ])
  if (!service || !region) notFound()

  const agencies = await getAgenciesForLocation([region.id], service.id)
  const ranked = rankAgencies(agencies, [region])
  const intro = serviceInLocationIntro(service, region, ranked.length)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: 'Servizi', href: '/servizi' },
          { label: service.name, href: `/servizi/${service.slug}` },
          { label: region.name, href: `/servizi/${service.slug}/${region.slug}` },
        ]}
      />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {service.name} in {region.name}
      </h1>
      <p className="mt-4 text-muted-foreground">{intro}</p>

      <div className="mt-8 space-y-4">
        {ranked.map(({ agency }) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>

      {ranked.length === 0 && (
        <div className="mt-4 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
          <p>
            Nessuna agenzia sponsor attiva per questo servizio in {region.name}. Consulta{' '}
            <Link href={`/servizi/${service.slug}`} className="text-primary hover:underline">
              la pagina generale del servizio
            </Link>{' '}
            oppure{' '}
            <Link href={`/recupero-crediti/${region.slug}`} className="text-primary hover:underline">
              tutte le agenzie in {region.name}
            </Link>
            .
          </p>
        </div>
      )}

      <section aria-labelledby="approfondimento-h" className="mt-10">
        <h2 id="approfondimento-h" className="text-xl font-bold tracking-tight">
          Approfondimenti
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li>
            <Link href={`/servizi/${service.slug}`} className="text-primary hover:underline">
              {service.name}: come funziona, tempi e costi
            </Link>
          </li>
          <li>
            <Link href={`/recupero-crediti/${region.slug}`} className="text-primary hover:underline">
              Tutte le agenzie di recupero crediti in {region.name}
            </Link>
          </li>
          <li>
            <Link href="/guide" className="text-primary hover:underline">
              Guide al recupero crediti
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
