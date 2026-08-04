import express from "express";
import { router as listsRouter } from "./lists-router.js";
import { router as tasksRouter } from "./tasks-router.js";
import { router as categoriesRouter } from "./categories-router.js";
import { router as usersRouter } from "./users-router.js";
import { validateSession } from "../repositories/session.js";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import { errorHandler } from "../middleware/errorHandler.js";
import { routeNotFoundHandler } from "../middleware/routeNotFoundHandler.js";

export const router = express.Router({ mergeParams: true });

async function validateRequest(request: Request, response: Response, next: NextFunction) {
  await validateSession(request, next);
  next();
}

router.use(validateRequest);
router.use("/lists", listsRouter);
router.use("/tasks", tasksRouter);
router.use("/categories", categoriesRouter);
router.use("/", usersRouter);
router.use(routeNotFoundHandler);
router.use(errorHandler);
