import Link from 'next/link'
import BlogPost from '@/components/BlogPost'
import Button from '@/components/ui/Button'
import { getAllPosts } from '@/lib/markdown'

export default async function Home() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.filter((post) => post.featured).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-teal/10 via-white to-primary-coral/10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Cale is...
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            building with AI and writing about it
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button size="lg">Blog</Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg">
                Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent</h2>
            <Link href="/blog" className="text-primary-teal hover:underline font-medium">
              View all →
            </Link>
          </div>

          {featuredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogPost key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No recent posts</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
