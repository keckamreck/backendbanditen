import { Task } from "./task.ts";

export type Group = {
  slug: string;
  title: string;
  data: Task[];
};