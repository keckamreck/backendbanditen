import { List } from "@/app/_models/list";
import { Priority, Task } from "@/app/_models/task";

let tasks: Task[] = [
  {
    id: 0,
    title: "This is a task",
    note: "none",
    deadline: new Date("2025-02-01T10:01:00"),
    priority: Priority.High,
    listKey: 1,
    done: false,
  },
  {
    id: 1,
    title: "This is another task",
    note: "none",
    deadline: new Date("2025-03-01T11:00:00"),
    priority: Priority.Medium,
    listKey: 1,
    done: false,
  },
  {
    id: 2,
    title: "This is another task",
    note: "none",
    deadline: new Date("2025-04-01T22:00:00"),
    priority: Priority.Low,
    listKey: 1,
    done: false,
  },
];

let list: List[] = [
  {
    id: 0,
    title: "Arbeit",
  },
  {
    id: 1,
    title: "Privat",
  },
  {
    id: 2,
    title: "Studium",
  },
  {
    id: 3,
    title: "sonstiges",
  },
  {
    id: 4,
    title: "Haushalt",
  },
];

export function getLists() {
  return list;
}

export function generateTasks() {
  return tasks;
}

export function editTasks() {
  tasks[0].title = "Der Titel wurde geändert";
}
