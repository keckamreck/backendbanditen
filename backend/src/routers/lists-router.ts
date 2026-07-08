import express from "express";
import { getListsBySearch, List } from "../repositories/list.js";
import * as list from "../repositories/list.js";
import { z } from "zod";
import { boolean } from "drizzle-orm/pg-core";

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
    list.getListsBySearch(search).then((result) => {
      res.status(200).json(result);
    });
  }
});

router.delete("/:id", async (req, res) => {
  await list.deleteListById(req.params.id).then((result) => {
    res.status(200).json(result);
  });
});
