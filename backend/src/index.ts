import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export async function insertData(username, password) {
  await db.insert(schema.user).values({
    id: crypto.randomUUID(),
    username: username,
    password: password,
  });
}
