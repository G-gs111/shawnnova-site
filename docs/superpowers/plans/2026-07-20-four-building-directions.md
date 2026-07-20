# Four Building Directions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic three-item “正在构建” section with Shawnnova's four approved directions in a focused one-main-three-support layout, then publish and verify the result on `260604.xyz`.

**Architecture:** Keep the current data-driven `siteContent.work` model and generic `WorkSection` renderer. Add two locally hosted editorial photographs, update the four content records, and express the new hierarchy entirely through the existing work-grid CSS so mobile reading order remains identical to source order.

**Tech Stack:** Next.js 16, React 19, TypeScript, native CSS Grid, Next Image, Vitest, Testing Library, Playwright, Sharp, Vercel

## Global Constraints

- The exact order is “带货短视频达人工具网站”, “AI 混剪工具”, “个人站开发”, “企业自动化工作流开发”.
- Desktop uses one featured card plus a supporting cluster whose first card spans the cluster and whose remaining two cards sit side by side.
- Viewports below 768px show all four projects in a single column without horizontal overflow.
- Four projects use four distinct local image paths; the commerce and automation images are new, while the video-workflow and desktop-product images are reused.
- Generated images contain no readable brand names, third-party logos, watermarks, garbled text, or clear fictional faces.
- Preserve the rest of the site, including contact details, contact form, tool strip, navigation, theme switching, typography, cobalt accent, and rounded-corner system.
- Browser verification and production operations use the user's Google Chrome only.

---

### Task 1: Add the two project photographs

**Files:**
- Create: `public/images/shawnnova-commerce-creator-v2.webp`
- Create: `public/images/shawnnova-business-automation-v2.webp`

**Interfaces:**
- Produces: two optimized local image paths consumed by `siteContent.work`

- [x] **Step 1: Generate the commerce creator photograph**

Use the image generation tool with this exact direction:

```text
Photorealistic editorial documentary photograph for a Chinese independent developer portfolio. A creator's hands arrange a small unbranded product sample beside a smartphone showing several vertical short-video frames and a laptop showing a clean storyboard/timeline structure. The scene communicates product selection, script planning, asset organization, and turning a product into a finished commerce video. Natural window light, restrained cool-gray and off-white desk, one small cobalt-blue accent object, credible everyday equipment, calm focused atmosphere. No visible face, no readable text, no logos, no platform marks, no watermark, no neon, no floating holograms. Landscape 3:2 composition, important phone, product and hands grouped near the center so a square crop and a mobile 4:3 crop both remain clear.
```

- [x] **Step 2: Inspect the generated commerce image**

Verify visually that the product, phone, hands, and editing/storyboard context are clear and centered, with no readable text, logos, watermark, malformed hands, or face.

- [x] **Step 3: Generate the enterprise automation photograph**

Use the image generation tool with this exact direction:

```text
Photorealistic editorial documentary photograph for a Chinese independent developer portfolio. Three-quarter view of a realistic work desk where a person's hand maps an enterprise automation workflow. A monitor shows a clean non-readable node flow connecting a form, table, message, and document modules; paper beside it carries simple boxes and arrows. Natural soft daylight, restrained cool-gray and off-white palette, one subtle cobalt-blue accent, practical modern equipment, calm precise atmosphere. No visible face, no readable text, no logos, no third-party brand marks, no watermark, no neon, no floating holograms. Landscape 3:2 composition, workflow nodes and hand concentrated near the center so desktop and mobile crops stay understandable.
```

- [x] **Step 4: Inspect the generated automation image**

Verify visually that the workflow-node structure and the human action are clear and centered, with no readable text, logos, watermark, malformed hand, or face.

- [x] **Step 5: Convert both approved source images to optimized WebP**

Run the Sharp conversion with each generated source path substituted as the first argument:

```bash
node -e 'const sharp=require("./node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"); const [input,output]=process.argv.slice(1); sharp(input).rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:84,smartSubsample:true}).toFile(output)' GENERATED_COMMERCE.png public/images/shawnnova-commerce-creator-v2.webp
node -e 'const sharp=require("./node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"); const [input,output]=process.argv.slice(1); sharp(input).rotate().resize({width:1800,withoutEnlargement:true}).webp({quality:84,smartSubsample:true}).toFile(output)' GENERATED_AUTOMATION.png public/images/shawnnova-business-automation-v2.webp
```

