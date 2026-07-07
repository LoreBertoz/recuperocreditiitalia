import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'Informativa sul trattamento dei dati personali degli utenti di recuperocreditiitalia.it ai sensi del GDPR (Reg. UE 2016/679).',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

/*
 * Testo dalla bozza operativa (Pagine-Legali-Bozza.md).
 * ⚠️ Prima della pubblicazione: compilare i placeholder [TRA PARENTESI]
 * e far validare da un avvocato/DPO.
 */
export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Privacy policy', href: '/privacy' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Privacy policy</h1>

      <div className="prose prose-sm mt-6 max-w-none sm:prose-base prose-headings:font-semibold">
        <h2>Titolare del trattamento</h2>
        <p>
          Il titolare del trattamento dei dati è <strong>[RAGIONE SOCIALE]</strong>, con sede in
          [SEDE LEGALE], P.IVA [P.IVA], email [EMAIL], PEC [PEC].
        </p>

        <h2>Quali dati raccogliamo</h2>
        <ul>
          <li>
            Dati forniti volontariamente tramite i moduli del sito (form contatti, richiesta
            &laquo;Diventa partner&raquo;, registrazione area riservata agenzie): nome, cognome,
            ragione sociale, email, telefono, contenuto dei messaggi.
          </li>
          <li>
            Dati di navigazione raccolti automaticamente (indirizzo IP, tipo di browser, pagine
            visitate, tramite cookie e strumenti analitici — vedi Cookie Policy).
          </li>
          <li>
            Dati delle agenzie sponsor necessari alla pubblicazione della scheda (dati aziendali,
            recapiti, zone e servizi).
          </li>
        </ul>

        <h2>Finalità e basi giuridiche</h2>
        <ol>
          <li>
            Rispondere alle richieste e gestire i contatti — base: esecuzione di misure
            precontrattuali / consenso (art. 6.1.b/a).
          </li>
          <li>
            Gestione del rapporto contrattuale con le agenzie sponsor e pubblicazione della scheda
            — base: esecuzione del contratto (art. 6.1.b).
          </li>
          <li>Adempimenti fiscali e di legge — base: obbligo legale (art. 6.1.c).</li>
          <li>
            Analisi statistiche e miglioramento del sito — base: legittimo interesse / consenso per
            i cookie non tecnici (art. 6.1.f/a).
          </li>
          <li>
            Marketing e newsletter (se attivata) — base: consenso (art. 6.1.a), revocabile in ogni
            momento.
          </li>
        </ol>

        <h2>Conferimento dei dati</h2>
        <p>
          Il conferimento è facoltativo, ma il mancato conferimento dei dati necessari impedisce di
          rispondere alle richieste o attivare i servizi.
        </p>

        <h2>Modalità e conservazione</h2>
        <p>
          I dati sono trattati con strumenti informatici e misure di sicurezza adeguate. Sono
          conservati per il tempo necessario alle finalità indicate e agli obblighi di legge (es.
          dati contrattuali/fiscali fino a 10 anni; dati di contatto per il tempo strettamente
          necessario alla gestione della richiesta).
        </p>

        <h2>Destinatari e responsabili</h2>
        <p>
          I dati possono essere trattati da fornitori che agiscono come responsabili del
          trattamento: hosting/deploy (es. provider cloud), database gestito, strumenti di analisi
          (Google Analytics), eventuale processore di pagamento (Stripe). Non vengono diffusi né
          venduti a terzi. Alcuni fornitori possono trattare dati fuori dall&rsquo;UE con garanzie
          adeguate (Clausole Contrattuali Standard).
        </p>

        <h2>Diritti dell&rsquo;interessato</h2>
        <p>
          L&rsquo;interessato può esercitare in ogni momento i diritti di accesso, rettifica,
          cancellazione, limitazione, portabilità e opposizione, nonché revocare il consenso,
          scrivendo a [EMAIL]. Ha inoltre diritto di reclamo al Garante per la protezione dei dati
          personali (
          <a href="https://www.garanteprivacy.it" rel="noopener" target="_blank">
            www.garanteprivacy.it
          </a>
          ).
        </p>

        <p>
          <em>Ultimo aggiornamento: [DATA].</em>
        </p>
      </div>
    </div>
  )
}
