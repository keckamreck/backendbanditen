import { fetchApi } from "@/app/_api/fetcher";
import { ListBackend, List } from "../_models/list";

export async function newList(title: string) {
  return fetchApi<List>(`/lists`, "POST", {
    title: title,
    isFavorite: false,
  });
}

export async function getLists() {
  const result = await fetchApi<List[]>(`/lists`, "GET");
  return result !== undefined && result !== "successful" ? result : [];
}

export async function getListsBySearch(
  searchTerm: string,
): Promise<List[] | []> {
  const result = await fetchApi<List[]>(`/lists?search=${searchTerm}`, "GET");
  return result !== undefined && result !== "successful" ? result : [];
}

export async function getListById(ListId: string): Promise<List | false> {
  const result = await fetchApi<List>(`/lists/${ListId}`, "GET");
  return result !== undefined && result !== "successful" ? result : false;
}

export async function deleteListById(ListId: string): Promise<true | false> {
  const result = await fetchApi<List>(`/lists/${ListId}`, "DELETE");
  console.log("delete");
  return result === "successful";
}

export interface ListUpdateData {
  title?: string;
  isFavorite?: boolean;
  categoryId?: string | null;
}
export async function updateListById(
  ListId: string,
  data: ListUpdateData,
): Promise<List | false> {
  const result = await fetchApi<List>(`/lists/${ListId}/`, "PATCH", data);
  return result !== undefined && result !== "successful" ? result : false;
}

export async function updateList(
  listId: string,
  changes: Partial<ListBackend>,
): Promise<List | false> {
  const result: ListBackend | "successful" | undefined =
    await fetchApi<ListBackend>(`/lists/${listId}`, "PATCH", changes);
  if (result !== undefined && result !== "successful") {
    return {
      id: result.id,
      title: result.title,
      isFavorite: result.isFavorite || undefined,
      categoryId: result.categoryId || undefined,
    };
  }
  return false;
}
