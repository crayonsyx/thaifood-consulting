/* eslint-disable @typescript-eslint/no-require-imports */
// Standard NextAuth catch-all route at /api/auth/[...nextauth].
// Required because the TinaCMS admin panel's client-side next-auth/react
// functions (getCsrfToken, getSession, etc.) default to /api/auth/ basePath.
// The TinaCMS backend route at /api/tina/[...routes] handles /api/tina/auth/*
// but the admin SPA also needs /api/auth/* for session management.

import type { NextApiRequest, NextApiResponse } from "next";
import { buildAuthOptions } from "../../../lib/tina-auth";

const NextAuth = require("next-auth").default;
const databaseClient =
  require("../../../tina/__generated__/databaseClient").default;

const authOptions = buildAuthOptions(
  process.env.NEXTAUTH_SECRET!,
  databaseClient
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(authOptions)(req, res);
};
