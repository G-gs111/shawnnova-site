# Shawnnova Recruiter Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing bilingual site into a recruiter-facing FDE delivery portfolio that matches the approved Option 3 visual target and proves adoption through four truthful case studies.

**Architecture:** Keep the existing Next.js App Router application and contact backend. Replace the homepage presentation layer with small semantic components backed by one typed bilingual content source; expose three featured projects plus one supporting project, while all four remain routable and participate in next-case navigation. Preserve legacy anchors, language behavior, metadata and contact delivery.

**Tech Stack:** Next.js 16, React 19, TypeScript, Geist / Geist Mono, Phosphor Icons, Vitest + Testing Library, existing Playwright specifications, Vercel frontend, unchanged Cloudflare Worker contact backend.

**Spec:** `docs/superpowers/specs/2026-09-18-recruiter-portfolio-redesign-design.md`

## Global Constraints

- The selected visual truth is `/Users/Admin/.codex/generated_images/019f7de7-b409-7c61-ad76-1f5fa712eb8a/exec-29ebeb17-dcbb-4daa-bae2-5a339253a1f9.png` at 887 × 1774 pixels.
- Public facts must match the 2026-09-18 resume and the verified Qianchuan project evidence; do not expose company, brand, creator, account or project identifiers.
- Use chalk white, graphite and signal vermilion only; no gradients, glow, glass, blue/purple AI styling, Three.js, Canvas loop, fake product screenshots or resume portrait.
- Keep `/`, `/en`, all four bilingual case routes and the legacy anchors `#about`, `#metrics`, `#proof`, `#approach`, `#work`, `#experience`, `#tools` and `#contact`.
- Keep public email `shawnnovags111@gmail.com`, phone `18379582410`, and the current Worker, D1, Turnstile and mail-delivery behavior.
- Important content must render without animation and remain readable with JavaScript unavailable; `prefers-reduced-motion` must render the final static state.
- Use only the user's Google Chrome for rendered inspection, responsive checks, interaction checks, console inspection and screenshot capture.
- Do not deploy production in this plan. Handoff a verified local preview for explicit approval first.

## File Map

- `src/content/portfolio.ts`: canonical typed bilingual facts, homepage copy, four projects and featured/supporting classification.
- `src/content/portfolio.test.ts`: content parity, metric truth, route availability, privacy and disclosure boundaries.
- `scripts/check-portfolio-content.mjs`: build-time content, anchor, privacy and dependency guardrails.
- `src/components/fde/delivery-console.tsx`: interactive but progressively readable four-stage delivery model.
- `src/components/fde/delivery-console.test.tsx`: active-stage and accessible-state behavior.
- `src/components/fde/evidence-strip.tsx`: compact proof cells for adoption and profile evidence.
- `src/components/fde/case-evidence-list.tsx`: semantic `Problem / Built / Adopted / Evidence` rows for featured work.
- `src/components/fde/case-evidence-list.test.tsx`: featured filtering, evidence labels and case links.
- `src/components/fde/portfolio-home.tsx`: approved homepage information architecture and preserved anchors.
- `src/app/page.test.tsx`: first-viewport positioning, flagship cases, profile proof, supporting system and contact behavior.
- `src/components/fde/site-nav.tsx`: rectangular publication navigation without proximity-dock behavior.
- `src/components/fde/case-page.tsx`: compact evidence-led case page shared by all four projects.
- `src/components/fde/case-page.test.tsx`: case proof, boundary, bilingual link and next-case behavior.
- `tokens.css`: canonical Option 3 color, spacing, typography and motion tokens.
- `src/app/fde-refinement.css`: the complete Option 3 visual layer for home, cases and responsive states.
- `src/app/globals.css`: remove the old global grain/dark-theme influence from the FDE surface.
- `tests/e2e/home.spec.ts`: updated browser expectations for the new information architecture.
- `design-qa.md`: source/implementation comparison history and final QA result.

---

### Task 1: Replace the public content contract with verified resume evidence

**Files:**
- Modify: `src/content/portfolio.test.ts`
- Modify: `src/content/portfolio.ts`
- Modify: `scripts/check-portfolio-content.mjs`

