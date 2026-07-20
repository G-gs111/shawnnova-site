# Editorial Imagery and Tool Strip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four abstract/repeated portfolio visuals with distinct editorial work-scene images and add a locally rendered strip of six accurate everyday-tool logos.

**Architecture:** Generate and visually screen four brand-free source images, convert approved outputs to versioned WebP assets, and reference them through `siteContent`. Add a server-rendered `ToolStrip` component that maps content-owned icon keys to local SVG paths from `simple-icons`, then integrate it between the motto and work sections with responsive editorial styling.

**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Next Image, CSS, `simple-icons` 16.27.0, Vitest/Testing Library, Playwright, OpenAI ImageGen, Vercel

## Global Constraints

- Use four distinct, concrete editorial work images; do not reuse one image across project cards.
- Do not show a clear fictional face, malformed logo, readable gibberish, watermark, cyberpunk effects, or abstract metal sculpture in generated images.
- Render Codex, 飞书, GitHub, VS Code, Cloudflare, and Vercel logos from local SVG data, never from generated pixels or a third-party CDN.
- Preserve the existing information architecture, contact form service, typography, domain, light/dark themes, and cobalt accent.
- Keep generated text and logos out of photographic assets; visible brand names are HTML text.
- Serve versioned high-quality WebP files through Next Image and verify desktop/mobile crops.
- Use the user's signed-in Chrome, and no other browser, for final production verification.

---

### Task 1: Generate and prepare four editorial image assets

**Files:**
- Create: `public/images/shawnnova-hero-studio-v2.webp`
- Create: `public/images/shawnnova-video-workflow-v2.webp`
- Create: `public/images/shawnnova-desktop-product-v2.webp`
- Create: `public/images/shawnnova-experiment-lab-v2.webp`

**Interfaces:**
- Consumes: the composition and exclusions in `docs/superpowers/specs/2026-07-20-editorial-imagery-and-tool-strip-design.md`
- Produces: four optimized WebP assets referenced by exact public paths in Task 2

- [ ] **Step 1: Generate the hero source image**

Use ImageGen with this prompt:

```text
Asset type: photorealistic editorial website hero image for a Chinese independent developer's personal portfolio.
Scene: a focused East Asian male creator seen only from the side-back, seated in a quiet modest studio and turning a product idea into a working digital prototype. Include a laptop or monitor with an intentionally soft, non-readable neutral interface, a paper product sketch, two or three small notes, and a natural hand gesture. No clear face.
Composition: portrait-friendly master composition; person and main desk action on the right half, calm negative space on the left, important content safe in the center so it crops cleanly to desktop 4:5 and mobile 4:3.
Style: premium natural editorial photography, believable materials and proportions, soft window light plus a subtle warm work lamp, cool gray and warm white palette with one restrained cobalt-blue object, quiet focused long-term-builder mood, realistic lens and depth of field.
Avoid: logos, readable text, watermarks, cyberpunk neon, holograms, floating UI, abstract sculpture, luxury showroom styling, exaggerated gaming setup, extra fingers, malformed devices, clear fictional face.
Output: clean website-ready image with no border or caption.
```

- [ ] **Step 2: Generate the AI video workflow source image**

Use ImageGen with this prompt:

```text
Asset type: photorealistic editorial project-card image for an AI video tool.
Scene: close working view of a creator's hand operating a video-production workflow on a desktop monitor. The interface should communicate timeline tracks, subtitle blocks, clip thumbnails, restoration controls, and an export flow through clean geometric modules, while all text remains intentionally unreadable and no brand is identifiable.
Composition: horizontal 16:10 composition, monitor and hand form a clear action relationship, essential details centered for a 4:3 mobile crop, modest real desk details at the edges.
Style: natural product-documentary photography, soft studio daylight, tactile keyboard and desk materials, cool gray and warm white with a restrained cobalt accent, crisp but not glossy, believable working environment.
Avoid: logos, readable text, watermarks, cyberpunk neon, holograms, floating screens, abstract objects, fake code, extra fingers, malformed keyboard, dramatic advertising glow.
Output: clean website-ready image with no border or caption.
```

- [ ] **Step 3: Generate the desktop-product source image**

Use ImageGen with this prompt:

```text
Asset type: photorealistic editorial project-card image for desktop product experience design.
Scene: a tidy but actively used desk with a laptop or compact monitor displaying a restrained desktop application layout made from non-readable neutral panels. Beside it, show a paper user-flow sketch, pen, and one small cobalt-blue note. The scene should communicate product thinking, software construction, clarity, and usability rather than expensive hardware.
Composition: horizontal 2:1 master composition, medium-close angle, screen and paper sketch layered naturally, main subjects kept central for 4:3 mobile cropping.
Style: understated contemporary editorial photography, soft side light, realistic textures, cool gray and warm white palette, quiet human presence without a visible face.
Avoid: logos, readable text, watermarks, cyberpunk effects, floating UI, abstract sculpture, luxury showroom, excessive gadgets, malformed hardware.
Output: clean website-ready image with no border or caption.
```

