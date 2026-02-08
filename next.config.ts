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
  // Bundle TinaCMS packages so the bundler handles CJS/ESM interop
  // (color-string is CJS but tinacms imports it with ESM named imports)
  transpilePackages: ["tinacms-authjs", "tinacms"],
  experimental: {
    // TinaCMS local database (LevelDB) doesn't support concurrent access
    // from multiple workers. Limit to 1 CPU for SSG page data collection.
    cpus: 1,
  },
};

export default nextConfig;
