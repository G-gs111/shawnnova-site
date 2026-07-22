# Design QA

Status: passed in the user's Chrome on local and production builds

Date: 2026-07-22

## Reference comparison

- Compared the saved desktop hero and project screenshots from `https://www.lius-node.com/#about` directly beside the new implementation.
- Preserved the reference's strongest interaction language: fixed active navigation, large kinetic typography, a pointer-following circular mask, restrained monochrome surfaces and generous spacing.
- Kept Shawnnova's own identity through a cobalt accent, real project imagery, Chinese-first content and outcome-led project descriptions.
- No reference branding, copy or assets are reused.

## Chrome checks

- Desktop viewport: 1202 x 716.
- Mobile viewport override: 390 x 844.
- Hero occupies exactly one mobile viewport and the primary action remains visible.
- Circular mask moved from 50% / 50% to 79% / 44% after a pointer move, confirming the interaction works.
- Active navigation updated correctly for capability, project, experience and contact sections.
- Four project cards rendered with accurate states: two launched, one in development and one in exploration.
- No public page text contains the private project name.
- Mobile document width stayed within the viewport; project and contact layouts collapsed to one column.
- Empty-form submission produced three inline validation messages and a live status message.
- No page console errors were recorded.

## Production verification

- Verified `https://260604.xyz` at 1202 x 716 and 390 x 844 in the user's Chrome.
- Confirmed the production headline, four project cards, active project navigation and pointer-following hero mask.
- Confirmed the anonymized client label is present and the private project name is absent.
- Confirmed the Cloudflare Turnstile widget is visible in the production contact form without submitting a duplicate message.
- Confirmed no horizontal overflow at either viewport.
- Reset the temporary Chrome mobile viewport override after verification.
- Saved and deployed Sites version 1 as an owner-only checkpoint at `https://shawnnova-portfolio-check.wustwkdzs-2719.chatgpt.site`.
