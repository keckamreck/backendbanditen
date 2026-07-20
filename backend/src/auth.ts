import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "./repositories/db.js";

export const auth = betterAuth({
  disableTrustedOriginsCors: true,
  trustedOrigins: ['https://backendbanditen.biber.mom', 'http://localhost:3000'],
  baseURL: process.env.NODE_ENV === 'production'
      ? "https://backend.biber.mom/auth"
      : "http://localhost:8097/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.NODE_ENV === 'production'
      ? 'biber.mom'
      : "localhost",
    }
  },
  session: {
    expiresIn: 4 * 60 * 60,
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
