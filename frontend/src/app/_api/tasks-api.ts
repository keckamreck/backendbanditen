import { apiError } from "@/app/_api/errorHandler";
import { getUserId } from "@/app/_api/users-api";
import config from "@/app/_lib/config";
import {
  TaskFrontend,
  TaskBackend,
  TaskBackendWithoutId,
  TaskFrontendWithoutId,
} from "@/app/_models/task";
import { toTask, toApiTask } from "@/app/_mappers/task.mapper";
import { fetchApi } from "@/app/_api/fetcher";

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

export async function getTask(taskId: string): Promise<TaskFrontend | false> {
  const result: TaskBackend | "successful" | undefined =
    await fetchApi<TaskBackend>(`/tasks/${taskId}`, "GET");
  if (result !== undefined && result !== "successful") {
    return toTask(result);
  } else {
    return false;
  }
}

export async function getNumberOfTasks(
  listId: string,
): Promise<number> {
  const result: TaskBackend[] | "successful" | undefined = await fetchApi<
    TaskBackend[]
  >(`/lists/${listId}/tasks?done=false`, "GET");
  if (result && result.length > 0 && result !== "successful") {
    let i = 0;
    for (const task of result){
      i++;
    }
    return i;
  } else {
    return 0;
  }
}

export async function createTask(
  task: TaskFrontendWithoutId,
): Promise<TaskFrontend | false> {
  const taskFormattedForBackend: TaskBackendWithoutId | Partial<TaskBackend> =
    toApiTask(task);
  const result: TaskBackend | "successful" | undefined =
    await fetchApi<TaskBackend>(`/tasks`, "POST", taskFormattedForBackend);
  if (result !== undefined && result !== "successful") {
    return toTask(result);
  } else {
    return false;
  }
}

export async function editTask(
  taskId: string,
  changes: Partial<TaskFrontend>,
): Promise<TaskFrontend | false> {
  const changesFormattedForBackend: Partial<TaskBackend> = toApiTask(changes);
  const result: TaskBackend | "successful" | undefined =
    await fetchApi<TaskBackend>(
      `/tasks/${taskId}`,
      "PATCH",
      changesFormattedForBackend,
    );
  if (result !== undefined && result !== "successful") {
    return toTask(result);
  } else {
    return false;
  }
}

export async function deleteTask(id: string): Promise<true | false> {
  const result: TaskBackend | "successful" | undefined =
    await fetchApi<TaskBackend>(`/tasks/${id}`, "DELETE");
  return result === "successful";
}
