import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "./repositories/db.js";

export const auth = betterAuth({
  disableTrustedOriginsCors: true,
  trustedOrigins: ['http://localhost:3000', 'https://backendbanditen-frontend.vercel.app/'],
  baseURL: "https://backendbanditen-backend.vercel.app/auth",
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
