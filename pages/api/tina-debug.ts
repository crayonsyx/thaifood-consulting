import type { NextApiRequest, NextApiResponse } from "next";

// Test each import individually to find which one crashes
const imports: Record<string, string> = {};

try {
  require("@tinacms/datalayer");
  imports["@tinacms/datalayer"] = "OK";
} catch (e: any) {
  imports["@tinacms/datalayer"] = e.message;
}

try {
  require("next-auth");
  imports["next-auth"] = "OK";
} catch (e: any) {
  imports["next-auth"] = e.message;
}

try {
  require("next-auth/providers/credentials");
  imports["next-auth/providers/credentials"] = "OK";
} catch (e: any) {
  imports["next-auth/providers/credentials"] = e.message;
}

try {
  require("next-auth/next");
  imports["next-auth/next"] = "OK";
} catch (e: any) {
  imports["next-auth/next"] = e.message;
}

try {
  require("../../tina/__generated__/databaseClient");
  imports["databaseClient"] = "OK";
} catch (e: any) {
  imports["databaseClient"] = e.message;
}

try {
  require("../../tina/database");
  imports["tina/database"] = "OK";
} catch (e: any) {
  imports["tina/database"] = e.message;
}

try {
  require("upstash-redis-level");
  imports["upstash-redis-level"] = "OK";
} catch (e: any) {
  imports["upstash-redis-level"] = e.message;
}

try {
  require("tinacms-gitprovider-github");
  imports["tinacms-gitprovider-github"] = "OK";
} catch (e: any) {
  imports["tinacms-gitprovider-github"] = e.message;
}

try {
  require("@upstash/redis");
  imports["@upstash/redis"] = "OK";
} catch (e: any) {
  imports["@upstash/redis"] = e.message;
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ imports });
}
