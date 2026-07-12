import { db } from "./db.js";
import {
  Task,
  userInputCreateTaskSchema,
  userInputUpdateTaskSchema,
} from "../routers/tasks-router.js";
import { NotFoundError } from "../errors/errors.js";
import { mapDatabaseError } from "../errors/map-database-error.js";
import { z } from "zod";
import { task as tasks } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

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
