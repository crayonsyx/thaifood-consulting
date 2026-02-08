/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// Use require() instead of import for ESM packages (@tinacms/datalayer has
// "type": "module") — static imports crash in Pages API routes (CJS context)
// on Vercel's serverless runtime. require() bypasses the bundler's static
// ESM→CJS interop which is the root cause of the crash.

import type { NextApiRequest, NextApiResponse } from "next";

const { TinaNodeBackend, LocalBackendAuthProvider } = require("@tinacms/datalayer");
const NextAuth = require("next-auth").default;
const CredentialsProvider = require("next-auth/providers/credentials").default;
const { getServerSession } = require("next-auth/next");
const databaseClient = require("../../../tina/__generated__/databaseClient").default;

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const TINA_CREDENTIALS_PROVIDER_NAME = "TinaCredentials";

// Inline auth logic from tinacms-authjs to avoid importing tinacms UI package
// (tinacms-authjs bundles tinacms which imports color-string with ESM named
// imports from a CJS module, crashing on Vercel's Node runtime)

function buildAuthOptions(secret: string) {
  const credentialsProvider = CredentialsProvider({
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials: any) => {
      try {
        const result = await databaseClient.authenticate({
          username: credentials!.username,
          password: credentials!.password,
        });
        return result.data?.authenticate || null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
  });
  credentialsProvider.name = TINA_CREDENTIALS_PROVIDER_NAME;

  return {
    callbacks: {
      jwt: async ({ token: jwt, account }: any) => {
        if (account) {
          try {
            if (jwt?.sub) {
              const result = await databaseClient.authorize({ sub: jwt.sub });
              jwt.role = !!result.data?.authorize ? "user" : "guest";
              jwt.passwordChangeRequired =
                result.data?.authorize?._password
                  ?.passwordChangeRequired || false;
            }
          } catch (error) {
            console.log(error);
          }
          if (jwt.role === undefined) {
            jwt.role = "guest";
          }
        }
        return jwt;
      },
      session: async ({ session, token: jwt }: any) => {
        session.user.role = jwt.role;
        session.user.passwordChangeRequired = jwt.passwordChangeRequired;
        session.user.sub = jwt.sub;
        return session;
      },
    },
    session: { strategy: "jwt" as const },
    secret,
    providers: [credentialsProvider],
  };
}

function buildAuthProvider(authOptions: any) {
  return {
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
  };
}

const handler = isLocal
  ? TinaNodeBackend({
      authProvider: LocalBackendAuthProvider(),
      databaseClient,
    })
  : TinaNodeBackend({
      authProvider: buildAuthProvider(
        buildAuthOptions(process.env.NEXTAUTH_SECRET!)
      ),
      databaseClient,
    });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await handler(req, res);
  } catch (e) {
    console.error("TinaCMS API error:", e);
    res.status(500).json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    });
  }
};
