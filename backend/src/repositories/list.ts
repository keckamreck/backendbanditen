import { list as lists } from "../db/schema.js";
import { db } from "./db.js";
import { eq, ilike, and, SQL } from "drizzle-orm";
import { z } from "zod";

import { NotFoundError } from "../errors/errors.js";
import { mapDatabaseError } from "../errors/map-database-error.js";
import { userUpdateSchema } from "../routers/lists-router.js";

export type List = typeof lists.$inferInsert;

export async function getListById(ListId: string, userId: string) {
  try {
    const result = await db.query.list.findFirst({
      where: (list, { eq, and }) =>
        and(eq(list.id, ListId), eq(list.userId, userId)),
    });
    if (!result) {
      throw new NotFoundError("List not found");
    }
    return result;
  } catch (error) {
    throw mapDatabaseError(error);
  }
}
export async function updateListById(
  ListId: string,
  userId: string,
  data: z.infer<typeof userUpdateSchema>,
) {
  try {
    const [updated] = await db
      .update(lists)
      .set(data)
      .where(and(eq(lists.id, ListId), eq(lists.userId, userId)))
      .returning();
    if (!updated) {
      throw new NotFoundError("List not found");
    }
    return updated;
  } catch (error) {
    throw mapDatabaseError(error);
  }
}

export async function deleteListById(ListId: string, userId: string) {
  try {
    const [deleted] = await db
      .delete(lists)
      .where(and(eq(lists.id, ListId), eq(lists.userId, userId)))
      .returning();
    if (!deleted) {
      throw new NotFoundError("List not found");
    }
    return deleted;
  } catch (error) {
    throw mapDatabaseError(error);
  }
}

export async function newList(list: List) {
  await db.insert(lists).values(list);
  return {
    id: list.id,
  };
}

export async function getListsBySearch(query: any, userId: string) {
  const conditions: SQL[] = [eq(lists.userId, userId)];

  if (query.search !== undefined) {
    conditions.push(ilike(lists.title, `%${query.search}%`));
  }

  if (query.categoryId && query.categoryId !== "null") {
    conditions.push(eq(lists.categoryId, query.categoryId));
  }

  if (query.isFavorite !== undefined) {
    conditions.push(eq(lists.isFavorite, query.isFavorite));
  }

  return db
    .select()
    .from(lists)
    .where(and(...conditions));
}