**Interfaces:**
- Produces: `ProjectSlug` containing four slugs, `Project.featured: boolean`, `Project.evidence`, `getFeaturedProjects(locale)`, `getSupportingProjects(locale)`.
- Produces: a five-item homepage proof array with usage/adoption evidence and compact profile credibility.
- Consumes: exact public facts and disclosure boundaries from the approved spec.

- [ ] **Step 1: Write failing content-contract tests**

Replace the stale route and metric expectations with literal, independently verified values:

```ts
it("keeps four routable cases but only three homepage flagships", () => {
  expect(projectSlugs).toEqual([
    "content-compliance",
    "script-knowledge-workflow",
    "selection-dashboard",
    "qianchuan-cockpit",
  ]);
  expect(getFeaturedProjects("zh").map((project) => project.slug)).toEqual([
    "content-compliance",
    "script-knowledge-workflow",
    "selection-dashboard",
  ]);
  expect(getSupportingProjects("zh").map((project) => project.slug)).toEqual([
    "qianchuan-cockpit",
  ]);
});

it("publishes the verified adoption evidence", () => {
  expect(getHomeContent("zh").metrics.map((item) => item.value)).toEqual([
    "112",
    "1,356",
    "89/100",
    "10",
    "1/67",
  ]);
  expect(getProject("zh", "content-compliance")?.results.map((item) => item.value)).toEqual([
    "112",
    "1,356",
    "52% → 24%",
  ]);
  expect(getProject("zh", "script-knowledge-workflow")?.results.map((item) => item.value)).toEqual([
    "89/100",
    "60min → 10min",
    "200+ / 近 300",
  ]);
  expect(getProject("zh", "selection-dashboard")?.results.map((item) => item.value)).toEqual([
    "10",
    "27/30",
    "60min → 15min",
  ]);
  expect(getProject("zh", "qianchuan-cockpit")?.results.map((item) => item.value)).toEqual([
    "4",
    "D-1",
    "171",
  ]);
});
```

Add parity tests for `evidence.problem`, `evidence.built`, `evidence.adopted`, `evidence.proof`, three result keys and all four routes. Add privacy assertions for `色彩萌宠`, `account_id`, `advertiser_id`, `access_token` and the private mailbox label.

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `pnpm vitest run src/content/portfolio.test.ts`

Expected: FAIL because the script-workflow slug, feature classification, current metrics and four-project helpers do not exist.

- [ ] **Step 3: Implement the typed content model and bilingual copy**

Use these exact additions to the public interface:

```ts
export type ProjectSlug =
  | "content-compliance"
  | "script-knowledge-workflow"
  | "selection-dashboard"
  | "qianchuan-cockpit";

export type ProjectEvidence = {
  problem: string;
  built: string;
  adopted: string;
  proof: string;
};

export type DeliveryStage = {
  title: string;
  summary: string;
  detail: string;
};

export type Project = {
  slug: ProjectSlug;
  featured: boolean;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  evidence: ProjectEvidence;
  cardFacts: Metric[];
  flow: Array<{ title: string; detail: string }>;
  decisions: Array<{ title: string; detail: string }>;
  results: Metric[];
  boundary: string;
  retrospective: string;
  status: string;
};

export function getFeaturedProjects(locale: Locale) {
  return getProjects(locale).filter((project) => project.featured);
}

export function getSupportingProjects(locale: Locale) {
  return getProjects(locale).filter((project) => !project.featured);
}
```

Insert this field between `metricsLabel` and `capabilities` in the existing `LocalizedHomeContent` type; all other existing fields remain unchanged:

```ts
delivery: {
  label: string;
  stages: [DeliveryStage, DeliveryStage, DeliveryStage, DeliveryStage];
};
```

Set the homepage Chinese hero to `业务问题，不止分析；我把它交付成系统。`, the English hero to `I turn frontline business problems into systems teams adopt.`, and publish the five proof values from Step 1. Encode the observed compliance comparison as two 50-item samples, keep the 90% selection figure explicitly tied to human-review advancement, and state that Qianchuan's core sync is live while selected WorkBuddy control capabilities remain in acceptance.

Add exactly four localized delivery stages: `进入业务 / 快速构建 / 推动上线 / 持续采用` and `Enter the workflow / Build quickly / Launch safely / Sustain adoption`. The Chinese `推动上线` detail must be `部署、异常处理与人工兜底` so the component test exercises a real user-visible outcome.

