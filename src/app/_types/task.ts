import { Priority } from "./priority.ts";

export type Task = {
  id: number;
  title: string;
  priority: Priority;
};