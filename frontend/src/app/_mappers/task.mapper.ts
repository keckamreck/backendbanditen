import { TaskBackend, TaskFrontend } from "@/app/_models/task";
import {
  StringToPriority,
  PriorityToString,
} from "@/app/_mappers/priority.mapper";

export function toTask(task: TaskBackend): TaskFrontend {
  return {
    id: task.id,
    title: task.title,
    note: task.note,
    deadline: task.deadline === null ? null : new Date(task.deadline),
    priority: StringToPriority(task.priority),
    listKey: task.listKey,
    done: task.done,
  };
}

export function toApiTask(task: TaskFrontend): TaskBackend {
  return {
    id: task.id,
    title: task.title,
    note: task.note,
    deadline: task.deadline === null ? null : task.deadline.toDateString(),
    priority: PriorityToString(task.priority),
    listKey: task.listKey,
    done: task.done,
  };
}
