import type { Agency, BlogPost } from '@/payload-types'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.recuperocreditiitalia.it'
export const SITE_NAME = 'Recupero Crediti Italia'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Directory nazionale delle agenzie di recupero crediti in Italia: ricerca per località e tipologia di servizio.',
  }
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'it',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/cerca?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: `${SITE_URL}${item.href}`,
      })),
    ],
  }
}

export function agencyJsonLd(agency: Agency) {
  const services = (agency.services ?? []).filter(
    (service): service is Exclude<(typeof agency.services)[number], number> =>
      typeof service === 'object',
  )
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/agenzie/${agency.slug}`,
    name: agency.name,
    description: agency.descriptionShort,
    url: `${SITE_URL}/agenzie/${agency.slug}`,
    ...(agency.contactPhone ? { telephone: agency.contactPhone } : {}),
    ...(agency.contactEmail ? { email: agency.contactEmail } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: agency.headquarters.address,
      addressLocality: agency.headquarters.city,
      ...(agency.headquarters.postalCode ? { postalCode: agency.headquarters.postalCode } : {}),
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: agency.headquarters.lat,
      longitude: agency.headquarters.lng,
    },
    ...(services.length > 0
      ? {
          makesOffer: services.map((service) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: service.name },
          })),
        }
      : {}),
  }
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function articleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/guide/${post.slug}`,
    inLanguage: 'it',
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  }
}
