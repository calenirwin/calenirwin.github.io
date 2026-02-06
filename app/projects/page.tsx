import Link from 'next/link'
import { Project } from '@/components/ProjectCard'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Projects - Calen Irwin',
  description: 'Things I\'ve built.',
}

async function getProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'content/projects/projects.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    if (!data || typeof data !== 'object') return []
    if (!Array.isArray(data.projects)) return []

    return data.projects.filter((project: any) => {
      return project &&
        typeof project === 'object' &&
        typeof project.title === 'string' &&
        typeof project.description === 'string'
    })
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Invalid JSON syntax in projects.json:', error.message)
    } else {
      console.error('Error reading projects:', error)
    }
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
        Projects
      </h1>

      {projects.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {projects.map((project, index) => (
            <div key={index} className="py-6 first:pt-0">
              <h2 className="text-lg font-medium mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-3">{project.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">
                  {project.technologies.join(' \u00B7 ')}
                </span>
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    GitHub &rarr;
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black transition-colors"
                  >
                    Live &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Nothing here yet.</p>
      )}
    </div>
  )
}
