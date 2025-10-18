import BlogPost from '@/components/BlogPost'
import Tag from '@/components/ui/Tag'
import { getAllPosts, getAllTags } from '@/lib/markdown'

export const metadata = {
  title: 'Blog - Calen Irwin',
  description: 'Thoughts on technology, AI, design, and more',
}

export default async function BlogPage() {
  const allPosts = await getAllPosts()
  const tags = getAllTags(allPosts)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Filter by tag:</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag} variant="teal" clickable>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {allPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post) => (
              <BlogPost key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">No blog posts yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
