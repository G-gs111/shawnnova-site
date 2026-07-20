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
  navigation: [
    { label: "关于", href: "#about" },
    { label: "作品", href: "#work" },
    { label: "经历", href: "#experience" },
    { label: "方法", href: "#approach" },
    { label: "联系", href: "#contact" },
  ],
  work: [
    {
      title: "AI 视频工具",
      description: "把字幕识别、画面修复和自动化流程组合成真正可用的视频处理工具。",
      kind: "核心方向",
      image: "/images/shawnnova-work.webp",
      alt: "蓝色玻璃与金属折面构成的抽象技术装置",
    },
    {
      title: "桌面端体验",
      description: "让复杂能力留在幕后，把可靠、清晰和专注留给使用者。",
      kind: "产品实践",
      image: "/images/shawnnova-material.webp",
      alt: "玻璃与拉丝金属交叠形成的精密材质细节",
    },
    {
      title: "持续实验",
      description: "用小而完整的项目验证新技术，并把有效部分沉淀成下一次构建的起点。",
      kind: "长期习惯",
      image: "/images/shawnnova-material.webp",
      alt: "钴蓝光线穿过透明材料的抽象细节",
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
