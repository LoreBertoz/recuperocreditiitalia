import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { getPublishedPosts } from '@/lib/api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Guide al recupero crediti: procedure, costi e consigli pratici',
  description:
    'Guide pratiche sul recupero crediti in Italia: come agire con un cliente che non paga, costi delle agenzie, decreto ingiuntivo e molto altro.',
  alternates: { canonical: '/guide' },
}

export default async function GuidesPage() {
  const posts = await getPublishedPosts(50)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: 'Guide', href: '/guide' }]} />

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        Guide al recupero crediti
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Procedure, costi, strumenti legali e consigli pratici scritti in linguaggio chiaro: tutto
        quello che serve sapere prima (e durante) il recupero di un credito.
      </p>

      <div className="mt-8 space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-md">
            <h2 className="text-xl font-semibold leading-snug">
              <Link href={`/guide/${post.slug}`} className="hover:text-primary hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            {post.publishedAt && (
              <p className="mt-3 text-xs text-muted-foreground">
                Aggiornata al{' '}
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('it-IT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
