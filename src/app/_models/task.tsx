import { getLists, getTasks } from "@/app/_lib/demo";

export enum Priority {
  High,
  Medium,
  Low,
}

export interface Task {
  id: number;
  title: string;
  note: string | null;
  deadline: Date | null;
  priority: Priority;
  listKey: number;
  done: boolean;
}

export interface saveTodo {
  title: string;
  enterDeadline: boolean;
  idSelectedList: number;
  selectedPriority: Priority;
  deadline: Date;
  notes: string;
}
