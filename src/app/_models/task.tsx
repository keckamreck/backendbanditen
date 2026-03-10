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
  indexSelectedList: number;
  selectedPriority: Priority;
  date?: Date;
  timeHour?: number;
  timeMinutes?: number;
  notes?: string;
}
