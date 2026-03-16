import { List } from "./list";
import { getTasks } from "@/app/_lib/demo";
import { Task } from "./task";
import { getLists } from "@/app/_lib/demo";

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

export function getDoneTasks(listKey: number) {
  const tasks = getTaskofList(listKey);
  let doneTasks = [];
  for (let e of tasks) {
    if (e.done) {
      doneTasks.push(e);
    }
  }
  return doneTasks;
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

export function getList(id: number) {
  const lists: List[] = getLists();
  for (let e of lists) {
    if (e.id === id) {
      return e;
    }
  }
  return lists[0];
}
