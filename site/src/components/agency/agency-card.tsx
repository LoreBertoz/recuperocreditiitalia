import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, Globe, MapPin, Phone } from 'lucide-react'

import type { Agency, Media, Service } from '@/payload-types'

const tierLabel: Record<Agency['sponsorTier'], string | null> = {
  top: 'Sponsor Top',
  premium: 'Sponsor Premium',
  base: null,
}

export function AgencyCard({
  agency,
  distanceKm,
}: {
  agency: Agency
  distanceKm?: number | null
}) {
  const logo = agency.logo as Media | null | undefined
  const services = (agency.services ?? []).filter(
    (service): service is Service => typeof service === 'object',
  )
  const showLogo = Boolean(logo?.url) && agency.sponsorTier !== 'base'
  const badge = tierLabel[agency.sponsorTier]

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-start">
      {showLogo && logo?.url && (
        <Image
          src={logo.sizes?.thumbnail?.url ?? logo.url}
          alt={logo.alt || `Logo ${agency.name}`}
          width={64}
          height={64}
          className="size-16 shrink-0 rounded-lg border object-contain p-1"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold leading-tight">
            <Link href={`/agenzie/${agency.slug}`} className="hover:text-primary hover:underline">
              {agency.name}
            </Link>
          </h3>
          {agency.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              <BadgeCheck className="size-3.5" aria-hidden="true" />
              Sponsor verificato
            </span>
          )}
          {badge && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {badge}
            </span>
          )}
        </div>

        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {agency.headquarters.city}
            {agency.headquarters.province ? ` (${agency.headquarters.province})` : ''}
          </span>
          {typeof distanceKm === 'number' && (
            <span>~{Math.round(distanceKm)} km dalla località cercata</span>
          )}
        </p>

        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{agency.descriptionShort}</p>

        {services.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {services.slice(0, 4).map((service) => (
              <li key={service.id}>
                <Link
                  href={`/servizi/${service.slug}`}
                  className="rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                >
                  {service.name}
                </Link>
              </li>
            ))}
            {services.length > 4 && (
              <li className="px-1 text-xs text-muted-foreground">+{services.length - 4}</li>
            )}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
        <Link
          href={`/agenzie/${agency.slug}`}
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Vedi scheda
        </Link>
        {agency.contactPhone && (
          <a
            href={`tel:${agency.contactPhone.replace(/\s+/g, '')}`}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-sm font-medium hover:bg-accent"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            Chiama
          </a>
        )}
        {!agency.contactPhone && agency.website && (
          <a
            href={agency.website}
            rel="nofollow noopener"
            target="_blank"
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border px-4 text-sm font-medium hover:bg-accent"
          >
            <Globe className="size-3.5" aria-hidden="true" />
            Sito
          </a>
        )}
      </div>
    </article>
  )
}
