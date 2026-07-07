import type { Metadata } from 'next'
import { Check, Crown, Minus, Star } from 'lucide-react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { LeadForm } from '@/components/lead-form'
import { faqJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Diventa partner: porta la tua agenzia sul portale',
  description:
    'Sponsorizzazione per agenzie di recupero crediti: visibilità mirata per zona e servizio, lead qualificati, nessuna commissione. Piani da 49 €/mese.',
  alternates: { canonical: '/diventa-partner' },
}

type TierFeature = { label: string; base: string | boolean; premium: string | boolean; top: string | boolean }

const features: TierFeature[] = [
  { label: 'Scheda agenzia in directory', base: true, premium: true, top: true },
  { label: 'Zone di copertura pubblicate', base: '1 provincia', premium: 'fino a 3 province', top: 'intera regione (o più)' },
  { label: 'Servizi elencati', base: 'fino a 2', premium: 'tutti', top: 'tutti' },
  { label: 'Posizionamento nei risultati', base: 'standard', premium: 'prioritario', top: 'massima priorità' },
  { label: 'Badge "Sponsor verificato"', base: false, premium: true, top: true },
  { label: 'Logo in evidenza nei risultati', base: false, premium: true, top: true },
  { label: 'Link al sito + telefono + WhatsApp', base: true, premium: true, top: true },
  { label: 'Modulo contatto/lead sulla scheda', base: true, premium: true, top: true },
  { label: 'Presenza in home ("Agenzie in evidenza")', base: false, premium: false, top: true },
  { label: 'Banner nelle pagine località della tua zona', base: false, premium: false, top: true },
  { label: 'Descrizione estesa + gallery/foto', base: 'breve', premium: 'estesa', top: 'estesa + gallery' },
  { label: 'Articolo/menzione nel blog', base: false, premium: false, top: '1 all’anno' },
  { label: 'Statistiche visite/lead (area riservata)', base: 'base', premium: 'complete', top: 'complete' },
  { label: 'Assistenza', base: 'email', premium: 'email prioritaria', top: 'referente dedicato' },
]

const faq = [
  {
    question: 'Come funziona il pagamento?',
    answer:
      'In questa fase l’attivazione è gestita direttamente dal nostro staff: dopo la richiesta ti contattiamo, definiamo il piano e attiviamo la scheda al ricevimento del pagamento (bonifico con fattura). Il pagamento con carta arriverà a breve.',
  },
  {
    question: 'Posso cambiare piano in seguito?',
    answer:
      'Sì, l’upgrade è immediato in qualsiasi momento: paghi solo la differenza per il periodo residuo. Il downgrade si applica dal rinnovo successivo.',
  },
  {
    question: 'C’è un vincolo di durata?',
    answer:
      'Il piano mensile si rinnova di mese in mese e si può disdire in ogni momento. Il piano annuale (2 mesi gratis) ha durata 12 mesi.',
  },
  {
    question: 'Il portale prende commissioni sui lavori acquisiti?',
    answer:
      'No, mai. Paghi solo l’abbonamento: i clienti che ti contattano sono tuoi al 100%, senza commissioni né intermediazioni.',
  },
]

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto size-4 text-primary" aria-label="Incluso" />
  if (value === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" aria-label="Non incluso" />
  return <span className="text-xs">{value}</span>
}

