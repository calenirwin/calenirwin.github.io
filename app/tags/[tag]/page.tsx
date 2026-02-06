import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/markdown'
import { formatDate } from '@/lib/utils'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts()
  const tags = getAllTags(allPosts)
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `${decodedTag} - Calen Irwin`,
    description: `Posts tagged "${decodedTag}"`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  if (!/^[a-z0-9-]+$/i.test(decodedTag)) {
    notFound()
  }

  const posts = await getPostsByTag(decodedTag)
  const allPosts = await getAllPosts()
  const allTags = getAllTags(allPosts)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-black transition-colors"
      >
        &larr; Writing
      </Link>

      <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight mt-8 mb-2">
        {decodedTag}
      </h1>
      <p className="text-sm text-gray-500 mb-12">
        {posts.length} {posts.length === 1 ? 'post' : 'posts'}
      </p>

      <div className="divide-y divide-gray-100 mb-12">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5"
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

      {allTags.length > 1 && (
        <div className="pt-8 border-t border-gray-200">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium mb-4">
            Other topics
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {allTags
              .filter((t) => t !== decodedTag)
              .map((t) => (
                <Link
                  key={t}
                  href={`/tags/${encodeURIComponent(t)}`}
                  className="text-gray-500 hover:text-black transition-colors"
                >
                  {t}
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
