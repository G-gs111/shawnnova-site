# Shawnnova 个人站项目交接说明

> 更新时间：2026-09-01
>
> 用途：把本项目交给新的 Codex 项目、开发线程或维护者时，先阅读本文件。
>
> 原则：继续维护同一个 GitHub 仓库和同一套线上服务，不另建一份彼此独立的网站副本。

## 1. 项目一句话说明

这是葛少玉（Shawnnova）的中英双语 FDE 个人作品集，面向 FDE、AI 应用、业务数据系统与自动化工作流相关机会，核心证明是把一线业务问题连接到数据、模型、API 和团队工作方式，并交付成可运行系统。

正式站：<https://260604.xyz>

GitHub：<https://github.com/G-gs111/shawnnova-site>

本机目录：`/Users/Admin/Documents/Development-try/shawnnova-site`

## 2. 当前线上与版本状态

- GitHub 仓库：`G-gs111/shawnnova-site`，公开仓库，默认分支 `main`。
- 当前交接基线提交：`247736a`（`feat: refine FDE portfolio experience`）。
- 正式前端：Vercel 项目 `shawnnova-site`。
- Vercel Project ID：`prj_vKZUOvmSTJKmPb7pnaFz4KUunm0U`。
- Vercel Team / Org ID：`team_PwOF1gzdrtC5J14i1AdzWa7Q`。
- 正式域名：`https://260604.xyz`，同时绑定 `www.260604.xyz` 和 Vercel 默认域名。
- 当前正式部署基线：`dpl_HSeat6ivbDV1KaGu9rEdEjEwMMsv`，状态为 Ready。
- Vercel 当前没有连接 Git 自动部署。`git push` 只保存代码，不会自动更新正式站；上线仍需单独执行 Vercel 部署。
- 另有一个 OpenAI Sites 私有检查点，仅用于历史预览，不是正式生产环境。

如后续线上状态变化，应以 Vercel 控制台和 `vercel inspect https://260604.xyz` 的实时结果为准，不要机械依赖本文件中的部署 ID。

## 3. 产品定位和公开内容

### 身份与定位

- 中文姓名：葛少玉。
- 英文名：Shawnnova。
- 定位：FDE 方向，AI 应用与业务系统落地。
- 主标题：把一线业务问题，做成能跑的系统。
- 英文主张：I turn frontline business problems into systems teams can use.
- 格言：功不唐捐，玉汝于成。

### 首页核心证明

- 6 个 AI 工具 / 数据流程。
- 1,000+ 次内容检测。
- 210 个核心商品池 SKU。
- 5 个投放账户自动同步。
- 参与 6 个品牌项目的运营与 AI 流程改造。
- 协作和培训 100+ 位创作者。
- 项目合计月销售规模达到百万元级。
- 相关项目至少连续 3 个月保持月环比 10% 以上增长。

### 三个重点案例

1. 内容合规检测助手
   - 340 条规则词库与 DeepSeek 双引擎。
   - 1,000+ 次检测，单条审核约从 60 秒降到 10 秒。
   - AI 命中准确率超过 90%。
   - 边界：不代替平台最终审核，高风险内容保留人工复核。
2. 商品决策与自动选品看板
   - 220 个原始商品清洗为 210 个核心 SKU。
   - 7 维评分、P0–P3 分层、36 字段商品池、12 个决策看板。
   - P0 每日快照覆盖率 100%。
   - 边界：评分缩小人工决策范围，不替代选品负责人。
3. 多品牌千川数据驾驶舱
   - 5 个活跃账户，官方 API 按 D-1 每日同步。
   - 飞书多层数据模型、历史补数、幂等写入和 170+ 离线测试。
   - 边界：核心数据同步已上线，部分 WorkBuddy 控制能力仍在验收。

补充成果：爆款脚本知识库包含 222 条结构化脚本、333 个爆款案例、12 套创意词典。

### 公开联系方式

- 页面公开邮箱：`shawnnovags111@gmail.com`。
- 页面公开电话：`18379582410`。
- 联系表单通知邮箱：`2797375316@qq.com`。
- 表单收件邮箱是后台实现细节，不在公开页面文案中展示。

所有文案和指标的唯一主要维护入口是 `src/content/portfolio.ts`。中英文内容需要同步更新，不要只改一种语言。

## 4. 页面结构和路由

- `/`：中文首页。
- `/en`：英文首页。
- `/projects/content-compliance`
- `/projects/selection-dashboard`
- `/projects/qianchuan-cockpit`
- `/en/projects/content-compliance`
- `/en/projects/selection-dashboard`
- `/en/projects/qianchuan-cockpit`

