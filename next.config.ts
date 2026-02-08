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
  // tinacms-authjs was previously transpiled here for ESM/CJS compat,
  // but its runtime usage has been inlined in the API route.
  // Removing transpilePackages avoids bundler pulling in tinacms UI code
  // (which crashes due to color-string ESM/CJS mismatch) when processing
  // the type-only import in tina/__generated__/databaseClient.ts.
  experimental: {
    // TinaCMS local database (LevelDB) doesn't support concurrent access
    // from multiple workers. Limit to 1 CPU for SSG page data collection.
    cpus: 1,
  },
};

export default nextConfig;
