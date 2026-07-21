import express from "express";
import { router as listsRouter } from "./lists-router.js";
import { router as tasksRouter } from "./tasks-router.js";
import { router as categoriesRouter } from "./categories-router.js";
import { router as usersRouter } from "./users-router.js";
import { validateSession } from "../repositories/session.js";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export const router = express.Router({ mergeParams: true });

async function validateRequest(request: Request, response: Response, next: NextFunction) {
  const token = request.header("Authorization") as string;
  if(token !== undefined)
    await validateSession(request);
  next();
}

router.use(validateRequest);
router.use("/lists", listsRouter);
router.use("/tasks", tasksRouter);
router.use("/categories", categoriesRouter);
router.use("/", usersRouter);

