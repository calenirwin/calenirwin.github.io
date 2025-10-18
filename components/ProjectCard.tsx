import Link from 'next/link'
import Card from './ui/Card'
import Tag from './ui/Tag'

export interface Project {
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  featured: boolean
  tags: string[]
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hover>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>

        <p className="text-gray-700 mb-4">{project.description}</p>

        {/* Category Tags - Clickable links to blog posts with same tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <Tag key={tag} variant="teal" clickable>
                {tag}
              </Tag>
            ))}
          </div>
        )}

        {/* Technology Stack - Non-clickable, just for display */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Tag key={tech} variant="coral">
              {tech}
            </Tag>
          ))}
        </div>

        <div className="flex gap-4">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-teal hover:text-primary-teal/80 font-medium text-sm"
            >
              GitHub →
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-coral hover:text-primary-coral/80 font-medium text-sm"
            >
              Live Demo →
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
