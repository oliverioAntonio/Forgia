import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // STATIC_EXPORT=1 genera HTML statico (per GitHub Pages) invece del Worker
  ...(process.env.STATIC_EXPORT === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
