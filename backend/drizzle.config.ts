import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/", // Directory for migration files
  schema: "./src/db/schema.ts", // Output path for the schema file
  dialect: "postgresql",
  dbCredentials: {
    //@ts-ignore
    url: process.env.DATABASE_URL!, // Your Neon connection string
  },
});
