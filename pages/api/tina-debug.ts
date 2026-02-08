import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth/next";
import databaseClient from "../../tina/__generated__/databaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

const results: Record<string, string> = {};

// Test 1: Build auth options (same as real route)
try {
  const credentialsProvider = CredentialsProvider({
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials) => {
      const result = await databaseClient.authenticate({
        username: credentials!.username,
        password: credentials!.password,
      });
      return result.data?.authenticate || null;
    },
  });
  results["CredentialsProvider"] = "OK";
} catch (e: any) {
  results["CredentialsProvider"] = e.message;
}

// Test 2: Build TinaNodeBackend with local auth
try {
  const localHandler = TinaNodeBackend({
    authProvider: LocalBackendAuthProvider(),
    databaseClient,
  });
  results["TinaNodeBackend(local)"] = typeof localHandler;
} catch (e: any) {
  results["TinaNodeBackend(local)"] = e.message;
}

// Test 3: Build auth provider (same as real route)
try {
  const secret = process.env.NEXTAUTH_SECRET || "test-secret";
  const credProv = CredentialsProvider({
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async () => null,
  });

  const authOptions = {
    callbacks: {
      jwt: async ({ token: jwt, account }: any) => jwt,
      session: async ({ session, token: jwt }: any) => session,
    },
    session: { strategy: "jwt" as const },
    secret,
    providers: [credProv],
  };

  const authProvider = {
    initialize: async () => {},
    isAuthorized: async (req: any, res: any) => {
      return { isAuthorized: false as const, errorCode: 401, errorMessage: "test" };
    },
    extraRoutes: {
      auth: {
        secure: false,
        handler: async (req: any, res: any, opts: any) => {},
      },
    },
  };

  results["authProvider"] = "OK";

  // Test 4: Build TinaNodeBackend with custom auth
  const handler = TinaNodeBackend({
    authProvider,
    databaseClient,
  });
  results["TinaNodeBackend(custom)"] = typeof handler;
} catch (e: any) {
  results["TinaNodeBackend(custom)"] = e.message + "\n" + e.stack;
}

// Test 5: env vars
results["NEXTAUTH_SECRET"] = process.env.NEXTAUTH_SECRET ? "set" : "MISSING";
results["KV_REST_API_URL"] = process.env.KV_REST_API_URL ? "set" : "MISSING";
results["KV_REST_API_TOKEN"] = process.env.KV_REST_API_TOKEN ? "set" : "MISSING";
results["GITHUB_PERSONAL_ACCESS_TOKEN"] = process.env.GITHUB_PERSONAL_ACCESS_TOKEN ? "set" : "MISSING";
results["GITHUB_OWNER"] = process.env.GITHUB_OWNER ? "set" : "MISSING";
results["GITHUB_REPO"] = process.env.GITHUB_REPO ? "set" : "MISSING";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(results);
}
