import express from "express";
import { List } from "../repositories/list.js";
import { InferSelectModel } from "drizzle-orm";
import { list as listschema } from "../db/schema.js";
import * as list from "../repositories/list.js";
import { z } from "zod";
import { Request, Response } from "express";
import {
  type ListUpdateInput,
  getListById,
  deleteListById,
  updateListById,
} from "../repositories/list.js";

import { getTasksForList } from "../repositories/task.js";
import { zodValidation } from "../validation/zod-validation.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const data: List = {
    id: crypto.randomUUID(),
    title: req.body.title,
    isFavorite: req.body.isFavorite,
    userId: req.body.userId,
    categoryId: req.body.categoryId ?? null,
  };

  await list.newList(data).then((result) => {
    res.status(201).json(result); //result wird für einfachere Tests in Postman zurückgegeben
  });
});

router.get("", async (req, res) => {
  const querySchema = z.object({
    search: z.string().optional(),
    isFavorite: z.stringbool().optional(),
    categoryId: z.string().optional(),
  });

  const query = querySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400);
  } else {
    const search = query.data;
    console.log(search);
    try {
      //@ts-ignore
      list.getListsBySearch(search, req.params.userId).then((result) => {
        //@ts-ignore
        if (result.error != undefined) {
          throw Error("Error by getting lists.");
        }
        res.status(200).json(result);
      });
    } catch (err) {
      res.status(500);
    }
  }
});

const uuidSchema = z.uuid();
export const userUpdateSchema = z.object({
  title: z.string().optional(),
  isFavorite: z.boolean().optional(),
  categoryId: z.uuid().optional(),
});
export type ListSchema = InferSelectModel<typeof listschema>;
const taskQuerySchema = z.object({
  done: z.boolean().optional(),
  sort: z.string().optional(),
});

router.get("/:listId", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.ListId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const foundList = await getListById(id, userId);
    res.json(foundList);
  } catch (error) {
    //return res.status(404).json({ message: "no list found" });
    next(error);
  }
});

router.patch("/:listId", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.ListId);
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
    const id = zodValidation(uuidSchema, req.params.ListId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const delist = await deleteListById(id, userId);
    res.json(delist);
  } catch (error) {
    next(error);
  }
});

router.get("/:listId/tasks", async (req: Request, res: Response, next) => {
  try {
    const id = zodValidation(uuidSchema, req.params.ListId);
    const userId = zodValidation(uuidSchema, req.params.userId);
    const { done, sort } = zodValidation(taskQuerySchema, req.query);
    const tasks = await getTasksForList(id, userId, done, sort);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);
