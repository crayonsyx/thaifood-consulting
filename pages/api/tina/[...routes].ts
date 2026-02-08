/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// TinaCMS backend API route. Handles GraphQL queries and proxied auth routes
// at /api/tina/*. Uses require() for npm packages to avoid ESM/CJS interop crashes on Vercel.
// Uses dynamic import() for local databaseClient to handle ESM properly.

import type { NextApiRequest, NextApiResponse } from "next";
import { buildAuthOptions } from "../../../lib/tina-auth";

const { TinaNodeBackend, LocalBackendAuthProvider } =
  require("@tinacms/datalayer");
const NextAuth = require("next-auth").default;
const { getServerSession } = require("next-auth/next");

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// Lazy-load databaseClient via dynamic import to avoid ESM/CJS interop issues
let _dbClient: any = null;
let _handler: any = null;

async function getDbClient() {
  if (!_dbClient) {
    const mod = await import("../../../tina/__generated__/databaseClient");
    _dbClient = mod.default || mod.databaseClient || mod;
  }
  return _dbClient;
}

async function getHandler() {
  if (!_handler) {
    const databaseClient = await getDbClient();
    const authOptions = buildAuthOptions(
      process.env.NEXTAUTH_SECRET!,
      databaseClient
    );
    _handler = isLocal
      ? TinaNodeBackend({
          authProvider: LocalBackendAuthProvider(),
          databaseClient,
        })
      : TinaNodeBackend({
          authProvider: {
            initialize: async () => {},
            isAuthorized: async (req: any, res: any) => {
              const session = await getServerSession(req, res, authOptions);
              if (!req.session) {
                Object.defineProperty(req, "session", {
                  value: session,
                  writable: false,
                });
              }
              if (!session?.user) {
                return {
                  errorCode: 401,
                  errorMessage: "Unauthorized",
                  isAuthorized: false as const,
                };
              }
              if (session?.user?.role !== "user") {
                return {
                  errorCode: 403,
                  errorMessage: "Forbidden",
                  isAuthorized: false as const,
                };
              }
              return { isAuthorized: true as const };
            },
            extraRoutes: {
              auth: {
                secure: false,
                handler: async (req: any, res: any, opts: any) => {
                  const url = new URL(
                    req.url,
                    `http://${req.headers?.host || "localhost"}`
                  );
                  const authSubRoutes = url.pathname
                    ?.replace(`${opts.basePath}auth/`, "")
                    ?.split("/");
                  req.query.nextauth = authSubRoutes;
                  await NextAuth(authOptions)(req, res);
                },
              },
            },
          },
          databaseClient,
        });
  }
  return _handler;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const handler = await getHandler();
    return await handler(req, res);
  } catch (e) {
    console.error("TinaCMS API error:", e);
    res.status(500).json({
      error: e instanceof Error ? e.message : "Internal Server Error",
    });
  }
};
