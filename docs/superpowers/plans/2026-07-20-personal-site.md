# Shawnnova Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, deploy, and connect a polished personal brand site for 葛少玉 / Shawnnova at `260604.xyz`.

**Architecture:** A static-first Next.js App Router site renders all content as Server Components. A small Motion client island adds reveal and pointer-depth effects, while Vercel hosts the build and Cloudflare manages the public DNS and proxy.

**Tech Stack:** Next.js, React, TypeScript, native CSS, Motion, Phosphor Icons, Vitest, Playwright, Vercel, Cloudflare

## Global Constraints

- Visible identity is `葛少玉` and `Shawnnova`.
- Do not invent employment history, customers, usage metrics, or outcomes.
- Use graphite neutrals and one cobalt-blue accent.
- Use Geist and Geist Mono through `next/font`; no third-party font requests.
- Use Phosphor Icons only; no hand-written SVG paths.
- No em-dash or en-dash characters in visible copy.
- Honor `prefers-reduced-motion` and both system color modes.
- Keep the first release static; do not add forms, databases, analytics, or API routes.

---

### Task 1: Project Foundation and Content Contract

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `vitest.config.ts`
- Create: `src/content/site.ts`
- Test: `src/content/site.test.ts`

**Interfaces:**
- Produces: `siteContent`, an immutable object containing identity, navigation, projects, approach, and contact data.

- [ ] Write a failing content test that expects `葛少玉`, `Shawnnova`, three work items, and `https://github.com/G-gs111`.
- [ ] Run `pnpm test src/content/site.test.ts` and verify it fails because `site.ts` does not exist.
- [ ] Add the minimal Next.js configuration and `siteContent` object.
- [ ] Install dependencies and run the content test until it passes.
- [ ] Commit the foundation.

### Task 2: Semantic Page and Design System

**Files:**
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/site-header.tsx`
- Create: `src/components/hero.tsx`
- Create: `src/components/work-section.tsx`
- Create: `src/components/approach-section.tsx`
- Create: `src/components/contact-section.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `siteContent` from Task 1.
- Produces: semantic anchors `about`, `work`, `approach`, and `contact`.

- [ ] Write a failing render test for the hero heading, four anchors, three work titles, and one GitHub contact link.
- [ ] Run the test and verify it fails because the page components do not exist.
- [ ] Implement the Server Component page structure and semantic CSS token system.
- [ ] Run the render test and complete the minimal markup required to pass.
- [ ] Commit the semantic page.

### Task 3: Generated Visual Assets and Motion

**Files:**
- Create: `public/images/shawnnova-hero.webp`
- Create: `public/images/shawnnova-material.webp`
- Create: `src/components/motion/reveal.tsx`
- Create: `src/components/motion/hero-visual.tsx`
- Test: `src/components/motion/reveal.test.tsx`

**Interfaces:**
- Produces: `Reveal` and `HeroVisual` client components with reduced-motion fallbacks.

- [ ] Generate and inspect two raster assets against the design specification.
- [ ] Write a failing test that expects reduced-motion mode to render content without hidden initial state.
- [ ] Run the test and verify the client component is missing.
- [ ] Implement the Motion leaves with transform and opacity only.
- [ ] Run the test and optimize images to WebP.
- [ ] Commit visual assets and motion.

### Task 4: Browser Verification and Visual Refinement

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/site.spec.ts`
- Create: `public/og-image.png`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: browser-level assertions and final metadata.

- [ ] Write browser tests for anchors, external GitHub link, desktop layout, mobile overflow, and reduced motion.
- [ ] Run the tests and verify at least one assertion fails before refinement.
- [ ] Refine responsive layout, focus states, metadata, and image loading until tests pass.
- [ ] Run production build and Lighthouse at desktop and mobile sizes.
- [ ] Run the frontend pre-flight checklist and remove all failures.
- [ ] Commit verified UI.

### Task 5: Public Deployment

**Files:**
- Create: `.vercelignore`
- Modify: `README.md`

**Interfaces:**
- Produces: a public Vercel deployment URL returning HTTP 200.

- [ ] Confirm local Git status and build output are clean.
- [ ] Create and push the GitHub repository under `G-gs111`.
- [ ] Deploy the repository to Vercel and capture the production URL.
- [ ] Verify the public URL, response headers, assets, and mobile rendering.
- [ ] Commit deployment documentation.

### Task 6: Custom Domain and Cloudflare

**External state:**
- Spaceship domain: `260604.xyz`
- Cloudflare zone: `260604.xyz`
- Vercel project custom domains: `260604.xyz`, `www.260604.xyz`

**Interfaces:**
- Produces: HTTPS access on the apex and `www`, with one canonical redirect.

- [ ] Add the domain to Cloudflare and obtain assigned nameservers.
- [ ] Replace Spaceship nameservers with the Cloudflare nameservers.
- [ ] Add `260604.xyz` and `www.260604.xyz` to Vercel.
- [ ] Add the Vercel DNS records in Cloudflare, initially DNS-only for certificate verification.
- [ ] Wait for DNS propagation and verify HTTPS on both hostnames.
- [ ] Enable Cloudflare proxy only after Vercel ownership and certificate checks pass.
- [ ] Verify canonical redirect, cache headers, and live page rendering.