Expected: both files exist, are valid WebP images, are no wider than 1800 pixels, and are each below 300 KB.

- [x] **Step 6: Commit the image assets**

```bash
git add public/images/shawnnova-commerce-creator-v2.webp public/images/shawnnova-business-automation-v2.webp
git commit -m "feat: add imagery for new building directions"
```

### Task 2: Replace the work-section content using TDD

**Files:**
- Modify: `src/content/site.test.ts`
- Modify: `src/app/page.test.tsx`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `src/content/site.ts`

**Interfaces:**
- Produces: `siteContent.work`, a four-item readonly array consumed unchanged by `WorkSection`

- [ ] **Step 1: Write failing content and page tests**

Change the work assertions to require exactly these titles and image paths:

```ts
expect(siteContent.work.map((item) => item.title)).toEqual([
  "带货短视频达人工具网站",
  "AI 混剪工具",
  "个人站开发",
  "企业自动化工作流开发",
]);
expect(siteContent.work.map((item) => item.image)).toEqual([
  "/images/shawnnova-commerce-creator-v2.webp",
  "/images/shawnnova-video-workflow-v2.webp",
  "/images/shawnnova-desktop-product-v2.webp",
  "/images/shawnnova-business-automation-v2.webp",
]);
expect(new Set(siteContent.work.map((item) => item.image)).size).toBe(4);
```

Update the page test to query all four titles and update the first Playwright test to require all four titles inside `#work`.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
pnpm test src/content/site.test.ts src/app/page.test.tsx
```

Expected: FAIL because `siteContent.work` still contains the previous three records.

- [ ] **Step 3: Implement the four approved content records**

Replace `siteContent.work` with:

```ts
work: [
  {
    title: "带货短视频达人工具网站",
    description: "围绕选品、脚本、素材组织和视频生成，帮助带货达人更快完成从商品到成片的工作。",
    kind: "主攻方向",
    image: "/images/shawnnova-commerce-creator-v2.webp",
    alt: "创作者在桌面上整理商品样品、手机短视频素材和分镜流程",
  },
  {
    title: "AI 混剪工具",
    description: "把素材拆分、智能重组、字幕和批量导出串成更高效的混剪流程。",
    kind: "视频效率",
    image: "/images/shawnnova-video-workflow-v2.webp",
    alt: "创作者在桌面屏幕上调整视频时间线、素材片段和字幕轨道",
  },
  {
    title: "个人站开发",
    description: "从内容结构、视觉设计到部署上线，做清晰、快速、便于联系的个人网站。",
    kind: "网站交付",
    image: "/images/shawnnova-desktop-product-v2.webp",
    alt: "桌面中的网站界面与纸质内容结构草图组成开发现场",
  },
  {
    title: "企业自动化工作流开发",
    description: "连接表单、数据、消息和常用业务工具，减少重复操作与人工搬运。",
    kind: "企业效率",
    image: "/images/shawnnova-business-automation-v2.webp",
    alt: "创作者在显示器和纸面草图上梳理企业自动化流程节点",
  },
],
```

- [ ] **Step 4: Run the focused tests and verify GREEN**

Run:

```bash
pnpm test src/content/site.test.ts src/app/page.test.tsx
```

Expected: both test files pass.

- [ ] **Step 5: Commit the content change**

```bash
git add src/content/site.ts src/content/site.test.ts src/app/page.test.tsx tests/e2e/home.spec.ts
git commit -m "feat: present four active building directions"
```

### Task 3: Implement the responsive one-main-three-support layout using TDD

**Files:**
- Modify: `tests/e2e/home.spec.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: four `#work article` elements rendered in source order
- Produces: two-column supporting grid on desktop and single-column project flow below 768px

- [ ] **Step 1: Write a failing desktop and mobile layout test**

Add assertions that desktop renders four articles, two supporting columns, and a full-row first supporting card:

```ts
await expect(page.locator("#work article")).toHaveCount(4);
const supportingColumns = await page.locator(".work-supporting").evaluate((element) =>
  getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
);
expect(supportingColumns).toHaveLength(2);
const firstSupporting = page.locator(".work-supporting > div").first();
await expect(firstSupporting).toHaveCSS("grid-column-start", "1");
await expect(firstSupporting).toHaveCSS("grid-column-end", "-1");
```

