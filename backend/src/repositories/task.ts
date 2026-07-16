import { db } from "./db.js";
import { task as tasks } from "../db/schema.js";
import { TaskSortField } from "../routers/lists-router.js";
import { asc, eq, and, desc, SQL } from "drizzle-orm";
import {
  Task,
  userInputCreateTaskSchema,
  userInputUpdateTaskSchema,
} from "../routers/tasks-router.js";
import { NotFoundError } from "../errors/errors.js";
import { mapDatabaseError } from "../errors/map-database-error.js";
import { z } from "zod";

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

export async function getTasksForList(
  ListId: string,
  userId: string,
  done?: boolean,
  sort?: TaskSortField,
) {
  try {
    const tasksFromList = await db.query.task.findMany({
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
  } catch (error) {
    throw mapDatabaseError(error);
  }
}

export async function getTask(userId: string, taskId: string): Promise<Task> {
  try {
    const result = await db.query.task.findFirst({
      where: (task, { and, eq }) =>
        and(eq(task.id, taskId), eq(task.userId, userId)),
    });
    if (!result) {
      throw new NotFoundError("Task not found");
    }
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function createTask(
  userId: string,
  data: z.infer<typeof userInputCreateTaskSchema>,
): Promise<Task> {
  try {
    const newTask: Task = {
      id: crypto.randomUUID(),
      userId: userId,
      ...data,
    };
    await db.insert(tasks).values(newTask);
    return newTask;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function updateTask(
  userId: string,
  taskId: string,
  data: z.infer<typeof userInputUpdateTaskSchema>,
): Promise<Task> {
  try {
    const [updatedTask] = await db
      .update(tasks)
      .set(data)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();
    if (!updatedTask) {
      throw new NotFoundError("Task not found");
    }
    return updatedTask;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function deleteTask(
  userId: string,
  taskId: string,
): Promise<void> {
  try {
    const [result] = await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();
    if (!result) {
      throw new NotFoundError("Task not found");
    }
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}
