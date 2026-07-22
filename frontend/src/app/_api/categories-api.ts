import { fetchApi } from "./fetcher";
import {CategoryBackend, CategoryFrontend} from "@/app/_models/category";

export async function getCategories(): Promise<CategoryFrontend[] | []> {
    const result: CategoryBackend[] | "successful" | undefined = await fetchApi<CategoryBackend[]>(`/categories`, "GET");
    if(result && result !== "successful") {
        return result.map((category) => ({
            id: category.id,
            name: category.name,
        }));
    }
    return [];
}

export async function updateCategory(categoryId: string): Promise<CategoryFrontend | false> {
    const result: CategoryBackend | "successful" | undefined = await fetchApi<CategoryBackend>(`/categories/${categoryId}`, "PATCH");
    if(result !== undefined && result !== "successful") {
        return {
            id: result.id,
            name: result.name,
        };
    }
    return false;
}

export async function getCategoryById(categoryId: string): Promise<CategoryFrontend | undefined> {
    const result: CategoryBackend | "successful" | undefined = await fetchApi<CategoryBackend>(`/categories/${categoryId}`, "GET");
    if(result && result !== "successful") {
        return {
            id: result.id,
            name: result.name,
        };
    }
    return undefined;
}

export async function createCategory(newName: string): Promise<CategoryFrontend | false> {
    const result: CategoryBackend | "successful" | undefined = await fetchApi<CategoryBackend>(`/categories`, "POST", { name: newName });
    if(result !== undefined && result !== "successful") {
        return {
            id: result.id,
            name: result.name,
        };
    }
    return false;
}

export async function deleteCategory(categoryId: string): Promise<null> {
    await fetchApi<CategoryBackend>(`/categories/${categoryId}`, "DELETE");
    return null
}