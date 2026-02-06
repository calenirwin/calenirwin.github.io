import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'
import { formatDate, calculateReadingTime } from '@/lib/utils'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} - Calen Irwin`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post || !post.content) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.content)

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-gray-500 hover:text-black transition-colors"
      >
        &larr; Writing
      </Link>

      <header className="mt-8 mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-black tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>&middot;</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div
        className="prose prose-lg max-w-none prose-dropcap
          prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-black prose-headings:font-black
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-black prose-a:underline prose-a:underline-offset-2 prose-a:decoration-gray-300 hover:prose-a:decoration-black
          prose-strong:text-black prose-strong:font-semibold
          prose-em:text-gray-600
          prose-code:text-gray-700 prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
          prose-blockquote:border-gray-300 prose-blockquote:text-gray-500 prose-blockquote:font-normal
          prose-li:text-gray-700
          prose-hr:border-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-3 mb-8 text-sm">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="text-gray-500 hover:text-black transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          &larr; All writing
        </Link>
      </footer>
    </article>
  )
}
