import type { NextConfig } from "next";

const isSitesBuild = process.env.SITES_BUILD === "1";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: isSitesBuild,
  },
  output: isSitesBuild ? "export" : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
