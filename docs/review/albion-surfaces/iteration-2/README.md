# Iteration 2: editorial composition

Draft PR #6, still stacked on open PR #5. No merge or deployment.

The first review had a large white field, a forced two-line title and a detached
introduction. This iteration uses an ink-blue frame, keeps the title and introduction
on the same axis, and gives the article list a distinct sand surface. Masthead,
title, introduction, article text and footer share their left alignment. The desktop
title is one line; mobile wraps naturally. The footer follows the content rather
than being pushed to a distant viewport edge. Shared frame/material tokens match Hnef;
long-form pages retain a bounded paper reading area. Original art and content remain.

Project records, native dialogs, verified destinations and no-JavaScript direct
routes are preserved. No new marketing copy, dependencies or publication changes.

## Visual comparison

| Width | Previous | Current |
| --- | --- | --- |
| 1440 | [Previous blog](../after/blog-1440.png) | [Current blog](blog-1440.png) |
| 390 | [Previous blog](../after/blog-390.png) | [Current blog](blog-390.png) |
| 768 | [Previous blog](../after/blog-768.png) | [Current blog](blog-768.png) |
| 320 | [Previous blog](../after/blog-320.png) | [Current blog](blog-320.png) |

[Projects](projects-1440.png), [project dialog](project-dialog-390.png),
[article](blog-building-this-portfolio-with-codex-390.png), [home](home-1440.png).
Other page and dialog captures at all four widths are in this directory.
The previous `before` and `after` folders are unchanged.

## Validation

- Type check: zero errors, warnings or hints. Both publication/sanitization tests pass;
  production build passes.
- [Browser report](portfolio-qa.json): Chromium at 320/390/768/1440; no overflow or
  page errors; project dialog initial focus, Tab boundaries, Escape, Close, backdrop,
  repeated opening and focus restoration; skip link, reduced motion and no-JS fallback.
- [Contrast](contrast.json): sand text on the lightest blue frame 7.30:1; mist 7.52:1;
  primary and secondary text on the article surface 10.54:1 and 5.41:1.
- Repository and live Hnef destination both returned HTTP 200 on 22 October 2026.
- Original public artwork unchanged; no runtime dependency or lockfile changes.
- `git diff --check` passes.

Rendered desktop and mobile captures were inspected, then the desktop title wrap and
article inset were revised to strengthen alignment. Physical-device, Safari/Firefox
and full screen-reader testing remain outstanding. Contrast values cover token pairs,
not every possible state or image pixel. No claim of W2 approval.
