# Shawnnova Recruiter Portfolio Redesign

## Status

Approved visual direction: generated Option 3, "Precision Delivery Console".

Authoritative resume source: `/Users/Admin/Desktop/files/Shaoyu Ge/简历/秋招求职简历-葛少玉/葛少玉-27届-FDE、AI应用交付-秋招简历.pdf`, created 2026-09-18 17:33 CST. The public site adapts this source; it does not reproduce the resume verbatim or publish the PDF.

## Goal

Rebuild the existing bilingual portfolio so a China-based recruiter for FDE, AI application delivery or AI solutions can understand within 15 seconds that 葛少玉 / Shawnnova:

1. identifies high-frequency problems inside real operating workflows;
2. translates business judgment into rules, data structures and AI-assisted systems;
3. ships, validates and iterates those systems with actual users; and
4. measures adoption and outcomes without overstating causality.

This is an in-place redesign of the existing Next.js site. It keeps the current repository, Vercel project, domain, bilingual routing and Cloudflare-backed contact system.

## Audience And Positioning

Primary audience: recruiters and hiring managers for domestic campus and internship roles in FDE, AI application delivery, AI solutions and adjacent technical delivery roles.

Primary positioning:

- Chinese: `业务问题，不止分析；我把它交付成系统。`
- English: `I turn frontline business problems into systems teams adopt.`
- Role: `FDE 方向 / AI 应用交付 / AI 解决方案`
- Supporting statement: `连接数据、API、模型与团队工作方式，让 AI 从方案走到上线、采用与持续迭代。`

The site presents Shawnnova as an early-career delivery candidate with unusually strong frontline business exposure. It must not imply senior-level engineering depth or sole ownership of team-wide business results.

## Content Source Of Truth

### Resume-backed public facts

- 2027 graduate, Wuhan University of Science and Technology, Logistics Management.
- Major rank `1/67`, CET-6, class monitor and student department chair.
- Two national-level innovation and entrepreneurship awards.
- Frontline experience in brand operations, creator BD and content delivery before shifting toward AI application delivery.
- Reusable AI Skills for high-frequency tasks and more than 20 training cases / operating SOPs.

### Core case 1: Creator Script Risk Self-check H5

- Problem: manual review misses issues and rejected material loses reuse value.
- Built: deterministic rules first, LLM semantic supplementation second; FastAPI, Docker, Tencent Cloud CloudBase and Feishu OpenAPI.
- Operational model: five business tables manage 429 dynamic rules, creator profiles, detection history and rejected cases.
- Adoption: 112 actual creator users and 1,356 effective checks as of 2026-08-30.
- Observed outcome: two separate 50-item samples recorded rejection shares of `52% (26/50)` before use and `24% (12/50)` after use.
- Disclosure boundary: this is an observed before/after comparison, not a controlled causal experiment. The system does not replace platform review or human final judgment.

### Core case 2: Short-video Script Knowledge Base And AI Generation Workflow

- Problem: creation depends on individual experience, internal material is fragmented and generated quality is inconsistent.
- Built: a four-layer system of structure dictionary, tag system, reference cases and reusable phrasing; material collection, transcription, structured decomposition, tag matching and multi-version generation.
- Knowledge assets: 200+ high-quality cases and nearly 300 reusable phrases.
- Quality loop: compliance knowledge, product-information follow-up, competitor research, post-generation self-check and human feedback.
- Adoption: eight operators generated 100 scripts; 89 were adopted and delivered for creator filming and publishing.
- Efficiency: full production time per script decreased from about 60 minutes to 10 minutes.
- Disclosure boundary: adoption is a workflow result, not proof that every published script produced commercial growth.

### Core case 3: Pet-category Selection Monitoring And Assisted Decision Workflow

- Problem: selection depends on a small number of experienced people; market scanning is inconsistent and tacit judgment is hard to transfer.
- Built: executable rules for incumbent-product recovery, new-product acceleration, new-link opportunities and channel fit; cross-checks of rankings, video counts, creator counts and range-based GMV/sales data.
- Trust model: preserve upstream ranges, mark insufficient evidence as `待验证`, diagnose field-linking and matching anomalies before decisions.
- Adoption: ten real selection rounds; 30 deduplicated recommended products; 27 advanced after operations review, a 90% human-review advancement rate.
- Efficiency: one selection round decreased from about 60 minutes to 15 minutes.
- Disclosure boundary: the workflow narrows and improves human decisions; it does not replace the selection owner.

