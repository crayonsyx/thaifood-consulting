/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
// Shared NextAuth options for TinaCMS self-hosted auth.
// Used by both /api/auth/[...nextauth] and /api/tina/[...routes].
// Uses require() to avoid ESM/CJS interop crashes on Vercel.

const CredentialsProvider =
  require("next-auth/providers/credentials").default;

const TINA_CREDENTIALS_PROVIDER_NAME = "TinaCredentials";

export function buildAuthOptions(secret: string, databaseClient: any) {
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
                result.data?.authorize?._password?.passwordChangeRequired ||
                false;
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
