# Calen Irwin

A personal portfolio and blog using the Albion design system. Astro static site, Markdown/MDX content, Pages CMS editing, and GitHub Pages hosting.

## Develop

Use Node 22.12 or newer.

```sh
npm ci
npm run dev
npm run type-check
npm test
npm run preview
```

## Content

- `content/pages/`: Home, About, CV.
- `content/blog/`: Markdown or MDX articles. Only `published: true` is exported.
- `content/projects/`: project pages with the same publication switch.
- `content/settings.json`: site identity and social links.
- `.pages.yml`: Pages CMS editors and image uploads.

The portfolio describes and links to projects; implementation remains in its own repository, such as `gym-hnef`.

See [Editing with Pages CMS](docs/EDITING.md) for activation and mobile writing, and [Albion](docs/ALBION.md) for design tokens. The existing article and previous copy are saved locally outside this site as a migration backup.

## Deploy

Pushes to `main` run checks and deploy `dist/` to https://calenirwin.github.io/. Set the GitHub Pages source to GitHub Actions. The CMS needs the configuration on GitHub and owner authorization before it can edit the repository.
