import {
  TaskFrontend,
  TaskBackend,
  TaskBackendWithoutId,
  TaskFrontendWithoutId,
} from "@/app/_models/task";
import { toTask, toApiTask } from "@/app/_mappers/task.mapper";
import { fetchApi } from "@/app/_api/fetcher";

export async function getDueTask() {
  const response = await fetchApi<TaskBackend[]>(
    `/tasks?done=false&sort=deadline&direction=asc&limit=1`,
    "GET",
  );
  console.log(response);
  return Array.isArray(response) ? response[0] : null;
}

type TaskSortField = "title" | "deadline" | "priority";

export async function getTasksForList(
  listId: string,
  done?: boolean,
  sort?: TaskSortField,
): Promise<TaskFrontend[] | false> {
  const parms = new URLSearchParams();
  if (done !== undefined) {
    parms.set("done", String(done));
  }
  if (sort !== undefined) {
    parms.set("sort", sort);
  }
  const query = parms.toString();
  const result = await fetchApi<TaskBackend[]>(
    `/lists/${listId}/tasks${query ? `?${query}` : ""}`,
    "GET",
  ); //Bedingung ? wennWahr : wennFalsch
  return result !== undefined && result !== "successful"
    ? result.map(toTask)
    : false;
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

export async function getNumberOfTasks(listId: string): Promise<number> {
  const result: TaskBackend[] | "successful" | undefined = await fetchApi<
    TaskBackend[]
  >(`/lists/${listId}/tasks?done=false`, "GET");
  if (result && result.length > 0 && result !== "successful") {
    let i = 0;
    for (const task of result) {
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

export async function deleteAllDoneTasks(
  ListId: string,
): Promise<true | false> {
  const parms = new URLSearchParams();
  parms.set("done", "true");
  const query = parms.toString();
  const result: TaskBackend | "successful" | undefined =
    await fetchApi<TaskBackend>(`/lists/${ListId}/tasks?${query}`, "DELETE");
  return result === "successful";
}
