import { task } from "../db/schema.js";
import { db } from "./db.js";
import { eq, and } from "drizzle-orm";

export async function getTasksForList(
  ListId: string,
  userId: string,
  done?: boolean,
) {
  const result = db.query.task.findMany({
    where: (task, { eq, and }) => {
      if (done === undefined) {
        return and(eq(task.listId, ListId), eq(task.userId, userId));
      }
      return and(
        eq(task.listId, ListId),
        eq(task.userId, userId),
        eq(task.done, done),
      );
    },
  });
  return result;
}
