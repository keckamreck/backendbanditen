import { fetchApi } from "@/app/_api/fetcher";
import { ListBackend, ListReal } from "../_models/list";

export async function newList(title: string) {
  return fetchApi<ListReal>(`/lists`, "POST", {
    title: title,
    isFavorite: false,
  });
}

export async function getLists() {
  return fetchApi<ListReal>(`/lists`, "GET");
}

export async function getListsBySearch(searchTerm: string) {
  return fetchApi(`/lists?search=${searchTerm}`, "GET");
}

export async function getListById(ListId: string): Promise<ListReal | false> {
  const result = await fetchApi<ListReal>(`/lists/${ListId}`, "GET");
  return result !== undefined && result !== "successful" ? result : false;
}

export async function deleteListById(ListId: string): Promise<true | false> {
  const result = await fetchApi<ListReal>(`/lists/${ListId}`, "DELETE");
  console.log("delete");
  return result === "successful";
}

export interface ListUpdateData {
  title?: string;
  isFavorite?: boolean;
  categoryId?: string;
}
export async function updateListById(
  ListId: string,
  data: ListUpdateData,
): Promise<ListReal | false> {
  const result = await fetchApi<ListReal>(`/lists/${ListId}/`, "PATCH", data);
  return result !== undefined && result !== "successful" ? result : false;
}

export async function updateList(
  listId: string,
  changes: Partial<ListReal>,
): Promise<ListReal | false> {
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