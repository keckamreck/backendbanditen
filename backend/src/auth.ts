import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "./repositories/db.js";

export const auth = betterAuth({
  disableTrustedOriginsCors: true,
  trustedOrigins: ['https://backendbanditen.biber.mom'],
  baseURL: "https://backend.biber.mom/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