- [ ] **Step 4: Generate the experiment-lab source image**

Use ImageGen with this prompt:

```text
Asset type: photorealistic editorial project-card image about rapid product experiments.
Scene: slightly overhead working table where several small prototypes are being compared: a phone, a small tablet, paper interface cards, hand-drawn hypothesis arrows, and a creator's hand moving one card. Device screens show only simple non-readable neutral UI blocks. The scene should suggest fast validation, operations feedback, and continuous iteration.
Composition: horizontal 2:1 master composition with the important prototype cluster in the center, distinct from the desktop-product scene, safe for a 4:3 mobile crop.
Style: authentic workshop/documentary photography, naturally imperfect arrangement, soft daylight, cool gray and warm white with one restrained cobalt accent, calm and intelligent rather than futuristic.
Avoid: logos, readable text, watermarks, cyberpunk neon, floating screens, abstract sculpture, repeated devices, extra fingers, malformed phones, staged luxury aesthetic.
Output: clean website-ready image with no border or caption.
```

- [ ] **Step 5: Inspect each generated source and correct only failed details**

Open all four results at original detail. Reject or regenerate any result containing a clear face, malformed hands/devices, apparent logo, readable gibberish, watermark, or a crop that loses the subject at 4:5/4:3/16:10/2:1. Use a targeted ImageGen edit only when one isolated detail is wrong; otherwise regenerate the affected asset from its prompt.

- [ ] **Step 6: Convert approved sources to versioned WebP files**

Run the available image conversion tool with equivalent settings:

```bash
magick approved-hero.png -strip -quality 84 public/images/shawnnova-hero-studio-v2.webp
magick approved-video.png -strip -quality 84 public/images/shawnnova-video-workflow-v2.webp
magick approved-desktop.png -strip -quality 84 public/images/shawnnova-desktop-product-v2.webp
magick approved-experiment.png -strip -quality 84 public/images/shawnnova-experiment-lab-v2.webp
```

Expected: four valid WebP images, each visually faithful to its approved source and small enough for production delivery. If ImageMagick is unavailable, use the workspace Sharp runtime with quality `84` and the same destination names.

- [ ] **Step 7: Verify the optimized files**

Run:

```bash
file public/images/*-v2.webp
du -h public/images/*-v2.webp
```

Expected: every file reports `Web/P image`; none is zero bytes. Visually reopen the WebP files to confirm conversion introduced no artifact or orientation error.

- [ ] **Step 8: Commit the assets**

```bash
git add public/images/*-v2.webp
git commit -m "feat: add editorial portfolio imagery"
```

### Task 2: Put image paths and tool metadata under tested content ownership

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/content/site.ts`

**Interfaces:**
- Consumes: the exact four public asset paths from Task 1
- Produces: `siteContent.heroVisual: { image: string; alt: string }`, distinct `siteContent.work[*].image` values, and `siteContent.tools: readonly { label: string; icon: ToolIconKey }[]`

- [ ] **Step 1: Write failing content tests**

Add these assertions to `src/content/site.test.ts`:

```ts
expect(siteContent.heroVisual).toEqual({
  image: "/images/shawnnova-hero-studio-v2.webp",
  alt: "创作者从侧后方坐在工作室中，将产品草图做成数字原型",
});
expect(siteContent.work.map((item) => item.image)).toEqual([
  "/images/shawnnova-video-workflow-v2.webp",
  "/images/shawnnova-desktop-product-v2.webp",
  "/images/shawnnova-experiment-lab-v2.webp",
]);
expect(new Set(siteContent.work.map((item) => item.image)).size).toBe(3);
expect(siteContent.work.every((item) => item.alt.length > 10)).toBe(true);
expect(siteContent.tools.map((item) => item.label)).toEqual([
  "Codex",
  "飞书",
  "GitHub",
  "VS Code",
  "Cloudflare",
  "Vercel",
]);
```

- [ ] **Step 2: Run the content test and verify failure**

Run: `pnpm test -- src/content/site.test.ts`

Expected: FAIL because `heroVisual` and `tools` do not exist and the image paths are still the original abstract assets.

- [ ] **Step 3: Add the tested content**

Add to `siteContent`, immediately after `identity`:

```ts
heroVisual: {
  image: "/images/shawnnova-hero-studio-v2.webp",
  alt: "创作者从侧后方坐在工作室中，将产品草图做成数字原型",
},
tools: [
  { label: "Codex", icon: "openai" },
  { label: "飞书", icon: "feishu" },
  { label: "GitHub", icon: "github" },
  { label: "VS Code", icon: "visualstudiocode" },
  { label: "Cloudflare", icon: "cloudflare" },
  { label: "Vercel", icon: "vercel" },
],
```

Replace the work image and alt fields with:

```ts
image: "/images/shawnnova-video-workflow-v2.webp",
alt: "创作者正在桌面屏幕上调整视频时间线、字幕轨道和处理流程",
```

```ts
image: "/images/shawnnova-desktop-product-v2.webp",
alt: "桌面应用界面与纸质产品流程草图组成的真实工作场景",
```

```ts
image: "/images/shawnnova-experiment-lab-v2.webp",
alt: "手机、平板和纸面原型在工作台上被比较与快速验证",
```

- [ ] **Step 4: Run the content test and verify success**

Run: `pnpm test -- src/content/site.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit the content change**

