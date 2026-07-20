export const siteContent = {
  identity: {
    name: "葛少玉",
    alias: "Shawnnova",
    role: "独立开发者",
    headline: "把复杂技术，做成愿意被使用的产品。",
    introduction: "关注 AI 应用、自动化与有质感的数字体验。",
  },
  navigation: [
    { label: "关于", href: "#about" },
    { label: "作品", href: "#work" },
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
  contact: {
    label: "GitHub",
    href: "https://github.com/G-gs111",
    note: "如果你也在做有意思的产品，欢迎聊聊。",
  },
} as const;

export type SiteContent = typeof siteContent;
