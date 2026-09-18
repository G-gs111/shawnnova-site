# Design — Shawnnova FDE Portfolio

A locked design system for the bilingual portfolio. Every homepage and case-page change reads this file before implementation.

## Genre

Precision technical publication with an understated Japanese-industrial register: factual, recruiter-scannable and human rather than cyberpunk or generic AI.

## Macrostructure family

- Marketing homepage: Delivery Dossier. A positioning statement and semantic Delivery Console lead directly into proof and three structured evidence rows.
- Case pages: Evidence Narrative. Delivery status and verified proof appear above the fold, followed by problem, build, adoption, workflow, decisions, outcomes and limits.
- Content sections: tabular or linear layouts. No repeated equal-card grids, oversized empty hero surfaces or decorative chapter labels.

## Theme

- `--color-paper`: `oklch(98.2% 0.003 80)` chalk white
- `--color-paper-2`: `oklch(96.2% 0.006 75)` quiet raised paper
- `--color-paper-3`: `oklch(92.8% 0.008 72)` quiet inset
- `--color-ink`: `oklch(18% 0.008 55)` graphite
- `--color-ink-2`: `oklch(40% 0.012 55)` secondary graphite
- `--color-muted`: `oklch(46% 0.012 55)` readable secondary copy
- `--color-rule`: `oklch(84% 0.008 70)` hairline rule
- `--color-rule-strong`: `oklch(66% 0.012 60)` strong rule
- `--color-accent`: `oklch(60% 0.18 35)` signal vermilion
- `--color-accent-strong`: `oklch(48% 0.17 34)` accessible signal dark
- `--color-accent-soft`: `oklch(93% 0.035 45)` signal tint
- `--color-focus`: `oklch(48% 0.17 34)` focus signal
- `--color-dark`: `oklch(17% 0.008 55)` graphite evidence surface
- `--color-dark-raised`: `oklch(22% 0.010 55)` raised graphite surface
- `--color-on-dark`: `oklch(96% 0.005 80)` text on graphite
- `--color-on-dark-muted`: `oklch(78% 0.008 75)` secondary text on graphite

No blue, purple, neon, glow, glass or gradient. Vermilion occupies at most 3–5% of a viewport and marks only active state, focus, verified milestones or primary actions.

## Typography

- Display: Geist with the existing Chinese system sans fallback, weight 700, normal style, tracking `-0.04em`.
- Body: Geist, weight 400, normal style, 16px minimum and 1.6 line-height.
- Technical outlier: Geist Mono, weight 500, used only for the wordmark and instrument readouts.
- Display cap: `clamp(3rem, 6vw, 5.25rem)`.
- Numeric evidence uses tabular figures.

## Spacing

Use the named 4-point scale in `tokens.css`. Page rhythm is intentionally uneven: compact proof strips, generous case transitions, and a quiet contact close.

## Components

- Navigation: compact rectangular publication header, static on mobile, with one vermilion contact action.
- Hero: statement-led split layout with a semantic four-stage Delivery Console. No Canvas hero and no decorative node network.
- Proof: compact evidence strip with adoption and usage numbers from the latest resume.
- Work: three structured Case Evidence Rows using `Problem / Built / Adopted / Evidence`; mobile becomes stacked labeled groups.
- Tools: a supporting delivery chain grouped by acquisition, processing, AI judgment, delivery and validation; no logo wall.
- Contact: one compact graphite band. Helper and privacy text are at least 14px and pass 4.5:1 contrast.
- Footer: quiet chalk-white close with name and compact metadata.

## Motion

- Primitive 1: navigation and action focus/hover feedback, 160–180ms.
- Primitive 2: Delivery Console active-stage emphasis, opacity/transform only.
- Primitive 3: case-row detail emphasis, 180ms opacity only.
- No section-by-section reveal, parallax, bounce, layout-property animation, Canvas loop or infinite decorative loop.
- `prefers-reduced-motion` renders final static states in at most 150ms.

## Copy voice

Specific and operational. Prefer a real verb, noun and boundary over abstract statements. Home copy should be understandable in one read; case detail keeps only facts that explain a decision or prove an outcome.

- Hero: “业务问题，不止分析；我把它交付成系统。”
- Method: “进入业务，构建系统，推动上线，持续采用。”
- Work: “从真实问题，到被采用的系统成果。”
- Experience: “先理解业务，再决定 AI 怎么进入流程。”
- Tools: “工具按交付链路组织，而不是按 Logo 陈列。”
- Contact: “聊聊你的下一项 AI 应用交付。”

The public UI does not mention which mailbox receives form notifications. Company, creator, brand and account names remain anonymous.

## What every page must share

- Chalk white, graphite and signal-vermilion palette.
- Geist / Geist Mono roles and the 4-point spacing system.
- Solid surfaces, medium-weight rules and explicit focus states.
- One truthful delivery status and one explicit evidence boundary for every case.
- Chinese and English content parity.
- Existing contact backend, Turnstile, Worker, D1 and mail delivery behavior.

## Per-page allowances

- The homepage may use the semantic Delivery Console and structured evidence rows.
- Case pages use only semantic workflow diagrams and compact evidence surfaces.
- Contact and footer remain static and high contrast.

## Exports

### tokens.css

The canonical implementation lives in the project-root `tokens.css` and must match the Theme, Typography, Spacing and Motion sections above.

### Tailwind v4 mapping

If Tailwind is added later, map the canonical tokens to `--color-paper`, `--color-ink`, `--color-accent`, `--font-display`, `--font-body`, `--spacing-*`, `--ease-*` without changing their values.

### DTCG mapping

If a token package is needed later, expose the same values under `color.*`, `font.*`, `space.*`, `motion.*` with DTCG `$value` and `$type` fields.

### shadcn/ui mapping

If shadcn/ui is added later, map `background` to paper, `foreground` to ink, `primary` to accent, `primary-foreground` to accent ink, and `ring` to focus. Do not introduce a new palette.
