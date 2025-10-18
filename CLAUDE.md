# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A minimal personal blog built with Next.js 15 (App Router) and Tailwind CSS, designed for static export to GitHub Pages. The site features markdown-based blog posts, project showcases, and tag-based content organization.

**Repository**: calenirwin.github.io (GitHub Pages site)
**Status**: Active - Next.js 15 implementation complete and functional

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

**Note**: The project uses `output: 'export'` in next.config.js for static site generation compatible with GitHub Pages.

## Architecture

### GitHub Pages Configuration

The Next.js app is configured for GitHub Pages deployment with:
- Static export (`output: 'export'`)
- `basePath` and `assetPrefix` set to `/calenirwin.github.io` in production
- Unoptimized images (required for static export)
- Trailing slashes enabled

### Project Structure

```
app/                    # Next.js 15 App Router pages
├── about/             # About page
├── blog/              # Blog listing and [slug] dynamic routes
├── projects/          # Projects showcase
├── layout.tsx         # Root layout with navigation/footer
└── page.tsx           # Homepage

components/            # React components
├── ui/               # Reusable UI primitives (Button, Card, Tag)
├── Navigation.tsx    # Main nav with mobile menu
├── BlogPost.tsx      # Blog post display
├── ProjectCard.tsx   # Project display cards
└── Footer.tsx        # Site footer

content/              # Markdown content and data
├── blog/            # Blog posts as .md files with frontmatter
└── projects/        # projects.json with project data

lib/                  # Utility functions
├── markdown.ts      # Markdown parsing (gray-matter + remark)
├── utils.ts         # General utilities
└── constants.ts     # Site constants

public/              # Static assets
└── images/          # Image files
```

### Content System

**Blog Posts** are markdown files with frontmatter:
```yaml
---
title: "Post Title"
slug: "post-slug"
date: "2024-01-15"
tags: ["ai", "technology"]
excerpt: "Brief description..."
featured: true
---
```

**Projects** are stored in `content/projects/projects.json`:
```json
{
  "title": "Project Name",
  "description": "Brief description",
  "technologies": ["React", "TypeScript"],
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "image": "/images/project.png",
  "featured": true,
  "tags": ["web", "ai"]
}
```

### Design System

