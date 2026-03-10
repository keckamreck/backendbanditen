import { getLists, generateTasks } from "@/app/_lib/demo";

export enum Sort {
  Fälligkeitsdatum = "Fälligkeitsdatum",
  Priorität = "Priorität",
  Alphabetisch = "Alphabetisch",
}

export interface List {
  id: number;
  title: string;
}

export function getList(id: number) {
  return getLists();
}

export function getTasks(listKey: number) {
  return generateTasks();
}