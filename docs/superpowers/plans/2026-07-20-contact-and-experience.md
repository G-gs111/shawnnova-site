# Contact and Experience Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Shawnnova's cross-functional experience, motto, direct contact information, and a production contact form that stores leads in Cloudflare D1 and notifies a verified QQ mailbox.

**Architecture:** The Next.js page gains a server-rendered experience section and a small client-side contact form. A separate Cloudflare Worker validates Turnstile, writes each accepted lead to D1, and sends a structured email through a restricted email binding. Vercel continues to host the portfolio while Cloudflare hosts the form API at `contact-api.260604.xyz`.

**Tech Stack:** Next.js 16, React 19, TypeScript, native CSS, Motion, Vitest, Testing Library, Playwright, Cloudflare Workers, D1, Turnstile, Email Service, Wrangler.

## Global Constraints

- Public email is exactly `shawnnovags111@gmail.com`.
- Public phone number is exactly `18379582410`.
- Notification destination is exactly `2797375316@qq.com` and must not appear in public page markup.
- Motto is exactly `功不唐捐，玉汝于成`.
- Experience directions are `运营`, `销售`, `产品开发`, and `Vibe Coding` with no fabricated employers, dates, titles, or metrics.
- Only `https://260604.xyz`, `https://www.260604.xyz`, and configured local test origins may call the production API.
- D1 must not store IP addresses, browser fingerprints, or user-agent strings.
- The form must preserve typed values after retryable errors and expose direct email and phone fallbacks.
- Existing light/dark themes, responsive behavior, reduced-motion support, and editorial visual language must remain intact.

---

## File Structure

- Modify `src/content/site.ts`: own all public identity, experience, and contact copy.
- Create `src/components/experience-section.tsx`: render the four-part editorial experience sequence.
- Modify `src/app/page.tsx`: insert the experience section in the page flow.
- Modify `src/components/site-header.tsx`: render the updated navigation and direct email header action.
- Create `src/lib/contact.ts`: define browser-side form values and deterministic validation.
- Create `src/components/contact-form.tsx`: own form state, submission, Turnstile integration, and status UI.
- Modify `src/components/contact-section.tsx`: compose direct contact routes with `ContactForm`.
- Modify `src/app/globals.css`: style the experience and contact compositions with explicit mobile fallbacks.
- Modify `src/app/page.test.tsx`, `src/content/site.test.ts`, and `tests/e2e/home.spec.ts`: verify public content and browser behavior.
- Create `worker/src/contracts.ts`: define Worker request, environment, D1, and email interfaces.
- Create `worker/src/validation.ts`: parse and validate untrusted request data.
- Create `worker/src/index.ts`: handle CORS, Turnstile, D1 insertion, email notification, and status responses.
- Create `worker/schema.sql`: create the `leads` table and timestamp index.
- Create `worker/wrangler.jsonc`: declare D1, Turnstile secret, and restricted email bindings.
- Create `worker/vitest.config.ts` and `worker/src/index.test.ts`: test Worker behavior without live services.
- Modify `package.json`, `pnpm-lock.yaml`, and `tsconfig.json`: add Worker scripts and isolate Worker types from the Next.js build.

---

### Task 1: Public Content and Experience Narrative

**Files:**
- Modify: `src/content/site.ts`
- Create: `src/components/experience-section.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/site-header.tsx`
- Test: `src/content/site.test.ts`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Produces: `siteContent.identity.motto: string`
- Produces: `siteContent.experience: readonly { title: string; description: string }[]`
- Produces: `siteContent.contact.email`, `phone`, and `github`
- Produces: `<ExperienceSection />` with `id="experience"`

- [ ] **Step 1: Write failing content and page tests**

Add assertions that require the supplied motto, all four experience labels, `mailto:shawnnovags111@gmail.com`, `tel:18379582410`, and `#experience`.

```tsx
expect(siteContent.identity.motto).toBe("功不唐捐，玉汝于成");
expect(siteContent.experience.map((item) => item.title)).toEqual([
  "运营",
  "销售",
  "产品开发",
  "Vibe Coding",
]);
expect(screen.getByRole("link", { name: /shawnnovags111@gmail.com/i })).toHaveAttribute(
  "href",
  "mailto:shawnnovags111@gmail.com",
);
expect(screen.getByRole("link", { name: /18379582410/ })).toHaveAttribute(
  "href",
  "tel:18379582410",
);
expect(document.querySelector("#experience")).toBeInTheDocument();
```

