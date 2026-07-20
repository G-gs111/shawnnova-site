export const siteContent = {
  identity: {
    name: "葛少玉",
    alias: "Shawnnova",
    role: "独立开发者",
    headline: "把复杂技术，做成愿意被使用的产品。",
    introduction:
      "在运营、销售与产品开发中理解真实需求，也用 Vibe Coding 把想法快速做成可体验的产品。",
    motto: "功不唐捐，玉汝于成",
  },
  heroVisual: {
    image: "/images/shawnnova-hero-studio-v2.webp",
    alt: "创作者从侧后方坐在工作室中，将产品草图做成数字原型",
  },
  tools: [
    { label: "Codex", icon: "openai" },
    { label: "飞书", icon: "feishu" },
    { label: "GitHub", icon: "github" },
    { label: "VS Code", icon: "visualstudiocode" },
    { label: "Cloudflare", icon: "cloudflare" },
    { label: "Vercel", icon: "vercel" },
  ],
  navigation: [
    { label: "关于", href: "#about" },
    { label: "作品", href: "#work" },
    { label: "经历", href: "#experience" },
    { label: "方法", href: "#approach" },
    { label: "联系", href: "#contact" },
  ],
  work: [
    {
      title: "带货短视频达人工具网站",
      description:
        "围绕选品、脚本、素材组织和视频生成，帮助带货达人更快完成从商品到成片的工作。",
      kind: "主攻方向",
      image: "/images/shawnnova-commerce-creator-v2.webp",
      alt: "创作者在桌面上整理商品样品、手机短视频素材和分镜流程",
    },
    {
      title: "AI 混剪工具",
      description: "把素材拆分、智能重组、字幕和批量导出串成更高效的混剪流程。",
      kind: "视频效率",
      image: "/images/shawnnova-video-workflow-v2.webp",
      alt: "创作者在桌面屏幕上调整视频时间线、素材片段和字幕轨道",
    },
    {
      title: "个人站开发",
      description: "从内容结构、视觉设计到部署上线，做清晰、快速、便于联系的个人网站。",
      kind: "网站交付",
      image: "/images/shawnnova-desktop-product-v2.webp",
      alt: "桌面中的网站界面与纸质内容结构草图组成开发现场",
    },
    {
      title: "企业自动化工作流开发",
      description: "连接表单、数据、消息和常用业务工具，减少重复操作与人工搬运。",
      kind: "企业效率",
      image: "/images/shawnnova-business-automation-v2.webp",
      alt: "创作者在显示器和纸面草图上梳理企业自动化流程节点",
    },
  ],
  approach: [
    {
      title: "理解",
      description: "先看见真实问题，再决定技术应该出现在哪里。",
    },
    {
      title: "构建",
      description: "从最小但完整的版本开始，让想法尽快接受真实使用。",
    },
    {
      title: "打磨",
      description: "把性能、交互和细节做到位，让产品自然地被理解。",
    },
  ],
  experience: [
    {
      title: "运营",
      description: "观察用户、内容和场景，把目标拆成可以执行的动作。",
    },
    {
      title: "销售",
      description: "在沟通与转化中识别真实需求，理解信任如何建立。",
    },
    {
      title: "产品开发",
      description: "将需求组织成清晰方案，协调体验、功能与交付。",
    },
    {
      title: "Vibe Coding",
      description: "借助 AI 快速验证想法，让概念尽早成为可以使用的产品。",
    },
  ],
  contact: {
    email: "shawnnovags111@gmail.com",
    phone: "18379582410",
    github: "https://github.com/G-gs111",
    note: "如果你也在做有意思的产品，欢迎聊聊。",
  },
} as const;

export type SiteContent = typeof siteContent;
