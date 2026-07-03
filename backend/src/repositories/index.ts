import * as schema from "../db/schema.js";
import { db } from "./db.js";

//@ts-ignore
export async function insertData(username, password, email) {
  await db.insert(schema.user).values({
    id: crypto.randomUUID(),
    username: username,
    password: password,
    email: email,
  });
}
