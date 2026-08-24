export type Locale = "zh" | "en";
export type ProjectSlug = "content-compliance" | "selection-dashboard" | "qianchuan-cockpit";

export type Metric = { value: string; label: string; note?: string; key?: string };
export type Capability = { index: string; title: string; summary: string; detail: string };
export type ToolGroup = {
  stage: string;
  purpose: string;
  tools: Array<{
    label: string;
    icon?: "python" | "nodejs" | "fastapi" | "deepseek" | "openai" | "github" | "feishu" | "tencent";
  }>;
};

export type Project = {
  slug: ProjectSlug;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  problem: string;
  role: string;
  cardFacts: Metric[];
  flow: Array<{ title: string; detail: string }>;
  decisions: Array<{ title: string; detail: string }>;
  results: Metric[];
  boundary: string;
  retrospective: string;
  status: string;
};

export type LocalizedHomeContent = {
  locale: Locale;
  lang: string;
  nav: { work: string; method: string; contact: string; language: string };
  hero: {
    eyebrow: string;
    title: string;
    englishLine?: string;
    summary: string;
    primaryCta: string;
    secondaryCta: string;
    diagramLabel: string;
  };
  metrics: Metric[];
  metricsLabel: string;
  capabilities: { kicker: string; title: string; intro: string; items: Capability[] };
  work: { kicker: string; title: string; intro: string; viewCase: string; systemDiagram: string };
  experience: { kicker: string; title: string; intro: string; facts: Metric[] };
  systems: {
    kicker: string;
    title: string;
    intro: string;
    groups: ToolGroup[];
    libraryTitle: string;
    libraryIntro: string;
    libraryFacts: Metric[];
  };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    emailLabel: string;
    phoneLabel: string;
    formTitle: string;
    formNote: string;
  };
  footer: { statement: string; note: string };
};

export const projectSlugs: ProjectSlug[] = [
  "content-compliance",
  "selection-dashboard",
  "qianchuan-cockpit",
];