export default function PartnerPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(faq)} />
      <Breadcrumbs items={[{ label: 'Diventa partner', href: '/diventa-partner' }]} />

      <div className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Fai crescere la tua agenzia di recupero crediti
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ogni giorno privati e aziende cercano un’agenzia affidabile vicino a loro. Con
          recuperocreditiitalia.it la tua agenzia viene trovata dai clienti giusti, per zona e per
          tipo di servizio.
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong>Visibilità mirata</strong>: appari quando cercano nella tua provincia.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong>Lead qualificati</strong>: contatti diretti da chi ha davvero un credito da
              recuperare.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <strong>Nessuna commissione sui lavori</strong>: paghi solo l’abbonamento, il cliente
              è tuo al 100%.
            </span>
          </li>
        </ul>
      </div>

      {/* Card prezzi */}
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {/* BASE */}
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-bold">Base</h2>
          <p className="mt-1 text-sm text-muted-foreground">Per iniziare a farsi trovare.</p>
          <p className="mt-4">
            <span className="text-4xl font-bold">49 €</span>
            <span className="text-muted-foreground">/mese</span>
          </p>
          <p className="text-xs text-muted-foreground">oppure 490 €/anno (2 mesi gratis)</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>Scheda in directory</li>
            <li>1 provincia di copertura</li>
            <li>Fino a 2 servizi elencati</li>
            <li>Contatti diretti sulla scheda</li>
          </ul>
        </div>
        {/* PREMIUM */}
        <div className="relative rounded-2xl border-2 border-primary bg-card p-6 shadow-lg">
          <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            <Star className="size-3.5" aria-hidden="true" /> Consigliato
          </span>
          <h2 className="text-lg font-bold">Premium</h2>
          <p className="mt-1 text-sm text-muted-foreground">Il più scelto dalle agenzie.</p>
          <p className="mt-4">
            <span className="text-4xl font-bold">149 €</span>
            <span className="text-muted-foreground">/mese</span>
          </p>
          <p className="text-xs text-muted-foreground">oppure 1.490 €/anno (2 mesi gratis)</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>Tutto di Base, più:</li>
            <li>Fino a 3 province di copertura</li>
            <li>Tutti i servizi elencati</li>
            <li>Posizionamento prioritario</li>
            <li>Badge &laquo;Sponsor verificato&raquo;</li>
            <li>Logo in evidenza nei risultati</li>
          </ul>
        </div>
        {/* TOP */}
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="flex items-center gap-1.5 text-lg font-bold">
            Top <Crown className="size-4 text-primary" aria-hidden="true" />
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Massima visibilità nella tua zona.</p>
          <p className="mt-4">
            <span className="text-4xl font-bold">349 €</span>
            <span className="text-muted-foreground">/mese</span>
          </p>
          <p className="text-xs text-muted-foreground">oppure 3.490 €/anno (2 mesi gratis)</p>
          <ul className="mt-5 space-y-2 text-sm">
            <li>Tutto di Premium, più:</li>
            <li>Intera regione (o più) di copertura</li>
            <li>Massima priorità nei risultati</li>
            <li>Presenza in home page</li>
            <li>Banner nelle pagine della tua zona</li>
            <li>1 articolo/menzione nel blog all’anno</li>
            <li>Referente dedicato</li>
          </ul>
        </div>
      </div>

      {/* Tabella confronto */}
      <section aria-labelledby="confronto-h" className="mt-14">
        <h2 id="confronto-h" className="text-2xl font-bold tracking-tight">
          Confronto completo dei piani
        </h2>
        <div className="mt-4 overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b bg-muted/40 text-left">
                <th className="p-3 font-semibold">Caratteristica</th>
                <th className="p-3 text-center font-semibold">Base</th>
                <th className="p-3 text-center font-semibold text-primary">Premium ⭐</th>
                <th className="p-3 text-center font-semibold">Top 👑</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.label} className="border-b last:border-0">
                  <td className="p-3">{feature.label}</td>
                  <td className="p-3 text-center"><FeatureCell value={feature.base} /></td>
                  <td className="p-3 text-center"><FeatureCell value={feature.premium} /></td>
                  <td className="p-3 text-center"><FeatureCell value={feature.top} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Nota sull’ordinamento: il criterio primario dei risultati resta la vicinanza geografica
          dell’utente; il piano dà un boost a parità di zona. Questo mantiene il portale utile e
          credibile — ed è un vantaggio anche per te.
        </p>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-partner-h" className="mt-14">
        <h2 id="faq-partner-h" className="text-2xl font-bold tracking-tight">
          Domande frequenti
        </h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <div key={item.question} className="rounded-xl border bg-card p-5">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Form */}
      <section aria-labelledby="richiesta-h" className="mt-14 max-w-2xl">
        <h2 id="richiesta-h" className="text-2xl font-bold tracking-tight">
          Richiedi informazioni
        </h2>
        <p className="mt-2 text-muted-foreground">
          Compila il modulo: ti ricontattiamo entro 1-2 giorni lavorativi per attivare la tua
          scheda.
        </p>
        <div className="mt-6">
          <LeadForm type="partner" />
        </div>
      </section>
    </div>
  )
}
