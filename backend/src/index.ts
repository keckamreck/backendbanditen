import { drizzle } from "drizzle-orm/neon-http";
// @ts-ignore
import * as schema from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });
//@ts-ignore
export async function insertData(username, password, email) {
  await db.insert(schema.user).values({
    id: crypto.randomUUID(),
    username: username,
    password: password,
    email: email,
  });
}
