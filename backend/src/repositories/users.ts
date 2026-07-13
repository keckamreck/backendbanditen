import { user as users } from "../db/schema.js";
import { db } from "./db.js";
import { eq } from "drizzle-orm";

export interface User {
  id: string;
  username: string;
  email: string;
}

export async function createData(user: User) {
  //await db.insert(users).values({
  //  id: crypto.randomUUID(),
  //  username: user.username,
  //  password: user.password,
  //  email: user.email,
  //});
}

export async function readData(id: string) {
  return await db.select().from(users).where(eq(users.id, id));
}

export async function readAllData() {
  return await db.select().from(users);
}

export async function updateData(user: User) {
  await db
    .update(users)
    .set({
      username: user.username,
      email: user.email,
    })
    .where(eq(users.id, user.id));
}

export async function deleteData(id: string) {
  await db.delete(users).where(eq(users.id, id));
}
