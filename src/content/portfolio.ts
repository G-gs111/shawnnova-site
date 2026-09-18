export type Locale = "zh" | "en";
export type ProjectSlug =
  | "content-compliance"
  | "script-knowledge-workflow"
  | "selection-dashboard"
  | "qianchuan-cockpit";

export type Metric = { value: string; label: string; note?: string; key?: string };
export type Capability = { index: string; title: string; summary: string; detail: string };
export type DeliveryStage = { title: string; summary: string; detail: string };
export type ToolGroup = {
  stage: string;
  purpose: string;
  tools: Array<{
    label: string;
    icon?: "python" | "nodejs" | "fastapi" | "deepseek" | "openai" | "github" | "feishu" | "tencent";
  }>;
};

export type ProjectEvidence = {
  problem: string;
  built: string;
  adopted: string;
  proof: string;
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
  delivery: {
    label: string;
    stages: [DeliveryStage, DeliveryStage, DeliveryStage, DeliveryStage];
  };
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
  "script-knowledge-workflow",
  "selection-dashboard",
  "qianchuan-cockpit",
];

const projects: Record<Locale, Record<ProjectSlug, Project>> = {
  zh: {
    "content-compliance": {
      slug: "content-compliance",
      featured: true,
      index: "01",
      title: "创作者脚本风险自检 H5",
      shortTitle: "脚本风险自检",
      category: "规则引擎 / LLM / 人机协作",
      summary: "把分散的审核经验做成创作者提交前可使用的风险自检流程。",
      problem: "脚本量增加后，人工逐条审核慢且口径不一；风险经常在成片或提审后才暴露，返工成本高。",
      role: "我负责梳理审核流程、把规则做成动态数据、设计规则与模型双引擎，并将工具部署到真实创作者流程中持续校准。",
      evidence: {
        problem: "人工审核慢，风险暴露晚",
        built: "429 条动态规则 + LLM 语义补充",
        adopted: "112 位真实创作者使用",
        proof: "1,356 次有效检测",
      },
      cardFacts: [
        { value: "112", label: "真实创作者用户", key: "users" },
        { value: "1,356", label: "有效检测", key: "checks" },
        { value: "52% → 24%", label: "两组样本驳回占比", key: "sample_change" },
      ],
      flow: [
        { title: "脚本输入", detail: "创作者提交口播脚本或短视频文案" },
        { title: "规则预检", detail: "429 条动态规则扫描明确风险" },
        { title: "语义补充", detail: "大模型识别语境、暗示与组合表达" },
        { title: "建议交付", detail: "返回风险位置、原因与修改方向" },
        { title: "人工兜底", detail: "复杂内容仍由业务人员与平台终审" },
      ],
      decisions: [
        { title: "确定性规则先行", detail: "硬规则先给出稳定且可解释的结果，模型只补充语义风险，避免把全部判断交给一次不可控的生成。" },
        { title: "规则从代码中解耦", detail: "用五张业务表维护规则、用户、检测历史和驳回案例，使业务变化无需重新发布整套应用。" },
        { title: "把责任边界写进流程", detail: "产品用于提交前自检，不替代平台审核、业务复核或最终合规判断。" },
      ],
      results: [
        { value: "112", label: "真实创作者用户", key: "users" },
        { value: "1,356", label: "有效检测", key: "checks" },
        { value: "52% → 24%", label: "两组 50 条样本的驳回占比", key: "sample_change" },
      ],
      boundary: "52%（26/50）与 24%（12/50）来自两个独立的 50 条样本，只能说明使用前后的观察差异，不能单独证明因果。系统用于预检，平台与人工保留最终判断。",
      retrospective: "交付价值不在于单纯接入模型，而在于把审核口径、动态规则、反馈回路与人工兜底一起放进可持续使用的流程。",
      status: "已上线并持续使用",
    },
    "script-knowledge-workflow": {
      slug: "script-knowledge-workflow",
      featured: true,
      index: "02",
      title: "脚本知识库与 AI 生成工作流",
      shortTitle: "脚本知识工作流",
      category: "知识工程 / AI 生成 / 质量闭环",
      summary: "把个人创作经验转成团队可检索、可复用、可反馈的脚本生产系统。",
      problem: "脚本创作依赖个人经验，素材散落且复用困难；直接让模型生成时，内容质量与业务适配不稳定。",
      role: "我负责设计四层知识结构、组织案例与词句资产，并把采集、拆解、匹配、生成、自检和人工反馈串成工作流。",
      evidence: {
        problem: "创作经验分散，生成质量不稳",
        built: "四层知识结构 + 生成质量闭环",
        adopted: "8 位运营实际使用",
        proof: "100 条生成，89 条采用发布",
      },
      cardFacts: [
        { value: "89/100", label: "采用并交付拍摄", key: "adoption" },
        { value: "60min → 10min", label: "单条完整制作时间", key: "time" },
        { value: "200+ / 近 300", label: "案例 / 可复用词句", key: "assets" },
      ],
      flow: [
        { title: "素材采集", detail: "汇总高质量脚本、成片与业务资料" },
        { title: "结构拆解", detail: "转写并提取结构、标签和表达方式" },
        { title: "知识匹配", detail: "按品类、目标与创意意图检索参考" },
        { title: "多版生成", detail: "结合商品信息生成多个可选脚本" },
        { title: "反馈回流", detail: "自检、人工修改与采用结果返回知识库" },
      ],
      decisions: [
        { title: "先建结构，再扩充数量", detail: "用结构词典、标签系统、参考案例和可复用词句组成四层知识，避免知识库退化成不可检索的素材仓。" },
        { title: "补齐商品与竞品信息", detail: "生成前补充商品事实和竞品表达，生成后执行合规自检，降低通用提示词带来的空泛内容。" },
        { title: "把采用作为质量信号", detail: "记录运营是否采用、如何修改以及是否交付拍摄，比单次主观打分更接近真实工作流。" },
      ],
      results: [
        { value: "89/100", label: "采用并交付拍摄", key: "adoption" },
        { value: "60min → 10min", label: "单条完整制作时间", key: "time" },
        { value: "200+ / 近 300", label: "案例 / 可复用词句", key: "assets" },
      ],
      boundary: "89 条采用表示脚本进入创作者拍摄与发布流程，不代表每条内容都带来商业增长。最终内容质量仍由运营与创作者共同判断。",
      retrospective: "稳定生成来自知识结构、业务信息和反馈闭环的共同作用。下一步应继续追踪发布后的内容表现，让采用信号与结果信号分层。",
      status: "已进入团队实际使用",
    },
    "selection-dashboard": {
      slug: "selection-dashboard",
      featured: true,
      index: "03",
      title: "宠物品类选品监测与辅助决策",
      shortTitle: "选品辅助决策",
      category: "数据监测 / 规则判断 / 人机协作",
      summary: "把经验型选品拆成可执行规则，用多源数据缩小人工判断范围。",
      problem: "选品依赖少数人的经验，市场扫描口径不一；上游数据常以区间呈现，字段关联异常又容易被误当成真实机会。",
      role: "我负责梳理选品判断、定义机会规则和数据交叉验证方式，并在真实轮次中记录推荐、人工复核与推进结果。",
      evidence: {
        problem: "经验难复制，扫描耗时且不稳定",
        built: "机会规则 + 多源交叉验证",
        adopted: "10 轮真实选品任务",
        proof: "30 个推荐中 27 个经复核推进",
      },
      cardFacts: [
        { value: "10", label: "真实选品轮次", key: "rounds" },
        { value: "27/30", label: "人工复核后推进", key: "advancement" },
        { value: "60min → 15min", label: "单轮耗时", key: "time" },
      ],
      flow: [
        { title: "市场扫描", detail: "读取榜单、视频、达人和销量区间" },
        { title: "机会识别", detail: "识别老品回升、新品加速与新链接机会" },
        { title: "数据核验", detail: "保留原始区间并排查字段与匹配异常" },
        { title: "候选输出", detail: "去重后给出理由与待验证信息" },
        { title: "人工决策", detail: "运营复核并决定是否进入下一阶段" },
      ],
      decisions: [
        { title: "保留原始区间", detail: "不把区间型 GMV 或销量加工成虚假的精确值；证据不足时明确标记“待验证”。" },
        { title: "先排查数据异常", detail: "字段关联、商品匹配与口径问题必须先诊断，再把变化解释为业务机会。" },
        { title: "系统缩小范围，人做决定", detail: "规则用于稳定扫描和排序，不取代对供应、利润、内容适配和品牌策略的综合判断。" },
      ],
      results: [
        { value: "10", label: "真实选品轮次", key: "rounds" },
        { value: "27/30", label: "人工复核后推进", key: "advancement" },
        { value: "60min → 15min", label: "单轮耗时", key: "time" },
      ],
      boundary: "90% 是 30 个去重推荐中有 27 个经人工复核后推进的比例，不等同于最终上架或销售成功率；最终决策仍由选品负责人完成。",
      retrospective: "可信的辅助决策首先要诚实面对数据的不确定性。系统的角色是让经验可复用、证据可回看，而不是给出看似精确的自动答案。",
      status: "已完成 10 轮真实验证",
    },
    "qianchuan-cockpit": {
      slug: "qianchuan-cockpit",
      featured: false,
      index: "04",
      title: "多品牌千川数据驾驶舱",
      shortTitle: "千川数据驾驶舱",
      category: "官方 API / 数据同步 / 飞书",
      summary: "将多账户 D-1 投放数据稳定同步到飞书，并支持补数、重跑和分层查看。",
      problem: "多账户数据依赖人工导出拼接，口径容易漂移；历史补数和重复运行又可能覆盖或制造重复记录。",
      role: "我负责拆分数据获取、计算、存储与展示链路，设计飞书多层数据模型、历史补数和幂等写入，并用离线测试覆盖关键分支。",
      evidence: {
        problem: "人工导出，口径与重跑风险高",
        built: "官方 API + 幂等同步 + 飞书分层模型",
        adopted: "4 个活跃账户持续同步",
        proof: "171 项离线测试通过",
      },
      cardFacts: [
        { value: "4", label: "活跃账户", key: "accounts" },
        { value: "D-1", label: "官方 API 每日同步", key: "cadence" },
        { value: "171", label: "离线测试", key: "tests" },
      ],
      flow: [
        { title: "官方 API", detail: "按账户获取 D-1 投放数据" },
        { title: "标准化", detail: "统一日期、账户、项目与指标口径" },
        { title: "幂等写入", detail: "重复运行更新对应记录而不新增重复" },
        { title: "飞书模型", detail: "明细、汇总与经营视图分层承载" },
        { title: "异常恢复", detail: "支持历史补数、日志定位与人工重跑" },
      ],
      decisions: [
        { title: "获取、计算、展示分层", detail: "源数据先可靠落地，再计算经营指标，最后更新视图，使每层都能独立定位和恢复。" },
        { title: "重复执行必须安全", detail: "以账户、日期和业务主键定位记录，任务重跑时更新而不是重复插入。" },
        { title: "能力分阶段验收", detail: "先保证核心同步上线，再单独验收 WorkBuddy 控制能力，不把尚未完成的范围包装成整体交付。" },
      ],
      results: [
        { value: "4", label: "活跃账户", key: "accounts" },
        { value: "D-1", label: "每日自动同步", key: "cadence" },
        { value: "171", label: "离线测试", key: "tests" },
      ],
      boundary: "核心数据同步已经上线，部分 WorkBuddy 控制能力仍在验收。账户、品牌、项目与具体投放数据均保持匿名。",
      retrospective: "驾驶舱的核心不是图表，而是稳定的数据获取、清晰口径、幂等写入与故障恢复。",
      status: "核心同步已上线；部分控制能力验收中",
    },
  },
  en: {
    "content-compliance": {
      slug: "content-compliance",
      featured: true,
      index: "01",
      title: "Creator Script Risk Self-check H5",
      shortTitle: "Script risk self-check",
      category: "Rules / LLM / human-in-the-loop",
      summary: "A pre-submission risk workflow built from scattered review experience.",
      problem: "As script volume grew, manual review became slow and inconsistent. Risks often appeared only after production or platform submission.",
      role: "I mapped the review process, made rules dynamically maintainable, designed the rules-plus-model engine, and deployed it into the real creator workflow.",
      evidence: {
        problem: "Slow review and late risk discovery",
        built: "429 dynamic rules + LLM semantic review",
        adopted: "Used by 112 real creators",
        proof: "1,356 effective checks",
      },
      cardFacts: [
        { value: "112", label: "real creator users", key: "users" },
        { value: "1,356", label: "effective checks", key: "checks" },
        { value: "52% → 24%", label: "rejection share in two samples", key: "sample_change" },
      ],
      flow: [
        { title: "Script input", detail: "A creator submits spoken or short-video copy" },
        { title: "Rule scan", detail: "429 dynamic rules catch explicit risks" },
        { title: "Semantic pass", detail: "The model reviews context and implicit phrasing" },
        { title: "Actionable guidance", detail: "Return location, reason and revision direction" },
        { title: "Human fallback", detail: "Business and platform reviewers keep final judgment" },
      ],
      decisions: [
        { title: "Deterministic rules first", detail: "Stable rules produce explainable results; the model supplements semantic cases instead of owning every decision." },
        { title: "Separate rules from releases", detail: "Five business tables hold rules, users, check history and rejected cases so policy changes do not require a full redeploy." },
        { title: "Build the boundary into the flow", detail: "The product supports pre-checks; it does not replace platform review, business review or final compliance judgment." },
      ],
      results: [
        { value: "112", label: "real creator users", key: "users" },
        { value: "1,356", label: "effective checks", key: "checks" },
        { value: "52% → 24%", label: "rejection share in two 50-item samples", key: "sample_change" },
      ],
      boundary: "The 52% (26/50) and 24% (12/50) figures come from two separate 50-item samples. They show an observed difference, not a controlled causal result. Humans and the platform retain final judgment.",
      retrospective: "The durable value is not merely a model call; it is the combination of review standards, dynamic rules, a feedback loop and human fallback.",
      status: "Live and in ongoing use",
    },
    "script-knowledge-workflow": {
      slug: "script-knowledge-workflow",
      featured: true,
      index: "02",
      title: "Script Knowledge Base & AI Generation Workflow",
      shortTitle: "Script knowledge workflow",
      category: "Knowledge engineering / generation / quality loop",
      summary: "A searchable and reusable production system built from individual creative experience.",
      problem: "Script creation depended on individual experience, source material was fragmented, and direct model generation produced inconsistent business fit.",
      role: "I designed the four-layer knowledge structure and connected collection, decomposition, matching, generation, self-check and human feedback.",
      evidence: {
        problem: "Fragmented experience and inconsistent output",
        built: "Four-layer knowledge system + quality loop",
        adopted: "Used by eight operators",
        proof: "89 of 100 scripts adopted for production",
      },
      cardFacts: [
        { value: "89/100", label: "adopted for production", key: "adoption" },
        { value: "60min → 10min", label: "full production time", key: "time" },
        { value: "200+ / nearly 300", label: "cases / reusable phrases", key: "assets" },
      ],
      flow: [
        { title: "Collect", detail: "Gather strong scripts, videos and product material" },
        { title: "Decompose", detail: "Transcribe and extract structures, tags and phrasing" },
        { title: "Match knowledge", detail: "Retrieve references by category, goal and intent" },
        { title: "Generate variants", detail: "Create multiple scripts with verified product facts" },
        { title: "Return feedback", detail: "Feed self-checks, edits and adoption back into the system" },
      ],
      decisions: [
        { title: "Structure before volume", detail: "A structure dictionary, tag system, reference cases and reusable phrasing keep the library searchable instead of becoming a file dump." },
        { title: "Complete business context", detail: "Product facts and competitor research enter before generation; compliance checks follow generation." },
        { title: "Use adoption as a quality signal", detail: "Operator adoption and edits provide stronger workflow evidence than a one-off subjective score." },
      ],
      results: [
        { value: "89/100", label: "adopted for production", key: "adoption" },
        { value: "60min → 10min", label: "full production time", key: "time" },
        { value: "200+ / nearly 300", label: "cases / reusable phrases", key: "assets" },
      ],
      boundary: "Adoption means a script entered creator filming and publishing. It does not show that every published script produced commercial growth; operators and creators retain final quality judgment.",
      retrospective: "Reliable generation comes from structure, business context and feedback together. The next step is to separate adoption signals from post-publication performance signals.",
      status: "In active team use",
    },
    "selection-dashboard": {
      slug: "selection-dashboard",
      featured: true,
      index: "03",
      title: "Pet-category Selection Monitoring & Assisted Decisions",
      shortTitle: "Selection decisions",
      category: "Monitoring / rules / human-in-the-loop",
      summary: "An evidence-preserving workflow that turns tacit selection judgment into repeatable rules.",
      problem: "Selection depended on a small group of experienced people, scanning was inconsistent, and upstream ranges or matching errors could be mistaken for real opportunities.",
      role: "I translated selection judgment into opportunity rules and cross-checks, then recorded recommendations, human review and advancement across real rounds.",
      evidence: {
        problem: "Tacit judgment and slow, inconsistent scans",
        built: "Opportunity rules + multi-source validation",
        adopted: "Ten real selection rounds",
        proof: "27 of 30 recommendations advanced after review",
      },
      cardFacts: [
        { value: "10", label: "real selection rounds", key: "rounds" },
        { value: "27/30", label: "advanced after human review", key: "advancement" },
        { value: "60min → 15min", label: "time per round", key: "time" },
      ],
      flow: [
        { title: "Scan market", detail: "Read rankings, videos, creators and range-based sales" },
        { title: "Detect opportunities", detail: "Find incumbent recovery, new growth and new links" },
        { title: "Validate data", detail: "Preserve ranges and diagnose field or match anomalies" },
        { title: "Deliver candidates", detail: "Deduplicate with reasons and pending evidence" },
        { title: "Human decision", detail: "Operations review and decide whether to advance" },
      ],
      decisions: [
        { title: "Preserve source ranges", detail: "Range-based GMV or sales never become fake precision; insufficient evidence is explicitly marked pending validation." },
        { title: "Diagnose anomalies first", detail: "Field linking, product matching and definition problems are ruled out before a change is treated as a business opportunity." },
        { title: "The system narrows; humans decide", detail: "Rules stabilize scanning and ranking but do not replace supply, margin, content-fit or brand judgment." },
      ],
      results: [
        { value: "10", label: "real selection rounds", key: "rounds" },
        { value: "27/30", label: "advanced after human review", key: "advancement" },
        { value: "60min → 15min", label: "time per round", key: "time" },
      ],
      boundary: "The 90% figure means 27 of 30 deduplicated recommendations advanced after human review. It is not a listing or sales success rate; the selection owner retains the final decision.",
      retrospective: "Trustworthy assisted decisions start by being honest about uncertainty. The system makes experience reusable and evidence reviewable rather than manufacturing a precise automatic answer.",
      status: "Validated across ten real rounds",
    },
    "qianchuan-cockpit": {
      slug: "qianchuan-cockpit",
      featured: false,
      index: "04",
      title: "Multi-brand Qianchuan Data Cockpit",
      shortTitle: "Qianchuan data cockpit",
      category: "Official API / data sync / Feishu",
      summary: "Reliable D-1 delivery-data synchronization with backfills, reruns and layered Feishu views.",
      problem: "Multiple accounts depended on manual exports and merges. Definitions could drift, while backfills and reruns risked overwrites or duplicate records.",
      role: "I separated acquisition, calculation, storage and display; designed the layered Feishu model, backfills and idempotent writes; and covered critical branches with offline tests.",
      evidence: {
        problem: "Manual exports with definition and rerun risk",
        built: "Official API + idempotent sync + layered Feishu model",
        adopted: "Four active accounts synced continuously",
        proof: "171 offline tests passing",
      },
      cardFacts: [
        { value: "4", label: "active accounts", key: "accounts" },
        { value: "D-1", label: "official API daily sync", key: "cadence" },
        { value: "171", label: "offline tests", key: "tests" },
      ],
      flow: [
        { title: "Official API", detail: "Fetch D-1 delivery data by account" },
        { title: "Normalize", detail: "Align date, account, project and metric definitions" },
        { title: "Idempotent write", detail: "Reruns update matching records without duplicates" },
        { title: "Feishu model", detail: "Layer details, aggregates and operating views" },
        { title: "Recovery", detail: "Backfill history, trace logs and rerun safely" },
      ],
      decisions: [
        { title: "Separate acquisition, calculation and display", detail: "Source data lands reliably first, business metrics are calculated second, and views update last so every layer can recover independently." },
        { title: "Make reruns safe", detail: "Account, date and business keys identify records so retries update existing rows instead of inserting duplicates." },
        { title: "Accept capabilities in stages", detail: "The core sync went live first; WorkBuddy controls remain a separate acceptance track." },
      ],
      results: [
        { value: "4", label: "active accounts", key: "accounts" },
        { value: "D-1", label: "daily automated sync", key: "cadence" },
        { value: "171", label: "offline tests", key: "tests" },
      ],
      boundary: "Core data synchronization is live; selected WorkBuddy control capabilities remain in acceptance. Account, brand, project and delivery details stay anonymous.",
      retrospective: "The core of a cockpit is not the chart; it is reliable acquisition, clear definitions, idempotent writes and recovery.",
      status: "Core sync live; selected controls in acceptance",
    },
  },
};

