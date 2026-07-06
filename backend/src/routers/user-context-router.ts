import express from "express";
import { router as listsRouter } from "./lists-router.js";
import { router as tasksRouter } from "./tasks-router.js";
import { router as categoriesRouter } from "./categories-router.js";

export const router = express.Router({ mergeParams: true });
router.use("/lists", listsRouter);
router.use("/tasks", tasksRouter);
router.use("/categories", categoriesRouter);
