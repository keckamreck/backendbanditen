import { List } from '@/app/_models/list';
import { Priority, Task } from '@/app/_models/task';

export function generateList(id: number) {
  const list: List = {
      id: id,
      title: "Basic list"
    };

  return list;
}
export function generateLists(){
  const lists: List[] = [
   {
    id: 1,
    title: "Basic list"
  },
  {
    id:2,
    title: "Einkaufen"
  }
  ];

  return lists;
}

export function generateTasks(listKey: number) {
  let tasks: Task[] = [
    { 
      id: 0,
      title: "This is a task",
      note: "none",
      deadline: new Date("2025-02-01T10:01:00"),
      priority: Priority.High,
      listKey: listKey,
      done: false
    },
    { 
      id: 1,
      title: "This is another task",
      note: "none",
      deadline: new Date("2025-03-01T11:00:00"),
      priority: Priority.Medium,
      listKey: listKey,
      done: false
    },
    { 
      id: 2,
      title: "This is another task",
      note: "none",
      deadline: new Date("2025-04-01T22:00:00"),
      priority: Priority.Low,
      listKey: listKey,
      done: false
    },
  ];

  return tasks;
}