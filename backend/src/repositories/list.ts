import { list } from "../db/schema.js";
import { db } from "./db.js";
import { eq, and } from "drizzle-orm";

export type ListUpdateInput = {
  title?: string;
  isFavorite?: boolean;
  categoryId?: string;
};

export async function getListById(ListId: string, userId: string) {
  const result = await db.query.list.findFirst({
    where: (list, { eq, and }) =>
      and(eq(list.id, ListId), eq(list.userId, userId)),
  });
  return result;
}

export async function updateListById(
  ListId: string,
  userId: string,
  data: ListUpdateInput,
) {
  const result = db
    .update(list)
    .set(data)
    .where(and(eq(list.id, ListId), eq(list.userId, userId)))
    .returning();
  return result;
}

export async function deleteListById(ListId: string, userId: string) {
  const result = await db
    .delete(list)
    .where(and(eq(list.id, ListId), eq(list.userId, userId)));
  return result;
}
