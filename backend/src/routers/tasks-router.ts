import { z } from "zod";
import express, { Request, Response, NextFunction } from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../repositories/task.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { ValidationError } from "../errors/errors.js";
import { InferSelectModel } from "drizzle-orm";
import { task } from "../db/schema.js";
import { zodValidation } from "../validation/zod-validation.js";

export const router = express.Router({ mergeParams: true });

// Typescript types and zod schemas
const uuidSchema = z.uuid();
export const userInputCreateTaskSchema = z.object({
  title: z.string(),
  note: z.string().nullable(),
  deadline: z.iso.datetime({ offset: true }).nullable(),
  priority: z.enum(["0", "1", "2"]),
  listId: z.uuid(),
  done: z.boolean(),
});
export const userInputUpdateTaskSchema = userInputCreateTaskSchema.partial();
export type Task = InferSelectModel<typeof task>;

router.get("", async (req: Request<{ userId: string }>, res, next) => {
  // console.log("Going in");
  const querySchema = z.object({
    done: z.stringbool().optional(),
    sort: z.string("deadline").optional(),
    direction: z.enum(["asc", "desc"]).optional(),
    limit: z.coerce.number().optional(),
  });

  // const query = querySchema.safeParse(req.query);
  const query = zodValidation(querySchema, req.query);
  try {
    const result = await getTasks(query, req.params.userId);
    return res.status(200).json(result);
  } catch (error) {
    console.log("Fehler beim Datenbank Abruf");
    next(error);
  }
});

router.get(
  "/:taskId",
  async (
    request: Request<{ userId: string; taskId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const taskId: z.infer<typeof uuidSchema> = zodValidation(
        uuidSchema,
        request.params.taskId,
      );
      const result: Task = await getTask(request.params.userId, taskId);
      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.post(
  "/",
  async (
    request: Request<{ userId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const userInput: z.infer<typeof userInputCreateTaskSchema> =
        zodValidation(userInputCreateTaskSchema, {
          title: request.body.title,
          note: request.body.note,
          deadline: request.body.deadline,
          priority: request.body.priority,
          listId: request.body.listId,
          done: request.body.done,
        });
      const result: Task = await createTask(request.params.userId, userInput);
      response.status(201).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.patch(
  "/:taskId",
  async (
    request: Request<{ userId: string; taskId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const taskId: z.infer<typeof uuidSchema> = zodValidation(
        uuidSchema,
        request.params.taskId,
      );
      const userInput: z.infer<typeof userInputUpdateTaskSchema> =
        zodValidation(userInputUpdateTaskSchema, {
          title: request.body.title,
          note: request.body.note,
          deadline: request.body.deadline,
          priority: request.body.priority,
          listId: request.body.listId,
          done: request.body.done,
        });
      const userInputCleaned: z.infer<typeof userInputUpdateTaskSchema> =
        Object.fromEntries(
          Object.entries(userInput).filter(
            ([_key, value]: [
              string,
              string | boolean | null | undefined,
            ]): boolean => value !== undefined,
          ),
        );
      if (Object.keys(userInputCleaned).length === 0) {
        throw new ValidationError(
          "no valid fields were passed to update the task",
        );
      }
      const result: Task = await updateTask(
        request.params.userId,
        taskId,
        userInput,
      );
      response.status(200).json(result);
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.delete(
  "/:taskId",
  async (
    request: Request<{ userId: string; taskId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const taskId: z.infer<typeof uuidSchema> = zodValidation(
        uuidSchema,
        request.params.taskId,
      );
      await deleteTask(request.params.userId, taskId);
      response.status(204).send();
    } catch (error: unknown) {
      next(error);
    }
  },
);

router.use(errorHandler);
