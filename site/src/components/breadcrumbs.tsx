import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { JsonLd } from '@/components/json-ld'
import { breadcrumbJsonLd } from '@/lib/jsonld'

export type Crumb = { label: string; href: string }

/** Breadcrumb visivo + markup BreadcrumbList (SEO). L'ultima voce è la pagina corrente. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Percorso di navigazione" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1">
                <ChevronRight className="size-3.5" aria-hidden="true" />
                {isLast ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-foreground">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
