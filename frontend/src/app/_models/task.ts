export enum Priority {
  High = "high",
  Medium = "medium",
  Low = "low",
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

export interface TaskFormattedForEditor {
  title: string;
  enterDeadline: boolean;
  idSelectedList: number;
  selectedPriority: Priority;
  deadline: Date;
  notes: string;
}
