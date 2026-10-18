# Editing with Pages CMS

## Activate once

1. Push this rebuild, including `.pages.yml`, to `calenirwin/calenirwin.github.io` on `main`.
2. In GitHub repository Settings → Pages, select **GitHub Actions** as the build source.
3. Visit https://app.pagescms.org and sign in with GitHub. Install/authorize the Pages CMS GitHub App for **only this repository**.
4. Select `calenirwin.github.io` and the `main` branch. You should see Blog, Projects, Home, About, CV, and Site settings.

Pages CMS reads `.pages.yml` from GitHub. Uploaded images go to `public/uploads`, uploaded CV files go to `public/files`, and every save creates a Git commit attributed to the signed-in user.

## Write on your phone

Open **Blog → New**, enter a title, date, summary, and article. Add images using the editor. Save with **Published off** to keep it off the website. Turn Published on and save when ready. The commit triggers GitHub Actions; the site changes once deployment succeeds. If a build fails, the previous site remains live: check the Actions tab.

Drafts are excluded from the home page, writing list, individual URLs, RSS, and the sitemap. Their source files remain readable in this public repository. A date is descriptive, not a publication scheduler.

The initial `Lorem ipsum` article is a draft. `The work around the model` is another unpublished draft for the author to edit. `Building this site` is published. About and CV use the background supplied by the owner, and Hnefatafl describes the original project with a link to its repository. See [the writing plan](WRITING.md).

## Edit your pages and projects

- **Home**, **About**, **CV**: headings and rich-text content.
- **Projects**: create/edit a project page; control order, status, description, repository and demo links, cover image, and publication.
- **Site settings**: name, default description, social links.
- Empty cover image descriptions mean decorative images; add descriptions for meaningful images.

Filenames determine URLs. Choose them when creating content; changing a published filename changes the link. Page layout, navigation labels, and visual design are edited in code.

## Markdown and MDX

The CMS visual editor handles `.md` files. Advanced `.mdx` posts are supported by Astro but intentionally excluded from this editor to avoid damaging JSX. Edit MDX in source control, using the same frontmatter and `published` switch. MDX is trusted executable source and should be reviewed like code.

## Preview and checks

```sh
npm ci
npm run dev
npm run type-check
npm test
npm run preview
```

`npm test` builds with temporary content fixtures, checks publication and draft exclusion, removes the fixtures, and produces a clean final build in `dist/`. Run it with no other build/dev process writing to the same output directory.

References: https://pagescms.org/docs/quick-start/ and https://pagescms.org/docs/configuration/.

## Profile and CV

Edit the current title in Site settings. Add or replace the headshot in About. CV supports editable rich text plus an optional uploaded PDF; the download link appears only after a file is chosen. Its profile and experience copy match the existing PDF, without invented dates or achievements. Edit the page and replace the PDF separately when your experience changes.