### Supporting case: Multi-brand Qianchuan Data Cockpit

- The existing case route remains available but moves out of the homepage's three flagship cases.
- Four active accounts, verified by the project configuration and deployment notes.
- Official API D-1 synchronization, layered Feishu data model, historical backfill and idempotent writes.
- 171 offline tests currently pass.
- Core synchronization is live; selected WorkBuddy control capabilities remain a separate acceptance track.
- Account, brand, project and delivery details remain anonymous.

### Contact facts

- Public email remains `shawnnovags111@gmail.com`.
- Public phone remains `18379582410`.
- Contact-form notifications continue to go to `2797375316@qq.com` as a private backend detail.
- The Worker, D1, Turnstile and mail-delivery protocol do not change.

## Information Architecture

### Homepage

1. **Navigation**
   - Wordmark, cases, delivery method, profile, contact and language switch.
   - Compact, rectangular, high-contrast navigation; no floating pill dock.

2. **Hero + Delivery Console**
   - Left: positioning, role, concise explanation and two CTAs.
   - Right: four delivery stages — discover problem, build system, launch and validate, sustain adoption.
   - The console uses semantic HTML and lightweight state feedback; it is not a decorative illustration.

3. **Proof Strip**
   - `112` actual creator users.
   - `1,356` effective risk checks.
   - `89/100` generated scripts adopted and delivered.
   - `10` real selection rounds.
   - Compact profile proof: 2027 graduate, rank 1/67, two national awards.

4. **Selected Work**
   - Three flagship rows in this order: compliance, script workflow, selection workflow.
   - Each row uses the same four-column evidence contract: `Problem / Built / Adopted / Evidence`.
   - The compliance case receives featured emphasis; the other rows remain equally accessible.

5. **Delivery Method**
   - `进入业务` → `快速构建` → `推动上线` → `持续采用`.
   - Copy demonstrates decisions and responsibilities instead of abstract capability claims.

6. **Profile And Credibility**
   - A compact band for education, operational background, awards and 20+ training cases / SOPs.
   - No full resume dump and no portrait.

7. **Supporting Systems And Tools**
   - Qianchuan cockpit appears as a supporting delivered system with its truthful status and route.
   - Tools remain organized by delivery stages, not as a logo wall.

8. **Contact And Footer**
   - One compact graphite contact band, followed by a quiet light footer.
   - Helper and privacy text remain at least 14px with WCAG AA contrast.

### Case Pages

Every case page follows:

1. concise hero with delivery status and two or three verified results above the fold;
2. `Problem / Built / Adopted / Evidence` overview;
3. system workflow;
4. key decisions and trade-offs;
5. results with sample size or measurement definition;
6. boundary and retrospective;
7. next case and contact action.

The large dark empty hero is removed. Case pages share the homepage's chalk-white system and use graphite only for focused evidence surfaces.

### Routes

- Preserve `/`, `/en`, language switching and the legacy anchors `#about`, `#metrics`, `#proof`, `#approach`, `#work`, `#experience`, `#tools` and `#contact`.
- Preserve the existing compliance, selection and Qianchuan routes.
- Add `/projects/script-knowledge-workflow` and `/en/projects/script-knowledge-workflow`.
- Language switching must retain the current case route.
- The next-case navigation cycles through all four public cases, even though only three are marked as homepage flagships.

## Visual System

### Genre

Precision technical publication with understated Japanese-industrial product design. The site should feel like a delivery dossier, not a generic AI landing page.

### Palette

