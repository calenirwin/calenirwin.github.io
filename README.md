# Calen Irwin's Personal Website

A personal website and blog built with Jekyll, featuring a clean design and easy content management.

## Features

- **Responsive Design** - Works great on desktop, tablet, and mobile
- **Blog Functionality** - Easy-to-write blog posts in Markdown
- **Fast Loading** - Static site generation for optimal performance
- **SEO Optimized** - Built-in meta tags and structured data
- **RSS Feed** - Automatic feed generation for blog subscribers
- **GitHub Pages Ready** - Easy deployment to GitHub Pages

## Local Development

### Prerequisites

- Ruby 3.0 or higher
- Bundler gem

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/calenirwin/calenirwin.github.io.git
   cd calenirwin.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Start the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**
   Open your browser and navigate to `http://localhost:4000`

### Development Commands

- `bundle exec jekyll serve` - Start development server
- `bundle exec jekyll build` - Build the site for production
- `bundle exec jekyll clean` - Clean the build directory

## Site Structure

```
calenirwin.github.io/
├── _config.yml          # Site configuration
├── _posts/              # Blog posts
├── _layouts/            # HTML layouts
├── _includes/           # Reusable HTML components
├── _sass/               # SCSS stylesheets
├── assets/              # Static assets (CSS, JS, images)
├── index.md             # Homepage
├── about.md             # About page
├── blog.md              # Blog listing page
├── contact.md           # Contact page
└── Gemfile              # Ruby dependencies
```

## Adding Content

### Creating a New Blog Post

1. Create a new file in the `_posts/` directory
2. Use the filename format: `YYYY-MM-DD-title.md`
3. Add front matter at the top:

```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-15
categories: [category]
tags: [tag1, tag2]
---
```

4. Write your content in Markdown below the front matter

### Creating a New Page

1. Create a new `.md` file in the root directory
2. Add front matter:

```yaml
---
layout: page
title: Page Title
permalink: /page-url/
---
```

## Customization

### Site Configuration

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- Build settings

### Styling

- Main styles are in `_sass/` directory
- Custom CSS can be added to `assets/css/`
- The site uses the Minima theme as a base

### Layouts

- Custom layouts can be created in `_layouts/`
- Reusable components go in `_includes/`

## Deployment

### GitHub Pages

1. Push your changes to the `main` branch
2. GitHub Pages will automatically build and deploy your site
3. Your site will be available at `https://calenirwin.github.io`

### Manual Deployment

1. Build the site: `bundle exec jekyll build`
2. Upload the contents of `_site/` to your web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have questions or need help:
- Open an issue on GitHub
- Email: your-email@domain.com
- Check the [Jekyll documentation](https://jekyllrb.com/docs/)

---

*Built with ❤️ using Jekyll*