```bash
git add src/content/site.ts src/content/site.test.ts
git commit -m "feat: describe portfolio imagery and tools"
```

### Task 3: Build the local SVG tool strip with tests

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `src/components/tool-strip.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `siteContent.tools` and icon keys `openai | feishu | github | visualstudiocode | cloudflare | vercel`
- Produces: `ToolStrip(): JSX.Element`, a labelled `section.tool-strip` with six visible tool names and local inline SVG paths

- [ ] **Step 1: Add the exact local icon dependency**

Run:

```bash
pnpm add simple-icons@16.27.0
```

Expected: `package.json` contains `"simple-icons": "16.27.0"` under dependencies and the lockfile is updated.

- [ ] **Step 2: Write the failing page test**

Add to `src/app/page.test.tsx`, before the contact assertions:

```ts
const tools = screen.getByRole("region", { name: "常用工具" });
for (const label of ["Codex", "飞书", "GitHub", "VS Code", "Cloudflare", "Vercel"]) {
  expect(tools).toHaveTextContent(label);
}
expect(tools.querySelectorAll("svg")).toHaveLength(6);
```

- [ ] **Step 3: Run the page test and verify failure**

Run: `pnpm test -- src/app/page.test.tsx`

Expected: FAIL because no region named `常用工具` is rendered.

- [ ] **Step 4: Implement the tool strip**

Create `src/components/tool-strip.tsx`:

```tsx
import {
  siCloudflare,
  siFeishu,
  siGithub,
  siOpenai,
  siVercel,
  siVisualstudiocode,
} from "simple-icons/icons";

import { siteContent } from "@/content/site";

const toolIcons = {
  cloudflare: siCloudflare,
  feishu: siFeishu,
  github: siGithub,
  openai: siOpenai,
  vercel: siVercel,
  visualstudiocode: siVisualstudiocode,
} as const;

