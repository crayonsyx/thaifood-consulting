import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import databaseClient from "../../../tina/__generated__/databaseClient";
import type { NextApiRequest, NextApiResponse } from "next";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler = isLocal
  ? TinaNodeBackend({
      authProvider: LocalBackendAuthProvider(),
      databaseClient,
    })
  : undefined;

// Lazy-init for production to avoid importing tinacms-authjs at module load
// (it has ESM/CJS issues with color-string on Node 24)
let prodHandler: ReturnType<typeof TinaNodeBackend> | undefined;

async function getProdHandler() {
  if (!prodHandler) {
    const { AuthJsBackendAuthProvider, TinaAuthJSOptions } = await import(
      "tinacms-authjs"
    );
    prodHandler = TinaNodeBackend({
      authProvider: AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient,
          secret: process.env.NEXTAUTH_SECRET!,
        }),
      }),
      databaseClient,
    });
  }
  return prodHandler;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (handler) {
    return handler(req, res);
  }
  const h = await getProdHandler();
  return h(req, res);
};
