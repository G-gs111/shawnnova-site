# Mature Portfolio Redesign Implementation Plan

**Goal:** Turn the existing Shawnnova site into a mature, reference-inspired business/product portfolio, preserve the working contact flow, and publish it to `260604.xyz`.

**Architecture:** Keep the current Next.js App Router application and contact Worker. Centralize all public facts in `src/content/site.ts`; compose the page from focused server components plus two small client-side interaction components (active navigation and pointer-following hero mask). Use CSS for the visual system and progressive enhancement so content remains usable without animation.

**Tech stack:** Next.js 16, React 19, TypeScript, Motion, Vitest/Testing Library, existing Vercel + Cloudflare contact Worker.

---

## Task 1: Lock truthful portfolio content

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/content/site.ts`

1. Update the content test first to require the business-product positioning, truthful project states, anonymized client label, resume metrics, condensed experience, and existing contact routes.
2. Run `pnpm test -- src/content/site.test.ts` and confirm the old content fails the new assertions.
3. Rewrite `siteContent` with the approved copy, keeping private names and unsupported metrics out.
4. Re-run the targeted test until it passes.

## Task 2: Build the new information architecture

**Files:**
- Modify: `src/app/page.test.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/hero.tsx`
- Create: `src/components/metrics-section.tsx`
- Modify: `src/components/work-section.tsx`
- Modify: `src/components/experience-section.tsx`
- Modify: `src/components/approach-section.tsx`
- Modify: `src/components/contact-section.tsx`
- Delete from page composition only: legacy motto/tool-strip rendering

1. Update the page test to require all new sections and mature copy.
2. Confirm it fails against the current page.
3. Recompose the page and implement focused sections using `siteContent`.
4. Keep the existing `ContactForm` API contract unchanged.
5. Re-run the page and form tests until they pass.

## Task 3: Add signature interactions with progressive enhancement

**Files:**
- Create: `src/components/active-nav.tsx`
- Create: `src/components/hero-mask.tsx`
- Create: `src/components/active-nav.test.tsx`
- Create: `src/components/hero-mask.test.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/hero.tsx`

1. Write tests for an accessible navigation fallback, active-section updates, hero content duplication for the mask, and reduced-motion behavior.
2. Confirm tests fail before components exist.
3. Implement `IntersectionObserver`-based active navigation and pointer-position CSS variables.
4. Disable motion listeners when reduced motion is requested and keep the hero readable on touch devices.
5. Run the targeted component tests.

## Task 4: Apply the reference-inspired visual system

**Files:**
- Replace: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

1. Introduce the black/near-white system, cobalt accent, large typography, fixed header, dot/grid texture, numbered project cards, metrics, timeline, collaboration cards, contact panel, and mobile layout.
2. Add visible focus states, safe text wrapping, reduced-motion CSS and mobile overflow protection.
3. Update metadata to the mature positioning and keep the production canonical base.
4. Run `pnpm lint`, `pnpm test`, and `pnpm build`; fix only issues attributable to this redesign.

## Task 5: Verify in the user's Chrome

**Files:**
- Create: `design-qa.md`

1. Start the local production or development server.
2. Use the connected user Chrome for 1440px desktop and 390px mobile checks: hero mask, active navigation, all sections, anchor links, mail/phone/GitHub routes, form validation, keyboard focus, reduced-motion fallback, and horizontal overflow.
3. Capture implementation screenshots and compare them with the saved reference screenshots in one visual review.
4. Record any issues, fix P0-P2 findings, then mark the QA document `passed` only after a final Chrome pass.

## Task 6: Publish and verify production

**Files:**
- Modify if required by hosting: `.openai/hosting.json`
- Update: project documentation only if deployment details change

1. Create a private Sites checkpoint if the current Next.js architecture can be hosted without destabilizing the production app; otherwise keep Sites as the build/check workflow and document the incompatibility instead of rewriting the stack solely for staging.
2. Deploy the verified build through the existing Vercel production configuration.
3. Open `https://260604.xyz` in the user's Chrome and repeat the critical desktop/mobile checks, including the live Turnstile form rendering without sending a duplicate test message.
4. Run `git status --short`, commit the implementation and QA evidence, and confirm the worktree is clean.
