import { apiError } from "@/app/api/error";
import { getUserId } from "@/app/api/users-api";

export async function newList(title: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `http://localhost:8097/users/${userId}/lists`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          isFavorite: false,
        }),
      },
    );
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
    const response = await fetch(`http://localhost:8097/users/${userId}/lists`);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (e) {
    console.log("Lists Error");
    apiError();
  }
}
export async function getDueTask() {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `http://localhost:8097/users/${userId}/tasks?done=false&sort=deadline&direction=asc&limit=1`,
    );
    if (!response.ok) {
      throw new Error();
    }
    const data = await response.json();
    console.log(data);
    return Array.isArray(data) ? data[0] : null;
  } catch (e) {
    console.log("Due Task Error");
    apiError();
  }
}

export async function getListsBySearch(searchTerm: string) {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `http://localhost:8097/users/${userId}/lists?search=${searchTerm}`,
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