旧锚点需要继续保留：`#about`、`#metrics`、`#proof`、`#approach`、`#work`、`#experience`、`#tools`、`#contact`。

当前正式页面入口只使用：

- `src/app/page.tsx`、`src/app/en/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/app/en/projects/[slug]/page.tsx`
- `src/components/fde/*`
- `src/content/portfolio.ts`
- `src/app/fde-portfolio.css`
- `src/app/fde-refinement.css`
- `tokens.css`

仓库内的 `src/components/hero.tsx`、`work-section.tsx`、`experience-section.tsx`、`src/content/site.ts` 等属于旧版遗留代码。新开发不要误改这些文件；若要删除，应先确认没有引用并单独做清理提交。

## 5. 视觉和交互规范

权威设计文档：`design.md`。最新实现计划：`docs/superpowers/plans/2026-08-25-fde-portfolio-refinement.md`。

- 风格：暖白石灰岩、暖黑/炭黑、少量深铜色；克制、编辑感、仪表面板感。
- 字体：Geist / Geist Mono。
- 禁止蓝紫霓虹、发光、渐变和模板化 AI 风格。
- 铜色只用于状态、焦点和关键路径，不应大面积铺色。
- 首屏是原创 Canvas 2D System Relay，不引入 Three.js。
- ThreeUI 只作为连接图、Interface Lines、诊断面板与动态导航的审美参考，不复制源码，也不安装完整 Three.js。
- 案例结构图是脱敏的 HTML 系统流程示意，不伪造产品截图。
- 动效必须支持暂停或降级；`prefers-reduced-motion` 下重要信息仍应完整可见。
- 联系区保持静态、高对比度，小字不低于 14px。
- 手机最小验收宽度 320px，不允许横向溢出。

## 6. 技术架构

### 前端

- Next.js 16 App Router。
- React 19、TypeScript。
- Motion、Phosphor Icons、Iconify logos。
- Vitest + Testing Library。
- Playwright 配置存在，但当前端到端用例有旧版断言，见“已知问题”。
- 包管理器：pnpm 11。
- 正式托管：Vercel。

### 联系表单后端

前端与联系后端是两个独立发布单元：

`访客提交表单 → Cloudflare Turnstile → contact-api.260604.xyz → Worker 校验 → D1 保存 → Cloudflare 邮件绑定通知 QQ 邮箱`

- Worker：`shawnnova-contact-api`。
- API：`https://contact-api.260604.xyz`。
- Worker 源码：`worker/src/*`。
- Worker 配置：`worker/wrangler.jsonc`。
- D1 数据库：`shawnnova-leads`。
- D1 Database ID：`34f45135-95e8-4362-9ac9-d61c22b0d863`。
- 邮件投递目标：`2797375316@qq.com`。
- Turnstile secret 存在 Cloudflare 服务端，绝不能写进仓库或交接文档。
- Vercel Production 环境已有：`NEXT_PUBLIC_TURNSTILE_SITE_KEY` 和 `NEXT_PUBLIC_CONTACT_API_URL`，值由平台加密保存。

仅修改前端页面时，不要部署 Worker、不要改 D1、不要改 Cloudflare DNS。只有联系表单协议、存储或邮件逻辑发生变化时，才需要重新验证和发布 Worker。

## 7. 域名和账号依赖

- 域名购买于 Spaceship。
- 正式站与联系 API 的域名配置曾通过 Cloudflare/Vercel 完成。
- 前端发布需要 Vercel 账号 `shawnnovags111-4215` 的项目权限。
- 源码发布需要 GitHub 仓库 `G-gs111/shawnnova-site` 的写权限。
- 修改 Worker 时需要重新完成 Cloudflare CLI 授权；当前非交互 CLI 会要求 `CLOUDFLARE_API_TOKEN` 或通过登录流程授权。
- 用户明确要求：所有需要网页界面、登录、验证码、授权和最终浏览器验收的操作，只使用用户自己的 Chrome，不使用其他浏览器。

不要在聊天、Markdown、提交记录或截图中保存密码、验证码、API Token、Turnstile secret、Vercel token 或 Cloudflare token。

## 8. 本地开发和验证

首次进入仓库：

```bash
pnpm install
pnpm dev
```

每次改动在提交和发布前至少运行：

```bash
pnpm test
pnpm check:content
pnpm lint
pnpm build
```

若修改 Worker，再额外运行：

```bash
pnpm test:worker
pnpm build:worker
```

浏览器验收必须使用用户的 Chrome，至少检查：

