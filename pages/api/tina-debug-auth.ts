/* eslint-disable @typescript-eslint/no-explicit-any */
// TEMPORARY debug endpoint — remove after fixing auth
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const mod = await import("../../tina/__generated__/databaseClient");
    const databaseClient = mod.default || mod.databaseClient || mod;

    console.log("[debug-auth] module keys:", Object.keys(mod));
    console.log("[debug-auth] databaseClient keys:", Object.keys(databaseClient || {}));

    if (!databaseClient?.authenticate) {
      return res.status(500).json({
        error: "databaseClient.authenticate not found",
        moduleKeys: Object.keys(mod),
        clientKeys: Object.keys(databaseClient || {}),
      });
    }

    const result = await databaseClient.authenticate({
      username: "admin",
      password: "changeme123",
    });
    res.status(200).json({
      hasData: !!result?.data,
      dataKeys: Object.keys(result?.data || {}),
      authenticate: result?.data?.authenticate
        ? {
            id: result.data.authenticate.id,
            name: result.data.authenticate.name,
            email: result.data.authenticate.email,
            hasPassword: !!result.data.authenticate._password,
          }
        : null,
      errors: result?.errors || null,
    });
  } catch (e: any) {
    console.error("[debug-auth] error:", e);
    res.status(500).json({
      error: e?.message,
      stack: e?.stack?.slice(0, 800),
    });
  }
}
