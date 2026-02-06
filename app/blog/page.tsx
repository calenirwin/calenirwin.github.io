import Link from 'next/link'
import { getAllPosts, getAllTags } from '@/lib/markdown'
import { formatDate } from '@/lib/utils'

export const metadata = {
  title: 'Writing - Calen Irwin',
  description: 'Thoughts on AI, building products, and the philosophy behind both.',
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const tags = getAllTags(allPosts)

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
        Writing
      </h1>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-12 text-sm">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-gray-500 hover:text-black transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {allPosts.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {allPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5"
            >
              <div>
                <span className="group-hover:opacity-60 transition-opacity">
                  {post.title}
                </span>
                <div className="flex gap-3 mt-1">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 shrink-0">
                {formatDate(post.date, 'short')}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts yet.</p>
      )}
    </div>
  )
}