const sharedTools: Record<Locale, ToolGroup[]> = {
  zh: [
    { stage: "数据获取", purpose: "连接真实业务数据与团队资料", tools: [{ label: "飞书", icon: "feishu" }, { label: "官方 API" }] },
    { stage: "处理建模", purpose: "清洗、标准化并固化可维护规则", tools: [{ label: "Python", icon: "python" }, { label: "Node.js", icon: "nodejs" }] },
    { stage: "AI 判断", purpose: "让模型在确定性规则之后补充语义能力", tools: [{ label: "DeepSeek", icon: "deepseek" }, { label: "Codex", icon: "openai" }] },
    { stage: "交付上线", purpose: "把能力嵌入团队可访问的工作流程", tools: [{ label: "FastAPI", icon: "fastapi" }, { label: "腾讯云", icon: "tencent" }] },
    { stage: "验证维护", purpose: "用版本、测试和日志持续校准系统", tools: [{ label: "GitHub", icon: "github" }, { label: "自动化测试" }] },
  ],
  en: [
    { stage: "Acquire", purpose: "Connect real business data and team material", tools: [{ label: "Feishu", icon: "feishu" }, { label: "Official APIs" }] },
    { stage: "Structure", purpose: "Clean, normalize and encode maintainable rules", tools: [{ label: "Python", icon: "python" }, { label: "Node.js", icon: "nodejs" }] },
    { stage: "AI judgment", purpose: "Add semantic capability after deterministic rules", tools: [{ label: "DeepSeek", icon: "deepseek" }, { label: "Codex", icon: "openai" }] },
    { stage: "Deliver", purpose: "Embed capability in workflows teams can access", tools: [{ label: "FastAPI", icon: "fastapi" }, { label: "Tencent Cloud", icon: "tencent" }] },
    { stage: "Validate", purpose: "Use versions, tests and logs to sustain the system", tools: [{ label: "GitHub", icon: "github" }, { label: "Automated tests" }] },
  ],
};

