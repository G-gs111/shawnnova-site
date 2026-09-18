# Design QA — Recruiter Portfolio Redesign

## Inputs

- Approved visual direction: `/Users/Admin/.codex/generated_images/019f7de7-b409-7c61-ad76-1f5fa712eb8a/exec-29ebeb17-dcbb-4daa-bae2-5a339253a1f9.png`
- Implementation: `http://127.0.0.1:3000/`
- Browser: the user's Google Chrome session only
- Chrome viewport checks: 320×812, 375×812, 768×1024, 887×1774, 1280×900, 1920×1080
- Visual evidence: Chrome viewport captures emitted during the 2026-09-19 QA session. The browser security policy prevented writing the in-memory capture back to a local data URL, so the captures remain attached to the task rather than duplicated as repository assets.

## Comparison

The implementation preserves the approved direction's chalk-white paper, graphite typography, restrained vermilion accent, thin rule system, dense evidence bands, and dark delivery-console motif. It intentionally adapts the reference instead of pixel-copying it: real bilingual content and responsive case-study structures replace placeholder modules.

## Findings and fixes

1. P2 — At 768–900px, the evidence strip occupied only the first column because legacy `.fde-metrics` grid rules still applied to the new wrapper. Fixed by making the wrapper block-level and the evidence strip explicitly full width.
2. P2 — On English case pages, the verified-outcomes heading inherited the generic three-column case-header grid and collapsed to a zero-width column. Fixed with a dedicated results-header layout override.
3. P2 — Next.js warned about the intentional global smooth-scroll behavior during route changes. Fixed by declaring `data-scroll-behavior="smooth"` on the root HTML element.
4. P2 — Small copy in the dark contact section was checked after the redesign request that reported low contrast. Helper and consent text now render at 14px with the light muted-on-dark token; labels and values use the stronger on-dark token.
5. P3 — The 887px breakpoint intentionally hides secondary navigation links while preserving language and contact actions. This reduces header crowding and matches the compact reference hierarchy.

## Final verification

- No horizontal overflow at 320, 375, 768, 1280, or 1920px.
- Evidence strip resolves to 1, 2, and 5 columns at mobile, tablet, and desktop widths.
- Homepage contains exactly three featured case rows; the fourth case remains a clearly labeled supporting delivery.
- All four case pages cycle correctly in both locale structures; switching language preserves the active case slug.
- Keyboard focus is visible, contact helper copy remains legible, and essential information does not depend on animation.
- Chrome console was rechecked after the scroll declaration; application warnings and errors are absent.

final result: passed
