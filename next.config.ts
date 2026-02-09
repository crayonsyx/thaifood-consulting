import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {},
  // tinacms-gitprovider-github ships unbundled ESM in dist/index.js despite
  // declaring type:commonjs. Transpile it so Pages Router API routes can load it.
  transpilePackages: ["tinacms-gitprovider-github"],
  experimental: {
    // TinaCMS local database (LevelDB) doesn't support concurrent access
    // from multiple workers. Limit to 1 CPU for SSG page data collection.
    cpus: 1,
  },
};

export default nextConfig;
