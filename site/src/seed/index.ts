/**
 * Seed dei dati di esempio. Idempotente: si può rilanciare senza duplicare.
 * Esecuzione: pnpm seed
 */
import config from '@payload-config'
import { getPayload, type Payload } from 'payload'

import { agencies } from './agencies-data'
import { posts } from './blog-data'
import { provinces, regions } from './locations-data'
import { richText } from './richtext'
import { services } from './services-data'

async function findBySlug(payload: Payload, collection: 'services' | 'agencies' | 'blog-posts', slug: string) {
  const result = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 })
  return result.docs[0] ?? null
}

async function findLocation(payload: Payload, type: string, slug: string) {
  const result = await payload.find({
    collection: 'locations',
    where: { and: [{ type: { equals: type } }, { slug: { equals: slug } }] },
    limit: 1,
  })
  return result.docs[0] ?? null
}

async function seed() {
  const payload = await getPayload({ config })

  // --- Utente admin di sviluppo ---
  const adminEmail = 'admin@recuperocreditiitalia.it'
  const existingAdmin = await payload.find({
    collection: 'users',
    where: { email: { equals: adminEmail } },
    limit: 1,
  })
  if (existingAdmin.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: adminEmail,
        password: 'admin1234!dev',
        name: 'Admin',
        role: 'admin',
      },
    })
    payload.logger.info(`Creato utente admin: ${adminEmail} (password dev: admin1234!dev)`)
  }

  // --- Regioni ---
  const regionIds = new Map<string, number>()
  for (const region of regions) {
    let doc = await findLocation(payload, 'regione', region.slug)
    if (!doc) {
      doc = await payload.create({
        collection: 'locations',
        data: {
          name: region.name,
          slug: region.slug,
          type: 'regione',
          lat: region.lat,
          lng: region.lng,
          description: region.description,
        },
      })
    }
    regionIds.set(region.slug, doc.id)
  }
  payload.logger.info(`Regioni: ${regionIds.size}`)

  // --- Province ---
  const provinceIds = new Map<string, number>()
  for (const province of provinces) {
    let doc = await findLocation(payload, 'provincia', province.slug)
    if (!doc) {
      doc = await payload.create({
        collection: 'locations',
        data: {
          name: province.name,
          slug: province.slug,
          type: 'provincia',
          parent: regionIds.get(province.region),
          lat: province.lat,
          lng: province.lng,
        },
      })
    }
    provinceIds.set(province.slug, doc.id)
  }
  payload.logger.info(`Province: ${provinceIds.size}`)

  // --- Servizi ---
  const serviceIds = new Map<string, number>()
  for (const service of services) {
    let doc = await findBySlug(payload, 'services', service.slug)
    if (!doc) {
      doc = await payload.create({
        collection: 'services',
        data: {
          name: service.name,
          slug: service.slug,
          order: service.order,
          shortDescription: service.shortDescription,
          description: richText(service.paragraphs),
          faq: service.faq,
          seo: { metaTitle: service.metaTitle, metaDescription: service.metaDescription },
        },
      })
    }
    serviceIds.set(service.slug, doc.id)
  }
  payload.logger.info(`Servizi: ${serviceIds.size}`)

  // --- Agenzie (fittizie) ---
  let agencyCount = 0
  for (const agency of agencies) {
    const existing = await findBySlug(payload, 'agencies', agency.slug)
    if (existing) continue
    const coverageIds = agency.coverage
      .map((c) => (c.type === 'regione' ? regionIds.get(c.slug) : provinceIds.get(c.slug)))
      .filter((id): id is number => typeof id === 'number')
    await payload.create({
      collection: 'agencies',
      data: {
        name: agency.name,
        slug: agency.slug,
        descriptionShort: agency.descriptionShort,
        descriptionLong: richText(agency.paragraphs),
        services: agency.services
          .map((slug) => serviceIds.get(slug))
          .filter((id): id is number => typeof id === 'number'),
        coverageAreas: coverageIds,
        headquarters: agency.headquarters,
        contactPhone: agency.contactPhone,
        contactEmail: agency.contactEmail,
        website: agency.website,
        whatsapp: agency.whatsapp,
        sponsorTier: agency.sponsorTier,
        subscriptionStatus: agency.subscriptionStatus,
        verified: agency.verified,
      },
    })
    agencyCount++
  }
  payload.logger.info(`Agenzie create: ${agencyCount}`)

  // --- Guide ---
  let postCount = 0
  for (const post of posts) {
    const existing = await findBySlug(payload, 'blog-posts', post.slug)
    if (existing) continue
    await payload.create({
      collection: 'blog-posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: richText(post.paragraphs),
        tags: post.tags.map((tag) => ({ tag })),
        faq: post.faq,
        seo: { metaTitle: post.metaTitle, metaDescription: post.metaDescription },
        publishedAt: new Date().toISOString(),
        _status: 'published',
      },
    })
    postCount++
  }
  payload.logger.info(`Guide create: ${postCount}`)

  // --- Utente agenzia demo (per testare l'area riservata) ---
  const agencyEmail = 'agenzia@recuperamilano.example'
  const existingAgencyUser = await payload.find({
    collection: 'users',
    where: { email: { equals: agencyEmail } },
    limit: 1,
  })
  if (existingAgencyUser.docs.length === 0) {
    const demoAgency = await findBySlug(payload, 'agencies', 'recupera-milano')
    if (demoAgency) {
      await payload.create({
        collection: 'users',
        data: {
          email: agencyEmail,
          password: 'agenzia1234!dev',
          name: 'Recupera Milano',
          role: 'agency',
          agency: demoAgency.id,
        },
        overrideAccess: true,
      })
      payload.logger.info(`Creato utente agenzia demo: ${agencyEmail} (password dev: agenzia1234!dev)`)
    }
  }

  payload.logger.info('Seed completato ✔')
  process.exit(0)
}

try {
  await seed()
} catch (error) {
  console.error(error)
  process.exit(1)
}
