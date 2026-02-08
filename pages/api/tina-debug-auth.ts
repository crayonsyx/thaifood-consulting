/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// TEMPORARY debug endpoint — remove after fixing auth
import type { NextApiRequest, NextApiResponse } from "next";

const databaseClient =
  require("../../tina/__generated__/databaseClient").default;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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
