import { eq, and } from "drizzle-orm";
import { category, user } from "../db/schema.js";
import { db } from "./db.js";
import {randomUUID} from "crypto";

export interface Category{
    id: string;
    name: string;
    userId: string;
}

export async function readCategories(categoryId: string, userId: string){
    return await db.select().from(category).where(and(eq(category.id, categoryId), eq(category.userId, userId)));
}

export async function createCategory(newCategory: Category){
    return await db.insert(category).values({
        id: randomUUID(),
        name: newCategory.name,
        userId: newCategory.userId,
    })
}

export async function patchCategory(categoryId: string, userId: string, newName: string){
    return await db.update(category).set({name : newName}).where(and(eq(category.id, categoryId), eq(category.userId, userId)));
}

export async function deleteCategory(categoryId: string, userId: string){
    return await db.delete(category).where(and(eq(category.id, categoryId), eq(category.userId, userId)));
}