- [ ] **Step 2: Run tests and verify the expected failure**

Run: `pnpm vitest run src/content/site.test.ts src/app/page.test.tsx`

Expected: FAIL because `motto`, `experience`, direct contact links, and `#experience` do not exist.

- [ ] **Step 3: Implement the content contract and experience section**

Use the exact experience copy from the approved design and update the hero introduction. Render each experience item as a numbered article inside `#experience`. Update the header action from GitHub to a direct email link.

```tsx
export function ExperienceSection() {
  return (
    <section className="experience-section section-shell" id="experience">
      <div className="experience-intro">
        <p className="section-kicker">复合经验</p>
        <h2>从市场一线，到产品落地。</h2>
      </div>
      <div className="experience-list">
        {siteContent.experience.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run tests and verify green**

Run: `pnpm vitest run src/content/site.test.ts src/app/page.test.tsx`

Expected: both files pass.

- [ ] **Step 5: Commit the content slice**

```bash
git add src/content/site.ts src/components/experience-section.tsx src/app/page.tsx src/components/site-header.tsx src/content/site.test.ts src/app/page.test.tsx
git commit -m "feat: add Shawnnova experience and direct contact content"
```

---

### Task 2: Contact Form Validation and Client Experience

**Files:**
- Create: `src/lib/contact.ts`
- Create: `src/lib/contact.test.ts`
- Create: `src/components/contact-form.tsx`
- Create: `src/components/contact-form.test.tsx`
- Modify: `src/components/contact-section.tsx`

**Interfaces:**
- Produces: `ContactValues = { name: string; contact: string; message: string; consent: boolean; website: string; turnstileToken: string }`
- Produces: `validateContact(values): ContactErrors`
- Produces: `<ContactForm endpoint: string, turnstileSiteKey: string />`
- Consumes: `NEXT_PUBLIC_CONTACT_API_URL` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

- [ ] **Step 1: Write failing validation and component tests**

Cover empty name, empty contact, missing consent, maximum lengths, an accepted minimal payload, loading text, success copy, failed submission with preserved values, and exact JSON request fields.

```ts
expect(validateContact({
  name: "",
  contact: "",
  message: "",
  consent: false,
  website: "",
  turnstileToken: "token",
})).toEqual({
  name: "请告诉我怎么称呼你。",
  contact: "请至少留下一种联系方式。",
  consent: "提交前请确认联系授权。",
});
```

- [ ] **Step 2: Run tests and verify the expected failure**

Run: `pnpm vitest run src/lib/contact.test.ts src/components/contact-form.test.tsx`

Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement deterministic validation**

Return field-keyed Chinese messages. Trim strings before length checks. Do not validate the visitor's chosen contact route as email-only because phone and WeChat are allowed.

```ts
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "请告诉我怎么称呼你。";
  else if (values.name.trim().length > 60) errors.name = "称呼请控制在 60 个字符以内。";
  if (!values.contact.trim()) errors.contact = "请至少留下一种联系方式。";
  else if (values.contact.trim().length > 120) errors.contact = "联系方式请控制在 120 个字符以内。";
  if (values.message.trim().length > 1000) errors.message = "留言请控制在 1000 个字符以内。";
  if (!values.consent) errors.consent = "提交前请确认联系授权。";
  return errors;
}
```

- [ ] **Step 4: Implement the form and contact composition**

Use controlled inputs, a hidden honeypot named `website`, Turnstile's explicit render API, `aria-live` status messaging, and an exact JSON POST. Keep entered values on failure and clear them only after a confirmed success response.

```ts
const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(values),
});
if (!response.ok) throw new Error("submit_failed");
setStatus("success");
```

- [ ] **Step 5: Run tests and verify green**

Run: `pnpm vitest run src/lib/contact.test.ts src/components/contact-form.test.tsx src/app/page.test.tsx`

Expected: all tests pass without React warnings.

- [ ] **Step 6: Commit the form slice**

```bash
git add src/lib/contact.ts src/lib/contact.test.ts src/components/contact-form.tsx src/components/contact-form.test.tsx src/components/contact-section.tsx src/app/page.test.tsx
git commit -m "feat: add accessible contact lead form"
```

---

### Task 3: Cloudflare Worker, D1, Turnstile, and Email

**Files:**
- Create: `worker/src/contracts.ts`
- Create: `worker/src/validation.ts`
- Create: `worker/src/index.ts`
- Create: `worker/src/index.test.ts`
- Create: `worker/schema.sql`
- Create: `worker/wrangler.jsonc`
- Create: `worker/vitest.config.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Modify: `tsconfig.json`

