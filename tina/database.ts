import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { Redis } from "@upstash/redis";
import { RedisLevel } from "upstash-redis-level";

const isLocal =
  process.env.TINA_PUBLIC_IS_LOCAL === "true" ||
  !process.env.KV_REST_API_URL ||
  !process.env.GITHUB_PERSONAL_ACCESS_TOKEN;

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH || "main",
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      }),
      /* eslint-disable @typescript-eslint/no-explicit-any */
      databaseAdapter: new (RedisLevel as any)({
        redis: new Redis({
          url: process.env.KV_REST_API_URL!,
          token: process.env.KV_REST_API_TOKEN!,
        }),
        namespace: process.env.GITHUB_BRANCH || "main",
      }),
      /* eslint-enable @typescript-eslint/no-explicit-any */
    });
