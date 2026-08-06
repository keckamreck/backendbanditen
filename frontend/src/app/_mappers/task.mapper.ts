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
    ...task,
    deadline: task.deadline === null ? null : new Date(task.deadline),
    priority: stringToPriority(task.priority),
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
