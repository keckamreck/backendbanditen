import { getLists, getTasks } from "@/app/_lib/demo";

export enum Priority {
  High,
  Medium,
  Low,
}

export interface Task {
  id: number;
  title: string;
  note?: string;
  deadline?: Date;
  priority: Priority;
  listKey: number;
  done: boolean;
}

export interface saveTodo {
  title: string;
  enterDeadline: boolean;
  indexSelectedList: number;
  selectedPriority: Priority;
  date?: Date;
  timeHour?: number;
  timeMinutes?: number;
  notes?: string;
}

export function getTaskofList(listKey: number) {
  const tasks = getTasks();
  let tasksofList = [];
  for (let e of tasks) {
    if (e.listKey === listKey) {
      tasksofList.push(e);
    }
  }
  return tasksofList;
}

export function getTask(id: number) {
  const tasks: Task[] = getTasks();
  for (let e of tasks) {
    if (e.id === id) {
      return e;
    }
  }
  return tasks[0];
}
