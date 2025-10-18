# Personal Blog Implementation Plan

## Project Overview
A minimal, user-friendly personal blog built with Next.js and hosted on GitHub Pages. The site will showcase writing and projects with intuitive navigation, tag-based organization, and SEO optimization.

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Content**: Markdown files
- **Deployment**: GitHub Pages
- **Hosting**: GitHub Pages (calenirwin.github.io)

## Design System
- **Primary Colors**: Clean white background
- **Accent Colors**: Teal (#81D8D0) and Coral (#D99E82)
- **Typography**: System fonts (Inter/SF Pro/Helvetica)
- **Layout**: Minimal, clean, mobile-first responsive design

## Project Structure

```
calenirwin.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── [slug]/
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── projects/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Tag.tsx
│   ├── BlogPost.tsx
│   ├── Navigation.tsx
│   ├── ProjectCard.tsx
│   └── Footer.tsx
├── content/
│   ├── blog/
│   │   ├── ai-autonomy-future.md
│   │   └── design-thinking-process.md
│   └── projects/
│       └── projects.json
├── lib/
│   ├── markdown.ts
│   ├── utils.ts
│   └── constants.ts
├── public/
│   ├── images/
│   └── favicon.ico
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Implementation Phases

### Phase 1: Project Setup & Configuration
1. **Initialize Next.js Project**
   - Create Next.js 14 app with TypeScript
   - Configure for GitHub Pages deployment
   - Set up Tailwind CSS
   - Configure path aliases

2. **GitHub Pages Configuration**
   - Update next.config.js for static export
   - Configure basePath and assetPrefix
   - Set up GitHub Actions workflow

### Phase 2: Core Components & Layout
1. **Layout Components**
   - Root layout with navigation and footer
   - Responsive navigation with mobile menu
   - Footer with social links

2. **UI Components**
   - Button component with variants
   - Card component for content display
   - Tag component for categorization

### Phase 3: Content Management System
1. **Markdown Processing**
   - Set up markdown parser (gray-matter + remark)
   - Create blog post metadata schema
   - Implement content utilities

2. **Content Structure**
   - Blog post template with frontmatter
   - Project data structure
   - Tag and category system

### Phase 4: Page Implementation
1. **Homepage**
   - Hero section with introduction
   - Featured blog posts preview
   - Recent projects showcase

2. **Blog Pages**
   - Blog listing with filtering by tags/years
   - Individual blog post pages
   - Related posts suggestions

3. **Projects Page**
   - Project grid layout
   - Project details with links
   - Technology tags

4. **About Page**
   - Personal introduction
   - Skills and interests
   - Contact information

### Phase 5: Styling & Design
1. **Design System Implementation**
   - Color palette application
   - Typography scale
   - Spacing and layout system

2. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop breakpoints
   - Touch-friendly interactions

### Phase 6: SEO & Performance
1. **SEO Optimization**
   - Meta tags and Open Graph
   - Structured data (JSON-LD)
   - Sitemap generation

2. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Static generation

## Content Schema

### Blog Post Frontmatter
```yaml
---
title: "AI and the Future of Autonomy"
slug: "ai-autonomy-future"
date: "2024-01-15"
tags: ["ai", "autonomy", "technology"]
excerpt: "Exploring how artificial intelligence is reshaping autonomous systems..."
featured: true
---
```

### Project Data Structure
```json
{
  "title": "Project Name",
  "description": "Brief project description",
  "technologies": ["React", "TypeScript", "Node.js"],
  "githubUrl": "https://github.com/username/repo",
  "liveUrl": "https://project-demo.com",
  "image": "/images/project-screenshot.png",
  "featured": true,
  "tags": ["web", "ai", "design"]
}
```

## Key Features

### Navigation
- Clean, minimal navigation bar
- Mobile-responsive hamburger menu
- Active page highlighting
- Smooth scrolling

### Blog System
- Markdown-based content
- Tag-based filtering
- Year-based archives
- Search functionality (future enhancement)
- Reading time estimation

### Project Showcase
- Grid layout with project cards
- Technology tags
- Live demo and GitHub links
- Featured projects section

### SEO Features
- Dynamic meta tags
- Open Graph images
- Structured data markup
- XML sitemap
- RSS feed (optional)

## Development Workflow

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run export       # Export static files
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Deployment
- Automatic deployment via GitHub Actions
- Builds on push to main branch
- Deploys to GitHub Pages
- Custom domain support ready

## File Structure Details

### Core Configuration Files

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/calenirwin.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/calenirwin.github.io/' : '',
}

module.exports = nextConfig
```

**tailwind.config.js**
```javascript
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          teal: '#81D8D0',
          coral: '#D99E82',
        }
      }
    },
  },
  plugins: [],
}
```

### GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## Sample Content

### Initial Blog Posts
1. **"AI and the Future of Autonomy"** (tags: ai, autonomy, technology)
2. **"Design Thinking in Practice"** (tags: design, process, methodology)

### Sample Projects
1. **Personal Blog** - This very project
2. **AI Project** - Example AI/ML project
3. **Design System** - UI component library

## Performance Targets
- Lighthouse Score: 90+ across all metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

## Future Enhancements
- Dark mode toggle
- Search functionality
- Comments system (GitHub Discussions)
- Newsletter signup
- Analytics integration
- RSS feed
- Multi-language support

## Success Metrics
- Fast loading times
- Mobile-friendly design
- Accessible navigation
- Clean, readable typography
- Easy content management
- SEO optimized

---

This implementation plan provides a comprehensive roadmap for building a minimal, user-friendly personal blog that meets all your requirements while maintaining simplicity and performance.
