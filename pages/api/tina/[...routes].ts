import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import databaseClient from "../../../tina/__generated__/databaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

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
    authorize: async (credentials) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jwt: async ({ token: jwt, account }: any) => {
        if (account) {
          try {
            if (jwt?.sub) {
              const result = await databaseClient.authorize({ sub: jwt.sub });
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              jwt.role = !!(result as any).data?.authorize ? "user" : "guest";
              jwt.passwordChangeRequired =
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (result as any).data?.authorize?._password
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildAuthProvider(authOptions: any) {
  return {
    initialize: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isAuthorized: async (req: any, res: any) => {
      const session = await getServerSession(req, res, authOptions);
      if (!req.session) {
        Object.defineProperty(req, "session", {
          value: session,
          writable: false,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!(session as any)?.user) {
        return {
          errorCode: 401,
          errorMessage: "Unauthorized",
          isAuthorized: false as const,
        };
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((session as any)?.user?.role !== "user") {
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
