import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import sanitizeHtml from 'sanitize-html'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  featured: boolean
  content?: string
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          title: data.title,
          date: data.date,
          tags: data.tags || [],
          excerpt: data.excerpt,
          featured: data.featured || false,
        }
      })

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Validate slug to prevent path traversal attacks
    if (!/^[a-z0-9-]+$/i.test(slug)) {
      console.error(`Invalid slug format: ${slug}`)
      return null
    }

    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const processedContent = await remark().use(html).process(content)
    // Strip the leading H1 since the page renders the title separately
    const strippedContent = processedContent.toString().replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/, '')
    // Sanitize HTML to prevent XSS attacks
    const contentHtml = sanitizeHtml(strippedContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'title'],
        a: ['href', 'title', 'target', 'rel'],
      },
    })

    return {
      slug,
      title: data.title,
      date: data.date,
      tags: data.tags || [],
      excerpt: data.excerpt,
      featured: data.featured || false,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}
