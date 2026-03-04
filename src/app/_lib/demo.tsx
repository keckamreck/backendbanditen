import { List } from '@/app/_models/list';
import { Priority, Task } from '@/app/_models/task';

export function generateList(id: number) {
  const list: List = {
      id: id,
      title: "Basic list"
    };

  return list;
}

export function generateTasks(listKey: number) {
  let tasks: Task[] = [
    { 
      id: 0,
      title: "This is a task",
      note: "none",
      deadline: new Date("2025-02-01"),
      priority: Priority.High,
      listKey: listKey,
      done: false
    },
    { 
      id: 1,
      title: "This is another task",
      note: "none",
      deadline: new Date("2025-03-01"),
      priority: Priority.Medium,
      listKey: listKey,
      done: false
    },
    { 
      id: 2,
      title: "This is another task",
      note: "none",
      deadline: new Date("2025-04-01"),
      priority: Priority.Low,
      listKey: listKey,
      done: false
    },
  ];

  return tasks;
}