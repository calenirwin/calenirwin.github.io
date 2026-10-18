# Calen Irwin

A personal portfolio and blog using the Albion design system. Astro static site, Markdown/MDX content, Pages CMS editing, and GitHub Pages hosting.

## Develop

Use Node 22.12 or newer.

With [mise](https://mise.jdx.dev/), run `mise install` to use the pinned Node 22
version in `mise.toml`, matching the major version used by GitHub Actions.

```sh
npm ci
npm run dev
npm run type-check
npm test
npm run build
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

See [Project status](docs/STATUS.md) for the environment assessment and prioritized next steps.
The [writing plan](docs/WRITING.md) describes a two-week rhythm and the next unpublished draft.

## Subscribe and discover

The blog has an RSS feed at `/rss.xml`, linked in the footer and advertised to feed readers.
`/sitemap-index.xml` and `/robots.txt` help crawlers find the published pages. Drafts
are excluded from article URLs, RSS, and the sitemap.

## Deploy

Pull requests to `main` run type checking and publication tests without deploying.
Pushes to `main` run the same checks and deploy `dist/` to https://calenirwin.com/.
GitHub Pages uses GitHub Actions, the custom domain `calenirwin.com`, and HTTPS enforcement.
The CMS needs the configuration on GitHub and owner authorization before it can edit the repository.
