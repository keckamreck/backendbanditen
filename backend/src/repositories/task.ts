import { task } from "../db/schema.js";
import { db } from "./db.js";
import { eq, and } from "drizzle-orm";

export async function getTasksForList(
  ListId: string,
  userId: string,
  done?: boolean,
  sort?: string,
) {
  const result = await db.query.task.findMany({
    where: (task, { eq, and }) => {
      const conditions = [eq(task.listId, ListId), eq(task.userId, userId)];

      if (done !== undefined) {
        conditions.push(eq(task.done, done));
      }
      return and(...conditions);
    },
    orderBy: (task, { asc }) => {
      if (sort !== undefined) {
        return [asc(task[sort as keyof typeof task])];
      }
      return [];
    },
  });
  return result;
}
