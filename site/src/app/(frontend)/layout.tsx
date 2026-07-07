import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import { CookieConsent } from '@/components/analytics/consent'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.recuperocreditiitalia.it'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Recupero Crediti Italia — Trova l’agenzia di recupero crediti più vicina a te',
    template: '%s | Recupero Crediti Italia',
  },
  description:
    'Directory nazionale delle agenzie di recupero crediti in Italia. Cerca per regione, provincia o città e per tipo di servizio: stragiudiziale, giudiziale, B2B e altro.',
}

export default function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="it" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  )
}
