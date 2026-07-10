import express, { Request } from "express";
import * as task from "../repositories/task.js";
import { z } from "zod";

export const router = express.Router({ mergeParams: true });

router.get("", async (req: Request<{ userId: string }>, res) => {
  // console.log("Going in");
  const querySchema = z.object({
    done: z.stringbool().optional(),
    sort: z.string("deadline").optional(),
    direction: z.string("asc").optional(),
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
        const result = await task.getOneTask(search, req.params.userId);
        return res.status(200).json(result);
      }
      res.status(200).json(search);
    } catch (error) {
      console.log("Fehler bei der Datenbank");
    }
  }
});
