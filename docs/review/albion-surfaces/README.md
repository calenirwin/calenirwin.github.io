**Latest review:** [Iteration 2 — Editorial composition](iteration-2/README.md). The first iteration below is preserved for comparison.

# Albion surface review — first iteration

Draft implementation; do not merge or deploy until visual review. This branch is
stacked on navigation/token PR #5 (`2b7d65e`); review this diff against that branch.

Paper #F7F6F2 gives the writing a flat, high-contrast ground. The original sand,
deep blue and mist remain concentrated in the original illustrations. Project
previews have a bounded gradient. Original artwork, fonts and content are retained.
The mobile landscape now occupies its own space instead of overlapping text/footer.

Projects open native dialogs with a concise description and verified destinations.
The existing content record supplies both the modal and direct-route fallback;
project implementation documentation is no longer repeated on the portfolio.
The Hnef site returned HTTP 200 with title Hnef on 21 October 2026 and is now linked
from its existing `demo` field. No biography, progress or metrics were invented.

## Compare

Screenshots use local production builds, Chromium and emulated viewports. `before`
is PR #5; `after` is this implementation. Every listed surface also has 320, 768
and 1440px captures in these folders. Article captures use the already-published
“Building this site” post; no draft was published for these images.

| Surface | Before | After |
| --- | --- | --- |
| Home, 390px | [Before](before/home-390.png) | [After](after/home-390.png) |
| Projects, desktop | [Before](before/projects-1440.png) | [After](after/projects-1440.png) |
| Blog, desktop | [Before](before/blog-1440.png) | [After](after/blog-1440.png) |
| Article, 390px | [Before](before/article-390.png) | [After](after/article-390.png) |
| Project dialog | — | [390px](after/project-dialog-390.png), [1440px](after/project-dialog-1440.png) |

## Validation

- `npm run type-check`: zero errors/warnings/hints.
- `npm test`: both integration tests pass; draft exclusion, sanitization and clean exports preserved.
- Production build succeeds. No dependency or lockfile changes.
- `CHROMIUM=/usr/bin/chromium python tests/browser_visual.py`: all four widths;
  project dialog initial focus, both Tab boundaries, Escape, Close, backdrop,
  repeated opening and focus restoration; skip link; no-JavaScript direct route;
  reduced motion; no horizontal overflow or page errors. [Report](browser-checks.json).
- [Token contrast](contrast.json): primary 13.21:1, secondary 6.78:1 on paper;
  both exceed WCAG AA normal-text requirements. This is a token-pair calculation,
  not a full automated accessibility audit.
- Original landscape, portrait frame, favicon, Landscape and Board sources unchanged.

Install Playwright for Python and its Chromium browser to run the optional browser
check after `npm test`; set `CHROMIUM` only for a system browser. CI runs the same
check for stacked PRs and uploads `portfolio-visual-evidence` plus the production
`portfolio-static-preview` build. Artifacts expire after 14 days; images here persist.

Physical devices, Safari/Firefox and a full screen-reader audit remain untested.
