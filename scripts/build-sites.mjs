import { spawn } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const nextBin = path.join(projectRoot, "node_modules/next/dist/bin/next");

await new Promise((resolve, reject) => {
  const build = spawn(process.execPath, [nextBin, "build"], {
    cwd: projectRoot,
    env: { ...process.env, SITES_BUILD: "1" },
    stdio: "inherit",
  });

  build.on("error", reject);
  build.on("exit", (code) => {
    if (code === 0) resolve();
    else reject(new Error(`Sites build failed with exit code ${code}`));
  });
});

const distDir = path.join(projectRoot, "dist");
await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "server"), { recursive: true });
await cp(path.join(projectRoot, "out"), path.join(distDir, "client"), {
  recursive: true,
});
await cp(
  path.join(projectRoot, "sites/worker/index.js"),
  path.join(distDir, "server/index.js"),
);
