import { getUserId } from "@/app/_api/users-api";
import config from "@/app/_lib/config";
import { TaskFrontend, TaskBackend } from "@/app/_models/task";
import { apiError } from "@/app/_api/errorHandler";

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
