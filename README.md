# calenirwin.github.io

Personal blog built with Next.js 15, TypeScript, and Tailwind CSS. Deployed to GitHub Pages.

## Quick Start

```bash
npm install
npm run dev        # Starts on port 3000 (use PORT=4000 npm run dev for different port)
npm run build      # Production build
npm run lint       # ESLint
npm run type-check # TypeScript checking
```

## Tech Stack

- **Next.js 15** - App Router with static export
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Markdown** - Blog content (gray-matter + remark)

## Project Structure

```
app/              # Pages and routes
components/       # React components
content/          # Markdown blog posts and project data
lib/              # Utilities and markdown processing
public/           # Static assets
docs/             # Project documentation
```

## Content Management

### Blog Posts

Create `.md` files in `content/blog/`:

```yaml
---
title: "Post Title"
slug: "post-slug"
date: "2024-01-15"
tags: ["ai", "technology"]
excerpt: "Brief description"
featured: true
---

Your content here...
```

### Projects

Edit `content/projects/projects.json`:

```json
{
  "title": "Project Name",
  "description": "Description",
  "technologies": ["React", "TypeScript"],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": true,
  "tags": ["web", "ai"]
}
```

## Deployment

GitHub Actions automatically deploys to GitHub Pages on push to `main`.

Workflow: `.github/workflows/deploy.yml`

## Documentation

- [docs/CLAUDE.md](docs/CLAUDE.md) - Development guide
- [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) - Original implementation plan
- [docs/BUILD_NOTES.md](docs/BUILD_NOTES.md) - Build troubleshooting notes

## License

MIT
