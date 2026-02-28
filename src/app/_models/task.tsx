export enum Priority {
  High,
  Medium,
  Low
};

export type Task = {
  id: number;
  title: string;
  date: Date;
  priority: Priority;
};