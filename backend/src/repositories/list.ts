import { db } from "./db.js";
import { list as lists } from "../db/schema.js";
import { eq, ilike } from "drizzle-orm";

export interface List {
  id: string;
  title: string;
  isFavorite: boolean;
  userId: string;
  categoryId: string;
}

export async function newList(list: List) {
  await db.insert(lists).values(list);
  return {
    id: list.id,
  };
}

export async function getListsBySearch(query: any) {
  if (query.search != undefined) {
    console.log(query.search);
    return db
      .select()
      .from(lists)
      .where(ilike(lists.title, `%${query.search}%`));
  }
  if (query.categoryId != "null" && query.categoryId != undefined) {
    return db
      .select()
      .from(lists)
      .where(eq(lists.categoryId, query.categoryId));
  }
  console.log("query");
  if (query.isFavorite != undefined) {
    console.log("test");
    return db
      .select()
      .from(lists)
      .where(eq(lists.isFavorite, query.isFavorite));
  } else {
    return {};
  }
}

export async function deleteListById(id: string) {
  await db.delete(lists).where(eq(lists.id, id));
  return {
    id: id,
  };
}
