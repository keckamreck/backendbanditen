export enum Priority {
  High = "0",
  Medium = "1",
  Low = "2",
}

export interface TaskBackend {
  id: string;
  title: string;
  note: string | null;
  deadline: string | null;
  priority: "0" | "1" | "2";
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

export interface TaskFrontend {
  id: string;
  title: string;
  note: string | null;
  deadline: Date | null;
  priority: Priority;
  listKey: number;
  done: boolean;
}
