# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal website and blog for Calen Irwin (calenirwin.github.io). The site features a **Hyde-inspired minimalist design** with a fixed sidebar and follows PRD specifications for Bauhaus-inspired minimalism. Built using Jekyll 4.4.1 and designed for deployment to GitHub Pages.

## Development Commands

### Local Development
- `./dev.sh` - Start Jekyll development server with live reload at http://localhost:4000
- `bundle exec jekyll serve` - Alternative way to start development server
- `bundle exec jekyll serve --host 0.0.0.0 --port 4000` - Full development command

### Building and Deployment
- `./deploy.sh` - Clean, build, and prepare site for deployment
- `bundle exec jekyll build` - Build the site for production (output in `_site/`)
- `bundle exec jekyll clean` - Clean the build directory

### Dependencies
- `bundle install` - Install Ruby dependencies

## Site Architecture

### Design System
- **Layout**: Hyde-inspired with fixed sidebar on desktop, responsive mobile design with proper breakpoints
- **Color Palette** (Warm Earth Tones):
  - Primary Background: `#FBF9F7` (warm off-white)
  - Secondary Background: `#F7F4F1` (soft cream)
  - Text Primary: `#2A261F` (rich charcoal)
  - Text Secondary: `#6B6556` (warm grey)
  - Accent Primary: `#C87B5B` (terracotta)
  - Supporting Accent: `#8B9A7A` (sage green)
  - Earth Warm: `#D4A584` (dusty rose)
  - Sidebar: Rich charcoal background with warm off-white text
- **Typography**:
  - Headers: Georgia serif - elegant and readable with classical proportions
  - Body: Source Sans Pro - clean, modern, and highly readable
  - Code: JetBrains Mono - distinctive and readable for technical content

### Content Structure
- **Homepage**: `index.md` - Shows recent blog posts (limit 5) with minimalist presentation
- **About Page**: `about.md` - Concise, personality-driven content showing rather than telling
- **Blog Posts**: `_posts/` directory with format `YYYY-MM-DD-title.md`
- **Layouts**: Custom Hyde-inspired layouts in `_layouts/`
  - `default.html` - Main layout with sidebar
  - `page.html`, `post.html` - Content layouts
- **Assets**: `assets/` contains CSS and images
  - `calen-headshot-2022-grey-shirt.png` - Professional headshot photo

### Key Configuration Features
- **Sidebar Elements**:
  - Professional headshot photo
  - Name (no link) and tagline
  - Navigation links (About, Blog)
  - Social media icons (GitHub, LinkedIn, Email)
- **Blog Features**:
  - Advanced tag filtering with organized sidebar
  - Year-based filtering (e.g., "2024", "2025")
  - Topic-based filtering (e.g., "data-science", "jekyll")
  - Real-time tag counts for each category
  - Client-side filtering (no 404 pages or page reloads)
  - Clean layout without title
- **Post Features**:
  - Sticky back arrow navigation (always visible)
  - Interactive post tags with selection states
  - Tag toggle functionality (click to filter, click again to clear)
  - Clean header with metadata
- **Design Features**:
  - Warm earth tone color palette
  - Elegant serif headers with clean sans-serif body text
  - Centered sidebar content with proper responsive behavior
  - Clean minimalist design without decorative elements

### Plugins and Features
- jekyll-feed (RSS)
- jekyll-seo-tag (SEO optimization)
- jekyll-sitemap (sitemap generation)
- jekyll-paginate (pagination support)
- MathJax 3 (LaTeX mathematical expressions)
- Interactive code blocks with copy buttons

### Content Creation Patterns

#### Blog Posts
- Create in `_posts/` with filename `YYYY-MM-DD-title.md`
- Required front matter: layout (post), title, date
- Supports excerpts for homepage display
- **Mathematical expressions**: Use `$$` for display math, `$` for inline math
- **Code blocks**: Enhanced with copy buttons and improved styling

#### New Pages
- Create `.md` files in root directory
- Required front matter: layout (page), title, permalink

#### Technical Writing Features
- **LaTeX Math**: `$$P(x) = \frac{1}{1 + e^{-x}}$$` renders as formatted equations
- **Code Highlighting**: Syntax highlighting with interactive copy buttons
- **Responsive Code**: Code blocks adapt to screen size with horizontal scroll

### Styling Notes
- **CSS Architecture**: Single `main.scss` file with complete Hyde-inspired styling
- **Typography**: Georgia serif headings, Source Sans Pro body text, JetBrains Mono code
- **Responsive**: Mobile-first design with proper breakpoints (768px, 1024px)
- **Colors**: Warm earth tone palette with terracotta, sage, and dusty rose accents
- **Layout**: Centered sidebar content that stacks properly on mobile devices

### PRD Compliance
- **Minimalist Design**: Clean, Bauhaus-inspired layout
- **Show Rather Than Tell**: About page demonstrates personality through concise, engaging copy
- **Professional Brand**: Balances technical expertise with approachable personality
- **Fast Loading**: Static site with optimized assets

## GitHub Pages Deployment
- Automatic deployment on push to `main` branch
- Site available at https://calenirwin.github.io
- Build occurs automatically via GitHub Actions

## Author Information
- Site owner: Calen Irwin (calen.irwin@gmail.com)
- Tagline: "Building the future of rail transportation, one algorithm at a time"
- Role: Data Scientist - Rail Autonomy at Hitachi Rail
- Location: Toronto, Ontario
- Social: @calenirwin (GitHub/Twitter), calen-irwin (LinkedIn)