- Chalk white paper: `oklch(98.2% 0.003 80)`.
- Quiet raised paper: `oklch(96.2% 0.006 75)`.
- Graphite ink: `oklch(18% 0.008 55)`.
- Secondary ink: `oklch(40% 0.012 55)`.
- Hairline rule: `oklch(84% 0.008 70)`.
- Signal vermilion: `oklch(60% 0.18 35)`.
- Accessible signal dark: `oklch(48% 0.17 34)`.
- Graphite evidence surface: `oklch(17% 0.008 55)`.
- Text on graphite: `oklch(96% 0.005 80)`.

Vermilion occupies no more than 5% of a viewport and marks CTAs, verified milestones, active states and focus. There are no gradients, glows, glass effects, blue/purple AI styling or copper-brown wash.

### Typography

- Display and body: Geist with the existing Chinese system sans fallback.
- Technical metadata: Geist Mono.
- Large Chinese headings use strong weight, compact line-height and controlled line breaks.
- Body copy remains 16px or larger on desktop and mobile.
- No serif display font and no more than two font families.

### Components And Motion

- `DeliveryConsole`: semantic four-stage status list with one active stage and reduced-motion-safe feedback.
- `EvidenceStrip`: five compact proof cells using tabular figures.
- `CaseEvidenceRow`: structured project row, not a rounded card.
- `DeliveryMethod`: four connected steps using layout rules and library icons, not handcrafted SVG or CSS illustration.
- `SupportingSystem`: one concise Qianchuan evidence row.
- Motion is limited to active-stage changes, focus/hover feedback and case-row expansion or emphasis.
- `prefers-reduced-motion` renders the final state without motion.

The reference contains no required raster artwork. The implementation uses typography, layout rules and Phosphor icons; it does not generate decorative assets or reuse the resume portrait.

## Interaction And Accessibility

- All navigation, language switching, case links, contact links and form controls remain functional.
- Delivery console and case evidence are readable without JavaScript.
- Keyboard focus is visible and uses the accessible signal-dark token.
- Touch targets are at least 44px where practical.
- Mobile widths down to 320px have no horizontal overflow.
- The desktop evidence table becomes stacked labeled groups on mobile; labels remain visible.
- Important meaning never depends on color or animation alone.
- `lang`, canonical and hreflang remain correct for both locales.

## Technical Approach

- Keep Next.js 16 App Router, React 19, TypeScript, Geist, Phosphor Icons, Vitest and the current contact backend.
- Extend the typed bilingual content model so homepage proof, flagship cases, supporting cases and credibility share one source of truth. Project records must distinguish homepage prominence from route availability through an explicit field such as `featured` rather than by deleting or duplicating content.
- Add focused components for the console, evidence strip and structured case rows.
- Update existing page composition and CSS in place.
- Do not add Three.js, a CMS, authentication, a database feature or a new deployment service.
- Do not delete legacy files in this redesign. Unused-code cleanup remains a separate, explicitly approved task.

## Testing And Verification

1. Test-first content contract changes, including all new metrics, four accounts for Qianchuan and bilingual parity.
2. Test-first interactive component behavior and accessible labels.
3. Rewrite stale Playwright assertions for the new homepage and four case routes.
4. Run unit tests, content checker, lint, production build and Sites-compatible build.
5. Use only the user's Chrome for rendered verification at 320, 375, 768, 1280 and 1920px.
6. Compare the implemented 887×1774 full-page capture against the selected Option 3 reference and write `design-qa.md`.
7. Fix all P0/P1/P2 design-QA findings before handoff.
8. Do not deploy production until the user reviews the local or preview build and explicitly asks to publish.

## Acceptance Criteria

- The first viewport communicates role, delivery lifecycle and at least three verified proof points.
- Homepage flagship cases exactly match the latest resume: compliance, script workflow and selection workflow.
- All numeric claims match the source and include boundaries where causality or sample size matters.
- Qianchuan uses four accounts and 171 passing tests; it is presented as a supporting case.
- The selected Option 3 visual language is recognizable in hierarchy, palette, density and evidence presentation.
- The case-page dark empty zone is gone.
- Chinese and English routes are complete and linked.
- Existing contact behavior remains unchanged.
- No real company, brand, creator, account or project identifier leaks into the public UI.
- No gradient, Three.js, fake product screenshot or resume photo is introduced.
- Automated checks pass and Chrome verification reports no console error or horizontal overflow.