**Interfaces:**
- Consumes JSON matching `ContactValues` from Task 2.
- Produces: `POST /` JSON `{ ok: true }` or `{ ok: false, code: string }`.
- Consumes Worker bindings `DB`, `EMAIL`, `TURNSTILE_SECRET`, `NOTIFICATION_TO`, and `NOTIFICATION_FROM`.

- [ ] **Step 1: Add Worker test tooling and failing handler tests**

Add `@cloudflare/workers-types` and `wrangler` as development dependencies. Configure a Node Vitest environment for Worker unit tests. Use small in-memory fakes for D1 and email bindings, and stub `fetch` for Turnstile verification.

Test these cases separately: allowed OPTIONS, rejected origin, rejected GET, invalid JSON, honeypot, validation failure, failed Turnstile, successful D1 insertion, successful email, and email failure recorded as `failed` while the request remains successful.

- [ ] **Step 2: Run Worker tests and verify the expected failure**

Run: `pnpm test:worker`

Expected: FAIL because `worker/src/index.ts` and its contracts do not exist.

- [ ] **Step 3: Implement request parsing and validation**

Parse unknown JSON into a normalized lead or a stable error code. Reject bodies over 16 KiB using `content-length` when present and still enforce string lengths after parsing.

```ts
export type LeadInput = {
  name: string;
  contact: string;
  message: string;
  turnstileToken: string;
};

export function parseLead(value: unknown): ParseResult {
  if (!isRecord(value)) return { ok: false, code: "invalid_body" };
  if (value.website) return { ok: false, code: "spam" };
  if (value.consent !== true) return { ok: false, code: "consent_required" };
  if (typeof value.name !== "string" || !value.name.trim() || value.name.trim().length > 60) {
    return { ok: false, code: "invalid_name" };
  }
  if (
    typeof value.contact !== "string" ||
    !value.contact.trim() ||
    value.contact.trim().length > 120
  ) {
    return { ok: false, code: "invalid_contact" };
  }
  if (typeof value.message !== "string" || value.message.trim().length > 1000) {
    return { ok: false, code: "invalid_message" };
  }
  if (typeof value.turnstileToken !== "string" || !value.turnstileToken) {
    return { ok: false, code: "turnstile_required" };
  }
  return {
    ok: true,
    lead: {
      name: value.name.trim(),
      contact: value.contact.trim(),
      message: value.message.trim(),
      turnstileToken: value.turnstileToken,
    },
  };
}
```

- [ ] **Step 4: Implement the Worker handler**

Use exact CORS headers per origin. Validate Turnstile through `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Insert with a prepared D1 statement. Use the structured email builder supported by the binding.

```ts
await env.DB.prepare(
  "INSERT INTO leads (id, name, contact, message, created_at, notification_status) VALUES (?, ?, ?, ?, ?, ?)",
).bind(id, lead.name, lead.contact, lead.message, createdAt, "pending").run();

try {
  await env.EMAIL.send({
    from: env.NOTIFICATION_FROM,
    to: env.NOTIFICATION_TO,
    subject: `新的个人网站联系：${lead.name}`,
    text: `称呼：${lead.name}\n联系方式：${lead.contact}\n留言：${lead.message || "未填写"}`,
  });
  await updateNotificationStatus(env.DB, id, "sent");
} catch {
  await updateNotificationStatus(env.DB, id, "failed");
}
return json({ ok: true }, 201, origin);
```

- [ ] **Step 5: Add schema and deployment configuration**

```sql
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  notification_status TEXT NOT NULL CHECK (notification_status IN ('pending', 'sent', 'failed'))
);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
```

Configure `contact-api.260604.xyz`, an APAC D1 binding, `TURNSTILE_SECRET` as a secret, and an email binding restricted to `2797375316@qq.com`. Do not commit secret values.

- [ ] **Step 6: Run Worker tests and verify green**

Run: `pnpm test:worker`

Expected: all Worker tests pass.

- [ ] **Step 7: Commit the Worker slice**

```bash
git add worker package.json pnpm-lock.yaml tsconfig.json
git commit -m "feat: add Cloudflare contact API"
```

---

### Task 4: Responsive Styling and Browser Coverage

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tests/e2e/home.spec.ts`

