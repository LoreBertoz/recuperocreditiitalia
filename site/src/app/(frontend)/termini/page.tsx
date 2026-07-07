import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Termini e condizioni di servizio',
  description:
    'Termini e condizioni di utilizzo del portale recuperocreditiitalia.it: natura del servizio, responsabilità, sponsorizzazioni e proprietà intellettuale.',
  alternates: { canonical: '/termini' },
}

/*
 * Testo dalla bozza operativa (Pagine-Legali-Bozza.md).
 * ⚠️ Compilare i placeholder [TRA PARENTESI] e far validare da un avvocato
 * prima della pubblicazione.
 */
export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Termini e condizioni', href: '/termini' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Termini e condizioni di servizio</h1>

      <div className="prose prose-sm mt-6 max-w-none sm:prose-base prose-headings:font-semibold">
        <h2>1. Titolare e oggetto</h2>
        <p>
          Il sito recuperocreditiitalia.it (di seguito &laquo;il Portale&raquo;), gestito da
          [RAGIONE SOCIALE] (P.IVA [P.IVA]), è una <strong>directory</strong> che pubblica e mette
          in evidenza agenzie di recupero crediti operanti in Italia, consentendo agli utenti di
          trovarle per zona geografica e tipologia di servizio.
        </p>

        <h2>2. Natura del servizio</h2>
        <p>
          Il Portale svolge esclusivamente attività di{' '}
          <strong>presentazione e messa in contatto</strong>. Non fornisce direttamente servizi di
          recupero crediti, non è parte di alcun rapporto tra utente e agenzia e non risponde della
          qualità, dei tempi o dell&rsquo;esito delle prestazioni delle agenzie pubblicate.
        </p>

        <h2>3. Contenuti e responsabilità delle agenzie</h2>
        <p>
          Le agenzie sponsor sono responsabili della correttezza e liceità dei dati forniti per la
          propria scheda. Il Portale pubblica tali dati in buona fede ma non ne garantisce
          l&rsquo;esattezza assoluta. La presenza di un&rsquo;agenzia sul Portale deriva da un
          rapporto di sponsorizzazione a pagamento e <strong>non costituisce garanzia o
          certificazione</strong> di qualità, salvo eventuali badge esplicitamente descritti (es.
          &laquo;Sponsor verificato&raquo;, il cui significato è definito nel Portale).
        </p>

        <h2>4. Sponsorizzazioni</h2>
        <p>
          La pubblicazione delle agenzie avviene tramite pacchetti di sponsorizzazione a pagamento
          secondo i piani descritti nella pagina &laquo;Diventa Partner&raquo;. Condizioni, durata,
          prezzi e modalità di pagamento sono definiti al momento della sottoscrizione. Il Portale
          può sospendere o rimuovere una scheda in caso di mancato pagamento o violazione dei
          presenti termini.
        </p>

        <h2>5. Obblighi dell&rsquo;utente</h2>
        <p>
          L&rsquo;utente si impegna a usare il Portale in modo lecito, a non inserire dati falsi
          nei moduli e a non utilizzare i contenuti per finalità illecite, di spam o di scraping
          non autorizzato.
        </p>

        <h2>6. Proprietà intellettuale</h2>
        <p>
          Marchi, logo, testi, grafica e struttura del Portale sono di proprietà di [RAGIONE
          SOCIALE] o dei rispettivi titolari e non possono essere riprodotti senza autorizzazione.
          I loghi delle agenzie restano di proprietà delle rispettive agenzie, che ne autorizzano
          l&rsquo;uso ai fini della pubblicazione.
        </p>

        <h2>7. Limitazione di responsabilità</h2>
        <p>
          Nei limiti consentiti dalla legge, il Portale non è responsabile per danni diretti o
          indiretti derivanti dall&rsquo;uso del sito, da eventuali interruzioni del servizio o dai
          rapporti instaurati tra utenti e agenzie.
        </p>

        <h2>8. Modifiche</h2>
        <p>
          Il Portale può modificare i presenti termini in qualsiasi momento; le modifiche hanno
          effetto dalla pubblicazione sul sito.
        </p>

        <h2>9. Legge applicabile e foro competente</h2>
        <p>
          I presenti termini sono regolati dalla legge italiana. Per le controversie con
          consumatori è competente il foro del luogo di residenza/domicilio del consumatore; negli
          altri casi il foro di [CITTÀ SEDE].
        </p>

        <p>
          <em>Ultimo aggiornamento: [DATA].</em>
        </p>
      </div>
    </div>
  )
}