- 中文首页和英文首页。
- 三个案例页及中英文切换。
- 320px 手机宽度和常规桌面宽度无横向溢出。
- 主导航、案例切换、System Relay 暂停/恢复和工具链路交互。
- 键盘焦点和减少动画模式。
- 联系表单布局、Turnstile 是否出现、控制台是否有错误。
- 除非明确需要测试邮件投递，不要随意提交线上联系表单，避免产生虚假线索。

## 9. 推荐的开发、预览、发布流程

1. `git pull --ff-only origin main`，确认工作区干净。
2. 先明确需求和验收标准，再修改代码。
3. 本地运行自动测试、内容检查、Lint 和生产构建。
4. 用 Chrome 检查本地页面和响应式布局。
5. 先创建 Vercel Preview 或其他私有预览，用 Chrome 审核。
6. 审核通过后提交并推送 GitHub。
7. 因为当前没有 Git 自动部署，单独执行 `pnpm exec vercel --prod --yes` 发布正式版。
8. 用 `pnpm exec vercel inspect https://260604.xyz` 确认状态为 Ready。
9. 仍用 Chrome 打开正式域名，检查首页、案例、语言切换、联系入口和控制台。
10. 保留上一个 Git 提交和 Vercel 部署作为回滚点。

如果新的本地目录没有 `.vercel/project.json`，不要新建 Vercel 项目，执行 Vercel 登录后把目录重新 Link 到现有项目 `shawnnova-site`。

## 10. 信息披露边界

- 公司、品牌、达人、客户和投放账户全部匿名。
- 不公开账户 ID、广告主 ID、Access Token、业务明细和未确认指标。
- 不仿造产品截图；只使用脱敏系统结构示意。
- 千川项目必须继续明确“核心同步已上线，部分控制能力仍在验收”。
- 内容合规工具不是法律意见，也不替代平台最终审核。
- 自动选品评分不替代业务负责人。
- GitHub 是公开仓库，任何提交内容默认可能被任何人看到。

`scripts/check-portfolio-content.mjs` 会检查部分隐私词、旧锚点、双语核心文案和 Three.js 依赖边界，修改内容后必须运行。

## 11. 当前已知问题和建议的第一批维护任务

这些问题不影响当前正式站运行，但新项目不应忽略：

1. `tests/e2e/home.spec.ts` 仍包含旧版首页文案、四张旧项目卡和旧布局断言；`pnpm test` 不会运行这些 Playwright 用例。应先重写为当前 FDE 版，再把 E2E 纳入发布验证。
2. `design-qa.md` 记录的是 2026-07-22 的旧钴蓝/圆形遮罩版本，不是当前视觉。当前以 `design.md` 和 2026-08-25 的改版计划为准，后续可重写 QA 文档。
3. 当前 FDE 联系组件读取 `NEXT_PUBLIC_CONTACT_ENDPOINT`，Vercel 中保存的变量名是 `NEXT_PUBLIC_CONTACT_API_URL`；生产依靠代码里的默认 API 地址正常工作。建议统一变量名并添加测试，但不要在同一次改动中顺手改 Worker。
4. 仓库仍保留较多旧版组件和图片。建议先建立“当前引用清单”，再做独立清理提交，避免误删。
5. `.openai/hosting.json` 和 Sites 构建脚本属于历史私有预览能力；正式生产仍以 Vercel 为准。

## 12. 给新 Codex 项目的启动提示词

在新项目的第一条消息中可直接使用：

> 这是 Shawnnova 个人站的后续维护项目。请先完整阅读仓库根目录 `PROJECT_HANDOFF.md`、`design.md`，以及 `docs/superpowers/plans/2026-08-25-fde-portfolio-refinement.md`，再检查 Git 状态和当前正式站。继续维护现有 Next.js/Vercel/Cloudflare 架构，不要重建网站或新建第二套线上服务。所有需要浏览器、登录、授权、验证码和视觉验收的操作只使用我的 Chrome。公司、品牌、达人和账户信息必须匿名，不能虚构指标或产品截图；中英文内容保持一致。每次修改先说明目标和验收标准，完成后运行测试、内容检查、Lint、生产构建，并在 Chrome 中验证；未经我明确同意不要部署正式站，也不要修改 Cloudflare 联系后端。

## 13. 迁移原则

“迁移到新项目”是迁移开发上下文和维护入口，不是迁移生产基础设施。推荐让新项目直接打开本机现有仓库目录；如果必须换目录，则从 GitHub 重新 clone，并重新 Link 到原 Vercel 项目。无论哪种方式，都只保留 `G-gs111/shawnnova-site` 作为唯一源码真相。
