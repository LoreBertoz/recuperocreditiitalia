import type { Agency, Location } from '@/payload-types'

/**
 * LOGICA DI RANKING DEI RISULTATI (documentata come richiesto dall'handoff §6)
 *
 * Criterio primario: VICINANZA GEOGRAFICA.
 *  1. Le agenzie che dichiarano la copertura della zona cercata (o di un suo antenato)
 *     vengono prima di quelle "vicine ma senza copertura dichiarata".
 *  2. A parità di copertura, ordina la distanza in km tra la sede dell'agenzia
 *     e la località cercata.
 *
 * Il tier sponsor dà solo un BOOST a parità di zona: non permette a un'agenzia
 * lontana di scavalcare una realmente più vicina (fondamentale per l'utilità
 * del portale e quindi per SEO/GEO e fiducia).
 * Implementazione: bonus in km sottratto alla distanza, limitato (top -30km,
 * premium -15km) così da riordinare solo agenzie ragionevolmente comparabili.
 */

const TIER_BOOST_KM: Record<Agency['sponsorTier'], number> = {
  top: 30,
  premium: 15,
  base: 0,
}

const TIER_RANK: Record<Agency['sponsorTier'], number> = {
  top: 2,
  premium: 1,
  base: 0,
}

/** Distanza in km tra due coordinate (formula dell'emisenoverso). */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

export type RankedAgency = {
  agency: Agency
  distanceKm: number | null
  coversArea: boolean
}

function coverageIds(agency: Agency): Set<number> {
  const ids = new Set<number>()
  for (const area of agency.coverageAreas ?? []) {
    ids.add(typeof area === 'object' ? area.id : area)
  }
  return ids
}

/**
 * Ordina le agenzie per una ricerca su una località.
 * @param searchAncestry catena località cercata → antenati (es. [Milano(prov), Lombardia])
 */
export function rankAgencies(agencies: Agency[], searchAncestry: Location[]): RankedAgency[] {
  const ancestryIds = searchAncestry.map((l) => l.id)
  const target = searchAncestry[0]

  const ranked: RankedAgency[] = agencies.map((agency) => {
    const covered = coverageIds(agency)
    const coversArea = ancestryIds.some((id) => covered.has(id))
    const hq = agency.headquarters
    const distanceKm =
      target && typeof hq?.lat === 'number' && typeof hq?.lng === 'number'
        ? haversineKm(target.lat, target.lng, hq.lat, hq.lng)
        : null
    return { agency, distanceKm, coversArea }
  })

  ranked.sort((a, b) => {
    // 1. copertura dichiarata della zona prima di tutto
    if (a.coversArea !== b.coversArea) return a.coversArea ? -1 : 1
    // 2. distanza con boost tier (mai oltre 30km di vantaggio)
    const aScore = (a.distanceKm ?? 9999) - TIER_BOOST_KM[a.agency.sponsorTier]
    const bScore = (b.distanceKm ?? 9999) - TIER_BOOST_KM[b.agency.sponsorTier]
    if (aScore !== bScore) return aScore - bScore
    // 3. a parità totale, tier più alto prima
    return TIER_RANK[b.agency.sponsorTier] - TIER_RANK[a.agency.sponsorTier]
  })

  return ranked
}

/** Ordinamento per pagine località senza punto esatto (es. lista in pagina regione): tier poi nome. */
export function sortByTier(agencies: Agency[]): Agency[] {
  return [...agencies].sort(
    (a, b) =>
      TIER_RANK[b.sponsorTier] - TIER_RANK[a.sponsorTier] || a.name.localeCompare(b.name, 'it'),
  )
}
