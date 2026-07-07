'use client'

import { useRouter } from 'next/navigation'
import React, { useMemo, useRef, useState } from 'react'
import { LocateFixed, MapPin, Search } from 'lucide-react'

export type LocationOption = {
  id: number
  name: string
  slug: string
  type: 'regione' | 'provincia' | 'citta'
  lat: number
  lng: number
}

export type ServiceOption = {
  id: number
  name: string
  slug: string
}

const typeLabel: Record<LocationOption['type'], string> = {
  regione: 'Regione',
  provincia: 'Provincia',
  citta: 'Città',
}

/**
 * Barra di ricerca principale: località (priorità #1, autocomplete) + servizio (priorità #2).
 * Naviga a /cerca?loc=<type>:<slug>&servizio=<slug>.
 */
export function SearchBar({
  locations,
  services,
  defaultServiceSlug,
  compact = false,
}: {
  locations: LocationOption[]
  services: ServiceOption[]
  defaultServiceSlug?: string
  compact?: boolean
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<LocationOption | null>(null)
  const [serviceSlug, setServiceSlug] = useState(defaultServiceSlug ?? '')
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const [geoError, setGeoError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return locations
      .filter((l) => l.name.toLowerCase().includes(q))
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1
        return aStarts - bStarts || a.name.localeCompare(b.name, 'it')
      })
      .slice(0, 8)
  }, [query, locations])

  function choose(location: LocationOption) {
    setSelected(location)
    setQuery(location.name)
    setOpen(false)
  }

  function submit(event: React.FormEvent) {
    event.preventDefault()
    const params = new URLSearchParams()
    const location = selected ?? matches[0] ?? null
    if (location) params.set('loc', `${location.type}:${location.slug}`)
    if (serviceSlug) params.set('servizio', serviceSlug)
    router.push(`/cerca?${params.toString()}`)
  }

  function useMyPosition() {
    setGeoError(null)
    if (!navigator.geolocation) {
      setGeoError('Geolocalizzazione non supportata dal browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        // trova la località più vicina (province e città prima delle regioni)
        let best: LocationOption | null = null
        let bestDistance = Infinity
        for (const l of locations) {
          if (l.type === 'regione') continue
          const d = (l.lat - latitude) ** 2 + (l.lng - longitude) ** 2
          if (d < bestDistance) {
            bestDistance = d
            best = l
          }
        }
        if (best) choose(best)
      },
      () => setGeoError('Impossibile rilevare la posizione. Digita la località.'),
      { timeout: 8000 },
    )
  }

  return (
    <form
      onSubmit={submit}
      role="search"
      aria-label="Cerca un'agenzia di recupero crediti"
      className={
        'flex w-full flex-col gap-2 rounded-xl border bg-card p-3 shadow-lg sm:gap-3 ' +
        (compact ? 'sm:flex-row sm:items-center' : 'sm:p-4 lg:flex-row lg:items-center')
      }
    >
      <div className="relative flex-1">
        <label htmlFor="search-location" className="sr-only">
          Località (regione, provincia o città)
        </label>
        <MapPin
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="search-location"
          type="text"
          autoComplete="off"
          placeholder="Dove? Regione, provincia o città…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setSelected(null)
            setOpen(true)
            setHighlighted(0)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault()
              setHighlighted((h) => Math.min(h + 1, matches.length - 1))
            } else if (event.key === 'ArrowUp') {
              event.preventDefault()
              setHighlighted((h) => Math.max(h - 1, 0))
            } else if (event.key === 'Enter' && open && matches[highlighted]) {
              event.preventDefault()
              choose(matches[highlighted])
            }
          }}
          className="h-11 w-full rounded-md border bg-background pl-9 pr-3 text-sm outline-none ring-ring/50 focus:ring-2"
          role="combobox"
          aria-expanded={open && matches.length > 0}
          aria-controls="search-location-list"
        />
        {open && matches.length > 0 && (
          <ul
            id="search-location-list"
            role="listbox"
            className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-popover shadow-md"
          >
            {matches.map((match, index) => (
              <li key={`${match.type}-${match.slug}`} role="option" aria-selected={index === highlighted}>
                <button
                  type="button"
                  onMouseDown={(event) => {
                    event.preventDefault()
                    choose(match)
                  }}
                  onMouseEnter={() => setHighlighted(index)}
                  className={
                    'flex w-full items-center justify-between px-3 py-2 text-left text-sm ' +
                    (index === highlighted ? 'bg-accent' : '')
                  }
                >
                  <span>{match.name}</span>
                  <span className="text-xs text-muted-foreground">{typeLabel[match.type]}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          onClick={useMyPosition}
          className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded px-1.5 py-1 text-xs font-medium text-primary hover:bg-accent"
        >
          <LocateFixed className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Usa la mia posizione</span>
        </button>
      </div>

      <div className="sm:w-64">
        <label htmlFor="search-service" className="sr-only">
          Tipologia di servizio
        </label>
        <select
          id="search-service"
          value={serviceSlug}
          onChange={(event) => setServiceSlug(event.target.value)}
          className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
        >
          <option value="">Tutti i servizi</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        <Search className="size-4" aria-hidden="true" />
        Trova agenzia
      </button>

      {geoError && (
        <p role="alert" className="text-xs text-destructive sm:w-full">
          {geoError}
        </p>
      )}
    </form>
  )
}