- [ ] **Step 4: Update the content checker to enforce the new contract**

Use these literal required values and keep the existing no-Three.js and route-source checks:

```js
const requiredContent = [
  "业务问题，不止分析；我把它交付成系统。",
  "I turn frontline business problems into systems teams adopt.",
  "script-knowledge-workflow",
  "429",
  "1,356",
  "89/100",
  "27/30",
  "部分 WorkBuddy 控制能力仍在验收",
  "selected WorkBuddy control capabilities remain in acceptance",
];

const forbidden = [
  "色彩萌宠",
  "advertiser_id",
  "account_id",
  "access_token",
];
```

- [ ] **Step 5: Run content tests and guardrails**

Run: `pnpm vitest run src/content/portfolio.test.ts && pnpm check:content`

Expected: PASS with four routable cases, three flagships, exact metrics and no private identifiers.

- [ ] **Step 6: Commit the content contract**

```bash
git add src/content/portfolio.ts src/content/portfolio.test.ts scripts/check-portfolio-content.mjs
git commit -m "feat: align portfolio evidence with verified resume"
```

---

### Task 2: Build the semantic Delivery Console and proof strip

**Files:**
- Create: `src/components/fde/delivery-console.test.tsx`
- Create: `src/components/fde/delivery-console.tsx`
- Create: `src/components/fde/evidence-strip.tsx`

**Interfaces:**
- Consumes: `LocalizedHomeContent["delivery"]`, `Metric[]`, `Locale`.
- Produces: `DeliveryConsole({ stages, locale })` and `EvidenceStrip({ metrics, label })`.
- Guarantees: every stage and proof value exists in initial HTML; active state is additional interaction, not a content dependency.

- [ ] **Step 1: Write the failing Delivery Console behavior test**

```tsx
it("shows every delivery stage and changes the current step by click", () => {
  const stages = getHomeContent("zh").delivery.stages;
  render(<DeliveryConsole stages={stages} locale="zh" />);

  expect(screen.getAllByRole("listitem")).toHaveLength(4);
  expect(screen.getByRole("button", { name: /进入业务/ })).toHaveAttribute(
    "aria-current",
    "step",
  );

  fireEvent.click(screen.getByRole("button", { name: /推动上线/ }));
  expect(screen.getByRole("button", { name: /推动上线/ })).toHaveAttribute(
    "aria-current",
    "step",
  );
  expect(screen.getByText("部署、异常处理与人工兜底")).toBeVisible();
});
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `pnpm vitest run src/components/fde/delivery-console.test.tsx`

Expected: FAIL because `DeliveryConsole` and `homeContent.delivery` do not exist.

- [ ] **Step 3: Implement the console with real Phosphor icons**

Create a four-step ordered list using `MagnifyingGlass`, `BracketsCurly`, `RocketLaunch` and `ArrowsClockwise` from `@phosphor-icons/react`. Each button contains its number, title, summary and detail; React state changes only `aria-current` and the visual class:

```tsx
const [activeIndex, setActiveIndex] = useState(0);

