import express, { Request, Response } from "express";
import {
  type ListUpdateInput,
  getListById,
  deleteListById,
  updateListById,
} from "../repositories/list.js";

import { getTasksForList } from "../repositories/task.js";

export const router = express.Router({ mergeParams: true });

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
  sortby?: string;
}

router.get("/:id", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const list = await getListById(id, userId);
  if (!list) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(list);
});

router.patch("/:id", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const data: ListUpdateInput = req.body;
  const upList = await updateListById(id, userId, data);
  if (!upList) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(upList);
});

router.delete("/:id", async (req: Request<ListParms>, res: Response) => {
  const { id, userId } = req.params;
  const delist = await deleteListById(id, userId);
  if (!delist) {
    return res.status(404).json({ message: "no list found" });
  }
  res.json(delist);
});

router.get(
  "/:id/tasks",
  async (req: Request<ListParms, {}, {}, TaskQuery>, res: Response) => {
    const { id, userId } = req.params;
    const done: boolean | undefined =
      req.query.done === "true"
        ? true
        : req.query.done === "false"
          ? false
          : undefined;
    const sortby = req.query.sortby;
    const tasks = await getTasksForList(id, userId, done, sortby);
    if (!tasks) {
      return res.status(404).json({ message: "no list found" });
    }
    res.json(tasks);
  },
);
