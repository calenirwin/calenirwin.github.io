import Link from 'next/link'
import { getAllPosts } from '@/lib/markdown'
import { formatDate } from '@/lib/utils'

export default async function Home() {
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 5)

  return (
    <div className="max-w-2xl mx-auto px-6">
      <section className="pt-20 pb-16">
        <h1 className="font-heading text-5xl md:text-6xl font-black tracking-tight mb-6">
          Calen Irwin
        </h1>
        <p className="text-gray-600 text-base leading-relaxed max-w-sm">
          Research data scientist.
          <br/>
          Building with AI and writing about it.
        </p>
      </section>

      <section className="pb-20">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
            Recent Writing
          </h2>
          <Link href="/blog" className="text-xs text-gray-500 hover:text-black transition-colors">
            All posts &rarr;
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-4"
            >
              <span className="group-hover:opacity-60 transition-opacity">
                {post.title}
              </span>
              <span className="text-sm text-gray-500 shrink-0">
                {formatDate(post.date, 'short')}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
