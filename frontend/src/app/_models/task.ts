// export enum Priority {
//   High = "0",
//   Medium = "1",
//   Low = "2",
// }

// export interface TaskBackend {
//   id: string;
//   title: string;
//   note: string | null;
//   deadline: string | null;
//   priority: "0" | "1" | "2";
//   listKey: number;
//   done: boolean;
// }

// export interface TaskFrontend {
//   id: string;
//   title: string;
//   note: string | null;
//   deadline: Date | null;
//   priority: Priority;
//   listKey: number;
//   done: boolean;
// }

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