export function ToolStrip() {
  return (
    <section className="tool-strip section-shell" aria-labelledby="tools-title">
      <div className="tool-strip-heading">
        <p className="section-kicker">Daily stack</p>
        <h2 id="tools-title">常用工具</h2>
      </div>
      <ul className="tool-list" aria-label="常用工具列表">
        {siteContent.tools.map((tool) => {
          const icon = toolIcons[tool.icon];

          return (
            <li key={tool.label} tabIndex={0}>
              <svg viewBox="0 0 24 24" role="img" aria-label={`${tool.label} 图标`}>
                <path d={icon.path} />
              </svg>
              <span>{tool.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
```

- [ ] **Step 5: Integrate the component and hero content**

In `src/app/page.tsx`, import `ToolStrip` and render `<ToolStrip />` between `<MottoBand />` and `<WorkSection />`.

In `src/components/motion/hero-visual.tsx`, import `siteContent`, remove `aria-hidden="true"` from the outer `motion.div`, replace the image fields with:

```tsx
src={siteContent.heroVisual.image}
alt={siteContent.heroVisual.alt}
```

and add `aria-hidden="true"` to `<div className="hero-visual-mark">SN</div>`.

- [ ] **Step 6: Run the component/content tests**

Run: `pnpm test -- src/app/page.test.tsx src/content/site.test.ts`

Expected: PASS with six inline SVGs and the new hero/work content.

- [ ] **Step 7: Commit the component and dependency**

```bash
git add package.json pnpm-lock.yaml src/components/tool-strip.tsx src/app/page.tsx src/app/page.test.tsx src/components/motion/hero-visual.tsx
git commit -m "feat: add everyday tool strip"
```

### Task 4: Add responsive editorial styling and browser assertions

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: `.tool-strip`, `.tool-strip-heading`, `.tool-list`, and the existing image layout classes
- Produces: responsive six-column/two-column tool presentation, theme-safe local SVG rendering, and verified viewport behavior

- [ ] **Step 1: Write failing browser assertions**

In the first Playwright test, after the motto assertion, add:

```ts
const toolStrip = page.getByRole("region", { name: "常用工具" });
await expect(toolStrip).toBeVisible();
for (const label of ["Codex", "飞书", "GitHub", "VS Code", "Cloudflare", "Vercel"]) {
  await expect(toolStrip.getByText(label, { exact: true })).toBeVisible();
}
```

In the desktop layout test, add:

```ts
await expect(page.locator(".tool-list")).toHaveCSS("display", "grid");
const toolColumns = await page.locator(".tool-list").evaluate((element) =>
  getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
);
expect(toolColumns).toHaveLength(6);
```

- [ ] **Step 2: Run the desktop E2E tests and verify style failure**

Run: `pnpm test:e2e -- --project=desktop-chrome --grep "identity|asymmetric"`

Expected: the visibility assertion passes after Task 3, while the tool grid assertion fails until CSS is added.

- [ ] **Step 3: Add desktop and theme-safe styles**

Insert after `.motto-band p::after` in `src/app/globals.css`:

```css
.tool-strip {
  display: grid;
  grid-template-columns: minmax(130px, 0.72fr) minmax(0, 4.28fr);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  padding-block: 28px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.tool-strip-heading .section-kicker {
  margin-bottom: 7px;
}

.tool-strip-heading h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 590;
  letter-spacing: -0.03em;
}

.tool-list {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
}

.tool-list li {
  display: flex;
  min-width: 0;
  gap: 10px;
  align-items: center;
  padding: 16px 14px;
  border-left: 1px solid var(--line);
  color: var(--muted);
  outline: none;
  transition: color 180ms ease;
}

.tool-list li:hover,
.tool-list li:focus-visible {
  color: var(--accent);
}

.tool-list li:focus-visible {
  box-shadow: inset 0 0 0 1px var(--accent);
}

.tool-list svg {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  fill: currentColor;
}

.tool-list span {
  overflow: hidden;
  font-family: var(--font-geist-mono), monospace;
  font-size: 11px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- [ ] **Step 4: Add tablet and mobile styles**

Inside `@media (max-width: 900px)`, add:

```css
.tool-strip {
  grid-template-columns: 1fr;
  gap: 18px;
}

.tool-list li:first-child {
  border-left: 0;
}
```

Inside `@media (max-width: 767px)`, add:

```css
.tool-strip {
  padding-block: 28px;
}

.tool-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.tool-list li {
  border-top: 1px solid var(--line);
}

.tool-list li:nth-child(odd) {
  border-left: 0;
}
```

- [ ] **Step 5: Run targeted E2E tests**

Run: `pnpm test:e2e -- --project=desktop-chrome --grep "identity|asymmetric"`

Expected: PASS, including exactly six desktop grid columns.

Run: `pnpm test:e2e -- --project=mobile-chrome --grep "viewport|identity"`

Expected: PASS with no horizontal overflow and all six tool names visible.

- [ ] **Step 6: Commit responsive styling**

```bash
git add src/app/globals.css tests/e2e/home.spec.ts
git commit -m "style: present responsive tool logo rail"
```

### Task 5: Full verification, deployment, and Chrome-only production review

**Files:**
- Modify only if verification reveals an in-scope issue: the smallest relevant source/test file

**Interfaces:**
- Consumes: all assets, content, component, CSS, and tests from Tasks 1-4
- Produces: a production deployment of `260604.xyz` and visual evidence from the user's Chrome session

- [ ] **Step 1: Run the complete automated verification suite**

Run:

```bash
pnpm lint
pnpm test
pnpm test:worker
pnpm build
pnpm test:e2e
```

Expected: all commands exit `0`; no hydration, TypeScript, lint, contact worker, or viewport failures.

- [ ] **Step 2: Inspect the local page at desktop and mobile sizes**

Use the user's Chrome session to inspect the homepage at desktop and mobile viewport sizes. Confirm all four images are concrete and distinct, crops keep the intended subject, all six logos render accurately, and light/dark themes retain contrast. If a problem is found, make the smallest scoped correction and rerun the relevant tests.

- [ ] **Step 3: Deploy the production build**

Run:

```bash
pnpm exec vercel --prod --yes
```

Expected: Vercel reports a successful production deployment assigned to `260604.xyz`.

- [ ] **Step 4: Verify production only in Chrome**

In the user's existing Chrome browser, open `https://260604.xyz`, hard refresh once, and confirm:

```text
- The hero uses shawnnova-hero-studio-v2.webp.
- The three project cards show three different concrete work scenes.
- Codex, 飞书, GitHub, VS Code, Cloudflare, and Vercel are visible with intact icons.
- Desktop and mobile layouts have no horizontal overflow.
- The contact form, email, phone, theme behavior, and navigation remain present.
```

- [ ] **Step 5: Record final repository state**

Run:

```bash
git status --short
git log -5 --oneline
```

Expected: clean worktree and implementation commits present. Do not push to GitHub unless the user separately requests it.
