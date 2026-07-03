import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/", // Directory for migration files
  schema: "./src/index.ts", // Output path for the schema file
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Your Neon connection string
  },
});
