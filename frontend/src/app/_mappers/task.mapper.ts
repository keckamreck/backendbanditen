import {
  TaskBackend,
  TaskBackendWithoutId,
  TaskFrontend,
  TaskFrontendWithoutId,
} from "@/app/_models/task";
import {
  stringToPriority,
  priorityToString,
} from "@/app/_mappers/priority.mapper";

export function toTask(task: TaskBackend): TaskFrontend {
  return {
    id: task.id,
    title: task.title,
    deadline: task.deadline === null ? null : new Date(task.deadline),
    listId: task.listId,
    priority: stringToPriority(task.priority),
    note: task.note,
    done: task.done,
  };
}

export function toApiTask(
  task: Partial<TaskFrontend> | TaskFrontendWithoutId,
): Partial<TaskBackend> | TaskBackendWithoutId {
  return {
    ...task,
    priority:
      task.priority === undefined ? undefined : priorityToString(task.priority),
  };
}
