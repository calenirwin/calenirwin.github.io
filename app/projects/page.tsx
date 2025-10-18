import ProjectCard, { Project } from '@/components/ProjectCard'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Projects - Calen Irwin',
  description: 'A showcase of my projects and work',
}

async function getProjects(): Promise<Project[]> {
  try {
    const filePath = path.join(process.cwd(), 'content/projects/projects.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    // Validate the parsed data structure
    if (!data || typeof data !== 'object') {
      console.error('Invalid JSON structure: data is not an object')
      return []
    }

    if (!Array.isArray(data.projects)) {
      console.error('Invalid JSON structure: projects is not an array')
      return []
    }

    // Validate each project has required fields
    const validProjects = data.projects.filter((project: any) => {
      const isValid =
        project &&
        typeof project === 'object' &&
        typeof project.title === 'string' &&
        typeof project.description === 'string'

      if (!isValid) {
        console.warn('Skipping invalid project:', project)
      }

      return isValid
    })

    return validProjects
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
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-xl text-gray-600">No projects yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
