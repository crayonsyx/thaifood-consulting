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
  // TinaCMS packages use ESM ("type": "module") which crashes when bundled
  // into Pages API routes (CJS context). Mark them as external so Node.js
  // loads them natively with proper ESM support.
  serverExternalPackages: [
    "@tinacms/datalayer",
    "@tinacms/graphql",
    "tinacms-gitprovider-github",
  ],
  experimental: {
    // TinaCMS local database (LevelDB) doesn't support concurrent access
    // from multiple workers. Limit to 1 CPU for SSG page data collection.
    cpus: 1,
  },
};

export default nextConfig;
