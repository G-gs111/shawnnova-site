import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const contentPath = resolve(root, "src/content/portfolio.ts");
const homePath = resolve(root, "src/components/fde/portfolio-home.tsx");
const contactPath = resolve(root, "src/components/fde/contact-block.tsx");
const packagePath = resolve(root, "package.json");
const content = readFileSync(contentPath, "utf8");
const home = readFileSync(homePath, "utf8");
const publicSurface = `${home}\n${readFileSync(contactPath, "utf8")}`;
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));

const requiredContent = [
  "把一线业务问题，做成能跑的系统。",
  "I turn frontline business problems into systems teams can use.",
  "content-compliance",
  "selection-dashboard",
  "qianchuan-cockpit",
  "部分 WorkBuddy 控制能力仍在验收",
  "some WorkBuddy control capabilities are still in acceptance",
];

const requiredAnchors = ["about", "metrics", "proof", "approach", "work", "experience", "tools", "contact"];
const forbidden = ["色彩萌宠", "武汉科技大学", "advertiser_id", "account_id", "access_token"];
const forbiddenPublicUi = ["QQ 邮箱", "QQ mailbox"];

for (const value of requiredContent) {
  if (!content.includes(value)) throw new Error(`Missing public content: ${value}`);
}

for (const id of requiredAnchors) {
  if (!publicSurface.includes(`id=\"${id}\"`)) throw new Error(`Missing legacy anchor: #${id}`);
}

for (const value of forbidden) {
  if (content.includes(value)) throw new Error(`Forbidden public value found: ${value}`);
}

for (const value of forbiddenPublicUi) {
  if (publicSurface.includes(value) || content.includes(value)) {
    throw new Error(`Private delivery detail exposed in public UI: ${value}`);
  }
}

for (const route of [
  "src/app/projects/[slug]/page.tsx",
  "src/app/en/projects/[slug]/page.tsx",
]) {
  if (!existsSync(resolve(root, route))) throw new Error(`Missing route source: ${route}`);
}

const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
if ("three" in dependencies || "@react-three/fiber" in dependencies) {
  throw new Error("Three.js must not be introduced for this portfolio.");
}

console.log("Portfolio content check passed: locales, cases, anchors, privacy and dependency boundary.");
