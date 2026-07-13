import { db } from "./db.js";
import { task as tasks } from "../db/schema.js";
import { asc, eq, and, desc, SQL } from "drizzle-orm";

export async function getTasks(query: any, userId: string) {
  const whereConditions = [
    eq(tasks.userId, userId),
    ...(query.done === false || query.done === true
      ? [eq(tasks.done, query.done)]
      : []),
  ];
  const filterConditions: SQL[] = [];
  if (query.sort) {
    filterConditions.push(
      query.direction === "asc" ? asc(query.sort) : desc(query.sort),
    );
  }

  return db
    .select()
    .from(tasks)
    .where(and(...whereConditions))
    .orderBy(...filterConditions)
    .limit(query.limit ?? undefined);
}
