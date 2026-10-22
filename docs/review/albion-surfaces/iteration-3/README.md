# Iteration 3: ink linen and warm paper

Same draft PR; no merge or deployment. Earlier galleries remain untouched.

The material is now a visible foundation: fine ink-blue weave, warm grained paper
for content and controls, and a slightly deeper paper board. All use the same
256px scale and upper-left lighting. The board frame and primary controls repeat
the same materials. This retains iteration 2's hierarchy and grouping. Hnef's
scenery and ornamental corners no longer compete with the board and pieces.
No marketing copy was added.

Both repositories carry byte-identical material CSS and tiles. These are original,
deterministic procedural assets, generated offline with [this source](generate-materials.py)
(Python + Pillow), not images generated at runtime. No runtime dependency added.

## Inspect at ordinary size

| View | Iteration 2 | Iteration 3 |
| --- | --- | --- |
| Desktop | [1440](../iteration-2/blog-1440.png) | [1440](blog-1440.png) |
| Mobile | [390](../iteration-2/blog-390.png) | [390](blog-390.png) |
| Narrow | [320](../iteration-2/blog-320.png) | [320](blog-320.png) |
| Tablet | [768](../iteration-2/blog-768.png) | [768](blog-768.png) |

[Material detail at 100%](material-detail-100-percent.png) is a DPR-1 browser crop,
not an enlarged image. Desktop, mobile and detail captures were visually inspected.
The first portfolio render exposed a cascade conflict that hid the material; this
was corrected and the captures repeated. Worst-pixel contrast testing also prompted
a darker secondary text token, #394E5B.

## Evidence

Portfolio type check has zero diagnostics; both publication/sanitization tests and production build pass. The browser suite passes at 320/390/768/1440: no overflow or page errors, dialog focus/trapping/Escape/close/backdrop/reopening/restoration, skip link, reduced motion and no-JavaScript project routes. See [browser report](portfolio-qa.json), [type check](type-check.txt) and [tests](publication-tests.txt). Project records, links, content and dialogs are unchanged.

[Contrast](contrast.json) uses every pixel in each tile plus the worst lighting
endpoint: sand on blue 6.88:1, mist on blue 7.09:1, primary on paper 8.41:1,
secondary on paper 5.12:1, button text on blue 10.10:1. This is a conservative
text-surface check, not a complete accessibility audit.

[Performance](performance.json): texture payload including CSS is 65,117 bytes for
the blog and 100,635 for Hnef. Static lossless WebP tiles; no new JS, animation,
SVG turbulence, blend filters or backdrop filters. Observed initial-load CLS in one
local Chromium run was 0.00098 for blog and 0.00356 for Hnef; these small startup
shifts are distinct from the zero board deviation checked during game state changes.
Local timings are not a network or physical-device benchmark. Full asset hashes
and resource timings are recorded. `git diff --check` passes.

Remaining limits: physical devices, Safari/Firefox, high-DPI moiré assessment and a
full screen-reader audit remain outstanding. W2 approval is not assumed. Review the
material taste from the captures before any merge or publication.