const homeContent: Record<Locale, LocalizedHomeContent> = {
  zh: {
    locale: "zh",
    lang: "zh-CN",
    nav: { work: "案例", method: "交付方式", contact: "联系", language: "EN" },
    hero: {
      eyebrow: "葛少玉 / Shawnnova · FDE / AI 应用交付",
      title: "业务问题，不止分析；我把它交付成系统。",
      englishLine: "I turn frontline business problems into systems teams adopt.",
      summary: "进入真实业务流程，连接数据、API、模型与团队工作方式，让 AI 从方案走到上线、采用与持续迭代。",
      primaryCta: "查看案例",
      secondaryCta: "联系我",
      diagramLabel: "从问题发现到持续采用的交付控制台",
    },
    metricsLabel: "成果证据",
    metrics: [
      { value: "112", label: "真实创作者用户", note: "合规自检 H5" },
      { value: "1,356", label: "有效检测", note: "截至 2026-08-30" },
      { value: "89/100", label: "脚本采用并交付", note: "8 位运营参与" },
      { value: "10", label: "真实选品轮次", note: "27/30 经复核推进" },
      { value: "1/67", label: "专业排名", note: "2027 届 · 两项国家级奖项" },
    ],
    delivery: {
      label: "交付控制台",
      stages: [
        { title: "进入业务", summary: "看见真实问题", detail: "访谈使用者，厘清触发点、口径与责任人" },
        { title: "快速构建", summary: "把判断做成系统", detail: "组合规则、数据、API 与模型形成可运行版本" },
        { title: "推动上线", summary: "让系统安全进入流程", detail: "部署、异常处理与人工兜底" },
        { title: "持续采用", summary: "用结果推动迭代", detail: "记录采用、反馈与边界，持续校准系统" },
      ],
    },
    capabilities: {
      kicker: "Delivery method / 04 steps",
      title: "进入业务，构建系统，推动上线，持续采用。",
      intro: "FDE 不是只给建议，而是对问题澄清、实现路径和真实使用共同负责。",
      items: [
        { index: "01", title: "进入业务", summary: "先理解谁在什么场景下遇到问题。", detail: "把模糊需求拆成触发条件、数据来源、当前做法和可验证结果。" },
        { index: "02", title: "快速构建", summary: "选择足够简单、可维护的实现。", detail: "用规则、API、AI 和团队工具完成第一条可运行闭环。" },
        { index: "03", title: "推动上线", summary: "处理部署、异常与人工兜底。", detail: "不把 Demo 当交付，明确权限、失败路径和最终责任人。" },
        { index: "04", title: "持续采用", summary: "用采用和结果反馈继续迭代。", detail: "记录使用、误差和业务变化，让系统随流程而更新。" },
      ],
    },
    work: {
      kicker: "Selected delivery / 2026",
      title: "从真实问题，到被采用的系统成果。",
      intro: "三个重点案例按问题、构建、采用和证据呈现；商业身份均已匿名。",
      viewCase: "查看完整案例",
      systemDiagram: "系统流程示意",
    },
    experience: {
      kicker: "Profile / credibility",
      title: "业务经验是起点，系统交付是现在的方向。",
      intro: "从运营、创作者协作和内容交付进入现场，再把高频问题做成可复用的 AI 应用。",
      facts: [
        { value: "2027 届", label: "武汉科技大学 · 物流管理" },
        { value: "1/67", label: "专业排名 · CET-6" },
        { value: "2 项", label: "国家级创新创业奖项" },
        { value: "20+", label: "培训案例与操作 SOP" },
      ],
    },
    systems: {
      kicker: "Systems / toolchain",
      title: "工具按交付链路组织，而不是按 Logo 陈列。",
      intro: "每个工具只在它真正承担的数据、判断、交付或验证环节出现。",
      groups: sharedTools.zh,
      libraryTitle: "多品牌千川数据驾驶舱",
      libraryIntro: "支持 4 个活跃账户的 D-1 同步；核心链路已上线，部分控制能力仍在验收。",
      libraryFacts: [
        { value: "4", label: "活跃账户" },
        { value: "D-1", label: "每日同步" },
        { value: "171", label: "离线测试" },
      ],
    },
    contact: {
      kicker: "Contact / next conversation",
      title: "聊聊你的下一项 AI 应用交付。",
      intro: "如果你在寻找能进入业务、快速构建并推动系统被真实采用的人，欢迎直接联系。",
      emailLabel: "公开邮箱",
      phoneLabel: "电话",
      formTitle: "留下联系方式",
      formNote: "写下你的称呼、联系方式和想聊的问题；信息只用于本次沟通。",
    },
    footer: { statement: "功不唐捐，玉汝于成。", note: "葛少玉 Shawnnova · FDE / AI 应用交付" },
  },
  en: {
    locale: "en",
    lang: "en",
    nav: { work: "Cases", method: "Method", contact: "Contact", language: "中文" },
    hero: {
      eyebrow: "Shaoyu Ge / Shawnnova · FDE / AI application delivery",
      title: "I turn frontline business problems into systems teams adopt.",
      summary: "I enter real workflows and connect data, APIs, models and team practices so AI moves from proposal to launch, adoption and iteration.",
      primaryCta: "View case studies",
      secondaryCta: "Contact me",
      diagramLabel: "Delivery console from problem discovery to sustained adoption",
    },
    metricsLabel: "Delivery evidence",
    metrics: [
      { value: "112", label: "real creator users", note: "risk self-check H5" },
      { value: "1,356", label: "effective checks", note: "as of 2026-08-30" },
      { value: "89/100", label: "scripts adopted", note: "eight operators" },
      { value: "10", label: "real selection rounds", note: "27/30 advanced after review" },
      { value: "1/67", label: "major rank", note: "Class of 2027 · two national awards" },
    ],
    delivery: {
      label: "Delivery console",
      stages: [
        { title: "Enter the workflow", summary: "See the real problem", detail: "Interview users and clarify triggers, definitions and ownership" },
        { title: "Build quickly", summary: "Turn judgment into a system", detail: "Combine rules, data, APIs and models into a working loop" },
        { title: "Launch safely", summary: "Put the system into real work", detail: "Handle deployment, exceptions and human fallback" },
        { title: "Sustain adoption", summary: "Iterate from evidence", detail: "Track adoption, feedback and boundaries as the workflow changes" },
      ],
    },
    capabilities: {
      kicker: "Delivery method / 04 steps",
      title: "Enter the workflow. Build. Launch. Sustain adoption.",
      intro: "FDE work means owning problem clarity, implementation choices and real use—not stopping at advice.",
      items: [
        { index: "01", title: "Enter the workflow", summary: "Understand who hits the problem and when.", detail: "Break ambiguity into triggers, sources, current work and measurable outcomes." },
        { index: "02", title: "Build quickly", summary: "Choose the simplest maintainable implementation.", detail: "Use rules, APIs, AI and team tools to close the first working loop." },
        { index: "03", title: "Launch safely", summary: "Handle deployment, exceptions and human fallback.", detail: "Do not confuse a demo with delivery; make failures and ownership explicit." },
        { index: "04", title: "Sustain adoption", summary: "Iterate from adoption and outcome signals.", detail: "Record use, errors and business change so the system keeps matching the workflow." },
      ],
    },
    work: {
      kicker: "Selected delivery / 2026",
      title: "From a real problem to a system people use.",
      intro: "Three flagship cases organized by problem, build, adoption and evidence. Commercial identities are anonymized.",
      viewCase: "View full case",
      systemDiagram: "System flow illustration",
    },
    experience: {
      kicker: "Profile / credibility",
      title: "Business experience is the starting point; system delivery is the direction.",
      intro: "I entered frontline work through operations, creator collaboration and content delivery, then turned repeated problems into reusable AI applications.",
      facts: [
        { value: "Class of 2027", label: "Wuhan University of Science and Technology · Logistics Management" },
        { value: "1/67", label: "Major rank · CET-6" },
        { value: "2", label: "National innovation and entrepreneurship awards" },
        { value: "20+", label: "Training cases and operating SOPs" },
      ],
    },
    systems: {
      kicker: "Systems / toolchain",
      title: "Tools are organized by the delivery chain, not as a logo wall.",
      intro: "Each tool appears only where it performs a real role in data, judgment, delivery or validation.",
      groups: sharedTools.en,
      libraryTitle: "Multi-brand Qianchuan Data Cockpit",
      libraryIntro: "D-1 sync for four active accounts. The core pipeline is live; selected controls remain in acceptance.",
      libraryFacts: [
        { value: "4", label: "active accounts" },
        { value: "D-1", label: "daily sync" },
        { value: "171", label: "offline tests" },
      ],
    },
    contact: {
      kicker: "Contact / next conversation",
      title: "Let's talk about your next AI application delivery.",
      intro: "If you need someone who can enter the workflow, build quickly and help a system reach real adoption, get in touch.",
      emailLabel: "Public email",
      phoneLabel: "Phone",
      formTitle: "Leave your details",
      formNote: "Share your name, contact details and what you would like to discuss. Your information is used only for this conversation.",
    },
    footer: { statement: "Steady work is never wasted.", note: "Shaoyu Ge / Shawnnova · FDE / AI application delivery" },
  },
};

export const publicContact = {
  email: "shawnnovags111@gmail.com",
  phone: "18379582410",
  github: "https://github.com/G-gs111",
} as const;

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}

export function getProjects(locale: Locale) {
  return projectSlugs.map((slug) => projects[locale][slug]);
}

export function getFeaturedProjects(locale: Locale) {
  return getProjects(locale).filter((project) => project.featured);
}

export function getSupportingProjects(locale: Locale) {
  return getProjects(locale).filter((project) => !project.featured);
}

export function getProject(locale: Locale, slug: string) {
  if (!projectSlugs.includes(slug as ProjectSlug)) return undefined;
  return projects[locale][slug as ProjectSlug];
}
