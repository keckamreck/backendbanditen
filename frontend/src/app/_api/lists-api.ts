import { apiError } from "@/app/_api/errorHandler";
import { fetchApi } from "@/app/_api/fetcher";
import { ListReal } from "@/app/_models/list";
import { getUserId } from "@/app/_api/users-api";
import config from "@/app/_lib/config";

export async function newList(title: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(`${config.apiUrl}users/${userId}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        isFavorite: false,
      }),
    });
    if (!response.ok) {
      throw new Error();
    }
  } catch (e) {
    console.log("Biber");
    apiError();
  }
}
export async function getLists() {
  try {
    const userId = await getUserId();
    const response = await fetch(`${config.apiUrl}users/${userId}/lists`);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (e) {
    console.log("Lists Error");
    apiError();
  }
}

export async function getListsBySearch(searchTerm: string) {
  try {
    const userId = await getUserId();

    const response = await fetch(
      `${config.apiUrl}users/${userId}/lists?search=${searchTerm}`,
    );
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (e) {
    console.log("Search Error");
    apiError();
  }
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
  const result = await fetchApi<ListReal>(`lists/${ListId}/`, "PATCH", data);
  return result !== undefined && result !== "successful" ? result : false;
}
