import config from '@payload-config'
import { getPayload } from 'payload'

import type { Agency, BlogPost, Location, Service } from '@/payload-types'

export async function getPayloadClient() {
  return getPayload({ config })
}

/**
 * REGOLA D'ORO: il sito pubblico mostra SOLO agenzie con subscriptionStatus 'active'.
 * Tutte le query pubbliche passano da qui.
 */
export async function getActiveAgencies(options?: {
  serviceId?: number
  limit?: number
}): Promise<Agency[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'agencies',
    where: {
      and: [
        { subscriptionStatus: { equals: 'active' } },
        ...(options?.serviceId ? [{ services: { contains: options.serviceId } }] : []),
      ],
    },
    depth: 1,
    limit: options?.limit ?? 200,
    overrideAccess: true, // filtro esplicito qui sopra
  })
  return result.docs
}

export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'agencies',
    where: {
      and: [{ slug: { equals: slug } }, { subscriptionStatus: { equals: 'active' } }],
    },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

export async function getFeaturedAgencies(limit = 6): Promise<Agency[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'agencies',
    where: {
      and: [
        { subscriptionStatus: { equals: 'active' } },
        { sponsorTier: { in: ['top', 'premium'] } },
      ],
    },
    sort: '-sponsorTier', // 'top' > 'premium' alfabeticamente inverso
    depth: 1,
    limit,
    overrideAccess: true,
  })
  // ordina top prima di premium
  return result.docs.sort((a, b) => (a.sponsorTier === 'top' ? -1 : b.sponsorTier === 'top' ? 1 : 0))
}

export async function getAllLocations(): Promise<Location[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'locations',
    limit: 1000,
    depth: 0,
    sort: 'name',
    overrideAccess: true,
  })
  return result.docs
}

export async function getLocation(type: Location['type'], slug: string): Promise<Location | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'locations',
    where: { and: [{ type: { equals: type } }, { slug: { equals: slug } }] },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

export async function getChildLocations(parentId: number): Promise<Location[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'locations',
    where: { parent: { equals: parentId } },
    depth: 0,
    limit: 200,
    sort: 'name',
    overrideAccess: true,
  })
  return result.docs
}

export async function getAllServices(): Promise<Service[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    limit: 100,
    depth: 0,
    sort: 'order',
    overrideAccess: true,
  })
  return result.docs
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

export async function getPublishedPosts(limit = 20): Promise<BlogPost[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit,
    overrideAccess: true,
  })
  return result.docs
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return result.docs[0] ?? null
}

/** Agenzie che coprono una località (o un suo antenato: città → provincia → regione). */
export async function getAgenciesForLocation(locationIds: number[], serviceId?: number): Promise<Agency[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'agencies',
    where: {
      and: [
        { subscriptionStatus: { equals: 'active' } },
        { coverageAreas: { in: locationIds } },
        ...(serviceId ? [{ services: { contains: serviceId } }] : []),
      ],
    },
    depth: 1,
    limit: 200,
    overrideAccess: true,
  })
  return result.docs
}

/** Catena di antenati di una località: [se stessa, provincia, regione]. */
export function locationAncestry(location: Location): Location[] {
  const chain: Location[] = [location]
  let current: Location | number | null | undefined = location.parent
  while (current && typeof current === 'object') {
    chain.push(current)
    current = current.parent
  }
  return chain
}
