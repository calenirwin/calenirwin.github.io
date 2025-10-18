import Link from 'next/link'
import Card from './ui/Card'
import Tag from './ui/Tag'
import { formatDate } from '@/lib/utils'
import { BlogPost as BlogPostType } from '@/lib/markdown'

interface BlogPostProps {
  post: BlogPostType
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Card hover>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Tag key={tag} variant="teal" clickable>
              {tag}
            </Tag>
          ))}
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-primary-teal transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm mb-3">{formatDate(post.date)}</p>

        <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>

        <div className="mt-4">
          <Link href={`/blog/${post.slug}`} className="text-primary-teal font-medium hover:underline">
            Read more →
          </Link>
        </div>
      </div>
    </Card>
  )
}
