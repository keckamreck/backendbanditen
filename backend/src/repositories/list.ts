import { list as lists } from "../db/schema.js";
import { db } from "./db.js";
import { eq, ilike, and } from "drizzle-orm";

export type List = typeof lists.$inferInsert;

export type ListUpdateInput = {
  title?: string;
  isFavorite?: boolean;
  categoryId?: string;
};

export async function getListById(ListId: string, userId: string) {
  return await db.query.list.findFirst({
    where: (list, { eq, and }) =>
      and(eq(list.id, ListId), eq(list.userId, userId)),
  });
}
export async function updateListById(
  ListId: string,
  userId: string,
  data: ListUpdateInput,
) {
  return db
    .update(lists)
    .set(data)
    .where(and(eq(lists.id, ListId), eq(lists.userId, userId)))
    .returning();
}

export async function deleteListById(ListId: string, userId: string) {
  return db
    .delete(lists)
    .where(and(eq(lists.id, ListId), eq(lists.userId, userId)));
}

export async function newList(list: List) {
  await db.insert(lists).values(list);
  return {
    id: list.id,
  };
}

export async function getListsBySearch(query: any, userId: string) {
  if (query.search != undefined) {
    console.log(query.search);
    return db
      .select()
      .from(lists)
      .where(
        and(ilike(lists.title, `%${query.search}%`), eq(lists.userId, userId)),
      );
  }
  if (query.categoryId != "null" && query.categoryId != undefined) {
    return db
      .select()
      .from(lists)
      .where(
        and(eq(lists.categoryId, query.categoryId), eq(lists.userId, userId)),
      );
  }
  console.log(`query+ ${Object.keys(query).length}`);
  if (query.isFavorite != undefined) {
    console.log("test");
    return db
      .select()
      .from(lists)
      .where(
        and(eq(lists.isFavorite, query.isFavorite), eq(lists.userId, userId)),
      );
  }
  if (Object.keys(query).length === 0) {
    console.log("no keys");
    return db.select().from(lists).where(eq(lists.userId, userId));
  } else {
    console.log("Fail");
    return {
      error: "invalid search request",
    };
  }
}
