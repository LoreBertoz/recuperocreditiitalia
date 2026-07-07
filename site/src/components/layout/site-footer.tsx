import Link from 'next/link'

import { CookiePreferencesLink } from '@/components/analytics/consent'

const footerColumns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: 'Servizi',
    links: [
      { href: '/servizi', label: 'Tutti i servizi' },
      { href: '/recupero-crediti', label: 'Agenzie per zona' },
      { href: '/guide', label: 'Guide al recupero crediti' },
    ],
  },
  {
    title: 'Per le agenzie',
    links: [
      { href: '/diventa-partner', label: 'Diventa partner' },
      { href: '/area-riservata', label: 'Area riservata' },
    ],
  },
  {
    title: 'Il portale',
    links: [
      { href: '/come-funziona', label: 'Come funziona' },
      { href: '/chi-siamo', label: 'Chi siamo' },
      { href: '/contatti', label: 'Contatti' },
    ],
  },
  {
    title: 'Legale',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/cookie-policy', label: 'Cookie policy' },
      { href: '/termini', label: 'Termini e condizioni' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="font-semibold tracking-tight">
              Recupero Crediti <span className="text-primary">Italia</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              La directory nazionale delle agenzie di recupero crediti. Trova l&apos;agenzia più
              vicina a te, per zona e tipo di servizio.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-semibold">{column.title}</p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} recuperocreditiitalia.it — Tutti i diritti riservati. Il
            portale svolge esclusivamente attività di presentazione e messa in contatto: non
            fornisce direttamente servizi di recupero crediti.
          </p>
          <CookiePreferencesLink />
        </div>
      </div>
    </footer>
  )
}
