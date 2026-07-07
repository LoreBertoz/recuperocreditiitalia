import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LocationPageBody } from '@/components/location/location-page'
import { getAllLocations, getLocation } from '@/lib/api'
import type { Location } from '@/payload-types'

export const revalidate = 3600

type Params = Promise<{ regione: string; provincia: string }>

export async function generateStaticParams() {
  const locations = await getAllLocations()
  const regionById = new Map<number, Location>()
  for (const location of locations) {
    if (location.type === 'regione') regionById.set(location.id, location)
  }
  return locations
    .filter((location) => location.type === 'provincia')
    .flatMap((province) => {
      const parentId =
        typeof province.parent === 'object' ? province.parent?.id : province.parent
      const region = parentId ? regionById.get(parentId) : undefined
      return region ? [{ regione: region.slug, provincia: province.slug }] : []
    })
}

async function resolveProvince(regione: string, provincia: string) {
  const province = await getLocation('provincia', provincia)
  if (!province) return null
  const region = typeof province.parent === 'object' ? province.parent : null
  if (!region || region.slug !== regione) return null
  return { province, region }
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { regione, provincia } = await params
  const resolved = await resolveProvince(regione, provincia)
  if (!resolved) return {}
  const { province, region } = resolved
  return {
    title:
      province.seo?.metaTitle ||
      `Recupero crediti a ${province.name}: agenzie in provincia`,
    description:
      province.seo?.metaDescription ||
      `Agenzie di recupero crediti a ${province.name} e provincia (${region.name}): servizi, contatti diretti e copertura verificata. Trova quella più vicina.`,
    alternates: { canonical: `/recupero-crediti/${region.slug}/${province.slug}` },
  }
}

export default async function ProvincePage({ params }: { params: Params }) {
  const { regione, provincia } = await params
  const resolved = await resolveProvince(regione, provincia)
  if (!resolved) notFound()
  const { province, region } = resolved

  return (
    <LocationPageBody
      ancestry={[province, region]}
      crumbs={[
        { label: 'Recupero crediti per zona', href: '/recupero-crediti' },
        { label: region.name, href: `/recupero-crediti/${region.slug}` },
        { label: province.name, href: `/recupero-crediti/${region.slug}/${province.slug}` },
      ]}
    />
  )
}
