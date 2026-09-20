import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other lockfiles live above this folder; pin the root so Turbopack picks this one.
  turbopack: { root: __dirname },
  // Self-hosting: emits a minimal server bundle for the Docker image.
  output: process.env.DOCKER_BUILD === "1" ? "standalone" : undefined,
  reactStrictMode: false,
  // Native Node packages used by the server-side verifier; the bundler must not
  // try to include their binaries.
  serverExternalPackages: ["playwright", "playwright-core", "esbuild"],
  // Dev blocks /_next/* for non-localhost origins, which breaks hydration when
  // the app is shared through a tunnel. Wildcards survive the URL changing.
  allowedDevOrigins: ["*.trycloudflare.com", "*.loca.lt", "*.ngrok-free.app", "*.ngrok.io"],
};

export default nextConfig;