return (
  <section className="fde-delivery-console" aria-label={label}>
    <header>
      <span>{locale === "zh" ? "交付控制台" : "Delivery console"}</span>
      <strong>{locale === "zh" ? "从问题到采用" : "From problem to adoption"}</strong>
    </header>
    <ol>
      {stages.map((stage, index) => (
        <li className={index === activeIndex ? "is-active" : ""} key={stage.title}>
          <button
            type="button"
            aria-current={index === activeIndex ? "step" : undefined}
            onClick={() => setActiveIndex(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage.title}</strong>
            <small>{stage.summary}</small>
            <p>{stage.detail}</p>
          </button>
        </li>
      ))}
    </ol>
  </section>
);
```

- [ ] **Step 4: Implement the server-rendered proof strip**

```tsx
export function EvidenceStrip({ metrics, label }: { metrics: Metric[]; label: string }) {
  return (
    <section className="fde-evidence-strip" aria-label={label}>
      {metrics.map((metric, index) => (
        <article key={metric.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{metric.value}</strong>
          <p>{metric.label}</p>
          {metric.note ? <small>{metric.note}</small> : null}
        </article>
      ))}
    </section>
  );
}
```

- [ ] **Step 5: Run the component and content suites**

Run: `pnpm vitest run src/components/fde/delivery-console.test.tsx src/content/portfolio.test.ts`

Expected: PASS; the active state changes, while all stage copy remains present.

- [ ] **Step 6: Commit the hero instruments**

```bash
git add src/components/fde/delivery-console.tsx src/components/fde/delivery-console.test.tsx src/components/fde/evidence-strip.tsx src/content/portfolio.ts
git commit -m "feat: add semantic delivery console"
```

---

### Task 3: Replace the project signal stack with structured evidence rows

**Files:**
- Create: `src/components/fde/case-evidence-list.test.tsx`
- Create: `src/components/fde/case-evidence-list.tsx`
- Modify: `src/components/fde/portfolio-home.tsx`
- Modify: `src/components/fde/site-nav.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `getFeaturedProjects(locale)`, `getSupportingProjects(locale)`, the delivery console and evidence strip from Task 2.
- Produces: a homepage with three featured case rows, one supporting Qianchuan row and all legacy anchors.
- Keeps: the existing `ContactBlock` props and endpoint behavior unchanged.

- [ ] **Step 1: Write the failing evidence-row test**

```tsx
it("renders three featured cases with the four-part evidence contract", () => {
  render(
    <CaseEvidenceList
      projects={getFeaturedProjects("zh")}
      locale="zh"
      routePrefix=""
      viewCaseLabel="查看完整案例"
    />,
  );

  expect(screen.getAllByRole("article")).toHaveLength(3);
  for (const label of ["问题", "构建", "采用", "证据"]) {
    expect(screen.getAllByText(label)).toHaveLength(3);
  }
  expect(screen.getByRole("link", { name: /内容合规检测助手/ })).toHaveAttribute(
    "href",
    "/projects/content-compliance",
  );
  expect(screen.queryByText("多品牌千川数据驾驶舱")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `pnpm vitest run src/components/fde/case-evidence-list.test.tsx`

Expected: FAIL because the structured evidence component does not exist.

- [ ] **Step 3: Implement the evidence list as semantic articles**

Use a `dl` inside each article so mobile can stack the same labeled information without losing column meaning. Use `ArrowUpRight` from Phosphor for the case link. Do not use tabs, hidden diagnostic panels or a sticky selector.

```tsx
const labels = locale === "zh"
  ? { problem: "问题", built: "构建", adopted: "采用", proof: "证据" }
  : { problem: "Problem", built: "Built", adopted: "Adopted", proof: "Evidence" };

const fields = ["problem", "built", "adopted", "proof"] as const;
```

Render each field as `<div><dt>{labels[field]}</dt><dd>{project.evidence[field]}</dd></div>` and keep the title link always visible.

- [ ] **Step 4: Write failing homepage composition assertions**

Update `src/app/page.test.tsx` to assert:

```tsx
expect(screen.getByRole("heading", {
  level: 1,
  name: "业务问题，不止分析；我把它交付成系统。",
})).toBeInTheDocument();

for (const value of ["112", "1,356", "89/100", "10", "1/67"]) {
  expect(within(screen.getByRole("region", { name: "成果证据" })).getByText(value)).toBeInTheDocument();
}

for (const title of [
  "内容合规检测助手",
  "脚本知识库与 AI 生成工作流",
  "宠物品类选品监测与辅助决策",
]) {
  expect(screen.getByRole("heading", { level: 3, name: title })).toBeInTheDocument();
}

expect(screen.getByRole("heading", { level: 3, name: "多品牌千川数据驾驶舱" })).toBeInTheDocument();
expect(screen.getByText("武汉科技大学")).toBeInTheDocument();
expect(screen.getByText("2027 届")).toBeInTheDocument();
```

Keep the existing public email and telephone assertions, and keep the old-anchor loop.

- [ ] **Step 5: Run the homepage test and confirm the expected failure**

Run: `pnpm vitest run src/app/page.test.tsx`

Expected: FAIL because the old canvas hero, stale proof values and old project component are still rendered.

- [ ] **Step 6: Compose the approved homepage**

In `PortfolioHome`:

1. Replace `NetworkCanvas` with `DeliveryConsole`.
2. Replace the metric articles with `EvidenceStrip` while retaining `id="metrics"` and the `id="proof"` alias.
3. Render `CaseEvidenceList` with only `getFeaturedProjects(locale)`.
4. Use four delivery-method steps: `进入业务 / 快速构建 / 推动上线 / 持续采用` and their English equivalents.
5. Render compact profile proof for education, rank, awards and 20+ training cases/SOPs inside `#experience`.
6. Render Qianchuan as the single supporting system inside `#tools`, followed by the existing stage-organized tool pipeline.
7. Keep `ContactBlock` untouched.

Simplify `SiteNav` by removing pointer-distance math, inline `--dock-strength`, and the floating dock behavior. Keep the wordmark, three anchors, language switch and contact CTA.

- [ ] **Step 7: Run homepage, navigation and contact regression tests**

Run: `pnpm vitest run src/app/page.test.tsx src/components/active-nav.test.tsx src/components/contact-form.test.tsx src/components/fde/delivery-pipeline.test.tsx src/components/fde/case-evidence-list.test.tsx`

Expected: PASS with preserved anchors and unchanged contact behavior.

- [ ] **Step 8: Commit the homepage structure**

```bash
git add src/components/fde/case-evidence-list.tsx src/components/fde/case-evidence-list.test.tsx src/components/fde/portfolio-home.tsx src/components/fde/site-nav.tsx src/app/page.test.tsx
git commit -m "feat: rebuild portfolio homepage around evidence"
```

---

### Task 4: Rebuild all four case pages around proof and boundaries

**Files:**
- Create: `src/components/fde/case-page.test.tsx`
- Modify: `src/components/fde/case-page.tsx`
- Verify: `src/app/projects/[slug]/page.tsx`
- Verify: `src/app/en/projects/[slug]/page.tsx`

**Interfaces:**
- Consumes: all four projects from `getProjects(locale)` and each project's `evidence`, `results`, `flow`, `decisions`, `boundary`, `retrospective` and `status`.
- Produces: compact case heroes and a four-project next-case cycle.
- Keeps: route-aware language switching and canonical/hreflang metadata from the existing dynamic route files.

- [ ] **Step 1: Write the failing case-page tests**

```tsx
it("puts verified results and delivery status above the workflow", () => {
  const project = getProject("zh", "content-compliance")!;
  render(<CasePage locale="zh" project={project} />);

  expect(screen.getByRole("heading", { level: 1, name: project.title })).toBeInTheDocument();
  expect(screen.getByText("已上线并持续使用")).toBeInTheDocument();
  for (const value of ["112", "1,356", "52% → 24%"]) {
    expect(screen.getByText(value)).toBeInTheDocument();
  }
  expect(screen.getByRole("heading", { name: "证据边界" })).toBeInTheDocument();
  expect(screen.getByText(/两个独立的 50 条样本/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /脚本知识库与 AI 生成工作流/ })).toHaveAttribute(
    "href",
    "/projects/script-knowledge-workflow",
  );
});

it("keeps the equivalent English case route in the language switch", () => {
  render(<CasePage locale="zh" project={getProject("zh", "selection-dashboard")!} />);
  expect(screen.getByRole("link", { name: "EN" })).toHaveAttribute(
    "href",
    "/en/projects/selection-dashboard",
  );
});
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `pnpm vitest run src/components/fde/case-page.test.tsx`

Expected: FAIL because results are below the workflow, the evidence-boundary heading is absent and the next case is still based on three projects.

- [ ] **Step 3: Implement the compact evidence-led case page**

Order the page exactly as follows:

1. back link, case number/category, title, summary and delivery status;
2. a three-cell results strip;
3. `Problem / Built / Adopted / Evidence` overview;
4. anonymized semantic workflow with the existing `SystemDiagram`;
5. decisions and trade-offs;
6. `证据边界 / Evidence boundary` and `复盘 / Retrospective`;
7. next-case link and contact action.

Keep `getProjects(locale)` for the next-case calculation so the four routes cycle in this order: compliance → script workflow → selection → Qianchuan → compliance.

- [ ] **Step 4: Verify the dynamic routes expose four static params**

Add direct tests only if route logic changes. Otherwise run the content suite and inspect the existing `generateStaticParams()` implementation, which maps the shared `projectSlugs` array. The new slug should therefore be generated in both locale trees without route duplication.

- [ ] **Step 5: Run case and content tests**

Run: `pnpm vitest run src/components/fde/case-page.test.tsx src/content/portfolio.test.ts`

Expected: PASS for four-case cycling, result evidence, disclosure boundaries and bilingual route preservation.

- [ ] **Step 6: Commit the case-page narrative**

```bash
git add src/components/fde/case-page.tsx src/components/fde/case-page.test.tsx
git commit -m "feat: rebuild case pages around delivery evidence"
```

---

### Task 5: Apply the Option 3 visual system and responsive behavior

**Files:**
- Modify: `tokens.css`
- Modify: `src/app/fde-refinement.css`
- Modify: `src/app/globals.css`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes: stable semantic classes from Tasks 2–4.
- Produces: visual fidelity to the selected 887 × 1774 target and usable layouts at 320, 375, 768, 1280 and 1920px.
- Uses: real Phosphor icons already supplied by components; no handcrafted SVG/CSS illustration or generated raster asset.

- [ ] **Step 1: Update the browser specification before the CSS implementation**

Rewrite stale expectations around the observable new experience:

```ts
test("presents recruiter evidence and all four case routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", {
    name: "业务问题，不止分析；我把它交付成系统。",
  })).toBeVisible();
  await expect(page.getByRole("region", { name: "成果证据" })).toContainText("1,356");
  await expect(page.locator(".fde-case-evidence-row")).toHaveCount(3);
  await expect(page.locator(".fde-supporting-system")).toContainText("4 个活跃账户");
  await expect(page.getByRole("link", { name: /脚本知识库与 AI 生成工作流/ })).toHaveAttribute(
    "href",
    "/projects/script-knowledge-workflow",
  );
});

