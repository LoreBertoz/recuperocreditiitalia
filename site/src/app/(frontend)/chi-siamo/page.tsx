import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Chi siamo',
  description:
    'recuperocreditiitalia.it è la directory nazionale delle agenzie di recupero crediti: la nostra missione è rendere semplice trovare l’agenzia giusta, vicina e specializzata.',
  alternates: { canonical: '/chi-siamo' },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Chi siamo', href: '/chi-siamo' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Chi siamo</h1>

      <div className="prose prose-sm mt-6 max-w-none sm:prose-base prose-headings:font-semibold prose-headings:tracking-tight">
        <p>
          <strong>recuperocreditiitalia.it</strong> è la directory nazionale delle agenzie di
          recupero crediti. Nasce da un’osservazione semplice: chi ha un credito da recuperare —
          un’azienda con fatture insolute, un proprietario con affitti arretrati, un professionista
          con compensi non pagati — non sa a chi rivolgersi, e finisce spesso per non fare nulla o
          per affidarsi al primo risultato trovato online.
        </p>
        <p>
          Il nostro lavoro è mettere ordine: raccogliamo le agenzie specializzate, le organizziamo
          per <strong>zona geografica</strong> e <strong>tipologia di servizio</strong>, e rendiamo
          il contatto diretto e trasparente. Per gli utenti il servizio è gratuito; le agenzie
          sostengono il portale tramite abbonamenti di sponsorizzazione, sempre dichiarati.
        </p>
        <h2>I nostri principi</h2>
        <ul>
          <li>
            <strong>La vicinanza prima di tutto.</strong> I risultati sono ordinati per prossimità
            geografica: la sponsorizzazione dà visibilità, ma non permette a un’agenzia lontana di
            scavalcare una realmente più vicina.
          </li>
          <li>
            <strong>Trasparenza.</strong> La natura sponsorizzata delle schede è dichiarata; il
            badge “Sponsor verificato” indica dati aziendali che abbiamo controllato.
          </li>
          <li>
            <strong>Contenuti utili.</strong> Le nostre guide spiegano procedure, costi e diritti
            in linguaggio chiaro, senza promesse irrealistiche.
          </li>
          <li>
            <strong>Nessuna intermediazione.</strong> Non prendiamo commissioni sulle pratiche e
            non siamo parte dei rapporti tra utenti e agenzie.
          </li>
        </ul>
        <h2>Contatti</h2>
        <p>
          Per informazioni, segnalazioni o richieste stampa: visita la pagina{' '}
          <Link href="/contatti">Contatti</Link>. Se rappresenti un’agenzia e vuoi entrare nella
          directory, trovi tutto in <Link href="/diventa-partner">Diventa partner</Link>.
        </p>
      </div>
    </div>
  )
}
