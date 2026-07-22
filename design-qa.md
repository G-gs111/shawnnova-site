# Design QA

Status: in progress, local Chrome checks passed; production check pending

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

## Remaining production check

- Verify the production Turnstile widget after Vercel injects its environment key.
- Recheck the final `https://260604.xyz` hero, project section, mobile overflow and contact form without sending a duplicate message.
- Reset the temporary Chrome mobile viewport override after verification.