test("keeps the page within a 320px viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator("#contact")).toBeVisible();
});
```

Preserve the existing contact-submission contract and reduced-motion coverage, updating selectors only where the public structure changed.

- [ ] **Step 2: Replace the canonical token values**

Set these exact values in `tokens.css`:

```css
:root {
  --color-paper: oklch(98.2% 0.003 80);
  --color-paper-2: oklch(96.2% 0.006 75);
  --color-paper-3: oklch(92.8% 0.008 72);
  --color-ink: oklch(18% 0.008 55);
  --color-ink-2: oklch(40% 0.012 55);
  --color-muted: oklch(46% 0.012 55);
  --color-rule: oklch(84% 0.008 70);
  --color-rule-strong: oklch(66% 0.012 60);
  --color-accent: oklch(60% 0.18 35);
  --color-accent-strong: oklch(48% 0.17 34);
  --color-accent-soft: oklch(93% 0.035 45);
  --color-focus: oklch(48% 0.17 34);
  --color-dark: oklch(17% 0.008 55);
  --color-dark-raised: oklch(22% 0.01 55);
  --color-on-dark: oklch(96% 0.005 80);
  --color-on-dark-muted: oklch(78% 0.008 75);
}
```

Retain the existing 4px spacing scale, Geist roles and tabular numeric treatment. Remove the copper aliases and ensure all site selectors use the canonical token names.

- [ ] **Step 3: Implement the desktop composition in `fde-refinement.css`**

Match the source hierarchy with these layout contracts:

```css
.fde-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(24rem, 0.92fr);
  min-height: min(46rem, calc(100svh - 5rem));
  border-bottom: 1px solid var(--color-rule-strong);
}

