/* eslint-disable @typescript-eslint/no-explicit-any */
// TEMPORARY debug endpoint — remove after fixing auth
import type { NextApiRequest, NextApiResponse } from "next";
import databaseClient from "../../tina/__generated__/databaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("[debug-auth] databaseClient keys:", Object.keys(databaseClient || {}));
    console.log("[debug-auth] has authenticate:", typeof (databaseClient as any)?.authenticate);

    if (!(databaseClient as any)?.authenticate) {
      return res.status(500).json({
        error: "databaseClient.authenticate not found",
        clientKeys: Object.keys(databaseClient || {}),
        clientType: typeof databaseClient,
      });
    }

    const result = await (databaseClient as any).authenticate({
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
      stack: e?.stack?.slice(0, 500),
    });
  }
}
