import { db } from "./db.js";
import { task as tasks } from "../db/schema.js";
import { asc, eq } from "drizzle-orm";

export async function getOneTask(query: any, userId: string) {
  if (
    query.done == false &&
    query.sort == "deadline" &&
    query.direction == "asc"
  ) {
    //Get the Due Task
    return db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, userId))
      .orderBy(asc(tasks.deadline))
      .limit(query.limit);
  } else {
    return {};
  }
}
