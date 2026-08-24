# FDE Portfolio Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the cobalt template-like portfolio with the approved limestone, charcoal and copper system; add purposeful ThreeUI-informed interactions; tighten bilingual copy; and preserve all routes and contact behavior.

**Architecture:** Keep the existing Next.js App Router and bilingual typed content model. Add three focused client components—System Relay, Project Signal Stack and Delivery Pipeline—while case routes continue to consume the shared project records. CSS remains token-driven and Canvas 2D is the only rendering layer.

**Tech Stack:** Next.js 16, React 19, TypeScript, Canvas 2D, Motion 12, Vitest, Testing Library, Cloudflare-backed contact API.

**Spec:** `design.md`

## Global Constraints

- Do not add Three.js, gradients, blue/purple neon, fake product screenshots or fabricated metrics.
- Preserve `/`, `/en`, the six project routes, legacy anchors and the existing contact backend.
- Use the user’s Chrome only for rendered verification.
- Support 320, 375, 414, 768, 1280 and 1920px widths without horizontal overflow.
- Important content must remain available when JavaScript motion is disabled or reduced.
- Company, brand, creator and account identifiers remain private.

---

### Task 1: Lock content and design contracts

**Files:**
- Modify: `src/app/page.test.tsx`
- Modify: `src/content/portfolio.test.ts`
- Modify: `scripts/check-portfolio-content.mjs`
- Modify: `src/content/portfolio.ts`
- Modify: `tokens.css`
- Modify: `.hallmark/log.json`

**Interfaces:**
- Consumes: `getHomeContent(locale)`, `getProject(locale, slug)`.
- Produces: four concise homepage proof metrics and matching bilingual case records.

- [ ] **Step 1: Write failing content tests**

Assert the new hero heading, four proof values, truthful Qianchuan boundary, absence of QQ delivery microcopy, and locale-aligned result keys.

- [ ] **Step 2: Run the focused tests and confirm RED**

Run: `pnpm vitest run src/app/page.test.tsx src/content/portfolio.test.ts`

Expected: failures on the old hero, five-metric array and old contact note.

- [ ] **Step 3: Implement the approved bilingual copy and tokens**

Replace repeated generic copy, keep verified numbers only, and update the root token file to the values in `design.md`.

- [ ] **Step 4: Run focused tests and content checker**

Run: `pnpm vitest run src/app/page.test.tsx src/content/portfolio.test.ts && pnpm check:content`

Expected: PASS and the privacy/dependency boundary message.

### Task 2: Build the purposeful interaction layer

**Files:**
- Create: `src/components/fde/project-signal-stack.tsx`
- Create: `src/components/fde/project-signal-stack.test.tsx`
- Create: `src/components/fde/delivery-pipeline.tsx`
- Create: `src/components/fde/delivery-pipeline.test.tsx`
- Modify: `src/components/fde/network-canvas.tsx`
- Create: `src/components/fde/network-canvas.test.tsx`
- Modify: `src/components/fde/site-nav.tsx`

**Interfaces:**
- `ProjectSignalStack({ projects, locale, viewCaseLabel, diagramLabel, routePrefix })` renders all case links and exposes active state through `aria-current`.
- `DeliveryPipeline({ groups })` renders all stages and tools as a keyboard-reachable connected process.
- `NetworkCanvas({ label, locale })` renders a real pause/resume button and a static fallback.

- [ ] **Step 1: Write failing component behavior tests**

Test that every project remains linked, keyboard selection changes `aria-current`, all tool stages render, and the relay pause button toggles its accessible label.

- [ ] **Step 2: Run the focused tests and confirm RED**

Run: `pnpm vitest run src/components/fde/project-signal-stack.test.tsx src/components/fde/delivery-pipeline.test.tsx src/components/fde/network-canvas.test.tsx`

Expected: module-not-found failures for new components and missing pause behavior for the relay.

- [ ] **Step 3: Implement minimal accessible components**

Use semantic buttons/links, Canvas 2D for relay lines, IntersectionObserver only for active-case detection, and transform/opacity-only feedback.

- [ ] **Step 4: Run focused tests and confirm GREEN**

Run the same Vitest command.

Expected: all new component tests PASS.

### Task 3: Apply the new page structures

**Files:**
- Modify: `src/components/fde/portfolio-home.tsx`
- Modify: `src/components/fde/case-page.tsx`
- Modify: `src/components/fde/system-diagram.tsx`
- Modify: `src/components/fde/contact-block.tsx`
- Modify: `src/app/fde-portfolio.css`
- Modify: `src/app/globals.css`

**Interfaces:**
- Homepage composes `NetworkCanvas`, `ProjectSignalStack`, `DeliveryPipeline` and `ContactBlock`.
- Case pages retain the existing `Project` content contract.

- [ ] **Step 1: Add failing page assertions**

Assert the signal-stack region, delivery-pipeline region, legacy anchors, direct contact routes and all three case headings.

- [ ] **Step 2: Run page tests and confirm RED**

Run: `pnpm vitest run src/app/page.test.tsx`

Expected: missing signal-stack and delivery-pipeline regions.

- [ ] **Step 3: Compose the new homepage and case structures**

Replace repeated numbered-grid sections with Feature Stack and Narrative Workflow layouts. Remove the global grain overlay from the FDE surface and set helper/privacy copy to at least 14px.

- [ ] **Step 4: Run page and contact tests**

Run: `pnpm vitest run src/app/page.test.tsx src/components/contact-form.test.tsx`

Expected: PASS with unchanged form submission behavior.

### Task 4: Verify the complete implementation

**Files:**
- Modify if evidence requires: the files listed in Tasks 1–3 only.

**Interfaces:**
- Produces a build ready for private preview, not production deployment.

- [ ] **Step 1: Run automated verification**

Run: `pnpm test && pnpm check:content && pnpm lint && pnpm build && pnpm build:sites`

Expected: zero failing tests, lint errors or build errors.

- [ ] **Step 2: Run the Hallmark slop audit**

Check the emitted page for the 58 gates; fix token drift, repeated eyebrows, wrapping controls, contrast, motion and responsive issues before proceeding.

- [ ] **Step 3: Verify in Chrome**

Check homepage and a case page at 320, 375, 414, 768, 1280 and 1920px; inspect contact helper text, keyboard focus, relay pause, case selection, language switching and the console.

- [ ] **Step 4: Generate a private Sites preview**

Deploy only after local verification. Do not publish the Vercel production deployment.
