import { db } from "./db.js";
import { task as tasks } from "../db/schema.js";
import { desc, asc } from "drizzle-orm";

export async function getOneTask(query: any) {
  if (
    query.done == false &&
    query.sort == "deadline" &&
    query.direction == "asc"
  ) {
    //Get the Due Task
    return db
      .select()
      .from(tasks)
      .orderBy(asc(tasks.deadline))
      .limit(query.limit);
  } else {
    return {};
  }
}
