import express, { response } from "express";
import * as category from "../repositories/category.js";
import { Category } from "../repositories/category.js";
import { resourceLimits } from "node:worker_threads";

export const router = express.Router({ mergeParams: true });

router.get(
  "/users/:userId/categories/:categoryId",
  async (request, response, next) => {
    try {
      const categoryId = request.params.categoryId;
      const userId = request.params.userId;
      if (!categoryId || !userId) {
        return response.status(400).json({ error: "Missing parameters" });
      }
      const result = await category.readCategories(categoryId, userId);
      if (!result) {
        return response.status(404).json({ error: "Not found" });
      }
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post("/users/:userId/categories", async (request, response, next) => {
  try {
    const newCategory: Category = {
      id: "",
      name: request.body.name,
      userId: request.params.userId,
    };
    if (!newCategory.name || !newCategory.userId) {
      return response.status(400).json({ error: "Missing parameters" });
    }
    await category.createCategory(newCategory).then((result: any) => {
      return response.status(201).json("Created");
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/users/:userId/categories/:categoryId",
  async (request, response, next) => {
    try {
      const catergoryId: string = request.params.categoryId;
      const newName: string = request.body.name;
      const userId: string = request.params.userId;
      if (!catergoryId || !newName || !userId) {
        return response.status(400).json({ error: "Missing parameters" });
      }
      const result = await category.patchCategory(catergoryId, userId, newName);
      return response.status(201).json("created");
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/users/:userId/categories/:categoryId",
  async (request, response, next) => {
    try {
      const categoryId: string = request.params.categoryId;
      const userId: string = request.params.userId;

      const result = category.deleteCategory(categoryId, userId);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);
