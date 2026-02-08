/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// TEMPORARY debug endpoint — remove after fixing auth
import type { NextApiRequest, NextApiResponse } from "next";

const mod = require("../../tina/__generated__/databaseClient");
const databaseClient = mod.default || mod.databaseClient || mod;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // First, log what we got from the module
    console.log("[debug-auth] module keys:", Object.keys(mod));
    console.log("[debug-auth] databaseClient keys:", Object.keys(databaseClient || {}));
    console.log("[debug-auth] has authenticate:", typeof databaseClient?.authenticate);

    if (!databaseClient?.authenticate) {
      return res.status(500).json({
        error: "databaseClient.authenticate not found",
        moduleKeys: Object.keys(mod),
        clientKeys: Object.keys(databaseClient || {}),
        clientType: typeof databaseClient,
      });
    }

    console.log("[debug-auth] calling databaseClient.authenticate...");
    const result = await databaseClient.authenticate({
      username: "admin",
      password: "changeme123",
    });
    console.log("[debug-auth] result:", JSON.stringify(result)?.slice(0, 1000));
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
      stack: e?.stack?.slice(0, 500),
    });
  }
}
