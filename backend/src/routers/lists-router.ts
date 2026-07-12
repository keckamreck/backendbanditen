import express, { Request, Response } from "express";
import { getListById } from "../repositories/list.js";

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
