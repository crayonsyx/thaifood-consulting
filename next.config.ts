import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    // TinaCMS local database (LevelDB) doesn't support concurrent access
    // from multiple workers. Limit to 1 CPU for SSG page data collection.
    cpus: 1,
  },
};

export default nextConfig;
