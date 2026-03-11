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
  idSelectedList: number;
  selectedPriority: Priority;
  deadline: Date;
  notes: string;
}
