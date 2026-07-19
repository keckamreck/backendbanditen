export enum Priority {
  High,
  Medium,
  Low,
}

export interface TaskBackend {
  id: string;
  title: string;
  deadline: Date | string | null;
  listId: string;
  priority: "0" | "1" | "2";
  note: string | null;
  done: boolean;
}

export type TaskBackendWithoutId = Omit<TaskBackend, "id">;

export interface TaskFrontend {
  id: string;
  title: string;
  deadline: Date | null;
  listId: string;
  priority: Priority;
  note: string | null;
  done: boolean;
}

export type TaskFrontendWithoutId = Omit<TaskFrontend, "id">;
