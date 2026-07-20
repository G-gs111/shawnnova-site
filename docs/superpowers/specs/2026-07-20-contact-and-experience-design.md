# Shawnnova Contact and Experience Upgrade Design

## Purpose

Upgrade the existing Shawnnova portfolio so potential collaborators, recruiters, and clients can understand 葛少玉 as a cross-functional builder and contact him without being sent to GitHub for every action.

The upgrade must:

- Publish the supplied Gmail address and mobile number as direct contact routes.
- Present operations, sales, product development, and Vibe Coding as one coherent working range without inventing employers, dates, titles, results, or metrics.
- Give the motto `功不唐捐，玉汝于成` a deliberate but restrained place in the identity system.
- Let visitors submit their own contact information and message.
- Store every valid submission in Cloudflare D1 and send a notification to `2797375316@qq.com`.

## Design Read

Reading this as an editorial personal portfolio for potential collaborators and recruiters, preserving the existing cold, precise technology language while adding human range and a credible conversion path.

- `DESIGN_VARIANCE: 7`
- `MOTION_INTENSITY: 5`
- `VISUAL_DENSITY: 4`
- Mode: preserve and extend
- Theme: keep the existing automatic light and dark themes
- Palette: keep graphite neutrals and cobalt blue
- Shape rule: keep 16px image panels and pill actions; use restrained 10px form controls

## Information Architecture

The site remains a single page. Its revised flow is:

1. `#about`: existing hero, with a short motto treatment and a broader introduction.
2. `#work`: existing selected product work.
3. `#experience`: a new cross-functional experience narrative.
4. `#approach`: existing three-step working method.
5. `#contact`: direct contact routes plus a lead form.

The navigation adds `经历` and retains `联系`. GitHub remains available, but it is no longer the dominant contact action.

## Content Design

### Hero and Motto

Keep the existing headline `把复杂技术，做成愿意被使用的产品。` because it already connects the technical and product sides of the portfolio.

Revise the supporting copy to:

`在运营、销售与产品开发中理解真实需求，也用 Vibe Coding 把想法快速做成可体验的产品。`

Place `功不唐捐，玉汝于成` as a compact identity line near the hero content or at the hero-to-work transition. It should read as a personal principle, not as an oversized quotation competing with the headline.

### Cross-functional Experience

Add an editorial section titled `从市场一线，到产品落地。` The section explains that the four experience directions form a continuous workflow:

1. `运营`: 观察用户、内容和场景，把目标拆成可以执行的动作。
2. `销售`: 在沟通与转化中识别真实需求，理解信任如何建立。
3. `产品开发`: 将需求组织成清晰方案，协调体验、功能与交付。
4. `Vibe Coding`: 借助 AI 快速验证想法，让概念尽早成为可以使用的产品。

Use a numbered editorial sequence or asymmetric capability rail rather than four equal generic cards. On mobile it becomes one readable vertical sequence.

No company names, employment dates, performance metrics, or seniority claims are added because none were supplied.

### Contact Area

Use a two-column composition on desktop and one column on mobile.

The direct-contact column contains:

- Gmail: `shawnnovags111@gmail.com` using a `mailto:` link.
- Mobile: `18379582410` using a `tel:` link.
- GitHub: `https://github.com/G-gs111` as a secondary profile link.

The lead-form column contains:

- `怎么称呼你` text field, required, maximum 60 characters.
- `你的联系方式` text field, required, maximum 120 characters. The placeholder may mention email, phone, or WeChat.
- `想聊些什么` textarea, optional, maximum 1,000 characters.
- A required consent checkbox: `我同意将以上信息用于本次联系。`
- Cloudflare Turnstile verification.
- Primary action: `留下联系方式`.

Do not display the QQ notification address publicly. It is an operational destination only.

## Submission Architecture

The frontend remains on Vercel. It submits JSON over HTTPS to a Cloudflare Worker custom domain, preferably `contact-api.260604.xyz`.

The request flow is:

1. The browser validates required fields and length limits.
2. The browser sends the form values and Turnstile token to the Worker.
3. The Worker validates origin, method, content type, field lengths, consent, honeypot, and Turnstile token.
4. The Worker inserts the lead into D1 using a prepared statement.
5. The Worker sends an email notification to the verified destination `2797375316@qq.com`.
6. The Worker records the email notification result without discarding a successfully stored lead.
7. The browser replaces the form with an inline success state.

Only `https://260604.xyz`, `https://www.260604.xyz`, and explicitly configured local test origins may call the endpoint. CORS preflight responses must use an exact allowlist rather than `*`.

### D1 Data Model

Store only the information needed to follow up:

- `id`: generated UUID
- `name`: visitor-provided name
- `contact`: visitor-provided contact route
- `message`: optional message
- `created_at`: UTC timestamp
- `notification_status`: `sent` or `failed`

Do not store visitor IP addresses, browser fingerprints, or user-agent strings.

### Email Delivery

Use a Cloudflare email binding restricted to the verified destination `2797375316@qq.com`. The sender must use an onboarded address under `260604.xyz`.

Enabling this requires one action from the owner: open the verification message received by the QQ mailbox and approve it. Until verification is complete, D1 storage remains the source of truth and the form must not claim that an email was delivered.

## Interaction and States

- Inputs use visible labels, clear focus rings, and persistent helper or error text.
- The submit button shows `正在发送` while the request is in flight and prevents duplicate submission.
- Success copy: `收到，我会通过你留下的方式联系你。`
- Validation errors stay next to the affected field.
- A Turnstile or network error keeps all typed content and offers a retry.
- A service error also shows the public Gmail and phone number as immediate alternatives.
- Motion is limited to section reveal and state transitions. Reduced-motion preferences receive static content.

## Privacy and Abuse Controls

- Collect the minimum information required for follow-up.
- Require explicit consent before submission.
- Include a hidden honeypot field for basic bot filtering.
- Validate Turnstile tokens on the Worker before writing to D1.
- Enforce request size and field-length limits on both client and server.
- Return generic public errors and do not expose database or email-provider details.
- Keep the D1 database accessible only through Cloudflare account controls; do not build a public admin interface in this scope.

## Accessibility and Responsive Behavior

- Preserve semantic landmarks and heading order.
- Contact links must have descriptive accessible names.
- Every form control must have a programmatic label.
- Error and success messages use an appropriate live region.
- Keyboard users must be able to complete Turnstile and submit the form.
- At widths below 768px, experience items and the contact composition collapse to one column with no horizontal overflow.
- Phone and email links must remain large enough for touch input.

## Verification

- Content tests verify the motto, four experience directions, Gmail, mobile number, and QQ notification destination configuration.
- Component tests verify required-field validation, consent, loading state, success state, retry behavior, and preservation of typed values after failure.
- Worker tests verify origin allowlisting, method and body rejection, field limits, honeypot handling, Turnstile failure, D1 insertion, and email status updates.
- End-to-end tests verify the experience section, direct `mailto:` and `tel:` links, keyboard form flow, responsive layout, and absence of horizontal overflow.
- Production checks require successful Next.js tests, Worker tests, lint, production builds, HTTPS responses, and a real test submission visible in D1.
- Email delivery is considered complete only after the QQ address is verified and a test notification is received.

## Out of Scope

- A public or custom-built lead-management dashboard.
- Visitor accounts, authentication, file uploads, newsletters, or marketing automation.
- Fabricated employment history, employer logos, testimonials, or business metrics.
- Replacing Vercel hosting with Cloudflare Pages.
