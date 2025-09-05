import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,   // catches potential issues in dev
  swcMinify: true,         // faster builds & smaller bundles
  eslint: {
    ignoreDuringBuilds: true, // ensures eslint errors won't block build
  },
  typescript: {
    ignoreBuildErrors: true, // ensures TS errors won't block build
  },
};

export default nextConfig;