.fde-evidence-strip {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border-block: 1px solid var(--color-rule-strong);
}

.fde-case-evidence-row {
  display: grid;
  grid-template-columns: minmax(12rem, 0.9fr) minmax(0, 2.1fr);
  border-top: 1px solid var(--color-rule-strong);
}

.fde-case-evidence-row dl {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.fde-contact {
  color: var(--color-on-dark);
  background: var(--color-dark);
}
```

Use square or 4px radii, hairline rules, large editorial type and no shadows except a minimal focus affordance. Vermilion may mark the primary CTA, current delivery step, active rule and verified status only.

- [ ] **Step 4: Remove legacy visual interference**

Disable the old page-grain pseudo-element for the FDE application, remove the automatic dark-theme palette from the portfolio surface, and ensure helper/privacy/form text on graphite uses `--color-on-dark-muted` at 14px minimum. Remove styles for the floating proximity dock and Canvas hero from the active refinement layer; leave old component source files unmodified and unused.

- [ ] **Step 5: Implement tablet, mobile and reduced-motion rules**

At `max-width: 900px`, stack hero columns, make the proof strip two columns plus a full-width final cell, stack each evidence row, and reduce the case hero to normal document flow. At `max-width: 560px`, use one proof column where labels wrap, keep all content within `calc(100% - 32px)`, and ensure contact controls and navigation targets are at least 44px tall. At `prefers-reduced-motion: reduce`, remove transforms and transitions from console, rows, links and navigation.

- [ ] **Step 6: Run non-browser verification**

Run: `pnpm test && pnpm check:content && pnpm lint && pnpm build && pnpm build:sites`

Expected: all commands exit 0; production and static-compatible builds include all eight localized project paths.

- [ ] **Step 7: Commit the visual system**

```bash
git add tokens.css src/app/fde-refinement.css src/app/globals.css tests/e2e/home.spec.ts
git commit -m "feat: apply precision delivery portfolio design"
```

---

### Task 6: Verify in the user's Chrome and complete design QA

**Files:**
- Modify: `design-qa.md`
- Modify only if findings require fixes: relevant files from Tasks 1–5

**Interfaces:**
- Consumes: the selected Option 3 image and the locally rendered implementation.
- Produces: a `design-qa.md` whose final line is exactly `final result: passed`, plus a running local preview opened in the user's Chrome.

- [ ] **Step 1: Start the local production-like preview**

Run: `pnpm dev -- --hostname 127.0.0.1 --port 3000`

Expected: the Next.js server remains available at `http://127.0.0.1:3000` without startup errors.

- [ ] **Step 2: Open and inspect the implementation only in the user's Google Chrome**

Use the native Google Chrome application through Computer Use. Open `/`, `/en`, the four Chinese case routes and the four English case routes. Verify navigation, language preservation, case links, next-case cycling, mail/telephone links and contact-form visible states. Do not submit a real contact message during this visual pass.

- [ ] **Step 3: Check five responsive widths and reduced motion**

In Chrome inspect 320, 375, 768, 1280 and 1920px widths. Confirm no horizontal overflow, all content remains available without animation, keyboard focus is visible, helper text remains readable on graphite, and the console does not hide information. Use Chrome DevTools to emulate `prefers-reduced-motion: reduce`.

- [ ] **Step 4: Capture source and implementation at the same comparison size**

Open the 887 × 1774 source target and capture the implementation homepage at an 887px CSS width and equivalent top-to-bottom state. Create a single side-by-side comparison image from those two already-existing captures; do not alter their content or generate replacement artwork.

- [ ] **Step 5: Write the first design-QA report**

Record source path, implementation screenshot path, viewport, pixel dimensions, density, state, full-page evidence and focused comparisons for hero/console, evidence strip, one case row and contact band. Explicitly score typography, spacing, colors, asset/icon fidelity and copy. Mark every visible mismatch P0–P3.

- [ ] **Step 6: Fix every P0, P1 and P2 finding and repeat the visual comparison**

For each behavior change, write and fail the focused test before changing production code. For CSS-only fidelity fixes, capture the revised Chrome view and record the before/after evidence in `design-qa.md`. Continue until no P0/P1/P2 remains; retain P3 items only as optional polish.

- [ ] **Step 7: Run the final automated verification**

Run: `pnpm test && pnpm check:content && pnpm lint && pnpm build && pnpm build:sites`

Expected: every command exits 0 after all design-QA fixes.

- [ ] **Step 8: Complete the QA record and commit**

End `design-qa.md` with:

```text
final result: passed
```

Then commit the report and any verified fixes:

```bash
git add design-qa.md src tests tokens.css
git commit -m "test: verify recruiter portfolio redesign"
```

- [ ] **Step 9: Handoff without production deployment**

Keep the local preview running and open in the user's Chrome. Report the verified routes, automated commands, Chrome viewports, remaining P3 polish if any, and the feature-branch name. Ask for explicit approval before merging or deploying to the production Vercel domain.
