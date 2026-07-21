import { eq, and, InferSelectModel } from "drizzle-orm";
import { category } from "../db/schema.js";
import { db } from "./db.js";
import { randomUUID } from "crypto";
import { mapDatabaseError } from "../errors/map-database-error.js";
import { NotFoundError } from "../errors/errors.js";

export type Category = InferSelectModel<typeof category>;

export async function getAllCategories(userId: string) {
  try {
    const result = await db
      .select()
      .from(category)
      .where(eq(category.userId, userId)).orderBy(category.name);
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function getCategoryById(categoryId: string, userId: string) {
  try {
    const result = await db
      .select()
      .from(category)
      .where(and(eq(category.id, categoryId), eq(category.userId, userId)));
    if (result.length === 0) {
      throw new NotFoundError("Category not found");
    }
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function createCategory(name:  string, userId: string) {
  try {
    const existingCategory = await db
      .select()
      .from(category)
      .where(and(eq(category.userId, userId), eq(category.name, name)))
      .limit(1);

    if (existingCategory.length > 0) {
      return existingCategory[0];
    }
    
    const generatedCategory = {
      id: randomUUID(),
      name: name,
      userId: userId,
    };
    await db.insert(category).values(generatedCategory);
    return generatedCategory;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function updateCategory(
  categoryId: string,
  userId: string,
  newName: string,
) {
  try {
    const [result] = await db
      .update(category)
      .set({ name: newName })
      .where(and(eq(category.id, categoryId), eq(category.userId, userId)))
      .returning();

    if (!result) {
      throw new NotFoundError("Category not found");
    }
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}

export async function deleteCategory(categoryId: string, userId: string) {
  try {
    const [result] = await db
      .delete(category)
      .where(and(eq(category.id, categoryId), eq(category.userId, userId)))
      .returning();

    if (!result) {
      throw new NotFoundError("Category not found");
    }
    return result;
  } catch (error: unknown) {
    throw mapDatabaseError(error);
  }
}