In the mobile viewport test, require one supporting column and an automatic column placement for the first supporting card:

```ts
const mobileSupportingColumns = await page.locator(".work-supporting").evaluate((element) =>
  getComputedStyle(element).gridTemplateColumns.split(" ").filter(Boolean),
);
expect(mobileSupportingColumns).toHaveLength(1);
await expect(page.locator(".work-supporting > div").first()).toHaveCSS(
  "grid-column-start",
  "auto",
);
```

- [ ] **Step 2: Run the layout test and verify RED**

Run:

```bash
pnpm test:e2e --grep "asymmetric experience rail|mobile viewport"
```

Expected: desktop FAIL because `.work-supporting` currently has only one column above 900px and its first child does not span columns.

- [ ] **Step 3: Implement the grid hierarchy**

Update the desktop rules to:

```css
.work-grid {
  grid-template-columns: minmax(0, 1.3fr) minmax(420px, 0.95fr);
}

.work-supporting {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-content: start;
}

.work-supporting > div:first-child {
  grid-column: 1 / -1;
}

.work-supporting > div:not(:first-child) .work-image-small {
  aspect-ratio: 4 / 3;
}
```

Keep the existing `max-width: 900px` one-column outer work grid and two-column supporting cluster. At `max-width: 767px`, reset `.work-supporting > div:first-child { grid-column: auto; }` and keep every work image at `4 / 3`.

Remove the old `.crop-2 img` override because the new centered automation image should retain its center crop.

- [ ] **Step 4: Run the layout test and verify GREEN**

Run:

```bash
pnpm test:e2e --grep "asymmetric experience rail|mobile viewport"
```

Expected: desktop and mobile variants pass with no horizontal overflow.

- [ ] **Step 5: Commit the layout change**

```bash
git add src/app/globals.css tests/e2e/home.spec.ts
git commit -m "style: arrange four building directions"
```

### Task 4: Verify, integrate, deploy, and inspect production

**Files:**
- Verify: all source, tests, images, and deployment configuration

**Interfaces:**
- Produces: the live site at `https://260604.xyz` with the approved four-direction section

- [ ] **Step 1: Run the complete automated verification suite**

Run:

```bash
pnpm lint
pnpm test
pnpm test:worker
pnpm build
pnpm test:e2e
```

Expected: lint succeeds; 18 or more unit tests pass; seven worker tests pass; production build succeeds; all applicable desktop and mobile Playwright tests pass.

- [ ] **Step 2: Run the design and copy pre-flight audit**

Inspect all visible strings and responsive states. Confirm zero em-dashes in visible content, one cobalt accent system, consistent corner radii, readable light/dark themes, no overflowing CTA or project title, no horizontal overflow, motivated reduced-motion-safe transitions, four real project images, and no generated-image text or logo artifacts.

- [ ] **Step 3: Inspect the branch and merge it locally into main**

Confirm the worktree is clean and review the branch diff. Merge `feat/editorial-imagery` into `main` using a normal non-destructive merge from `/Users/Admin/Documents/Development-try/shawnnova-site`.

- [ ] **Step 4: Confirm the existing Vercel project and deploy production**

Use the existing `shawnnova-site` Vercel project. Do not create a second project. Deploy the merged main checkout with:

```bash
pnpm exec vercel --prod --yes
```

Expected: Vercel reports a successful production deployment associated with `260604.xyz`.

- [ ] **Step 5: Verify production only in the user's Google Chrome**

Open `https://260604.xyz` in the user's existing Chrome, hard refresh, and confirm:

- the work section contains exactly the four approved titles in order;
- the commerce card is the featured project;
- the desktop supporting cluster uses one full-width card plus two smaller side-by-side cards;
- images load with no broken resources;
- mobile responsive emulation collapses the four projects to one column without overflow;
- contact links and the visitor contact form remain present;
- both light and dark theme states remain readable.

- [ ] **Step 6: Record completion evidence**

Capture final test counts, build result, deployed production URL, commit hash, and Chrome verification result before marking the goal complete.
