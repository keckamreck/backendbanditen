import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
//import { username } from "better-auth/plugins"
import { db } from "./repositories/db.js";
import * as schema from "./db/schema.js";

export const auth = betterAuth({
    disableTrustedOriginsCors: true,
    trustedOrigins: ['http://localhost:3000'],
    baseURL: "http://localhost:8097/auth",
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: { 
            ...schema, 
            user: schema.user,
        }, 
    }),
    emailAndPassword: { 
        enabled: true, 
    },
});