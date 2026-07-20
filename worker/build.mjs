import { build } from "esbuild";

await build({
  bundle: true,
  entryPoints: ["worker/src/index.ts"],
  format: "esm",
  outfile: "worker/dist/index.js",
  platform: "browser",
});
