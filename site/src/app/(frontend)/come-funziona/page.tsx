import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { faqJsonLd } from '@/lib/jsonld'

export const metadata: Metadata = {
  title: 'Come funziona il portale',
  description:
    'recuperocreditiitalia.it mette in contatto chi deve recuperare un credito con le agenzie specializzate della propria zona. Gratis per gli utenti, senza commissioni.',
  alternates: { canonical: '/come-funziona' },
}

const faq = [
  {
    question: 'Il servizio è gratuito per chi cerca un’agenzia?',
    answer:
      'Sì, completamente. Il portale si sostiene con gli abbonamenti delle agenzie sponsor: per gli utenti la ricerca e il contatto sono gratuiti e senza impegno.',
  },
  {
    question: 'Il portale prende una commissione sul recupero?',
    answer:
      'No. Il contatto con l’agenzia è diretto: accordi, costi e condizioni si definiscono direttamente con l’agenzia scelta. Nessuna commissione o intermediazione.',
  },
  {
    question: 'Come vengono selezionate le agenzie?',
    answer:
      'Le agenzie presenti sono sponsor del portale. Il badge "Sponsor verificato" indica che abbiamo verificato i dati aziendali dichiarati (ragione sociale, sede, licenza ex art. 115 TULPS dichiarata).',
  },
  {
    question: 'Come sono ordinati i risultati di ricerca?',
    answer:
      'Il criterio primario è la vicinanza geografica alla località cercata; il livello di sponsorizzazione dà solo una spinta a parità di zona. Un’agenzia lontana non scavalca mai una realmente più vicina.',
  },
]

const steps = [
  {
    title: 'Descrivi dove ti serve',
    text: 'Indica regione, provincia o città del debitore (o usa la tua posizione). La vicinanza geografica è il primo criterio: un’agenzia della zona conosce tribunali e contesto locale.',
  },
  {
    title: 'Scegli il tipo di servizio',
    text: 'Recupero bonario o legale? Fattura B2B o affitto non pagato? Filtra per tipologia e trova gli specialisti giusti.',
  },
  {
    title: 'Confronta le agenzie',
    text: 'Ogni scheda mostra servizi trattati, zone coperte, descrizione e badge di verifica. I risultati sono ordinati per vicinanza.',
  },
  {
    title: 'Contatta senza intermediari',
    text: 'Telefono, email, WhatsApp o sito: parli direttamente con l’agenzia. Il portale non prende commissioni e non entra nel rapporto.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={faqJsonLd(faq)} />
      <Breadcrumbs items={[{ label: 'Come funziona', href: '/come-funziona' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Come funziona recuperocreditiitalia.it
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Siamo la directory nazionale delle agenzie di recupero crediti: aiutiamo privati e aziende
        a trovare l’agenzia giusta per zona e tipo di servizio, gratuitamente e senza commissioni.
      </p>

      <ol className="mt-10 space-y-6">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
            >
              {index + 1}
            </span>
            <div>
              <h2 className="font-semibold">{step.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <section aria-labelledby="faq-come-h" className="mt-12">
        <h2 id="faq-come-h" className="text-2xl font-bold tracking-tight">
          Domande frequenti
        </h2>
        <dl className="mt-4 space-y-4">
          {faq.map((item) => (
            <div key={item.question} className="rounded-xl border bg-card p-5">
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Cerca un’agenzia
        </Link>
        <Link
          href="/diventa-partner"
          className="inline-flex h-11 items-center justify-center rounded-md border px-6 text-sm font-medium hover:bg-accent"
        >
          Sei un’agenzia? Diventa partner
        </Link>
      </div>
    </div>
  )
}
