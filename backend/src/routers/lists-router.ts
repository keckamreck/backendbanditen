import express, { Request, Response } from "express";
import {
  type ListUpdateInput,
  getListById,
  deleteListById,
  updateListById,
} from "../repositories/list.js";

export const router = express.Router({ mergeParams: true });

interface ListParms {
  id: string;
  title: string;
  isFavorite: boolean;
  userId: string;
  categoryId: string;
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
