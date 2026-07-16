import { apiError } from "@/app/_api/errorHandler";
import { getUserId } from "@/app/_api/users-api";
import config from "@/app/_lib/config";
import { TaskFrontend, TaskBackend } from "@/app/_models/task";

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

export async function getTask(
  taskId: string,
): Promise<TaskFrontend | undefined> {
  try {
    const userId = await getUserId();

    const result = await fetch(
      config.apiUrl + "users/" + userId + "/tasks/" + taskId,
    );
    if (!result.ok) {
      throw new Error();
    } else {
      return await result.json();
    }
  } catch (error) {
    console.error(error);
    apiError();
  }
}

export function editTask(id: string, task: Partial<TaskFrontend>) {}

export function deleteTask(id: string) {}
