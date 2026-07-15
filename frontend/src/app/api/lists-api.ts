import { apiError } from "@/app/api/error";

export async function newList(title: string) {
  try {
    const response = await fetch(
      `http://localhost:8097/users/e16203c1-9337-43d1-924e-50e92aae7503/lists`,
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
    const response = await fetch(
      `http://localhost:8097/users/e16203c1-9337-43d1-924e-50e92aae7503/lists`,
    );
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
    const response = await fetch(
      `http://localhost:8097/users/e16203c1-9337-43d1-924e-50e92aae7503/tasks?done=false&sort=deadline&direction=asc&limit=1`,
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
    const response = await fetch(
      `http://localhost:8097/users/e16203c1-9337-43d1-924e-50e92aae7503/lists?search=${searchTerm}`,
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
