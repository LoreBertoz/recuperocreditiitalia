import { SITE_URL } from '@/lib/jsonld'

/**
 * robots.txt come route handler.
 * Nota: non si usa app/robots.ts (Metadata Route) perché il loader di Next
 * non gestisce l'apostrofo presente nel percorso locale del progetto.
 */
export function GET() {
  const content = `User-Agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /area-riservata
Disallow: /cerca

Sitemap: ${SITE_URL}/sitemap.xml
`
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
