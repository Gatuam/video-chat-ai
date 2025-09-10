import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.remotePatterns",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
