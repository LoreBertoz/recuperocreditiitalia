import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { JsonLd } from '@/components/json-ld'
import { getPostBySlug, getPublishedPosts } from '@/lib/api'
import { articleJsonLd, faqJsonLd } from '@/lib/jsonld'

export const revalidate = 3600

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const posts = await getPublishedPosts(200)
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: { canonical: `/guide/${post.slug}` },
  }
}

export default async function GuidePage({ params }: { params: Params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const faq = (post.faq ?? []).map((item) => ({ question: item.question, answer: item.answer }))
  const related = (await getPublishedPosts(4)).filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={articleJsonLd(post)} />
      {faq.length > 0 && <JsonLd data={faqJsonLd(faq)} />}
      <Breadcrumbs
        items={[
          { label: 'Guide', href: '/guide' },
          { label: post.title, href: `/guide/${post.slug}` },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{post.excerpt}</p>
        {post.publishedAt && (
          <p className="mt-3 text-sm text-muted-foreground">
            Pubblicata il{' '}
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>{' '}
            dalla redazione di Recupero Crediti Italia
          </p>
        )}
      </header>

      <div className="prose prose-sm mt-8 max-w-none sm:prose-base prose-headings:font-semibold prose-headings:tracking-tight">
        <RichText data={post.body} />
      </div>

      {faq.length > 0 && (
        <section aria-labelledby="faq-guida-h" className="mt-10">
          <h2 id="faq-guida-h" className="text-2xl font-bold tracking-tight">
            Domande frequenti
          </h2>
          <dl className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.question} className="rounded-xl border bg-card p-5">
                <dt className="font-semibold">{item.question}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className="mt-10 rounded-xl border bg-secondary/50 p-6">
        <h2 className="text-lg font-semibold">Hai un credito da recuperare?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Trova l’agenzia specializzata più vicina a te: cerca per zona e tipo di servizio.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Trova un’agenzia
        </Link>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="correlate-h" className="mt-10">
          <h2 id="correlate-h" className="text-xl font-bold tracking-tight">
            Guide correlate
          </h2>
          <ul className="mt-4 space-y-2">
            {related.map((relatedPost) => (
              <li key={relatedPost.id}>
                <Link
                  href={`/guide/${relatedPost.slug}`}
                  className="text-sm text-primary hover:underline"
                >
                  {relatedPost.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
