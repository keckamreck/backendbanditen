export enum Priority {
  High,
  Medium,
  Low
};

export type Task = {
  id: number;
  title: string;
  priority: Priority;
};