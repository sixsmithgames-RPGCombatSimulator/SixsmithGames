import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@sixsmith-games/product-activity-contracts"],
  turbopack: {
    root: path.resolve(process.cwd(), ".."),
  },
};

export default nextConfig;
