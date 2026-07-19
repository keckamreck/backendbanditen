import { apiError } from "@/app/_api/errorHandler";
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

export async function getListById(ListId: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `${config.apiUrl}users/${userId}/lists/${ListId}`,
      { method: "GET" },
    );
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    apiError();
  }
}

export async function deleteListById(ListId: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `${config.apiUrl}users/${userId}/lists/${ListId}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    apiError();
  }
}
export async function updateListById(ListId: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `${config.apiUrl}users/${userId}/lists/${ListId}/`,
      { method: "PATCH" },
    );
    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    apiError();
  }
}
