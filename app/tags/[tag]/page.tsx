import { notFound } from 'next/navigation'
import Link from 'next/link'
import BlogPost from '@/components/BlogPost'
import Tag from '@/components/ui/Tag'
import { getAllPosts, getPostsByTag, getAllTags } from '@/lib/markdown'

interface TagPageProps {
  params: Promise<{ tag: string }>
}

// Generate static params for all tags
export async function generateStaticParams() {
  const allPosts = await getAllPosts()
  const tags = getAllTags(allPosts)

  return tags.map((tag) => ({
    tag: tag,
  }))
}

// Generate metadata for the tag page
export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `Posts tagged "${decodedTag}" - Calen Irwin`,
    description: `Blog posts about ${decodedTag}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  // Validate tag format to prevent path traversal
  if (!/^[a-z0-9-]+$/i.test(decodedTag)) {
    notFound()
  }

  const posts = await getPostsByTag(decodedTag)
  const allPosts = await getAllPosts()
  const allTags = getAllTags(allPosts)

  // If no posts found for this tag, show 404
  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-gray-600 hover:text-primary-teal transition-colors mb-4 inline-block"
          >
            ← Back to all posts
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Posts tagged</h1>
            <Tag variant="teal">{decodedTag}</Tag>
          </div>

          <p className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {/* Other Available Tags */}
        {allTags.length > 1 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">Other tags:</h2>
            <div className="flex flex-wrap gap-2">
              {allTags
                .filter((t) => t !== decodedTag)
                .map((t) => (
                  <Link key={t} href={`/tags/${encodeURIComponent(t)}`}>
                    <Tag variant="gray">{t}</Tag>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPost key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