const projects: Record<Locale, Record<ProjectSlug, Project>> = {
  zh: {
    "content-compliance": {
      slug: "content-compliance",
      index: "01",
      title: "内容合规检测助手",
      shortTitle: "合规检测",
      category: "AI 判断 / 人机协作",
      summary: "把审核经验沉淀为规则与模型协作的预检流程，让创作者提交前完成可解释的自检。",
      problem: "脚本量增加后，人工逐条审核慢且口径不一。风险常在成片或提审后才暴露，返工成本高。",
      role: "我负责梳理审核流程、建立规则词库、设计双引擎逻辑，并根据误报和漏报持续校准。",
      cardFacts: [
        { value: "1,000+", label: "累计检测" },
        { value: "60s → 10s", label: "单条审核耗时" },
        { value: ">90%", label: "AI 命中准确率" },
      ],
      flow: [
        { title: "内容输入", detail: "创作者提交脚本或口播文案" },
        { title: "规则预检", detail: "340 条规则词库做确定性扫描" },
        { title: "模型复核", detail: "DeepSeek 判断语境与隐性风险" },
        { title: "结果交付", detail: "输出风险位置、原因与修改建议" },
        { title: "人工兜底", detail: "复杂和高风险内容进入人工复核" },
      ],
      decisions: [
        { title: "先确定性，再语义判断", detail: "规则引擎负责可解释且稳定的硬规则，模型负责语境、暗示和组合表达；两者分工比单独依赖大模型更可控。" },
        { title: "把误报变成校准数据", detail: "检测结果允许人工反馈，并把高频误报回流到词库和提示词，避免工具长期停留在一次性 Demo。" },
        { title: "保留人工责任边界", detail: "系统用于提高初筛效率，不替代平台最终审核，也不把模型输出描述为法律或平台规则的最终结论。" },
      ],
      results: [
        { value: "1,000+", label: "累计检测" },
        { value: "60s → 10s", label: "单条审核耗时" },
        { value: ">90%", label: "AI 命中准确率" },
      ],
      boundary: "检测准确率来自实际使用阶段的命中统计；平台规则会变化，仍需定期维护词库和提示词。高风险内容保留人工复核，不将系统输出视为最终裁决。",
      retrospective: "真正有价值的部分不是“接入一个模型”，而是把审核口径、反馈回路和人工兜底一起做进流程。下一步会继续细分风险等级与原因标签。",
      status: "已上线并持续使用",
    },
    "selection-dashboard": {
      slug: "selection-dashboard",
      index: "02",
      title: "商品决策与自动选品看板",
      shortTitle: "自动选品",
      category: "数据决策 / 业务看板",
      summary: "把分散商品数据清洗成统一商品池，用评分、分层和每日快照支持选品决策。",
      problem: "商品数据分散、字段口径不一，选品依赖个人经验，也无法稳定追踪重点商品的每日变化。",
      role: "我负责把业务判断转成字段和评分规则，完成数据清洗、P0–P3 分层、看板设计与每日快照覆盖检查。",
      cardFacts: [
        { value: "210", label: "清洗后的核心 SKU" },
        { value: "7", label: "维评分模型" },
        { value: "12", label: "个决策看板" },
      ],
      flow: [
        { title: "原始商品", detail: "汇总 220 个候选商品及多源字段" },
        { title: "清洗去重", detail: "统一标识、规格、状态与异常值" },
        { title: "评分分层", detail: "7 维评分并划分 P0–P3" },
        { title: "决策看板", detail: "36 字段商品池进入 12 个视图" },
        { title: "每日快照", detail: "记录重点商品变化并检查覆盖率" },
      ],
      decisions: [
        { title: "先统一商品身份", detail: "在评分前先处理重复商品、规格差异和缺失字段，避免同一商品被重复比较或错误累计。" },
        { title: "评分与分层分开表达", detail: "7 维评分保留分析细节，P0–P3 把复杂得分转成团队能直接执行的优先级。" },
        { title: "快照是交付的一部分", detail: "看板不仅展示当前状态，还要能回答“昨天发生了什么”，因此对 P0 商品建立每日快照与覆盖率检查。" },
      ],
      results: [
        { value: "210", label: "清洗后的核心 SKU" },
        { value: "12", label: "决策看板" },
        { value: "100%", label: "P0 每日快照覆盖" },
      ],
      boundary: "评分用于缩小人工决策范围，不承诺直接替代选品负责人。上游数据质量和业务目标变化会影响权重，因此保留手动刷新与规则调整入口。",
      retrospective: "业务真正采用的不是最复杂的模型，而是稳定的商品身份、清晰的优先级和可追溯的变化。后续重点是连接结果反馈，让权重能被业务结果校正。",
      status: "核心流程已上线",
    },
    "qianchuan-cockpit": {
      slug: "qianchuan-cockpit",
      index: "03",
      title: "多品牌千川数据驾驶舱",
      shortTitle: "千川驾驶舱",
      category: "官方 API / 自动同步",
      summary: "用官方 API 把多个账户的 D-1 数据同步到飞书，支持补数、重跑与日常经营查看。",
      problem: "多账户数据依赖人工导出拼接，口径不一，补数又容易覆盖或重复，缺少可恢复的同步链路。",
      role: "我负责拆解同步链路、设计飞书多层数据模型、处理历史补数与幂等写入，并通过离线测试验证关键分支。",
      cardFacts: [
        { value: "5", label: "个活跃账户" },
        { value: "D-1", label: "官方 API 每日同步" },
        { value: "170+", label: "离线测试" },
      ],
      flow: [
        { title: "官方 API", detail: "按账户拉取 D-1 投放数据" },
        { title: "标准化", detail: "统一日期、账户、项目和指标口径" },
        { title: "幂等写入", detail: "重复执行时更新对应记录而非新增重复" },
        { title: "飞书模型", detail: "明细、汇总与经营视图分层承载" },
        { title: "异常恢复", detail: "支持历史补数、日志定位与人工重跑" },
      ],
      decisions: [
        { title: "同步、计算、展示分层", detail: "先把源数据可靠落地，再计算经营指标，最后更新看板；任何一层出错都能单独定位，而不是混成一个黑盒自动化。" },
        { title: "用幂等保证可重跑", detail: "以账户、日期和业务主键定位记录，重复任务执行更新而非重复插入，才能安全处理断点和历史补数。" },
        { title: "控制能力分阶段验收", detail: "先确保核心数据同步稳定上线，再验收 WorkBuddy 的控制与交互能力，避免把未完成部分包装成整体完成。" },
      ],
      results: [
        { value: "5", label: "个活跃账户" },
        { value: "D-1", label: "每日自动同步" },
        { value: "170+", label: "离线测试" },
      ],
      boundary: "核心数据同步已经上线，部分 WorkBuddy 控制能力仍在验收。账户、品牌和具体投放数据均匿名；页面仅展示经确认可公开的系统结构与汇总数字。",
      retrospective: "驾驶舱的难点不在图表，而在数据获取、口径、幂等和故障恢复。下一阶段将继续强化运行监控和异常通知，减少人工发现问题的时间。",
      status: "核心同步已上线；部分控制能力验收中",
    },
  },
  en: {
    "content-compliance": {
      slug: "content-compliance",
      index: "01",
      title: "Content Compliance Assistant",
      shortTitle: "Compliance checks",
      category: "AI decisions / human-in-the-loop",
      summary: "A rules-and-model workflow for explainable checks before creators submit content.",
      problem: "As script volume grew, manual review became slow and inconsistent. Risks surfaced after production or submission, causing avoidable rework.",
      role: "I mapped the review flow, built the rule library, designed the dual-engine logic and calibrated it with real errors.",
      cardFacts: [
        { value: "1,000+", label: "checks completed" },
        { value: "60s → 10s", label: "review time per item" },
        { value: ">90%", label: "AI hit accuracy" },
      ],
      flow: [
        { title: "Content input", detail: "A creator submits a script or spoken copy" },
        { title: "Rule pre-check", detail: "340 deterministic rules scan explicit risks" },
        { title: "Model review", detail: "DeepSeek evaluates context and implicit risks" },
        { title: "Actionable result", detail: "Risk location, reason and revision guidance" },
        { title: "Human fallback", detail: "Complex or high-risk cases enter manual review" },
      ],
      decisions: [
        { title: "Deterministic first, semantic second", detail: "Rules handle stable and explainable constraints; the model handles context and composite phrasing. The split is more controllable than relying on a model alone." },
        { title: "Turn errors into calibration data", detail: "Human feedback on false positives and misses feeds back into the rule set and prompts, keeping the tool operational beyond a one-off demo." },
        { title: "Keep a human accountability boundary", detail: "The assistant speeds up first-pass review. It does not replace the platform's final decision or present model output as definitive policy guidance." },
      ],
      results: [
        { value: "1,000+", label: "checks completed" },
        { value: "60s → 10s", label: "review time per item" },
        { value: ">90%", label: "AI hit accuracy" },
      ],
      boundary: "Accuracy is based on observed hits during real use. Platform rules change, so the rule set and prompts require maintenance. High-risk content still receives human review.",
      retrospective: "The durable value was not simply adding a model; it was packaging review standards, feedback loops and human fallback into one workflow. The next step is finer-grained risk severity and reason labels.",
      status: "Live and in ongoing use",
    },
    "selection-dashboard": {
      slug: "selection-dashboard",
      index: "02",
      title: "Product Decision & Selection Dashboard",
      shortTitle: "Automated selection",
      category: "Data decisions / business dashboard",
      summary: "A normalized product pool, scoring model and daily snapshots for repeatable selection decisions.",
      problem: "Fragmented product data left selection dependent on individual experience and made priority changes hard to track.",
      role: "I translated business judgment into fields and scoring rules, cleaned the data, designed P0–P3 tiers and dashboards, and verified daily snapshot coverage.",
      cardFacts: [
        { value: "210", label: "normalized core SKUs" },
        { value: "7", label: "scoring dimensions" },
        { value: "12", label: "decision views" },
      ],
      flow: [
        { title: "Raw products", detail: "Aggregate 220 candidates and multi-source fields" },
        { title: "Normalize", detail: "Resolve IDs, variants, status and missing values" },
        { title: "Score and tier", detail: "Seven dimensions, then P0–P3 priorities" },
        { title: "Decision views", detail: "A 36-field pool powers 12 working views" },
        { title: "Daily snapshots", detail: "Track priority changes and verify coverage" },
      ],
      decisions: [
        { title: "Normalize identity before scoring", detail: "Duplicates, variant differences and missing fields are resolved first so the same product is not compared or counted more than once." },
        { title: "Separate scores from action tiers", detail: "Seven dimensions retain analytical detail; P0–P3 turns the complexity into a priority the operating team can act on." },
        { title: "Snapshots are part of delivery", detail: "The dashboard must answer what changed since yesterday, so P0 products receive daily snapshots and explicit coverage checks." },
      ],
      results: [
        { value: "210", label: "normalized core SKUs" },
        { value: "12", label: "decision views" },
        { value: "100%", label: "P0 daily snapshot coverage" },
      ],
      boundary: "The score narrows the human decision set; it does not replace the owner of product selection. Upstream data and changing business targets affect weights, so manual refresh and rule adjustments remain available.",
      retrospective: "Adoption came from stable product identity, clear priority tiers and traceable change—not the most complex model. The next step is feeding commercial outcomes back into the weights.",
      status: "Core workflow is live",
    },
    "qianchuan-cockpit": {
      slug: "qianchuan-cockpit",
      index: "03",
      title: "Multi-brand Qianchuan Data Cockpit",
      shortTitle: "Qianchuan cockpit",
      category: "Official API / automated sync",
      summary: "An official-API pipeline that syncs D-1 data from multiple accounts into a layered Feishu model.",
      problem: "Multiple accounts required manual exports and merges. Definitions drifted, while backfills could overwrite or duplicate records.",
      role: "I decomposed the sync pipeline, designed the layered Feishu model, implemented backfills and idempotent writes, and validated critical branches with offline tests.",
      cardFacts: [
        { value: "5", label: "active accounts" },
        { value: "D-1", label: "official API daily sync" },
        { value: "170+", label: "offline tests" },
      ],
      flow: [
        { title: "Official API", detail: "Pull D-1 delivery data by account" },
        { title: "Normalize", detail: "Align date, account, project and metric definitions" },
        { title: "Idempotent write", detail: "Reruns update matching records without duplicates" },
        { title: "Feishu model", detail: "Layer detail, aggregates and operating views" },
        { title: "Recovery", detail: "Backfill history, trace logs and rerun safely" },
      ],
      decisions: [
        { title: "Separate sync, calculation and display", detail: "Source data lands reliably first, business metrics are calculated second, and dashboards update last. Each layer can fail and recover independently." },
        { title: "Make every run safe to repeat", detail: "Account, date and business keys identify records so retries update existing rows instead of inserting duplicates—critical for backfills and interrupted jobs." },
        { title: "Accept control features in stages", detail: "The core sync went live first. WorkBuddy controls and interactions remain a separate acceptance track instead of being presented as finished." },
      ],
      results: [
        { value: "5", label: "active accounts" },
        { value: "D-1", label: "daily automated sync" },
        { value: "170+", label: "offline tests" },
      ],
      boundary: "The core data synchronization is live; some WorkBuddy control capabilities are still in acceptance. Account, brand and delivery details are anonymized, and only approved aggregate figures are public.",
      retrospective: "The hard part of a cockpit is not the chart. It is acquisition, definitions, idempotency and recovery. The next stage strengthens runtime monitoring and exception notifications.",
      status: "Core sync live; selected controls in acceptance",
    },
  },
};

