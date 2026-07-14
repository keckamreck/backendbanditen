import express from "express";
import { List } from "../repositories/list.js";
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

export const router = express.Router({ mergeParams: true });

router.post("/", async (req, res, next) => {
  const zodSchema = z.object({
    title: z.string(),
    isFavorite: z.boolean(),
    //@ts-ignore
    userId: z.string().refine((val) => val === req.params.userId),
    categoryId: z.string().optional(),
  });

  const validData = zodValidation(zodSchema, req.body);

  const data: List = {
    id: crypto.randomUUID(),
    title: validData.title,
    isFavorite: validData.isFavorite,
    userId: validData.userId,
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

interface ListParms {
  id: string;
  title: string;
  isFavorite: boolean;
  userId: string;
  categoryId: string;
}

interface TaskQuery {
  id: string;
  title?: string;
  deadline?: string;
  priority?: number;
  listId: string;
  userId: string;
  done?: string;
  sort?: string;
}

router.get("/:listId", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const list = await getListById(id, userId);
  if (!list) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(list);
});

router.patch("/:listId", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const data: ListUpdateInput = req.body;
  const upList = await updateListById(id, userId, data);
  if (!upList) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(upList);
});

router.delete("/:listId", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const delist = await deleteListById(id, userId);
  if (!delist) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(delist);
});

router.get(
  "/:listId/tasks",
  async (req: Request<ListParms, {}, {}, TaskQuery>, res: Response) => {
    const { id, userId } = req.params;
    const done: boolean | undefined =
      req.query.done === "true"
        ? true
        : req.query.done === "false"
          ? false
          : undefined;
    const sort = req.query.sort;
    const tasks = await getTasksForList(id, userId, done, sort);
    if (!tasks) {
      return res.status(404).json({ message: "no list found" });
    }
    res.json(tasks);
  },
);
