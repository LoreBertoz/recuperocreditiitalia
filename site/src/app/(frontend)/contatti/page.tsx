import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { LeadForm } from '@/components/lead-form'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta la redazione di recuperocreditiitalia.it: informazioni sul portale, segnalazioni, richieste delle agenzie e supporto nella ricerca.',
  alternates: { canonical: '/contatti' },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Contatti', href: '/contatti' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Contatti</h1>
      <p className="mt-4 text-muted-foreground">
        Hai bisogno di aiuto per trovare l’agenzia giusta, vuoi segnalare un problema o chiedere
        informazioni sul portale? Compila il modulo: rispondiamo di norma entro 1-2 giorni
        lavorativi.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Sei un’agenzia e vuoi entrare nella directory? Usa il modulo dedicato nella pagina{' '}
        <a href="/diventa-partner" className="text-primary hover:underline">
          Diventa partner
        </a>
        .
      </p>

      <div className="mt-8">
        <LeadForm type="contact" />
      </div>
    </div>
  )
}
