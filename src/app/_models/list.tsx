import { getLists, generateTasks } from "@/app/_lib/demo";

export interface List {
  id: number;
  title: string;
}

export function getList() {
  return getLists();
}

export function getTasks(listKey: number) {
  return generateTasks();
}