- **Colors**: Teal (#81D8D0) and Coral (#D99E82) as accent colors
- **Typography**: System fonts (Inter/SF Pro/Helvetica)
- **Layout**: Mobile-first, minimal design
- **Styling**: Tailwind CSS with custom color extensions

### Deployment

Deployment is handled via GitHub Actions (to be set up):
- Triggers on push to `main` branch
- Runs `npm ci && npm run build`
- Deploys `./out` directory to gh-pages branch
- Uses `peaceiris/actions-gh-pages@v3`

The workflow file should be created at `.github/workflows/deploy.yml`.

## Key Implementation Details

### Static Export Requirements

When working with Next.js features, remember:
- No server-side runtime (API routes, server actions, ISR)
- Images must use `unoptimized: true`
- All routes must be statically generated
- Use `generateStaticParams()` for dynamic routes

### Path Configuration

The basePath and assetPrefix are currently set to empty strings in next.config.js for standard GitHub Pages deployment. Adjust these if deploying to a subdirectory.

### Content Management

The markdown processing system uses:
- `gray-matter` for frontmatter parsing
- `remark` for markdown-to-HTML conversion
- Content is read from the filesystem at build time

When adding new blog posts or projects, ensure the schema matches the expected frontmatter/JSON structure.

## Development Notes

- Upgraded to Next.js 15 to resolve SIGBUS build errors in Next.js 14
- Next.js 15 requires async params in dynamic routes (see app/blog/[slug]/page.tsx)
- All linting and type checking passes cleanly
- Dev server runs on port 4000 (to avoid conflicts with other projects)
- Focus: Direct, specific copy without generic blog phrases
- Design: Minimal, mobile-first, clean typography

## Security Best Practices

This project implements security best practices for a static Next.js site. When working on this codebase, always maintain these security measures:

### 1. Security Headers (next.config.js)

The project includes comprehensive security headers configured in `next.config.js`:

- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME-sniffing attacks
- **Strict-Transport-Security**: Enforces HTTPS connections
- **Content-Security-Policy**: Restricts resource loading to prevent XSS
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

**Important**: For static exports, these headers should also be configured in your hosting platform (GitHub Pages, Vercel, Netlify, etc.) as the Next.js configuration may not apply.

### 2. XSS Prevention

**HTML Sanitization**: All HTML content from markdown files is sanitized using `isomorphic-dompurify` before rendering.

**Implementation in lib/markdown.ts**:
```typescript
import DOMPurify from 'isomorphic-dompurify'

// Sanitize HTML before returning
const contentHtml = DOMPurify.sanitize(processedContent.toString())
```

**Why**: Even though we control the markdown content, sanitization provides defense-in-depth protection against accidental or malicious HTML injection.

**When to use**:
- Always sanitize HTML from markdown processing
- Sanitize any user-generated content (if added in future)
- Use before `dangerouslySetInnerHTML` in React components

### 3. Path Traversal Prevention

**Slug Validation**: All slugs are validated to prevent path traversal attacks.

**Implementation in lib/markdown.ts**:
```typescript
// Validate slug format - only alphanumeric and hyphens
if (!/^[a-z0-9-]+$/i.test(slug)) {
  console.error(`Invalid slug format: ${slug}`)
  return null
}
```

**Why**: Without validation, an attacker could potentially use `../` in slugs to access files outside the intended directory.

**When to use**:
- Any function that accepts file paths or identifiers from parameters
- Before using `path.join()` with user-provided input
- For any dynamic route parameters

### 4. JSON Validation

**Data Validation**: All JSON data is validated after parsing to ensure structure integrity.

**Implementation in app/projects/page.tsx**:
```typescript
const data = JSON.parse(fileContents)

// Validate structure
if (!data || typeof data !== 'object') {
  return []
}

if (!Array.isArray(data.projects)) {
  return []
}

// Validate each item
const validProjects = data.projects.filter((project: any) => {
  return project &&
    typeof project === 'object' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string'
})
```

**Why**: Malformed JSON or unexpected structures can crash the application or cause unexpected behavior.

**When to use**:
- After any `JSON.parse()` operation
- When reading configuration files
- Before using data from external sources

### 5. Environment Variable Protection

**Gitignore Configuration**: All environment files are excluded from version control.

**Protected files (.gitignore)**:
```
.env
.env.local
.env.development
.env.production
.env.test
.env*.local
```

**Why**: Prevents accidental commit of sensitive credentials, API keys, or secrets.

**Best practices**:
- Never commit `.env` files to the repository
- Use `.env.example` with dummy values for documentation
- Document required environment variables in README
- Rotate any secrets that are accidentally committed

### 6. Dependency Security

**Regular Audits**: Run `npm audit` regularly to check for known vulnerabilities.

**Best practices**:
```bash
npm audit                    # Check for vulnerabilities
npm audit fix                # Auto-fix vulnerabilities
npm audit fix --force        # Fix breaking changes (use cautiously)
npm outdated                 # Check for outdated packages
```

**When to update**:
- Before each deployment
- Monthly security review
- Immediately when a critical vulnerability is announced

### Security Checklist for New Features

When adding new features, verify:

- [ ] No `dangerouslySetInnerHTML` without sanitization
- [ ] No `eval()` or `new Function()` with user input
- [ ] All user inputs are validated and sanitized
- [ ] No sensitive data in client-side code
- [ ] Environment variables are properly gitignored
- [ ] Path parameters are validated before file operations
- [ ] JSON data is validated after parsing
- [ ] Dependencies are up-to-date and audited
- [ ] Error messages don't leak sensitive information
- [ ] No hardcoded credentials or API keys

### Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [npm audit Documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
