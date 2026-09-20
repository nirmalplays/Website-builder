import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other lockfiles live above this folder; pin the root so Turbopack picks this one.
  turbopack: { root: __dirname },
};

export default nextConfig;
