import express, { Request, Response, NextFunction } from "express";
import * as category from "../repositories/category.js";
import { Category } from "../repositories/category.js";
import z from "zod";
import { zodValidation } from "../validation/zod-validation.js";
import { errorHandler } from "../middleware/errorHandler.js";

export const router = express.Router({ mergeParams: true });

const uuidSchema = z.uuid();
const nameSchema = z.string().trim().min(1).max(100);

router.get(
  "/:categoryId",
  async (
    request: Request<{ categoryId: string; userId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const categoryId = zodValidation(uuidSchema, request.params.categoryId);
      const userId = request.params.userId;
      const result: Category = await category.getCategoryById(categoryId, userId);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/",
  async (
    request: Request<{ userId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
        const name: string = zodValidation(nameSchema, request.body.name);
        const userId: string = request.params.userId;
      const result: Category = await category.createCategory(name, userId);
      return response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  "/:categoryId",
  async (
    request: Request<{ categoryId: string; userId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const categoryId = zodValidation(uuidSchema, request.params.categoryId);
      const newName: string = zodValidation(nameSchema, request.body.name);
      const userId: string = request.params.userId;

      const result: Category = await category.updateCategory(
        categoryId,
        userId,
        newName,
      );
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:categoryId",
  async (
    request: Request<{ categoryId: string; userId: string }>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const categoryId: string = zodValidation(
        uuidSchema,
        request.params.categoryId,
      );
      const userId: string = request.params.userId;

      const result: Category = await category.deleteCategory(
        categoryId,
        userId,
      );
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.use(errorHandler);
