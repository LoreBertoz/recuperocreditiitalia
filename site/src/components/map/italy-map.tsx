'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { ITALY_VIEWBOX, regionPaths } from './italy-map-paths'

/**
 * Mappa interattiva dell'Italia: SVG inline con regioni cliccabili.
 * Scelta tecnica (vs MapLibre): zero dipendenze JS pesanti, nessun impatto su LCP/INP,
 * il contenuto resta indicizzabile. Documentato in HANDOFF/assunzioni.
 */
export function ItalyMap() {
  const router = useRouter()
  const [hovered, setHovered] = useState<string | null>(null)
  const hoveredRegion = regionPaths.find((r) => r.slug === hovered)

  return (
    <div className="relative">
      <svg
        viewBox={ITALY_VIEWBOX}
        role="group"
        aria-label="Mappa delle regioni italiane: seleziona una regione per vedere le agenzie di recupero crediti"
        className="h-auto w-full max-w-md"
      >
        {regionPaths.map((region) => (
          <path
            key={region.slug}
            d={region.d}
            role="link"
            tabIndex={0}
            aria-label={`Recupero crediti in ${region.name}`}
            className={
              'cursor-pointer stroke-background stroke-[1.5] transition-colors focus:outline-none ' +
              (hovered === region.slug ? 'fill-primary' : 'fill-primary/25 hover:fill-primary/60')
            }
            onMouseEnter={() => setHovered(region.slug)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(region.slug)}
            onBlur={() => setHovered(null)}
            onClick={() => router.push(`/recupero-crediti/${region.slug}`)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                router.push(`/recupero-crediti/${region.slug}`)
              }
            }}
          />
        ))}
      </svg>
      <div
        aria-hidden="true"
        className={
          'pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 rounded-md border bg-background px-3 py-1 text-sm font-medium shadow-sm transition-opacity ' +
          (hoveredRegion ? 'opacity-100' : 'opacity-0')
        }
      >
        {hoveredRegion?.name ?? ''}
      </div>
    </div>
  )
}
