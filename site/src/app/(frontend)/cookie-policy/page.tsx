import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description:
    'Informativa sui cookie utilizzati da recuperocreditiitalia.it: cookie tecnici, analitici e di terze parti, e come gestire il consenso.',
  alternates: { canonical: '/cookie-policy' },
}

/*
 * Testo dalla bozza operativa (Pagine-Legali-Bozza.md).
 * ⚠️ Completare la tabella cookie con i cookie effettivamente installati e
 * far validare da un avvocato/DPO prima della pubblicazione.
 */
export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Cookie policy', href: '/cookie-policy' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Cookie policy</h1>

      <div className="prose prose-sm mt-6 max-w-none sm:prose-base prose-headings:font-semibold">
        <h2>Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti salvano sul dispositivo dell&rsquo;utente.
          Questo sito usa cookie tecnici e, previo consenso, cookie analitici e di terze parti.
        </p>

        <h2>Tipologie usate</h2>
        <ul>
          <li>
            <strong>Cookie tecnici/necessari</strong> (sempre attivi): garantiscono il
            funzionamento del sito, la navigazione e le funzioni essenziali (es. sessione,
            preferenze consenso). Non richiedono consenso.
          </li>
          <li>
            <strong>Cookie analitici</strong> (previo consenso): Google Analytics 4, per
            statistiche aggregate sull&rsquo;uso del sito. Attivati solo dopo consenso, con Consent
            Mode v2.
          </li>
          <li>
            <strong>Cookie di terze parti</strong> (previo consenso): eventuali mappe, contenuti
            embed o strumenti di marketing.
          </li>
        </ul>

        <h2>Gestione del consenso</h2>
        <p>
          Al primo accesso viene mostrato un <strong>banner cookie</strong> che consente di
          accettare, rifiutare o personalizzare le preferenze. L&rsquo;utente può modificare le
          scelte in ogni momento tramite il link &laquo;Preferenze cookie&raquo; nel footer. È
          inoltre possibile gestire/bloccare i cookie dalle impostazioni del proprio browser.
        </p>

        <h2>Tabella cookie</h2>
        <p>
          <em>(Da completare con i cookie effettivamente installati in fase di sviluppo.)</em>
        </p>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Fornitore</th>
              <th>Finalità</th>
              <th>Durata</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>_ga</code>
              </td>
              <td>Google</td>
              <td>Analitico</td>
              <td>24 mesi</td>
            </tr>
            <tr>
              <td>
                <code>cookie_consent</code>
              </td>
              <td>Questo sito</td>
              <td>Memorizza il consenso</td>
              <td>12 mesi</td>
            </tr>
          </tbody>
        </table>

        <p>
          <em>Ultimo aggiornamento: [DATA].</em>
        </p>
      </div>
    </div>
  )
}
