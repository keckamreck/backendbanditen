import { task } from "../db/schema.js";
import { db } from "./db.js";
import { eq, and } from "drizzle-orm";

export async function getTasksForList(
  ListId: string,
  userId: string,
  done?: boolean,
  sortby?: string,
) {
  const result = db.query.task.findMany({
    where: (task, { eq, and }) => {
      const conditions = [eq(task.listId, ListId), eq(task.userId, userId)];

      if (done !== undefined) {
        conditions.push(eq(task.done, done));
      }
      return and(...conditions);
    },
    orderBy: (task, { asc }) => {
      if (sortby !== undefined) {
        return [asc(task[sortby as keyof typeof task])];
      }
      return [];
    },
  });
  return result;
}
