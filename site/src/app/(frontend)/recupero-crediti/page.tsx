import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { ItalyMap } from '@/components/map/italy-map'
import { getAllLocations } from '@/lib/api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Recupero crediti in Italia: agenzie per regione e provincia',
  description:
    'Trova le agenzie di recupero crediti nella tua zona: seleziona la regione o la provincia e confronta le agenzie attive con servizi e contatti diretti.',
  alternates: { canonical: '/recupero-crediti' },
}

export default async function LocationsIndexPage() {
  const locations = await getAllLocations()
  const regions = locations.filter((location) => location.type === 'regione')
  const provincesByRegion = new Map<number, typeof locations>()
  for (const location of locations) {
    if (location.type !== 'provincia') continue
    const parentId = typeof location.parent === 'object' ? location.parent?.id : location.parent
    if (!parentId) continue
    const list = provincesByRegion.get(parentId) ?? []
    list.push(location)
    provincesByRegion.set(parentId, list)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Recupero crediti per zona', href: '/recupero-crediti' }]} />

      <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Recupero crediti in Italia, zona per zona
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            La vicinanza geografica è il primo criterio per scegliere un’agenzia di recupero
            crediti: chi conosce il territorio, i tribunali locali e il tessuto economico della zona
            lavora più in fretta e con più efficacia. Seleziona la tua regione o provincia e
            confronta le agenzie attive.
          </p>

          <div className="mt-10 space-y-8">
            {regions.map((region) => (
              <section key={region.id} aria-labelledby={`reg-${region.slug}`}>
                <h2 id={`reg-${region.slug}`} className="text-lg font-semibold">
                  <Link
                    href={`/recupero-crediti/${region.slug}`}
                    className="hover:text-primary hover:underline"
                  >
                    {region.name}
                  </Link>
                </h2>
                <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {(provincesByRegion.get(region.id) ?? []).map((province) => (
                    <li key={province.id}>
                      <Link
                        href={`/recupero-crediti/${region.slug}/${province.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary hover:underline"
                      >
                        {province.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <div className="sticky top-24 hidden lg:block">
          <ItalyMap />
        </div>
      </div>
    </div>
  )
}
