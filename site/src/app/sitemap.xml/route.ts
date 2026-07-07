import {
  getActiveAgencies,
  getAllLocations,
  getAllServices,
  getPublishedPosts,
} from '@/lib/api'
import { SITE_URL } from '@/lib/jsonld'
import type { Location } from '@/payload-types'

export const revalidate = 3600

type Entry = { url: string; lastModified?: string; changeFrequency?: string; priority?: number }

/**
 * sitemap.xml come route handler.
 * Nota: non si usa app/sitemap.ts (Metadata Route) perché il loader di Next
 * non gestisce l'apostrofo presente nel percorso locale del progetto.
 */
export async function GET() {
  const [locations, services, agencies, posts] = await Promise.all([
    getAllLocations(),
    getAllServices(),
    getActiveAgencies(),
    getPublishedPosts(500),
  ])

  const byId = new Map<number, Location>()
  for (const location of locations) byId.set(location.id, location)

  const entries: Entry[] = [
    { url: `${SITE_URL}/`, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/recupero-crediti`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/servizi`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/guide`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/diventa-partner`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/come-funziona`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/chi-siamo`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contatti`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/cookie-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/termini`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  for (const location of locations) {
    if (location.type === 'regione') {
      entries.push({
        url: `${SITE_URL}/recupero-crediti/${location.slug}`,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    } else if (location.type === 'provincia') {
      const parentId = typeof location.parent === 'object' ? location.parent?.id : location.parent
      const region = parentId ? byId.get(parentId) : undefined
      if (region) {
        entries.push({
          url: `${SITE_URL}/recupero-crediti/${region.slug}/${location.slug}`,
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      }
    } else {
      const provinceId = typeof location.parent === 'object' ? location.parent?.id : location.parent
      const province = provinceId ? byId.get(provinceId) : undefined
      const regionId =
        province && (typeof province.parent === 'object' ? province.parent?.id : province.parent)
      const region = regionId ? byId.get(regionId) : undefined
      if (province && region) {
        entries.push({
          url: `${SITE_URL}/recupero-crediti/${region.slug}/${province.slug}/${location.slug}`,
          changeFrequency: 'weekly',
          priority: 0.7,
        })
      }
    }
  }

  const regions = locations.filter((location) => location.type === 'regione')
  for (const service of services) {
    entries.push({
      url: `${SITE_URL}/servizi/${service.slug}`,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
    for (const region of regions) {
      entries.push({
        url: `${SITE_URL}/servizi/${service.slug}/${region.slug}`,
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }

  for (const agency of agencies) {
    entries.push({
      url: `${SITE_URL}/agenzie/${agency.slug}`,
      lastModified: agency.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  for (const post of posts) {
    entries.push({
      url: `${SITE_URL}/guide/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url>\n    <loc>${entry.url}</loc>\n${entry.lastModified ? `    <lastmod>${new Date(entry.lastModified).toISOString()}</lastmod>\n` : ''}${entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>\n` : ''}${typeof entry.priority === 'number' ? `    <priority>${entry.priority}</priority>\n` : ''}  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
