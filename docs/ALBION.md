# Albion

Design reference: the Albion project conversation “Update Albion design system”. Albion is an evolving design reference, not a settled brand. The site name remains Calen Irwin.

- Sand #D8CDAA: canvas.
- Deep blue #052D46: text, wordmark, illustration ground.
- Mist blue #A4D9E5: illustration accents and lettering on deep blue; never small body text on sand.
- Tall serif capitals: Cormorant Garamond, self-hosted through Fontsource.
- Simple supporting text and navigation: Inter, self-hosted.
- Space and typography carry hierarchy. No hard divider lines or bordered article cards.
- Sparse original landscape SVG; decorative and omitted from the accessibility tree.
- The Hnefatafl description uses verified repository details; Home, About, and CV contain owner-supplied background. Blog drafts stay unpublished until reviewed. All are editable in Pages CMS.

## Shared foundation

[`src/styles/tokens.css`](../src/styles/tokens.css) is the lightweight source for the
existing palette, font stacks, page and reading widths, gutters, touch targets,
and focus treatment. `global.css` imports it once for every portfolio and blog
route through `Base.astro`. The mobile layout overrides only `--gutter-page`.

Keep these values ordinary CSS custom properties. A related app can copy the
small token file, retain the color roles, and use its own layout and components.
No shared package, framework migration, or repository restructuring is required.
Fonts are supplied by this site's existing Fontsource imports; consumers can use
the fallback stacks without loading additional fonts.

## Navigation checks

Header and footer links have a minimum 44px target. Focus remains visible; the
skip link moves keyboard focus to the main landmark. Index pages use
`aria-current="page"`; a post or project marks its parent section with
`aria-current="location"`.

Run `npm run type-check` and `npm test` (which leaves a clean production build).
For visual checks, run `npm run preview`, inspect home, blog, and a project at
320px and desktop widths, and tab through the shared header and footer. Confirm
that Skip to content focuses main, links do not overlap, the active section is
underlined, and reduced-motion preferences suppress decorative transitions.
