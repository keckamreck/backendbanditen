import express from "express";
import * as task from "../repositories/task.js";
import { z } from "zod";
import { boolean } from "drizzle-orm/pg-core";
import { priority } from "../db/schema.js";

export const router = express.Router({ mergeParams: true });

router.get("", async (req, res) => {
  console.log("Going in");
  const querySchema = z.object({
    done: z.stringbool().optional(),
    sort: z.enum(["deadline"]).optional(),
    direction: z.enum(["desc", "asc"]).optional(),
    limit: z.coerce.number().optional(),
  });

  const query = querySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json(query.error);
  } else {
    const search = query.data;
    console.log(search);
    try {
      if (search.limit === 1) {
        const result = await task.getOneTask(search);
        return res.status(200).json(result);
      }
      res.status(200).json(search);
    } catch (error) {
      console.log("Fehler bei der Datenbank");
    }
  }
});
