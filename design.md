# Design — Shawnnova FDE Portfolio

A locked design system for the bilingual portfolio. Every homepage and case-page change reads this file before implementation.

## Genre

Modern-minimal with an editorial instrument-panel register: restrained, factual and warm rather than cyberpunk.

## Macrostructure family

- Marketing homepage: Feature Stack. A concise positioning intro leads into a sticky, scroll-synced three-case signal stack.
- Case pages: Narrative Workflow. Business problem, responsibility, system flow, decisions, outcomes and limits read as one operational sequence.
- Content sections: tabular or linear layouts. No repeated equal-card grids and no decorative chapter labels.

## Theme

- `--color-paper`: `oklch(96.8% 0.009 82)` limestone
- `--color-paper-2`: `oklch(93.5% 0.012 82)` raised limestone
- `--color-paper-3`: `oklch(89.5% 0.014 82)` quiet inset
- `--color-ink`: `oklch(18.5% 0.012 62)` warm charcoal
- `--color-ink-2`: `oklch(34% 0.015 62)` secondary ink
- `--color-muted`: `oklch(43% 0.014 62)` readable secondary copy
- `--color-rule`: `oklch(78% 0.014 75)` rule
- `--color-rule-strong`: `oklch(61% 0.018 62)` strong rule
- `--color-accent`: `oklch(54% 0.105 45)` dark copper
- `--color-accent-strong`: `oklch(44% 0.10 45)` pressed copper
- `--color-accent-soft`: `oklch(89% 0.035 55)` copper tint
- `--color-focus`: `oklch(49% 0.13 45)` focus copper
- `--color-dark`: `oklch(15% 0.010 60)` instrument surface
- `--color-dark-raised`: `oklch(20% 0.014 60)` raised instrument surface
- `--color-on-dark`: `oklch(93% 0.010 82)` text on dark
- `--color-on-dark-muted`: `oklch(76% 0.012 82)` secondary text on dark

No blue, purple, neon, glow or gradient. Copper occupies at most 3–5% of a viewport and marks only active state, focus, status or a key path.

## Typography

- Display: Geist, weight 700, normal style, tracking `-0.04em`.
- Body: Geist, weight 400, normal style, 16px minimum and 1.6 line-height.
- Technical outlier: Geist Mono, weight 500, used only for the wordmark and instrument readouts.
- Display cap: `clamp(3rem, 6vw, 5.25rem)`.
- Numeric evidence uses tabular figures.

## Spacing

Use the named 4-point scale in `tokens.css`. Page rhythm is intentionally uneven: compact proof strips, generous case transitions, and a quiet contact close.

## Components

- Navigation: N5 floating dock, opaque charcoal rather than glass. Fine-pointer proximity and keyboard focus use transform-only emphasis; mobile is static.
- Hero: original System Relay. Canvas 2D carries meaningful business/data/model/delivery paths; adjacent HTML carries the readable labels and status. The motion has a real pause/resume control.
- Work: Project Signal Stack. The active case drives one diagnostic panel and one concise set of verified metrics. Mobile becomes a linear list with no sticky behavior.
- Tools: Delivery Pipeline. Five real delivery stages connect the existing logos; hover, focus and tap highlight the corresponding stage and path.
- Contact: a plain limestone surface with no grain or animated background. Helper and privacy text are at least 14px and pass 4.5:1 contrast.
- Footer: Ft1 mast-headed close with name, motto, contact and compact metadata.

## Motion

- Primitive 1: navigation proximity/focus transform, 180ms.
- Primitive 2: System Relay data packet, Canvas 2D, pausable and offscreen-suspended.
- Primitive 3: active case crossfade, 180ms opacity only.
- No section-by-section reveal, parallax, bounce, layout-property animation or infinite decorative loop.
- `prefers-reduced-motion` renders final static states in at most 150ms.

## Copy voice

Specific and operational. Prefer a real verb, noun and boundary over abstract statements. Home copy should be understandable in one read; case detail keeps only facts that explain a decision or prove an outcome.

- Hero: “把一线业务问题，做成能跑的系统。”
- Method: “从现场判断，到稳定上线。”
- Work: “三个已落地的业务系统。”
- Experience: “从业务结果出发，再决定技术怎么用。”
- Tools: “从数据进入，到结果被使用。”
- Contact: “如果你在找能把业务问题做成系统的人，我们可以聊聊。”

The public UI does not mention which mailbox receives form notifications. Company, creator, brand and account names remain anonymous.

## What every page must share

- Limestone, charcoal and copper palette.
- Geist / Geist Mono roles and the 4-point spacing system.
- Solid surfaces, medium-weight rules and explicit focus states.
- One truthful delivery status for every case.
- Chinese and English content parity.
- Existing contact backend, Turnstile, Worker, D1 and mail delivery behavior.

## Per-page allowances

- The homepage may use the System Relay and sticky case stack.
- Case pages use only their system diagram; they do not repeat the homepage ambient relay.
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
