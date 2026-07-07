import type { Location, Service } from '@/payload-types'

/**
 * Generatore di testo di fallback per le pagine località/servizio senza descrizione CMS.
 * Regola: MAI pagine vuote, ma nemmeno testo fotocopia (doorway pages).
 * Le varianti vengono scelte in modo deterministico dallo slug, così ogni pagina
 * ha un testo stabile ma diverso dalle altre.
 */

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  }
  return hash
}

function pick<T>(options: T[], seed: number, salt: number): T {
  return options[(seed + salt) % options.length]
}

const typeLabel: Record<Location['type'], string> = {
  regione: 'regione',
  provincia: 'provincia',
  citta: 'città',
}

export function locationIntro(location: Location, agencyCount: number): string {
  if (location.description) return location.description
  const seed = hashSlug(location.slug)
  const label = typeLabel[location.type]
  const inPlace = location.type === 'regione' ? `in ${location.name}` : `a ${location.name}`

  const opening = pick(
    [
      `Recuperare un credito ${inPlace} richiede rapidità e conoscenza del territorio.`,
      `Se hai una fattura non pagata o un prestito non restituito ${inPlace}, agire in fretta fa la differenza.`,
      `Chi vanta un credito verso un cliente o un privato ${inPlace} ha due strade: il recupero bonario o quello legale.`,
      `Un insoluto non gestito perde valore ogni mese: anche ${inPlace} la tempestività è decisiva.`,
    ],
    seed,
    0,
  )

  const middle =
    agencyCount > 0
      ? pick(
          [
            `In questa pagina trovi ${agencyCount === 1 ? "l'agenzia partner attiva" : `le ${agencyCount} agenzie partner attive`} nella ${label}, con servizi, zone coperte e contatti diretti.`,
            `Qui sotto sono elencate le agenzie di recupero crediti che operano nella ${label}: puoi confrontarle per servizi offerti e contattarle direttamente.`,
            `Il portale raccoglie le agenzie sponsor che coprono la ${label}: ognuna espone servizi, recapiti e zone di intervento verificabili.`,
          ],
          seed,
          1,
        )
      : pick(
          [
            `Le agenzie partner per questa ${label} sono in fase di attivazione: nel frattempo puoi consultare le agenzie delle zone limitrofe o richiedere assistenza dai contatti del portale.`,
            `Non ci sono ancora agenzie sponsor attive per questa ${label}: consulta le zone vicine oppure torna presto, la directory è in continua crescita.`,
          ],
          seed,
          1,
        )

  const closing = pick(
    [
      'Prima di scegliere, verifica sempre i servizi trattati (stragiudiziale, giudiziale, B2B) e chiedi una valutazione gratuita della tua pratica.',
      'Il consiglio: affida la pratica a chi conosce i tribunali e il tessuto economico locale, e privilegia compensi a percentuale sul recuperato.',
      'Ricorda che un recupero avviato entro pochi mesi dalla scadenza ha probabilità di successo molto più alte di uno tardivo.',
    ],
    seed,
    2,
  )

  return `${opening} ${middle} ${closing}`
}

export function serviceInLocationIntro(service: Service, location: Location, agencyCount: number): string {
  const seed = hashSlug(`${service.slug}-${location.slug}`)
  const inPlace = location.type === 'regione' ? `in ${location.name}` : `a ${location.name}`

  const opening = pick(
    [
      `Cerchi un servizio di ${service.name.toLowerCase()} ${inPlace}?`,
      `Il servizio di ${service.name.toLowerCase()} ${inPlace} è tra i più richiesti da aziende e privati della zona.`,
      `Per chi ha bisogno di ${service.name.toLowerCase()} ${inPlace}, la scelta dell'operatore giusto è il primo passo.`,
    ],
    seed,
    0,
  )

  const middle =
    agencyCount > 0
      ? `${agencyCount === 1 ? "C'è 1 agenzia partner attiva" : `Ci sono ${agencyCount} agenzie partner attive`} che ${agencyCount === 1 ? 'offre' : 'offrono'} questo servizio nella zona: trovi schede, recapiti e zone coperte qui sotto.`
      : `Le agenzie partner per questo servizio nella zona sono in fase di attivazione: consulta le zone limitrofe o la pagina generale del servizio.`

  const closing = pick(
    [
      service.shortDescription,
      `${service.shortDescription} Confronta le agenzie e richiedi una valutazione gratuita della pratica.`,
    ],
    seed,
    1,
  )

  return `${opening} ${middle} ${closing}`
}
