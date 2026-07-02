import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/", // Directory for migration files
  schema: "./index.ts", // Output path for the schema file
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Your Neon connection string
  },
});