**Interfaces:**
- Consumes the class names from Tasks 1 and 2.
- Produces explicit desktop and `< 768px` layouts for experience and contact sections.

- [ ] **Step 1: Write failing Playwright assertions**

Require the motto, four experience labels, direct contact links, form labels, consent control, and no overflow on both 390px and 1440px viewports. Stub the API response and Turnstile token so the browser test can verify success and retry states without touching production.

- [ ] **Step 2: Run the focused browser test and verify failure**

Run: `pnpm test:e2e --grep "experience and contact"`

Expected: FAIL because the new composition is not styled and the test-specific form flow is incomplete.

- [ ] **Step 3: Implement the editorial layouts**

Add one asymmetrical experience rail and a split contact composition. Use existing tokens, one-pixel rules, controlled whitespace, and no generic equal-card grid. Inputs use the page surface tokens and 10px radii. At `< 768px`, both sections become a single readable column.

- [ ] **Step 4: Run browser tests and verify green**

Run: `pnpm test:e2e`

Expected: all desktop, mobile, reduced-motion, and new contact tests pass.

- [ ] **Step 5: Run the copy self-audit and commit**

Run: `rg -n '—|–|Lorem|lorem' src worker`

Expected: no banned dash, placeholder, or filler copy.

```bash
git add src/app/globals.css tests/e2e/home.spec.ts
git commit -m "style: integrate experience and contact journey"
```

---

### Task 5: Cloudflare and Vercel Production Deployment

**Files:**
- Modify only generated local deployment metadata ignored by git.

**Interfaces:**
- Consumes the Worker and frontend builds from Tasks 1 through 4.
- Produces a live Worker API, D1 database, Turnstile widget, QQ notification path, and updated Vercel deployment.

- [ ] **Step 1: Verify Cloudflare zone status and create resources**

Confirm `260604.xyz` is active in Cloudflare. Create the D1 database `shawnnova-leads`, apply `worker/schema.sql`, create a Turnstile widget restricted to `260604.xyz`, and create the Worker `shawnnova-contact-api` with custom domain `contact-api.260604.xyz`.

- [ ] **Step 2: Configure bindings and secrets**

Bind D1 as `DB`, store the Turnstile secret as `TURNSTILE_SECRET`, set `NOTIFICATION_TO=2797375316@qq.com`, set an onboarded `NOTIFICATION_FROM` address under `260604.xyz`, and restrict the email binding to the QQ destination.

- [ ] **Step 3: Request QQ destination verification**

Add `2797375316@qq.com` as a Cloudflare Email Service destination. Cloudflare sends a verification email. The owner must approve that email before notification delivery can be verified.

- [ ] **Step 4: Configure and deploy the frontend**

Set Vercel production variables `NEXT_PUBLIC_CONTACT_API_URL=https://contact-api.260604.xyz` and the Turnstile site key. Deploy the tested commit with `vercel --prod`.

- [ ] **Step 5: Run fresh full verification**

Run:

```bash
pnpm test
pnpm test:worker
pnpm lint
pnpm build
pnpm test:e2e
curl -fsS https://260604.xyz | rg '功不唐捐，玉汝于成'
curl -fsS -X OPTIONS -H 'Origin: https://260604.xyz' https://contact-api.260604.xyz -D -
```

Expected: all tests and builds pass, production contains the new copy, and the API returns the exact allowed origin.

- [ ] **Step 6: Verify a production submission**

Submit one clearly labeled test lead through the live form. Confirm the success state, confirm the row exists in D1, and after QQ verification confirm a notification reaches `2797375316@qq.com`.

- [ ] **Step 7: Publish source and record final evidence**

Push the branch head to GitHub `main`, confirm the local and remote commit SHAs match, confirm both `https://260604.xyz` and `https://www.260604.xyz` return HTTPS 200, and leave the formal domain open in Chrome for the owner.
