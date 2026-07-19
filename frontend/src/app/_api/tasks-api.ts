import { apiError } from "@/app/_api/errorHandler";
import { getUserId } from "@/app/_api/users-api";

import config from "@/app/_lib/config";

export async function getDueTask() {
  try {
    const userId = await getUserId();
    const response = await fetch(
      `${config.apiUrl}users/${userId}/tasks?done=false&sort=deadline&direction=asc&limit=1`,
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

type TaskSortField = "title" | "deadline" | "priority";

export async function getTasksForList(
  listId: string,
  done?: boolean,
  sort?: TaskSortField,
) {
  try {
    const userId = await getUserId();
    const parms = new URLSearchParams();
    if (done !== undefined) {
      parms.set("done", String(done));
    }
    if (sort !== undefined) {
      parms.set("sort", sort);
    }
    const query = parms.toString();
    const response = await fetch(
      `${config.apiUrl}users/${userId}/lists/${listId}/tasks${query ? `?${query}` : ""}`,
    ); //Bedingung ? wennWahr : wennFalsch
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    apiError();
  }
}
