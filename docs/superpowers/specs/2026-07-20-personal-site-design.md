# Shawnnova Personal Site Design

## Purpose

Build a polished personal brand site for 葛少玉, also known as Shawnnova. The site should help recruiters, collaborators, and curious visitors quickly understand his focus: turning AI, automation, and software engineering into useful products.

The first release is intentionally compact. It must feel finished without inventing employment history, client logos, usage statistics, or project results that have not been supplied.

## Design Read

Reading this as a developer portfolio for recruiters and potential collaborators, with a cold editorial technology language, leaning toward native CSS, Next.js Server Components, and restrained Motion client islands.

- `DESIGN_VARIANCE: 8`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 3`
- Mode: greenfield
- Theme: automatic light and dark modes, with one coherent theme per preference
- Palette: graphite neutrals with one cobalt-blue accent
- Shape rule: 16px panels, full-pill buttons, 8px inputs only if a form is added later

## Information Architecture

The site is a single static page with four anchors:

1. `#about`: asymmetric hero introducing 葛少玉 / Shawnnova.
2. `#work`: selected work focused on AI video tooling and product experiments.
3. `#approach`: a concise statement of how he works, expressed as an editorial composition rather than equal feature cards.
4. `#contact`: a single contact intent linking to the authenticated GitHub profile `G-gs111`.

The desktop navigation stays on one line. Mobile navigation collapses to name, work link, and GitHub icon.

## Content

### Hero

- Name: 葛少玉
- Alias: Shawnnova
- Headline: `把复杂技术，做成愿意被使用的产品。`
- Supporting copy: `独立开发者，关注 AI 应用、自动化与有质感的数字体验。`
- Primary CTA: `查看作品`
- Secondary CTA: `GitHub`

The hero uses a generated editorial image with a reflective folded form and generous negative space. It must not depict a fabricated portrait.

### Selected Work

Show three honest project directions without fabricated metrics:

- `AI 视频工具`: automated subtitle and watermark cleanup workflows.
- `桌面端体验`: practical local software with clear, focused interaction.
- `持续实验`: small product experiments that turn emerging technology into usable interfaces.

The first item receives a large generated image. The other two use cropped supporting images, typography, and simple line structure. No fake dashboards or invented screenshots.

### Approach

Use three short verbs as the structure: `理解`, `构建`, `打磨`. Explain that Shawnnova starts from the real problem, builds the smallest complete product, and polishes performance and interaction before release.

### Contact

Use one clear contact intent: `在 GitHub 联系我`. Link to `https://github.com/G-gs111`. Do not invent an email address.

## Interaction and Motion

- Hero content enters in a short hierarchy-driven sequence.
- The hero image moves subtly with pointer position on capable devices; this communicates material depth and must use Motion values rather than React state.
- Work items reveal once as they enter the viewport.
- Buttons provide hover and active feedback.
- All motion collapses to static output under `prefers-reduced-motion`.
- No scroll hijacking, marquee, custom cursor, or perpetual decorative animation.

## Visual Assets

Generate two project-bound images:

1. A 3:2 hero image: abstract folded chrome and translucent cobalt glass in a dark architectural studio.
2. A 4:3 supporting image: close-up of engineered material, glass, brushed metal, and blue light.

Both images must contain no people, text, logos, UI, watermarks, or recognizable branded products.

## Technical Architecture

- Next.js App Router, static generation by default.
- React Server Components for page structure.
- One small client component for reveal and pointer motion.
- Tailwind is intentionally omitted. A focused CSS module and semantic design tokens keep the static payload small and the visual system custom.
- Phosphor Icons is the only icon family.
- `next/font` uses Geist and Geist Mono so fonts are self-hosted in the deployment.
- Vercel serves the static output and Functions are not required in the first release.
- Cloudflare proxies the custom domain after Vercel ownership verification.

## Accessibility and Performance

- Semantic landmarks and heading order.
- Visible keyboard focus.
- WCAG AA contrast for body copy and controls.
- Generated images include accurate alt text and fixed dimensions.
- Initial hero fits within `100dvh` without requiring a scroll to see the CTA.
- Static assets use immutable caching through Next.js and Vercel.
- Target: Lighthouse Performance, Accessibility, Best Practices, and SEO scores of at least 90.

## Verification

- Unit tests verify project content and metadata are present.
- Browser tests verify navigation anchors, GitHub link, responsive layout, and absence of horizontal overflow.
- Build output must show the home page is statically generated.
- Visual QA covers desktop 1440x900 and mobile 390x844 in both light and dark modes.
- Public deployment must return HTTP 200 before DNS changes are started.
- The final custom domain must return HTTP 200 over HTTPS.

