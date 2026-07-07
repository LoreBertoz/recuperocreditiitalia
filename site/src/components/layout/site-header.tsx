import Link from 'next/link'
import { Landmark } from 'lucide-react'

const navLinks = [
  { href: '/servizi', label: 'Servizi' },
  { href: '/recupero-crediti', label: 'Trova per zona' },
  { href: '/guide', label: 'Guide' },
  { href: '/come-funziona', label: 'Come funziona' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Landmark className="size-4" aria-hidden="true" />
          </span>
          <span className="text-base sm:text-lg">
            Recupero Crediti <span className="text-primary">Italia</span>
          </span>
        </Link>

        <nav aria-label="Navigazione principale" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/area-riservata"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Area riservata
          </Link>
          <Link
            href="/diventa-partner"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Diventa partner
          </Link>
        </div>
      </div>
    </header>
  )
}
