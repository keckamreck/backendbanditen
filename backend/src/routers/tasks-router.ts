import express, { Request } from "express";
import * as task from "../repositories/task.js";
import { z } from "zod";

export const router = express.Router({ mergeParams: true });

router.get("", async (req: Request<{ userId: string }>, res) => {
  // console.log("Going in");
  const querySchema = z.object({
    done: z.stringbool().optional(),
    sort: z.enum(["title", "note", "deadline", "priority"]).optional(),
    direction: z.enum(["asc", "desc"]).optional(),
    limit: z.coerce.number().optional(),
  });

  const query = querySchema.safeParse(req.query);
  if (!query.success) {
    res.status(400).json(query.error);
  } else {
    const search = query.data;
    console.log(search);
    try {
      const result = await task.getTasks(search, req.params.userId);
      return res.status(200).json(result);
    } catch (error) {
      console.log("Fehler beim Datenbank Abruf");
      return res.status(500).json(query.error);
    }
  }
});
