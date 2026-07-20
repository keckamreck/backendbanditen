import express from "express";
import { List } from "../repositories/list.js";
import { InferSelectModel } from "drizzle-orm";
import { list as listschema, priority } from "../db/schema.js";
import * as list from "../repositories/list.js";
import { z } from "zod";
import { Request, Response } from "express";
import {
  getListById,
  deleteListById,
  updateListById,
} from "../repositories/list.js";

import { getTasksForList } from "../repositories/task.js";
import { zodValidation } from "../validation/zod-validation.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  const zodSchema = z.object({
    title: z.string(),
    isFavorite: z.boolean(),
    categoryId: z.uuid().optional(),
  });

  const validData = zodValidation(zodSchema, req.body);

  const data: List = {
    id: crypto.randomUUID(),
    title: validData.title,
    isFavorite: validData.isFavorite,
    //@ts-ignore
    userId: req.params.userId,
    categoryId: validData.categoryId ?? null,
  };
  console.log(data);
  try {
    await list.newList(data).then((result) => {
      res.status(201).json(result); //result wird für einfachere Tests in Postman zurückgegeben
    });
  } catch (err) {
    console.log("Fehler beim Datenbank abruf");
    next(err);
  }
});

router.get("", async (req, res, next) => {
  const querySchema = z.object({
    search: z.string().optional(),
    isFavorite: z.stringbool().optional(),
    categoryId: z.string().optional(),
  });

  const query = zodValidation(querySchema, req.query);

  try {
    //@ts-ignore
    list.getListsBySearch(query, req.params.userId).then((result) => {
      res.status(200).json(result);
    });
  } catch (err) {
    console.log("Fehler beim Datenbank abruf");
    next(err);
  }
});

const uuidSchema = z.uuid();
export const userUpdateSchema = z.object({
  title: z.string().optional(),
  isFavorite: z.boolean().optional(),
  categoryId: z.uuid().optional().nullable(),
});
export type ListSchema = InferSelectModel<typeof listschema>;
const taskQuerySchema = z.object({
  done: z.stringbool().optional(),
  sort: z.enum(["title", "deadline", "priority"]).optional(),
});
export type TaskSortField = z.infer<typeof taskQuerySchema>["sort"];

router.get("/:listId", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.listId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const foundList = await getListById(id, userId);
    res.json(foundList);
  } catch (error) {
    next(error);
  }
});

router.patch("/:listId", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.listId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const data = zodValidation(userUpdateSchema, req.body);
    const upList = await updateListById(id, userId, data);
    res.json(upList);
  } catch (error) {
    next(error);
  }
});

router.delete("/:listId", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.listId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    await deleteListById(id, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.get("/:listId/tasks", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.listId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const { done, sort } = zodValidation(taskQuerySchema, req.query);
    const tasks = await getTasksForList(id, userId, done, sort);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);
