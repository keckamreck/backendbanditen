import { db } from "./db.js";
import { list, list as lists, user as users } from "../db/schema.js";
import { eq, ilike, and } from "drizzle-orm";

export type List = typeof lists.$inferInsert;

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

export async function deleteListById(id: string) {
  await db.delete(lists).where(eq(lists.id, id));
  return {
    id: id,
  };
}
