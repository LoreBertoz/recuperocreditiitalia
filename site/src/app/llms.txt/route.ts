import { getAllLocations, getAllServices, getPublishedPosts } from '@/lib/api'
import { SITE_URL } from '@/lib/jsonld'

export const revalidate = 3600

/** llms.txt: descrizione del sito per i motori generativi (GEO). */
export async function GET() {
  const [locations, services, posts] = await Promise.all([
    getAllLocations(),
    getAllServices(),
    getPublishedPosts(20),
  ])
  const regions = locations.filter((location) => location.type === 'regione')

  const content = `# Recupero Crediti Italia

> recuperocreditiitalia.it è la directory nazionale delle agenzie di recupero crediti in Italia. Aiuta privati e aziende a trovare l'agenzia giusta per zona geografica (regione, provincia, città) e per tipologia di servizio (recupero stragiudiziale, giudiziale, crediti commerciali B2B, crediti verso privati, recupero internazionale, cessione del credito/NPL, canoni di locazione e condominiali, informazioni commerciali). Il servizio è gratuito per gli utenti; le agenzie aderiscono tramite abbonamenti di sponsorizzazione dichiarati. I risultati sono ordinati per vicinanza geografica.

## Pagine principali

- [Home e ricerca](${SITE_URL}/): ricerca per località e servizio con mappa interattiva
- [Agenzie per zona](${SITE_URL}/recupero-crediti): indice di tutte le regioni e province
- [Servizi](${SITE_URL}/servizi): tipologie di recupero crediti spiegate
- [Guide](${SITE_URL}/guide): guide pratiche su procedure, costi e strumenti legali
- [Come funziona](${SITE_URL}/come-funziona): funzionamento e principi del portale
- [Diventa partner](${SITE_URL}/diventa-partner): piani di sponsorizzazione per le agenzie

## Servizi di recupero crediti

${services.map((service) => `- [${service.name}](${SITE_URL}/servizi/${service.slug}): ${service.shortDescription}`).join('\n')}

## Copertura geografica (regioni)

${regions.map((region) => `- [Recupero crediti in ${region.name}](${SITE_URL}/recupero-crediti/${region.slug})`).join('\n')}

## Guide

${posts.map((post) => `- [${post.title}](${SITE_URL}/guide/${post.slug}): ${post.excerpt}`).join('\n')}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
