# Project status — October 18, 2026

## Environment

The checkout is `/home/calen/Git/calenirwin.github.io`. Node 22.23.3 is pinned in `mise.toml`, matching the deployment workflow's major version. Run `mise install`, `npm ci`, then `npm run dev`. Without mise shell activation, prefix npm commands with `mise exec --`.

The local site is available at `http://127.0.0.1:4321/`. No credentials or environment variables are needed to develop it. GitHub CLI is not authenticated on this machine; the connected GitHub integration and signed-in Chrome session are available for repository work.

## Completed in this pass

- Installed the project and verified it on Node 22.
- Confirmed the custom domain in GitHub Pages. Certificate provisioning completed while setup was in progress, and HTTPS enforcement was enabled and verified in settings. `https://calenirwin.com/` now validates and returns HTTP 200; HTTP redirects to HTTPS. No DNS record change was needed.
- Aligned Astro's production URL, canonical links, social sharing URLs, feed, and sitemap with `https://calenirwin.com`.
- Added `/rss.xml`, a visible subscription link, feed auto-discovery, `/sitemap-index.xml`, and `/robots.txt`. Feed items use article summaries and link to the full posts.
- Added article sharing metadata, publication dates, and topic metadata.
- Added a check-only pull-request workflow. Deployment remains restricted to pushes to `main` or manual dispatch.
- Replaced the published Hnefatafl placeholder with a description based on its public repository. New work in the separate local game checkout is not presented as a publicly available release.
- Proofread the first article while retaining its voice.
- Expanded the CV page using text already present in the public PDF. No new employment dates, degrees, or achievements were invented. The PDF itself is unchanged; its older GitHub Pages footer URL still redirects to the site.
- Added **The work around the model** as an unpublished draft and a proposed two-week writing rhythm in [WRITING.md](WRITING.md).
- Updated setup and CMS documentation.

## Verification

`npm run type-check` reports zero errors, warnings, or hints. `npm test` passes and leaves a clean production build. `npm audit` reports zero known vulnerabilities as of this setup.

Publication tests exercise published and unpublished Markdown, default-to-draft behavior, MDX, sanitization, removal of previously published routes, internal links, RSS XML escaping and ordering, sitemap membership, custom-domain metadata, and draft exclusion from all exported text assets.

Browser checks covered all seven content routes at a 390 px viewport, the blog list/article and projects at 320 px, and Home/About at 740 and 1280 px. Images loaded, each page had one H1 and main landmark, and no persistent horizontal overflow was found. The homepage entrance animation briefly extends the decorative artwork beyond the viewport before settling; the body clips it. Keyboard testing confirmed that the skip link becomes visible with a focus outline. Reduced-motion rules were inspected in the existing stylesheet; OS preference emulation and a full screen-reader audit were not performed.

## Editorial next steps

The site has one published article, one published project, About, and CV. There are two unpublished blog drafts. The next useful step is to edit **The work around the model** in Pages CMS: add an example you want to share, adjust the voice, and publish when ready. Dates are descriptive, not a publication scheduler.

The two-week writing rhythm is a proposal, not an automation or a publishing commitment. See [WRITING.md](WRITING.md) for a small repeatable cycle and follow-up ideas.

Drafts remain excluded in both development and production, including RSS and sitemaps. No public draft-preview deployment was added. Review drafts in Pages CMS or Markdown; their source is readable in this public repository.

## Operations

- Live site: https://calenirwin.com/
- RSS: https://calenirwin.com/rss.xml
- Sitemap: https://calenirwin.com/sitemap-index.xml
- Actions: https://github.com/calenirwin/calenirwin.github.io/actions
- Pages settings: https://github.com/calenirwin/calenirwin.github.io/settings/pages

GitHub's certificate provisioning completed without removing and re-adding the domain. If HTTPS fails again, inspect the Pages certificate status and DNS before changing anything. Actions deployments do not use a CNAME file.

References: [GitHub custom-domain troubleshooting](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages), [HTTPS provisioning](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https), [Astro RSS](https://docs.astro.build/en/recipes/rss/), and [Astro sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/).
