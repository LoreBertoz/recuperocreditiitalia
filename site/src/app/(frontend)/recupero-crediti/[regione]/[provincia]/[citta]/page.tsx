import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LocationPageBody } from '@/components/location/location-page'
import { getAllLocations, getLocation } from '@/lib/api'
import type { Location } from '@/payload-types'

export const revalidate = 3600

type Params = Promise<{ regione: string; provincia: string; citta: string }>

export async function generateStaticParams() {
  const locations = await getAllLocations()
  const byId = new Map<number, Location>()
  for (const location of locations) byId.set(location.id, location)

  return locations
    .filter((location) => location.type === 'citta')
    .flatMap((city) => {
      const provinceId = typeof city.parent === 'object' ? city.parent?.id : city.parent
      const province = provinceId ? byId.get(provinceId) : undefined
      const regionId =
        province && (typeof province.parent === 'object' ? province.parent?.id : province.parent)
      const region = regionId ? byId.get(regionId) : undefined
      return province && region
        ? [{ regione: region.slug, provincia: province.slug, citta: city.slug }]
        : []
    })
}

async function resolveCity(regione: string, provincia: string, citta: string) {
  const city = await getLocation('citta', citta)
  if (!city) return null
  const province = typeof city.parent === 'object' ? city.parent : null
  if (!province || province.slug !== provincia) return null
  // depth=1 sulla città non espande il nonno: fetch esplicito della provincia con parent
  const provinceFull = await getLocation('provincia', province.slug)
  const region = provinceFull && typeof provinceFull.parent === 'object' ? provinceFull.parent : null
  if (!region || region.slug !== regione) return null
  return { city, province: provinceFull, region }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { regione, provincia, citta } = await params
  const resolved = await resolveCity(regione, provincia, citta)
  if (!resolved || !resolved.province) return {}
  const { city, province, region } = resolved
  return {
    title: city.seo?.metaTitle || `Recupero crediti a ${city.name}: agenzie in città`,
    description:
      city.seo?.metaDescription ||
      `Agenzie di recupero crediti a ${city.name} (${province.name}, ${region.name}): confronta servizi e contatta direttamente l'agenzia più vicina.`,
    alternates: {
      canonical: `/recupero-crediti/${region.slug}/${province.slug}/${city.slug}`,
    },
  }
}

export default async function CityPage({ params }: { params: Params }) {
  const { regione, provincia, citta } = await params
  const resolved = await resolveCity(regione, provincia, citta)
  if (!resolved || !resolved.province) notFound()
  const { city, province, region } = resolved

  return (
    <LocationPageBody
      ancestry={[city, province!, region]}
      crumbs={[
        { label: 'Recupero crediti per zona', href: '/recupero-crediti' },
        { label: region.name, href: `/recupero-crediti/${region.slug}` },
        { label: province!.name, href: `/recupero-crediti/${region.slug}/${province!.slug}` },
        {
          label: city.name,
          href: `/recupero-crediti/${region.slug}/${province!.slug}/${city.slug}`,
        },
      ]}
    />
  )
}
