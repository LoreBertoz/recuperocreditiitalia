import Link from 'next/link'

import { AgencyCard } from '@/components/agency/agency-card'
import { Breadcrumbs, type Crumb } from '@/components/breadcrumbs'
import { getAgenciesForLocation, getAllServices, getChildLocations } from '@/lib/api'
import { rankAgencies } from '@/lib/ranking'
import { locationIntro } from '@/lib/seo-text'
import type { Location } from '@/payload-types'

const childTypeLabel: Record<Location['type'], string | null> = {
  regione: 'Province',
  provincia: 'Città',
  citta: null,
}

/**
 * Corpo condiviso delle pagine località (regione/provincia/città):
 * intro unica, agenzie ordinate per vicinanza, località figlie, servizi in zona.
 * @param ancestry [località corrente, ...antenati] es. [Milano(prov), Lombardia]
 */
export async function LocationPageBody({
  ancestry,
  crumbs,
}: {
  ancestry: Location[]
  crumbs: Crumb[]
}) {
  const location = ancestry[0]
  const ancestryIds = ancestry.map((l) => l.id)

  const [agencies, children, services] = await Promise.all([
    getAgenciesForLocation(ancestryIds),
    getChildLocations(location.id),
    getAllServices(),
  ])
  const ranked = rankAgencies(agencies, ancestry)
  const intro = locationIntro(location, ranked.length)

  const inPlace = location.type === 'regione' ? `in ${location.name}` : `a ${location.name}`
  const basePath = crumbs[crumbs.length - 1].href
  const region = ancestry[ancestry.length - 1]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={crumbs} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Recupero crediti {inPlace}
      </h1>
      <p className="mt-4 text-muted-foreground">{intro}</p>

      {/* dato fattuale citabile (GEO) */}
      <p className="mt-3 text-sm font-medium">
        {ranked.length > 0
          ? `${inPlace.charAt(0).toUpperCase()}${inPlace.slice(1)} ${ranked.length === 1 ? 'opera 1 agenzia partner attiva' : `operano ${ranked.length} agenzie partner attive`} sul portale.`
          : 'Le agenzie partner per questa zona sono in fase di attivazione.'}
      </p>

      <section aria-labelledby="agenzie-zona-h" className="mt-8">
        <h2 id="agenzie-zona-h" className="text-xl font-bold tracking-tight">
          Le agenzie {inPlace}
        </h2>
        <div className="mt-4 space-y-4">
          {ranked.map(({ agency, distanceKm }) => (
            <AgencyCard key={agency.id} agency={agency} distanceKm={distanceKm} />
          ))}
        </div>
        {ranked.length === 0 && (
          <p className="mt-4 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
            Nessuna agenzia sponsor attiva al momento per questa zona.{' '}
            <Link href="/contatti" className="text-primary hover:underline">
              Contattaci
            </Link>{' '}
            per un aiuto nella ricerca, oppure esplora le zone vicine qui sotto.
          </p>
        )}
      </section>

      {children.length > 0 && childTypeLabel[location.type] && (
        <section aria-labelledby="zone-figlie-h" className="mt-10">
          <h2 id="zone-figlie-h" className="text-xl font-bold tracking-tight">
            {childTypeLabel[location.type]} — {location.name}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`${basePath}/${child.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary hover:underline"
                >
                  Recupero crediti a {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="servizi-zona-h" className="mt-10">
        <h2 id="servizi-zona-h" className="text-xl font-bold tracking-tight">
          Servizi di recupero crediti {region.type === 'regione' ? `in ${region.name}` : ''}
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {services.map((service) => (
            <li key={service.id}>
              <Link
                href={`/servizi/${service.slug}/${region.slug}`}
                className="text-sm text-muted-foreground hover:text-primary hover:underline"
              >
                {service.name} in {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
