export enum Priority {
  High,
  Medium,
  Low
};

export interface Task {
  id: number;
  title: string;
  note?: string;
  deadline?: Date;
  priority: Priority;
  listKey: number;
  done: boolean;
};