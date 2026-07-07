import type { Metadata } from 'next'
import Link from 'next/link'

import { AgencyCard } from '@/components/agency/agency-card'
import { SearchBar } from '@/components/search/search-bar'
import {
  getActiveAgencies,
  getAllLocations,
  getAllServices,
  getLocation,
  locationAncestry,
} from '@/lib/api'
import { rankAgencies } from '@/lib/ranking'
import type { Location } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Cerca un’agenzia di recupero crediti',
  description:
    'Risultati di ricerca: agenzie di recupero crediti per località e tipologia di servizio, ordinate per vicinanza.',
  robots: { index: false, follow: true }, // pagina filtro: si indicizzano le pagine località/servizio
}

type SearchParams = Promise<{ loc?: string; servizio?: string; q?: string }>

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { loc, servizio, q } = await searchParams

  const [locations, services] = await Promise.all([getAllLocations(), getAllServices()])

  // risolve la località dal parametro "tipo:slug" (o da q come testo libero)
  let location: Location | null = null
  if (loc?.includes(':')) {
    const [type, slug] = loc.split(':')
    if (type === 'regione' || type === 'provincia' || type === 'citta') {
      location = await getLocation(type, slug)
    }
  } else if (q) {
    const match = locations.find((l) => l.name.toLowerCase() === q.trim().toLowerCase())
    if (match) location = match
  }

  const service = servizio ? (services.find((s) => s.slug === servizio) ?? null) : null

  const agencies = await getActiveAgencies({ serviceId: service?.id })
  const ancestry = location ? locationAncestry(location) : []
  const ranked = location
    ? rankAgencies(agencies, ancestry)
    : agencies.map((agency) => ({ agency, distanceKm: null, coversArea: false }))

  const titleParts = [
    'Agenzie di recupero crediti',
    service ? `— ${service.name}` : '',
    location ? `${location.type === 'regione' ? 'in' : 'a'} ${location.name}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{titleParts}</h1>
      <p className="mt-2 text-muted-foreground">
        {ranked.length > 0
          ? `${ranked.length} ${ranked.length === 1 ? 'agenzia trovata' : 'agenzie trovate'}, ordinate per vicinanza${service ? ` per il servizio "${service.name}"` : ''}.`
          : 'Nessuna agenzia trovata per questi criteri.'}
      </p>

      <div className="mt-6">
        <SearchBar
          compact
          locations={locations.map((l) => ({
            id: l.id,
            name: l.name,
            slug: l.slug,
            type: l.type,
            lat: l.lat,
            lng: l.lng,
          }))}
          services={services.map((s) => ({ id: s.id, name: s.name, slug: s.slug }))}
          defaultServiceSlug={service?.slug}
        />
      </div>

      <div className="mt-8 space-y-4">
        {ranked.map(({ agency, distanceKm }) => (
          <AgencyCard key={agency.id} agency={agency} distanceKm={distanceKm} />
        ))}
      </div>

      {ranked.length === 0 && (
        <div className="mt-8 rounded-xl border bg-card p-6 text-sm text-muted-foreground">
          <p>
            Prova ad allargare la ricerca: seleziona “Tutti i servizi” oppure cerca la regione
            invece della città. Puoi anche{' '}
            <Link href="/contatti" className="text-primary hover:underline">
              scriverci
            </Link>{' '}
            e ti aiuteremo a trovare l’agenzia giusta.
          </p>
        </div>
      )}

      {location && (
        <p className="mt-8 text-sm text-muted-foreground">
          Vedi anche la pagina dedicata:{' '}
          <Link
            href={locationHref(location, ancestry)}
            className="font-medium text-primary hover:underline"
          >
            Recupero crediti {location.type === 'regione' ? 'in' : 'a'} {location.name}
          </Link>
        </p>
      )}
    </div>
  )
}

function locationHref(location: Location, ancestry: Location[]): string {
  const slugs = [...ancestry].reverse().map((l) => l.slug)
  return `/recupero-crediti/${slugs.join('/')}`
}
