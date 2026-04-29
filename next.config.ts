import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Fsuits",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
