import { List } from '@/app/_models/list';
import { Priority, Task } from '@/app/_models/task';

export function generateList(id: number) {
  const list: List[] = [
    {
      id: 1,
      title: "Test Liste",

    },
    {
      id: 2,
      title: "Test Liste 12345",
    },
    {
      id: 3,
      title: "Arbeit",
    },
    {
      id: 4,
      title: "Üble Liste",
    },
  ];

  return list;
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

export function getTasks(listKey: number){

  const listId: number = listKey;

  let tasks: Task[] = [
    { 
      id: 1,
      title: "This is a task",
      note: "none",
      deadline: new Date("2025-02-01T10:01:00"),
      priority: Priority.High,
      listKey: 1,
      done: false
    },
    { 
      id: 2,
      title: "This is another task",
      note: "none",
      deadline: new Date("2025-03-01T11:00:00"),
      priority: Priority.Medium,
      listKey: 1,
      done: false
    },
    { 
      id: 3,
      title: "This is again another task",
      note: "none",
      deadline: new Date("2025-04-01T22:00:00"),
      priority: Priority.Low,
      listKey: 2,
      done: false
    },
    { 
      id: 4,
      title: "test Task",
      note: "none",
      deadline: new Date("2025-03-01T11:00:00"),
      priority: Priority.Medium,
      listKey: 1,
      done: false
    },
    { 
      id: 5,
      title: "nother test Task",
      note: "none",
      deadline: new Date("2025-04-01T22:00:00"),
      priority: Priority.Low,
      listKey: 3,
      done: false
    },
    { 
      id: 6,
      title: "nother test Task",
      note: "none",
      deadline: new Date("2025-04-01T22:00:00"),
      priority: Priority.Low,
      listKey: 3,
      done: false
    },
  ];
  let match : number = 0;
  for(let i=0; i<tasks.length; i++){
    if(tasks[i].listKey == listId){
      match++;
    }
  }
  return match;
}