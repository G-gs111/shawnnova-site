# Shawnnova Personal Site

葛少玉（Shawnnova）的中英双语 FDE 个人作品集。

- Production: <https://260604.xyz>
- Project handoff and maintenance guide: [`PROJECT_HANDOFF.md`](./PROJECT_HANDOFF.md)
- Design source of truth: [`design.md`](./design.md)
- Public content source: [`src/content/portfolio.ts`](./src/content/portfolio.ts)

```bash
pnpm install
pnpm dev
pnpm test
pnpm check:content
pnpm lint
pnpm build
```

The production frontend is hosted on the existing Vercel project `shawnnova-site`. The contact API is a separate Cloudflare Worker and must not be redeployed for frontend-only changes.
