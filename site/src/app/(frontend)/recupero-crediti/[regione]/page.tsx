import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LocationPageBody } from '@/components/location/location-page'
import { getAllLocations, getLocation } from '@/lib/api'

export const revalidate = 3600

type Params = Promise<{ regione: string }>

export async function generateStaticParams() {
  const locations = await getAllLocations()
  return locations
    .filter((location) => location.type === 'regione')
    .map((location) => ({ regione: location.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { regione } = await params
  const location = await getLocation('regione', regione)
  if (!location) return {}
  return {
    title:
      location.seo?.metaTitle ||
      `Recupero crediti in ${location.name}: le migliori agenzie della regione`,
    description:
      location.seo?.metaDescription ||
      `Agenzie di recupero crediti in ${location.name}: confronta servizi, zone coperte e contatti diretti. Recupero stragiudiziale, giudiziale e commerciale B2B.`,
    alternates: { canonical: `/recupero-crediti/${location.slug}` },
  }
}

export default async function RegionPage({ params }: { params: Params }) {
  const { regione } = await params
  const location = await getLocation('regione', regione)
  if (!location) notFound()

  return (
    <LocationPageBody
      ancestry={[location]}
      crumbs={[
        { label: 'Recupero crediti per zona', href: '/recupero-crediti' },
        { label: location.name, href: `/recupero-crediti/${location.slug}` },
      ]}
    />
  )
}
