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
export interface TaskReal {
  id: string;
  title: string;
  note: string | null;
  deadline: Date | null;
  priority: Priority;
  listId: string;
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