const homeContent: Record<Locale, LocalizedHomeContent> = {
  zh: {
    locale: "zh",
    lang: "zh-CN",
    nav: { work: "案例", method: "工作方式", contact: "联系", language: "EN" },
    hero: {
      eyebrow: "葛少玉 / Shawnnova · FDE 方向",
      title: "把一线业务问题，做成能跑的系统。",
      englishLine: "I turn frontline business problems into systems teams can use.",
      summary: "我连接业务流程、数据、模型与 API，把想法做成团队能用、能验证、能持续运行的工具。",
      primaryCta: "查看案例",
      secondaryCta: "联系我",
      diagramLabel: "从业务现场到可运行系统的连接示意",
    },
    metricsLabel: "成果概览",
    metrics: [
      { value: "6", label: "AI 工具 / 数据流程" },
      { value: "1,000+", label: "内容检测" },
      { value: "210", label: "核心商品池" },
      { value: "5", label: "投放账户自动同步" },
    ],
    capabilities: {
      kicker: "FDE / 工作方式",
      title: "从现场判断，到稳定上线。",
      intro: "需求、系统和交付缺一不可。",
      items: [
        { index: "01", title: "进入现场", summary: "先理解流程、口径和使用者。", detail: "把模糊需求拆成真实触发点、数据来源、责任人和可验证结果。" },
        { index: "02", title: "连接系统", summary: "组合 API、数据、AI 与团队工具。", detail: "选择足够简单且可维护的技术，把分散环节连接成完整工作流。" },
        { index: "03", title: "完成交付", summary: "处理部署、异常和人工兜底。", detail: "让系统能够重复运行、可检查、可回滚，并对未完成边界诚实说明。" },
      ],
    },
    work: {
      kicker: "Selected systems / 2026",
      title: "三个已落地的业务系统。",
      intro: "只展示可公开的职责、结构和结果，商业信息已匿名。",
      viewCase: "查看完整案例",
      systemDiagram: "系统流程示意",
    },
    experience: {
      kicker: "业务经历 / 匿名呈现",
      title: "从业务结果出发，再决定技术怎么用。",
      intro: "运营、销售、产品开发和 Web coding 经历，让我能同时理解使用者与交付约束。",
      facts: [
        { value: "6", label: "个品牌项目的运营与 AI 流程改造" },
        { value: "100+", label: "位创作者协作与培训" },
        { value: "百万元级", label: "项目合计月销售规模" },
        { value: "≥3 个月", label: "相关项目月环比持续 >10%" },
      ],
    },
    systems: {
      kicker: "System map / 工具图谱",
      title: "从数据进入，到结果被使用。",
      intro: "技术按真实交付链路组织，不做 Logo 陈列。",
      groups: [
        { stage: "数据获取", purpose: "从官方接口和业务数据源取得可追溯输入", tools: [{ label: "官方 API" }, { label: "巨量千川" }, { label: "业务数据源" }] },
        { stage: "处理", purpose: "清洗、转换、计算，并提供稳定服务接口", tools: [{ label: "Python", icon: "python" }, { label: "Node.js", icon: "nodejs" }, { label: "FastAPI", icon: "fastapi" }] },
        { stage: "AI 判断", purpose: "让规则、模型和人工反馈形成可解释决策", tools: [{ label: "DeepSeek", icon: "deepseek" }, { label: "Codex", icon: "openai" }] },
        { stage: "交付", purpose: "进入团队现有工作方式并稳定运行", tools: [{ label: "飞书", icon: "feishu" }, { label: "腾讯云", icon: "tencent" }] },
        { stage: "监控与验证", purpose: "版本留痕、自动测试、日志定位与回滚", tools: [{ label: "GitHub", icon: "github" }, { label: "自动测试" }, { label: "运行日志" }] },
      ],
      libraryTitle: "爆款脚本知识库",
      libraryIntro: "把内容经验转成可检索的结构化资产，作为选题与创意工作的补充系统。",
      libraryFacts: [
        { value: "222", label: "条结构化脚本" },
        { value: "333", label: "个爆款案例" },
        { value: "12", label: "套创意词典" },
      ],
    },
    contact: {
      kicker: "Contact / 联系",
      title: "如果你在找能把业务问题做成系统的人，我们可以聊聊。",
      intro: "FDE、AI 应用、业务数据系统或自动化工作流相关机会，欢迎直接联系。",
      emailLabel: "公开邮箱",
      phoneLabel: "电话",
      formTitle: "留下联系方式",
      formNote: "留下联系方式和简单说明；你的信息只用于本次沟通。",
    },
    footer: { statement: "功不唐捐，玉汝于成。", note: "Shawnnova · FDE / AI applications & business systems" },
  },
  en: {
    locale: "en",
    lang: "en",
    nav: { work: "Work", method: "Method", contact: "Contact", language: "中文" },
    hero: {
      eyebrow: "Shaoyu Ge / Shawnnova · FDE",
      title: "I turn frontline business problems into systems teams can use.",
      summary: "I connect workflows, data, models and APIs into tools teams can use, verify and keep running.",
      primaryCta: "View case studies",
      secondaryCta: "Contact me",
      diagramLabel: "A system map from frontline context to working delivery",
    },
    metricsLabel: "Proof at a glance",
    metrics: [
      { value: "6", label: "AI tools / data flows" },
      { value: "1,000+", label: "content checks" },
      { value: "210", label: "core SKUs" },
      { value: "5", label: "ad accounts synced" },
    ],
    capabilities: {
      kicker: "FDE / How I work",
      title: "From field judgment to a stable launch.",
      intro: "Requirements, systems and delivery all matter.",
      items: [
        { index: "01", title: "Enter the field", summary: "Understand the workflow, definitions and users.", detail: "Turn an ambiguous request into triggers, data sources, owners and a verifiable outcome." },
        { index: "02", title: "Connect the system", summary: "Compose APIs, data, AI and team tools.", detail: "Choose maintainable technology and connect scattered steps into one working flow." },
        { index: "03", title: "Finish delivery", summary: "Handle deployment, exceptions and human fallback.", detail: "Make the system repeatable, inspectable and reversible—and state unfinished boundaries clearly." },
      ],
    },
    work: {
      kicker: "Selected systems / 2026",
      title: "Three business systems already in use.",
      intro: "Only approved responsibilities, structures and results are shown; commercial details are anonymized.",
      viewCase: "Read the case study",
      systemDiagram: "System flow illustration",
    },
    experience: {
      kicker: "Business context / anonymized",
      title: "Start with the business outcome, then choose the technology.",
      intro: "Operations, sales, product and web-coding experience helps me understand both users and delivery constraints.",
      facts: [
        { value: "6", label: "brand operations and AI workflow projects" },
        { value: "100+", label: "creators collaborated with and trained" },
        { value: "RMB 1M+", label: "combined monthly sales scale" },
        { value: "3+ months", label: "of >10% month-over-month growth" },
      ],
    },
    systems: {
      kicker: "System map / tools",
      title: "From incoming data to a result people can use.",
      intro: "Technology is organized by the delivery path, not as a logo wall.",
      groups: [
        { stage: "Acquire", purpose: "Obtain traceable inputs from official interfaces and business sources", tools: [{ label: "Official APIs" }, { label: "Qianchuan" }, { label: "Business sources" }] },
        { stage: "Process", purpose: "Clean, transform, calculate and expose stable services", tools: [{ label: "Python", icon: "python" }, { label: "Node.js", icon: "nodejs" }, { label: "FastAPI", icon: "fastapi" }] },
        { stage: "Decide with AI", purpose: "Combine rules, models and human feedback into explainable decisions", tools: [{ label: "DeepSeek", icon: "deepseek" }, { label: "Codex", icon: "openai" }] },
        { stage: "Deliver", purpose: "Fit into existing team workflows and run reliably", tools: [{ label: "Feishu", icon: "feishu" }, { label: "Tencent Cloud", icon: "tencent" }] },
        { stage: "Monitor & verify", purpose: "Track versions, tests, logs and rollback paths", tools: [{ label: "GitHub", icon: "github" }, { label: "Automated tests" }, { label: "Runtime logs" }] },
      ],
      libraryTitle: "Viral Script Knowledge Base",
      libraryIntro: "A supporting system that turns content experience into searchable, structured creative assets.",
      libraryFacts: [
        { value: "222", label: "structured scripts" },
        { value: "333", label: "viral examples" },
        { value: "12", label: "creative dictionaries" },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "If you need someone who can turn a business problem into a working system, let's talk.",
      intro: "For FDE roles, AI applications, business data systems or workflow automation, get in touch directly.",
      emailLabel: "Public email",
      phoneLabel: "Phone",
      formTitle: "Leave your details",
      formNote: "Leave your details and a short note. Your information is used only for this conversation.",
    },
    footer: { statement: "Steady work is never wasted.", note: "Shawnnova · FDE / AI applications & business systems" },
  },
};

export const publicContact = {
  email: "shawnnovags111@gmail.com",
  phone: "18379582410",
  github: "https://github.com/shawnnovags",
} as const;

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}

export function getProjects(locale: Locale) {
  return projectSlugs.map((slug) => projects[locale][slug]);
}

export function getProject(locale: Locale, slug: string) {
  if (!projectSlugs.includes(slug as ProjectSlug)) return undefined;
  return projects[locale][slug as ProjectSlug];
}
