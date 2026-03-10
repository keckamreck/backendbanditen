import { getLists } from "@/app/_lib/demo";

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
  const lists: List[] = getLists();
  for (let e of lists) {
    if (e.id === id) {
      return e;
    }
  }
  return lists[0];
}
