'use client'

import Script from 'next/script'
import React, { useEffect, useState } from 'react'

/**
 * Cookie banner GDPR + Google Consent Mode v2.
 * - Default: tutto negato (nessun cookie non tecnico prima del consenso).
 * - GA4 viene caricato sempre ma in modalità "consent denied" (cookieless ping)
 *   e passa a granted solo dopo l'accettazione.
 * - La scelta è salvata in localStorage ('cookie_consent': 'granted' | 'denied').
 */

const CONSENT_KEY = 'cookie_consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function applyConsent(granted: boolean) {
  window.gtag?.('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  })
}

export function CookieConsent() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'granted' || stored === 'denied') {
      applyConsent(stored === 'granted')
    } else {
      setVisible(true)
    }

    const reopen = () => setVisible(true)
    window.addEventListener('open-cookie-preferences', reopen)
    return () => window.removeEventListener('open-cookie-preferences', reopen)
  }, [])

  function decide(granted: boolean) {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
    applyConsent(granted)
    setVisible(false)
  }

  return (
    <>
      {gaId && (
        <>
          {/* Consent Mode v2: default denied PRIMA del caricamento di GA4 */}
          <Script id="consent-default" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Preferenze cookie"
          className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg sm:inset-x-auto sm:bottom-4 sm:right-4 sm:max-w-md sm:rounded-xl sm:border"
        >
          <p className="text-sm font-semibold">Cookie e privacy</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Usiamo cookie tecnici necessari e, solo con il tuo consenso, cookie analitici (Google
            Analytics 4) per capire come viene usato il sito. Dettagli nella{' '}
            <a href="/cookie-policy" className="text-primary underline">
              cookie policy
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => decide(true)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Accetta tutti
            </button>
            <button
              type="button"
              onClick={() => decide(false)}
              className="inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium hover:bg-accent"
            >
              Solo necessari
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/** Link "Preferenze cookie" per il footer: riapre il banner. */
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      Preferenze cookie
    </button>
  )
}
