import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: ["@libsql/client", "better-sqlite3"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
