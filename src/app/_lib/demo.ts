import { List } from "@/app/_models/list";
import { Priority, Task } from "@/app/_models/task";

let tasks: Task[] = [
  {
    id: 0,
    title: "This is a task",
    deadline: new Date("2028-02-01T10:01:00"),
    priority: Priority.High,
    listKey: 1,
    done: true,
    note: null,
  },
  {
    id: 1,
    title: "This is another task",
    deadline: new Date("2028-03-01T11:00:00"),
    priority: Priority.Medium,
    listKey: 2,
    done: false,
    note: null,
  },
  {
    id: 2,
    title: "This is another task",
    note: "das ist eine Notiz",
    deadline: new Date("2028-04-01T22:00:00"),
    priority: Priority.Low,
    listKey: 1,
    done: false,
  },
  {
    id: 3,
    title: "Milch kaufen",
    note: "- Haltbare Milch (1,5% Fett)\n- 2 Packungen\n- Sonderangebot nutzen",
    deadline: new Date("2026-03-17T12:14:00"),
    priority: Priority.High,
    listKey: 4,
    done: false,
  },
];

let list: List[] = [
  {
    id: 0,
    title: "Arbeit",
    category: "Duales Studium",
  },
  {
    id: 1,
    isFavourite: true,
    title: "Privat",
  },
  {
    id: 2,
    title: "Studium",
    isFavourite: true,
    category: "Duales Studium",
  },
  {
    id: 3,
    title: "sonstiges",
    isFavourite: true,
  },
  {
    id: 4,
    title: "Haushalt",
  },
];

export function getLists() {
  return list;
}
export function newList(name: string) {
  const newListItem: List = {
    id: list.length + 1,
    title: name,
  };

  list.push(newListItem);
  console.log("New list added:", name);
}

export function setListTitle(id: number, newTitle: string) {
  const indexChangedList: number = list.findIndex((list) => list.id === id);
  list[indexChangedList].title = newTitle;
  console.log(list[indexChangedList]);
}

export function deleteList(id: number) {
  const index: number = list.findIndex((list) => list.id === id);
  list.splice(index, 1);
}

export function getTasks() {
  return tasks;
}

export function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

export function editTaskDone(id: number, done: boolean) {
  const indexChangedTask: number = tasks.findIndex((task) => task.id === id);
  tasks[indexChangedTask].done = done;
  console.log(tasks[indexChangedTask]);
}

export function editTask(id: number, changes: Partial<Task>) {
  const indexChangedTask: number = tasks.findIndex((task) => task.id === id);
  for (const key of Object.keys(changes) as (keyof Task)[]) {
    if (tasks[indexChangedTask][key] !== undefined) {
      // @ts-ignore
      tasks[indexChangedTask][key] = changes[key];
    }
  }
  console.log(tasks[indexChangedTask]);
}

export function deleteTask(id: number) {
  const index: number = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
}

export function deleteTasks(listKey: number) {
  tasks.forEach((task) => {
    if (task.listKey === listKey && task.done === true) {
      let index = tasks.indexOf(task);
      tasks.splice(index, 1);
    }
  });
}

export function updateListisFavourite(listId: number, isFavourite: boolean) {
  const lists = list.find((l) => l.id === listId);
  if (lists) {
    lists.isFavourite = isFavourite;
  }
  return lists;
}

export function updateListCategory(listId: number, newCategory: string) {
  const lists = list.find((l) => l.id === listId);
  if (lists) {
    lists.category = newCategory;
  }
  return lists;
}

export function getCategories() {
  const lists: List[] = getLists();
  const categories: string[] = [];
  let temp: string = "";

  for (let i = 0; i < lists.length; i++) {
    if (lists[i].category) {
      temp = lists[i].category as string;
    }
    if (temp != "" && !categories.includes(temp)) {
      categories.push(temp);
    }
  }
  return categories;
}

export function getTaskofList(listKey: number) {
  const tasks = getTasks();
  let tasksofList = [];
  for (let e of tasks) {
    if (e.listKey === listKey) {
      tasksofList.push(e);
    }
  }
  return tasksofList;
}

export function getDoneTasks(listKey: number) {
  const tasks = getTaskofList(listKey);
  let doneTasks = [];
  for (let e of tasks) {
    if (e.done) {
      doneTasks.push(e);
    }
  }
  return doneTasks;
}

export function getTask(id: number) {
  const tasks: Task[] = getTasks();
  for (let e of tasks) {
    if (e.id === id) {
      return e;
    }
  }
  return tasks[0];
}

export function getList(id: number) {
  const lists: List[] = getLists();
  for (let e of lists) {
    if (e.id === id) {
      return e;
    }
  }
  return lists[0];
}
